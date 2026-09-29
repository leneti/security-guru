# ADR 0006: Offer Lithuanian and English

- Status: Accepted
- Date: 2026-09-29

## Context

The existing site is in Lithuanian. The owner wants visitors to be able to select Lithuanian or English.

## Decision

Provide both languages across every public page, navigation item, price label, metadata entry, and contact action. Make the language selector easy to find on desktop and mobile. Preserve the visitor's page context when switching languages where an equivalent page exists. Use the editable Lithuanian prose as the source for reviewed English copy.

## Consequences

- Choose a locale route scheme and default language during implementation. Prefer retaining existing Lithuanian service URLs where feasible, with English equivalents and redirects as needed.
- Maintain one content structure for both languages so pages cannot silently diverge.
- Review translations for natural Lithuanian and English, not just literal equivalence.
- Verify locale-specific links, metadata, and language switching in browser tests.
