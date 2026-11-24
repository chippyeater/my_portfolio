/** Resolve a path relative to public/ against the current deployment base. */
export function publicAssetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path}`;
}
