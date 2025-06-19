# @graphcommerce/magento-payment-multisafepay

## 9.1.0-canary.42

## 9.1.0-canary.41

## 9.1.0-canary.40

## 9.1.0-canary.39

## 9.1.0-canary.38

## 9.1.0-canary.37

## 9.1.0-canary.36

## 9.1.0-canary.35

## 9.1.0-canary.34

## 9.1.0-canary.33

## 9.1.0-canary.32

## 9.1.0-canary.31

## 9.1.0-canary.30

## 9.1.0-canary.29

## 9.1.0-canary.28

## 9.1.0-canary.27

## 9.1.0-canary.26

## 9.1.0-canary.25

## 9.1.0-canary.24

## 9.1.0-canary.23

## 9.1.0-canary.22

## 9.1.0-canary.21

## 9.1.0-canary.20

## 9.1.0-canary.19

## 9.1.0-canary.18

## 9.1.0-canary.17

## 9.1.0-canary.16

## 9.1.0-canary.15

## 9.0.4-canary.14

### Patch Changes

- [#2495](https://github.com/graphcommerce-org/graphcommerce/pull/2495) [`cd386e3`](https://github.com/graphcommerce-org/graphcommerce/commit/cd386e3bce61256bab46cca88aacc7c4aa4ac415) - Remove issuers field from MultiSafePay in preparation for iDeal 2. Please not that this change requires an upgrade to the Magento module as well. ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

- [#2495](https://github.com/graphcommerce-org/graphcommerce/pull/2495) [`0fc9805`](https://github.com/graphcommerce-org/graphcommerce/commit/0fc98051b87cd7fc0363609b50211d2d7382a84d) - Remove issuer list from ideal payment method ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

## 9.0.4-canary.13

## 9.0.4-canary.12

## 9.0.4-canary.11

## 9.0.4-canary.10

## 9.0.4-canary.9

## 9.0.4-canary.8

## 9.0.4-canary.7

## 9.0.4-canary.6

## 9.0.4-canary.5

## 9.0.4-canary.4

## 9.0.4-canary.3

## 9.0.4-canary.2

## 9.0.4-canary.1

## 9.0.4-canary.0

## 9.0.0

### Major Changes

- [#2234](https://github.com/graphcommerce-org/graphcommerce/pull/2234) [`530076e`](https://github.com/graphcommerce-org/graphcommerce/commit/530076e3664703cb8b577b7fcf1998a420819f60) - INP improvements: Moved all usages of `useFormPersist` to the `<FormPersist/>` component to prevent rerenders. ([@FrankHarland](https://github.com/FrankHarland))

### Patch Changes

- [#2341](https://github.com/graphcommerce-org/graphcommerce/pull/2341) [`86ecf9a`](https://github.com/graphcommerce-org/graphcommerce/commit/86ecf9a1bb4c48ceabd4944d81483bcd5b990350) - Payment method will now throw an error in `onComplete` to handle obscure errors. ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

- [#2331](https://github.com/graphcommerce-org/graphcommerce/pull/2331) [`702bfc9`](https://github.com/graphcommerce-org/graphcommerce/commit/702bfc93566c9745546988e57988431d5d4d8cb0) - Moved plugins to new format ([@paales](https://github.com/paales))

- [#2305](https://github.com/graphcommerce-org/graphcommerce/pull/2305) [`77e8297`](https://github.com/graphcommerce-org/graphcommerce/commit/77e82976816994336c616208a651cb18ce9ea270) - Fix bug with persist not applying saved changes by moving `<FromPersist/>` below the form components. ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

## 6.0.0

### Minor Changes

- [#1790](https://github.com/graphcommerce-org/graphcommerce/pull/1790) [`1fbd1e2b2`](https://github.com/graphcommerce-org/graphcommerce/commit/1fbd1e2b20cd875c481e10a81343da961c8baf8f) - MultiSafePay now shows an error snackbar, added the ability to restore/refetch the cart, and a fix for the cart not being found when restoring the cart. ([@LaurensFranken](https://github.com/LaurensFranken))

### Patch Changes

- [#1841](https://github.com/graphcommerce-org/graphcommerce/pull/1841) [`beb75b7a5`](https://github.com/graphcommerce-org/graphcommerce/commit/beb75b7a5c8f32f0b74b62bb0931baf887b17adf) - Muiltisafepay: `MSPPaymentOptionsAndPlaceOrder` is now split into two separate components to allow for surcharges when selecting a payment method. ([@paales](https://github.com/paales))

- [#1778](https://github.com/graphcommerce-org/graphcommerce/pull/1778) [`bac564119`](https://github.com/graphcommerce-org/graphcommerce/commit/bac5641198b8c91df0e27a730cd663fd177afc70) - Added proper translations for iDeal Multi Safe Pay ([@FrankHarland](https://github.com/FrankHarland))

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

- [#1729](https://github.com/graphcommerce-org/graphcommerce/pull/1729) [`366b05a7d`](https://github.com/graphcommerce-org/graphcommerce/commit/366b05a7da174a8a7c665b44e11422d8c873e4ed) - MultiSafePay Payment gateway support ([@paales](https://github.com/paales))

### Patch Changes

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`b2d73c726`](https://github.com/graphcommerce-org/graphcommerce/commit/b2d73c726fa123435fa6c54b4e0fd0db2df7c4ab) - Move to <Prev/> instead of <Component/> to call the plugin component ([@paales](https://github.com/paales))

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`be10e8cd1`](https://github.com/graphcommerce-org/graphcommerce/commit/be10e8cd1dce172a914ee9e5f65fdca4d0929fc8) - Migrated payment methods to use the new `onSuccess` method from `PaymentMethodContextProvider` instead of redirecting manually, makes sure the onSuccess method can be used by plugins. ([@paales](https://github.com/paales))

- [#1738](https://github.com/graphcommerce-org/graphcommerce/pull/1738) [`52882a63e`](https://github.com/graphcommerce-org/graphcommerce/commit/52882a63e96c0d3ba9641c3714d288fa4f420c82) - Do not forward the Prev prop in plugins ([@paales](https://github.com/paales))
