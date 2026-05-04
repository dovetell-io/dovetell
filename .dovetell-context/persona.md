# dovetell — Personas

Last updated: May 2, 2026

Fictional demo characters for mockups, generated content, prompts,
and screenshots. Use these consistently across all demo artifacts.

For the product role model (Owner / Approver / Contributor / Viewer),
see `roles.md`.

For brand standards and visual specs, see `brand.md`.

---

## Primary company — Datagate Systems

**Type:** Software / SaaS
**Product:** Ops Analytics platform
**Repo:** `datagate-systems/ops-analytics` (fictional)
**Team size:** 6
**dovetell context health:** 72 / 100 — Drifting
**Queue:** 4 items pending review
**Active sprint:** Sprint 14

Used in: all single-project views, queue screens, import UI,
MCP query panel, architecture blueprint.

### Seed context base — `.dovetell-context/`

These are the canonical decisions, definitions, assumptions, and policies
for Datagate Systems. Use these consistently in all demo content —
do not invent new ones unless adding to this list.

**decisions.md**
- Standardize on OpenTelemetry for all services (unvetted · Alex Kim · Sprint 14)
- Data retention window extended from 90 to 180 days (vetted · Maya Rowe · 7d ago)
- All new services deploy to AWS us-east-1 by default (vetted · Maya Rowe · 14d ago)
- Legacy billing pipeline sunset in Q2 (stale · flagged 61d ago)

**definitions.md**
- Service Boundary — the line between ingestion and processing layers (vetted · Priya N. · 1d ago)
- Event schema — canonical shape of all platform events (vetted · Alex Kim · 5d ago)
- Ops dashboard — the primary customer-facing analytics view (vetted · Jane Park · 12d ago)

**assumptions.md**
- AWS is our primary cloud provider (unvetted · Alex Kim · 1d ago)
- Shift data refresh cadence is 15 minutes during active periods (unvetted · 14d ago)
- All customers are on the current API version unless flagged (vetted · Maya Rowe · 8d ago)

**policies.md**
- Data access — read-only for all non-engineer roles (vetted · Jane Park · 7d ago)
- All imports require PM review before becoming truth (vetted · Jane Park · 3d ago)

---

### Team members

#### Jane Park — Owner
**Role:** Product Manager
**Email:** jane@datagate.com
**dovetell role:** Owner
**Avatar:** Initials "JP" · gradient `#5865F2 → #A855F7`
**Responsibilities in dovetell:** Sets up and manages the project.
Reviews queue, monitors context health, manages team access,
resolves stale items. Primary point of accountability for what
the AI knows about Datagate.
**Voice:** Direct, organized, slightly impatient with ambiguity.
Writes short Slack messages. Uses bullet points.
**Appears in:** Sidebar (logged-in user), activity feed, policy
updates, queue management, project settings.

#### Maya Rowe — Approver
**Role:** Engineering Lead
**Email:** maya@datagate.com
**dovetell role:** Approver
**Avatar:** Initials "MR" · gradient `#0891B2 → #0D9488` (teal)
**Responsibilities in dovetell:** Final sign-off on high-stakes
decisions and definitions. Her name on a vetted item means it
is truth. Subject matter authority for architecture and data model.
**Voice:** Precise, technical, measured. Writes in complete sentences.
Edits before accepting — rarely accepts without a tweak.
**Canonical attribution:** "accepted by Maya Rowe · 3d ago"
**Appears in:** MCP response cards, decision traces, vet history,
architecture blueprint Physical Evidence row.

#### Alex Kim — Contributor
**Role:** Senior Engineer
**Email:** alex@datagate.com
**dovetell role:** Contributor
**Avatar:** Initials "AK" · gradient `#5865F2 → #7C3AED` (indigo)
**Responsibilities in dovetell:** Primary source of unvetted queue
items. Adds decisions and assumptions from sprint work — via import,
via prompt, or via direct add. Does not vet or accept.
**Voice:** Terse. Writes context the way he writes commit messages —
functional, no fluff. Sometimes skips the "why."
**Appears in:** Activity feed (new additions), queue items,
recent changes table, import source attribution.

#### Priya N. — Contributor
**Role:** Engineer
**Email:** priya@datagate.com
**dovetell role:** Contributor
**Avatar:** Initials "PN" · gradient `#7C3AED → #DB2777` (purple-pink)
**Responsibilities in dovetell:** Adds and updates definitions.
More thorough than Alex — her additions often come pre-formatted
and rarely need editing before acceptance.
**Appears in:** Activity feed (definition updates), queue items.

#### Sam Okafor — Viewer
**Role:** Operations Lead
**Email:** sam@datagate.com
**dovetell role:** Viewer
**Avatar:** Initials "SO" · gradient `#16A34A → #0D9488` (green)
**Responsibilities in dovetell:** Reads context base in plain English.
Monitors drift score. Does not add to queue or vet anything.
Represents the non-technical teammate who benefits from dovetell
without ever touching a markdown file.
**Appears in:** Viewer role examples, plain English render cards,
non-technical use case demonstrations.

---

## Secondary company — Meridian Health

**Type:** Healthcare
**Product:** Data Platform
**Repo:** `meridian-health/data-platform` (fictional)
**Team size:** 7
**dovetell context health:** 91 / 100 — Current
**Queue:** 2 items pending review

Used in: multi-project list, cross-project activity feed.

### Team members (supporting cast)

#### Priya N.
Same persona as Datagate — she works across both projects in
cross-project feed demos. Use teal gradient to distinguish from
Maya Rowe's "MR" initials.

---

## Secondary company — Volta Energy

**Type:** Energy
**Product:** MES Integration project
**Repo:** `volta-eng/mes-integration` (fictional)
**Team size:** 2
**dovetell context health:** 38 / 100 — Stale
**Queue:** 1 item pending review
**Last activity:** 18 days ago

Used in: multi-project list, stale flag examples,
cross-project activity feed.

### Team members (supporting cast)

#### Marco R. — Contributor
**Role:** Engineer
**Avatar:** Initials "MR" · gradient `#DC2626 → #EA580C` (red-orange)
Note: Use red-orange gradient to distinguish from Maya Rowe (teal MR).
**Appears in:** Cross-project activity feed, assumption additions,
stale detection examples.

---

## Consistency rules

- Jane Park is always the logged-in user in single-project views
- Maya Rowe is always the named approver on vetted decisions
- Alex Kim is always the source of new unvetted items
- Sam Okafor represents the non-technical viewer use case
- "accepted by Maya Rowe · 3d ago" is the canonical MCP response attribution
- Datagate Systems is always the primary demo project
- Use the seed context base above — do not invent new Datagate decisions
- Never use real company names, real people, or real data
- Never use Boeing-adjacent terminology in public demo content
