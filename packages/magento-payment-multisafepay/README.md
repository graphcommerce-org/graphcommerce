# MultiSafePay

## Requirements

- MultiSafePay Magento module: https://github.com/MultiSafepay/magento2
- MultiSafePay Magento GraphQL module:
  https://github.com/MultiSafepay/magento2-graphql

## Installation

1.  Find current version of your `@graphcommerce/magento-cart-payment-method` in
    your package.json.
2.  `yarn add @graphcommerce/magento-payment-multisafepay@1.2.3` (replace 1.2.3
    with the version of the step above)
3.  In Magento: Sales -> MultiSafePay -> General Settings -> Advanced Settings
    (this should be configured per storeview)
    - _Use custom return urls for PWA storefront integration_: Yes
    - _Custom redirect url after cancelling the payment_:
      `https://$domain/$locale/checkout/payment?locked=1&success=0&cart_id={{quote.masked_id}}&method={{payment.code}}&order_number={{order.increment_id}}`
    - _Custom "Success page" url_:
      `https://$domain/$locale/checkout/payment?locked=1&success=1&cart_id={{quote.masked_id}}&method={{payment.code}}&order_number={{order.increment_id}}`
