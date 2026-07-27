const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

export class ClassroomApiConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ClassroomApiConfigurationError";
  }
}

function getClassroomApiUrl(path: string): string {
  if (!supabaseUrl || !supabasePublishableKey) {
    throw new ClassroomApiConfigurationError(
      "Live classroom is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
    );
  }

  let projectUrl: URL;
  try {
    projectUrl = new URL(supabaseUrl);
  } catch {
    throw new ClassroomApiConfigurationError(
      "Live classroom is not configured correctly. Check NEXT_PUBLIC_SUPABASE_URL.",
    );
  }

  const normalizedPath = path.replace(/^\/+/, "");
  const functionPath = normalizedPath
    ? `/functions/v1/classrooms/${normalizedPath}`
    : "/functions/v1/classrooms";

  return new URL(functionPath, `${projectUrl.origin}/`).toString();
}

export function classroomFetch(
  path = "",
  init: RequestInit = {},
): Promise<Response> {
  const url = getClassroomApiUrl(path);
  const headers = new Headers(init.headers);
  headers.set("apikey", supabasePublishableKey!);

  return fetch(url, {
    ...init,
    headers,
  });
}
