# @graphcommerce/googleanalytics ([Config](./Config.graphqls))

This package makes it easy to add Google Analytics GA4 to your GraphCommerce
webshop.

Besides the GA4 integration it also tracks the following events:

- add_payment_info
- purchase
- add_shipping_info
- add_to_cart (also triggered when updating quantity)
- begin_checkout
- select_item
- view_item_list
- view_item
- view_cart
- remove_from_cart

## Configuration

Configure the following ([configuration values](./Config.graphqls)) in your
graphcommerce.config.js

Make sure you also configure the 'Page changes based on browser history events.'
configuration in Google Analytics, see
[docs](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications?implementation=browser-history#implement_single-page_application_measurement).
