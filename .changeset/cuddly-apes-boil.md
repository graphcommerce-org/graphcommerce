---
'@graphcommerce/magento-graphcms': minor
'@graphcommerce/framer-scroller': minor
'@graphcommerce/magento-cart-shipping-address': minor
'@graphcommerce/magento-cart-shipping-method': minor
'@graphcommerce/magento-pagebuilder': minor
'@graphcommerce/magento-product': minor
'@graphcommerce/magento-product-bundle': minor
'@graphcommerce/magento-product-configurable': minor
'@graphcommerce/magento-product-downloadable': minor
'@graphcommerce/magento-product-grouped': minor
'@graphcommerce/magento-product-simple': minor
'@graphcommerce/magento-product-virtual': minor
'@graphcommerce/magento-wishlist': minor
'@graphcommerce/next-ui': minor
---

Introduced `<ProductAddToCartForm/>`, bla. which is allows for adding all product types to the cart with a single react-hook-form form.

The old `<ProductAddToCart/>` component is split into multiple components:

- ProductAddToCartForm
- ProductAddToCartButton
- ProductAddToCartQuantity
- ProductAddToCartSnackbar

Which allows you to fully compose the form on the product page.

The `<ConfigurableProductAddToCart/>` and the `<ConfigurableContextProvider/>` are now split into multiple components that work with the new `<ProductAddToCartForm/>`.

- ConfigurablePrice
- ConfigurableAttributeSelector
- ConfigurableProductPageGallery
