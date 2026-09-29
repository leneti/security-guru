# Security Guru rewrite record

This folder is the committed record for the Security Guru rebuild. Read [STATUS.md](STATUS.md) for current state, [PLAN.md](PLAN.md) for the next work, [source-copy.md](source-copy.md) for preserved prose and business facts, and [adr/](adr/) for decisions. [START_NEXT_SESSION.md](START_NEXT_SESSION.md) is a compact handoff if the session ends.

## What survived the reset

- [`assets/`](assets/) is the former top-level asset directory, moved intact except for `assets/unsplash-houses.webp`, which the owner explicitly excluded. It is **reference material**, not a proposed image set for the new website. Existing imagery is AI generated; no genuine photos are available.
- [`source-copy.md`](source-copy.md) preserves useful Lithuanian text, contact information, service descriptions, prices, legacy URL clues, and verification notes from the former code. Its wording and claims are editable, unapproved source material.
- The Git history still contains the former implementation if a specific fact needs checking. New app code must be written from scratch.

The root keeps a fresh `.gitignore` and a minimal pnpm v12 `package.json`/lockfile. `.agents/skills/impeccable/` and `.codex/hooks.json` remain installed at the owner's request; they are tooling, not old app code. No other former app structure is retained.

## Decisions

- [0001: Rebuild boundary](adr/0001-rebuild-boundary.md)
- [0002: Audience and scope](adr/0002-audience-and-site-scope.md)
- [0003: Visual direction](adr/0003-visual-direction.md)
- [0004: Copy and prices](adr/0004-copy-and-prices.md)
- [0005: Technology foundation](adr/0005-technology-foundation.md)
- [0006: Bilingual content](adr/0006-bilingual-content.md)
- [0007: Direct contact](adr/0007-direct-contact.md)
- [0008: Repository reset](adr/0008-repository-reset.md)
- [0009: Self hosting approach](adr/0009-self-hosting.md)
- [0010: pnpm v12](adr/0010-pnpm-12.md)
