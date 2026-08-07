---
'@graphcommerce/storyblok-ui': patch
---

Make Storyblok cache-version refreshes push-based instead of polled.

- `requestStoryblokCacheVersionRefresh()` now publishes a renew signal through the Next.js incremental cache, so every server sharing a `cacheHandler` sees it. It previously only flipped a flag in the process that handled the webhook, leaving the other servers to discover the change through `storyblok.cacheVersionTtl`.
- Servers read that signal before a published read, throttled to once a second, and fetch the current cache-version only when it has moved past the one they last applied. Where the signal cannot be delivered — serverless, development, a cache handler that does not share state — the TTL still applies.
- `storyblok.cacheVersionTtl` defaults to `3600` instead of `60`, since it is now a failsafe rather than the refresh mechanism. It cannot be disabled entirely. Deployments on Next's default `FileSystemCache` need `cacheMaxMemorySize: 0` for the signal to cross processes.
