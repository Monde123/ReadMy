# Personnaliser Ingénieure

Architecture `rfc` : une manchette en texte brut, un résumé en citation, un tableau de paramètres, des invariants numérotés, puis des systèmes côte à côte. Ce n'est pas une liste de projets.

## Copier

1. Copie [`README.md`](README.md) à la racine de `<identifiant>/<identifiant>`.
2. Copie [`assets/banner-light.svg`](assets/banner-light.svg) et `banner-dark.svg` seulement si tu gardes l'image.
3. Lis le résultat sur GitHub avant de publier : le tableau à deux colonnes doit rester lisible sur téléphone. S'il déborde, passe un système par ligne en gardant le même titre de section.

```bash
node cli/readmy.js render --template engineer --out ./mon-profil
```

## Remplacer

Garde `FORMAT RFC`, les titres numérotés et le tableau `Paramètre / Valeur`.

| Texte de l'exemple | Par quoi |
|---|---|
| Marc Elbaz | Ton nom |
| Ingénieur plateforme | Ton rôle |
| Atelier Nord | Ton organisation, ou supprime la ligne |
| Go, Python, Linux, PostgreSQL | Ce que tu utilises vraiment |
| Les trois invariants | Tes règles, écrites par toi. N'ajoute pas MUST si tu ne le penses pas |
| Quai, Balise | Tes systèmes, avec une URL `https://` |

L'exemple est fictif. Voir [`metadata.yml`](metadata.yml).

## Images

Optionnelles. Le bloc `<pre>` contient déjà le nom et le rôle. Pas d'image distante.

## Sections que tu peux retirer

- `Correspondance`, si les URL sont déjà dans les systèmes.
- Une ligne du tableau de paramètres.
- Un des deux systèmes. Garde le tableau, même avec une seule cellule.

Ne transforme pas la fiche en liste à puces : ce gabarit se reconnaît au format RFC.

## Remix sans CLI

Pars des blocs [`headers/rfc-masthead.md`](../../components/headers/rfc-masthead.md) et [`tech-stacks/parameter-table.md`](../../components/tech-stacks/parameter-table.md).
