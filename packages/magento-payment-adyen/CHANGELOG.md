# @graphcommerce/magento-payment-adyen

## 9.0.0-canary.103

## 9.0.0-canary.80

### Patch Changes

- [#2341](https://github.com/graphcommerce-org/graphcommerce/pull/2341) [`86ecf9a`](https://github.com/graphcommerce-org/graphcommerce/commit/86ecf9a1bb4c48ceabd4944d81483bcd5b990350) - Payment method will now throw an error in onComplete to handle obscure errors ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

## 9.0.0-canary.60

### Patch Changes

- [#2331](https://github.com/graphcommerce-org/graphcommerce/pull/2331) [`702bfc9`](https://github.com/graphcommerce-org/graphcommerce/commit/702bfc93566c9745546988e57988431d5d4d8cb0) - Moved plugins to new format ([@paales](https://github.com/paales))

## 8.1.0-canary.38

### Patch Changes

- [#2305](https://github.com/graphcommerce-org/graphcommerce/pull/2305) [`77e8297`](https://github.com/graphcommerce-org/graphcommerce/commit/77e82976816994336c616208a651cb18ce9ea270) - Fix bug with persist not applying saved changes by moving <FromPersist/> below the form components ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

## 8.0.6-canary.2

### Patch Changes

- [#2234](https://github.com/graphcommerce-org/graphcommerce/pull/2234) [`0767bc4`](https://github.com/graphcommerce-org/graphcommerce/commit/0767bc40f7b596209f24ca4e745ff0441f3275c9) - Upgrade input components to no longer use muiRegister, which improves INP scores ([@FrankHarland](https://github.com/FrankHarland))

- [#2234](https://github.com/graphcommerce-org/graphcommerce/pull/2234) [`530076e`](https://github.com/graphcommerce-org/graphcommerce/commit/530076e3664703cb8b577b7fcf1998a420819f60) - Moved all usages of useFormPersist to the <FormPersist/> component to prevent rerenders. ([@FrankHarland](https://github.com/FrankHarland))

- [#2234](https://github.com/graphcommerce-org/graphcommerce/pull/2234) [`43bd04a`](https://github.com/graphcommerce-org/graphcommerce/commit/43bd04a777c5800cc7e01bee1e123a5aad82f194) - Prevent BillingPage query from rerunning on each mutation ([@FrankHarland](https://github.com/FrankHarland))

## 6.0.0

### Patch Changes

- [#1841](https://github.com/graphcommerce-org/graphcommerce/pull/1841) [`1ff022c4b`](https://github.com/graphcommerce-org/graphcommerce/commit/1ff022c4bd8ad1d9fa8c1760076f003af06ce421) - PaymentMethodUpdated is now @injectable to allow for easier customisation. ([@paales](https://github.com/paales))

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

### Minor Changes

- [#1729](https://github.com/graphcommerce-org/graphcommerce/pull/1729) [`2e68e0560`](https://github.com/graphcommerce-org/graphcommerce/commit/2e68e0560690bbf9bad6dc2b33d6e2ddb16197ce) - Adyen Payment gateway support ([@paales](https://github.com/paales))

### Patch Changes

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`b2d73c726`](https://github.com/graphcommerce-org/graphcommerce/commit/b2d73c726fa123435fa6c54b4e0fd0db2df7c4ab) - Move to <Prev/> instead of <Component/> to call the plugin component ([@paales](https://github.com/paales))

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`be10e8cd1`](https://github.com/graphcommerce-org/graphcommerce/commit/be10e8cd1dce172a914ee9e5f65fdca4d0929fc8) - Migrated payment methods to use the new `onSuccess` method from `PaymentMethodContextProvider` instead of redirecting manually, makes sure the onSuccess method can be used by plugins. ([@paales](https://github.com/paales))

- [#1738](https://github.com/graphcommerce-org/graphcommerce/pull/1738) [`52882a63e`](https://github.com/graphcommerce-org/graphcommerce/commit/52882a63e96c0d3ba9641c3714d288fa4f420c82) - Do not forward the Prev prop in plugins ([@paales](https://github.com/paales))

- [#1738](https://github.com/graphcommerce-org/graphcommerce/pull/1738) [`6171ad02c`](https://github.com/graphcommerce-org/graphcommerce/commit/6171ad02c19782b1e1f0eb00ea25ea6b764250b5) - Added topological sorting to plugins and added ifEnv export to plugins to conditionally load plugins ([@paales](https://github.com/paales))
