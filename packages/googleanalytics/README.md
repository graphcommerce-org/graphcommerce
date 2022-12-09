# @graphcommerce/googleanalytics

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

### Configuration

Fill `NEXT_PUBLIC_GOOGLE_ANALYTICS` in your .env file. The value of
`NEXT_PUBLIC_GOOGLE_ANALYTICS` can be string or JSON stringified object:

```
# your .env file

# Google Analytics v4 ID
NEXT_PUBLIC_GOOGLE_ANALYTICS="G-XXXXXXXX"

# or

# Google Analytics v4 ID per locale
NEXT_PUBLIC_GOOGLE_ANALYTICS='{"en-us": "G-XXXXXXXX", "nl-nl": "G-XXXXXXXX"}'
```
