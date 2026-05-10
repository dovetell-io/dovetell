# dovetell public context pointer

This repo is the public GitHub repo `dovetell-io/dovetell`.

Its job is public website implementation, public docs, public assets, and
customer-facing pages. It should not store private GTM strategy, launch
planning, pricing experiments, internal roadmap notes, or not-yet-routed
product context.

## Connected Context

Primary connected context repo:

- `dovetell-gtm`

Use `dovetell-gtm` for private GTM, positioning, validation, pricing, launch
thinking, and product operating context that informs this public repo.

Reusable framework/package material should route to `dovetell-assets` only after
privacy, usefulness, and claims review.

App product requirements should route to `dovetell-ctx-app-private`.

Private Dovetell product/build/strategy context and boundary hardening should
route to `dovetell-private`.

## Transfer Quarantine

Temporary private or not-yet-routed material belongs in `transfer/`.

Rules:

- `transfer/` is ignored by git.
- Do not publish, link, import, build from, or expose transfer contents.
- Exclude `transfer/` from initial context/template assessments.
- Migrate durable private material to `dovetell-private` or the proper owner
  repo after review.

## Migration Note

The previous tracked `.dovetell-context/` files were migrated to:

- `dovetell-gtm/migration/dovetell-public-context-20260510/`

Treat that archive as historical source material, not current public repo truth.

---

*Public implementation here. Private context elsewhere.*
