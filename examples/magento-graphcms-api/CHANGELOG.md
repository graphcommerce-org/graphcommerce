# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.107.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms-api@2.106.2...@graphcommerce/magento-graphcms-api@2.107.0) (2021-10-20)


### Features

* **graphql-mesh:** simplified the handler to use less code in the project ([f62b752](https://github.com/ho-nl/m2-pwa/commit/f62b75249492f40c5972deede529a25a17c8a617))





# [2.106.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms-api@2.105.11...@graphcommerce/magento-graphcms-api@2.106.0) (2021-10-19)


### Bug Fixes

* **mesh:** make sure we're using an inmemory store when running the mesh ([1064c17](https://github.com/ho-nl/m2-pwa/commit/1064c17122ba4a6b0a140f805968122ef4913fc0))


### Features

* **mesh:** move to a default .meshrc.yml format instead of the json file ([d9a30a7](https://github.com/ho-nl/m2-pwa/commit/d9a30a78baed2b85b77bbd80e94a6f047e2255b6))





## [2.105.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms-api@2.105.8...@graphcommerce/magento-graphcms-api@2.105.9) (2021-10-18)


### Bug Fixes

* graphql-mesh missing inmemory lru ([6c71c25](https://github.com/ho-nl/m2-pwa/commit/6c71c256911072ace19037616e0ce2ab478bf070))





## [2.105.8](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms-api@2.105.7...@graphcommerce/magento-graphcms-api@2.105.8) (2021-10-13)


### Bug Fixes

* remove the build version of the mesh as it currently isn't working properly ([f6a6931](https://github.com/ho-nl/m2-pwa/commit/f6a69316420ac3aee72b08a31ceeafc4eed765bd))





## [2.105.6](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms-api@2.105.5...@graphcommerce/magento-graphcms-api@2.105.6) (2021-10-07)


### Bug Fixes

* api build ([423564e](https://github.com/ho-nl/m2-pwa/commit/423564e23769298c98305edb89b8486265beb50b))





# [2.105.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms-api@2.104.4...@graphcommerce/magento-graphcms-api@2.105.0) (2021-09-28)


### Features

* created withYarn1Scopes functionality so we don't rely on actual workspaces ([7e491ca](https://github.com/ho-nl/m2-pwa/commit/7e491ca2276028a8587f6cd88b98ee451755c3d0))





## [2.104.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms-api@2.104.0...@graphcommerce/magento-graphcms-api@2.104.3) (2021-09-27)


### Bug Fixes

* add warnings to next.config.js when .env variables are missing ([d9dffec](https://github.com/ho-nl/m2-pwa/commit/d9dffec8ebc9cb1c70ca5591cad5e42c9bbe30e6))





## [2.104.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms-api@2.104.0...@graphcommerce/magento-graphcms-api@2.104.2) (2021-09-27)


### Bug Fixes

* add warnings to next.config.js when .env variables are missing ([d9dffec](https://github.com/ho-nl/m2-pwa/commit/d9dffec8ebc9cb1c70ca5591cad5e42c9bbe30e6))





## [2.104.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms-api@2.104.0...@graphcommerce/magento-graphcms-api@2.104.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/magento-graphcms-api





# 2.104.0 (2021-09-27)


### Features

* rename soxbase to magento-graphcms ([e363435](https://github.com/ho-nl/m2-pwa/commit/e3634350bffec27221f9b3d016789b2e5eda298d))





# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.103.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms-api@2.102.0...@graphcommerce/magento-graphcms-api@2.103.0) (2021-08-13)

### Bug Fixes

- **mesh:** add postinstall step to make sure the mesh is build at least once
  ([ff46ca8](https://github.com/ho-nl/m2-pwa/commit/ff46ca8ef481c4104823312013eb3810477bcace))
- **mesh:** compilation errors while esmExternals is used, disable for now
  ([8a98b34](https://github.com/ho-nl/m2-pwa/commit/8a98b34b3fa10aaa896455c292ccc429f7f9e752))

### Features

- **mesh:** use mesh with build version with increased stability/performance
  ([63863f3](https://github.com/ho-nl/m2-pwa/commit/63863f3a2df4d596819b85f3cf736c7f52f828c1))

# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms-api@2.101.2...@graphcommerce/magento-graphcms-api@2.102.0) (2021-08-12)

### Features

- enable esmExternals
  ([c412e09](https://github.com/ho-nl/m2-pwa/commit/c412e09e74cd72f7745da9d62f6e8066c46a6336))
- upgraded to nextjs 11
  ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms-api@2.100.13...@graphcommerce/magento-graphcms-api@2.101.0) (2021-07-26)

### Features

- **playwright:** added new playwright package to enable browser testing
  ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))

## [2.100.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms-api@2.100.10...@graphcommerce/magento-graphcms-api@2.100.11) (2021-07-20)

### Bug Fixes

- ignore md files from triggering version updates
  ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
