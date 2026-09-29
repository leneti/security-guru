# Implementation plan

This plan is a sequence of reviewable deliverables. Decisions already made are in `adr/`; unanswered facts are in `STATUS.md`. The owner has asked to stop at the clean starting state, commit it, and push it. Execute later implementation only after a new instruction, using subagents for bounded research and implementation tasks while the primary agent integrates their work.

## 0. Clean starting state — complete

- The old app and deployment files were removed; useful prose and business facts are in `.llms/source-copy.md`.
- Former `assets/` is now `.llms/assets/`, except the excluded `unsplash-houses.webp`. Treat the remaining images as reference only.
- The root contains a minimal pnpm v12 manifest and lockfile, a simplified `.gitignore`, and the retained Impeccable skill/hook. No new website implementation exists yet.

## 1. Confirm product and content brief

- Use the confirmed equal home/office audience and Vilnius plus Vilnius County service area. Verify contact details, hours, service offerings, and starting prices with the company before publication.
- Audit every existing Lithuanian paragraph. Keep useful facts and terminology; rewrite repetition and generic claims. Draft natural English equivalents.
- Create a bilingual content map with page purpose, visitor questions, direct contact actions, and draft copy for each route.
- Track missing trust material for client follow-up; do not invent testimonials, certifications, or project facts.

**Review gate:** a bilingual sitemap and copy outline, with unverified facts clearly marked. Draft design and implementation can proceed while those facts await client confirmation; publication cannot.

## 2. Establish a visual system

- Produce two or three photo-free compositions within the calm direction, using the logo and canonical palette.
- Choose typography, spacing, layout grid, icon/graphic treatment, and responsive behavior.
- Design the home hero, a service summary, price treatment, language selector, navigation, and direct phone/email actions as representative pieces.
- Check color contrast and mobile readability; record the chosen system in a design document.

**Review gate:** one chosen direction and representative desktop/mobile layouts.

## 3. Build the new site foundation

- Scaffold a fresh React, Next.js, and TypeScript application using the pinned pnpm v12. Package-manager bootstrap is already present. Choose hosting against the approved requirements; no custom email delivery service is required.
- Set up Vitest and Playwright for meaningful tests. Evaluate OXC linting and formatting; settle package versions when implementation begins.
- Select styling and component tools to serve the approved design. Tailwind CSS and shadcn/Radix are candidates; `es-toolkit` and `@mantine/hooks` are familiar optional utilities.
- Implement the design tokens, semantic page shell, navigation, footer, and reusable content components from scratch.
- Implement Lithuanian and English routes, a visible language selector, localized metadata, and a clean sitemap. Preserve useful existing URLs or add redirects.

**Review gate:** working shell and design-system examples on desktop and mobile.

## 4. Implement pages and enquiry flow

- Build Home, Services overview, five service pages, About, and Contact in both languages.
- Make home and office examples equally prominent. Show each confirmed starting price with a clear enquiry action.
- Implement prominent `tel:` and `mailto:` actions with readable phone and email text. Remove the form and custom mail endpoint from the new app.

**Review gate:** all core user journeys work with real approved content.

## 5. Verify and prepare launch

- Review Lithuanian and English copy and all prices/facts with the company.
- Test keyboard access, language switching, responsive layouts, page speed, `tel:`/`mailto:` links, localized metadata, sitemap, and redirects.
- Configure only necessary cookies and publish accurate business data. Remove dead shop/Projects references.
- Compare the new route list with existing indexed URLs and prepare a deployment/rollback checklist.
- Package the site for the existing Cloudflare Tunnel → Traefik → Docker path without changing live routing yet. If broader service management is pursued, compare Dokploy/Coolify/Portainer as a separate host migration.

**Review gate:** company approval of content and a tested production candidate.

## Out of scope unless requested

- Reusing existing AI images or visual components.
- Rebuilding the discontinued shop or the placeholder Projects page.
- Inventing testimonials, certifications, project outcomes, or legal/security claims.
- Rebuilding the enquiry form or custom email-service integration.
