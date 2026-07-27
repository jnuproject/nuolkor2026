const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";

function normalizeBasePath(value: string): string {
  if (!value || value === "/") {
    return "";
  }
  return `/${value.replace(/^\/+|\/+$/g, "")}`;
}

const basePath = normalizeBasePath(configuredBasePath);

export function sitePath(path: string): string {
  if (
    path.startsWith("#") ||
    path.startsWith("?") ||
    /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(path)
  ) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (
    !basePath ||
    normalizedPath === basePath ||
    normalizedPath.startsWith(`${basePath}/`)
  ) {
    return normalizedPath;
  }

  return `${basePath}${normalizedPath}`;
}

export function absoluteSiteUrl(path: string): string {
  const resolvedPath = sitePath(path);
  if (typeof window === "undefined") {
    return resolvedPath;
  }
  return new URL(resolvedPath, window.location.origin).toString();
}
