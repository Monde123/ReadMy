# Architecture ReadMy v2

## Plan

1. Séparer les données, le thème et le rendu.
2. Versionner les composants et les tokens.
3. Borner la skill : entrées, sorties, faits autorisés.
4. Décrire la CLI optionnelle et le sous-ensemble YAML accepté.
5. Dire ce qui reste dans l'archive et pourquoi.

## Flux

```text
template.yml + profile.yml
        │
        ▼
  lib/render.js  ← design/tokens.json
        │          ← components/registry.json
        ▼
  README.md + assets/banner-light.svg + assets/banner-dark.svg
```

GitHub n'affiche pas un SVG collé dans le Markdown. Le bandeau est un fichier du dossier, référencé par un `<picture>` qui choisit la variante sombre ou claire. Le même nom et le même rôle sont aussi dans le HTML : si l'image ne s'affiche pas, le texte reste.

## Gabarit

`templates/<id>/template.yml` déclare l'identité du gabarit. Clés acceptées, et aucune autre : `id`, `version`, `title`, `summary`, `audiences`, `theme`, `banner`, `projects`, `components`, `requires`, `layout`.

`layout` choisit la géométrie dans `lib/layouts.js`. Valeur par défaut `stack`, conservée pour les tests du squelette historique. Le catalogue actif n'a pas le droit d'utiliser `stack` : chaque gabarit a un layout unique. `metadata.yml` répète cette architecture dans `style.architecture` pour quelqu'un qui ne lit pas le YAML du moteur. `customization.md` est le guide de copie, il n'est pas régénéré.

Les layouts actifs : `editorial`, `rfc`, `tui`, `roadmap`, `bibliography`, `pitch`, `briefing`, `chronicle`, `desk`, `studio`.

- `theme` : `paper`, `ink`, `signal`, `violet`.
- `banner` : `rule`, `terminal`, `masthead`, `sheet`, `rfc`, `steps`, `cite`, `slides`, `stamp`, `spine`, `desk`, `frame`.
- `projects` : `list` ou `table`.
- `version` : semver `MAJEUR.MINEUR.CORRECTIF`. Les gabarits actifs sont en `2.1.0`. Les composants de rendu listés dans le registre restent en `2.0.0`.

Une clé inconnue lève `TEMPLATE_CLE_INCONNUE`. Un thème inconnu lève `THEME_INCONNU`. Il n'y a pas de thème de repli.

## Profil

`profile.example.yml` ne contient que des faits que l'auteur a écrits. Clés : `name`, `role`, `summary`, `focus`, `location`, `organization`, `projects`, `stack`, `publications`, `timeline`, `checklist`, `pitch`, `principles`, `links`.

Une clé dont le composant n'est pas dans le gabarit lève `SECTION_NON_AFFICHEE`. Une liste vide, quand le composant est demandé, laisse un commentaire HTML `section:… omise` visible dans la source et invisible sur GitHub. Le rendu ne fabrique pas de projet pour remplir un trou.

Limites, au-delà desquelles le rendu s'arrête :

| Champ | Maximum |
|---|---|
| name | 120 |
| role | 160 |
| summary, focus | 2 000 |
| projects | 8 |
| publications, timeline | 12 |
| checklist | 20 |
| principles, links | 8 |
| groupes de stack | 6, et 12 éléments chacun |

Les URL de projet sont `https` uniquement. Les liens acceptent `https` et `mailto`. `javascript:` est refusé (`URL_INVALIDE`). Un motif de secret (`ghp_`, `github_pat_`, `AKIA`, `sk-`) arrête le rendu (`SECRET_DETECTE`) et le message d'erreur ne répète pas le secret.

## Tokens

`design/tokens.json` version `2.0.0`. Espacements : xs 4, sm 8, md 16, lg 24. Chaque couleur de texte, de texte atténué et d'accent doit atteindre un rapport WCAG 2.2 d'au moins 4,5:1 sur le fond du même mode. Les couples sont vérifiés par `lib/contrast.js`. Les formules de référence utilisées dans les tests viennent d'un calcul Python séparé : noir sur blanc = 21, blanc sur `#0d1117` = 18,9246, `#777777` sur blanc = 4,4781 (sous le seuil).

Seule la forme `#rrggbb` est acceptée. `#fff` lève `COULEUR_INVALIDE`.

## Composants

`components/registry.json` est en `2.1.0`. Les composants de rendu restent en `2.0.0` : `banner`, `identity`, `prose`, `projects`, `stack`, `publications`, `timeline`, `checklist`, `pitch`, `principles`, `links`, `colophon`. Le commentaire d'en-tête du README énumère `nom@version`. Un composant dupliqué dans le gabarit lève `COMPOSANT_DUPLIQUE`. Les entrées `blocks` pointent vers les fichiers Markdown copiables.

## YAML accepté

`lib/yaml.js` lit un sous-ensemble : maps, listes indentées, scalaires, commentaires, guillemets doubles et apostrophes. Les entiers sans zéro en tête (neuf chiffres maximum), `true`, `false`, `null` et `~` sont reconnus. Refus explicite : tabulation (`YAML_TAB`), document vide (`YAML_VIDE`), ancre, flux `[ ]` ou `{ }` (`YAML_SYNTAXE_NON_SUPPORTEE`), scalaire multiligne `|`, clé dupliquée (`YAML_CLE_DUPLIQUEE`). Une liste s'indente sous sa clé.

## Skill

Le contrat de `skills/readmy-profile-adapter/SKILL.md` est exécuté par `lib/adapt.js`.

Entrées : gabarit, objet `github` (login, name, bio, company, blog, location, email, twitter, repos), `consent`, `overrides`.

Sorties : Markdown, deux SVG, `provenance.json` (`placeholders`, `warnings`, `provenance`).

Règles : le rôle manquant devient `{{role}}`. La bio manquante omet la prose. Les forks sont exclus. Au plus quatre dépôts, triés par étoiles puis par nom. Le lieu, l'email, l'organisation et le réseau restent absents tant que le booléen de consentement n'est pas `true`. Un dépôt d'override absent de `github.repos` est gardé seulement s'il est fourni, avec un avertissement. Les exemples de référence sont `fixtures/octocat.json` et `examples/octocat-minimal/`.

## CLI

Sans dépendance npm. Le paquet est `"private": true` pour empêcher une publication accidentelle.

```bash
node cli/readmy.js list
node cli/readmy.js render --template minimal --out ./mon-profil
node cli/readmy.js adapt --template minimal --profile profil.json --out ./mon-profil
node cli/readmy.js validate
```

`render` sans `--profile` utilise `profile.example.yml`. `adapt` attend un JSON `{ github, consent, overrides }`.

## Archive

`archive/v1/` est l'arbre de `main` au moment de la branche. Il n'est pas dans la CI de contenu actif : les widgets distants y restent comme trace. Le remettre dans le catalogue signifie le réécrire au format ci-dessus.

## État

Le rendu des dix gabarits et de l'exemple octocat est produit par `node tools/build.js` et comparé aux fichiers commités.

## Prochaines actions

Étendre le parseur seulement si un gabarit réel en a besoin, avec un test qui échoue d'abord sur la syntaxe refusée.

## Risques

Le sous-ensemble YAML surprendra quelqu'un qui colle un document GitHub Actions. L'erreur est nominative. Un SVG très long peut déborder visuellement : la taille de police baisse, le texte HTML garde la chaîne complète.

### Notion bonus

- Schéma des clés de gabarit et de profil, copié depuis cette page.
- Liste des codes d'erreur (`CHAMP_MANQUANT`, `URL_INVALIDE`, `SECRET_DETECTE`, …).
- Case « composant ajouté » liée à une montée de version dans `registry.json`.
