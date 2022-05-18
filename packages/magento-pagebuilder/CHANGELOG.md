# @graphcommerce/magento-pagebuilder

## 1.0.9

### Patch Changes

- [#1463](https://github.com/graphcommerce-org/graphcommerce/pull/1463) [`b2bcdf089`](https://github.com/graphcommerce-org/graphcommerce/commit/b2bcdf089a328ba9e5af9985289dffcc2829783b) Thanks [@paales](https://github.com/paales)! - Make sure the correct fields are selected when resolving pagebuilder fields

- Updated dependencies [[`0363b9671`](https://github.com/graphcommerce-org/graphcommerce/commit/0363b9671db7c2932321d97faf6f1eb385238397), [`c6a62a338`](https://github.com/graphcommerce-org/graphcommerce/commit/c6a62a338abf8af83d3a6eb7ed796586009910ca), [`3ac90b57c`](https://github.com/graphcommerce-org/graphcommerce/commit/3ac90b57c68b96f9d81771d6664ed9435a28fc1d)]:
  - @graphcommerce/next-ui@4.8.0
  - @graphcommerce/magento-product@4.3.5
  - @graphcommerce/magento-category@4.1.6
  - @graphcommerce/magento-cms@4.0.15

## 1.0.8

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/magento-category@4.1.5
  - @graphcommerce/magento-cms@4.0.14
  - @graphcommerce/magento-product@4.3.4

## 1.0.7

### Patch Changes

- [#1451](https://github.com/graphcommerce-org/graphcommerce/pull/1451) [`f698ff85d`](https://github.com/graphcommerce-org/graphcommerce/commit/f698ff85df6bb0922288471bb3c81856091b8061) Thanks [@paales](https://github.com/paales)! - Removed all occurences of @lingui/macro and moved to @lingui/macro / @lingui/core in preparation to move to swc.

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

- Updated dependencies [[`50188e378`](https://github.com/graphcommerce-org/graphcommerce/commit/50188e378b4c77561ebc600958ea11cd114fa61a), [`f698ff85d`](https://github.com/graphcommerce-org/graphcommerce/commit/f698ff85df6bb0922288471bb3c81856091b8061)]:
  - @graphcommerce/react-hook-form@3.1.3
  - @graphcommerce/magento-category@4.1.4
  - @graphcommerce/magento-cms@4.0.13
  - @graphcommerce/magento-product@4.3.3
  - @graphcommerce/next-ui@4.7.2
  - @graphcommerce/graphql@3.1.3

## 1.0.6

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/magento-product@4.3.2
  - @graphcommerce/magento-category@4.1.3

## 1.0.5

### Patch Changes

- Updated dependencies [[`25ef6cf08`](https://github.com/graphcommerce-org/graphcommerce/commit/25ef6cf08c278105307d6f604b7135d637e9046c), [`80e30bb77`](https://github.com/graphcommerce-org/graphcommerce/commit/80e30bb77015755fbc00a7935d590f80c1c1c18c)]:
  - @graphcommerce/graphql@3.1.2
  - @graphcommerce/magento-category@4.1.2
  - @graphcommerce/magento-cms@4.0.12
  - @graphcommerce/magento-product@4.3.1
  - @graphcommerce/next-ui@4.7.1

## 1.0.4

### Patch Changes

- Updated dependencies [[`669a17a97`](https://github.com/graphcommerce-org/graphcommerce/commit/669a17a973c47c00fed4a649a9da0bfc5670c5da)]:
  - @graphcommerce/magento-product@4.3.0
  - @graphcommerce/magento-category@4.1.1

## 1.0.3

### Patch Changes

- Updated dependencies [[`3c1c9ce2a`](https://github.com/graphcommerce-org/graphcommerce/commit/3c1c9ce2a947386515df019c31d697114a87dc07)]:
  - @graphcommerce/magento-category@4.1.0

## 1.0.2

### Patch Changes

- Updated dependencies [[`f3d06dd83`](https://github.com/graphcommerce-org/graphcommerce/commit/f3d06dd836c9a76412b419d4d2c79bbd0ee92e04)]:
  - @graphcommerce/magento-product@4.2.0
  - @graphcommerce/next-ui@4.7.0
  - @graphcommerce/magento-category@4.0.15
  - @graphcommerce/magento-cms@4.0.11

## 1.0.1

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/magento-product@4.1.11
  - @graphcommerce/magento-category@4.0.14
  - @graphcommerce/magento-cms@4.0.10

## 1.0.0

### Major Changes

- [#1394](https://github.com/graphcommerce-org/graphcommerce/pull/1394) [`b6b8bb5b3`](https://github.com/graphcommerce-org/graphcommerce/commit/b6b8bb5b31b0891ea24733de34a3bd5c0a9604e4) Thanks [@paales](https://github.com/paales)! - Added support for Magento pagebuilder

### Patch Changes

- [#1427](https://github.com/graphcommerce-org/graphcommerce/pull/1427) [`e83f4e0cc`](https://github.com/graphcommerce-org/graphcommerce/commit/e83f4e0cc18bb07c32d35a1345a6967fe898cbb1) Thanks [@paales](https://github.com/paales)! - Warn when the base field isn’t requested when trying to load a pagebuilder field via GraphQL

- Updated dependencies [[`b6b8bb5b3`](https://github.com/graphcommerce-org/graphcommerce/commit/b6b8bb5b31b0891ea24733de34a3bd5c0a9604e4), [`100f4c38c`](https://github.com/graphcommerce-org/graphcommerce/commit/100f4c38c8fcda4bc6e0425e38028b550b60adc2)]:
  - @graphcommerce/magento-category@4.0.13
  - @graphcommerce/magento-cms@4.0.9
  - @graphcommerce/magento-product@4.1.10
  - @graphcommerce/graphql@3.1.1
  - @graphcommerce/next-ui@4.6.2
  - @graphcommerce/react-hook-form@3.1.2
