from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from ollama import Client
from kubernetes import client, config

app = FastAPI()

# -----------------------------
# CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Request Models
# -----------------------------
class LogRequest(BaseModel):
    logs: str


class PodRequest(BaseModel):
    pod_name: str


# -----------------------------
# Home Route
# -----------------------------
@app.get("/")
def home():
    return {"message": "KubePilot Running"}


# -----------------------------
# Analyze Raw Logs
# -----------------------------
@app.post("/analyze")
def analyze_logs(request: LogRequest):

    prompt = f"""
You are KubePilot AI.

Analyze these Kubernetes pod logs.

Return the answer in CLEAN MARKDOWN FORMAT.

Use this structure:

# Issue
Explain the problem briefly.

# Root Cause
Explain why it happened.

# Suggested Fix
Provide step-by-step fix.

# Severity
Low / Medium / High

# Best Practice
Mention how to avoid this issue in production.

Logs:

{request.logs}

Explain:
1. What is the problem
2. Possible reason
3. Suggested fix
Keep answer simple.
"""

    try:
        ollama_client = Client(
            host="http://localhost:11434"
        )

        response = ollama_client.chat(
            model="llama3",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return {
            "analysis": response["message"]["content"]
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Ollama error: {str(e)}"
        )


# -----------------------------
# Analyze Kubernetes Pod
# -----------------------------
@app.post("/analyze-pod")
def analyze_pod(request: PodRequest):

    try:
        # Load Kubernetes config
        config.load_kube_config()

        # Kubernetes API client
        v1 = client.CoreV1Api()

        # Get pod logs
        logs = v1.read_namespaced_pod_log(
            name=request.pod_name,
            namespace="default"
        )

    except Exception:
        raise HTTPException(
            status_code=404,
            detail="Pod not found in Kubernetes cluster"
        )

    prompt = f"""
    You are a Kubernetes troubleshooting expert.

    Analyze these Kubernetes pod logs:

    {logs}

    Explain:
    1. What is the issue
    2. Root cause
    3. Suggested fix

    Keep answer simple.
    """

    try:
        ollama_client = Client(
            host="http://localhost:11434"
        )

        response = ollama_client.chat(
            model="llama3",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return {
            "pod": request.pod_name,
            "analysis": response["message"]["content"]
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"AI analysis failed: {str(e)}"
        )