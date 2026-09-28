# Implementation plan

This plan is a sequence of reviewable deliverables, not a commitment to the old tech stack. Decisions already made are in `adr/`; unanswered facts are in `STATUS.md`.

## 1. Confirm product and content brief

- Verify audience, service area, contact details, hours, service offerings, and starting prices with the company.
- Audit every existing Lithuanian paragraph. Keep useful facts and terminology; rewrite repetition and generic claims.
- Create a content map with page purpose, visitor questions, primary action, and draft copy for each route.
- Resolve whether the site needs one language or more and whether an enquiry form is required.

**Review gate:** approved facts, sitemap, and copy outline.

## 2. Establish a visual system

- Produce two or three photo-free compositions within the calm direction, using the logo and canonical palette.
- Choose typography, spacing, layout grid, icon/graphic treatment, and responsive behavior.
- Design the home hero, a service summary, price treatment, navigation, and contact form as representative pieces.
- Check color contrast and mobile readability; record the chosen system in a design document.

**Review gate:** one chosen direction and representative desktop/mobile layouts.

## 3. Build the new site foundation

- Choose a suitable framework and hosting strategy based on the approved content and form requirements, rather than inheriting the existing stack by default.
- Implement the design tokens, semantic page shell, navigation, footer, and reusable content components from scratch.
- Preserve useful URLs or add redirects. Set Lithuanian metadata and a clean sitemap.

**Review gate:** working shell and design-system examples on desktop and mobile.

## 4. Implement pages and enquiry flow

- Build Home, Services overview, five service pages, About, and Contact.
- Make home and office examples equally prominent. Show each confirmed starting price with a clear enquiry action.
- Implement phone/email actions and, if approved, an accessible enquiry form with validated input, spam protection, delivery, and helpful success/error states.

**Review gate:** all core user journeys work with real approved content.

## 5. Verify and prepare launch

- Review Lithuanian copy and all prices/facts with the company.
- Test keyboard access, form labels/errors, responsive layouts, page speed, links, metadata, sitemap, and redirects.
- Configure only necessary cookies and publish accurate business data. Remove dead shop/Projects references.
- Compare the new route list with existing indexed URLs and prepare a deployment/rollback checklist.

**Review gate:** company approval of content and a tested production candidate.

## Out of scope unless requested

- Reusing existing AI images or visual components.
- Rebuilding the discontinued shop or the placeholder Projects page.
- Inventing testimonials, certifications, project outcomes, or legal/security claims.
