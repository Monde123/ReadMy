---
name: readmy-profile-adapter
version: 2.0.0
description: Commercial-grade AI skill for zero-dependency GitHub profile auditing, semantic role inference, and indestructible local SVG/Markdown generation.
author: Moise Koudanko
license: MIT
tags: [github, profile-readme, svg-generator, accessibility, wcag, zero-dependency, privacy]
---

# ReadMy Profile Adapter — Indestructible GitHub Profile Engine

## Value Proposition & Commercial Promise

Most GitHub profile READMEs suffer from rapid digital decay: broken Shields badges, sleeping free-tier backend dynos, rate-limited stats widgets, unreadable dark/light contrast, and fabricated credentials.

**ReadMy Profile Adapter** is an autonomous AI agent skill that delivers:
1. **Live Durability & Fragility Audit**: Scans an existing GitHub profile README, calculates a Health & Durability Score (0 to 100), and flags third-party widgets liable to fail.
2. **Zero-Prompt Semantic Inference**: Analyzes public repositories, languages, and bio to infer exact engineering seniority, specialty, and dominant stack without human guessing.
3. **Template DNA Matcher**: Recommends the highest-converting profile layouts (e.g., AI Engineer, Systems Engineer, Pitch Deck, Minimalist).
4. **100% Local, Zero-Third-Party Generation**: Generates standalone dual-mode SVGs (Dark & Light, < 20 KB, WCAG 2.2 AA compliant) and high-impact Markdown with zero remote image CDNs.
5. **Absolute Anti-Hallucination & Privacy Guarantee**: Enforces strict GDPR/privacy consent and guarantees that not a single metric, star, job title, or repository is ever fabricated.

---

## When to Activate This Skill

Activate this skill when:
- A developer wants to create, audit, upgrade, or repair their GitHub profile README (`<username>/<username>`).
- An engineer asks for a clean, professional, and maintenance-free developer portfolio on GitHub.
- An AI assistant needs to transform raw GitHub API data or a user summary into a production-ready, dark/light responsive profile.

---

## CLI Command Interface

The skill operates seamlessly through the native, zero-dependency ReadMy CLI:

```bash
# 1. Full interactive onboarding (Audit + Semantic Analysis + Generation)
node cli/readmy.js init

# 2. Standalone durability audit of any public profile
node cli/readmy.js audit <username>

# 3. Direct automated adaptation from GitHub API
node cli/readmy.js adapt --github <username> --template engineer --out ./profile-output

# 4. Deterministic adaptation from structured JSON payload
node cli/readmy.js adapt --template minimal --profile payload.json --out ./profile-output
```

---

## Operational Workflow

```text
User / GitHub API
       │
       ▼
[Step 1: Durability Audit] ─────────► Fragility Score & Widget Vulnerability Report
       │
       ▼
[Step 2: Semantic Analysis] ────────► Inferred Role & Top Tech Stack
       │
       ▼
[Step 3: Template Matching] ────────► Top-3 Recommended Layouts
       │
       ▼
[Step 4: Deterministic Generation] ──► README.md + Local SVGs + provenance.json
```

### Step 1: Health & Durability Audit
Inspect the user's existing `README.md` at `<username>/<username>`.
- Penalize brittle third-party hosts (badge services, dynamic renderers, visitor counters).
- Verify dark/light picture element support and accessibility `alt` tags.
- Output a clear score (0-100) and grade (A to F).

### Step 2: Semantic Analysis & Role Inference
Extract public repositories sorted by stars and recent activity:
- Detect dominant programming languages.
- Match regex and semantic patterns against the user bio to identify true seniority (Lead, Senior, Staff, Founder, etc.).
- If bio lacks explicit titles, derive role deterministically from primary technology stack (e.g., Rust/Go -> Systems & Backend Engineer; Python -> AI & Data Systems Engineer).

### Step 3: Interactive Alignment & Consents
Prompt the user or verify programmatic payload for:
- Chosen template ID (e.g., `minimal`, `engineer`, `creator`, `founder`, `security`, `terminal`).
- Explicit privacy consent flags (`showLocation`, `showEmail`, `showCompany`, `showSocial`).

### Step 4: Deterministic Local Generation & Provenance
Compile the target profile:
- Render responsive Markdown with dual-theme `<picture>` headers.
- Synthesize standalone, accessible SVGs into `assets/banner-light.svg` and `assets/banner-dark.svg`.
- Emit `provenance.json` recording the explicit origin of every rendered field.

---

## Inputs

The skill accepts a structured JSON object or reads directly from the public GitHub API:
- `github`: Public GitHub dataset (`login`, `name`, `bio`, `company`, `location`, `email`, `blog`, `twitter_username`, `repos[]`).
- `consent`: Explicit booleans `showLocation`, `showEmail`, `showCompany`, `showSocial` (default: `false`).
- `overrides`: Validated custom title, bio summary, or curated project list.

---

## Outputs

The skill generates an autonomous, ready-to-commit directory package:
- `README.md`: Production-ready profile markdown, formatted for GitHub web and mobile apps.
- `assets/banner-light.svg`: Scalable vector banner optimized for Light theme (WCAG contrast >= 4.5:1).
- `assets/banner-dark.svg`: Scalable vector banner optimized for Dark theme (WCAG contrast >= 4.5:1).
- `provenance.json`: Machine-readable audit trail mapping every piece of data to its origin.

---

## Guardrails & Non-Negotiable Rules

> [!CAUTION]
> **Anti-Hallucination Law**: Do not invent any repository, metric, degree, award, or job title.

- **Zero Remote Dependencies**: Never inject badges from third-party badge providers, Vercel widgets, Heroku apps, dynamic CDNs, or iframe view counters.
- **Privacy by Default**: Never output email, location, employer, or social handles unless explicit consent (`true`) is provided.
- **Missing Data Handling**: If a role is missing and not provided in overrides, emit the literal placeholder `{{role}}`. Do not fabricate a fictional role.
- **Secret Detection**: If input text contains API keys or token patterns (e.g., `ghp_`, `github_pat_`, `AKIA`, `sk-`), immediately halt with `SECRET_DETECTE` without repeating the secret.
- **Safe Repository Capping**: Cap rendered projects to the top 4 repositories by default (excluding forks), sorted by stars.
