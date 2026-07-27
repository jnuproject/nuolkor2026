import {
  getCourseDay,
  type CourseDayManifest,
} from "./course_manifest.ts";

type ClassroomStatus = "open" | "paused" | "closed";
type HelpStatus = "green" | "yellow" | "red";
type JsonObject = Record<string, unknown>;

type SessionRecord = {
  id: string;
  code: string;
  teacherTokenHash: string;
  day: number;
  currentStage: number;
  status: ClassroomStatus;
  createdAt: number;
  updatedAt: number;
};

type ParticipantRecord = {
  id: string;
  sessionId: string;
  displayName: string;
  participantTokenHash: string;
  helpStatus: HelpStatus;
  currentStage: number;
  joinedAt: number;
  updatedAt: number;
};

type ActivityUpdate = {
  activityId: string;
  stageId: string;
  value: unknown;
  completed: boolean;
};

const REMOVED_STATUS_ACTIVITY_STAGES = new Map<string, string>([
  ["day1-readiness-signal", "day1-welcome-readiness"],
  ["day4-start-status", "day4-project-status"],
  ["day4-final-status", "day4-final-checkpoint"],
  ["day6-readiness-status", "day6-final-readiness"],
]);

class RestFailure extends Error {
  readonly status: number;
  readonly code: string;

  constructor(status: number, code: string) {
    super(`Database request failed (${status}${code ? `, ${code}` : ""}).`);
    this.name = "RestFailure";
    this.status = status;
    this.code = code;
  }
}

function requiredEnvironment(name: string): string {
  const value = Deno.env.get(name)?.trim();
  if (!value) {
    throw new Error(`Missing required server environment variable: ${name}`);
  }
  return value;
}

const SUPABASE_URL = requiredEnvironment("SUPABASE_URL").replace(/\/+$/, "");
const SUPABASE_SERVICE_ROLE_KEY = requiredEnvironment(
  "SUPABASE_SERVICE_ROLE_KEY",
);
const INSTRUCTOR_LAUNCH_PIN_HASH = (
  Deno.env.get("INSTRUCTOR_LAUNCH_PIN_HASH") ?? ""
).trim().toLowerCase();
const INSTRUCTOR_LAUNCH_PIN_CONFIGURED =
  /^[0-9a-f]{64}$/.test(INSTRUCTOR_LAUNCH_PIN_HASH);
const REST_BASE_URL = `${SUPABASE_URL}/rest/v1/`;
const DEFAULT_ALLOWED_ORIGINS = new Set(["https://jnuproject.github.io"]);
const CONFIGURED_ALLOWED_ORIGINS = new Set(
  (Deno.env.get("ALLOWED_ORIGINS") ?? "")
    .split(",")
    .map((origin) => origin.trim().replace(/\/+$/, ""))
    .filter(Boolean),
);

function isLocalDevelopmentOrigin(origin: string): boolean {
  try {
    const url = new URL(origin);
    return (
      url.protocol === "http:" &&
      ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)
    );
  } catch {
    return false;
  }
}

function isAllowedOrigin(origin: string): boolean {
  const normalized = origin.replace(/\/+$/, "");
  return (
    DEFAULT_ALLOWED_ORIGINS.has(normalized) ||
    CONFIGURED_ALLOWED_ORIGINS.has(normalized) ||
    isLocalDevelopmentOrigin(normalized)
  );
}

function corsHeaders(request: Request): Headers {
  const headers = new Headers({
    "access-control-allow-headers":
      "apikey, authorization, content-type, x-client-info, x-instructor-pin",
    "access-control-allow-methods": "GET, POST, PATCH, OPTIONS",
    "access-control-max-age": "86400",
    vary: "Origin",
  });
  const origin = request.headers.get("origin");
  if (origin && isAllowedOrigin(origin)) {
    headers.set("access-control-allow-origin", origin);
  }
  return headers;
}

function jsonResponse(
  request: Request,
  body: unknown,
  status = 200,
): Response {
  const headers = corsHeaders(request);
  headers.set("cache-control", "no-store, private");
  headers.set("content-type", "application/json; charset=utf-8");
  headers.set("x-content-type-options", "nosniff");
  return new Response(JSON.stringify(body), { headers, status });
}

function jsonError(
  request: Request,
  message: string,
  status: number,
): Response {
  return jsonResponse(request, { error: message }, status);
}

async function restRequest<T>(
  resource: string,
  options: {
    method?: "GET" | "PATCH" | "POST";
    query?: Record<string, string>;
    body?: unknown;
    prefer?: string;
  } = {},
): Promise<T> {
  const url = new URL(resource, REST_BASE_URL);
  for (const [name, value] of Object.entries(options.query ?? {})) {
    url.searchParams.set(name, value);
  }

  const headers = new Headers({
    accept: "application/json",
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
  });
  if (options.body !== undefined) {
    headers.set("content-type", "application/json");
  }
  if (options.prefer) {
    headers.set("prefer", options.prefer);
  }

  const response = await fetch(url, {
    body:
      options.body === undefined ? undefined : JSON.stringify(options.body),
    headers,
    method: options.method ?? "GET",
    signal: AbortSignal.timeout(10_000),
  });
  const raw = await response.text();

  if (!response.ok) {
    let code = "";
    try {
      const errorBody: unknown = JSON.parse(raw);
      if (
        isPlainObject(errorBody) &&
        typeof errorBody.code === "string"
      ) {
        code = errorBody.code;
      }
    } catch {
      // The response body is deliberately not logged because it may contain
      // query details. Status and a stable database code are sufficient.
    }
    console.error("Classroom database request failed", {
      code,
      resource: resource.split("?")[0],
      status: response.status,
    });
    throw new RestFailure(response.status, code);
  }

  if (!raw) return undefined as T;
  return JSON.parse(raw) as T;
}

function selectRows<T>(
  table: string,
  query: Record<string, string>,
): Promise<T[]> {
  return restRequest<T[]>(table, { query });
}

function patchRows(
  table: string,
  query: Record<string, string>,
  body: JsonObject,
): Promise<void> {
  return restRequest<void>(table, {
    body,
    method: "PATCH",
    prefer: "return=minimal",
    query,
  });
}

async function callRpc(
  name: string,
  body: JsonObject,
): Promise<JsonObject> {
  const result = await restRequest<unknown>(`rpc/${name}`, {
    body,
    method: "POST",
  });
  if (!isPlainObject(result)) {
    throw new Error(`Database function ${name} returned an invalid result.`);
  }
  return result;
}

function isPlainObject(value: unknown): value is JsonObject {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

async function readJsonObject(
  request: Request,
  maxCharacters = 4096,
): Promise<JsonObject | null> {
  const raw = await request.text();
  if (!raw || raw.length > maxCharacters) return null;
  try {
    const value: unknown = JSON.parse(raw);
    return isPlainObject(value) ? value : null;
  } catch {
    return null;
  }
}

function now(): number {
  return Date.now();
}

function randomToken(bytes = 24): string {
  const values = crypto.getRandomValues(new Uint8Array(bytes));
  return Array.from(values, (value) =>
    value.toString(16).padStart(2, "0")
  ).join("");
}

function randomClassCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const values = crypto.getRandomValues(new Uint8Array(6));
  return Array.from(
    values,
    (value) => alphabet[value % alphabet.length],
  ).join("");
}

async function hashToken(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
}

function constantTimeEqual(left: string, right: string): boolean {
  const length = Math.max(left.length, right.length);
  let difference = left.length ^ right.length;
  for (let index = 0; index < length; index += 1) {
    difference |=
      (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  }
  return difference === 0;
}

function bearerToken(request: Request): string {
  const header = request.headers.get("authorization") ?? "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  const token = match?.[1]?.trim() ?? "";
  return token.length <= 256 ? token : "";
}

function normalizeCode(code: string): string {
  return code.trim().toUpperCase();
}

function normalizeDisplayName(value: unknown): string {
  return typeof value === "string"
    ? value
      .replace(/[\u0000-\u001f\u007f]/g, "")
      .replace(/\s+/g, " ")
      .trim()
    : "";
}

function toNumber(value: unknown): number {
  return Number(value);
}

function sessionFromRow(row: JsonObject): SessionRecord {
  return {
    code: String(row.code),
    createdAt: toNumber(row.created_at),
    currentStage: toNumber(row.current_stage),
    day: toNumber(row.day),
    id: String(row.id),
    status: String(row.status) as ClassroomStatus,
    teacherTokenHash: String(row.teacher_token_hash),
    updatedAt: toNumber(row.updated_at),
  };
}

function participantFromRow(row: JsonObject): ParticipantRecord {
  return {
    currentStage: toNumber(row.current_stage),
    displayName: String(row.display_name),
    helpStatus: String(row.help_status) as HelpStatus,
    id: String(row.id),
    joinedAt: toNumber(row.joined_at),
    participantTokenHash: String(row.participant_token_hash),
    sessionId: String(row.session_id),
    updatedAt: toNumber(row.updated_at),
  };
}

async function findSession(code: string): Promise<SessionRecord | null> {
  const normalized = normalizeCode(code);
  if (!/^[A-Z0-9]{6}$/.test(normalized)) {
    return null;
  }
  const rows = await selectRows<JsonObject>("classroom_sessions", {
    code: `eq.${normalized}`,
    limit: "1",
    select:
      "id,code,teacher_token_hash,day,current_stage,status,created_at,updated_at",
  });
  return rows[0] ? sessionFromRow(rows[0]) : null;
}

async function requireTeacher(
  request: Request,
  code: string,
): Promise<SessionRecord | null> {
  const session = await findSession(code);
  const token = bearerToken(request);
  if (!session || !token) return null;
  const tokenHash = await hashToken(token);
  return constantTimeEqual(tokenHash, session.teacherTokenHash)
    ? session
    : null;
}

async function requireParticipant(
  request: Request,
  sessionId: string,
): Promise<ParticipantRecord | null> {
  const token = bearerToken(request);
  if (!token) return null;
  const tokenHash = await hashToken(token);
  const rows = await selectRows<JsonObject>("classroom_participants", {
    limit: "1",
    participant_token_hash: `eq.${tokenHash}`,
    select:
      "id,session_id,display_name,participant_token_hash,help_status,current_stage,joined_at,updated_at",
    session_id: `eq.${sessionId}`,
  });
  return rows[0] ? participantFromRow(rows[0]) : null;
}

function rpcOutcome(result: JsonObject): string {
  return typeof result.outcome === "string" ? result.outcome : "";
}

async function createClassroom(request: Request): Promise<Response> {
  if (!INSTRUCTOR_LAUNCH_PIN_CONFIGURED) {
    console.error(
      "Classroom creation is disabled: INSTRUCTOR_LAUNCH_PIN_HASH is missing or invalid.",
    );
    return jsonError(
      request,
      "Classroom creation is not configured.",
      503,
    );
  }

  const suppliedPin = (
    request.headers.get("x-instructor-pin") ?? ""
  ).trim();
  const candidatePin =
    suppliedPin.length <= 256 ? suppliedPin : "";
  const candidatePinHash = await hashToken(candidatePin);
  const candidatePinMatches = constantTimeEqual(
    candidatePinHash,
    INSTRUCTOR_LAUNCH_PIN_HASH,
  );
  if (
    !candidatePin ||
    !candidatePinMatches
  ) {
    return jsonError(
      request,
      "A valid instructor launch PIN is required.",
      401,
    );
  }

  const input = await readJsonObject(request);
  if (!input) {
    return jsonError(request, "Invalid request.", 400);
  }

  const day = Number(input.day);
  const plan = getCourseDay(day);
  if (!plan) {
    return jsonError(request, "Choose a day from 1 to 6.", 400);
  }

  const teacherToken = randomToken();
  const teacherTokenHash = await hashToken(teacherToken);
  const timestamp = now();

  try {
    for (let attempt = 0; attempt < 6; attempt += 1) {
      const code = randomClassCode();
      const result = await callRpc("classrooms_create_session", {
        p_code: code,
        p_day: day,
        p_id: crypto.randomUUID(),
        p_teacher_token_hash: teacherTokenHash,
        p_timestamp: timestamp,
      });
      const outcome = rpcOutcome(result);

      if (outcome === "collision") continue;
      if (outcome === "rate_limited") {
        return jsonError(
          request,
          "Classroom creation is temporarily busy. Reuse the current room or try later.",
          429,
        );
      }
      if (outcome === "created") {
        return jsonResponse(
          request,
          {
            code,
            day,
            joinPath: `/join?code=${code}`,
            stageCount: plan.stages.length,
            teacherToken,
          },
          201,
        );
      }

      throw new Error("Unexpected classroom creation outcome.");
    }
  } catch (error) {
    console.error(
      "Unable to create classroom",
      error instanceof Error ? error.message : "Unknown failure",
    );
    return jsonError(
      request,
      "Could not create a classroom. Try again.",
      500,
    );
  }

  return jsonError(
    request,
    "Could not create a classroom. Try again.",
    500,
  );
}

async function teacherDashboard(
  request: Request,
  code: string,
): Promise<Response> {
  const session = await requireTeacher(request, code);
  if (!session) {
    return jsonError(request, "Instructor access is required.", 401);
  }
  const plan = getCourseDay(session.day);
  if (!plan) {
    return jsonError(request, "Course day not found.", 500);
  }

  const dashboard = await callRpc("classrooms_teacher_dashboard", {
    p_session_id: session.id,
    p_stage_manifest: plan.stages.map((stage) => ({
      activities: stage.activities.map((activity) => ({
        id: activity.id,
        required: activity.required,
      })),
      id: stage.id,
    })),
  });
  if (
    !Array.isArray(dashboard.participants) ||
    !isPlainObject(dashboard.stageCounts)
  ) {
    throw new Error("Instructor dashboard returned an invalid result.");
  }

  return jsonResponse(request, {
    participants: dashboard.participants,
    session: {
      code: session.code,
      currentStage: session.currentStage,
      day: session.day,
      status: session.status,
      updatedAt: session.updatedAt,
    },
    stageCounts: dashboard.stageCounts,
  });
}

async function updateClassroom(
  request: Request,
  code: string,
): Promise<Response> {
  const session = await requireTeacher(request, code);
  if (!session) {
    return jsonError(request, "Instructor access is required.", 401);
  }

  const input = await readJsonObject(request);
  if (!input) {
    return jsonError(request, "Invalid request.", 400);
  }

  const plan = getCourseDay(session.day);
  if (!plan) {
    return jsonError(request, "Course day not found.", 500);
  }

  if (
    input.currentStage !== undefined &&
    (typeof input.currentStage !== "number" ||
      !Number.isFinite(input.currentStage) ||
      !Number.isInteger(input.currentStage))
  ) {
    return jsonError(request, "Invalid classroom stage.", 400);
  }
  const currentStage =
    input.currentStage === undefined
      ? session.currentStage
      : Math.max(
        0,
        Math.min(plan.stages.length - 1, input.currentStage),
      );

  const requestedStatus =
    input.status === undefined ? session.status : input.status;
  const allowedStatuses: ClassroomStatus[] = [
    "open",
    "paused",
    "closed",
  ];
  if (
    typeof requestedStatus !== "string" ||
    !allowedStatuses.includes(requestedStatus as ClassroomStatus)
  ) {
    return jsonError(request, "Invalid classroom status.", 400);
  }
  const status = requestedStatus as ClassroomStatus;
  const timestamp = now();

  await patchRows(
    "classroom_sessions",
    { id: `eq.${session.id}` },
    {
      current_stage: currentStage,
      status,
      updated_at: timestamp,
    },
  );

  return jsonResponse(request, {
    currentStage,
    status,
    updatedAt: timestamp,
  });
}

async function joinClassroom(
  request: Request,
  code: string,
): Promise<Response> {
  const session = await findSession(code);
  if (!session) {
    return jsonError(request, "Class code not found.", 404);
  }

  const input = await readJsonObject(request);
  if (!input) {
    return jsonError(request, "Invalid request.", 400);
  }

  const displayName = normalizeDisplayName(input.displayName);
  if (displayName.length < 2 || displayName.length > 20) {
    return jsonError(
      request,
      "Use a 2–20 character name or seat code.",
      400,
    );
  }

  const participantRows = await selectRows<JsonObject>(
    "classroom_participants",
    {
      select:
        "id,session_id,display_name,participant_token_hash,help_status,current_stage,joined_at,updated_at",
      session_id: `eq.${session.id}`,
    },
  );
  const existingRow = participantRows.find(
    (row) => row.display_name === displayName,
  );
  if (existingRow) {
    const existing = participantFromRow(existingRow);
    const resumeToken =
      typeof input.resumeToken === "string"
        ? input.resumeToken.trim()
        : "";
    if (
      resumeToken &&
      constantTimeEqual(
        await hashToken(resumeToken),
        existing.participantTokenHash,
      )
    ) {
      return jsonResponse(request, {
        code: session.code,
        currentStage: session.currentStage,
        day: session.day,
        participantId: existing.id,
        participantToken: resumeToken,
        status: session.status,
      });
    }
    return jsonError(
      request,
      "That name is already in this class. Use your saved device or another label.",
      409,
    );
  }

  if (session.status === "closed") {
    return jsonError(request, "This classroom is closed.", 409);
  }

  const participantId = crypto.randomUUID();
  const participantToken = randomToken();
  const participantTokenHash = await hashToken(participantToken);
  const timestamp = now();

  try {
    const result = await callRpc("classrooms_join_participant", {
      p_display_name: displayName,
      p_participant_id: participantId,
      p_participant_token_hash: participantTokenHash,
      p_session_id: session.id,
      p_timestamp: timestamp,
    });
    const outcome = rpcOutcome(result);

    if (outcome === "name_taken") {
      return jsonError(
        request,
        "That name was just taken. Use your saved device or another label.",
        409,
      );
    }
    if (outcome === "closed") {
      return jsonError(request, "This classroom is closed.", 409);
    }
    if (outcome === "capacity") {
      return jsonError(
        request,
        "This classroom has reached its 80-person limit.",
        409,
      );
    }
    if (outcome === "not_found") {
      return jsonError(request, "Class code not found.", 404);
    }
    if (outcome !== "created") {
      throw new Error("Unexpected classroom join outcome.");
    }

    return jsonResponse(
      request,
      {
        code: session.code,
        currentStage: toNumber(result.currentStage),
        day: session.day,
        participantId,
        participantToken,
        status: String(result.status),
      },
      201,
    );
  } catch (error) {
    console.error(
      "Unable to join classroom",
      error instanceof Error ? error.message : "Unknown failure",
    );
    return jsonError(
      request,
      "Could not join this classroom. Try again.",
      500,
    );
  }
}

async function studentState(
  request: Request,
  code: string,
): Promise<Response> {
  const session = await findSession(code);
  if (!session) {
    return jsonError(request, "Class code not found.", 404);
  }

  const participant = await requireParticipant(request, session.id);
  if (!participant) {
    return jsonError(request, "Join this classroom first.", 401);
  }

  const timestamp = now();
  if (timestamp - participant.updatedAt >= 20_000) {
    await patchRows(
      "classroom_participants",
      { id: `eq.${participant.id}` },
      { updated_at: timestamp },
    );
  }

  const [completedRows, activityRows] = await Promise.all([
    selectRows<JsonObject>("stage_progress", {
      completed: "eq.true",
      participant_id: `eq.${participant.id}`,
      select: "stage_id",
    }),
    selectRows<JsonObject>("activity_progress", {
      participant_id: `eq.${participant.id}`,
      select: "activity_id,stage_id,value_json,completed",
    }),
  ]);

  return jsonResponse(request, {
    participant: {
      activities: Object.fromEntries(
        activityRows.map((row) => [
          String(row.activity_id),
          {
            completed: row.completed === true,
            stageId: String(row.stage_id),
            value: row.value_json ?? {},
          },
        ]),
      ),
      completedStages: completedRows.map((row) => String(row.stage_id)),
      currentStage: participant.currentStage,
      displayName: participant.displayName,
      helpStatus: participant.helpStatus,
      id: participant.id,
    },
    session: {
      code: session.code,
      currentStage: session.currentStage,
      day: session.day,
      status: session.status,
    },
  });
}

function validateActivityUpdates(
  rawActivities: unknown,
  plan: CourseDayManifest,
  releasedStage: number,
): { error?: string; updates?: ActivityUpdate[] } {
  if (
    rawActivities !== undefined &&
    (!Array.isArray(rawActivities) || rawActivities.length > 24)
  ) {
    return { error: "Invalid activity updates." };
  }

  const stageIndex = new Map(
    plan.stages.map((stage, index) => [stage.id, index] as const),
  );
  const activityStage = new Map(
    plan.stages.flatMap((stage) =>
      stage.activities.map((activity) => [activity.id, stage.id] as const)
    ),
  );
  const updates: ActivityUpdate[] = [];

  for (const rawActivity of rawActivities ?? []) {
    if (
      !isPlainObject(rawActivity) ||
      typeof rawActivity.activityId !== "string" ||
      typeof rawActivity.stageId !== "string" ||
      typeof rawActivity.completed !== "boolean"
    ) {
      return { error: "Invalid activity update." };
    }

    const expectedStage = activityStage.get(rawActivity.activityId);
    const activityStageIndex = stageIndex.get(rawActivity.stageId);
    const removedStatusStage = REMOVED_STATUS_ACTIVITY_STAGES.get(
      rawActivity.activityId,
    );
    if (removedStatusStage) {
      if (
        removedStatusStage !== rawActivity.stageId ||
        activityStageIndex === undefined ||
        activityStageIndex > releasedStage
      ) {
        return { error: "Activity not found." };
      }
      continue;
    }

    if (
      !expectedStage ||
      expectedStage !== rawActivity.stageId ||
      activityStageIndex === undefined ||
      activityStageIndex > releasedStage
    ) {
      return { error: "Activity not found." };
    }

    const value = rawActivity.value ?? {};
    const valueJson = JSON.stringify(value);
    if (valueJson.length > 12_000) {
      return {
        error: "This activity answer is too large to save.",
      };
    }
    updates.push({
      activityId: rawActivity.activityId,
      completed: rawActivity.completed,
      stageId: rawActivity.stageId,
      value: JSON.parse(valueJson),
    });
  }

  return { updates };
}

async function saveProgress(
  request: Request,
  code: string,
): Promise<Response> {
  const session = await findSession(code);
  if (!session) {
    return jsonError(request, "Class code not found.", 404);
  }

  const participant = await requireParticipant(request, session.id);
  if (!participant) {
    return jsonError(request, "Join this classroom first.", 401);
  }
  if (session.status === "closed") {
    return jsonError(request, "This classroom is closed.", 409);
  }

  const input = await readJsonObject(request, 64_000);
  if (!input) {
    return jsonError(request, "Invalid request.", 400);
  }

  if (
    input.currentStage !== undefined &&
    (typeof input.currentStage !== "number" ||
      !Number.isFinite(input.currentStage) ||
      !Number.isInteger(input.currentStage))
  ) {
    return jsonError(request, "Invalid classroom stage.", 400);
  }
  if (
    input.helpStatus !== undefined &&
    !["green", "yellow", "red"].includes(String(input.helpStatus))
  ) {
    return jsonError(request, "Invalid help status.", 400);
  }
  if (
    input.completedStageId !== undefined &&
    typeof input.completedStageId !== "string"
  ) {
    return jsonError(request, "Invalid completed stage.", 400);
  }
  if (
    input.completed !== undefined &&
    typeof input.completed !== "boolean"
  ) {
    return jsonError(request, "Invalid completion value.", 400);
  }

  const plan = getCourseDay(session.day);
  if (!plan) {
    return jsonError(request, "Course day not found.", 500);
  }

  const activityValidation = validateActivityUpdates(
    input.activities,
    plan,
    session.currentStage,
  );
  if (activityValidation.error) {
    const status = activityValidation.error.includes("too large")
      ? 413
      : 400;
    return jsonError(request, activityValidation.error, status);
  }
  const activities = activityValidation.updates ?? [];

  const stageIndex = new Map(
    plan.stages.map((stage, index) => [stage.id, index] as const),
  );
  let requiredActivityIds: string[] = [];
  if (typeof input.completedStageId === "string") {
    const completingStageIndex = stageIndex.get(input.completedStageId);
    if (
      completingStageIndex === undefined ||
      completingStageIndex > session.currentStage
    ) {
      return jsonError(request, "Stage not found.", 400);
    }
    requiredActivityIds = plan.stages[completingStageIndex].activities
      .filter((activity) => activity.required)
      .map((activity) => activity.id);
  }

  const currentStage =
    input.currentStage === undefined
      ? participant.currentStage
      : Math.max(0, Math.min(session.currentStage, input.currentStage));
  const helpStatus =
    typeof input.helpStatus === "string"
      ? input.helpStatus as HelpStatus
      : participant.helpStatus;
  const timestamp = now();

  const result = await callRpc("classrooms_save_progress", {
    p_activities: activities,
    p_completed:
      typeof input.completed === "boolean" ? input.completed : null,
    p_completed_stage_id:
      typeof input.completedStageId === "string"
        ? input.completedStageId
        : null,
    p_current_stage: currentStage,
    p_help_status: helpStatus,
    p_participant_id: participant.id,
    p_required_activity_ids: requiredActivityIds,
    p_session_id: session.id,
    p_timestamp: timestamp,
  });
  const outcome = rpcOutcome(result);

  if (outcome === "missing_required") {
    return jsonError(
      request,
      "Complete every required activity before finishing this stage.",
      409,
    );
  }
  if (outcome === "closed") {
    return jsonError(request, "This classroom is closed.", 409);
  }
  if (outcome === "not_found") {
    return jsonError(request, "Join this classroom first.", 401);
  }
  if (outcome !== "saved") {
    throw new Error("Unexpected progress save outcome.");
  }

  return jsonResponse(request, { saved: true, updatedAt: timestamp });
}

function routeParts(request: Request): string[] | null {
  const pathParts = new URL(request.url).pathname.split("/").filter(Boolean);
  const slugIndex = pathParts.lastIndexOf("classrooms");
  if (slugIndex < 0) return null;
  try {
    return pathParts.slice(slugIndex + 1).map(decodeURIComponent);
  } catch {
    return null;
  }
}

async function routeRequest(request: Request): Promise<Response> {
  const parts = routeParts(request);
  if (!parts) {
    return jsonError(request, "Route not found.", 404);
  }

  if (parts.length === 0 && request.method === "POST") {
    return createClassroom(request);
  }

  if (parts.length === 1) {
    if (request.method === "GET") {
      return teacherDashboard(request, parts[0]);
    }
    if (request.method === "PATCH") {
      return updateClassroom(request, parts[0]);
    }
  }

  if (
    parts.length === 2 &&
    parts[1] === "join" &&
    request.method === "POST"
  ) {
    return joinClassroom(request, parts[0]);
  }

  if (
    parts.length === 2 &&
    parts[1] === "student" &&
    request.method === "GET"
  ) {
    return studentState(request, parts[0]);
  }

  if (
    parts.length === 2 &&
    parts[1] === "progress" &&
    request.method === "POST"
  ) {
    return saveProgress(request, parts[0]);
  }

  return jsonError(request, "Route not found.", 404);
}

Deno.serve(async (request) => {
  const origin = request.headers.get("origin");

  if (request.method === "OPTIONS") {
    if (origin && !isAllowedOrigin(origin)) {
      return jsonError(request, "Origin is not allowed.", 403);
    }
    return new Response(null, {
      headers: corsHeaders(request),
      status: 204,
    });
  }

  if (origin && !isAllowedOrigin(origin)) {
    return jsonError(request, "Origin is not allowed.", 403);
  }

  try {
    return await routeRequest(request);
  } catch (error) {
    console.error(
      "Unhandled classroom function failure",
      error instanceof Error ? error.message : "Unknown failure",
    );
    return jsonError(request, "Unexpected server error.", 500);
  }
});
