import { createClient } from 'jsr:@supabase/supabase-js@2';

type EventPayload = {
  event_kind?: 'recommendation' | 'content';
  event_type?: string;
  public_token?: string;
  legacy_uid?: string;
  legacy_pid?: string;
  legacy_aid?: string;
  revision_id?: string;
  recommendation_key?: string;
  recommendation_name?: string;
  content_key?: string;
  content_name?: string;
  level_id?: string;
  display_score?: number;
  role?: string;
  team_size?: string;
  ai_tool?: string;
  biggest_gap_id?: string;
  biggest_gap_name?: string;
  href?: string;
  url_params?: Record<string, string>;
  path?: string;
  created_at?: string;
};

const allowedOrigins = new Set([
  'https://dovetell.io',
  'https://www.dovetell.io',
  'https://preprod.dovetell.io',
  'http://127.0.0.1:4180',
  'http://localhost:4180',
  'http://127.0.0.1:4179',
  'http://localhost:4179',
]);

function corsHeaders(request: Request) {
  const origin = request.headers.get('origin') || '';
  return {
    'Access-Control-Allow-Origin': allowedOrigins.has(origin) ? origin : 'https://dovetell.io',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
  };
}

function jsonResponse(request: Request, status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders(request),
      'Content-Type': 'application/json',
    },
  });
}

function cleanText(value: unknown, maxLength = 500) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

function isInteger(value: unknown) {
  return typeof value === 'number' && Number.isInteger(value);
}

function validatePayload(payload: EventPayload) {
  const errors: string[] = [];
  const eventKind = payload.event_kind;

  if (eventKind !== 'recommendation' && eventKind !== 'content') {
    errors.push('event_kind must be recommendation or content');
  }
  if (!cleanText(payload.public_token, 80) && !cleanText(payload.legacy_aid, 80)) {
    errors.push('public_token or legacy_aid is required');
  }
  if (payload.display_score !== undefined && (!isInteger(payload.display_score) || payload.display_score < 0 || payload.display_score > 100)) {
    errors.push('display_score must be an integer from 0 to 100');
  }
  if (eventKind === 'recommendation' && !cleanText(payload.recommendation_key, 120)) {
    errors.push('recommendation_key is required');
  }
  if (eventKind === 'content') {
    if (!cleanText(payload.content_key, 120)) errors.push('content_key is required');
    const eventType = cleanText(payload.event_type, 40) || 'click';
    if (!['view', 'click', 'download'].includes(eventType)) {
      errors.push('content event_type must be view, click, or download');
    }
  }

  return errors;
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders(request) });
  }

  if (request.method !== 'POST') {
    return jsonResponse(request, 405, { ok: false, error: 'method_not_allowed' });
  }

  let payload: EventPayload;
  try {
    payload = await request.json();
  } catch (_error) {
    return jsonResponse(request, 400, { ok: false, error: 'invalid_json' });
  }

  const errors = validatePayload(payload);
  if (errors.length > 0) {
    return jsonResponse(request, 400, { ok: false, error: 'invalid_payload', details: errors });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('DOVETELL_SUPABASE_SERVICE_ROLE_KEY')
    || Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse(request, 500, { ok: false, error: 'missing_supabase_environment' });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  let runId: string | null = null;
  const publicToken = cleanText(payload.public_token, 80);
  const legacyAid = cleanText(payload.legacy_aid, 80);

  if (publicToken || legacyAid) {
    let query = supabase
      .from('assessment_runs')
      .select('assessment_run_id, lead_id, user_id')
      .limit(1);

    query = publicToken
      ? query.eq('assessment_run_public_token', publicToken)
      : query.eq('assessment_run_aid', legacyAid);

    const { data: runs, error: runLookupError } = await query;
    if (runLookupError) {
      return jsonResponse(request, 500, { ok: false, error: 'assessment_run_lookup_failed' });
    }
    runId = runs?.[0]?.assessment_run_id || null;
  }

  if (payload.event_kind === 'recommendation') {
    const { data, error } = await supabase
      .from('recommendation_events')
      .insert({
        assessment_run_id: runId,
        recommendation_event_key: cleanText(payload.recommendation_key, 120),
        recommendation_event_name: cleanText(payload.recommendation_name, 180),
        recommendation_event_level_id: cleanText(payload.level_id, 80),
        recommendation_event_score_display: payload.display_score ?? null,
        recommendation_event_respondent_role: cleanText(payload.role, 120),
        recommendation_event_team_size: cleanText(payload.team_size, 80),
        recommendation_event_ai_tool: cleanText(payload.ai_tool, 120),
        recommendation_event_biggest_gap_id: cleanText(payload.biggest_gap_id, 120),
        recommendation_event_biggest_gap_name: cleanText(payload.biggest_gap_name, 120),
        recommendation_event_url_params: payload.url_params || {},
      })
      .select('recommendation_event_id')
      .single();

    if (error || !data) {
      return jsonResponse(request, 500, { ok: false, error: 'recommendation_event_insert_failed' });
    }

    return jsonResponse(request, 200, { ok: true, event_id: data.recommendation_event_id });
  }

  const { data, error } = await supabase
    .from('content_download_events')
    .insert({
      assessment_run_id: runId,
      content_download_event_key: cleanText(payload.content_key, 120),
      content_download_event_name: cleanText(payload.content_name, 180),
      content_download_event_href: cleanText(payload.href, 500),
      content_download_event_type: cleanText(payload.event_type, 40) || 'click',
    })
    .select('content_download_event_id')
    .single();

  if (error || !data) {
    return jsonResponse(request, 500, { ok: false, error: 'content_event_insert_failed' });
  }

  return jsonResponse(request, 200, { ok: true, event_id: data.content_download_event_id });
});
