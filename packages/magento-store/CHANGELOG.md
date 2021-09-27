# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-store@3.0.0...@graphcommerce/magento-store@3.0.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/magento-store





# 3.0.0 (2021-09-27)


### Bug Fixes

* canonical urls ([9ff8d3f](https://github.com/ho-nl/m2-pwa/commit/9ff8d3f950098fb28440f31f5dd93a835dce0bda))
* change href's from faq to service ([cb9875b](https://github.com/ho-nl/m2-pwa/commit/cb9875bce43db5953f227ee60f8d5dfe339f50b5))
* code consistency ([a310f0e](https://github.com/ho-nl/m2-pwa/commit/a310f0e548907c044b016b9473641ecd378b313f))
* **country-switcher:** navigate back to correct locale ([579d146](https://github.com/ho-nl/m2-pwa/commit/579d146e1b658a343b1514d8e8a45c01a507c084))
* duplicated (meta) tags in document head ([d52e962](https://github.com/ho-nl/m2-pwa/commit/d52e9629036ccab1f266ddd01600a0bd45930149))
* footer country flag ([8c6bf20](https://github.com/ho-nl/m2-pwa/commit/8c6bf206f85d44289a8d11d9bcd2178af6cc3445))
* get more data from store locale ([455245c](https://github.com/ho-nl/m2-pwa/commit/455245cf88d4a0cfbe197c97739306af8d8ff211))
* ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
* implement next-ui barrel imports ([75bea70](https://github.com/ho-nl/m2-pwa/commit/75bea703dba898f18a2a1dfa3243ebd0a4e6f0e1))
* lint error ([be542af](https://github.com/ho-nl/m2-pwa/commit/be542afc466209c79cb776aac494abb7cab24bf7))
* **magento-store:** move useCountry/useRegion to magento-store and rename to useFindCountry/useFindRegion ([3fed1c5](https://github.com/ho-nl/m2-pwa/commit/3fed1c53f975977e2681a9b80bb283332d9ad5ec))
* make storeswitcher a button ([a7dc452](https://github.com/ho-nl/m2-pwa/commit/a7dc45297e565be9c5d72c03e3d8c4a61c415c8a))
* prices wouldn’t render if the price wasn’t an integer ([0866881](https://github.com/ho-nl/m2-pwa/commit/08668813699065b168e3d9b1fe2410c5cd073c89))
* prop types ([caccb1a](https://github.com/ho-nl/m2-pwa/commit/caccb1ab4c459642b64498dde22c372fd890f0c7))
* remove button from store-switcher in footer ([43f6d52](https://github.com/ho-nl/m2-pwa/commit/43f6d5227edff809effa46b658afc0d3c4268f3f))
* remove canonical metatag when no canonical is given ([167b7f0](https://github.com/ho-nl/m2-pwa/commit/167b7f080f98a10ff35cbd760b24b8198aac6518))
* search not submitting after empying the field ([a15b5cf](https://github.com/ho-nl/m2-pwa/commit/a15b5cf94f4619e0087c8871a98617ab160f671a))
* secure base link url in store config ([ecba5c2](https://github.com/ho-nl/m2-pwa/commit/ecba5c2b2c109b027916872ca860c566b031d8a4))
* since all links are of next/link we need to add passHref for custom components ([16fb931](https://github.com/ho-nl/m2-pwa/commit/16fb93100d367203ea79bb4f93357221253f2ecd))
* yarn workspace packages hot reload ([d03fc9f](https://github.com/ho-nl/m2-pwa/commit/d03fc9fdda3486476761786f2b56a934cc92befc))


### Features

* add getFilterTypes to shared client, faster generation ([beccfde](https://github.com/ho-nl/m2-pwa/commit/beccfde6ebc8aaf6223f0e8b33fabf4f5039efed))
* added footer buttons ([65610cc](https://github.com/ho-nl/m2-pwa/commit/65610cc1db2929b9203a3b7b25375a8324bc8ce9))
* added store switcher route ([64b04b3](https://github.com/ho-nl/m2-pwa/commit/64b04b3c1488c93395b228ac04c9d3c3912391a2))
* better 404 handling and simplified getStaticProps ([321ace1](https://github.com/ho-nl/m2-pwa/commit/321ace1850642ee3eddfa674c37e6fca8adcdb74))
* canonical urls using abstract page meta component ([5f09b6f](https://github.com/ho-nl/m2-pwa/commit/5f09b6f89f4c39f5465869b86468c384de73faba))
* created stacked-pages package ([d86008e](https://github.com/ho-nl/m2-pwa/commit/d86008ee659ccb25b194a41d624b394a1ddbd088))
* **graphql:** introduced new graphql package that holds all generated files ([a3e7aa0](https://github.com/ho-nl/m2-pwa/commit/a3e7aa05540540533b5ced9a95f1f802ecbe499f))
* i18n routing added (/ and /fr for demo) ([bb3b339](https://github.com/ho-nl/m2-pwa/commit/bb3b339fbc9fceddd264a891ad81f00327a241ae))
* **image:** introduced completely rewritten Image component ([e3413b3](https://github.com/ho-nl/m2-pwa/commit/e3413b3a57392d6571ea64cb8d9c8dca05ea31df))
* introduces framer-next-pages and framer-sheet to next-ui and soxbase package ([e04ad8a](https://github.com/ho-nl/m2-pwa/commit/e04ad8a94cd1fd5a7c5575c9db7916b6e8a88f16))
* major performance refactor ([03f8e2f](https://github.com/ho-nl/m2-pwa/commit/03f8e2fa16ef919bd6bd6eadd36922d0245ed960))
* move to category_uid instead of category_id ([a2efe8d](https://github.com/ho-nl/m2-pwa/commit/a2efe8daac6ebe949070108fc4bcf8cc0919c1c7))
* next.js 11 ([7d61407](https://github.com/ho-nl/m2-pwa/commit/7d614075a778f488045034f74be4f75b93f63c43))
* **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
* renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of [@reachdigital](https://github.com/reachdigital) ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
* support reviews store config variables ([532e849](https://github.com/ho-nl/m2-pwa/commit/532e84926c97affcd21ade56773bc06a02060b3a))
* upgrade to node 14 ([d079a75](https://github.com/ho-nl/m2-pwa/commit/d079a751e9bfd8dc7f5009d2c9f31c336a0c96ab))
* upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))
* useFormMutationCart and simpler imports ([012f090](https://github.com/ho-nl/m2-pwa/commit/012f090e8f54d09f35d393c61ad1e2319f5a90ff))


### Reverts

* Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))



## 2.0.8 (2020-10-28)


### Bug Fixes

* make sure themes extensions are found ([5aa18db](https://github.com/ho-nl/m2-pwa/commit/5aa18db514fd2e2f50681367e39523f8e742ece0))


### Features

* added generated graphql.ts files ([3e44415](https://github.com/ho-nl/m2-pwa/commit/3e44415b018e74b502e9e98479aa5e84041f337d))
* split into packages ([2ee7fd6](https://github.com/ho-nl/m2-pwa/commit/2ee7fd6c0056f467d114f04d92c6c0ddf622d151))


### BREAKING CHANGES

* huge folder structure refactor, please read README to reinstall





# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-store@2.101.9...@graphcommerce/magento-store@2.102.0) (2021-08-12)

### Features

- upgraded to nextjs 11
  ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.101.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-store@2.101.8...@graphcommerce/magento-store@2.101.9) (2021-08-09)

### Reverts

- Revert "chore: upgrade @apollo/client"
  ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-store@2.100.18...@graphcommerce/magento-store@2.101.0) (2021-07-26)

### Features

- **playwright:** added new playwright package to enable browser testing
  ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))

## [2.100.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-store@2.100.10...@graphcommerce/magento-store@2.100.11) (2021-07-20)

### Bug Fixes

- ignore md files from triggering version updates
  ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
