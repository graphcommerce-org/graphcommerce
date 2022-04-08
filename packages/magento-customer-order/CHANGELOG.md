# Change Log

## 3.0.7

### Patch Changes

- [#1378](https://github.com/graphcommerce-org/graphcommerce/pull/1378) [`b610a6e40`](https://github.com/graphcommerce-org/graphcommerce/commit/b610a6e4049e8c9e8b5d2aeff31b8e1bfc24abe5) Thanks [@paales](https://github.com/paales)! - Pin all versions internally so we can’t end up in an unfixable state for the user

- Updated dependencies [[`b610a6e40`](https://github.com/graphcommerce-org/graphcommerce/commit/b610a6e4049e8c9e8b5d2aeff31b8e1bfc24abe5)]:
  - @graphcommerce/graphql@3.0.7
  - @graphcommerce/image@3.1.3
  - @graphcommerce/magento-graphql@3.0.6
  - @graphcommerce/magento-store@4.1.5
  - @graphcommerce/next-ui@4.5.1

## 3.0.6

### Patch Changes

- [#1369](https://github.com/graphcommerce-org/graphcommerce/pull/1369) [`ae6449502`](https://github.com/graphcommerce-org/graphcommerce/commit/ae64495024a455bbe5188588604368c1542840c9) Thanks [@paales](https://github.com/paales)! - Upgraded dependencies

- Updated dependencies [[`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`ae6449502`](https://github.com/graphcommerce-org/graphcommerce/commit/ae64495024a455bbe5188588604368c1542840c9), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a)]:
  - @graphcommerce/graphql@3.0.6
  - @graphcommerce/next-ui@4.5.0
  - @graphcommerce/image@3.1.2
  - @graphcommerce/magento-graphql@3.0.5
  - @graphcommerce/magento-store@4.1.4

## 3.0.5

### Patch Changes

- [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655) Thanks [@paales](https://github.com/paales)! - All default exports are now named exports internally and all `index.tsx` are renamed to the component name.

* [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

* Updated dependencies [[`3d63b39f7`](https://github.com/ho-nl/m2-pwa/commit/3d63b39f7e330d1827a32dba782667d7b21adaba), [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655), [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef)]:
  - @graphcommerce/next-ui@4.2.4
  - @graphcommerce/graphql@3.0.4
  - @graphcommerce/image@3.1.1
  - @graphcommerce/magento-graphql@3.0.4
  - @graphcommerce/magento-store@4.1.2

## 3.0.4

### Patch Changes

- [#1292](https://github.com/ho-nl/m2-pwa/pull/1292) [`5a1ba9e66`](https://github.com/ho-nl/m2-pwa/commit/5a1ba9e664abbac89c4f5f71f7d6d6ed1aefa5c0) Thanks [@paales](https://github.com/paales)! - Renamed SvgIcon to IconSvg to prevent collisions with MUI

- Updated dependencies [[`5a1ba9e66`](https://github.com/ho-nl/m2-pwa/commit/5a1ba9e664abbac89c4f5f71f7d6d6ed1aefa5c0), [`990df655b`](https://github.com/ho-nl/m2-pwa/commit/990df655b73b469718d6cb5837ee65dfe2ad6a1d), [`63f9b56eb`](https://github.com/ho-nl/m2-pwa/commit/63f9b56eb68ba790567ff1427e599fd2c3c8f1ee)]:
  - @graphcommerce/next-ui@4.2.0

## 3.0.3

### Patch Changes

- [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96) Thanks [@paales](https://github.com/paales)! - made packages public

- Updated dependencies [[`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96), [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20), [`3a719c88c`](https://github.com/ho-nl/m2-pwa/commit/3a719c88cad1eab58602de28c41adc0fc4827e1d), [`5ffcb56bf`](https://github.com/ho-nl/m2-pwa/commit/5ffcb56bfcbe49ebeaf24f9341e819a145ab9a14)]:
  - @graphcommerce/graphql@3.0.3
  - @graphcommerce/image@3.1.0
  - @graphcommerce/magento-graphql@3.0.3
  - @graphcommerce/magento-store@4.0.3
  - @graphcommerce/next-ui@4.1.2

## 3.0.2

### Patch Changes

- [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2) Thanks [@paales](https://github.com/paales)! - We've moved lots of internal packages from `dependencies` to `peerDependencies`. The result of this is that there will be significantly less duplicate packages in the node_modules folders.

* [#1274](https://github.com/ho-nl/m2-pwa/pull/1274) [`b08a8eb1d`](https://github.com/ho-nl/m2-pwa/commit/b08a8eb1d024b9d3e7712ef034029151670db275) Thanks [@paales](https://github.com/paales)! - Fixed extraction of translations and updated various translations for english 🇺🇸🇬🇧 and dutch 🇳🇱

- [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d) Thanks [@paales](https://github.com/paales)! - Upgraded to [NextJS 12.1](https://nextjs.org/blog/next-12-1)! This is just for compatibility, but we'll be implementing [On-demand Incremental Static Regeneration](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta) soon.

  This will greatly reduce the requirement to rebuid stuff and we'll add a management UI on the frontend to be able to revalidate pages manually.

- Updated dependencies [[`381e4c86a`](https://github.com/ho-nl/m2-pwa/commit/381e4c86a8321ce96e1fa5c7d3c0a0c0ff3e02c7), [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2), [`e7c8e2756`](https://github.com/ho-nl/m2-pwa/commit/e7c8e2756d637cbcd2e793d62ef5721d35d9fa7b), [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d)]:
  - @graphcommerce/next-ui@4.1.1
  - @graphcommerce/graphql@3.0.2
  - @graphcommerce/image@3.0.2
  - @graphcommerce/magento-graphql@3.0.2
  - @graphcommerce/magento-store@4.0.2

## 3.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514) Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files, so that the packages link to back to the website and repository
- Updated dependencies [[`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514)]:
  - @graphcommerce/graphql@3.0.1
  - @graphcommerce/image@3.0.1
  - @graphcommerce/magento-graphql@3.0.1
  - @graphcommerce/magento-store@4.0.1
  - @graphcommerce/next-ui@4.0.1

## 3.0.0

### Major Changes

- [#1258](https://github.com/ho-nl/m2-pwa/pull/1258) [`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05) Thanks [@paales](https://github.com/paales)! - Upgraded to Material UI 5

### Patch Changes

- Updated dependencies [[`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05)]:
  - @graphcommerce/graphql@3.0.0
  - @graphcommerce/image@3.0.0
  - @graphcommerce/magento-graphql@3.0.0
  - @graphcommerce/magento-store@4.0.0
  - @graphcommerce/next-ui@4.0.0

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.105.7](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-order@2.105.6...@graphcommerce/magento-customer-order@2.105.7) (2021-12-03)

### Bug Fixes

- make sure that pill link buttons get the right background color etc. ([c142b31](https://github.com/ho-nl/m2-pwa/commit/c142b31552417d2296341785994e2f7b35462793))
- spacing of LayoutTItle ([7afcd31](https://github.com/ho-nl/m2-pwa/commit/7afcd3163d16e902cf2ff7917f56ee6a8798f55b))

# [2.105.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-order@2.104.20...@graphcommerce/magento-customer-order@2.105.0) (2021-11-12)

### Features

- added tons of translations ([9bb0ac7](https://github.com/ho-nl/m2-pwa/commit/9bb0ac709b58df6ea6141e92e4923a5ca9ae2963))

# [2.104.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-order@2.103.8...@graphcommerce/magento-customer-order@2.104.0) (2021-11-02)

### Features

- darkTheme ([3ed6647](https://github.com/ho-nl/m2-pwa/commit/3ed664714670315bc9f20542549724f66cb5052d))

## [2.103.4](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-order@2.103.3...@graphcommerce/magento-customer-order@2.103.4) (2021-10-28)

### Bug Fixes

- External SVG's can't have alt tags ([1b1414a](https://github.com/ho-nl/m2-pwa/commit/1b1414a782d55d3acf7b0e6bcaa50f2ad5f18f39))

## [2.103.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-order@2.103.2...@graphcommerce/magento-customer-order@2.103.3) (2021-10-28)

### Bug Fixes

- build, remove unused imports ([af6d72c](https://github.com/ho-nl/m2-pwa/commit/af6d72c6e70f670effb4d9e0c1fd883bf771f99d))
- remove double icons ([1654e34](https://github.com/ho-nl/m2-pwa/commit/1654e3441911f3c7c1600357f8f8e3032f5ee729))
- SvgImage to SvgImageSimple ([e556c72](https://github.com/ho-nl/m2-pwa/commit/e556c720b299efed185c1d7c3a9b718190d90052))
- update SvgImage to SvgImageSimple ([f116543](https://github.com/ho-nl/m2-pwa/commit/f116543730853fa9782abff0ccacee7032e85789))

# [2.103.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-order@2.102.31...@graphcommerce/magento-customer-order@2.103.0) (2021-10-27)

### Features

- **nextjs:** upgraded to nextjs 12 ([9331bc8](https://github.com/ho-nl/m2-pwa/commit/9331bc801f6419522115cc47d291d49d608d5a90))

## [2.102.7](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-order@2.102.6...@graphcommerce/magento-customer-order@2.102.7) (2021-09-30)

### Bug Fixes

- with the latest version of graphql codegen the preresovled types inlined Maybe, make sure we reflect that ([7cb27b0](https://github.com/ho-nl/m2-pwa/commit/7cb27b04cbe31bee5ef4000d408f08bc9ac505c5))

## [2.102.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-order@2.102.0...@graphcommerce/magento-customer-order@2.102.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/magento-customer-order

# 2.102.0 (2021-09-27)

### Bug Fixes

- customer-order folder structure ([b7fabd1](https://github.com/ho-nl/m2-pwa/commit/b7fabd12014b2925d0b89c21f58e9974ce1c8b40))
- make separate queries folder, create injectable for account and inject reviews ([5d82a5d](https://github.com/ho-nl/m2-pwa/commit/5d82a5d9162f687c2678cce215b77eedbaf1669e))
- **my-account-order:** show carrier in order details ([45f2a1e](https://github.com/ho-nl/m2-pwa/commit/45f2a1e265e8dbe4e1e76fe8dbedb3b40ba693fa))
- **my-account-orders:** order item row image too large ([dfc7611](https://github.com/ho-nl/m2-pwa/commit/dfc76111e6bd7c33c616881892adcd29c18f907d))
- **order-details:** show shipping method ([36964a8](https://github.com/ho-nl/m2-pwa/commit/36964a85efa358cb4987f881b72598e48a2278f4))
- **orders:** show order number ([b2d9f27](https://github.com/ho-nl/m2-pwa/commit/b2d9f2758cb29966965964eca58d91896654e68b))

### Features

- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of [@reachdigital](https://github.com/reachdigital) ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

### Reverts

- Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

# Change Log

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.101.17](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-order@2.101.16...@graphcommerce/magento-customer-order@2.101.17) (2021-09-24)

### Bug Fixes

- **my-account-order:** show carrier in order details ([45f2a1e](https://github.com/ho-nl/m2-pwa/commit/45f2a1e265e8dbe4e1e76fe8dbedb3b40ba693fa))
- **my-account-orders:** order item row image too large ([dfc7611](https://github.com/ho-nl/m2-pwa/commit/dfc76111e6bd7c33c616881892adcd29c18f907d))
- **order-details:** show shipping method ([36964a8](https://github.com/ho-nl/m2-pwa/commit/36964a85efa358cb4987f881b72598e48a2278f4))
- **orders:** show order number ([b2d9f27](https://github.com/ho-nl/m2-pwa/commit/b2d9f2758cb29966965964eca58d91896654e68b))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-order@2.100.23...@graphcommerce/magento-customer-order@2.101.0) (2021-08-12)

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-order@2.100.23...@graphcommerce/magento-customer-order@2.101.0) (2021-08-12)

### Features

- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.100.23](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-order@2.100.22...@graphcommerce/magento-customer-order@2.100.23) (2021-08-09)

### Reverts

- Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

## 2.100.11 (2021-07-23)

### Bug Fixes

- customer-order folder structure ([b7fabd1](https://github.com/ho-nl/m2-pwa/commit/b7fabd12014b2925d0b89c21f58e9974ce1c8b40))
- make separate queries folder, create injectable for account and inject reviews ([5d82a5d](https://github.com/ho-nl/m2-pwa/commit/5d82a5d9162f687c2678cce215b77eedbaf1669e))
