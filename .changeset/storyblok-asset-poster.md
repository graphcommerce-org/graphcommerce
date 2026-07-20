---
'@graphcommerce/storyblok-ui': minor
'@graphcommerce/image': minor
---

Let a Storyblok video asset show a poster.

A `<video>` paints nothing until it has buffered enough for its first frame, and nothing at all when autoplay is blocked (iOS Low Power Mode) — so an autoplaying video banner starts out black, and can stay black. `Asset` now takes a `poster` prop, rendered as `<video poster>`.

Storyblok's own `type: asset` has no room for a poster, so `assetWithPoster()` is added to read the convention of an asset value carrying an extra `poster` key:

```jsonc
{ "fieldtype": "asset", "id": 1, "filename": "…", "poster": { "filename": "…" } }
```

Keeping the poster beside the asset rather than nesting both under a wrapper means a custom field type storing that shape is a drop-in for a plain asset field: existing content stays valid and `value.filename` keeps working for consumers that ignore the poster. The narrowing is unavoidable — Storyblok has no JSONSchema for custom field types, so its type generator emits `unknown` for them.

```tsx
const { asset, poster } = assetWithPoster(blok.asset)
return asset && <Asset asset={asset} poster={poster} />
```

`@graphcommerce/image` gains `imageUrl(src, { width, quality })`, which builds an optimized URL outside of a React tree — for the places that need a bare URL string rather than an `<Image>`, such as `<video poster>`, a CSS `background-image` or an `og:image`. It routes through the configured loader exactly like `<Image>` does, so the bytes are served and cached by your own deployment rather than fetched from the origin host by every visitor, which matters when the origin meters bandwidth. `width` is snapped up to the nearest configured size, since the optimizer rejects any width outside `imageSizes`/`deviceSizes`.
