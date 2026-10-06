# ReadMy

Un README de profil GitHub qui reste lisible sans Shields, Vercel ni Heroku : des données, un thème, du Markdown et deux SVG locaux.

![Bandeau du gabarit minimal : Inès Morel, ingénieure logiciel](templates/minimal/assets/banner-light.svg)

Dix gabarits. Une commande. Une skill qui n'invente pas de dépôt, de diplôme ni de chiffre.

## En une minute

Il faut Node 22. Aucun `npm install`.

```bash
git clone https://github.com/Monde123/ReadMy.git
cd ReadMy
git checkout rebuild/v2
node cli/readmy.js list
node cli/readmy.js render --template minimal --out ./mon-profil
```

Copiez `mon-profil/README.md` et le dossier `mon-profil/assets/` à la racine du dépôt GitHub qui porte votre identifiant (`<identifiant>/<identifiant>`), sur la branche par défaut, dépôt public. Le profil s'affiche sur `https://github.com/<identifiant>`.

Pour partir de données GitHub déjà enregistrées dans un JSON :

```bash
node cli/readmy.js adapt --template minimal --profile profil.json --out ./mon-profil
```

Le format de `profil.json` est décrit dans la [skill](skills/readmy-profile-adapter/SKILL.md). L'exemple versionné est [octocat](skills/readmy-profile-adapter/examples/octocat-minimal/README.md).

## Galerie

| Gabarit | Pour qui |
|---|---|
| [minimal](templates/minimal/README.md) | Une page courte |
| [engineer](templates/engineer/README.md) | Une fiche de production |
| [student](templates/student/README.md) | Un parcours d'apprentissage |
| [academic](templates/academic/README.md) | Des textes réellement écrits |
| [terminal](templates/terminal/README.md) | Des outils en ligne de commande |
| [maintainer](templates/maintainer/README.md) | Des dépôts tenus dans le temps |
| [creator](templates/creator/README.md) | Une vitrine d'interface |
| [founder](templates/founder/README.md) | Un problème, une offre, une preuve |
| [security](templates/security/README.md) | La défense et la divulgation |
| [journey](templates/journey/README.md) | Une chronologie |

Le détail des aperçus est dans [GALERIE.md](GALERIE.md). Les 40 gabarits précédents sont conservés dans [archive/v1](archive/v1/README.md).

## Carte du dépôt

- [ARCHITECTURE.md](ARCHITECTURE.md) — données, thèmes, composants, skill, CLI
- [CONTRIBUTING.md](CONTRIBUTING.md) — ajouter un gabarit
- [POSITIONNEMENT.md](POSITIONNEMENT.md) — promesse et feuille de route
- [AUDIT.md](AUDIT.md) — mesure du dépôt d'origine
- [DECISIONS.md](DECISIONS.md) — choix faits en l'absence de Moïse
- [QUALITE.md](QUALITE.md) — résultats d'exécution
- [REPORT.md](REPORT.md) — compte rendu de la reconstruction
- [CHANGELOG.md](CHANGELOG.md) — version 2.0.0
- [design/tokens.json](design/tokens.json) — couleurs et espacements
- [components/registry.json](components/registry.json) — composants versionnés

## Licence

MIT. Le fichier [LICENSE](LICENSE) est celui déjà présent sur `main`. Copyright (c) 2026 Moise Koudanko.

## État

Branche `rebuild/v2`. La release GitHub v2.0.0 est rédigée dans [RELEASE_v2.0.0.md](RELEASE_v2.0.0.md) et n'est pas publiée.

## Prochaines actions

Fusionner seulement après lecture de `DECISIONS.md`. Les actions irréversibles y sont listées.

## Risques

Tant que la branche n'est pas sur `main`, la commande `git checkout rebuild/v2` reste nécessaire. Après fusion, elle ne l'est plus.

### Notion bonus

- Page d'accueil avec la phrase de promesse et les dix gabarits.
- Bouton vers la PR, pas vers une release.
- Rappel « pas de service tiers dans les images ».
