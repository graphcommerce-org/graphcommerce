---
'@graphcommerce/next-ui': patch
---

The `filterNonNullable` method would collapse TypeScript unions because of the `Simplify<>` helper, this is now omitted retulting in working unions.
