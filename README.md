# ReadMy

> An open-source library of anonymized GitHub profile README templates, reusable components, design patterns, and documented image resources.

ReadMy helps developers, students, researchers, freelancers, and builders create clear, attractive, accessible, and maintainable GitHub profile README files.

## What ReadMy provides

- Anonymized profile README templates.
- Reusable README components.
- Clear information architectures for different professional profiles.
- A documented catalog of image, badge, statistics, and animation services.
- Accessibility and image policies.
- Design guidance for presenting skills, projects, learning paths, and contact information.
- A contribution workflow for adding new templates without exposing personal data.

## Principles

1. **Anonymized by default** — examples use fictional identities, projects, links, and contact details.
2. **Structure before decoration** — the content hierarchy must remain useful without images.
3. **Reusable by design** — templates are composed from documented sections and components.
4. **Accessible presentation** — images require meaningful alternative text and must not carry essential information alone.
5. **Honest positioning** — examples should communicate skills and goals clearly without fabricated personal claims.
6. **External resources are documented** — remote images, badges, statistics, and generators are cataloged.
7. **Beginner-friendly customization** — every template explains what to replace and where.

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
│   └── changelog.md
├── templates/
│   └── 001-minimal-clean/
│       ├── README.md
│       ├── metadata.yml
│       └── customization.md
├── components/
│   └── README.md
├── assets/
│   └── README.md
├── catalog/
│   ├── templates.yml
│   └── image-sources.yml
├── examples/
│   └── README.md
└── .github/
    └── PULL_REQUEST_TEMPLATE.md
```

## First template

[001 — Minimal Clean](templates/001-minimal-clean/README.md) is the first reference template. It demonstrates a low-density, professional profile for a fictional software engineer named John Doe.

## Planned collection

The initial collection will grow toward at least 50 anonymized designs, including minimal, professional, academic, student, mobile, frontend, backend, AI, data, cybersecurity, open-source, creative, freelance, and product-builder profiles.

## How to use a template

1. Open a template directory.
2. Read its `customization.md` file.
3. Copy `README.md` into your own profile repository.
4. Replace fictional values and placeholders with your own information.
5. Keep the hierarchy and accessibility guidance.
6. Validate external links and image URLs before publishing.

## Contributing

Read the [contribution guide](CONTRIBUTING.md), especially the [anonymization policy](docs/anonymization-policy.md) and [image policy](docs/image-policy.md), before submitting a template or component.

## License

ReadMy is distributed under the MIT License. See [LICENSE](LICENSE).
