# Supabase Deployment Runbook

Status: draft
Created: 2026-05-14
Scope: public assessment persistence and funnel events

## Goal

Enable Supabase persistence for the low-risk public assessment funnel without
changing the static-site architecture or committing secrets.

This rollout should happen on preprod first.

## What Exists In This Repo

- `assessment-funnel-schema.sql` - Postgres schema and RLS policies.
- `functions/assessment-runs/` - Edge Function for completed assessment runs.
- `functions/events/` - Edge Function for recommendation and content events.
- `fixtures/` - local JSON payloads for direct function testing.
- `assets/dovetell-config.js` - disabled-by-default frontend endpoint config.

The SQL schema intentionally uses explicit table-prefixed column names such as
`lead_id`, `lead_email`, `assessment_run_id`, and
`assessment_run_score_display` instead of generic `id`, `email`, or `score`
columns. Foreign keys keep the foreign identifier name, such as `lead_id`.

## What You Need From Supabase

- Supabase project ref.
- Supabase project URL.
- Supabase secret key stored as an Edge Function secret.
- Function URLs after deploy:
  - `https://[project-ref].supabase.co/functions/v1/assessment-runs`
  - `https://[project-ref].supabase.co/functions/v1/events`

Do not commit the service role key or any secret value.

## Setup Steps

1. Create the Supabase project.
2. Apply the schema:

```sh
supabase db push
```

or paste `assessment-funnel-schema.sql` into the SQL editor for the first manual
preprod pass.

3. Set `project_id` in `supabase/config.toml`.
4. Set function secrets:

```sh
supabase secrets set DOVETELL_SUPABASE_SERVICE_ROLE_KEY="[secret-key]"
supabase secrets set RESEND_API_KEY="[resend-api-key]"
supabase secrets set DOVETELL_EMAIL_FROM="dovetell <hello@dovetell.io>"
supabase secrets set DOVETELL_EMAIL_BCC="hello@dovetell.io"
supabase secrets set DOVETELL_PUBLIC_SITE_URL="[public-site-url]"
```

Supabase provides `SUPABASE_URL` to hosted Edge Functions automatically. The
custom secret name avoids the reserved `SUPABASE_` prefix.

`RESEND_API_KEY` enables server-side assessment email delivery from the
`assessment-runs` function. `DOVETELL_EMAIL_FROM` must use a sender/domain
accepted by Resend. `DOVETELL_EMAIL_BCC` controls the internal submission copy
and defaults to `hello@dovetell.io` if unset. `DOVETELL_PUBLIC_SITE_URL`
controls the project link host in emails and function responses. Use the
preprod host for preprod testing and `https://dovetell.io` for production.

5. Deploy functions:

```sh
supabase functions deploy assessment-runs
supabase functions deploy events
```

When using the Supabase dashboard editor, create/select the function slug
(`assessment-runs` or `events`) and paste the matching local `index.ts` into
the dashboard file named `index.ts`. The folder name is the function slug; the
editor will not show `assessment-runs/index.ts`.

Keep JWT verification off for both public funnel functions. The functions do
their own payload validation and use the server-side service key secret.

6. Test `assessment-runs` with the fixture:

```sh
curl -i \
  -X POST "https://[project-ref].supabase.co/functions/v1/assessment-runs" \
  -H "Content-Type: application/json" \
  --data @supabase/fixtures/assessment-run.sample.json
```

Save the returned `public_token`.

Also test the public-token read path used by compact recommendation URLs:

```sh
curl -i \
  "https://[project-ref].supabase.co/functions/v1/assessment-runs?token=[public-token]"
```

7. Replace `replace-with-returned-public-token` in the event fixtures locally
for manual testing. Then test:

```sh
curl -i \
  -X POST "https://[project-ref].supabase.co/functions/v1/events" \
  -H "Content-Type: application/json" \
  --data @supabase/fixtures/recommendation-event.sample.json
```

```sh
curl -i \
  -X POST "https://[project-ref].supabase.co/functions/v1/events" \
  -H "Content-Type: application/json" \
  --data @supabase/fixtures/content-event.sample.json
```

For localhost browser tests, confirm CORS returns the localhost origin:

```sh
curl -i \
  -X OPTIONS "https://[project-ref].supabase.co/functions/v1/events" \
  -H "Origin: http://localhost:4180" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: content-type"
```

8. Verify rows exist:

- `leads`
- `assessment_runs`
- `assessment_answers`
- `recommendation_events`
- `content_download_events`

## Preprod Config Flip

Only after direct function tests pass, set preprod config:

```js
window.DOVETELL_CONFIG = {
  persistenceEnabled: true,
  assessmentIntakeUrl: 'https://[project-ref].supabase.co/functions/v1/assessment-runs',
  recommendationEventUrl: 'https://[project-ref].supabase.co/functions/v1/events',
  contentEventUrl: 'https://[project-ref].supabase.co/functions/v1/events',
};
```

Keep production disabled until preprod completes an end-to-end assessment run.

## Preprod Acceptance

1. Complete an assessment.
2. Submit email gate.
3. Confirm results still render even if persistence fails.
4. Confirm Resend reports the assessment email as sent.
5. Confirm localStorage still stores the run.
6. Confirm Supabase rows were written.
7. Open recommendations.
8. Confirm recommendation event row was written.
9. Click the free sample CTA.
10. Confirm content event row was written.

## Rollback

Set:

```js
persistenceEnabled: false
```

The assessment flow should continue through localStorage. Email delivery is
disabled while persistence is off unless another server-side sender is enabled.

## Do Not Do Yet

- Do not add the service role key to the repo.
- Do not enable persistence on production before preprod verification.
- Do not reintroduce browser-side form posting for assessment results.
- Do not build the authenticated dashboard until account claim is designed.
