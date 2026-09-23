# ReadMy Component System

Welcome to the **ReadMy Modular Component System**. This library provides tested, accessible, and resilient building blocks designed specifically for GitHub Profile READMEs.

Every component is written in pure **GitHub-Flavored Markdown (GFM)** and standards-compliant HTML, ensuring robust rendering across desktop browsers, mobile devices, and dark/light GitHub themes.

---

## 📂 Component Registry

### 1. Headers & Hero Sections (`components/headers/`)
- **[`terminal-hero.md`](./headers/terminal-hero.md)**: Monospace Unix shell session with `$ whoami`, `fastfetch` system telemetry, and ASCII branding.
- **[`bento-header.md`](./headers/bento-header.md)**: Asymmetric bento header card with 4-cell quantitative KPI matrix.
- **[`two-column-identity.md`](./headers/two-column-identity.md)**: Split-pane identity card separating narrative biography from hard technical specifications.
- **[`minimal-typography.md`](./headers/minimal-typography.md)**: High-elegance typographic hero using pure whitespace and zero third-party image dependencies.
- **[`editorial-magazine.md`](./headers/editorial-magazine.md)**: Technical periodical masthead with issue numbers, publication dispatch, and volume styling.

### 2. Project Showcases (`components/projects/`)
- **[`grid-2x2-showcase.md`](./projects/grid-2x2-showcase.md)**: Two-column, two-row project card matrix with status tags, key achievements, and repository links.
- **[`metric-card.md`](./projects/metric-card.md)**: Engineering case study format structured as *Context ➔ Problem ➔ Architecture ➔ Measurable Impact*.
- **[`monospace-changelog.md`](./projects/monospace-changelog.md)**: Monospace release stream documenting recently shipped software versions and GPG signing keys.
- **[`minimal-list.md`](./projects/minimal-list.md)**: Clean directory list with inline stack tags, license info, and star counters.

### 3. Tech Stack & Architecture (`components/tech-stacks/`)
- **[`categorized-tables.md`](./tech-stacks/categorized-tables.md)**: 4-tier capability matrix grouping skills by functional domain and production competencies.
- **[`coordinated-pill-wall.md`](./tech-stacks/coordinated-pill-wall.md)**: Cohesive monochrome/slate Shields.io badge system avoiding rainbow confetti.
- **[`pipeline-flow.md`](./tech-stacks/pipeline-flow.md)**: ASCII and Mermaid architecture flowcharts illustrating service topology and data streams.

### 4. Timelines & Activity (`components/timelines-activity/`)
- **[`career-ladder.md`](./timelines-activity/career-ladder.md)**: Monospace box-drawing milestone tree mapping career progression and engineering impact.
- **[`sprint-roadmap.md`](./timelines-activity/sprint-roadmap.md)**: Quarterly delivery matrix tracking in-flight deliverables (`SHIPPED`, `IN PROGRESS`, `PLANNED`).
- **[`collapsible-deep-dive.md`](./timelines-activity/collapsible-deep-dive.md)**: Interactive `<details><summary>` accordions for publications, incident post-mortems, and certifications.

### 5. Footers & Connect (`components/footers/`)
- **[`social-matrix.md`](./footers/social-matrix.md)**: Coordinated communication bar with website, LinkedIn, email, and newsletter badges.
- **[`security-signature.md`](./footers/security-signature.md)**: Cryptographic identity card featuring 40-character PGP fingerprint and vulnerability disclosure channels.
- **[`shell-exit.md`](./footers/shell-exit.md)**: Terminal session closure with return code `0` and network ping status.

---

## 🛠️ Usage Guidelines

1. **Pick & Combine**: Choose one header, one or two project showcases, one tech stack section, and one footer.
2. **Respect Anonymization**: Follow `docs/anonymization-policy.md`. Replace all placeholder usernames, links, and credentials with your actual information before committing.
3. **Test in Both Themes**: Verify that badges and tables render with high contrast in both GitHub Dark (`#0d1117`) and GitHub Light (`#ffffff`).
