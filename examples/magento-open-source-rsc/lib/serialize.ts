/**
 * Serialize data to plain objects for RSC client component boundary.
 *
 * GraphQL query results may contain class instances or null prototypes that can't be passed
 * directly from Server Components to Client Components. This function converts to plain JSON
 * objects.
 */
export function serialize<T>(data: T): T {
  return JSON.parse(JSON.stringify(data))
}
