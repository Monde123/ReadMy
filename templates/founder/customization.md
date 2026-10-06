# Personnaliser Produit

Architecture `pitch` : trois lames numérotées, `01 — Problème`, `02 — Offre`, `03 — Preuve`, puis le dépôt. Chaque lame est un paragraphe court. Pas de tableau de métriques.

## Copier

1. Copie [`README.md`](README.md) à la racine de `<identifiant>/<identifiant>`.
2. Le grand `01` du bandeau est dans [`assets/banner-light.svg`](assets/banner-light.svg). Tu peux le retirer.
3. Relis à voix haute : si une lame dépasse quatre lignes, coupe.

```bash
node cli/readmy.js render --template founder --out ./mon-profil
```

## Remplacer

Garde les numéros `01`, `02`, `03`.

| Texte de l'exemple | Par quoi |
|---|---|
| Omar Diallo | Ton nom |
| Fondateur d'un outil de notes d'équipe | Ton rôle |
| Le problème | Le problème que tu as observé, sans taille de marché inventée |
| L'offre | Ce que le produit fait |
| La preuve | Un fait vérifiable, souvent le dépôt |
| Seance | Le dépôt public |

Pas de revenu, de nombre d'utilisateurs ni de levée de fonds dans l'exemple, et pas dans ta copie si tu ne peux pas le montrer. Voir [`metadata.yml`](metadata.yml).

## Images

Optionnelles. Les trois titres portent le pitch. Pas de capture hébergée chez un tiers : si tu ajoutes une image, elle doit vivre dans `assets/` avec un `alt`.

## Sections que tu peux retirer

- `04 — Dépôt` si la preuve contient déjà l'URL.
- `05 — Contact` si une seule adresse suffit dans la preuve.
- Ne retire pas une des trois premières lames. Si le fait manque, laisse le titre et un commentaire HTML plutôt qu'une phrase inventée.

## Remix sans CLI

Les trois lames sont dans [`pitch/trois-lames.md`](../../components/pitch/trois-lames.md).
