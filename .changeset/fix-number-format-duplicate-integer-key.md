---
'@graphcommerce/next-ui': patch
---

Fix duplicate React key warning in `<NumberFormat>` / `<CurrencyFormat>` / `<Money>` for numbers with a thousands group separator. `Intl.NumberFormat.formatToParts()` emits multiple parts with `type: "integer"` (one per group, e.g. `1.234,56` produces two `integer` parts). Using `key={part.type}` therefore collided. Switched to an index key — parts are already wrapped in `suppressHydrationWarning`, so SSR/client divergence isn't an issue.
