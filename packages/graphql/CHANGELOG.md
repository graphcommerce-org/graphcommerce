# Change Log

## 5.1.1

## 5.1.1-canary.1

## 5.1.1-canary.0

## 5.1.0

### Patch Changes

- [#1760](https://github.com/graphcommerce-org/graphcommerce/pull/1760) [`8badc8550`](https://github.com/graphcommerce-org/graphcommerce/commit/8badc8550c402ac7b80c8d3238d313550c28a055) - Updated dependencies ([@paales](https://github.com/paales))

- [#1752](https://github.com/graphcommerce-org/graphcommerce/pull/1752) [`2a6a4d9ec`](https://github.com/graphcommerce-org/graphcommerce/commit/2a6a4d9ecfa1b58a66ba9b9d00016d6feda9aa95) - Updated dependencies to latest versions, except for nextjs; Solve tons of peer dependency issues.

  - Updated the @mui/material package
  - Removed dependencies on react-hook-form-mui and @playwright/test
  - Upgraded dependencies including type-fest and graphql-mesh
  - Solved peer dependency issues ([@paales](https://github.com/paales))

## 5.1.0-canary.11

## 5.1.0-canary.10

### Patch Changes

- [#1760](https://github.com/graphcommerce-org/graphcommerce/pull/1760) [`8badc8550`](https://github.com/graphcommerce-org/graphcommerce/commit/8badc8550c402ac7b80c8d3238d313550c28a055) - Updated dependencies ([@paales](https://github.com/paales))

## 5.1.0-canary.9

## 5.1.0-canary.8

## 5.1.0-canary.7

## 5.1.0-canary.6

## 5.1.0-canary.5

## 5.1.0-canary.4

## 5.1.0-canary.3

### Patch Changes

- [#1752](https://github.com/graphcommerce-org/graphcommerce/pull/1752) [`2a6a4d9ec`](https://github.com/graphcommerce-org/graphcommerce/commit/2a6a4d9ecfa1b58a66ba9b9d00016d6feda9aa95) - Updated dependencies to latest versions, except for nextjs; Solve tons of peer dependency issues.

  - Updated the @mui/material package
  - Removed dependencies on react-hook-form-mui and @playwright/test
  - Upgraded dependencies including type-fest and graphql-mesh
  - Solved peer dependency issues ([@paales](https://github.com/paales))

## 5.1.0-canary.2

## 5.1.0-canary.1

## 5.1.0-canary.0

## 5.0.0

### Major Changes

- [#1734](https://github.com/graphcommerce-org/graphcommerce/pull/1734) [`e4c7fe17e`](https://github.com/graphcommerce-org/graphcommerce/commit/e4c7fe17e413e37362ceae92e67f1b3a5f62d398) - Bump major version of all packages ([@github-actions](https://github.com/apps/github-actions))

### Minor Changes

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`761bd2832`](https://github.com/graphcommerce-org/graphcommerce/commit/761bd2832f115afc8b95bedbf479266309dd5acc) - ApolloLinks, typePolicies and migration scripts are now handled with plugins on the new library component `<GraphQLProvider/>`. Hygraph's, Magento Cart, Customer, Store, Wishlist and Magento GraphQL are all migrated to be using plugins.

  If you are using custom `links` / `policies` / `migrations` you can pass them as props to the `<GraphQLProvider/>` or create your own local plugin. ([@paales](https://github.com/paales))

## 5.0.0-canary.14

## 5.0.0-canary.9

### Major Changes

- [`e4c7fe17e`](https://github.com/graphcommerce-org/graphcommerce/commit/e4c7fe17e413e37362ceae92e67f1b3a5f62d398) - Bump major version of all packages ([@paales](https://github.com/paales))

## 4.31.0-canary.8

## 4.31.0-canary.7

## 4.31.0-canary.6

## 4.31.0-canary.5

## 4.31.0-canary.4

## 4.31.0-canary.3

### Minor Changes

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`761bd2832`](https://github.com/graphcommerce-org/graphcommerce/commit/761bd2832f115afc8b95bedbf479266309dd5acc) - ApolloLinks, typePolicies and migration scripts are now handled with plugins on the new library component `<GraphQLProvider/>`. Hygraph's, Magento Cart, Customer, Store, Wishlist and Magento GraphQL are all migrated to be using plugins.

  If you are using custom `links` / `policies` / `migrations` you can pass them as props to the `<GraphQLProvider/>` or create your own local plugin. ([@paales](https://github.com/paales))

## 4.31.0-canary.2

## 4.31.0-canary.1

## 4.31.0-canary.0

## 4.30.2

## 4.30.1

## 4.30.0

### Patch Changes

- [#1702](https://github.com/graphcommerce-org/graphcommerce/pull/1702) [`abb15ef4a`](https://github.com/graphcommerce-org/graphcommerce/commit/abb15ef4a79b12eddb32cc006e5d1d31dd06ac2d) Thanks [@paales](https://github.com/paales)! - Added canary releases to GraphCommerce

## 4.30.0-canary.1

### Patch Changes

- [`abb15ef4a`](https://github.com/graphcommerce-org/graphcommerce/commit/abb15ef4a79b12eddb32cc006e5d1d31dd06ac2d) Thanks [@paales](https://github.com/paales)! - Added canary releases to GraphCommerce

## 4.30.0-canary.0

## 3.5.0

### Minor Changes

- [#1670](https://github.com/graphcommerce-org/graphcommerce/pull/1670) [`8a34f8081`](https://github.com/graphcommerce-org/graphcommerce/commit/8a34f808186274a6fe1d4f309472f1a9c6d00efd) Thanks [@Jessevdpoel](https://github.com/Jessevdpoel)! - Added cache resetting when token expires and logging in with a different account than cached.

### Patch Changes

- [#1675](https://github.com/graphcommerce-org/graphcommerce/pull/1675) [`cf3518499`](https://github.com/graphcommerce-org/graphcommerce/commit/cf351849999ad6fe73ce2bb258098a7dd301d517) Thanks [@paales](https://github.com/paales)! - ApolloClient is not persisted to localStorage before we restore from localStorage. Fixes a race condition where the current cartId wasn't persisted.

- [#1675](https://github.com/graphcommerce-org/graphcommerce/pull/1675) [`1b1504c9b`](https://github.com/graphcommerce-org/graphcommerce/commit/1b1504c9b0e51f2787bce91e1ff1940f540411d6) Thanks [@paales](https://github.com/paales)! - Added crosssel functionality

## 3.4.8

### Patch Changes

- [#1622](https://github.com/graphcommerce-org/graphcommerce/pull/1622) [`396b5de5d`](https://github.com/graphcommerce-org/graphcommerce/commit/396b5de5d50c7b8f59bf636807e7a4b50f14e0b2) Thanks [@paales](https://github.com/paales)! - Make sure the measurePerformanceLink only gets included on the server and flush the current timings.

## 3.4.7

### Patch Changes

- Updated dependencies [[`860b4afc0`](https://github.com/graphcommerce-org/graphcommerce/commit/860b4afc0a2f79b1e660a5f9ce204532ce4fca47)]:
  - @graphcommerce/graphql-codegen-near-operation-file@3.0.18

## 3.4.6

### Patch Changes

- [#1598](https://github.com/graphcommerce-org/graphcommerce/pull/1598) [`707dbc73d`](https://github.com/graphcommerce-org/graphcommerce/commit/707dbc73d181204d88fdbbd2e09340e25b2b5f7b) Thanks [@paales](https://github.com/paales)! - Upgraded dependencies

- Updated dependencies [[`707dbc73d`](https://github.com/graphcommerce-org/graphcommerce/commit/707dbc73d181204d88fdbbd2e09340e25b2b5f7b)]:
  - @graphcommerce/graphql-codegen-near-operation-file@3.0.17
  - @graphcommerce/graphql-codegen-relay-optimizer-plugin@3.0.10

## 3.4.5

### Patch Changes

- [#1587](https://github.com/graphcommerce-org/graphcommerce/pull/1587) [`6ce2cbaf2`](https://github.com/graphcommerce-org/graphcommerce/commit/6ce2cbaf2cf27e21b753f7cb71e7e74826294de6) Thanks [@paales](https://github.com/paales)! - Apollo client cache is restored during development when it has encountered a runtime error

## 3.4.4

### Patch Changes

- [#1578](https://github.com/graphcommerce-org/graphcommerce/pull/1578) [`49370878a`](https://github.com/graphcommerce-org/graphcommerce/commit/49370878a48b90a4579026a7c56c54f97840cebb) Thanks [@paales](https://github.com/paales)! - Apollo client cache is restored during development when it has encountered a runtime error

## 3.4.3

### Patch Changes

- [#1562](https://github.com/graphcommerce-org/graphcommerce/pull/1562) [`01f1588c9`](https://github.com/graphcommerce-org/graphcommerce/commit/01f1588c9200bb39dd61146e260bfa2b32060612) Thanks [@paales](https://github.com/paales)! - The context was missing in apollo client

- Updated dependencies [[`475d23197`](https://github.com/graphcommerce-org/graphcommerce/commit/475d23197a6ce4b08cc325f872834ca592aa28dc)]:
  - @graphcommerce/graphql-codegen-near-operation-file@3.0.16

## 3.4.2

### Patch Changes

- [#1553](https://github.com/graphcommerce-org/graphcommerce/pull/1553) [`1afc6a547`](https://github.com/graphcommerce-org/graphcommerce/commit/1afc6a5473d6e31f47b5d0188801803b31865290) Thanks [@NickdeK](https://github.com/NickdeK)! - Remove unused useClientQuery

## 3.4.1

### Patch Changes

- [#1552](https://github.com/graphcommerce-org/graphcommerce/pull/1552) [`18054c441`](https://github.com/graphcommerce-org/graphcommerce/commit/18054c441962ba750bed3acc39ab46c8d3a341ce) Thanks [@paales](https://github.com/paales)! - Updated to Next.js v12.2.2 and other packages and made compatible

- Updated dependencies [[`18054c441`](https://github.com/graphcommerce-org/graphcommerce/commit/18054c441962ba750bed3acc39ab46c8d3a341ce)]:
  - @graphcommerce/graphql-codegen-near-operation-file@3.0.15
  - @graphcommerce/graphql-codegen-relay-optimizer-plugin@3.0.9

## 3.4.0

### Minor Changes

- [#1544](https://github.com/graphcommerce-org/graphcommerce/pull/1544) [`5f927ebdc`](https://github.com/graphcommerce-org/graphcommerce/commit/5f927ebdc6f0331833e02b96e4f169bfe475ac6b) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - Fixed hydration errors on account, cart and wishlist

## 3.3.0

### Minor Changes

- [#1524](https://github.com/graphcommerce-org/graphcommerce/pull/1524) [`735b78672`](https://github.com/graphcommerce-org/graphcommerce/commit/735b786724d5401cbe6e88f2515e121a1a0945b2) Thanks [@paales](https://github.com/paales)! - Add errorLink while in development mode to allow for better error reporting when sending faulty queries to backends

## 3.2.1

### Patch Changes

- [#1490](https://github.com/graphcommerce-org/graphcommerce/pull/1490) [`d311ef48b`](https://github.com/graphcommerce-org/graphcommerce/commit/d311ef48bb3e97806d992af5516d6b7f183ec9cb) Thanks [@paales](https://github.com/paales)! - upgraded packages

- Updated dependencies [[`d311ef48b`](https://github.com/graphcommerce-org/graphcommerce/commit/d311ef48bb3e97806d992af5516d6b7f183ec9cb)]:
  - @graphcommerce/graphql-codegen-near-operation-file@3.0.14
  - @graphcommerce/graphql-codegen-relay-optimizer-plugin@3.0.8

## 3.2.0

### Minor Changes

- [#1492](https://github.com/graphcommerce-org/graphcommerce/pull/1492) [`bed806ddd`](https://github.com/graphcommerce-org/graphcommerce/commit/bed806dddd7e025806a69798ef9587aa165d392f) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - Removed useExtractCustomerErrors hook and implemented error handling via HttpLink Error

## 3.1.3

### Patch Changes

- Updated dependencies [[`50188e378`](https://github.com/graphcommerce-org/graphcommerce/commit/50188e378b4c77561ebc600958ea11cd114fa61a)]:
  - @graphcommerce/graphql-codegen-near-operation-file@3.0.13

## 3.1.2

### Patch Changes

- [#1439](https://github.com/graphcommerce-org/graphcommerce/pull/1439) [`25ef6cf08`](https://github.com/graphcommerce-org/graphcommerce/commit/25ef6cf08c278105307d6f604b7135d637e9046c) Thanks [@paales](https://github.com/paales)! - Updated dependencies

* [#1432](https://github.com/graphcommerce-org/graphcommerce/pull/1432) [`80e30bb77`](https://github.com/graphcommerce-org/graphcommerce/commit/80e30bb77015755fbc00a7935d590f80c1c1c18c) Thanks [@paales](https://github.com/paales)! - Updated translations

* Updated dependencies [[`25ef6cf08`](https://github.com/graphcommerce-org/graphcommerce/commit/25ef6cf08c278105307d6f604b7135d637e9046c)]:
  - @graphcommerce/graphql-codegen-near-operation-file@3.0.12

## 3.1.1

### Patch Changes

- [#1426](https://github.com/graphcommerce-org/graphcommerce/pull/1426) [`100f4c38c`](https://github.com/graphcommerce-org/graphcommerce/commit/100f4c38c8fcda4bc6e0425e38028b550b60adc2) Thanks [@paales](https://github.com/paales)! - Upgrade packages

- Updated dependencies [[`100f4c38c`](https://github.com/graphcommerce-org/graphcommerce/commit/100f4c38c8fcda4bc6e0425e38028b550b60adc2)]:
  - @graphcommerce/graphql-codegen-near-operation-file@3.0.11
  - @graphcommerce/graphql-codegen-relay-optimizer-plugin@3.0.7

## 3.1.0

### Minor Changes

- [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542) Thanks [@paales](https://github.com/paales)! - Now using [@graphql-yoga](https://github.com/dotansimha/graphql-yoga) for GraphQL which has full support for [envelop](https://www.envelop.dev/) plugins.

* [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542) Thanks [@paales](https://github.com/paales)! - Added a new @graphcommerce/cli package to generate the mesh so it can be generated _inside_ the @graphcommerce/graphql-mesh package to allow for better future extensibility.

### Patch Changes

- [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`da0ae7d02`](https://github.com/graphcommerce-org/graphcommerce/commit/da0ae7d0236e4908ba0bf0fa16656be516e841d4) Thanks [@paales](https://github.com/paales)! - Updated dependencies

- Updated dependencies [[`da0ae7d02`](https://github.com/graphcommerce-org/graphcommerce/commit/da0ae7d0236e4908ba0bf0fa16656be516e841d4)]:
  - @graphcommerce/graphql-codegen-near-operation-file@3.0.10

## 3.0.7

### Patch Changes

- [#1378](https://github.com/graphcommerce-org/graphcommerce/pull/1378) [`b610a6e40`](https://github.com/graphcommerce-org/graphcommerce/commit/b610a6e4049e8c9e8b5d2aeff31b8e1bfc24abe5) Thanks [@paales](https://github.com/paales)! - Pin all versions internally so we can’t end up in an unfixable state for the user

## 3.0.6

### Patch Changes

- [#1368](https://github.com/graphcommerce-org/graphcommerce/pull/1368) [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a) Thanks [@paales](https://github.com/paales)! - playwright waitForGraphQlResponse shouldn’t crash on non-graphql responses

* [#1369](https://github.com/graphcommerce-org/graphcommerce/pull/1369) [`ae6449502`](https://github.com/graphcommerce-org/graphcommerce/commit/ae64495024a455bbe5188588604368c1542840c9) Thanks [@paales](https://github.com/paales)! - Upgraded dependencies

- [#1368](https://github.com/graphcommerce-org/graphcommerce/pull/1368) [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a) Thanks [@paales](https://github.com/paales)! - Do not recreate client cache when initialized once, fixes issue where the localStorage wasn't updated yet when a new page is loaded.

- Updated dependencies [[`ae6449502`](https://github.com/graphcommerce-org/graphcommerce/commit/ae64495024a455bbe5188588604368c1542840c9)]:
  - @graphcommerce/graphql-codegen-near-operation-file@3.0.9
  - @graphcommerce/graphql-codegen-relay-optimizer-plugin@3.0.6

## 3.0.5

### Patch Changes

- [#1341](https://github.com/graphcommerce-org/graphcommerce/pull/1341) [`2e29c5852`](https://github.com/graphcommerce-org/graphcommerce/commit/2e29c585247d356e3027be92beb7815f2070c855) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

- Updated dependencies [[`2e29c5852`](https://github.com/graphcommerce-org/graphcommerce/commit/2e29c585247d356e3027be92beb7815f2070c855)]:
  - @graphcommerce/graphql-codegen-near-operation-file@3.0.7

## 3.0.4

### Patch Changes

- [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655) Thanks [@paales](https://github.com/paales)! - All default exports are now named exports internally and all `index.tsx` are renamed to the component name.

* [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

* Updated dependencies [[`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655), [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef)]:
  - @graphcommerce/graphql-codegen-near-operation-file@3.0.5
  - @graphcommerce/graphql-codegen-relay-optimizer-plugin@3.0.5

## 3.0.3

### Patch Changes

- [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96) Thanks [@paales](https://github.com/paales)! - made packages public

- Updated dependencies [[`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96)]:
  - @graphcommerce/graphql-codegen-near-operation-file@3.0.3
  - @graphcommerce/graphql-codegen-relay-optimizer-plugin@3.0.3

## 3.0.2

### Patch Changes

- [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2) Thanks [@paales](https://github.com/paales)! - We've moved lots of internal packages from `dependencies` to `peerDependencies`. The result of this is that there will be significantly less duplicate packages in the node_modules folders.

* [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d) Thanks [@paales](https://github.com/paales)! - Upgraded to [NextJS 12.1](https://nextjs.org/blog/next-12-1)! This is just for compatibility, but we'll be implementing [On-demand Incremental Static Regeneration](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta) soon.

  This will greatly reduce the requirement to rebuid stuff and we'll add a management UI on the frontend to be able to revalidate pages manually.

* Updated dependencies [[`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2), [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d)]:
  - @graphcommerce/graphql-codegen-near-operation-file@3.0.2
  - @graphcommerce/graphql-codegen-relay-optimizer-plugin@3.0.2

## 3.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514) Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files, so that the packages link to back to the website and repository
- Updated dependencies [[`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514)]:
  - @graphcommerce/graphql-codegen-near-operation-file@3.0.1
  - @graphcommerce/graphql-codegen-relay-optimizer-plugin@3.0.1

## 3.0.0

### Major Changes

- [#1258](https://github.com/ho-nl/m2-pwa/pull/1258) [`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05) Thanks [@paales](https://github.com/paales)! - Upgraded to Material UI 5

### Patch Changes

- Updated dependencies [[`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05)]:
  - @graphcommerce/graphql-codegen-near-operation-file@3.0.0
  - @graphcommerce/graphql-codegen-relay-optimizer-plugin@3.0.0

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.105.12](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql@2.105.11...@graphcommerce/graphql@2.105.12) (2021-12-21)

### Bug Fixes

- **graphql:** make sure we're passing the correct store code to the schema endpoint ([39753f2](https://github.com/ho-nl/m2-pwa/commit/39753f2117ce7ba79dab035c4134e642829e7f18))

## [2.105.6](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql@2.105.5...@graphcommerce/graphql@2.105.6) (2021-12-03)

### Bug Fixes

- make the headerHeight properly configurable ([c39c942](https://github.com/ho-nl/m2-pwa/commit/c39c942a62a9bb9687ea553be28e37fb49a6b065))

# [2.105.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql@2.104.1...@graphcommerce/graphql@2.105.0) (2021-10-27)

### Features

- **nextjs:** upgraded to nextjs 12 ([9331bc8](https://github.com/ho-nl/m2-pwa/commit/9331bc801f6419522115cc47d291d49d608d5a90))

# [2.104.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql@2.103.8...@graphcommerce/graphql@2.104.0) (2021-10-21)

### Features

- **graphql-mesh:** remove the api project and use a single project 🎉👩‍👩‍👦‍👦 ([ea4ad03](https://github.com/ho-nl/m2-pwa/commit/ea4ad0397d4ff289ef3b3253593fb0914c8c5246))

## [2.103.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql@2.103.0...@graphcommerce/graphql@2.103.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/graphql

# 2.103.0 (2021-09-27)

### Bug Fixes

- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))

### Features

- **graphql:** introduced new graphql package that holds all generated files ([a3e7aa0](https://github.com/ho-nl/m2-pwa/commit/a3e7aa05540540533b5ced9a95f1f802ecbe499f))
- **graphql:** introducing local schema migrations ([e77ef8a](https://github.com/ho-nl/m2-pwa/commit/e77ef8ad4cd5723e2352dec937b45ee976929b24))
- next.js 11 ([7d61407](https://github.com/ho-nl/m2-pwa/commit/7d614075a778f488045034f74be4f75b93f63c43))
- **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of [@reachdigital](https://github.com/reachdigital) ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

### Reverts

- Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

# Change Log

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql@2.101.3...@graphcommerce/graphql@2.102.0) (2021-08-12)

### Features

- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.101.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql@2.101.2...@graphcommerce/graphql@2.101.3) (2021-08-09)

### Reverts

- Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphql@2.100.10...@graphcommerce/graphql@2.101.0) (2021-07-26)

### Bug Fixes

- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))

### Features

- **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
