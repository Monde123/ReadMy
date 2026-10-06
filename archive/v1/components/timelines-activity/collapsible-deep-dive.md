# Collapsible Deep-Dive Accordion

An interactive GFM module using semantic `<details>` and `<summary>` tags to provide high-density technical depth (post-mortems, patents, research papers, certifications) without cluttering the initial viewport.

## Preview & Markdown Snippet

```markdown
<!-- READMY_COMPONENT: collapsible-deep-dive -->
## 📚 Technical Deep Dives & Selected Publications

<details>
  <summary><strong>📄 Paper: "Evaluating Lock-Free Ring Buffers under Asymmetric Contention" (2025)</strong></summary>
  <br/>
  <blockquote>
    Presented at the International Conference on Distributed Systems (ICDS). Co-authored with Systems Lab.
  </blockquote>
  <p><strong>Abstract:</strong> We investigate hardware memory barriers and cache line bouncing across NUMA nodes under uneven producer-consumer ratios. Proposes an adaptive thread yield heuristic that reduces tail latency by 28%.</p>
  <p>
    <a href="https://doi.org/10.0000/example"><strong>Read Full Paper (PDF)</strong></a> • 
    <a href="https://github.com/example/benchmarks"><strong>Reproducibility Artifacts</strong></a>
  </p>
</details>

<details>
  <summary><strong>🔍 Incident Post-Mortem: Overcoming Distributed Split-Brain under Cloud Partition</strong></summary>
  <br/>
  <p><strong>Severity:</strong> P1 Production Incident (Resolved in 24m) • <strong>Impact:</strong> Data loss: 0%</p>
  <p>Analysis of a 45-second network partition between US-East and EU-West regions that triggered an unexpected split-brain in the cluster coordinator. Outlines the safety enhancements added to our quorum election algorithm.</p>
  <p>
    <code>Key Takeaways:</code> Always enforce epoch monotonic checks on every RPC payload; never rely solely on heartbeat timeouts for leader step-down.
  </p>
</details>

<details>
  <summary><strong>🎓 Certifications & Verified Credentials</strong></summary>
  <br/>
  <ul>
    <li><strong>CKA:</strong> Certified Kubernetes Administrator (Linux Foundation, 2024–2027)</li>
    <li><strong>AWS Solutions Architect Professional:</strong> SAP-C02 (Amazon Web Services, 2023)</li>
    <li><strong>Distributed Systems Specialization:</strong> Stanford Online</li>
  </ul>
</details>
<!-- END_READMY_COMPONENT -->
```

## Customization Guide

- Clickable accordion natively rendered by GitHub without any external JavaScript.
- Keeps profile README compact while still accommodating comprehensive professional records.
