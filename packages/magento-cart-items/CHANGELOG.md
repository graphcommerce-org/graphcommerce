# Change Log

## 5.1.1

## 5.1.1-canary.1

## 5.1.1-canary.0

## 5.1.0

### Minor Changes

- [#1756](https://github.com/graphcommerce-org/graphcommerce/pull/1756) [`1abaaedde`](https://github.com/graphcommerce-org/graphcommerce/commit/1abaaedde4062d3b19696e333d0016972681afaf) - Show cart item error messages when running Magento >= 2.4.5 or this [patch is applied](https://raw.githubusercontent.com/graphcommerce-org/graphcommerce/main/packages/magento-cart/243-244-magento-module-quote-graphql-cart-item-errors.patch)

  - Fixes an issue where the cart can get into a broken state, if items contain errors.
  - AddToCartForm now shows a success message if there is an error but the error is related to another item in the cart.
  - Disable checkout buttons when there are cart item errors and show a message. ([@paales](https://github.com/paales))

### Patch Changes

- [#1752](https://github.com/graphcommerce-org/graphcommerce/pull/1752) [`2a6a4d9ec`](https://github.com/graphcommerce-org/graphcommerce/commit/2a6a4d9ecfa1b58a66ba9b9d00016d6feda9aa95) - Updated dependencies to latest versions, except for nextjs; Solve tons of peer dependency issues.

  - Updated the @mui/material package
  - Removed dependencies on react-hook-form-mui and @playwright/test
  - Upgraded dependencies including type-fest and graphql-mesh
  - Solved peer dependency issues ([@paales](https://github.com/paales))

## 5.1.0-canary.11

## 5.1.0-canary.10

## 5.1.0-canary.9

## 5.1.0-canary.8

## 5.1.0-canary.7

### Minor Changes

- [#1756](https://github.com/graphcommerce-org/graphcommerce/pull/1756) [`1abaaedde`](https://github.com/graphcommerce-org/graphcommerce/commit/1abaaedde4062d3b19696e333d0016972681afaf) - Show cart item error messages when running Magento >= 2.4.5 or this [patch is applied](https://raw.githubusercontent.com/graphcommerce-org/graphcommerce/main/packages/magento-cart/243-244-magento-module-quote-graphql-cart-item-errors.patch)

  - Fixes an issue where the cart can get into a broken state, if items contain errors.
  - AddToCartForm now shows a success message if there is an error but the error is related to another item in the cart.
  - Disable checkout buttons when there are cart item errors and show a message. ([@paales](https://github.com/paales))

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

### Patch Changes

- [#1718](https://github.com/graphcommerce-org/graphcommerce/pull/1718) [`37e86cdc8`](https://github.com/graphcommerce-org/graphcommerce/commit/37e86cdc86ccca3db77d6c59b1e14c8112bb7893) - Remove usage of PropsWithChildren ([@paales](https://github.com/paales))

## 5.0.0-canary.14

## 5.0.0-canary.13

### Major Changes

- [`e4c7fe17e`](https://github.com/graphcommerce-org/graphcommerce/commit/e4c7fe17e413e37362ceae92e67f1b3a5f62d398) - Bump major version of all packages ([@paales](https://github.com/paales))

## 4.14.0-canary.12

## 4.14.0-canary.11

## 4.14.0-canary.10

## 4.14.0-canary.9

## 4.14.0-canary.8

## 4.14.0-canary.7

## 4.14.0-canary.6

## 4.14.0-canary.5

## 4.14.0-canary.4

## 4.14.0-canary.3

## 4.14.0-canary.2

### Patch Changes

- [#1718](https://github.com/graphcommerce-org/graphcommerce/pull/1718) [`37e86cdc8`](https://github.com/graphcommerce-org/graphcommerce/commit/37e86cdc86ccca3db77d6c59b1e14c8112bb7893) - Remove usage of PropsWithChildren ([@paales](https://github.com/paales))

## 4.13.2-canary.1

## 4.13.2-canary.0

## 4.13.3

## 4.13.2

## 4.13.1

## 4.13.1-canary.2

## 4.13.1-canary.1

## 4.13.1-canary.0

## 4.13.0

### Patch Changes

- [#1702](https://github.com/graphcommerce-org/graphcommerce/pull/1702) [`abb15ef4a`](https://github.com/graphcommerce-org/graphcommerce/commit/abb15ef4a79b12eddb32cc006e5d1d31dd06ac2d) Thanks [@paales](https://github.com/paales)! - Added canary releases to GraphCommerce

## 4.13.0-canary.1

### Patch Changes

- [`abb15ef4a`](https://github.com/graphcommerce-org/graphcommerce/commit/abb15ef4a79b12eddb32cc006e5d1d31dd06ac2d) Thanks [@paales](https://github.com/paales)! - Added canary releases to GraphCommerce

## 4.13.0-canary.0

## 3.1.21

### Patch Changes

- Updated dependencies [[`a26a2d05e`](https://github.com/graphcommerce-org/graphcommerce/commit/a26a2d05eecabeeef70e4d69105343197ae092b7)]:
  - @graphcommerce/magento-cart@4.9.5
  - @graphcommerce/magento-product@4.8.4

## 3.1.20

### Patch Changes

- Updated dependencies [[`8393cb266`](https://github.com/graphcommerce-org/graphcommerce/commit/8393cb2662860be0c2aa5df432447bb73c427d8e), [`f544401c7`](https://github.com/graphcommerce-org/graphcommerce/commit/f544401c7b653fda39c7c260ad0dcfb3bf543b65), [`f105d4223`](https://github.com/graphcommerce-org/graphcommerce/commit/f105d4223aa68df30970149e51ae72897e489bf9), [`e0be98a26`](https://github.com/graphcommerce-org/graphcommerce/commit/e0be98a260882039a59a785f41e26517797307fd)]:
  - @graphcommerce/next-ui@4.29.3
  - @graphcommerce/magento-product@4.8.3
  - @graphcommerce/magento-customer@4.12.4
  - @graphcommerce/magento-cart@4.9.4
  - @graphcommerce/magento-store@4.3.6

## 3.1.19

### Patch Changes

- Updated dependencies [[`1953c7e27`](https://github.com/graphcommerce-org/graphcommerce/commit/1953c7e27eb606a825fce1ad361393b3c781c6da)]:
  - @graphcommerce/magento-product@4.8.2
  - @graphcommerce/next-ui@4.29.2
  - @graphcommerce/magento-cart@4.9.3
  - @graphcommerce/magento-customer@4.12.3
  - @graphcommerce/magento-store@4.3.5

## 3.1.18

### Patch Changes

- Updated dependencies [[`ae28fb14c`](https://github.com/graphcommerce-org/graphcommerce/commit/ae28fb14cec298c52970260a4fc2c2551b5f175e), [`98d6a9cce`](https://github.com/graphcommerce-org/graphcommerce/commit/98d6a9cce1bb9514088be0af2736721b3edda467), [`aab6b4fa5`](https://github.com/graphcommerce-org/graphcommerce/commit/aab6b4fa5b4708003cfb5bf673a617dc5dbf3078)]:
  - @graphcommerce/magento-cart@4.9.2
  - @graphcommerce/next-ui@4.29.1
  - @graphcommerce/magento-product@4.8.1
  - @graphcommerce/magento-customer@4.12.2
  - @graphcommerce/magento-store@4.3.4

## 3.1.17

### Patch Changes

- Updated dependencies [[`2b5451395`](https://github.com/graphcommerce-org/graphcommerce/commit/2b5451395dc1173de55d18d08968866e561f90ab), [`e76df6dc3`](https://github.com/graphcommerce-org/graphcommerce/commit/e76df6dc37c11c793a5d008ba36932d17dc23855), [`c4ed376e2`](https://github.com/graphcommerce-org/graphcommerce/commit/c4ed376e2c72b16b34704d7d1ca69c074de172ba), [`78d7d51cb`](https://github.com/graphcommerce-org/graphcommerce/commit/78d7d51cb1551601d3a4756cd1f2157a49ff93b9), [`0bd9ea582`](https://github.com/graphcommerce-org/graphcommerce/commit/0bd9ea58230dde79c5fe2cdb07e9860151460270)]:
  - @graphcommerce/magento-product@4.8.0
  - @graphcommerce/next-ui@4.29.0
  - @graphcommerce/magento-cart@4.9.1
  - @graphcommerce/magento-customer@4.12.1
  - @graphcommerce/magento-store@4.3.3

## 3.1.16

### Patch Changes

- [#1675](https://github.com/graphcommerce-org/graphcommerce/pull/1675) [`1b1504c9b`](https://github.com/graphcommerce-org/graphcommerce/commit/1b1504c9b0e51f2787bce91e1ff1940f540411d6) Thanks [@paales](https://github.com/paales)! - Added crosssel functionality

- Updated dependencies [[`9e630670f`](https://github.com/graphcommerce-org/graphcommerce/commit/9e630670ff6c952ab7b938d890b5509804985cf3), [`cf3518499`](https://github.com/graphcommerce-org/graphcommerce/commit/cf351849999ad6fe73ce2bb258098a7dd301d517), [`2e9fa5984`](https://github.com/graphcommerce-org/graphcommerce/commit/2e9fa5984a07ff14fc1b3a4f62189a26e8e3ecdd), [`adf13069a`](https://github.com/graphcommerce-org/graphcommerce/commit/adf13069af6460c960276b402237371c12fc6dec), [`1b1504c9b`](https://github.com/graphcommerce-org/graphcommerce/commit/1b1504c9b0e51f2787bce91e1ff1940f540411d6), [`8a34f8081`](https://github.com/graphcommerce-org/graphcommerce/commit/8a34f808186274a6fe1d4f309472f1a9c6d00efd), [`3dde492ad`](https://github.com/graphcommerce-org/graphcommerce/commit/3dde492ad3a49d96481eeb7453fb305d0017b1a5)]:
  - @graphcommerce/next-ui@4.28.1
  - @graphcommerce/graphql@3.5.0
  - @graphcommerce/magento-cart@4.9.0
  - @graphcommerce/magento-customer@4.12.0
  - @graphcommerce/magento-product@4.7.3
  - @graphcommerce/magento-store@4.3.2
  - @graphcommerce/image@3.1.10

## 3.1.15

### Patch Changes

- Updated dependencies [[`1f2e14ba8`](https://github.com/graphcommerce-org/graphcommerce/commit/1f2e14ba8b674b87257a123e8cb215157890eb22)]:
  - @graphcommerce/react-hook-form@3.3.5
  - @graphcommerce/magento-cart@4.8.7
  - @graphcommerce/magento-customer@4.11.7
  - @graphcommerce/magento-product@4.7.2

## 3.1.14

### Patch Changes

- Updated dependencies [[`93c8f3a3f`](https://github.com/graphcommerce-org/graphcommerce/commit/93c8f3a3f2fd2d16e5a5132652bf489858583f63), [`0c21c5c23`](https://github.com/graphcommerce-org/graphcommerce/commit/0c21c5c233ebab15f6629c234e3de1cc8c0452e1), [`de8925aa9`](https://github.com/graphcommerce-org/graphcommerce/commit/de8925aa910b191c62041530c68c697a58a1e52d), [`f5eae0afd`](https://github.com/graphcommerce-org/graphcommerce/commit/f5eae0afdbd474b1f81c450425ffadf2d025187a)]:
  - @graphcommerce/magento-cart@4.8.6
  - @graphcommerce/next-ui@4.28.0
  - @graphcommerce/magento-product@4.7.1
  - @graphcommerce/magento-customer@4.11.6
  - @graphcommerce/magento-store@4.3.1

## 3.1.13

### Patch Changes

- Updated dependencies [[`6987ec7d2`](https://github.com/graphcommerce-org/graphcommerce/commit/6987ec7d21ce2d481fabbd6eda039702fcf5242b)]:
  - @graphcommerce/magento-product@4.7.0

## 3.1.12

### Patch Changes

- Updated dependencies [[`48e6522bb`](https://github.com/graphcommerce-org/graphcommerce/commit/48e6522bb9424d4bd77fd77c68065f5625f3ec8d), [`75ae24a93`](https://github.com/graphcommerce-org/graphcommerce/commit/75ae24a93bd74e3b9b7efda21ec7ba6fbe9a3a75), [`37b1980a0`](https://github.com/graphcommerce-org/graphcommerce/commit/37b1980a04a4a3d77663b404ae83539620cf65b9)]:
  - @graphcommerce/magento-product@4.6.1
  - @graphcommerce/react-hook-form@3.3.4
  - @graphcommerce/magento-cart@4.8.5
  - @graphcommerce/magento-customer@4.11.5

## 3.1.11

### Patch Changes

- Updated dependencies [[`ad63ebf4e`](https://github.com/graphcommerce-org/graphcommerce/commit/ad63ebf4e33bfb0e5c9e5e68ab69b14775f3f8a8), [`b6bf2c941`](https://github.com/graphcommerce-org/graphcommerce/commit/b6bf2c94197ddacbf8f1fc0d352cd0d46e096f30)]:
  - @graphcommerce/magento-product@4.6.0
  - @graphcommerce/magento-store@4.3.0
  - @graphcommerce/next-ui@4.27.0
  - @graphcommerce/magento-cart@4.8.4
  - @graphcommerce/magento-customer@4.11.4

## 3.1.10

### Patch Changes

- Updated dependencies [[`42e7fac75`](https://github.com/graphcommerce-org/graphcommerce/commit/42e7fac75712f9bda7a6b919ede14b3c75d07771)]:
  - @graphcommerce/next-ui@4.26.0
  - @graphcommerce/magento-cart@4.8.3
  - @graphcommerce/magento-customer@4.11.3
  - @graphcommerce/magento-product@4.5.10
  - @graphcommerce/magento-store@4.2.35

## 3.1.9

### Patch Changes

- Updated dependencies [[`dc6237644`](https://github.com/graphcommerce-org/graphcommerce/commit/dc6237644ac349debb728059e4c937cec25bf4fd), [`48273bccd`](https://github.com/graphcommerce-org/graphcommerce/commit/48273bccd2e471ce4bc024a600e693da791f1cde)]:
  - @graphcommerce/next-ui@4.25.0
  - @graphcommerce/magento-cart@4.8.2
  - @graphcommerce/magento-customer@4.11.2
  - @graphcommerce/magento-product@4.5.9
  - @graphcommerce/magento-store@4.2.34

## 3.1.8

### Patch Changes

- Updated dependencies [[`104103bc2`](https://github.com/graphcommerce-org/graphcommerce/commit/104103bc2a0fbaa510af2e26b6b00ddc63e8495b)]:
  - @graphcommerce/next-ui@4.24.0
  - @graphcommerce/magento-cart@4.8.1
  - @graphcommerce/magento-customer@4.11.1
  - @graphcommerce/magento-product@4.5.8
  - @graphcommerce/magento-store@4.2.33

## 3.1.7

### Patch Changes

- Updated dependencies [[`c1b8b0352`](https://github.com/graphcommerce-org/graphcommerce/commit/c1b8b03520532223f7b572ff23f1d368a4dfe306), [`8d5207288`](https://github.com/graphcommerce-org/graphcommerce/commit/8d52072887f124831ed85d28ec79998f0ce55f1c), [`662f510c2`](https://github.com/graphcommerce-org/graphcommerce/commit/662f510c21fc44a63036e5c7a0726ccb33c31600)]:
  - @graphcommerce/magento-customer@4.11.0
  - @graphcommerce/magento-cart@4.8.0
  - @graphcommerce/react-hook-form@3.3.3
  - @graphcommerce/magento-product@4.5.7

## 3.1.6

### Patch Changes

- Updated dependencies [[`b20f3e52a`](https://github.com/graphcommerce-org/graphcommerce/commit/b20f3e52a48751da217e574f0339282155748995)]:
  - @graphcommerce/magento-product@4.5.6

## 3.1.5

### Patch Changes

- Updated dependencies [[`e8639ec5f`](https://github.com/graphcommerce-org/graphcommerce/commit/e8639ec5f6759504211d70a966f5c348c6b3a7f6)]:
  - @graphcommerce/magento-customer@4.10.5
  - @graphcommerce/magento-cart@4.7.5
  - @graphcommerce/magento-product@4.5.5

## 3.1.4

### Patch Changes

- Updated dependencies [[`9b84a68a1`](https://github.com/graphcommerce-org/graphcommerce/commit/9b84a68a1e7311a79eb687c7dcee905d3000facf)]:
  - @graphcommerce/next-ui@4.23.1
  - @graphcommerce/magento-cart@4.7.4
  - @graphcommerce/magento-customer@4.10.4
  - @graphcommerce/magento-product@4.5.4
  - @graphcommerce/magento-store@4.2.32

## 3.1.3

### Patch Changes

- Updated dependencies [[`396b5de5d`](https://github.com/graphcommerce-org/graphcommerce/commit/396b5de5d50c7b8f59bf636807e7a4b50f14e0b2)]:
  - @graphcommerce/graphql@3.4.8
  - @graphcommerce/magento-cart@4.7.3
  - @graphcommerce/magento-customer@4.10.3
  - @graphcommerce/magento-product@4.5.3
  - @graphcommerce/magento-store@4.2.31

## 3.1.2

### Patch Changes

- Updated dependencies [[`755d2cf83`](https://github.com/graphcommerce-org/graphcommerce/commit/755d2cf83343a5ad3d61063eff595d821de360aa), [`dc7f2dda4`](https://github.com/graphcommerce-org/graphcommerce/commit/dc7f2dda40ff8572fc11161de6eb62ca13e720dd)]:
  - @graphcommerce/next-ui@4.23.0
  - @graphcommerce/magento-cart@4.7.2
  - @graphcommerce/magento-customer@4.10.2
  - @graphcommerce/magento-product@4.5.2
  - @graphcommerce/magento-store@4.2.30

## 3.1.1

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/magento-customer@4.10.1
  - @graphcommerce/magento-product@4.5.1
  - @graphcommerce/magento-store@4.2.29
  - @graphcommerce/magento-cart@4.7.1

## 3.1.0

### Minor Changes

- [#1602](https://github.com/graphcommerce-org/graphcommerce/pull/1602) [`5f781a217`](https://github.com/graphcommerce-org/graphcommerce/commit/5f781a217ce63ed56bc1a9983487b04400a8a315) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Default styles and layout fixes

  - Scaled icons and fonts down. Size in typography is now more gradual: https://graphcommerce.vercel.app/test/typography
  - Multiple accessibility fixes. Missing button/input labels, and fixed spacing issues resulting in high % appropriately sized tap targets
  - Replaced responsiveVal usage with better performaning breakpointVal where possible
  - All buttons are now Pill by default.
  - Cleaned up checkout styles

### Patch Changes

- Updated dependencies [[`b40a352f7`](https://github.com/graphcommerce-org/graphcommerce/commit/b40a352f7bccdb831dce1d45baf98d51b0921d58), [`04708dacc`](https://github.com/graphcommerce-org/graphcommerce/commit/04708daccc213c6ea927bc67fa3bd0d5b1fad619), [`bb94e7045`](https://github.com/graphcommerce-org/graphcommerce/commit/bb94e7045460cb671c45d612a0833731d7c20c30), [`b0dc4e2e1`](https://github.com/graphcommerce-org/graphcommerce/commit/b0dc4e2e1982d502d38dd50a0f493396360a7a15), [`4a5286dfe`](https://github.com/graphcommerce-org/graphcommerce/commit/4a5286dfeaa1719e594a0078f274fbab53969c4e), [`0ad5159eb`](https://github.com/graphcommerce-org/graphcommerce/commit/0ad5159ebef54b4ce7fee6f71b4bf710dba9ef8e), [`40983df17`](https://github.com/graphcommerce-org/graphcommerce/commit/40983df170ed0435c47496285dfe30aafeb2eeac), [`d46d5ed0c`](https://github.com/graphcommerce-org/graphcommerce/commit/d46d5ed0cc5794391b7527fc17bbb68ec2212e33), [`e573278e4`](https://github.com/graphcommerce-org/graphcommerce/commit/e573278e43506a6b17a2981e61d0e9fad41eb2eb), [`5f781a217`](https://github.com/graphcommerce-org/graphcommerce/commit/5f781a217ce63ed56bc1a9983487b04400a8a315), [`ec96a0eb0`](https://github.com/graphcommerce-org/graphcommerce/commit/ec96a0eb049ee2204f32f9c578455cf9c131dbd2), [`ac6eedbb1`](https://github.com/graphcommerce-org/graphcommerce/commit/ac6eedbb14d3abd8cf1231a98dc2a8b7f4659f1f)]:
  - @graphcommerce/magento-product@4.5.0
  - @graphcommerce/next-ui@4.22.0
  - @graphcommerce/magento-customer@4.10.0
  - @graphcommerce/magento-cart@4.7.0
  - @graphcommerce/magento-store@4.2.28
  - @graphcommerce/graphql@3.4.7
  - @graphcommerce/image@3.1.9

## 3.0.48

### Patch Changes

- Updated dependencies [[`1f7ee6f6c`](https://github.com/graphcommerce-org/graphcommerce/commit/1f7ee6f6cfb28544439ed36e10929ac530d1b2b7), [`707dbc73d`](https://github.com/graphcommerce-org/graphcommerce/commit/707dbc73d181204d88fdbbd2e09340e25b2b5f7b)]:
  - @graphcommerce/next-ui@4.21.0
  - @graphcommerce/graphql@3.4.6
  - @graphcommerce/magento-cart@4.6.9
  - @graphcommerce/magento-customer@4.9.5
  - @graphcommerce/magento-product@4.4.25
  - @graphcommerce/magento-store@4.2.27
  - @graphcommerce/image@3.1.8

## 3.0.47

### Patch Changes

- Updated dependencies [[`43822fd61`](https://github.com/graphcommerce-org/graphcommerce/commit/43822fd61c949215b8ddce9fb37d09f29b638426), [`3a619b70d`](https://github.com/graphcommerce-org/graphcommerce/commit/3a619b70d082804b8de46a8e8232f9431479a8b7), [`3a619b70d`](https://github.com/graphcommerce-org/graphcommerce/commit/3a619b70d082804b8de46a8e8232f9431479a8b7)]:
  - @graphcommerce/next-ui@4.20.0
  - @graphcommerce/magento-customer@4.9.4
  - @graphcommerce/magento-cart@4.6.8
  - @graphcommerce/magento-product@4.4.24
  - @graphcommerce/magento-store@4.2.26

## 3.0.46

### Patch Changes

- Updated dependencies [[`b6d3a3c13`](https://github.com/graphcommerce-org/graphcommerce/commit/b6d3a3c13ea63ef0f691f497507f07c0e094de5b), [`1be392e42`](https://github.com/graphcommerce-org/graphcommerce/commit/1be392e42241d38b0ce1862e8ba184d2b5ec23c3)]:
  - @graphcommerce/next-ui@4.19.0
  - @graphcommerce/magento-customer@4.9.3
  - @graphcommerce/magento-cart@4.6.7
  - @graphcommerce/magento-product@4.4.23
  - @graphcommerce/magento-store@4.2.25

## 3.0.45

### Patch Changes

- Updated dependencies [[`6ce2cbaf2`](https://github.com/graphcommerce-org/graphcommerce/commit/6ce2cbaf2cf27e21b753f7cb71e7e74826294de6), [`6ce2cbaf2`](https://github.com/graphcommerce-org/graphcommerce/commit/6ce2cbaf2cf27e21b753f7cb71e7e74826294de6), [`6ce2cbaf2`](https://github.com/graphcommerce-org/graphcommerce/commit/6ce2cbaf2cf27e21b753f7cb71e7e74826294de6)]:
  - @graphcommerce/magento-product@4.4.22
  - @graphcommerce/graphql@3.4.5
  - @graphcommerce/next-ui@4.18.0
  - @graphcommerce/magento-cart@4.6.6
  - @graphcommerce/magento-customer@4.9.2
  - @graphcommerce/magento-store@4.2.24

## 3.0.44

### Patch Changes

- Updated dependencies [[`bfbcd59d8`](https://github.com/graphcommerce-org/graphcommerce/commit/bfbcd59d8f7652d7a7c028f79cc994216e8dbe3a), [`49370878a`](https://github.com/graphcommerce-org/graphcommerce/commit/49370878a48b90a4579026a7c56c54f97840cebb), [`b6ce5548c`](https://github.com/graphcommerce-org/graphcommerce/commit/b6ce5548c66a8ca62d3aee29467045f7f07f30c8)]:
  - @graphcommerce/magento-product@4.4.21
  - @graphcommerce/graphql@3.4.4
  - @graphcommerce/next-ui@4.17.0
  - @graphcommerce/magento-cart@4.6.5
  - @graphcommerce/magento-customer@4.9.1
  - @graphcommerce/magento-store@4.2.23

## 3.0.43

### Patch Changes

- Updated dependencies [[`02023d8d8`](https://github.com/graphcommerce-org/graphcommerce/commit/02023d8d89c8138144243edce67290bd79ff49a7), [`87a188d6f`](https://github.com/graphcommerce-org/graphcommerce/commit/87a188d6f216b7f7b9ec95afbe74f1146cb07ce4), [`3c809a3a4`](https://github.com/graphcommerce-org/graphcommerce/commit/3c809a3a438995503f6d2290d6c0bb90fbc489be), [`2c66cca15`](https://github.com/graphcommerce-org/graphcommerce/commit/2c66cca154098a09445977428983e05fe19b9510), [`2014f10e9`](https://github.com/graphcommerce-org/graphcommerce/commit/2014f10e935fd112ac98eca69f030d30982ba18e), [`8e3b24500`](https://github.com/graphcommerce-org/graphcommerce/commit/8e3b24500a55fa2a1fb4a3ef08c1f1990a46a0ae), [`2c66cca15`](https://github.com/graphcommerce-org/graphcommerce/commit/2c66cca154098a09445977428983e05fe19b9510), [`2c66cca15`](https://github.com/graphcommerce-org/graphcommerce/commit/2c66cca154098a09445977428983e05fe19b9510), [`1eb131766`](https://github.com/graphcommerce-org/graphcommerce/commit/1eb131766c32db6fcb0a8e83dba2c3d241658595)]:
  - @graphcommerce/react-hook-form@3.3.2
  - @graphcommerce/next-ui@4.16.0
  - @graphcommerce/magento-customer@4.9.0
  - @graphcommerce/magento-product@4.4.20
  - @graphcommerce/magento-cart@4.6.4
  - @graphcommerce/magento-store@4.2.22

## 3.0.42

### Patch Changes

- Updated dependencies [[`a88f166f0`](https://github.com/graphcommerce-org/graphcommerce/commit/a88f166f0115c58254fe47171da51a5850658a32), [`d92780d5c`](https://github.com/graphcommerce-org/graphcommerce/commit/d92780d5c3bb80b5a1519c087338548303e4cc2f)]:
  - @graphcommerce/next-ui@4.15.1
  - @graphcommerce/magento-cart@4.6.3
  - @graphcommerce/magento-customer@4.8.3
  - @graphcommerce/magento-product@4.4.19
  - @graphcommerce/magento-store@4.2.21

## 3.0.41

### Patch Changes

- Updated dependencies [[`e167992df`](https://github.com/graphcommerce-org/graphcommerce/commit/e167992dfdc6964a392af719667f8a188626ab1b), [`9c2504b4e`](https://github.com/graphcommerce-org/graphcommerce/commit/9c2504b4ed75f41d3003c4d3339814010e85e37e)]:
  - @graphcommerce/next-ui@4.15.0
  - @graphcommerce/magento-cart@4.6.2
  - @graphcommerce/magento-customer@4.8.2
  - @graphcommerce/magento-product@4.4.18
  - @graphcommerce/magento-store@4.2.20

## 3.0.40

### Patch Changes

- Updated dependencies [[`01f1588c9`](https://github.com/graphcommerce-org/graphcommerce/commit/01f1588c9200bb39dd61146e260bfa2b32060612), [`84428ccab`](https://github.com/graphcommerce-org/graphcommerce/commit/84428ccab8d1d263893766197076651eae68759c), [`2ce406727`](https://github.com/graphcommerce-org/graphcommerce/commit/2ce406727c01a3367cea26c331d8455748592ce9)]:
  - @graphcommerce/graphql@3.4.3
  - @graphcommerce/magento-customer@4.8.1
  - @graphcommerce/magento-cart@4.6.1
  - @graphcommerce/magento-product@4.4.17
  - @graphcommerce/magento-store@4.2.19

## 3.0.39

### Patch Changes

- Updated dependencies [[`1afc6a547`](https://github.com/graphcommerce-org/graphcommerce/commit/1afc6a5473d6e31f47b5d0188801803b31865290), [`03d01c06c`](https://github.com/graphcommerce-org/graphcommerce/commit/03d01c06c6dc13df8d38ab5b40bd100c567a9e8d), [`4a4579bb2`](https://github.com/graphcommerce-org/graphcommerce/commit/4a4579bb2f7da378f3fcc504405caf2560dc10f6), [`afcd8e4bf`](https://github.com/graphcommerce-org/graphcommerce/commit/afcd8e4bfb7010da4d5faeed85b61991ed7975f4), [`02e1988e5`](https://github.com/graphcommerce-org/graphcommerce/commit/02e1988e5f361c6f66ae30d3bbee38ef2ac062df), [`323fdee4b`](https://github.com/graphcommerce-org/graphcommerce/commit/323fdee4b15ae23e0e84dd0588cb2c6446dcfd50), [`d03f0860b`](https://github.com/graphcommerce-org/graphcommerce/commit/d03f0860b882db4f280d9467aef9d66e56c1c030), [`b68d0b44a`](https://github.com/graphcommerce-org/graphcommerce/commit/b68d0b44a87688c80fb0aa4a5c840f262ce48d2f)]:
  - @graphcommerce/graphql@3.4.2
  - @graphcommerce/magento-cart@4.6.0
  - @graphcommerce/magento-customer@4.8.0
  - @graphcommerce/react-hook-form@3.3.1
  - @graphcommerce/next-ui@4.14.0
  - @graphcommerce/magento-product@4.4.16
  - @graphcommerce/magento-store@4.2.18

## 3.0.38

### Patch Changes

- Updated dependencies [[`18054c441`](https://github.com/graphcommerce-org/graphcommerce/commit/18054c441962ba750bed3acc39ab46c8d3a341ce), [`c5c539c44`](https://github.com/graphcommerce-org/graphcommerce/commit/c5c539c44eeac524cd62ce649e132d2e00333794), [`6f69bc54c`](https://github.com/graphcommerce-org/graphcommerce/commit/6f69bc54c6e0224452817c532ae58d9c332b61ea), [`21886d6fa`](https://github.com/graphcommerce-org/graphcommerce/commit/21886d6fa64a48d9e932bfaf8d138c9b13c36e43)]:
  - @graphcommerce/graphql@3.4.1
  - @graphcommerce/magento-customer@4.7.2
  - @graphcommerce/next-ui@4.13.1
  - @graphcommerce/magento-cart@4.5.2
  - @graphcommerce/magento-product@4.4.15
  - @graphcommerce/magento-store@4.2.17

## 3.0.37

### Patch Changes

- Updated dependencies [[`8d8fda262`](https://github.com/graphcommerce-org/graphcommerce/commit/8d8fda2623e561cb43441110c67ffa34b692668a), [`d41cff721`](https://github.com/graphcommerce-org/graphcommerce/commit/d41cff7211230561ceeb7786cf75790efd6377cd), [`cefa7b365`](https://github.com/graphcommerce-org/graphcommerce/commit/cefa7b3652b55108d2178927e3c5d98a111cf373)]:
  - @graphcommerce/next-ui@4.13.0
  - @graphcommerce/magento-store@4.2.16
  - @graphcommerce/magento-cart@4.5.1
  - @graphcommerce/magento-customer@4.7.1
  - @graphcommerce/magento-product@4.4.14

## 3.0.36

### Patch Changes

- Updated dependencies [[`5f927ebdc`](https://github.com/graphcommerce-org/graphcommerce/commit/5f927ebdc6f0331833e02b96e4f169bfe475ac6b), [`c87a28e7d`](https://github.com/graphcommerce-org/graphcommerce/commit/c87a28e7dad87bffd0bd125ad5fdca65aaa389cc), [`c756f42e5`](https://github.com/graphcommerce-org/graphcommerce/commit/c756f42e503761a497e4a5a7a02d02141df231c3)]:
  - @graphcommerce/graphql@3.4.0
  - @graphcommerce/magento-cart@4.5.0
  - @graphcommerce/magento-customer@4.7.0
  - @graphcommerce/react-hook-form@3.3.0
  - @graphcommerce/next-ui@4.12.0
  - @graphcommerce/magento-product@4.4.13
  - @graphcommerce/magento-store@4.2.15

## 3.0.35

### Patch Changes

- [#1538](https://github.com/graphcommerce-org/graphcommerce/pull/1538) [`fe4baa42d`](https://github.com/graphcommerce-org/graphcommerce/commit/fe4baa42db0081ed960d62aef688bd36a7ac974f) Thanks [@paales](https://github.com/paales)! - add missing translations

- Updated dependencies [[`fe4baa42d`](https://github.com/graphcommerce-org/graphcommerce/commit/fe4baa42db0081ed960d62aef688bd36a7ac974f)]:
  - @graphcommerce/magento-cart@4.4.8
  - @graphcommerce/magento-customer@4.6.3
  - @graphcommerce/next-ui@4.11.2
  - @graphcommerce/magento-product@4.4.12
  - @graphcommerce/magento-store@4.2.14

## 3.0.34

### Patch Changes

- Updated dependencies [[`11bca2d2f`](https://github.com/graphcommerce-org/graphcommerce/commit/11bca2d2f7dbb7c5e2827c04eb0db43d4099f2fd)]:
  - @graphcommerce/next-ui@4.11.1
  - @graphcommerce/magento-cart@4.4.7
  - @graphcommerce/magento-customer@4.6.2
  - @graphcommerce/magento-product@4.4.11
  - @graphcommerce/magento-store@4.2.13

## 3.0.33

### Patch Changes

- Updated dependencies [[`d140fca34`](https://github.com/graphcommerce-org/graphcommerce/commit/d140fca3463b73e761e23fd1d9216305727f0c1a), [`9ec0338df`](https://github.com/graphcommerce-org/graphcommerce/commit/9ec0338dfe34d37b0f2c24e36ffa6ed13ea1145e), [`735b78672`](https://github.com/graphcommerce-org/graphcommerce/commit/735b786724d5401cbe6e88f2515e121a1a0945b2)]:
  - @graphcommerce/magento-cart@4.4.6
  - @graphcommerce/next-ui@4.11.0
  - @graphcommerce/magento-product@4.4.10
  - @graphcommerce/magento-store@4.2.12
  - @graphcommerce/graphql@3.3.0
  - @graphcommerce/magento-customer@4.6.1

## 3.0.32

### Patch Changes

- Updated dependencies [[`98ff2334d`](https://github.com/graphcommerce-org/graphcommerce/commit/98ff2334d1b7dedb8bc56ebe6abb50836eefedd3)]:
  - @graphcommerce/magento-customer@4.6.0
  - @graphcommerce/magento-cart@4.4.5
  - @graphcommerce/magento-product@4.4.9

## 3.0.31

### Patch Changes

- Updated dependencies [[`c877e438a`](https://github.com/graphcommerce-org/graphcommerce/commit/c877e438a48f30204fa3e36b611906a546e1cf5c), [`371e6cf52`](https://github.com/graphcommerce-org/graphcommerce/commit/371e6cf52916a3b6c44192bd40cc8271bd608832), [`4143483f3`](https://github.com/graphcommerce-org/graphcommerce/commit/4143483f37c038d2bbf218be2685e27a31a35745)]:
  - @graphcommerce/magento-customer@4.5.4
  - @graphcommerce/next-ui@4.10.0
  - @graphcommerce/magento-cart@4.4.4
  - @graphcommerce/magento-product@4.4.8
  - @graphcommerce/magento-store@4.2.11

## 3.0.30

### Patch Changes

- [#1490](https://github.com/graphcommerce-org/graphcommerce/pull/1490) [`d311ef48b`](https://github.com/graphcommerce-org/graphcommerce/commit/d311ef48bb3e97806d992af5516d6b7f183ec9cb) Thanks [@paales](https://github.com/paales)! - upgraded packages

- Updated dependencies [[`8a626ecf7`](https://github.com/graphcommerce-org/graphcommerce/commit/8a626ecf7ed00c46a28088e0b9bae00a4e1ae019), [`a9213f1f5`](https://github.com/graphcommerce-org/graphcommerce/commit/a9213f1f5a410d217768386ccb6d9b5ce7bd5782), [`d311ef48b`](https://github.com/graphcommerce-org/graphcommerce/commit/d311ef48bb3e97806d992af5516d6b7f183ec9cb)]:
  - @graphcommerce/magento-customer@4.5.3
  - @graphcommerce/next-ui@4.9.0
  - @graphcommerce/graphql@3.2.1
  - @graphcommerce/image@3.1.7
  - @graphcommerce/magento-cart@4.4.3
  - @graphcommerce/magento-product@4.4.7
  - @graphcommerce/magento-store@4.2.10
  - @graphcommerce/react-hook-form@3.2.2

## 3.0.29

### Patch Changes

- Updated dependencies [[`de6781908`](https://github.com/graphcommerce-org/graphcommerce/commit/de6781908cbf514b9fd225aa1407fa1385c8e53b), [`0ab7c5465`](https://github.com/graphcommerce-org/graphcommerce/commit/0ab7c5465441cba9bf8cd185a6790ce2f443f4ed), [`711fa6e04`](https://github.com/graphcommerce-org/graphcommerce/commit/711fa6e04519bbe91825fec7e1714277c1a8fa68)]:
  - @graphcommerce/magento-product@4.4.6
  - @graphcommerce/next-ui@4.8.4
  - @graphcommerce/magento-customer@4.5.2
  - @graphcommerce/magento-cart@4.4.2
  - @graphcommerce/magento-store@4.2.9

## 3.0.28

### Patch Changes

- Updated dependencies [[`d205b037f`](https://github.com/graphcommerce-org/graphcommerce/commit/d205b037fee82b8c03993f2c586f477e826093bf)]:
  - @graphcommerce/magento-cart@4.4.1
  - @graphcommerce/magento-customer@4.5.1
  - @graphcommerce/magento-product@4.4.5

## 3.0.27

### Patch Changes

- Updated dependencies [[`ffec8800a`](https://github.com/graphcommerce-org/graphcommerce/commit/ffec8800a50ff2fe9b9fc5feeb5a0a878b573f0e), [`bed806ddd`](https://github.com/graphcommerce-org/graphcommerce/commit/bed806dddd7e025806a69798ef9587aa165d392f)]:
  - @graphcommerce/react-hook-form@3.2.1
  - @graphcommerce/graphql@3.2.0
  - @graphcommerce/magento-cart@4.4.0
  - @graphcommerce/magento-customer@4.5.0
  - @graphcommerce/magento-product@4.4.4
  - @graphcommerce/magento-store@4.2.8

## 3.0.26

### Patch Changes

- Updated dependencies [[`858a3b3a3`](https://github.com/graphcommerce-org/graphcommerce/commit/858a3b3a3601cd00491219daf45557c2f1cc804b)]:
  - @graphcommerce/react-hook-form@3.2.0
  - @graphcommerce/magento-cart@4.3.4
  - @graphcommerce/magento-customer@4.4.2
  - @graphcommerce/magento-product@4.4.3

## 3.0.25

### Patch Changes

- Updated dependencies [[`c63ab89c2`](https://github.com/graphcommerce-org/graphcommerce/commit/c63ab89c20cb81d79188900d57f3d65a7bba71cc), [`238aa4d34`](https://github.com/graphcommerce-org/graphcommerce/commit/238aa4d3478773b8cb0973f4112c9829e59e16d6), [`afc67103d`](https://github.com/graphcommerce-org/graphcommerce/commit/afc67103d0e00583e274465036fd287537f95e79)]:
  - @graphcommerce/magento-product@4.4.2
  - @graphcommerce/magento-customer@4.4.1
  - @graphcommerce/next-ui@4.8.3
  - @graphcommerce/magento-cart@4.3.3
  - @graphcommerce/magento-store@4.2.7

## 3.0.24

### Patch Changes

- Updated dependencies [[`d6262de71`](https://github.com/graphcommerce-org/graphcommerce/commit/d6262de71d2254a2b0b492e1a60f9e141767470e), [`c8c246b8a`](https://github.com/graphcommerce-org/graphcommerce/commit/c8c246b8aaab0621b68a2fca2a1c529a56fad962), [`e3005fe63`](https://github.com/graphcommerce-org/graphcommerce/commit/e3005fe6306093d47b08c6756c21c8175649e30b)]:
  - @graphcommerce/magento-customer@4.4.0
  - @graphcommerce/magento-cart@4.3.2
  - @graphcommerce/next-ui@4.8.2
  - @graphcommerce/magento-product@4.4.1
  - @graphcommerce/magento-store@4.2.6

## 3.0.23

### Patch Changes

- Updated dependencies [[`a9df81310`](https://github.com/graphcommerce-org/graphcommerce/commit/a9df81310c051876dd82fb2819105dece47cc213), [`b359fe252`](https://github.com/graphcommerce-org/graphcommerce/commit/b359fe252a50bb8195601ba97c3eef6a7be146ba), [`f167f9963`](https://github.com/graphcommerce-org/graphcommerce/commit/f167f99630966a7de43717937d43669e66132494)]:
  - @graphcommerce/next-ui@4.8.1
  - @graphcommerce/magento-product@4.4.0
  - @graphcommerce/magento-cart@4.3.1
  - @graphcommerce/magento-customer@4.3.2
  - @graphcommerce/magento-store@4.2.5
  - @graphcommerce/image@3.1.6

## 3.0.22

### Patch Changes

- Updated dependencies [[`a12db31b9`](https://github.com/graphcommerce-org/graphcommerce/commit/a12db31b9db9d27d86f59c1bfe58a0879999b9d3), [`cf575395c`](https://github.com/graphcommerce-org/graphcommerce/commit/cf575395c16e9c571f75d4563004c3018a29aeaa)]:
  - @graphcommerce/magento-customer@4.3.1
  - @graphcommerce/magento-cart@4.3.0
  - @graphcommerce/magento-product@4.3.6

## 3.0.21

### Patch Changes

- Updated dependencies [[`0363b9671`](https://github.com/graphcommerce-org/graphcommerce/commit/0363b9671db7c2932321d97faf6f1eb385238397), [`c6a62a338`](https://github.com/graphcommerce-org/graphcommerce/commit/c6a62a338abf8af83d3a6eb7ed796586009910ca), [`3ac90b57c`](https://github.com/graphcommerce-org/graphcommerce/commit/3ac90b57c68b96f9d81771d6664ed9435a28fc1d), [`00f6167ff`](https://github.com/graphcommerce-org/graphcommerce/commit/00f6167ff4096bf7432f3d8e8e739ecbf6ab0dd2), [`7159d3ab3`](https://github.com/graphcommerce-org/graphcommerce/commit/7159d3ab31e937c9c921023c46e80db5813e789c), [`32370574b`](https://github.com/graphcommerce-org/graphcommerce/commit/32370574bef6345b857ae911049ca27a64bc7e08), [`ed2b67a06`](https://github.com/graphcommerce-org/graphcommerce/commit/ed2b67a0618d9db97e79ed2a8226e0ae12403943), [`4c146c682`](https://github.com/graphcommerce-org/graphcommerce/commit/4c146c68242e6edc616807fb73173cc959c26034)]:
  - @graphcommerce/next-ui@4.8.0
  - @graphcommerce/magento-product@4.3.5
  - @graphcommerce/magento-customer@4.3.0
  - @graphcommerce/magento-cart@4.2.15
  - @graphcommerce/magento-store@4.2.4

## 3.0.20

### Patch Changes

- Updated dependencies [[`c30893857`](https://github.com/graphcommerce-org/graphcommerce/commit/c3089385791291e812a48c2691a39a2325ee0439)]:
  - @graphcommerce/magento-store@4.2.3
  - @graphcommerce/magento-cart@4.2.14
  - @graphcommerce/magento-customer@4.2.12
  - @graphcommerce/magento-product@4.3.4

## 3.0.19

### Patch Changes

- [#1451](https://github.com/graphcommerce-org/graphcommerce/pull/1451) [`f698ff85d`](https://github.com/graphcommerce-org/graphcommerce/commit/f698ff85df6bb0922288471bb3c81856091b8061) Thanks [@paales](https://github.com/paales)! - Removed all occurences of @lingui/macro and moved to @lingui/macro / @lingui/core in preparation to move to swc.

  Since we've removed @lingui/macro, all occurences need to be replaced with @lingui/core and @lingui/react.

  All occurences of `<Trans>` and `t` need to be replaced:

  ```tsx
  import { Trans, t } from '@lingui/macro'

  function MyComponent() {
    const foo = 'bar'
    return (
      <div aria-label={t`Account ${foo}`}>
        <Trans>My Translation {foo}</Trans>
      </div>
    )
  }
  ```

  Needs to be replaced with:

  ```tsx
  import { Trans } from '@lingui/react'
  import { i18n } from '@lingui/core'

  function MyComponent() {
    const foo = 'bar'
    return (
      <div aria-label={i18n._(/* i18n */ `Account {foo}`, { foo })}>
        <Trans key='My Translation {foo}' values={{ foo }}></Trans>
      </div>
    )
  }
  ```

  [More examples for Trans](https://lingui.js.org/ref/macro.html#examples-of-jsx-macros) and [more examples for `t`](https://lingui.js.org/ref/macro.html#examples-of-js-macros)

- Updated dependencies [[`50188e378`](https://github.com/graphcommerce-org/graphcommerce/commit/50188e378b4c77561ebc600958ea11cd114fa61a), [`f698ff85d`](https://github.com/graphcommerce-org/graphcommerce/commit/f698ff85df6bb0922288471bb3c81856091b8061)]:
  - @graphcommerce/react-hook-form@3.1.3
  - @graphcommerce/magento-cart@4.2.13
  - @graphcommerce/magento-customer@4.2.11
  - @graphcommerce/magento-product@4.3.3
  - @graphcommerce/magento-store@4.2.2
  - @graphcommerce/next-ui@4.7.2
  - @graphcommerce/graphql@3.1.3

## 3.0.18

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/magento-cart@4.2.12
  - @graphcommerce/magento-customer@4.2.10
  - @graphcommerce/magento-product@4.3.2

## 3.0.17

### Patch Changes

- Updated dependencies [[`25ef6cf08`](https://github.com/graphcommerce-org/graphcommerce/commit/25ef6cf08c278105307d6f604b7135d637e9046c), [`80e30bb77`](https://github.com/graphcommerce-org/graphcommerce/commit/80e30bb77015755fbc00a7935d590f80c1c1c18c)]:
  - @graphcommerce/graphql@3.1.2
  - @graphcommerce/magento-customer@4.2.9
  - @graphcommerce/magento-cart@4.2.11
  - @graphcommerce/magento-product@4.3.1
  - @graphcommerce/magento-store@4.2.1
  - @graphcommerce/next-ui@4.7.1

## 3.0.16

### Patch Changes

- Updated dependencies [[`669a17a97`](https://github.com/graphcommerce-org/graphcommerce/commit/669a17a973c47c00fed4a649a9da0bfc5670c5da)]:
  - @graphcommerce/magento-product@4.3.0

## 3.0.15

### Patch Changes

- Updated dependencies [[`f3d06dd83`](https://github.com/graphcommerce-org/graphcommerce/commit/f3d06dd836c9a76412b419d4d2c79bbd0ee92e04)]:
  - @graphcommerce/magento-product@4.2.0
  - @graphcommerce/magento-store@4.2.0
  - @graphcommerce/next-ui@4.7.0
  - @graphcommerce/magento-cart@4.2.10
  - @graphcommerce/magento-customer@4.2.8

## 3.0.14

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/magento-cart@4.2.9
  - @graphcommerce/magento-customer@4.2.7
  - @graphcommerce/magento-product@4.1.11
  - @graphcommerce/magento-store@4.1.9

## 3.0.13

### Patch Changes

- Updated dependencies [[`b6b8bb5b3`](https://github.com/graphcommerce-org/graphcommerce/commit/b6b8bb5b31b0891ea24733de34a3bd5c0a9604e4), [`100f4c38c`](https://github.com/graphcommerce-org/graphcommerce/commit/100f4c38c8fcda4bc6e0425e38028b550b60adc2)]:
  - @graphcommerce/magento-product@4.1.10
  - @graphcommerce/graphql@3.1.1
  - @graphcommerce/next-ui@4.6.2
  - @graphcommerce/react-hook-form@3.1.2
  - @graphcommerce/magento-customer@4.2.6
  - @graphcommerce/magento-store@4.1.8
  - @graphcommerce/magento-cart@4.2.8

## 3.0.12

### Patch Changes

- Updated dependencies [[`a52a863f9`](https://github.com/graphcommerce-org/graphcommerce/commit/a52a863f9c69c6b3ae657dcce3bc9b14413ce125)]:
  - @graphcommerce/magento-product@4.1.9

## 3.0.11

### Patch Changes

- Updated dependencies [[`d8906cf4a`](https://github.com/graphcommerce-org/graphcommerce/commit/d8906cf4afbfc234aedd91a2c581f82623267357)]:
  - @graphcommerce/magento-cart@4.2.7
  - @graphcommerce/magento-customer@4.2.5
  - @graphcommerce/magento-product@4.1.8

## 3.0.10

### Patch Changes

- [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`da0ae7d02`](https://github.com/graphcommerce-org/graphcommerce/commit/da0ae7d0236e4908ba0bf0fa16656be516e841d4) Thanks [@paales](https://github.com/paales)! - Updated dependencies

- Updated dependencies [[`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542), [`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542), [`da0ae7d02`](https://github.com/graphcommerce-org/graphcommerce/commit/da0ae7d0236e4908ba0bf0fa16656be516e841d4)]:
  - @graphcommerce/graphql@3.1.0
  - @graphcommerce/magento-cart@4.2.6
  - @graphcommerce/magento-customer@4.2.4
  - @graphcommerce/magento-product@4.1.7
  - @graphcommerce/magento-store@4.1.7
  - @graphcommerce/next-ui@4.6.1
  - @graphcommerce/react-hook-form@3.1.1
  - @graphcommerce/image@3.1.5

## 3.0.9

### Patch Changes

- Updated dependencies [[`4169b8c68`](https://github.com/graphcommerce-org/graphcommerce/commit/4169b8c686f682ff6e981b029f13abd87fd5f52a)]:
  - @graphcommerce/magento-customer@4.2.3
  - @graphcommerce/magento-cart@4.2.5
  - @graphcommerce/magento-product@4.1.6

## 3.0.8

### Patch Changes

- Updated dependencies [[`3c801f45c`](https://github.com/graphcommerce-org/graphcommerce/commit/3c801f45c7df55131acf30ae2fe0d2344830d480), [`b8d04130a`](https://github.com/graphcommerce-org/graphcommerce/commit/b8d04130a1b1cb8fc85308939235140288744465), [`3192fab82`](https://github.com/graphcommerce-org/graphcommerce/commit/3192fab82560e2211dfcacadc3b0b305260527d8), [`104abd14e`](https://github.com/graphcommerce-org/graphcommerce/commit/104abd14e1585ef0d8de77937d25156b8fa1e201), [`0e425e85e`](https://github.com/graphcommerce-org/graphcommerce/commit/0e425e85ee8fed280349317ee0440c7bceea5823), [`2a125b1f9`](https://github.com/graphcommerce-org/graphcommerce/commit/2a125b1f98bb9272d96c3577f21d6c984caad892), [`8a354d1cd`](https://github.com/graphcommerce-org/graphcommerce/commit/8a354d1cd4757497ddfc9b1969a0addbc8ff616b), [`9b3488c6a`](https://github.com/graphcommerce-org/graphcommerce/commit/9b3488c6a03cc09a647f43f6a8b36d96e97e5bb8)]:
  - @graphcommerce/next-ui@4.6.0
  - @graphcommerce/magento-cart@4.2.4
  - @graphcommerce/react-hook-form@3.1.0
  - @graphcommerce/image@3.1.4
  - @graphcommerce/magento-product@4.1.5
  - @graphcommerce/magento-customer@4.2.2
  - @graphcommerce/magento-store@4.1.6

## 3.0.7

### Patch Changes

- [#1378](https://github.com/graphcommerce-org/graphcommerce/pull/1378) [`b610a6e40`](https://github.com/graphcommerce-org/graphcommerce/commit/b610a6e4049e8c9e8b5d2aeff31b8e1bfc24abe5) Thanks [@paales](https://github.com/paales)! - Pin all versions internally so we can’t end up in an unfixable state for the user

- Updated dependencies [[`b610a6e40`](https://github.com/graphcommerce-org/graphcommerce/commit/b610a6e4049e8c9e8b5d2aeff31b8e1bfc24abe5), [`22ff9df16`](https://github.com/graphcommerce-org/graphcommerce/commit/22ff9df1677742ae8e07d9b7e5b12fbb487580dc)]:
  - @graphcommerce/graphql@3.0.7
  - @graphcommerce/image@3.1.3
  - @graphcommerce/magento-cart@4.2.3
  - @graphcommerce/magento-customer@4.2.1
  - @graphcommerce/magento-product@4.1.4
  - @graphcommerce/magento-store@4.1.5
  - @graphcommerce/next-ui@4.5.1
  - @graphcommerce/react-hook-form@3.0.7

## 3.0.6

### Patch Changes

- [#1369](https://github.com/graphcommerce-org/graphcommerce/pull/1369) [`ae6449502`](https://github.com/graphcommerce-org/graphcommerce/commit/ae64495024a455bbe5188588604368c1542840c9) Thanks [@paales](https://github.com/paales)! - Upgraded dependencies

- Updated dependencies [[`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`ae6449502`](https://github.com/graphcommerce-org/graphcommerce/commit/ae64495024a455bbe5188588604368c1542840c9), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`6213f0b0f`](https://github.com/graphcommerce-org/graphcommerce/commit/6213f0b0f5f53d622b993d9f7ea96cbbeb5bd670), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a)]:
  - @graphcommerce/graphql@3.0.6
  - @graphcommerce/next-ui@4.5.0
  - @graphcommerce/image@3.1.2
  - @graphcommerce/magento-cart@4.2.2
  - @graphcommerce/magento-customer@4.2.0
  - @graphcommerce/magento-product@4.1.3
  - @graphcommerce/magento-store@4.1.4
  - @graphcommerce/react-hook-form@3.0.6

## 3.0.5

### Patch Changes

- [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655) Thanks [@paales](https://github.com/paales)! - All default exports are now named exports internally and all `index.tsx` are renamed to the component name.

* [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

* Updated dependencies [[`3d63b39f7`](https://github.com/ho-nl/m2-pwa/commit/3d63b39f7e330d1827a32dba782667d7b21adaba), [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655), [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef)]:
  - @graphcommerce/next-ui@4.2.4
  - @graphcommerce/graphql@3.0.4
  - @graphcommerce/image@3.1.1
  - @graphcommerce/magento-cart@4.1.4
  - @graphcommerce/magento-customer@4.1.4
  - @graphcommerce/magento-product@4.0.6
  - @graphcommerce/magento-store@4.1.2
  - @graphcommerce/react-hook-form@3.0.4

## 3.0.4

### Patch Changes

- [#1292](https://github.com/ho-nl/m2-pwa/pull/1292) [`5a1ba9e66`](https://github.com/ho-nl/m2-pwa/commit/5a1ba9e664abbac89c4f5f71f7d6d6ed1aefa5c0) Thanks [@paales](https://github.com/paales)! - Renamed SvgIcon to IconSvg to prevent collisions with MUI

- Updated dependencies [[`5a1ba9e66`](https://github.com/ho-nl/m2-pwa/commit/5a1ba9e664abbac89c4f5f71f7d6d6ed1aefa5c0), [`990df655b`](https://github.com/ho-nl/m2-pwa/commit/990df655b73b469718d6cb5837ee65dfe2ad6a1d), [`63f9b56eb`](https://github.com/ho-nl/m2-pwa/commit/63f9b56eb68ba790567ff1427e599fd2c3c8f1ee)]:
  - @graphcommerce/magento-cart@4.1.3
  - @graphcommerce/magento-customer@4.1.3
  - @graphcommerce/magento-product@4.0.5
  - @graphcommerce/next-ui@4.2.0

## 3.0.3

### Patch Changes

- [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96) Thanks [@paales](https://github.com/paales)! - made packages public

- Updated dependencies [[`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96), [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20), [`3a719c88c`](https://github.com/ho-nl/m2-pwa/commit/3a719c88cad1eab58602de28c41adc0fc4827e1d), [`5ffcb56bf`](https://github.com/ho-nl/m2-pwa/commit/5ffcb56bfcbe49ebeaf24f9341e819a145ab9a14)]:
  - @graphcommerce/graphql@3.0.3
  - @graphcommerce/image@3.1.0
  - @graphcommerce/magento-cart@4.1.2
  - @graphcommerce/magento-customer@4.1.2
  - @graphcommerce/magento-product@4.0.3
  - @graphcommerce/magento-store@4.0.3
  - @graphcommerce/next-ui@4.1.2
  - @graphcommerce/react-hook-form@3.0.3

## 3.0.2

### Patch Changes

- [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2) Thanks [@paales](https://github.com/paales)! - We've moved lots of internal packages from `dependencies` to `peerDependencies`. The result of this is that there will be significantly less duplicate packages in the node_modules folders.

* [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d) Thanks [@paales](https://github.com/paales)! - Upgraded to [NextJS 12.1](https://nextjs.org/blog/next-12-1)! This is just for compatibility, but we'll be implementing [On-demand Incremental Static Regeneration](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta) soon.

  This will greatly reduce the requirement to rebuid stuff and we'll add a management UI on the frontend to be able to revalidate pages manually.

* Updated dependencies [[`381e4c86a`](https://github.com/ho-nl/m2-pwa/commit/381e4c86a8321ce96e1fa5c7d3c0a0c0ff3e02c7), [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2), [`e7c8e2756`](https://github.com/ho-nl/m2-pwa/commit/e7c8e2756d637cbcd2e793d62ef5721d35d9fa7b), [`b08a8eb1d`](https://github.com/ho-nl/m2-pwa/commit/b08a8eb1d024b9d3e7712ef034029151670db275), [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d), [`5a4809b1a`](https://github.com/ho-nl/m2-pwa/commit/5a4809b1a705aa32f620f520085df48ee25f9949)]:
  - @graphcommerce/magento-cart@4.1.1
  - @graphcommerce/magento-customer@4.1.1
  - @graphcommerce/next-ui@4.1.1
  - @graphcommerce/react-hook-form@3.0.2
  - @graphcommerce/graphql@3.0.2
  - @graphcommerce/image@3.0.2
  - @graphcommerce/magento-product@4.0.2
  - @graphcommerce/magento-store@4.0.2

## 3.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514) Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files, so that the packages link to back to the website and repository
- Updated dependencies [[`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514)]:
  - @graphcommerce/graphql@3.0.1
  - @graphcommerce/image@3.0.1
  - @graphcommerce/magento-cart@4.0.1
  - @graphcommerce/magento-customer@4.0.1
  - @graphcommerce/magento-product@4.0.1
  - @graphcommerce/magento-store@4.0.1
  - @graphcommerce/next-ui@4.0.1
  - @graphcommerce/react-hook-form@3.0.1

## 3.0.0

### Major Changes

- [#1258](https://github.com/ho-nl/m2-pwa/pull/1258) [`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05) Thanks [@paales](https://github.com/paales)! - Upgraded to Material UI 5

### Patch Changes

- Updated dependencies [[`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05)]:
  - @graphcommerce/graphql@3.0.0
  - @graphcommerce/image@3.0.0
  - @graphcommerce/magento-cart@4.0.0
  - @graphcommerce/magento-customer@4.0.0
  - @graphcommerce/magento-product@4.0.0
  - @graphcommerce/magento-store@4.0.0
  - @graphcommerce/next-ui@4.0.0
  - @graphcommerce/react-hook-form@3.0.0

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.110.18](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.110.17...@graphcommerce/magento-cart-items@2.110.18) (2021-12-17)

### Bug Fixes

- remove prop required in cart ([f22ba07](https://github.com/ho-nl/m2-pwa/commit/f22ba07960afa44422df1df3b80da687bbc8c5e8))

# [2.110.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.109.1...@graphcommerce/magento-cart-items@2.110.0) (2021-11-12)

### Bug Fixes

- even more translations ([1a1f988](https://github.com/ho-nl/m2-pwa/commit/1a1f98837c704b978f6b42b619d9c52f540b2d48))

### Features

- added tons of translations ([9bb0ac7](https://github.com/ho-nl/m2-pwa/commit/9bb0ac709b58df6ea6141e92e4923a5ca9ae2963))

# [2.109.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.108.20...@graphcommerce/magento-cart-items@2.109.0) (2021-11-12)

### Features

- remove svg stroke definitions, set all to currentColor ([189814f](https://github.com/ho-nl/m2-pwa/commit/189814f822d111c8adc6be1fff65c9a4a4c50c65))

## [2.108.20](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.108.19...@graphcommerce/magento-cart-items@2.108.20) (2021-11-12)

### Bug Fixes

- remove delivery label ([c799405](https://github.com/ho-nl/m2-pwa/commit/c799405e18f7fc2654df67b0c401dfcdef41fd6c))

## [2.108.15](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.108.14...@graphcommerce/magento-cart-items@2.108.15) (2021-11-09)

### Bug Fixes

- font sizes ([1cf7d45](https://github.com/ho-nl/m2-pwa/commit/1cf7d451c3f8bdd064fdf351dffafced97387aff))

## [2.108.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.108.8...@graphcommerce/magento-cart-items@2.108.9) (2021-11-04)

### Bug Fixes

- mobile cart ([fcafe5d](https://github.com/ho-nl/m2-pwa/commit/fcafe5d446f14fca6579d9005dd57389040c4cd3))
- remove hardcoded fontSize ([e4e09e1](https://github.com/ho-nl/m2-pwa/commit/e4e09e11baeb8edeff634550b8cdb88571d96911))

# [2.108.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.107.5...@graphcommerce/magento-cart-items@2.108.0) (2021-11-02)

### Bug Fixes

- darkTheme ([d0517af](https://github.com/ho-nl/m2-pwa/commit/d0517af5a788532c48f567ee3e840986efa26a67))

### Features

- darkTheme ([968f4f1](https://github.com/ho-nl/m2-pwa/commit/968f4f1360417bf7daa36454c19e6bc5cf53ae90))
- darkTheme ([3ed6647](https://github.com/ho-nl/m2-pwa/commit/3ed664714670315bc9f20542549724f66cb5052d))

## [2.107.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.107.0...@graphcommerce/magento-cart-items@2.107.1) (2021-10-28)

### Bug Fixes

- External SVG's can't have alt tags ([1b1414a](https://github.com/ho-nl/m2-pwa/commit/1b1414a782d55d3acf7b0e6bcaa50f2ad5f18f39))

# [2.107.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.106.2...@graphcommerce/magento-cart-items@2.107.0) (2021-10-28)

### Features

- dynamic icons, update SvgImage uses to SvgImageSimple ([3d3cc0e](https://github.com/ho-nl/m2-pwa/commit/3d3cc0e0336fcde1cce6ba19705f82c1edf9bfc6))

# [2.106.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.105.7...@graphcommerce/magento-cart-items@2.106.0) (2021-10-27)

### Features

- **nextjs:** upgraded to nextjs 12 ([9331bc8](https://github.com/ho-nl/m2-pwa/commit/9331bc801f6419522115cc47d291d49d608d5a90))

# [2.105.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.104.29...@graphcommerce/magento-cart-items@2.105.0) (2021-10-18)

### Features

- **message-snackbar:** severity props ([c7be8a5](https://github.com/ho-nl/m2-pwa/commit/c7be8a51faf7a5937b7fab5bb352df2089ae4eea))

## [2.104.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.104.0...@graphcommerce/magento-cart-items@2.104.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/magento-cart-items

# 2.104.0 (2021-09-27)

### Bug Fixes

- app shell consistency wip ([be995ca](https://github.com/ho-nl/m2-pwa/commit/be995ca5c3e383b89fea3759186d53af4790e99b))
- cart item image sizes ([e7c860c](https://github.com/ho-nl/m2-pwa/commit/e7c860c785e172b9275e1a00c8b51509d6b297a8))
- **cart:** be able to remove items from cart ([9c7f939](https://github.com/ho-nl/m2-pwa/commit/9c7f9397e9904e08014e7509d3ca63df8c062032))
- **cart:** display prices with taxes for specific store views ([fd25541](https://github.com/ho-nl/m2-pwa/commit/fd25541646c41111f5ea53822d244591cb08b199))
- **cart:** mobile styles ([aa601af](https://github.com/ho-nl/m2-pwa/commit/aa601af28ca7190ad90c33cc180fe63a28682519))
- display prices excl and incl tax ([0d41135](https://github.com/ho-nl/m2-pwa/commit/0d411350e4621928411c2800be6ea02c6125049a))
- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
- **image:** fix build ([b730cb6](https://github.com/ho-nl/m2-pwa/commit/b730cb6ae4e50dcf2f60e2046d6acf3047caacb3))
- implement next-ui barrel imports ([75bea70](https://github.com/ho-nl/m2-pwa/commit/75bea703dba898f18a2a1dfa3243ebd0a4e6f0e1))

### Features

- **cart:** when a cart is not active anymore show a clear cart button ([5d04a14](https://github.com/ho-nl/m2-pwa/commit/5d04a14726c040b20b34c0b88f923aee1dff22e5))
- **graphql:** introduced new graphql package that holds all generated files ([a3e7aa0](https://github.com/ho-nl/m2-pwa/commit/a3e7aa05540540533b5ced9a95f1f802ecbe499f))
- **image:** introduced completely rewritten Image component ([e3413b3](https://github.com/ho-nl/m2-pwa/commit/e3413b3a57392d6571ea64cb8d9c8dca05ea31df))
- next.js 11 ([7d61407](https://github.com/ho-nl/m2-pwa/commit/7d614075a778f488045034f74be4f75b93f63c43))
- **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of [@reachdigital](https://github.com/reachdigital) ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
- **theme:** restructured fonts and applied to home and category page ([6adf5f1](https://github.com/ho-nl/m2-pwa/commit/6adf5f11321bdfbf499125f1161c5abf5a1bfe4a))
- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))
- useFormMutationCart and simpler imports ([012f090](https://github.com/ho-nl/m2-pwa/commit/012f090e8f54d09f35d393c61ad1e2319f5a90ff))

### Reverts

- Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

# Change Log

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.103.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.103.10...@graphcommerce/magento-cart-items@2.103.11) (2021-08-27)

### Bug Fixes

- app shell consistency wip ([be995ca](https://github.com/ho-nl/m2-pwa/commit/be995ca5c3e383b89fea3759186d53af4790e99b))

## [2.103.10](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.103.9...@graphcommerce/magento-cart-items@2.103.10) (2021-08-26)

### Bug Fixes

- **cart:** mobile styles ([aa601af](https://github.com/ho-nl/m2-pwa/commit/aa601af28ca7190ad90c33cc180fe63a28682519))

## [2.103.8](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.103.7...@graphcommerce/magento-cart-items@2.103.8) (2021-08-18)

### Bug Fixes

- **cart:** display prices with taxes for specific store views ([fd25541](https://github.com/ho-nl/m2-pwa/commit/fd25541646c41111f5ea53822d244591cb08b199))
- display prices excl and incl tax ([0d41135](https://github.com/ho-nl/m2-pwa/commit/0d411350e4621928411c2800be6ea02c6125049a))

# [2.103.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.102.3...@graphcommerce/magento-cart-items@2.103.0) (2021-08-12)

### Features

- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.102.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.102.1...@graphcommerce/magento-cart-items@2.102.2) (2021-08-09)

### Reverts

- Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.101.6...@graphcommerce/magento-cart-items@2.102.0) (2021-08-06)

### Features

- **theme:** restructured fonts and applied to home and category page ([6adf5f1](https://github.com/ho-nl/m2-pwa/commit/6adf5f11321bdfbf499125f1161c5abf5a1bfe4a))

## [2.101.6](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.101.5...@graphcommerce/magento-cart-items@2.101.6) (2021-08-04)

### Bug Fixes

- cart item image sizes ([e7c860c](https://github.com/ho-nl/m2-pwa/commit/e7c860c785e172b9275e1a00c8b51509d6b297a8))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.100.19...@graphcommerce/magento-cart-items@2.101.0) (2021-07-26)

### Features

- **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))

## [2.100.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-items@2.100.10...@graphcommerce/magento-cart-items@2.100.11) (2021-07-20)

### Bug Fixes

- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
