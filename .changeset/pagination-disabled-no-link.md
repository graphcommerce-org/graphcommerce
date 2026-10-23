---
'@graphcommerce/next-ui': patch
---

Only render disabled pagination items as links when enabled. Disabled `PaginationItem`s no longer receive a `component`/`href`, preventing crawlers from following links to an infinite number of list pages and inflating the static page cache.
