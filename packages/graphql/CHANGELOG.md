# Change Log

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
