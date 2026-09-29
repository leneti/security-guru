# Rewrite status ledger

Updated: 2026-09-29
Branch: `codex/fresh-start`
Stage: Clean starting state. Website implementation has **not** begun.

## Completed

- Inspected the former routes, components, Lithuanian copy, design tokens, logo variants, palette PDF, and assets.
- Recorded scope and technology decisions in `.llms/adr/`.
- Archived useful source prose, starting prices, contact details, and legacy URL clues in `.llms/source-copy.md`.
- Moved the former `assets/` tree to `.llms/assets/`, omitting only `assets/unsplash-houses.webp` as requested. The remaining imagery is reference material only.
- Removed the former app, package setup, AWS Amplify config, generated outputs, dependencies, and ignored legacy `.env`. Retained and simplified `.gitignore` for the new project.
- Kept Impeccable's project skill and hook at the owner's explicit request.
- Created only a minimal root `package.json` and lockfile pinned to Rust based `pnpm@12.8.1`. No app dependencies or new app files have been added.
- Read-only inspected the existing `cloudflared` → Traefik → Docker setup and the separate `sg-temp` experiment. ADR 0009 records the initial hosting direction and alternatives.

## Agreed product scope

- Fresh React, Next.js, and TypeScript website; use pnpm v12. Prefer Vitest and Playwright; evaluate OXC. Supporting UI tools remain open.
- Reuse only the Security Guru name/logo, canonical palette, and editable Lithuanian prose as sources. Design a calm, photo-free site for homeowners and offices equally.
- Lithuanian and English public pages with an easy-to-find language selector; Vilnius and Vilnius County service area.
- Five services and their starting prices, pending client verification. No old shop or Projects page.
- Direct `tel:` and `mailto:` enquiry paths; no contact form or custom email service.
- No invented testimonials, credentials, project facts, or unverified safety/legal claims.

## Pending confirmations before publication

1. Verify current phone numbers, email, hours, legal details, five starting prices, and whether all five service descriptions reflect current offerings.
2. Obtain client review of edited Lithuanian and new English copy. Ask for verifiable trust material if available.
3. Confirm domain and URL migration details, mail DNS records, deployment access, and rollback plan before changing live routing.
4. Choose final site design, route scheme, UI tooling, and deployment packaging during implementation.

## Tooling note

`corepack pnpm` fails on this host because installed Corepack 0.34.0 expects pnpm's former `bin/pnpm.cjs` entry file. `npx --yes pnpm@12.8.1` works and created the lockfile. The host has Node 22.20.0. See ADR 0010.

## Resume instructions

1. Check `git status --short --branch` and the latest commit on `codex/fresh-start`.
2. Read this ledger, `.llms/PLAN.md`, `.llms/source-copy.md`, and the ADRs. Assets are at `.llms/assets/`.
3. Use the former app only through archived text/assets or Git history to verify a fact; write all new app code from scratch.
4. Keep plans, status updates, content maps, and design artifacts committed under `.llms/`.
5. Do not deploy or change live services/DNS until a reviewed production candidate and migration plan exist.

The owner explicitly stopped further website work at this starting state and asked for it to be committed and pushed. The next session should begin implementation only when instructed.
