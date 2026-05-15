# Social Preview Assets

Status: active
Created: 2026-05-15
Owner: jc/brand-designer
Source: public site OG asset pass

This page documents the public website's Open Graph and social preview assets.

## Assets

- `assets/og.png`
  Home/default card. Message: "Tell it once. Let it travel."
- `assets/og-assessment.png`
  Assessment and saved assessment card. Message: team AI context assessment.
- `assets/og-starter.png`
  Recommendations/starter card. Message: starter context for one project.

Source files:

- `assets/og-card.html`
- `assets/og-assessment.html`
- `assets/og-starter.html`
- `dev-docs/render-og-assets.py`

## Generation

Run from the repo root:

```bash
python3 dev-docs/render-og-assets.py
```

This regenerates the three 1200 x 630 PNG assets.

## Guardrails

- Keep the product name lowercase: `dovetell`.
- Avoid fake UI complexity, generic AI imagery, brains, cyberpunk, stock
  people, bokeh/orb decoration, and bird mascot treatment.
- Prefer simple system language: scattered input, reviewed context,
  repo-owned context, reusable handoff.
- Do not imply a live SaaS platform, account dashboard, review queue, MCP
  integration, automated drift detection, or customer validation that does not
  exist yet.

## Current Page Mapping

- `/` uses `assets/og.png`
- `/framework/`, `/why/`, and `/privacy/` use `assets/og.png`
- `/team-assessment/` and `/assessments/` use `assets/og-assessment.png`
- `/recommendations/` uses `assets/og-starter.png`

## Improvement Notes

The current assets are deliberately text-led and conservative. They are good
enough for the May launch, but the next pass should consider a tighter custom
illustration system once the landing page visual language stabilizes.

