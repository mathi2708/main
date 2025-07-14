from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import shutil
import os
import json

from anomaly_detector import load_logs, detect_anomalies, run_pyod_anomaly
from nlp_interpreter import interpret_prompt

app = FastAPI()

UPLOAD_DIR = "uploaded_logs"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Global to store last analysis result
last_analysis_results = []

# Enable CORS for Angular
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload/")
async def upload_log(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"message": f"✅ Uploaded {file.filename}", "path": file_path}

@app.get("/analyze/")
def analyze_logs():
    global last_analysis_results
    results = []

    for fname in os.listdir(UPLOAD_DIR):
        if not fname.endswith(".txt"):
            continue
        fpath = os.path.join(UPLOAD_DIR, fname)
        logs = load_logs(fpath)

        rule_based = detect_anomalies(logs)
        pyod_based = run_pyod_anomaly(logs)

        results.append({
            "filename": fname,
            "rule_based_anomalies": rule_based,
            "pyod_anomalies": pyod_based
        })

    last_analysis_results = results
    return {"analysis_results": results}

@app.post("/query/")
def nlp_query(prompt: str = Form(...)):
    if not last_analysis_results:
        return {"error": "❌ Please run analysis first before querying."}
    
    try:
        interpreted = interpret_prompt(prompt, last_analysis_results)
        return {"structured_query": interpreted}
    except ValueError as e:
        return {"error": str(e)}
