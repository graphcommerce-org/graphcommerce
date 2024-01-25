---
'@graphcommerce/magento-cart-email': minor
'@graphcommerce/magento-customer': minor
---

---

'@graphcommerce/magento-cart-email': minor '@graphcommerce/magento-customer': minor

---

Added a new `enableGuestCheckoutLogin` configuration: During customer login, GraphCommerce queries Magento to determine whether the customer account already exists or not. If not, the sign-up form is shown instead.

To restore previous behavior, set `enableGuestCheckoutLogin` to true. For Magento versions, 2.4.7, 2.4.6-p1 and up, 2.4.5-p3 and up, 2.4.4-p4 and up, the following setting must be set to Yes: `Stores -> Configuration -> Sales -> Checkout -> Checkout Options -> Enable Guest Checkout Login`
