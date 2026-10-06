# Personnaliser Création

Architecture `studio` : une intention, les matières, puis un mur de planches. Chaque projet est `Planche 01`, `Planche 02`, suivi d'un filet. Ce n'est ni un pitch numéroté en problèmes, ni une sélection éditoriale.

## Copier

1. Copie [`README.md`](README.md) à la racine de `<identifiant>/<identifiant>`.
2. Le double cadre du bandeau est optionnel : [`assets/banner-light.svg`](assets/banner-light.svg).
3. Vérifie qu'un filet `<hr/>` sépare encore les planches après ton édition.

```bash
node cli/readmy.js render --template creator --out ./mon-profil
```

## Remplacer

Garde `Atelier`, `Mur d'atelier` et le mot `Planche`.

| Texte de l'exemple | Par quoi |
|---|---|
| Hanaé Wolff | Ton nom |
| Designeuse d'interfaces | Ton rôle |
| Figma, CSS, TypeScript | Tes matières réelles |
| Atelier, Lisiere | Tes planches, une par projet |
| La description | Ce qu'on voit, pas une métrique d'audience |

Les maquettes de l'exemple sont fictives. [`metadata.yml`](metadata.yml).

## Images

Le gabarit n'exige pas d'image. Si tu ajoutes une capture, place un SVG ou un fichier du dépôt dans `assets/`, avec un `alt`. Pas d'hébergeur de badges.

## Sections que tu peux retirer

- `Matières`, si chaque planche nomme déjà son outil.
- `Intention`, si le mur suffit.
- Une planche. Renumérote `01`, `02` sans trou.

Ne passe pas les planches en tableau : le mur se lit planche par planche.

## Remix sans CLI

Copie [`projects/planches.md`](../../components/projects/planches.md).
