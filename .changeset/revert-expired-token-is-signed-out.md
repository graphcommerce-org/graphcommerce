---
'@graphcommerce/magento-customer': patch
---

Revert "Treat an expired customer token as signed out": `loggedIn` is true while a customer token exists. During an open sign-in, `customerLink` makes the requests that need the customer wait.
