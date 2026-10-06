# Positionnement ReadMy

## Plan

1. Écrire la promesse en une phrase et nommer les personnes visées.
2. Dire ce que ReadMy tient et ce que les générateurs de cartes tiennent mieux.
3. Fixer quatre piliers : zéro service fragile, Markdown et SVG, contribution courte, gouvernance écrite.
4. Découper 3, 6 et 12 mois sans promettre de calendrier d'équipe.
5. Laisser les choix irréversibles hors de cette feuille de route.

## Promesse

ReadMy fournit un README de profil GitHub lisible dans un an, composé de données, d'un thème et d'images SVG locales.

## Personnes visées

- Débutants qui veulent un profil clair en une commande, sans apprendre un mur de badges.
- Professionnels qui veulent une fiche, un tableau de dépôts ou un parcours, avec des faits vérifiables.
- Étudiants qui montrent un apprentissage et des projets, sans inventer de moyenne ni de prix.
- Créateurs, mainteneurs et fondateurs qui ont besoin d'une page courte : terminal, vitrine, offre.

## Différence

Les générateurs (GPRM, README Maker, awesome-github-profile-readme) gagnent sur la découverte et sur les cartes live. github-readme-stats gagne quand la personne veut un chiffre qui bouge. ReadMy gagne quand la page doit rester entière sans appel réseau au moment de la lecture, et quand une skill doit refuser d'inventer un diplôme, un revenu ou un dépôt.

## Piliers

1. Aucune image ne dépend de Shields, Vercel, Heroku, skillicons, Demolab ou komarev. Les liens `https://github.com/...` et `https://example.com/...` restent des liens, pas des images.
2. Le format de sortie est Markdown GitHub plus SVG dans le même dossier.
3. Ajouter un gabarit, c'est ajouter `template.yml` et `profile.example.yml`, puis lancer le rendu. Pas de second fichier à maintenir à la main.
4. Les décisions prises sans Moïse sont dans `DECISIONS.md`. La licence MIT reste celle du dépôt.

## Catalogue retenu

Dix gabarits : `minimal`, `engineer`, `student`, `academic`, `terminal`, `maintainer`, `creator`, `founder`, `security`, `journey`. Le détail du tri est dans `AUDIT.md`.

## Feuille de route

### Dans le lot v2 (ce dépôt)

Catalogue déclaratif, skill à entrées bornées, CLI sans dépendance, CI, archive v1, notes de version rédigées et non publiées.

### Trois mois

- Recueillir quels gabarits d'archive une personne veut vraiment réécrire.
- Ajouter un seul gabarit nouveau s'il occupe un trou (écriture, enseignement), pas une variante de couleur.
- Documenter un exemple d'API GitHub publique branchée sur le même objet que les fixtures, hors CI.

### Six mois

- Aperçus figés (SVG déjà versionnés) dans la galerie, produits par la CLI.
- Traduction des profils exemples si une locale est demandée, via un champ explicite, pas via une deuxième copie du rendu.
- Étiquettes GitHub appliquées depuis `.github/labels.yml` après validation.

### Douze mois

- Décider si la CLI sort du mode `private` et sous quel nom de paquet. Cette publication n'est pas faite ici.
- Revoir le catalogue : retirer un gabarit qui n'a pas servi, en le laissant dans l'archive.
- Évaluer une page web statique générée par la même CLI. Pas de service de statistiques.

## État

La promesse tient dans le catalogue v2 actuel. La suite dépend de l'usage réel après la fusion, pas d'un élargissement anticipé.

## Prochaines actions

Moïse valide ou corrige la liste des dix gabarits. Les retours d'archive se font gabarit par gabarit.

## Risques

Un catalogue de dix pages peut sembler pauvre face à une liste de quarante. La pauvreté utile est le contrat : chaque page a un rendu testé. Redevenir une vitrine de widgets recréerait le risque n°2 de l'audit.

### Notion bonus

- Page « Promesse » avec la phrase unique et les quatre publics.
- Tableau de route 3 / 6 / 12 mois, statut vide tant que `main` n'a pas la v2.
- Lien vers les cinq décisions majeures de `DECISIONS.md`.
