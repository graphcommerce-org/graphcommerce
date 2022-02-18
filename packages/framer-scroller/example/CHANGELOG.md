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
  [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d)]:
  - @graphcommerce/next-ui@4.1.1
  - @graphcommerce/framer-scroller@2.0.2
  - @graphcommerce/image@3.0.2
  - @graphcommerce/next-config@3.0.2

## 3.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514)
  Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files,
  so that the packages link to back to the website and repository
- Updated dependencies
  [[`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514)]:
  - @graphcommerce/framer-scroller@2.0.1
  - @graphcommerce/image@3.0.1
  - @graphcommerce/next-ui@4.0.1
  - @graphcommerce/next-config@3.0.1

## 3.0.0

### Major Changes

- [#1258](https://github.com/ho-nl/m2-pwa/pull/1258)
  [`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05)
  Thanks [@paales](https://github.com/paales)! - Upgraded to Material UI 5

### Patch Changes

- Updated dependencies
  [[`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05)]:
  - @graphcommerce/framer-scroller@2.0.0
  - @graphcommerce/image@3.0.0
  - @graphcommerce/next-ui@4.0.0
  - @graphcommerce/next-config@3.0.0

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.105.37](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/framer-scroller-example@2.105.36...@graphcommerce/framer-scroller-example@2.105.37) (2021-12-03)

### Bug Fixes

- make the headerHeight properly configurable
  ([c39c942](https://github.com/ho-nl/m2-pwa/commit/c39c942a62a9bb9687ea553be28e37fb49a6b065))

# [2.105.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/framer-scroller-example@2.104.7...@graphcommerce/framer-scroller-example@2.105.0) (2021-10-27)

### Features

- **nextjs:** upgraded to nextjs 12
  ([9331bc8](https://github.com/ho-nl/m2-pwa/commit/9331bc801f6419522115cc47d291d49d608d5a90))

# [2.104.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/framer-scroller-example@2.103.27...@graphcommerce/framer-scroller-example@2.104.0) (2021-10-19)

### Features

- **framer-scroller:** better defaults so the Scroller doesn't look broken when providing no props
  ([b177ce9](https://github.com/ho-nl/m2-pwa/commit/b177ce9570abb9ccfd4eb5cc34e43d157bb4e81a))

# 2.103.0 (2021-09-27)

### Bug Fixes

- versions
  ([b8b306c](https://github.com/ho-nl/m2-pwa/commit/b8b306c8f3a13415e441d0593c638ae2a3731cd6))

### Features

- **framer-scroller:** created an MotionImageAspect component to properly center and handle scorller
  resizes
  ([2eb117e](https://github.com/ho-nl/m2-pwa/commit/2eb117e6c135ea8e009c91f854e9f9ef8e7375c5))
- **framer-scroller:** implemented the scroller on all pages
  ([73fb518](https://github.com/ho-nl/m2-pwa/commit/73fb518eff74edb2b3212e892b3d8cc2b088011b))
- **framer-scroller:** option to hide scrollbar
  ([f6a8329](https://github.com/ho-nl/m2-pwa/commit/f6a8329d2f761956a9d7bdc5243de336aa2e5ad4))
- **framer-scroller:** package to implement scroll-snap handling with JS
  ([b3a279f](https://github.com/ho-nl/m2-pwa/commit/b3a279f8b4acb2b9de99004efe0459c534786bdd))
- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of
  [@reachdigital](https://github.com/reachdigital)
  ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))

# 2.102.0 (2021-09-01)

### Features

- **framer-scroller:** created an MotionImageAspect component to properly center and handle scorller
  resizes
  ([2eb117e](https://github.com/ho-nl/m2-pwa/commit/2eb117e6c135ea8e009c91f854e9f9ef8e7375c5))
- **framer-scroller:** implemented the scroller on all pages
  ([73fb518](https://github.com/ho-nl/m2-pwa/commit/73fb518eff74edb2b3212e892b3d8cc2b088011b))
- **framer-scroller:** option to hide scrollbar
  ([f6a8329](https://github.com/ho-nl/m2-pwa/commit/f6a8329d2f761956a9d7bdc5243de336aa2e5ad4))
- **framer-scroller:** package to implement scroll-snap handling with JS
  ([b3a279f](https://github.com/ho-nl/m2-pwa/commit/b3a279f8b4acb2b9de99004efe0459c534786bdd))
