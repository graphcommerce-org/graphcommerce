---
"@graphcommerce/next-ui": patch
---

Added useIsSSR hook that will properly resolve when the page is rendered on the server and on first render, but will return false when a component is rendered on the client directly.
