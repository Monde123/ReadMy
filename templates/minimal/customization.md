# Personnaliser Minimal

Architecture `editorial` : peu de titres, deux filets, une sélection de projets en paragraphes. Le texte se lit sans le bandeau.

Tu n'as pas besoin d'ARCHITECTURE.md. Dix minutes suffisent.

## Copier

1. Copie [`README.md`](README.md) à la racine du dépôt GitHub qui porte ton identifiant (`<identifiant>/<identifiant>`), branche par défaut, dépôt public.
2. Copie aussi [`assets/`](assets/banner-light.svg) si tu gardes le bandeau. Les deux fichiers `banner-light.svg` et `banner-dark.svg` vont ensemble.
3. Le profil s'affiche sur `https://github.com/<identifiant>`.

La commande équivalente, depuis la racine de ReadMy :

```bash
node cli/readmy.js render --template minimal --out ./mon-profil
```

## Remplacer

Garde le `<h1>`, les deux `<hr/>` et le titre `Sélection`. Change seulement les faits.

| Texte de l'exemple | Par quoi |
|---|---|
| Inès Morel | Ton nom |
| Ingénieure logiciel | Ton rôle, en une ligne |
| Les deux paragraphes sous le rôle | Ce que tu fais, sans chiffre inventé |
| Bruine, Carnet | Tes dépôts, URL `https://` seulement |
| example-user | Ton identifiant |

Les personnes et dépôts de l'exemple sont fictifs. Le détail est dans [`metadata.yml`](metadata.yml).

## Images

Le bandeau est optionnel. Si tu le retires, supprime le bloc `<picture>` et garde le `<h1>` : la page reste lisible. Si tu le gardes, l'attribut `alt` doit décrire le nom et le rôle. Pas de Shields, Vercel, Heroku, skillicons, Demolab ni komarev.

## Sections que tu peux retirer

- Le second paragraphe, si une seule phrase suffit.
- Un projet de la sélection. Laisse-en au moins un, ou écris en commentaire HTML pourquoi la liste est vide.
- La ligne de liens, si tu n'as qu'un GitHub déjà nommé plus haut.

Ne retire pas le titre et le premier filet : c'est le rythme de cette architecture.

## Remix sans CLI

Le bloc copiable est [`headers/editorial.md`](../../components/headers/editorial.md). Tu peux le coller dans un README vide et remplir les `{{ }}` à la main.
