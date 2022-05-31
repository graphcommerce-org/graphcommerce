# Change Log

## 3.0.24

### Patch Changes

- Updated dependencies [[`858a3b3a3`](https://github.com/graphcommerce-org/graphcommerce/commit/858a3b3a3601cd00491219daf45557c2f1cc804b)]:
  - @graphcommerce/react-hook-form@3.2.0
  - @graphcommerce/magento-cart@4.3.4
  - @graphcommerce/magento-customer@4.4.2

## 3.0.23

### Patch Changes

- Updated dependencies [[`238aa4d34`](https://github.com/graphcommerce-org/graphcommerce/commit/238aa4d3478773b8cb0973f4112c9829e59e16d6), [`afc67103d`](https://github.com/graphcommerce-org/graphcommerce/commit/afc67103d0e00583e274465036fd287537f95e79)]:
  - @graphcommerce/magento-customer@4.4.1
  - @graphcommerce/next-ui@4.8.3
  - @graphcommerce/magento-cart@4.3.3
  - @graphcommerce/magento-store@4.2.7

## 3.0.22

### Patch Changes

- Updated dependencies [[`d6262de71`](https://github.com/graphcommerce-org/graphcommerce/commit/d6262de71d2254a2b0b492e1a60f9e141767470e), [`c8c246b8a`](https://github.com/graphcommerce-org/graphcommerce/commit/c8c246b8aaab0621b68a2fca2a1c529a56fad962), [`e3005fe63`](https://github.com/graphcommerce-org/graphcommerce/commit/e3005fe6306093d47b08c6756c21c8175649e30b)]:
  - @graphcommerce/magento-customer@4.4.0
  - @graphcommerce/magento-cart@4.3.2
  - @graphcommerce/next-ui@4.8.2
  - @graphcommerce/magento-store@4.2.6

## 3.0.21

### Patch Changes

- Updated dependencies [[`a9df81310`](https://github.com/graphcommerce-org/graphcommerce/commit/a9df81310c051876dd82fb2819105dece47cc213), [`f167f9963`](https://github.com/graphcommerce-org/graphcommerce/commit/f167f99630966a7de43717937d43669e66132494)]:
  - @graphcommerce/next-ui@4.8.1
  - @graphcommerce/magento-cart@4.3.1
  - @graphcommerce/magento-customer@4.3.2
  - @graphcommerce/magento-store@4.2.5
  - @graphcommerce/image@3.1.6

## 3.0.20

### Patch Changes

- [#1476](https://github.com/graphcommerce-org/graphcommerce/pull/1476) [`4cda98ea6`](https://github.com/graphcommerce-org/graphcommerce/commit/4cda98ea6f5f0cbb68fd67956b69524618c396fa) Thanks [@paales](https://github.com/paales)! - move CustomerAddressForm import to package root

- Updated dependencies [[`a12db31b9`](https://github.com/graphcommerce-org/graphcommerce/commit/a12db31b9db9d27d86f59c1bfe58a0879999b9d3), [`cf575395c`](https://github.com/graphcommerce-org/graphcommerce/commit/cf575395c16e9c571f75d4563004c3018a29aeaa)]:
  - @graphcommerce/magento-customer@4.3.1
  - @graphcommerce/magento-cart@4.3.0

## 3.0.19

### Patch Changes

- [#1470](https://github.com/graphcommerce-org/graphcommerce/pull/1470) [`aac7bb3ad`](https://github.com/graphcommerce-org/graphcommerce/commit/aac7bb3adc62b0646813ab6a3ca9c3eb216e9caf) Thanks [@paales](https://github.com/paales)! - Saving a new address didn’t work because it expects saveInAddressBook

## 3.0.18

### Patch Changes

- Updated dependencies [[`0363b9671`](https://github.com/graphcommerce-org/graphcommerce/commit/0363b9671db7c2932321d97faf6f1eb385238397), [`3ac90b57c`](https://github.com/graphcommerce-org/graphcommerce/commit/3ac90b57c68b96f9d81771d6664ed9435a28fc1d), [`00f6167ff`](https://github.com/graphcommerce-org/graphcommerce/commit/00f6167ff4096bf7432f3d8e8e739ecbf6ab0dd2), [`7159d3ab3`](https://github.com/graphcommerce-org/graphcommerce/commit/7159d3ab31e937c9c921023c46e80db5813e789c), [`32370574b`](https://github.com/graphcommerce-org/graphcommerce/commit/32370574bef6345b857ae911049ca27a64bc7e08), [`ed2b67a06`](https://github.com/graphcommerce-org/graphcommerce/commit/ed2b67a0618d9db97e79ed2a8226e0ae12403943), [`4c146c682`](https://github.com/graphcommerce-org/graphcommerce/commit/4c146c68242e6edc616807fb73173cc959c26034)]:
  - @graphcommerce/next-ui@4.8.0
  - @graphcommerce/magento-customer@4.3.0
  - @graphcommerce/magento-cart@4.2.15
  - @graphcommerce/magento-store@4.2.4

## 3.0.17

### Patch Changes

- Updated dependencies [[`c30893857`](https://github.com/graphcommerce-org/graphcommerce/commit/c3089385791291e812a48c2691a39a2325ee0439)]:
  - @graphcommerce/magento-store@4.2.3
  - @graphcommerce/magento-cart@4.2.14
  - @graphcommerce/magento-customer@4.2.12

## 3.0.16

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
  - @graphcommerce/magento-store@4.2.2
  - @graphcommerce/next-ui@4.7.2
  - @graphcommerce/graphql@3.1.3

## 3.0.15

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/magento-cart@4.2.12
  - @graphcommerce/magento-customer@4.2.10

## 3.0.14

### Patch Changes

- Updated dependencies [[`25ef6cf08`](https://github.com/graphcommerce-org/graphcommerce/commit/25ef6cf08c278105307d6f604b7135d637e9046c), [`80e30bb77`](https://github.com/graphcommerce-org/graphcommerce/commit/80e30bb77015755fbc00a7935d590f80c1c1c18c)]:
  - @graphcommerce/graphql@3.1.2
  - @graphcommerce/magento-customer@4.2.9
  - @graphcommerce/magento-cart@4.2.11
  - @graphcommerce/magento-store@4.2.1
  - @graphcommerce/next-ui@4.7.1

## 3.0.13

### Patch Changes

- Updated dependencies [[`f3d06dd83`](https://github.com/graphcommerce-org/graphcommerce/commit/f3d06dd836c9a76412b419d4d2c79bbd0ee92e04)]:
  - @graphcommerce/magento-store@4.2.0
  - @graphcommerce/next-ui@4.7.0
  - @graphcommerce/magento-cart@4.2.10
  - @graphcommerce/magento-customer@4.2.8

## 3.0.12

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/magento-cart@4.2.9
  - @graphcommerce/magento-customer@4.2.7
  - @graphcommerce/magento-store@4.1.9

## 3.0.11

### Patch Changes

- Updated dependencies [[`100f4c38c`](https://github.com/graphcommerce-org/graphcommerce/commit/100f4c38c8fcda4bc6e0425e38028b550b60adc2)]:
  - @graphcommerce/graphql@3.1.1
  - @graphcommerce/next-ui@4.6.2
  - @graphcommerce/react-hook-form@3.1.2
  - @graphcommerce/magento-customer@4.2.6
  - @graphcommerce/magento-store@4.1.8
  - @graphcommerce/magento-cart@4.2.8

## 3.0.10

### Patch Changes

- Updated dependencies [[`d8906cf4a`](https://github.com/graphcommerce-org/graphcommerce/commit/d8906cf4afbfc234aedd91a2c581f82623267357)]:
  - @graphcommerce/magento-cart@4.2.7
  - @graphcommerce/magento-customer@4.2.5

## 3.0.9

### Patch Changes

- [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`da0ae7d02`](https://github.com/graphcommerce-org/graphcommerce/commit/da0ae7d0236e4908ba0bf0fa16656be516e841d4) Thanks [@paales](https://github.com/paales)! - Updated dependencies

- Updated dependencies [[`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542), [`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542), [`da0ae7d02`](https://github.com/graphcommerce-org/graphcommerce/commit/da0ae7d0236e4908ba0bf0fa16656be516e841d4)]:
  - @graphcommerce/graphql@3.1.0
  - @graphcommerce/magento-cart@4.2.6
  - @graphcommerce/magento-customer@4.2.4
  - @graphcommerce/magento-store@4.1.7
  - @graphcommerce/next-ui@4.6.1
  - @graphcommerce/react-hook-form@3.1.1
  - @graphcommerce/image@3.1.5

## 3.0.8

### Patch Changes

- Updated dependencies [[`4169b8c68`](https://github.com/graphcommerce-org/graphcommerce/commit/4169b8c686f682ff6e981b029f13abd87fd5f52a)]:
  - @graphcommerce/magento-customer@4.2.3
  - @graphcommerce/magento-cart@4.2.5

## 3.0.7

### Patch Changes

- Updated dependencies [[`3c801f45c`](https://github.com/graphcommerce-org/graphcommerce/commit/3c801f45c7df55131acf30ae2fe0d2344830d480), [`b8d04130a`](https://github.com/graphcommerce-org/graphcommerce/commit/b8d04130a1b1cb8fc85308939235140288744465), [`3192fab82`](https://github.com/graphcommerce-org/graphcommerce/commit/3192fab82560e2211dfcacadc3b0b305260527d8), [`104abd14e`](https://github.com/graphcommerce-org/graphcommerce/commit/104abd14e1585ef0d8de77937d25156b8fa1e201), [`0e425e85e`](https://github.com/graphcommerce-org/graphcommerce/commit/0e425e85ee8fed280349317ee0440c7bceea5823), [`2a125b1f9`](https://github.com/graphcommerce-org/graphcommerce/commit/2a125b1f98bb9272d96c3577f21d6c984caad892), [`8a354d1cd`](https://github.com/graphcommerce-org/graphcommerce/commit/8a354d1cd4757497ddfc9b1969a0addbc8ff616b)]:
  - @graphcommerce/next-ui@4.6.0
  - @graphcommerce/magento-cart@4.2.4
  - @graphcommerce/react-hook-form@3.1.0
  - @graphcommerce/image@3.1.4
  - @graphcommerce/magento-customer@4.2.2
  - @graphcommerce/magento-store@4.1.6

## 3.0.6

### Patch Changes

- [#1378](https://github.com/graphcommerce-org/graphcommerce/pull/1378) [`b610a6e40`](https://github.com/graphcommerce-org/graphcommerce/commit/b610a6e4049e8c9e8b5d2aeff31b8e1bfc24abe5) Thanks [@paales](https://github.com/paales)! - Pin all versions internally so we can’t end up in an unfixable state for the user

- Updated dependencies [[`b610a6e40`](https://github.com/graphcommerce-org/graphcommerce/commit/b610a6e4049e8c9e8b5d2aeff31b8e1bfc24abe5), [`22ff9df16`](https://github.com/graphcommerce-org/graphcommerce/commit/22ff9df1677742ae8e07d9b7e5b12fbb487580dc)]:
  - @graphcommerce/graphql@3.0.7
  - @graphcommerce/image@3.1.3
  - @graphcommerce/magento-cart@4.2.3
  - @graphcommerce/magento-customer@4.2.1
  - @graphcommerce/magento-store@4.1.5
  - @graphcommerce/next-ui@4.5.1
  - @graphcommerce/react-hook-form@3.0.7

## 3.0.5

### Patch Changes

- [#1369](https://github.com/graphcommerce-org/graphcommerce/pull/1369) [`ae6449502`](https://github.com/graphcommerce-org/graphcommerce/commit/ae64495024a455bbe5188588604368c1542840c9) Thanks [@paales](https://github.com/paales)! - Upgraded dependencies

- Updated dependencies [[`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`ae6449502`](https://github.com/graphcommerce-org/graphcommerce/commit/ae64495024a455bbe5188588604368c1542840c9), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`6213f0b0f`](https://github.com/graphcommerce-org/graphcommerce/commit/6213f0b0f5f53d622b993d9f7ea96cbbeb5bd670), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a)]:
  - @graphcommerce/graphql@3.0.6
  - @graphcommerce/next-ui@4.5.0
  - @graphcommerce/image@3.1.2
  - @graphcommerce/magento-cart@4.2.2
  - @graphcommerce/magento-customer@4.2.0
  - @graphcommerce/magento-store@4.1.4
  - @graphcommerce/react-hook-form@3.0.6

## 3.0.4

### Patch Changes

- [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655) Thanks [@paales](https://github.com/paales)! - All default exports are now named exports internally and all `index.tsx` are renamed to the component name.

* [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

* Updated dependencies [[`3d63b39f7`](https://github.com/ho-nl/m2-pwa/commit/3d63b39f7e330d1827a32dba782667d7b21adaba), [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655), [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef)]:
  - @graphcommerce/next-ui@4.2.4
  - @graphcommerce/graphql@3.0.4
  - @graphcommerce/image@3.1.1
  - @graphcommerce/magento-cart@4.1.4
  - @graphcommerce/magento-customer@4.1.4
  - @graphcommerce/magento-store@4.1.2
  - @graphcommerce/react-hook-form@3.0.4

## 3.0.3

### Patch Changes

- [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96) Thanks [@paales](https://github.com/paales)! - made packages public

- Updated dependencies [[`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96), [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20), [`3a719c88c`](https://github.com/ho-nl/m2-pwa/commit/3a719c88cad1eab58602de28c41adc0fc4827e1d), [`5ffcb56bf`](https://github.com/ho-nl/m2-pwa/commit/5ffcb56bfcbe49ebeaf24f9341e819a145ab9a14)]:
  - @graphcommerce/graphql@3.0.3
  - @graphcommerce/image@3.1.0
  - @graphcommerce/magento-cart@4.1.2
  - @graphcommerce/magento-customer@4.1.2
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
  - @graphcommerce/magento-store@4.0.2

## 3.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514) Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files, so that the packages link to back to the website and repository
- Updated dependencies [[`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514)]:
  - @graphcommerce/graphql@3.0.1
  - @graphcommerce/image@3.0.1
  - @graphcommerce/magento-cart@4.0.1
  - @graphcommerce/magento-customer@4.0.1
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
  - @graphcommerce/magento-store@4.0.0
  - @graphcommerce/next-ui@4.0.0
  - @graphcommerce/react-hook-form@3.0.0

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.106.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-shipping-address@2.105.31...@graphcommerce/magento-cart-shipping-address@2.106.0) (2021-11-12)

### Bug Fixes

- even more translations ([1a1f988](https://github.com/ho-nl/m2-pwa/commit/1a1f98837c704b978f6b42b619d9c52f540b2d48))

### Features

- added tons of translations ([9bb0ac7](https://github.com/ho-nl/m2-pwa/commit/9bb0ac709b58df6ea6141e92e4923a5ca9ae2963))

# [2.105.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-shipping-address@2.104.3...@graphcommerce/magento-cart-shipping-address@2.105.0) (2021-10-27)

### Features

- **nextjs:** upgraded to nextjs 12 ([9331bc8](https://github.com/ho-nl/m2-pwa/commit/9331bc801f6419522115cc47d291d49d608d5a90))

# [2.104.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-shipping-address@2.103.33...@graphcommerce/magento-cart-shipping-address@2.104.0) (2021-10-21)

### Features

- ability to change shipping address after changing the billing address ([101f11a](https://github.com/ho-nl/m2-pwa/commit/101f11a6472cd6e72e08152cec961df47411f310))

## [2.103.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-shipping-address@2.103.0...@graphcommerce/magento-cart-shipping-address@2.103.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/magento-cart-shipping-address

# 2.103.0 (2021-09-27)

### Bug Fixes

- add removed form import ([4bfea00](https://github.com/ho-nl/m2-pwa/commit/4bfea00038cebd50fb1bc6a123bc697ac582f06d))
- display empty country in country selector ([8b2a6a7](https://github.com/ho-nl/m2-pwa/commit/8b2a6a7af4ec1dec745dd96687712bc5a17b28d4))
- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
- implement next-ui barrel imports ([75bea70](https://github.com/ho-nl/m2-pwa/commit/75bea703dba898f18a2a1dfa3243ebd0a4e6f0e1))
- make sure ComposedForm actually submits correctly ([c6499d9](https://github.com/ho-nl/m2-pwa/commit/c6499d9d36f874cd65b310cbf7f63f5a88fa86cd))

### Features

- add barrel file for magento-customer ([02fb7f0](https://github.com/ho-nl/m2-pwa/commit/02fb7f004de968ee968b00e364b2b370f4f7d4f1))
- always use same shipping and billing address ([7b613bf](https://github.com/ho-nl/m2-pwa/commit/7b613bf569e69c76bcc4750943bf4adaa0132eb9))
- **cart:** when a cart is not active anymore show a clear cart button ([5d04a14](https://github.com/ho-nl/m2-pwa/commit/5d04a14726c040b20b34c0b88f923aee1dff22e5))
- **graphql:** introduced new graphql package that holds all generated files ([a3e7aa0](https://github.com/ho-nl/m2-pwa/commit/a3e7aa05540540533b5ced9a95f1f802ecbe499f))
- **image:** introduced completely rewritten Image component ([e3413b3](https://github.com/ho-nl/m2-pwa/commit/e3413b3a57392d6571ea64cb8d9c8dca05ea31df))
- implemented purchase order ([3a40033](https://github.com/ho-nl/m2-pwa/commit/3a40033cd4d6712a17bb9c41a8841ebf7aa2f025))
- **next-ui:** SectionContainer/SectionHeader now accepts variantLeft/variantRight as prop ([a58f8f2](https://github.com/ho-nl/m2-pwa/commit/a58f8f2962e74c9aaa41142524d42d9c8f662b8d))
- next.js 11 ([7d61407](https://github.com/ho-nl/m2-pwa/commit/7d614075a778f488045034f74be4f75b93f63c43))
- **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of [@reachdigital](https://github.com/reachdigital) ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
- submit composed form sequentially ([890d839](https://github.com/ho-nl/m2-pwa/commit/890d8393d635c3777aa17cfa8d4dafc13c2e6cdc))
- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))
- useFormMutationCart and simpler imports ([012f090](https://github.com/ho-nl/m2-pwa/commit/012f090e8f54d09f35d393c61ad1e2319f5a90ff))

### Reverts

- Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

# Change Log

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-shipping-address@2.101.10...@graphcommerce/magento-cart-shipping-address@2.102.0) (2021-08-12)

### Features

- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.101.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-shipping-address@2.101.8...@graphcommerce/magento-cart-shipping-address@2.101.9) (2021-08-09)

### Reverts

- Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-shipping-address@2.100.19...@graphcommerce/magento-cart-shipping-address@2.101.0) (2021-07-26)

### Features

- **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))

## [2.100.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-shipping-address@2.100.10...@graphcommerce/magento-cart-shipping-address@2.100.11) (2021-07-20)

### Bug Fixes

- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
