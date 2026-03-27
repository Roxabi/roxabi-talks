# Changelog

All notable changes to this project will be documented in this file.
Entries are generated automatically by `/promote` and committed to staging before the promotion PR.

## [v1.0.1] - 2026-03-27

### Fixed
- fix(vite): restore `ssr.external` for Remotion — Vite 8 changed SSR externalization defaults; without it, Nitro's internal Rolldown fails to parse Remotion's ESM bundle at build time (PARSE_ERROR)
- fix(vite): scope `conditions: ['source']` to dev only — prevents Rolldown from bundling Remotion into the SSR function and crashing it at startup (Vercel 508 INFINITE_LOOP_DETECTED)
- fix(ci): use merge commit instead of squash in auto-merge workflow to prevent staging/main history divergence
- feat(solo-builder): replace all hardcoded `localhost:8080` diagram links with `VITE_DIAGRAMS_URL` env var (`https://diagrams.roxabi.com` in production)

## [v1.0.0] - 2026-03-27

### Added
- feat(talks): add solo-builder talk — REX on building with AI agents
- feat(talks): add lyra-intro talk — architecture & capabilities presentation
- feat(solo-builder): rework Acts 2-6 with illustrations, real data, and grouped layout
- feat(solo-builder): add new slides, breathing interlude, slide hints, and layout fixes
- feat(solo-builder): add hidden LOC slide, fix SlideHint links, phase label for appendix
- feat(solo-builder): add hidden slides, improve 5B/6B, add Acts 6C and 7
- feat(solo-builder): add recon slide (3c), reorder finale, hidden claw comparisons
- feat(solo-builder): add automated guardrails block to steering slide (5B)
- feat(solo-builder): add logo seeding examples to hidden tips slide

### Fixed
- fix(ui): resolve @repo/ui source condition so dev works without pre-build
- fix(solo-builder): update localhost:8080 links after ~/.agent/ directory restructure
- fix(solo-builder): reorder logo seeding examples to v0.1 → v0.2 → v0.2.2
- fix(solo-builder): recapture dashboard screenshot on All tab
- fix(solo-builder): correct lyra-persistence-arch URL path
- fix(solo-builder): fix SlideHint external URL handling, add Lyra user guide link
- fix(lyra-intro): split-screen layout, light mode demos, full-height players

### Changed
- refactor(solo-builder): move exploratory loop and Lyra clip links to velocity (Act 3)
- refactor(solo-builder): move tips to hidden slide, link from visuals (3b)
- style(solo-builder): fix 5B title and swap to 2/3 Lyra + 1/3 stacked 50/50 layout
- style(solo-builder): merge 50/50 and Lyra refacto into side-by-side layout
- docs: add README

### Dependencies
- chore(deps-dev): bump @vitejs/plugin-react from 5.2.0 to 6.0.1 (#7)
- chore(deps-dev): bump vite from 7.3.1 to 8.0.1 (#9)
- chore(deps-dev): bump jsdom from 28.1.0 to 29.0.1 (#10)
- chore(deps): bump lefthook and vercel
- chore: allow Remotion free license in license policy
