---
'@graphcommerce/magento-customer': patch
---

Solve issue where the user is getting a 400 error when logging in because the password is not being sent. The password field was disabled before the form was submitted, causing the password not to be sent.
