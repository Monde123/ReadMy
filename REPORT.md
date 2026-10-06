# Rapport de reconstruction

## Plan

1. Dire ce qui a changé sur `rebuild/v2`.
2. Dire pourquoi le catalogue est passé de 40 à 10.
3. Rappeler les décisions prises sans Moïse.
4. Lister ce qui attend une validation humaine.
5. Noter les blocages réels, pas les suppositions.

## Ce qui a changé

Le dépôt actif n'est plus une collection de README rédigés un par un. Chaque gabarit est un `template.yml` plus un `profile.example.yml`. `node tools/build.js` écrit le README et deux SVG. L'ancien arbre est dans `archive/v1/`, déplacé, pas effacé de l'historique.

La skill unique est `skills/readmy-profile-adapter/`. Elle lit une fixture ou un JSON, écrit un Markdown, des SVG et une provenance. Le rôle manquant reste `{{role}}`. Le lieu et l'email restent absents sans consentement.

Une CLI sans dépendance npm couvre `list`, `render`, `adapt` et `validate`. La CI lance les tests et la validation. Un workflow hebdomadaire relance la validation. Dependabot surveille les actions GitHub. Les notes v2.0.0 sont dans `RELEASE_v2.0.0.md` et ne sont pas publiées.

La licence MIT n'a pas changé.

## Pourquoi

L'audit sur `799047f` a compté 40 gabarits réels, 0 workflow, 243 URL Shields, 6 liens de catalogue cassés, une skill en double qui proposait d'inventer des valeurs, et un studio web annoncé qui n'était pas dans le dépôt. Le volume empêchait de garantir le contraste, les liens et l'absence de service fragile. Dix gabarits avec un rendu testé tiennent la promesse mieux que quarante fichiers non vérifiés.

## Décisions majeures

Le détail, le coût de retour et les décisions secondaires sont dans `DECISIONS.md`.

1. Catalogue réduit à 10 gabarits, v1 entière dans `archive/v1/`.
2. Images du catalogue actif limitées à des SVG locaux. Les hôtes Shields, Vercel, Heroku, skillicons, Demolab, githubusercontent et komarev font échouer la validation sur les gabarits, la skill et le README racine.
3. La skill n'invente pas : placeholder, omission visible, consentement par défaut faux.
4. CLI Node 22 sans dépendance, paquet `private`, release et étiquette non publiées.
5. Pas de studio web, parce qu'il n'existait pas et qu'il ajouterait un hébergement.

## À valider par Moïse

- Fusionner ou non la PR `rebuild/v2` vers `main`.
- Supprimer définitivement des gabarits (non fait : ils sont archivés sur la branche).
- Changer la licence (non fait).
- Publier la release GitHub v2.0.0 ou une étiquette (non fait).
- Publier un paquet npm (non fait, `private: true`).
- Créer les issues de `.github/GOOD_FIRST_ISSUES.md` (non fait).
- Appliquer `.github/labels.yml` via l'API (non fait).
- Réintégrer un gabarit d'archive dans le catalogue actif.

## Blocages

Aucun blocage d'écriture : la branche a pu être créée, poussée, et la PR ouverte. La CI `qualite` est verte sur `0533b82` (push [37399984080](https://github.com/Monde123/ReadMy/actions/runs/37399984080), pull request [37399996521](https://github.com/Monde123/ReadMy/actions/runs/37399996521)). Le rendu dans l'interface GitHub (clair, sombre, mobile) n'a pas été ouvert dans un navigateur pendant ce travail.

## Vérification locale

1. Ce qui a été exécuté est détaillé dans `QUALITE.md`, avec l'échec intermédiaire et les entrées hostiles.
2. `node --test tests/*.test.js` et `node tools/validate.js` sont les commandes de sortie.
3. Non vérifié : page GitHub rendue dans un navigateur, API GitHub live. La CI distante, elle, a tourné et elle est verte sur le commit cité plus haut.
4. Pire cas non couvert : un bandeau très long sur un écran de 360 px, ou un document YAML complet copié depuis un autre outil (ancres, multiligne). Le parseur refuse ces formes avec un code, il ne les interprète pas à moitié.

## État

La branche `rebuild/v2` porte le catalogue, les tests, la documentation et la PR à ouvrir vers `main`.

## Prochaines actions

Lire la PR, les cinq décisions ci-dessus, et décider de la fusion. Ne pas publier la release dans le même geste si le texte de `RELEASE_v2.0.0.md` doit encore changer.

## Risques

La réduction de 40 à 10 peut écarter un gabarit voulu. Le fichier d'origine est dans l'archive et le retour se fait par réécriture déclarative, pas par une restauration aveugle au milieu du nouveau rendu.

### Notion bonus

- Page « Reconstruction v2 » avec le lien de PR et l'état de la CI.
- Liste « À valider » reprise de cette page, cases vides.
- Lien vers l'archive v1 pour comparer un ancien gabarit.
