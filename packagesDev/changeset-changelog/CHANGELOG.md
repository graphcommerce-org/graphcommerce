# @graphcommerce/changeset-changelog

## 9.0.0-canary.103

## 6.0.0

### Major Changes

- [#1766](https://github.com/graphcommerce-org/graphcommerce/pull/1766) [`e34169ee2`](https://github.com/graphcommerce-org/graphcommerce/commit/e34169ee2e0fdc052ff589ceca0bc67557584c1f) - Upgraded to Next.js 13

  - NextLink integrates the next/link functionality with @mui/material's Link and ButtonBase (and all it's derivatives) components.
  - NextLink automatically adds `target="_blank"` when the href is external.
  - NextLink makes all relative href absolute. `href="my-page"` will be rendered as `href="/my-page"`. ([@paales](https://github.com/paales))

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

### Patch Changes

- [#1718](https://github.com/graphcommerce-org/graphcommerce/pull/1718) [`7cc186513`](https://github.com/graphcommerce-org/graphcommerce/commit/7cc186513e100eb85856fc194740a279bc6e5605) - Removed the 'Thanks!' from the release notes, make it more subtle ([@paales](https://github.com/paales))

## 0.0.2

### Patch Changes

- [#1716](https://github.com/graphcommerce-org/graphcommerce/pull/1716) [`208d95f75`](https://github.com/graphcommerce-org/graphcommerce/commit/208d95f7574facc42871e400ef201845bd4a7927) Thanks [@github-actions](https://github.com/apps/github-actions)! - Automatically create a new canary release when packages are merged

- [#1716](https://github.com/graphcommerce-org/graphcommerce/pull/1716) [`aaf676f5f`](https://github.com/graphcommerce-org/graphcommerce/commit/aaf676f5f23f38a7349684f6e0f6b5fd8f21ce38) Thanks [@github-actions](https://github.com/apps/github-actions)! - Automerge back to canary

- [#1716](https://github.com/graphcommerce-org/graphcommerce/pull/1716) [`ceaf2831f`](https://github.com/graphcommerce-org/graphcommerce/commit/ceaf2831f0612ed70bc4155c8144ce241a4b1a01) Thanks [@github-actions](https://github.com/apps/github-actions)! - Simplified publishing releases

- [#1716](https://github.com/graphcommerce-org/graphcommerce/pull/1716) [`3477fb699`](https://github.com/graphcommerce-org/graphcommerce/commit/3477fb69951be0cec7aa4f7c21dd9074c747fef9) Thanks [@github-actions](https://github.com/apps/github-actions)! - Automatically commit canary version changes

## 0.0.1

### Patch Changes

- [#1705](https://github.com/graphcommerce-org/graphcommerce/pull/1705) [`51319240f`](https://github.com/graphcommerce-org/graphcommerce/commit/51319240feeda146e718b6e65cafd885549cb61d) Thanks [@paales](https://github.com/paales)! - Bump version

- [#1702](https://github.com/graphcommerce-org/graphcommerce/pull/1702) [`abb15ef4a`](https://github.com/graphcommerce-org/graphcommerce/commit/abb15ef4a79b12eddb32cc006e5d1d31dd06ac2d) Thanks [@paales](https://github.com/paales)! - Added canary releases to GraphCommerce
