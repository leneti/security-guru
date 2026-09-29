# ADR 0009: Fit the first deployment into the existing host path

- Status: Accepted as the initial deployment direction; production migration is pending
- Date: 2026-09-29

## Context

The owner intends to host the new website on this machine through Cloudflare Tunnel and may later migrate other home services to a more comprehensive management platform. Read-only inspection found an existing `cloudflared` → Traefik → Docker path in `/media/dominykas/appdata/docker-compose.yaml`, using the `mediastack` network. `/media/dominykas/fast/sg-temp/docker-compose.yaml` already shows a Security Guru container on that network. Its Payload, MongoDB, Resend, and Yarn choices do not match this site's direct-contact requirements.

## Decision

Design the first production candidate as a single deployable Next.js service behind the existing Tunnel and Traefik path. Do not add a database, backend-as-a-service, or custom email service without a demonstrated requirement. Keep host deployment work separate from the website rebuild and do not change live home services or DNS during implementation.

Evaluate **Dokploy** and **Coolify** if the owner decides to migrate the broader service fleet. **Portainer** is a smaller step for managing existing Compose stacks. Supabase and Appwrite solve backend application needs, not deployment management for this site. A default Coolify or Dokploy proxy cannot simply be added on the same host ports already used by Traefik; a deliberate coexistence or cutover plan is needed.

## Consequences

- Create a production Docker image and Compose/Traefik configuration during the deployment phase, then test it without touching live routing.
- Preserve mail related DNS records and audit the whole zone before any authoritative DNS migration. Confirm the actual hostname, Cloudflare zone access, tunnel routing, TLS behavior, and rollback path before cutover.
- The website can be built without deciding whether the broader fleet moves to Dokploy/Coolify.

## Primary references

- [Cloudflare Tunnel routing](https://developers.cloudflare.com/tunnel/concepts/routing/) and [Cloudflare DNS full setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/)
- [Dokploy Cloudflare Tunnel guide](https://docs.dokploy.com/docs/core/guides/cloudflare-tunnels) and [Dokploy Compose domains](https://docs.dokploy.com/docs/core/docker-compose/domains)
- [Coolify Compose deployments](https://coolify.io/docs/applications/builds/docker-compose), [Cloudflare Tunnel integration](https://coolify.io/docs/integrations/networking/cloudflare/tunnels/all-resource), and [managed proxy](https://coolify.io/docs/core/networking/proxy/traefik/overview)
- [Portainer Git-backed stacks](https://docs.portainer.io/sts/user/docker/stacks/add)
- [Supabase self hosting](https://supabase.com/docs/guides/self-hosting) and [Appwrite self hosting](https://appwrite.io/docs/advanced/self-hosting)
