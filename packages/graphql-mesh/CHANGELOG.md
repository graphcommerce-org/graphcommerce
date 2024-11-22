# Change Log

## 9.0.0-canary.103

### Patch Changes

- [#2421](https://github.com/graphcommerce-org/graphcommerce/pull/2421) [`d500643`](https://github.com/graphcommerce-org/graphcommerce/commit/d500643138799b6db1610cb10a1d065d6219d8ea) - Resolve peer dependency issues so we get a clean install ([@paales](https://github.com/paales))

## 9.0.0-canary.101

### Minor Changes

- [#2380](https://github.com/graphcommerce-org/graphcommerce/pull/2380) [`3710d8b`](https://github.com/graphcommerce-org/graphcommerce/commit/3710d8bf1cceb5a991e5cfdfc15d42e462704c6d) - Solves the issue `TypeError: url?.startsWith is not a function`. The generated `.mesh/index.ts` would be generated as a requirejs module while next.js expects an esm module. In the end we properly generated the mesh correctly and now there is an `import.meta.url` instead of using `require('node:url')`. To solve this we needed to solve a chain of issues:

  1. The generation of the mesh is based on the version of the mesh that is imported (esm or commonjs). See [source](https://github.com/ardatan/graphql-mesh/blob/bf588d372c0078378aaa24beea2da794af7949e6/scripts/replace-import-meta-url-in-cjs.ts#L9-L10) for the lines that need to be different. This meant that we needed to change the @graphcommerce/cli package to be of type:module instead of a commonjs module.

  2) To properly convert the module to an esm module we've migrated the build of the cli package to use 'pkgroll' instead of tsc, because tsc is limited in what it outputs and can't really convert classic imports to esm.
  3) To load possible mesh plugins we require additional .ts files to be loaded with [tsx](https://tsx.is/). To get the tsx loader to work properly in combination with esm modules, we need at least [node 18.19.0](https://nodejs.org/en/blog/release/v18.19.0#new-nodemodule-api-register-for-module-customization-hooks-new-initialize-hook). Minimal Node version upped to 18.19.0 and add support for node 22. ([@paales](https://github.com/paales))

## 9.0.0-canary.71

### Patch Changes

- [#2345](https://github.com/graphcommerce-org/graphcommerce/pull/2345) [`d4ae30b`](https://github.com/graphcommerce-org/graphcommerce/commit/d4ae30ba28815ccb9d3a0478da995b7c609618e5) - Solve issue where customFetch coudn’t be loaded correctly ([@paales](https://github.com/paales))

## 9.0.0-canary.67

### Patch Changes

- [#2336](https://github.com/graphcommerce-org/graphcommerce/pull/2336) [`214bc56`](https://github.com/graphcommerce-org/graphcommerce/commit/214bc56950f397727d2c5417741dc62419080dfa) - Added traverseSelectionSet utility function to extract a child selection set from the parent. ([@Renzovh](https://github.com/Renzovh))

## 9.0.0-canary.59

### Minor Changes

- [#2309](https://github.com/graphcommerce-org/graphcommerce/pull/2309) [`b46e17e`](https://github.com/graphcommerce-org/graphcommerce/commit/b46e17ebe390b4d0040639dfdac33c36a60576ac) - When generating the mesh the configuration is passed through `@graphcommerce/graphql-mesh/meshConfig` allowing plugins to modify the mesh configuration without having to change the `.meshrc.yaml` itself. ([@Renzovh](https://github.com/Renzovh))

## 9.0.0-canary.58

### Minor Changes

- [#2330](https://github.com/graphcommerce-org/graphcommerce/pull/2330) [`bc3ec5e`](https://github.com/graphcommerce-org/graphcommerce/commit/bc3ec5e439b97cea4a2cef23e4008c7e0cfd6797) - Created a new @graphql-mesh plugin to forward headers from backends as forwardedHeaders in extensions ([@paales](https://github.com/paales))

## 8.1.0-canary.29

### Patch Changes

- [#2290](https://github.com/graphcommerce-org/graphcommerce/pull/2290) [`21f2ac0`](https://github.com/graphcommerce-org/graphcommerce/commit/21f2ac06b95cfc9b51febe19e6859cbba2b578b4) - Fix cors issues with Dynamic Row Property Picker App ([@JoshuaS98](https://github.com/JoshuaS98))

## 8.1.0-canary.8

### Patch Changes

- [#2247](https://github.com/graphcommerce-org/graphcommerce/pull/2247) [`6831040`](https://github.com/graphcommerce-org/graphcommerce/commit/68310401448b7b42b53757db4a84de4a01e35aa2) - Suppress warning where a dependency is an expression, Added uglify-es and long as the dependencies couldn’t be found ([@paales](https://github.com/paales))

## 8.0.0

### Patch Changes

- [#2113](https://github.com/graphcommerce-org/graphcommerce/pull/2113) [`bf5ae89`](https://github.com/graphcommerce-org/graphcommerce/commit/bf5ae8979b145e7a96303f839ef2b1238712531a) - Remove requirement of toplevelAwait for graphqlSsrClient and solve logging issue in cli ([@paales](https://github.com/paales))

## 7.0.1

### Patch Changes

- [#2047](https://github.com/graphcommerce-org/graphcommerce/pull/2047) [`136580b39`](https://github.com/graphcommerce-org/graphcommerce/commit/136580b39e3cffdd07e3fa087e049bd532c3e8f1) - Updated all dependencies to the latest version where possible. ([@paales](https://github.com/paales))

## 7.0.0

### Patch Changes

- [#1960](https://github.com/graphcommerce-org/graphcommerce/pull/1960) [`f78caf5a8`](https://github.com/graphcommerce-org/graphcommerce/commit/f78caf5a83683f1ae4b901fb94bd22d50943fa2f) - Updated packages: `next`, `@apollo/client`, `react-hook-form`, `@emotion/*`, `@lingui/*`, `@mui/*` and various others. ([@paales](https://github.com/paales))

- [#2012](https://github.com/graphcommerce-org/graphcommerce/pull/2012) [`1dbb3ae13`](https://github.com/graphcommerce-org/graphcommerce/commit/1dbb3ae13553992ee1ed77f375375560f28c418c) - Upgrade graphql to 16.7.1, add graphql as peer dependency ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

- [#1924](https://github.com/graphcommerce-org/graphcommerce/pull/1924) [`04581f619`](https://github.com/graphcommerce-org/graphcommerce/commit/04581f619c609f2f6ca5268ee5effb6a1db3f0eb) - Use the latest branch from graphql-mesh so that all versions are in sync ([@paales](https://github.com/paales))

- [`48f4f5cbd`](https://github.com/graphcommerce-org/graphcommerce/commit/48f4f5cbd07bbc08e1bf58cabc0e0230b2bd78bc) - Peer dependency warnings reduced ([@paales](https://github.com/paales))

## 6.1.0

### Minor Changes

- [#1874](https://github.com/graphcommerce-org/graphcommerce/pull/1874) [`2a60491c2`](https://github.com/graphcommerce-org/graphcommerce/commit/2a60491c23a9cd0bfd79296d29f6c9ee31faada5) - Fetch request improvements in the mesh (30-100ms): The mesh wouldn't keep ssl handshakes alive causing an additional delay for each request. Performance improvements depend on the ssl handshake performance of the server. ([@paales](https://github.com/paales))

- [#1874](https://github.com/graphcommerce-org/graphcommerce/pull/1874) [`2a60491c2`](https://github.com/graphcommerce-org/graphcommerce/commit/2a60491c23a9cd0bfd79296d29f6c9ee31faada5) - Big Magento performance improvements; Magento couldn't respond with any cached Varnish responses because there was an empty authorization header sent with each request. ([@paales](https://github.com/paales))

## 6.0.0

### Patch Changes

- [#1821](https://github.com/graphcommerce-org/graphcommerce/pull/1821) [`1abc50a21`](https://github.com/graphcommerce-org/graphcommerce/commit/1abc50a21103270fad04e4a9ea892ee1e75233e9) - Upgrade packages to latest version ([@paales](https://github.com/paales))

## 5.1.1

### Patch Changes

- [#1764](https://github.com/graphcommerce-org/graphcommerce/pull/1764) [`5829ffc73`](https://github.com/graphcommerce-org/graphcommerce/commit/5829ffc732c6aea95da53314722385a2c0edce85) - Update dependencies ([@paales](https://github.com/paales))

## 5.1.0

### Minor Changes

- [#1755](https://github.com/graphcommerce-org/graphcommerce/pull/1755) [`053ef07d0`](https://github.com/graphcommerce-org/graphcommerce/commit/053ef07d0acf25fba840b50f3ad56746fc97d6a2) - Add [httpDetailsExtensions](https://the-guild.dev/graphql/mesh/docs/plugins/http-details-extensions) plugin to the mesh for a better debugging experience. ([@paales](https://github.com/paales))

### Patch Changes

- [#1745](https://github.com/graphcommerce-org/graphcommerce/pull/1745) [`c7816cd69`](https://github.com/graphcommerce-org/graphcommerce/commit/c7816cd693f2fad61be6e2ed119e7e8bf13f079f) - Added JS version of the customFetch method, node_module files aren't transpiled ([@github-actions](https://github.com/apps/github-actions))

- [#1760](https://github.com/graphcommerce-org/graphcommerce/pull/1760) [`8badc8550`](https://github.com/graphcommerce-org/graphcommerce/commit/8badc8550c402ac7b80c8d3238d313550c28a055) - Updated dependencies ([@paales](https://github.com/paales))

- [#1752](https://github.com/graphcommerce-org/graphcommerce/pull/1752) [`188f23452`](https://github.com/graphcommerce-org/graphcommerce/commit/188f2345255aacd7665d8e443cf42e20a3070a01) - Implement a custom fetch that has an exponential backoff so that build don’t fail as often ([@paales](https://github.com/paales))

- [#1752](https://github.com/graphcommerce-org/graphcommerce/pull/1752) [`2a6a4d9ec`](https://github.com/graphcommerce-org/graphcommerce/commit/2a6a4d9ecfa1b58a66ba9b9d00016d6feda9aa95) - Updated dependencies to latest versions, except for nextjs; Solve tons of peer dependency issues.

  - Updated the @mui/material package
  - Removed dependencies on react-hook-form-mui and @playwright/test
  - Upgraded dependencies including type-fest and graphql-mesh
  - Solved peer dependency issues ([@paales](https://github.com/paales))

## 5.0.0

### Major Changes

- [#1734](https://github.com/graphcommerce-org/graphcommerce/pull/1734) [`e4c7fe17e`](https://github.com/graphcommerce-org/graphcommerce/commit/e4c7fe17e413e37362ceae92e67f1b3a5f62d398) - Bump major version of all packages ([@github-actions](https://github.com/apps/github-actions))

## 4.30.0

### Patch Changes

- [#1702](https://github.com/graphcommerce-org/graphcommerce/pull/1702) [`abb15ef4a`](https://github.com/graphcommerce-org/graphcommerce/commit/abb15ef4a79b12eddb32cc006e5d1d31dd06ac2d) Thanks [@paales](https://github.com/paales)! - Added canary releases to GraphCommerce

## 4.2.0

### Minor Changes

- [#1633](https://github.com/graphcommerce-org/graphcommerce/pull/1633) [`4487db309`](https://github.com/graphcommerce-org/graphcommerce/commit/4487db309df01a22f49876cf4a5574ece303a8ca) Thanks [@timhofman](https://github.com/timhofman)! - Send gcms-locales header to the Hypgraph backend so requests are translated.

## 4.1.9

### Patch Changes

- [#1614](https://github.com/graphcommerce-org/graphcommerce/pull/1614) [`448c77681`](https://github.com/graphcommerce-org/graphcommerce/commit/448c77681f9a7794e84ec93139d7e0f16afafbd9) Thanks [@paales](https://github.com/paales)! - Update mesh versions

## 4.1.8

### Patch Changes

- [#1590](https://github.com/graphcommerce-org/graphcommerce/pull/1590) [`3ff0e7f2d`](https://github.com/graphcommerce-org/graphcommerce/commit/3ff0e7f2d26edad228848268d24e9aaf56cd2c30) Thanks [@paales](https://github.com/paales)! - useExtendContext doesn’t need to be added in createEnvelop already added by default

## 4.1.7

### Patch Changes

- [#1598](https://github.com/graphcommerce-org/graphcommerce/pull/1598) [`707dbc73d`](https://github.com/graphcommerce-org/graphcommerce/commit/707dbc73d181204d88fdbbd2e09340e25b2b5f7b) Thanks [@paales](https://github.com/paales)! - Upgraded dependencies

## 4.1.6

### Patch Changes

- [#1562](https://github.com/graphcommerce-org/graphcommerce/pull/1562) [`01f1588c9`](https://github.com/graphcommerce-org/graphcommerce/commit/01f1588c9200bb39dd61146e260bfa2b32060612) Thanks [@paales](https://github.com/paales)! - The context was missing in apollo client

## 4.1.5

### Patch Changes

- [#1552](https://github.com/graphcommerce-org/graphcommerce/pull/1552) [`18054c441`](https://github.com/graphcommerce-org/graphcommerce/commit/18054c441962ba750bed3acc39ab46c8d3a341ce) Thanks [@paales](https://github.com/paales)! - Updated to Next.js v12.2.2 and other packages and made compatible

## 4.1.4

### Patch Changes

- [#1490](https://github.com/graphcommerce-org/graphcommerce/pull/1490) [`d311ef48b`](https://github.com/graphcommerce-org/graphcommerce/commit/d311ef48bb3e97806d992af5516d6b7f183ec9cb) Thanks [@paales](https://github.com/paales)! - upgraded packages

## 4.1.3

### Patch Changes

- [#1439](https://github.com/graphcommerce-org/graphcommerce/pull/1439) [`25ef6cf08`](https://github.com/graphcommerce-org/graphcommerce/commit/25ef6cf08c278105307d6f604b7135d637e9046c) Thanks [@paales](https://github.com/paales)! - Updated dependencies

## 4.1.2

### Patch Changes

- [#1429](https://github.com/graphcommerce-org/graphcommerce/pull/1429) [`ba8cd4d34`](https://github.com/graphcommerce-org/graphcommerce/commit/ba8cd4d3480a7ec7e555b051cfd0fbc809c7aa12) Thanks [@paales](https://github.com/paales)! - mesh couldn’t be generated properly in a non-monorepo setup

## 4.1.1

### Patch Changes

- [#1427](https://github.com/graphcommerce-org/graphcommerce/pull/1427) [`06f7bdff8`](https://github.com/graphcommerce-org/graphcommerce/commit/06f7bdff882396f2b0e1a2873fbb718c7b06fab4) Thanks [@paales](https://github.com/paales)! - Use playground title provided by the config

* [#1426](https://github.com/graphcommerce-org/graphcommerce/pull/1426) [`100f4c38c`](https://github.com/graphcommerce-org/graphcommerce/commit/100f4c38c8fcda4bc6e0425e38028b550b60adc2) Thanks [@paales](https://github.com/paales)! - Upgrade packages

## 4.1.0

### Minor Changes

- [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542) Thanks [@paales](https://github.com/paales)! - Now using [@graphql-yoga](https://github.com/dotansimha/graphql-yoga) for GraphQL which has full support for [envelop](https://www.envelop.dev/) plugins.

* [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542) Thanks [@paales](https://github.com/paales)! - Added a new @graphcommerce/cli package to generate the mesh so it can be generated _inside_ the @graphcommerce/graphql-mesh package to allow for better future extensibility.

### Patch Changes

- [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`da0ae7d02`](https://github.com/graphcommerce-org/graphcommerce/commit/da0ae7d0236e4908ba0bf0fa16656be516e841d4) Thanks [@paales](https://github.com/paales)! - Updated dependencies

## 4.0.11

### Patch Changes

- [#1378](https://github.com/graphcommerce-org/graphcommerce/pull/1378) [`22ff9df16`](https://github.com/graphcommerce-org/graphcommerce/commit/22ff9df1677742ae8e07d9b7e5b12fbb487580dc) Thanks [@paales](https://github.com/paales)! - upgrade to latest versions of packages

## 4.0.10

### Patch Changes

- [#1369](https://github.com/graphcommerce-org/graphcommerce/pull/1369) [`ae6449502`](https://github.com/graphcommerce-org/graphcommerce/commit/ae64495024a455bbe5188588604368c1542840c9) Thanks [@paales](https://github.com/paales)! - Upgraded dependencies

## 4.0.9

### Patch Changes

- [#1341](https://github.com/graphcommerce-org/graphcommerce/pull/1341) [`2e29c5852`](https://github.com/graphcommerce-org/graphcommerce/commit/2e29c585247d356e3027be92beb7815f2070c855) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

## 4.0.8

### Patch Changes

- [#1328](https://github.com/graphcommerce-org/graphcommerce/pull/1328) [`f44443619`](https://github.com/graphcommerce-org/graphcommerce/commit/f44443619eda9eba8f16beb6ffb462d6511fbfb2) Thanks [@paales](https://github.com/paales)! - Another shot at fixing the graphql-mesh version

## 4.0.7

### Patch Changes

- [#1326](https://github.com/graphcommerce-org/graphcommerce/pull/1326) [`df0b3e7d5`](https://github.com/graphcommerce-org/graphcommerce/commit/df0b3e7d5f5fee963731a999cb3a8891580cb6fe) Thanks [@paales](https://github.com/paales)! - Latest version of GraphQL Mesh is broken, reverting to older version

## 4.0.6

### Patch Changes

- [#1312](https://github.com/ho-nl/m2-pwa/pull/1312) [`4e1fd4d9f`](https://github.com/ho-nl/m2-pwa/commit/4e1fd4d9fda2109de378be7e39382f7014a7ab54) Thanks [@paales](https://github.com/paales)! - upgraded dependencies

## 4.0.5

### Patch Changes

- [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655) Thanks [@paales](https://github.com/paales)! - All default exports are now named exports internally and all `index.tsx` are renamed to the component name.

* [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

## 4.0.4

### Patch Changes

- [#1285](https://github.com/ho-nl/m2-pwa/pull/1285) [`c85294ba6`](https://github.com/ho-nl/m2-pwa/commit/c85294ba6d742ce78c074559a1e95409b25a5017) Thanks [@paales](https://github.com/paales)! - upgraded dependencies

* [#1285](https://github.com/ho-nl/m2-pwa/pull/1285) [`d9cd4acca`](https://github.com/ho-nl/m2-pwa/commit/d9cd4acca218018dd6e20f033875ef93919fb462) Thanks [@paales](https://github.com/paales)! - fix: issue with graphql server creation

## 4.0.3

### Patch Changes

- [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96) Thanks [@paales](https://github.com/paales)! - made packages public

* [#1278](https://github.com/ho-nl/m2-pwa/pull/1278) [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Upgraded dependencies to the latest version

## 4.0.2

### Patch Changes

- [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2) Thanks [@paales](https://github.com/paales)! - We've moved lots of internal packages from `dependencies` to `peerDependencies`. The result of this is that there will be significantly less duplicate packages in the node_modules folders.

* [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d) Thanks [@paales](https://github.com/paales)! - Upgraded to [NextJS 12.1](https://nextjs.org/blog/next-12-1)! This is just for compatibility, but we'll be implementing [On-demand Incremental Static Regeneration](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta) soon.

  This will greatly reduce the requirement to rebuid stuff and we'll add a management UI on the frontend to be able to revalidate pages manually.

## 4.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514) Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files, so that the packages link to back to the website and repository

## 4.0.0

### Major Changes

- [#1258](https://github.com/ho-nl/m2-pwa/pull/1258) [`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05) Thanks [@paales](https://github.com/paales)! - Upgraded to Material UI 5

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.2.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql-mesh@3.1.0...@graphcommerce/graphql-mesh@3.2.0) (2021-10-21)

### Bug Fixes

- **graphql-mesh:** use a build mesh for production environments ([cd2f318](https://github.com/ho-nl/m2-pwa/commit/cd2f3189383fa9d304bd367334e3f47ca4aa6100))
- unable to find cache matching inmemoryLru ([520f6f3](https://github.com/ho-nl/m2-pwa/commit/520f6f329573471ecfdbdc4aa6f2e4b688b31f11))

### Features

- **graphql-mesh:** remove the api project and use a single project 🎉👩‍👩‍👦‍👦 ([ea4ad03](https://github.com/ho-nl/m2-pwa/commit/ea4ad0397d4ff289ef3b3253593fb0914c8c5246))

# [3.1.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql-mesh@3.0.11...@graphcommerce/graphql-mesh@3.1.0) (2021-10-20)

### Features

- **graphql-mesh:** simplified the handler to use less code in the project ([f62b752](https://github.com/ho-nl/m2-pwa/commit/f62b75249492f40c5972deede529a25a17c8a617))

## [3.0.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql-mesh@3.0.10...@graphcommerce/graphql-mesh@3.0.11) (2021-10-20)

### Bug Fixes

- **recaptcha:** allow and forward the the X-ReCaptcha to Magento ([2f3170e](https://github.com/ho-nl/m2-pwa/commit/2f3170e0f1652d84948b69a446634ffe02f08f80))

## [3.0.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql-mesh@3.0.8...@graphcommerce/graphql-mesh@3.0.9) (2021-10-18)

### Bug Fixes

- add cache-inmemory-lru ([2cd23a4](https://github.com/ho-nl/m2-pwa/commit/2cd23a40c8a2b02175b160aa9ce0b695c88c12f7))
- graphql-mesh missing inmemory lru ([6c71c25](https://github.com/ho-nl/m2-pwa/commit/6c71c256911072ace19037616e0ce2ab478bf070))

## [3.0.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql-mesh@3.0.0...@graphcommerce/graphql-mesh@3.0.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/graphql-mesh

# 3.0.0 (2021-09-27)

### Bug Fixes

- apollo server ([43c3535](https://github.com/ho-nl/m2-pwa/commit/43c3535fe26ab9c7b97be8feacba34794bb3fa20))
- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
- products couldn’t be added to the cart ([79512a4](https://github.com/ho-nl/m2-pwa/commit/79512a440b02565808ac4becce9537a59ad4b463))
- remove conflicting files ([0c17ae4](https://github.com/ho-nl/m2-pwa/commit/0c17ae46be62b775ac83b35f11c532ce2d9401a3))
- yarn workspace packages hot reload ([d03fc9f](https://github.com/ho-nl/m2-pwa/commit/d03fc9fdda3486476761786f2b56a934cc92befc))

### Features

- created stacked-pages package ([d86008e](https://github.com/ho-nl/m2-pwa/commit/d86008ee659ccb25b194a41d624b394a1ddbd088))
- **framer-next-pages:** implemented the FullPageShell for the remaining pages ([88386b4](https://github.com/ho-nl/m2-pwa/commit/88386b4652abb7765d6e755c7fb7a3cb6285a0e7))
- **GraphQL:** shareEnabled: true added to ApolloServer ([379df3c](https://github.com/ho-nl/m2-pwa/commit/379df3c363116a2434115497f9936dca868c58d4))
- i18n routing added (/ and /fr for demo) ([bb3b339](https://github.com/ho-nl/m2-pwa/commit/bb3b339fbc9fceddd264a891ad81f00327a241ae))
- **image:** introduced completely rewritten Image component ([e3413b3](https://github.com/ho-nl/m2-pwa/commit/e3413b3a57392d6571ea64cb8d9c8dca05ea31df))
- major performance refactor ([03f8e2f](https://github.com/ho-nl/m2-pwa/commit/03f8e2fa16ef919bd6bd6eadd36922d0245ed960))
- **mesh:** use mesh with build version with increased stability/performance ([63863f3](https://github.com/ho-nl/m2-pwa/commit/63863f3a2df4d596819b85f3cf736c7f52f828c1))
- next.js 11 ([7d61407](https://github.com/ho-nl/m2-pwa/commit/7d614075a778f488045034f74be4f75b93f63c43))
- **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of [@reachdigital](https://github.com/reachdigital) ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
- upgrade to node 14 ([d079a75](https://github.com/ho-nl/m2-pwa/commit/d079a751e9bfd8dc7f5009d2c9f31c336a0c96ab))

## 2.0.7 (2020-10-28)

### Bug Fixes

- another shot at preflight request ([11de0a3](https://github.com/ho-nl/m2-pwa/commit/11de0a36b45230818f8df4b52a4d5aeb35bf4029))

## 2.0.5 (2020-10-28)

### Bug Fixes

- add OPTIONS header ([b35b009](https://github.com/ho-nl/m2-pwa/commit/b35b0097be1f9c9b5f8cf8b359c1a0e73ba078aa))

## 2.0.4 (2020-10-28)

### Bug Fixes

- cross origin headers again ([1746cbc](https://github.com/ho-nl/m2-pwa/commit/1746cbce4cee848420927c2df52c31687b96e5c5))

### Features

- added separate api package ([65cdd49](https://github.com/ho-nl/m2-pwa/commit/65cdd493f74bb172c3434dd4fb63184601678e1d))
- split into packages ([2ee7fd6](https://github.com/ho-nl/m2-pwa/commit/2ee7fd6c0056f467d114f04d92c6c0ddf622d151))

### BREAKING CHANGES

- huge folder structure refactor, please read README to reinstall

# Change Log

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql-mesh@2.101.2...@graphcommerce/graphql-mesh@2.102.0) (2021-08-13)

### Features

- **mesh:** use mesh with build version with increased stability/performance ([63863f3](https://github.com/ho-nl/m2-pwa/commit/63863f3a2df4d596819b85f3cf736c7f52f828c1))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql-mesh@2.100.11...@graphcommerce/graphql-mesh@2.101.0) (2021-07-26)

### Features

- **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))

## [2.100.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql-mesh@2.100.10...@graphcommerce/graphql-mesh@2.100.11) (2021-07-20)

### Bug Fixes

- apollo server ([43c3535](https://github.com/ho-nl/m2-pwa/commit/43c3535fe26ab9c7b97be8feacba34794bb3fa20))
- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
