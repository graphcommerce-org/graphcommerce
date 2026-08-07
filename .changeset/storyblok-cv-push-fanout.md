---
'@graphcommerce/storyblok-ui': patch
'@graphcommerce/graphql': patch
---

Make cache invalidation push-based, over one signal shared by every per-process cache.

- New `publishRenewSignal()` / `renewSignal()` / `refreshRenewSignal()` in `@graphcommerce/graphql` carry a "content was published" timestamp through the Next.js incremental cache, so it reaches every server sharing a `cacheHandler`. `renewSignal()` is synchronous and returns the last read value, or `undefined` when it has not been read yet; callers treat that as unknown rather than as "nothing published".
- `requestStoryblokCacheVersionRefresh()` publishes that signal instead of only flipping a flag in the process that handled the webhook. Servers read it before a published read and re-fetch the Storyblok cache-version only when it moved past the one they last applied.
- `graphqlSsrClient()` in the examples drops its per-locale client on the same signal, replacing the `./tmp/renew-all-pages-query.txt` file it read before. That path resolves inside each container, so it never invalidated anything on a multi-replica deployment.
- `storyblok.cacheVersionTtl` defaults to `3600` instead of `60`, as a failsafe for deployments where the signal cannot be delivered. It cannot be disabled entirely. Deployments on Next's default `FileSystemCache` need `cacheMaxMemorySize: 0` for the signal to cross processes.
