# Personnaliser Sécurité

Architecture `briefing` : une manchette `DIFFUSION : DÉFENSIVE`, un périmètre, des principes, des travaux de durcissement, un canal de signalement. Ce gabarit ne décrit pas comment attaquer un système.

## Copier

1. Copie [`README.md`](README.md) à la racine de ton dépôt profil.
2. Le cadre du bandeau est optionnel : [`assets/banner-light.svg`](assets/banner-light.svg) et `banner-dark.svg`.
3. Relis la page et retire toute commande qui reproduirait un problème de sécurité.

```bash
node cli/readmy.js render --template security --out ./mon-profil
```

## Remplacer

Garde la manchette et la phrase qui dit que la note ne contient pas de procédure d'attaque.

| Texte de l'exemple | Par quoi |
|---|---|
| Léa Fischer | Ton nom |
| Ingénieure sécurité produit | Ton rôle |
| Le périmètre | Ce que tu protèges ou ce que tu revues |
| Les trois principes | Tes règles de défense |
| Garde-fou, Dependances | Tes outils de durcissement, pas un mode opératoire |
| example.com/security | Ton canal de signalement `https://` |

N'écris pas de charge utile, de shell distant, ni de commande d'exploitation. Un secret, même factice au format d'un jeton, ne doit pas apparaître. Détail : [`metadata.yml`](metadata.yml).

## Images

Optionnelles. La manchette texte suffit. Pas de badge « secured by ».

## Sections que tu peux retirer

- Un travail de durcissement.
- `Principes de défense` seulement si le périmètre dit déjà la règle. Mieux : garde la liste et raccourcis-la.
- Ne retire pas `Divulgation coordonnée` si tu invites les rapports. Décris l'accusé et le délai, pas la reproduction.

## Remix sans CLI

Le pied de page est [`footers/divulgation.md`](../../components/footers/divulgation.md). Le reste de la note reste dans le README.
