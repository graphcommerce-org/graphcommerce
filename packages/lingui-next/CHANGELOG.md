# Change Log

## 9.0.0-canary.108

## 9.0.0-canary.107

## 9.0.0-canary.106

## 9.0.0-canary.105

## 9.0.0-canary.104

## 9.0.0-canary.103

## 8.1.0-canary.46

### Patch Changes

- [#2314](https://github.com/graphcommerce-org/graphcommerce/pull/2314) [`59874b5`](https://github.com/graphcommerce-org/graphcommerce/commit/59874b572bda17905dc836554f9a3e31f393eb3e) - Solve issue where the page would reload during development when the first call to /graphql was made. ([@paales](https://github.com/paales))

## 8.1.0-canary.8

### Patch Changes

- [#2247](https://github.com/graphcommerce-org/graphcommerce/pull/2247) [`444e446`](https://github.com/graphcommerce-org/graphcommerce/commit/444e446a218cc9da3defb940a6d5cce0229ff845) - Added clear upgrade instructions for linguiLocale ([@paales](https://github.com/paales))

## 8.0.6-canary.0

### Patch Changes

- [#2196](https://github.com/graphcommerce-org/graphcommerce/pull/2196) [`84c50e4`](https://github.com/graphcommerce-org/graphcommerce/commit/84c50e49a1a7f154d4a8f4045c37e773e20283ad) - Allow Lingui to use linguiLocale with country identifiers like `en-us`, it would always load `en` in this case. Introced a new `useLocale` hook to use the correct locale string to use in Intl methods. ([@paales](https://github.com/paales))

## 8.0.0

### Patch Changes

- [#2137](https://github.com/graphcommerce-org/graphcommerce/pull/2137) [`df507b1`](https://github.com/graphcommerce-org/graphcommerce/commit/df507b194c67eef7b02df858c07938bb308b5397) - Don't render pseudo-locale in HTML lang attribute ([@hnsr](https://github.com/hnsr))

## 7.0.0

### Patch Changes

- [#2031](https://github.com/graphcommerce-org/graphcommerce/pull/2031) [`4d8fc9e99`](https://github.com/graphcommerce-org/graphcommerce/commit/4d8fc9e998fc9361282833316ec9564da0644ed6) - Eslint fixes and suppress accepted warnings ([@paales](https://github.com/paales))

## 6.0.0

### Patch Changes

- [#1821](https://github.com/graphcommerce-org/graphcommerce/pull/1821) [`1abc50a21`](https://github.com/graphcommerce-org/graphcommerce/commit/1abc50a21103270fad04e4a9ea892ee1e75233e9) - Upgrade packages to latest version ([@paales](https://github.com/paales))

- [#1830](https://github.com/graphcommerce-org/graphcommerce/pull/1830) [`b2fa21490`](https://github.com/graphcommerce-org/graphcommerce/commit/b2fa2149001cc304d9640bb35f485827ddf9f34a) - When using `i18n` in getStaticProps it could return an incorrect language. ([@paales](https://github.com/paales))

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

## 4.30.0

### Patch Changes

- [#1613](https://github.com/graphcommerce-org/graphcommerce/pull/1613) [`d95ec2ae6`](https://github.com/graphcommerce-org/graphcommerce/commit/d95ec2ae6d8da574995c2b110425c4445b30351b) Thanks [@paales](https://github.com/paales)! - Removed the usage of a separate env variables for the monorepo for lingui, creating command parity with non monorepo setups.

- [#1702](https://github.com/graphcommerce-org/graphcommerce/pull/1702) [`abb15ef4a`](https://github.com/graphcommerce-org/graphcommerce/commit/abb15ef4a79b12eddb32cc006e5d1d31dd06ac2d) Thanks [@paales](https://github.com/paales)! - Added canary releases to GraphCommerce

## 2.2.1

### Patch Changes

- [#1600](https://github.com/graphcommerce-org/graphcommerce/pull/1600) [`127593b65`](https://github.com/graphcommerce-org/graphcommerce/commit/127593b65b0cc367dcb38ba88b589a2abcca75c2) Thanks [@paales](https://github.com/paales)! - Make sure \*.ts files are also scanned when extracting lingui files

## 2.2.0

### Minor Changes

- [#1591](https://github.com/graphcommerce-org/graphcommerce/pull/1591) [`79f057889`](https://github.com/graphcommerce-org/graphcommerce/commit/79f057889847c61d75db7f567fd6575a57cf1022) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Remove need for query rootCategory

## 2.1.11

### Patch Changes

- [#1543](https://github.com/graphcommerce-org/graphcommerce/pull/1543) [`1e0a8b0a3`](https://github.com/graphcommerce-org/graphcommerce/commit/1e0a8b0a3842d150fdfd6e040b408a6fb3f76c7c) Thanks [@paales](https://github.com/paales)! - update lingui version

## 2.1.10

### Patch Changes

- [#1532](https://github.com/graphcommerce-org/graphcommerce/pull/1532) [`aec1f42fa`](https://github.com/graphcommerce-org/graphcommerce/commit/aec1f42fa2c02764c3071bfcccbf5eb6a13fbaef) Thanks [@paales](https://github.com/paales)! - fix: Error: useLingui hook was used without I18nProvider

## 2.1.9

### Patch Changes

- [#1490](https://github.com/graphcommerce-org/graphcommerce/pull/1490) [`d311ef48b`](https://github.com/graphcommerce-org/graphcommerce/commit/d311ef48bb3e97806d992af5516d6b7f183ec9cb) Thanks [@paales](https://github.com/paales)! - upgraded packages

## 2.1.8

### Patch Changes

- [#1451](https://github.com/graphcommerce-org/graphcommerce/pull/1451) [`f698ff85d`](https://github.com/graphcommerce-org/graphcommerce/commit/f698ff85df6bb0922288471bb3c81856091b8061) Thanks [@paales](https://github.com/paales)! - Removed all occurences of @lingui/macro and moved to @lingui/macro / @lingui/core in preparation to move to swc.

  Since we've removed @lingui/macro, all occurences need to be replaced with @lingui/core and @lingui/react.

  All occurences of `<Trans>` and `t` need to be replaced:

  ```tsx
  import { t, Trans } from '@lingui/macro'

  function MyComponent() {
    const foo = 'bar'
    return (
      <div aria-label={t`Account ${foo}`}>
        <Trans>My Translation {foo}</Trans>
      </div>
    )
  }
  ```

  Needs to be replaced with:

  ```tsx
  import { i18n } from '@lingui/core'
  import { Trans } from '@lingui/react'

  function MyComponent() {
    const foo = 'bar'
    return (
      <div aria-label={i18n._(/* i18n */ `Account {foo}`, { foo })}>
        <Trans key='My Translation {foo}' values={{ foo }}></Trans>
      </div>
    )
  }
  ```

  [More examples for Trans](https://lingui.js.org/ref/macro.html#examples-of-jsx-macros) and [more examples for `t`](https://lingui.js.org/ref/macro.html#examples-of-js-macros)

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
