# Comment on a construit la présentation Roxabi Talks — Claude Code

## Contexte

Présentation web standalone à `/talks/claude-code` conçue comme companion de talk live (~30 min) et comme URL partageable autonome. Pas un export de slides — une vraie page web.

---

## Démarche

### Itération 1 — V1 (mi-février 2026)

**Tier F-lite** — domaine unique (frontend), requirements clairs.

1. `/interview` — brainstorming : quel public, quel message, quelles sections
2. `/bootstrap` — analyse du besoin → promotion en spec (#issue dans roxabi_boilerplate)
3. `product-lead` agent — spec complète avec breadboard, slices, file manifest
4. `/implement` — exécution par agents spécialisés (frontend-dev + tester)
5. `/review` — revue fraîche (agents non-auteurs)
6. `/pr` + `/promote` — mise en prod

**Décisions clés V1 :**
- Route `/talks/claude-code` (namespaced pour futures talks)
- Pas de librairie d'animation — CSS + IntersectionObserver uniquement
- Pas de shiki pour la syntax highlighting — trop lourd, CSS classes suffisent
- Pas d'i18n en V1 (anglais only)
- `scroll-snap-type: y mandatory` natif

---

### Itération 2 — V2 (fin février 2026)

**Tier F-full** — restructuration narrative + nouvelles sections.

Trigger : stats obsolètes (808 → 1930 sessions), narrative trop "intro" pas assez "playbook pratique".

1. `/interview --promote` — entretien structuré → analyse → spec #361
2. `product-lead` agent — spec V2 avec slices V1→V7
3. `/implement` — 2 nouveaux composants, 6 modifiés, 2 supprimés
4. `/review` + `/1b1` — walkthrough des findings
5. `/pr` + `/promote`

**Changements V2 :**
- 7 sections → 9 sections
- Nouvelle section `ToolchainSection` — 16 skills par phase de workflow
- `TipsSection` remplacée par `LessonsLearnedSection` (works / doesn't / changed)
- Pipeline End-to-End enrichi avec `/interview` et human gates
- i18n Paraglide activée (en + fr) — toutes les strings externalisées
- Stats mises à jour : 1930 sessions / 519 commits / 88% completion

---

## Forme

**Stack technique :**
- Repo dédié : `roxabi-talks` (TanStack Start + React + Tailwind)
- Architecture monorepo — `@repo/ui` pour les composants partagés (PresentationNav, StatCounter)
- Route layout `talks.tsx` → pas de Header/Footer
- `components/presentation/` — pattern identique à `components/landing/`

**Navigation :**
- Scroll-snap full-viewport (`md:snap-y md:snap-mandatory`)
- Dots de navigation latéraux (PresentationNav, déplacé dans `@repo/ui`)
- Keyboard nav : flèches, 1-9, Escape, Home/End
- Désactivé sur mobile — scroll naturel

**Animations — zéro dépendance :**
- Reveals : IntersectionObserver + CSS classes toggle
- Stat counters : `requestAnimationFrame` count-up
- Typing animation : CSS `@keyframes` avec `steps()`
- `prefers-reduced-motion` respecté partout

---

## Contenu (sections finales)

1. **Intro** — badge + titre + 3 stat counters animés (1930 / 519 / 88%)
2. **Building Blocks** — CLAUDE.md, 16 Skills, Hooks, 9 Agent Definitions
3. **Specialization** — agents spécialisés vs généralistes
4. **Dev Process** — tiers S / F-lite / F-full, flowchart de décision
5. **Toolchain** — 16 skills en 5 phases (Plan → Build → Review → Ship → Maintain)
6. **Agent Teams** — 9 agents en 3 catégories + primitives de coordination
7. **End-to-End** — pipeline `/interview` → `/bootstrap` → `/scaffold` → `/pr` → `/promote` avec human gates
8. **Lessons Learned** — ce qui marche / ne marche pas / a changé
9. **Closing** — CTA : docs, repo, try `/bootstrap`

---

## Skills utilisés

- `dev-core:interview` — cadrage du besoin + promotion spec
- `dev-core:spec` / `product-lead` agent — spec avec breadboard + slices
- `dev-core:implement` — coding par agents spécialisés
- `dev-core:review` — revue fraîche multi-domaines
- `dev-core:fix` + `1b1` — application des findings
- `dev-core:pr` + `dev-core:promote` — livraison

---

## Chiffres clés

- **V1 → V2** : 2 itérations, 3 semaines d'écart
- **Composants** : 12 sections + PresentationNav + CodeBlock + SectionContainer + StatCounter
- **Zéro nouvelle dépendance npm** sur les deux versions
- **i18n** : ~80 clés Paraglide (en + fr)
- **Tests** : SectionContainer, PresentationNav, claude-code route (smoke)
