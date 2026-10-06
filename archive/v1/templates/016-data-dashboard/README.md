<!-- READMY_TEMPLATE: 016-data-dashboard -->
<div align="center">

# Devon Rhodes
### Principal Data Architect • Analytics Engineering & High-Throughput Pipelines

Architecting modern lakehouse platforms, real-time event streaming architectures, and deterministic data contracts.

<p>
  <img src="https://img.shields.io/badge/Daily_Ingestion-14.8_TB_/_day-0284c7?style=flat-square" alt="Daily Ingestion" />
  <img src="https://img.shields.io/badge/Streaming_Events-4.2B_/_day-7c3aed?style=flat-square" alt="Streaming Events" />
  <img src="https://img.shields.io/badge/Query_p95-&lt;_450ms-059669?style=flat-square" alt="Query Latency" />
  <img src="https://img.shields.io/badge/Data_Freshness-&lt;_60s_SLA-f59e0b?style=flat-square" alt="Data Freshness" />
</p>

</div>

---

## 📊 Lakehouse Architecture & Ingestion Flow

```text
[ OLTP Databases / CDC ]     [ Event Logs / Kafka ]     [ 3rd-Party APIs / Webhooks ]
           │                            │                            │
           ▼                            ▼                            ▼
┌────────────────────────────────────────────────────────────────────────┐
│  BRONZE LAYER (Raw Ingestion): Apache Iceberg Tables on AWS S3 / MinIO │
│  Format: Parquet (Snappy Compressed) • Zero Schema Mutability         │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼ (dbt Core + Apache Spark Engine)
┌────────────────────────────────────────────────────────────────────────┐
│  SILVER LAYER (Conformed & Cleaned): Deduplication, PII Masking, SCD-2 │
│  Data Quality: Great Expectations CI Gates + Soda Core Anomaly Checks  │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼ (Dimensional Star Schemas)
┌────────────────────────────────────────────────────────────────────────┐
│  GOLD LAYER (Analytics & Serving): ClickHouse + Snowflake Data Marts   │
│  Access Tier: Cube.js Semantic Layer ──▶ Sub-second BI Dashboards      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Modern Data Stack & Tooling Matrix

| Lakehouse Tier | Technologies Enforced | Production Workload & Invariants |
| :--- | :--- | :--- |
| **Ingestion & Streaming**| `Apache Kafka`, `Redpanda`, `Debezium CDC` | Distributed log partitioning with exact-once semantics (EOS) |
| **Storage & Lakehouse** | `Apache Iceberg`, `Apache Parquet`, `AWS S3` | ACID table format with snapshot isolation and time-travel queries |
| **Transformation Engine**| `dbt Core`, `SQLMesh`, `DuckDB`, `Apache Spark` | Declarative dependency DAGs with automated schema drift checks |
| **Analytical Serving** | `ClickHouse`, `Snowflake`, `Trino` | Materialized views optimizing aggregate rollups across 10B rows |
| **Governance & Quality**| `Monte Carlo`, `Great Expectations`, `DataHub`| Automated alert routing when schema drift violates downstream SLAs |

---

## 📈 Flagship Data Products & Dimensional Marts

<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <h3>⚡ <a href="#financial-lakehouse">FinPulse Real-Time Mart</a></h3>
      <p><em>Sub-minute settlement analytics platform processing multi-currency trades.</em></p>
      <ul>
        <li>Replaced fragile batch cron jobs with continuous Kafka stream processing.</li>
        <li>Decreased month-end reconciliation calculation runtime from 18 hours to 4 minutes.</li>
        <li>Zero data discrepancy across $2.4B in settled ledger transactions.</li>
      </ul>
      <p>
        <img src="https://img.shields.io/badge/Stack-ClickHouse_+_dbt-blue?style=flat-square" alt="Stack" />
        <img src="https://img.shields.io/badge/SLA-99.99%25-green?style=flat-square" alt="SLA" />
      </p>
    </td>
    <td width="50%" valign="top">
      <h3>🔍 <a href="#contract-engine">SchemaContract Framework</a></h3>
      <p><em>Open-source data contract enforcer preventing upstream breaking changes.</em></p>
      <ul>
        <li>Builds JSON-Schema and Protobuf gates into microservice release pipelines.</li>
        <li>Blocks pull requests that remove or alter semantic warehouse columns.</li>
        <li>Eliminated 100% of surprise schema-induced pipeline breaks in 2026.</li>
      </ul>
      <p>
        <img src="https://img.shields.io/badge/License-Apache_2.0-orange?style=flat-square" alt="Apache 2.0" />
        <img src="https://img.shields.io/badge/Stars-1.2k-yellow?style=flat-square" alt="Stars" />
      </p>
    </td>
  </tr>
</table>

---

## 🛡️ Data Quality Covenant & Governance SLAs

- **Schema Immutability:** No production table can be modified without a backward-compatible migration script.
- **Freshness Guarantees:** Critical operational metrics refresh within 60 seconds; financial rollups within 5 minutes.
- **Lineage Transparency:** 100% of warehouse tables feature automated upstream/downstream lineage graphs.

---

<div align="center">

### 📊 Connect & Data Architecture Inquiries

[dbt Portfolio](https://github.com/example-user) • [Data Engineering Blog](https://devonrhodes.data) • [LinkedIn](https://linkedin.com) • [Email Devon](mailto:devon@lakehouse-architect.io)

<sub>"Data without verified contracts is just an unmonitored liability waiting to break."</sub>

</div>
