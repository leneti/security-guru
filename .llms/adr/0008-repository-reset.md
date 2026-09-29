# ADR 0008: Reset the repository before implementation

- Status: Accepted
- Date: 2026-09-29

## Context

The former folder structure and implementation could bias the rebuild. The owner explicitly requested deleting it, preserving the original `assets` folder under `.llms` except `assets/unsplash-houses.webp`, and archiving useful prose and facts first.

## Decision

Work on branch `codex/fresh-start`. Move the asset directory to `.llms/assets/`, delete the excluded image, and preserve useful copy in `.llms/source-copy.md`. Remove the former app, package and AWS Amplify setup, generated files, local dependencies, and ignored legacy `.env`. Retain a simplified `.gitignore`, since dependency directories, generated output, and local credentials still need exclusion. Retain the installed Impeccable skill and hook at the owner's explicit direction. Start the new implementation with a fresh pnpm v12 manifest.

## Consequences

- Former source files remain available through Git history, but do not form the new app's scaffold.
- `source-copy.md` records useful factual source text without treating any claim as approved copy.
- The old ignored `.env` contained deployment setting names for Cloudflare DNS zones, project path, and web port; it was removed rather than carried into the new app. Obtain new deployment values when deployment work begins.
- The retained `.llms/assets/` includes old AI/stock imagery only as reference. The new visual direction does not use it.
