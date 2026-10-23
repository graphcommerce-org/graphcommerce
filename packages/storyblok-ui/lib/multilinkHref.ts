/**
 * Storyblok `multilink` field shape, covering the properties we read across
 * all link types (story / url / email / asset). All fields are optional
 * because unset multilinks may serialize as an empty object.
 */
export type StoryblokMultilink = {
  id?: string
  url?: string
  email?: string
  cached_url?: string
  linktype?: 'story' | 'url' | 'email' | 'asset'
  story?: { name?: string; full_slug?: string; uuid?: string }
}

/**
 * Extracts a usable href from a Storyblok `multilink` field. Accepts
 * `cached_url` first (the editor-friendly short path), then `url`, then
 * `email` (prefixed with `mailto:` if not already). Returns an empty string
 * for unset or empty links so callers can pass it straight to `href` without
 * a nullish check.
 */
export function multilinkHref(link?: StoryblokMultilink | null): string {
  if (!link) return ''
  if (link.cached_url) return link.cached_url
  if (link.url) return link.url
  if (link.email) return link.email.startsWith('mailto:') ? link.email : `mailto:${link.email}`
  return ''
}
