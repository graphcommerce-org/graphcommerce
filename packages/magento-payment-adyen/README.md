# Magento Payment Adyen

Integrates https://github.com/Adyen/adyen-magento2 with GraphCommerce.

We currently have 'Alternative Payment Methods' implemented, this means that it
supports all off-site payment methods that Adyen supports. This includes CC,
iDeal, Bancontact, Sofort, etc.

We do not support on-site credit cards yet. Let us know if you want to have
this.

## Requirements

- Magento Adyen module version 8.5.0 or later

## Installation

1. Find current version of your `@graphcommerce/magento-cart-payment-method` in
   your package.json.
2. `yarn add @marcheygroup/graphcommerce-magento-payment-adyen@^1.2.3` (replace 1.2.3 with the
   version of the step above)
3. Add Adyen config variables in `.env` files as below:
```bash

NEXT_PUBLIC_ADYEN_LOCALE=en_US
NEXT_PUBLIC_ADYEN_ENVIRONMENT=TEST
NEXT_PUBLIC_ADYEN_CLIENT_KEY=test_AOLSIF3JWVCM5KBL2J6QHZUP2MMAD5YM
NEXT_PUBLIC_ADYEN_COUNTRY_CODE=US
NEXT_PUBLIC_ADYEN_MERCHANT_NAME=Supplyz.com
NEXT_PUBLIC_ADYEN_MERCHANT_ACCOUNT=MarcheyGroupECOM
NEXT_PUBLIC_ADYEN_GOOGLE_PAY_MERCHANT_ID=BXX2XX4XX3X3XXXX
NEXT_PUBLIC_ADYEN_APPLE_PAY_MERCHANT_ID=merchant.yourdomain.com

```
4. Configure the Adyen module in Magento Admin like you would normally do.
5. Stores -> Configuration -> Sales -> Payment Methods -> Adyen Payment methods
   -> Headless integration -> Payment Origin URL: `https://www.yourdomain.com`
6. Stores -> Configuration -> Sales -> Payment Methods -> Adyen Payment methods
   -> Headless integration -> Payment Return URL:
   `https://www.yourdomain.com/checkout/payment?locked=1&adyen=1` (make sure the
   URL's match for your storeview)

This package uses GraphCommerce plugin systems, so there is no code modification
required.

## Known issues

- We don't need to configure the Payment URL's anymore since the 8.3.3 release
  https://github.com/Adyen/adyen-magento2/releases/tag/8.3.3, but that isn't
  integrated in the frontend yet.

- This package is currently untested inside the GraphCommerce repo, which it
  should, but is used in production for multiple shops.
