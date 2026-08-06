---
'@graphcommerce/storyblok-ui': patch
---

Cut the number of Storyblok CDN requests a storefront makes.

- `refreshStoryblokCacheVersion()` now actually advances the pinned cache-version. It requested `cdn/spaces/me` and relied on `storyblok-js-client` to pick the new version up, but that client only advances the pin from a response carrying a top-level `cv`, while `cdn/spaces/me` answers with `{ space: { version } }` — so the pin never moved and the request was pure overhead. The version is now read and applied explicitly, and the client's response cache is flushed when it changed.
- `fetchStory()` remembers 404 lookups for one cache-version interval. The client only caches successful responses, so a storefront that probes the CMS for every category URL before falling back (the usual catch-all pattern) hit the API on every render for slugs that never have a story. Draft/preview reads and development bypass the negative cache, and only a genuine 404 is remembered — network or auth failures stay retryable.
- `getStoryblokStaticPaths()` requests `excluding_fields: 'body'`. It only uses `full_slug`, and the content sitemap that calls it runs in `getServerSideProps`, so it re-downloaded every story body on every crawler hit.
