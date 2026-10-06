# ReadMy 2.0.0

Notes préparées le 6 octobre 2026. Cette release n'est pas publiée. Aucune étiquette git n'a été poussée.

## En bref

ReadMy passe d'une collection de 40 README à un catalogue de 10 gabarits générés depuis des données et un thème. Les images du catalogue actif sont des SVG du dépôt. La skill refuse d'inventer des faits. La licence MIT ne change pas.

## Installer

```bash
git clone https://github.com/Monde123/ReadMy.git
cd ReadMy
node cli/readmy.js render --template minimal --out ./mon-profil
```

Après fusion dans `main`, la branche `rebuild/v2` n'est plus requise.

## Gabarits

`minimal`, `engineer`, `student`, `academic`, `terminal`, `maintainer`, `creator`, `founder`, `security`, `journey`.

## Non inclus

- Publication npm (`package.json` reste privé).
- Application web studio.
- Cartes github-readme-stats, Shields, skillicons, capsule-render.

## Vérification

Les commandes et les chiffres sont dans `QUALITE.md`, issus de l'exécution sur cette branche.

## État

Document de préparation uniquement.

## Prochaines actions

Moïse publie la release GitHub depuis ces notes s'il les valide, ou les corrige avant.

## Risques

Publier ces notes telles quelles avant la fusion décrirait une version qui n'est pas encore sur `main`.

### Notion bonus

- Page release avec l'état « brouillon ».
- Liste des gabarits cochée au moment de la fusion.
- Lien vers la PR, pas vers une release inexistante.
