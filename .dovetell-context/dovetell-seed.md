# dovetell — Product Seed

Last updated: 2026-05-03 (session a3f7c291)

Use this file to give an AI assistant full context on dovetell before
starting a work session. Paste the full contents as your first message.
Product context only — no personal or confidential information.

Companion files (paste alongside for specific work):
  brand.md             colors, typography, assets, voice, demo banner spec
  personas.md          fictional demo characters, canonical context data
  roles.md             product role model, permission matrix
  approval-workflow.md workflow positioning, competitive analysis
  business-rules.md    product behavior rules, bulk import classification, scope
  risks.md             risk register — likelihood, impact, mitigation
  opportunities.md     landscape file — not commitments, scope-checked

-----

## What dovetell is

dovetell is a context orchestration layer for AI-assisted software teams.

North star: "I want to be asked fewer questions."

Not a documentation tool. Not a PM tool. Not an LLM wrapper.
The governing layer that captures decisions, aligns intent, and keeps
everyone from asking the same questions twice.

Three failure modes dovetell solves:
1. Tribal knowledge failure — domain context lives in one person's head
2. Documentation drift — governing docs go stale the moment work begins
3. Bi-directional blindness — code evolves without informing docs; docs
   change without reaching developers

Tagline: "Tell it once. Let it travel."

The wedge: "dovetell makes team context official without making it
complicated." Low friction context management is the entry point.

The business model: "The maturity assessment and prompt library are
not the product. They are the distribution channel to the platform."

The architectural philosophy: "dovetell is a renderer, not an owner.
The data lives in your repo. We just make it usable."

The lock-in inversion: Low lock-in is high defensibility. Teams
adopt without fear because they own everything. They stay because
the value is real, not because they're trapped. The fact that a
team can stop using dovetell and walk away with all their context
in readable markdown files is the trust statement — not a weakness.

On markdown as the medium: markdown is the common tongue of the
agentic era. CLAUDE.md · AGENTS.md · .cursorrules — all markdown.
Every major AI coding tool reads it natively. dovetell speaking
markdown is not a compromise. It is the right choice. Portability
and transmissibility across tools, teams, and time is the point.
The team is never locked in. That is the feature.

On Cowork Dispatch (Anthropic, 2026):
Cowork Dispatch is the execution layer — assign a task from your
phone, Claude Code runs it on your desktop, push notification when
done. Powerful. Already shipped for Pro and Max plans.

What Cowork Dispatch does not have is a context layer.
It knows you — your preferences, your history. It does not know
your team's vetted decisions, your data retention policy, your
definitions, your standards. When you dispatch "fix the nav across
all pages," Cowork doesn't know that GitHub was swapped for Why,
what the score ranges should be, or what the brand conventions are
— unless you re-explain it in every message.

dovetell is the context layer Cowork Dispatch is missing.
.dovetell-context/ is what Claude Code reads automatically at
session start. The team's vetted decisions travel into every
dispatched task without being re-explained. Ever.

The queue is also yours. tasks.md lives in your repo — readable,
ownable, portable, in git. Cowork's thread lives in Anthropic's
infrastructure. Same renderer-not-owner principle applies.

When the dovetell MCP server exists, @dovetell becomes a connector
Cowork can call natively. Dispatch + dovetell context = the full
loop. That is Phase 3 made concrete.

Practical workflow today (before MCP server):
  Phone → Cowork Dispatch → task language from tasks.md
  Claude Code reads .dovetell-context/ → has full context
  Task completes → check off in tasks.html → git commit = audit trail
  Cowork handles execution · dovetell handles context · git handles record

-----

## Positioning

Phase 2 → Phase 3 bridge in the agent development stack:
  Phase 1 (weights): bigger models, more data
  Phase 2 (context): prompt engineering, RAG — dovetell starts here
  Phase 3 (harness): what environment should the model operate in —
    dovetell ends here

One-liner: "Cursor handles the runtime. dovetell handles what the
runtime needs to know about your team."

The /why page (dovetell.io/why) renders the positioning as "Why not
just X?" patterns — Cursor, Claude Code, Notion, AGENTS.md, chat AI.
Composability argument, not competitor teardown.

Supporting frameworks:
  LangChain (2026): "If you're not the model, you're the harness"
  Foundation Capital (2025): context graphs as decision trace stores
  AI Daily Brief (2026): HaaS — domain context is the gap it doesn't fill
  HBR (2026): PM is the bridger; dovetell makes bridging structural

-----

## Core architectural principle

The repo is the source of truth. dovetell never owns context data.

Context lives in .dovetell-context/ in the team's repo. dovetell reads,
renders, and writes back via scoped GitHub/GitLab API token.
No markdown content is ever stored in dovetell's database.

Token scope shown explicitly at onboarding:
  ✓ .dovetell-context/ read/write
  ✗ Source code
  ✗ Issues / PRs
  ✗ All other folders

Onboarding copy: "We only read and write to .dovetell-context/ in
your repository."

What dovetell stores in Postgres (identity + state only):
  uid           browser identity
  pid           project ID
  aid           assessment run ID
  vid           question set version
  email         once provided
  queue state   reviewed / accepted / rejected / deferred
  vet history   who approved · what · when
  sync state    last pull/push timestamps
  scores        assessment answers, benchmarking only, never sold

What dovetell never stores:
  Markdown file contents. Decisions. Definitions. Assumptions.
  Policies. Any content from .dovetell-context/.

On authentication:
  dovetell never holds repo credentials on behalf of users.
  Each user authenticates with their own GitHub/GitLab OAuth (Phase 2).
  Writes are committed as that user — attribution is structural, not cosmetic.
  This is the BYOK principle applied to identity, not just keys.
  The commit history is the audit trail. dovetell does not need to maintain one.

Context files are created on first write — zero setup friction:
  Context files do not need to exist before the UI loads. A 404 on
  initial load is expected behavior for a new project. The file is
  created automatically on the first commit. Point at a repo, start
  adding context. Structure emerges from use.

-----

## Five context file types (as of 2026-05-03)

  decisions.md      — commitments made or to be made. type:resolved|active
  opportunities.md  — the landscape. Not commitments. Scope-checked.
  risks.md          — risk register. Likelihood + impact + mitigation.
  business-rules.md — product behavior rules. UI logic. Scope constraints.
  tasks.md          — work queue. Flat append log. Priority · owner · source.

All files: flat append log, kebab-case, same ID conventions.
ID prefixes: decision- · opp- · risk- · rule- · task-

The scope protection rule (rule-ff00c134):
  Every feature request is tested: "Does this make team context more
  accurate and more accessible, or does it make dovetell capable of
  managing work?" If the latter → opportunities.md, not decisions.md.
  "Protect the scope." — the constraint that keeps dovetell from
  becoming ClickUp.

-----

## Product phases

Phase 1 — now
  Team AI Maturity Assessment (live, dovetell.io/team-assessment)
  Prompt library (Gumroad)
    Starter · $49 full · $29 founding — one file: team-context.md
    Starter Plus · $99 full · $59 founding — team-context.md + maintenance-prompts.md
    Setup Review · $299 — 60-min call + 24hr follow-up
    Free sample — sample-team-context.md (stripped subset)
  Founding member pricing: first 20 buyers or one week
  /why positioning page (live)
  App demo screens (unlinked, dovetell.io/app-demo/)
  Architecture Blueprint v0.1 (service blueprint, May 2026)
  Branch illustration / context change request flow (SVG + PNG, May 2026)
  Competitive positioning 2x2 (image, May 2026)
  Market size pitch slide (image, May 2026)

Phase 2 v1 — next
  SaaS platform at app.dovetell.io
  Project profile onboarding (4-step intake → .dovetell-context/)
  Context base, unvetted queue, MCP integration, drift score
  Shareable links for single context items (owner-controlled, off by default)
  GitHub OAuth BYOK authentication (Option A preferred)

Phase 2 v2 — regulated industries
  Sequential approval workflows, named approvers, full audit trail
  Governance toggle per project (Standard / Regulated)
  Unlocks healthcare / finance / defense

Phase 3 — future
  Queryable decision traces at scale. Context graph.
  dovetell as MCP server in every AI-assisted workflow.

-----

## Gumroad products (updated 2026-05-03)

| Product      | Full | Launch | What it is |
|--------------|------|--------|------------|
| Starter      | $49  | $29    | team-context.md — one file, fill it in, paste it |
| Starter Plus | $99  | $59    | Starter + maintenance-prompts.md (4 prompts) |
| Setup Review | $299 | —      | 60-min call + 24hr follow-up, we fill it in together |
| Free sample  | $0   | —      | stripped team-context.md, links to buy |

Pro Kit name reserved for a future tier with broader scope.
Founding member pricing: first 20 buyers or one week, whichever comes first.

Three purchase flows:
  Flow 1: dovetell.io assessment → recommendations → Gumroad → buy
  Flow 2: Gumroad direct → buy
  Flow 3: Gumroad → assessment → Gumroad → buy

Assessment link shown in listing but not promoted — less friction now.
Listing leads with pain not assessment CTA.
Personal email after every purchase — upsell path to $299 Setup Review.
Optimize funnel after first 5 purchases, not before.

-----

## The Team AI Maturity Model

Scored 0–90 across six capability areas (5 questions × 0–3 pts each).

| Level       | Score | State                                   |
|-------------|-------|-----------------------------------------|
| Scattered   | 0–22  | Ad hoc AI use, no shared context        |
| Structured  | 23–54 | Some repeatable practices, inconsistent |
| Coordinated | 55–72 | Aligned practices, shared context       |
| Compounding | 73–90 | Systematic advantage, continuous lift   |

Six areas: Shared Context · Prompt Reuse · Team Handoffs ·
Knowledge Capture · Review & Governance · Workflow Integration

-----

## Product role model

Four roles. No custom roles. No inheritance. Maps to accountability.

| Role        | Who                          | Vet | Accept | Add | View |
|-------------|------------------------------|-----|--------|-----|------|
| Owner       | PM, team lead                | ✓   | ✓      | ✓   | ✓    |
| Approver    | Senior engineer, domain SME  | ✓   | ✓      | ✓   | ✓    |
| Contributor | Developer, analyst           | —   | —      | ✓   | ✓    |
| Viewer      | Stakeholder, non-technical   | —   | —      | —   | ✓    |

Owner: one per project. Manages team and settings.
Approver: makes context truth. Multiple per project by domain.
Contributor: feeds the queue, never governs it.
Viewer: plain English only. No markdown. No queue access.

-----

## Context change request model

Proposed changes to vetted items do not overwrite truth. They enter
the queue as a proposed change with diff view (old vs. proposed)
until an Approver accepts, edits, rejects, or defers.

The mechanic is a GitHub pull request. The language is plain English.

| Git concept  | dovetell equivalent                          |
|--------------|----------------------------------------------|
| Branch       | Proposed change to a vetted item             |
| Pull request | Change request in the review queue           |
| Reviewer     | Approver                                     |
| Merge        | Accept — item becomes new truth              |
| Diff view    | Old vs. proposed (in queue UI, item 2)       |
| Audit log    | Vet history — who changed what, when         |

Canonical attribution: "accepted by Maya Rowe · 3d ago"
Canonical "Currently" line: "✓ Vetted · Maya Rowe · 14d ago"

-----

## Non-technical reviewer UI

Viewers and share recipients see a separate light-theme surface.
Demo at dovetell.io/app-demo/review.html (Sam Okafor's perspective).

Key principles:
  Plain English only — no markdown ever shown
  One item at a time — not a dashboard
  Two actions: "Looks right" or "Something's off"
  Flag panel opens inline with text input, routes to Approver
  Progress bar + step pills across the top
  Done state shows confirmed / flagged / skipped summary

Desktop layout (split):
  Left 68% — review card + action buttons
  Right 32% — branch illustration panel (cream #F5F4EF)

Implemented: app-demo/review.html (rebuilt May 2, 2026)

-----

## Sharing — phased approach

Phase 1 (now): User owns data. dovetell liability ends at zip.
  Terms of use in every Gumroad purchase.

Phase 2 v1: Shareable read-only link for single context items.
  Owner-controlled, off by default. No account to view.
  Configurable expiry.

Phase 2 v2: Sequential approval, audit trail, governance toggle.

-----

## Competitive positioning

Approval workflow 2x2 matrix:
  X-axis: Technical → Accessible
  Y-axis: Informal → Structured
  dovetell: top-right (accessible + structured) — alone
  GitHub PR: top-left (structured, developer-only)
  Notion/Slack: bottom-right (accessible, no audit trail)

Market size:
  TAM: $15–30B · SAM: $2–5B · SOM: $50–200M
  SaaS developer tools trading 8–15x ARR, 2026

Key pitch: "The maturity assessment and prompt library are not the
product. They are the distribution channel to the platform."

-----

## Platform UI — key screens

Project Profile (onboarding)
  4-step: team profile → repo connect → seed context → initialize
  Writes to .dovetell-context/. UI is a translator, not an editor.

Context Console (single project)
  Context Health 0–100 (formula TBD, 72/100 is placeholder)
  Four quadrant cards: Decisions · Assumptions · Definitions · Policies
  Activity feed. Review Queue CTA.

Multi-project view (app-demo/projects.html)
Cross-project activity feed (app-demo/feed.html)
Non-technical reviewer UI (app-demo/review.html)
Architecture Blueprint v0.1 — Connect → Import → Extract → Review → Query → Monitor

-----

## Demo personas (summary)

Primary: Datagate Systems — Ops Analytics
Health: 72/100 Drifting · Queue: 4 · Sprint 14

| Persona    | Role             | dovetell role | Gradient        |
|------------|------------------|---------------|-----------------|
| Jane Park  | PM / Team Lead   | Owner         | #5865F2→#A855F7 |
| Maya Rowe  | Engineering Lead | Approver      | #0891B2→#0D9488 |
| Alex Kim   | Senior Engineer  | Contributor   | #5865F2→#7C3AED |
| Priya N.   | Engineer         | Contributor   | #7C3AED→#DB2777 |
| Sam Okafor | Operations Lead  | Viewer        | #16A34A→#0D9488 |

Jane Park = logged-in user in single-project views
Maya Rowe = named approver on all vetted decisions
Alex Kim = source of new unvetted items
Sam Okafor = non-technical reviewer persona

Secondary: Meridian Health (91/100) · Volta Energy (38/100)
Never use Boeing-adjacent terminology in public demo content.

-----

## The @dovetell vision

Developer types in Cursor or Claude Code:
  @dovetell what is our data retention policy?

dovetell returns the vetted answer — sourced, with decision trace,
from policies.md, confirmed by Maya Rowe. Queryable at build time.

"I want to be asked fewer questions" made literal.

-----

## Site structure

dovetell.io/                       homepage + waitlist (dark)
dovetell.io/framework              framework diagram (dark)
dovetell.io/why                    "Why not just X?" positioning (dark)
dovetell.io/team-assessment        assessment (light)
dovetell.io/assessments            returning user dashboard (light)
dovetell.io/recommendations        personalized offer page (light)
dovetell.io/privacy                privacy policy
dovetell.io/app-demo/projects.html multi-project demo (unlinked)
dovetell.io/app-demo/feed.html     activity feed demo (unlinked)
dovetell.io/app-demo/review.html   non-technical reviewer UI (unlinked)
app.dovetell.io                    platform (Phase 2, not built)
docs.dovetell.io                   documentation (planned)

Theme: dark = marketing/content · light = transactional
Nav: Framework · Why · Assessment · [Take the assessment →]
GitHub in footer only.
Demo banner: 24px · cream #F5F4EF · blurple mono
  "// [Screen name] · Demo — not live data"

-----

## ID architecture

### Assessment IDs
  uid   browser identity · once · localStorage
  pid   project ID · once · travels in URL
  aid   assessment run · fresh per submission
  vid   question set version · hardcoded v01
  Hierarchy: email → uid → pid → aid

### Context and governance IDs (as of 2026-05-03)
  task-[8char]       task IDs — generated by tasks.html
  decision-[8char]   decision IDs — sha256 of decision slug [:8]
  opp-[8char]        opportunity IDs — sha256 of opportunity slug [:8]
  risk-[8char]       risk IDs — sha256 of risk slug [:8]
  rule-[8char]       business rule IDs — sha256 of rule slug [:8]

Source field convention:
  john                  founder decision, no session reference
  claude-[sessionhash]  Claude-generated in a specific session

Migration convention — decision → opportunity:
  Decision: status:closed · closure-statement:Migrated to opp-[id]
  Opportunity: origin:decision-[id] — migrated [date]
  Nothing deleted. Full audit trail in both directions.

-----

## Tech stack

Hosting     GitHub Pages       dovetell-io/dovetell
Domain      Porkbun            dovetell.io (purchased 2026-04-29)
Forms       Formspree Business Assessment xrejbpbv · Waitlist xaqvneqn
Analytics   Plausible          Privacy-first, no cookies
Products    Gumroad            ~10% + $0.50/sale
Database    Postgres           Identity + state only. No content stored.
Tracker     jchromchak/tasks   GitHub Pages · 5 pages · shared PAT
Sandbox     dovetell-io/dovetell-sandbox  5 context files
Assets      dovetell-io/dovetell-assets   Private repo
Email       dovetellio@gmail.com          All accounts

Future: Supabase + Resend + Railway
Platform subdomain: app.dovetell.io

### Authentication architecture (Phase 2 — unresolved)

PAT token is the current POC pattern — one fine-grained token per
person, stored in localStorage. Solo founder only. Not sustainable.

Three options for Phase 2 v1:

Option A — GitHub OAuth BYOK (preferred)
  Each user authenticates with their own GitHub/GitLab OAuth.
  Writes committed as that user — git blame is real attribution.
  Consistent with renderer-not-owner and BYOK positioning.

Option B — dovetell as commit proxy (viable, compromises trust)
  dovetell holds one installation-level token per repo.
  dovetell commits on behalf of users with attribution in message.
  Simpler UX but partially contradicts renderer-not-owner. Avoid.

Option C — read-only public, writes require auth (access model layer)
  Viewers read without auth. Contributors and above authenticate.
  Maps to four-role model. Combines with Option A as layered solution.

Current: Deferred. Must resolve before Phase 2 v1 build.
Preferred: Option A + Option C layered.
See decision-63fb14f1 and children.

-----

## AI independence — dovetell works without AI

Three modes of use:

Mode 1 — Agentic / AI-native (north star)
  @dovetell in Cursor or Claude Code. MCP server. Phase 3.

Mode 2 — AI-assisted / workflow
  Paste context from .dovetell-context/ into chat sessions.
  Prompt library is the primary product for this tier.

Mode 3 — Git-native / AI-optional
  Markdown workflow with clean UI. No AI required.
  "Hardened from AI" is a trust signal for regulated industries.
  This reframes the TAM — any team using git is a potential customer.

Positioning: context governance layer that makes AI dramatically more
useful. The AI story is the ceiling. The git story is the floor.

-----

## File naming conventions

General: kebab-case throughout. No underscores. No camelCase.

Platform-required exact names:
  favicon.png · apple-touch-icon.png · og.png

dovetell-prefixed assets:
  dovetell-wordmark.svg · dovetell-wordmark.png

App-demo assets (demo-prefixed, in app-demo/assets/):
  demo-branch-flow.svg

Context files (.dovetell-context/, no prefix):
  brand.md · personas.md · roles.md · decisions.md
  approval-workflow.md · business-rules.md · risks.md · opportunities.md

dovetell-assets repo conventions:
  Zips: [product]-v[version].zip
  Content files: kebab-case, no version suffix on production
  Free samples: free-samples/sample-[descriptor].md
  Internal: _internal/[descriptor].md
  Setup review: setup-review/[descriptor].md

Site pages: folder/index.html pattern, kebab-case folders.
Version suffixes: -v2, -v3 on prompts and drafts only.
Production files never carry version suffixes.

-----

## Working conventions

All accounts under dovetellio@gmail.com
Boeing / employer never referenced publicly
Primary demo: Datagate Systems (Ops Analytics)
Secondary demos: Meridian Health · Volta Energy
No personal/confidential content in public repo
.dovetell-context/ = dovetell running on itself
GitHub over GitLab for developer community visibility
Formspree notifies founder only — no automated user email
Manual reply until 50+ completions

-----

## Git-native actions layer (Phase 2, in design)

Actions live in .dovetell-context/actions.md. Linked to source
context items. dovetell renders them, user checks off, dovetell
writes back and commits. Audit trail is git blame.

Scope constraint: actions must link to a source context item.
No generic task lists. "Linked to a decision" keeps this focused.
Status: in design. Do not build before Phase 2 v1 ships.

-----

## Oversell and promise audit

Live gaps:
  Assessment confirmation copy says "check your inbox" — broken promise
  /why claim "the only workflow built for both" — aspirational, revisit

App-demo requires verbal framing before sharing:
  Never share without saying "this is a vision demo"
  Queue, drift score, MCP response cards — none exist yet

Safe ground — fully decided, consistent, defensible:
  Repo as source of truth · BYOK · four roles · renderer not owner
  Phased sharing · Markdown as medium · portability as feature
  dovetell works without AI · Cowork Dispatch is execution

-----

## Key active decisions

Product
  Prompt library before platform (validate WTP first)
  Assessment as primary GTM surface
  $299 Setup Review as services wedge
  Starter Kit = one file (team-context.md)
  Starter Plus = superset: team-context.md + maintenance-prompts.md
  Pro Kit name reserved for future tier
  Founding member pricing: Starter $29 / Starter Plus $59
  Assessment link shown not promoted in listing — less friction now
  Personal email after every purchase — upsell path to Setup Review
  Project profile as primary onboarding interface
  /why as positioning page (composability, not comparison)
  app-demo/ unlinked — shared directly in peer testing
  Non-technical reviewer UI as first-class product surface
  Context change request model (PR mechanic, plain English)
  Four roles max · no custom roles · no inheritance
  Desktop reviewer: split layout 68/32 (review left, branch right)
  Git-native actions layer — in design, deferred to Phase 2 v1
  Actions must link to source context item — no generic task lists
  dovetell never becomes a task manager — constraint is intentional
  Cowork Dispatch is execution · dovetell is context — complementary
  app-demo screens always require verbal framing before sharing
  GUID pattern: 8-char nanoid or sha256, kebab-prefixed
  Session hash convention: 8-char sha256 slug, embedded in chat title
  decisions.md is flat bullet append log — no headers, no tables
  tasks.md is flat bullet append log — no section headers
  opportunities.md is landscape file — not commitments
  risks.md is risk register — likelihood + impact + mitigation
  business-rules.md is product behavior rules
  Protect the scope — context governance not work management (rule-ff00c134)
  New object types require explicit scope decision before building
  Migration decision→opportunity requires full audit trail both directions

Naming
  lowercase dovetell always
  dovemind = leading name change candidate — deferred (peer validation)

Infrastructure
  Repo as source of truth — dovetell never owns context data
  Dark/light theme split by page type
  Demo banner convention on all app-demo pages
  app.dovetell.io as platform subdomain
  Auth: Option A (GitHub OAuth BYOK) preferred — deferred to Phase 2

Sharing
  Phase 1: ToU in zip, user owns sharing
  Phase 2 v1: shareable link, owner-controlled, off by default
  Phase 2 v2: sequential approval, regulated industry governance

Deferred
  Context Health scoring formula (define before building)
  Shared CSS/JS refactor (Claude Code session, after tracker stable)
  LLC ($500 Gumroad trigger)
  ConvertKit (50+ subscribers)
  Name change (48hr sit + peer validation)
  Viewer flag behavior — soft signal vs. queue item
  Sequential approval (Phase 2 v2)
  Authentication architecture (Option A preferred, before Phase 2 build)
  Onboarding open questions (4 items — empty seed, re-accessible, multi-project, configurable)
  Pro Kit scope — future tier, not current
  Gumroad listing copy optimization (after first 5 purchases)
  Pro Kit repo access — issues, PRs, living prompts (after validation)
  AI Daily Brief infinite backlog episode — find and log as opportunity

-----

## Task tracker and session governance

Sandbox: dovetell-io/dovetell-sandbox
  tasks.md · decisions.md · opportunities.md · risks.md · business-rules.md

Tracker UI: jchromchak/tasks (GitHub Pages)
  tasks/ · decisions/ · opportunities/ · rules/ · risks/
  Five pages. Shared PAT in localStorage. Tab bar nav.
  Bulk import with reconcile / review / skip classification.

tasks.md schema (flat append log — newest at bottom):
  - [ ] Task title
    id:task-[8char-nanoid]
    priority:now|next|later
    tags:#tag1 #tag2
    due:YYYY-MM-DD
    owner:john|claude
    source:claude-[session-hash]
    decision:decision-[8char]
    notes:free text
    completed:YYYY-MM-DDTHH:MM TZ

Session hash convention:
  sha256(session-description)[:8]
  Embedded in chat title: "Title (xxxxxxxx)"
  Used as source field on all Claude-generated artifacts.

At the start of each new session:
  Generate a new session hash
  Rename chat to include hash in parentheses
  Update CONFIG.sessionId in tracker pages

-----

## Claude Code closed loop

When working in Claude Code on dovetell-io/dovetell, files in
.dovetell-context/ are picked up as project context automatically.

When Phase 2 exists, it ingests .dovetell-context/ as its own
context base. The loop closes:

build the thing → use the thing to build the thing →
the thing documents itself
