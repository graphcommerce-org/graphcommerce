---
'@graphcommerce/magento-customer': patch
---

Each request that needs the customer during an expired customer session waits for one sign-in: a rejected mutation, a private query with `loggedIn`, and a query that fails without the token. A rejected guest query, such as the reCAPTCHA config of the sign-in form, is sent again at once without the token. After the sign-in, `customerLink` sends the waiting requests with the new token. After a dismiss, they return "You must be signed in to continue". A customer token that an earlier page saved with `valid: false` is sent again, so the sign-in opens on the first request.
