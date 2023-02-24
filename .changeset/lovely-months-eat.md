---
'@graphcommerce/docs': minor
'@graphcommerce/magento-graphcms': minor
'@graphcommerce/framer-next-pages-example': minor
'@graphcommerce/framer-scroller-example': minor
'@graphcommerce/image-example': minor
'@graphcommerce/magento-payment-braintree': minor
'@graphcommerce/changeset-changelog': minor
'@graphcommerce/eslint-config-pwa': minor
'@graphcommerce/next-config': minor
---

Upgraded to Next.js 13

- NextLink integrates the next/link functionality with @mui/material's Link and ButtonBase (and all it's derivatives) components.
- NextLink automatically adds `target="_blank"` when the href is external.
- NextLink makes all relative href absolute. `href="my-page"` will be rendered as `href="/my-page"`.

Upgrade instructions: https://www.graphcommerce.org/docs/framework/links#upgrading-from-nextjs-12
