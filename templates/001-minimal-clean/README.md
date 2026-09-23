<!-- READMY_TEMPLATE: 001-minimal-clean -->
# Alex Martin

Software engineer focusing on distributed runtime systems, deterministic storage engines, and minimal API surfaces.

Based in Zurich, Switzerland. Currently building high-throughput state machines.

---

### Focus & Practice

I design backend software prioritizing mechanical sympathy, predictable p99 latencies, and explicit failure domains. The most resilient codebases are those that remove cognitive overhead rather than adding layers of defensive abstraction.

```text
tenets:
  - prefer readable control flow over polymorphic indirection
  - eliminate silent failures at process boundaries
  - measure tail latencies under real network jitter
```

---

### Selected Engineering

**[NexusDB](https://github.com/example-user/nexusdb)**  
*Embedded lock-free LSM-tree storage engine written in Go.*  
Achieves 120,000 sustained write IOPS with zero garbage collection pause impact by utilizing off-heap memory arena buffers and direct kernel I/O (`O_DIRECT`).

**[WireGuard-Mesh](https://github.com/example-user/wireguard-mesh)**  
*Self-healing zero-config mesh overlay network daemon.*  
Runs across heterogeneous edge environments with automatic NAT-traversal and cryptographically verified node discovery via ChaCha20-Poly1305.

**[MicroRPC](https://github.com/example-user/microrpc)**  
*Minimalist binary RPC protocol over TCP.*  
Zero-copy serialization with an overhead of less than 8 bytes per frame. Replaces bloated JSON HTTP payloads for internal cluster communication.

---

### Capabilities & Systems

- **Languages:** Go, Rust, C23, TypeScript, SQL
- **Storage:** PostgreSQL, ClickHouse, Redis, BadgerDB
- **Protocols:** gRPC, Protocol Buffers, WebSocket, TCP/IP
- **Environments:** Linux, Docker, eBPF, Kubernetes

---

### Writing & Dispatches

- [Understanding Memory Barriers in Multicore Architectures](https://example.com/notes/memory-barriers)
- [Why We Avoid Distributed Transactions](https://example.com/notes/distributed-tx)
- [A Critique of Modern Microservice Dogma](https://example.com/notes/microservice-critique)

---

### Index

[Email](mailto:alex@example.org) &nbsp;•&nbsp; [GitHub](https://github.com/example-user) &nbsp;•&nbsp; [PGP Key](https://example.com/key.asc) &nbsp;•&nbsp; [RSS](https://example.com/feed.xml)

<sub>This profile adheres to zero-tracking, zero-cookie, zero-external-script principles. Built with pure Markdown.</sub>
