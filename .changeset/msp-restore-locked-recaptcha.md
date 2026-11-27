---
'@graphcommerce/magento-payment-multisafepay': patch
---

`MSPRestoreLocked` renders `ApolloErrorSnackbar` only for an error of the cart restore. `MSPRestoreLocked` is on every page, and the `googlerecaptcha` plugin on `ApolloErrorSnackbar` loads reCAPTCHA, so each page loaded reCAPTCHA.
