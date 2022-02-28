# Change Log

## 3.0.3

### Patch Changes

- [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96)
  Thanks [@paales](https://github.com/paales)! - made packages public

* [#1278](https://github.com/ho-nl/m2-pwa/pull/1278)
  [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20)
  Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Upgraded dependencies to the latest version

* Updated dependencies
  [[`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96),
  [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20),
  [`3a719c88c`](https://github.com/ho-nl/m2-pwa/commit/3a719c88cad1eab58602de28c41adc0fc4827e1d),
  [`5ffcb56bf`](https://github.com/ho-nl/m2-pwa/commit/5ffcb56bfcbe49ebeaf24f9341e819a145ab9a14)]:
  - @graphcommerce/graphql@3.0.3
  - @graphcommerce/image@3.1.0
  - @graphcommerce/next-ui@4.1.2

## 3.0.2

### Patch Changes

- [#1276](https://github.com/ho-nl/m2-pwa/pull/1276)
  [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2)
  Thanks [@paales](https://github.com/paales)! - We've moved lots of internal packages from
  `dependencies` to `peerDependencies`. The result of this is that there will be significantly less
  duplicate packages in the node_modules folders.

* [#1276](https://github.com/ho-nl/m2-pwa/pull/1276)
  [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d)
  Thanks [@paales](https://github.com/paales)! - Upgraded to
  [NextJS 12.1](https://nextjs.org/blog/next-12-1)! This is just for compatibility, but we'll be
  implementing
  [On-demand Incremental Static Regeneration](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta)
  soon.

  This will greatly reduce the requirement to rebuid stuff and we'll add a management UI on the
  frontend to be able to revalidate pages manually.

* Updated dependencies
  [[`381e4c86a`](https://github.com/ho-nl/m2-pwa/commit/381e4c86a8321ce96e1fa5c7d3c0a0c0ff3e02c7),
  [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2),
  [`e7c8e2756`](https://github.com/ho-nl/m2-pwa/commit/e7c8e2756d637cbcd2e793d62ef5721d35d9fa7b),
  [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d)]:
  - @graphcommerce/next-ui@4.1.1
  - @graphcommerce/graphql@3.0.2
  - @graphcommerce/image@3.0.2

## 3.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514)
  Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files,
  so that the packages link to back to the website and repository
- Updated dependencies
  [[`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514)]:
  - @graphcommerce/graphql@3.0.1
  - @graphcommerce/image@3.0.1
  - @graphcommerce/next-ui@4.0.1

## 3.0.0

### Major Changes

- [#1258](https://github.com/ho-nl/m2-pwa/pull/1258)
  [`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05)
  Thanks [@paales](https://github.com/paales)! - Upgraded to Material UI 5

### Patch Changes

- Updated dependencies
  [[`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05)]:
  - @graphcommerce/graphql@3.0.0
  - @graphcommerce/image@3.0.0
  - @graphcommerce/next-ui@4.0.0

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.106.12](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcms-ui@2.106.11...@graphcommerce/graphcms-ui@2.106.12) (2021-12-17)

### Bug Fixes

- make sure we're able to render table_header_cell and do not throw when rendering unknown elements
  in production
  ([f7b7972](https://github.com/ho-nl/m2-pwa/commit/f7b797272f5765801c3f2e217fa9905f65dbe6d6))

# [2.106.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcms-ui@2.105.4...@graphcommerce/graphcms-ui@2.106.0) (2021-12-01)

### Bug Fixes

- build ([72d9353](https://github.com/ho-nl/m2-pwa/commit/72d935376a1967cc976c20b984ef15a862e5d0f4))
- fontWeights
  ([7172527](https://github.com/ho-nl/m2-pwa/commit/71725272fe9f0b854d918ae357a668f641bfe8e5))
- hero text spacing
  ([79dd6aa](https://github.com/ho-nl/m2-pwa/commit/79dd6aa2fe576104ebbbdd092f6b415d319dec48))
- render bug stroke variable fonts
  ([582de18](https://github.com/ho-nl/m2-pwa/commit/582de187800ee9c53718bf43a39ca77398d21b91)),
  closes
  [/github.com/rsms/inter/issues/292#issuecomment-674993644](https://github.com//github.com/rsms/inter/issues/292/issues/issuecomment-674993644)

### Features

- breakpointVal
  ([0294503](https://github.com/ho-nl/m2-pwa/commit/029450343051cf6995babad9f9b42c7e6ad1094e))
- responsiveTyp
  ([6108b61](https://github.com/ho-nl/m2-pwa/commit/6108b6148e76ddbbe2db1614f10aaf88423db5ca))

# [2.105.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcms-ui@2.104.29...@graphcommerce/graphcms-ui@2.105.0) (2021-11-12)

### Features

- added tons of translations
  ([9bb0ac7](https://github.com/ho-nl/m2-pwa/commit/9bb0ac709b58df6ea6141e92e4923a5ca9ae2963))

## [2.104.29](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcms-ui@2.104.28...@graphcommerce/graphcms-ui@2.104.29) (2021-11-12)

### Bug Fixes

- must have smaller sizes for mobile
  ([34cf81e](https://github.com/ho-nl/m2-pwa/commit/34cf81eed6c5996f70be8b2c10888e44fad4d57f))

## [2.104.18](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcms-ui@2.104.17...@graphcommerce/graphcms-ui@2.104.18) (2021-11-04)

### Bug Fixes

- remove hardcoded fontSize
  ([e4e09e1](https://github.com/ho-nl/m2-pwa/commit/e4e09e11baeb8edeff634550b8cdb88571d96911))

## [2.104.16](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcms-ui@2.104.15...@graphcommerce/graphcms-ui@2.104.16) (2021-11-03)

### Bug Fixes

- various accessibility improvements
  ([47481a9](https://github.com/ho-nl/m2-pwa/commit/47481a9a882ba87968de6dd797557b0b275d75fb))

## [2.104.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcms-ui@2.104.8...@graphcommerce/graphcms-ui@2.104.9) (2021-11-02)

### Bug Fixes

- color from palette
  ([283cca1](https://github.com/ho-nl/m2-pwa/commit/283cca169ec00cbac8b973e14e6b77a443e26c99))
- darkMode
  ([c7573de](https://github.com/ho-nl/m2-pwa/commit/c7573de6bb80643b26931c35ac61735539e7fbf0))

## [2.104.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcms-ui@2.104.2...@graphcommerce/graphcms-ui@2.104.3) (2021-10-28)

### Bug Fixes

- default heading margins for CMS content
  ([ac7c24f](https://github.com/ho-nl/m2-pwa/commit/ac7c24f731abf9573ad93d534d84b9f7c1b16a2b))

# [2.104.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcms-ui@2.103.30...@graphcommerce/graphcms-ui@2.104.0) (2021-10-27)

### Features

- **nextjs:** upgraded to nextjs 12
  ([9331bc8](https://github.com/ho-nl/m2-pwa/commit/9331bc801f6419522115cc47d291d49d608d5a90))

## [2.103.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcms-ui@2.103.0...@graphcommerce/graphcms-ui@2.103.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/graphcms-ui

# 2.103.0 (2021-09-27)

### Bug Fixes

- ignore md files from triggering version updates
  ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
- implement next-ui barrel imports
  ([75bea70](https://github.com/ho-nl/m2-pwa/commit/75bea703dba898f18a2a1dfa3243ebd0a4e6f0e1))
- narrow quote on mobile
  ([e06ccc2](https://github.com/ho-nl/m2-pwa/commit/e06ccc25048124431dcdb786f1719f688a5e429c))
- remove conflicting files
  ([0c17ae4](https://github.com/ho-nl/m2-pwa/commit/0c17ae46be62b775ac83b35f11c532ce2d9401a3))
- since all links are of next/link we need to add passHref for custom components
  ([16fb931](https://github.com/ho-nl/m2-pwa/commit/16fb93100d367203ea79bb4f93357221253f2ecd))

### Features

- created stacked-pages package
  ([d86008e](https://github.com/ho-nl/m2-pwa/commit/d86008ee659ccb25b194a41d624b394a1ddbd088))
- **image:** introduced completely rewritten Image component
  ([e3413b3](https://github.com/ho-nl/m2-pwa/commit/e3413b3a57392d6571ea64cb8d9c8dca05ea31df))
- implemented the ability to load graphcms content by URL
  ([99bc970](https://github.com/ho-nl/m2-pwa/commit/99bc970fc46d40b7efa99a71819529aeaa206bb4))
- introduced graphcms-ui package to quickly build pages
  ([04d89c3](https://github.com/ho-nl/m2-pwa/commit/04d89c3fecf25f64923caf437eeb4b73f8887102))
- introduces framer-next-pages and framer-sheet to next-ui and soxbase package
  ([e04ad8a](https://github.com/ho-nl/m2-pwa/commit/e04ad8a94cd1fd5a7c5575c9db7916b6e8a88f16))
- next.js 11
  ([7d61407](https://github.com/ho-nl/m2-pwa/commit/7d614075a778f488045034f74be4f75b93f63c43))
- **playwright:** added new playwright package to enable browser testing
  ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of
  [@reachdigital](https://github.com/reachdigital)
  ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
- upgrade to node 14
  ([d079a75](https://github.com/ho-nl/m2-pwa/commit/d079a751e9bfd8dc7f5009d2c9f31c336a0c96ab))
- upgraded to nextjs 11
  ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

### Reverts

- Revert "chore: upgrade @apollo/client"
  ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcms-ui@2.101.9...@graphcommerce/graphcms-ui@2.102.0) (2021-08-12)

### Features

- upgraded to nextjs 11
  ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.101.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcms-ui@2.101.8...@graphcommerce/graphcms-ui@2.101.9) (2021-08-09)

### Reverts

- Revert "chore: upgrade @apollo/client"
  ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcms-ui@2.100.18...@graphcommerce/graphcms-ui@2.101.0) (2021-07-26)

### Features

- **playwright:** added new playwright package to enable browser testing
  ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))

## [2.100.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcms-ui@2.100.10...@graphcommerce/graphcms-ui@2.100.11) (2021-07-20)

### Bug Fixes

- ignore md files from triggering version updates
  ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
