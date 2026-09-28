# Security Guru rewrite

This directory is the durable planning record for a fresh Security Guru website. Read [STATUS.md](STATUS.md) first when resuming work, then [PLAN.md](PLAN.md) and the decisions in [adr/](adr/).

The existing app is a **content and brand reference**, not an implementation base. Keep the company name, logo, approved Lithuanian prose, and brand design tokens. New layouts, components, visual treatments, and application code should be written from scratch.

## Source inventory

- Brand: `assets/01_Logotipas/` contains SVG and raster variants; `assets/02_Spalvu_Palete/SecurityGuru_Spalvu_Palete.pdf` is the canonical palette. `constants/theme.ts` contains derived UI scales.
- Copy: home hero in `components/Hero/Hero.tsx`; service summaries and starting prices in `constants/services.ts`; long service copy in `app/paslaugos/*/page.mdx`; About copy in `constants/about-us.ts`; contact details in `constants/contact-data.ts`.
- Current behavior to understand, then reimplement as needed: contact form in `app/susisiekite/GetInTouch/` and mail endpoint in `app/api/contact/route.ts`.
- Existing house and service imagery is AI generated and is **not** part of the reuse set. There are no genuine installation, premises, or team photos available.

## Decision log

- [0001: Rebuild boundary](adr/0001-rebuild-boundary.md)
- [0002: Audience and site scope](adr/0002-audience-and-site-scope.md)
- [0003: Visual direction](adr/0003-visual-direction.md)
- [0004: Copy and price handling](adr/0004-copy-and-prices.md)
- [0005: Technology foundation](adr/0005-technology-foundation.md)

No production code has been rewritten yet. The page structure and implementation sequence in the plan are proposals to validate before build work.
