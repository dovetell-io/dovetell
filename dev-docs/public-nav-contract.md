# Public Nav Contract

Status: active  
Owner: dovetell-public implementation  
Centerline: `cl-2f79b64a`

This repo is mostly static HTML, so the public nav can drift page by page. Until
the site has a shared renderer, this contract is the source of truth for nav and
near-nav public language.

## Primary Public Nav

Applies to:

- `index.html`
- `products/index.html`
- `framework/index.html`
- `why/index.html`
- `writing/index.html`
- `writing/context-debt/index.html`
- generated writing pages from `scripts/build-writing.js`

Required behavior:

```yaml
primary_public_nav:
  wordmark:
    href: /
    mark: /assets/favicon.png
    label: dovetell
  links:
    - href: /products
      label: Products
    - href: /framework
      label: Framework
    - href: /writing
      label: Writings
    - href: /team-assessment
      label: Assessment
    - href: /why
      label: Why?
  cta:
    href: /products
    label: View products
  mobile:
    keep_wordmark_visible: true
    keep_cta_visible: true
    hide_secondary_links_before_wrapping: true
```

## Specialized Navs

`privacy/`, `recommendations/`, `assessments/`, and `team-assessment/` may use
specialized navs because they support focused flows. They still need a clear
home link through the wordmark or first nav link.

## Public Copy Guardrails

Do not use buyer-facing `packs`, `Template Pack`, `package ladder`, or
internal GTM/outreach language on public pages. Use `products`, `product paths`,
or concrete product names instead.

The checker is intentionally narrow and fast:

```sh
node scripts/check-public-nav.js
```

Run it after hand-editing public copy or nav markup.
