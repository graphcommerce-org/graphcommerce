# @graphcommerce/ecommerce-ui

## 1.0.1

### Patch Changes

- [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96)
  Thanks [@paales](https://github.com/paales)! - made packages public

- Updated dependencies
  [[`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96),
  [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20),
  [`3a719c88c`](https://github.com/ho-nl/m2-pwa/commit/3a719c88cad1eab58602de28c41adc0fc4827e1d),
  [`5ffcb56bf`](https://github.com/ho-nl/m2-pwa/commit/5ffcb56bfcbe49ebeaf24f9341e819a145ab9a14)]:
  - @graphcommerce/graphql@3.0.3
  - @graphcommerce/next-ui@4.1.2
  - @graphcommerce/react-hook-form@3.0.3

## 1.0.0

### Major Changes

- [#1274](https://github.com/ho-nl/m2-pwa/pull/1274)
  [`351347afe`](https://github.com/ho-nl/m2-pwa/commit/351347afeae5bd837408d46c7593bcf5473dc621)
  Thanks [@paales](https://github.com/paales)! - Created new `@graphcommerce/ecommerce-ui` package
  to connect generic components from `@graphcommerce/next-ui` to `@graphcommerce/react-hook-form`
  and `@graphcommerce/graphql`

### Patch Changes

- [#1274](https://github.com/ho-nl/m2-pwa/pull/1274)
  [`381e4c86a`](https://github.com/ho-nl/m2-pwa/commit/381e4c86a8321ce96e1fa5c7d3c0a0c0ff3e02c7)
  Thanks [@paales](https://github.com/paales)! - Moved `ApolloErrorAlert`, `ApolloErrorFullPage` and
  `ApolloErrorSnackbar` to the ecommerce-ui package.

  Created `ComposedSubmitButton` and `ComposedSubmitLinkOrButton` to reduce complexity from
  `magento-graphcms` example.

  Removed dependency an `@graphcommerce/react-hook-form` from `magento-graphcms` example.

  Added dependency `@graphcommerce/ecommerce-ui` from `magento-graphcms` example.

* [#1276](https://github.com/ho-nl/m2-pwa/pull/1276)
  [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2)
  Thanks [@paales](https://github.com/paales)! - We've moved lots of internal packages from
  `dependencies` to `peerDependencies`. The result of this is that there will be significantly less
  duplicate packages in the node_modules folders.

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
  [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d)]:
  - @graphcommerce/next-ui@4.1.1
  - @graphcommerce/react-hook-form@3.0.2
  - @graphcommerce/graphql@3.0.2
