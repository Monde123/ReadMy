# Contribuer à ReadMy

## Plan

1. Lire un gabarit actif et son `customization.md` avant d'en ajouter un.
2. Choisir une architecture qui n'existe pas encore. Une variante de couleur du même squelette est refusée.
3. Écrire les faits fictifs, générer le README, puis relire la page comme un développeur qui ne lancera pas la CLI.
4. Couvrir le changement par un test qui peut échouer.
5. Vérifier liens, SVG, contraste et absence de service distant.

## Avant de modifier

- [Positionnement](POSITIONNEMENT.md)
- [Décisions](DECISIONS.md)
- [Architecture](ARCHITECTURE.md)
- [Code de conduite](CODE_OF_CONDUCT.md)

Les personnes, dépôts, chiffres et organisations des exemples sont fictifs. On ne copie pas un profil réel dans le catalogue.

## Ajouter un gabarit

Créer `templates/<id>/` avec :

- `template.yml` — `layout` obligatoire, différent des layouts déjà pris
- `profile.example.yml` — faits fictifs seulement
- `metadata.yml` — `id`, `title`, `category`, `audience`, `style.architecture` égal au layout, `sections`, `anonymized: true`, images locales
- `customization.md` — en français, avec la section « Remplacer »
- `assets/` — produits par le rendu, SVG clair et sombre

L'`id` est le nom du dossier, en minuscules. Un layout nouveau se code dans `lib/layouts.js` et s'ajoute à `LAYOUTS`. Un bloc copiable nouveau vit dans `components/`, avec une entrée `blocks` du registre.

Puis :

```bash
node tools/build.js
node --test tests/*.test.js
node tools/validate.js
```

Le README généré se committe. Le modifier à la main fait échouer la comparaison avec le rendu. Pour un profil personnel, on copie le README et on suit `customization.md` : ce fichier-là n'est pas régénéré.

Node 22 suffit. Il n'y a pas de `npm install`.

## Remix manuel

`components/` contient des blocs Markdown avec des `{{ }}`. Ils servent sans la CLI. Le générateur ne les lit pas ligne à ligne : il possède la même géométrie dans `lib/layouts.js`. Si tu changes un bloc copiable, dis-le dans la pull request, et aligne le layout seulement si le gabarit actif doit suivre.

## Ce qui fait échouer la revue

- Une image Shields, Vercel, Heroku, skillicons, Demolab, githubusercontent ou komarev dans le catalogue actif.
- Un fait inventé pour remplir une section.
- Deux gabarits avec le même `layout`.
- Une couleur de texte sous 4,5:1.
- Un secret, même factice, dans un profil exemple.
- Une procédure d'attaque dans le gabarit `security`.

## Pull request

Indiquer le public, l'architecture, et le résultat de `node --test tests/*.test.js`. Une intention par pull request.

## État

Le chemin court pour un utilisateur est la galerie. Le chemin de contribution est la CLI, les layouts et les tests.

## Prochaines actions

Le prochain gabarit doit occuper un trou (enseignement, écriture), pas une nouvelle couleur d'un layout existant.

## Risques

Le sous-ensemble YAML refuse des documents que d'autres outils acceptent. L'erreur nommée est le signal attendu.

### Notion bonus

- Modèle de tâche « nouveau layout » avec les trois commandes.
- Liste des architectures déjà prises.
- Case « customization.md relu sans ouvrir ARCHITECTURE.md ».
