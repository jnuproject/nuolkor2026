import { sitePath } from "./site-path";

type ClassroomAccessKind = "participant" | "teacher";

const stateKeys: Record<ClassroomAccessKind, string> = {
  participant: "buildLoopParticipantAccess",
  teacher: "buildLoopTeacherAccess",
};

const teacherSessionKey = "build-loop:teacher-access:v1";

type StoredTeacherAccess = {
  token: string;
  path: string;
};

function validAccessToken(value: unknown): value is string {
  return typeof value === "string" && /^[0-9a-f]{48}$/.test(value);
}

function historyState(): Record<string, unknown> {
  const current = window.history.state;
  return current && typeof current === "object"
    ? { ...(current as Record<string, unknown>) }
    : {};
}

function readStoredTeacherAccess(): StoredTeacherAccess | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const value = window.sessionStorage.getItem(teacherSessionKey);
    if (!value) {
      return null;
    }
    const parsed = JSON.parse(value) as Partial<StoredTeacherAccess>;
    if (!validAccessToken(parsed.token) || typeof parsed.path !== "string") {
      window.sessionStorage.removeItem(teacherSessionKey);
      return null;
    }
    const storedUrl = new URL(parsed.path, window.location.origin);
    if (
      storedUrl.origin !== window.location.origin ||
      !storedUrl.pathname.endsWith("/instructor/live/")
    ) {
      window.sessionStorage.removeItem(teacherSessionKey);
      return null;
    }
    return {
      token: parsed.token,
      path: `${storedUrl.pathname}${storedUrl.search}`,
    };
  } catch {
    return null;
  }
}

function storeTeacherAccess(token: string, path: string): void {
  try {
    window.sessionStorage.setItem(
      teacherSessionKey,
      JSON.stringify({ token, path } satisfies StoredTeacherAccess),
    );
  } catch {
    // Session storage may be unavailable. The current history entry still works.
  }
}

export function consumeClassroomAccessToken(
  kind: ClassroomAccessKind,
): string {
  if (typeof window === "undefined") {
    return "";
  }

  const key = stateKeys[kind];
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const fragmentToken = hash.get("access");

  if (validAccessToken(fragmentToken)) {
    if (kind === "teacher") {
      storeTeacherAccess(
        fragmentToken,
        `${window.location.pathname}${window.location.search}`,
      );
    }
    window.history.replaceState(
      { ...historyState(), [key]: fragmentToken },
      "",
      `${window.location.pathname}${window.location.search}`,
    );
    return fragmentToken;
  }

  const saved = historyState()[key];
  if (validAccessToken(saved)) {
    if (kind === "teacher") {
      storeTeacherAccess(
        saved,
        `${window.location.pathname}${window.location.search}`,
      );
    }
    return saved;
  }

  return kind === "teacher" ? (readStoredTeacherAccess()?.token ?? "") : "";
}

export function rememberedClassroomAccessPath(
  kind: ClassroomAccessKind,
): string {
  return kind === "teacher" ? (readStoredTeacherAccess()?.path ?? "") : "";
}

export function rememberClassroomAccessToken(
  kind: ClassroomAccessKind,
  token: string,
  path: string,
): void {
  if (!validAccessToken(token)) {
    throw new Error("Invalid classroom access token.");
  }
  const resolvedPath = sitePath(path);
  if (kind === "teacher") {
    storeTeacherAccess(token, resolvedPath);
  }
  window.history.replaceState(
    { ...historyState(), [stateKeys[kind]]: token },
    "",
    resolvedPath,
  );
}

export function clearClassroomAccessToken(
  kind: ClassroomAccessKind,
  path: string,
): void {
  const next = historyState();
  delete next[stateKeys[kind]];
  if (kind === "teacher") {
    try {
      window.sessionStorage.removeItem(teacherSessionKey);
    } catch {
      // The history entry is still cleared below.
    }
  }
  window.history.replaceState(next, "", sitePath(path));
}

export function classroomPathWithAccess(
  path: string,
  token: string,
): string {
  if (!validAccessToken(token)) {
    throw new Error("Invalid classroom access token.");
  }
  return `${sitePath(path)}#access=${encodeURIComponent(token)}`;
}
