# Handoff prompt for a future implementation session

Use this when the owner decides to begin building. It does not authorize work in the current session.

```text
Continue the Security Guru rebuild in /media/dominykas/fast/security-guru on branch codex/fresh-start. Check Git status and read .llms/STATUS.md, .llms/PLAN.md, .llms/source-copy.md, .llms/README.md, and all ADRs in .llms/adr/. Those files are the durable decision record. The old app has been deleted; .llms/assets/ is reference material, not a set of images to use in the new site. Keep all new planning, status, copy, and design artifacts committed under .llms/.

When authorized to implement, use subagents for bounded independent work so the primary session stays lean. Read the installed Impeccable skill before frontend design work. Execute the plan through a reviewable implementation and meaningful verification; do not repeat an inventory as the final result.

Build with React, Next.js, TypeScript, and Rust based pnpm v12 (initially pinned to 12.8.1). Prefer Vitest and Playwright, evaluate OXC, and choose styling/components to fit the design. The owner wants a calm, photo-free, bilingual Lithuanian/English site serving homes and offices equally in Vilnius and Vilnius County. Use the Security Guru name/logo and canonical palette, with editable Lithuanian prose as source material. Keep five services and starting prices, but verify exact amounts and business facts before publication. Exclude the dead shop and placeholder Projects page. Lead with tel: and mailto: links; no form or email API. Do not invent trust, legal, safety, or project claims.

The owner's hosting direction is this machine via its existing Cloudflare Tunnel and Traefik/Docker path. Supabase and Appwrite are unnecessary unless a backend need appears; Dokploy/Coolify are possible later fleet-wide deployment platforms. Do not modify the live services or DNS as part of site implementation. Note the local Corepack 0.34.0 incompatibility with pnpm 12; invoke the pinned pnpm CLI directly or repair the launcher deliberately.

Update .llms/STATUS.md and commit checkpoints. Finish with changed files, checks run, and pending client confirmations. Do not deploy or publish without explicit later authorization.
```
