# Build Loop

The interactive classroom site for a six-day, 18-hour vibe coding bootcamp at
the National University of Laos.

## Classroom views

- **Student** — English activities, saved checks, copyable prompts, and help signals
- **Instructor** — Korean facilitation notes, timing, and recovery guidance
- **Present** — projector-ready English screens, timer, and keyboard controls
- **Cards** — printable quick-reference material
- **Live classroom** — room code, participant progress, help status, and instructor controls

## Architecture

- GitHub Pages serves a static Next.js export.
- Supabase Postgres stores live classroom progress.
- A Supabase Edge Function validates classroom tokens and performs all database
  reads and writes.
- A private instructor launch PIN prevents anonymous room-creation abuse.
- Live access tokens stay in the current browser history entry rather than
  shared-origin `localStorage`.
- Self-paced lesson progress stays on the learner's device.

The browser receives only the Supabase publishable key. Database tables have
Row Level Security enabled and are not directly writable by anonymous clients.
Never add a Supabase secret or `service_role` key to this repository.

## Local development

Node.js 22.13 or later is required.

```bash
npm install
cp .env.example .env.local
npm run dev
```

The source curriculum lives in the sibling `교안제작/` directory in the
authoring workspace. Run `npm run content:sync` there after editing the source
Markdown. The generated `content/generated.ts` file is committed so deployment
does not depend on that sibling directory.

## Supabase setup

The `supabase/migrations` directory contains the classroom schema and security
rules. The `classrooms` Edge Function contains the server-side classroom API.

```bash
supabase link --project-ref ehqvxjpzqqhqfifjrfrz
supabase db push
printf '%s' 'YOUR-INSTRUCTOR-PIN' | shasum -a 256
supabase secrets set INSTRUCTOR_LAUNCH_PIN_HASH=PASTE_THE_64_HEX_DIGEST
supabase functions deploy classrooms --no-verify-jwt
```

The raw instructor PIN must not be committed or placed in a
`NEXT_PUBLIC_*`/GitHub Pages build variable. The database migration also
installs a daily retention job that removes classroom data after seven days.

## Validation

```bash
npm run lint
npm test
```

The production build uses the `/nuolkor2026` base path and is deployed by the
workflow in `.github/workflows/deploy-pages.yml`.

## Presenter controls

- `←` / `→`: previous or next screen
- `Space`: start or pause the timer
- `B`: blank or restore the projector screen
- `F`: enter full screen

Day 6 also includes a repeatable four-minute showcase timer.
