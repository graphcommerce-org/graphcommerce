# Wishlist

This package enables visitors to manage their wishlist with or without an
account.

## Features

- Manage wishlist without an account
- Automatically migrate wishlist from guest session to account upon login
- Add products to wishlist based on SKU (all producttypes)
- Add products with selected variants, like size and color, to wishlist
  (configurable product)
- Add products from wishlist to cart (simple, virtual)
- Enable/disable through Magento configuration item
  'magento_wishlist_general_is_enabled'

## Additional settings

See [Config](./Config.graphqls)

## Customizing wishlist styling

- The ProductWishlistChip accepts SX props (see ProductWishlistChip and
  ProductWishlistChipDetail)
- Fancy a different icon? See:
  https://www.graphcommerce.org/docs/framework/icons
- Styleable through theme provider overMuiCssBaseline.styleOverrides (although
  we do recommend to use the SX approach)

## Roadmap

- Wishlist overview: add to cart with configurable options (see 'Remarks')

## Remarks

Magento (<= 2.4.4) throws errors when retrieving product configuration for
wishlist items. Currently selected products variants are stored, but not yet
displayed in the wishlist overview

Fetching configurable_options throws internal servers due to a mismatch in
schema and implemented resolvers on Magento's side.

Related issue:
https://github.com/magento/magento2/commit/5c884244cd7f1bd55bb0b908943caaed3e3e762b
