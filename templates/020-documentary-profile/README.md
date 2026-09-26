<!-- READMY_TEMPLATE: 020-documentary-profile -->
<div align="center">

```text
====================================================================================================
 [📽️] SYSTEMS ARCHAEOLOGY & TECHNICAL CASE STUDIES // FORENSICS OF LARGE-SCALE COMPUTING
====================================================================================================
```

# Dr. Henrik Lindqvist
### Principal Systems Investigator • Failure Forensics & Architecture Documentarian

Documenting the anatomy of complex distributed systems failures, distributed consensus edge cases, and post-incident platform evolutions.

<p>
  <img src="https://img.shields.io/badge/Studies_Published-18_Case_Studies-1e293b?style=flat-square" alt="Studies" />
  <img src="https://img.shields.io/badge/Incidents_Deconstructed-45_Post--Mortems-dc2626?style=flat-square" alt="Incidents" />
  <img src="https://img.shields.io/badge/Discipline-Systems_Forensics-0284c7?style=flat-square" alt="Discipline" />
  <img src="https://img.shields.io/badge/Integrity-Zero_Blame-059669?style=flat-square" alt="Zero Blame" />
</p>

</div>

---

## 🔍 Featured Documentary Case: The 38-Minute Cascading Partition

<details open>
  <summary><strong>CASE STUDY #14: Anatomy of a Multi-Region Quorum Collapse under Asymmetric Packet Loss</strong></summary>
  <br/>
  
  <h4>1. The Initial Anomaly (04:12 UTC)</h4>
  <p>A routine optical fiber degradation between Frankfurt and Dublin caused asymmetric packet loss (12% outbound, 0.2% inbound). While TCP retransmissions masked the degradation for ordinary HTTP requests, the distributed Raft heartbeat mechanism entered an oscillating leader election state.</p>

  <h4>2. The Cascade Dynamics (04:18 UTC)</h4>
  <p>Leader leases lapsed concurrently across three zones. Nodes in Dublin repeatedly initiated election terms with higher term counters, preempting Frankfurt's committed leaders without possessing sufficient cross-region ACKs to achieve quorum progress. Client requests backed up into connection pools, triggering widespread worker thread pool exhaustion.</p>

  <h4>3. The Forensic Discovery & Root Cause</h4>
  <p>Static analysis of the consensus state machine revealed a subtle race condition between lease expiration timers and socket connection resets: the node was resetting its election timer <em>before</em> verifying if heartbeat packets originated from a valid term.</p>

  <h4>4. The Architectural Remediation</h4>
  <ul>
    <li>Implemented <strong>Pre-Vote protocol extensions</strong> (Raft thesis section 9.6) ensuring candidates verify connectivity before incrementing terms.</li>
    <li>Added adaptive heartbeat jitter calibrated against exponential moving average network round-trip time.</li>
    <li>Decommissioned blind health checks in favor of active synthetic canaries.</li>
  </ul>
  
  <p>
    <a href="https://example.com/cases/case-14"><strong>Read Full 24-Page Technical Breakdown (PDF) →</strong></a>
  </p>
</details>

---

## 📚 The Forensic Case Archive

| Case Dossier | Target Architecture | Scale & Load | Incident Classification & Resolution |
| :---: | :--- | :--- | :--- |
| **Case #17** | Global Payment Clearing Cluster | €4.2B / day | **Thread Pool Lock Contention:** Identified hidden synchronized block in legacy JVM TLS termination layer. |
| **Case #15** | Serverless Edge Storage Engine | 140M DAU | **Cold-Start Cascade Under DNS Failover:** Re-architected connection reuse with keep-alive pooling. |
| **Case #12** | Autonomous Telemetry Lakehouse | 12 TB / hr | **Kafka Partition Starvation:** Resolved skewed hash distribution via custom murmur3 compound partitioners. |
| **Case #09** | Distributed Vector Database | 800M vectors | **Memory Arena Fragmentation:** Migrated from glibc malloc to jemalloc with dirty page purging. |

---

## 🧭 Systems Archaeology Philosophy

> *"To understand a system is not merely to diagram its intended happy path, but to document how it breaks under real physical constraints: thermal throttling, fiber cuts, memory bit flips, and human operational fatigue."*

1. **Blameless Inquiry:** Complex failures arise from conflicting operational incentives and non-linear emergent behaviors, never single human errors.
2. **Deep Artifact Preservation:** Every case study includes full TLA+ state models, sanitized packet traces, and reproducible benchmark harnesses.

---

<div align="center">

### 📖 Access the Research Archive

[Full Case Repository](https://example.com/cases) • [TLA+ Specifications](https://github.com/example-user) • [Email Henrik](mailto:henrik@systems-archaeology.org)

<sub>Preserving operational history so future engineers build upon hard-won wisdom.</sub>

</div>
