# Terminal Prompt Hero Component

A developer-focused terminal header simulating a Unix command-line session (`whoami`, `neofetch`/`fastfetch`, uptime status) with ASCII flair and telemetry pills.

## Preview & Markdown Snippet

```markdown
<!-- READMY_COMPONENT: terminal-hero -->
```bash
$ whoami
alex-chen (Software Systems Engineer & OSS Maintainer)

$ fastfetch --config-profile minimal
       /\_/\       OS: Arch Linux x86_64 / Alpine Container
      ( o.o )      Host: Distributed Systems & Cloud Platforms
       > ^ <       Kernel: Linux 6.10-lts
      /|   |\      Uptime: 8+ years engineering production systems
     (_|   |_)     Shell: zsh 5.9 | Neovim | Tmux
                   Focus: High-throughput APIs, Rust, Go, Kubernetes
```

> [!NOTE]
> **Terminal Status**: `SYSTEM READY` • `OPEN TO ARCHITECTURAL CONSULTING & COLLABORATION`
<!-- END_READMY_COMPONENT -->
```

## Customization Guide

| Placeholder | Description | Example Values |
| :--- | :--- | :--- |
| `alex-chen` | GitHub username or terminal handle | `dev-eva`, `j-doe`, `root@system` |
| `Software Systems Engineer...` | Primary role & specialization | `Distributed Systems Architect`, `Full-Stack Rustacean` |
| ASCII Art `(/\_/\ ...)` | Custom avatar or mascot | Mascot, distro logo, robot, or abstract geometric shape |
| Shell / Focus lines | Core tools and technical domains | `Go`, `TypeScript`, `PostgreSQL`, `Kafka` |
| Status alert | Current availability status | `OPEN FOR COLLABORATION`, `BUSY SHIPPING V2` |

## Theme Compatibility

- **Dark Mode**: High contrast monospace with native GFM bash code block formatting.
- **Light Mode**: Fully readable native GitHub code fence background (`#f6f8fa`).
- **Dependencies**: 0 external images, 100% resilient offline markdown.
