---
'@graphcommerce/docs': patch
'@graphcommerce/magento-graphcms': patch
'@graphcommerce/ecommerce-ui': patch
'@graphcommerce/framer-next-pages-example': patch
'@graphcommerce/framer-next-pages': patch
'@graphcommerce/framer-scroller-example': patch
'@graphcommerce/framer-scroller': patch
'@graphcommerce/framer-utils': patch
'@graphcommerce/googleanalytics': patch
'@graphcommerce/googlerecaptcha': patch
'@graphcommerce/googletagmanager': patch
'@graphcommerce/graphcms-ui': patch
'@graphcommerce/graphql': patch
'@graphcommerce/graphql-mesh': patch
'@graphcommerce/image-example': patch
'@graphcommerce/image': patch
'@graphcommerce/lighthouse': patch
'@graphcommerce/lingui-next': patch
'@graphcommerce/magento-cart': patch
'@graphcommerce/magento-cart-billing-address': patch
'@graphcommerce/magento-cart-checkout': patch
'@graphcommerce/magento-cart-coupon': patch
'@graphcommerce/magento-cart-email': patch
'@graphcommerce/magento-cart-items': patch
'@graphcommerce/magento-cart-payment-method': patch
'@graphcommerce/magento-cart-pickup': patch
'@graphcommerce/magento-cart-shipping-address': patch
'@graphcommerce/magento-cart-shipping-method': patch
'@graphcommerce/magento-category': patch
'@graphcommerce/magento-cms': patch
'@graphcommerce/magento-customer': patch
'@graphcommerce/magento-customer-account': patch
'@graphcommerce/magento-customer-order': patch
'@graphcommerce/magento-graphql': patch
'@graphcommerce/magento-newsletter': patch
'@graphcommerce/magento-payment-braintree': patch
'@graphcommerce/magento-payment-included': patch
'@graphcommerce/magento-payment-klarna': patch
'@graphcommerce/magento-product': patch
'@graphcommerce/magento-product-bundle': patch
'@graphcommerce/magento-product-configurable': patch
'@graphcommerce/magento-product-downloadable': patch
'@graphcommerce/magento-product-grouped': patch
'@graphcommerce/magento-product-simple': patch
'@graphcommerce/magento-product-virtual': patch
'@graphcommerce/magento-review': patch
'@graphcommerce/magento-search': patch
'@graphcommerce/magento-store': patch
'@graphcommerce/mollie-magento-payment': patch
'@graphcommerce/next-ui': patch
'@graphcommerce/react-hook-form': patch
'@graphcommerce/eslint-config-pwa': patch
'@graphcommerce/graphql-codegen-near-operation-file': patch
'@graphcommerce/graphql-codegen-relay-optimizer-plugin': patch
'@graphcommerce/next-config': patch
---

Upgraded to [NextJS 12.1](https://nextjs.org/blog/next-12-1)! This is just for
compatibility, but we'll be implementing
[On-demand Incremental Static Regeneration](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta)
soon.

This will greatly reduce the requirement to rebuid stuff and we'll add a
management UI on the frontend to be able to revalidate pages manually.
