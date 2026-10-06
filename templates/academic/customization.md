# Personnaliser Recherche

Architecture `bibliography` : une question, puis une liste numérotée année, titre, support. Pas de grille de projets. Les références de l'exemple sont fictives : remplace-les par des textes que tu as réellement écrits, ou retire la ligne.

## Copier

1. Copie [`README.md`](README.md) à la racine de ton dépôt profil.
2. Copie [`assets/banner-light.svg`](assets/banner-light.svg) et le SVG sombre seulement si tu gardes le bandeau.
3. Ouvre la page GitHub et vérifie que chaque titre de la bibliographie est un lien `https://`.

```bash
node cli/readmy.js render --template academic --out ./mon-profil
```

## Remplacer

Garde `Page de recherche`, le titre `Question` et le titre `Bibliographie`.

| Texte de l'exemple | Par quoi |
|---|---|
| Nora Belkacem | Ton nom |
| Chargée de recherche | Ton rôle réel |
| La question | Ton sujet, en prose |
| Cahiers fictifs, Actes fictifs | Le vrai support, ou supprime l'entrée |
| example.com/notes | L'URL du texte |

N'ajoute pas de citation, de h-index ni de classement. [`metadata.yml`](metadata.yml) marque l'exemple comme anonymisé.

## Images

Optionnelles. La bibliographie est le contenu. Pas de badge de revue.

## Sections que tu peux retirer

- `Adresses`, si la page de recherche est déjà le seul lien.
- Une référence. Une bibliographie d'un seul texte est valide.
- Le second paragraphe de la question.

Ne transforme pas cette page en tableau de dépôts : ce gabarit est une bibliographie.

## Remix sans CLI

Copie [`timelines/bibliographie.md`](../../components/timelines/bibliographie.md).
