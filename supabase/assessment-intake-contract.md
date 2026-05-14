# Assessment Intake Contract

Status: draft
Created: 2026-05-14
Applies to: `team-assessment/index.html`, `/recommendations/`, Supabase intake endpoint

## Endpoint

Draft path:

```text
POST https://[project-ref].supabase.co/functions/v1/assessment-runs
```

The browser should not write directly to the assessment tables. Public
assessment writes go through the Supabase Edge Function so validation and
server-side database credentials stay out of the public site.

## Request

```json
{
  "lead": {
    "email": "person@example.com",
    "marketing_consent": false,
    "source": "assessment-gate"
  },
  "run": {
    "legacy_uid": "browser-user-id",
    "legacy_pid": "project-id",
    "legacy_aid": "assessment-run-id",
    "revision_id": "assessment-v01-rev-20260512a",
    "version_id": "v01",
    "raw_score": 96,
    "raw_max_score": 144,
    "display_score": 67,
    "display_max_score": 100,
    "level_id": "coordinated",
    "level_name": "Coordinated",
    "biggest_gap_id": "team-handoffs",
    "biggest_gap_name": "Team Handoffs",
    "project_name": "Ops Analytics Team",
    "role": "Engineering Lead",
    "team_size": "6-15",
    "company": "",
    "industry": "Software / SaaS",
    "ai_tool": "Multiple",
    "discovery_source": "LinkedIn",
    "email_gate_trigger": "gate"
  },
  "answers": [
    {
      "section_id": "shared-context",
      "section_name": "Shared Context",
      "question_id": "shared-context-q01",
      "answer_score": 2,
      "question_weight": 2
    }
  ],
  "client": {
    "path": "/team-assessment/",
    "user_agent": "optional",
    "submitted_at": "2026-05-14T13:35:00Z"
  }
}
```

## Response

```json
{
  "ok": true,
  "run_id": "00000000-0000-0000-0000-000000000000",
  "lead_id": "00000000-0000-0000-0000-000000000000",
  "public_token": "hex-token",
  "project_url": "https://dovetell.io/assessments/?pid=project-id",
  "claim_url": "https://dovetell.io/assessments/?token=hex-token",
  "email_delivered": true,
  "email_status": "sent"
}
```

`project_url` is the user-facing project thread link. `claim_url` is reserved
for later account/app claim behavior.

`email_status` may be `sent`, `failed`, or `skipped_missing_resend_key`.
Persistence must not fail only because email delivery fails.

## Public Read Context

The same Edge Function also supports a safe public-token read for the
recommendations page:

```text
GET https://[project-ref].supabase.co/functions/v1/assessment-runs?token=[public-token]
```

The response intentionally returns display and routing context only. It must not
return lead email, answer details, or other private intake fields.

```json
{
  "ok": true,
  "run": {
    "token": "hex-token",
    "uid": "browser-user-id",
    "pid": "project-id",
    "aid": "assessment-run-id",
    "rev": "assessment-v01-rev-20260512a",
    "score": 67,
    "max": 100,
    "level": "Coordinated",
    "level_id": "coordinated",
    "gap": "Team Handoffs",
    "gap_id": "team-handoffs",
    "role": "Engineering Lead",
    "team_size": "6-15",
    "ai_tool": "Multiple"
  }
}
```

When this succeeds, the assessment should link to:

```text
/recommendations/?token=[public-token]
```

The longer URL with score, level, gap, and legacy IDs remains a fallback for
failed persistence or local testing before the Edge Function is redeployed.

## Validation Rules

- `revision_id` must match a known assessment config revision.
- `version_id` must match the config version.
- `raw_score` must be between `0` and `raw_max_score`.
- `display_score` must be between `0` and `100`.
- `answers[].question_id` must exist in the supplied revision.
- `answers[].answer_score` must either be null or one of the config answer
  scale values.
- `answers[].question_weight` must match the config question weight.
- `email` is required only for email-gated persistence. Anonymous run storage
  is a separate decision.
- Sensitive project names should be discouraged in UI copy before submission.

## Failure Behavior

Assessment completion must not depend on persistence.

If the endpoint fails:

1. keep showing the result locally
2. keep saving the localStorage fallback
3. log a non-blocking console warning
4. do not show a fake persisted/claimable link

## Follow-On Events

Draft path:

```text
POST https://[project-ref].supabase.co/functions/v1/events
```

Recommendation and content events should use the returned `run_id` or
`public_token` when available.

Draft event payload:

```json
{
  "event_kind": "content",
  "public_token": "hex-token",
  "event_type": "download",
  "content_key": "minimal-repo-context-starter",
  "content_name": "Minimal Repo Context Starter",
  "href": "https://docs.dovetell.io/templates/free-samples"
}
```
