<!-- READMY_TEMPLATE: 012-timeline-journey -->
<div align="center">

# Maya Lin
### Staff Systems Engineer • 9-Year Distributed Systems Evolution

A transparent chronological record of architectural bets, failure post-mortems, and technical leadership milestones.

<p>
  <img src="https://img.shields.io/badge/Career_Span-2017_➔_Present-1e293b?style=flat-square" alt="Career Span" />
  <img src="https://img.shields.io/badge/Focus-High_Throughput_Data_Engines-0284c7?style=flat-square" alt="Focus" />
  <img src="https://img.shields.io/badge/Post_Mortems_Published-32-059669?style=flat-square" alt="Post Mortems" />
  <img src="https://img.shields.io/badge/Engineers_Mentored-24-4338ca?style=flat-square" alt="Mentored" />
</p>

</div>

---

## 🧭 The 9-Year Engineering Timeline

```text
2017 ── Graduate Software Engineer • CloudPulse
 │   ├── Deployed first production Python microservices on AWS EC2
 │   └── [Lesson]: Microservices introduce distributed complexity long before they solve scaling.
 │
2019 ── Backend Engineer • StreamMesh Corp
 │   ├── Migrated event ingestion pipeline from REST to Apache Kafka (500k msg/s)
 │   └── [Lesson]: Backpressure and partition rebalancing must be tested with chaos injection early.
 │
2021 ── Senior Distributed Systems Engineer • HyperBase
 │   ├── Rewrote storage indexing engine in Rust (cut memory footprint by 64%)
 │   ├── Survived major Black Friday traffic peak with zero downtime
 │   └── [Lesson]: Mechanical sympathy and zero-copy buffers beat premature horizontal scaling.
 │
2023 ── Lead Infrastructure Architect • Apex Global
 │   ├── Spearheaded multi-region active-active database migration for 18M users
 │   ├── Authored company-wide RFC governance charter and architectural review board
 │   └── [Lesson]: Culture and clear RFC contracts scale faster than any cloud compute cluster.
 │
2025 ── Staff Systems Engineer • Project Sovereign
 │   ├── Architecting sovereign local-first AI runtimes and low-latency edge caches
 └── [Present]: Focused on deterministic state machines and reproducible build systems.
```

---

## 💡 Critical Architectural Bets & Retrospectives

| Year | The Critical Bet | Conventional Wisdom at the Time | The Retrospective Outcome |
| :---: | :--- | :--- | :--- |
| **2019** | **PostgreSQL over NoSQL for Time-Series** | "Use MongoDB or Cassandra for all analytics." | PostgreSQL with TimescaleDB extension gave us ACID compliance + SQL analytics with zero operational drift. |
| **2021** | **Monorepo with Bazel / Turborepo** | "Every team should have their own git repo." | Unified contracts, single atomic atomic pull requests, zero cross-repo version drift. |
| **2023** | **Eliminating GraphQL in Favor of gRPC** | "GraphQL is the ultimate unified API layer." | Protobuf contracts reduced serialization latency by 72% and removed arbitrary N+1 database query abuse. |

---

## 🔄 Technology Lifecycle: Adopted vs Retired

| Lifecycle Stage | Technologies & Frameworks | Strategic Rationale |
| :--- | :--- | :--- |
| **Active Focus** | `Rust`, `Go`, `ClickHouse`, `Linux eBPF`, `NATS` | Predictable latency, explicit error models, zero GC pause overhead |
| **Maintained** | `TypeScript`, `PostgreSQL`, `Docker`, `Kubernetes` | Battle-tested industry standards with mature tooling ecosystems |
| **Retired** | `Java Spring Boot`, `MongoDB`, `Webpack`, `REST APIs` | Replaced by faster compile times, simpler primitives, and strict contracts |

---

<div align="center">

### 📖 Read the Full Technical Retrospectives

[Engineering Essays & Post-Mortems](https://mayalin.engineering/retrospectives) • [GitHub](https://github.com/example-user) • [Email Maya](mailto:maya@systems-journey.org)

<sub>"Experience is not merely the number of years spent writing code, but the number of assumptions corrected by reality."</sub>

</div>
