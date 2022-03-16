# Change Log

## 4.1.3

### Patch Changes

- [#1322](https://github.com/graphcommerce-org/graphcommerce/pull/1322) [`815132ea4`](https://github.com/graphcommerce-org/graphcommerce/commit/815132ea43937b4b84b59ec9974ac593cb4eb456) Thanks [@paales](https://github.com/paales)! - Make sure canonicals don’t report about double slashes and add warning when incorrect URL is passed

- Updated dependencies [[`5266388ea`](https://github.com/graphcommerce-org/graphcommerce/commit/5266388eaffda41592623ef7a3ddbbe03c8e0dad), [`9b35403d9`](https://github.com/graphcommerce-org/graphcommerce/commit/9b35403d9dbb2606ac7cf3bb641a0f9cc3d8a2ba), [`0298a0de1`](https://github.com/graphcommerce-org/graphcommerce/commit/0298a0de1d13e543c4124a6a099297b4e27e2b05), [`815132ea4`](https://github.com/graphcommerce-org/graphcommerce/commit/815132ea43937b4b84b59ec9974ac593cb4eb456), [`3326742a0`](https://github.com/graphcommerce-org/graphcommerce/commit/3326742a0dceb45f0cac4741ca09dc4d4f09ad90), [`7a3799bfc`](https://github.com/graphcommerce-org/graphcommerce/commit/7a3799bfc107f26aa9991a91db5f228e3476f4aa), [`9a77f88ed`](https://github.com/graphcommerce-org/graphcommerce/commit/9a77f88ed26cbecdae9a135c3cb234a5b7ecf4df), [`0eeaad304`](https://github.com/graphcommerce-org/graphcommerce/commit/0eeaad30461b1d5b486438f0287fa76d49429044), [`bc5213547`](https://github.com/graphcommerce-org/graphcommerce/commit/bc52135471479c83d989449dad24798112e898f4), [`3f1912f55`](https://github.com/graphcommerce-org/graphcommerce/commit/3f1912f553318d5888f8af2b841918ef4ae96a84), [`b6c68cda8`](https://github.com/graphcommerce-org/graphcommerce/commit/b6c68cda8836a1d0c78ef351899cec9ec1037385)]:
  - @graphcommerce/next-ui@4.3.0

## 4.1.2

### Patch Changes

- [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655) Thanks [@paales](https://github.com/paales)! - All default exports are now named exports internally and all `index.tsx` are renamed to the component name.

* [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

* Updated dependencies [[`3d63b39f7`](https://github.com/ho-nl/m2-pwa/commit/3d63b39f7e330d1827a32dba782667d7b21adaba), [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655), [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef)]:
  - @graphcommerce/next-ui@4.2.4
  - @graphcommerce/graphql@3.0.4
  - @graphcommerce/image@3.1.1

## 4.1.1

### Patch Changes

- [#1296](https://github.com/ho-nl/m2-pwa/pull/1296) [`8473123fa`](https://github.com/ho-nl/m2-pwa/commit/8473123fa7d3f3eb1d282d9b4205c803a88010ea) Thanks [@paales](https://github.com/paales)! - implement handling for canonical URLs based on NEXT_PUBLIC_SITE_URL

- Updated dependencies [[`a9cff2ce6`](https://github.com/ho-nl/m2-pwa/commit/a9cff2ce63fce5b86e9fd6bf63c10c782326d50e), [`8473123fa`](https://github.com/ho-nl/m2-pwa/commit/8473123fa7d3f3eb1d282d9b4205c803a88010ea), [`50e205c51`](https://github.com/ho-nl/m2-pwa/commit/50e205c51f4d0d67d41d22fd70e8ed9a0996489e)]:
  - @graphcommerce/next-ui@4.2.2

## 4.1.0

### Minor Changes

- [#1285](https://github.com/ho-nl/m2-pwa/pull/1285) [`ed9703b06`](https://github.com/ho-nl/m2-pwa/commit/ed9703b062d23ee01b1605ff9917c0ac3247fc25) Thanks [@paales](https://github.com/paales)! - Added the ability to configure `defaultProps` for the <Money/> component.

  ```ts
  // For example in examples/magento-graphcms/theme.ts

  const createOverrides = (theme: Theme): Components => ({
    Money: {
      defaultProps: {
        round: true,
        formatOptions: {
          style: 'decimal',
        },
      },
    },
  })
  ```

### Patch Changes

- [#1285](https://github.com/ho-nl/m2-pwa/pull/1285) [`c85294ba6`](https://github.com/ho-nl/m2-pwa/commit/c85294ba6d742ce78c074559a1e95409b25a5017) Thanks [@paales](https://github.com/paales)! - upgraded dependencies

- Updated dependencies [[`c85294ba6`](https://github.com/ho-nl/m2-pwa/commit/c85294ba6d742ce78c074559a1e95409b25a5017)]:
  - @graphcommerce/next-ui@4.1.3

## 4.0.3

### Patch Changes

- [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96) Thanks [@paales](https://github.com/paales)! - made packages public

* [#1278](https://github.com/ho-nl/m2-pwa/pull/1278) [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Upgraded dependencies to the latest version

* Updated dependencies [[`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96), [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20), [`3a719c88c`](https://github.com/ho-nl/m2-pwa/commit/3a719c88cad1eab58602de28c41adc0fc4827e1d), [`5ffcb56bf`](https://github.com/ho-nl/m2-pwa/commit/5ffcb56bfcbe49ebeaf24f9341e819a145ab9a14)]:
  - @graphcommerce/graphql@3.0.3
  - @graphcommerce/image@3.1.0
  - @graphcommerce/next-ui@4.1.2

## 4.0.2

### Patch Changes

- [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2) Thanks [@paales](https://github.com/paales)! - We've moved lots of internal packages from `dependencies` to `peerDependencies`. The result of this is that there will be significantly less duplicate packages in the node_modules folders.

* [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d) Thanks [@paales](https://github.com/paales)! - Upgraded to [NextJS 12.1](https://nextjs.org/blog/next-12-1)! This is just for compatibility, but we'll be implementing [On-demand Incremental Static Regeneration](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta) soon.

  This will greatly reduce the requirement to rebuid stuff and we'll add a management UI on the frontend to be able to revalidate pages manually.

* Updated dependencies [[`381e4c86a`](https://github.com/ho-nl/m2-pwa/commit/381e4c86a8321ce96e1fa5c7d3c0a0c0ff3e02c7), [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2), [`e7c8e2756`](https://github.com/ho-nl/m2-pwa/commit/e7c8e2756d637cbcd2e793d62ef5721d35d9fa7b), [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d)]:
  - @graphcommerce/next-ui@4.1.1
  - @graphcommerce/graphql@3.0.2
  - @graphcommerce/image@3.0.2

## 4.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514) Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files, so that the packages link to back to the website and repository
- Updated dependencies [[`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514)]:
  - @graphcommerce/graphql@3.0.1
  - @graphcommerce/image@3.0.1
  - @graphcommerce/next-ui@4.0.1

## 4.0.0

### Major Changes

- [#1258](https://github.com/ho-nl/m2-pwa/pull/1258) [`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05) Thanks [@paales](https://github.com/paales)! - Upgraded to Material UI 5

### Patch Changes

- Updated dependencies [[`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05)]:
  - @graphcommerce/graphql@3.0.0
  - @graphcommerce/image@3.0.0
  - @graphcommerce/next-ui@4.0.0

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.4.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-store@3.3.31...@graphcommerce/magento-store@3.4.0) (2022-01-03)

### Features

- **framer-next-pages:** reduce rerenders when navigating to a new page ([5cf3301](https://github.com/ho-nl/m2-pwa/commit/5cf330130bb3527057da015e3c4a6fa295d7262e))

## [3.3.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-store@3.3.10...@graphcommerce/magento-store@3.3.11) (2021-12-06)

### Bug Fixes

- use Locale to set storeSwitcher icons ([65ea397](https://github.com/ho-nl/m2-pwa/commit/65ea397ec53aa27f545b43feda8e35227e119ebe))

# [3.3.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-store@3.2.20...@graphcommerce/magento-store@3.3.0) (2021-11-12)

### Features

- added tons of translations ([9bb0ac7](https://github.com/ho-nl/m2-pwa/commit/9bb0ac709b58df6ea6141e92e4923a5ca9ae2963))

# [3.2.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-store@3.1.8...@graphcommerce/magento-store@3.2.0) (2021-11-02)

### Features

- darkTheme ([968f4f1](https://github.com/ho-nl/m2-pwa/commit/968f4f1360417bf7daa36454c19e6bc5cf53ae90))

# [3.1.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-store@3.0.31...@graphcommerce/magento-store@3.1.0) (2021-10-27)

### Features

- **nextjs:** upgraded to nextjs 12 ([9331bc8](https://github.com/ho-nl/m2-pwa/commit/9331bc801f6419522115cc47d291d49d608d5a90))

## [3.0.29](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-store@3.0.28...@graphcommerce/magento-store@3.0.29) (2021-10-21)

### Bug Fixes

- compatibility with venia theme ([c0bcdd5](https://github.com/ho-nl/m2-pwa/commit/c0bcdd511de5679f185f0984816b1f0cafa449e0))

## [3.0.7](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-store@3.0.6...@graphcommerce/magento-store@3.0.7) (2021-09-30)

### Bug Fixes

- with the latest version of graphql codegen the preresovled types inlined Maybe, make sure we reflect that ([7cb27b0](https://github.com/ho-nl/m2-pwa/commit/7cb27b04cbe31bee5ef4000d408f08bc9ac505c5))

## [3.0.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-store@3.0.0...@graphcommerce/magento-store@3.0.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/magento-store

# 3.0.0 (2021-09-27)

### Bug Fixes

- canonical urls ([9ff8d3f](https://github.com/ho-nl/m2-pwa/commit/9ff8d3f950098fb28440f31f5dd93a835dce0bda))
- change href's from faq to service ([cb9875b](https://github.com/ho-nl/m2-pwa/commit/cb9875bce43db5953f227ee60f8d5dfe339f50b5))
- code consistency ([a310f0e](https://github.com/ho-nl/m2-pwa/commit/a310f0e548907c044b016b9473641ecd378b313f))
- **country-switcher:** navigate back to correct locale ([579d146](https://github.com/ho-nl/m2-pwa/commit/579d146e1b658a343b1514d8e8a45c01a507c084))
- duplicated (meta) tags in document head ([d52e962](https://github.com/ho-nl/m2-pwa/commit/d52e9629036ccab1f266ddd01600a0bd45930149))
- footer country flag ([8c6bf20](https://github.com/ho-nl/m2-pwa/commit/8c6bf206f85d44289a8d11d9bcd2178af6cc3445))
- get more data from store locale ([455245c](https://github.com/ho-nl/m2-pwa/commit/455245cf88d4a0cfbe197c97739306af8d8ff211))
- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
- implement next-ui barrel imports ([75bea70](https://github.com/ho-nl/m2-pwa/commit/75bea703dba898f18a2a1dfa3243ebd0a4e6f0e1))
- lint error ([be542af](https://github.com/ho-nl/m2-pwa/commit/be542afc466209c79cb776aac494abb7cab24bf7))
- **magento-store:** move useCountry/useRegion to magento-store and rename to useFindCountry/useFindRegion ([3fed1c5](https://github.com/ho-nl/m2-pwa/commit/3fed1c53f975977e2681a9b80bb283332d9ad5ec))
- make storeswitcher a button ([a7dc452](https://github.com/ho-nl/m2-pwa/commit/a7dc45297e565be9c5d72c03e3d8c4a61c415c8a))
- prices wouldn’t render if the price wasn’t an integer ([0866881](https://github.com/ho-nl/m2-pwa/commit/08668813699065b168e3d9b1fe2410c5cd073c89))
- prop types ([caccb1a](https://github.com/ho-nl/m2-pwa/commit/caccb1ab4c459642b64498dde22c372fd890f0c7))
- remove button from store-switcher in footer ([43f6d52](https://github.com/ho-nl/m2-pwa/commit/43f6d5227edff809effa46b658afc0d3c4268f3f))
- remove canonical metatag when no canonical is given ([167b7f0](https://github.com/ho-nl/m2-pwa/commit/167b7f080f98a10ff35cbd760b24b8198aac6518))
- search not submitting after empying the field ([a15b5cf](https://github.com/ho-nl/m2-pwa/commit/a15b5cf94f4619e0087c8871a98617ab160f671a))
- secure base link url in store config ([ecba5c2](https://github.com/ho-nl/m2-pwa/commit/ecba5c2b2c109b027916872ca860c566b031d8a4))
- since all links are of next/link we need to add passHref for custom components ([16fb931](https://github.com/ho-nl/m2-pwa/commit/16fb93100d367203ea79bb4f93357221253f2ecd))
- yarn workspace packages hot reload ([d03fc9f](https://github.com/ho-nl/m2-pwa/commit/d03fc9fdda3486476761786f2b56a934cc92befc))

### Features

- add getFilterTypes to shared client, faster generation ([beccfde](https://github.com/ho-nl/m2-pwa/commit/beccfde6ebc8aaf6223f0e8b33fabf4f5039efed))
- added footer buttons ([65610cc](https://github.com/ho-nl/m2-pwa/commit/65610cc1db2929b9203a3b7b25375a8324bc8ce9))
- added store switcher route ([64b04b3](https://github.com/ho-nl/m2-pwa/commit/64b04b3c1488c93395b228ac04c9d3c3912391a2))
- better 404 handling and simplified getStaticProps ([321ace1](https://github.com/ho-nl/m2-pwa/commit/321ace1850642ee3eddfa674c37e6fca8adcdb74))
- canonical urls using abstract page meta component ([5f09b6f](https://github.com/ho-nl/m2-pwa/commit/5f09b6f89f4c39f5465869b86468c384de73faba))
- created stacked-pages package ([d86008e](https://github.com/ho-nl/m2-pwa/commit/d86008ee659ccb25b194a41d624b394a1ddbd088))
- **graphql:** introduced new graphql package that holds all generated files ([a3e7aa0](https://github.com/ho-nl/m2-pwa/commit/a3e7aa05540540533b5ced9a95f1f802ecbe499f))
- i18n routing added (/ and /fr for demo) ([bb3b339](https://github.com/ho-nl/m2-pwa/commit/bb3b339fbc9fceddd264a891ad81f00327a241ae))
- **image:** introduced completely rewritten Image component ([e3413b3](https://github.com/ho-nl/m2-pwa/commit/e3413b3a57392d6571ea64cb8d9c8dca05ea31df))
- introduces framer-next-pages and framer-sheet to next-ui and soxbase package ([e04ad8a](https://github.com/ho-nl/m2-pwa/commit/e04ad8a94cd1fd5a7c5575c9db7916b6e8a88f16))
- major performance refactor ([03f8e2f](https://github.com/ho-nl/m2-pwa/commit/03f8e2fa16ef919bd6bd6eadd36922d0245ed960))
- move to category_uid instead of category_id ([a2efe8d](https://github.com/ho-nl/m2-pwa/commit/a2efe8daac6ebe949070108fc4bcf8cc0919c1c7))
- next.js 11 ([7d61407](https://github.com/ho-nl/m2-pwa/commit/7d614075a778f488045034f74be4f75b93f63c43))
- **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of [@reachdigital](https://github.com/reachdigital) ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
- support reviews store config variables ([532e849](https://github.com/ho-nl/m2-pwa/commit/532e84926c97affcd21ade56773bc06a02060b3a))
- upgrade to node 14 ([d079a75](https://github.com/ho-nl/m2-pwa/commit/d079a751e9bfd8dc7f5009d2c9f31c336a0c96ab))
- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))
- useFormMutationCart and simpler imports ([012f090](https://github.com/ho-nl/m2-pwa/commit/012f090e8f54d09f35d393c61ad1e2319f5a90ff))

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

# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-store@2.101.9...@graphcommerce/magento-store@2.102.0) (2021-08-12)

### Features

- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.101.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-store@2.101.8...@graphcommerce/magento-store@2.101.9) (2021-08-09)

### Reverts

- Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-store@2.100.18...@graphcommerce/magento-store@2.101.0) (2021-07-26)

### Features

- **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))

## [2.100.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-store@2.100.10...@graphcommerce/magento-store@2.100.11) (2021-07-20)

### Bug Fixes

- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
