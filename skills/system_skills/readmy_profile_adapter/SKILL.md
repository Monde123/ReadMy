---
name: readmy-profile-adapter
description: Adapts and customizes any ReadMy profile template with a user's real GitHub account data, projects, languages, offers user choice for updating or fine-tuning specific sections, and asks targeted questions while strictly preserving the template's exact layout and visual architecture.
---

# ReadMy Profile Adapter Skill

When a user provides their GitHub profile URL, GitHub username, or asks to adapt a ReadMy template to their real identity:
1. Fetch their live GitHub data and analyze their repositories & tech stack.
2. **Offer the user the explicit choice to customize, update, or overwrite specific information** (e.g. highlighted repos, display title, social links, bio statement, custom motto).
3. Ask clarifying questions for missing or template-specific items.
4. Generate their customized `README.md` while strictly preserving the selected template's structural geometry.

---

## 1. Core Workflow

```
[User Input: GitHub URL / Username + Selected Template]
                     │
                     ▼
       ┌───────────────────────────┐
       │ 1. GitHub Data Retrieval  │
       │    (Profile + Repos API)  │
       └─────────────┬─────────────┘
                     │
                     ▼
       ┌───────────────────────────┐
       │ 2. Stack & Repos Analysis │
       │  (Languages, Stars, Topics│
       └─────────────┬─────────────┘
                     │
                     ▼
       ┌───────────────────────────┐
       │ 3. User Choice & Tuning   │
       │  - Check desire to update │
       │  - Let user choose repos, │
       │    title, socials, quote  │
       │  - Ask 2-3 target q's     │
       └─────────────┬─────────────┘
                     │
                     ▼
       ┌───────────────────────────┐
       │ 4. Structural Transfusion │
       │  (Preserve 100% markup,   │
       │   inject real user data)  │
       └───────────────────────────┘
```

---

## 2. GitHub Data Extraction Protocol

Extract or request the user's GitHub username (`https://github.com/<username>` or simply `@username`).

When fetching profile telemetry, obtain:
1. **User Identity**:
   - `name`: Full display name (fallback to login).
   - `bio`: Current bio headline.
   - `location`: Geographical location.
   - `company`: Current organization/school.
   - `blog`: Personal portfolio or blog URL.
   - `twitter_username`: Social handle.
2. **Top Repositories**:
   - Primary open-source projects sorted by star count and recency.
   - Description, primary language, topics/tags, homepage URL.
3. **Tech Stack Signals**:
   - Primary languages aggregated across non-fork repositories.
   - Detected frameworks from repo topics (e.g. `react`, `fastapi`, `docker`, `rust`, `flutter`).

---

## 3. User Choice & Fine-Tuning Protocol (Empowering the User)

Always give the user active control over what gets populated and updated:

### A. Give the User the Choice to Update or Customize
Offer explicit options to adjust any extracted or synthesized field:
- **Highlighted Projects**: *"By default, I've selected your top repos: `repo-a`, `repo-b`. Would you like to feature different repositories or update their project descriptions?"*
- **Headline / Title**: *"Your GitHub bio is `...`. Would you like to use this as your headline, or customize your professional title (e.g., Senior Backend Engineer, AI Researcher)?"*
- **Tech Stack & Badges**: *"I detected `TypeScript, Python, Docker`. Would you like to add tools that aren't on your public GitHub (e.g. AWS, Kubernetes, Figma) or remove any?"*
- **Contact & Socials**: *"Would you like to include your LinkedIn, X (Twitter), Discord, or personal email?"*

### B. Interactive Inquiry (Targeted Questions)
If the chosen template relies on data **not** available in public GitHub profiles (e.g., academic thesis awards, Spotify playlist, custom engineering motto, sponsorship link, or target job title), **ask 2 to 3 concise questions**:

Example prompt to the user:
> *"Here is what I gathered from your GitHub profile! Before I finalize your README, would you like to customize any of the following?"*
> 1. *Your professional subtitle or headline*
> 2. *The 3 or 4 specific projects to showcase*
> 3. *A personal motto or quote to display in the header*
>
> *(Or reply 'generate' if you want me to generate it immediately with smart defaults!)*

---

## 4. Strict Structural Preservation Rules

> **GOLDEN RULE**: NEVER change the visual layout, HTML tags, ASCII borders, or component hierarchy of the chosen ReadMy template.

1. **Keep Every Tag & Class Intact**:
   - Preserve all `<div>`, `<table>`, `<tr>`, `<td>`, `<details>`, `<summary>`, and `<p>` alignments.
   - Retain exact styling (e.g., `align="center"`, `width="50%"`, `theme=tokyonight`).
2. **Telemetry Replacement**:
   - Replace placeholder usernames (`octocat`, `NazmusSayad`, etc.) with the user's verified GitHub username in all badge and stats widget URLs:
     - `github-readme-stats.vercel.app`
     - `github-readme-streak-stats.herokuapp.com`
     - `github-profile-trophy.vercel.app`
     - `github-readme-activity-graph.vercel.app`
3. **Project Slot Substitution**:
   - Map the user's selected repositories directly into the template's project slots.
   - If a template has 4 project rows, fill exactly 4 rows with the user's best repositories and concise summaries.
4. **Skills & Icons Mapping**:
   - Match the template's icon set (e.g. `skillicons.dev` or `go-skill-icons.vercel.app`) using the user's confirmed languages and tools.

---

## 5. Output Format

Always deliver:
1. **The Complete Markdown Block**: Ready to copy-paste into `README.md`.
2. **Summary of What Was Customized**: Bullet points showing the exact repos, tech stack, and telemetry swapped.
3. **Follow-Up Tuning Offer**: Remind the user they can ask for any adjustments (*"Want to change the highlighted repos, add social icons, or adjust your headline? Just let me know!"*).
4. **Next Steps**: A quick 1-line hint on creating their special `<username>/<username>` GitHub profile repository.
