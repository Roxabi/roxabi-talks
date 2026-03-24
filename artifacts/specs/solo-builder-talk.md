# Solo Builder — Talk Spec

## Metadata

- **Slug**: `solo-builder`
- **Durée cible**: 30–40 min
- **Format**: Companion web standalone (comme les autres talks) + talk live
- **Langue**: FR (i18n EN à prévoir)
- **Audience**: Devs et PM/PO qui construisent avec des agents IA, communauté AIDD

## Fil directeur

**"La difficulté réelle est toujours un cran plus loin que celle que tu vois."**

Chaque acte commence par ce que tu pensais être le problème, et finit par révéler le vrai problème — qui devient le point de départ de l'acte suivant. L'audience vit la découverte avec toi.

Ce n'est pas une liste d'erreurs. C'est une **carte des moments où une décision devient critique** — illustrée par des données réelles.

## Ancrage : le REX Lyra

Lyra est le fil rouge concret. Mais le talk s'élargit à l'écosystème complet parce que c'est justement le sujet : un projet ne reste jamais un seul projet.

> Teaser original : "3 semaines de dev intensif, plus de 400 commits, et une vraie réflexion sur ce que j'aurais fait différemment — sans pour autant regretter le chemin pris."

Le talk dépasse ce teaser : on est à **4 196 commits sur 18 repos en 83 jours**. Lyra en représente 545.

---

## Les chiffres du talk

| Métrique | Valeur |
|----------|--------|
| Durée totale | 83 jours (1er jan → 24 mars 2026) |
| Commits totaux | 4 196 |
| Repos | 18 (dont 8 tooling pur) |
| Commits/jour (moyenne) | ~50 |
| Commits Lyra | 545 en 24 jours |
| Fichiers HTML visuels | 56 fichiers, 109 entrées manifest |
| Skills dev-core | 17 skills, 9 agents |
| Sous-commandes /init | 15 |
| Modèles locaux utilisés | 6 (Qwen3-TTS, Chatterbox, Whisper, FLUX, SD3.5, VLM) |
| Machines | 2 (dev RTX 5070 Ti + prod 24/7 RTX 3080) |

---

## Structure — 7 actes

### Acte 0 — Le point de départ

**Tu penses** : "Je suis PM, pas dev. J'ai un domaine produit que je maîtrise. Il me faut juste une stack."

**Durée** : 3 min

**Contenu** :

- Qui je suis : PM/PO non-technique, expertise domaine finance
- Le setup de départ : Claude Code, un terminal, une idée de produit
- Le piège fondateur : tu penses que ton domaine produit est acquis, que le challenge c'est la technique. En réalité, tu ne le maîtrises pas complètement — un PM n'a souvent jamais géré un produit bout en bout seul
- Les chiffres bruts qui annoncent la suite : 4 196 commits, 18 repos, 83 jours
- Promesse au public : à chaque étape, la difficulté n'est pas celle que tu crois

**Visuel** : Stat counters animés (comme le talk claude-code). Timeline miniature Jan → Mars.

**Transition** : "Donc je me suis dit : il me faut une stack technique. C'est parti."

---

### Acte 1 — "Le dur c'est la stack technique"

**Tu penses** : le plus gros morceau c'est de choisir et monter sa stack.

**Durée** : 5 min

**Contenu** :

- Janvier : 1 200 commits sur roxabi_boilerplate
- Le choix initial : TanStack Start + NestJS + Drizzle + Better Auth
- Tu penses avoir fait le plus dur
- Puis la réalité : CI/CD, i18n (Paraglide), RBAC, multi-tenant RLS, design system (shadcn themes), legal (GDPR, cookies, consent), Fumadocs...
- Le boilerplate "de base" atteint 801 commits — c'est un projet à part entière
- Choisir une stack, c'est pas juste choisir un front et un back. C'est 20% de choix et 80% de plomberie

**Data concrète** :
- roxabi_boilerplate : 801 commits
- Fonctionnalités du boilerplate : auth, RBAC, admin panel, audit logs, feature flags, API keys, E2E Playwright, deploy Vercel, Neon branch DBs

**Visuel** : Le boilerplate qui grandit — un arbre qui se ramifie. Chaque branche est une feature "bonus" qu'on n'avait pas prévue.

**Révélation** : "Mais en fait, la stack technique, je l'ai surmontée. Le problème c'est que mes outils de travail n'ont pas suivi."

**Transition** → Acte 2

---

### Acte 2 — "Le dur c'est l'outillage"

**Tu penses** : maintenant que j'ai ma stack, je peux développer. Les outils que j'utilise depuis des années vont suffire.

**Durée** : 5 min

**Contenu** :

**La migration forcée** :
- Linear → GitHub : l'intégration IA de Linear n'était pas au niveau. L'intégration GitHub est native avec Claude Code
- Jira, Confluence, les outils classiques sont incompatibles avec la vélocité d'un solo builder (50 commits/jour)
- Tu as besoin d'outils qui parlent la même langue que tes agents

**L'écosystème qui explose** :
- 1 repo en janvier → 18 repos en mars
- Chaque module devient un repo : voice, image, plugins, vault, config, infra, talks, production vidéo...
- **8 repos sur 20 sont du pur tooling** — presque la moitié de l'écosystème existe pour supporter l'autre moitié
- Tu ne développes plus un produit, tu maintiens un écosystème

**La réponse : standardiser** :
- `/init` — 15 sous-commandes pour que chaque nouveau projet naisse avec les mêmes fondations
- `stack.yml` partagé par tous les projets — porte les particularités (linter, tests, langage, deploy)
- roxabi-plugins — curated marketplace qui centralise tous les skills (17 skills, 9 agents)
- dev-core comme standard workflow unifié sur tous les repos

**Data concrète** :
- roxabi-plugins : 360 commits
- Les 8 repos tooling : roxabi-plugins, voiceCLI, imageCLI, roxabi-vault, roxabi-claude-config, lyra-stack, roxabi-production, roxabi-talks
- /init : prereqs, discover, create-project, labels, workflows, protect-branches, scaffold-rules, scaffold-docs...

**Visuel** : Timeline de prolifération des repos (1 → 5 → 12 → 18). Graphe de dépendances entre repos tooling et repos produit.

**Révélation** : "OK, j'ai mes outils, j'ai mon écosystème. Sauf que maintenant je développe tellement vite que je ne suis plus capable de suivre ce que je fais."

**Transition** → Acte 3

---

### Acte 3 — "Le dur c'est de suivre la vitesse"

**Tu penses** : je suis productif, tout roule. Le problème c'est juste de garder le rythme.

**Durée** : 7 min (le plus long — hardware + local models + visibilité)

**Contenu** :

**La perte de visibilité** :
- Multi-agents, multi-terminaux, 50 commits/jour
- Tu n'as pas le temps de relire les specs, l'analyse, le code généré
- Tu prends trop de décisions trop rapidement
- Tu as besoin de suivre ce que les agents font en temps réel

**Le split .md / HTML** :
- Le `.md` est pour l'agent IA — c'est son format de travail
- Le visuel HTML est pour toi, le décideur humain
- Tu sépares ce que l'IA a besoin pour travailler de ce que toi tu as besoin pour décider
- À chaque nouvelle feature : un `.md` d'analyse/spec + un visuel HTML de décision

**Make Visuals — le cockpit** :
- `make visuals` sert `~/.agent/diagrams/` — 56 fichiers HTML, 109 entrées dans le manifest
- Galerie indexée avec catégories, badges, dates, light/dark mode
- Auto-discovery (gen-manifest.py), live-reload
- Tu as dû construire un système complet (serveur, manifest, galerie, thèmes) juste pour **retrouver ta propre documentation**
- Même tes outils de pilotage deviennent des projets

**La bascule hardware** :
- Les modèles locaux s'imposent : Qwen3 (TTS), Chatterbox (TTS), Whisper (STT), FLUX (image), SD3.5 (image), VLM (vision/analyse vidéo)
- WSL ne tient plus — limitations mémoire, GPU passthrough instable, pas de vrai bare metal
- PopOS sur la machine de dev, Ubuntu Server sur la machine de prod
- VoiceCLI : de "extension voix" à "dictation complète" (ce qu'on fait maintenant)
- ImageCLI : né de "si la voix marche en local, on peut tout faire en local"
- VRAM guard, adaptive quantization, warm-model daemons — tu gères des GPU comme des serveurs

**2 machines par nécessité** :
- Les modèles vision crashent. Il faut une machine expérimentale qui peut tomber
- ROXABITOWER (dev, RTX 5070 Ti, PopOS) : dev + AI workloads, on-demand
- roxabituwer (prod, RTX 3080, Ubuntu Server) : 24/7, daemons Lyra + TTS + STT
- Supervisord centralisé (lyra-stack), `make deploy` pour push vers prod

**L'approche exploratoire** :
- Générer 10 variantes → en choisir 3 → itérer sur celles-là
- Marche pour : logos, styles de voix, personnages, visual branding
- La clé : pouvoir **comparer facilement** (galerie, grille, side-by-side)
- Abuser de ce pattern dès qu'on a un résultat visuel comparable

**Data concrète** :
- voiceCLI : 122 commits. De script TTS à daemon avec dictation overlay
- imageCLI : 36 commits. FLUX + SD3.5, GPU-only
- content-lab (dans roxabi-plugins) : analyse vidéo avec VLM local
- lyra-stack : 21 commits. Supervisord + Makefile targets pour tous les services
- 109 documents visuels dans make visuals

**Visuel** : Split screen — à gauche un .md (ce que l'agent voit), à droite un HTML (ce que toi tu vois). Schéma des 2 machines avec leurs rôles.

**Révélation** : "J'ai la vitesse, j'ai la visibilité, j'ai l'infra. Mais je réalise que je n'ai toujours pas fait ce qui est censé être mon domaine d'expertise."

**Transition** → Acte 4

---

### Acte 4 — "Le dur c'est le produit"

**Tu penses** : la technique et l'outillage sont posés, maintenant on développe les features.

**Durée** : 5 min

**Contenu** :

**Le constat** :
- Personas — pas fait
- Positionnement — pas fait
- Voix client — pas fait
- Axes d'attaque marketing — pas fait
- Cohérence visuelle — ta doc, ton produit, ton marketing = 3 identités différentes
- Le PM qui n'a pas fait son travail de PM

**Pourquoi ça arrive** :
- La technique t'aspire. Tu es en mode construction, tu résous des problèmes concrets, tu vois du progrès
- Le travail produit est abstrait, il ne génère pas de commits, il ne "livre" rien de visible
- Et pourtant, c'est la fondation de tout le reste — ta doc doit être cohérente parce qu'elle sera livrée avec le produit

**La reprise** :
- Tu utilises enfin les knowledge design, product, marketing
- ryvo_brand : 8 commits en 1 seul jour (23 mars) — personas, messaging framework, visual directions
- La doc se construit en même temps que le produit parce qu'elle te sert à toi ET aux clients finaux
- L'étape que tu aurais dû faire en premier, c'est celle que tu fais en dernier

**Data concrète** :
- ryvo : 766 commits avant le product brief v3
- ryvo_brand : 8 commits en 1 jour — rattrapage express
- Le product brief arrive après des mois de dev technique

**Visuel** : L'ordre réel (technique → outillage → vitesse → produit) vs l'ordre idéal (produit → technique → outillage → vitesse). Flèche de retour.

**Révélation** : "OK. Maintenant j'ai tout : la stack, les outils, la vitesse, le produit. Mais le vrai boss de fin de niveau, c'est de garder tout ça aligné dans la durée."

**Transition** → Acte 5

---

### Acte 5 — "Le vrai dur : piloter sans dériver"

**Tu penses** : maintenant que tout est en place, c'est du pilotage. Ça va rouler.

**Durée** : 7 min

**Contenu** :

**L'alternance altitude / détail** :
- Il y a des décisions qui demandent de la hauteur (architecture, roadmap, priorisation)
- Il y a des décisions qui demandent du détail (une API, un format de message, un edge case)
- Alterner entre les deux est difficile pour tout le monde — chaque profil a sa prédominance
- Tu fais de longues périodes en mode tunnel. Tu ne prends pas de recul. Et tu dérives.

**Le drift** :
- Les agents ont tendance à glisser — on appelle ça le drift
- L'exemple hexagonal de Lyra : tu penses avoir mis en place l'architecture au travers de tes patterns. L'agent, à certains moments, introduit des "exceptions". Tu ne le vois pas
- Les bugs s'accumulent. Tu demandes la root cause. La root cause n'est pas un bug — c'est que l'architecture n'est plus hexagonale
- Tu dérives EN MÊME TEMPS que l'agent. C'est le plus dangereux : ni toi ni lui ne le voyez

**Le 50/50** :
- Les praticiens avancés sur Twitter recommandent ~50% features, ~50% refacto
- Ce n'est pas du luxe. C'est de la survie
- Visible dans les commits de Lyra : des phases entières de refacto (core/ split en sous-répertoires stricts, cap 300 lignes par fichier, réécriture stream architecture)
- Sanctuariser le temps de refacto, sinon la dette s'accumule silencieusement

**Les outils de pilotage** :
- Make Visuals pour la visibilité documentaire (déjà en place)
- Roxabi Dashboard (en cours / à reprendre) : état temps réel multi-projets
  - CI/CD en haut, prod au-dessus de tout — si c'est rouge, c'est ça qu'on fixe en premier
  - Puis les PR ouvertes
  - Puis les issues multi-projets
  - Worktrees ouverts pour savoir combien de chantiers sont en parallèle
  - Le principe du WIP limit Kanban : si les blocs du haut sont trop gros ou trop rouges, tu dépiles avant de créer du nouveau
  - Vue multi-projets + filtres mono-projet

**Reconnaître le moment critique** :
- Quand une décision est réversible vs irréversible
- Le message que l'architecture envoie via les bugs (root cause analysis)
- L'habitude de se poser la question : "Est-ce que je suis en train de valider une exception qui va devenir la norme ?"

**Data concrète** :
- Lyra : phases de refacto visibles dans les commits (core/ split, 300-line cap, LlmEvent/RenderEvent/StreamProcessor rewrite)
- roxabi-dashboard : 735 commits mais mis en pause — le besoin existe, l'outil manque
- L'hexagonal de Lyra qui dérive → bugs → diagnostic → refacto massif

**Visuel** : Le drift illustré — avant/après de l'architecture hexagonale. La pyramide de pilotage (prod > CI/CD > PR > issues). Courbe feature/refacto sur la timeline.

**Révélation** : "Maintenant je sais ce qui est dur. Voilà ce que je ferais si je recommençais."

**Transition** → Acte 6

---

### Acte 6 — Ce que je ferais différemment (sans regretter le chemin)

**Le message central** : démarrer vite et itérer a ses vertus. Mais la séquence idéale existe, et maintenant je la connais.

**Durée** : 5 min

**Contenu** :

**L'ordre que je recommande** :

1. **Produit d'abord** — personas, positionnement, identité visuelle avant la première ligne de code. Pas besoin que ce soit parfait, mais il faut que ça existe. Ça cadre toutes les décisions qui suivent.

2. **Stack technique avec /init dès le jour 1** — ne pas juste choisir un front et un back. Prévoir la plomberie (CI, i18n, auth, legal). Utiliser un boilerplate ou un scaffold standardisé pour ne pas réinventer à chaque projet.

3. **Le split .md / visuel dès le début** — pas quand tu es déjà perdu. Les .md pour les agents, les HTML visuels pour tes décisions. Et un système pour les retrouver (make visuals ou équivalent).

4. **Outillage comme un projet** — budgéter ~30% du temps sur l'écosystème de dev. Les plugins, les skills, les automatisations. Chaque heure investie ici en économise dix plus tard.

5. **2 machines dès que tu touches au local** — ne jamais risquer ton env de dev avec un modèle qui crash. Séparer expérimental et production.

6. **L'approche exploratoire systématisée** — pour tout ce qui est créatif (logos, branding, voix, UI), générer N variantes et itérer. La clé c'est l'infrastructure de comparaison, pas le nombre de variantes.

7. **Checkpoints architecturaux** — un audit structurel toutes les 2 semaines. Vérifier que les patterns tiennent, que les agents n'ont pas introduit d'exceptions.

8. **Le 50/50** — sanctuariser le temps de refacto. Pas "quand j'aurai le temps". C'est structurel.

9. **Un dashboard de pilotage** — savoir à tout moment combien de chantiers sont ouverts, quel est l'état de la CI/CD, quelles PR attendent. Le WIP limit appliqué à l'écosystème.

**Le message de clôture** :
- Je ne regrette pas d'avoir démarré par la technique — ça m'a donné la vélocité et la compréhension
- Mais chaque phase m'a appris une leçon que j'aurais pu apprendre plus tôt
- La vraie compétence du solo builder, ce n'est pas de développer vite — c'est de **savoir quand ralentir**

**Visuel** : Les 2 timelines en parallèle — "ce que j'ai fait" vs "ce que je recommande". Checklist des 9 points.

---

## Données par acte — mapping repos

| Acte | Repos principaux | Commits | Période |
|------|-----------------|---------|---------|
| 0 | tous | 4 196 | Jan–Mar |
| 1 | roxabi_boilerplate, ryvo, roxabi-dashboard | 2 302 | Jan–Fév |
| 2 | roxabi-plugins, roxabi-claude-config | 375 | Fév–Mar |
| 3 | voiceCLI, imageCLI, lyra-stack, roxabi-production | 198 | Fév–Mar |
| 4 | ryvo_brand, ryvo (product brief) | 774 | Mar |
| 5 | lyra (refacto phases), roxabi-dashboard | 1 280 | Mar |
| 6 | transversal | — | — |

## Billes intégrées — récapitulatif

| Bille | Acte | Rôle dans la narration |
|-------|------|----------------------|
| Make Visuals (109 entrées) | 3, 5 | Solution au problème de visibilité, exemple de "même le pilotage devient un projet" |
| Roxabi Dashboard (WIP) | 5 | Solution au pilotage multi-projets, WIP limits, à reprendre |
| /init (15 sous-commandes) | 2 | Réponse à la prolifération des repos, standardisation |
| roxabi-plugins (360 commits) | 2 | L'écosystème de skills, curated marketplace |
| voiceCLI (122 commits) | 3 | L'évolution TTS → STT → dictation, chaîne local models |
| imageCLI (36 commits) | 3 | "Si la voix marche en local, on peut tout faire en local" |
| Approche exploratoire | 3, 6 | Pattern generate N → pick 3 → iterate, transversal créatif |
| 2 machines + bascule Linux | 3 | WSL → PopOS/Ubuntu, dev vs prod, nécessité de séparer |
| 8/20 repos = tooling | 2 | Preuve que la moitié de l'écosystème supporte l'autre moitié |
| Le drift hexagonal | 5 | L'exemple concret le plus frappant — la root cause des bugs |
| Le 50/50 feature/refacto | 5, 6 | Pratique des avancés, visible dans les commits Lyra |

## Principes de construction du talk

- **Chaque acte a un twist** : "tu pensais que X, en fait c'est Y"
- **Ancré dans du réel** : chiffres de commits, noms de repos, exemples concrets
- **Pas de théorie** : tout vient de l'expérience vécue
- **L'audience se reconnaît** : tout solo builder avec des agents IA passe par au moins 3 de ces 5 phases
- **Finit par de l'actionnable** : la checklist de l'acte 6
- **Respecte le teaser original** : ce qui a marché (1-2), ce qui a évolué (3-4), le meilleur des deux (5-6)

## Branding — Lyra Forge Identity (Brand Book v2.1)

Ce talk est le **premier à utiliser l'identité Forge** de Lyra. Les talks existants (lyra-dev en emerald MMORPG, lyra-product en amber) sont antérieurs au brand book v2.1.

### Pourquoi Forge pour ce talk

La métaphore de la forge est le talk :
- **Raw materials in** → idées, outils, agents, code
- **Crafted output out** → un écosystème qui marche, un produit, une méthode
- **Le forgeron** → le solo builder. Pas un consommateur. Un artisan.
- **L'enclume** → ton hardware. Pas le cloud. Tes machines.
- **Les étincelles** → les 4 196 commits, les inputs qui arrivent de partout

Chaque acte est une étape de la forge : tu mets du brut, tu forges, tu apprends.

### Palette

| Token | Hex | Rôle |
|-------|-----|------|
| Obsidian | `#0a0a0f` | Fond de page — dark immersif |
| Forge Floor | `#18181f` | Surface élevée — cards, panels |
| Steel | `#2a2a35` | Bordures, dividers |
| **Forge Orange** | `#e85d04` | **Accent primaire** — actions, highlights, glow |
| Steel Gray | `#6b7280` | Texte muted, labels secondaires |
| Spark White | `#fafafa` | Texte body, éléments principaux |
| Ember | `#f97316` | Accent secondaire — glow adouci |
| Deep Iron | `#1f2937` | Surface alternative |

**Règles** :
- Forge Orange = signal dominant, un seul élément par composition
- Steel Gray porte l'info secondaire, ne concurrence jamais le Orange
- Spark White pour le texte sur dark uniquement

### Extended palette (documentation / diagrammes)

| Token | Hex | Usage dans le talk |
|-------|-----|--------------------|
| Teal | `#06b6d4` | Éléments "construit / actif" |
| Green | `#10b981` | Succès, validé |
| Amber | `#f59e0b` | En cours, attention |
| Red | `#f87171` | Erreur, drift, problème |

### Typographie

| Rôle | Font | Weight | Usage |
|------|------|--------|-------|
| Titres / Impact | **Outfit** | 800 | Hero text, titres d'acte — un seul titre dominant par section |
| Body | **Inter** | 400/500 | Tout le prose, descriptions, labels |
| Code / Technique | **JetBrains Mono** | 400/500 | Commandes CLI, paths, config, données techniques |

### Direction artistique — Isométrique Forge

**Style de référence** : l'illustration de l'annonce de l'event (unnamed.png) + le prompt isométrique.

L'ensemble du talk utilise une esthétique **isométrique technique** :
- Fond quasi-noir (`#0D0D0D`)
- Angle 30° isométrique constant
- Plateformes hexagonales comme base de chaque scène
- Le logo Lyra (diamant/cristal + enclume) au centre de l'écosystème
- **Data streams** lumineux en Forge Orange reliant les éléments
- **Spark particles** qui voyagent le long des connexions comme des paquets de données
- Ambient occlusion subtile, clean edges, précision technique
- Tiles satellites avec des interfaces (terminal vert, chat bleu, Discord violet)

**Progression visuelle par acte** : la scène isométrique évolue d'un acte à l'autre :

| Acte | Scène isométrique |
|------|-------------------|
| 0 | Une seule plateforme hexagonale, le diamant Lyra au centre, quelques étincelles. Sobre, prometteur. |
| 1 | La plateforme se ramifie — des tiles de stack apparaissent (DB, Auth, CI, i18n, Legal...). Le boilerplate qui grandit. |
| 2 | Explosion de tiles satellites — 18 repos comme des stations connectées. Certaines en tooling (terminaux verts), d'autres en produit. Data streams partout. |
| 3 | Deux plateformes (2 machines). Tiles de modèles locaux (GPU, waveform audio, image gen). Un cockpit "Make Visuals" avec 109 documents. Le feu s'emballe — beaucoup de particules. |
| 4 | Retour au centre — une tile "Product" (personas, brand, messaging) qui aurait dû être la première. Contraste entre la complexité autour et le vide au centre. |
| 5 | Des connexions qui passent du orange au rouge (drift). Des tiles qui se désalignent. Puis un refacto qui remet de l'ordre — les tiles se réalignent. |
| 6 | La forge maîtrisée — même complexité qu'en Acte 3, mais ordonnée. Les connexions sont propres. Le diamant au centre pulse calmement. |

**Illustrations générées** : chaque acte aura une illustration isométrique hero (générée via le prompt isométrique adapté par acte). Ces illustrations servent d'arrière-plan de section avec un overlay sombre pour la lisibilité du texte.

### Animation

- **Sparks converging** : particules qui convergent → les inputs qui arrivent
- **Ember glow pulse** : le Forge Orange qui pulse lentement → le système toujours actif
- **Data packets** : particules qui voyagent le long des data streams (CSS animation)
- Animations subtiles, pas démonstratives. Le système tourne, il ne crie pas.
- `prefers-reduced-motion` respecté (standard du projet)

### Mapping Forge × Actes

| Acte | Élément forge | Émotion |
|------|--------------|---------|
| 0 — Point de départ | Le forgeron entre dans l'atelier | Détermination naïve |
| 1 — Stack technique | Les premières braises | Découverte de l'étendue |
| 2 — Outillage | Forger ses propres outils | Prolifération nécessaire |
| 3 — Vitesse | Le feu qui s'emballe | Perte de contrôle, puis reprise |
| 4 — Produit | Revenir au plan du forgeron | Humilité, retour aux fondamentaux |
| 5 — Drift | L'acier qui se fissure | Vigilance, refacto comme entretien |
| 6 — Ce que je ferais | La forge maîtrisée | Sagesse acquise, pas innée |

---

## Ton et style

- Parler à la 2e personne ("tu penses que...", "tu te rends compte que...")
- Honnête, pas auto-flagellant — "je ne regrette pas le chemin"
- Data-driven mais narratif — les chiffres servent l'histoire, pas l'inverse
- Rythme : story → data → insight → transition, sur chaque acte
- **Voice Lyra brand** : confiant, technique, chaleureux, déclaratif. Pas de buzzwords IA. Pas de "seamless", "cutting-edge", "game-changer". Concret.
- Lead with the outcome, not the feature : "J'avais 18 repos au bout de 3 mois", pas "J'ai adopté une approche modulaire multi-repo"
