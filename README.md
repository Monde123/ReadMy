# ReadMy

> An open-source library of 40 unique visual architectures for GitHub profile READMEs, reusable components, and an intelligent profile adaptation AI skill.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)
[![Templates](https://img.shields.io/badge/Templates-40%2F40%20Available-emerald?style=flat-square)](#visual-architecture-catalog-40-templates)
[![Components](https://img.shields.io/badge/Atomic%20Components-15%20Blocks-blueviolet?style=flat-square)](components/)
[![AI Skill](https://img.shields.io/badge/AI%20Skill-readmy--profile--adapter-amber?style=flat-square)](docs/readmy-profile-adapter-skill.md)

ReadMy helps developers, engineers, researchers, founders, and designers create clear, distinctive, accessible, and maintainable GitHub profile READMEs.

---

## ⚡ Quick Start: Creating Your Special GitHub Profile Repository

To display your personalized README on your GitHub profile page, follow this step-by-step tutorial:

### Step 1: Create Your Special Profile Repository
1. Log in to [GitHub](https://github.com).
2. Click the **`+`** icon in the top-right corner and select **New repository** (or go to [github.com/new](https://github.com/new)).
3. In the **Repository name** field, type your **exact GitHub username** (e.g. if your username is `octocat`, name the repository `octocat`).
4. GitHub will display a special notice:
   > *✨ You found a secret! `<username>/<username>` is a special repository that provides a README.md on your profile.*
5. Ensure the repository visibility is set to **Public** (private profile repositories will not display on your public profile).
6. Check **"Add a README file"** and click **Create repository**.

### Step 2: Choose and Customize Your ReadMy Template
You have two options:

- **Option A (Instant AI Profile Adapter)**:
  Use our intelligent [ReadMy Profile Adapter Skill](docs/readmy-profile-adapter-skill.md) or launch the Studio web app, enter your username, select one of the 40 templates, and let the skill automatically inject your real repos, languages, and stats while preserving the layout!
- **Option B (Manual Selection)**:
  Browse the 40 templates in [`templates/`](templates/), pick your favorite design, copy its `README.md`, and follow its companion `customization.md` guide to replace the placeholders.

### Step 3: Push Your README
Edit or paste the content into the `README.md` file of your special `<username>/<username>` repository, commit the changes to `main`, and visit `https://github.com/<your-username>` to see your profile!

---

## 🤖 The ReadMy Profile Adapter Skill (`readmy-profile-adapter`)

ReadMy includes an agentic skill and interactive studio tool that automates profile personalization while strictly preserving the visual layout and geometry of your chosen template.

- 📖 **Skill Specification**: [`docs/readmy-profile-adapter-skill.md`](docs/readmy-profile-adapter-skill.md)
- ⚙️ **System Skill Instruction**: [`/skills/system_skills/readmy_profile_adapter/SKILL.md`](../skills/system_skills/readmy_profile_adapter/SKILL.md)
- 🖥️ **Studio Interactive Tab**: Open ReadMy Studio and navigate to the **"AI Adapter"** tab.

### What the Profile Adapter does:
1. **GitHub Telemetry Ingestion**: Fetches your live public data (display name, bio, site, top languages, non-fork repositories, stars, and topics).
2. **User Choice & Customization Agency**: Gives you the explicit choice to update, overwrite, or fine-tune specific items (e.g. choose exactly which repos to feature, customize your professional headline, add tech stack tools like AWS or Docker, or add social contacts).
3. **Targeted Clarification**: If a template features extra items (e.g. awards, custom engineering motto, specific focus area), it asks 2 to 3 targeted questions to tailor the result to your exact preference.
4. **Strict Structural Preservation**: Keeps 100% of the template's markup intact (tables, badges, ASCII art, bento grids, `<details>` accordions).

---

## 🏛️ Visual Architecture Catalog (40 Templates)

Every template in ReadMy is built upon a distinct structural layout—no simple badge swaps or color tweaks.

| ID | Template Name | Visual Architecture & Pattern | Category |
|---|---|---|---|
| **001** | [Minimal Clean](templates/001-minimal-clean/) | Minimal Editorial & Balanced Whitespace | Minimal & Executive |
| **002** | [Professional Engineer](templates/002-professional-engineer/) | Technical RFC Datasheet & Specification Table | Systems & AI |
| **003** | [AI Engineer](templates/003-ai-engineer/) | Model Registry & Inference Pipeline | Systems & AI |
| **004** | [Mobile Developer](templates/004-mobile-developer/) | Dual iOS/Android Device Frame Showcase | Applied Profiles |
| **005** | [Frontend Developer](templates/005-frontend-developer/) | Bento Box Interactive UI Grid | Creative & UI/UX |
| **006** | [Full-Stack AI](templates/006-full-stack-ai/) | Full-Stack Platform Overview & Guardrails | Systems & AI |
| **007** | [Student Researcher](templates/007-student-researcher/) | Academic Coursework & 4-Year Milestone Tree | Minimal & Executive |
| **008** | [Robotics STEM](templates/008-robotics-stem/) | Hardware BOM, ROS2 Nodes & Actuator Specs | Systems & AI |
| **009** | [Terminal Creative](templates/009-terminal-creative/) | CLI Shell Prompt & TUI Command Output | Creative & UI/UX |
| **010** | [Open Source Builder](templates/010-open-source-builder/) | Community Hub, Repo Health & Sponsor Tiers | Narrative & Community |
| **011** | [Academic Profile](templates/011-academic-profile/) | Scholar Masthead & Peer-Reviewed Papers Table | Minimal & Executive |
| **012** | [Timeline Journey](templates/012-timeline-journey/) | Chronological Career Tree & Retrospective | Narrative & Community |
| **013** | [Magazine Editorial](templates/013-magazine-editorial/) | Multi-column Editorial Masthead & Features | Creative & UI/UX |
| **014** | [Neon Command Center](templates/014-neon-command-center/) | Dark Ops Telemetry & Incident Response HUD | Creative & UI/UX |
| **015** | [Soft Gradient Landing](templates/015-soft-gradient-landing/) | SaaS Product Landing Page & Social Proof | Creative & UI/UX |
| **016** | [Data Dashboard](templates/016-data-dashboard/) | Lakehouse Data Flow & SLA Metrics Scorecard | Applied Profiles |
| **017** | [Engineering Sheet](templates/017-engineering-sheet/) | Blueprint Spec Drawing & FMEA Matrix | Systems & AI |
| **018** | [CV Portfolio Split](templates/018-cv-portfolio-split/) | Asymmetric Side-by-Side Split-Screen | Minimal & Executive |
| **019** | [Roadmap Flow](templates/019-roadmap-flow/) | 4-Column Quarterly Kanban & Active RFCs | Narrative & Community |
| **020** | [Documentary Profile](templates/020-documentary-profile/) | Systems Forensics Long-form Investigation | Applied Profiles |
| **021** | [Mosaic Portfolio](templates/021-mosaic-portfolio/) | 65%/35% Alternating Project Mosaic Grid | Creative & UI/UX |
| **022** | [Signal Feed](templates/022-signal-feed/) | Technical Dispatch Feed & Personal Tech Radar | Narrative & Community |
| **023** | [Learning Roadmap](templates/023-learning-roadmap/) | 4-Tier Interactive Curriculum with Checkboxes | Applied Profiles |
| **024** | [Pitch Deck](templates/024-pitch-deck/) | 5-Slide Venture Deck (Problem, Moat, Traction) | Minimal & Executive |
| **025** | [Security Lab](templates/025-security-lab/) | Threat Model, CVE Disclosures & CTF Badges | Systems & AI |
| **026** | [Studio Showcase](templates/026-studio-showcase/) | Creative Technology Studio Roster & Shaders | Applied Profiles |
| **027** | [Briefing Memo](templates/027-briefing-memo/) | 1-Page Executive Memorandum & Decision Matrix | Minimal & Executive |
| **028** | [Manifesto Foundry](templates/028-manifesto-foundry/) | Six Tenets of Durable Software & Principles | Narrative & Community |
| **029** | [Event Brief](templates/029-event-brief/) | Keynote Speaker One-Sheet & Workshop Rider | Applied Profiles |
| **030** | [Community Spotlight](templates/030-community-spotlight/) | Mentorship Office Hours & Keynote Archive | Narrative & Community |
| **031** | [RPG Character Sheet](templates/031-rpg-character-sheet/) | Stat Attributes, Inventory & Quest Log | Fantastic & Avant-Garde |
| **032** | [Cyberpunk HUD](templates/032-cyberpunk-netrunner-hud/) | Netrunner Terminal, ICE Shields & Cyberware | Fantastic & Avant-Garde |
| **033** | [Retro MS-DOS BIOS](templates/033-retro-msdos-bios/) | BIOS Boot Sequence, Memory Check & ASCII Box | Fantastic & Avant-Garde |
| **034** | [Classified Redacted Dossier](templates/034-classified-redacted-dossier/) | Black-tape Redactions & Field Clearance Clearance | Fantastic & Avant-Garde |
| **035** | [Newspaper Broadside](templates/035-vintage-newspaper-broadside/) | Victorian Double-rule Gazette Headline Layout | Fantastic & Avant-Garde |
| **036** | [FinTech SaaS Builder](templates/036-fintech-saas-builder/) | Financial Metrics, PCI-DSS & Micro-SaaS Revenue | Applied Profiles |
| **037** | [Flutter Mobile Specialist](templates/037-fullstack-flutter-mobile/) | Multi-platform Mobile Layout & Play Store Metrics | Applied Profiles |
| **038** | [AI Researcher & Innovator](templates/038-ai-research-innovator/) | Scholar Matrix, Benchmark Evals & arXiv Index | Systems & AI |
| **039** | [Prolific Toolmaker Hacker](templates/039-prolific-toolmaker-hacker/) | Tiered Package Inventory & Go Skill Icons | Applied Profiles |
| **040** | [Quantum Prism Cascade](templates/040-quantum-prism-cascade/) | Triangular ASCII Cascade, Spectral Matrix & Prism | Fantastic & Avant-Garde |

---

## 🗂️ Project Repository Structure

```text
ReadMy/
├── README.md                      # Primary project overview, guide & catalog
├── LICENSE                        # MIT License
├── CONTRIBUTING.md                # Template contribution guidelines
├── CODE_OF_CONDUCT.md            # Community standards
├── SECURITY.md                    # Coordinated disclosure policy
├── docs/                          # Comprehensive technical documentation
│   ├── architecture.md            # Structural taxonomy & design logic
│   ├── readmy-profile-adapter-skill.md  # Profile Adapter AI Skill guide & specs
│   ├── design-principles.md       # Typography, density & contrast rules
│   ├── badge-library.md           # Curated badge schemas & endpoints
│   ├── icon-library.md            # Tested vector and monochrome icon sources
│   ├── visual-diversity.md        # The unique visual architecture principle
│   ├── image-policy.md            # Neutral, non-marketing asset guidelines
│   ├── anonymization-policy.md    # Strict fictional placeholder rules
│   ├── template-guide.md          # Guide to creating compliant templates
│   └── roadmap.md                 # 4-Phase delivery milestones & changelog
├── templates/                     # 40 Complete profile templates
│   ├── 001-minimal-clean/         # README.md + customization.md + metadata.yml
│   ├── ...                        # (Templates 002 through 039)
│   └── 040-quantum-prism-cascade/ # Flagship geometric avant-garde template
├── components/                    # 15 Atomic modular blocks
│   ├── headers/                   # Minimalist, terminal, banner hero blocks
│   ├── tech-stacks/               # Go-icons, categorized grid, shields blocks
│   ├── projects/                  # Cards, tables, bento, and terminal project blocks
│   ├── timelines-activity/        # Career milestones, contributions, metrics blocks
│   └── footers/                   # PGP keys, signature stamps, contact bars
├── catalog/                       # Structured YAML registries
│   ├── templates.yml              # Registry of all 40 templates with audiences
│   ├── visual-architectures.yml   # Layout specs for all 40 visual architectures
│   └── image-sources.yml          # Approved image endpoints and shields rules
└── src/                           # ReadMy Studio web application
    ├── App.tsx                    # Multi-tab studio (Templates, Blocks, Roadmap, Adapter)
    └── ProfileAdapter.tsx         # Live GitHub profile adapter interactive tool
```

---

## 🧱 Atomic Components Library (15 Blocks)

In addition to complete profile templates, ReadMy provides 15 standalone, copy-pasteable blocks in [`components/`](components/):

1. **Headers & Intros**: `terminal-hero.md`, `minimal-masthead.md`, `profile-card.md`
2. **Tech Stacks**: `categorized-grid.md`, `skill-icons-badge.md`, `layered-runtime.md`
3. **Projects & Showcases**: `project-cards-table.md`, `compact-feature-list.md`, `metric-showcase.md`
4. **Timelines & Activity**: `milestone-tree.md`, `experience-table.md`, `contribution-radar.md`
5. **Footers & Signatures**: `social-matrix.md`, `pgp-security-stamp.md`, `minimal-colophon.md`

---

## 🎨 Design Philosophy & Guiding Rules

1. **Anti-Duplication Principle**: Re-coloring or swapping badges does not constitute a distinct design. Each template features unique layout logic.
2. **Zero Hardcoded Personal Data**: All templates strictly use fictional placeholders (`octocat`, `user@example.com`, `0x00...00`).
3. **Flawless GitHub Multi-Theme Compatibility**: Validated on both GitHub Dark (`#0d1117`) and Light (`#ffffff`) surfaces.
4. **Resilient Typography & No Broken Markup**: All HTML tags (`<div>`, `<table>`, `<details>`, `<picture>`) are strictly balanced and verified.

---

## 📄 License

ReadMy is distributed under the **MIT License**. See [LICENSE](LICENSE) for details.
