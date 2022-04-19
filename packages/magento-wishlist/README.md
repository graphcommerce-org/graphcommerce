# Wishlist

This package enables visitors to manage their wishlist with or without an
account.

## Features

- Manage wishlist without an account
- Automatically migrate wishlist from guest session to account upon login
- Add products to wishlist based on SKU (all producttypes)
- Add products with selected variants, like size and color, to wishlist
  (configurable product)

## Roadmap

- Wishlist overview: add to cart based on sku (simple, downloadable, virtual,
  grouped)
- Wishlist overview: add to cart with configurable options (see 'Remarks')

## Settings

- Enable wishlist for logged in users only (for instance for B2B)

Add the following configuration to your env file

```
NEXT_PUBLIC_WISHLIST_HIDE_FOR_GUEST=1
```

## Customizing wishlist icon

- The ProductWishlistChip accepts SX props.
- Fancy a different icon? See:
  https://www.graphcommerce.org/docs/framework/icons

## Remarks

Magento (<= 2.4.4) throws errors when retrieving product configuration for
wishlist items. Currently selected products variants are stored, but not yet
displayed in the wishlist overview

Fetching configurable_options throws internal servers due to a mismatch in
schema and implemented resolvers on Magento's side.

Related issue:
https://github.com/magento/magento2/commit/5c884244cd7f1bd55bb0b908943caaed3e3e762b
