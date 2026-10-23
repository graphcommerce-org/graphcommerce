import { storyblokEditable as storyblokEditableBase, type SbBlokData } from '@storyblok/react'

/**
 * Wrapper around the upstream `storyblokEditable` that accepts auto-generated Storyblok content
 * types. The generated types declare `[k: string]: unknown` whereas `SbBlokData` requires a
 * narrower index signature, so a direct call wouldn't type-check; at runtime the helper only reads
 * `_editable`, making the cast safe.
 */
export function storyblokEditable(blok: { [key: string]: unknown } | undefined | null) {
  if (!blok) return {}
  return storyblokEditableBase(blok as unknown as SbBlokData)
}
