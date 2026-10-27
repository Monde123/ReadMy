# Universal AI Skill Export Packs
## 1-Click Integration Guide for All Major AI Coding Platforms

This directory contains pre-configured adapters and integration manifests to export the **ReadMy Profile Adapter** into any modern AI assistant or IDE.

---

## Supported Platforms Quick Reference

| Platform | Integration File | Installation Path | Time |
|---|---|---|---|
| **Google Antigravity** | `antigravity/skill.json` | `~/.gemini/antigravity-cli/skills/readmy-profile-adapter` | 30s |
| **Cursor / Windsurf** | `cursor/readmy-profile-adapter.mdc` | `.cursor/rules/readmy-profile-adapter.mdc` | 20s |
| **Anthropic Claude Code** | `claude/CLAUDE_INSTRUCTIONS.md` | `CLAUDE.md` in repository root | 20s |
| **OpenAI Custom GPT** | `chatgpt/custom-gpt-spec.md` | OpenAI GPT Builder Instructions | 60s |
| **GitHub Copilot** | `copilot/copilot-instructions.md` | `.github/copilot-instructions.md` | 20s |

---

## 1. Google Antigravity CLI

To install into your global Antigravity environment:

```bash
# On Windows (PowerShell):
$skillDir = "$HOME\.gemini\antigravity-cli\skills\readmy-profile-adapter"
New-Item -ItemType Directory -Force -Path $skillDir
Copy-Item -Recurse -Force "D:\dev\ReadMy\skills\readmy-profile-adapter\*" $skillDir

# On macOS / Linux:
mkdir -p ~/.gemini/antigravity-cli/skills/readmy-profile-adapter
cp -r skills/readmy-profile-adapter/* ~/.gemini/antigravity-cli/skills/readmy-profile-adapter/
```

Verify installation:
Ask Antigravity: `Help me audit and build my indestructible GitHub profile for @username`.

---

## 2. Cursor IDE & Windsurf

1. Copy [`cursor/readmy-profile-adapter.mdc`](cursor/readmy-profile-adapter.mdc) into your project's `.cursor/rules/` directory:
   ```bash
   mkdir -p .cursor/rules
   cp integrations/cursor/readmy-profile-adapter.mdc .cursor/rules/
   ```
2. In Cursor Chat (`Ctrl+L` / `Cmd+L`), type:
   `Audit my GitHub profile @username and generate an indestructible README.`

---

## 3. Anthropic Claude Code & Claude Desktop

- **Claude Code (CLI)**: Append the contents of [`claude/CLAUDE_INSTRUCTIONS.md`](claude/CLAUDE_INSTRUCTIONS.md) to your project's `CLAUDE.md`.
- **Claude.ai Projects**: Paste the instructions into the **Project Instructions** panel and upload `skills/readmy-profile-adapter/fixtures/octocat.json` as reference project knowledge.

---

## 4. OpenAI Custom GPT ("GitHub Profile Architect")

1. Go to ChatGPT GPT Builder.
2. Set Name: **ReadMy — Indestructible Profile Architect**.
3. Copy the System Prompt from [`chatgpt/custom-gpt-spec.md`](chatgpt/custom-gpt-spec.md) into the **Instructions** tab.
4. Upload `SKILL.md` into the **Knowledge** section.

---

## 5. GitHub Copilot Workspace & CLI

Add [`copilot/copilot-instructions.md`](copilot/copilot-instructions.md) to `.github/copilot-instructions.md` in any repository to instruct Copilot on generating WCAG-compliant local SVG profiles.
