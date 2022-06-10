# Change Log

## 3.1.5

### Patch Changes

- [#1490](https://github.com/graphcommerce-org/graphcommerce/pull/1490) [`d311ef48b`](https://github.com/graphcommerce-org/graphcommerce/commit/d311ef48bb3e97806d992af5516d6b7f183ec9cb) Thanks [@paales](https://github.com/paales)! - upgraded packages

## 3.1.4

### Patch Changes

- [#1426](https://github.com/graphcommerce-org/graphcommerce/pull/1426) [`100f4c38c`](https://github.com/graphcommerce-org/graphcommerce/commit/100f4c38c8fcda4bc6e0425e38028b550b60adc2) Thanks [@paales](https://github.com/paales)! - Upgrade packages

## 3.1.3

### Patch Changes

- [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542) Thanks [@paales](https://github.com/paales)! - Now using [@graphql-yoga](https://github.com/dotansimha/graphql-yoga) for GraphQL which has full support for [envelop](https://www.envelop.dev/) plugins.

* [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542) Thanks [@paales](https://github.com/paales)! - Added a new @graphcommerce/cli package to generate the mesh so it can be generated _inside_ the @graphcommerce/graphql-mesh package to allow for better future extensibility.

- [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`da0ae7d02`](https://github.com/graphcommerce-org/graphcommerce/commit/da0ae7d0236e4908ba0bf0fa16656be516e841d4) Thanks [@paales](https://github.com/paales)! - Updated dependencies

## 3.1.2

### Patch Changes

- [#1378](https://github.com/graphcommerce-org/graphcommerce/pull/1378) [`b610a6e40`](https://github.com/graphcommerce-org/graphcommerce/commit/b610a6e4049e8c9e8b5d2aeff31b8e1bfc24abe5) Thanks [@paales](https://github.com/paales)! - Pin all versions internally so we can’t end up in an unfixable state for the user

## 3.1.1

### Patch Changes

- [#1369](https://github.com/graphcommerce-org/graphcommerce/pull/1369) [`ae6449502`](https://github.com/graphcommerce-org/graphcommerce/commit/ae64495024a455bbe5188588604368c1542840c9) Thanks [@paales](https://github.com/paales)! - Upgraded dependencies

## 3.1.0

### Minor Changes

- [#1341](https://github.com/graphcommerce-org/graphcommerce/pull/1341) [`47a03c6c7`](https://github.com/graphcommerce-org/graphcommerce/commit/47a03c6c764cb1f544d3de3af52456608694a9d7) Thanks [@paales](https://github.com/paales)! - Files in node_modules/@graphcommerce will now also be watched and won’t be cached

### Patch Changes

- [#1341](https://github.com/graphcommerce-org/graphcommerce/pull/1341) [`2e29c5852`](https://github.com/graphcommerce-org/graphcommerce/commit/2e29c585247d356e3027be92beb7815f2070c855) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

## 3.0.4

### Patch Changes

- [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655) Thanks [@paales](https://github.com/paales)! - All default exports are now named exports internally and all `index.tsx` are renamed to the component name.

* [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

## 3.0.3

### Patch Changes

- [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96) Thanks [@paales](https://github.com/paales)! - made packages public

* [#1278](https://github.com/ho-nl/m2-pwa/pull/1278) [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Upgraded dependencies to the latest version

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

# [2.109.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.108.0...@graphcommerce/next-config@2.109.0) (2021-11-12)

### Features

- added tons of translations ([9bb0ac7](https://github.com/ho-nl/m2-pwa/commit/9bb0ac709b58df6ea6141e92e4923a5ca9ae2963))

# [2.108.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.107.3...@graphcommerce/next-config@2.108.0) (2021-11-09)

### Features

- **next-config:** support for .po files to be imported ([79b64ce](https://github.com/ho-nl/m2-pwa/commit/79b64ce9b444fcf620279d9a8e5d253b8e9cfa84))

# [2.107.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.106.1...@graphcommerce/next-config@2.107.0) (2021-10-27)

### Features

- **nextjs:** upgraded to nextjs 12 ([9331bc8](https://github.com/ho-nl/m2-pwa/commit/9331bc801f6419522115cc47d291d49d608d5a90))

# [2.106.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.105.1...@graphcommerce/next-config@2.106.0) (2021-10-20)

### Features

- **next-config:** support topLevelAwait ([3cb4f90](https://github.com/ho-nl/m2-pwa/commit/3cb4f90ac3af797f5fcba888dfd28aa2b76480b8))

## [2.105.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.105.0...@graphcommerce/next-config@2.105.1) (2021-10-19)

### Bug Fixes

- **next-config:** make sure webpack is available ([46edb3e](https://github.com/ho-nl/m2-pwa/commit/46edb3e6fd1b716d7d9dbe59cb1530375d24c228))

# [2.105.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.104.7...@graphcommerce/next-config@2.105.0) (2021-10-19)

### Bug Fixes

- **next-config:** move the @apollo/client **DEV** env to next-config ([fb1df3f](https://github.com/ho-nl/m2-pwa/commit/fb1df3fe4edbf769afb4149c7beced70bb948be5))

### Features

- **mesh:** move to a default .meshrc.yml format instead of the json file ([d9a30a7](https://github.com/ho-nl/m2-pwa/commit/d9a30a78baed2b85b77bbd80e94a6f047e2255b6))

## [2.104.4](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.104.3...@graphcommerce/next-config@2.104.4) (2021-10-07)

### Bug Fixes

- replace **DEV** with proper variable for optimizing the bundle size ([9b03209](https://github.com/ho-nl/m2-pwa/commit/9b032095f618846d132c00b8dc14fbb1b09c6ed8))

## [2.104.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.104.2...@graphcommerce/next-config@2.104.3) (2021-09-30)

### Bug Fixes

- .next folder doesn't always exist on vercel ([5f8f1a7](https://github.com/ho-nl/m2-pwa/commit/5f8f1a7c2c6690be113adfe2fef662c63781e91f))

## [2.104.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.104.1...@graphcommerce/next-config@2.104.2) (2021-09-29)

### Bug Fixes

- cache dependencylist ([257da86](https://github.com/ho-nl/m2-pwa/commit/257da860c22a7134896e99e2fcf9f67c0ce99363))

## [2.104.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.104.0...@graphcommerce/next-config@2.104.1) (2021-09-28)

### Bug Fixes

- do not build on install ([254e2a6](https://github.com/ho-nl/m2-pwa/commit/254e2a6f4b2a7e81f46466a0abe06ae2f3a79575))

# [2.104.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.103.0...@graphcommerce/next-config@2.104.0) (2021-09-28)

### Features

- created withYarn1Scopes functionality so we don't rely on actual workspaces ([7e491ca](https://github.com/ho-nl/m2-pwa/commit/7e491ca2276028a8587f6cd88b98ee451755c3d0))

# [2.103.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.102.3...@graphcommerce/next-config@2.103.0) (2021-09-28)

### Bug Fixes

- withYarn1Workspaces is not a function ([a095bc9](https://github.com/ho-nl/m2-pwa/commit/a095bc9f0011fbe9180d0e1718f1b41e89a5f6d9))

### Features

- add postinstall commands to run properly on deploy ([d512ee3](https://github.com/ho-nl/m2-pwa/commit/d512ee3ba5c3a9573651ec5333595fe2f1aa141c))

## [2.102.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.102.2...@graphcommerce/next-config@2.102.3) (2021-09-27)

### Bug Fixes

- build packages before releasing ([c4761cf](https://github.com/ho-nl/m2-pwa/commit/c4761cf6d1810c140fd56f6eac8fca922f8c0edc))

## [2.102.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.102.0...@graphcommerce/next-config@2.102.2) (2021-09-27)

### Bug Fixes

- add warnings to next.config.js when .env variables are missing ([d9dffec](https://github.com/ho-nl/m2-pwa/commit/d9dffec8ebc9cb1c70ca5591cad5e42c9bbe30e6))

## [2.102.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.102.0...@graphcommerce/next-config@2.102.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/next-config

# 2.102.0 (2021-09-27)

### Bug Fixes

- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
- **next-config:** another shot at fixing next-config ([a4afe11](https://github.com/ho-nl/m2-pwa/commit/a4afe112aa1308c10bb407d5e3eebf1f239d789c))
- **next-config:** automatically resolve the workspace dependencies ([4d739ec](https://github.com/ho-nl/m2-pwa/commit/4d739ec969591f96392f99e476016c6ad1d092cb))
- playwright can't find the place order button ([b1fda5b](https://github.com/ho-nl/m2-pwa/commit/b1fda5b3e403dad621aba8ed895427f2166bc985))

### Features

- **framer-sheet:** created separate package that can be implemented ([69cc8ce](https://github.com/ho-nl/m2-pwa/commit/69cc8ce3237125335524728a70f4dae050032108))
- **next-config:** introduced package to streamline the setup of new examples ([b8a3958](https://github.com/ho-nl/m2-pwa/commit/b8a39584e5b529fcaa22db67d3f986b91ae683ad))
- next.js 11 ([7d61407](https://github.com/ho-nl/m2-pwa/commit/7d614075a778f488045034f74be4f75b93f63c43))
- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of [@reachdigital](https://github.com/reachdigital) ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.101.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.101.0...@graphcommerce/next-config@2.101.1) (2021-09-01)

### Bug Fixes

- playwright can't find the place order button ([b1fda5b](https://github.com/ho-nl/m2-pwa/commit/b1fda5b3e403dad621aba8ed895427f2166bc985))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.100.10...@graphcommerce/next-config@2.101.0) (2021-08-12)

### Features

- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.100.10](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.100.9...@graphcommerce/next-config@2.100.10) (2021-08-09)

### Bug Fixes

- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
