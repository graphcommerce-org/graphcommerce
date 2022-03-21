# Change Log

## 2.0.5

### Patch Changes

- [#1341](https://github.com/graphcommerce-org/graphcommerce/pull/1341) [`2e29c5852`](https://github.com/graphcommerce-org/graphcommerce/commit/2e29c585247d356e3027be92beb7815f2070c855) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

- Updated dependencies [[`2e29c5852`](https://github.com/graphcommerce-org/graphcommerce/commit/2e29c585247d356e3027be92beb7815f2070c855)]:
  - @graphcommerce/graphql@3.0.5

## 2.0.4

### Patch Changes

- [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655) Thanks [@paales](https://github.com/paales)! - All default exports are now named exports internally and all `index.tsx` are renamed to the component name.

* [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

* Updated dependencies [[`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655), [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef)]:
  - @graphcommerce/graphql@3.0.4

## 2.0.3

### Patch Changes

- [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96) Thanks [@paales](https://github.com/paales)! - made packages public

- Updated dependencies [[`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96)]:
  - @graphcommerce/graphql@3.0.3

## 2.0.2

### Patch Changes

- [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2) Thanks [@paales](https://github.com/paales)! - We've moved lots of internal packages from `dependencies` to `peerDependencies`. The result of this is that there will be significantly less duplicate packages in the node_modules folders.

* [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d) Thanks [@paales](https://github.com/paales)! - Upgraded to [NextJS 12.1](https://nextjs.org/blog/next-12-1)! This is just for compatibility, but we'll be implementing [On-demand Incremental Static Regeneration](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta) soon.

  This will greatly reduce the requirement to rebuid stuff and we'll add a management UI on the frontend to be able to revalidate pages manually.

* Updated dependencies [[`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2), [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d)]:
  - @graphcommerce/graphql@3.0.2

## 2.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514) Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files, so that the packages link to back to the website and repository
- Updated dependencies [[`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514)]:
  - @graphcommerce/graphql@3.0.1

## 2.0.0

### Major Changes

- [#1258](https://github.com/ho-nl/m2-pwa/pull/1258) [`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05) Thanks [@paales](https://github.com/paales)! - Upgraded to Material UI 5

### Patch Changes

- Updated dependencies [[`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05)]:
  - @graphcommerce/graphql@3.0.0

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.8](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/googlerecaptcha@1.1.7...@graphcommerce/googlerecaptcha@1.1.8) (2021-12-20)

### Bug Fixes

- make sure we're not loading gogole properties when keys are not given ([8636715](https://github.com/ho-nl/m2-pwa/commit/8636715d61985e0919208ffb64354c3ebb43ed01))

## [1.1.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/googlerecaptcha@1.1.1...@graphcommerce/googlerecaptcha@1.1.2) (2021-11-12)

### Bug Fixes

- remove fragment ([3d8a964](https://github.com/ho-nl/m2-pwa/commit/3d8a964f3009f04b3ba09d54272a31b592e7a052))
- remove hiding recaptcha from themeProvider, add to component ([6a49f77](https://github.com/ho-nl/m2-pwa/commit/6a49f77ef9fd22ea66e7acd1322c65ac6426fd3b))

# 1.1.0 (2021-11-03)

### Bug Fixes

- make sure we're not throwing a warning on the production env. ([7ee4499](https://github.com/ho-nl/m2-pwa/commit/7ee449959509a13e684c19e2ff707e378d6b5c35))

### Features

- google recaptcha v3 integration ([a9fcc16](https://github.com/ho-nl/m2-pwa/commit/a9fcc16f93951e61378c99a2e183e2d754da1d50))
