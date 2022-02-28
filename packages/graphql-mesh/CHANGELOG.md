# Change Log

## 4.0.4

### Patch Changes

- [#1285](https://github.com/ho-nl/m2-pwa/pull/1285)
  [`c85294ba6`](https://github.com/ho-nl/m2-pwa/commit/c85294ba6d742ce78c074559a1e95409b25a5017)
  Thanks [@paales](https://github.com/paales)! - upgraded dependencies

* [#1285](https://github.com/ho-nl/m2-pwa/pull/1285)
  [`d9cd4acca`](https://github.com/ho-nl/m2-pwa/commit/d9cd4acca218018dd6e20f033875ef93919fb462)
  Thanks [@paales](https://github.com/paales)! - fix: issue with graphql server creation

## 4.0.3

### Patch Changes

- [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96)
  Thanks [@paales](https://github.com/paales)! - made packages public

* [#1278](https://github.com/ho-nl/m2-pwa/pull/1278)
  [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20)
  Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Upgraded dependencies to the latest version

## 4.0.2

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

## 4.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514)
  Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files,
  so that the packages link to back to the website and repository

## 4.0.0

### Major Changes

- [#1258](https://github.com/ho-nl/m2-pwa/pull/1258)
  [`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05)
  Thanks [@paales](https://github.com/paales)! - Upgraded to Material UI 5

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.2.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql-mesh@3.1.0...@graphcommerce/graphql-mesh@3.2.0) (2021-10-21)

### Bug Fixes

- **graphql-mesh:** use a build mesh for production environments
  ([cd2f318](https://github.com/ho-nl/m2-pwa/commit/cd2f3189383fa9d304bd367334e3f47ca4aa6100))
- unable to find cache matching inmemoryLru
  ([520f6f3](https://github.com/ho-nl/m2-pwa/commit/520f6f329573471ecfdbdc4aa6f2e4b688b31f11))

### Features

- **graphql-mesh:** remove the api project and use a single project 🎉👩‍👩‍👦‍👦
  ([ea4ad03](https://github.com/ho-nl/m2-pwa/commit/ea4ad0397d4ff289ef3b3253593fb0914c8c5246))

# [3.1.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql-mesh@3.0.11...@graphcommerce/graphql-mesh@3.1.0) (2021-10-20)

### Features

- **graphql-mesh:** simplified the handler to use less code in the project
  ([f62b752](https://github.com/ho-nl/m2-pwa/commit/f62b75249492f40c5972deede529a25a17c8a617))

## [3.0.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql-mesh@3.0.10...@graphcommerce/graphql-mesh@3.0.11) (2021-10-20)

### Bug Fixes

- **recaptcha:** allow and forward the the X-ReCaptcha to Magento
  ([2f3170e](https://github.com/ho-nl/m2-pwa/commit/2f3170e0f1652d84948b69a446634ffe02f08f80))

## [3.0.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql-mesh@3.0.8...@graphcommerce/graphql-mesh@3.0.9) (2021-10-18)

### Bug Fixes

- add cache-inmemory-lru
  ([2cd23a4](https://github.com/ho-nl/m2-pwa/commit/2cd23a40c8a2b02175b160aa9ce0b695c88c12f7))
- graphql-mesh missing inmemory lru
  ([6c71c25](https://github.com/ho-nl/m2-pwa/commit/6c71c256911072ace19037616e0ce2ab478bf070))

## [3.0.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql-mesh@3.0.0...@graphcommerce/graphql-mesh@3.0.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/graphql-mesh

# 3.0.0 (2021-09-27)

### Bug Fixes

- apollo server
  ([43c3535](https://github.com/ho-nl/m2-pwa/commit/43c3535fe26ab9c7b97be8feacba34794bb3fa20))
- ignore md files from triggering version updates
  ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
- products couldn’t be added to the cart
  ([79512a4](https://github.com/ho-nl/m2-pwa/commit/79512a440b02565808ac4becce9537a59ad4b463))
- remove conflicting files
  ([0c17ae4](https://github.com/ho-nl/m2-pwa/commit/0c17ae46be62b775ac83b35f11c532ce2d9401a3))
- yarn workspace packages hot reload
  ([d03fc9f](https://github.com/ho-nl/m2-pwa/commit/d03fc9fdda3486476761786f2b56a934cc92befc))

### Features

- created stacked-pages package
  ([d86008e](https://github.com/ho-nl/m2-pwa/commit/d86008ee659ccb25b194a41d624b394a1ddbd088))
- **framer-next-pages:** implemented the FullPageShell for the remaining pages
  ([88386b4](https://github.com/ho-nl/m2-pwa/commit/88386b4652abb7765d6e755c7fb7a3cb6285a0e7))
- **GraphQL:** shareEnabled: true added to ApolloServer
  ([379df3c](https://github.com/ho-nl/m2-pwa/commit/379df3c363116a2434115497f9936dca868c58d4))
- i18n routing added (/ and /fr for demo)
  ([bb3b339](https://github.com/ho-nl/m2-pwa/commit/bb3b339fbc9fceddd264a891ad81f00327a241ae))
- **image:** introduced completely rewritten Image component
  ([e3413b3](https://github.com/ho-nl/m2-pwa/commit/e3413b3a57392d6571ea64cb8d9c8dca05ea31df))
- major performance refactor
  ([03f8e2f](https://github.com/ho-nl/m2-pwa/commit/03f8e2fa16ef919bd6bd6eadd36922d0245ed960))
- **mesh:** use mesh with build version with increased stability/performance
  ([63863f3](https://github.com/ho-nl/m2-pwa/commit/63863f3a2df4d596819b85f3cf736c7f52f828c1))
- next.js 11
  ([7d61407](https://github.com/ho-nl/m2-pwa/commit/7d614075a778f488045034f74be4f75b93f63c43))
- **playwright:** added new playwright package to enable browser testing
  ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of
  [@reachdigital](https://github.com/reachdigital)
  ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
- upgrade to node 14
  ([d079a75](https://github.com/ho-nl/m2-pwa/commit/d079a751e9bfd8dc7f5009d2c9f31c336a0c96ab))

## 2.0.8 (2020-10-28)

## 2.0.7 (2020-10-28)

### Bug Fixes

- another shot at preflight request
  ([11de0a3](https://github.com/ho-nl/m2-pwa/commit/11de0a36b45230818f8df4b52a4d5aeb35bf4029))

## 2.0.5 (2020-10-28)

### Bug Fixes

- add OPTIONS header
  ([b35b009](https://github.com/ho-nl/m2-pwa/commit/b35b0097be1f9c9b5f8cf8b359c1a0e73ba078aa))

## 2.0.4 (2020-10-28)

### Bug Fixes

- cross origin headers again
  ([1746cbc](https://github.com/ho-nl/m2-pwa/commit/1746cbce4cee848420927c2df52c31687b96e5c5))

### Features

- added separate api package
  ([65cdd49](https://github.com/ho-nl/m2-pwa/commit/65cdd493f74bb172c3434dd4fb63184601678e1d))
- split into packages
  ([2ee7fd6](https://github.com/ho-nl/m2-pwa/commit/2ee7fd6c0056f467d114f04d92c6c0ddf622d151))

### BREAKING CHANGES

- huge folder structure refactor, please read README to reinstall

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql-mesh@2.101.2...@graphcommerce/graphql-mesh@2.102.0) (2021-08-13)

### Features

- **mesh:** use mesh with build version with increased stability/performance
  ([63863f3](https://github.com/ho-nl/m2-pwa/commit/63863f3a2df4d596819b85f3cf736c7f52f828c1))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql-mesh@2.100.11...@graphcommerce/graphql-mesh@2.101.0) (2021-07-26)

### Features

- **playwright:** added new playwright package to enable browser testing
  ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))

## [2.100.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql-mesh@2.100.10...@graphcommerce/graphql-mesh@2.100.11) (2021-07-20)

### Bug Fixes

- apollo server
  ([43c3535](https://github.com/ho-nl/m2-pwa/commit/43c3535fe26ab9c7b97be8feacba34794bb3fa20))
- ignore md files from triggering version updates
  ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
