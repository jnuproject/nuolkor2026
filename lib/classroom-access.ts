import { sitePath } from "./site-path";

type ClassroomAccessKind = "participant" | "teacher";

const stateKeys: Record<ClassroomAccessKind, string> = {
  participant: "buildLoopParticipantAccess",
  teacher: "buildLoopTeacherAccess",
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
    window.history.replaceState(
      { ...historyState(), [key]: fragmentToken },
      "",
      `${window.location.pathname}${window.location.search}`,
    );
    return fragmentToken;
  }

  const saved = historyState()[key];
  return validAccessToken(saved) ? saved : "";
}

export function rememberClassroomAccessToken(
  kind: ClassroomAccessKind,
  token: string,
  path: string,
): void {
  if (!validAccessToken(token)) {
    throw new Error("Invalid classroom access token.");
  }
  window.history.replaceState(
    { ...historyState(), [stateKeys[kind]]: token },
    "",
    sitePath(path),
  );
}

export function clearClassroomAccessToken(
  kind: ClassroomAccessKind,
  path: string,
): void {
  const next = historyState();
  delete next[stateKeys[kind]];
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
