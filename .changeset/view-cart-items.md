---
'@graphcommerce/google-datalayer': patch
---

`view_cart` contains the items of the cart. The `CartStartCheckout` plugin read the items from its props instead of `props.cart`, and sent the event before the cart had loaded.
