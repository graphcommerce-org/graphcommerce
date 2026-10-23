---
'@graphcommerce/storyblok-ui': patch
---

Refresh the pinned Storyblok cache-version (`cv`) on a TTL so published content no longer stays frozen on long-lived servers.

`storyblok-js-client` pins the space `cv` per process on the first published request and never refreshes it (its `cache.clear` defaults to `'manual'`), so published edits only became visible after a process restart — on a multi-pod deployment this could mean content not updating for a long time. `fetchStory`, `fetchStories` and `fetchAllStories` now call the new `refreshStoryblokCacheVersion()` before published reads, which re-fetches `cdn/spaces/me` at most once per the new `storyblok.cacheVersionTtl` config (seconds, default 60; 0 refreshes on every read) to advance the pinned `cv`. Skipped for preview/draft and in development. The helper is exported so on-demand revalidation (e.g. a cache-notify webhook) can force an immediate refresh.
