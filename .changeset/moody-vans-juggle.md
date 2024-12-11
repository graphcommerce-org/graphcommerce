---
'@graphcommerce/ecommerce-ui': patch
---

The `<WaitForQueries/>` component now uses the `useIsSSR` hook which prevents loading spinners when navigating on the client, which make all account/cart/checkout pages faster.
