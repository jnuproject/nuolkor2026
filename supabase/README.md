# Classroom Supabase backend

This directory ports the temporary classroom API from Cloudflare D1 to
Supabase Postgres and one Edge Function named `classrooms`. It does not use
Supabase Auth: instructors and learners receive random, room-scoped bearer
tokens, and only SHA-256 token hashes are stored.

## Security model

- The four classroom tables have RLS enabled and no `anon` or `authenticated`
  policies or table privileges.
- The browser never receives `SUPABASE_SERVICE_ROLE_KEY`. It is read only from
  the Edge Function runtime.
- Creating a room requires `x-instructor-pin`. Only its SHA-256 digest is kept
  in the `INSTRUCTOR_LAUNCH_PIN_HASH` Edge Function secret.
- `verify_jwt = false` is intentional because `Authorization` carries a custom
  classroom token instead of a Supabase JWT.
- The publishable key is only a gateway identifier. The frontend may send it
  as `apikey`, but it grants no direct table access.
- The default browser origin is `https://jnuproject.github.io`. Add exact
  comma-separated origins with the `ALLOWED_ORIGINS` Edge Function secret when
  using another production host. Local HTTP origins are accepted for
  development.

## Routes

All routes are below
`https://ehqvxjpzqqhqfifjrfrz.supabase.co/functions/v1/classrooms`.

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/` | Create a classroom (`x-instructor-pin` required) |
| `GET` | `/:code` | Read the instructor dashboard |
| `PATCH` | `/:code` | Change the released stage or room status |
| `POST` | `/:code/join` | Join or resume without an account |
| `GET` | `/:code/student` | Read one participant's state |
| `POST` | `/:code/progress` | Save participant progress |

The response bodies and status codes match the previous Next.js/D1 API.

## Apply later

No remote mutation is performed by the repository setup itself. After review,
the project owner can apply and deploy with:

```sh
supabase link --project-ref ehqvxjpzqqhqfifjrfrz
supabase db push
supabase functions deploy classrooms --no-verify-jwt
```

Supabase provides `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to hosted Edge
Functions. Do not add the service-role value to a file, GitHub variable exposed
to builds, or any `NEXT_PUBLIC_*` variable.

Before deploying, hash the instructor PIN without a trailing newline and save
only the digest:

```sh
printf '%s' 'YOUR-INSTRUCTOR-PIN' | shasum -a 256
supabase secrets set INSTRUCTOR_LAUNCH_PIN_HASH=PASTE_THE_64_HEX_DIGEST
```

The raw PIN belongs only in the instructor's browser input and must not be
committed or stored as a build variable.

## Course manifest

The Edge Function intentionally does not import the Next.js content module
graph. Its small validation manifest is generated from the authoritative
interactive course files:

```sh
node supabase/scripts/generate-course-manifest.mjs
node supabase/scripts/generate-course-manifest.mjs --check
```

Regenerate it whenever stage IDs, activity IDs, activity kinds, or `optional`
flags change.

## Limits and retention

- Creation is serialized in Postgres and limited to 60 rooms in a rolling hour.
- Joining is serialized per room and limited to 80 participants.
- A daily `pg_cron` job removes classrooms whose `updated_at` is more than
  seven days old. New-room requests run the same cleanup as a fallback;
  cascading foreign keys remove participant and progress rows.
- Progress writes are transactional, including the required-activity gate.
- Instructor polling uses one service-role-only aggregate RPC, so PostgREST's
  row cap cannot truncate participant progress. Current activity counts include
  required activities only, and `lastActivityAt` is `null` until a current-stage
  activity has actually been saved.
