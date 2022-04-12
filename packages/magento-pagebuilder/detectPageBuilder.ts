/** Determine if the content is Page Builder or not */
export function detectPageBuilder(content: string) {
  return /data-content-type=/.test(content)
}
