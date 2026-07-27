begin;

create table public.classroom_sessions (
  id uuid primary key,
  code text not null,
  teacher_token_hash text not null,
  day smallint not null,
  current_stage smallint not null default 0,
  status text not null default 'open',
  created_at bigint not null,
  updated_at bigint not null,
  constraint classroom_sessions_code_key unique (code),
  constraint classroom_sessions_code_format
    check (code ~ '^[A-HJ-NP-Z2-9]{6}$'),
  constraint classroom_sessions_teacher_token_hash_format
    check (teacher_token_hash ~ '^[0-9a-f]{64}$'),
  constraint classroom_sessions_day_range
    check (day between 1 and 6),
  constraint classroom_sessions_current_stage_nonnegative
    check (current_stage >= 0),
  constraint classroom_sessions_status_values
    check (status in ('open', 'paused', 'closed')),
  constraint classroom_sessions_timestamps_valid
    check (created_at > 0 and updated_at >= created_at)
);

create table public.classroom_participants (
  id uuid primary key,
  session_id uuid not null
    references public.classroom_sessions (id) on delete cascade,
  display_name text not null,
  participant_token_hash text not null,
  help_status text not null default 'green',
  current_stage smallint not null default 0,
  joined_at bigint not null,
  updated_at bigint not null,
  constraint classroom_participants_session_name_key
    unique (session_id, display_name),
  constraint classroom_participants_session_token_key
    unique (session_id, participant_token_hash),
  constraint classroom_participants_display_name_length
    check (char_length(display_name) between 2 and 20),
  constraint classroom_participants_display_name_trimmed
    check (display_name = btrim(display_name)),
  constraint classroom_participants_display_name_no_controls
    check (display_name !~ '[[:cntrl:]]'),
  constraint classroom_participants_token_hash_format
    check (participant_token_hash ~ '^[0-9a-f]{64}$'),
  constraint classroom_participants_help_status_values
    check (help_status in ('green', 'yellow', 'red')),
  constraint classroom_participants_current_stage_nonnegative
    check (current_stage >= 0),
  constraint classroom_participants_timestamps_valid
    check (joined_at > 0 and updated_at >= joined_at)
);

create table public.stage_progress (
  participant_id uuid not null
    references public.classroom_participants (id) on delete cascade,
  stage_id text not null,
  completed boolean not null default false,
  completed_at bigint,
  updated_at bigint not null,
  primary key (participant_id, stage_id),
  constraint stage_progress_stage_id_format
    check (
      char_length(stage_id) between 1 and 128
      and stage_id ~ '^[a-z0-9][a-z0-9-]*$'
    ),
  constraint stage_progress_completion_timestamp
    check (
      (completed and completed_at is not null)
      or (not completed and completed_at is null)
    ),
  constraint stage_progress_timestamps_valid
    check (
      updated_at > 0
      and (completed_at is null or completed_at > 0)
    )
);

create table public.activity_progress (
  participant_id uuid not null
    references public.classroom_participants (id) on delete cascade,
  activity_id text not null,
  stage_id text not null,
  value_json jsonb not null default '{}'::jsonb,
  completed boolean not null default false,
  updated_at bigint not null,
  primary key (participant_id, activity_id),
  constraint activity_progress_activity_id_format
    check (
      char_length(activity_id) between 1 and 128
      and activity_id ~ '^[a-z0-9][a-z0-9-]*$'
    ),
  constraint activity_progress_stage_id_format
    check (
      char_length(stage_id) between 1 and 128
      and stage_id ~ '^[a-z0-9][a-z0-9-]*$'
    ),
  constraint activity_progress_timestamp_valid
    check (updated_at > 0)
);

create index classroom_sessions_created_at_idx
  on public.classroom_sessions (created_at);
create index classroom_sessions_updated_at_idx
  on public.classroom_sessions (updated_at);
create index classroom_participants_session_joined_idx
  on public.classroom_participants (session_id, joined_at);
create index stage_progress_completed_stage_idx
  on public.stage_progress (stage_id)
  where completed;
create index activity_progress_participant_stage_idx
  on public.activity_progress (participant_id, stage_id);

alter table public.classroom_sessions enable row level security;
alter table public.classroom_participants enable row level security;
alter table public.stage_progress enable row level security;
alter table public.activity_progress enable row level security;

revoke all on table
  public.classroom_sessions,
  public.classroom_participants,
  public.stage_progress,
  public.activity_progress
from public, anon, authenticated;

grant select, insert, update, delete on table
  public.classroom_sessions,
  public.classroom_participants,
  public.stage_progress,
  public.activity_progress
to service_role;

comment on table public.classroom_sessions is
  'Short-lived classrooms; raw instructor tokens are never stored.';
comment on table public.classroom_participants is
  'Anonymous classroom labels and hashed resume tokens; no personal account is required.';
comment on table public.stage_progress is
  'Per-participant stage completion state.';
comment on table public.activity_progress is
  'Per-participant activity answers and completion state.';

create or replace function public.classrooms_purge_expired(
  p_cutoff bigint
)
returns bigint
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_deleted bigint;
begin
  delete from public.classroom_sessions
  where updated_at < p_cutoff;

  get diagnostics v_deleted = row_count;
  return v_deleted;
end;
$$;

create or replace function public.classrooms_create_session(
  p_id uuid,
  p_code text,
  p_teacher_token_hash text,
  p_day smallint,
  p_timestamp bigint
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_recent_count bigint;
begin
  -- Serialize creation so concurrent requests cannot cross the global
  -- 60-room rolling-hour limit.
  perform pg_catalog.pg_advisory_xact_lock(20260727, 60);
  perform public.classrooms_purge_expired(
    p_timestamp - (7::bigint * 24 * 60 * 60 * 1000)
  );

  select count(*)
  into v_recent_count
  from public.classroom_sessions
  where created_at >= p_timestamp - (60::bigint * 60 * 1000);

  if v_recent_count >= 60 then
    return pg_catalog.jsonb_build_object('outcome', 'rate_limited');
  end if;

  begin
    insert into public.classroom_sessions (
      id,
      code,
      teacher_token_hash,
      day,
      current_stage,
      status,
      created_at,
      updated_at
    )
    values (
      p_id,
      p_code,
      p_teacher_token_hash,
      p_day,
      0,
      'open',
      p_timestamp,
      p_timestamp
    );
  exception
    when unique_violation then
      return pg_catalog.jsonb_build_object('outcome', 'collision');
  end;

  return pg_catalog.jsonb_build_object(
    'outcome', 'created',
    'id', p_id
  );
end;
$$;

create or replace function public.classrooms_join_participant(
  p_session_id uuid,
  p_participant_id uuid,
  p_display_name text,
  p_participant_token_hash text,
  p_timestamp bigint
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_status text;
  v_current_stage smallint;
  v_participant_count bigint;
begin
  -- A per-room lock makes the 80-person limit exact during concurrent joins.
  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtext('nuolkor-classroom-join:' || p_session_id::text)
  );

  select status, current_stage
  into v_status, v_current_stage
  from public.classroom_sessions
  where id = p_session_id
  for update;

  if not found then
    return pg_catalog.jsonb_build_object('outcome', 'not_found');
  end if;

  if exists (
    select 1
    from public.classroom_participants
    where session_id = p_session_id
      and display_name = p_display_name
  ) then
    return pg_catalog.jsonb_build_object('outcome', 'name_taken');
  end if;

  if v_status = 'closed' then
    return pg_catalog.jsonb_build_object('outcome', 'closed');
  end if;

  select count(*)
  into v_participant_count
  from public.classroom_participants
  where session_id = p_session_id;

  if v_participant_count >= 80 then
    return pg_catalog.jsonb_build_object('outcome', 'capacity');
  end if;

  begin
    insert into public.classroom_participants (
      id,
      session_id,
      display_name,
      participant_token_hash,
      help_status,
      current_stage,
      joined_at,
      updated_at
    )
    values (
      p_participant_id,
      p_session_id,
      p_display_name,
      p_participant_token_hash,
      'green',
      v_current_stage,
      p_timestamp,
      p_timestamp
    );
  exception
    when unique_violation then
      return pg_catalog.jsonb_build_object('outcome', 'name_taken');
  end;

  return pg_catalog.jsonb_build_object(
    'outcome', 'created',
    'participantId', p_participant_id,
    'currentStage', v_current_stage,
    'status', v_status
  );
end;
$$;

create or replace function public.classrooms_save_progress(
  p_session_id uuid,
  p_participant_id uuid,
  p_current_stage smallint,
  p_help_status text,
  p_completed_stage_id text,
  p_completed boolean,
  p_required_activity_ids jsonb,
  p_activities jsonb,
  p_timestamp bigint
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_status text;
  v_activity jsonb;
  v_activity_value jsonb;
  v_updated_rows bigint;
begin
  if p_current_stage is null
    or p_current_stage < 0
    or p_help_status is null
    or p_help_status not in ('green', 'yellow', 'red')
    or pg_catalog.jsonb_typeof(p_required_activity_ids)
      is distinct from 'array'
    or pg_catalog.jsonb_typeof(p_activities)
      is distinct from 'array'
    or pg_catalog.jsonb_array_length(p_activities) > 24
  then
    raise check_violation using message = 'invalid_progress_payload';
  end if;

  -- The exception block is a subtransaction. A missing required activity
  -- rolls back every write in this RPC before returning a stable outcome.
  begin
    select status
    into v_status
    from public.classroom_sessions
    where id = p_session_id
    for update;

    if not found then
      return pg_catalog.jsonb_build_object('outcome', 'not_found');
    end if;

    if v_status = 'closed' then
      return pg_catalog.jsonb_build_object('outcome', 'closed');
    end if;

    update public.classroom_participants
    set
      current_stage = p_current_stage,
      help_status = p_help_status,
      updated_at = p_timestamp
    where id = p_participant_id
      and session_id = p_session_id;

    get diagnostics v_updated_rows = row_count;
    if v_updated_rows <> 1 then
      return pg_catalog.jsonb_build_object('outcome', 'not_found');
    end if;

    for v_activity in
      select value
      from pg_catalog.jsonb_array_elements(p_activities)
    loop
      if pg_catalog.jsonb_typeof(v_activity) is distinct from 'object'
        or pg_catalog.jsonb_typeof(v_activity -> 'activityId')
          is distinct from 'string'
        or pg_catalog.jsonb_typeof(v_activity -> 'stageId')
          is distinct from 'string'
        or pg_catalog.jsonb_typeof(v_activity -> 'completed')
          is distinct from 'boolean'
      then
        raise check_violation using message = 'invalid_activity_payload';
      end if;

      v_activity_value :=
        case
          when not (v_activity ? 'value')
            or pg_catalog.jsonb_typeof(v_activity -> 'value') = 'null'
          then '{}'::jsonb
          else v_activity -> 'value'
        end;

      insert into public.activity_progress (
        participant_id,
        activity_id,
        stage_id,
        value_json,
        completed,
        updated_at
      )
      values (
        p_participant_id,
        v_activity ->> 'activityId',
        v_activity ->> 'stageId',
        v_activity_value,
        (v_activity ->> 'completed')::boolean,
        p_timestamp
      )
      on conflict (participant_id, activity_id) do update
      set
        stage_id = excluded.stage_id,
        value_json = excluded.value_json,
        completed = excluded.completed,
        updated_at = excluded.updated_at;
    end loop;

    if p_completed_stage_id is not null then
      if coalesce(p_completed, true)
        and exists (
          select 1
          from pg_catalog.jsonb_array_elements_text(
            p_required_activity_ids
          ) as req(activity_id)
          where not exists (
            select 1
            from public.activity_progress
            where participant_id = p_participant_id
              and activity_id = req.activity_id
              and completed
          )
        )
      then
        raise exception using
          errcode = 'P0001',
          message = 'missing_required';
      end if;

      insert into public.stage_progress (
        participant_id,
        stage_id,
        completed,
        completed_at,
        updated_at
      )
      values (
        p_participant_id,
        p_completed_stage_id,
        coalesce(p_completed, true),
        case when coalesce(p_completed, true) then p_timestamp else null end,
        p_timestamp
      )
      on conflict (participant_id, stage_id) do update
      set
        completed = excluded.completed,
        completed_at = excluded.completed_at,
        updated_at = excluded.updated_at;
    end if;

    update public.classroom_sessions
    set updated_at = p_timestamp
    where id = p_session_id;

    return pg_catalog.jsonb_build_object('outcome', 'saved');
  exception
    when sqlstate 'P0001' then
      if sqlerrm = 'missing_required' then
        return pg_catalog.jsonb_build_object(
          'outcome', 'missing_required'
        );
      end if;
      raise;
  end;
end;
$$;

revoke all on function public.classrooms_purge_expired(bigint)
  from public, anon, authenticated;
revoke all on function public.classrooms_create_session(
  uuid, text, text, smallint, bigint
) from public, anon, authenticated;
revoke all on function public.classrooms_join_participant(
  uuid, uuid, text, text, bigint
) from public, anon, authenticated;
revoke all on function public.classrooms_save_progress(
  uuid, uuid, smallint, text, text, boolean, jsonb, jsonb, bigint
) from public, anon, authenticated;

grant execute on function public.classrooms_purge_expired(bigint)
  to service_role;
grant execute on function public.classrooms_create_session(
  uuid, text, text, smallint, bigint
) to service_role;
grant execute on function public.classrooms_join_participant(
  uuid, uuid, text, text, bigint
) to service_role;
grant execute on function public.classrooms_save_progress(
  uuid, uuid, smallint, text, text, boolean, jsonb, jsonb, bigint
) to service_role;

commit;
