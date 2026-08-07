---
'@graphcommerce/storyblok-ui': patch
---

Cut the number of Storyblok CDN requests a storefront makes.

- `refreshStoryblokCacheVersion()` now reads the cache-version from `cdn/spaces/me` and applies it explicitly, flushing the client's response cache when it changed. It previously relied on `storyblok-js-client` picking the version up, which that client only does from a response carrying a top-level `cv`.
- `fetchStory()` answers unknown slugs from a cached slug index instead of asking the CDN. One `cdn/links` request per cache-version lists every published slug in the space; a slug outside it is reported as not found without a request. The index is dropped as soon as the cache-version moves. Draft and preview reads and development skip it, and lookups fall back to the CDN when the index is unavailable, so an existing story is never reported as missing.
- `getStoryblokStaticPaths()` requests `excluding_fields: 'body'`; it only reads `full_slug`.
