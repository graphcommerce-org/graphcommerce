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
 * Extracts a usable href from a Storyblok `multilink` field. Accepts the
 * resolved story slug first, then `cached_url` (the editor-friendly short
 * path), then `url`, then `email` (prefixed with `mailto:` if not already).
 * Returns an empty string for unset or empty links so callers can pass it
 * straight to `href` without a nullish check.
 *
 * A `story` multilink carries the target twice, and only one of the two is
 * current:
 *
 * - `cached_url` is the target's `full_slug` as it was when the *referencing*
 *   story was last published. Renaming the target does not rewrite it in
 *   already-published content, so it keeps producing the old (now 404ing) URL
 *   until an editor re-publishes every story that links to the renamed one.
 * - `story.full_slug` is injected by `@storyblok/react` from the `links` map
 *   the CDN builds from the live story index on every request. `sbParams`
 *   sends `resolve_links: 'story'` on all reads, so it is populated for story
 *   links and always reflects the target's current slug.
 *
 * Preferring the resolved slug makes story links self-healing across renames.
 * Other link types (`url` / `email` / `asset`) have no resolved story and fall
 * through unchanged.
 */
export function multilinkHref(link?: StoryblokMultilink | null): string {
  if (!link) return ''
  if (link.linktype === 'story' && link.story?.full_slug) return link.story.full_slug
  if (link.cached_url) return link.cached_url
  if (link.url) return link.url
  if (link.email) return link.email.startsWith('mailto:') ? link.email : `mailto:${link.email}`
  return ''
}
