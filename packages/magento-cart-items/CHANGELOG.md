# Change Log

## 3.0.20

### Patch Changes

- Updated dependencies [[`c30893857`](https://github.com/graphcommerce-org/graphcommerce/commit/c3089385791291e812a48c2691a39a2325ee0439)]:
  - @graphcommerce/magento-store@4.2.3
  - @graphcommerce/magento-cart@4.2.14
  - @graphcommerce/magento-customer@4.2.12
  - @graphcommerce/magento-product@4.3.4

## 3.0.19

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
  - @graphcommerce/magento-cart@4.2.13
  - @graphcommerce/magento-customer@4.2.11
  - @graphcommerce/magento-product@4.3.3
  - @graphcommerce/magento-store@4.2.2
  - @graphcommerce/next-ui@4.7.2
  - @graphcommerce/graphql@3.1.3

## 3.0.18

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/magento-cart@4.2.12
  - @graphcommerce/magento-customer@4.2.10
  - @graphcommerce/magento-product@4.3.2

## 3.0.17

### Patch Changes

- Updated dependencies [[`25ef6cf08`](https://github.com/graphcommerce-org/graphcommerce/commit/25ef6cf08c278105307d6f604b7135d637e9046c), [`80e30bb77`](https://github.com/graphcommerce-org/graphcommerce/commit/80e30bb77015755fbc00a7935d590f80c1c1c18c)]:
  - @graphcommerce/graphql@3.1.2
  - @graphcommerce/magento-customer@4.2.9
  - @graphcommerce/magento-cart@4.2.11
  - @graphcommerce/magento-product@4.3.1
  - @graphcommerce/magento-store@4.2.1
  - @graphcommerce/next-ui@4.7.1

## 3.0.16

### Patch Changes

- Updated dependencies [[`669a17a97`](https://github.com/graphcommerce-org/graphcommerce/commit/669a17a973c47c00fed4a649a9da0bfc5670c5da)]:
  - @graphcommerce/magento-product@4.3.0

## 3.0.15

### Patch Changes

- Updated dependencies [[`f3d06dd83`](https://github.com/graphcommerce-org/graphcommerce/commit/f3d06dd836c9a76412b419d4d2c79bbd0ee92e04)]:
  - @graphcommerce/magento-product@4.2.0
  - @graphcommerce/magento-store@4.2.0
  - @graphcommerce/next-ui@4.7.0
  - @graphcommerce/magento-cart@4.2.10
  - @graphcommerce/magento-customer@4.2.8

## 3.0.14

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/magento-cart@4.2.9
  - @graphcommerce/magento-customer@4.2.7
  - @graphcommerce/magento-product@4.1.11
  - @graphcommerce/magento-store@4.1.9

## 3.0.13

### Patch Changes

- Updated dependencies [[`b6b8bb5b3`](https://github.com/graphcommerce-org/graphcommerce/commit/b6b8bb5b31b0891ea24733de34a3bd5c0a9604e4), [`100f4c38c`](https://github.com/graphcommerce-org/graphcommerce/commit/100f4c38c8fcda4bc6e0425e38028b550b60adc2)]:
  - @graphcommerce/magento-product@4.1.10
  - @graphcommerce/graphql@3.1.1
  - @graphcommerce/next-ui@4.6.2
  - @graphcommerce/react-hook-form@3.1.2
  - @graphcommerce/magento-customer@4.2.6
  - @graphcommerce/magento-store@4.1.8
  - @graphcommerce/magento-cart@4.2.8

## 3.0.12

### Patch Changes

- Updated dependencies [[`a52a863f9`](https://github.com/graphcommerce-org/graphcommerce/commit/a52a863f9c69c6b3ae657dcce3bc9b14413ce125)]:
  - @graphcommerce/magento-product@4.1.9

## 3.0.11

### Patch Changes

- Updated dependencies [[`d8906cf4a`](https://github.com/graphcommerce-org/graphcommerce/commit/d8906cf4afbfc234aedd91a2c581f82623267357)]:
  - @graphcommerce/magento-cart@4.2.7
  - @graphcommerce/magento-customer@4.2.5
  - @graphcommerce/magento-product@4.1.8

## 3.0.10

### Patch Changes

- [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`da0ae7d02`](https://github.com/graphcommerce-org/graphcommerce/commit/da0ae7d0236e4908ba0bf0fa16656be516e841d4) Thanks [@paales](https://github.com/paales)! - Updated dependencies

- Updated dependencies [[`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542), [`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542), [`da0ae7d02`](https://github.com/graphcommerce-org/graphcommerce/commit/da0ae7d0236e4908ba0bf0fa16656be516e841d4)]:
  - @graphcommerce/graphql@3.1.0
  - @graphcommerce/magento-cart@4.2.6
  - @graphcommerce/magento-customer@4.2.4
  - @graphcommerce/magento-product@4.1.7
  - @graphcommerce/magento-store@4.1.7
  - @graphcommerce/next-ui@4.6.1
  - @graphcommerce/react-hook-form@3.1.1
  - @graphcommerce/image@3.1.5

## 3.0.9

### Patch Changes

- Updated dependencies [[`4169b8c68`](https://github.com/graphcommerce-org/graphcommerce/commit/4169b8c686f682ff6e981b029f13abd87fd5f52a)]:
  - @graphcommerce/magento-customer@4.2.3
  - @graphcommerce/magento-cart@4.2.5
  - @graphcommerce/magento-product@4.1.6

## 3.0.8

### Patch Changes

- Updated dependencies [[`3c801f45c`](https://github.com/graphcommerce-org/graphcommerce/commit/3c801f45c7df55131acf30ae2fe0d2344830d480), [`b8d04130a`](https://github.com/graphcommerce-org/graphcommerce/commit/b8d04130a1b1cb8fc85308939235140288744465), [`3192fab82`](https://github.com/graphcommerce-org/graphcommerce/commit/3192fab82560e2211dfcacadc3b0b305260527d8), [`104abd14e`](https://github.com/graphcommerce-org/graphcommerce/commit/104abd14e1585ef0d8de77937d25156b8fa1e201), [`0e425e85e`](https://github.com/graphcommerce-org/graphcommerce/commit/0e425e85ee8fed280349317ee0440c7bceea5823), [`2a125b1f9`](https://github.com/graphcommerce-org/graphcommerce/commit/2a125b1f98bb9272d96c3577f21d6c984caad892), [`8a354d1cd`](https://github.com/graphcommerce-org/graphcommerce/commit/8a354d1cd4757497ddfc9b1969a0addbc8ff616b), [`9b3488c6a`](https://github.com/graphcommerce-org/graphcommerce/commit/9b3488c6a03cc09a647f43f6a8b36d96e97e5bb8)]:
  - @graphcommerce/next-ui@4.6.0
  - @graphcommerce/magento-cart@4.2.4
  - @graphcommerce/react-hook-form@3.1.0
  - @graphcommerce/image@3.1.4
  - @graphcommerce/magento-product@4.1.5
  - @graphcommerce/magento-customer@4.2.2
  - @graphcommerce/magento-store@4.1.6

## 3.0.7

### Patch Changes

- [#1378](https://github.com/graphcommerce-org/graphcommerce/pull/1378) [`b610a6e40`](https://github.com/graphcommerce-org/graphcommerce/commit/b610a6e4049e8c9e8b5d2aeff31b8e1bfc24abe5) Thanks [@paales](https://github.com/paales)! - Pin all versions internally so we can’t end up in an unfixable state for the user

- Updated dependencies [[`b610a6e40`](https://github.com/graphcommerce-org/graphcommerce/commit/b610a6e4049e8c9e8b5d2aeff31b8e1bfc24abe5), [`22ff9df16`](https://github.com/graphcommerce-org/graphcommerce/commit/22ff9df1677742ae8e07d9b7e5b12fbb487580dc)]:
  - @graphcommerce/graphql@3.0.7
  - @graphcommerce/image@3.1.3
  - @graphcommerce/magento-cart@4.2.3
  - @graphcommerce/magento-customer@4.2.1
  - @graphcommerce/magento-product@4.1.4
  - @graphcommerce/magento-store@4.1.5
  - @graphcommerce/next-ui@4.5.1
  - @graphcommerce/react-hook-form@3.0.7

## 3.0.6

### Patch Changes

- [#1369](https://github.com/graphcommerce-org/graphcommerce/pull/1369) [`ae6449502`](https://github.com/graphcommerce-org/graphcommerce/commit/ae64495024a455bbe5188588604368c1542840c9) Thanks [@paales](https://github.com/paales)! - Upgraded dependencies

- Updated dependencies [[`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`ae6449502`](https://github.com/graphcommerce-org/graphcommerce/commit/ae64495024a455bbe5188588604368c1542840c9), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`6213f0b0f`](https://github.com/graphcommerce-org/graphcommerce/commit/6213f0b0f5f53d622b993d9f7ea96cbbeb5bd670), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a)]:
  - @graphcommerce/graphql@3.0.6
  - @graphcommerce/next-ui@4.5.0
  - @graphcommerce/image@3.1.2
  - @graphcommerce/magento-cart@4.2.2
  - @graphcommerce/magento-customer@4.2.0
  - @graphcommerce/magento-product@4.1.3
  - @graphcommerce/magento-store@4.1.4
  - @graphcommerce/react-hook-form@3.0.6

## 3.0.5

### Patch Changes

- [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655) Thanks [@paales](https://github.com/paales)! - All default exports are now named exports internally and all `index.tsx` are renamed to the component name.

* [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

* Updated dependencies [[`3d63b39f7`](https://github.com/ho-nl/m2-pwa/commit/3d63b39f7e330d1827a32dba782667d7b21adaba), [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655), [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef)]:
  - @graphcommerce/next-ui@4.2.4
  - @graphcommerce/graphql@3.0.4
  - @graphcommerce/image@3.1.1
  - @graphcommerce/magento-cart@4.1.4
  - @graphcommerce/magento-customer@4.1.4
  - @graphcommerce/magento-product@4.0.6
  - @graphcommerce/magento-store@4.1.2
  - @graphcommerce/react-hook-form@3.0.4

## 3.0.4

### Patch Changes

- [#1292](https://github.com/ho-nl/m2-pwa/pull/1292) [`5a1ba9e66`](https://github.com/ho-nl/m2-pwa/commit/5a1ba9e664abbac89c4f5f71f7d6d6ed1aefa5c0) Thanks [@paales](https://github.com/paales)! - Renamed SvgIcon to IconSvg to prevent collisions with MUI

- Updated dependencies [[`5a1ba9e66`](https://github.com/ho-nl/m2-pwa/commit/5a1ba9e664abbac89c4f5f71f7d6d6ed1aefa5c0), [`990df655b`](https://github.com/ho-nl/m2-pwa/commit/990df655b73b469718d6cb5837ee65dfe2ad6a1d), [`63f9b56eb`](https://github.com/ho-nl/m2-pwa/commit/63f9b56eb68ba790567ff1427e599fd2c3c8f1ee)]:
  - @graphcommerce/magento-cart@4.1.3
  - @graphcommerce/magento-customer@4.1.3
  - @graphcommerce/magento-product@4.0.5
  - @graphcommerce/next-ui@4.2.0

## 3.0.3

### Patch Changes

- [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96) Thanks [@paales](https://github.com/paales)! - made packages public

- Updated dependencies [[`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96), [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20), [`3a719c88c`](https://github.com/ho-nl/m2-pwa/commit/3a719c88cad1eab58602de28c41adc0fc4827e1d), [`5ffcb56bf`](https://github.com/ho-nl/m2-pwa/commit/5ffcb56bfcbe49ebeaf24f9341e819a145ab9a14)]:
  - @graphcommerce/graphql@3.0.3
  - @graphcommerce/image@3.1.0
  - @graphcommerce/magento-cart@4.1.2
  - @graphcommerce/magento-customer@4.1.2
  - @graphcommerce/magento-product@4.0.3
  - @graphcommerce/magento-store@4.0.3
  - @graphcommerce/next-ui@4.1.2
  - @graphcommerce/react-hook-form@3.0.3

## 3.0.2

### Patch Changes

- [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2) Thanks [@paales](https://github.com/paales)! - We've moved lots of internal packages from `dependencies` to `peerDependencies`. The result of this is that there will be significantly less duplicate packages in the node_modules folders.

* [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d) Thanks [@paales](https://github.com/paales)! - Upgraded to [NextJS 12.1](https://nextjs.org/blog/next-12-1)! This is just for compatibility, but we'll be implementing [On-demand Incremental Static Regeneration](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta) soon.

  This will greatly reduce the requirement to rebuid stuff and we'll add a management UI on the frontend to be able to revalidate pages manually.

* Updated dependencies [[`381e4c86a`](https://github.com/ho-nl/m2-pwa/commit/381e4c86a8321ce96e1fa5c7d3c0a0c0ff3e02c7), [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2), [`e7c8e2756`](https://github.com/ho-nl/m2-pwa/commit/e7c8e2756d637cbcd2e793d62ef5721d35d9fa7b), [`b08a8eb1d`](https://github.com/ho-nl/m2-pwa/commit/b08a8eb1d024b9d3e7712ef034029151670db275), [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d), [`5a4809b1a`](https://github.com/ho-nl/m2-pwa/commit/5a4809b1a705aa32f620f520085df48ee25f9949)]:
  - @graphcommerce/magento-cart@4.1.1
  - @graphcommerce/magento-customer@4.1.1
  - @graphcommerce/next-ui@4.1.1
  - @graphcommerce/react-hook-form@3.0.2
  - @graphcommerce/graphql@3.0.2
  - @graphcommerce/image@3.0.2
  - @graphcommerce/magento-product@4.0.2
  - @graphcommerce/magento-store@4.0.2

## 3.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514) Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files, so that the packages link to back to the website and repository
- Updated dependencies [[`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514)]:
  - @graphcommerce/graphql@3.0.1
  - @graphcommerce/image@3.0.1
  - @graphcommerce/magento-cart@4.0.1
  - @graphcommerce/magento-customer@4.0.1
  - @graphcommerce/magento-product@4.0.1
  - @graphcommerce/magento-store@4.0.1
  - @graphcommerce/next-ui@4.0.1
  - @graphcommerce/react-hook-form@3.0.1

## 3.0.0

### Major Changes

- [#1258](https://github.com/ho-nl/m2-pwa/pull/1258) [`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05) Thanks [@paales](https://github.com/paales)! - Upgraded to Material UI 5

### Patch Changes

- Updated dependencies [[`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05)]:
  - @graphcommerce/graphql@3.0.0
  - @graphcommerce/image@3.0.0
  - @graphcommerce/magento-cart@4.0.0
  - @graphcommerce/magento-customer@4.0.0
  - @graphcommerce/magento-product@4.0.0
  - @graphcommerce/magento-store@4.0.0
  - @graphcommerce/next-ui@4.0.0
  - @graphcommerce/react-hook-form@3.0.0

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.110.18](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.110.17...@graphcommerce/magento-cart-items@2.110.18) (2021-12-17)

### Bug Fixes

- remove prop required in cart ([f22ba07](https://github.com/ho-nl/m2-pwa/commit/f22ba07960afa44422df1df3b80da687bbc8c5e8))

# [2.110.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.109.1...@graphcommerce/magento-cart-items@2.110.0) (2021-11-12)

### Bug Fixes

- even more translations ([1a1f988](https://github.com/ho-nl/m2-pwa/commit/1a1f98837c704b978f6b42b619d9c52f540b2d48))

### Features

- added tons of translations ([9bb0ac7](https://github.com/ho-nl/m2-pwa/commit/9bb0ac709b58df6ea6141e92e4923a5ca9ae2963))

# [2.109.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.108.20...@graphcommerce/magento-cart-items@2.109.0) (2021-11-12)

### Features

- remove svg stroke definitions, set all to currentColor ([189814f](https://github.com/ho-nl/m2-pwa/commit/189814f822d111c8adc6be1fff65c9a4a4c50c65))

## [2.108.20](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.108.19...@graphcommerce/magento-cart-items@2.108.20) (2021-11-12)

### Bug Fixes

- remove delivery label ([c799405](https://github.com/ho-nl/m2-pwa/commit/c799405e18f7fc2654df67b0c401dfcdef41fd6c))

## [2.108.15](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.108.14...@graphcommerce/magento-cart-items@2.108.15) (2021-11-09)

### Bug Fixes

- font sizes ([1cf7d45](https://github.com/ho-nl/m2-pwa/commit/1cf7d451c3f8bdd064fdf351dffafced97387aff))

## [2.108.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.108.8...@graphcommerce/magento-cart-items@2.108.9) (2021-11-04)

### Bug Fixes

- mobile cart ([fcafe5d](https://github.com/ho-nl/m2-pwa/commit/fcafe5d446f14fca6579d9005dd57389040c4cd3))
- remove hardcoded fontSize ([e4e09e1](https://github.com/ho-nl/m2-pwa/commit/e4e09e11baeb8edeff634550b8cdb88571d96911))

# [2.108.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.107.5...@graphcommerce/magento-cart-items@2.108.0) (2021-11-02)

### Bug Fixes

- darkTheme ([d0517af](https://github.com/ho-nl/m2-pwa/commit/d0517af5a788532c48f567ee3e840986efa26a67))

### Features

- darkTheme ([968f4f1](https://github.com/ho-nl/m2-pwa/commit/968f4f1360417bf7daa36454c19e6bc5cf53ae90))
- darkTheme ([3ed6647](https://github.com/ho-nl/m2-pwa/commit/3ed664714670315bc9f20542549724f66cb5052d))

## [2.107.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.107.0...@graphcommerce/magento-cart-items@2.107.1) (2021-10-28)

### Bug Fixes

- External SVG's can't have alt tags ([1b1414a](https://github.com/ho-nl/m2-pwa/commit/1b1414a782d55d3acf7b0e6bcaa50f2ad5f18f39))

# [2.107.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.106.2...@graphcommerce/magento-cart-items@2.107.0) (2021-10-28)

### Features

- dynamic icons, update SvgImage uses to SvgImageSimple ([3d3cc0e](https://github.com/ho-nl/m2-pwa/commit/3d3cc0e0336fcde1cce6ba19705f82c1edf9bfc6))

# [2.106.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.105.7...@graphcommerce/magento-cart-items@2.106.0) (2021-10-27)

### Features

- **nextjs:** upgraded to nextjs 12 ([9331bc8](https://github.com/ho-nl/m2-pwa/commit/9331bc801f6419522115cc47d291d49d608d5a90))

# [2.105.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.104.29...@graphcommerce/magento-cart-items@2.105.0) (2021-10-18)

### Features

- **message-snackbar:** severity props ([c7be8a5](https://github.com/ho-nl/m2-pwa/commit/c7be8a51faf7a5937b7fab5bb352df2089ae4eea))

## [2.104.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.104.0...@graphcommerce/magento-cart-items@2.104.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/magento-cart-items

# 2.104.0 (2021-09-27)

### Bug Fixes

- app shell consistency wip ([be995ca](https://github.com/ho-nl/m2-pwa/commit/be995ca5c3e383b89fea3759186d53af4790e99b))
- cart item image sizes ([e7c860c](https://github.com/ho-nl/m2-pwa/commit/e7c860c785e172b9275e1a00c8b51509d6b297a8))
- **cart:** be able to remove items from cart ([9c7f939](https://github.com/ho-nl/m2-pwa/commit/9c7f9397e9904e08014e7509d3ca63df8c062032))
- **cart:** display prices with taxes for specific store views ([fd25541](https://github.com/ho-nl/m2-pwa/commit/fd25541646c41111f5ea53822d244591cb08b199))
- **cart:** mobile styles ([aa601af](https://github.com/ho-nl/m2-pwa/commit/aa601af28ca7190ad90c33cc180fe63a28682519))
- display prices excl and incl tax ([0d41135](https://github.com/ho-nl/m2-pwa/commit/0d411350e4621928411c2800be6ea02c6125049a))
- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
- **image:** fix build ([b730cb6](https://github.com/ho-nl/m2-pwa/commit/b730cb6ae4e50dcf2f60e2046d6acf3047caacb3))
- implement next-ui barrel imports ([75bea70](https://github.com/ho-nl/m2-pwa/commit/75bea703dba898f18a2a1dfa3243ebd0a4e6f0e1))

### Features

- **cart:** when a cart is not active anymore show a clear cart button ([5d04a14](https://github.com/ho-nl/m2-pwa/commit/5d04a14726c040b20b34c0b88f923aee1dff22e5))
- **graphql:** introduced new graphql package that holds all generated files ([a3e7aa0](https://github.com/ho-nl/m2-pwa/commit/a3e7aa05540540533b5ced9a95f1f802ecbe499f))
- **image:** introduced completely rewritten Image component ([e3413b3](https://github.com/ho-nl/m2-pwa/commit/e3413b3a57392d6571ea64cb8d9c8dca05ea31df))
- next.js 11 ([7d61407](https://github.com/ho-nl/m2-pwa/commit/7d614075a778f488045034f74be4f75b93f63c43))
- **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of [@reachdigital](https://github.com/reachdigital) ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
- **theme:** restructured fonts and applied to home and category page ([6adf5f1](https://github.com/ho-nl/m2-pwa/commit/6adf5f11321bdfbf499125f1161c5abf5a1bfe4a))
- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))
- useFormMutationCart and simpler imports ([012f090](https://github.com/ho-nl/m2-pwa/commit/012f090e8f54d09f35d393c61ad1e2319f5a90ff))

### Reverts

- Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

# Change Log

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.103.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.103.10...@graphcommerce/magento-cart-items@2.103.11) (2021-08-27)

### Bug Fixes

- app shell consistency wip ([be995ca](https://github.com/ho-nl/m2-pwa/commit/be995ca5c3e383b89fea3759186d53af4790e99b))

## [2.103.10](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.103.9...@graphcommerce/magento-cart-items@2.103.10) (2021-08-26)

### Bug Fixes

- **cart:** mobile styles ([aa601af](https://github.com/ho-nl/m2-pwa/commit/aa601af28ca7190ad90c33cc180fe63a28682519))

## [2.103.8](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.103.7...@graphcommerce/magento-cart-items@2.103.8) (2021-08-18)

### Bug Fixes

- **cart:** display prices with taxes for specific store views ([fd25541](https://github.com/ho-nl/m2-pwa/commit/fd25541646c41111f5ea53822d244591cb08b199))
- display prices excl and incl tax ([0d41135](https://github.com/ho-nl/m2-pwa/commit/0d411350e4621928411c2800be6ea02c6125049a))

# [2.103.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.102.3...@graphcommerce/magento-cart-items@2.103.0) (2021-08-12)

### Features

- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.102.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.102.1...@graphcommerce/magento-cart-items@2.102.2) (2021-08-09)

### Reverts

- Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.101.6...@graphcommerce/magento-cart-items@2.102.0) (2021-08-06)

### Features

- **theme:** restructured fonts and applied to home and category page ([6adf5f1](https://github.com/ho-nl/m2-pwa/commit/6adf5f11321bdfbf499125f1161c5abf5a1bfe4a))

## [2.101.6](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.101.5...@graphcommerce/magento-cart-items@2.101.6) (2021-08-04)

### Bug Fixes

- cart item image sizes ([e7c860c](https://github.com/ho-nl/m2-pwa/commit/e7c860c785e172b9275e1a00c8b51509d6b297a8))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.100.19...@graphcommerce/magento-cart-items@2.101.0) (2021-07-26)

### Features

- **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))

## [2.100.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.100.10...@graphcommerce/magento-cart-items@2.100.11) (2021-07-20)

### Bug Fixes

- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
