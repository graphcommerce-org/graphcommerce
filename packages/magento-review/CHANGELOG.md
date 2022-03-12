# Change Log

## 3.0.6

### Patch Changes

- [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655) Thanks [@paales](https://github.com/paales)! - All default exports are now named exports internally and all `index.tsx` are renamed to the component name.

* [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

* Updated dependencies [[`3d63b39f7`](https://github.com/ho-nl/m2-pwa/commit/3d63b39f7e330d1827a32dba782667d7b21adaba), [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655), [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef)]:
  - @graphcommerce/next-ui@4.2.4
  - @graphcommerce/graphql@3.0.4
  - @graphcommerce/image@3.1.1
  - @graphcommerce/magento-customer@4.1.4
  - @graphcommerce/magento-product@4.0.6
  - @graphcommerce/magento-store@4.1.2
  - @graphcommerce/react-hook-form@3.0.4

## 3.0.5

### Patch Changes

- [#1292](https://github.com/ho-nl/m2-pwa/pull/1292) [`5a1ba9e66`](https://github.com/ho-nl/m2-pwa/commit/5a1ba9e664abbac89c4f5f71f7d6d6ed1aefa5c0) Thanks [@paales](https://github.com/paales)! - Renamed SvgIcon to IconSvg to prevent collisions with MUI

- Updated dependencies [[`5a1ba9e66`](https://github.com/ho-nl/m2-pwa/commit/5a1ba9e664abbac89c4f5f71f7d6d6ed1aefa5c0), [`990df655b`](https://github.com/ho-nl/m2-pwa/commit/990df655b73b469718d6cb5837ee65dfe2ad6a1d), [`63f9b56eb`](https://github.com/ho-nl/m2-pwa/commit/63f9b56eb68ba790567ff1427e599fd2c3c8f1ee)]:
  - @graphcommerce/magento-customer@4.1.3
  - @graphcommerce/magento-product@4.0.5
  - @graphcommerce/next-ui@4.2.0

## 3.0.4

### Patch Changes

- [#1285](https://github.com/ho-nl/m2-pwa/pull/1285) [`c85294ba6`](https://github.com/ho-nl/m2-pwa/commit/c85294ba6d742ce78c074559a1e95409b25a5017) Thanks [@paales](https://github.com/paales)! - upgraded dependencies

- Updated dependencies [[`ed9703b06`](https://github.com/ho-nl/m2-pwa/commit/ed9703b062d23ee01b1605ff9917c0ac3247fc25), [`c85294ba6`](https://github.com/ho-nl/m2-pwa/commit/c85294ba6d742ce78c074559a1e95409b25a5017)]:
  - @graphcommerce/magento-store@4.1.0
  - @graphcommerce/magento-product@4.0.4
  - @graphcommerce/next-ui@4.1.3

## 3.0.3

### Patch Changes

- [#1280](https://github.com/ho-nl/m2-pwa/pull/1280) [`bdd460c6f`](https://github.com/ho-nl/m2-pwa/commit/bdd460c6f09af148a96c55324012b8f53c3618f1) Thanks [@paales](https://github.com/paales)! - Review forms now work by using the url_key of a product instead of the SKU. Some backends do not support filtering by sku

* [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96) Thanks [@paales](https://github.com/paales)! - made packages public

* Updated dependencies [[`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96), [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20), [`3a719c88c`](https://github.com/ho-nl/m2-pwa/commit/3a719c88cad1eab58602de28c41adc0fc4827e1d), [`5ffcb56bf`](https://github.com/ho-nl/m2-pwa/commit/5ffcb56bfcbe49ebeaf24f9341e819a145ab9a14)]:
  - @graphcommerce/graphql@3.0.3
  - @graphcommerce/image@3.1.0
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

* Updated dependencies [[`381e4c86a`](https://github.com/ho-nl/m2-pwa/commit/381e4c86a8321ce96e1fa5c7d3c0a0c0ff3e02c7), [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2), [`e7c8e2756`](https://github.com/ho-nl/m2-pwa/commit/e7c8e2756d637cbcd2e793d62ef5721d35d9fa7b), [`b08a8eb1d`](https://github.com/ho-nl/m2-pwa/commit/b08a8eb1d024b9d3e7712ef034029151670db275), [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d)]:
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
  - @graphcommerce/magento-customer@4.0.0
  - @graphcommerce/magento-product@4.0.0
  - @graphcommerce/magento-store@4.0.0
  - @graphcommerce/next-ui@4.0.0
  - @graphcommerce/react-hook-form@3.0.0

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.111.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-review@2.110.2...@graphcommerce/magento-review@2.111.0) (2021-12-01)

### Features

- borderRadius based on theme.shape.borderRadius ([7c34937](https://github.com/ho-nl/m2-pwa/commit/7c349376cd41a131c628324c299106fdb7e60484))

# [2.110.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-review@2.109.1...@graphcommerce/magento-review@2.110.0) (2021-11-22)

### Bug Fixes

- allow styling from parent ([ed1b4dc](https://github.com/ho-nl/m2-pwa/commit/ed1b4dc446fa19244cc73f87063256809b914d15))
- cleanup ([7937ac5](https://github.com/ho-nl/m2-pwa/commit/7937ac5c6163a4ffe10d8a8d61847fcc86e82a9d))
- make stylable ([54aea4c](https://github.com/ho-nl/m2-pwa/commit/54aea4c177c708de07df9ef9c590da6bff43aea8))
- remove styles ([fabde1f](https://github.com/ho-nl/m2-pwa/commit/fabde1f1dba9f75dea60bb2c7c69d4793c6197cd))
- rename summary chip fragment ([bb23dfc](https://github.com/ho-nl/m2-pwa/commit/bb23dfc8bb82e99832196b4080d2c4c9f269cc5d))
- revert to SvgImageSimple ([b247c6b](https://github.com/ho-nl/m2-pwa/commit/b247c6b96979bc313e597a8ffe1275b73f38bd6a))
- review form size large ([9f45336](https://github.com/ho-nl/m2-pwa/commit/9f45336d310b120088fe6440dd95a51944ff77cb))
- use fragment types ([0a06309](https://github.com/ho-nl/m2-pwa/commit/0a0630916e191c59eed402904b9ace6b87831bd8))

### Features

- add ReviewSummary component ([b823669](https://github.com/ho-nl/m2-pwa/commit/b823669d32e92238d05cac181c3453a13da49601))
- use Rating component ([ec54f45](https://github.com/ho-nl/m2-pwa/commit/ec54f4522adb2d330bbdecc2ce032f86f13fb7a6))

# [2.109.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-review@2.108.6...@graphcommerce/magento-review@2.109.0) (2021-11-12)

### Bug Fixes

- even more translations ([1a1f988](https://github.com/ho-nl/m2-pwa/commit/1a1f98837c704b978f6b42b619d9c52f540b2d48))

### Features

- added tons of translations ([9bb0ac7](https://github.com/ho-nl/m2-pwa/commit/9bb0ac709b58df6ea6141e92e4923a5ca9ae2963))

# [2.108.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-review@2.107.21...@graphcommerce/magento-review@2.108.0) (2021-11-09)

### Features

- added translations to all pages ([8cf4ecd](https://github.com/ho-nl/m2-pwa/commit/8cf4ecd5db5edfec04ab205aa49f5de433d26579))

## [2.107.13](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-review@2.107.12...@graphcommerce/magento-review@2.107.13) (2021-11-03)

### Bug Fixes

- various accessibility improvements ([47481a9](https://github.com/ho-nl/m2-pwa/commit/47481a9a882ba87968de6dd797557b0b275d75fb))

## [2.107.6](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-review@2.107.5...@graphcommerce/magento-review@2.107.6) (2021-11-02)

### Bug Fixes

- remove text='bold', make contained button text stronger by default ([cd277c9](https://github.com/ho-nl/m2-pwa/commit/cd277c9f434a4a765eac372467e5a05c822d5512))
- remove unused imports ([b832188](https://github.com/ho-nl/m2-pwa/commit/b8321887f10a4a026adc5ca39166eeef90e60669))
- ReviewChip should only differ from default MuiChip in product grid ([c22a029](https://github.com/ho-nl/m2-pwa/commit/c22a0291afbbc03099fd0487421ff9fd31caf226))

## [2.107.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-review@2.107.0...@graphcommerce/magento-review@2.107.1) (2021-10-28)

### Bug Fixes

- External SVG's can't have alt tags ([1b1414a](https://github.com/ho-nl/m2-pwa/commit/1b1414a782d55d3acf7b0e6bcaa50f2ad5f18f39))

# [2.107.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-review@2.106.2...@graphcommerce/magento-review@2.107.0) (2021-10-28)

### Bug Fixes

- keep original review chip ([3f2f834](https://github.com/ho-nl/m2-pwa/commit/3f2f834478b7b8252f6164442815e5c081de6411))
- keep original review chip for now ([9664cd9](https://github.com/ho-nl/m2-pwa/commit/9664cd90801c6776e1c694eec8f393118810a792))
- review button size ([9074102](https://github.com/ho-nl/m2-pwa/commit/9074102c1866b14d0e7f1f0f3dfabe6e6c0b324d))
- size of default ReviewChip ([e1d4969](https://github.com/ho-nl/m2-pwa/commit/e1d49699776b15fa056677f042f6c9939b6acada))

### Features

- cleanup grid, add visual star chip ([0571569](https://github.com/ho-nl/m2-pwa/commit/057156937f603bc399f5f8f8ac2837ff5cfaef28))
- dynamic icons, update SvgImage uses to SvgImageSimple ([3d3cc0e](https://github.com/ho-nl/m2-pwa/commit/3d3cc0e0336fcde1cce6ba19705f82c1edf9bfc6))
- enable use of both small and medium chips in design ([4536f96](https://github.com/ho-nl/m2-pwa/commit/4536f96b031734a71faf7c10f94aa5d5da90b9a8))

# [2.106.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-review@2.105.37...@graphcommerce/magento-review@2.106.0) (2021-10-27)

### Features

- **nextjs:** upgraded to nextjs 12 ([9331bc8](https://github.com/ho-nl/m2-pwa/commit/9331bc801f6419522115cc47d291d49d608d5a90))

## [2.105.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-review@2.105.0...@graphcommerce/magento-review@2.105.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/magento-review

# 2.105.0 (2021-09-27)

### Bug Fixes

- customer-order folder structure ([b7fabd1](https://github.com/ho-nl/m2-pwa/commit/b7fabd12014b2925d0b89c21f58e9974ce1c8b40))
- introduced SvgImageSimple and solve issue with review chips ([931d7fd](https://github.com/ho-nl/m2-pwa/commit/931d7fdcf0faa9d2264899b72e564138215b6bd8))
- make separate queries folder, create injectable for account and inject reviews ([5d82a5d](https://github.com/ho-nl/m2-pwa/commit/5d82a5d9162f687c2678cce215b77eedbaf1669e))
- remove coupon form style was too large ([30df274](https://github.com/ho-nl/m2-pwa/commit/30df274ecdffdcebd76710a5304d6fa248e81211))
- **review:** make sure chip is rendered correctly ([387df34](https://github.com/ho-nl/m2-pwa/commit/387df3456973290f9ce98d47823a7c71a6d95850))
- SvgSimpleImage sizing didn't use rem ([1ba07a5](https://github.com/ho-nl/m2-pwa/commit/1ba07a5694bd60ad3cee2e8102814643d2a7c79d))

### Features

- **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of [@reachdigital](https://github.com/reachdigital) ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
- **theme:** restructured fonts and applied to home and category page ([6adf5f1](https://github.com/ho-nl/m2-pwa/commit/6adf5f11321bdfbf499125f1161c5abf5a1bfe4a))
- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

### Reverts

- Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

# Change Log

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.104.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-review@2.103.2...@graphcommerce/magento-review@2.104.0) (2021-08-12)

### Bug Fixes

- remove coupon form style was too large ([30df274](https://github.com/ho-nl/m2-pwa/commit/30df274ecdffdcebd76710a5304d6fa248e81211))

### Features

- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.103.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-review@2.103.1...@graphcommerce/magento-review@2.103.2) (2021-08-09)

### Bug Fixes

- SvgSimpleImage sizing didn't use rem ([1ba07a5](https://github.com/ho-nl/m2-pwa/commit/1ba07a5694bd60ad3cee2e8102814643d2a7c79d))

### Reverts

- Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

## [2.103.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-review@2.103.0...@graphcommerce/magento-review@2.103.1) (2021-08-09)

### Bug Fixes

- **review:** make sure chip is rendered correctly ([387df34](https://github.com/ho-nl/m2-pwa/commit/387df3456973290f9ce98d47823a7c71a6d95850))

# [2.103.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-review@2.102.6...@graphcommerce/magento-review@2.103.0) (2021-08-06)

### Bug Fixes

- introduced SvgImageSimple and solve issue with review chips ([931d7fd](https://github.com/ho-nl/m2-pwa/commit/931d7fdcf0faa9d2264899b72e564138215b6bd8))

### Features

- **theme:** restructured fonts and applied to home and category page ([6adf5f1](https://github.com/ho-nl/m2-pwa/commit/6adf5f11321bdfbf499125f1161c5abf5a1bfe4a))

# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-review@2.101.3...@graphcommerce/magento-review@2.102.0) (2021-07-26)

### Features

- **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))

## 2.101.1 (2021-07-23)

### Bug Fixes

- customer-order folder structure ([b7fabd1](https://github.com/ho-nl/m2-pwa/commit/b7fabd12014b2925d0b89c21f58e9974ce1c8b40))
- make separate queries folder, create injectable for account and inject reviews ([5d82a5d](https://github.com/ho-nl/m2-pwa/commit/5d82a5d9162f687c2678cce215b77eedbaf1669e))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-product-review@2.100.14...@graphcommerce/magento-product-review@2.101.0) (2021-07-21)

### Bug Fixes

- write review button mobile styles ([8f6b883](https://github.com/ho-nl/m2-pwa/commit/8f6b883fa0a513f84b7c6d8ed376b0e8d4b8a3bd))

### Features

- **reviews:** no reviews written message ([8ade3db](https://github.com/ho-nl/m2-pwa/commit/8ade3dbe830f5a59af09c002dfa38fa5349a4b61))

## [2.100.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-product-review@2.100.10...@graphcommerce/magento-product-review@2.100.11) (2021-07-20)

### Bug Fixes

- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
