---
'@graphcommerce/next-config': patch
---

Fix plugin interceptor resolution for components exported via a non-aliased re-export.

The interceptor scanner (`findOriginalSource`) only inspected an export specifier's `exported` field, which SWC leaves `null` for a non-aliased re-export such as `export { Image }` (the name lives in `orig`; `exported` is only populated by an aliased `export { Foo as Image }`). As a result, any component re-exported without an alias — e.g. `Image` from `@graphcommerce/image` — could not be targeted by a plugin and failed with "Plugin target not found". The scanner now falls back to `orig` when `exported` is absent.
