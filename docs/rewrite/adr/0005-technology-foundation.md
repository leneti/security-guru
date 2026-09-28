# ADR 0005: Keep React, Next.js, and TypeScript

- Status: Accepted for the foundation; supporting tools remain open
- Date: 2026-09-28

## Context

The rewrite should not inherit the current implementation by default, but the owner wants to continue using React, Next.js, and TypeScript. They prefer Vitest and Playwright for tests and are open to OXC tooling for linting and formatting. Styling and component choices are flexible. They have good experience with `es-toolkit` and `@mantine/hooks`.

## Decision

Build the new site with React, Next.js, and TypeScript. Plan for Vitest tests where unit or component tests are useful, and Playwright for meaningful browser journeys. Evaluate OXC tools for linting and formatting during scaffold setup. Choose styling, components, and utility libraries against the approved design and actual requirements; Tailwind CSS and shadcn/Radix are acceptable options, not commitments.

## Consequences

- Rewrite application code from scratch while retaining the preferred framework and language.
- Do not keep Mantine UI components solely because the old app uses them.
- `es-toolkit` and `@mantine/hooks` can be selected for concrete needs; avoid adding them by default.
- Confirm compatible package versions and tooling behavior at implementation time.
