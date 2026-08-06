---
'@graphcommerce/storyblok-ui': patch
---

Cut the number of Storyblok CDN requests a storefront makes.

- `refreshStoryblokCacheVersion()` now actually advances the pinned cache-version. It requested `cdn/spaces/me` and relied on `storyblok-js-client` to pick the new version up, but that client only advances the pin from a response carrying a top-level `cv`, while `cdn/spaces/me` answers with `{ space: { version } }` — so the pin never moved and the request was pure overhead. The version is now read and applied explicitly, and the client's response cache is flushed when it changed.
- `fetchStory()` resolves unknown slugs from a cached slug index instead of asking the CDN. A storefront's catch-all route probes the CMS for every URL it is asked about before falling back, so crawlers and vulnerability scanners walking made-up URLs each cost a request — unbounded, and impossible to dedupe per slug because every made-up URL is new. One `cdn/links` request per cache-version now lists every published slug in the space (~300 bytes per story, 1000 per request), and any slug outside it is answered as "not found" without a request. The index is dropped as soon as the cache-version moves, so a newly published story becomes resolvable immediately. Draft/preview reads and development skip it, and when the index is unavailable (request failed, or a space larger than 10 000 stories) lookups fall back to the CDN unchanged — it never reports an existing story as missing.
- `getStoryblokStaticPaths()` requests `excluding_fields: 'body'`. It only uses `full_slug`, and the content sitemap that calls it runs in `getServerSideProps`, so it re-downloaded every story body on every crawler hit.
