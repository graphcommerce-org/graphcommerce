---
'@graphcommerce/magento-product': patch
---

Solve issue when a user applies their first filter on a category page, a redundant GraphQL call would be made, even though the user was navigating to the `/c/[..url]` route.
