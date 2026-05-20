---
'@graphcommerce/next-ui': minor
'@graphcommerce/magento-product': minor
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
