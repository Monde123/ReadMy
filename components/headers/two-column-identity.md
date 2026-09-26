# Two-Column Identity Card

A split-pane identity module providing an authoritative executive/lead profile presentation with personal statement on the left and structured specifications on the right.

## Preview & Markdown Snippet

```markdown
<!-- READMY_COMPONENT: two-column-identity -->
<table>
  <tr>
    <td width="58%" valign="top">
      <h2>Marcus Thorne</h2>
      <p><em>Staff Infrastructure Engineer • Platform & Cloud Native</em></p>
      <p>I design self-healing cloud platforms and container orchestrators capable of supporting multi-region low-latency workloads. Passionate about developer ergonomics, zero-trust network policy, and observable microservices.</p>
      <blockquote>
        "Reliability is not an afterthought; it is the fundamental user experience of any distributed system."
      </blockquote>
    </td>
    <td width="42%" valign="top">
      <h4>Specifications & Availability</h4>
      <ul>
        <li><strong>Role:</strong> Staff Systems Architect</li>
        <li><strong>Domain:</strong> Cloud Native, SRE, FinOps</li>
        <li><strong>Languages:</strong> Go, Rust, Python, Bash</li>
        <li><strong>Infra:</strong> Kubernetes, Terraform, Cilium</li>
        <li><strong>Status:</strong> <img src="https://img.shields.io/badge/Advising-Open-10b981?style=flat-square" alt="Status Open" /></li>
        <li><strong>Timezone:</strong> UTC+1 (CET)</li>
      </ul>
    </td>
  </tr>
</table>
<!-- END_READMY_COMPONENT -->
```

## Customization Guide

- Left Column: Narrative summary, philosophy quote, role title.
- Right Column: Precise metadata list (Domain, Languages, Infrastructure, Availability, Timezone).
- Compatible with optional profile avatars inside the left column using standard `<img>` tags.
