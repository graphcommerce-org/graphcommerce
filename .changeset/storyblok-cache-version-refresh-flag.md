---
'@graphcommerce/storyblok-ui': patch
---

Add `requestStoryblokCacheVersionRefresh()` and stop the cache-version refresh from logging a spurious "apiPlugin not loaded" warning.

On-demand revalidation (e.g. a cache-notify webhook) previously had to call `refreshStoryblokCacheVersion()`, which calls `getStoryblokApi()`. In a context where `storyblokInit` has not run — such as a serverless API route that never rendered a page — that logs "You can't use getStoryblokApi if you're not loading apiPlugin." The new `requestStoryblokCacheVersionRefresh()` only flips a flag that the next published read consumes, so it never touches the Storyblok client and never logs the warning. In a shared-process deployment (Kubernetes) the page regeneration that follows picks it up immediately; on serverless, freshness falls back to the `storyblok.cacheVersionTtl` interval.

`refreshStoryblokCacheVersion()` is removed — replace any direct calls with `requestStoryblokCacheVersionRefresh()`.
