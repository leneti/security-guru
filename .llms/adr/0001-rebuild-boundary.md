# ADR 0001: Rebuild from content and brand sources

- Status: Accepted
- Date: 2026-09-28

## Context

The existing Security Guru app has become dated. The requested outcome is a full rewrite, with limited reuse from the current project.

## Decision

Use the existing app only as a source for Lithuanian prose, the Security Guru name and logo, and design tokens. Write the new page layouts, components, styles, and application code from scratch. Preserve useful business facts only after checking them with the company.

The canonical brand colors in the palette PDF are dark green `#021614`, light green `#C3C9B5`, orange `#FFBC85`, and violet `#9B849A`. The current Mantine theme also has derived scales, spacing, and breakpoints; those are references, not a requirement to keep Mantine or its component choices.

## Consequences

- The current component and library choices do not constrain the new layout or supporting tools; ADR 0005 records the chosen React, Next.js, and TypeScript foundation.
- Existing stock/AI imagery and page templates are outside the reuse set.
- The new site can keep existing service URLs where useful without reusing their implementation.
