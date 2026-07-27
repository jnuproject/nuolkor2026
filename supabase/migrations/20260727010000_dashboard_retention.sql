begin;

create extension if not exists pg_cron;

create or replace function public.classrooms_teacher_dashboard(
  p_session_id uuid,
  p_stage_manifest jsonb
)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_activity jsonb;
  v_stage jsonb;
  v_stage_count integer;
begin
  if pg_catalog.jsonb_typeof(p_stage_manifest)
    is distinct from 'array'
  then
    raise check_violation using message = 'invalid_stage_manifest';
  end if;

  v_stage_count := pg_catalog.jsonb_array_length(p_stage_manifest);
  if v_stage_count < 1 or v_stage_count > 64 then
    raise check_violation using message = 'invalid_stage_manifest';
  end if;

  -- This RPC is service-role-only, but validating its manifest also prevents
  -- malformed deploys from silently returning misleading dashboard totals.
  for v_stage in
    select value
    from pg_catalog.jsonb_array_elements(p_stage_manifest)
  loop
    if pg_catalog.jsonb_typeof(v_stage) is distinct from 'object'
      or pg_catalog.jsonb_typeof(v_stage -> 'id')
        is distinct from 'string'
      or pg_catalog.jsonb_typeof(v_stage -> 'activities')
        is distinct from 'array'
    then
      raise check_violation using message = 'invalid_stage_manifest';
    end if;
    if pg_catalog.jsonb_array_length(v_stage -> 'activities') > 128 then
      raise check_violation using message = 'invalid_stage_manifest';
    end if;

    for v_activity in
      select value
      from pg_catalog.jsonb_array_elements(v_stage -> 'activities')
    loop
      if pg_catalog.jsonb_typeof(v_activity) is distinct from 'object'
        or pg_catalog.jsonb_typeof(v_activity -> 'id')
          is distinct from 'string'
        or pg_catalog.jsonb_typeof(v_activity -> 'required')
          is distinct from 'boolean'
      then
        raise check_violation using message = 'invalid_stage_manifest';
      end if;
    end loop;
  end loop;

  return (
    with stage_manifest as (
      select
        (item.ordinality - 1)::smallint as stage_index,
        item.stage ->> 'id' as stage_id,
        item.stage -> 'activities' as activities
      from pg_catalog.jsonb_array_elements(p_stage_manifest)
        with ordinality as item(stage, ordinality)
    ),
    activity_manifest as (
      select
        stage.stage_index,
        stage.stage_id,
        activity.value ->> 'id' as activity_id,
        (activity.value ->> 'required')::boolean as required
      from stage_manifest as stage
      cross join lateral pg_catalog.jsonb_array_elements(
        stage.activities
      ) as activity(value)
    ),
    participant_base as (
      select
        participant.id,
        participant.display_name,
        participant.help_status,
        greatest(
          0,
          least(
            v_stage_count - 1,
            participant.current_stage::integer
          )
        )::smallint as current_stage,
        participant.joined_at,
        participant.updated_at
      from public.classroom_participants as participant
      where participant.session_id = p_session_id
    ),
    stage_completion as (
      select
        progress.participant_id,
        count(*)::integer as completed_count
      from public.stage_progress as progress
      join participant_base as participant
        on participant.id = progress.participant_id
      where progress.completed
      group by progress.participant_id
    ),
    required_totals as (
      select
        activity.stage_index,
        count(*) filter (where activity.required)::integer
          as required_count
      from activity_manifest as activity
      group by activity.stage_index
    ),
    current_activity as (
      select
        participant.id as participant_id,
        count(progress.activity_id) filter (
          where activity.required and progress.completed
        )::integer as completed_required_count,
        max(progress.updated_at) as last_activity_at
      from participant_base as participant
      join activity_manifest as activity
        on activity.stage_index = participant.current_stage
      left join public.activity_progress as progress
        on progress.participant_id = participant.id
        and progress.stage_id = activity.stage_id
        and progress.activity_id = activity.activity_id
      group by participant.id
    ),
    participant_payload as (
      select coalesce(
        pg_catalog.jsonb_agg(
          pg_catalog.jsonb_build_object(
            'id', participant.id,
            'displayName', participant.display_name,
            'helpStatus', participant.help_status,
            'currentStage', participant.current_stage,
            'completedCount',
              coalesce(completion.completed_count, 0),
            'currentActivityCount',
              coalesce(
                activity.completed_required_count,
                0
              ),
            'currentActivityTotal',
              coalesce(total.required_count, 0),
            'lastActivityAt', activity.last_activity_at,
            'joinedAt', participant.joined_at,
            'updatedAt', participant.updated_at
          )
          order by participant.joined_at asc
        ),
        '[]'::jsonb
      ) as value
      from participant_base as participant
      left join stage_completion as completion
        on completion.participant_id = participant.id
      left join required_totals as total
        on total.stage_index = participant.current_stage
      left join current_activity as activity
        on activity.participant_id = participant.id
    ),
    stage_count_payload as (
      select coalesce(
        pg_catalog.jsonb_object_agg(
          counts.stage_id,
          counts.completed_count
        ),
        '{}'::jsonb
      ) as value
      from (
        select
          progress.stage_id,
          count(*)::integer as completed_count
        from public.stage_progress as progress
        join participant_base as participant
          on participant.id = progress.participant_id
        where progress.completed
        group by progress.stage_id
      ) as counts
    )
    select pg_catalog.jsonb_build_object(
      'participants', participant_payload.value,
      'stageCounts', stage_count_payload.value
    )
    from participant_payload
    cross join stage_count_payload
  );
end;
$$;

revoke all on function public.classrooms_teacher_dashboard(uuid, jsonb)
  from public, anon, authenticated;
grant execute on function public.classrooms_teacher_dashboard(uuid, jsonb)
  to service_role;

comment on function public.classrooms_teacher_dashboard(uuid, jsonb) is
  'Returns one aggregated instructor snapshot without exposing raw progress rows.';

-- A named pg_cron job is replaced when scheduled again with the same name.
-- pg_cron uses UTC unless the project has explicitly configured another zone.
select cron.schedule(
  'nuolkor-classrooms-daily-retention',
  '17 3 * * *',
  $job$
    select public.classrooms_purge_expired(
      (
        extract(epoch from pg_catalog.clock_timestamp()) * 1000
      )::bigint
      - (7::bigint * 24 * 60 * 60 * 1000)
    );
  $job$
);

commit;
