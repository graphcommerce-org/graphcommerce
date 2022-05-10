# @graphcommerce/magento-wishlist

## 1.0.5

### Patch Changes

- [#1454](https://github.com/graphcommerce-org/graphcommerce/pull/1454) [`d38b58bb3`](https://github.com/graphcommerce-org/graphcommerce/commit/d38b58bb3499a8055e1a60ec416064811e7412ed) Thanks [@paales](https://github.com/paales)! - Make sure to keep casing when generating graphql documents to match graphql-mesh's casing.

## 1.0.4

### Patch Changes

- [#1452](https://github.com/graphcommerce-org/graphcommerce/pull/1452) [`062c19664`](https://github.com/graphcommerce-org/graphcommerce/commit/062c19664689a0b8675e986806dbb243cfb6c063) Thanks [@paales](https://github.com/paales)! - Fix issue where the local graphql vscode plugin encountered a duplicate type

- Updated dependencies [[`c30893857`](https://github.com/graphcommerce-org/graphcommerce/commit/c3089385791291e812a48c2691a39a2325ee0439)]:
  - @graphcommerce/magento-store@4.2.3
  - @graphcommerce/magento-cart@4.2.14
  - @graphcommerce/magento-customer@4.2.12
  - @graphcommerce/magento-product@4.3.4
  - @graphcommerce/magento-product-configurable@4.1.4

## 1.0.3

### Patch Changes

- [#1444](https://github.com/graphcommerce-org/graphcommerce/pull/1444) [`3b623efdd`](https://github.com/graphcommerce-org/graphcommerce/commit/3b623efdd1d26cc533b707ad4ef08c00989539a1) Thanks [@timhofman](https://github.com/timhofman)! - Lowest product price was based on regular_price instead of final_price

* [#1451](https://github.com/graphcommerce-org/graphcommerce/pull/1451) [`f698ff85d`](https://github.com/graphcommerce-org/graphcommerce/commit/f698ff85df6bb0922288471bb3c81856091b8061) Thanks [@paales](https://github.com/paales)! - Removed all occurences of @lingui/macro and moved to @lingui/macro / @lingui/core in preparation to move to swc.

  Since we've removed @lingui/macro, all occurences need to be replaced with @lingui/core and @lingui/react.

  All occurences of `<Trans>` and `t` need to be replaced:

  ```tsx
  import { Trans, t } from '@lingui/macro'

  function MyComponent() {
    const foo = 'bar'
    return (
      <div aria-label={t`Account ${foo}`}>
        <Trans>My Translation {foo}</Trans>
      </div>
    )
  }
  ```

  Needs to be replaced with:

  ```tsx
  import { Trans } from '@lingui/react'
  import { i18n } from '@lingui/core'

  function MyComponent() {
    const foo = 'bar'
    return (
      <div aria-label={i18n._(/* i18n */ `Account {foo}`, { foo })}>
        <Trans key='My Translation {foo}' values={{ foo }}></Trans>
      </div>
    )
  }
  ```

  [More examples for Trans](https://lingui.js.org/ref/macro.html#examples-of-jsx-macros) and [more examples for `t`](https://lingui.js.org/ref/macro.html#examples-of-js-macros)

* Updated dependencies [[`f698ff85d`](https://github.com/graphcommerce-org/graphcommerce/commit/f698ff85df6bb0922288471bb3c81856091b8061)]:
  - @graphcommerce/magento-cart@4.2.13
  - @graphcommerce/magento-customer@4.2.11
  - @graphcommerce/magento-product@4.3.3
  - @graphcommerce/magento-product-configurable@4.1.3
  - @graphcommerce/magento-store@4.2.2
  - @graphcommerce/next-ui@4.7.2
  - @graphcommerce/graphql@3.1.3

## 1.0.2

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/magento-cart@4.2.12
  - @graphcommerce/magento-customer@4.2.10
  - @graphcommerce/magento-product@4.3.2
  - @graphcommerce/magento-product-configurable@4.1.2

## 1.0.1

### Patch Changes

- Updated dependencies [[`25ef6cf08`](https://github.com/graphcommerce-org/graphcommerce/commit/25ef6cf08c278105307d6f604b7135d637e9046c), [`80e30bb77`](https://github.com/graphcommerce-org/graphcommerce/commit/80e30bb77015755fbc00a7935d590f80c1c1c18c)]:
  - @graphcommerce/graphql@3.1.2
  - @graphcommerce/magento-customer@4.2.9
  - @graphcommerce/magento-cart@4.2.11
  - @graphcommerce/magento-product@4.3.1
  - @graphcommerce/magento-product-configurable@4.1.1
  - @graphcommerce/magento-store@4.2.1
  - @graphcommerce/next-ui@4.7.1

## 1.0.0

### Major Changes

- [#1256](https://github.com/graphcommerce-org/graphcommerce/pull/1256) [`669a17a97`](https://github.com/graphcommerce-org/graphcommerce/commit/669a17a973c47c00fed4a649a9da0bfc5670c5da) Thanks [@timhofman](https://github.com/timhofman)! - Wishlist

### Patch Changes

- Updated dependencies [[`669a17a97`](https://github.com/graphcommerce-org/graphcommerce/commit/669a17a973c47c00fed4a649a9da0bfc5670c5da)]:
  - @graphcommerce/magento-product@4.3.0
  - @graphcommerce/magento-product-configurable@4.1.0
