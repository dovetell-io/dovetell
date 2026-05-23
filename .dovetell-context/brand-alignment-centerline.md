# Brand Alignment Centerline

Status: active pointer  
Owner repo: dovetell-public  
Canonical source: `/Users/johnchromchak/projects/dovetell-hq/.project-context/docs/doc-2f79b64a-brand-alignment-centerline.md`  
Centerline: `cl-2f79b64a`

## Repo Role

`dovetell-public` owns the public website, public docs, public assets, social
preview images, assessment pages, and customer-facing product pages.

It should not store private GTM strategy. It should implement public-facing
brand decisions only after they are reviewed through HQ/GTM.

## Local Centerline Object

```yaml
centerline_pointer:
  centerline_id: cl-2f79b64a
  local_repo: dovetell-public
  owner_context_project: dovetell-hq
  title: Core Brand Alignment Across Dovetell Repos
  local_role: public-site-and-public-assets
  canonical_doc: dovetell-hq/doc-2f79b64a
  repo_local_items:
    - centerline_item_id: cli-83c42f10
      title: Inventory visual and implementation drift
      local_status: done
      local_acceptance:
        - Inventory public CSS token drift.
        - Inventory favicon, app icon, OG, and social assets.
        - Compare public copy against product-status language.
        - Classify each item as fix-now, defer, lineage, or retire.
      evidence:
        - .dovetell-context/brand-drift-inventory.md
      measurement:
        status: unmeasured
    - centerline_item_id: cli-bd03c7a9
      title: Implement token and asset alignment
      local_status: parked
      local_acceptance:
        - Public site uses approved token family where appropriate.
        - Social previews use current v0.3 mark and product-status language.
        - Visual QA is completed before release.
      measurement:
        status: not-worth-measuring
        note: Parked until implementation is explicitly authorized.
```

## Measurement

```yaml
measurement_policy_ref:
  centerline_id: cl-2f79b64a
  default_grain: cli-[hash8]
  preferred_signal: fresh_signal_tokens
  fresh_signal_formula: uncached_input + output + reasoning
  actuals_location: owner centerline event log
  local_status: pointer-only
```

## Current Drift Candidates

- Public site CSS uses older `--ink`, `--paper`, and blurple token values.
- Public favicon and OG assets should be checked against the v0.3 mark family.
- Public copy should preserve the Starter / Project HQ / Team HQ status split.

---

*Public implements reviewed brand. Private strategy stays elsewhere.*
