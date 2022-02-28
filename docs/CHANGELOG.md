# Change Log

## 3.1.0

### Minor Changes

- [#1281](https://github.com/ho-nl/m2-pwa/pull/1281)
  [`756ac889a`](https://github.com/ho-nl/m2-pwa/commit/756ac889a711b0c46a9e6948555f87c8fcaf4c5f)
  Thanks [@paales](https://github.com/paales)! - New mobile menu using a separate route, allows us
  to use the LayoutOverlay which gives all sorts of nice customization options.

* [#1278](https://github.com/ho-nl/m2-pwa/pull/1278)
  [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20)
  Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Written documentation for GraphCommerce!
  👩‍🏫🧑‍🏫📚📖

- [#1284](https://github.com/ho-nl/m2-pwa/pull/1284)
  [`5ffcb56bf`](https://github.com/ho-nl/m2-pwa/commit/5ffcb56bfcbe49ebeaf24f9341e819a145ab9a14)
  Thanks [@paales](https://github.com/paales)! - SvgIcon is now more extenable and flexible:

  - It will automatically calculate the stroke-width of the SVG based on the rendered size, allowing
    for a more flexible use for icons.

  - Make SvgIcon themable in your own Theme.

  - Create overrides for components that will be used throughout the app.

* [#1283](https://github.com/ho-nl/m2-pwa/pull/1283)
  [`cc7f9e9ed`](https://github.com/ho-nl/m2-pwa/commit/cc7f9e9eddd90f619a5041890b4e714a2314db2b)
  Thanks [@paales](https://github.com/paales)! - Added a new search function to the docs

### Patch Changes

- [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96)
  Thanks [@paales](https://github.com/paales)! - made packages public

- Updated dependencies
  [[`4bb963d75`](https://github.com/ho-nl/m2-pwa/commit/4bb963d7595b5ce6e3a4924cc2e3e8b0210cdcd6),
  [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96),
  [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20),
  [`3a719c88c`](https://github.com/ho-nl/m2-pwa/commit/3a719c88cad1eab58602de28c41adc0fc4827e1d),
  [`5ffcb56bf`](https://github.com/ho-nl/m2-pwa/commit/5ffcb56bfcbe49ebeaf24f9341e819a145ab9a14)]:
  - @graphcommerce/framer-next-pages@3.1.0
  - @graphcommerce/image@3.1.0
  - @graphcommerce/next-ui@4.1.2
  - @graphcommerce/react-hook-form@3.0.3
  - @graphcommerce/next-config@3.0.3

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
  - @graphcommerce/framer-next-pages@3.0.2
  - @graphcommerce/next-ui@4.1.1
  - @graphcommerce/next-config@3.0.2

## 3.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514)
  Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files,
  so that the packages link to back to the website and repository
- Updated dependencies
  [[`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514)]:
  - @graphcommerce/framer-next-pages@3.0.1
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
  - @graphcommerce/framer-next-pages@3.0.0
  - @graphcommerce/next-ui@4.0.0
  - @graphcommerce/next-config@3.0.0
