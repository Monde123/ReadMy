<!-- READMY_TEMPLATE: 003-ai-engineer -->
<div align="center">

# Dr. Elena Rostova
### Senior Machine Learning Systems Engineer • LLM Inference & Alignment

Specializing in distributed model training, quantized tensor runtimes (vLLM / TensorRT-LLM), and scalable retrieval pipelines.

<p>
  <img src="https://img.shields.io/badge/Model_Runtime-vLLM_•_TensorRT--LLM-76B900?style=flat-square&logo=nvidia&logoColor=white" alt="NVIDIA" />
  <img src="https://img.shields.io/badge/PyTorch-2.5-EE4C2C?style=flat-square&logo=pytorch&logoColor=white" alt="PyTorch" />
  <img src="https://img.shields.io/badge/CUDA_Compute-8x_H100_SXM5-000000?style=flat-square" alt="CUDA Compute" />
  <img src="https://img.shields.io/badge/HuggingFace-elena--rostova-FFD21E?style=flat-square&logo=huggingface&logoColor=black" alt="HuggingFace" />
</p>

</div>

---

## 🎛️ Model Registry & Evaluation Benchmark Matrix

| Model Identifier | Base Architecture | Param Count | Quantization | Benchmark (MMLU-Pro / GSM8K) | Latency (TTFT / TPS) |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **`Aura-Reason-7B`** | LLaMA-3.1 Fine-Tune | `7.2B` | `AWQ 4-bit` | `74.8%` / `88.2%` | `18ms` / `142 tok/s` |
| **`Vektor-Embed-v2`**| ModernBERT Custom | `340M` | `FP16` | `MTEB Score: 68.4` | `4.2ms` / `N/A` |
| **`Chronos-Code-14B`**| Qwen-2.5 Distillation | `14.7B` | `GPTQ 8-bit` | `HumanEval: 79.4%` | `32ms` / `98 tok/s` |

---

## 🔄 Low-Latency Inference & Grounding Pipeline

```text
[ User Prompt ] 
       │ (Streaming SSE / gRPC)
       ▼
┌────────────────────────────────────────────────────────┐
│  Guardrail Filter (Llama-Guard-3 + Regex Jailbreak)   │
└────────────────────────────────────────────────────────┘
       │                                         │
       ▼ (Vector Semantic Search)                ▼ (BM25 Hybrid Sparse)
┌──────────────────────────────┐         ┌──────────────────────────────┐
│  Qdrant HNSW Collection      │         │  Elasticsearch Inverted Index │
└──────────────────────────────┘         └──────────────────────────────┘
       │                                         │
       └────────────────────┬────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│  Cross-Encoder Re-Ranker (bge-reranker-large, top-5)   │
└────────────────────────────────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│  vLLM Engine (PagedAttention + Speculative Decoding)   │
│  Hardware: NVIDIA H100 80GB (NVLink 900 GB/s)          │
└────────────────────────────────────────────────────────┘
                            │
                            ▼ (Output Token Stream, p99 < 25ms)
```

---

## 🚀 Shipped Open Weights & Production Systems

<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <h3>🧠 <a href="#aura-reason">Aura-Reason-7B</a></h3>
      <p><em>Open weights reasoning model trained with Direct Preference Optimization (DPO).</em></p>
      <ul>
        <li>100k curated chain-of-thought synthetic dialogue pairs.</li>
        <li>Curated filtering for hallucinations via verifiable code execution sandboxes.</li>
        <li>Downloaded over 180,000 times on HuggingFace Hub.</li>
      </ul>
      <p>
        <img src="https://img.shields.io/badge/License-Apache_2.0-blue?style=flat-square" alt="Apache 2.0" />
        <img src="https://img.shields.io/badge/Downloads-180k+-green?style=flat-square" alt="Downloads" />
      </p>
    </td>
    <td width="50%" valign="top">
      <h3>⚡ <a href="#turborag">TurboRAG Engine</a></h3>
      <p><em>Asynchronous distributed RAG pipeline processing 4,000 queries per second.</em></p>
      <ul>
        <li>Zero-copy tensor cache across GPU shared host memory.</li>
        <li>Automated chunking with AST-aware code parsing.</li>
        <li>Sub-50ms p99 end-to-end question answering latency.</li>
      </ul>
      <p>
        <img src="https://img.shields.io/badge/Language-Rust_&_Python-orange?style=flat-square" alt="Rust & Python" />
        <img src="https://img.shields.io/badge/Status-Production-emerald?style=flat-square" alt="Production" />
      </p>
    </td>
  </tr>
</table>

---

## 💻 MLOps & Training Infrastructure

| Domain | Frameworks & Compute | Production Workloads |
| :--- | :--- | :--- |
| **Distributed Training** | `PyTorch Distributed`, `DeepSpeed ZeRO-3`, `Megatron-LM` | 3D parallelism across multi-node SLURM GPU clusters |
| **Inference Serving** | `vLLM`, `TensorRT-LLM`, `TGI`, `Triton Inference Server` | PagedAttention, continuous batching, chunked prefill |
| **Evaluation & Datasets** | `Lighteval`, `lm-evaluation-harness`, `Weights & Biases` | Automated regression sweeps, automated synthetic data pipelines |

---

<div align="center">

### 🔬 Research Collaborations & Weights Inquiries

[HuggingFace Profile](https://huggingface.co/example-user) • [Google Scholar](https://scholar.google.com) • [arXiv Papers](https://arxiv.org) • [Email Elena](mailto:elena@ai-systems.org)

> *"Models are only as good as the evaluation harnesses that measure them."*

</div>
