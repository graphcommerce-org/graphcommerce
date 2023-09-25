---
'@graphcommerce/magento-cart': patch
---

Call assignCurrentCartId after the merge of the guest cart into the customer cart.

1. When a shopper is logging in on the checkout page the customers cart_id is assigned before the carts are merged.
2. The assignment of the customer’s cart id retriggers the ShippingPage query, running it before the UseMergeCustomerCart mutation.
3. The UseMergeCustomerCart doesn’t actually loads any data from the cart it’s self, so the changes to the cart aren’t reflected in the ShippingPage query.
4. By first merging the cart and then running assignCurrentCartId the ShippingPage query is run after the UseMergeCustomerCart and therefor having the correct information.
