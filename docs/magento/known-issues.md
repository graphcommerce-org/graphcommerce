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

## Next steps

- [Overview](./readme)
