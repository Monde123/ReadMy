# Audit Vérité Nue : Déconstruction Sans Hypocrisie de ReadMy (v2.0.0)
*Date : Novembre 2026 — Dépôt : ReadMy v2.0.0*  
*Rapport d'autocritique technique sans complaisance, sans langue de bois et sans artifices marketing.*

---

## 1. Pourquoi cet Audit est Nécessaire

Dans l'open source et l'ingénierie logicielle, l'auto-satisfaction est le premier facteur de stagnation. ReadMy v2.0.0 a accompli des progrès réels en éliminant les pannes de services tiers (Shields, Vercel, Heroku) et en instaurant une discipline de tests unitaires stricts.

Cependant, derrière les discours élogieux sur « l'indestructibilité », « l'intelligence sémantique » et le « Superdesign », **le code source révèle des raccourcis techniques flagrants, des promesses non tenues et des illusions marketing**.

Ce document dissèque avec sérieux et franchise ce que ReadMy prétend être face à ce qu'il est réellement dans le code.

---

## 2. Les 6 Fausses Prétentions de ReadMy Face à la Réalité du Code

```
┌─────────────────────────────────────────────────────────────┬─────────────────────────────────────────────────────────────┐
│                 CE QUE READMY PRÉTEND                       │                 LA RÉALITÉ BRUTALE DU CODE                  │
├─────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────┤
│ 1. « Asymmetric Bento Grids de nouvelle génération »        │ Un tableau HTML <table> à 2 colonnes comme en 1998.         │
│ 2. « Registre de composants modulaire et déclaratif »       │ Du code truffé de if (template.id === "033...") en dur.    │
│ 3. « Intelligence sémantique et inférence de persona »      │ 4 expressions régulières basiques cherchant "ai" ou "sre".  │
│ 4. « Un profil durable et vivant »                          │ Un profil « congelé » qui ne s'actualise plus jamais.       │
│ 5. « Des diagrammes d'architecture DAG & GPU H100 »         │ Du faux texte copié d'un fichier d'exemple, jamais calculé. │
│ 6. « Parseur YAML handwritten zéro dépendance »             │ Un parseur fragile qui plante dès qu'on dépasse 2 niveaux.  │
└─────────────────────────────────────────────────────────────┴─────────────────────────────────────────────────────────────┘
```

---

### Prétention 1 : L'Illusion des « Asymmetric Bento Grids »

- **L'allégation** (dans la documentation et la skill) :
  > *"Rich Polymorphic GFM utilizing Bento grids, telemetry HUDs, and responsive UI components."*
- **La réalité dans le code** :
  GitHub Flavored Markdown (GFM) passe tout le code HTML généré au crible d'un assainisseur strict (`github-cmark` / HTML sanitization). **GitHub filtre et supprime tout le CSS moderne** : ni `display: grid`, ni `grid-template-columns`, ni `display: flex`, ni même l'attribut `style="..."` ne sont autorisés.
  
  Ce que ReadMy génère réellement dans `lib/render.js` (lignes 350-450) :
  ```html
  <table width="100%">
  <tbody>
    <tr>
      <td width="50%" valign="top">...</td>
      <td width="50%" valign="top">...</td>
    </tr>
  </tbody>
  </table>
  ```
- **Le verdict** : Il n'y a aucun Bento Grid dans ReadMy. C'est un simple tableau HTML 2 colonnes des années 90, maquillé sous un terme à la mode.

---

### Prétention 2 : La Dette Cachée des `if (template.id === ...)` dans `lib/render.js`

- **L'allégation** :
  > *"Architecture déclarative : chaque gabarit s'appuie sur le registre standard `registry.json`. Ajouter un gabarit, c'est simplement ajouter `template.yml` et `profile.example.yml` sans toucher au moteur."*
- **La réalité dans le code** :
  Ouvrez `lib/render.js` aux lignes 340-420. Que trouve-t-on dans la fonction prétendument générique `renderProjects()` ?
  ```javascript
  if (template.id === "033-dungeon-rpg-character-sheet") {
    // Rendu spécifique avec "⚔️ Relic / Spell" et "🔮 Ancient Tome" en dur
  }
  if (template.id === "031-cyberpunk-netrunner") {
    // Rendu spécifique avec "[ROOTKIT]" et "[DAEMON]" en dur
  }
  if (template.id === "014-neon-command-center") {
    // Rendu spécifique avec "🛡️" et "10M pps filtered" en dur
  }
  ```
  Et dans `renderComponent("pitch")` :
  ```javascript
  if (template.id === "024-pitch-deck") { ... }
  if (template.id === "founder") { ... }
  ```
- **Le verdict** : C'est une **négation totale du principe d'un registre modulaire**. Si créer un nouveau gabarit oblige à ouvrir le cœur du moteur (`lib/render.js`) pour y injecter des conditions `if (template.id === ...)`, le catalogue n'est pas extensible, il est monolithique et couplé en dur.

---

### Prétention 3 : L'Illusion de « l'Inférence Sémantique & IA »

- **L'allégation** :
  > *"Semantic Archetype & Persona Inference: Analyzes public repositories, languages, and bio to infer exact engineering seniority, specialty, and dominant stack without human guessing."*
- **La réalité dans le code** :
  Dans `lib/github.js` (lignes 53-80) :
  ```javascript
  if (/ai|machine learning|llm|inference|cuda|pytorch|deep learning/.test(textCorpus)) {
    suggestions.push({ id: "003-ai-engineer", ... });
  }
  ```
- **Le verdict** : Il n'y a aucune analyse sémantique, aucun traitement du langage naturel (NLP), aucun modèle d'IA. Ce sont **4 regex basiques** appliquées sur une chaîne concaténée. Si un développeur débutant écrit dans sa bio *"I want to learn AI"*, le moteur conclut qu'il est un *"Senior Machine Learning Systems Engineer"* et lui propose le gabarit CUDA H100 !

---

### Prétention 4 : Le Piège du « Profil Congelé »

- **L'allégation** :
  > *"Un profil qui reste lisible sans dépendance tierce : des données, un thème, du Markdown."*
- **La réalité d'usage** :
  Parce que ReadMy rejette tout appel réseau à l'affichage (ce qui est une excellente décision pour éliminer les pannes), il crée un effet pervers majeur : **le profil est mort dès sa génération**.
  - Si vous générez votre profil aujourd'hui avec 12 étoiles sur votre projet phare, dans 2 ans votre profil affichera toujours 12 étoiles, même si votre projet en compte désormais 5 000.
  - Vos nouveaux dépôts n'apparaissent jamais.
  - Vos commits récents ne bougent pas.
- **Le verdict** : Sans mécanisme d'actualisation automatisé (ex: GitHub Action périodique), l'utilisateur finit par abandonner ReadMy pour retourner vers des cartes dynamiques comme `github-readme-stats`.

---

### Prétention 5 : Les Diagrammes d'Architecture Fictifs

- **L'allégation** :
  > *"Architecture & Inference Pipeline : Speculative Draft (1.2B) ──▶ Target Model (70B FP8) ──▶ vLLM Token Stream."*
- **La réalité dans le code** :
  Ce diagramme ASCII spectaculaire qui fait la fierté du gabarit `003-ai-engineer` n'est **jamais généré ni déduit** à partir des dépôts GitHub de l'utilisateur.
  - Il est copié-collé en dur dans `profile.example.yml`.
  - Quand un véritable utilisateur exécute `readmy adapt --github son-compte --template 003-ai-engineer`, ce diagramme **disparaît totalement** car l'API GitHub ne fournit aucun champ d'architecture. L'utilisateur se retrouve avec un profil ordinaire sans le diagramme promis en vitrine.

---

### Prétention 6 : La Fragilité du Parseur YAML « Fait Maison »

- **L'allégation** :
  > *"Aucun npm install. Parseur YAML natif zéro dépendance."*
- **La réalité dans le code** :
  Pour éviter d'installer une dépendance standard éprouvée comme `js-yaml` ou `yaml`, ReadMy utilise `lib/yaml.js` (écrit à la main).
  - Ce parseur ne gère que les cas les plus élémentaires.
  - Tentez d'écrire une chaîne multiligne avec l'opérateur YAML `|` ou `>`, d'utiliser des ancres `&id / *id`, ou d'imbriquer des structures au-delà de deux niveaux : le parseur échoue ou tronque les données sans avertissement clair.

---

## 3. Ce Que Nous Allons « Tricher » Chez les Concurrents (Et Comment)

Plutôt que de nier les forces de la concurrence, copions leurs meilleures inventions et adaptons-les au standard ReadMy :

### 1. Emprunt à `lowlighter/metrics` & `platane/snk` : Le Workflow Auto-Sync
- **L'astuce des concurrents** : Ne pas dépendre d'un serveur tiers à la lecture, mais utiliser GitHub Actions pour régénérer les fichiers locaux sur une tâche cron planifiée.
- **Application dans ReadMy** : Fournir dans le dépôt un template officiel `.github/workflows/readmy-sync.yml`. Chaque lundi matin, GitHub Actions exécute `node cli/readmy.js adapt` et commite les SVGs et le README mis à jour directement sur le dépôt.
- **Bénéfice** : Le profil reste 100% statique et rapide pour le visiteur, mais ne devient plus jamais un fossile congelé.

### 2. Emprunt à `denvercoder1/readme-typing-svg` : L'Animation Vectorielle CSS Pure
- **L'astuce des concurrents** : Utiliser des animations CSS `@keyframes` à l'intérieur du fichier SVG. GitHub autorise les animations CSS SVG tant qu'il n'y a pas de script JavaScript exécutable.
- **Application dans ReadMy** : Dans `lib/svg.js`, injecter une balise `<style>` avec `@keyframes blink` pour le curseur terminal de `terminal` et `cyber-hud`, et une pulsation douce sur les grilles blueprint.
- **Bénéfice** : Les bannières deviennent vivantes et immersives sans aucun risque de sécurité ni serveur externe.

### 3. Emprunt à `anuraghazra/github-readme-stats` : La Carte de Télémétrie Graphique Locale
- **L'astuce des concurrents** : Résumer en un seul coup d'œil visuel le volume de code, les langages et l'activité.
- **Application dans ReadMy** : Créer un nouveau composant de registre `stats-card` généré localement sous forme de deux fichiers vectoriels : `assets/stats-light.svg` et `assets/stats-dark.svg`.
- **Bénéfice** : Offrir la richesse visuelle d'une carte de statistiques sans la fragilité de Vercel.

---

## 4. Plan de Remise à Niveau Technique Immédiat

Pour éradiquer la dette technique et mettre le code en accord avec ses prétentions :
1. **Refactoriser `lib/render.js`** : Déplacer les styles hardcodés (`[ROOTKIT]`, grimoire, pitch matrices) dans des propriétés de configuration déclaratives dans `template.yml` (ex: `projects_style: "grimoire"`, `checklist_style: "decrypt"`).
2. **Créer le workflow d'Auto-Sync** : Déployer le fichier `.github/workflows/readmy-sync.yml`.
3. **Animer les bannières SVG** : Intégrer des keyframes CSS propres dans `lib/svg.js`.
4. **Clarifier la documentation** : Remplacer le terme mensonger « Bento Grid » par « Cartes 2 Colonnes GFM », et documenter en toute honnêteté que les diagrammes d'architecture nécessitent une rédaction manuelle dans le profil YAML.
