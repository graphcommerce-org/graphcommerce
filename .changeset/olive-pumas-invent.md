---
'@graphcommerce/magento-cart-payment-method': patch
---

Allow payment handlers to add query parameters to the success page: the context's `onSuccess` takes an optional second argument that is merged into the success URL's query.

Without it, a handler that needs an extra parameter on the success page — a "payment is still being confirmed" flag, for instance — has to navigate there itself, which skips `onSuccess`'s first step and silently drops purchase tracking and any plugin hanging off it.

The extra query is merged after `order_number` and `cart_id`, so a handler holding a more reliable cart id (one whose cart the context has already lost) can pass its own.
