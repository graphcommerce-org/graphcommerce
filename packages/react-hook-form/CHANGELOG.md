# Change Log

## 3.0.5

### Patch Changes

- [#1312](https://github.com/ho-nl/m2-pwa/pull/1312) [`4e1fd4d9f`](https://github.com/ho-nl/m2-pwa/commit/4e1fd4d9fda2109de378be7e39382f7014a7ab54) Thanks [@paales](https://github.com/paales)! - upgraded dependencies

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

- [#1274](https://github.com/ho-nl/m2-pwa/pull/1274) [`381e4c86a`](https://github.com/ho-nl/m2-pwa/commit/381e4c86a8321ce96e1fa5c7d3c0a0c0ff3e02c7) Thanks [@paales](https://github.com/paales)! - Moved `ApolloErrorAlert`, `ApolloErrorFullPage` and `ApolloErrorSnackbar` to the ecommerce-ui package.

  Created `ComposedSubmitButton` and `ComposedSubmitLinkOrButton` to reduce complexity from `magento-graphcms` example.

  Removed dependency an `@graphcommerce/react-hook-form` from `magento-graphcms` example.

  Added dependency `@graphcommerce/ecommerce-ui` from `magento-graphcms` example.

* [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2) Thanks [@paales](https://github.com/paales)! - We've moved lots of internal packages from `dependencies` to `peerDependencies`. The result of this is that there will be significantly less duplicate packages in the node_modules folders.

- [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d) Thanks [@paales](https://github.com/paales)! - Upgraded to [NextJS 12.1](https://nextjs.org/blog/next-12-1)! This is just for compatibility, but we'll be implementing [On-demand Incremental Static Regeneration](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta) soon.

  This will greatly reduce the requirement to rebuid stuff and we'll add a management UI on the frontend to be able to revalidate pages manually.

## 3.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514) Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files, so that the packages link to back to the website and repository

## 3.0.0

### Major Changes

- [#1258](https://github.com/ho-nl/m2-pwa/pull/1258) [`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05) Thanks [@paales](https://github.com/paales)! - Upgraded to Material UI 5

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.104.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/react-hook-form@2.104.0...@graphcommerce/react-hook-form@2.104.1) (2021-12-03)

### Bug Fixes

- make the headerHeight properly configurable ([c39c942](https://github.com/ho-nl/m2-pwa/commit/c39c942a62a9bb9687ea553be28e37fb49a6b065))

# [2.104.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/react-hook-form@2.103.1...@graphcommerce/react-hook-form@2.104.0) (2021-11-12)

### Features

- added tons of translations ([9bb0ac7](https://github.com/ho-nl/m2-pwa/commit/9bb0ac709b58df6ea6141e92e4923a5ca9ae2963))

# [2.103.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/react-hook-form@2.102.14...@graphcommerce/react-hook-form@2.103.0) (2021-11-03)

### Bug Fixes

- add x-recaptcha header to apollo link context when using mutations ([380fe52](https://github.com/ho-nl/m2-pwa/commit/380fe52ebd283df034d8a2c6a4f6a3713955bdd3))
- **use-form-gql:** context type ([f355495](https://github.com/ho-nl/m2-pwa/commit/f3554951697fe394a76dd75ecf119f038f8d9bbc))

### Features

- google recaptcha v3 integration ([a9fcc16](https://github.com/ho-nl/m2-pwa/commit/a9fcc16f93951e61378c99a2e183e2d754da1d50))

## [2.102.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/react-hook-form@2.102.0...@graphcommerce/react-hook-form@2.102.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/react-hook-form

# 2.102.0 (2021-09-27)

### Bug Fixes

- disable isValid form checkout on submit ([b20110d](https://github.com/ho-nl/m2-pwa/commit/b20110d93327ff2678296acc47b1075b4fb3a85a))
- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
- input checkmarks ([279c1c1](https://github.com/ho-nl/m2-pwa/commit/279c1c112ada46fdea102024298e8293d1a23293))
- make sure ComposedForm actually submits correctly ([c6499d9](https://github.com/ho-nl/m2-pwa/commit/c6499d9d36f874cd65b310cbf7f63f5a88fa86cd))
- make sure the checkout address fields are working as expected ([e88aae9](https://github.com/ho-nl/m2-pwa/commit/e88aae9afa3c60457b8e8c87ba52e8ae2dec4a3e))
- make sure useFormGqlQuery uses the new useLazyQueryPromise ([f0cf831](https://github.com/ho-nl/m2-pwa/commit/f0cf83191dbbc2da222682b053db8b8c374add69))
- **react-hook-form:** assertFormGqlOperation ([ce09fa5](https://github.com/ho-nl/m2-pwa/commit/ce09fa50f73f6d06b2caa15b1223ba7470a7ea96))
- **react-hook-form:** form autosubmit is stuck in a loop if the request fails ([c74e3e0](https://github.com/ho-nl/m2-pwa/commit/c74e3e0cbf146887c3ef5447dcbba46746971e2a))
- **react-hook-form:** handle ComposedForm network errors ([e028ae0](https://github.com/ho-nl/m2-pwa/commit/e028ae06f49fea5d4e4dbdf58f803b365c902404))
- **react-hook-form:** make sure we don’t overuse useFormPersist ([b28efde](https://github.com/ho-nl/m2-pwa/commit/b28efde79dad1fb9bf9e8d7f9cc5cf32648acdf1))
- **react-hook-form:** not not always submit ComposedForm ([642833f](https://github.com/ho-nl/m2-pwa/commit/642833fe8b311b20db2ccdd57f0492b8429c0e81))
- **react-hook-form:** Object(…) is not a function ([ebc32e4](https://github.com/ho-nl/m2-pwa/commit/ebc32e402c1db185785f1e29c21a705d38a6743d))
- **react-hook-form:** solve issue where form would oversubmit/not-submit ([89f0619](https://github.com/ho-nl/m2-pwa/commit/89f0619051228c08a61aafeeddb67b95e99727ff))
- **react-hook-form:** the wrong form would submit if the component didn’t rerender ([32d4cf1](https://github.com/ho-nl/m2-pwa/commit/32d4cf13ffc2967cc41e50a14ad872d289d4eb43))
- **react-hook-form:** validate if the previous request succeeds before moving on to the next request ([1985d09](https://github.com/ho-nl/m2-pwa/commit/1985d0938cd509532fa3b6bc801a3399c2baae09))
- remove cyclic dependencies ([8a59389](https://github.com/ho-nl/m2-pwa/commit/8a5938943a97634cce57c68bb369c6e77e7a0288))
- show form checkmarks when field is valid ([7df8cad](https://github.com/ho-nl/m2-pwa/commit/7df8cadd5292c7d8a1d1e4c981d51adf7b5b8119))
- use form auto submit should submit with prefilled data ([9957ef6](https://github.com/ho-nl/m2-pwa/commit/9957ef67ee39e30873f528ffae4da7c0dcfbb6fa))
- useformautosubmit initial submit ([a06cb60](https://github.com/ho-nl/m2-pwa/commit/a06cb60996f83788a95bcd3995407539b2acfd46))
- useFormAutoSubmit modes ([9180bf2](https://github.com/ho-nl/m2-pwa/commit/9180bf21a140f5741078007c42972ded433c277c))

### Features

- created stacked-pages package ([d86008e](https://github.com/ho-nl/m2-pwa/commit/d86008ee659ccb25b194a41d624b394a1ddbd088))
- implemented checkmo payment method ([18525b2](https://github.com/ho-nl/m2-pwa/commit/18525b2f4efe9bd0eea12a7a992d284f341e0c68))
- implemented purchase order ([3a40033](https://github.com/ho-nl/m2-pwa/commit/3a40033cd4d6712a17bb9c41a8841ebf7aa2f025))
- introduced SheetShell as a shared layout component ([eb64f28](https://github.com/ho-nl/m2-pwa/commit/eb64f28fd05b69efbf14fa850c70b0f1da5c4237))
- next.js 11 ([7d61407](https://github.com/ho-nl/m2-pwa/commit/7d614075a778f488045034f74be4f75b93f63c43))
- **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
- **react-hook-form:** added buttonState to ComposedSubmit ([57e77c2](https://github.com/ho-nl/m2-pwa/commit/57e77c29f17720f7f3ee3b63be82779c0e5d8714))
- **react-hook-form:** added ComposedForm component to handle the submission of multiple forms ([1172ec5](https://github.com/ho-nl/m2-pwa/commit/1172ec5abcb0e1b72bb362b977bf0c22997bac9a))
- **react-hook-form:** pass useFormGql operation options ([ddb6f75](https://github.com/ho-nl/m2-pwa/commit/ddb6f750432c0a6ed8468ae08e522a774c261f8f))
- **react-hook-form:** updated readme ([aede77a](https://github.com/ho-nl/m2-pwa/commit/aede77ab6d30fe5ca47b9d08bbdadca9b371713c))
- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of [@reachdigital](https://github.com/reachdigital) ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
- search result page wip ([4ecaf34](https://github.com/ho-nl/m2-pwa/commit/4ecaf34deaa0ff6d24e03d72e74fd045bb7ee269))
- solve issue where the order couldn’t be submitted ([ec0d357](https://github.com/ho-nl/m2-pwa/commit/ec0d3579a1277976e2dc515f420996cf716f83a6))
- submit composed form sequentially ([890d839](https://github.com/ho-nl/m2-pwa/commit/890d8393d635c3777aa17cfa8d4dafc13c2e6cdc))
- upgrade to node 14 ([d079a75](https://github.com/ho-nl/m2-pwa/commit/d079a751e9bfd8dc7f5009d2c9f31c336a0c96ab))
- useFormMutationCart and simpler imports ([012f090](https://github.com/ho-nl/m2-pwa/commit/012f090e8f54d09f35d393c61ad1e2319f5a90ff))

### Reverts

- Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

# Change Log

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.101.4](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/react-hook-form@2.101.3...@graphcommerce/react-hook-form@2.101.4) (2021-08-09)

### Reverts

- Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

## [2.101.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/react-hook-form@2.101.2...@graphcommerce/react-hook-form@2.101.3) (2021-07-29)

### Bug Fixes

- **react-hook-form:** validate if the previous request succeeds before moving on to the next request ([1985d09](https://github.com/ho-nl/m2-pwa/commit/1985d0938cd509532fa3b6bc801a3399c2baae09))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/react-hook-form@2.100.10...@graphcommerce/react-hook-form@2.101.0) (2021-07-26)

### Bug Fixes

- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))

### Features

- **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
