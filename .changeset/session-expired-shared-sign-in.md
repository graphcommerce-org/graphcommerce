---
'@graphcommerce/magento-customer': patch
---

Each request that fails in an expired customer session waits for one sign-in. After the sign-in, `customerLink` sends the request again with the new token. After a dismiss, the request returns "You must be signed in to continue".
