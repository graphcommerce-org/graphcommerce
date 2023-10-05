---
menu: Configurable Products
---

# Configurable Products

Example:
[Simple product (with pre-selection)](https://graphcommerce.vercel.app/p/matriarch-s-edges-size-4-6y-gc-469-sock-6y)

GraphCommerce enables various ways to manage the display of data from
configurable products in Magento. This flexibility allows you to choose dynamic
updates for the following data:

- **Content:** Name, description, short description, and meta-data from the
  selected variant.
- **Gallery:** Automatically updates product gallery images on the product page
  when a variant is chosen, provided the gallery images for the selected variant
  differ from the currently displayed ones.
- **URL:** The product URL changes in the address bar when a variant is
  selected, but this only happens when the actual variant can be accessed via
  the URL.

## Displaying the configured variant on a configurable product page for a simple product

Add the following to your `graphcommerce.config.js` file:

Determines whether a simple product should appear as a Configurable Product with
pre-selected options or as the default Simple Product.

### How does this work?

When the `products(filters: { url_key: { eq: 'simple-product' } }) { ... }`
query is ran, Magento also returns besides the requested Simple product also the
Configurable product the simple belongs to.

If that is the case we render the Configurable Product page instead of the
Simple Product page, but the options for the Simple Product are pre-selected.

```js
const config = {
  configurableVariantForSimple: true,
}
module.exports = config
```

## Switching content when a variant is selected

Add the following to your `graphcommerce.config.js` file:

- `url`: When a variant is selected the URL of the product will be changed in
  the address bar. Note that this only occurs when the actual variant can be
  accessed through the URL.

- `content`: Use the name, description, short description and meta data from the
  configured variant

- `gallery`: This option enables the automatic update of product gallery images
  on the product page when a variant is selected, provided that the gallery
  images for the selected variant differ from the currently displayed images.

```js
const config = {
  configurableVariantValues: {
    url: true,
    gallery: true,
    content: true,
  },
}
```

## Magento configuration

### How to configure the simple and configurable products to use this feature?

By default Magento will return the simple and configurable for a simple variant,
no configuration required.

To make the automatic swithcing of URL's possible, make sure the simple product
has a URL by making sure it's visibility is set something different than
`Not Visible Individually`: `Catalog`, `Catalog, Search` or `Search`.

`Catalog -> Products -> [product] -> Visibility: [Catalog / Catalog, Search / Search]`

## Next steps

- [Overview](./readme)
