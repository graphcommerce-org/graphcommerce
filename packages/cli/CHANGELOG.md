# @graphcommerce/cli

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
