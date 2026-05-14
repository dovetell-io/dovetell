# Supabase Assessment Funnel

Status: draft
Created: 2026-05-14
Owner: dovetell-public implementation, with product boundary from dovetell-private

## Centerline

Keep the public site static for now. Use Supabase/Postgres to persist the
assessment funnel, not to turn the marketing site into a React app.

Deployment steps live in `DEPLOYMENT.md`.

Smallest serious slice:

1. Static homepage and assessment remain usable without an account.
2. Completed assessment runs can be persisted server-side.
3. Recommendations, sample clicks, and download events can be connected to the
   run.
4. A later account can claim the prior run.

Do not build the authenticated dashboard until the saved-history/account
workflow is real enough to need it.

## Data Boundary

This schema stores service and funnel state:

- lead identity and consent state
- assessment run metadata
- question-level answers
- recommendation route events
- sample/content click or download events
- account-claim linkage

It must not store customer-owned governed markdown as canonical truth. Repo
context remains owned by the customer/team repository.

## Naming Convention

Database columns use explicit table prefixes instead of generic names:

- local fields use `[table_name_singular]_field_name`
- foreign keys keep the foreign identifier name
- examples:
  - `leads.lead_id`
  - `leads.lead_email`
  - `assessment_runs.assessment_run_id`
  - `assessment_runs.assessment_run_score_display`
  - `assessment_runs.lead_id`
  - `assessment_answers.assessment_answer_score`
  - `recommendation_events.recommendation_event_url_params`

The table name provides context, but the column name should still remain
readable in joins, exports, logs, and API mapping code.

See [Database naming conventions](../dev-docs/database-naming-conventions.md)
for the repo-level rule.

## Current Public Flow

Today the assessment:

- loads versioned content from `team-assessment/assessment-config.json`
- computes weighted raw score and normalized display score
- generates browser-local `uid`, `pid`, and per-run `aid`
- sends email-gated results through Supabase/Resend, with Formspree available
  only as a temporary fallback
- saves a local run history for `/assessments/`
- passes score/profile/gap params to `/recommendations/`

The database model preserves those identifiers as `legacy_uid`, `legacy_pid`,
and `legacy_aid` so the current static flow can migrate incrementally.

With Supabase persistence enabled, the preferred recommendation URL is compact:

```text
/recommendations/?token=[public-token]
```

The recommendations page hydrates safe display context from
`assessment-runs?token=...`. The longer score/profile/gap URL remains a fallback
when persistence is unavailable.

## Local Continuity Model

Before authentication exists, the public assessment uses three continuity
handles:

- `local_key` - a human-readable browser key stored only in localStorage. It
  labels the local assessment index and is not sent in project URLs.
- `pid` - stable project/thread identifier. A project link such as
  `/assessments/?pid=...` opens one project thread and can be emailed or
  bookmarked.
- `aid` - one completed assessment run within a project.

This gives anonymous local continuity without pretending to be authentication.
If browser storage is cleared, the local index disappears. Individual project
links still open their project thread.

## Recommended Intake Boundary

Prefer a server-side intake endpoint before writing to Postgres:

```text
team-assessment/index.html
  -> assessment intake endpoint
  -> validates payload and revision
  -> upserts lead
  -> inserts assessment_run
  -> inserts assessment_answers
  -> returns public_token / claim link
```

The first implementation target is a Supabase Edge Function at
`supabase/functions/assessment-runs/`. Avoid granting broad anonymous browser
inserts; the function validates the public payload and writes to Postgres with
server-side credentials.

## Next Implementation Slice

The frontend adapter boundary now exists behind
`assets/dovetell-config.js`. Persistence is disabled by default:

```js
window.DOVETELL_CONFIG = {
  persistenceEnabled: false,
  assessmentIntakeUrl: '',
  recommendationEventUrl: '',
  contentEventUrl: '',
};
```

When the Supabase project and Edge Function exist:

1. Apply `assessment-funnel-schema.sql`.
2. Set `project_id` in `supabase/config.toml`.
3. Store `DOVETELL_SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`,
   `DOVETELL_EMAIL_FROM`, and `DOVETELL_PUBLIC_SITE_URL` as function secrets.
   Supabase provides `SUPABASE_URL` to hosted Edge Functions automatically.
4. Deploy `assessment-runs` and `events`.
5. Set `assessmentIntakeUrl`, `recommendationEventUrl`, and
   `contentEventUrl` in `assets/dovetell-config.js`. The recommendation and
   content URLs can both point to `/functions/v1/events`.
6. Flip `persistenceEnabled` only in preprod first.
7. Confirm Formspree and localStorage still work as fallbacks.
8. Add account claim after auth is selected.

The function returns a user-facing `project_url`, a `public_token`, and a later
account-claim `claim_url`. It does not require an authenticated user yet.

## Open Decisions

- Email magic link vs OAuth-first for account claim.
- Whether to use Supabase anonymous users for pre-account assessment runs.
- Retention policy for unclaimed runs and unverified leads.
- Whether Formspree remains parallel during the first persistence rollout.
- Whether the shared event-ingest function needs rate limiting before public
  production traffic.
