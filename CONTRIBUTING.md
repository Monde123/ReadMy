# Contribuer à ReadMy

## Plan

1. Lire l'architecture et l'anonymisation avant d'ajouter un gabarit.
2. Ajouter des données et un thème, puis générer le README.
3. Couvrir le changement par un test qui peut échouer.
4. Vérifier liens, SVG, contraste et absence de service distant.
5. Décrire le public et la décision dans la pull request.

## Avant de modifier

- [Architecture](ARCHITECTURE.md)
- [Décisions](DECISIONS.md)
- [Positionnement](POSITIONNEMENT.md)
- [Code de conduite](CODE_OF_CONDUCT.md)

Les personnes, dépôts, chiffres et organisations des exemples sont fictifs. On ne copie pas un profil réel dans le catalogue.

## Ajouter un gabarit

Créer `templates/<id>/` avec `template.yml` et `profile.example.yml`. L'`id` est le nom du dossier, en minuscules. Réutiliser les composants de `components/registry.json`. Un composant nouveau monte sa version dans le registre et dans `lib/render.js`, avec un test.

Puis :

```bash
node tools/build.js
node --test tests/*.test.js
node tools/validate.js
```

Le README et les SVG générés se committent. Les éditer à la main fait échouer la comparaison avec le rendu.

Node 22 suffit. Il n'y a pas de `npm install`.

## Ce qui fait échouer la revue

- Une image Shields, Vercel, Heroku, skillicons, Demolab ou komarev.
- Un fait inventé pour remplir une section (étoile, diplôme, revenu, dépôt).
- Une couleur de texte sous 4,5:1.
- Un secret, même factice, dans un profil exemple.
- Une procédure d'attaque dans le gabarit `security`.

## Pull request

Indiquer le public, le gabarit ou le composant touché, et le résultat de `node --test tests/*.test.js`. Une intention par pull request.

## État

Le chemin de contribution est la CLI et les tests de cette branche.

## Prochaines actions

Le premier gabarit extérieur devrait réutiliser les composants existants, pour vérifier que le guide suffit.

## Risques

Le sous-ensemble YAML refuse des documents que d'autres outils acceptent. L'erreur nommée est le signal attendu, pas un README écrit à la main.

### Notion bonus

- Modèle de tâche « nouveau gabarit » avec les trois commandes.
- Liste des composants autorisés, liée au registre.
- Case « tests collés dans la PR ».
