# ReadMy Overhaul Roadmap (2026)

## Vision & Core Directives

ReadMy is an open-source design system and library of anonymized GitHub profile README templates, reusable UI components, and documented patterns.

### Non-Negotiable Directives:
1. **Language Standard**: 100% English across all documentation, templates, metadata, guides, and components.
2. **Rule of Distinct Visual Architecture**: Each of the 30 templates must present a truly unique layout and visual hierarchy. No clone layouts with merely swapped copy.
3. **Pure GitHub Flavored Markdown (GFM) Compatibility**: Leverage standard markdown features, supported HTML tags (`<table>`, `<details>`, `<summary>`, `<kbd>`, `<blockquote>`), and resilient styling (e.g. Shields.io badges, GitHub callout alerts, dark/light mode image toggles).
4. **Resilient & Anonymized**: Avoid brittle third-party dynamic widgets that frequently experience downtime. Templates must remain legible as plain markdown and strictly adhere to the anonymization policy.

---

## Evolution Phases

```
┌─────────────────────────────────────────────────────────────┐
│ [COMPLETED] Phase 1: Modular Component System (components/) │
├─────────────────────────────────────────────────────────────┤
│ [IN PROGRESS] Phase 2: Template Redesign (Batch 1 Shipped)  │
├─────────────────────────────────────────────────────────────┤
│ [PENDING] Phase 3: Metadata & Catalog Synchronization       │
├─────────────────────────────────────────────────────────────┤
│ [PENDING] Phase 4: Quality Assurance & Theme Validation     │
└─────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Modular Component System (`components/`) — ✅ COMPLETED
*Objective: Build the missing atomic foundation of reusable GFM building blocks.*

Created 15 standardized, plug-and-play components across 5 structural families with full documentation and markdown snippets:

- **1.1 Header & Hero Components (`components/headers/`)** ✅
  - `terminal-hero.md`: Monospace Unix shell session with `$ whoami` and `fastfetch`.
  - `bento-header.md`: Asymmetric bento header card with 4-cell KPI matrix.
  - `two-column-identity.md`: Split-pane identity card.
  - `minimal-typography.md`: Typographic hero using pure whitespace.
  - `editorial-magazine.md`: Periodical masthead with volume & issue styling.
- **1.2 Project Showcases (`components/projects/`)** ✅
  - `grid-2x2-showcase.md`: 2x2 Showcase Table with tag pills.
  - `metric-card.md`: Context ➔ Problem ➔ Architecture ➔ Impact card.
  - `monospace-changelog.md`: Monospace release stream with GPG signing notes.
  - `minimal-list.md`: Clean directory list with inline stack tags.
- **1.3 Tech Stack Displays (`components/tech-stacks/`)** ✅
  - `categorized-tables.md`: 4-tier capability matrix.
  - `coordinated-pill-wall.md`: Cohesive slate/monochrome Shields.io system.
  - `pipeline-flow.md`: ASCII and Mermaid data flow diagrams.
- **1.4 Activity & Timeline Modules (`components/timelines-activity/`)** ✅
  - `career-ladder.md`: Monospace box-drawing milestone tree.
  - `sprint-roadmap.md`: Quarterly delivery matrix.
  - `collapsible-deep-dive.md`: Accessible `<details><summary>` accordions.
- **1.5 Footers & Connect Signatures (`components/footers/`)** ✅
  - `social-matrix.md`: Coordinated communication bar.
  - `security-signature.md`: Cryptographic PGP identity card.
  - `shell-exit.md`: Terminal session closure with return code `0`.

---

## Phase 2: Template Redesign & Overhaul (30 Templates)
*Objective: Transform all 30 templates from generic text lists into distinct, high-impact visual architectures.*

### Batch 1: Creative & UI/UX Profiles — ✅ COMPLETED
- `005-frontend-developer`: ✅ Authentic Bento Box layout using multi-cell tables, design tokens, interactive `<details>` code inspection.
- `009-terminal-creative`: ✅ Interactive CLI feel, ASCII art banners, command-line syntax highlights, active daemons, shell exit prompt.
- `013-magazine-editorial`: ✅ High-density technical periodical format, newspaper columns, pull-quotes, issue colophon, investigative case studies.
- `014-neon-command-center`: ✅ Cockpit mission control dashboard, real-time subsystem telemetry, tactical operations, high-contrast monospace borders.
- `015-soft-gradient-landing`: ✅ SaaS product landing page structure with value propositions, flagship products, collaboration tiers, and client social proof.
- `021-mosaic-portfolio`: ✅ Asymmetric project mosaic matrix (65%/35% alternating grid), computational materials spec sheet, curatorial stance.

### Batch 2: Systems, Backend, AI & Engineering — ✅ COMPLETED
- `002-professional-engineer`: ✅ Formal technical RFC/datasheet structure, system parameters, architectural principles, and IETF signature.
- `003-ai-engineer`: ✅ Model registry, inference pipeline diagram, training hardware & benchmark table, HuggingFace/arXiv citations.
- `006-full-stack-ai`: ✅ End-to-end full-stack AI platform overview, frontend/API/inference topology, Pydantic guardrail principles.
- `008-robotics-stem`: ✅ Hardware BOM, sensors/actuators specs, embedded firmware stack, ROS2 nodes, real-world actuators.
- `017-engineering-sheet`: ✅ Engineering blueprint drawing block, SLA/uptime metrics, operational checklists, FMEA risk analysis.
- `025-security-lab`: ✅ Threat modeling matrix, CVE disclosures, CTF achievements, PGP fingerprint card, Coordinated Disclosure policy.

### Batch 3: Minimal, Executive & Academic — ✅ COMPLETED
- `001-minimal-clean`: ✅ Ultimate minimalist markdown, maximum whitespace, exquisite typographic balance, zero third-party scripts.
- `007-student-researcher`: ✅ Academic coursework, lab rotations, preprint links, open study notes, 4-year milestone progression tree.
- `011-academic-profile`: ✅ Formal scholar masthead, citation metrics, LaTeX-like math formulation, peer-reviewed publications table, thesis accordion.
- `018-cv-portfolio-split`: ✅ True side-by-side split screen (35% Left: verified CV dossier; 65% Right: projects, career tree, mission).
- `024-pitch-deck`: ✅ Venture pitch deck 5-slide format (Pain Point, Solution, Traction Matrix, Tech Moat, Seed Round Ask).
- `027-briefing-memo`: ✅ Executive one-page decision memorandum (Executive summary, strategic options matrix, 90-day roadmap, sign-off docket).

### Batch 4: Narrative, Timelines & Community — ✅ COMPLETED
- `010-open-source-builder`: ✅ Repository health metrics, contribution guidelines, sponsor tier banner, flagship utilities.
- `012-timeline-journey`: ✅ Chronological career evolution with milestone tree, retrospective lessons, tech lifecycle matrix.
- `019-roadmap-flow`: ✅ 4-Column quarterly roadmap matrix (Shipped, In Flight, Next, Exploratory), milestone progress bars, active RFCs.
- `022-signal-feed`: ✅ Technical micro-dispatch feed, annotated papers & reading log, personal tech radar, valid RSS subscription.
- `028-manifesto-foundry`: ✅ Six tenets of durable software, rejections vs commitments matrix, shipped zero-dependency artifacts, seal of craftsmanship.
- `030-community-spotlight`: ✅ Mentorship office hours booking station, conference keynote talks archive, community initiatives, speaker rider.

### Batch 5: Specialized & Applied Profiles — ✅ COMPLETED
- `004-mobile-developer`: ✅ Dual mobile frame layout (iOS SwiftUI & Android Jetpack Compose frames, store badges, cold start benchmarks).
- `016-data-dashboard`: ✅ Lakehouse data platform scorecard (14.8 TB/day, p95 < 450ms), Bronze/Silver/Gold flow, modern data stack, dbt models.
- `020-documentary-profile`: ✅ Long-form systems forensics case study (Cascading Quorum Partition), forensic archive, systems archaeology tenets.
- `023-learning-roadmap`: ✅ Self-directed 4-tier master curriculum, interactive syllabus with checkboxes `[x]`, open university lab repos, study rhythm.
- `026-studio-showcase`: ✅ Creative technology studio roster, disciplines & capabilities matrix, WebGPU/Three.js commissions, collective partners.
- `029-event-brief`: ✅ International keynote speaker one-sheet (38 keynotes, 24k attendees, 4.94/5.0), talk abstracts, intensive workshops, A/V rider.
- `031-rpg-character-sheet`: ✅ Gamified RPG attributes, skill trees, inventory & active quests.
- `032-cyberpunk-netrunner-hud`: ✅ Terminal Netrunner HUD, ICE shields, hardware deck specs.
- `033-retro-msdos-bios`: ✅ IBM-compatible BIOS boot sequence, memory diagnostics & ASCII frames.
- `034-classified-redacted-dossier`: ✅ Redacted dossier, declassified files, Level 5 clearances.
- `035-vintage-newspaper-broadside`: ✅ Victorian double-rule newspaper gazette broadside.
- `036-fintech-saas-builder`: ✅ SaaS financial metrics, PCI-DSS compliance, subscription pipelines.
- `037-fullstack-flutter-mobile`: ✅ Multi-platform Flutter layout, store links, cold-start benchmarks.
- `038-ai-research-innovator`: ✅ AI paper implementations, benchmark leaderboards, arXiv papers.
- `039-prolific-toolmaker-hacker`: ✅ 3-tier package inventory, CLI utilities & Go skill icons.
- `040-quantum-prism-cascade`: ✅ Flagship geometric triangular cascade, spectral matrix & inverse pyramid.

---

## Phase 3: Metadata, Customization Guides & Catalog Sync — ✅ COMPLETED
*Objective: Ensure all documentation and metadata match the overhauled templates.*

1. ✅ Updated `metadata.yml` across all 40 templates with exact visual density, complexity, and sections.
2. ✅ Created actionable `customization.md` for all 40 templates with step-by-step instructions.
3. ✅ Synchronized all templates with the visual architecture specifications in `catalog/visual-architectures.yml`.

---

## Phase 4: Quality Assurance & Multi-Theme Validation — ✅ COMPLETED
*Objective: Guarantee flawless rendering across GitHub environments.*

1. ✅ **Theme Verification**: Validated assets and contrast on both GitHub Dark (`#0d1117`) and Light (`#ffffff`).
2. ✅ **Mobile Viewport Testing**: Ensured tables wrap or scroll gracefully without horizontal overflow disasters.
3. ✅ **Anonymization Audit**: Confirmed all names, URLs, email addresses, and keys remain strictly fictional placeholders.
4. ✅ **Syntax Linter**: 0 HTML unclosed tag errors verified across all 40 templates.

---

## Phase 5: ReadMy Profile Adapter AI Skill — ✅ COMPLETED
*Objective: Automate profile personalization from live GitHub profile data.*

1. ✅ Created agent skill specification in `/skills/system_skills/readmy_profile_adapter/SKILL.md`.
2. ✅ Documented open-source specification in `docs/readmy-profile-adapter-skill.md`.
3. ✅ Integrated interactive Profile Adapter tab in ReadMy Studio with live API fetching and targeted questionnaires.
