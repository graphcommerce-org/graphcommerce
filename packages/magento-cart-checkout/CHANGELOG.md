# Change Log

## 3.0.2

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

* Updated dependencies
  [[`381e4c86a`](https://github.com/ho-nl/m2-pwa/commit/381e4c86a8321ce96e1fa5c7d3c0a0c0ff3e02c7),
  [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2),
  [`e7c8e2756`](https://github.com/ho-nl/m2-pwa/commit/e7c8e2756d637cbcd2e793d62ef5721d35d9fa7b),
  [`b08a8eb1d`](https://github.com/ho-nl/m2-pwa/commit/b08a8eb1d024b9d3e7712ef034029151670db275),
  [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d),
  [`5a4809b1a`](https://github.com/ho-nl/m2-pwa/commit/5a4809b1a705aa32f620f520085df48ee25f9949)]:
  - @graphcommerce/magento-cart@4.1.1
  - @graphcommerce/magento-customer@4.1.1
  - @graphcommerce/next-ui@4.1.1
  - @graphcommerce/react-hook-form@3.0.2
  - @graphcommerce/graphql@3.0.2
  - @graphcommerce/image@3.0.2
  - @graphcommerce/magento-cart-coupon@3.0.2
  - @graphcommerce/magento-cart-items@3.0.2
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
  - @graphcommerce/magento-cart@4.0.1
  - @graphcommerce/magento-cart-coupon@3.0.1
  - @graphcommerce/magento-cart-items@3.0.1
  - @graphcommerce/magento-customer@4.0.1
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
  - @graphcommerce/magento-cart@4.0.0
  - @graphcommerce/magento-cart-coupon@3.0.0
  - @graphcommerce/magento-cart-items@3.0.0
  - @graphcommerce/magento-customer@4.0.0
  - @graphcommerce/magento-store@4.0.0
  - @graphcommerce/next-ui@4.0.0
  - @graphcommerce/react-hook-form@3.0.0

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.107.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-checkout@2.106.31...@graphcommerce/magento-cart-checkout@2.107.0) (2021-11-12)

### Features

- added tons of translations
  ([9bb0ac7](https://github.com/ho-nl/m2-pwa/commit/9bb0ac709b58df6ea6141e92e4923a5ca9ae2963))

# [2.106.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-checkout@2.105.3...@graphcommerce/magento-cart-checkout@2.106.0) (2021-10-27)

### Features

- **nextjs:** upgraded to nextjs 12
  ([9331bc8](https://github.com/ho-nl/m2-pwa/commit/9331bc801f6419522115cc47d291d49d608d5a90))

# [2.105.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-checkout@2.104.34...@graphcommerce/magento-cart-checkout@2.105.0) (2021-10-21)

### Features

- ability to change shipping address after changing the billing address
  ([101f11a](https://github.com/ho-nl/m2-pwa/commit/101f11a6472cd6e72e08152cec961df47411f310))

## [2.104.13](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-checkout@2.104.12...@graphcommerce/magento-cart-checkout@2.104.13) (2021-10-04)

### Bug Fixes

- **payment:** payment button does nothing when all values are filled
  ([65834c9](https://github.com/ho-nl/m2-pwa/commit/65834c9de4fed71a1f6bbe1af94b2e3541b5bebc))

## [2.104.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-checkout@2.104.0...@graphcommerce/magento-cart-checkout@2.104.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/magento-cart-checkout

# 2.104.0 (2021-09-27)

### Bug Fixes

- add arrow buttons for summary slider
  ([5eb0d85](https://github.com/ho-nl/m2-pwa/commit/5eb0d85546709e4212b55c8ad03ac857cdaf1020))
- Add cart data and summary to payment screen
  ([c4d0414](https://github.com/ho-nl/m2-pwa/commit/c4d0414adc15339ba995641945d09a15637d06c9))
- agreements positioning
  ([89c2dee](https://github.com/ho-nl/m2-pwa/commit/89c2dee1debeb84c8b2cd9abaac85f03759604c8))
- cart didn't use the AppShellTitle
  ([65a58c8](https://github.com/ho-nl/m2-pwa/commit/65a58c8dc7d39cd4c9cb31c4005828376c9e7ad1))
- **coupon:** applying coupon doesnt change totals
  ([5e4d768](https://github.com/ho-nl/m2-pwa/commit/5e4d768e19471b527da92cd46c313b59df9ca8cb))
- full text link
  ([1186248](https://github.com/ho-nl/m2-pwa/commit/1186248d47898649b2f06c63a78cf254396c7f60))
- get more info from cartpage
  ([7cc9833](https://github.com/ho-nl/m2-pwa/commit/7cc9833af4011704e52ab9f2f91d12890c3c9fd3))
- ignore md files from triggering version updates
  ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
- remove conflicting files
  ([0c17ae4](https://github.com/ho-nl/m2-pwa/commit/0c17ae46be62b775ac83b35f11c532ce2d9401a3))
- spelling errors, wrong imports
  ([01cb889](https://github.com/ho-nl/m2-pwa/commit/01cb889513d69ce0555ac7aaa1a37702d75b0a0d))
- top spacing
  ([486fdb0](https://github.com/ho-nl/m2-pwa/commit/486fdb0536e5f6b08f293ea442661d7ad7541717))

### Features

- add component for ordersummary
  ([aefb456](https://github.com/ho-nl/m2-pwa/commit/aefb4568cc233ef1a8657bd290efbf8fda7b2ffa))
- add page for order succes
  ([4179f0b](https://github.com/ho-nl/m2-pwa/commit/4179f0b807e183757a31febfd6ab87eae59a30af))
- **checkout:** checkout agreements checkboxes in checkout
  ([a8b4ddb](https://github.com/ho-nl/m2-pwa/commit/a8b4ddb3a9750c2b7ff86cd460e0ff7fc4cc0ad1))
- component to show order summary
  ([012bc21](https://github.com/ho-nl/m2-pwa/commit/012bc2140e2a9b5d215b3cf8258e7c7c6bdfa4f8))
- **graphql:** introduced new graphql package that holds all generated files
  ([a3e7aa0](https://github.com/ho-nl/m2-pwa/commit/a3e7aa05540540533b5ced9a95f1f802ecbe499f))
- **image:** introduced completely rewritten Image component
  ([e3413b3](https://github.com/ho-nl/m2-pwa/commit/e3413b3a57392d6571ea64cb8d9c8dca05ea31df))
- next.js 11
  ([7d61407](https://github.com/ho-nl/m2-pwa/commit/7d614075a778f488045034f74be4f75b93f63c43))
- **payment-agreements-form:** checkout agreements checkboxes
  ([13c8164](https://github.com/ho-nl/m2-pwa/commit/13c816499d220a2ce940672a95beca508b78ddc9))
- **playwright:** added new playwright package to enable browser testing
  ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
- read checkout policies in sidebar sheet
  ([3fb765e](https://github.com/ho-nl/m2-pwa/commit/3fb765e14a8cfaf0bb27acd8368926ac27ed6a4c))
- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of
  [@reachdigital](https://github.com/reachdigital)
  ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
- upgraded to nextjs 11
  ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

### Reverts

- Revert "chore: upgrade @apollo/client"
  ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.103.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-checkout@2.102.20...@graphcommerce/magento-cart-checkout@2.103.0) (2021-09-24)

### Bug Fixes

- agreements positioning
  ([89c2dee](https://github.com/ho-nl/m2-pwa/commit/89c2dee1debeb84c8b2cd9abaac85f03759604c8))
- full text link
  ([1186248](https://github.com/ho-nl/m2-pwa/commit/1186248d47898649b2f06c63a78cf254396c7f60))
- top spacing
  ([486fdb0](https://github.com/ho-nl/m2-pwa/commit/486fdb0536e5f6b08f293ea442661d7ad7541717))

### Features

- **checkout:** checkout agreements checkboxes in checkout
  ([a8b4ddb](https://github.com/ho-nl/m2-pwa/commit/a8b4ddb3a9750c2b7ff86cd460e0ff7fc4cc0ad1))
- **payment-agreements-form:** checkout agreements checkboxes
  ([13c8164](https://github.com/ho-nl/m2-pwa/commit/13c816499d220a2ce940672a95beca508b78ddc9))
- read checkout policies in sidebar sheet
  ([3fb765e](https://github.com/ho-nl/m2-pwa/commit/3fb765e14a8cfaf0bb27acd8368926ac27ed6a4c))

## [2.102.5](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-checkout@2.102.4...@graphcommerce/magento-cart-checkout@2.102.5) (2021-08-13)

## [2.102.5](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-checkout@2.102.4...@graphcommerce/magento-cart-checkout@2.102.5) (2021-08-13)

### Bug Fixes

- cart didn't use the AppShellTitle
  ([65a58c8](https://github.com/ho-nl/m2-pwa/commit/65a58c8dc7d39cd4c9cb31c4005828376c9e7ad1))

# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-checkout@2.101.10...@graphcommerce/magento-cart-checkout@2.102.0) (2021-08-12)

### Features

- upgraded to nextjs 11
  ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.101.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-checkout@2.101.8...@graphcommerce/magento-cart-checkout@2.101.9) (2021-08-09)

### Reverts

- Revert "chore: upgrade @apollo/client"
  ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

## [2.101.6](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-checkout@2.101.5...@graphcommerce/magento-cart-checkout@2.101.6) (2021-08-04)

### Bug Fixes

- **coupon:** applying coupon doesnt change totals
  ([5e4d768](https://github.com/ho-nl/m2-pwa/commit/5e4d768e19471b527da92cd46c313b59df9ca8cb))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-checkout@2.100.19...@graphcommerce/magento-cart-checkout@2.101.0) (2021-07-26)

### Features

- **playwright:** added new playwright package to enable browser testing
  ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))

## [2.100.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-checkout@2.100.10...@graphcommerce/magento-cart-checkout@2.100.11) (2021-07-20)

### Bug Fixes

- ignore md files from triggering version updates
  ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
