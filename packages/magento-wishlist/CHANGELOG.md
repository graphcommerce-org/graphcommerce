# @graphcommerce/magento-wishlist

## 1.2.1

### Patch Changes

- [#1485](https://github.com/graphcommerce-org/graphcommerce/pull/1485) [`d6262de71`](https://github.com/graphcommerce-org/graphcommerce/commit/d6262de71d2254a2b0b492e1a60f9e141767470e) Thanks [@paales](https://github.com/paales)! - move to useCustomerSession instead of using the tokenquery directly and fix ssr issues

- Updated dependencies [[`d6262de71`](https://github.com/graphcommerce-org/graphcommerce/commit/d6262de71d2254a2b0b492e1a60f9e141767470e), [`c8c246b8a`](https://github.com/graphcommerce-org/graphcommerce/commit/c8c246b8aaab0621b68a2fca2a1c529a56fad962), [`e3005fe63`](https://github.com/graphcommerce-org/graphcommerce/commit/e3005fe6306093d47b08c6756c21c8175649e30b)]:
  - @graphcommerce/magento-customer@4.4.0
  - @graphcommerce/magento-cart@4.3.2
  - @graphcommerce/next-ui@4.8.2
  - @graphcommerce/magento-product-configurable@4.1.8
  - @graphcommerce/magento-product@4.4.1
  - @graphcommerce/magento-store@4.2.6

## 1.2.0

### Minor Changes

- [#1482](https://github.com/graphcommerce-org/graphcommerce/pull/1482) [`b359fe252`](https://github.com/graphcommerce-org/graphcommerce/commit/b359fe252a50bb8195601ba97c3eef6a7be146ba) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - Added selectedOptions to AddToCart mutation

### Patch Changes

- Updated dependencies [[`a9df81310`](https://github.com/graphcommerce-org/graphcommerce/commit/a9df81310c051876dd82fb2819105dece47cc213), [`b359fe252`](https://github.com/graphcommerce-org/graphcommerce/commit/b359fe252a50bb8195601ba97c3eef6a7be146ba), [`f167f9963`](https://github.com/graphcommerce-org/graphcommerce/commit/f167f99630966a7de43717937d43669e66132494)]:
  - @graphcommerce/next-ui@4.8.1
  - @graphcommerce/magento-product@4.4.0
  - @graphcommerce/magento-cart@4.3.1
  - @graphcommerce/magento-customer@4.3.2
  - @graphcommerce/magento-product-configurable@4.1.7
  - @graphcommerce/magento-store@4.2.5
  - @graphcommerce/image@3.1.6

## 1.1.1

### Patch Changes

- [#1469](https://github.com/graphcommerce-org/graphcommerce/pull/1469) [`849ea6595`](https://github.com/graphcommerce-org/graphcommerce/commit/849ea6595f9d3057bbf120d117529cbe74c0998a) Thanks [@timhofman](https://github.com/timhofman)! - wishlist chip icon not visible in darkmode

- Updated dependencies [[`a12db31b9`](https://github.com/graphcommerce-org/graphcommerce/commit/a12db31b9db9d27d86f59c1bfe58a0879999b9d3), [`cf575395c`](https://github.com/graphcommerce-org/graphcommerce/commit/cf575395c16e9c571f75d4563004c3018a29aeaa)]:
  - @graphcommerce/magento-customer@4.3.1
  - @graphcommerce/magento-cart@4.3.0
  - @graphcommerce/magento-product-configurable@4.1.6
  - @graphcommerce/magento-product@4.3.6

## 1.1.0

### Minor Changes

- [#1467](https://github.com/graphcommerce-org/graphcommerce/pull/1467) [`0363b9671`](https://github.com/graphcommerce-org/graphcommerce/commit/0363b9671db7c2932321d97faf6f1eb385238397) Thanks [@timhofman](https://github.com/timhofman)! - optional feedback message upon adding products to wishlist

* [#1464](https://github.com/graphcommerce-org/graphcommerce/pull/1464) [`c74089bd7`](https://github.com/graphcommerce-org/graphcommerce/commit/c74089bd7475bd8dd6090d3cdb5f2cff2570a4fc) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - Moved early return to end of file and added next-env.d.ts to solve some type issues

### Patch Changes

- [#1458](https://github.com/graphcommerce-org/graphcommerce/pull/1458) [`31ce79a89`](https://github.com/graphcommerce-org/graphcommerce/commit/31ce79a89624205ce12d7192375b864d9a87e31a) Thanks [@timhofman](https://github.com/timhofman)! - remove mandatory \_\_typename from chip base props

* [#1463](https://github.com/graphcommerce-org/graphcommerce/pull/1463) [`a71a7e4bc`](https://github.com/graphcommerce-org/graphcommerce/commit/a71a7e4bced2c2719839eecdd995e5b3a0faadb8) Thanks [@paales](https://github.com/paales)! - make sure the default color of the heart is black

- [#1466](https://github.com/graphcommerce-org/graphcommerce/pull/1466) [`ed2b67a06`](https://github.com/graphcommerce-org/graphcommerce/commit/ed2b67a0618d9db97e79ed2a8226e0ae12403943) Thanks [@FrankHarland](https://github.com/FrankHarland)! - Added a new useCustomerSession hook to allow for more fine grained control over loading data for customers.

- Updated dependencies [[`0363b9671`](https://github.com/graphcommerce-org/graphcommerce/commit/0363b9671db7c2932321d97faf6f1eb385238397), [`c6a62a338`](https://github.com/graphcommerce-org/graphcommerce/commit/c6a62a338abf8af83d3a6eb7ed796586009910ca), [`3ac90b57c`](https://github.com/graphcommerce-org/graphcommerce/commit/3ac90b57c68b96f9d81771d6664ed9435a28fc1d), [`00f6167ff`](https://github.com/graphcommerce-org/graphcommerce/commit/00f6167ff4096bf7432f3d8e8e739ecbf6ab0dd2), [`7159d3ab3`](https://github.com/graphcommerce-org/graphcommerce/commit/7159d3ab31e937c9c921023c46e80db5813e789c), [`32370574b`](https://github.com/graphcommerce-org/graphcommerce/commit/32370574bef6345b857ae911049ca27a64bc7e08), [`ed2b67a06`](https://github.com/graphcommerce-org/graphcommerce/commit/ed2b67a0618d9db97e79ed2a8226e0ae12403943), [`4c146c682`](https://github.com/graphcommerce-org/graphcommerce/commit/4c146c68242e6edc616807fb73173cc959c26034)]:
  - @graphcommerce/next-ui@4.8.0
  - @graphcommerce/magento-product@4.3.5
  - @graphcommerce/magento-customer@4.3.0
  - @graphcommerce/magento-cart@4.2.15
  - @graphcommerce/magento-product-configurable@4.1.5
  - @graphcommerce/magento-store@4.2.4

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
