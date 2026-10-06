# ReadMy — Badge Library

## Goal

This document catalogs reusable badge styles for README templates, including labels for technology stacks, status, actions, and communication.

Badges should provide rapid scanning, not replace the content itself.

## Common badge categories

### Technology badges

Examples:

- Python
- TypeScript
- Node.js
- React
- PostgreSQL
- Docker
- GitHub
- AWS

### Status badges

Examples:

- Available
- Open to work
- Active project
- Learning
- Remote-friendly
- Collaboration open

### Action badges

Examples:

- Portfolio
- GitHub
- LinkedIn
- Resume
- Contact
- Email
- Download
- Demo

### Profile badges

Examples:

- Location
- Role
- Specialty
- Education
- Focus area

## Preferred source

### Shields.io

Use when a badge needs to be fast, reusable, and highly consistent.

Example:

```markdown
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
```

## Badge pattern guidance

### Good usage

- one badge per simple concept;
- short labels;
- consistent formatting across the README;
- neutral, non-personal text;
- no sensitive or private user information.

### Avoid

- too many badges in a single row;
- personal identifiers inside badges;
- decorative badges with no information value;
- inconsistent color logic across templates.

## Example cluster

```markdown
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
```

## Badge strategy by template type

### Minimal templates

- one or two key badges only
- keep the page uncluttered

### Dashboard templates

- more badges and labels
- use grouping by category

### Product landing templates

- CTA badges: Portfolio, Demo, GitHub, Contact

### Terminal or creative templates

- fewer standard badges
- prefer code-like labels or tags

## Local alternative policy

Use local SVG badge variants or simple text labels when:

- a service is blocked;
- a template requires full visual consistency;
- the use of external services would be excessive.

## Suggested local folder

```text
assets/
├── badges/
│   ├── python.svg
│   ├── typescript.svg
│   ├── react.svg
│   ├── docker.svg
│   └── github.svg
```

## Summary

Badges should help users scan quickly, not distract them from the actual message. They are best used as a secondary layer of communication, after the core story and project structure are already clear.
