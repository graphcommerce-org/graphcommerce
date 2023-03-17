---
menu: Overview
---

# Magento

To integrate with Magento, most of the functionality should work out-of-the box
if Magento exposes a working GraphQL API.

## Magento configuration

### Configure Base Link Url to get emails working

Configure the Base Link Url's to match your GraphCommerce frontend URL per
storeview with the locale included. e.g. `https://graphcommerce.vercel.app/nl/`

Unsecure:
`Stores -> Configuration -> General -> Web -> Base URLs -> Base Link Url`

Secure:
`Stores -> Configuration -> General -> Web -> Base URLs (secure) -> Base Link Url`

### Configure Base Link Url with 'Add Store Code to Urls' enabled:

If you are including the store code in the URL you can configure the above on
the website scope without the locale added.

To properly redirect to the actual URL used in the fontend add redirects to
next.config.js:

```js
/** @type {import('next').NextConfig} */
const config = {
  async redirects() {
    return [
      { source: '/b2b_nl/:path*', destination: '/nl/:path*', permanent: false },
      { source: '/b2b_en/:path*', destination: '/en/:path*', permanent: false },
    ]
  },
}
```

### Configure the address lines to fix the checkout

Set the number of address lines to 3. (default is 2)

For Magento Open Source:
`Stores -> Configuration -> Customers -> Customer Configuration -> Name and address options`

For Adobe Commerce:
`Stores -> Attributes -> Customer Address -> street -> Lines Count`

## Optional packages

- [Store Pickup / MSI](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-cart-pickup)
- [Address fields nl](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/address-fields-nl)

## Payment gateways

- [PayPal](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-payment-paypal)
- [Mollie](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/mollie-magento-payment)
- [Braintree](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-payment-braintree)
- [Adyen](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-payment-adyen)
- [MultiSafePay](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-payment-multisafepay)
- [Klarna](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-payment-klarna)

## Next steps

- [Full feature list](../feature-list.md)
- [SEO Migration](./seo-migration.md)
