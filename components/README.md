# Composants

Le registre versionné est [`registry.json`](registry.json). Chaque entrée `2.0.0` a une fonction dans [`lib/render.js`](../lib/render.js).

| Composant | Rôle |
|---|---|
| banner | SVG local clair et sombre |
| identity | Nom, rôle, et lieu ou organisation seulement s'ils sont écrits |
| prose | Résumé et focus |
| projects | Liste ou tableau |
| stack | Groupes de technologies, sans badge distant |
| publications | Année, titre, support |
| timeline | Parcours |
| checklist | Statuts `fait`, `encours`, `prevu` |
| pitch | Problème, offre, preuve |
| principles | Principes rédigés par l'auteur |
| links | URL `https` ou `mailto` |
| colophon | Mention ReadMy et absence de service tiers |

Les blocs Markdown de la v1 sont dans [`archive/v1/components`](../archive/v1/components/README.md).

## État

Le registre et le rendu portent la même version `2.0.0`.

## Prochaines actions

Toute addition met à jour ce tableau, le JSON, le rendu et un test.

## Risques

Un composant décrit ici et absent du registre fait échouer `COMPOSANT_INCONNU` dès qu'un gabarit le nomme. L'inverse, un composant de registre oublié dans ce tableau, n'est pas bloquant : le test de contraste et de rendu ne lit pas ce fichier. Garder les deux alignés à la main.

### Notion bonus

- Base des composants avec la version.
- Lien vers le test qui refuse un composant dupliqué.
- Rappel : pas de badge Shields dans un nouveau bloc.
