# Personnaliser Parcours

Architecture `chronicle` : un fil court, puis une chronique. Chaque épisode est un titre `période — intitulé` et un paragraphe. Le projet ouvert est un chapitre, pas une carte.

## Copier

1. Copie [`README.md`](README.md) à la racine de `<identifiant>/<identifiant>`.
2. Le filet vertical du bandeau est optionnel : [`assets/banner-light.svg`](assets/banner-light.svg).
3. Vérifie l'ordre des dates : du plus ancien au plus récent, comme dans l'exemple.

```bash
node cli/readmy.js render --template journey --out ./mon-profil
```

## Remplacer

Garde `Chronique` et la forme `année — titre`.

| Texte de l'exemple | Par quoi |
|---|---|
| Awa Ndiaye | Ton nom |
| Ingénieure système | Ton rôle actuel |
| Lyon | Ta ville seulement si tu acceptes de la publier |
| 2018, 2021, 2024 | Tes périodes réelles |
| Reprise | Le travail que tu montres maintenant |

N'invente pas d'employeur ni de promotion. Si une période est floue, écris l'année que tu peux assumer ou retire l'épisode. Voir [`metadata.yml`](metadata.yml).

## Images

Optionnelles. Les titres d'épisodes portent le récit. Pas de frise distante.

## Sections que tu peux retirer

- `Fil`, si la chronique commence assez clairement.
- `Chapitre en cours`, si tu ne montres pas de dépôt.
- Un épisode. Deux épisodes suffisent à garder la chronique.

Ne remplace pas les titres d'épisodes par un tableau : ce gabarit se lit de haut en bas.

## Remix sans CLI

Le bloc est [`timelines/chronique.md`](../../components/timelines/chronique.md).
