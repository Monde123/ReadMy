# 2x2 Project Showcase Grid

A resilient two-by-two card grid using HTML table cells to render projects side-by-side on GitHub with status tags, key achievements, and repository links.

## Preview & Markdown Snippet

```markdown
<!-- READMY_COMPONENT: grid-2x2-showcase -->
## 📦 Selected Projects

<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <h3>🚀 <a href="#project-one">HyperCache</a></h3>
      <p><em>Ultra low-latency in-memory cache engine written in Rust with lock-free ring buffers.</em></p>
      <ul>
        <li><code>p99 &lt; 85µs</code> under 2M concurrent connections</li>
        <li>Zero-copy serialization with flatbuffers</li>
      </ul>
      <p>
        <img src="https://img.shields.io/badge/Rust-dea584?style=flat-square&logo=rust&logoColor=white" alt="Rust" />
        <img src="https://img.shields.io/badge/Tokio-black?style=flat-square" alt="Tokio" />
        <img src="https://img.shields.io/badge/Status-v1.4.0-emerald?style=flat-square" alt="Status" />
      </p>
    </td>
    <td width="50%" valign="top">
      <h3>🛰️ <a href="#project-two">AeroTelemetry</a></h3>
      <p><em>Real-time avionics telemetry stream aggregator with sub-second WebSocket dispatch.</em></p>
      <ul>
        <li>Processes 45,000 sensor frames per second</li>
        <li>Automated anomaly detection pipeline</li>
      </ul>
      <p>
        <img src="https://img.shields.io/badge/Go-00ADD8?style=flat-square&logo=go&logoColor=white" alt="Go" />
        <img src="https://img.shields.io/badge/NATS-27AAE1?style=flat-square" alt="NATS" />
        <img src="https://img.shields.io/badge/Status-Live-blue?style=flat-square" alt="Status" />
      </p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>🛡️ <a href="#project-three">SentinelGate</a></h3>
      <p><em>API security gateway with automatic eBPF rate-limiting and JWT introspection.</em></p>
      <ul>
        <li>DDoS mitigation at kernel level</li>
        <li>OpenTelemetry trace propagation</li>
      </ul>
      <p>
        <img src="https://img.shields.io/badge/C-A8B9CC?style=flat-square&logo=c&logoColor=white" alt="C" />
        <img src="https://img.shields.io/badge/eBPF-orange?style=flat-square" alt="eBPF" />
        <img src="https://img.shields.io/badge/Status-Beta-amber?style=flat-square" alt="Status" />
      </p>
    </td>
    <td width="50%" valign="top">
      <h3>📊 <a href="#project-four">MetricsCraft</a></h3>
      <p><em>Declarative metrics visualization library for distributed tracing backends.</em></p>
      <ul>
        <li>Lightweight Canvas rendering engine</li>
        <li>Native dark mode & SVG export</li>
      </ul>
      <p>
        <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TS" />
        <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
        <img src="https://img.shields.io/badge/Status-Production-success?style=flat-square" alt="Status" />
      </p>
    </td>
  </tr>
</table>
<!-- END_READMY_COMPONENT -->
```

## Customization Guide

- Replace project names, links, descriptions, bullet metrics, and badge tags.
- The 2x2 table preserves equal cell widths (`width="50%"`) and aligns content to the top (`valign="top"`).
- Works cleanly on both desktop monitors and GitHub Mobile app.
