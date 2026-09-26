# Categorized Technology Matrix

A 4-quadrant engineering capability matrix grouping systems by functional tier (Systems & Core, Storage & Data, Platform & Cloud, Observability & Tooling).

## Preview & Markdown Snippet

```markdown
<!-- READMY_COMPONENT: categorized-tables -->
## 🛠️ Technical Capabilities & Systems Matrix

| Layer | Primary Technologies | Production Competencies |
| :--- | :--- | :--- |
| **Languages & Core** | `Go`, `Rust`, `TypeScript`, `Python`, `SQL` | Concurrency primitives, lock-free queues, type-level programming, memory optimization |
| **Data & Storage** | `PostgreSQL`, `ClickHouse`, `Redis`, `Kafka` | WAL tuning, custom partitioning, distributed consumer groups, caching strategies |
| **Platform & Infra** | `Kubernetes`, `Terraform`, `Docker`, `eBPF` | GitOps workflows (ArgoCD), multi-cluster ingress, CNI network policies, zero-trust |
| **Observability & Ops** | `Prometheus`, `Grafana`, `OpenTelemetry`, `Jaeger` | Distributed trace propagation, p99 latency SLOs, alerting runbooks, incident response |
<!-- END_READMY_COMPONENT -->
```

## Customization Guide

- Rows represent clear engineering domains rather than loose keyword bags.
- The "Production Competencies" column explains *how* the technology is applied rather than just listing its name.
