# Issues proposées

Ces issues ne sont pas créées sur GitHub. Moïse peut les ouvrir après lecture. L'étiquette suggérée est `good first issue`, définie dans [labels.yml](labels.yml) et non appliquée automatiquement.

## 1. Exemple d'overrides complet

Fichier : `skills/readmy-profile-adapter/fixtures/`.

Ajouter une fixture où `overrides.role` et `overrides.projects` sont remplis par la personne, puis un test qui vérifie la provenance `user` et l'avertissement si le nom de dépôt n'est pas dans `github.repos`.

Critère : le test échoue si l'avertissement disparaît.

## 2. Poids total des SVG

Fichier : `tests/catalog.test.js`.

Ajouter une assertion : la somme des octets des vingt SVG de gabarit reste sous 40 000. La valeur actuelle se mesure avec `wc -c templates/*/assets/*.svg`.

Critère : le test échoue si un bandeau embarque une image encodée.

## 3. Documenter le code `SECTION_NON_AFFICHEE`

Fichier : `ARCHITECTURE.md`.

Le code existe dans `lib/render.js`. Ajouter un exemple YAML minimal qui le déclenche, et un test déjà proche dans `tests/render.test.js` s'il manque cet exemple dans la doc.

Critère : une personne qui colle un `pitch` dans `minimal` voit l'erreur sans lire le code.

## 4. Vérifier la largeur du gabarit terminal

Fichier : `QUALITE.md`.

Ouvrir `templates/terminal/README.md` dans un viewport de 360 px et noter si le bandeau déborde ou se met à l'échelle. Écrire le constat, pas une impression.

Critère : une phrase avec la largeur testée et le comportement observé.

## 5. Gabarit enseignant, seulement s'il réutilise les composants

Dossier : `templates/enseignant/`.

Réutiliser `banner`, `identity`, `prose`, `checklist`, `links`, `colophon`. Pas de composant nouveau. Profil fictif, sans établissement réel.

Critère : `node tools/validate.js` reste vert et le nombre de gabarits du test de catalogue est mis à jour exprès.

## État

Liste prête, issues non ouvertes.

## Prochaines actions

Moïse choisit lesquelles créer. Le fichier peut rester si aucune n'est retenue.

## Risques

L'issue 5 élargit le catalogue. Elle n'est un bon premier pas que si les composants suffisent. Sinon la laisser fermée.

### Notion bonus

- Tableau des cinq propositions avec colonne « créée oui/non ».
- Lien vers `labels.yml` pour l'étiquette à poser à la main.
- Ne pas importer cette liste en masse.
