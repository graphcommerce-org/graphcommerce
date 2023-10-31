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

## Customer is forced to sign up, even if already registered

Affected Magento versions:

- `2.4.7` and all future release series
- `2.4.6`: `2.4.6-p1` and up
- `2.4.5`: `2.4.5-p3` and up
- `2.4.4`: `2.4.4-p4` and up

During customer login, GraphCommerce queries Magento to determine whether the
customer account already exists or not. If not, the sign-up form is shown
instead.

In affected Magento versions, the behavior of the `isEmailAvailable` query that
is used to do this was made dependent on the `Enable Guest Checkout Login`
configuration setting. If disabled, this query will always return `true`,
resulting in the sign-up form always being shown, even if the customer already
exists.

To solve this, the following setting must be set to `Yes`:
`Stores -> Configuration -> Sales -> Checkout -> Checkout Options -> Enable Guest Checkout Login`

See also
https://developer.adobe.com/commerce/php/development/backward-incompatible-changes/highlights/#isemailavailable-api

## Next steps

- [Overview](./readme)
