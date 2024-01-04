# Upgrading from GraphCommerce 6 to 7

Depending on the amounts of customisations you've made, there are some manual
steps. Please follow the regular [upgrade steps first](./readme.md).

1. [`legacyProductRoute` is removed](#legacyproductroute-is-removed)
2. [Upgrading your Hygraph schema](#upgrading-your-hygraph-schema)

## `legacyProductRoute` is removed

🟠 Only required if you've used the legacyProductRoute

Remove all `/pages/product/*` routes.

## Upgrading your Hygraph schema

Upgrade your Hygraph schema with the [Hygraph migration cli](../hygraph/cli.md).
Select `graphcommerce7to8` as version.
