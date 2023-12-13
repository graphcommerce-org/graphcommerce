# Magento Payment Adyen

Integrates https://github.com/Adyen/adyen-magento2 with GraphCommerce.

We currently have 'Alternative Payment Methods' implemented, this means that it
supports all off-site payment methods that Adyen supports. This includes CC,
iDeal, Bancontact, Sofort, etc.

## Requirements

- Magento Adyen module version 8.5.0 or later

## Installation

1. Find current version of your `@graphcommerce/magento-cart-payment-method` in
   your package.json.
2. `yarn add @marcheygroup/graphcommerce-magento-payment-adyen@^1.2.3` (replace
   1.2.3 with the version of the step above)
3. Configure the Adyen module in Magento Admin like you would normally do.
4. Configure the Payment Origin URL Stores -> Configuration -> Sales -> Payment
   Methods -> Adyen Payment methods -> Headless integration -> Payment Origin
   URL: `https://www.yourdomain.com`

This package uses GraphCommerce plugin systems, so there is no code modification
required.

## Known issues

- We don't need to configure the Payment URL's anymore since the 8.3.3 release
  https://github.com/Adyen/adyen-magento2/releases/tag/8.3.3, but that isn't
  integrated in the frontend yet.
