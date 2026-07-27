---
'@graphcommerce/magento-graphql': patch
---

Relax `PlaceOrderOutput.errors` to nullable in the unified schema. Magento 2.4.9 / MageOS 3.2.0 changed the field from `[PlaceOrderError]!` to `[PlaceOrderError]` and returns `null` when the order is placed successfully, so a storefront configured with `magentoVersion` < 249 talking to a 2.4.9 backend failed every successful order with `Cannot return null for non-nullable field PlaceOrderOutput.errors.`
