# GitHub Copilot Instructions for ReadMy Profile Generation

When assisting developers with GitHub Profile READMEs (`<username>/<username>`):

- **Durability Guarantee**: Only generate local assets. Do not introduce remote widget URLs (e.g. Shields badges, third-party stats renderers, visitor counters).
- **Dual-Mode Theming**: Wrap visual banners in `<picture>` tags with `<source media="(prefers-color-scheme: dark)">` and `<source media="(prefers-color-scheme: light)">`.
- **Truthful Content**: Never invent projects, stars, degrees, or contributions. If repositories are retrieved via GitHub CLI (`gh repo list`), cap at the top 4 repositories by stars and exclude forks.
- **Privacy Enforcement**: Keep email, company, and physical location private by default.
- **Accessibility**: Include descriptive `alt` text on all images. Maintain high contrast ratios (>= 4.5:1).
