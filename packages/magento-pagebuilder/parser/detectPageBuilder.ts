/** Determine if the content is Page Builder or not */
export function detectPageBuilder(content?: string | null): content is string {
  return !!(content && /data-content-type=/.test(content))
}
