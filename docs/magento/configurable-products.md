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

## Enabling this Feature

To enable this feature, add the **configurableVariantValues** section to your
`graphcommerce.config.js` file and activate the desired options.

```
const config = {
  ...

  configurableVariantValues: {
    url: true,
    gallery: true,
    content: true,
  },

  configurableVariantForSimple: true,
}
```

### GraphCommerceConfig

- #### `configurableVariantForSimple: Boolean`

  Determines whether a simple product should appear as a Configurable Product
  with pre-selected options or as the default Simple Product.

  **How does this work:**

  When the `products(filters: { url_key: { eq: 'simple-product' } }) { ... }`
  query is ran, Magento also returns the Simple product and the Configurable
  product the simple belongs to.

  If that is the case we render the Configurable Product page instead of the
  Simple Product page but the options to select the Simple Product are
  pre-selected.

- #### `configurableVariantValues`

  Options to configure which values will be replaced when a variant is selected
  on the product page.

  - #### `content: Boolean`

    **Description:** Use the name, description, short description and meta data
    from the configured variant

  - #### `gallery: Boolean`

    **Description:** This option enables the automatic update of product gallery
    images on the product page when a variant is selected, provided that the
    gallery images for the selected variant differ from the currently displayed
    images.

  - #### `url: Boolean`

    **Description:** When a variant is selected the URL of the product will be
    changed in the address bar.

    **Note:** This only occurs when the actual variant can be accessed through
    the URL.

## Magento configuration

### How should a Magento administrator configure the configurable and simple products to use this?

To make use of this features the Visibility of your product should be set to
**Catalog** or **Catalog, Search**. Or else the data is not accessible.

> `Catalog -> Products -> [product] -> Visibility: [Catalog / Catalog, Search]`

## Next steps

- [Overview](./readme)
