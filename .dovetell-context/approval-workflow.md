# dovetell — Approval Workflow Positioning

Last updated: May 2, 2026

How dovetell's context review model works, how it compares to
existing approval patterns, and where it fits in the market.

---

## The core mechanic — context change requests

When a context item is proposed or updated in dovetell, it does not
overwrite existing truth. It enters the queue as a proposed change,
sitting alongside the current vetted version until an Approver acts.

The mechanic is a GitHub pull request. The language is plain English.

| Git / GitHub        | dovetell equivalent                                |
|---------------------|----------------------------------------------------|
| Branch              | Proposed change to a vetted item                   |
| Commit              | The specific edit being proposed                   |
| Pull request        | Change request in the review queue                 |
| Reviewer            | Approver                                           |
| Merge               | Accept — item becomes new truth                    |
| Diff view           | Old version vs. proposed (already in queue mockup) |
| Conflict            | Two proposed changes to the same item              |
| Audit log           | Vet history — who changed what, when               |

The queue UI already shows this mechanic (Sprint 14 mockup, item 2 —
Shift data refresh cadence diff view). It was built before being
named. The name is: context change request.

---

## How existing approval workflows work

### GitHub PR model
Used by: Engineering teams
How it works: Propose on a branch, diff reviewed, merged by
maintainer. Full audit trail. Branch isolation prevents conflicts.
Pros: Developers love it. Complete history. Parallel proposals
possible. Conflict detection built in.
Cons: Intimidating for non-technical users. Ceremony overhead
for small changes. Requires git literacy.
dovetell overlap: Same mechanic. Different audience and language.

### Notion / Confluence comment model
Used by: Knowledge management, wikis
How it works: Suggest inline changes via comment. Owner approves
or dismisses. No formal state machine.
Pros: Low friction. Familiar to non-technical users.
Cons: Suggestions get lost. No diff. No structured state.
No audit trail worth relying on.
dovetell overlap: Viewer-friendly surface, but dovetell adds
explicit state and vet history that Notion lacks.

### Google Docs suggestion mode
Used by: Document collaboration
How it works: Tracked changes per edit. Accept or reject
granularly. All changes visible inline.
Pros: Granular. Non-technical friendly. Familiar.
Cons: No branching. No structured state. Doesn't scale to
team-wide context governance. No machine-readable output.
dovetell overlap: The plain English Viewer UI borrows this
familiarity — but dovetell produces structured markdown, not prose.

### Jira / Linear approval workflow
Used by: Project and issue management
How it works: Item moves through explicit status states
(Draft → In Review → Approved). Assignees, due dates, comments.
Pros: Explicit state machine. Integrates with dev workflow.
Cons: Heavy. Requires configuration. Permission sprawl risk.
Not designed for content governance — designed for task tracking.
dovetell overlap: The queue borrows the explicit state model,
but without the ticket overhead. Four states only: unvetted,
vetted, rejected, deferred.

### DocuSign / legal approval model
Used by: Legal, compliance, regulated industries
How it works: Sequential sign-off. Named approvers per document.
Each must sign in order. Timestamped, legally binding.
Pros: Full audit trail. Named accountability. Regulated industry
compliant.
Cons: Too rigid for fast-moving teams. Not built for iteration.
One document at a time. No diff.
dovetell v2 overlap: Sequential approval is the Phase 2 v2
regulated industry feature. The audit trail is already in
vet history.

### Microsoft Teams / SharePoint permissions
Used by: Enterprise collaboration
How it works: Role-based access control, nested permissions,
group membership, inheritance. Highly configurable.
Pros: Granular. Integrates with Active Directory.
Cons: Permission sprawl. Admin overhead. Users spend more time
managing access than the tool saves. Changes require IT.
Friction at every edge case.
dovetell difference: Four roles, no custom roles, no inheritance.
If someone needs a capability, promote them. Simple is the feature.

---

## dovetell's position

dovetell sits between GitHub PR and Google Docs suggestion mode.

- The structure and audit trail of GitHub PR
- The plain English accessibility of Google Docs suggestions
- The explicit state machine of Jira without the ticket overhead
- The accountability of DocuSign without the rigidity
- The simplicity of four fixed roles with no permission sprawl

The non-technical Viewer UI is the key differentiator. Every other
approval workflow in this list is built for the person doing the work.
dovetell is also built for the person who needs to understand and
sign off on what was decided — without touching a code review
interface or opening a markdown file.

---

## Sharing — phased approach

### Phase 1 — now (prompts and frameworks)
User owns their data. User owns their sharing. dovetell liability
ends at the zip file. Terms of use included in every purchase.
No platform sharing features needed.

### Phase 2 v1 — platform launch
Shareable read-only link for single context items.
- Owner-controlled toggle, off by default
- Single item renders in plain English with metadata
- No dovetell account required to view
- Configurable expiry (7 days / 30 days / never)
- Use case: Jane shares a policy definition with legal for sign-off

Rendered share card example:

  Data Retention Policy
  ─────────────────────────────────────────
  All customer data is retained for 180 days
  from last active event, then purged automatically.

  Source       policies.md
  Status       Vetted
  Accepted by  Maya Rowe · Engineering Lead
  Date         Apr 28, 2026
  Project      Datagate Systems — Ops Analytics

  Shared via dovetell · View expires May 28, 2026

### Phase 2 v2 — regulated industry governance
- Sequential approval (named approvers must sign in order)
- Full named audit trail (legally defensible)
- Governance level toggle per project (Standard / Regulated)
- Unlocks healthcare, finance, defense buyers

---

## The non-technical reviewer UI

The Viewer and external share recipient see a different surface
than the Approver. No queue. No diff view. No markdown.

Key principles:
- Plain English only — no raw markdown ever shown
- One item at a time — not a dashboard
- Single action: "Looks right" or "Something's off"
  (maps to Confirm or Flag for Approver attention)
- Context shown: what it says, who approved it, when, why it matters
- Mobile-first — legal and ops people review on their phone

This is the surface that makes dovetell valuable to the 80% of a
team that will never open a terminal.

---

## Artifacts to build

- Comparative analysis illustration (approval workflow market map)
- /how-it-works or /review page — the dovetell difference in copy
- Non-technical reviewer UI mockup (app-demo/review.html)
- Shareable card render mockup
- Architecture illustration showing the change request flow

---

## Open questions

- What is the exact language for the non-technical action?
  Options: Approve / Flag · Confirm / Question · Looks good / Not quite
- Can a Viewer flag something without creating a full queue item?
  Or does a flag always surface to the Approver queue?
- Sequential approval: does Approver 1 see Approver 2's decision,
  or are they blind to each other until both have signed?
- Conflict resolution: if two Contributors propose changes to the
  same item simultaneously, who sees the conflict and how?
