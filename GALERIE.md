# Galerie

## Plan

1. Montrer les dix gabarits actifs et leur architecture.
2. Lier chaque README et son guide.
3. Rappeler que l'image est optionnelle.
4. Laisser les archives accessibles sans les présenter comme le catalogue.

| Gabarit | Architecture | Guide | Bandeau |
|---|---|---|---|
| [minimal](templates/minimal/README.md) | Éditorial, basse densité | [guide](templates/minimal/customization.md) | [SVG](templates/minimal/assets/banner-light.svg) |
| [engineer](templates/engineer/README.md) | Fiche RFC | [guide](templates/engineer/customization.md) | [SVG](templates/engineer/assets/banner-light.svg) |
| [terminal](templates/terminal/README.md) | Session shell | [guide](templates/terminal/customization.md) | [SVG](templates/terminal/assets/banner-light.svg) |
| [student](templates/student/README.md) | Jalons | [guide](templates/student/customization.md) | [SVG](templates/student/assets/banner-light.svg) |
| [academic](templates/academic/README.md) | Bibliographie | [guide](templates/academic/customization.md) | [SVG](templates/academic/assets/banner-light.svg) |
| [founder](templates/founder/README.md) | Pitch en trois lames | [guide](templates/founder/customization.md) | [SVG](templates/founder/assets/banner-light.svg) |
| [security](templates/security/README.md) | Note défensive | [guide](templates/security/customization.md) | [SVG](templates/security/assets/banner-light.svg) |
| [journey](templates/journey/README.md) | Chronique | [guide](templates/journey/customization.md) | [SVG](templates/journey/assets/banner-light.svg) |
| [maintainer](templates/maintainer/README.md) | Bureau de maintenance | [guide](templates/maintainer/customization.md) | [SVG](templates/maintainer/assets/banner-light.svg) |
| [creator](templates/creator/README.md) | Mur de planches | [guide](templates/creator/customization.md) | [SVG](templates/creator/assets/banner-light.svg) |

L'ancien catalogue de 40 gabarits est dans [archive/v1](archive/v1/README.md). Le squelette unique de la v2 générique est dans [archive/v2-generic](archive/v2-generic/README.md).

## État

Les README et les SVG sont produits par `node tools/build.js`. Les guides `customization.md` sont écrits à la main.

## Prochaines actions

Ajouter une ligne ici en même temps qu'un layout nouveau.

## Risques

Un bandeau trop long peut être coupé à l'écran. Le titre du gabarit contient le texte complet, et le README répète le nom en HTML.

### Notion bonus

- Galerie avec la colonne architecture.
- Lien vers le guide, pas seulement vers le README.
- Rappel : pas de service tiers dans les images.
