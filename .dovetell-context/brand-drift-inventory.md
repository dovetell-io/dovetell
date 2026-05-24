# Brand Drift Inventory

Status: active  
Owner repo: dovetell-public  
Centerline: `cl-2f79b64a`  
Centerline item: `cli-83c42f10`  
Canonical source: `dovetell-hq/doc-2f79b64a`

## Purpose

Inventory public-site visual, token, logo, and asset drift against the HQ brand
centerline, including the first implementation pass completed on 2026-05-23.

Implementation is governed by `dovetell-hq/doc-7c4e2a91`.

## Current Public Assets

```yaml
public_assets:
  favicon:
    path: assets/favicon.png
    size: 32x32
    classification: aligned
    note: Replaced with v0.3 favicon source on 2026-05-23.
  apple_touch_icon:
    path: assets/apple-touch-icon.png
    size: 180x180
    classification: aligned
    note: Replaced with v0.3 app icon source on 2026-05-23.
  wordmark_png:
    path: assets/dovetell-wordmark.png
    size: 1280x220
    classification: aligned
    note: Replaced with v0.3 two-tone wordmark source on 2026-05-23.
  wordmark_svg:
    path: assets/dovetell-wordmark.svg
    classification: aligned
    note: Replaced with v0.3 two-tone wordmark SVG on 2026-05-23.
  og_default:
    path: assets/og.png
    size: 1200x630
    classification: aligned
    note: Regenerated from approved v0.3 social-card raster at 1200x630 on 2026-05-23.
  og_assessment:
    path: assets/og-assessment.png
    size: 1200x630
    classification: aligned
    note: Regenerated from v0.3 meaning-through-inference raster at 1200x630 on 2026-05-23.
  og_starter:
    path: assets/og-starter.png
    size: 1200x630
    classification: aligned
    note: Regenerated from v0.3 Starter cover raster at 1200x630 on 2026-05-23.
  framework_image:
    path: assets/framework.png
    size: 1536x1024
    classification: inspect
    note: Keep only if it makes the artifact visible and matches current product-status language.
```

## Token Drift

```yaml
token_drift:
  - file: index.html
    current:
      ink: "#14263A"
      paper: "#F8F5F1"
      paper_2: "#F1F3F7"
      line: "#D9DDE6"
      blurple: "#5865F2"
      blurple_dark: "#3237C8"
    target_family:
      midnight: "#14263A"
      warm_surface: "#F8F5F1"
      line: "#D9DDE6"
      blurple: "#5865F2"
    classification: aligned
    reason: First-screen public site tokens were normalized in one pass on 2026-05-23 and visually checked on desktop/mobile.

  - file: writing/index.html and writing/context-debt/index.html
    current:
      ink: "#111223"
      paper: "#fbfbff"
      blurple: "#5865f2"
    classification: aligned
    reason: Generated and built writing pages now preserve the shared 1120px shell and `View products` CTA from scripts/build-writing.js.

  - file: assessments/index.html, recommendations/index.html, framework/index.html
    current:
      blurple: "#5865F2"
      blurple_dark: "#3B45C4"
      near_black: "#1A1A2E"
    classification: inspect
    reason: Recommendation copy and metadata now use product-path language; assessment/framework visual chrome still needs a fuller shared-nav component pass.

  - file: assets/og-card.html, assets/og-starter.html, assets/og-assessment.html
    current:
      dark_surface: "#111223"
      accent: "#5865f2"
    classification: aligned
    reason: OG templates now use midnight, warm surface, blurple, and current product-status language.
```

## Typography

Plus Jakarta Sans is already used across primary public surfaces. Keep it as the
preferred face.

Email template code still uses Inter inline styles in
`supabase/functions/assessment-runs/index.ts`; classify as `defer` unless the
email template is being updated for launch.

## Drift Classifications

| Item | Classification | Next Action |
| --- | --- | --- |
| Public first-screen CSS tokens | aligned | Completed 2026-05-23; generated/static subpages remain a separate sweep. |
| Favicon/apple-touch icon | aligned | Replaced with v0.3 assets. |
| Wordmark assets | aligned | Replaced with v0.3 two-tone lockup exports. |
| OG images/templates | aligned | Regenerated/updated from v0.3 sources and verified 1200x630. |
| App demo emoji logo | retire-or-isolate | Demo uses a loose symbol; do not treat as public brand. |
| Product-status copy | aligned | Preserves Starter public, Project HQ gated, Team HQ research, and uses product-path language where public-facing. |
| Public nav CTA language | aligned | Active public routes and writing generator use `View products`; no `View packs` matches remain. |
| Shared nav source | guarded | Static pages still duplicate nav CSS/HTML; `dev-docs/public-nav-contract.md` and `scripts/check-public-nav.js` now guard the current contract until extraction is worth it. |

---

*Inventory and first-pass actuals for `cli-bd03c7a9`.*
