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

### Remove URL suffixes from products and categorories (optional)

GraphCommerce does not support URL suffixes, because Next.js can not handle urls
ending in `.html`. When migrating from an existing shop, GraphCommerce will
automatically redirect to the suffix-less URL. However, GraphCommerce will need
to do an additional query to Magento to find the route.

If you are starting out from a new project, we recommend to remove the URL
suffixes from products and categories.

Remove the URL suffixes from products and categories. (default is `.html`)
`Stores -> Configuration -> Catalog -> Catalog -> Search Engine Optimization -> Product URL Suffix`
`Stores -> Configuration -> Catalog -> Catalog -> Search Engine Optimization -> Category URL Suffix`

### Enable guest checkout login

During customer login, GraphCommerce queries Magento to determine whether the
customer account already exists. To do this the following setting must be set to
Yes:
`Stores -> Configuration -> Sales -> Checkout -> Checkout Options -> Enable Guest Checkout Login`

If this is not set correctly, customers will not be able to log in, since they
will always be prompted to create a new account.

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

## Known issues

An overview of bugs and limitations you may run into with Magento's GraphQL API:

### Cart-related mutations result `Can not find cart with ID` or `Cart isn't active` errors

This is caused by a regression in Magento 2.4.6, which results in some GraphQL
errors no longer getting a category extension string (such as
`graphql-no-such-entity`). Normally, these errors are handling by automatically
creating a new cart, but without the proper error category this error-handling
logic is nog triggered.

As a workaround, you can apply
[cart-error-category.patch](./patches/cart-error-category.patch). This
regression is fixed as of Magento 2.4.7-beta2.

See also
https://github.com/magento/magento2/commit/49cbe774020d3dfa6ee2b8702376a947801c9971
