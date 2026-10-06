# Composants

Deux usages.

Le moteur lit [`registry.json`](registry.json) : les clés `components` sont les blocs que `lib/render.js` sait assembler. Les gabarits actifs ne passent plus par le même assemblage. Chacun a un `layout` (`editorial`, `rfc`, `tui`, `roadmap`, `bibliography`, `pitch`, `briefing`, `chronicle`, `desk`, `studio`).

Les fichiers Markdown de ce dossier sont l'autre usage : des blocs à copier dans un README, sans CLI. Remplace les `{{ }}`. N'invente pas un dépôt, un diplôme ou un chiffre pour remplir un trou. Pas de Shields, Vercel, Heroku, skillicons, Demolab ni komarev.

## En-têtes

| Bloc | Architecture |
|---|---|
| [editorial](headers/editorial.md) | Nom, rôle, deux filets |
| [rfc-masthead](headers/rfc-masthead.md) | Manchette de fiche technique |
| [terminal-session](headers/terminal-session.md) | Session `$ whoami` |
| [briefing](headers/briefing.md) | Diffusion défensive |

## Projets, stack, temps

| Bloc | Architecture |
|---|---|
| [sparse-selection](projects/sparse-selection.md) | Un projet, un paragraphe |
| [reference-pair](projects/reference-pair.md) | Deux systèmes côte à côte |
| [planches](projects/planches.md) | Planches numérotées |
| [maintenance-desk](projects/maintenance-desk.md) | Dépôt, engagement, langage |
| [parameter-table](tech-stacks/parameter-table.md) | Paramètre et valeur |
| [inline-groups](tech-stacks/inline-groups.md) | Groupes sur une ligne |
| [jalons](timelines/jalons.md) | fait, en cours, prévu |
| [chronique](timelines/chronique.md) | période, titre, détail |
| [bibliographie](timelines/bibliographie.md) | année, titre, support |
| [trois-lames](pitch/trois-lames.md) | problème, offre, preuve |

## Pieds

| Bloc | Architecture |
|---|---|
| [liens-calmes](footers/liens-calmes.md) | Liens séparés par un point médian |
| [fin-de-rfc](footers/fin-de-rfc.md) | Fin de fiche |
| [sortie-shell](footers/sortie-shell.md) | `$ exit 0` |
| [divulgation](footers/divulgation.md) | Canal de signalement, sans procédure d'attaque |

Les blocs de la v1, y compris ceux qui dépendaient de badges distants, restent dans [`archive/v1/components`](../archive/v1/components/README.md).

## État

Registre `2.1.0`. Les composants de rendu restent en `2.0.0`. Les blocs copiables sont en `2.1.0`.

## Prochaines actions

Un bloc nouveau ajoute un fichier, une entrée `blocks` et un lien dans ce tableau.

## Risques

Un bloc copié puis rempli avec un faux dépôt ressemble à un profil. La CLI, elle, refuse d'inventer. Le remix manuel n'a pas cette barrière : relis les `{{ }}` avant de publier.
