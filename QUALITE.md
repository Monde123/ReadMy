# Qualité

## Plan

1. Exécuter les tests Node et la validation sur cette branche.
2. Coller les sorties, y compris l'échec intermédiaire corrigé.
3. Donner les poids réels des SVG et les oracles de contraste.
4. Montrer trois entrées hostiles par famille, avec le message obtenu.
5. Ne pas passer à la livraison tant qu'un critère échoue.

## Environnement

- Node `v22.14.0` (`node -v`)
- Python 3 avec `xml.etree.ElementTree` (oracle XML, pas le générateur)
- Date : 6 octobre 2026
- Branche de travail : `rebuild/v2`

## Échec intermédiaire, corrigé

`node tools/validate.js` a d'abord échoué, code de sortie 1 :

```text
AUDIT.md: alt manquant
README.md: lien relatif cassé QUALITE.md
```

La première ligne venait du mot `img` écrit avec des chevrons dans l'audit, que le contrôleur lisait comme une image sans alt. La seconde venait du lien vers ce fichier avant qu'il existe. Les deux sont corrigés. Le résultat ci-dessous est celui d'après correction.

## Tests

Commande : `node --test tests/*.test.js`

Résumé final, code de sortie 0 :

```text
1..24
# tests 24
# suites 0
# pass 24
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 572.748333
```

Critères couverts par ces tests :

- Objets YAML écrits à la main, pas une relecture du parseur.
- Rapports de contraste calculés en Python avant le test : noir sur blanc = 21, blanc sur `#0d1117` = 18,9246, `#777777` sur blanc = 4,4781 (sous 4,5).
- Les dix gabarits régénérés sont identiques aux fichiers committés.
- Les vingt SVG de gabarit sont acceptés par `xml.etree.ElementTree`.
- La fixture `octocat.json` produit `Hello-World` et `42`, et n'écrit ni `Spoon-Knife`, ni `San Francisco`, ni `octocat@example.com`.
- `node cli/readmy.js list` et `render` écrivent un README et deux SVG.

## Validation

Commande après correction : `node tools/validate.js`

Sortie, code de sortie 0 :

```text
validation: ok
```

Le même contrôle est le test « le dépôt actif passe la validation complète », inclus dans les 24 tests ci-dessus.

## Poids

Mesure `stat` sur les fichiers générés, en octets. Les variantes claire et sombre font la même taille : les couleurs sont toutes des hexadécimaux de sept caractères.

| Gabarit | README | SVG clair | SVG sombre |
|---|---:|---:|---:|
| academic | 1412 | 645 | 645 |
| creator | 1388 | 647 | 647 |
| engineer | 1694 | 941 | 941 |
| founder | 1240 | 619 | 619 |
| journey | 1485 | 579 | 579 |
| maintainer | 1608 | 955 | 955 |
| minimal | 1238 | 581 | 581 |
| security | 1588 | 963 | 963 |
| student | 1493 | 649 | 649 |
| terminal | 1402 | 853 | 853 |

Somme des vingt SVG de gabarit : 14 864 octets. Plafond du validateur : 20 000 octets par fichier. Aucun fichier ne l'atteint (maximum mesuré : 963).

## Entrées hostiles exécutées

Script Node lancé sur `lib/yaml.js`, `lib/render.js` et `lib/adapt.js`. Sortie réelle :

```text
ERR yaml vide YAML_VIDE: le document YAML est vide
ERR yaml tab YAML_TAB: les tabulations sont interdites, utilisez des espaces
ERR yaml cle double YAML_CLE_DUPLIQUEE: name, ligne 2
ERR render sans nom CHAMP_MANQUANT: name
ERR render 5000 CHAMP_TROP_LONG: name (5000 > 120)
ERR render javascript URL_INVALIDE: projects.url
OK adapt sans repos ["role absent : placeholder {{role}}, aucun intitulé inventé","bio absente : section prose omise","aucun dépôt public non forké"]
OK adapt lieu false
OK adapt injection false
```

Lecture : un document vide, une tabulation et une clé dupliquée échouent avec un code. Un profil sans nom, un nom de 5 000 caractères et une URL `javascript:` échouent avec un code. Un profil sans dépôt n'invente pas de projet. Un lieu présent dans la fixture avec consentement par défaut reste absent (`false`). Une bio qui contient une balise `script` n'est pas réémise telle quelle (`false` sur la recherche de la balise brute).

## CI GitHub

Deux exécutions du workflow `qualite` sur `0533b82`, conclusion `success` :

- Push : https://github.com/Monde123/ReadMy/actions/runs/37399984080
- Pull request : https://github.com/Monde123/ReadMy/actions/runs/37399996521

Les étapes `tests` et `validation` sont vertes dans les deux.

## Ce qui n'est pas vérifié ici

- Le rendu visuel dans le navigateur GitHub (clair, sombre, 360 px). Les SVG sont bien formés et le texte est aussi dans le HTML. Le débordement écran n'a pas été photographié.
- Un appel à l'API GitHub live. Les tests utilisent les fixtures.

## État

Les critères automatiques locaux sont verts après la correction de l'échec intermédiaire. La CI GitHub du commit `0533b82` est verte. Le rendu dans le navigateur GitHub reste ouvert.

## Prochaines actions

Lire le check GitHub de la PR. Si un job échoue, corriger avant de considérer la livraison finie.

## Risques

Le contrôleur d'images peut confondre une mention de balise dans la documentation avec une vraie image. C'est arrivé une fois. Écrire « image HTML » plutôt que la balise.

### Notion bonus

- Journal des exécutions avec la commande et le code de sortie.
- Colonne « viewport 360 px » encore vide.
- Lien vers le run GitHub Actions de la PR.
