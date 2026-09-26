<!-- READMY_TEMPLATE: 011-academic-profile -->
<div align="center">

# Prof. Julian Moreau, Ph.D.
### Associate Professor of Computer Science • Chair of Reliable Systems Lab
**Informatics Department • Institute for Advanced Scientific Computing**

<p>
  <a href="https://orcid.org"><img src="https://img.shields.io/badge/ORCID-0000--0002--1825--0097-A6CE39?style=flat-square&logo=orcid&logoColor=white" alt="ORCID" /></a>
  <img src="https://img.shields.io/badge/Citations-3%2C420-blue?style=flat-square" alt="Citations" />
  <img src="https://img.shields.io/badge/h--index-24-indigo?style=flat-square" alt="h-index" />
  <img src="https://img.shields.io/badge/Open_Access-Green_OA-059669?style=flat-square" alt="Open Access" />
</p>

</div>

> **Research Focus:** Formal verification of distributed consensus protocols, verified cryptographic compilers, and semantic safety in concurrent memory models.

---

## 📐 Mathematical Formulation: Bounded Quorum Safety

The primary theoretical invariant established in our lab guarantees monotonic quorum progression under partial synchrony:

```text
∀ e, e' ∈ Epochs,  e < e'  ⟹  
    ( Majority(Q_e) ∩ Majority(Q_e') ≠ ∅ )  ∧  
    ( MaxTerm(Q_e') ≥ CommittedTerm(Q_e) )
```

> Under any network partition $\Delta \le \infty$, state transitions are linearizable, proving that split-brain states require $\lfloor N/2 \rfloor + 1$ malicious Byzantine corruptions.

---

## 📄 Selected Peer-Reviewed Publications & Preprints

| Year | Title & Authors | Venue / Journal | Artifacts & Links |
| :---: | :--- | :--- | :---: |
| **2026** | **"Zero-Overhead Linearizability in Geo-Distributed Raft"**<br/><sub>J. Moreau, E. Vance, K. Thorne</sub> | *ACM Transactions on Computer Systems (TOCS)* | [PDF](https://example.org/tocs26.pdf) • [Code](https://github.com/example-user/geo-raft) • [DOI](https://doi.org) |
| **2025** | **"Formally Verified Memory Fences on RISC-V Platforms"**<br/><sub>J. Moreau, T. Lin</sub> | *Proc. IEEE Symposium on Security and Privacy (S&P)* | [PDF](https://example.org/sp25.pdf) • [Coq Proofs](https://github.com/example-user/coq-riscv) |
| **2024** | **"Adaptive Quorum Leases Under Asymmetric WAN Latency"**<br/><sub>K. Thorne, J. Moreau</sub> | *USENIX Symposium on Networked Systems (NSDI)* | [PDF](https://example.org/nsdi24.pdf) • [Artifact](https://github.com/example-user/nsdi-artifact) |
| **2023** | **"Automated Model Checking of Crash-Recovery in LSM Engines"**<br/><sub>J. Moreau, C. Zhao</sub> | *ACM SIGOPS Operating Systems Review* | [PDF](https://example.org/osr23.pdf) • [TLA+ Spec](https://github.com/example-user/lsm-tla) |

---

## 🎓 Doctoral Dissertation & Research Vision

<details open>
  <summary><strong>Thesis: "Provable Correctness in Fault-Tolerant Distributed Storage" (Univ. of Cambridge)</strong></summary>
  <br/>
  <p><strong>Abstract:</strong> Modern cloud infrastructure relies on distributed consensus protocols whose implementations frequently diverge from their theoretical mathematical models. This dissertation presents an end-to-end mechanized verification framework that bridges formal TLA+ specifications and executable Rust binaries, proving the absence of deadlocks and state divergence across crash-recovery cycles.</p>
  <p>
    <a href="https://example.org/dissertation.pdf"><strong>Download Full Dissertation (PDF, 214 pp.)</strong></a> • 
    <a href="https://github.com/example-user/phd-proofs"><strong>Mechanical Verification Artifacts (Isabelle/HOL)</strong></a>
  </p>
</details>

---

## 🏛️ Academic Service & Community Leadership

- **Program Committee (PC):** OSDI 2026, SOSP 2025, USENIX ATC 2024–2025, EuroSys 2023.
- **Journal Reviewer:** IEEE Transactions on Software Engineering (TSE), ACM Computing Surveys.
- **Advising:** Currently supervising 4 Ph.D. students and 2 Postdoctoral Research Fellows.

---

<div align="center">

### 🏛️ University Office & Scholarly Inquiries

[Faculty Directory](https://cs.example.edu/people/jmoreau) • [Google Scholar Profile](https://scholar.google.com) • [DBLP Bibliography](https://dblp.org) • [Email Prof. Moreau](mailto:julian.moreau@cs.example.edu)

<sub>All preprints deposited in accordance with open-access self-archiving policies (Sherpa/Romeo Green).</sub>

</div>
