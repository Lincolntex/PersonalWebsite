/**
 * Prefix a path with the site's configured base path.
 *
 * `import.meta.env.BASE_URL` always ends with a slash, so it is trimmed
 * before joining to avoid double slashes.
 */
export function withBase(path = ""): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  if (!path) {
    return `${base}/`;
  }

  if (path.startsWith("#")) {
    return `${base}/${path}`;
  }

  return `${base}/${path.replace(/^\//, "")}`;
}
