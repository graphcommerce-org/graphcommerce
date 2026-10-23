---
'@graphcommerce/graphql-mesh': patch
---

Fix multipart file uploads through the mesh returning "Unable to parse the request." in `next dev` (turbopack). `customFetch` used `globalThis.fetch` (undici) inside Next, while `@graphql-tools/executor-http` builds upload bodies with `FormData` from `@whatwg-node/fetch`. In `next dev`, `@whatwg-node/fetch` is evaluated while `next.config.ts` loads — before any `__NEXT` global exists — so its Next.js detection fails and it exports its ponyfills. Undici doesn't recognize the ponyfill `FormData` and stringified the request body to the literal `[object Object]`. `customFetch` now always uses the fetch exported by `@whatwg-node/fetch`, which is `globalThis.fetch` whenever the native path is active and the matching ponyfill fetch otherwise, so fetch and `FormData` always come from the same implementation family.
