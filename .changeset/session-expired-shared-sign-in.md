---
'@graphcommerce/magento-customer': patch
---

Each request that needs the customer during an expired customer session waits for one sign-in: a request that Magento rejects, and a private query with `loggedIn`. After the sign-in, `customerLink` sends it with the new token. After a dismiss, it returns "You must be signed in to continue". A customer token that an earlier page saved with `valid: false` is sent again, so the sign-in opens on the first request.
