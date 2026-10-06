# ReadMy — Icon Library

## Goal

This document is a practical catalog for reusable technology icons and visual support elements used inside README templates.

Icons are optional. They help communicate a stack quickly, but they must never replace the actual information in text.

## Rule

Every icon must be paired with a meaningful label or closely associated context.

## Recommended icon families

### 1. Programming languages

- Python
- JavaScript
- TypeScript
- Java
- C++
- C
- Go
- Rust
- PHP
- C#
- Shell
- SQL

### 2. Frontend tools

- HTML
- CSS
- React
- Next.js
- Vue
- Tailwind CSS
- Bootstrap
- Vite

### 3. Backend and API tools

- Node.js
- Express
- FastAPI
- Django
- Flask
- NestJS
- Spring Boot
- GraphQL

### 4. AI and data

- PyTorch
- TensorFlow
- OpenCV
- Scikit-learn
- Hugging Face
- Pandas
- NumPy
- Matplotlib
- Jupyter

### 5. Databases and cloud

- PostgreSQL
- MySQL
- MongoDB
- Redis
- Firebase
- Supabase
- Docker
- Kubernetes
- AWS
- GCP
- Azure

### 6. Tooling and workflow

- Git
- GitHub
- GitLab
- VS Code
- Linux
- Figma
- Postman
- Docker
- Nginx

## Preferred sources

### Devicon

Use for classic and clean technology icons.

Example:

```markdown
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python icon" width="32" height="32" />
```

### Skill Icons

Useful for compact groups of technologies.

Example:

```markdown
<img src="https://skillicons.dev/icons?i=python,js,react,nodejs,docker" alt="Python, JavaScript, React, Node.js, and Docker technology icons" />
```

### Simple Icons

Helpful for services and platforms with recognizable brand marks.

Example:

```markdown
<img src="https://simpleicons.org/icons/github.svg" alt="GitHub icon" width="28" height="28" />
```

## Example composition

```markdown
### Stack

<img src="https://skillicons.dev/icons?i=python,typescript,react,nodejs,postgres,docker" alt="Python, TypeScript, React, Node.js, PostgreSQL, and Docker icons" />
```

## Good practices

- Prefer text labels near icons.
- Keep icon clusters compact and consistent.
- Use local assets when a style needs to remain stable and consistent across templates.
- Do not use icons as the only source of information.
- Maintain accessibility with meaningful `alt` values.

## Local alternative policy

If an external icon service is not suitable, use:

- a local SVG icon set;
- a plain text technology badge;
- a local icon pack under `assets/icons/`.

## Storage guidance

Use the project structure below for local icon assets:

```text
assets/
├── icons/
│   ├── python.svg
│   ├── typescript.svg
│   ├── react.svg
│   └── docker.svg
```

## Summary

The icon library should support readability, speed of scanning, and visual consistency without turning the README into a noisy wall of logos.
