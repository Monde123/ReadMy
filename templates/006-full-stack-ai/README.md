<!-- READMY_TEMPLATE: 006-full-stack-ai -->
<div align="center">

# Marcus Chen
### Full-Stack AI Architect • Agentic Systems & Production LLM Applications

Bridging high-performance web frontends with resilient agentic workflows, structured JSON validation, and deterministic evaluations.

<p>
  <img src="https://img.shields.io/badge/Frontend-Next.js_15_•_React_19-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Orchestration-FastAPI_•_Celery-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Vector_DB-Qdrant_•_pgvector-E6007A?style=flat-square" alt="Vector DB" />
  <img src="https://img.shields.io/badge/Telemetry-OpenInference_•_Langfuse-6366F1?style=flat-square" alt="Langfuse" />
</p>

</div>

---

## 🗺️ Full-Stack AI System Topology

```text
┌────────────────────────────────────────────────────────────────────────┐
│  CLIENT TIER : Next.js 15 App Router + Server Actions + SSE Streaming  │
└────────────────────────────────────────────────────────────────────────┘
                                    │ (mTLS / HTTP2 Streaming)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  ORCHESTRATION TIER : FastAPI Async Gateway + Pydantic v2 Schema Gate │
└────────────────────────────────────────────────────────────────────────┘
            │                                               │
            ▼ (Vector Similarity & RAG)                     ▼ (Async Job Queue)
┌──────────────────────────────────────┐        ┌────────────────────────┐
│ pgvector / Qdrant Hybrid Search      │        │ Redis + Celery Workers │
└──────────────────────────────────────┘        └────────────────────────┘
            │                                               │
            └───────────────────────┬───────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  AI INFERENCE TIER : Structured Function Calling + Fallback Provider  │
│  Primary: Claude 3.5 Sonnet / GPT-4o ────▶ Failover: Local Ollama LLaMA│
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  OBSERVABILITY TIER : Langfuse Traces + Token Cost Metering + Evals   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Full-Stack Technical Capabilities

| Layer | Primary Technologies | Production Implementations |
| :--- | :--- | :--- |
| **Frontend & UI** | `Next.js 15`, `React 19`, `Tailwind v4`, `Radix UI` | Streaming markdown parser, optimistic UI state, token typing animations |
| **Orchestration** | `FastAPI`, `Python 3.12`, `Pydantic`, `Instructor` | Strict JSON-schema outputs, retry backoff with temperature adjustments |
| **Memory & Storage** | `PostgreSQL`, `pgvector`, `Redis`, `Supabase` | Semantic cache with 90-day TTL, chat history session serialization |
| **Evaluation** | `Ragas`, `DeepEval`, `Langfuse`, `Pytest` | Automated hallucination regression suites triggered on pull requests |

---

## 🚀 Flagship Shipped AI Products

<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <h3>🤖 <a href="#agent-craft">AgentCraft Studio</a></h3>
      <p><em>Autonomous code refactoring assistant with sandbox execution.</em></p>
      <ul>
        <li>Docker-isolated execution environments for testing PR changes.</li>
        <li>Dual-agent review loop: Generator Agent + Static Analysis Verifier.</li>
        <li>12,000 merged pull requests across 350 open-source repositories.</li>
      </ul>
      <p>
        <img src="https://img.shields.io/badge/Stack-FastAPI_+_Next.js-blue?style=flat-square" alt="Stack" />
        <img src="https://img.shields.io/badge/Security-gVisor_Sandbox-red?style=flat-square" alt="Sandbox" />
      </p>
    </td>
    <td width="50%" valign="top">
      <h3>📑 <a href="#docu-sift">DocuSift Enterprise</a></h3>
      <p><em>High-throughput multimodal document intelligence platform.</em></p>
      <ul>
        <li>Processes scanned PDFs, complex financial tables, and handwritten notes.</li>
        <li>Hybrid sparse-dense retrieval over 500,000 indexed pages.</li>
        <li>Confidence scoring with automated routing to human-in-the-loop reviewers.</li>
      </ul>
      <p>
        <img src="https://img.shields.io/badge/Model-Vision_LLM-purple?style=flat-square" alt="Vision" />
        <img src="https://img.shields.io/badge/Accuracy-99.2%25-green?style=flat-square" alt="Accuracy" />
      </p>
    </td>
  </tr>
</table>

---

## 🎯 Production AI Principles

- **No Blind Outputs:** Every LLM response is validated against a Pydantic schema before hitting frontend state.
- **Fail Gracefully:** If cloud models experience latency spikes or outages, requests automatically fall back to local quantized engines.
- **Cost Consciousness:** Transparent token cost calculation per user session tracked in real-time.

---

<div align="center">

### 🌐 Connect & Code

[GitHub](https://github.com/example-user) • [Live Demos](https://marcus.ai) • [Technical Writings](https://marcus.ai/blog) • [Email](mailto:marcus@marcus.ai)

<sub>Building resilient, production-ready AI software from client pixels to model weights.</sub>

</div>
