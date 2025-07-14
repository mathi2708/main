import google.generativeai as genai
import json
import os

# Set your API key (recommended to use an env variable in production)
GOOGLE_API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyB_QeCwtR6UoKX9qkB2tNzl1ZfU41AH-FA")
genai.configure(api_key=GOOGLE_API_KEY)

def interpret_prompt(prompt: str, anomaly_results: list[dict]) -> dict:
    try:
        model = genai.GenerativeModel("gemini-pro")

        system_prompt = (
            "You are a smart assistant that helps analyze anomaly results from shipping logs. "
            "Each anomaly includes shipper_id, timestamp, service_level_code, cc_country, etc. "
            "Answer the user's question based on the anomaly data."
        )

        # Gemini works best when prompted as a conversation
        content = [
            {"role": "user", "parts": [
                f"{system_prompt}\n\nAnomalies JSON:\n{json.dumps(anomaly_results[:20], indent=2)}\n\nUser Question:\n{prompt}"
            ]}
        ]

        response = model.generate_content(content)
        return {"answer": response.text}

    except Exception as e:
        return {"error": f"❌ Gemini API call failed: {str(e)}"}
