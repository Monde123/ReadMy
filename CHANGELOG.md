# Journal

Le format suit [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/). Les versions suivent le semver. La version 2.0.0 est rédigée et n'est pas publiée sur GitHub.

## [2.0.0] — 2026-10-06

### Ajouté

- Catalogue déclaratif de 10 gabarits : `minimal`, `engineer`, `student`, `academic`, `terminal`, `maintainer`, `creator`, `founder`, `security`, `journey`.
- Tokens de couleur clair/sombre et registre de composants en `2.0.0`.
- CLI `readmy` (`list`, `render`, `adapt`, `validate`) sans dépendance npm.
- Skill `readmy-profile-adapter` avec fixtures et exemple octocat.
- CI, validation hebdomadaire des liens relatifs, Dependabot pour GitHub Actions, modèle de notes de release.
- Audit, positionnement, architecture, décisions et rapport.

### Modifié

- Les 40 gabarits, composants, catalogues et docs de la v1 sont déplacés dans `archive/v1/`.
- La skill ne remplit plus les trous par des widgets distants ni par des faits inventés.

### Conservé

- Licence MIT, fichier `LICENSE` inchangé.

## [1.0.0] — 2026-09-23

Premier catalogue, documenté alors dans `docs/changelog.md`, maintenant [archive/v1/docs/changelog.md](archive/v1/docs/changelog.md). Cette version n'a jamais reçu d'étiquette git.

## État

Le journal couvre la reconstruction. Il ne remplace pas une release GitHub.

## Prochaines actions

Publier `2.0.0` seulement après validation de Moïse, à partir de [RELEASE_v2.0.0.md](RELEASE_v2.0.0.md).

## Risques

La section 1.0.0 résume un historique qui n'était pas versionné. Le détail reste le journal d'archive et les commits de septembre 2026.

### Notion bonus

- Base des versions avec l'état publié ou non.
- Lien vers le journal d'archive pour la v1.
- Case « étiquette git posée » encore vide.
