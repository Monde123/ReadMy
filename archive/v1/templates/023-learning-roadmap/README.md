<!-- READMY_TEMPLATE: 023-learning-roadmap -->
<div align="center">

# Jesse Thorne
### Systems Software Apprentice • Self-Directed Computer Science Curriculum

Navigating an intensive 2-year self-directed curriculum in operating systems, distributed consensus, and compiler construction.

<p>
  <img src="https://img.shields.io/badge/Current_Focus-Distributed_Systems_&_Raft-0284c7?style=flat-square" alt="Current Focus" />
  <img src="https://img.shields.io/badge/Study_Hours-1%2C420_hrs_Logged-059669?style=flat-square" alt="Hours" />
  <img src="https://img.shields.io/badge/Curriculum_Progress-18_/_24_Modules-7c3aed?style=flat-square" alt="Progress" />
  <img src="https://img.shields.io/badge/Active_Streak-210_Days_Continuous-f59e0b?style=flat-square" alt="Streak" />
</p>

</div>

---

## 🗺️ 4-Tier Master Curriculum & Syllabus

```text
TIER 1 : COMPUTER SYSTEMS & DIGITAL LOGIC         [STATUS: 100% COMPLETE]
TIER 2 : OPERATING SYSTEMS & BARE-METAL KERNEL    [STATUS: 100% COMPLETE]
TIER 3 : DISTRIBUTED SYSTEMS & CONSENSUS          [STATUS:  75% IN PROGRESS]
TIER 4 : COMPILERS & FORMAL VERIFICATION          [STATUS:  UPCOMING 2027]
```

### 📘 Tier 1: Computer Systems & Architecture
- [x] **NAND to Tetris (Part I & II):** Built simulated 16-bit Hack computer from logic gates up to high-level Jack compiler.
- [x] **Computer Systems: A Programmer's Perspective (CS:APP):** Solved all lab assignments (Data Lab, Bomb Lab, Cache Lab, Shell Lab).
- [x] **Assembly & C Foundations:** Implemented malloc allocator with explicit free lists and boundary tag coalescing.

### 📙 Tier 2: Operating Systems & Kernel Programming
- [x] **MIT 6.S081 (Operating System Engineering):** Ported xv6 Unix operating system to RISC-V hardware.
- [x] **Virtual Memory Subsystem:** Implemented copy-on-write (COW) page allocation and user-space page fault handlers.
- [x] **Preemptive Scheduler:** Built round-robin multi-level feedback queue (MLFQ) with timer interrupt preemption.

### 📗 Tier 3: Distributed Systems & Consensus *(Current Focus)*
- [x] **MIT 6.824 / Princeton:** Implemented MapReduce runtime with fault-tolerant coordinator-worker RPCs.
- [x] **Raft Distributed Consensus:** Built Raft leader election and log replication with persistent state machine in Go.
- [ ] **Linearizable KV Storage:** Implementing snapshot compaction and client deduplication under network splits.
- [ ] **Multi-Paxos Protocol:** Benchmarking consensus throughput against Raft under WAN packet drops.

### 📕 Tier 4: Compilers & Formal Methods *(Upcoming)*
- [ ] **Crafting Interpreters (Robert Nystrom):** Implementing tree-walk interpreter in Java and bytecode VM in C.
- [ ] **LLVM Backend Optimization:** Emitting SSA form and register allocation passes for toy language.
- [ ] **TLA+ Formal Verification:** Specifying state-space invariance models with Leslie Lamport's toolbox.

---

## 🔬 Open Lab Exercises & Implementation Repositories

| Curriculum Module | Primary Assignment / Artifact | Tech Stack | Repository Link |
| :--- | :--- | :---: | :---: |
| **MIT 6.824 Lab 2** | Raft consensus engine with 100% test pass rate | `Go 1.23` | [`raft-consensus-go`](https://github.com/example-user/raft-go) ↗ |
| **CS:APP Shell Lab** | TinyShell with foreground/background job control | `C23 / POSIX` | [`csapp-tsh`](https://github.com/example-user/csapp-tsh) ↗ |
| **xv6 Kernel Lab** | Copy-on-write page fault allocator on RISC-V | `C / Assembly` | [`xv6-cow-riscv`](https://github.com/example-user/xv6-cow) ↗ |
| **CS:APP Cache Lab**| Matrix transpose optimization with 0 cache misses | `C / Valgrind` | [`cache-transpose`](https://github.com/example-user/cache-transpose) ↗ |

---

## ⏱️ Weekly Study Rhythm & Synthesis Discipline

```text
MON - WED (06:00 - 08:30) ── Deep Reading & Textbook Invariant Derivations
THU - FRI (06:00 - 08:30) ── Lab Implementation & Unit Testing
SATURDAY  (08:00 - 13:00) ── 5-Hour Uninterrupted Coding Lab Block
SUNDAY    (09:00 - 11:00) ── Technical Note Synthesis & Blog Post Publication
```

---

<div align="center">

### 📝 Open Study Notes & Discussion

[Curriculum GitHub Org](https://github.com/example-user) • [Learning Journal Blog](https://jesse.study) • [Email Jesse](mailto:jesse@systems-apprentice.dev)

<sub>"Do not confuse knowing the name of something with knowing something." — Richard Feynman</sub>

</div>
