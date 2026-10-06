# Personnaliser Étudiante

Architecture `roadmap` : un état des lieux, un tableau de jalons (`fait`, `en cours`, `prévu`), puis l'atelier. Le rythme est celui d'une feuille de route, pas d'un CV en liste.

## Copier

1. Copie [`README.md`](README.md) à la racine de `<identifiant>/<identifiant>`.
2. Le bandeau de [`assets/banner-light.svg`](assets/banner-light.svg) répète les trois statuts. Il est optionnel.
3. Publie sur la branche par défaut.

```bash
node cli/readmy.js render --template student --out ./mon-profil
```

## Remplacer

Garde les titres `Où j'en suis`, `Jalons` et `Atelier`, et la colonne `Statut`.

| Texte de l'exemple | Par quoi |
|---|---|
| Lina Costa | Ton nom |
| Étudiante en informatique | Ton rôle ou ta formation, sans diplôme inventé |
| Les trois jalons | Ce qui est réellement fait, en cours, ou prévu. N'invente pas de note ni de prix |
| Boussole | Un projet que tu peux montrer |
| example.com/lina-cv | Ton CV seulement si tu veux le rendre public |

Les statuts acceptés par la CLI sont `fait`, `encours`, `prevu`. Dans le README affiché, ils deviennent `fait`, `en cours`, `prévu`. Voir [`metadata.yml`](metadata.yml).

## Images

Optionnelles. Le tableau de jalons porte l'information. Pas de carte de statistiques distante.

## Sections que tu peux retirer

- `Outils en cours`, si le tableau de jalons suffit.
- `Suivi`, si tu n'as pas de lien à part GitHub.
- Un jalon. Garde les trois statuts seulement s'ils sont vrais : une ligne `prévu` vide ne doit pas être remplie par un objectif fictif.

## Remix sans CLI

Le tableau copiable est [`timelines/jalons.md`](../../components/timelines/jalons.md).
