# Dovetell Public Deployment

This repo is a static public site. It can run on GitHub Pages today and move
behind Cloudflare Pages without changing the app code.

## Production

- Hostname: `dovetell.io`
- Current public repo: `dovetell-io/dovetell`
- Current production marker: `CNAME`
- Build command: none
- Output directory: repo root

## Preprod

Recommended Cloudflare Pages setup:

- Project name: `dovetell-public`
- Production branch: `main`
- Preview branches: enabled
- Preprod branch: `preprod`
- Preprod hostname: `preprod.dovetell.io`
- Build command: none
- Output directory: `/`

Use preprod for:

- assessment scoring/routing changes
- privacy and CTA copy changes
- Cloudflare header and redirect checks
- form/provider changes before production

Do not use preprod for private strategy, private GTM notes, customer context,
pricing uncertainty, or unreconciled roadmap material. Those belong in the
connected private context repo.

## Cloudflare Checklist

- Add DNS records for `dovetell.io`, `www`, and `preprod`.
- Proxy production and preprod through Cloudflare after the first successful
  Pages deployment.
- Route `www.dovetell.io` to the apex domain.
- Keep HSTS short at first. Increase the max age only after all active
  subdomains are confirmed HTTPS-clean.
- Defer a strict Content Security Policy until inline scripts/styles are
  reduced or nonce/hash handling is designed.
- Keep Formspree and Plausible visible in privacy copy while they remain active.

## Verification

After each preprod deploy:

1. Open `/`, `/team-assessment/`, `/recommendations/`, `/assessments/`, and
   `/privacy/`.
2. Complete one assessment with all answers set to `Mostly true`.
3. Confirm the result is `67/100 · Coordinated`.
4. Confirm recommendations load the free-sample route from
   `/team-assessment/assessment-config.json`.
5. Confirm response headers include the `_headers` values.
6. Confirm production remains unchanged until the preprod version is promoted.
