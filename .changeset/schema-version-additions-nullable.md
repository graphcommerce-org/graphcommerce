---
'@graphcommerce/magento-graphql': patch
---

Make every field the `schema-<version>` backfills add to an existing type
nullable. These folders are layered onto an older Magento backend that does not
have the field, so it can never produce a value: a non-null declaration made
codegen emit a required property (breaking `getStoreConfig` in
`algolia-products` with "Type 'StoreConfig' is missing the following properties
… and 15 more" on a 2.4.7 backend) and, worse, would nullify the whole parent
object at runtime because a non-null field resolving to null propagates upward.
Brand-new types keep their original nullability.
