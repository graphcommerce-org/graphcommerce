---
'@graphcommerce/magento-cart-payment-method': patch
---

Solve issue where the Place order button would remain in a loading state because the back/forward cache of chrome started working for the checkout and thus React's state would not be reset, thinking we were still exiting the page.
