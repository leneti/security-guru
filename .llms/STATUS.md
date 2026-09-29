# Rewrite status ledger

Updated: 2026-09-29
Branch: `codex/rewrite-plan`
Stage: Discovery and planning. No rewrite implementation has started.

## Completed

- Inspected the current routes, components, Lithuanian copy, design tokens, logo variants, palette PDF, and asset inventory.
- Recorded accepted decisions in `.llms/adr/`. All rewrite plans, ledgers, and future planning artifacts belong under the committed `.llms/` folder.
- Installed Impeccable's **project-scoped Codex skill** with `npx --yes impeccable install --providers=codex --scope=project -y` (npm package version 4.1.0). The skill is under `.agents/skills/impeccable/` and its hook manifest under `.codex/hooks.json`. Its platform-specific engine binary is locally installed but gitignored; the portable skill, upstream Apache 2.0 license, and hook manifest are tracked.
- Confirmed that the public plugin directory did not list Impeccable. The upstream-supported Codex path is the project skill installer, not a marketplace plugin. Reload Codex for newly installed skills to appear. The optional project hook requires the user to approve it from Codex `/hooks` before it runs.

## Agreed scope

- Fresh code and design; reuse only the current prose as editable source material, brand tokens, name, and logo.
- Equal attention to home and office visitors.
- Calm, residential-feeling, photo-free starting direction. No old AI images.
- Five services, About, and Contact; no shop or Projects page.
- Keep starting prices, subject to confirmation before publishing.
- Keep React, Next.js, and TypeScript. Prefer Vitest and Playwright tests; evaluate OXC tooling. Styling, component libraries, and optional utilities are open choices (ADR 0005).
- Provide Lithuanian and English on all public pages, with an accessible language selector (ADR 0006).
- Serve Vilnius and Vilnius County. Make direct phone and email links the primary enquiry paths; no form or custom email service (ADR 0007).

## Pending decisions and verification

1. Confirm current phone numbers, email address, hours, the five starting prices, and whether all five service descriptions reflect current work. Vilnius and Vilnius County coverage is confirmed.
2. Obtain client review of Lithuanian edits and new English copy before publication.
3. Confirm whether the current domain and service URL slugs should be preserved. Default proposal: preserve Lithuanian service URLs where feasible and redirect any changed routes.
4. Settle the visual concept, typeface, layout system, and final page content during implementation.
5. Ask the client for verifiable trust material: credentials, testimonials, warranties, or concrete project facts. None is available yet. Do not invent it or block drafts on its absence.

## Resume instructions

1. Check `git status --short --branch` and `git log -1 --oneline` on `codex/rewrite-plan`.
2. Read this file, `.llms/PLAN.md`, and the seven ADRs. The paste-ready execution prompt is `.llms/START_NEXT_SESSION.md`.
3. Treat the existing app as source material only; do not reuse its UI implementation or old images.
4. Apply any new user answers to the ledger and ADRs before building. Keep all plans, status updates, and design artifacts inside `.llms/` and commit them.
5. If using Impeccable in a new session, reload Codex so the project skill is discovered; follow the skill's own setup. The hook is optional until trusted through `/hooks`.

## Current handoff

The user wants to start plan execution in a **fresh session** with subagents, not in this one. Use `.llms/START_NEXT_SESSION.md` as the prompt. The first deliverables are a bilingual content map and photo-free design direction, followed by a working rewrite. Draft and build around unverified facts, mark them clearly, and do not publish until the client confirms them.

## Verification note

The initial planning Markdown passed Prettier with `--no-config`, the Codex hook manifest parses as JSON, and the installed engine binary is ignored by Git. The existing checkout's normal Prettier command cannot load its configured `@trivago/prettier-plugin-sort-imports`; `npm run typecheck` reported 253 errors across the unchanged app, including missing installed dependencies and stale `.next/types` paths. These are baseline checkout issues and were not addressed as part of planning. Re-run appropriate checks after setting up the fresh app.
