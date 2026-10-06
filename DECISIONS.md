# Décisions prises sans Moïse

Chaque ligne répond à une question ouverte. Le choix privilégie un retour arrière par déplacement de fichiers ou par édition, plutôt qu'une suppression sur `main` ou une publication.

## D1 — Branche `rebuild/v2`

- Question : où reconstruire ?
- Choix : branche `rebuild/v2` créée depuis `main` (`799047f`). Aucun push sur `main`, aucun merge, aucun force-push.
- Raison : la demande fixe cette branche et une PR finale.
- Retour arrière : abandonner la branche. `main` reste intact tant que la PR n'est pas fusionnée.

## D2 — Catalogue réduit à 10 gabarits

- Question : que faire des 40 gabarits ?
- Choix : 10 gabarits déclaratifs. Les 40 dossiers d'origine sont déplacés dans `archive/v1/templates/`, avec leurs composants, catalogues, docs et skills. Le verdict de chacun est dans `AUDIT.md`.
- Raison : le volume dépassait la revue, six liens du README étaient déjà faux, et 036–040 dépendent de services distants.
- Retour arrière : `git mv` inverse d'un dossier d'archive, puis réécriture au format v2 si on le réactive. Rien n'a été effacé de l'historique.

## D3 — Aucune image distante dans le catalogue actif

- Question : Shields, github-readme-stats, skillicons, capsule-render ?
- Choix : interdits dans l'arbre actif. La CI échoue si `img.shields.io`, `vercel.app`, `herokuapp.com`, `skillicons.dev`, `demolab.com`, `githubusercontent.com` ou `komarev.com` apparaît hors `archive/`.
- Raison : ces hôtes sont le risque de durée n°2. Le bandeau est un SVG du dépôt, décliné clair et sombre.
- Retour arrière : retirer l'hôte de la liste et ajouter un composant. L'archive conserve les anciens README.

## D4 — CLI Node sans dépendance, YAML restreint

- Question : quel générateur ?
- Choix : Node 22, modules natifs, zéro dépendance npm. Parseur YAML maison pour les maps, listes et scalaires utilisés ici. Le reste lève une erreur nommée.
- Raison : une dépendance de parseur serait le seul paquet à surveiller pour un outil qui doit rester lisible. Le parseur est testé contre des objets écrits à la main.
- Retour arrière : remplacer `lib/yaml.js` par un autre parseur et garder les mêmes tests d'objets.

## D5 — La skill n'invente pas

- Question : que faire d'un champ absent ?
- Choix : placeholder `{{role}}`, section omise avec commentaire HTML, consentement par défaut `false` pour le lieu, l'email, l'organisation et le réseau. Les forks sont exclus. Plafond de 4 dépôts, écrit dans la provenance. Un override dont le dépôt n'est pas dans `github.repos` produit un avertissement.
- Raison : l'ancienne skill proposait de générer tout de suite avec des valeurs par défaut, et d'injecter des widgets.
- Retour arrière : assouplir `lib/adapt.js` et les tests `tests/adapt.test.js`. Les fixtures restent.

## D6 — Licence MIT inchangée

- Question : quelle licence pour la v2 ?
- Choix : le fichier `LICENSE` de `main` reste octet pour octet. Copyright 2026 Moise Koudanko.
- Raison : changer la licence est irréversible pour les copies déjà prises, et la consigne l'interdit.
- Retour arrière : sans objet, aucun changement.

## D7 — Pas de publication npm ni de release GitHub

- Question : publier la CLI et la release v2.0.0 ?
- Choix : `package.json` est `"private": true`, version `2.0.0`. `RELEASE_v2.0.0.md` est rédigé. Aucune release GitHub, aucune étiquette git, aucun `npm publish`.
- Raison : la publication est irréversible au sens de la consigne.
- Retour arrière : retirer `private` et publier, uniquement après validation.

## D8 — Pas de studio web

- Question : reconstruire le studio annoncé (`src/App.tsx`) ?
- Choix : non. Il n'existait pas dans le dépôt. La CLI couvre le rendu local.
- Raison : une application web ajouterait un hébergement, une surface d'auth et des dépendances, à l'opposé du pilier de durée.
- Retour arrière : ajouter une application plus tard, sans retirer la CLI.

## D9 — Exemples en français, personnes fictives

- Question : langue des profils exemples ?
- Choix : français, identités fictives (Inès Morel, Marc Elbaz, Lina Costa, Nora Belkacem, Samir Adler, Camille Bernard, Hanaé Wolff, Omar Diallo, Léa Fischer, Awa Ndiaye). Aucun chiffre de revenu, de note ou de citation. Les publications académiques sont marquées comme fictives dans le support.
- Raison : la documentation demandée est en français. Les anciens exemples mêlaient des métriques inventées à des noms réalistes.
- Retour arrière : remplacer `profile.example.yml` et relancer `node tools/build.js`.

## D10 — Commentaires d'omission plutôt qu'un texte de remplissage

- Question : une section demandée sans donnée ?
- Choix : commentaire HTML `section:<nom> omise : <raison>`. Pas de projet, de principe ou de lieu fabriqué.
- Raison : un résultat silencieux ou une valeur par défaut masque les trous.
- Retour arrière : changer `lib/render.js` et les tests qui cherchent ces commentaires.

## D11 — Sécurité défensive seulement

- Question : que devient le gabarit laboratoire de sécurité ?
- Choix : `security` parle de divulgation coordonnée, de secrets interdits dans le dépôt et de tests de non-régression. Aucun mode opératoire d'attaque.
- Raison : le README de profil n'est pas un guide d'exploitation.
- Retour arrière : réécrire le profil exemple. Ne pas y remettre de procédure d'attaque.

## D12 — Tests sans réseau

- Question : la CI doit-elle interroger GitHub ou les hôtes d'images ?
- Choix : non. Les fixtures sont versionnées. Les SVG sont relus par le parseur XML de Python (`xml.etree.ElementTree`), indépendant du générateur Node. Les liens relatifs sont résolus sur le disque. Le workflow hebdomadaire relance la même validation.
- Raison : un appel réseau rend la CI fragile et réintroduit les services qu'on retire.
- Retour arrière : ajouter un job réseau séparé, sans bloquer le job principal.

## Actions laissées à Moïse

Ces actions ne sont pas exécutées :

- Fusionner la PR `rebuild/v2` vers `main`.
- Supprimer définitivement des gabarits de l'historique de `main` (l'archive de branche suffit tant que `main` n'a pas bougé).
- Changer la licence.
- Publier une release GitHub v2.0.0 ou pousser une étiquette.
- Publier un paquet npm.
- Créer les issues « good first issue » listées dans `.github/GOOD_FIRST_ISSUES.md`.
- Appliquer `.github/labels.yml` sur le dépôt via l'API.
- Réactiver un gabarit d'archive dans le catalogue actif.

## État

Douze décisions sont appliquées sur la branche. Les actions de la liste ci-dessus attendent Moïse.

## Prochaines actions

Lire D2, D5 et D7 en priorité : ce sont le catalogue, la skill et la non-publication.

## Risques

Une décision de catalogue peut écarter un gabarit auquel Moïse tenait. Le fichier d'origine est dans `archive/v1/` et le verdict est révisable sans réécriture de `main`.

### Notion bonus

- Base « Décisions » avec question, choix, coût de retour.
- Vue « À valider » filtrée sur la liste de la section homonyme.
- Lien vers la PR `rebuild/v2`.
