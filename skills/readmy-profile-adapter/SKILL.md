---
name: readmy-profile-adapter
description: Produit un README de profil ReadMy à partir d'un gabarit et d'un profil GitHub public, sans inventer de faits et sans service tiers.
---

# Skill ReadMy — adaptateur de profil

## Plan

1. Lire le gabarit demandé et le profil public autorisé.
2. Appliquer le consentement : lieu, email, organisation et réseau sont exclus par défaut.
3. Laisser un placeholder explicite quand un fait manque.
4. Produire le Markdown, les SVG locaux et la provenance.
5. Demander à la personne les trous restants, sans les remplir.

## Entrées

Objet JSON :

- `template` : identifiant du catalogue (`minimal`, `engineer`, `student`, `academic`, `terminal`, `maintainer`, `creator`, `founder`, `security`, `journey`).
- `github` : sous-ensemble public. Champs lus : `login`, `name`, `bio`, `company`, `blog`, `location`, `email`, `twitter_username`, `repos[]` (`name`, `html_url`, `description`, `language`, `stargazers_count`, `fork`).
- `consent` : booléens `showLocation`, `showEmail`, `showCompany`, `showSocial`. Défaut documenté : `false`.
- `overrides` : faits confirmés par la personne (`role`, `summary`, `projects`, `email`). Une chaîne vide est une erreur, pas un repli silencieux.

Commande :

```bash
node cli/readmy.js adapt --template minimal --profile profil.json --out ./profil
```

## Sorties

- `README.md` prêt à copier.
- `assets/banner-light.svg` et `assets/banner-dark.svg`.
- `provenance.json` : `placeholders`, `warnings`, `provenance` (`github.*`, `user`, `placeholder`, `omis`, `defaut`).

Le rôle absent devient le texte `{{role}}`. La bio absente omet la prose. Aucun dépôt fictif n'est ajouté pour remplir une grille.

## Interdits

N'invente aucun dépôt, chiffre, diplôme, récompense ou intitulé de poste.

N'ajoute pas d'email, de lieu, d'employeur ni de réseau social sans consentement explicite. N'inclus pas de donnée personnelle qui ne sert pas le README. N'insère pas de badge Shields, de carte Vercel, Heroku, skillicons ou tout autre service distant. N'exécute pas la commande si le profil contient un secret : le rendu s'arrête avec `SECRET_DETECTE` sans répéter le secret.

## Exemple de référence

Le fichier `fixtures/octocat.json` produit `examples/octocat-minimal/`. Le dépôt `Hello-World` est repris. Le fork `Spoon-Knife` est exclu. `San Francisco` et `octocat@example.com` sont absents tant que le consentement reste faux. Le rôle reste `{{role}}`.

## État

Le contrat est exécuté par `lib/adapt.js` et couvert par `tests/adapt.test.js`.

## Prochaines actions

Brancher une lecture optionnelle de l'API GitHub publique, hors CI, avec le même objet de sortie.

## Risques

Un agent peut quand même proposer des overrides inventés. La provenance marque ces overrides `user` et avertit si le dépôt n'existe pas dans `github.repos`.

### Notion bonus

- Base « Profils adaptés » avec colonnes gabarit, placeholders, consentement.
- Case « faits confirmés par la personne » obligatoire avant de vider un placeholder.
- Vue des avertissements `projet hors GitHub public`.
