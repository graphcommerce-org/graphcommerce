# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.105.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.104.7...@graphcommerce/next-config@2.105.0) (2021-10-19)


### Bug Fixes

* **next-config:** move the @apollo/client __DEV__ env to next-config ([fb1df3f](https://github.com/ho-nl/m2-pwa/commit/fb1df3fe4edbf769afb4149c7beced70bb948be5))


### Features

* **mesh:** move to a default .meshrc.yml format instead of the json file ([d9a30a7](https://github.com/ho-nl/m2-pwa/commit/d9a30a78baed2b85b77bbd80e94a6f047e2255b6))





## [2.104.4](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.104.3...@graphcommerce/next-config@2.104.4) (2021-10-07)


### Bug Fixes

* replace __DEV__ with proper variable for optimizing the bundle size ([9b03209](https://github.com/ho-nl/m2-pwa/commit/9b032095f618846d132c00b8dc14fbb1b09c6ed8))





## [2.104.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.104.2...@graphcommerce/next-config@2.104.3) (2021-09-30)


### Bug Fixes

* .next folder doesn't always exist on vercel ([5f8f1a7](https://github.com/ho-nl/m2-pwa/commit/5f8f1a7c2c6690be113adfe2fef662c63781e91f))





## [2.104.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.104.1...@graphcommerce/next-config@2.104.2) (2021-09-29)


### Bug Fixes

* cache dependencylist ([257da86](https://github.com/ho-nl/m2-pwa/commit/257da860c22a7134896e99e2fcf9f67c0ce99363))





## [2.104.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.104.0...@graphcommerce/next-config@2.104.1) (2021-09-28)


### Bug Fixes

* do not build on install ([254e2a6](https://github.com/ho-nl/m2-pwa/commit/254e2a6f4b2a7e81f46466a0abe06ae2f3a79575))





# [2.104.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.103.0...@graphcommerce/next-config@2.104.0) (2021-09-28)


### Features

* created withYarn1Scopes functionality so we don't rely on actual workspaces ([7e491ca](https://github.com/ho-nl/m2-pwa/commit/7e491ca2276028a8587f6cd88b98ee451755c3d0))





# [2.103.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.102.3...@graphcommerce/next-config@2.103.0) (2021-09-28)


### Bug Fixes

* withYarn1Workspaces is not a function ([a095bc9](https://github.com/ho-nl/m2-pwa/commit/a095bc9f0011fbe9180d0e1718f1b41e89a5f6d9))


### Features

* add postinstall commands to run properly on deploy ([d512ee3](https://github.com/ho-nl/m2-pwa/commit/d512ee3ba5c3a9573651ec5333595fe2f1aa141c))





## [2.102.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.102.2...@graphcommerce/next-config@2.102.3) (2021-09-27)


### Bug Fixes

* build packages before releasing ([c4761cf](https://github.com/ho-nl/m2-pwa/commit/c4761cf6d1810c140fd56f6eac8fca922f8c0edc))





## [2.102.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.102.0...@graphcommerce/next-config@2.102.2) (2021-09-27)


### Bug Fixes

* add warnings to next.config.js when .env variables are missing ([d9dffec](https://github.com/ho-nl/m2-pwa/commit/d9dffec8ebc9cb1c70ca5591cad5e42c9bbe30e6))





## [2.102.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.102.0...@graphcommerce/next-config@2.102.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/next-config





# 2.102.0 (2021-09-27)


### Bug Fixes

* ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
* **next-config:** another shot at fixing next-config ([a4afe11](https://github.com/ho-nl/m2-pwa/commit/a4afe112aa1308c10bb407d5e3eebf1f239d789c))
* **next-config:** automatically resolve the workspace dependencies ([4d739ec](https://github.com/ho-nl/m2-pwa/commit/4d739ec969591f96392f99e476016c6ad1d092cb))
* playwright can't find the place order button ([b1fda5b](https://github.com/ho-nl/m2-pwa/commit/b1fda5b3e403dad621aba8ed895427f2166bc985))


### Features

* **framer-sheet:** created separate package that can be implemented ([69cc8ce](https://github.com/ho-nl/m2-pwa/commit/69cc8ce3237125335524728a70f4dae050032108))
* **next-config:** introduced package to streamline the setup of new examples ([b8a3958](https://github.com/ho-nl/m2-pwa/commit/b8a39584e5b529fcaa22db67d3f986b91ae683ad))
* next.js 11 ([7d61407](https://github.com/ho-nl/m2-pwa/commit/7d614075a778f488045034f74be4f75b93f63c43))
* renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of [@reachdigital](https://github.com/reachdigital) ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
* upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))





## [2.101.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.101.0...@graphcommerce/next-config@2.101.1) (2021-09-01)


### Bug Fixes

* playwright can't find the place order button ([b1fda5b](https://github.com/ho-nl/m2-pwa/commit/b1fda5b3e403dad621aba8ed895427f2166bc985))





# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.100.10...@graphcommerce/next-config@2.101.0) (2021-08-12)


### Features

* upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))





## [2.100.10](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.100.9...@graphcommerce/next-config@2.100.10) (2021-08-09)


### Bug Fixes

* ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
