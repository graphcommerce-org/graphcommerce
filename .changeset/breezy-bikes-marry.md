---
'@graphcommerce/magento-graphcms': patch
'@graphcommerce/ecommerce-ui': patch
'@graphcommerce/framer-next-pages': patch
'@graphcommerce/magento-cart': patch
'@graphcommerce/magento-cart-payment-method': patch
'@graphcommerce/magento-customer': patch
'@graphcommerce/next-ui': patch
'@graphcommerce/react-hook-form': patch
---

Moved `ApolloErrorAlert`, `ApolloErrorFullPage` and `ApolloErrorSnackbar` to the
ecommerce-ui package.

Created `ComposedSubmitButton` and `ComposedSubmitLinkOrButton` to reduce
complexity from `magento-graphcms` example.

Removed dependency an `@graphcommerce/react-hook-form` from `magento-graphcms`
example.

Added dependency `@graphcommerce/ecommerce-ui` from `magento-graphcms` example.
