---
'@graphcommerce/magento-cart-shipping-address': patch
---

When a Customer deselected their shipping address, but had a shipping note filled in it would try to submit the form causing an error. By making the customer_address_id field required we prevent this.
