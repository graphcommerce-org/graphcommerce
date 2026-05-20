---
'@graphcommerce/next-ui': minor
'@graphcommerce/demo-magento-graphcommerce': patch
---

Add `YoutubeEmbed` component — a lightweight lazy-loading YouTube player that
defers iframe creation until the user clicks the poster. Uses preconnect on
hover for fast playback start and is styled with MUI sx, so no external CSS is
required. Supports playlists, no-cookie mode, custom aspect ratios and ad-network
preconnect hints.

Showcase: `demo-magento-graphcommerce` adds `pages/test/youtube-embed.tsx`
demonstrating default, custom aspect, playlist + cookie, and muted +
maxresdefault variants, plus a link to it from the `/test` overview.
