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

## Configuration

Configure the following ([configuration values](./Config.graphqls)) in your
graphcommerce.config.js
