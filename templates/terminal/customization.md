# Personnaliser Terminal

Architecture `tui` : une seule session shell. `whoami`, `cat`, `ls`, `printenv`, `exit`. Le bandeau est une fenêtre. Le texte utile est dans le bloc `<pre>`, lisible sans image.

## Copier

1. Copie [`README.md`](README.md) vers la racine de ton dépôt profil.
2. Copie les SVG de [`assets/`](assets/banner-dark.svg) si tu gardes la fenêtre.
3. Vérifie que le `<pre>` n'a pas été coupé par un triple accent grave collé dans une description.

```bash
node cli/readmy.js render --template terminal --out ./mon-profil
```

## Remplacer

Garde les commandes `$`. Change les réponses.

| Texte de l'exemple | Par quoi |
|---|---|
| Samir Adler | Ton nom, derrière `$ whoami` |
| Développeur d'outils en ligne de commande | Ton rôle, sur la même réponse |
| sentier, marge | Tes commandes ou dépôts |
| Rust, Go | Les langages réellement présents dans ces dépôts |
| example-user | Ton identifiant |

Ne mets pas de secret, de jeton ni de mot de passe dans la session : le rendu s'arrête, et le README ne doit pas en contenir non plus. Détail : [`metadata.yml`](metadata.yml).

## Images

Tu peux supprimer le `<picture>`. La session reste le profil. Pas de badge dans le `<pre>`.

## Sections que tu peux retirer

- `$ printenv STACK` si tu ne veux pas lister de langages.
- `$ links` si les URL sont déjà sous `$ ls`.
- Une entrée de `$ ls`. Laisse la commande, même si la réponse dit qu'il n'y a aucun projet.

## Remix sans CLI

Copie [`headers/terminal-session.md`](../../components/headers/terminal-session.md). Remplace les `{{ }}` sans casser le `<pre>`.
