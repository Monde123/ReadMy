# Self-Contained Native SVG Animations for GitHub Profiles

This directory contains pure, zero-dependency SVG animations built specifically for GitHub Flavored Markdown (GFM).

## Key Engineering Rules

1. **Zero External Requests**: Unlike third-party generators (`capsule-render`, `readme-typing-svg`) that fail when upstream servers experience downtime or rate-limits, these SVGs live directly inside your repository.
2. **Pure CSS & SMIL Keyframes**: Animations run inside the client browser's vector renderer, fully supported by GitHub's image sanitization proxy (`camo`).
3. **Adaptive Contrast**: Designed with high-contrast color palettes legible in both GitHub Dark (`#0d1117`) and Light (`#ffffff`) modes.

## Available Assets

| Asset File | Animation Type | Optimal Archetype |
| :--- | :--- | :--- |
| `terminal-typing.svg` | Animated bash typing command with blinking prompt | Terminal, Systems, Backend |
| `radar-pulse.svg` | Glowing live radar telemetry with status rings | Command Center, SRE, DevOps |
| `gradient-wave.svg` | Smooth multi-spectrum color phase wave | Frontend, Design Systems, SaaS |

## How to Embed in Markdown

```markdown
<!-- Relative link from template directory -->
<p align="center">
  <img src="../../assets/animations/terminal-typing.svg" width="100%" alt="Interactive Terminal Session" />
</p>
```
