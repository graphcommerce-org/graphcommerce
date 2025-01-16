# @graphcommerce/cli

## 9.0.4-canary.7

## 9.0.4-canary.6

## 9.0.4-canary.5

## 9.0.4-canary.4

## 9.0.4-canary.3

## 9.0.4-canary.2

## 9.0.4-canary.1

## 9.0.4-canary.0

## 9.0.0

### Minor Changes

- [#2309](https://github.com/graphcommerce-org/graphcommerce/pull/2309) [`b46e17e`](https://github.com/graphcommerce-org/graphcommerce/commit/b46e17ebe390b4d0040639dfdac33c36a60576ac) - When generating the mesh the configuration is passed through `@graphcommerce/graphql-mesh/meshConfig` allowing plugins to modify the mesh configuration without having to change the `.meshrc.yaml` itself. ([@Renzovh](https://github.com/Renzovh))

### Patch Changes

- [`44ea147`](https://github.com/graphcommerce-org/graphcommerce/commit/44ea1474d1429d05f535df903beb1fb2c0ca7754) - Added missing tsx package ([@paales](https://github.com/paales))

- [#2345](https://github.com/graphcommerce-org/graphcommerce/pull/2345) [`d4ae30b`](https://github.com/graphcommerce-org/graphcommerce/commit/d4ae30ba28815ccb9d3a0478da995b7c609618e5) - Solve issue where `customFetch` couldn't be loaded correctly. ([@paales](https://github.com/paales))

- [`6184a28`](https://github.com/graphcommerce-org/graphcommerce/commit/6184a28b2ba2dc70189a9b881887696dc0a346c8) - Fixed issue where codegen would throw an error: SyntaxError: Cannot use import statement outside a module. ([@paales](https://github.com/paales))

- [#2421](https://github.com/graphcommerce-org/graphcommerce/pull/2421) [`d500643`](https://github.com/graphcommerce-org/graphcommerce/commit/d500643138799b6db1610cb10a1d065d6219d8ea) - Resolve peer dependency issues so we get a clean install ([@paales](https://github.com/paales))

- [#2247](https://github.com/graphcommerce-org/graphcommerce/pull/2247) [`cfc0f4e`](https://github.com/graphcommerce-org/graphcommerce/commit/cfc0f4e015f3b3a7348b882eb7440222b3e26a07) - Make sure the interceptors are generated before the typecheck is ran. ([@paales](https://github.com/paales))

- [#2365](https://github.com/graphcommerce-org/graphcommerce/pull/2365) [`ee32793`](https://github.com/graphcommerce-org/graphcommerce/commit/ee32793c5e8e7233b4452219e148ebb85600a652) - The mesh would always include all graphqls files even though they aren't necessary for Magento 2.4.7 ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

## 7.0.1

### Patch Changes

- [#2047](https://github.com/graphcommerce-org/graphcommerce/pull/2047) [`136580b39`](https://github.com/graphcommerce-org/graphcommerce/commit/136580b39e3cffdd07e3fa087e049bd532c3e8f1) - Updated all dependencies to the latest version where possible. ([@paales](https://github.com/paales))

## 7.0.0

### Major Changes

- [#1912](https://github.com/graphcommerce-org/graphcommerce/pull/1912) [`a43d389e9`](https://github.com/graphcommerce-org/graphcommerce/commit/a43d389e956fe69b73238b12c98c781b7044e4bb) - Added dynamic rows feature ([@JoshuaS98](https://github.com/JoshuaS98))

### Patch Changes

- [#1960](https://github.com/graphcommerce-org/graphcommerce/pull/1960) [`f78caf5a8`](https://github.com/graphcommerce-org/graphcommerce/commit/f78caf5a83683f1ae4b901fb94bd22d50943fa2f) - Updated packages: `next`, `@apollo/client`, `react-hook-form`, `@emotion/*`, `@lingui/*`, `@mui/*` and various others. ([@paales](https://github.com/paales))

- [#2034](https://github.com/graphcommerce-org/graphcommerce/pull/2034) [`6fca47484`](https://github.com/graphcommerce-org/graphcommerce/commit/6fca474847fe52f004a6ac0abbd88492512b46ad) - Pre-resolve the customFetch in mesh config, so that it works with the new mesh version. ([@paales](https://github.com/paales))

- [#2012](https://github.com/graphcommerce-org/graphcommerce/pull/2012) [`1dbb3ae13`](https://github.com/graphcommerce-org/graphcommerce/commit/1dbb3ae13553992ee1ed77f375375560f28c418c) - Upgrade graphql to 16.7.1, add graphql as peer dependency ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

- [#1924](https://github.com/graphcommerce-org/graphcommerce/pull/1924) [`04581f619`](https://github.com/graphcommerce-org/graphcommerce/commit/04581f619c609f2f6ca5268ee5effb6a1db3f0eb) - Use the latest branch from graphql-mesh so that all versions are in sync ([@paales](https://github.com/paales))

- [#1960](https://github.com/graphcommerce-org/graphcommerce/pull/1960) [`86e14569b`](https://github.com/graphcommerce-org/graphcommerce/commit/86e14569b1f68f73be7f93b614e36b382c5debff) - Updated to the latest release of GraphQL codegen and solve compatibility issues with our own generator ([@paales](https://github.com/paales))

- [`48f4f5cbd`](https://github.com/graphcommerce-org/graphcommerce/commit/48f4f5cbd07bbc08e1bf58cabc0e0230b2bd78bc) - Peer dependency warnings reduced ([@paales](https://github.com/paales))

- [#1982](https://github.com/graphcommerce-org/graphcommerce/pull/1982) [`e1fab2f6d`](https://github.com/graphcommerce-org/graphcommerce/commit/e1fab2f6d8f57d0488d8a915596d5c19cb7718e6) - Better detection what the package roots are when a custom node_modules directory is used ([@paales](https://github.com/paales))

## 6.0.0

### Patch Changes

- [#1821](https://github.com/graphcommerce-org/graphcommerce/pull/1821) [`1abc50a21`](https://github.com/graphcommerce-org/graphcommerce/commit/1abc50a21103270fad04e4a9ea892ee1e75233e9) - Upgrade packages to latest version ([@paales](https://github.com/paales))

## 5.1.1

### Patch Changes

- [#1764](https://github.com/graphcommerce-org/graphcommerce/pull/1764) [`5829ffc73`](https://github.com/graphcommerce-org/graphcommerce/commit/5829ffc732c6aea95da53314722385a2c0edce85) - Update dependencies ([@paales](https://github.com/paales))

## 5.1.0

### Patch Changes

- [#1760](https://github.com/graphcommerce-org/graphcommerce/pull/1760) [`8badc8550`](https://github.com/graphcommerce-org/graphcommerce/commit/8badc8550c402ac7b80c8d3238d313550c28a055) - Updated dependencies ([@paales](https://github.com/paales))

- [#1752](https://github.com/graphcommerce-org/graphcommerce/pull/1752) [`188f23452`](https://github.com/graphcommerce-org/graphcommerce/commit/188f2345255aacd7665d8e443cf42e20a3070a01) - Implement a custom fetch that has an exponential backoff so that build don’t fail as often ([@paales](https://github.com/paales))

- [#1752](https://github.com/graphcommerce-org/graphcommerce/pull/1752) [`2a6a4d9ec`](https://github.com/graphcommerce-org/graphcommerce/commit/2a6a4d9ecfa1b58a66ba9b9d00016d6feda9aa95) - Updated dependencies to latest versions, except for nextjs; Solve tons of peer dependency issues.

  - Updated the @mui/material package
  - Removed dependencies on react-hook-form-mui and @playwright/test
  - Upgraded dependencies including type-fest and graphql-mesh
  - Solved peer dependency issues ([@paales](https://github.com/paales))

- [#1755](https://github.com/graphcommerce-org/graphcommerce/pull/1755) [`b34c7b43a`](https://github.com/graphcommerce-org/graphcommerce/commit/b34c7b43a6e1338152e77f6f8427c3fe559021c5) - Disabled @typescript-eslint/no-unbound-method and fixed various eslint errors ([@paales](https://github.com/paales))

- [#1755](https://github.com/graphcommerce-org/graphcommerce/pull/1755) [`053ef07d0`](https://github.com/graphcommerce-org/graphcommerce/commit/053ef07d0acf25fba840b50f3ad56746fc97d6a2) - Add [httpDetailsExtensions](https://the-guild.dev/graphql/mesh/docs/plugins/http-details-extensions) plugin to the mesh for a better debugging experience. ([@paales](https://github.com/paales))

## 5.0.0

### Major Changes

- [#1734](https://github.com/graphcommerce-org/graphcommerce/pull/1734) [`e4c7fe17e`](https://github.com/graphcommerce-org/graphcommerce/commit/e4c7fe17e413e37362ceae92e67f1b3a5f62d398) - Bump major version of all packages ([@github-actions](https://github.com/apps/github-actions))

### Patch Changes

- [#1718](https://github.com/graphcommerce-org/graphcommerce/pull/1718) [`f218e533b`](https://github.com/graphcommerce-org/graphcommerce/commit/f218e533bd7abfc6c949cdf380df0d166f89e145) - Make the tmp file to \_tmp_mesh instead of \_tmp_codegen ([@paales](https://github.com/paales))

- [#1738](https://github.com/graphcommerce-org/graphcommerce/pull/1738) [`bd3a30438`](https://github.com/graphcommerce-org/graphcommerce/commit/bd3a30438cf6b69cd37a191406c8190a20e572cc) - Created directive @env(if: String!) on FRAGMENT_DEFINITION to conditionally include a fragment ([@paales](https://github.com/paales))

## 4.30.2

### Patch Changes

- [#1726](https://github.com/graphcommerce-org/graphcommerce/pull/1726) [`6dde81d8c`](https://github.com/graphcommerce-org/graphcommerce/commit/6dde81d8c04730847c4c171cfac6ef0cf10d9929) Thanks [@paales](https://github.com/paales)! - When starting the dev server it would delete all .gql.ts files causing an error when starting

## 4.30.0

### Minor Changes

- [#1613](https://github.com/graphcommerce-org/graphcommerce/pull/1613) [`1ef81efa2`](https://github.com/graphcommerce-org/graphcommerce/commit/1ef81efa238b2e79312ab35c6829abec266e4ad1) Thanks [@paales](https://github.com/paales)! - All codegen files that need to be scanned will be handled by a new resolveDependenciesSync method

- [#1613](https://github.com/graphcommerce-org/graphcommerce/pull/1613) [`da20e4e72`](https://github.com/graphcommerce-org/graphcommerce/commit/da20e4e72ca3f29216592e0ecfb59c0e44bcbe20) Thanks [@paales](https://github.com/paales)! - Created an is-monorepo command to exectute scripts based if they are in the monorepo or in a project

### Patch Changes

- [#1613](https://github.com/graphcommerce-org/graphcommerce/pull/1613) [`6c1c69ca4`](https://github.com/graphcommerce-org/graphcommerce/commit/6c1c69ca45ea1c8737cc7dcdc341fe5d825ed380) Thanks [@paales](https://github.com/paales)! - Refactor next-config to also use the new resolveDependenciesSync by exposing withGraphCommerce

- [#1702](https://github.com/graphcommerce-org/graphcommerce/pull/1702) [`abb15ef4a`](https://github.com/graphcommerce-org/graphcommerce/commit/abb15ef4a79b12eddb32cc006e5d1d31dd06ac2d) Thanks [@paales](https://github.com/paales)! - Added canary releases to GraphCommerce

## 1.0.10

### Patch Changes

- [#1614](https://github.com/graphcommerce-org/graphcommerce/pull/1614) [`448c77681`](https://github.com/graphcommerce-org/graphcommerce/commit/448c77681f9a7794e84ec93139d7e0f16afafbd9) Thanks [@paales](https://github.com/paales)! - Update mesh versions

## 1.0.9

### Patch Changes

- [#1607](https://github.com/graphcommerce-org/graphcommerce/pull/1607) [`b7009c3eb`](https://github.com/graphcommerce-org/graphcommerce/commit/b7009c3ebf4e4062eeaa00eaae8d572725d3eeb1) Thanks [@paales](https://github.com/paales)! - Add proper exit code to codegen

## 1.0.8

### Patch Changes

- [#1598](https://github.com/graphcommerce-org/graphcommerce/pull/1598) [`707dbc73d`](https://github.com/graphcommerce-org/graphcommerce/commit/707dbc73d181204d88fdbbd2e09340e25b2b5f7b) Thanks [@paales](https://github.com/paales)! - Upgraded dependencies

## 1.0.7

### Patch Changes

- [#1562](https://github.com/graphcommerce-org/graphcommerce/pull/1562) [`01f1588c9`](https://github.com/graphcommerce-org/graphcommerce/commit/01f1588c9200bb39dd61146e260bfa2b32060612) Thanks [@paales](https://github.com/paales)! - The context was missing in apollo client

* [#1501](https://github.com/graphcommerce-org/graphcommerce/pull/1501) [`475d23197`](https://github.com/graphcommerce-org/graphcommerce/commit/475d23197a6ce4b08cc325f872834ca592aa28dc) Thanks [@paales](https://github.com/paales)! - Native windows support added: Directory separator differences and package.json interpretation differences

## 1.0.6

### Patch Changes

- [#1552](https://github.com/graphcommerce-org/graphcommerce/pull/1552) [`18054c441`](https://github.com/graphcommerce-org/graphcommerce/commit/18054c441962ba750bed3acc39ab46c8d3a341ce) Thanks [@paales](https://github.com/paales)! - Updated to Next.js v12.2.2 and other packages and made compatible

## 1.0.5

### Patch Changes

- [#1490](https://github.com/graphcommerce-org/graphcommerce/pull/1490) [`d311ef48b`](https://github.com/graphcommerce-org/graphcommerce/commit/d311ef48bb3e97806d992af5516d6b7f183ec9cb) Thanks [@paales](https://github.com/paales)! - upgraded packages

## 1.0.4

### Patch Changes

- [#1439](https://github.com/graphcommerce-org/graphcommerce/pull/1439) [`25ef6cf08`](https://github.com/graphcommerce-org/graphcommerce/commit/25ef6cf08c278105307d6f604b7135d637e9046c) Thanks [@paales](https://github.com/paales)! - Updated dependencies

## 1.0.3

### Patch Changes

- [#1429](https://github.com/graphcommerce-org/graphcommerce/pull/1429) [`ba8cd4d34`](https://github.com/graphcommerce-org/graphcommerce/commit/ba8cd4d3480a7ec7e555b051cfd0fbc809c7aa12) Thanks [@paales](https://github.com/paales)! - mesh couldn’t be generated properly in a non-monorepo setup

## 1.0.2

### Patch Changes

- [#1394](https://github.com/graphcommerce-org/graphcommerce/pull/1394) [`b6b8bb5b3`](https://github.com/graphcommerce-org/graphcommerce/commit/b6b8bb5b31b0891ea24733de34a3bd5c0a9604e4) Thanks [@paales](https://github.com/paales)! - Added support for additionalTypeResolvers to be loaded from packages

* [#1426](https://github.com/graphcommerce-org/graphcommerce/pull/1426) [`100f4c38c`](https://github.com/graphcommerce-org/graphcommerce/commit/100f4c38c8fcda4bc6e0425e38028b550b60adc2) Thanks [@paales](https://github.com/paales)! - Upgrade packages

- [#1427](https://github.com/graphcommerce-org/graphcommerce/pull/1427) [`cbbbcab55`](https://github.com/graphcommerce-org/graphcommerce/commit/cbbbcab55bfccff95e779fd18a49412127adcd78) Thanks [@paales](https://github.com/paales)! - Change mesh generation strategy where mesh paths could't be found when using the mock store

## 1.0.1

### Patch Changes

- [#1414](https://github.com/graphcommerce-org/graphcommerce/pull/1414) [`be3467b41`](https://github.com/graphcommerce-org/graphcommerce/commit/be3467b4179aca333f3be653673458ad5f59277f) Thanks [@paales](https://github.com/paales)! - Fixed an error when running yarn codegen: Unable to find any GraphQL type definitions for the following pointers

## 1.0.0

### Major Changes

- [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542) Thanks [@paales](https://github.com/paales)! - Now using [@graphql-yoga](https://github.com/dotansimha/graphql-yoga) for GraphQL which has full support for [envelop](https://www.envelop.dev/) plugins.

* [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542) Thanks [@paales](https://github.com/paales)! - Added a new @graphcommerce/cli package to generate the mesh so it can be generated _inside_ the @graphcommerce/graphql-mesh package to allow for better future extensibility.

### Patch Changes

- [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`da0ae7d02`](https://github.com/graphcommerce-org/graphcommerce/commit/da0ae7d0236e4908ba0bf0fa16656be516e841d4) Thanks [@paales](https://github.com/paales)! - Updated dependencies
