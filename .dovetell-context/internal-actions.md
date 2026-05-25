# Internal Actions

Status: active  
Owner repo: dovetell-public  
Visibility: repo-local, public-safe  
Centerline: `cl-2f79b64a`

This file tracks founder/internal follow-up items that should remain visible
without hiding as helper copy inside customer-facing pages.

```yaml
internal_actions:
  - action_id: ia-public-app-demo-retire-20260525
    status: open
    owner: john
    origin: user-direction-20260525
    related_centerline: cl-2f79b64a
    related_item: cli-bd03c7a9
    scope:
      - app-demo/
      - README.md
      - robots.txt
      - _headers
    decision: Keep `app-demo/` hidden and treat it as a retirement candidate.
    dependency:
      - Do not use app-demo sample project screens as canonical product truth.
      - Do not polish app-demo as part of public brand alignment unless a future centerline explicitly revives it.
    next_action: Decide whether to delete, archive, or replace `app-demo/` after the current public-page sweep.

  - action_id: ia-public-internal-note-routing-20260525
    status: active
    owner: john
    origin: user-direction-20260525
    related_centerline: cl-2f79b64a
    related_item: cli-bd03c7a9
    scope:
      - .dovetell-context/internal-actions.md
    decision: Track notes to John as internal actions instead of leaving them as ambiguous customer-facing helper text.
    dependency:
      - Public pages should contain customer-facing copy only.
      - HQ remains canonical, but tech-writer work in HQ should not be disturbed during this sweep.
    next_action: Promote durable internal actions back to HQ when the active tech-writer WIP is clear.
```
