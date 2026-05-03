# dovetell — Product Seed

Last updated: May 2, 2026 (end of session)

Use this file to give an AI assistant full context on dovetell before
starting a work session. Paste the full contents as your first message.
Product context only — no personal or confidential information.

Companion files (paste alongside for specific work):
  brand.md             colors, typography, assets, voice, demo banner spec
  personas.md          fictional demo characters, canonical context data
  roles.md             product role model, permission matrix
  approval-workflow.md workflow positioning, competitive analysis

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

-----

## Product phases

Phase 1 — now
  Team AI Maturity Assessment (live, dovetell.io/team-assessment)
  Prompt library (Gumroad, in progress)
  Free checklist · $49 Starter Kit · $99 Pro Kit · $299 Setup Review
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

Phase 2 v2 — regulated industries
  Sequential approval workflows, named approvers, full audit trail
  Governance toggle per project (Standard / Regulated)
  Unlocks healthcare / finance / defense

Phase 3 — future
  Queryable decision traces at scale. Context graph.
  dovetell as MCP server in every AI-assisted workflow.

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

The mechanic is a GitHub pull request.
The language is plain English.

| Git concept  | dovetell equivalent                          |
|--------------|----------------------------------------------|
| Branch       | Proposed change to a vetted item             |
| Pull request | Change request in the review queue           |
| Reviewer     | Approver                                     |
| Merge        | Accept — item becomes new truth              |
| Diff view    | Old vs. proposed (in queue UI, item 2)       |
| Audit log    | Vet history — who changed what, when         |

Canonical attribution on accepted items: "accepted by Maya Rowe · 3d ago"
Canonical "Currently" line on proposed changes: "✓ Vetted · Maya Rowe · 14d ago"

-----

## Non-technical reviewer UI

Viewers and share recipients see a separate light-theme surface.
Demo at dovetell.io/app-demo/review.html (Sam Okafor's perspective).

Key principles:
  Plain English only — no markdown ever shown
  One item at a time — not a dashboard
  Two actions: "Looks right" or "Something's off"
  Flag panel opens inline with text input, routes to Approver
  "Currently: ✓ Vetted · Maya Rowe · 14d ago" shown on proposed changes
  Progress bar + step pills across the top
  Done state shows confirmed / flagged / skipped summary

Desktop layout (split):
  Left 68% — review card + action buttons (the focus)
  Right 32% — branch illustration panel (cream #F5F4EF, supporting)
  Branch diagram is static — it explains the flow regardless of
  which item is being reviewed. It answers "what is happening here?"

Mobile layout: single column, branch panel below card.

Implemented files:
  app-demo/review.html (rebuilt May 2, 2026 — desktop + mobile)
  assets/branch-illustration.svg (inline in review.html and standalone)
  assets/branch-illustration.png (2x PNG)

AI-generated mockups produced (May 2, 2026):
  Desktop Screen 1: simple new policy item with flag panel open
  Desktop Screen 2: proposed change with red/green diff view
  Mobile Screen 1 + 2: both states in iPhone frame composite

-----

## Sharing — phased approach

Phase 1 (now): User owns data. dovetell liability ends at zip.
Terms of use in every Gumroad purchase.

Phase 2 v1: Shareable read-only link for single context items.
Owner-controlled, off by default. No account to view. Renders in
plain English with metadata. Configurable expiry.

Share card format:
  [Item title]
  [Plain English description]
  Source       [filename]
  Status       ✓ Vetted
  Accepted by  Maya Rowe · Engineering Lead
  Date         [date]
  Project      Datagate Systems — Ops Analytics
  Shared via dovetell · View expires [date]

Phase 2 v2: Sequential approval, audit trail, governance toggle.

-----

## Competitive positioning

Approval workflow 2x2 matrix (image generated May 2026):
  X-axis: Technical → Accessible
  Y-axis: Informal → Structured
  dovetell: top-right (accessible + structured) — alone
  GitHub PR: top-left (structured, developer-only)
  Notion/Slack: bottom-right (accessible, no audit trail)
  The gap: every tool is either too technical or too informal

Market size (image generated May 2026):
  TAM: $15–30B (AI governance, knowledge work, team intelligence)
  SAM: $2–5B (AI-assisted software teams using Cursor, Claude Code)
  SOM: $50–200M (teams seeking context governance, reachable 3 years)
  Revenue multiples: $1M ARR → $8–15M · $5M → $40–75M · $20M → $160–300M
  SaaS developer tools trading 8–15x ARR, 2026

Key pitch statement: "The maturity assessment and prompt library are
not the product. They are the distribution channel to the platform."

-----

## Platform UI — key screens

All demo content uses Datagate Systems personas. See personas.md.

Project Profile (onboarding)
  4-step: team profile → repo connect → seed context → initialize
  Writes to .dovetell-context/. UI is a translator, not an editor.

Context Console (single project)
  Context Health 0–100 (Current / Drifting / Stale — formula TBD)
  Four quadrant cards: Decisions · Assumptions · Definitions · Policies
  Activity feed. Review Queue CTA.

Multi-project view (app-demo/projects.html)
  Table: health · status · queue count · last activity
  Summary bar: projects / queue / stale / vetted / avg health

Cross-project activity feed (app-demo/feed.html)
  Timeline across all projects. Filter bar.
  AUTO avatar for dovetell-generated events.
  Right sidebar: week stats + review queue.

Non-technical reviewer UI (app-demo/review.html)
  Light theme. Split desktop layout (68/32).
  Two states: simple new item + proposed change with diff.
  Flag panel open by default on state 1.
  "Currently: ✓ Vetted" line on proposed changes.
  Interactive — click through to done state.

Architecture Blueprint v0.1
  Service blueprint (6 stages × 5 rows).
  Connect → Import → Extract → Review ★ → Query ★ → Monitor.

Context Health score: formula TBD. 72/100 is placeholder.

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

Secondary: Meridian Health (91/100 Current) · Volta Energy (38/100 Stale)
Marco R. (MR, red-orange gradient) = Volta contributor

Never use Boeing-adjacent terminology in public demo content.
See personas.md for canonical Datagate seed context base.

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
dovetell.io/team-assessment        takes the assessment (light)
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

uid   browser identity · once · localStorage
pid   project ID · once · travels in URL
aid   assessment run · fresh per submission
vid   question set version · hardcoded v01
Hierarchy: email → uid → pid → aid

-----

## Tech stack

Hosting     GitHub Pages    dovetell-io/dovetell
Domain      Porkbun         dovetell.io
Forms       Formspree       Assessment xrejbpbv · Waitlist xaqvneqn
Analytics   Plausible       Privacy-first
Products    Gumroad         ~10% + $0.50/sale
Database    Postgres        Identity + state only. No content stored.
Design      Figma           Logo vectorization pending

Future: Supabase + Resend + Railway
Platform subdomain: app.dovetell.io (confirm .io vs .dev)

-----

## AI independence — dovetell works without AI

dovetell is designed for AI-assisted teams but is not dependent on AI.
This is a deliberate architectural and positioning decision.

Three modes of use:

Mode 1 — Agentic / AI-native (north star)
  Developer uses @dovetell in Cursor or Claude Code.
  Context assembled at query time via MCP server.
  Returns vetted answer with source and decision trace.
  This is the demo, the vision, and Phase 3.

Mode 2 — AI-assisted / workflow
  Team uses Claude, ChatGPT, or any LLM but not in an agentic
  coding flow. They paste context from .dovetell-context/ into
  chat sessions. dovetell structures what they paste and keeps it
  current. The prompt library is the primary product for this tier.

Mode 3 — Git-native / AI-optional
  Team uses git but minimal or no AI tooling. dovetell still works.
  The review workflow, vet history, decision trace, and shared context
  base all run on markdown files in a repo. No AI required.
  The diff view is just a diff. The queue is a review workflow.
  This is documentation engagement through git — a real use case
  for regulated industries that cannot yet adopt AI tooling.

Why this matters:
  "Hardened from AI" is a trust signal for regulated industry buyers.
  They are not being asked to trust an AI with their context.
  They are being asked to use a structured markdown workflow with
  a clean UI. AI is optional acceleration, not a dependency.
  This reframes the TAM — any team using git is a potential customer,
  not just teams using Cursor or Claude Code.

Positioning implication:
  Do not position dovetell as an AI tool. Position it as a context
  governance layer that happens to make AI dramatically more useful.
  The AI story is the ceiling. The git story is the floor.
  The floor is much larger than the ceiling currently appears.

-----

## File naming conventions

Applied to all dovetell files going forward. Consistent across
repo, assets, context files, and generated outputs.

General rule: kebab-case throughout. No underscores. No camelCase.

Platform-required exact names (do not prefix or modify):
  favicon.png              browser tab, exact name required
  apple-touch-icon.png     iOS home screen, exact name required
  og.png                   OG default, exact name required
                           (meta tag can point to any path, but
                           og.png is the conventional default)

dovetell-prefixed assets (namespaced, kebab-case):
  dovetell-wordmark.svg    the dual-tone SVG wordmark
  dovetell-wordmark.png    PNG for non-SVG contexts
  dovetell-og-[variant].png  if multiple OG images needed later
                             e.g. dovetell-og-assessment.png

App-demo specific assets (stored in app-demo/assets/, demo-prefixed):
  demo-branch-flow.svg     the context change request illustration
  demo-[descriptor].ext    any future demo-specific graphics

Context and documentation files (.dovetell-context/, no prefix):
  brand.md · personas.md · roles.md · decisions.md
  approval-workflow.md
  dovetell-seed.md         exception — prefixed because this file
                           travels outside the repo

Prompt and reference documents (descriptive kebab-case):
  competitive-positioning-prompt.md
  market-size-pitch-prompt.md
  desktop-reviewer-prompt-v2.md

Site pages (folder/index.html pattern, kebab-case folders):
  why/index.html · team-assessment/index.html
  app-demo/projects.html · app-demo/feed.html · app-demo/review.html

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
Personal context: jchromchak/dovetell/personal/ (private)
GitHub over GitLab for developer community visibility
Formspree notifies founder only — no automated user email
Manual reply until 50+ completions

-----

## Git-native actions layer (Phase 2 feature, in design)

The natural extension of the context change request model.
When a decision is accepted, it may generate a linked action.
Actions live in .dovetell-context/actions.md. dovetell renders
them in the Viewer UI, you check them off, dovetell writes the
checkbox state back to the file and commits. The task list lives
in the repo like everything else.

Markdown schema:

  ## Actions

  - [ ] Update data pipeline retention config
    source: decisions.md#data-retention-180-days
    owner: @alex-kim
    due: 2026-05-16
    status: open

  - [x] Notify team of new access policy
    source: policies.md#data-access-read-only
    owner: @jane-park
    completed: 2026-05-03

How it works:
  dovetell reads actions.md on page load
  Viewer checks off a task → dovetell writes - [x] back → commits
  Audit trail is git blame on a markdown file — free, automatic
  Actions link to their source context item — traceability is structural

Scope constraint (critical):
  Actions must be linked to a source context item (decisions.md,
  policies.md, etc.). Generic task lists are out of scope.
  "Linked to a decision" is what keeps this focused and prevents
  dovetell from becoming another Jira.

Permission model (open question):
  Can a Viewer check off a task, or only Owner/Contributor?
  Needs decision before building.

Conflict resolution (open question):
  Two people checking off tasks simultaneously = git conflict.
  Strategy needed: queue/lock pattern or optimistic merge
  with last-write-wins on checkbox state.

Why this matters for positioning:
  dovetell currently captures what was decided.
  This extends it to capture what was done about it.
  Decision → action → completion → audit trail.
  For regulated industries that is a compliance requirement,
  not a nice-to-have.

Status: in design. Do not build before Phase 2 v1 ships.

Logo assets (file naming):
  dovetell-mark-blurple-transparent.png  blurple dove, no bg (nav on light)
  dovetell-mark-white-transparent.png    white dove, no bg (nav on dark)
  dovetell-mark-blurple-square.png       white dove on blurple (favicon)
  dovetell-mark-dark-square.png          white dove on near-black (dark mode)
  dovetell-mark-light-square.png         blurple dove on white (light surfaces)

-----

## Oversell and promise audit

Known gaps between what is said and what is built.
Review before every peer testing conversation.

Live on site right now:
  Assessment confirmation copy says "check your inbox" — broken promise
  Homepage score ranges still on 36-point scale — credibility issue
  /why claim "the only workflow built for both" — aspirational, acceptable
  for a positioning page, revisit when platform ships

App-demo — requires verbal framing before sharing:
  Demo banner is 24px, easy to miss on mobile
  Never share app-demo URLs without saying "this is a vision demo"
  Queue, drift score, MCP response cards, multi-project console —
  none of it exists yet. The demo shows where it's going, not where it is.

Decisions deferred that could be asked about in peer testing:
  Context Health formula — if asked "how is 72/100 calculated"
  there is no answer yet. Placeholder only.
  "Something's off" mechanic — soft signal vs queue item, unresolved
  Sequential approval (regulated industries) — mentioned in pitch,
  no spec exists beyond the name

Safe ground — fully decided, consistent, defensible:
  Repo as source of truth · BYOK · four roles · renderer not owner
  Phased sharing (Phase 1 ToU / Phase 2 v1 link / Phase 2 v2 regulated)
  Markdown as medium · portability as feature
  dovetell works without AI (git-native floor)
  Cowork Dispatch is execution · dovetell is context

-----

## Key active decisions

Product
  Prompt library before platform (validate WTP first)
  Assessment as primary GTM surface
  $299 Setup Review as services wedge
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
  actions.md conflict resolution: Option A (optimistic merge)
  Cowork Dispatch is execution · dovetell is context — complementary
  Cowork Dispatch + dovetell MCP = Phase 3 integration (not built)
  tasks.html PAT: fine-grained, scoped to one public repo, personal machine only
  app-demo screens always require verbal framing before sharing
  /why positioning claim is aspirational — acceptable pre-platform
  GUID pattern: 8-char nanoid, kebab-prefixed (task-a1b2c3d4, decision-d9e4f1b7)
  Session hash convention: 8-char sha256 slug, embedded in chat title
  tasks.md is flat append log — UI handles grouping, not markdown structure
  tasks.html v1.0 shipped: hide/show completed, expand details, add task form,
    tag picker, decision ref, session source, GUID generation, filter by priority/owner

Naming
  lowercase dovetell always
  dovemind = leading name change candidate — deferred

Infrastructure
  Repo as source of truth — dovetell never owns context data
  Dark/light theme split by page type
  Demo banner convention on all app-demo pages
  app.dovetell.io as platform subdomain (confirm .io vs .dev)
  assets/ folder for standalone SVG/PNG files
  app-demo/assets/ for demo-specific assets
  Full logo asset set generated May 2, 2026 — five variants

Sharing
  Phase 1: ToU in zip, user owns sharing
  Phase 2 v1: shareable link, owner-controlled, off by default
  Phase 2 v2: sequential approval, regulated industry governance

Deferred
  Context Health scoring formula (define before building)
  dovetell-data.json wired to HTML (Claude Code session)
  Shared CSS refactor (Claude Code session)
  LLC ($500 Gumroad trigger)
  ConvertKit (50+ subscribers)
  Name change (48hr sit + peer validation)
  Non-technical action language — confirm: "Looks right / Something's off"
  Viewer flag behavior — soft signal vs. queue item
  Sequential approval (Phase 2 v2)
  Guest/public share links (Phase 2 v1)
  Desktop reviewer HTML build (split layout with inline branch SVG)
  Actions layer permission model — can Viewer check off tasks?
  Actions layer conflict resolution — concurrent checkbox writes

-----

## Task tracker and session governance

Task queue: dovetell-io/sandbox/tasks.md
Task UI: jchromchak/tasks/tasks.html (GitHub Pages, localStorage token)

tasks.md schema (flat append log — newest at bottom):
  - [ ] Task title
    id:task-[8char-nanoid]
    priority:now|next|later
    tags:#tag1 #tag2
    due:YYYY-MM-DD
    owner:john|claude
    source:claude-[session-hash]
    decision:decision-[8char-nanoid]
    notes:free text
    completed:YYYY-MM-DDTHH:MM TZ

GUID convention:
  task-[8char]       task IDs — generated by tasks.html on add
  decision-[8char]   decision IDs — to be added to decisions.md
  All IDs: lowercase nanoid, kebab-prefixed, 8 chars

Session hash convention:
  Each Claude session gets an 8-char sha256-derived hash.
  Format: sha256(session-description)[:8]
  Embedded in chat title: "Title of chat (2a2d3774)"
  Used as source on Claude-generated tasks: source:claude-2a2d3774
  Allows tracing any task or decision back to the originating conversation.

This session: 2a2d3774
  Chat title should end with (2a2d3774)
  All Claude tasks from today carry source:claude-2a2d3774

At the start of each new session:
  Generate a new session hash and add to seed under "Current session"
  Rename the chat to include the hash in parentheses
  Pre-fill session hash in CONFIG.sessionId in tasks.html

-----

## Peer testing — Monday

Three people. One question each.

UX Lead — cold reaction to app-demo/review.html
  "Pretend you're an ops lead who just got a link to review two
  context updates. Walk me through what you'd do and where you'd
  hesitate." Don't explain it first.

Former PdM Mentor — positioning and business model
  "If you were a PM at a 10-person SaaS team using Cursor daily,
  would you pay $49 for the starter kit? What would make you pay $299?"

Small Business Owner / PE — the big picture
  "Where does this become a real business and where does it stay a
  tool? What's the unlock?"

Rule for all three: send the link before you explain anything.
The cold reaction is the data. Take notes during, not after.

-----

## Claude Code closed loop

When working in Claude Code on dovetell-io/dovetell, files in
.dovetell-context/ are picked up as project context automatically.

When Phase 2 exists, it ingests .dovetell-context/ as its own
context base. The loop closes:

build the thing → use the thing to build the thing →
the thing documents itself
