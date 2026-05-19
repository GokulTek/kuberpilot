# 🚀 KubePilot

AI-powered Kubernetes troubleshooting platform built with FastAPI, React, Kubernetes, Ollama, Prometheus, and Grafana.

---

## 📌 Overview

KubePilot is an AI-driven Kubernetes operations dashboard that helps analyze pod failures, inspect Kubernetes logs, and provide intelligent troubleshooting suggestions using local LLMs.

The platform integrates:

* Kubernetes
* Ollama (Llama3)
* FastAPI
* React
* Docker
* Prometheus
* Grafana

to create a modern cloud-native AI troubleshooting experience.

---

## ✨ Features

* 🔍 AI-powered Kubernetes pod log analysis
* ☸️ Kubernetes cluster integration
* 📈 Prometheus monitoring
* 📊 Grafana dashboards
* 🐳 Dockerized backend
* ⚡ Kubernetes scaling & self-healing demos
* 🤖 Local LLM integration using Ollama
* 🌐 Modern React frontend dashboard
* 🧠 AI-generated troubleshooting suggestions

---

## 🏗 Architecture

```text
React Frontend
       ↓
FastAPI Backend
       ↓
Kubernetes Python Client
       ↓
Kubernetes Cluster
       ↓
Ollama (Llama3)
       ↓
AI Troubleshooting Response
```

---

## 🛠 Tech Stack

### Frontend

* React
* Vite
* Axios
* Framer Motion
* Lucide React

### Backend

* FastAPI
* Python
* Kubernetes Python Client
* Ollama

### DevOps / Infrastructure

* Docker
* Kubernetes (Kind)
* Prometheus
* Grafana

---

## 📸 Screenshots

### Dashboard

<img width="959" height="599" alt="image" src="https://github.com/user-attachments/assets/7540a809-df50-4e7e-81b4-51b9a13a0213" />


### AI Analysis

<img width="956" height="599" alt="image" src="https://github.com/user-attachments/assets/96924c08-853b-46ad-a96a-8bc7603d1576" />


### Grafana Monitoring

<img width="959" height="599" alt="image" src="https://github.com/user-attachments/assets/21208e47-c554-4c34-82b5-1117afac26a1" />


### Prometheus

<img width="959" height="599" alt="image" src="https://github.com/user-attachments/assets/70fe6807-0aac-4576-a179-1a8e2c488b26" />


---

## HOW TO ACCESS
## ▶️ Accessing Services

### 🚀 Frontend Dashboard

Run frontend:

```bash id="y4b4yd"
cd frontend
npm run dev
```

Open:

```text id="jlwm92"
http://localhost:5173
```

---

### ⚡ FastAPI Backend

Run backend:

```bash id="jlwm93"
py -m uvicorn main:app --reload
```

Open Swagger API:

```text id="jlwm94"
http://127.0.0.1:8000/docs
```

---

### ☸️ Kubernetes Pods

View running Kubernetes pods:

```bash id="jlwm95"
kubectl get pods
```

View pod logs:

```bash id="jlwm96"
kubectl logs POD_NAME
```

---

### 📈 Prometheus Dashboard

Start port forwarding:

```bash id="jlwm97"
kubectl port-forward svc/prometheus-server 9090:80
```

Open:

```text id="jlwm98"
http://localhost:9090
```

---

### 📊 Grafana Dashboard

Start port forwarding:

```bash id="jlwm99"
kubectl port-forward svc/grafana 3000:80
```

Open:

```text id="jlwm100"
http://localhost:3000
```

Default login:

```text id="jlwm101"
Username: admin
Password: (generated Kubernetes secret)
```

---

### 🤖 Ollama AI

Run Ollama:

```bash id="jlwm102"
ollama run llama3
```

Verify model:

```bash id="jlwm103"
ollama list
```

---

### 🧠 AI Pod Analysis

Use the frontend dashboard:

1. Copy Kubernetes pod name
2. Paste into KubePilot dashboard
3. Click:

```text id="jlwm104"
Analyze Pod
```

KubePilot will:

* fetch real Kubernetes logs
* analyze them using AI
* generate troubleshooting suggestions


## ⚙️ Backend Setup

```bash
pip install -r requirements.txt
py -m uvicorn main:app --reload
```

---

## ⚙️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## ☸️ Kubernetes Setup

```bash
kind create cluster --name kubepilot
kubectl apply -f kubernetes/
```

---

## 🤖 Ollama Setup

Install Ollama:

https://ollama.com

Run model:

```bash
ollama run llama3
```

---

## 📈 Monitoring Stack

### Prometheus

```bash
helm install prometheus prometheus-community/prometheus
```

### Grafana

```bash
helm install grafana grafana/grafana
```

---

## 🚧 Future Improvements

* Multi-cluster support
* AI remediation suggestions
* Slack/Discord alerts
* Helm chart packaging
* AKS/EKS/GKE deployment
* RAG-based Kubernetes knowledge assistant
* Authentication & RBAC
* Real-time event streaming

---

## 👨‍💻 Author

Gokul

Cloud & DevOps Engineer
