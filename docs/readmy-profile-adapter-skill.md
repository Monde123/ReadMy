# ReadMy Profile Adapter Skill Guide

The **ReadMy Profile Adapter** is an intelligent profile adaptation system that allows any developer to take their GitHub username, select one of the 40 visual architecture templates, and receive a tailor-made `README.md` populated with their real repositories, skills, and telemetry while preserving 100% of the template's visual design.

---

## Key Capabilities

1. **GitHub Telemetry Ingestion**:
   - Queries `https://api.github.com/users/{username}` and `https://api.github.com/users/{username}/repos`.
   - Aggregates top languages, stars, bio, location, company, and primary repositories.
2. **User Choice & Customization Agency**:
   - **Freedom to Update**: Gives the user full choice to overwrite, update, or refine specific sections (e.g. swap highlighted repos, customize professional title, add private work experience or additional tech badges like AWS/Docker).
   - **Interactive Clarification**: Prompts with 2-3 concise targeted questions for template-specific requirements (custom quotes, Spotify status, sponsorship goals).
3. **Structural Preservation Engine**:
   - Maintains exact HTML alignment, tables, ASCII art, bento grids, and details accordions.
   - Replaces placeholders like `octocat` with the user's authentic handle.
4. **Instant In-Studio Generator**:
   - Available natively in the **ReadMy Studio** web interface under the **"✨ AI Adapter"** tab.
