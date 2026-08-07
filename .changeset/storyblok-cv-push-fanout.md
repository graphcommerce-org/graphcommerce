---
'@graphcommerce/storyblok-ui': patch
'@graphcommerce/graphql': patch
---

Publishing content now pushes a renew signal through the Next.js incremental cache, so every server invalidates at once instead of each polling `cdn/spaces/me` on a 60 second interval — `storyblok.cacheVersionTtl` therefore defaults to `3600` as a failsafe.
