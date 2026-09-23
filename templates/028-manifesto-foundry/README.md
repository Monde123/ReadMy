<!-- READMY_TEMPLATE: 028-manifesto-foundry -->
<div align="center">

```text
====================================================================================================
 THE FOUNDRY FOR SOFTWARE CRAFTSMANSHIP // A DECLARATION OF ARCHITECTURAL INTENT
====================================================================================================
```

# Julian Vance
### Software Artisan • Systems Builder • Pragmatic Architect

Dedicated to the discipline of durable software: code written with mechanical sympathy, zero bloat, and timeless clarity.

<p>
  <img src="https://img.shields.io/badge/Philosophy-Zero_Bloat-1e293b?style=flat-square" alt="Zero Bloat" />
  <img src="https://img.shields.io/badge/Craftsmanship-Durable_Code-b45309?style=flat-square" alt="Durable Code" />
  <img src="https://img.shields.io/badge/Standard-Mechanical_Sympathy-059669?style=flat-square" alt="Mechanical Sympathy" />
  <img src="https://img.shields.io/badge/Manifesto-Ratified_2026-6366f1?style=flat-square" alt="Ratified" />
</p>

</div>

---

## 📜 The Six Tenets of Durable Software

### 1. Simplicity is an Achievement, Not a Default
*Complexity is the easy path; it requires no discipline to add dependencies, indirection, or configuration flags. True engineering maturity is the relentless pruning of the unnecessary until what remains cannot be simplified further.*

### 2. Latency is Respect for Human Attention
*A system that responds in 12 milliseconds respects its user; a system that stalls for 3 seconds wastes human life. We do not accept bloated bundle sizes, unoptimized database queries, or unneeded network hops when software can run with near-instantaneous speed.*

### 3. Contracts Outlive Implementations
*Code changes constantly; well-designed protocol boundaries, typed schemas, and data invariants outlive the frameworks that execute them. We prioritize unambiguous interfaces over polymorphic cleverness.*

### 4. Explicit Failure Over Silent Degradation
*A program must fail loudly, visibly, and predictably at the earliest possible boundary. We ban silent catch-all exception blocks, hidden fallback states, and corrupted data drift.*

### 5. Mechanical Sympathy Over Pure Abstraction
*Software runs on physical silicon, across real memory caches, and through physical fiber cables. The best engineers understand the hardware beneath their abstractions rather than pretending the machine is infinite.*

### 6. Durable Code Outlives Framework Fashion
*Tools chosen because they are trendy today will be legacy debt tomorrow. We build core systems around stable standards—C, Rust, Go, SQL, HTTP, and Unix primitives—that will remain understandable thirty years from now.*

---

## ⚖️ Craftsmanship in Practice: Rejections vs Commitments

| Modern Anti-Pattern Rejected | Craftsmanship Commitment Enforced |
| :--- | :--- |
| **Mega-Dependencies for Trivial Math** | Writing 10 lines of clear, zero-dependency native code with 100% test coverage. |
| **Silent 500 Errors Behind Load Balancers** | Structured RFC 7807 error responses with explicit machine-readable error codes. |
| **Massive 40MB Frontend Bundles** | Minimalist, tree-shaken JavaScript under 80kB that loads in sub-100ms globally. |
| **"Move Fast and Break Things"** | Move deliberately, verify invariants, and build things that do not break. |

---

## 🔨 The Foundry's Shipped Artifacts

<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <h3>🏛️ <a href="#core-kernel">CoreKernel Primitives</a></h3>
      <p><em>Zero-dependency memory allocators and data structures in C23.</em></p>
      <ul>
        <li>Bounded arena and pool allocators with zero heap fragmentation.</li>
        <li>Sub-microsecond deterministic execution for safety-critical loops.</li>
        <li>Zero external runtime dependencies; audited for MISRA compliance.</li>
      </ul>
      <p><img src="https://img.shields.io/badge/Standard-C23_/_MISRA-blue?style=flat-square" alt="C23" /></p>
    </td>
    <td width="50%" valign="top">
      <h3>📜 <a href="#clean-sql">CleanSQL Schema Engine</a></h3>
      <p><em>Declarative PostgreSQL migration engine without magic ORM layers.</em></p>
      <ul>
        <li>Pure SQL migration files with automated reversible down-migrations.</li>
        <li>Strict transaction lock timeout protections during schema alters.</li>
        <li>Used in production across 40 high-volume payment pipelines.</li>
      </ul>
      <p><img src="https://img.shields.io/badge/Integrity-ACID_Verified-emerald?style=flat-square" alt="ACID" /></p>
    </td>
  </tr>
</table>

---

<div align="center">

```text
====================================================================================================
 [SEAL OF CRAFTSMANSHIP] // CODE RATIFIED TO STAND AGAINST OBSOLESCENCE
 Repository: github.com/example-user  •  Essays: craftsmanship.foundry.org  •  Direct: julian@foundry.org
====================================================================================================
```

</div>
