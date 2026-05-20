---
'@graphcommerce/next-config': patch
---

`graphcommerce cleanup-interceptors` now actually finds and restores `.original.tsx` / `.original.ts` files when run from a consumer project. Previously `findDotOriginalFiles` walked up looking for a `@graphcommerce/*` parent package; from a consumer project (where there is no such parent) `parentPath` ended up `null` and the glob expanded to literally `null/**/*.original.tsx`, so the command silently restored nothing. Now it falls back to `cwd` and `cwd/node_modules/@graphcommerce` where interceptors actually live for consumers.

Also fixes a display bug — the final `X files restored from .original` line printed an always-`0` counter (`restoredCount` was declared but never incremented; the now-removed `removedCount` was the one being incremented). Counter and message are now consistent.
