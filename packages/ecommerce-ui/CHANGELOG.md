# @graphcommerce/ecommerce-ui

## 9.0.4-canary.10

## 9.0.4-canary.9

## 9.0.4-canary.8

## 9.0.4-canary.7

## 9.0.4-canary.6

## 9.0.4-canary.5

## 9.0.4-canary.4

### Patch Changes

- [`026114e`](https://github.com/graphcommerce-org/graphcommerce/commit/026114ece325d8f675ba8820c6b63345e48532fa) - Sovle issue where showValid would be forwarded to the textField element ([@paales](https://github.com/paales))

## 9.0.4-canary.3

## 9.0.4-canary.2

## 9.0.4-canary.1

### Patch Changes

- [#2470](https://github.com/graphcommerce-org/graphcommerce/pull/2470) [`910e6aa`](https://github.com/graphcommerce-org/graphcommerce/commit/910e6aab024a925bb042cf17968b2ab826f97d88) - Refactor the FormComponents for better TypeScript checking performance. ([@paales](https://github.com/paales))

## 9.0.4-canary.0

## 9.0.0

### Major Changes

- [#2366](https://github.com/graphcommerce-org/graphcommerce/pull/2366) [`3612c99`](https://github.com/graphcommerce-org/graphcommerce/commit/3612c994b80bb3b1bc02de10668f69a332402dc4) - Add `permissions` configuration to disable functionalities.

  - Added new `permissions` configuration for GraphCommerce
  - Added `permissions.cart`: `ENABLED` | `CUSTOMER_ONLY` | `DISABLED`
  - Added `permissions.checkout`: `ENABLED` | `CUSTOMER_ONLY` | `DISABLED`
  - Added `permissions.customerAccount`: `ENABLED` | `DISABLE_REGISTRATION` | `DISABLE` ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

### Minor Changes

- [#2319](https://github.com/graphcommerce-org/graphcommerce/pull/2319) [`a3409e8`](https://github.com/graphcommerce-org/graphcommerce/commit/a3409e8a629ee95413da6547cbdcf48aa2502c23) - Created a new `<TelephoneElement />` component to make re-use easier. ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

- [#2301](https://github.com/graphcommerce-org/graphcommerce/pull/2301) [`13d0649`](https://github.com/graphcommerce-org/graphcommerce/commit/13d06498d121f93b52c25930e50aa3b0bd12a818) - Created a new `<EmailElement/>` component to make re-use easier. ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

### Patch Changes

- [#2436](https://github.com/graphcommerce-org/graphcommerce/pull/2436) [`55f94c5`](https://github.com/graphcommerce-org/graphcommerce/commit/55f94c5dd70e88b8fbfb46e75b500db296937c33) - Added ref forwarding for the inputRef ([@paales](https://github.com/paales))

- [#2341](https://github.com/graphcommerce-org/graphcommerce/pull/2341) [`7085b4a`](https://github.com/graphcommerce-org/graphcommerce/commit/7085b4a86088328fe54dc4e82ccd296d6459cae7) - Updated all form `<FieldElement />` components to also accept `defaultValue`, `shouldUnregister` and `disabled`. Moved `<AutoCompleteElement />`, `<CheckboxElement />`, `<MultiSelectElement />`, `<SliderElement />`, `<SwitchElement />`, `<ToggleButtonGroup />` to `useController`. Removed all `parseError` props. ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

- [#2234](https://github.com/graphcommerce-org/graphcommerce/pull/2234) [`0767bc4`](https://github.com/graphcommerce-org/graphcommerce/commit/0767bc40f7b596209f24ca4e745ff0441f3275c9) - Upgrade input components to no longer use `muiRegister`, which improves INP scores. ([@FrankHarland](https://github.com/FrankHarland))

- [#2397](https://github.com/graphcommerce-org/graphcommerce/pull/2397) [`d4d5a98`](https://github.com/graphcommerce-org/graphcommerce/commit/d4d5a983dea6d034dcbdeed9cf30fb33133dde39) - Add requireOptionSelection boolean to prevent users from deselecting configurable options ([@carlocarels90](https://github.com/carlocarels90))

- [#2234](https://github.com/graphcommerce-org/graphcommerce/pull/2234) [`43bd04a`](https://github.com/graphcommerce-org/graphcommerce/commit/43bd04a777c5800cc7e01bee1e123a5aad82f194) - Make sure the `<TextFieldElement/>` doesn’t give a uncontrolled to controlled warning. Convert `<SelectElement/>` to `useController` instead of a separate Controller component. Make sure the original `endAdornment` is always shown only until the value is valid. ([@FrankHarland](https://github.com/FrankHarland))

- [#2234](https://github.com/graphcommerce-org/graphcommerce/pull/2234) [`d4e693d`](https://github.com/graphcommerce-org/graphcommerce/commit/d4e693d553198c9a1ef398d000ca23d209e6c2ba) - The `<WaitForQueries/>` component now uses the `useIsSSR` hook which prevents loading spinners when navigating on the client, which make all account/cart/checkout pages faster. ([@FrankHarland](https://github.com/FrankHarland))

- [#2380](https://github.com/graphcommerce-org/graphcommerce/pull/2380) [`c17e5f1`](https://github.com/graphcommerce-org/graphcommerce/commit/c17e5f1cf9fb291b9bbf1fca0620c2721dceb331) - Solve issue: Warning: Cannot update a component (`FormAutoSubmitBase`) while rendering a different component (`ActionCardListForm`). ([@paales](https://github.com/paales))

- [#2424](https://github.com/graphcommerce-org/graphcommerce/pull/2424) [`66b4188`](https://github.com/graphcommerce-org/graphcommerce/commit/66b418809ad4db2a465c4112ff9850ce0cfe611c) - Omit disableUnderline prop for ‘outlined’ variant, because its not supported. ([@carlocarels90](https://github.com/carlocarels90))

- [#2341](https://github.com/graphcommerce-org/graphcommerce/pull/2341) [`022cbd6`](https://github.com/graphcommerce-org/graphcommerce/commit/022cbd664ea4e8a82997c5edf4451b9182558429) - Moved `<ActionCardListForm />` to `@graphcommerce/ecommerce-ui` to resolve issue with circular dependencies. ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

- [#2438](https://github.com/graphcommerce-org/graphcommerce/pull/2438) [`cb8d2f0`](https://github.com/graphcommerce-org/graphcommerce/commit/cb8d2f0059d64242260e30ce34655868f204ef4c) - Made all component prop types exported ([@bramvanderholst](https://github.com/bramvanderholst))

- [#2419](https://github.com/graphcommerce-org/graphcommerce/pull/2419) [`ccd952e`](https://github.com/graphcommerce-org/graphcommerce/commit/ccd952e60904e91d62819d5abaea1798e4d4d95d) - Destructure InputProps to ensure they are passed only to relevant components. ([@carlocarels90](https://github.com/carlocarels90))

- [#2349](https://github.com/graphcommerce-org/graphcommerce/pull/2349) [`7c8529e`](https://github.com/graphcommerce-org/graphcommerce/commit/7c8529ea54c0e91f6b0e72129611cd6bf4f85d87) - Solve issue where `<NumberFieldElement />` would allow numbers below zero when `min = 0`. ([@JoshuaS98](https://github.com/JoshuaS98))

- [#2438](https://github.com/graphcommerce-org/graphcommerce/pull/2438) [`49937fd`](https://github.com/graphcommerce-org/graphcommerce/commit/49937fd765338e25899d427ee4d799fa7978faeb) - Allow changing various props for internal components ([@bramvanderholst](https://github.com/bramvanderholst))

## 8.0.3

### Patch Changes

- [#2212](https://github.com/graphcommerce-org/graphcommerce/pull/2212) [`e12d1dc`](https://github.com/graphcommerce-org/graphcommerce/commit/e12d1dc201bf7b23a996bd58a256a117b91a9334) - Rename validation to rules for all Form field components and deprecate validation ([@paales](https://github.com/paales))

- [#2203](https://github.com/graphcommerce-org/graphcommerce/pull/2203) [`7ef7dc7`](https://github.com/graphcommerce-org/graphcommerce/commit/7ef7dc7631f61a2feba67a531a210df9c22fed4b) - CheckboxElement, MultiSelectElement, NumberFieldElement, SelectElement, SliderElement and TextFieldElement have their inputRef passed, allowing focus to be set by the form. ([@Jessevdpoel](https://github.com/Jessevdpoel))

- [#2205](https://github.com/graphcommerce-org/graphcommerce/pull/2205) [`eb14696`](https://github.com/graphcommerce-org/graphcommerce/commit/eb14696fc65e084a06790c88a8218fb3003f7c2c) - `<WaitForQueries/>` will default to loading, restoring the previous behavior. This might introduce , this might introduce an additional spinner but prevents a flash where it is shown that there is no cart ([@paales](https://github.com/paales))

## 8.0.0

### Minor Changes

- [#2111](https://github.com/graphcommerce-org/graphcommerce/pull/2111) [`35f3d3e`](https://github.com/graphcommerce-org/graphcommerce/commit/35f3d3eaf46f4b782bb1149e0efb0ec3819442d6) - Only show network errors in development mode. ([@Jessevdpoel](https://github.com/Jessevdpoel))

- [#2048](https://github.com/graphcommerce-org/graphcommerce/pull/2048) [`13e23e4`](https://github.com/graphcommerce-org/graphcommerce/commit/13e23e4265bac70fb4d0830e4661019e71ce299f) - Wishlist will now support configurable products and uses the `<ActionCardLayout/>` ([@Jessevdpoel](https://github.com/Jessevdpoel))

- [#2018](https://github.com/graphcommerce-org/graphcommerce/pull/2018) [`750aa6a`](https://github.com/graphcommerce-org/graphcommerce/commit/750aa6a72710869d54244467253212e551d335e0) - Changed the layout of the succes page. We are using ActionCards right now to match the design of the cart. ([@Jessevdpoel](https://github.com/Jessevdpoel))

### Patch Changes

- [`e33660f`](https://github.com/graphcommerce-org/graphcommerce/commit/e33660f172466dcfa0ab7262cee612d9a3e47776) - Accessibility improvements for the frontend: Added skip content link. Removed empty buttons from tab flow. Gave focus to elements (such as the menu) that appear when after clicking a button. Improved aria labels where needed ([@FrankHarland](https://github.com/FrankHarland))

## 7.0.0

### Major Changes

- [`e55d8c390`](https://github.com/graphcommerce-org/graphcommerce/commit/e55d8c390d90b4bb7bab11c6a99027ac72bd7e3e) - Created a new sidebar layout system, can be configured with productFiltersLayout in the graphcommerce.config.js ([@paales](https://github.com/paales))

### Minor Changes

- [#1962](https://github.com/graphcommerce-org/graphcommerce/pull/1962) [`518b6ca24`](https://github.com/graphcommerce-org/graphcommerce/commit/518b6ca248fc94624dc06eb02de5b3eac0fc9483) - Created a new `<ValidatedPasswordElement/>` which validates according to Magento's validation groups and implement on all locations. Move remaining password fields to `<PasswordElement />` ([@carlocarels90](https://github.com/carlocarels90))

### Patch Changes

- [#1905](https://github.com/graphcommerce-org/graphcommerce/pull/1905) [`b6adbe1c3`](https://github.com/graphcommerce-org/graphcommerce/commit/b6adbe1c304c83c67c9e63f9a95d55ff64718725) - FormComponent elements validation message wasn't translated ([@carlocarels90](https://github.com/carlocarels90))

- [#2031](https://github.com/graphcommerce-org/graphcommerce/pull/2031) [`4d8fc9e99`](https://github.com/graphcommerce-org/graphcommerce/commit/4d8fc9e998fc9361282833316ec9564da0644ed6) - Eslint fixes and suppress accepted warnings ([@paales](https://github.com/paales))

## 6.1.0

### Patch Changes

- [#1900](https://github.com/graphcommerce-org/graphcommerce/pull/1900) [`92e1f1742`](https://github.com/graphcommerce-org/graphcommerce/commit/92e1f1742b03cfc0aed7e1d103b8295509a2ca45) - make the SelectElement validation message translatable ([@carlocarels90](https://github.com/carlocarels90))

- [#1871](https://github.com/graphcommerce-org/graphcommerce/pull/1871) [`1e2d2e5c6`](https://github.com/graphcommerce-org/graphcommerce/commit/1e2d2e5c615f072a2d0b60074d9aa5a467876f2f) - Allow styling FormControl in CheckboxElement ([@bramvanderholst](https://github.com/bramvanderholst))

## 6.0.0

### Patch Changes

- [#1821](https://github.com/graphcommerce-org/graphcommerce/pull/1821) [`1abc50a21`](https://github.com/graphcommerce-org/graphcommerce/commit/1abc50a21103270fad04e4a9ea892ee1e75233e9) - Upgrade packages to latest version ([@paales](https://github.com/paales))

## 5.1.0

### Patch Changes

- [#1745](https://github.com/graphcommerce-org/graphcommerce/pull/1745) [`b1444b933`](https://github.com/graphcommerce-org/graphcommerce/commit/b1444b9336107d3ac111563f9b62a884f1b26a8d) - Bring password reset page more in line with standard forms, add missing translations. ([@github-actions](https://github.com/apps/github-actions))

- [#1752](https://github.com/graphcommerce-org/graphcommerce/pull/1752) [`2a6a4d9ec`](https://github.com/graphcommerce-org/graphcommerce/commit/2a6a4d9ecfa1b58a66ba9b9d00016d6feda9aa95) - Updated dependencies to latest versions, except for nextjs; Solve tons of peer dependency issues.

  - Updated the @mui/material package
  - Removed dependencies on react-hook-form-mui and @playwright/test
  - Upgraded dependencies including type-fest and graphql-mesh
  - Solved peer dependency issues ([@paales](https://github.com/paales))

- [#1752](https://github.com/graphcommerce-org/graphcommerce/pull/1752) [`56d950ba3`](https://github.com/graphcommerce-org/graphcommerce/commit/56d950ba3d31828467b34f7e163586b628567a43) - Removed dependency on react-hook-form-mui ([@paales](https://github.com/paales))

## 5.0.0

### Major Changes

- [#1734](https://github.com/graphcommerce-org/graphcommerce/pull/1734) [`e4c7fe17e`](https://github.com/graphcommerce-org/graphcommerce/commit/e4c7fe17e413e37362ceae92e67f1b3a5f62d398) - Bump major version of all packages ([@github-actions](https://github.com/apps/github-actions))

## 4.30.0

### Patch Changes

- [#1702](https://github.com/graphcommerce-org/graphcommerce/pull/1702) [`abb15ef4a`](https://github.com/graphcommerce-org/graphcommerce/commit/abb15ef4a79b12eddb32cc006e5d1d31dd06ac2d) Thanks [@paales](https://github.com/paales)! - Added canary releases to GraphCommerce

## 1.5.8

### Patch Changes

- [#1688](https://github.com/graphcommerce-org/graphcommerce/pull/1688) [`f105d4223`](https://github.com/graphcommerce-org/graphcommerce/commit/f105d4223aa68df30970149e51ae72897e489bf9) Thanks [@paales](https://github.com/paales)! - Remove redunant confirmation button on ErrorSnackbar implementations

- Updated dependencies [[`8393cb266`](https://github.com/graphcommerce-org/graphcommerce/commit/8393cb2662860be0c2aa5df432447bb73c427d8e), [`f544401c7`](https://github.com/graphcommerce-org/graphcommerce/commit/f544401c7b653fda39c7c260ad0dcfb3bf543b65), [`f105d4223`](https://github.com/graphcommerce-org/graphcommerce/commit/f105d4223aa68df30970149e51ae72897e489bf9)]:
  - @graphcommerce/next-ui@4.29.3

## 1.5.7

### Patch Changes

- Updated dependencies [[`1953c7e27`](https://github.com/graphcommerce-org/graphcommerce/commit/1953c7e27eb606a825fce1ad361393b3c781c6da)]:
  - @graphcommerce/next-ui@4.29.2

## 1.5.6

### Patch Changes

- Updated dependencies [[`98d6a9cce`](https://github.com/graphcommerce-org/graphcommerce/commit/98d6a9cce1bb9514088be0af2736721b3edda467)]:
  - @graphcommerce/next-ui@4.29.1

## 1.5.5

### Patch Changes

- Updated dependencies [[`e76df6dc3`](https://github.com/graphcommerce-org/graphcommerce/commit/e76df6dc37c11c793a5d008ba36932d17dc23855), [`0bd9ea582`](https://github.com/graphcommerce-org/graphcommerce/commit/0bd9ea58230dde79c5fe2cdb07e9860151460270)]:
  - @graphcommerce/next-ui@4.29.0

## 1.5.4

### Patch Changes

- [#1655](https://github.com/graphcommerce-org/graphcommerce/pull/1655) [`3dde492ad`](https://github.com/graphcommerce-org/graphcommerce/commit/3dde492ad3a49d96481eeb7453fb305d0017b1a5) Thanks [@FrankHarland](https://github.com/FrankHarland)! - Added Google Analytics support.

- Updated dependencies [[`9e630670f`](https://github.com/graphcommerce-org/graphcommerce/commit/9e630670ff6c952ab7b938d890b5509804985cf3), [`cf3518499`](https://github.com/graphcommerce-org/graphcommerce/commit/cf351849999ad6fe73ce2bb258098a7dd301d517), [`2e9fa5984`](https://github.com/graphcommerce-org/graphcommerce/commit/2e9fa5984a07ff14fc1b3a4f62189a26e8e3ecdd), [`adf13069a`](https://github.com/graphcommerce-org/graphcommerce/commit/adf13069af6460c960276b402237371c12fc6dec), [`1b1504c9b`](https://github.com/graphcommerce-org/graphcommerce/commit/1b1504c9b0e51f2787bce91e1ff1940f540411d6), [`8a34f8081`](https://github.com/graphcommerce-org/graphcommerce/commit/8a34f808186274a6fe1d4f309472f1a9c6d00efd)]:
  - @graphcommerce/next-ui@4.28.1
  - @graphcommerce/graphql@3.5.0

## 1.5.3

### Patch Changes

- [#1665](https://github.com/graphcommerce-org/graphcommerce/pull/1665) [`fc32b9ab3`](https://github.com/graphcommerce-org/graphcommerce/commit/fc32b9ab3818eb99c546a89e7f42045a6fbfba81) Thanks [@paales](https://github.com/paales)! - Checkout page didn’t work, because the SelectElement broke when it received a null value.

- Updated dependencies [[`1f2e14ba8`](https://github.com/graphcommerce-org/graphcommerce/commit/1f2e14ba8b674b87257a123e8cb215157890eb22)]:
  - @graphcommerce/react-hook-form@3.3.5

## 1.5.2

### Patch Changes

- Updated dependencies [[`0c21c5c23`](https://github.com/graphcommerce-org/graphcommerce/commit/0c21c5c233ebab15f6629c234e3de1cc8c0452e1), [`de8925aa9`](https://github.com/graphcommerce-org/graphcommerce/commit/de8925aa910b191c62041530c68c697a58a1e52d), [`f5eae0afd`](https://github.com/graphcommerce-org/graphcommerce/commit/f5eae0afdbd474b1f81c450425ffadf2d025187a)]:
  - @graphcommerce/next-ui@4.28.0

## 1.5.1

### Patch Changes

- [#1660](https://github.com/graphcommerce-org/graphcommerce/pull/1660) [`e5048c5ec`](https://github.com/graphcommerce-org/graphcommerce/commit/e5048c5ec52b83dbe70a246ffdcea65b55a884c6) Thanks [@paales](https://github.com/paales)! - Flatten the NumberFieldElement to use the Controller directly

- Updated dependencies [[`75ae24a93`](https://github.com/graphcommerce-org/graphcommerce/commit/75ae24a93bd74e3b9b7efda21ec7ba6fbe9a3a75)]:
  - @graphcommerce/react-hook-form@3.3.4

## 1.5.0

### Minor Changes

- [#1642](https://github.com/graphcommerce-org/graphcommerce/pull/1642) [`ad63ebf4e`](https://github.com/graphcommerce-org/graphcommerce/commit/ad63ebf4e33bfb0e5c9e5e68ab69b14775f3f8a8) Thanks [@paales](https://github.com/paales)! - Introduced `<AddProductsToCartForm/>`, which is allows for adding all product types to the cart with a single react-hook-form form.

  Which allows you to fully compose the form on the product page without having to modify the page.

### Patch Changes

- [#1642](https://github.com/graphcommerce-org/graphcommerce/pull/1642) [`9e6fd498e`](https://github.com/graphcommerce-org/graphcommerce/commit/9e6fd498e3242ab30602767ae77a8e22f80d9fd3) Thanks [@paales](https://github.com/paales)! - Support for defaultValue for TextFieldElement

- Updated dependencies [[`ad63ebf4e`](https://github.com/graphcommerce-org/graphcommerce/commit/ad63ebf4e33bfb0e5c9e5e68ab69b14775f3f8a8)]:
  - @graphcommerce/next-ui@4.27.0

## 1.4.0

### Minor Changes

- [#1645](https://github.com/graphcommerce-org/graphcommerce/pull/1645) [`fad7b6b48`](https://github.com/graphcommerce-org/graphcommerce/commit/fad7b6b48732fd631599c17abd8961de3f49c7dc) Thanks [@Jessevdpoel](https://github.com/Jessevdpoel)! - Export all react-hook-form-mui components

### Patch Changes

- Updated dependencies [[`42e7fac75`](https://github.com/graphcommerce-org/graphcommerce/commit/42e7fac75712f9bda7a6b919ede14b3c75d07771)]:
  - @graphcommerce/next-ui@4.26.0

## 1.3.3

### Patch Changes

- Updated dependencies [[`dc6237644`](https://github.com/graphcommerce-org/graphcommerce/commit/dc6237644ac349debb728059e4c937cec25bf4fd), [`48273bccd`](https://github.com/graphcommerce-org/graphcommerce/commit/48273bccd2e471ce4bc024a600e693da791f1cde)]:
  - @graphcommerce/next-ui@4.25.0

## 1.3.2

### Patch Changes

- Updated dependencies [[`104103bc2`](https://github.com/graphcommerce-org/graphcommerce/commit/104103bc2a0fbaa510af2e26b6b00ddc63e8495b)]:
  - @graphcommerce/next-ui@4.24.0

## 1.3.1

### Patch Changes

- Updated dependencies [[`662f510c2`](https://github.com/graphcommerce-org/graphcommerce/commit/662f510c21fc44a63036e5c7a0726ccb33c31600)]:
  - @graphcommerce/react-hook-form@3.3.3

## 1.3.0

### Minor Changes

- [#1579](https://github.com/graphcommerce-org/graphcommerce/pull/1579) [`e8639ec5f`](https://github.com/graphcommerce-org/graphcommerce/commit/e8639ec5f6759504211d70a966f5c348c6b3a7f6) Thanks [@paales](https://github.com/paales)! - New FormComponents added which combines react-hook-form and mui's form components for easier form handling

## 1.2.3

### Patch Changes

- Updated dependencies [[`9b84a68a1`](https://github.com/graphcommerce-org/graphcommerce/commit/9b84a68a1e7311a79eb687c7dcee905d3000facf)]:
  - @graphcommerce/next-ui@4.23.1

## 1.2.2

### Patch Changes

- Updated dependencies [[`396b5de5d`](https://github.com/graphcommerce-org/graphcommerce/commit/396b5de5d50c7b8f59bf636807e7a4b50f14e0b2)]:
  - @graphcommerce/graphql@3.4.8

## 1.2.1

### Patch Changes

- Updated dependencies [[`755d2cf83`](https://github.com/graphcommerce-org/graphcommerce/commit/755d2cf83343a5ad3d61063eff595d821de360aa), [`dc7f2dda4`](https://github.com/graphcommerce-org/graphcommerce/commit/dc7f2dda40ff8572fc11161de6eb62ca13e720dd)]:
  - @graphcommerce/next-ui@4.23.0

## 1.2.0

### Minor Changes

- [#1609](https://github.com/graphcommerce-org/graphcommerce/pull/1609) [`0ad5159eb`](https://github.com/graphcommerce-org/graphcommerce/commit/0ad5159ebef54b4ce7fee6f71b4bf710dba9ef8e) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Use WaitForCustomer component

  - Fixes bugs where loaders where shown on all pages that require user to log in

* [#1602](https://github.com/graphcommerce-org/graphcommerce/pull/1602) [`5f781a217`](https://github.com/graphcommerce-org/graphcommerce/commit/5f781a217ce63ed56bc1a9983487b04400a8a315) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Default styles and layout fixes

  - Scaled icons and fonts down. Size in typography is now more gradual: https://graphcommerce.vercel.app/test/typography
  - Multiple accessibility fixes. Missing button/input labels, and fixed spacing issues resulting in high % appropriately sized tap targets
  - Replaced responsiveVal usage with better performaning breakpointVal where possible
  - All buttons are now Pill by default.
  - Cleaned up checkout styles

### Patch Changes

- Updated dependencies [[`04708dacc`](https://github.com/graphcommerce-org/graphcommerce/commit/04708daccc213c6ea927bc67fa3bd0d5b1fad619), [`bb94e7045`](https://github.com/graphcommerce-org/graphcommerce/commit/bb94e7045460cb671c45d612a0833731d7c20c30), [`b0dc4e2e1`](https://github.com/graphcommerce-org/graphcommerce/commit/b0dc4e2e1982d502d38dd50a0f493396360a7a15), [`4a5286dfe`](https://github.com/graphcommerce-org/graphcommerce/commit/4a5286dfeaa1719e594a0078f274fbab53969c4e), [`d46d5ed0c`](https://github.com/graphcommerce-org/graphcommerce/commit/d46d5ed0cc5794391b7527fc17bbb68ec2212e33), [`5f781a217`](https://github.com/graphcommerce-org/graphcommerce/commit/5f781a217ce63ed56bc1a9983487b04400a8a315), [`01372b918`](https://github.com/graphcommerce-org/graphcommerce/commit/01372b918a291e01cbf5db40edcb40fb1c2af313)]:
  - @graphcommerce/next-ui@4.22.0
  - @graphcommerce/framer-utils@3.2.0
  - @graphcommerce/graphql@3.4.7

## 1.1.12

### Patch Changes

- Updated dependencies [[`1f7ee6f6c`](https://github.com/graphcommerce-org/graphcommerce/commit/1f7ee6f6cfb28544439ed36e10929ac530d1b2b7), [`707dbc73d`](https://github.com/graphcommerce-org/graphcommerce/commit/707dbc73d181204d88fdbbd2e09340e25b2b5f7b), [`5c5645e6e`](https://github.com/graphcommerce-org/graphcommerce/commit/5c5645e6eaf5314c063f05547707fcd4b34a8717)]:
  - @graphcommerce/next-ui@4.21.0
  - @graphcommerce/framer-utils@3.1.5
  - @graphcommerce/graphql@3.4.6

## 1.1.11

### Patch Changes

- Updated dependencies [[`43822fd61`](https://github.com/graphcommerce-org/graphcommerce/commit/43822fd61c949215b8ddce9fb37d09f29b638426), [`3a619b70d`](https://github.com/graphcommerce-org/graphcommerce/commit/3a619b70d082804b8de46a8e8232f9431479a8b7)]:
  - @graphcommerce/next-ui@4.20.0

## 1.1.10

### Patch Changes

- Updated dependencies [[`b6d3a3c13`](https://github.com/graphcommerce-org/graphcommerce/commit/b6d3a3c13ea63ef0f691f497507f07c0e094de5b)]:
  - @graphcommerce/next-ui@4.19.0

## 1.1.9

### Patch Changes

- Updated dependencies [[`6ce2cbaf2`](https://github.com/graphcommerce-org/graphcommerce/commit/6ce2cbaf2cf27e21b753f7cb71e7e74826294de6), [`6ce2cbaf2`](https://github.com/graphcommerce-org/graphcommerce/commit/6ce2cbaf2cf27e21b753f7cb71e7e74826294de6)]:
  - @graphcommerce/graphql@3.4.5
  - @graphcommerce/next-ui@4.18.0

## 1.1.8

### Patch Changes

- Updated dependencies [[`49370878a`](https://github.com/graphcommerce-org/graphcommerce/commit/49370878a48b90a4579026a7c56c54f97840cebb), [`b6ce5548c`](https://github.com/graphcommerce-org/graphcommerce/commit/b6ce5548c66a8ca62d3aee29467045f7f07f30c8)]:
  - @graphcommerce/graphql@3.4.4
  - @graphcommerce/next-ui@4.17.0

## 1.1.7

### Patch Changes

- [#1575](https://github.com/graphcommerce-org/graphcommerce/pull/1575) [`199dc8599`](https://github.com/graphcommerce-org/graphcommerce/commit/199dc859989c376281243b59a59addc35138f119) Thanks [@paales](https://github.com/paales)! - WaitForQueries should also accept undefined when there is nothing to actually wait for

- Updated dependencies [[`02023d8d8`](https://github.com/graphcommerce-org/graphcommerce/commit/02023d8d89c8138144243edce67290bd79ff49a7), [`87a188d6f`](https://github.com/graphcommerce-org/graphcommerce/commit/87a188d6f216b7f7b9ec95afbe74f1146cb07ce4), [`1eb131766`](https://github.com/graphcommerce-org/graphcommerce/commit/1eb131766c32db6fcb0a8e83dba2c3d241658595)]:
  - @graphcommerce/react-hook-form@3.3.2
  - @graphcommerce/next-ui@4.16.0

## 1.1.6

### Patch Changes

- Updated dependencies [[`a88f166f0`](https://github.com/graphcommerce-org/graphcommerce/commit/a88f166f0115c58254fe47171da51a5850658a32)]:
  - @graphcommerce/next-ui@4.15.1

## 1.1.5

### Patch Changes

- Updated dependencies [[`e167992df`](https://github.com/graphcommerce-org/graphcommerce/commit/e167992dfdc6964a392af719667f8a188626ab1b), [`9c2504b4e`](https://github.com/graphcommerce-org/graphcommerce/commit/9c2504b4ed75f41d3003c4d3339814010e85e37e)]:
  - @graphcommerce/next-ui@4.15.0

## 1.1.4

### Patch Changes

- [#1557](https://github.com/graphcommerce-org/graphcommerce/pull/1557) [`c0a7f9427`](https://github.com/graphcommerce-org/graphcommerce/commit/c0a7f9427466f0a3886b2c3ebf2f0aa5d79ee081) Thanks [@paales](https://github.com/paales)! - WaitForQueries already handles the SSR loading, no need for NoSSR

- Updated dependencies [[`01f1588c9`](https://github.com/graphcommerce-org/graphcommerce/commit/01f1588c9200bb39dd61146e260bfa2b32060612)]:
  - @graphcommerce/graphql@3.4.3

## 1.1.3

### Patch Changes

- Updated dependencies [[`1afc6a547`](https://github.com/graphcommerce-org/graphcommerce/commit/1afc6a5473d6e31f47b5d0188801803b31865290), [`4a4579bb2`](https://github.com/graphcommerce-org/graphcommerce/commit/4a4579bb2f7da378f3fcc504405caf2560dc10f6), [`afcd8e4bf`](https://github.com/graphcommerce-org/graphcommerce/commit/afcd8e4bfb7010da4d5faeed85b61991ed7975f4), [`02e1988e5`](https://github.com/graphcommerce-org/graphcommerce/commit/02e1988e5f361c6f66ae30d3bbee38ef2ac062df), [`323fdee4b`](https://github.com/graphcommerce-org/graphcommerce/commit/323fdee4b15ae23e0e84dd0588cb2c6446dcfd50)]:
  - @graphcommerce/graphql@3.4.2
  - @graphcommerce/react-hook-form@3.3.1
  - @graphcommerce/next-ui@4.14.0

## 1.1.2

### Patch Changes

- Updated dependencies [[`18054c441`](https://github.com/graphcommerce-org/graphcommerce/commit/18054c441962ba750bed3acc39ab46c8d3a341ce), [`c5c539c44`](https://github.com/graphcommerce-org/graphcommerce/commit/c5c539c44eeac524cd62ce649e132d2e00333794), [`6f69bc54c`](https://github.com/graphcommerce-org/graphcommerce/commit/6f69bc54c6e0224452817c532ae58d9c332b61ea), [`21886d6fa`](https://github.com/graphcommerce-org/graphcommerce/commit/21886d6fa64a48d9e932bfaf8d138c9b13c36e43)]:
  - @graphcommerce/graphql@3.4.1
  - @graphcommerce/next-ui@4.13.1

## 1.1.1

### Patch Changes

- Updated dependencies [[`8d8fda262`](https://github.com/graphcommerce-org/graphcommerce/commit/8d8fda2623e561cb43441110c67ffa34b692668a), [`cefa7b365`](https://github.com/graphcommerce-org/graphcommerce/commit/cefa7b3652b55108d2178927e3c5d98a111cf373)]:
  - @graphcommerce/next-ui@4.13.0

## 1.1.0

### Minor Changes

- [#1544](https://github.com/graphcommerce-org/graphcommerce/pull/1544) [`5f927ebdc`](https://github.com/graphcommerce-org/graphcommerce/commit/5f927ebdc6f0331833e02b96e4f169bfe475ac6b) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - Fixed hydration errors on account, cart and wishlist

### Patch Changes

- Updated dependencies [[`5f927ebdc`](https://github.com/graphcommerce-org/graphcommerce/commit/5f927ebdc6f0331833e02b96e4f169bfe475ac6b), [`c756f42e5`](https://github.com/graphcommerce-org/graphcommerce/commit/c756f42e503761a497e4a5a7a02d02141df231c3)]:
  - @graphcommerce/graphql@3.4.0
  - @graphcommerce/react-hook-form@3.3.0
  - @graphcommerce/next-ui@4.12.0

## 1.0.23

### Patch Changes

- Updated dependencies [[`fe4baa42d`](https://github.com/graphcommerce-org/graphcommerce/commit/fe4baa42db0081ed960d62aef688bd36a7ac974f)]:
  - @graphcommerce/next-ui@4.11.2

## 1.0.22

### Patch Changes

- Updated dependencies [[`11bca2d2f`](https://github.com/graphcommerce-org/graphcommerce/commit/11bca2d2f7dbb7c5e2827c04eb0db43d4099f2fd)]:
  - @graphcommerce/next-ui@4.11.1

## 1.0.21

### Patch Changes

- Updated dependencies [[`9ec0338df`](https://github.com/graphcommerce-org/graphcommerce/commit/9ec0338dfe34d37b0f2c24e36ffa6ed13ea1145e), [`735b78672`](https://github.com/graphcommerce-org/graphcommerce/commit/735b786724d5401cbe6e88f2515e121a1a0945b2)]:
  - @graphcommerce/next-ui@4.11.0
  - @graphcommerce/graphql@3.3.0

## 1.0.20

### Patch Changes

- Updated dependencies [[`371e6cf52`](https://github.com/graphcommerce-org/graphcommerce/commit/371e6cf52916a3b6c44192bd40cc8271bd608832), [`4143483f3`](https://github.com/graphcommerce-org/graphcommerce/commit/4143483f37c038d2bbf218be2685e27a31a35745)]:
  - @graphcommerce/next-ui@4.10.0

## 1.0.19

### Patch Changes

- [#1490](https://github.com/graphcommerce-org/graphcommerce/pull/1490) [`d311ef48b`](https://github.com/graphcommerce-org/graphcommerce/commit/d311ef48bb3e97806d992af5516d6b7f183ec9cb) Thanks [@paales](https://github.com/paales)! - upgraded packages

- Updated dependencies [[`a9213f1f5`](https://github.com/graphcommerce-org/graphcommerce/commit/a9213f1f5a410d217768386ccb6d9b5ce7bd5782), [`d311ef48b`](https://github.com/graphcommerce-org/graphcommerce/commit/d311ef48bb3e97806d992af5516d6b7f183ec9cb)]:
  - @graphcommerce/next-ui@4.9.0
  - @graphcommerce/graphql@3.2.1
  - @graphcommerce/react-hook-form@3.2.2

## 1.0.18

### Patch Changes

- Updated dependencies [[`0ab7c5465`](https://github.com/graphcommerce-org/graphcommerce/commit/0ab7c5465441cba9bf8cd185a6790ce2f443f4ed)]:
  - @graphcommerce/next-ui@4.8.4

## 1.0.17

### Patch Changes

- Updated dependencies [[`ffec8800a`](https://github.com/graphcommerce-org/graphcommerce/commit/ffec8800a50ff2fe9b9fc5feeb5a0a878b573f0e), [`bed806ddd`](https://github.com/graphcommerce-org/graphcommerce/commit/bed806dddd7e025806a69798ef9587aa165d392f)]:
  - @graphcommerce/react-hook-form@3.2.1
  - @graphcommerce/graphql@3.2.0

## 1.0.16

### Patch Changes

- Updated dependencies [[`858a3b3a3`](https://github.com/graphcommerce-org/graphcommerce/commit/858a3b3a3601cd00491219daf45557c2f1cc804b)]:
  - @graphcommerce/react-hook-form@3.2.0

## 1.0.15

### Patch Changes

- Updated dependencies [[`afc67103d`](https://github.com/graphcommerce-org/graphcommerce/commit/afc67103d0e00583e274465036fd287537f95e79)]:
  - @graphcommerce/next-ui@4.8.3

## 1.0.14

### Patch Changes

- Updated dependencies [[`c8c246b8a`](https://github.com/graphcommerce-org/graphcommerce/commit/c8c246b8aaab0621b68a2fca2a1c529a56fad962)]:
  - @graphcommerce/next-ui@4.8.2

## 1.0.13

### Patch Changes

- Updated dependencies [[`a9df81310`](https://github.com/graphcommerce-org/graphcommerce/commit/a9df81310c051876dd82fb2819105dece47cc213), [`f167f9963`](https://github.com/graphcommerce-org/graphcommerce/commit/f167f99630966a7de43717937d43669e66132494)]:
  - @graphcommerce/next-ui@4.8.1

## 1.0.12

### Patch Changes

- Updated dependencies [[`0363b9671`](https://github.com/graphcommerce-org/graphcommerce/commit/0363b9671db7c2932321d97faf6f1eb385238397), [`3ac90b57c`](https://github.com/graphcommerce-org/graphcommerce/commit/3ac90b57c68b96f9d81771d6664ed9435a28fc1d)]:
  - @graphcommerce/next-ui@4.8.0

## 1.0.11

### Patch Changes

- [#1451](https://github.com/graphcommerce-org/graphcommerce/pull/1451) [`f698ff85d`](https://github.com/graphcommerce-org/graphcommerce/commit/f698ff85df6bb0922288471bb3c81856091b8061) Thanks [@paales](https://github.com/paales)! - Removed all occurences of @lingui/macro and moved to @lingui/macro / @lingui/core in preparation to move to swc.

  Since we've removed @lingui/macro, all occurences need to be replaced with @lingui/core and @lingui/react.

  All occurences of `<Trans>` and `t` need to be replaced:

  ```tsx
  import { t, Trans } from '@lingui/macro'

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
  import { i18n } from '@lingui/core'
  import { Trans } from '@lingui/react'

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
  - @graphcommerce/next-ui@4.7.2
  - @graphcommerce/graphql@3.1.3

## 1.0.10

### Patch Changes

- Updated dependencies [[`25ef6cf08`](https://github.com/graphcommerce-org/graphcommerce/commit/25ef6cf08c278105307d6f604b7135d637e9046c), [`80e30bb77`](https://github.com/graphcommerce-org/graphcommerce/commit/80e30bb77015755fbc00a7935d590f80c1c1c18c)]:
  - @graphcommerce/graphql@3.1.2
  - @graphcommerce/next-ui@4.7.1

## 1.0.9

### Patch Changes

- Updated dependencies [[`f3d06dd83`](https://github.com/graphcommerce-org/graphcommerce/commit/f3d06dd836c9a76412b419d4d2c79bbd0ee92e04)]:
  - @graphcommerce/next-ui@4.7.0

## 1.0.8

### Patch Changes

- Updated dependencies [[`100f4c38c`](https://github.com/graphcommerce-org/graphcommerce/commit/100f4c38c8fcda4bc6e0425e38028b550b60adc2)]:
  - @graphcommerce/graphql@3.1.1
  - @graphcommerce/next-ui@4.6.2
  - @graphcommerce/react-hook-form@3.1.2

## 1.0.7

### Patch Changes

- [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`da0ae7d02`](https://github.com/graphcommerce-org/graphcommerce/commit/da0ae7d0236e4908ba0bf0fa16656be516e841d4) Thanks [@paales](https://github.com/paales)! - Updated dependencies

- Updated dependencies [[`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542), [`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542), [`da0ae7d02`](https://github.com/graphcommerce-org/graphcommerce/commit/da0ae7d0236e4908ba0bf0fa16656be516e841d4)]:
  - @graphcommerce/graphql@3.1.0
  - @graphcommerce/next-ui@4.6.1
  - @graphcommerce/react-hook-form@3.1.1

## 1.0.6

### Patch Changes

- Updated dependencies [[`3c801f45c`](https://github.com/graphcommerce-org/graphcommerce/commit/3c801f45c7df55131acf30ae2fe0d2344830d480), [`3192fab82`](https://github.com/graphcommerce-org/graphcommerce/commit/3192fab82560e2211dfcacadc3b0b305260527d8), [`104abd14e`](https://github.com/graphcommerce-org/graphcommerce/commit/104abd14e1585ef0d8de77937d25156b8fa1e201), [`2a125b1f9`](https://github.com/graphcommerce-org/graphcommerce/commit/2a125b1f98bb9272d96c3577f21d6c984caad892), [`8a354d1cd`](https://github.com/graphcommerce-org/graphcommerce/commit/8a354d1cd4757497ddfc9b1969a0addbc8ff616b)]:
  - @graphcommerce/next-ui@4.6.0
  - @graphcommerce/react-hook-form@3.1.0

## 1.0.5

### Patch Changes

- [#1378](https://github.com/graphcommerce-org/graphcommerce/pull/1378) [`b610a6e40`](https://github.com/graphcommerce-org/graphcommerce/commit/b610a6e4049e8c9e8b5d2aeff31b8e1bfc24abe5) Thanks [@paales](https://github.com/paales)! - Pin all versions internally so we can’t end up in an unfixable state for the user

- Updated dependencies [[`b610a6e40`](https://github.com/graphcommerce-org/graphcommerce/commit/b610a6e4049e8c9e8b5d2aeff31b8e1bfc24abe5), [`22ff9df16`](https://github.com/graphcommerce-org/graphcommerce/commit/22ff9df1677742ae8e07d9b7e5b12fbb487580dc)]:
  - @graphcommerce/graphql@3.0.7
  - @graphcommerce/next-ui@4.5.1
  - @graphcommerce/react-hook-form@3.0.7

## 1.0.4

### Patch Changes

- [#1369](https://github.com/graphcommerce-org/graphcommerce/pull/1369) [`ae6449502`](https://github.com/graphcommerce-org/graphcommerce/commit/ae64495024a455bbe5188588604368c1542840c9) Thanks [@paales](https://github.com/paales)! - Upgraded dependencies

- Updated dependencies [[`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`ae6449502`](https://github.com/graphcommerce-org/graphcommerce/commit/ae64495024a455bbe5188588604368c1542840c9), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a)]:
  - @graphcommerce/graphql@3.0.6
  - @graphcommerce/next-ui@4.5.0
  - @graphcommerce/react-hook-form@3.0.6

## 1.0.3

### Patch Changes

- [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655) Thanks [@paales](https://github.com/paales)! - All default exports are now named exports internally and all `index.tsx` are renamed to the component name.

* [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

* Updated dependencies [[`3d63b39f7`](https://github.com/ho-nl/m2-pwa/commit/3d63b39f7e330d1827a32dba782667d7b21adaba), [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655), [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef)]:
  - @graphcommerce/next-ui@4.2.4
  - @graphcommerce/graphql@3.0.4
  - @graphcommerce/react-hook-form@3.0.4

## 1.0.2

### Patch Changes

- [#1292](https://github.com/ho-nl/m2-pwa/pull/1292) [`5a1ba9e66`](https://github.com/ho-nl/m2-pwa/commit/5a1ba9e664abbac89c4f5f71f7d6d6ed1aefa5c0) Thanks [@paales](https://github.com/paales)! - Renamed SvgIcon to IconSvg to prevent collisions with MUI

- Updated dependencies [[`5a1ba9e66`](https://github.com/ho-nl/m2-pwa/commit/5a1ba9e664abbac89c4f5f71f7d6d6ed1aefa5c0), [`990df655b`](https://github.com/ho-nl/m2-pwa/commit/990df655b73b469718d6cb5837ee65dfe2ad6a1d), [`63f9b56eb`](https://github.com/ho-nl/m2-pwa/commit/63f9b56eb68ba790567ff1427e599fd2c3c8f1ee)]:
  - @graphcommerce/next-ui@4.2.0

## 1.0.1

### Patch Changes

- [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96) Thanks [@paales](https://github.com/paales)! - made packages public

- Updated dependencies [[`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96), [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20), [`3a719c88c`](https://github.com/ho-nl/m2-pwa/commit/3a719c88cad1eab58602de28c41adc0fc4827e1d), [`5ffcb56bf`](https://github.com/ho-nl/m2-pwa/commit/5ffcb56bfcbe49ebeaf24f9341e819a145ab9a14)]:
  - @graphcommerce/graphql@3.0.3
  - @graphcommerce/next-ui@4.1.2
  - @graphcommerce/react-hook-form@3.0.3

## 1.0.0

### Major Changes

- [#1274](https://github.com/ho-nl/m2-pwa/pull/1274) [`351347afe`](https://github.com/ho-nl/m2-pwa/commit/351347afeae5bd837408d46c7593bcf5473dc621) Thanks [@paales](https://github.com/paales)! - Created new `@graphcommerce/ecommerce-ui` package to connect generic components from `@graphcommerce/next-ui` to `@graphcommerce/react-hook-form` and `@graphcommerce/graphql`

### Patch Changes

- [#1274](https://github.com/ho-nl/m2-pwa/pull/1274) [`381e4c86a`](https://github.com/ho-nl/m2-pwa/commit/381e4c86a8321ce96e1fa5c7d3c0a0c0ff3e02c7) Thanks [@paales](https://github.com/paales)! - Moved `ApolloErrorAlert`, `ApolloErrorFullPage` and `ApolloErrorSnackbar` to the ecommerce-ui package.

  Created `ComposedSubmitButton` and `ComposedSubmitLinkOrButton` to reduce complexity from `magento-graphcms` example.

  Removed dependency an `@graphcommerce/react-hook-form` from `magento-graphcms` example.

  Added dependency `@graphcommerce/ecommerce-ui` from `magento-graphcms` example.

* [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2) Thanks [@paales](https://github.com/paales)! - We've moved lots of internal packages from `dependencies` to `peerDependencies`. The result of this is that there will be significantly less duplicate packages in the node_modules folders.

- [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d) Thanks [@paales](https://github.com/paales)! - Upgraded to [NextJS 12.1](https://nextjs.org/blog/next-12-1)! This is just for compatibility, but we'll be implementing [On-demand Incremental Static Regeneration](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta) soon.

  This will greatly reduce the requirement to rebuid stuff and we'll add a management UI on the frontend to be able to revalidate pages manually.

- Updated dependencies [[`381e4c86a`](https://github.com/ho-nl/m2-pwa/commit/381e4c86a8321ce96e1fa5c7d3c0a0c0ff3e02c7), [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2), [`e7c8e2756`](https://github.com/ho-nl/m2-pwa/commit/e7c8e2756d637cbcd2e793d62ef5721d35d9fa7b), [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d)]:
  - @graphcommerce/next-ui@4.1.1
  - @graphcommerce/react-hook-form@3.0.2
  - @graphcommerce/graphql@3.0.2
