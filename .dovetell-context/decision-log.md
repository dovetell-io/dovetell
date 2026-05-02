# dovetell — Decisions Log
Last updated: May 1, 2026

One file. All meaningful decisions. Enough context to reconstruct the why.
For detailed rationale on major architectural decisions, see /.dovetell-context/decisions/.

---

## How to read this

Each row is a decision that shaped the product or its architecture.
Status: Active = still in effect · Superseded = replaced by a later decision · Deferred = not yet made

---

## Product & Strategy

| Date | Decision | Rationale | Status |
|---|---|---|---|
| Apr 2026 | Prompt library before platform | Validate willingness to pay before building infrastructure | Active |
| Apr 2026 | 2 free samples, not 0 or 5 | Enough to show quality; not enough to replace buying | Active |
| Apr 2026 | Gumroad for product delivery | Zero infrastructure, immediate revenue, ~10% take rate | Active |
| Apr 2026 | Gmail now, ConvertKit at 50+ subscribers | Zero overhead until there's a list worth managing | Active |
| May 2026 | Assessment as primary GTM surface | Self-qualifying, shareable, captures pain before any conversation | Active |
| May 2026 | $299 Setup Review as services wedge | High margin, no infrastructure, forces validation conversations | Active |
| May 2026 | Manual email replies until 50+ completions | Personal founder reply converts better than automated template | Active |

## Naming

| Date | Decision | Rationale | Status |
|---|---|---|---|
| Apr 2026 | lowercase dovetell, always | Signals modern, understated, confident (notion, linear, figma) | Active |
| May 2026 | dovetell as placeholder name | Pre-revenue name change is cheap; post-traction is expensive | Active |
| May 2026 | dovemind as leading candidate | Concept fit, phonetic clarity vs dovetail, platform scalability | Active |
| May 2026 | Feather namespace abandoned | OpenAI trademark, too congested | Active |

## Infrastructure & Hosting

| Date | Decision | Rationale | Status |
|---|---|---|---|
| Apr 2026 | GitHub over GitLab | Developer community visibility, clean IP separation | Active |
| Apr 2026 | Open core model | Free framework + samples public; paid library via Gumroad | Active |
| May 2026 | GitHub Pages over Carrd | Free, version controlled, no character limits, clean URLs | Active |
| May 2026 | Carrd cancelled | Replaced by GitHub Pages; no migration cost at zero subscribers | Active |
| May 2026 | All accounts under dovetellio@gmail.com | Clean LLC transition, no personal account entanglement | Active |
| May 2026 | Formspree Business plan | Submissions to product inbox, not personal email | Active |
| May 2026 | Plausible for analytics | Privacy-first, no cookies, no personal data | Active |

## Assessment Architecture

| Date | Decision | Rationale | Status |
|---|---|---|---|
| May 2026 | Client-side ID generation | No backend required; IDs sent to Formspree for backloading | Active |
| May 2026 | uid permanent per browser | Ties projects to a person without requiring accounts | Active |
| May 2026 | pid persists across retakes | Enables growth tracking per project | Active |
| May 2026 | aid fresh per submission | Tracks individual runs within a project | Active |
| May 2026 | vid hardcoded v01 | Simple versioning; bump when questions change | Active |
| May 2026 | email → uid → pid → aid hierarchy | Clean tree, not a graph | Active |
| May 2026 | retake=1 param to bypass redirect | Prevents infinite loop between /team-assessment/ and /assessments/ | Active |
| May 2026 | Page separation (assessment / assessments / recommendations) | Each page one job; easier to maintain, no logic collisions | Active |
| May 2026 | dovetell-data.json as content source | Questions, thresholds, offers not hardcoded in HTML | Active |
| May 2026 | Unanswered questions score 0 | Defaulting to 1 caused 30/90 score for empty submissions | Active |
| May 2026 | Scoring thresholds 0–22/23–54/55–72/73–90 | Calibrated for 90-point scale (was incorrectly using 36-point thresholds) | Active |
| May 2026 | reCAPTCHA disabled | Conflicts with AJAX fetch submission | Active |
| May 2026 | Allowed Origins pending | Waiting for GitHub Pages HTTPS cert | Active |

## Inference & Model

| Date | Decision | Rationale | Status |
|---|---|---|---|
| May 2026 | BYOK / local inference only | Not in the API cost business; trust signal for regulated industries | Active |
| May 2026 | Claude-native prompts first | Natural writing environment; ChatGPT variants from real work testing | Active |
| May 2026 | No parallel model versions yet | Too much overhead pre-validation; document differences organically | Active |

## Privacy & Data

| Date | Decision | Rationale | Status |
|---|---|---|---|
| May 2026 | Scores seen by product team, not sold/shared | Honest disclosure without alarming language | Active |
| May 2026 | Project name field with proprietary content disclaimer | Protects IP boundary; sets expectations before input | Active |
| May 2026 | Raw answers + skip count sent to Formspree | null in answer array = skipped = product research signal | Active |
| May 2026 | Level always recalculated from score, never from stored string | localStorage stored stale labels from before threshold fix; recalculate on display | Active |
| May 2026 | Compounding has no next level — recommendations show frontier state | nextLevel=null fallback to Coordinated was backwards; Compounding IS the top | Active |
| May 2026 | Plain English privacy policy at /privacy/ | Accessible to non-lawyers; linked from gate modal | Active |

## Context & Documentation

| Date | Decision | Rationale | Status |
|---|---|---|---|
| May 2026 | .dovetell-context/ folder in product repo | dovetell running on itself; single source of truth | Active |
| May 2026 | docs.dovetell.io as separate repo (dovetell-io/docs) | Clean separation from product site; independent deploy cadence | Active |
| May 2026 | CC BY 4.0 license for docs | Docs are shareable/adaptable; not code so MIT doesn't apply | Active |
| May 2026 | Hugo migration deferred | Ship single HTML now; migrate when second contributor joins | Deferred |
| May 2026 | .dovetell-context/ hidden folder convention | Separates internal context from site files; sets standard for other teams adopting dovetell | Active |
| May 2026 | One decisions.md not individual ADRs | ADRs are team ceremony; solo founder needs one scannable file | Active |
| May 2026 | dovetell-seed.md is product-only | Personal context separated to private jchromchak repo | Active |

## Deferred Decisions

| Decision | Trigger to revisit |
|---|---|
| LLC formation | First $500 Gumroad revenue or any customer contract |
| ConvertKit upgrade | 50+ email subscribers |
| Gumroad → ThriveCart migration | $300–500/mo in sales |
| Scoring threshold recalibration | 50+ real (non-founder) assessment completions |
| dovetell.css refactor | After first 10 real completions |
| dovetell-data.json wired to assessment HTML | Next work session |
| Postgres backend | When UUID persistence needed / users asking to save across devices |
| Resend / Loops for transactional email | When manual replies become unmanageable |
| Name change from dovetell to dovemind | After 48hr sit + PM peer validation |
