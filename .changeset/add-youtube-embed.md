---
'@graphcommerce/next-ui': minor
'@graphcommerce/magento-product': minor
'@graphcommerce/misc': patch
---

Add `YoutubeEmbed` component — a lightweight lazy-loading YouTube player that
defers iframe creation until the user clicks the poster. Uses preconnect on
hover for fast playback start and is styled with MUI sx, so no external CSS is
required. Supports playlists, no-cookie mode, custom aspect ratios and ad-network
preconnect hints.

`ProductVideo` (used by `ProductPageGallery`) now delegates YouTube playback
to `YoutubeEmbed`, so any product whose Magento `media_gallery` contains a
YouTube video entry gets the new lazy-loading player on its product page.
Vimeo and self-hosted video paths are unchanged. The Magento preview image is
passed as the YoutubeEmbed `thumbnail` so the visible poster stays consistent
with the rest of the gallery.

Fix `SidebarGallery` so it forwards the `Additional` and `slotProps` from
each image to `MotionImageAspect`. Before this fix the gallery silently
dropped both props, which meant any `Additional` overlay configured by
`ProductPageGallery` (the `<ProductVideo>` overlay with its `PlayCircle` and
the new `YoutubeEmbed`) never reached the DOM. That was a latent regression
that made all video-gallery entries render as static images, with or without
this PR's YouTube changes.

Fix `playwright.config.ts` so `npx playwright test` actually loads. The
config previously imported `examples/magento-graphcms/next.config.ts`, which
transitively pulled `@graphcommerce/next-config`'s ESM build into a CJS
context and crashed with `ReferenceError: exports is not defined`. Replaced
with an opt-in `PLAYWRIGHT_LOCALES` env var for the multi-locale projects
that the next.config import was meant to drive.
