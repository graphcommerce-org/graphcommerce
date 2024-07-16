---
menu: Third Party Libraries
---

# Third Party Libraries

Welcome to the Third Party Libraries documentation. This page provides details
on integrating various third-party libraries into your GraphCommerce webshop.

---

## Available Libraries

- [Google Analytics](#google-analytics)
- [Google Tag Manager](#google-tag-manager)

---

## Google Analytics

The `@graphcommerce/googleanalytics` package makes it easy to add Google
Analytics GA4 to your GraphCommerce webshop.

### Installation

To use this package, follow these steps:

1. **Install the Package:** Ensure you have installed the
   `@graphcommerce/googleanalytics` package.

2. **Configuration:** Configure the following
   [configuration values](https://github.com/graphcommerce-org/graphcommerce/blob/canary/packages/googleanalytics/Config.graphqls)
   in your `graphcommerce.config.js`.

3. **Google Analytics Setup:** Configure the
   `Page changes based on browser history events.` in Google Analytics. Refer to
   the
   [official documentation](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications?implementation=browser-history#implement_single-page_application_measurement)
   for more details.

### Supported Events

The following events are supported by default in GraphCommerce:

- `add_payment_info`
- `add_shipping_info`
- `add_to_cart` (also triggered when updating quantity)
- `begin_checkout`
- `purchase`
- `remove_from_cart`
- `select_item`
- `view_cart`
- `view_item`
- `view_item_list`

---

## Google Tag Manager

This package makes it easy to add _Google Tag Manager_ to your GraphCommerce
webshop.

### Installation

To use this package, follow these steps:

1. **Install the Package:** Ensure you have installed the
   `@graphcommerce/googletagmanager` package.

2. **Configuration:** Configure the following
   [configuration values](https://github.com/graphcommerce-org/graphcommerce/blob/canary/packages/googletagmanager/Config.graphqls)
   in your `graphcommerce.config.js`.

---

## Next Steps

- Learn about [Translations](../framework/translations.md) in GraphCommerce
