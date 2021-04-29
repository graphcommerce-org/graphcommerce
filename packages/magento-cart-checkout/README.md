# Magento Cart Checkout

The default implementation of the GraphCommerce checkoutprocess.

- All Pages
- Cart Page
- Shipping Page
- Payment Page
- Success Page

```graphql
fragment AllPagesFragment on Cart {
  id
}
fragment CartPageLoad on Cart {
  ...Items
  ...Coupon
  ...Totals
}
fragment ShippingPageLoad on Cart {
  ...Email
  ...ShippingAddress
  ...ShippingMethod
}
fragment PaymentPageLoad on Cart {
  ...PaymentMethods
  ...Coupon
  ...ReviewItems
}
```

```graphql
fragment Coupon on Cart {}
fragment CouponApplied on Cart {}
fragment CouponRemoved on Cart {
  ...Coupon
  ...Totals
  ...ItemPrices
}
```

- `pages/**`
  - `packages/magento-cart`
- `pages/cart`
  - `packages/magento-cart`
  - `packages/magento-coupon`
- `pages/checkout`
  - `packages/magento-cart-shipping-address`
  - `packages/magento-cart-shipping-method`
- `pages/checkout/payment`
  - `packages/magento-payment-method`
  - `packages/magento-coupon`

```

```
