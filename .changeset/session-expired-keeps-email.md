---
'@graphcommerce/magento-customer': patch
---

The session-expired form shows the email of the sign-in after a cache migration. The `CustomerToken` holds the `email` of the sign-in, and `migrateCustomer` copies it with the token. A shop that writes `CustomerTokenDocument` with an object literal must add `email`.
