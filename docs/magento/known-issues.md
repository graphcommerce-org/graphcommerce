---
menu: Known issues
---

# Known issues

An overview of bugs and limitations you may run into with Magento's GraphQL API:

## Cart-related mutations result in `Can not find cart with ID` or `Cart isn't active` errors

Affected Magento versions:

- `2.4.7`: only `2.4.7-beta1`
- `2.4.6`: all versions

This is caused by a regression which results in some GraphQL errors no longer
getting a category extension string (such as `graphql-no-such-entity`).
Normally, these errors are handling by automatically creating a new cart, but
without the proper error category this error-handling logic is nog triggered.

As a workaround, you can apply
[cart-error-category.patch](./patches/cart-error-category.patch).

See also
https://github.com/magento/magento2/commit/49cbe774020d3dfa6ee2b8702376a947801c9971

## After adding a product to cart with custom options, options are not saved and/or retrieving the cart results in an error

Affected Magento versions:

- `2.4.7`: all versions
- `2.4.6`: all versions

When adding a product to cart, custom options are not processed and saved
correctly, and can result in an error on the `Cart.items.errors.message` field
when subsequently retrieving the cart, if the product had required custom
options.

The observed error happens because no value is given for the non-nullable
`message` field, however the original error occurs due a required custom option
not being present on the cart item, as the custom options we not saved correctly
during the previous `addProductsToCart` call.

Note that although the relevant PR for this fix was merged, the fix seems to
have gotten reverted and is not present in 2.4-develop at the time of writing.

As a workaround, you can apply
[fix-custom-option-processing.patch](./patches/fix-custom-option-processing.patch).

See also:

- Original PR: https://github.com/magento/magento2/issues/37599
- PR regarding revert of fix: https://github.com/magento/magento2/issues/37928

## Next steps

- [Overview](./readme)
