---
menu: Third Party Libraries
---

# Third Party Libraries

## Google Analytics

The `@graphcommerce/googleanalytics` package makes it easy to add Google
Analytics GA4 to your GraphCommerce webshop.

### How to use this package?

To use our standard events, follow these steps:

- Ensure you have installed the `@graphcommerce/googleanalytics` package.
- Configure the following
  ([configuration values](https://github.com/graphcommerce-org/graphcommerce/blob/canary/packages/googleanalytics/Config.graphqls))
  in your graphcommerce.config.js
- Make sure you also configure the
  `Page changes based on browser history events.` configuration in Google
  Analytics, see
  [docs](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications?implementation=browser-history#implement_single-page_application_measurement).

### Events

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

## Next steps

- Learn about [Translations](../framework/translations.md) in GraphCommerce
