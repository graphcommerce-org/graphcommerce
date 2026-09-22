---
'@graphcommerce/magento-cart': patch
'@graphcommerce/magento-compare': patch
---

Move `CurrentCartId.graphqls` from `magento-compare` to `magento-cart`, so the cart no longer needs the compare package to get its own schema.

`@graphcommerce/magento-compare` shipped `schema/CurrentCartId.graphqls`, but everything in that file belongs to the cart: `Query.currentCartId`, the `CurrentCartId` type and `RegisterCartIdInput`. `@graphcommerce/magento-cart` had no `schema/` directory at all, even though `magento-cart/hooks/CurrentCartId.graphql` queries `currentCartId @client`.

The mesh only reads `*/schema/**/*.graphqls`, so the cart only got its schema when `magento-compare` happened to be installed. Compare looks optional — all of its plugins are behind `ifConfig: 'compare'` — but removing it broke codegen, with an error pointing at a package you did not touch:

```
✖ File node_modules/@graphcommerce/magento-cart/hooks/CurrentCartId.graphql
  caused error: Unable to find field "currentCartId" on type "Query"!
```

The file now lives in `magento-cart/schema/`. `magento-compare/schema/` keeps `CurrentCompareUid.graphqls`, which really is its own.
