---
'@graphcommerce/storyblok-ui': patch
---

Make Storyblok cache-version refreshes push-based instead of polled.

`requestStoryblokCacheVersionRefresh()` — what a cache-notify webhook calls when a story is published — only flipped a flag in the process that happened to receive the webhook. Every other server had no way of learning that anything changed, so the only thing keeping them fresh was `storyblok.cacheVersionTtl`, which re-fetched `cdn/spaces/me` per server per interval. At the previous 60 second default that is one request per minute per replica forever, whether or not anything is ever published: roughly 450 000 requests a month on a ten-replica deployment, purely as a safety net.

The refresh now fans out over a shared file. The webhook writes a timestamp to `renew-all-pages-query.txt` — the same signal file the SSR Apollo client convention already reads, so one publish invalidates both caches — and every server compares it against the last value it acted on before a published read. That read is a handful of bytes off the filesystem, never an API request, and it is throttled to once a second. A replica that sees a newer signal fetches the current cache-version once and pins it.

- New `storyblok.cacheVersionSignalDir` config points at the directory holding that file. It defaults to `./tmp` to match the existing convention, which resolves inside each container — a multi-replica deployment has to point it at a shared volume for the signal to fan out at all. `renewSignalPath()` is exported so a project's `graphqlSsrClient` can read the same file without hardcoding the path twice.
- `storyblok.cacheVersionTtl` now defaults to `3600` instead of `60`. It is no longer what keeps content fresh, only what bounds staleness when the signal cannot be delivered (serverless, local development, a directory that is not shared). It is deliberately still applied rather than disabled, so a misconfigured webhook degrades to stale content instead of frozen content.
- Nothing changes for draft, preview or development reads, which already send a fresh `cv` per request.
