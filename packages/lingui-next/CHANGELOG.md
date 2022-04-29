# Change Log

## 2.1.7

### Patch Changes

- [#1426](https://github.com/graphcommerce-org/graphcommerce/pull/1426) [`100f4c38c`](https://github.com/graphcommerce-org/graphcommerce/commit/100f4c38c8fcda4bc6e0425e38028b550b60adc2) Thanks [@paales](https://github.com/paales)! - Upgrade packages

## 2.1.6

### Patch Changes

- [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`da0ae7d02`](https://github.com/graphcommerce-org/graphcommerce/commit/da0ae7d0236e4908ba0bf0fa16656be516e841d4) Thanks [@paales](https://github.com/paales)! - Updated dependencies

## 2.1.5

### Patch Changes

- [#1378](https://github.com/graphcommerce-org/graphcommerce/pull/1378) [`b610a6e40`](https://github.com/graphcommerce-org/graphcommerce/commit/b610a6e4049e8c9e8b5d2aeff31b8e1bfc24abe5) Thanks [@paales](https://github.com/paales)! - Pin all versions internally so we can’t end up in an unfixable state for the user

## 2.1.4

### Patch Changes

- [#1369](https://github.com/graphcommerce-org/graphcommerce/pull/1369) [`ae6449502`](https://github.com/graphcommerce-org/graphcommerce/commit/ae64495024a455bbe5188588604368c1542840c9) Thanks [@paales](https://github.com/paales)! - Upgraded dependencies

## 2.1.3

### Patch Changes

- [#1337](https://github.com/graphcommerce-org/graphcommerce/pull/1337) [`4456db1bb`](https://github.com/graphcommerce-org/graphcommerce/commit/4456db1bb5c5c03870f1b7d55ddd6645dfaca3c6) Thanks [@paales](https://github.com/paales)! - Make sure the LinguiProviderProps are exported

## 2.1.2

### Patch Changes

- [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655) Thanks [@paales](https://github.com/paales)! - All default exports are now named exports internally and all `index.tsx` are renamed to the component name.

* [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

## 2.1.1

### Patch Changes

- [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96) Thanks [@paales](https://github.com/paales)! - made packages public

## 2.1.0

### Minor Changes

- [#1274](https://github.com/ho-nl/m2-pwa/pull/1274) [`b08a8eb1d`](https://github.com/ho-nl/m2-pwa/commit/b08a8eb1d024b9d3e7712ef034029151670db275) Thanks [@paales](https://github.com/paales)! - Fixed extraction of translations and updated various translations for english 🇺🇸🇬🇧 and dutch 🇳🇱

### Patch Changes

- [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2) Thanks [@paales](https://github.com/paales)! - We've moved lots of internal packages from `dependencies` to `peerDependencies`. The result of this is that there will be significantly less duplicate packages in the node_modules folders.

* [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d) Thanks [@paales](https://github.com/paales)! - Upgraded to [NextJS 12.1](https://nextjs.org/blog/next-12-1)! This is just for compatibility, but we'll be implementing [On-demand Incremental Static Regeneration](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta) soon.

  This will greatly reduce the requirement to rebuid stuff and we'll add a management UI on the frontend to be able to revalidate pages manually.

## 2.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514) Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files, so that the packages link to back to the website and repository

## 2.0.0

### Major Changes

- [#1258](https://github.com/ho-nl/m2-pwa/pull/1258) [`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05) Thanks [@paales](https://github.com/paales)! - Upgraded to Material UI 5

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.3.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/lingui-next@1.3.0...@graphcommerce/lingui-next@1.3.1) (2022-01-04)

### Bug Fixes

- pages would be blank because the locale couldn't properly be loaded ([5fe9ecd](https://github.com/ho-nl/m2-pwa/commit/5fe9ecd204c3f9efddcf95d54464b1b931ef682e))

# [1.3.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/lingui-next@1.2.4...@graphcommerce/lingui-next@1.3.0) (2022-01-03)

### Features

- **framer-next-pages:** reduce rerenders when navigating to a new page ([5cf3301](https://github.com/ho-nl/m2-pwa/commit/5cf330130bb3527057da015e3c4a6fa295d7262e))

## [1.2.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/lingui-next@1.2.0...@graphcommerce/lingui-next@1.2.1) (2021-12-03)

### Bug Fixes

- make sure we're not throwing a generic 'No locales specified' when there is a generic error ([fd3dd23](https://github.com/ho-nl/m2-pwa/commit/fd3dd233fb293f6afc08636316a34d2a2db4bbc3))

# [1.2.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/lingui-next@1.1.0...@graphcommerce/lingui-next@1.2.0) (2021-11-12)

### Bug Fixes

- error in cli about missing plurals ([fedde70](https://github.com/ho-nl/m2-pwa/commit/fedde70012b0b5694114a0f5c3ab0f7d5c8cd276))

### Features

- added tons of translations ([9bb0ac7](https://github.com/ho-nl/m2-pwa/commit/9bb0ac709b58df6ea6141e92e4923a5ca9ae2963))

# 1.1.0 (2021-11-11)

### Features

- lingui configuration and integration greatly simplified and fixed ssr ([d8ec22a](https://github.com/ho-nl/m2-pwa/commit/d8ec22a80295af854a4cf6f357c4fb137c5b550d))
