# Coordinated Badge Wall (Slate / Monochrome Theme)

A cohesive Shields.io badge wall that uses unified palette tokens (`style=flat-square` with slate/navy background), preventing the disjointed "rainbow confetti" look common in generic templates.

## Preview & Markdown Snippet

```markdown
<!-- READMY_COMPONENT: coordinated-pill-wall -->
## 💻 Engineering Toolchain

#### Languages & Compilers
<p>
  <img src="https://img.shields.io/badge/Rust-000000?style=flat-square&logo=rust&logoColor=white" alt="Rust" />
  <img src="https://img.shields.io/badge/Go-000000?style=flat-square&logo=go&logoColor=white" alt="Go" />
  <img src="https://img.shields.io/badge/TypeScript-000000?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Python-000000?style=flat-square&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/C++20-000000?style=flat-square&logo=c%2B%2B&logoColor=white" alt="C++" />
</p>

#### Cloud & Runtime Infrastructure
<p>
  <img src="https://img.shields.io/badge/Linux_Kernel-1e293b?style=flat-square&logo=linux&logoColor=white" alt="Linux" />
  <img src="https://img.shields.io/badge/Kubernetes-1e293b?style=flat-square&logo=kubernetes&logoColor=white" alt="Kubernetes" />
  <img src="https://img.shields.io/badge/Docker-1e293b?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/AWS-1e293b?style=flat-square&logo=amazon-aws&logoColor=white" alt="AWS" />
  <img src="https://img.shields.io/badge/Terraform-1e293b?style=flat-square&logo=terraform&logoColor=white" alt="Terraform" />
</p>

#### Data Pipelines & Storage
<p>
  <img src="https://img.shields.io/badge/PostgreSQL-334155?style=flat-square&logo=postgresql&logoColor=white" alt="Postgres" />
  <img src="https://img.shields.io/badge/Apache_Kafka-334155?style=flat-square&logo=apachekafka&logoColor=white" alt="Kafka" />
  <img src="https://img.shields.io/badge/Redis-334155?style=flat-square&logo=redis&logoColor=white" alt="Redis" />
  <img src="https://img.shields.io/badge/ClickHouse-334155?style=flat-square&logo=clickhouse&logoColor=white" alt="ClickHouse" />
</p>
<!-- END_READMY_COMPONENT -->
```

## Customization Guide

- Uniform color values:
  - Header tier: `000000` (Pitch Black)
  - Infra tier: `1e293b` (Slate 800)
  - Data tier: `334155` (Slate 700)
- Logos are fetched from Simple Icons via the `logo=` query parameter.
- Preserves a clean, architectural visual identity on both dark and light GitHub themes.
