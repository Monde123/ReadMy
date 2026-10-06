# Personnaliser Mainteneur

Architecture `desk` : un bureau en trois colonnes, dépôt, engagement, langage, puis les règles de maintenance et la file d'accueil. Ce n'est pas une fiche RFC : il n'y a pas de paramètres système, il y a ce que tu tiens dans le temps.

## Copier

1. Copie [`README.md`](README.md) à la racine de ton dépôt profil.
2. Copie [`assets/banner-light.svg`](assets/banner-light.svg) et le SVG sombre si tu gardes l'en-tête en colonnes.
3. Sur mobile, le tableau doit rester compréhensible. Si une cellule est trop longue, raccourcis l'engagement, ne retire pas la colonne.

```bash
node cli/readmy.js render --template maintainer --out ./mon-profil
```

## Remplacer

Garde les titres `Bureau`, `Règles de maintenance` et `File d'accueil`.

| Texte de l'exemple | Par quoi |
|---|---|
| Camille Bernard | Ton nom |
| Mainteneuse open source | Ton rôle |
| lice, rebord | Les dépôts que tu maintiens vraiment |
| La phrase d'engagement | Ce que tu fais sur ce dépôt, pas un nombre d'étoiles inventé |
| Les trois règles | Tes règles d'accueil |
| example.com/soutien | Le lien de soutien seulement s'il existe |

Voir [`metadata.yml`](metadata.yml).

## Images

Optionnelles. Le tableau est le contenu. Pas de badge d'étoiles Shields : si tu indiques un nombre, il doit venir du dépôt et rester du texte.

## Sections que tu peux retirer

- `Tenue`, si le tableau parle déjà.
- Une règle.
- `File d'accueil` seulement si chaque dépôt a déjà son URL.

Garde au moins deux dépôts si tu en tiens deux. Un seul dépôt est acceptable : laisse une ligne, pas une grille vide.

## Remix sans CLI

Le tableau est [`projects/maintenance-desk.md`](../../components/projects/maintenance-desk.md).
