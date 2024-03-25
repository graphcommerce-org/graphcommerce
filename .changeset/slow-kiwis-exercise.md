---
'@graphcommerce/magento-product-configurable': patch
'@graphcommerce/magento-product': patch
'@graphcommerce/next-config': patch
'@graphcommerce/lingui-next': patch
'@graphcommerce/next-ui': patch
'@graphcommerce/docs': patch
---

Allow Lingui to use linguiLocale with country identifiers like `en-us`, it would always load `en` in this case. Introced a new `useLocale` hook to use the correct locale string to use in Intl methods.
