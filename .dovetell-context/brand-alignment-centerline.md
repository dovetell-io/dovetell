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
      title: Implement token, asset, nav, and public-surface alignment
      local_status: active
      local_acceptance:
        - Public site uses approved token family where appropriate.
        - Social previews use current v0.3 mark and product-status language.
        - Navigation CTA language stays on `View products`, not packs.
        - Generated writing pages do not reintroduce older nav language or shell widths.
        - Public recommendation/product copy uses product-path language.
        - Public product pages distinguish downloadable Context Kits from the app Context Inbox workflow.
        - Nav and near-nav language have a documented contract and a local checker.
        - Recommendations avoid outreach-style setup-review pricing and booking copy.
        - Assessment-family pages use current public-site tokens and mark treatment.
        - Hidden demo/prototype screens are not treated as canonical product truth.
        - Internal notes to John are tracked as internal actions, not embedded in public page copy.
        - Visual QA is completed before release.
      evidence:
        - dev-docs/public-nav-contract.md
        - scripts/check-public-nav.js
        - .dovetell-context/internal-actions.md
        - products/index.html
        - recommendations/index.html
        - team-assessment/index.html
        - assessments/index.html
        - dovetell-data.json
        - scripts/build-writing.js
        - team-assessment/assessment-config.json
      measurement:
        status: measured-upstream
        note: Actual token burn remains in the HQ centerline event log.
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
- Public nav and generated-page source should preserve `View products`.
- Public recommendation/product copy should avoid buyer-facing `packs` and
  `package ladder` language unless intentionally referring to technical repo
  packages.
- Public nav and near-nav copy should pass `node scripts/check-public-nav.js`
  after hand edits.

---

*Public implements reviewed brand. Private strategy stays elsewhere.*
