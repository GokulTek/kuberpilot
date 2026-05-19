import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function App() {
  const [podName, setPodName] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzePod = async () => {
    if (!podName) {
      setResponse("Please enter a pod name");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/analyze-pod",
        {
          pod_name: podName,
        }
      );

      setResponse(res.data.analysis);
    } catch (error) {
      console.log(error);
      setResponse("Cannot connect to FastAPI backend");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#020617",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              fontSize: "52px",
              fontWeight: "bold",
            }}
          >
            🚀 KubePilot Dashboard
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "20px",
              marginTop: "10px",
            }}
          >
            AI-powered Kubernetes troubleshooting
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "40px",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            placeholder="Enter pod name"
            value={podName}
            onChange={(e) => setPodName(e.target.value)}
            style={{
              width: "500px",
              padding: "16px",
              borderRadius: "10px",
              border: "1px solid #334155",
              backgroundColor: "#111827",
              color: "white",
              fontSize: "16px",
            }}
          />

          <button
            onClick={analyzePod}
            style={{
              padding: "16px 24px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#2563eb",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Analyze Pod
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            marginTop: "40px",
            backgroundColor: "#111827",
            padding: "30px",
            borderRadius: "20px",
            lineHeight: "1.8",
          }}
        >
          {loading ? (
            <h2>Analyzing Kubernetes logs...</h2>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "20px",
                }}
              >
                <Rocket size={28} />
                <h2>AI Analysis</h2>
              </div>

              <div
                style={{
                  color: "#e2e8f0",
                  fontSize: "18px",
                }}
              >
                <ReactMarkdown>
                  {response || "Analysis will appear here"}
                </ReactMarkdown>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}