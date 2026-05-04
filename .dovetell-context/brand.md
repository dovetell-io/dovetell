# dovetell — Brand & Persona Reference

Last updated: 2026-05-03 (merged session a3f7c291)

Single source of truth for brand standards and demo personas.
Use this file to ensure consistency across all public-facing artifacts,
demo screens, sales materials, and AI-generated content.

---

## Brand

### Name

Always lowercase: **dovetell**

Never: Dovetell, DoveTell, DOVETELL

Leading name change candidate: **dovemind** — deferred pending peer validation.
If the name changes, this file is the first thing to update.

### Tagline

**"Tell it once. Let it travel."**

Use verbatim. Do not paraphrase.

### Casing rules (critical for AI generation)

The tagline is always fully lowercase — no exceptions:

  CORRECT:   tell it once. let it travel.
  INCORRECT: Tell It Once. Let It Travel.
  INCORRECT: Tell it once. Let it travel.

The wordmark is always lowercase:

  CORRECT:   dovetell
  INCORRECT: Dovetell / DoveTell / DOVETELL

When generating images or marketing assets, instruct the tool explicitly:
"All text is lowercase including the first letter of every sentence.
No title case. No sentence case. No capitals anywhere except
proper technical terms if required."

### One-liner

**"Cursor handles the runtime. dovetell handles what the runtime needs to know about your team."**

### Colors

| Name          | Hex                     | Usage                                      |
|---------------|-------------------------|--------------------------------------------|
| Blurple       | `#5865F2`               | Primary — CTAs, links, active states, logo |
| Blurple dark  | `#3B45C4`               | Hover states                               |
| Blurple light | `#D8DAFD`               | Text on dark, muted accents                |
| Near-black    | `#1A1A2E`               | Background (dark pages), body text         |
| Cream         | `#F5F4EF`               | Demo banner, light accents                 |
| Surface       | `#20203A`               | Card backgrounds (dark theme)              |
| Surface 2     | `#272745`               | Elevated cards (dark theme)                |
| Muted         | `rgba(216,218,253,0.5)` | Secondary text (dark theme)                |
| Amber         | `#F59E0B`               | Founding member pricing, deferred status   |

### Typography

| Role        | Font              | Weight   |
|-------------|-------------------|----------|
| Display     | Plus Jakarta Sans | 800      |
| Body        | Plus Jakarta Sans | 400–600  |
| Mono / code | JetBrains Mono    | 400–500  |

### Logo

- Mark: white dove outline on blurple rounded square (outline mark, May 2026)
- Wordmark: dual-tone — "dove" in `#1A1A2E`, "tell" in `#5865F2`
- SVG implementation: single `<text>` element with `<tspan>` color switch — no gap between words
- Never add a space between "dove" and "tell" in any rendering
- Outline mark replaces solid dove — stroke = path = flow, extensible into UI diagrams

### Logo assets (committed to `assets/`)

| File                              | Usage                          |
|-----------------------------------|--------------------------------|
| `dovetell-mark-blurple-transparent.png` | blurple dove, no bg (nav on light) |
| `dovetell-mark-white-transparent.png`   | white dove, no bg (nav on dark)    |
| `dovetell-mark-blurple-square.png`      | white dove on blurple (favicon)    |
| `dovetell-mark-dark-square.png`         | white dove on near-black (dark)    |
| `dovetell-mark-light-square.png`        | blurple dove on white (light)      |
| `dovetell-wordmark.svg`                 | 192×44 — nav, documents            |
| `dovetell-wordmark.png`                 | 384×88 — where SVG not supported   |
| `favicon.png`                           | 32px — browser tab                 |
| `apple-touch-icon.png`                  | 180px — iOS home screen            |
| `og.png`                                | 1200×630 — OG/Twitter preview      |
| `branch-illustration.svg`               | context change request flow        |
| `branch-illustration.png`               | 2x PNG                             |

### Gumroad images (generated May 2026)

| File | What it is |
|---|---|
| Starter square 1:1 | Product card — "tell it once. let it travel." · $49 → $29 founding |
| Starter Plus square 1:1 | Matched pair — $99 → $59 founding |
| Hero banner 16:9 | Left-aligned headline + body + pricing · ghost "context" right |
| Comparison card 16:9 | Starter vs Starter Plus · "Everything in Starter, plus:" |

Regeneration prompts in: `gumroad-image-prompts.md`

### Voice & Tone

- Pragmatic, grounded, direct
- No jargon, no hype, no AI theater
- Short sentences. Active voice.
- Never claim things that aren't built yet — say "coming soon" or "Phase 2"
- The product is a tool, not a movement

### Theme convention

| Page type         | Theme | Examples                               |
|-------------------|-------|----------------------------------------|
| Marketing/content | Dark  | homepage, /framework, /why, /app-demo  |
| Transactional     | Light | /team-assessment, /recommendations     |
| Platform (app)    | Dark  | app.dovetell.io                        |

### Demo banner convention

All interactive mockup / app-demo pages carry:
- Height: 24px, full width
- Background: `#F5F4EF` (cream)
- Text: JetBrains Mono, 10px, uppercase, `#5865F2` (blurple)
- Format: `// [Screen name] · Demo — not live data`

---

## Demo Personas

All demo content uses fictional people and companies only.
Boeing or any employer is never referenced in public-facing artifacts.

### Primary company — Datagate Systems

**Industry:** Software / SaaS — Ops Analytics platform
**Repo:** `dovetell-io/ops-analytics` (fictional)
**Team size:** 4–7 members
**Context Health:** 72 / 100 — Drifting
**Queue:** 4 items pending review

Used in: app-demo screens, architecture blueprint, assessment examples.

---

### Personas

#### Jane Park — PM / Team Lead
**Role:** Product Manager, Datagate Systems
**Email:** jane@datagate.com
**Avatar:** Initials "JP", gradient `#5865F2 → #A855F7`
**dovetell role:** Owner. Reviews queue, manages context base, monitors drift score.
**Appears in:** App-demo sidebar (logged-in user), activity feed, vetted items.

#### Maya Rowe — Senior Approver
**Role:** Engineering Lead, Datagate Systems
**Email:** maya@datagate.com
**Avatar:** Initials "MR", gradient `#0891B2 → #0D9488`
**dovetell role:** Approver. Final sign-off. Her name appears on vetted decisions.
**Appears in:** MCP response cards ("accepted by Maya Rowe"), decision traces, vet history.

#### Alex Kim — Developer
**Role:** Senior Engineer, Datagate Systems
**Avatar:** Initials "AK", gradient `#5865F2 → #7C3AED`
**dovetell role:** Contributor. Adds decisions and assumptions from sprint work.
**Appears in:** Activity feed, queue items, recent changes.

#### Priya N. — Developer (Meridian Health)
**Role:** Engineer, Meridian Health — Data Platform
**Avatar:** Initials "PN", gradient `#0891B2 → #0D9488`
**Appears in:** Activity feed (cross-project view), definition updates.

#### Sam Okafor — Operations Lead (Viewer)
**Role:** Operations Lead, Datagate Systems
**Avatar:** Initials "SO", gradient `#16A34A → #0D9488`
**dovetell role:** Viewer. Non-technical reviewer persona.
**Appears in:** app-demo/review.html

#### Marco R. — Developer (Volta Energy)
**Role:** Engineer, Volta Energy — MES Integration
**Avatar:** Initials "MR", gradient `#16A34A → #0D9488` (teal to distinguish from Maya Rowe)
**Appears in:** Activity feed (cross-project view), assumption additions.

---

### Secondary companies

#### Meridian Health
**Industry:** Healthcare — Data Platform
**Context Health:** 91 / 100 — Current · Queue: 2

#### Volta Energy
**Industry:** Energy — MES Integration
**Context Health:** 38 / 100 — Stale · Queue: 1

---

## Consistency rules

- Jane Park is always the logged-in user in single-project views
- Maya Rowe is always the named approver on vetted decisions
- Alex Kim is always the source of unvetted / newly added items
- "Accepted by Maya Rowe · 3d ago" is the canonical MCP response attribution
- Datagate Systems is always the primary demo project
- Never use real company names, real people, or real data in any demo artifact
- Never use Boeing-adjacent terminology in public-facing materials
