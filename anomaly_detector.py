import json
from typing import List, Dict
from datetime import datetime
from pyod.models.knn import KNN
import pandas as pd

with open("shipper_profiles.json") as f:
    SHIPPER_PROFILES = json.load(f)

def load_logs(file_path: str) -> List[Dict]:
    logs = []
    with open(file_path, "r") as f:
        for line in f:
            try:
                logs.append(json.loads(line.strip()))
            except json.JSONDecodeError:
                continue
    return logs

def detect_anomalies(logs: List[Dict]) -> List[Dict]:
    anomalies = []

    for log in logs:
        shipper_id = log.get("shipper_id")
        profile = SHIPPER_PROFILES.get(shipper_id)

        if not profile:
            continue

        deviations = []

        # 1. Platform deviation
        if log.get("platform_type") != profile["platform"]:
            deviations.append("platform")

        # 2. Service level deviation
        if log.get("service_level_code") != profile["service_level"]:
            deviations.append("service_level")

        # 3. CC country mismatch
        if log.get("cc_country") != profile["cc_country"]:
            deviations.append("cc_country")

        # 4. App version anomaly
        if log.get("app_version") != profile["app_version"]:
            deviations.append("app_version")

        if deviations:
            anomalies.append({
                "shipper_id": shipper_id,
                "timestamp": log.get("timestamp"),
                "deviations": deviations,
                "log": log
            })

    return anomalies

def run_pyod_anomaly(logs: List[Dict]) -> List[Dict]:
    df = pd.DataFrame(logs)
    if df.empty:
        return []

    df["timestamp"] = pd.to_datetime(df["timestamp"])
    df["timestamp_int"] = df["timestamp"].astype("int64") // 10**9
    features = ["timestamp_int"]

    # Add more numerical features as needed
    clf = KNN()
    clf.fit(df[features])
    labels = clf.predict(df[features])

    pyod_anomalies = []
    for i, is_anomaly in enumerate(labels):
        if is_anomaly:
            pyod_anomalies.append(logs[i])

    return pyod_anomalies
