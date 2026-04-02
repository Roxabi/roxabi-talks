@.claude/stack.yml

## TL;DR

- **Project:** roxabi-talks
- **Before work:** Use `/dev #N` as the single entry point — it determines tier (S / F-lite / F-full) and drives the full lifecycle
- **Decisions:** summarize context → numbered options + recommendation → wait for reply (see [Decision Protocol](#decision-protocol))
- **Never** commit without asking, push without request, or use `--force`/`--hard`/`--amend`
- **Always** use appropriate skill even without slash command

### Decision Protocol

Never use `AskUserQuestion`. For all decisions, choices (≥2 options), approach proposals:

1. **Summarize** — why / root cause / current behavior / target / path to reach it
2. **Propose** — numbered options, one marked as recommended
3. **Explain** — why the recommended option is recommended

Then wait for reply.

### Git

Format: `<type>(<scope>): <desc>` + `Co-Authored-By: Claude <model> <noreply@anthropic.com>`
Types: feat|fix|refactor|docs|style|test|chore|ci|perf
Never push without request. Never force/hard/amend. Hook fail → fix + NEW commit.

## Gotchas

<!-- Add project-specific gotchas here -->
