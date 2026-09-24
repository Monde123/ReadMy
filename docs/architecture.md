# ReadMy — Architecture

## 1. Purpose

ReadMy is organized as a design system for GitHub profile README files. It separates complete templates, reusable sections, local assets, external-resource metadata, examples, and project documentation.

The architecture is intentionally content-first: a README must communicate a person's positioning, evidence, and contact options even when images or dynamic services are unavailable.

## 2. Layers

### Templates

Complete, ready-to-customize README profiles. Each template targets an audience, a professional position, or a visual style.

### Components

Independent sections that can be combined across templates: headers, introductions, skill groups, project cards, learning paths, statistics, contributions, contact blocks, and footers.

### Assets

Local SVGs, placeholders, separators, preview images, and other neutral visual resources. Personal photographs and identifiable screenshots are not included.

### Catalogs

Machine-readable descriptions of templates and external services. Catalogs make the collection searchable and can support future generators or validation tools.

### Profile Adapter AI Skill Layer

An intelligent adaptation system (`readmy-profile-adapter`) that ingests live developer telemetry from the GitHub public API, maps repositories and languages into the chosen template's slots, and prompts for missing data through targeted questions while strictly preserving the template's markup and visual geometry.

### Documentation

Rules and decisions that keep the project coherent: design principles, anonymization, image usage, contribution, and customization.

## 3. Standard template structure

```text
templates/<template-id>/
├── README.md
├── metadata.yml
└── customization.md
```

- `README.md`: the complete anonymized profile example.
- `metadata.yml`: category, audience, complexity, sections, image policy, and status.
- `customization.md`: explicit instructions for replacing fictional values.

A preview asset can be added later when a stable preview-generation workflow exists.

## 4. README information hierarchy

A default profile follows this order:

1. **Identity and positioning** — name, role, and concise value proposition.
2. **Core skills** — the capabilities most relevant to the profile.
3. **Technologies** — tools grouped by purpose rather than an unstructured list.
4. **Selected projects** — evidence of application, not just technology names.
5. **Learning or focus** — current direction and honest growth areas.
6. **Credentials or activity** — optional supporting evidence.
7. **Contact** — a small set of useful, neutral links.
8. **Closing statement** — optional signature or principle.

Templates may reorder or omit sections when their audience requires it, but every change should be intentional.

## 5. Template categories

- `minimal`: short, low-density profiles.
- `professional`: role and experience-focused profiles.
- `student`: learning, fundamentals, and goals.
- `academic`: research, education, and publications.
- `frontend`: interfaces, design systems, and accessibility.
- `backend`: APIs, databases, reliability, and architecture.
- `mobile`: native, Flutter, React Native, and mobile products.
- `ai-data`: AI, machine learning, data, and research profiles.
- `security`: defensive security, privacy, and secure engineering.
- `creative`: visual, experimental, terminal, or themed layouts.
- `freelance-product`: services, products, and collaboration-oriented profiles.

## 6. Design constraints

Every contribution should:

- use fictional or neutral data;
- remain understandable without images;
- use heading levels in order;
- avoid excessive animation and decorative noise;
- provide meaningful image alternative text;
- document external services;
- avoid claims that cannot be supported by the example;
- explain customization for a beginner;
- preserve a clear visual and semantic hierarchy.

## 7. Future architecture

The current file structure supports future additions without requiring a redesign:

- a template index generated from `catalog/templates.yml`;
- link and image validation in GitHub Actions;
- a variable-based README generator;
- theme variants such as light, dark, compact, and visual;
- preview generation;
- searchable documentation and component combinations.
