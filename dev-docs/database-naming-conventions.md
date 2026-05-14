# Database Naming Conventions

Status: active
Created: 2026-05-14
Owner: dovetell-public implementation
Promotion candidate: dovetell-ctx-app-private / shared engineering guidance

## Principle

Database columns should be readable outside their table context.

Exports, joins, BI tools, data science notebooks, logs, and API mapping code
often flatten or blur table boundaries. Generic names like `id`, `name`,
`type`, `status`, `source`, `score`, `created_at`, `start_date`, and
`end_date` create ambiguity and invite false equivalence.

The schema should make ownership clear at a glance.

## Rule

Local table fields use:

```text
[table_name_singular]_[field_name]
```

Foreign keys keep the referenced identifier name:

```text
[foreign_table_singular]_id
```

This means the local table owns its own fields, while foreign keys visibly
belong to another entity.

## Examples

Good:

```sql
leads.lead_id
leads.lead_email
leads.lead_source

assessment_runs.assessment_run_id
assessment_runs.assessment_run_score_display
assessment_runs.assessment_run_public_token
assessment_runs.lead_id

assessment_answers.assessment_answer_id
assessment_answers.assessment_answer_score
assessment_answers.assessment_run_id

recommendation_events.recommendation_event_id
recommendation_events.recommendation_event_url_params

content_download_events.content_download_event_id
content_download_events.content_download_event_href

account_claims.account_claim_id
account_claims.assessment_run_id
```

Avoid:

```sql
id
email
name
type
status
source
score
metadata
created_at
updated_at
start_date
end_date
```

These names are too generic once data leaves the immediate table context.

## Foreign Key Pattern

Use the referenced identifier directly:

```sql
assessment_runs.lead_id
recommendation_events.assessment_run_id
account_claims.user_id
```

Do not rename foreign keys into local aliases unless there are multiple
relationships to the same foreign table and the role must be disambiguated.

If disambiguation is needed, include the relationship role:

```sql
review_queue.proposed_by_user_id
review_queue.approved_by_user_id
```

## Why This Matters

Ambiguous schema names create operational drag:

- data scientists infer that same-named fields mean the same thing
- CSV exports lose table context
- joins become harder to review
- logs and payload mapping become harder to scan
- future agents overgeneralize from misleading names
- product analytics quietly drift from implementation reality

Explicit names are slightly longer, but they reduce ambiguity where it hurts.

## Current Application

The Supabase assessment funnel schema follows this convention:

- [assessment-funnel-schema.sql](../supabase/assessment-funnel-schema.sql)

Any future public-site database table should follow the same rule unless a
durable project decision supersedes it.
