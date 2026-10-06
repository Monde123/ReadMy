# Galerie

## Plan

1. Montrer les dix gabarits actifs.
2. Lier chaque README généré et son bandeau clair.
3. Rappeler le public principal.
4. Laisser l'archive v1 accessible sans la présenter comme le catalogue.
5. Régénérer cette liste si un gabarit est ajouté.

| Gabarit | Public | Thème | Bandeau | Aperçu |
|---|---|---|---|---|
| [minimal](templates/minimal/README.md) | Débutant, professionnel | paper | filet | [SVG](templates/minimal/assets/banner-light.svg) |
| [engineer](templates/engineer/README.md) | Professionnel | ink | fiche | [SVG](templates/engineer/assets/banner-light.svg) |
| [student](templates/student/README.md) | Étudiant | paper | manchette | [SVG](templates/student/assets/banner-light.svg) |
| [academic](templates/academic/README.md) | Recherche | paper | manchette | [SVG](templates/academic/assets/banner-light.svg) |
| [terminal](templates/terminal/README.md) | Créateur | ink | terminal | [SVG](templates/terminal/assets/banner-light.svg) |
| [maintainer](templates/maintainer/README.md) | Mainteneur | ink | fiche | [SVG](templates/maintainer/assets/banner-light.svg) |
| [creator](templates/creator/README.md) | Créateur | violet | manchette | [SVG](templates/creator/assets/banner-light.svg) |
| [founder](templates/founder/README.md) | Produit | signal | filet | [SVG](templates/founder/assets/banner-light.svg) |
| [security](templates/security/README.md) | Sécurité défensive | ink | fiche | [SVG](templates/security/assets/banner-light.svg) |
| [journey](templates/journey/README.md) | Parcours | paper | filet | [SVG](templates/journey/assets/banner-light.svg) |

L'ancien catalogue de 40 gabarits est dans [archive/v1](archive/v1/README.md).

## État

Les aperçus sont les fichiers produits par `node tools/build.js`.

## Prochaines actions

Ajouter une ligne ici en même temps qu'un dossier `templates/<id>/`.

## Risques

Un bandeau trop long peut être coupé à l'écran. Le titre HTML du gabarit contient le texte complet.

### Notion bonus

- Galerie embed des dix SVG.
- Colonne « dernier rendu » avec le hash du README.
- Lien d'archive séparé pour ne pas mélanger v1 et v2.
