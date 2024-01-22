---
'@graphcommerce/magento-customer': patch
'@graphcommerce/magento-cart': patch
---

Added a new 'Session expired' dialog that is shown when a GraphQL query or mutation returns a `graphql-authorization` error. This error is returned when the user's session has expired. The dialog allows the user to sign in again and then the query or mutation is re-executed.
