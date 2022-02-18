# Change Log

## 3.0.2

### Patch Changes

- [#1276](https://github.com/ho-nl/m2-pwa/pull/1276)
  [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2)
  Thanks [@paales](https://github.com/paales)! - We've moved lots of internal packages from
  `dependencies` to `peerDependencies`. The result of this is that there will be significantly less
  duplicate packages in the node_modules folders.

* [#1274](https://github.com/ho-nl/m2-pwa/pull/1274)
  [`b08a8eb1d`](https://github.com/ho-nl/m2-pwa/commit/b08a8eb1d024b9d3e7712ef034029151670db275)
  Thanks [@paales](https://github.com/paales)! - Fixed extraction of translations and updated
  various translations for english 🇺🇸🇬🇧 and dutch 🇳🇱

- [#1276](https://github.com/ho-nl/m2-pwa/pull/1276)
  [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d)
  Thanks [@paales](https://github.com/paales)! - Upgraded to
  [NextJS 12.1](https://nextjs.org/blog/next-12-1)! This is just for compatibility, but we'll be
  implementing
  [On-demand Incremental Static Regeneration](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta)
  soon.

  This will greatly reduce the requirement to rebuid stuff and we'll add a management UI on the
  frontend to be able to revalidate pages manually.

- Updated dependencies
  [[`381e4c86a`](https://github.com/ho-nl/m2-pwa/commit/381e4c86a8321ce96e1fa5c7d3c0a0c0ff3e02c7),
  [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2),
  [`e7c8e2756`](https://github.com/ho-nl/m2-pwa/commit/e7c8e2756d637cbcd2e793d62ef5721d35d9fa7b),
  [`b08a8eb1d`](https://github.com/ho-nl/m2-pwa/commit/b08a8eb1d024b9d3e7712ef034029151670db275),
  [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d)]:
  - @graphcommerce/magento-customer@4.1.1
  - @graphcommerce/next-ui@4.1.1
  - @graphcommerce/react-hook-form@3.0.2
  - @graphcommerce/graphql@3.0.2
  - @graphcommerce/image@3.0.2
  - @graphcommerce/magento-customer-order@3.0.2
  - @graphcommerce/magento-graphql@3.0.2
  - @graphcommerce/magento-store@4.0.2

## 3.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514)
  Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files,
  so that the packages link to back to the website and repository
- Updated dependencies
  [[`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514)]:
  - @graphcommerce/graphql@3.0.1
  - @graphcommerce/image@3.0.1
  - @graphcommerce/magento-customer@4.0.1
  - @graphcommerce/magento-customer-order@3.0.1
  - @graphcommerce/magento-graphql@3.0.1
  - @graphcommerce/magento-store@4.0.1
  - @graphcommerce/next-ui@4.0.1
  - @graphcommerce/react-hook-form@3.0.1

## 3.0.0

### Major Changes

- [#1258](https://github.com/ho-nl/m2-pwa/pull/1258)
  [`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05)
  Thanks [@paales](https://github.com/paales)! - Upgraded to Material UI 5

### Patch Changes

- Updated dependencies
  [[`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05)]:
  - @graphcommerce/graphql@3.0.0
  - @graphcommerce/image@3.0.0
  - @graphcommerce/magento-customer@4.0.0
  - @graphcommerce/magento-customer-order@3.0.0
  - @graphcommerce/magento-graphql@3.0.0
  - @graphcommerce/magento-store@4.0.0
  - @graphcommerce/next-ui@4.0.0
  - @graphcommerce/react-hook-form@3.0.0

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.105.12](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-account@2.105.11...@graphcommerce/magento-customer-account@2.105.12) (2021-12-06)

### Bug Fixes

- bugs ([f7fac90](https://github.com/ho-nl/m2-pwa/commit/f7fac906b4563559ed382165983cde4271f65d01))

## [2.105.7](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-account@2.105.6...@graphcommerce/magento-customer-account@2.105.7) (2021-12-03)

### Bug Fixes

- make sure that pill link buttons get the right background color etc.
  ([c142b31](https://github.com/ho-nl/m2-pwa/commit/c142b31552417d2296341785994e2f7b35462793))

# [2.105.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-account@2.104.31...@graphcommerce/magento-customer-account@2.105.0) (2021-11-12)

### Features

- added tons of translations
  ([9bb0ac7](https://github.com/ho-nl/m2-pwa/commit/9bb0ac709b58df6ea6141e92e4923a5ca9ae2963))

## [2.104.30](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-account@2.104.29...@graphcommerce/magento-customer-account@2.104.30) (2021-11-12)

### Bug Fixes

- design
  ([a095309](https://github.com/ho-nl/m2-pwa/commit/a095309bb3d77228985e08e30f626cd26e878f57))

## [2.104.18](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-account@2.104.17...@graphcommerce/magento-customer-account@2.104.18) (2021-11-04)

### Bug Fixes

- remove hardcoded fontSize
  ([e4e09e1](https://github.com/ho-nl/m2-pwa/commit/e4e09e11baeb8edeff634550b8cdb88571d96911))

## [2.104.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-account@2.104.8...@graphcommerce/magento-customer-account@2.104.9) (2021-11-02)

### Bug Fixes

- darkMode
  ([c7573de](https://github.com/ho-nl/m2-pwa/commit/c7573de6bb80643b26931c35ac61735539e7fbf0))
- remove text='bold', make contained button text stronger by default
  ([cd277c9](https://github.com/ho-nl/m2-pwa/commit/cd277c9f434a4a765eac372467e5a05c822d5512))

## [2.104.4](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-account@2.104.3...@graphcommerce/magento-customer-account@2.104.4) (2021-10-28)

### Bug Fixes

- External SVG's can't have alt tags
  ([1b1414a](https://github.com/ho-nl/m2-pwa/commit/1b1414a782d55d3acf7b0e6bcaa50f2ad5f18f39))

## [2.104.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-account@2.104.2...@graphcommerce/magento-customer-account@2.104.3) (2021-10-28)

### Bug Fixes

- update SvgImage to SvgImageSimple
  ([f116543](https://github.com/ho-nl/m2-pwa/commit/f116543730853fa9782abff0ccacee7032e85789))

# [2.104.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-account@2.103.35...@graphcommerce/magento-customer-account@2.104.0) (2021-10-27)

### Features

- **nextjs:** upgraded to nextjs 12
  ([9331bc8](https://github.com/ho-nl/m2-pwa/commit/9331bc801f6419522115cc47d291d49d608d5a90))

## [2.103.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-account@2.103.0...@graphcommerce/magento-customer-account@2.103.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/magento-customer-account

# 2.103.0 (2021-09-27)

### Bug Fixes

- account drawer not animating
  ([8001ab5](https://github.com/ho-nl/m2-pwa/commit/8001ab5bff6b62f676cf7b821f287b20ff767a35))
- account sizing
  ([ff8eb08](https://github.com/ho-nl/m2-pwa/commit/ff8eb08fb8ef0e08be00a3abac1582799ec9d553))
- **account:** continue button wasn't visible when loading the page
  ([c33fdc8](https://github.com/ho-nl/m2-pwa/commit/c33fdc8675ddf5f5fa5b57cb7ec07be3a93f0b30))
- make separate queries folder, create injectable for account and inject reviews
  ([5d82a5d](https://github.com/ho-nl/m2-pwa/commit/5d82a5d9162f687c2678cce215b77eedbaf1669e))
- ref couldn't be forwarded for ShippingAddressForm
  ([1f90f1a](https://github.com/ho-nl/m2-pwa/commit/1f90f1a30437d656fcf841026ad13bb2b45d831b))
- replace captionOldOld with overline
  ([c19bc8a](https://github.com/ho-nl/m2-pwa/commit/c19bc8aee829432a8c72d0d4bc9d266110af65ab))
- **sign-in-up:** form not showing up without refresh
  ([49782d9](https://github.com/ho-nl/m2-pwa/commit/49782d9893dc6d32e28247ebc25a2f6c7a37339e))
- wrong export for accountmenuitem
  ([5c6c21f](https://github.com/ho-nl/m2-pwa/commit/5c6c21f7759799b2725bff3d943d94fd9aef6820))

### Features

- added magento-newsletter package
  ([9b48b1b](https://github.com/ho-nl/m2-pwa/commit/9b48b1b4dc29f9ea3271f4a6370abba15dd8999c))
- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of
  [@reachdigital](https://github.com/reachdigital)
  ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
- signup newsletter component
  ([7ee961d](https://github.com/ho-nl/m2-pwa/commit/7ee961ded34e9fe012faa7041e96b35fb44b1f35))
- upgraded to nextjs 11
  ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

### Reverts

- Revert "chore: upgrade @apollo/client"
  ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-account@2.101.18...@graphcommerce/magento-customer-account@2.102.0) (2021-09-24)

### Features

- added magento-newsletter package
  ([9b48b1b](https://github.com/ho-nl/m2-pwa/commit/9b48b1b4dc29f9ea3271f4a6370abba15dd8999c))
- signup newsletter component
  ([7ee961d](https://github.com/ho-nl/m2-pwa/commit/7ee961ded34e9fe012faa7041e96b35fb44b1f35))

## [2.101.6](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-account@2.101.5...@graphcommerce/magento-customer-account@2.101.6) (2021-08-17)

## [2.101.6](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-account@2.101.5...@graphcommerce/magento-customer-account@2.101.6) (2021-08-17)

### Bug Fixes

- account drawer not animating
  ([8001ab5](https://github.com/ho-nl/m2-pwa/commit/8001ab5bff6b62f676cf7b821f287b20ff767a35))
- **sign-in-up:** form not showing up without refresh
  ([49782d9](https://github.com/ho-nl/m2-pwa/commit/49782d9893dc6d32e28247ebc25a2f6c7a37339e))

## [2.101.4](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-account@2.101.3...@graphcommerce/magento-customer-account@2.101.4) (2021-08-13)

### Bug Fixes

- ref couldn't be forwarded for ShippingAddressForm
  ([1f90f1a](https://github.com/ho-nl/m2-pwa/commit/1f90f1a30437d656fcf841026ad13bb2b45d831b))

## [2.101.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-account@2.101.0...@graphcommerce/magento-customer-account@2.101.1) (2021-08-12)

### Bug Fixes

- account sizing
  ([ff8eb08](https://github.com/ho-nl/m2-pwa/commit/ff8eb08fb8ef0e08be00a3abac1582799ec9d553))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-account@2.100.23...@graphcommerce/magento-customer-account@2.101.0) (2021-08-12)

### Features

- upgraded to nextjs 11
  ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.100.23](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-account@2.100.22...@graphcommerce/magento-customer-account@2.100.23) (2021-08-09)

### Bug Fixes

- **account:** continue button wasn't visible when loading the page
  ([c33fdc8](https://github.com/ho-nl/m2-pwa/commit/c33fdc8675ddf5f5fa5b57cb7ec07be3a93f0b30))

### Reverts

- Revert "chore: upgrade @apollo/client"
  ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

## [2.100.21](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer-account@2.100.20...@graphcommerce/magento-customer-account@2.100.21) (2021-08-06)

### Bug Fixes

- replace captionOldOld with overline
  ([c19bc8a](https://github.com/ho-nl/m2-pwa/commit/c19bc8aee829432a8c72d0d4bc9d266110af65ab))

## 2.100.11 (2021-07-23)

### Bug Fixes

- make separate queries folder, create injectable for account and inject reviews
  ([5d82a5d](https://github.com/ho-nl/m2-pwa/commit/5d82a5d9162f687c2678cce215b77eedbaf1669e))
- wrong export for accountmenuitem
  ([5c6c21f](https://github.com/ho-nl/m2-pwa/commit/5c6c21f7759799b2725bff3d943d94fd9aef6820))
