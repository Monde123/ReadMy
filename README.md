# ReadMy

Un README de profil GitHub qui reste lisible sans Shields, Vercel ni Heroku : des données, un thème, du Markdown et deux SVG locaux.

![Bandeau du gabarit AI Engineer](templates/003-ai-engineer/assets/banner-light.svg)

Vingt gabarits thématiques (AI, Cyberpunk, SRE, Audio DSP, Fintech, RPG, Design). Une commande instantanée. Une skill autonome qui interroge l'API GitHub sans inventer de faits ni dépendre de services tiers.

## En une minute

Il faut Node >= 20. Aucun `npm install`.

### 1. Assistant interactif (Recommandé)

```bash
npx readmy init
```

### 2. Adaptation directe d'un profil GitHub public

```bash
node cli/readmy.js adapt --github <identifiant> --template 003-ai-engineer --out ./mon-profil
```

### 3. Rendu local manuel

```bash
node cli/readmy.js render --template 014-neon-command-center --out ./mon-profil
```

Copiez `mon-profil/README.md` et le dossier `mon-profil/assets/` à la racine du dépôt GitHub qui porte votre identifiant (`<identifiant>/<identifiant>`), sur la branche par défaut, dépôt public. Le profil s'affiche sur `https://github.com/<identifiant>`.

## Galerie

| Gabarit | Univers & Persona | Style SVG | Layout |
|---|---|---|---|
| [003-ai-engineer](templates/003-ai-engineer/README.md) | AI Systems, LLM Inference & CUDA | `cyber-hud` | Cartes 2 colonnes |
| [014-neon-command-center](templates/014-neon-command-center/README.md) | Platform SRE & Distributed Systems | `cyber-hud` | Cartes & Métriques |
| [031-cyberpunk-netrunner](templates/031-cyberpunk-netrunner/README.md) | Offensive Security & Cyberware | `cyber-hud` | Cartes 2 colonnes |
| [033-dungeon-rpg-character-sheet](templates/033-dungeon-rpg-character-sheet/README.md) | RPG Code-Mage & Dungeon Architect | `retro-ascii` | Cartes & Stats RPG |
| [013-magazine-editorial](templates/013-magazine-editorial/README.md) | Tech Journalism & Long-form Essays | `masthead` | Liste typographique |
| [024-pitch-deck](templates/024-pitch-deck/README.md) | Startup Founder, Traction & Metrics | `masthead` | Cartes & Pitch |
| [036-fintech-saas-builder](templates/036-fintech-saas-builder/README.md) | Financial Systems & High-SLA Ledger | `blueprint` | Cartes & KPI SLA |
| [034-audio-synth-rack](templates/034-audio-synth-rack/README.md) | Audio DSP & Modular Eurorack | `blueprint` | Cartes 2 colonnes |
| [025-security-lab](templates/025-security-lab/README.md) | Vulnerability Research & Red Team | `terminal` | Tableau |
| [016-data-dashboard](templates/016-data-dashboard/README.md) | Real-time Streaming & OLAP | `cyber-hud` | Cartes & Métriques |
| [minimal](templates/minimal/README.md) | Une page courte et épurée | `rule` | Liste |
| [engineer](templates/engineer/README.md) | Fiche technique de production | `sheet` | Cartes 2 colonnes |
| [creator](templates/creator/README.md) | Vitrine de prototypes et design | `masthead` | Cartes 2 colonnes |
| [terminal](templates/terminal/README.md) | Outils CLI et systèmes Unix | `terminal` | Tableau |
| [student](templates/student/README.md) | Parcours d'apprentissage et projets | `sheet` | Liste |
| [academic](templates/academic/README.md) | Publications de recherche | `sheet` | Tableau |
| [maintainer](templates/maintainer/README.md) | Dépôts tenus dans le temps | `rule` | Tableau |
| [founder](templates/founder/README.md) | Problème, offre et preuve | `masthead` | Tableau |
| [security](templates/security/README.md) | Défense, durcissement et divulgation | `terminal` | Tableau |
| [journey](templates/journey/README.md) | Chronologie et jalons | `rule` | Liste |

Le détail des aperçus est dans [GALERIE.md](GALERIE.md). Les archives historiques de la v1 sont conservées dans [archive/v1](archive/v1/README.md).

## Carte du dépôt

- [ARCHITECTURE.md](ARCHITECTURE.md) — données, thèmes, composants, skill, CLI
- [CONTRIBUTING.md](CONTRIBUTING.md) — ajouter un gabarit
- [POSITIONNEMENT.md](POSITIONNEMENT.md) — promesse et feuille de route
- [AUDIT.md](AUDIT.md) — mesure du dépôt d'origine
- [DECISIONS.md](DECISIONS.md) — registre des choix d'architecture
- [QUALITE.md](QUALITE.md) — résultats d'exécution et tests
- [REPORT.md](REPORT.md) — compte rendu de la modernisation
- [CHANGELOG.md](CHANGELOG.md) — version 2.0.0
- [design/tokens.json](design/tokens.json) — couleurs et espacements
- [components/registry.json](components/registry.json) — composants versionnés

## Licence

MIT. Copyright (c) 2026 Moise Koudanko.
