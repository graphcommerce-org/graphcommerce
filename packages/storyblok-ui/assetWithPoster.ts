import type { StoryblokAssetData } from './types'

export type AssetWithPoster = {
  asset: StoryblokAssetData | undefined
  /** Only meaningful when `asset` is a video; see `Asset`'s `poster` prop. */
  poster: StoryblokAssetData | undefined
}

/**
 * A usable `filename` is the only thing `StoryblokAssetData` actually requires,
 * and the only thing an empty asset field lacks — Storyblok stores that as an
 * object with a null `filename` rather than as null. So this checks exactly
 * that and passes the value through whole, rather than projecting it onto a
 * subset: `focus`, `width`, `title` and the rest have to survive for consumers
 * that read them.
 */
function coerceAsset(value: unknown): StoryblokAssetData | undefined {
  if (typeof value !== 'object' || value === null) return undefined
  const asset = value as StoryblokAssetData
  return typeof asset.filename === 'string' && asset.filename !== '' ? asset : undefined
}

/**
 * Narrow an asset field's value into an asset and an optional poster.
 *
 * A video shows nothing until it has buffered enough to paint its first frame,
 * and nothing at all when autoplay is blocked (iOS Low Power Mode) — so a
 * video-bearing asset field wants a still alongside it. Storyblok's own
 * `type: asset` has no room for one, so this reads the convention of an asset
 * value carrying an extra `poster` key:
 *
 * ```jsonc
 * { "fieldtype": "asset", "id": 1, "filename": "…", "poster": { "filename": "…" } }
 * ```
 *
 * Keeping the poster *beside* the asset rather than nesting both under a
 * wrapper is what makes such a field a drop-in for a plain `type: asset`:
 * existing content stays valid and `value.filename` keeps working for consumers
 * that ignore the poster. A field type storing that shape can therefore replace
 * an asset field without a content migration.
 *
 * The narrowing is unavoidable: Storyblok has no JSONSchema for custom field
 * types, so its type generator emits `unknown` for them no matter how the value
 * is shaped.
 *
 * @example
 * ```tsx
 * const { asset, poster } = assetWithPoster(blok.asset)
 * return asset && <Asset asset={asset} poster={poster} />
 * ```
 */
export function assetWithPoster(value: unknown): AssetWithPoster {
  if (typeof value !== 'object' || value === null) return { asset: undefined, poster: undefined }
  const v = value as Record<string, unknown>
  return { asset: coerceAsset(v), poster: coerceAsset(v.poster) }
}
