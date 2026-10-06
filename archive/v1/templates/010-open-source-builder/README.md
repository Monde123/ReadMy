<!-- READMY_TEMPLATE: 010-open-source-builder -->
<div align="center">

# Mateo Silva
### Open-Source Maintainer • Developer Tooling & Infrastructure Primitives

Stewarding sustainable open-source ecosystems, zero-friction contribution workflows, and battle-tested developer tools.

<p>
  <img src="https://img.shields.io/badge/Total_Stars-18.4k+-FFDF00?style=flat-square&logo=github&logoColor=black" alt="Total Stars" />
  <img src="https://img.shields.io/badge/Monthly_Downloads-2.8M+-blue?style=flat-square&logo=npm&logoColor=white" alt="Monthly Downloads" />
  <img src="https://img.shields.io/badge/PR_Triage_SLA-&lt;_24h-059669?style=flat-square" alt="PR Triage" />
  <img src="https://img.shields.io/badge/Sponsors-48_Active-EA4AAA?style=flat-square&logo=githubsponsors&logoColor=white" alt="Sponsors" />
</p>

</div>

---

## 📊 Maintained Ecosystem & Repository Health Matrix

| Repository | Focus & Domain | CI / Coverage | Weekly Downloads | Good First Issues |
| :--- | :--- | :---: | :---: | :---: |
| **[`fast-glob-rs`](https://github.com/example-user/fast-glob-rs)** | Parallel zero-allocation filesystem traversal in Rust | ![CI](https://img.shields.io/badge/CI-passing-brightgreen?style=flat-square) `99%` | `1,240,000` | [5 Open](https://github.com/example-user/fast-glob-rs/issues) ↗ |
| **[`schema-gate`](https://github.com/example-user/schema-gate)** | Build-time JSON-schema backward compatibility linter | ![CI](https://img.shields.io/badge/CI-passing-brightgreen?style=flat-square) `96%` | `480,000` | [3 Open](https://github.com/example-user/schema-gate/issues) ↗ |
| **[`monodeploy`](https://github.com/example-user/monodeploy)** | GitOps changeset release automation for monorepos | ![CI](https://img.shields.io/badge/CI-passing-brightgreen?style=flat-square) `94%` | `185,000` | [8 Open](https://github.com/example-user/monodeploy/issues) ↗ |

---

## 🛠️ Flagship Developer Utilities

<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <h3>⚡ <a href="#fast-glob">fast-glob-rs</a></h3>
      <p><em>Lightning-fast pattern matching and directory scanner.</em></p>
      ```bash
      # Add to Cargo.toml
      $ cargo add fast-glob-rs
      ```
      <ul>
        <li>3.8x faster than standard WalkDir by using raw Linux kernel <code>getdents64</code>.</li>
        <li>Zero allocation overhead on path string parsing.</li>
        <li>Adopted by 14 popular developer tools and formatters.</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>🛡️ <a href="#schema-gate">schema-gate</a></h3>
      <p><em>Detect breaking API changes before they ship to production.</em></p>
      ```bash
      # Run in GitHub Actions CI
      $ npx schema-gate verify --base origin/main
      ```
      <ul>
        <li>Parses TypeScript interfaces, OpenAPI 3.1, and Protobuf files.</li>
        <li>Emits actionable inline GitHub PR annotations.</li>
        <li>Prevents silent field deletions and type drift.</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🤝 Maintainer Covenant & Contribution Hygiene

We hold ourselves to a strict standard of stewardship:

1. **Welcoming First-Time Contributors:** Every issue labeled `good-first-issue` has an explicit reproduction script, code pointers, and a mentor assigned.
2. **Deterministic Releases:** All releases are built through automated GitHub Actions using Semantic Versioning and cryptographic provenance signatures.
3. **Sustainable Maintenance:** We do not burn out. We set clear boundaries, reject out-of-scope feature creep gracefully, and maintain comprehensive test suites.

---

## 💖 Sponsor Tiers & Corporate Backing

<table width="100%">
  <tr>
    <td width="33%" align="center">
      <h4>☕ Individual Supporter</h4>
      <p><code>$5 / month</code></p>
      <small>Backer badge in all READMEs + Access to monthly maintainer notes.</small>
    </td>
    <td width="33%" align="center">
      <h4>🚀 Tooling Backer</h4>
      <p><code>$50 / month</code></p>
      <small>Priority issue triage + Direct Slack/Discord channel access.</small>
    </td>
    <td width="33%" align="center">
      <h4>🏢 Corporate Sponsor</h4>
      <p><code>$500 / month</code></p>
      <small>Logo placed on project docs (2.8M impressions/mo) + 1 hr/mo architecture review.</small>
    </td>
  </tr>
</table>

---

<div align="center">

[Sponsor on GitHub](https://github.com/sponsors/example-user) • [Open Collective](https://opencollective.com) • [Issue Triage Dashboard](https://github.com/example-user) • [Email Mateo](mailto:mateo@opensource-maintainer.org)

<sub>Open-source software powers the modern internet. Let's make it sustainable together.</sub>

</div>
