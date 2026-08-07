---
'@graphcommerce/storyblok-ui': patch
---

Cut the number of Storyblok CDN requests a storefront makes: the pinned cache-version now actually advances, unknown slugs are answered from a cached slug index instead of one request each, and `getStoryblokStaticPaths()` no longer downloads story bodies.
