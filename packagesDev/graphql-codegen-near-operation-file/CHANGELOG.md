# Change Log

## 9.0.4-canary.7

## 9.0.4-canary.6

## 9.0.4-canary.5

## 9.0.4-canary.4

## 9.0.4-canary.3

## 9.0.4-canary.2

## 9.0.4-canary.1

## 9.0.4-canary.0

## 9.0.0

### Major Changes

- [#2289](https://github.com/graphcommerce-org/graphcommerce/pull/2289) [`d2a6f58`](https://github.com/graphcommerce-org/graphcommerce/commit/d2a6f58276abadb132473d4da2d7d25e0b996106) - All fragments are now `@injectable` by default and the `@injectable` directive isn't required anymore. Always accept `@inject` directives. ([@paales](https://github.com/paales))

### Patch Changes

- [#2421](https://github.com/graphcommerce-org/graphcommerce/pull/2421) [`d500643`](https://github.com/graphcommerce-org/graphcommerce/commit/d500643138799b6db1610cb10a1d065d6219d8ea) - Resolve peer dependency issues so we get a clean install ([@paales](https://github.com/paales))

## 7.0.1

### Patch Changes

- [#2047](https://github.com/graphcommerce-org/graphcommerce/pull/2047) [`136580b39`](https://github.com/graphcommerce-org/graphcommerce/commit/136580b39e3cffdd07e3fa087e049bd532c3e8f1) - Updated all dependencies to the latest version where possible. ([@paales](https://github.com/paales))

## 7.0.0

### Patch Changes

- [#2012](https://github.com/graphcommerce-org/graphcommerce/pull/2012) [`1dbb3ae13`](https://github.com/graphcommerce-org/graphcommerce/commit/1dbb3ae13553992ee1ed77f375375560f28c418c) - Upgrade graphql to 16.7.1, add graphql as peer dependency ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

- [#1960](https://github.com/graphcommerce-org/graphcommerce/pull/1960) [`86e14569b`](https://github.com/graphcommerce-org/graphcommerce/commit/86e14569b1f68f73be7f93b614e36b382c5debff) - Updated to the latest release of GraphQL codegen and solve compatibility issues with our own generator ([@paales](https://github.com/paales))

- [#1982](https://github.com/graphcommerce-org/graphcommerce/pull/1982) [`e1fab2f6d`](https://github.com/graphcommerce-org/graphcommerce/commit/e1fab2f6d8f57d0488d8a915596d5c19cb7718e6) - Better detection what the package roots are when a custom node_modules directory is used ([@paales](https://github.com/paales))

## 6.0.1

### Patch Changes

- [#1854](https://github.com/graphcommerce-org/graphcommerce/pull/1854) [`30e51025b`](https://github.com/graphcommerce-org/graphcommerce/commit/30e51025b64b8ace49b54979c18c6fa5b6ff0a10) - GraphQL Codegen would throw a very unhelpful error message because of skipDocumentsValidation, will now throw a more helpful error message. ([@paales](https://github.com/paales))

## 5.1.0

### Patch Changes

- [#1752](https://github.com/graphcommerce-org/graphcommerce/pull/1752) [`2a6a4d9ec`](https://github.com/graphcommerce-org/graphcommerce/commit/2a6a4d9ecfa1b58a66ba9b9d00016d6feda9aa95) - Updated dependencies to latest versions, except for nextjs; Solve tons of peer dependency issues.

  - Updated the @mui/material package
  - Removed dependencies on react-hook-form-mui and @playwright/test
  - Upgraded dependencies including type-fest and graphql-mesh
  - Solved peer dependency issues ([@paales](https://github.com/paales))

## 5.0.0

### Major Changes

- [#1734](https://github.com/graphcommerce-org/graphcommerce/pull/1734) [`e4c7fe17e`](https://github.com/graphcommerce-org/graphcommerce/commit/e4c7fe17e413e37362ceae92e67f1b3a5f62d398) - Bump major version of all packages ([@github-actions](https://github.com/apps/github-actions))

### Minor Changes

- [#1738](https://github.com/graphcommerce-org/graphcommerce/pull/1738) [`bd3a30438`](https://github.com/graphcommerce-org/graphcommerce/commit/bd3a30438cf6b69cd37a191406c8190a20e572cc) - Created directive @env(if: String!) on FRAGMENT_DEFINITION to conditionally include a fragment ([@paales](https://github.com/paales))

## 3.0.19

### Patch Changes

- [#1702](https://github.com/graphcommerce-org/graphcommerce/pull/1702) [`abb15ef4a`](https://github.com/graphcommerce-org/graphcommerce/commit/abb15ef4a79b12eddb32cc006e5d1d31dd06ac2d) Thanks [@paales](https://github.com/paales)! - Added canary releases to GraphCommerce

## 3.0.18

### Patch Changes

- [#1607](https://github.com/graphcommerce-org/graphcommerce/pull/1607) [`860b4afc0`](https://github.com/graphcommerce-org/graphcommerce/commit/860b4afc0a2f79b1e660a5f9ce204532ce4fca47) Thanks [@paales](https://github.com/paales)! - Print error message directly instead of masking the error as it hides more than it helps

## 3.0.17

### Patch Changes

- [#1598](https://github.com/graphcommerce-org/graphcommerce/pull/1598) [`707dbc73d`](https://github.com/graphcommerce-org/graphcommerce/commit/707dbc73d181204d88fdbbd2e09340e25b2b5f7b) Thanks [@paales](https://github.com/paales)! - Upgraded dependencies

## 3.0.16

### Patch Changes

- [#1501](https://github.com/graphcommerce-org/graphcommerce/pull/1501) [`475d23197`](https://github.com/graphcommerce-org/graphcommerce/commit/475d23197a6ce4b08cc325f872834ca592aa28dc) Thanks [@paales](https://github.com/paales)! - Native windows support added: Directory separator differences and package.json interpretation differences

## 3.0.15

### Patch Changes

- [#1552](https://github.com/graphcommerce-org/graphcommerce/pull/1552) [`18054c441`](https://github.com/graphcommerce-org/graphcommerce/commit/18054c441962ba750bed3acc39ab46c8d3a341ce) Thanks [@paales](https://github.com/paales)! - Updated to Next.js v12.2.2 and other packages and made compatible

## 3.0.14

### Patch Changes

- [#1490](https://github.com/graphcommerce-org/graphcommerce/pull/1490) [`d311ef48b`](https://github.com/graphcommerce-org/graphcommerce/commit/d311ef48bb3e97806d992af5516d6b7f183ec9cb) Thanks [@paales](https://github.com/paales)! - upgraded packages

## 3.0.13

### Patch Changes

- [#1451](https://github.com/graphcommerce-org/graphcommerce/pull/1451) [`50188e378`](https://github.com/graphcommerce-org/graphcommerce/commit/50188e378b4c77561ebc600958ea11cd114fa61a) Thanks [@paales](https://github.com/paales)! - Loosen node requirement

## 3.0.12

### Patch Changes

- [#1439](https://github.com/graphcommerce-org/graphcommerce/pull/1439) [`25ef6cf08`](https://github.com/graphcommerce-org/graphcommerce/commit/25ef6cf08c278105307d6f604b7135d637e9046c) Thanks [@paales](https://github.com/paales)! - Updated dependencies

## 3.0.11

### Patch Changes

- [#1426](https://github.com/graphcommerce-org/graphcommerce/pull/1426) [`100f4c38c`](https://github.com/graphcommerce-org/graphcommerce/commit/100f4c38c8fcda4bc6e0425e38028b550b60adc2) Thanks [@paales](https://github.com/paales)! - Upgrade packages

## 3.0.10

### Patch Changes

- [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`da0ae7d02`](https://github.com/graphcommerce-org/graphcommerce/commit/da0ae7d0236e4908ba0bf0fa16656be516e841d4) Thanks [@paales](https://github.com/paales)! - Updated dependencies

## 3.0.9

### Patch Changes

- [#1369](https://github.com/graphcommerce-org/graphcommerce/pull/1369) [`ae6449502`](https://github.com/graphcommerce-org/graphcommerce/commit/ae64495024a455bbe5188588604368c1542840c9) Thanks [@paales](https://github.com/paales)! - Upgraded dependencies

## 3.0.8

### Patch Changes

- [#1356](https://github.com/graphcommerce-org/graphcommerce/pull/1356) [`9f2de0f7b`](https://github.com/graphcommerce-org/graphcommerce/commit/9f2de0f7b0fe8f20fd3ac70ddcd9616c28e2f68e) Thanks [@timhofman](https://github.com/timhofman)! - Include filepath when when duplicate fragments are found

## 3.0.7

### Patch Changes

- [#1341](https://github.com/graphcommerce-org/graphcommerce/pull/1341) [`2e29c5852`](https://github.com/graphcommerce-org/graphcommerce/commit/2e29c585247d356e3027be92beb7815f2070c855) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

## 3.0.6

### Patch Changes

- [#1326](https://github.com/graphcommerce-org/graphcommerce/pull/1326) [`df0b3e7d5`](https://github.com/graphcommerce-org/graphcommerce/commit/df0b3e7d5f5fee963731a999cb3a8891580cb6fe) Thanks [@paales](https://github.com/paales)! - Latest version of GraphQL Mesh is broken, reverting to older version

## 3.0.5

### Patch Changes

- [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655) Thanks [@paales](https://github.com/paales)! - All default exports are now named exports internally and all `index.tsx` are renamed to the component name.

* [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

## 3.0.4

### Patch Changes

- [#1285](https://github.com/ho-nl/m2-pwa/pull/1285) [`c85294ba6`](https://github.com/ho-nl/m2-pwa/commit/c85294ba6d742ce78c074559a1e95409b25a5017) Thanks [@paales](https://github.com/paales)! - upgraded dependencies

## 3.0.3

### Patch Changes

- [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96) Thanks [@paales](https://github.com/paales)! - made packages public

## 3.0.2

### Patch Changes

- [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2) Thanks [@paales](https://github.com/paales)! - We've moved lots of internal packages from `dependencies` to `peerDependencies`. The result of this is that there will be significantly less duplicate packages in the node_modules folders.

* [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d) Thanks [@paales](https://github.com/paales)! - Upgraded to [NextJS 12.1](https://nextjs.org/blog/next-12-1)! This is just for compatibility, but we'll be implementing [On-demand Incremental Static Regeneration](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta) soon.

  This will greatly reduce the requirement to rebuid stuff and we'll add a management UI on the frontend to be able to revalidate pages manually.

## 3.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514) Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files, so that the packages link to back to the website and repository

## 3.0.0

### Major Changes

- [#1258](https://github.com/ho-nl/m2-pwa/pull/1258) [`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05) Thanks [@paales](https://github.com/paales)! - Upgraded to Material UI 5

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.103.6](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql-codegen-near-operation-file@2.103.5...@graphcommerce/graphql-codegen-near-operation-file@2.103.6) (2021-10-18)

### Bug Fixes

- graphql-mesh missing inmemory lru ([6c71c25](https://github.com/ho-nl/m2-pwa/commit/6c71c256911072ace19037616e0ce2ab478bf070))

## [2.103.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql-codegen-near-operation-file@2.103.0...@graphcommerce/graphql-codegen-near-operation-file@2.103.1) (2021-09-28)

### Bug Fixes

- do not build on install ([254e2a6](https://github.com/ho-nl/m2-pwa/commit/254e2a6f4b2a7e81f46466a0abe06ae2f3a79575))

# [2.103.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql-codegen-near-operation-file@2.102.3...@graphcommerce/graphql-codegen-near-operation-file@2.103.0) (2021-09-28)

### Features

- add postinstall commands to run properly on deploy ([d512ee3](https://github.com/ho-nl/m2-pwa/commit/d512ee3ba5c3a9573651ec5333595fe2f1aa141c))

## [2.102.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql-codegen-near-operation-file@2.102.2...@graphcommerce/graphql-codegen-near-operation-file@2.102.3) (2021-09-27)

### Bug Fixes

- build packages before releasing ([c4761cf](https://github.com/ho-nl/m2-pwa/commit/c4761cf6d1810c140fd56f6eac8fca922f8c0edc))

## [2.102.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql-codegen-near-operation-file@2.102.0...@graphcommerce/graphql-codegen-near-operation-file@2.102.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/graphql-codegen-near-operation-file

# 2.102.0 (2021-09-27)

### Bug Fixes

- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
- make sure graphql imports import Type correctly ([bc7cce0](https://github.com/ho-nl/m2-pwa/commit/bc7cce0e5013f46acccc316bcb7b90394106b8d2))

### Features

- added near-operation-file graphql codegen structure ([e25bdd1](https://github.com/ho-nl/m2-pwa/commit/e25bdd130ac41325619a7d0648e3cb68f2380d32))
- allow for resolving fragments from directories other than the current target ([26c155b](https://github.com/ho-nl/m2-pwa/commit/26c155b6ff31958ff61cc800db6dc359d7d6ce99))
- **graphql-codegen-near-operation-file:** do not export fragment documents ([f0f7091](https://github.com/ho-nl/m2-pwa/commit/f0f70911641b368834a12251b48aac733becf3b4))
- **graphql-codegen:** new [@injectable](https://github.com/injectable) and [@inject](https://github.com/inject)(into: [“FragmentName”]) directives ([f80c96c](https://github.com/ho-nl/m2-pwa/commit/f80c96ce04f83023501fc1f25e7f466810092233))
- **next-config:** introduced package to streamline the setup of new examples ([b8a3958](https://github.com/ho-nl/m2-pwa/commit/b8a39584e5b529fcaa22db67d3f986b91ae683ad))
- **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of [@reachdigital](https://github.com/reachdigital) ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
- upgrade to node 14 ([d079a75](https://github.com/ho-nl/m2-pwa/commit/d079a751e9bfd8dc7f5009d2c9f31c336a0c96ab))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql-codegen-near-operation-file@2.100.10...@graphcommerce/graphql-codegen-near-operation-file@2.101.0) (2021-07-26)

### Bug Fixes

- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))

### Features

- **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
