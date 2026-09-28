# Rewrite status ledger

Updated: 2026-09-28
Branch: `codex/rewrite-plan`
Stage: Discovery and planning. No rewrite implementation has started.

## Completed

- Inspected the current routes, components, Lithuanian copy, design tokens, logo variants, palette PDF, and asset inventory.
- Recorded accepted decisions in `docs/rewrite/adr/`.
- Installed Impeccable's **project-scoped Codex skill** with `npx --yes impeccable install --providers=codex --scope=project -y` (npm package version 4.1.0). The skill is under `.agents/skills/impeccable/` and its hook manifest under `.codex/hooks.json`. Its platform-specific engine binary is locally installed but gitignored; the portable skill, upstream Apache 2.0 license, and hook manifest are tracked.
- Confirmed that the public plugin directory did not list Impeccable. The upstream-supported Codex path is the project skill installer, not a marketplace plugin. Reload Codex for newly installed skills to appear. The optional project hook requires the user to approve it from Codex `/hooks` before it runs.

## Agreed scope

- Fresh code and design; reuse only the current prose as editable source material, brand tokens, name, and logo.
- Equal attention to home and office visitors.
- Calm, residential-feeling, photo-free starting direction. No old AI images.
- Five services, About, and Contact; no shop or Projects page.
- Keep starting prices, subject to confirmation before publishing.
- Keep React, Next.js, and TypeScript. Prefer Vitest and Playwright tests; evaluate OXC tooling. Styling, component libraries, and optional utilities are open choices (ADR 0005).

## Pending decisions and verification

1. Confirm whether the launch remains Lithuanian-only, or needs another language.
2. Confirm service area, contact details, hours, the five starting prices, and whether all five service descriptions reflect current work.
3. Decide whether to keep an enquiry form as the primary conversion path, and which mailbox/service should receive it. Current code uses AWS SES; this is not yet a technology decision for the rewrite.
4. Confirm whether the current domain and service URL slugs should be preserved. Default proposal: preserve the service URLs and redirect any changed routes.
5. Settle the new visual concept, typeface, layout system, and final page content before implementation.
6. Decide how much proof to show without photos: process description, credentials, testimonials, warranties, or concrete project facts require company-provided evidence.

## Resume instructions

1. Check `git status --short --branch` and `git log -1 --oneline` on `codex/rewrite-plan`.
2. Read this file, `docs/rewrite/PLAN.md`, and the five ADRs.
3. Treat the existing app as source material only; do not reuse its UI implementation or old images.
4. Apply any new user answers to the ledger and ADRs before building.
5. If using Impeccable in a new session, reload Codex so the project skill is discovered; follow the skill's own setup. The hook is optional until trusted through `/hooks`.

## Current handoff

The next useful deliverable is a reviewable content map and visual direction for the Home, Services, About, and Contact pages. Do not start the full code rewrite until the unresolved business facts and design direction have been discussed with the user.

## Verification note

The planning Markdown passed Prettier with `--no-config`, the Codex hook manifest parses as JSON, and the installed engine binary is ignored by Git. The existing checkout's normal Prettier command cannot load its configured `@trivago/prettier-plugin-sort-imports`; `npm run typecheck` reports 253 errors across the unchanged app, including missing installed dependencies and stale `.next/types` paths. These are baseline checkout issues and were not addressed as part of planning.
