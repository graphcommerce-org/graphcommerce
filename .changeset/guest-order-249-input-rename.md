---
'@graphcommerce/magento-customer': patch
'@graphcommerce/magento-graphql': patch
---

Support the Magento 2.4.9 guest-order lookup, which renamed the `guestOrder` argument type `OrderInformationInput` → `GuestOrderInformationInput` and swapped the `postcode` lookup field for `lastname`. The `GuestOrder` query and the guest order form now use the new type/field, and `schema-249` re-declares `guestOrder(input: GuestOrderInformationInput!)` so operations keep validating on older backends via the mesh version shim.
