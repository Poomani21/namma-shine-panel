/**
 * Single source of truth for turning a service name (or a hand-typed slug)
 * into the URL segment used by Firestore doc ids, the admin panel and
 * /services/$slug on the public site.
 */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
