---
'@graphcommerce/docs': major
'@graphcommerce/magento-graphcms': major
'@graphcommerce/framer-next-pages-example': major
'@graphcommerce/framer-scroller-example': major
'@graphcommerce/image-example': major
'@graphcommerce/magento-payment-braintree': major
'@graphcommerce/changeset-changelog': major
'@graphcommerce/eslint-config-pwa': major
'@graphcommerce/next-config': major
---

Upgraded to Next.js 13

- NextLink integrates the next/link functionality with @mui/material's Link and ButtonBase (and all it's derivatives) components.
- NextLink automatically adds `target="_blank"` when the href is external.
- NextLink makes all relative href absolute. `href="my-page"` will be rendered as `href="/my-page"`.
