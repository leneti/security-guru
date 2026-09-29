# ADR 0007: Lead with direct phone and email contact

- Status: Accepted
- Date: 2026-09-29

## Context

The existing site has a custom enquiry form backed by an email service. The owner no longer wants that maintenance burden.

## Decision

Make phone calls and email the primary enquiry actions. Use `tel:` and `mailto:` links, and display the actual number and address as readable text. Do not rebuild the form, custom mail API, or its email-service integration.

## Consequences

- Give both contact methods clear prominence on the home, service, and contact pages, with layouts appropriate to desktop and mobile.
- Confirm the phone numbers and email address before publication.
- Test the links and visible fallback text. No form validation, spam protection, mail API, or delivery infrastructure is needed.
