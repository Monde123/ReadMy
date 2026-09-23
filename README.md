# ReadMy

> An open-source library of anonymized GitHub profile README templates, reusable components, design patterns, and documented image resources.

ReadMy helps developers, students, researchers, freelancers, and builders create clear, attractive, accessible, and maintainable GitHub profile README files.

## Design diversity is a core requirement

ReadMy does not simply collect profile templates by profession. It is designed as a library of distinct visual architectures for GitHub profiles.

Each template is expected to have a unique composition, section logic, project layout, and visual identity. Reusing the same layout with a different name or another color is not considered a distinct design.

## Unique design rule

> A complete visual architecture must not be reused more than once in the collection.

This rule prevents the repository from becoming a set of near-duplicate README files that only differ in wording or technology badges.

## Repository map

```text
ReadMy/
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── docs/
│   ├── architecture.md
│   ├── anonymization-policy.md
│   ├── image-policy.md
│   ├── design-principles.md
│   ├── template-guide.md
│   ├── visual-diversity.md
│   └── changelog.md
├── templates/
│   ├── 001-minimal-clean/
│   ├── 002-professional-engineer/
│   ├── 003-ai-engineer/
│   ├── 004-mobile-developer/
│   ├── 005-frontend-developer/
│   ├── 006-full-stack-ai/
│   ├── 007-student-researcher/
│   ├── 008-robotics-stem/
│   ├── 009-terminal-creative/
│   ├── 010-open-source-builder/
│   ├── 011-academic-profile/
│   ├── 012-timeline-journey/
│   ├── 013-magazine-editorial/
│   ├── 014-neon-command-center/
│   ├── 015-soft-gradient-landing/
│   ├── 016-data-dashboard/
│   ├── 017-engineering-sheet/
│   ├── 018-cv-portfolio-split/
│   ├── 019-roadmap-flow/
│   └── 020-documentary-profile/
├── components/
├── assets/
├── catalog/
│   ├── templates.yml
│   ├── visual-architectures.yml
│   └── image-sources.yml
├── examples/
└── .github/
```

## Current visual architecture set

| Template | Visual architecture |
|---|---|
| 001 | Minimal Editorial |
| 002 | Technical Documentation |
| 003 | AI Dashboard |
| 004 | App Showcase |
| 005 | Bento Interface |
| 006 | Product Landing Page |
| 007 | Academic Paper |
| 008 | Technical Lab Notebook |
| 009 | Terminal Interface |
| 010 | Open Source Hub |
| 011 | Academic Profile |
| 012 | Timeline Journey |
| 013 | Magazine Layout |
| 014 | Neon Command Center |
| 015 | Soft Gradient Landing |
| 016 | Data-rich Dashboard |
| 017 | Engineering Sheet |
| 018 | CV / Portfolio Split-Screen |
| 019 | Roadmap Flow |
| 020 | Documentary Chaptered Profile |

## Why the redesign matters

The repository's real value is no longer only in the content of a profile README; it is in the diversity of the experiences that can be created from the same information.

ReadMy aims to help people present themselves in different ways:

- as a builder with a product page,
- as a technical engineer with a documentation layout,
- as a researcher with an academic structure,
- as a mobile developer with an app-like presentation,
- as an AI engineer with a dashboard-oriented design,
- as an open-source maintainer with a community-hub structure,
- as a developer with a terminal-based presentation.
- as an academic profile with publication-oriented structure,
- as a career storyteller with a timeline-based narrative,
- as an editorial thinker with a magazine-style layout,
- as a system operator with a command-center visual language.

## Design philosophy

1. Distinct composition for each template.
2. Different visual rhythm across templates.
3. Different project presentation patterns.
4. Distinct navigation and information hierarchy.
5. Optional images, but only when they add meaning.
6. Clear customization paths, even for highly visual templates.
7. Same anonymization and accessibility standards for all templates.

## Contributing new templates

When adding a new README design, ensure that it is not just a variant of an existing structure. A contribution should change at least:

- the page composition,
- the project card system,
- the skill presentation,
- the visual density,
- the navigation model,
- the section ordering,
- the palette or layout language,
- the image strategy.

If these remain the same, the design is not distinct enough.

## License

ReadMy is distributed under the MIT License. See [LICENSE](LICENSE).
