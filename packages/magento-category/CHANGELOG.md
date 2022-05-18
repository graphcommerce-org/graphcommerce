# Change Log

## 4.1.6

### Patch Changes

- Updated dependencies [[`0363b9671`](https://github.com/graphcommerce-org/graphcommerce/commit/0363b9671db7c2932321d97faf6f1eb385238397), [`c6a62a338`](https://github.com/graphcommerce-org/graphcommerce/commit/c6a62a338abf8af83d3a6eb7ed796586009910ca), [`3ac90b57c`](https://github.com/graphcommerce-org/graphcommerce/commit/3ac90b57c68b96f9d81771d6664ed9435a28fc1d)]:
  - @graphcommerce/next-ui@4.8.0
  - @graphcommerce/magento-product@4.3.5
  - @graphcommerce/framer-scroller@2.1.11
  - @graphcommerce/magento-store@4.2.4

## 4.1.5

### Patch Changes

- Updated dependencies [[`c30893857`](https://github.com/graphcommerce-org/graphcommerce/commit/c3089385791291e812a48c2691a39a2325ee0439)]:
  - @graphcommerce/magento-store@4.2.3
  - @graphcommerce/magento-product@4.3.4

## 4.1.4

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

- Updated dependencies [[`f698ff85d`](https://github.com/graphcommerce-org/graphcommerce/commit/f698ff85df6bb0922288471bb3c81856091b8061)]:
  - @graphcommerce/framer-scroller@2.1.10
  - @graphcommerce/magento-product@4.3.3
  - @graphcommerce/magento-store@4.2.2
  - @graphcommerce/next-ui@4.7.2
  - @graphcommerce/graphql@3.1.3

## 4.1.3

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/magento-product@4.3.2

## 4.1.2

### Patch Changes

- Updated dependencies [[`25ef6cf08`](https://github.com/graphcommerce-org/graphcommerce/commit/25ef6cf08c278105307d6f604b7135d637e9046c), [`80e30bb77`](https://github.com/graphcommerce-org/graphcommerce/commit/80e30bb77015755fbc00a7935d590f80c1c1c18c)]:
  - @graphcommerce/graphql@3.1.2
  - @graphcommerce/magento-product@4.3.1
  - @graphcommerce/magento-store@4.2.1
  - @graphcommerce/next-ui@4.7.1
  - @graphcommerce/framer-scroller@2.1.9

## 4.1.1

### Patch Changes

- Updated dependencies [[`669a17a97`](https://github.com/graphcommerce-org/graphcommerce/commit/669a17a973c47c00fed4a649a9da0bfc5670c5da)]:
  - @graphcommerce/magento-product@4.3.0

## 4.1.0

### Minor Changes

- [#1434](https://github.com/graphcommerce-org/graphcommerce/pull/1434) [`3c1c9ce2a`](https://github.com/graphcommerce-org/graphcommerce/commit/3c1c9ce2a947386515df019c31d697114a87dc07) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Add page number to meta title and description

## 4.0.15

### Patch Changes

- Updated dependencies [[`f3d06dd83`](https://github.com/graphcommerce-org/graphcommerce/commit/f3d06dd836c9a76412b419d4d2c79bbd0ee92e04)]:
  - @graphcommerce/magento-product@4.2.0
  - @graphcommerce/magento-store@4.2.0
  - @graphcommerce/next-ui@4.7.0
  - @graphcommerce/framer-scroller@2.1.8

## 4.0.14

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/magento-product@4.1.11
  - @graphcommerce/magento-store@4.1.9

## 4.0.13

### Patch Changes

- [#1394](https://github.com/graphcommerce-org/graphcommerce/pull/1394) [`b6b8bb5b3`](https://github.com/graphcommerce-org/graphcommerce/commit/b6b8bb5b31b0891ea24733de34a3bd5c0a9604e4) Thanks [@paales](https://github.com/paales)! - Made fragments injectable so they can be extended

- Updated dependencies [[`b6b8bb5b3`](https://github.com/graphcommerce-org/graphcommerce/commit/b6b8bb5b31b0891ea24733de34a3bd5c0a9604e4), [`100f4c38c`](https://github.com/graphcommerce-org/graphcommerce/commit/100f4c38c8fcda4bc6e0425e38028b550b60adc2)]:
  - @graphcommerce/magento-product@4.1.10
  - @graphcommerce/graphql@3.1.1
  - @graphcommerce/next-ui@4.6.2
  - @graphcommerce/magento-store@4.1.8
  - @graphcommerce/framer-scroller@2.1.7

## 4.0.12

### Patch Changes

- Updated dependencies [[`a52a863f9`](https://github.com/graphcommerce-org/graphcommerce/commit/a52a863f9c69c6b3ae657dcce3bc9b14413ce125)]:
  - @graphcommerce/magento-product@4.1.9

## 4.0.11

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/magento-product@4.1.8

## 4.0.10

### Patch Changes

- [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`da0ae7d02`](https://github.com/graphcommerce-org/graphcommerce/commit/da0ae7d0236e4908ba0bf0fa16656be516e841d4) Thanks [@paales](https://github.com/paales)! - Updated dependencies

- Updated dependencies [[`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542), [`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542), [`da0ae7d02`](https://github.com/graphcommerce-org/graphcommerce/commit/da0ae7d0236e4908ba0bf0fa16656be516e841d4)]:
  - @graphcommerce/graphql@3.1.0
  - @graphcommerce/magento-product@4.1.7
  - @graphcommerce/magento-store@4.1.7
  - @graphcommerce/next-ui@4.6.1
  - @graphcommerce/framer-scroller@2.1.6
  - @graphcommerce/image@3.1.5

## 4.0.9

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/magento-product@4.1.6

## 4.0.8

### Patch Changes

- Updated dependencies [[`3c801f45c`](https://github.com/graphcommerce-org/graphcommerce/commit/3c801f45c7df55131acf30ae2fe0d2344830d480), [`3192fab82`](https://github.com/graphcommerce-org/graphcommerce/commit/3192fab82560e2211dfcacadc3b0b305260527d8), [`0e425e85e`](https://github.com/graphcommerce-org/graphcommerce/commit/0e425e85ee8fed280349317ee0440c7bceea5823), [`8a354d1cd`](https://github.com/graphcommerce-org/graphcommerce/commit/8a354d1cd4757497ddfc9b1969a0addbc8ff616b), [`9b3488c6a`](https://github.com/graphcommerce-org/graphcommerce/commit/9b3488c6a03cc09a647f43f6a8b36d96e97e5bb8)]:
  - @graphcommerce/next-ui@4.6.0
  - @graphcommerce/image@3.1.4
  - @graphcommerce/magento-product@4.1.5
  - @graphcommerce/framer-scroller@2.1.5
  - @graphcommerce/magento-store@4.1.6

## 4.0.7

### Patch Changes

- [#1378](https://github.com/graphcommerce-org/graphcommerce/pull/1378) [`b610a6e40`](https://github.com/graphcommerce-org/graphcommerce/commit/b610a6e4049e8c9e8b5d2aeff31b8e1bfc24abe5) Thanks [@paales](https://github.com/paales)! - Pin all versions internally so we can’t end up in an unfixable state for the user

- Updated dependencies [[`b610a6e40`](https://github.com/graphcommerce-org/graphcommerce/commit/b610a6e4049e8c9e8b5d2aeff31b8e1bfc24abe5)]:
  - @graphcommerce/framer-scroller@2.1.4
  - @graphcommerce/graphql@3.0.7
  - @graphcommerce/image@3.1.3
  - @graphcommerce/magento-product@4.1.4
  - @graphcommerce/magento-store@4.1.5
  - @graphcommerce/next-ui@4.5.1

## 4.0.6

### Patch Changes

- [#1369](https://github.com/graphcommerce-org/graphcommerce/pull/1369) [`ae6449502`](https://github.com/graphcommerce-org/graphcommerce/commit/ae64495024a455bbe5188588604368c1542840c9) Thanks [@paales](https://github.com/paales)! - Upgraded dependencies

- Updated dependencies [[`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`ae6449502`](https://github.com/graphcommerce-org/graphcommerce/commit/ae64495024a455bbe5188588604368c1542840c9), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a)]:
  - @graphcommerce/graphql@3.0.6
  - @graphcommerce/next-ui@4.5.0
  - @graphcommerce/framer-scroller@2.1.3
  - @graphcommerce/image@3.1.2
  - @graphcommerce/magento-product@4.1.3
  - @graphcommerce/magento-store@4.1.4

## 4.0.5

### Patch Changes

- [#1322](https://github.com/graphcommerce-org/graphcommerce/pull/1322) [`815132ea4`](https://github.com/graphcommerce-org/graphcommerce/commit/815132ea43937b4b84b59ec9974ac593cb4eb456) Thanks [@paales](https://github.com/paales)! - Make sure canonicals don’t report about double slashes and add warning when incorrect URL is passed

- Updated dependencies [[`5266388ea`](https://github.com/graphcommerce-org/graphcommerce/commit/5266388eaffda41592623ef7a3ddbbe03c8e0dad), [`9b35403d9`](https://github.com/graphcommerce-org/graphcommerce/commit/9b35403d9dbb2606ac7cf3bb641a0f9cc3d8a2ba), [`0298a0de1`](https://github.com/graphcommerce-org/graphcommerce/commit/0298a0de1d13e543c4124a6a099297b4e27e2b05), [`815132ea4`](https://github.com/graphcommerce-org/graphcommerce/commit/815132ea43937b4b84b59ec9974ac593cb4eb456), [`3326742a0`](https://github.com/graphcommerce-org/graphcommerce/commit/3326742a0dceb45f0cac4741ca09dc4d4f09ad90), [`7a3799bfc`](https://github.com/graphcommerce-org/graphcommerce/commit/7a3799bfc107f26aa9991a91db5f228e3476f4aa), [`9a77f88ed`](https://github.com/graphcommerce-org/graphcommerce/commit/9a77f88ed26cbecdae9a135c3cb234a5b7ecf4df), [`1e2a07141`](https://github.com/graphcommerce-org/graphcommerce/commit/1e2a071414154600430e6dcf0513d86ab78e0b28), [`bc8826b9d`](https://github.com/graphcommerce-org/graphcommerce/commit/bc8826b9dc1e6418b2720c9211e46791c33fca8a), [`0eeaad304`](https://github.com/graphcommerce-org/graphcommerce/commit/0eeaad30461b1d5b486438f0287fa76d49429044), [`bc5213547`](https://github.com/graphcommerce-org/graphcommerce/commit/bc52135471479c83d989449dad24798112e898f4), [`3f1912f55`](https://github.com/graphcommerce-org/graphcommerce/commit/3f1912f553318d5888f8af2b841918ef4ae96a84), [`7e910f3b8`](https://github.com/graphcommerce-org/graphcommerce/commit/7e910f3b8eb73cff33261956937124f95520d8e5), [`d91359871`](https://github.com/graphcommerce-org/graphcommerce/commit/d91359871b023a9f0d305b37353c1ee2d0912248), [`b6c68cda8`](https://github.com/graphcommerce-org/graphcommerce/commit/b6c68cda8836a1d0c78ef351899cec9ec1037385), [`e4ded94d7`](https://github.com/graphcommerce-org/graphcommerce/commit/e4ded94d7b0f0c87f86abcd31340d75533bde73e)]:
  - @graphcommerce/next-ui@4.3.0
  - @graphcommerce/magento-product@4.1.0
  - @graphcommerce/magento-store@4.1.3
  - @graphcommerce/framer-scroller@2.1.0

## 4.0.4

### Patch Changes

- [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655) Thanks [@paales](https://github.com/paales)! - All default exports are now named exports internally and all `index.tsx` are renamed to the component name.

* [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

* Updated dependencies [[`3d63b39f7`](https://github.com/ho-nl/m2-pwa/commit/3d63b39f7e330d1827a32dba782667d7b21adaba), [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655), [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef)]:
  - @graphcommerce/next-ui@4.2.4
  - @graphcommerce/framer-scroller@2.0.6
  - @graphcommerce/graphql@3.0.4
  - @graphcommerce/image@3.1.1
  - @graphcommerce/magento-product@4.0.6
  - @graphcommerce/magento-store@4.1.2

## 4.0.3

### Patch Changes

- [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96) Thanks [@paales](https://github.com/paales)! - made packages public

* [#1278](https://github.com/ho-nl/m2-pwa/pull/1278) [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Upgraded dependencies to the latest version

* Updated dependencies [[`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96), [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20), [`3a719c88c`](https://github.com/ho-nl/m2-pwa/commit/3a719c88cad1eab58602de28c41adc0fc4827e1d), [`5ffcb56bf`](https://github.com/ho-nl/m2-pwa/commit/5ffcb56bfcbe49ebeaf24f9341e819a145ab9a14)]:
  - @graphcommerce/framer-scroller@2.0.3
  - @graphcommerce/graphql@3.0.3
  - @graphcommerce/image@3.1.0
  - @graphcommerce/magento-product@4.0.3
  - @graphcommerce/magento-store@4.0.3
  - @graphcommerce/next-ui@4.1.2

## 4.0.2

### Patch Changes

- [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2) Thanks [@paales](https://github.com/paales)! - We've moved lots of internal packages from `dependencies` to `peerDependencies`. The result of this is that there will be significantly less duplicate packages in the node_modules folders.

* [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d) Thanks [@paales](https://github.com/paales)! - Upgraded to [NextJS 12.1](https://nextjs.org/blog/next-12-1)! This is just for compatibility, but we'll be implementing [On-demand Incremental Static Regeneration](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta) soon.

  This will greatly reduce the requirement to rebuid stuff and we'll add a management UI on the frontend to be able to revalidate pages manually.

* Updated dependencies [[`381e4c86a`](https://github.com/ho-nl/m2-pwa/commit/381e4c86a8321ce96e1fa5c7d3c0a0c0ff3e02c7), [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2), [`e7c8e2756`](https://github.com/ho-nl/m2-pwa/commit/e7c8e2756d637cbcd2e793d62ef5721d35d9fa7b), [`b08a8eb1d`](https://github.com/ho-nl/m2-pwa/commit/b08a8eb1d024b9d3e7712ef034029151670db275), [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d)]:
  - @graphcommerce/next-ui@4.1.1
  - @graphcommerce/framer-scroller@2.0.2
  - @graphcommerce/graphql@3.0.2
  - @graphcommerce/image@3.0.2
  - @graphcommerce/magento-product@4.0.2
  - @graphcommerce/magento-store@4.0.2

## 4.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514) Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files, so that the packages link to back to the website and repository
- Updated dependencies [[`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514)]:
  - @graphcommerce/framer-scroller@2.0.1
  - @graphcommerce/graphql@3.0.1
  - @graphcommerce/image@3.0.1
  - @graphcommerce/magento-product@4.0.1
  - @graphcommerce/magento-store@4.0.1
  - @graphcommerce/next-ui@4.0.1

## 4.0.0

### Major Changes

- [#1258](https://github.com/ho-nl/m2-pwa/pull/1258) [`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05) Thanks [@paales](https://github.com/paales)! - Upgraded to Material UI 5

### Patch Changes

- Updated dependencies [[`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05)]:
  - @graphcommerce/framer-scroller@2.0.0
  - @graphcommerce/graphql@3.0.0
  - @graphcommerce/image@3.0.0
  - @graphcommerce/magento-product@4.0.0
  - @graphcommerce/magento-store@4.0.0
  - @graphcommerce/next-ui@4.0.0

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.5.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-category@3.5.1...@graphcommerce/magento-category@3.5.2) (2021-12-03)

### Bug Fixes

- spacing of LayoutTItle ([7afcd31](https://github.com/ho-nl/m2-pwa/commit/7afcd3163d16e902cf2ff7917f56ee6a8798f55b))

# [3.5.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-category@3.4.4...@graphcommerce/magento-category@3.5.0) (2021-12-01)

### Features

- borderRadius based on theme.shape.borderRadius ([7c34937](https://github.com/ho-nl/m2-pwa/commit/7c349376cd41a131c628324c299106fdb7e60484))
- introduce borderRadius ([183afbc](https://github.com/ho-nl/m2-pwa/commit/183afbc8ee269f6694c372b06afdf41302f86c09))

# [3.4.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-category@3.3.29...@graphcommerce/magento-category@3.4.0) (2021-11-12)

### Features

- added tons of translations ([9bb0ac7](https://github.com/ho-nl/m2-pwa/commit/9bb0ac709b58df6ea6141e92e4923a5ca9ae2963))

## [3.3.28](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-category@3.3.27...@graphcommerce/magento-category@3.3.28) (2021-11-12)

### Bug Fixes

- fix spacing category video ([592f569](https://github.com/ho-nl/m2-pwa/commit/592f5690b28a423f10efaa4e685fdf7aaa9260dd))
- safari video height stretch fix ([76a800b](https://github.com/ho-nl/m2-pwa/commit/76a800b80bd29fd92f55ff9d9e24bb8e1bfdf830))

## [3.3.26](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-category@3.3.25...@graphcommerce/magento-category@3.3.26) (2021-11-11)

### Bug Fixes

- **category-hero-nav:** category children mobile styles ([7928853](https://github.com/ho-nl/m2-pwa/commit/79288538bb3b99682a7beea22223d35106a5d9c2))
- **category-hero-nav:** category positioning ([2921dde](https://github.com/ho-nl/m2-pwa/commit/2921ddec4731e19c1ccb11f941ec59826a1f908d))
- **category-hero-nav:** spacing ([94de2cf](https://github.com/ho-nl/m2-pwa/commit/94de2cf7be9c82a6408dbe33438275051d57143d))

## [3.3.6](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-category@3.3.5...@graphcommerce/magento-category@3.3.6) (2021-11-02)

### Bug Fixes

- darkMode ([c7573de](https://github.com/ho-nl/m2-pwa/commit/c7573de6bb80643b26931c35ac61735539e7fbf0))

## [3.3.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-category@3.3.2...@graphcommerce/magento-category@3.3.3) (2021-11-01)

### Bug Fixes

- category page design fixs ([d3fccc2](https://github.com/ho-nl/m2-pwa/commit/d3fccc2a86106b854e9a1fd89040a248fe20c99a))

## [3.3.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-category@3.3.1...@graphcommerce/magento-category@3.3.2) (2021-10-29)

### Bug Fixes

- spacing of title on category landing on mobile ([8ed3550](https://github.com/ho-nl/m2-pwa/commit/8ed35502fd231d1d6a8e0a282f8961335d9dead3))

# [3.3.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-category@3.2.2...@graphcommerce/magento-category@3.3.0) (2021-10-28)

### Bug Fixes

- category h2 styling ([5b26f2b](https://github.com/ho-nl/m2-pwa/commit/5b26f2b92f55356c58cc207fa028d03a38a8b16a))
- remove legacy, title from category description ([574208c](https://github.com/ho-nl/m2-pwa/commit/574208ca71e6ed387f1f355d5c4a22f5c13783ea))
- subtitles ([9ef1d8b](https://github.com/ho-nl/m2-pwa/commit/9ef1d8b9079c50340015e482fe6f1bf577610269))

### Features

- set correct font sizes ([9317448](https://github.com/ho-nl/m2-pwa/commit/9317448c94a9fb4408dfbcaa320adccc363964d0))

# [3.2.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-category@3.1.7...@graphcommerce/magento-category@3.2.0) (2021-10-27)

### Features

- **nextjs:** upgraded to nextjs 12 ([9331bc8](https://github.com/ho-nl/m2-pwa/commit/9331bc801f6419522115cc47d291d49d608d5a90))

## [3.1.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-category@3.1.1...@graphcommerce/magento-category@3.1.2) (2021-10-19)

### Bug Fixes

- positioning children categories ([33568ee](https://github.com/ho-nl/m2-pwa/commit/33568ee7a798f8cab149b6c23b6e044d81642f53))

# [3.1.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-category@3.0.30...@graphcommerce/magento-category@3.1.0) (2021-10-19)

### Features

- **framer-scroller:** better defaults so the Scroller doesn't look broken when providing no props ([b177ce9](https://github.com/ho-nl/m2-pwa/commit/b177ce9570abb9ccfd4eb5cc34e43d157bb4e81a))

## [3.0.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-category@3.0.10...@graphcommerce/magento-category@3.0.11) (2021-10-04)

### Bug Fixes

- **category-childeren:** scrollbar shown ([638e3ef](https://github.com/ho-nl/m2-pwa/commit/638e3efea3a537f90d23fb2f8953a62acb370288))
- **category-children:** scrollbar shown ([3ccc78b](https://github.com/ho-nl/m2-pwa/commit/3ccc78b329fa844c57bfeb2406c593d0533039d2))

## [3.0.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-category@3.0.0...@graphcommerce/magento-category@3.0.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/magento-category

# 3.0.0 (2021-09-27)

### Bug Fixes

- **app-shell-header:** title offset top not correctly set ([c144309](https://github.com/ho-nl/m2-pwa/commit/c1443095317c1779074f3a4058f4041159c8e31b))
- **app-shell:** pages after app shell changes ([fb74510](https://github.com/ho-nl/m2-pwa/commit/fb74510121f6124009db72ad2ddebf6459c52a85))
- canonical urls ([9ff8d3f](https://github.com/ho-nl/m2-pwa/commit/9ff8d3f950098fb28440f31f5dd93a835dce0bda))
- category children and swatch renderer ([1ee008d](https://github.com/ho-nl/m2-pwa/commit/1ee008d9ecf3bf5ec4b2d82243e4bcbbec384411))
- category children mobile positioning ([fafa02d](https://github.com/ho-nl/m2-pwa/commit/fafa02d393919cdb7f89d72afa17da07228f8093))
- category hero nav margin top ([31f8dee](https://github.com/ho-nl/m2-pwa/commit/31f8deed1d545d78bb856d4cfdfe0c7ec8671308))
- CategoryHeroNav styles ([6f185e7](https://github.com/ho-nl/m2-pwa/commit/6f185e74ee4c756efdf94ebcdee9b4593077f415))
- empty grid rows still have a gap ([7ba50c7](https://github.com/ho-nl/m2-pwa/commit/7ba50c740aa7ac5133b933b3e6a22fab853b55a6))
- filters sometimes do not apply ([b8bc412](https://github.com/ho-nl/m2-pwa/commit/b8bc4122c82c6b27bdc76481dd6ece1da021266a))
- **framer-next-page:** usePageRouter in SharedLayout ([c2fb164](https://github.com/ho-nl/m2-pwa/commit/c2fb164b342770089b787378a3f79529c36d2152))
- getStaticPaths shouldn’t have the url suffix ([0fc9e1c](https://github.com/ho-nl/m2-pwa/commit/0fc9e1cec78ba653e32de042fb60a3ca88eb494d))
- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
- implement next-ui barrel imports ([75bea70](https://github.com/ho-nl/m2-pwa/commit/75bea703dba898f18a2a1dfa3243ebd0a4e6f0e1))
- remove conflicting files ([0c17ae4](https://github.com/ho-nl/m2-pwa/commit/0c17ae46be62b775ac83b35f11c532ce2d9401a3))
- remove magento-category package from magento-product solving a circular dependency ([7379e6e](https://github.com/ho-nl/m2-pwa/commit/7379e6ede4829392b35008c17743181d9cac0636))
- search page routes ([4161179](https://github.com/ho-nl/m2-pwa/commit/4161179aaf2ecbc0fde0efbba891a7b85524e283))
- since all links are of next/link we need to add passHref for custom components ([16fb931](https://github.com/ho-nl/m2-pwa/commit/16fb93100d367203ea79bb4f93357221253f2ecd))
- solve issue if an attribute was named ‘size’ ([dab088e](https://github.com/ho-nl/m2-pwa/commit/dab088ed5f1a2916dc991a7d5c0b8d703a2ea3b7))
- spelling errors, wrong imports ([01cb889](https://github.com/ho-nl/m2-pwa/commit/01cb889513d69ce0555ac7aaa1a37702d75b0a0d))
- update magento-product imports ([63621b4](https://github.com/ho-nl/m2-pwa/commit/63621b44be7149014f4a5af8ac87ad1c4b0327be))
- word-break for category hero nav ([be47595](https://github.com/ho-nl/m2-pwa/commit/be4759519a23889950430d60a9264d9806df552c))
- yarn workspace packages hot reload ([d03fc9f](https://github.com/ho-nl/m2-pwa/commit/d03fc9fdda3486476761786f2b56a934cc92befc))

### Features

- add barrel file for magento-category ([c5ba8c9](https://github.com/ho-nl/m2-pwa/commit/c5ba8c98cbb8192f1c1c85242ff6efa83b1fbdcc))
- add getFilterTypes to shared client, faster generation ([beccfde](https://github.com/ho-nl/m2-pwa/commit/beccfde6ebc8aaf6223f0e8b33fabf4f5039efed))
- add graphcms asset to category page ([a760f25](https://github.com/ho-nl/m2-pwa/commit/a760f2547485e56b1fd4ecb03dd3cfb0a1c4819e))
- animated filters ([846e233](https://github.com/ho-nl/m2-pwa/commit/846e233c9653821afbe9cfe7742dc42bb869a078))
- better 404 handling and simplified getStaticProps ([321ace1](https://github.com/ho-nl/m2-pwa/commit/321ace1850642ee3eddfa674c37e6fca8adcdb74))
- canonical urls using abstract page meta component ([7d52cfc](https://github.com/ho-nl/m2-pwa/commit/7d52cfc76af2766dedf883b1e3fa5a5101eca823))
- category navigation ([00d1997](https://github.com/ho-nl/m2-pwa/commit/00d199741bb1ab266900869d27ac7251841aaf94))
- created stable layout for category filters ([08d9351](https://github.com/ho-nl/m2-pwa/commit/08d9351dac5c9ede864ff336a60d758875d8efe4))
- created stacked-pages package ([d86008e](https://github.com/ho-nl/m2-pwa/commit/d86008ee659ccb25b194a41d624b394a1ddbd088))
- data agnostic animated header ([17047a6](https://github.com/ho-nl/m2-pwa/commit/17047a6d754494d9443c8f2e486cc232cf199c45))
- **framer-next-pages:** implemented the FullPageShell for the remaining pages ([88386b4](https://github.com/ho-nl/m2-pwa/commit/88386b4652abb7765d6e755c7fb7a3cb6285a0e7))
- **framer-scroller:** implemented the scroller on all pages ([73fb518](https://github.com/ho-nl/m2-pwa/commit/73fb518eff74edb2b3212e892b3d8cc2b088011b))
- **graphql:** introduced new graphql package that holds all generated files ([a3e7aa0](https://github.com/ho-nl/m2-pwa/commit/a3e7aa05540540533b5ced9a95f1f802ecbe499f))
- i18n routing added (/ and /fr for demo) ([bb3b339](https://github.com/ho-nl/m2-pwa/commit/bb3b339fbc9fceddd264a891ad81f00327a241ae))
- **image:** introduced completely rewritten Image component ([e3413b3](https://github.com/ho-nl/m2-pwa/commit/e3413b3a57392d6571ea64cb8d9c8dca05ea31df))
- introduced magento-product-types package ([1a0932b](https://github.com/ho-nl/m2-pwa/commit/1a0932b5d882608dcf8fd2e3b17ee9868f5f5776))
- introduces framer-next-pages and framer-sheet to next-ui and soxbase package ([e04ad8a](https://github.com/ho-nl/m2-pwa/commit/e04ad8a94cd1fd5a7c5575c9db7916b6e8a88f16))
- **magento-graphql:** added core magentoTypePolicies ([bdf15d0](https://github.com/ho-nl/m2-pwa/commit/bdf15d0d3c04e88339a8385d76f3b1ab9589fde3))
- major performance refactor ([03f8e2f](https://github.com/ho-nl/m2-pwa/commit/03f8e2fa16ef919bd6bd6eadd36922d0245ed960))
- next.js 11 ([7d61407](https://github.com/ho-nl/m2-pwa/commit/7d614075a778f488045034f74be4f75b93f63c43))
- **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
- remove wrapper div from ScrollSnapSlider ([476add8](https://github.com/ho-nl/m2-pwa/commit/476add8db64811f2c7e3fc482487967cd7573cf6))
- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of [@reachdigital](https://github.com/reachdigital) ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
- upgrade to node 14 ([d079a75](https://github.com/ho-nl/m2-pwa/commit/d079a751e9bfd8dc7f5009d2c9f31c336a0c96ab))
- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))
- video support for CategoryHeroNav ([e24fe60](https://github.com/ho-nl/m2-pwa/commit/e24fe600f776aaf41735178472b2d1343c5252e6))

### Reverts

- Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

## 2.0.8 (2020-10-28)

### Bug Fixes

- make sure themes extensions are found ([5aa18db](https://github.com/ho-nl/m2-pwa/commit/5aa18db514fd2e2f50681367e39523f8e742ece0))

### Features

- added generated graphql.ts files ([3e44415](https://github.com/ho-nl/m2-pwa/commit/3e44415b018e74b502e9e98479aa5e84041f337d))
- split into packages ([2ee7fd6](https://github.com/ho-nl/m2-pwa/commit/2ee7fd6c0056f467d114f04d92c6c0ddf622d151))

### BREAKING CHANGES

- huge folder structure refactor, please read README to reinstall

# Change Log

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.103.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-category@2.102.10...@graphcommerce/magento-category@2.103.0) (2021-09-01)

### Features

- **framer-scroller:** implemented the scroller on all pages ([73fb518](https://github.com/ho-nl/m2-pwa/commit/73fb518eff74edb2b3212e892b3d8cc2b088011b))

## [2.102.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-category@2.102.8...@graphcommerce/magento-category@2.102.9) (2021-08-27)

### Bug Fixes

- **app-shell:** pages after app shell changes ([fb74510](https://github.com/ho-nl/m2-pwa/commit/fb74510121f6124009db72ad2ddebf6459c52a85))

# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-category@2.101.9...@graphcommerce/magento-category@2.102.0) (2021-08-12)

### Features

- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.101.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-category@2.101.8...@graphcommerce/magento-category@2.101.9) (2021-08-09)

### Reverts

- Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

## [2.101.5](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-category@2.101.4...@graphcommerce/magento-category@2.101.5) (2021-08-03)

### Bug Fixes

- remove magento-category package from magento-product solving a circular dependency ([7379e6e](https://github.com/ho-nl/m2-pwa/commit/7379e6ede4829392b35008c17743181d9cac0636))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-category@2.100.18...@graphcommerce/magento-category@2.101.0) (2021-07-26)

### Features

- **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))

## [2.100.17](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-category@2.100.16...@graphcommerce/magento-category@2.100.17) (2021-07-23)

### Bug Fixes

- **app-shell-header:** title offset top not correctly set ([c144309](https://github.com/ho-nl/m2-pwa/commit/c1443095317c1779074f3a4058f4041159c8e31b))
- category hero nav margin top ([31f8dee](https://github.com/ho-nl/m2-pwa/commit/31f8deed1d545d78bb856d4cfdfe0c7ec8671308))

## [2.100.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-category@2.100.10...@graphcommerce/magento-category@2.100.11) (2021-07-20)

### Bug Fixes

- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
