# Audit ReadMy

## Plan

1. Mesurer le dépôt réel au commit `799047f`, sans se fier aux annonces du README.
2. Noter chaque gabarit sur l'originalité, le mobile, le thème, les dépendances et l'accessibilité.
3. Repérer la dette : dérive documentaire, absence de tests, services distants.
4. Situer ReadMy face aux générateurs et aux cartes de statistiques.
5. Trancher garder, refaire ou retirer, et lister les dix risques de durée.

## Périmètre mesuré

Mesures prises le 6 octobre 2026 sur `main` à `799047f` (fusion de la PR #4, 26 septembre 2026).

| Fait | Mesure |
|---|---|
| Gabarits annoncés | 40 |
| Dossiers réels dans `templates/` | 40 |
| `README.md` de gabarit | 40 |
| Entrées de `catalog/templates.yml` | 40, identifiants alignés sur les dossiers |
| Composants Markdown | 15 fichiers plus `components/README.md` |
| Skill | 2 copies strictement identiques, 6 600 octets |
| Workflows GitHub Actions | 0 |
| Tests automatiques | 0 |
| Étiquettes Git | 0 |
| Issues | 0 |
| Pull requests | 4, toutes fusionnées |
| Licence | MIT, copyright 2026 Moise Koudanko |
| Fichiers hors `.git` | 171 |
| Lignes Markdown | 7 844 |
| Historique | du 23 au 26 septembre 2026 |

La licence est déjà présente. Elle n'a pas été modifiée.

## Ce que le README affirmait, et ce que le dépôt contient

Le README de `main` annonce un studio web (`src/App.tsx`, `ProfileAdapter.tsx`) absent du dépôt. Il annonce 15 blocs dont les noms (`minimal-masthead.md`, `skill-icons-badge.md`, `milestone-tree.md`, etc.) ne correspondent pas aux fichiers. Le registre interne `components/README.md`, lui, correspond aux fichiers réels.

Six liens du catalogue racine pointent vers des dossiers qui n'existent pas :

- `templates/031-rpg-character-sheet/` (dossier réel : `031-cyberpunk-netrunner`)
- `templates/032-cyberpunk-netrunner-hud/` (réel : `032-deep-space-astrophysics`)
- `templates/033-retro-msdos-bios/` (réel : `033-dungeon-rpg-character-sheet`)
- `templates/034-classified-redacted-dossier/` (réel : `034-audio-synth-rack`)
- `templates/035-vintage-newspaper-broadside/` (réel : `035-top-secret-dossier`)
- `templates/037-fullstack-flutter-mobile/` (réel : `037-mern-flutter-capsule`)

Le lien de skill du README racine utilise `../skills/...` et sort du dépôt.

`docs/changelog.md` s'arrête avant les gabarits 031 à 040. Il n'y a pas de version sémantique.

## Dépendances externes

Sur les 40 README de gabarit, un script a compté les hôtes :

| Hôte | Occurrences |
|---|---|
| `img.shields.io` | 243 |
| `raw.githubusercontent.com` | 9 |
| `github-readme-stats.vercel.app` | 8 |
| `skillicons.dev` | 5 |
| `go-skill-icons.vercel.app` | 5 |
| `capsule-render.vercel.app` | 4 |
| `github-readme-activity-graph.vercel.app` | 2 |
| `github-profile-trophy.vercel.app` | 2 |
| `github-readme-streak-stats.herokuapp.com` | 2 |
| `komarev.com` | présent dans le gabarit 037 |

Seuls `001-minimal-clean` et `027-briefing-memo` n'ont aucune image distante. Les gabarits 036 à 040 concentrent les services à durée de vie courte (Vercel, Heroku, Demolab). Les images HTML observées ont un attribut alt non vide. L'écart d'accessibilité principal est ailleurs : le contraste est délégué à un thème distant, et l'image disparaît si l'hôte tombe.

## Grille

Notes de 1 à 5. Le verdict « garder » signifie que le modèle éditorial entre dans le catalogue v2, réécrit en données plus thème. « Refaire » signifie fusion dans un gabarit v2. « Supprimer » signifie archive seule, dans `archive/v1/`, sans effacement de `main`.

| ID | Orig. | Mobile | Thème | Dépend. | A11y | Verdict | Suite |
|---|---:|---:|---:|---:|---:|---|---|
| 001 minimal-clean | 4 | 5 | 5 | 5 | 4 | garder | `minimal` |
| 002 professional-engineer | 3 | 3 | 3 | 2 | 4 | garder | `engineer` |
| 003 ai-engineer | 3 | 3 | 3 | 2 | 4 | refaire | `engineer` |
| 004 mobile-developer | 3 | 3 | 3 | 2 | 4 | refaire | `engineer` |
| 005 frontend-developer | 4 | 2 | 3 | 2 | 4 | refaire | `creator` |
| 006 full-stack-ai | 2 | 3 | 3 | 2 | 3 | refaire | `engineer` |
| 007 student-researcher | 3 | 4 | 3 | 2 | 4 | garder | `student` |
| 008 robotics-stem | 3 | 3 | 3 | 2 | 4 | refaire | `engineer` |
| 009 terminal-creative | 4 | 4 | 3 | 2 | 4 | garder | `terminal` |
| 010 open-source-builder | 4 | 3 | 3 | 2 | 4 | garder | `maintainer` |
| 011 academic-profile | 4 | 4 | 3 | 2 | 4 | garder | `academic` |
| 012 timeline-journey | 3 | 4 | 3 | 2 | 4 | garder | `journey` |
| 013 magazine-editorial | 3 | 3 | 3 | 2 | 4 | refaire | `creator` |
| 014 neon-command-center | 3 | 3 | 2 | 2 | 3 | supprimer | archive |
| 015 soft-gradient-landing | 2 | 3 | 3 | 2 | 3 | refaire | `founder` |
| 016 data-dashboard | 3 | 2 | 3 | 2 | 3 | refaire | `engineer` |
| 017 engineering-sheet | 3 | 3 | 3 | 2 | 4 | refaire | `engineer` |
| 018 cv-portfolio-split | 2 | 2 | 3 | 2 | 3 | supprimer | archive |
| 019 roadmap-flow | 3 | 3 | 3 | 2 | 4 | refaire | `student` |
| 020 documentary-profile | 3 | 4 | 3 | 2 | 4 | refaire | `journey` |
| 021 mosaic-portfolio | 3 | 2 | 3 | 2 | 3 | supprimer | archive |
| 022 signal-feed | 3 | 4 | 3 | 2 | 4 | refaire | `journey` |
| 023 learning-roadmap | 4 | 4 | 3 | 2 | 4 | refaire | `student` |
| 024 pitch-deck | 4 | 3 | 3 | 2 | 4 | garder | `founder` |
| 025 security-lab | 4 | 4 | 3 | 2 | 4 | garder | `security` |
| 026 studio-showcase | 3 | 3 | 3 | 2 | 4 | refaire | `creator` |
| 027 briefing-memo | 4 | 5 | 5 | 5 | 4 | refaire | `minimal` |
| 028 manifesto-foundry | 3 | 4 | 3 | 2 | 4 | refaire | `minimal` |
| 029 event-brief | 2 | 3 | 3 | 2 | 3 | supprimer | archive |
| 030 community-spotlight | 2 | 3 | 3 | 2 | 3 | supprimer | archive |
| 031 cyberpunk-netrunner | 4 | 3 | 2 | 2 | 3 | supprimer | archive |
| 032 deep-space-astrophysics | 4 | 3 | 2 | 2 | 3 | supprimer | archive |
| 033 dungeon-rpg | 4 | 3 | 2 | 2 | 3 | supprimer | archive |
| 034 audio-synth-rack | 4 | 3 | 2 | 2 | 3 | supprimer | archive |
| 035 top-secret-dossier | 4 | 3 | 2 | 2 | 3 | supprimer | archive |
| 036 fintech-saas-builder | 3 | 2 | 1 | 1 | 3 | supprimer | archive |
| 037 mern-flutter-capsule | 2 | 2 | 1 | 1 | 3 | supprimer | archive |
| 038 ai-research-innovator | 3 | 2 | 1 | 1 | 3 | supprimer | archive |
| 039 prolific-toolmaker | 3 | 3 | 1 | 1 | 3 | supprimer | archive |
| 040 quantum-prism-cascade | 4 | 2 | 1 | 1 | 3 | supprimer | archive |

Totaux : 9 garder, 16 refaire, 15 supprimer du catalogue actif. Le catalogue v2 en retient 10, parce que `creator` réunit plusieurs sources « refaire » sans reprendre un seul ancien dossier tel quel.

Les gabarits 031 à 035 sont originaux, et le catalogue racine leur attribue d'autres noms. Les garder aurait figé une dette de navigation. Ils restent lisibles dans `archive/v1/templates/`.

## Skill

La skill `readmy-profile-adapter` décrit un flux utile : lire le profil public, demander les trous, préserver la structure. Elle prescrit aussi l'injection d'URL `github-readme-stats`, `streak-stats`, `skillicons` et des « smart defaults » si la personne répond simplement `generate`. Cette seconde consigne fabrique des faits. Les deux copies (`skills/system_skills/...` et `.github/skills/...`) sont identiques, donc toute correction devait être faite deux fois.

## Concurrence

Revue de bureau du 6 octobre 2026, à partir des dépôts et pages publics, pas d'un essai de chaque produit.

| Offre | Force | Manque que ReadMy peut tenir |
|---|---|---|
| [awesome-github-profile-readme](https://github.com/abhisheknaiidu/awesome-github-profile-readme) | Immense vitrine, découverte rapide | Peu de contrat de maintenance, beaucoup de liens morts potentiels, pas de rendu déclaratif |
| [github-readme-stats](https://github.com/anuraghazra/github-readme-stats) et [github-stats-extended](https://github.com/Naros/github-stats-extended) | Carte SVG live, une URL suffit | Le README dépend de l'hébergeur (souvent Vercel) et de l'API GitHub au moment de l'affichage |
| [GPRM](https://gprm.itsvg.in/) | Formulaire, README en moins d'une minute | Le résultat embarque stats, streaks et badges distants |
| Profile README Generator (Rahul Jain) et README Maker | Cases à cocher, export Markdown | Même grammaire visuelle : stats, trophées, snake, skill icons |
| [terminal-identity](https://github.com/doyoon530/terminal-identity) | Carte terminal soignée | Une image hébergée, pas un profil complet durable |

L'angle déjà présent dans les premiers commits de ReadMy (profils anonymisés, contenu d'abord, architectures différentes) est le bon. Il a été recouvert par le volume et par les widgets. La place durable est : un petit catalogue dont le rendu reste lisible le jour où Shields, Vercel ou Heroku ne répondent plus, avec une skill qui n'écrit que des faits fournis.

## Dix risques de durée

1. Aucune CI et aucun test : une réécriture peut casser quarante fichiers sans signal.
2. Services distants dans le rendu (243 URL Shields, puis Vercel, Heroku, Demolab, skillicons, komarev).
3. Dérive entre le README racine et les dossiers (6 liens cassés, studio web inexistant).
4. Index des composants du README racine décalé par rapport aux fichiers.
5. Skill dupliquée et autorisée à inventer via des valeurs par défaut.
6. Pas de version sémantique des gabarits ni des composants ; changelog en retard.
7. Chiffres fictifs (étoiles, notes, revenus, citations) présentés comme des mesures.
8. Tableaux larges et murs de badges peu lisibles sur téléphone (005, 018, 021, 036, 037).
9. Historique concentré sur quatre jours et un seul flux de génération, sans revue outillée.
10. Couleurs déléguées aux thèmes des services distants : le contraste clair/sombre n'est pas un invariant du dépôt.

## État

L'audit est figé sur `799047f`. Le catalogue actif v2 est la réponse, l'archive conserve la v1.

## Prochaines actions

Relire les notes « supprimer » avant toute suppression définitive sur `main`. Moïse peut demander le retour d'un gabarit d'archive dans le format déclaratif.

## Risques

La note d'originalité est un jugement de lecture, pas une mesure automatique. Les notes de dépendance et les hôtes, eux, viennent du script exécuté sur les fichiers.

### Notion bonus

- Base « Gabarits v1 » avec les colonnes verdict, suite v2, hôtes distants.
- Vue « Supprimer » filtrée pour la décision de Moïse.
- Lien vers le commit `799047f` dans la page d'audit.
