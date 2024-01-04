# Change Log

## 8.0.0-canary.70

## 8.0.0-canary.69

## 7.1.0-canary.68

## 7.1.0-canary.67

### Patch Changes

- [#2108](https://github.com/graphcommerce-org/graphcommerce/pull/2108) [`7fc4bb9`](https://github.com/graphcommerce-org/graphcommerce/commit/7fc4bb925c59da46961c9656a2a67b37a9c2d652) - Removed the 'NoSSR' functionality from `<WaitForQueries/>` component as it slows down rendering. The 'feature' was necessary for the following use case: When hydrating a component that was server rendered and was living inside a `<Suspense />` component. It would cause an hydration error and this was the workaround. With useSuspenseQuery and React 18, this problem will not occur.
  ([@StefanAngenent](https://github.com/StefanAngenent))

## 7.1.0-canary.66

## 7.1.0-canary.65

## 7.1.0-canary.64

## 7.1.0-canary.63

## 7.1.0-canary.62

## 7.1.0-canary.61

### Patch Changes

- [#2125](https://github.com/graphcommerce-org/graphcommerce/pull/2125) [`5224ee500`](https://github.com/graphcommerce-org/graphcommerce/commit/5224ee5001c94a19f226fa36106e76739319297c) - If there is an open menu in an overlay, pressing the escape button now closes the menu instead of the overlay. ([@Jessevdpoel](https://github.com/Jessevdpoel))

## 7.1.0-canary.60

## 7.1.0-canary.59

## 7.1.0-canary.58

### Patch Changes

- [#2121](https://github.com/graphcommerce-org/graphcommerce/pull/2121) [`a5da6ffc8`](https://github.com/graphcommerce-org/graphcommerce/commit/a5da6ffc8be359e93c7bde986134f7162aae13b9) - Change the critical css injection location to be in the head instead of `<style>` tags in the body. It has a number of negative consequences, such as the famous "flash of unstyled content" (FOUC) and the re-paint and re-layout required. ([@paales](https://github.com/paales))

## 7.1.0-canary.57

## 7.1.0-canary.56

### Patch Changes

- [#2123](https://github.com/graphcommerce-org/graphcommerce/pull/2123) [`8ad60f255`](https://github.com/graphcommerce-org/graphcommerce/commit/8ad60f255b747858c35dd6b6cf5c90147d960082) - Fixed schema-dts dependency issue ([@bramvanderholst](https://github.com/bramvanderholst))

## 7.1.0-canary.55

### Patch Changes

- [#2004](https://github.com/graphcommerce-org/graphcommerce/pull/2004) [`da2135744`](https://github.com/graphcommerce-org/graphcommerce/commit/da2135744dddfa0d211c59589090ebb1977c38c9) - Added info icon for Snackbar when severity is set to info ([@bramvanderholst](https://github.com/bramvanderholst))

- [#2004](https://github.com/graphcommerce-org/graphcommerce/pull/2004) [`d608830ce`](https://github.com/graphcommerce-org/graphcommerce/commit/d608830ce77f85ff725cc106b9fc55a22012c74c) - Added ‘disableBackdropClick’ prop to MessageSnackbar to allow page interaction without closing the snackbar ([@bramvanderholst](https://github.com/bramvanderholst))

- [#2004](https://github.com/graphcommerce-org/graphcommerce/pull/2004) [`94e1ae811`](https://github.com/graphcommerce-org/graphcommerce/commit/94e1ae811fe9eb0051863e8be91c6399ddcdf22f) - Added DismissibleSnackbar component to allow messages to be shown only once ([@bramvanderholst](https://github.com/bramvanderholst))

- [#2004](https://github.com/graphcommerce-org/graphcommerce/pull/2004) [`53947d39f`](https://github.com/graphcommerce-org/graphcommerce/commit/53947d39f2f3ee578c14903c96a2b356d99d9475) - Implemented Message variant for RowColumnOne to show an important message which, after dismissing, will not show again ([@bramvanderholst](https://github.com/bramvanderholst))

## 7.1.0-canary.54

## 7.1.0-canary.53

## 7.1.0-canary.52

## 7.1.0-canary.51

## 7.1.0-canary.50

## 7.1.0-canary.49

## 7.1.0-canary.48

## 7.1.0-canary.47

## 7.1.0-canary.46

## 7.1.0-canary.45

### Patch Changes

- [#2077](https://github.com/graphcommerce-org/graphcommerce/pull/2077) [`727d1004d`](https://github.com/graphcommerce-org/graphcommerce/commit/727d1004dfcb7dddf6e35b6b157a34491bb05cc6) - Fixed ItemScroller component className. Changed from SidebarSlider to ItemScroller ([@bramvanderholst](https://github.com/bramvanderholst))

## 7.1.0-canary.38

### Patch Changes

- [#2048](https://github.com/graphcommerce-org/graphcommerce/pull/2048) [`695f40cf2`](https://github.com/graphcommerce-org/graphcommerce/commit/695f40cf220636d17f04bc9b0ce86c549c740386) - filterNonNullable keys simplified the types which caused unions to be collapsed ([@Jessevdpoel](https://github.com/Jessevdpoel))

## 7.1.0-canary.37

## 7.1.0-canary.36

## 7.1.0-canary.35

## 7.1.0-canary.34

## 7.1.0-canary.33

## 7.1.0-canary.32

## 7.1.0-canary.31

## 7.1.0-canary.30

### Patch Changes

- [#2105](https://github.com/graphcommerce-org/graphcommerce/pull/2105) [`185f9ddeb`](https://github.com/graphcommerce-org/graphcommerce/commit/185f9ddebff0eaf1f388faebe88a5d400294512a) - Fixed bug where the mobile menu wouldn't open after the first selected level ([@mikekeehnen](https://github.com/mikekeehnen))

## 7.1.0-canary.29

## 7.1.0-canary.28

### Minor Changes

- [#2018](https://github.com/graphcommerce-org/graphcommerce/pull/2018) [`750aa6a72`](https://github.com/graphcommerce-org/graphcommerce/commit/750aa6a72710869d54244467253212e551d335e0) - Changed the layout of the succes page. We are using ActionCards right now to match the design of the cart. ([@Jessevdpoel](https://github.com/Jessevdpoel))

## 7.1.0-canary.27

## 7.1.0-canary.26

## 7.1.0-canary.25

## 7.1.0-canary.24

## 7.1.0-canary.23

## 7.1.0-canary.22

## 7.1.0-canary.21

## 7.1.0-canary.20

## 7.1.0-canary.19

## 7.1.0-canary.18

## 7.1.0-canary.17

## 7.1.0-canary.16

## 7.1.0-canary.15

## 7.1.0-canary.14

### Patch Changes

- [#2045](https://github.com/graphcommerce-org/graphcommerce/pull/2045) [`1ac1e0989`](https://github.com/graphcommerce-org/graphcommerce/commit/1ac1e09897daadd646200cb3ddc2aa75a51e182e) - Make sure the product image gallery traps focus and scrollbar doesn't disappear suddenly ([@JoshuaS98](https://github.com/JoshuaS98))

## 7.1.0-canary.13

## 7.1.0-canary.12

## 7.1.0-canary.11

## 7.1.0-canary.10

## 7.1.0-canary.9

## 7.1.0-canary.8

### Minor Changes

- [#2073](https://github.com/graphcommerce-org/graphcommerce/pull/2073) [`05ce5665b`](https://github.com/graphcommerce-org/graphcommerce/commit/05ce5665b3c63b0620266c8ac35e8b555e2029e8) - It is now allowed to use children inside the footer component ([@Jessevdpoel](https://github.com/Jessevdpoel))

## 7.0.2-canary.7

## 7.0.2-canary.6

### Patch Changes

- [#2066](https://github.com/graphcommerce-org/graphcommerce/pull/2066) [`3b1f58515`](https://github.com/graphcommerce-org/graphcommerce/commit/3b1f585153672a644a613411134e5ad36aa4c266) - Add showButtons prop to scrollerButton ([@StefanAngenent](https://github.com/StefanAngenent))

## 7.0.2-canary.5

## 7.0.1

### Patch Changes

- [#2047](https://github.com/graphcommerce-org/graphcommerce/pull/2047) [`136580b39`](https://github.com/graphcommerce-org/graphcommerce/commit/136580b39e3cffdd07e3fa087e049bd532c3e8f1) - Updated all dependencies to the latest version where possible. ([@paales](https://github.com/paales))

- [#2064](https://github.com/graphcommerce-org/graphcommerce/pull/2064) [`a550fa039`](https://github.com/graphcommerce-org/graphcommerce/commit/a550fa039a104b661ffd3fd3e32d99eaf782bc88) - Allow setting all RowLinks props on its variants, instead of a limited predefined set ([@bramvanderholst](https://github.com/bramvanderholst))

## 7.0.1-canary.15

### Patch Changes

- [#2064](https://github.com/graphcommerce-org/graphcommerce/pull/2064) [`a550fa039`](https://github.com/graphcommerce-org/graphcommerce/commit/a550fa039a104b661ffd3fd3e32d99eaf782bc88) - Allow setting all RowLinks props on its variants, instead of a limited predefined set ([@bramvanderholst](https://github.com/bramvanderholst))

## 7.0.1-canary.14

## 7.0.1-canary.13

## 7.0.1-canary.12

## 7.0.1-canary.11

## 7.0.1-canary.10

## 7.0.1-canary.9

## 7.0.1-canary.8

## 7.0.1-canary.7

## 7.0.1-canary.6

## 7.0.1-canary.5

## 7.0.1-canary.4

## 7.0.1-canary.3

## 7.0.1-canary.2

## 7.0.1-canary.1

## 7.0.1-canary.0

### Patch Changes

- [#2047](https://github.com/graphcommerce-org/graphcommerce/pull/2047) [`136580b39`](https://github.com/graphcommerce-org/graphcommerce/commit/136580b39e3cffdd07e3fa087e049bd532c3e8f1) - Updated all dependencies to the latest version where possible. ([@paales](https://github.com/paales))

## 7.0.0

### Major Changes

- [`e55d8c390`](https://github.com/graphcommerce-org/graphcommerce/commit/e55d8c390d90b4bb7bab11c6a99027ac72bd7e3e) - Created a new sidebar layout system, can be configured with productFiltersLayout in the graphcommerce.config.js ([@paales](https://github.com/paales))

### Minor Changes

- [#1961](https://github.com/graphcommerce-org/graphcommerce/pull/1961) [`4a759c662`](https://github.com/graphcommerce-org/graphcommerce/commit/4a759c66215eaa69edc342b898e05e8f92c3ba9a) - Add Open Graph meta tags to all pages ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

- [#2003](https://github.com/graphcommerce-org/graphcommerce/pull/2003) [`609b384de`](https://github.com/graphcommerce-org/graphcommerce/commit/609b384de8cded7a9dd2f29bd516ded810ab970a) - Created a new version of the cart using ActionCards for each CartItem. Different types of CartItems can have different ActionCards. These ActionCards will be overridden with the use of Plugins. An example can be found in the @graphcommerce/magento-product-configurable package. ([@Jessevdpoel](https://github.com/Jessevdpoel))

- [#2023](https://github.com/graphcommerce-org/graphcommerce/pull/2023) [`7cd53fb2a`](https://github.com/graphcommerce-org/graphcommerce/commit/7cd53fb2aca18ae4a56025b2a015fecbda2e47b7) - Added links to test components on the test page. ([@Jessevdpoel](https://github.com/Jessevdpoel))

### Patch Changes

- [#1934](https://github.com/graphcommerce-org/graphcommerce/pull/1934) [`96ac0320a`](https://github.com/graphcommerce-org/graphcommerce/commit/96ac0320a30bc55a6db5d46663d28b552fda4db6) - Overlays with a floating layout can now be closed by clicking beside the overlay. ([@bramvanderholst](https://github.com/bramvanderholst))

- [#2003](https://github.com/graphcommerce-org/graphcommerce/pull/2003) [`e9041802b`](https://github.com/graphcommerce-org/graphcommerce/commit/e9041802b27d6610cc93715ca61acff7f59792e6) - When the switchPoint of LayoutHeader is zero, make sure the header doesn’t flash when scrolling up on iOS ([@Jessevdpoel](https://github.com/Jessevdpoel))

- [#1998](https://github.com/graphcommerce-org/graphcommerce/pull/1998) [`fdbdcb76f`](https://github.com/graphcommerce-org/graphcommerce/commit/fdbdcb76f918cf74b22253bd641a04c490ceb140) - Users are now not able to scroll an overlay during the open animation. ([@bramvanderholst](https://github.com/bramvanderholst))

- [#1960](https://github.com/graphcommerce-org/graphcommerce/pull/1960) [`f78caf5a8`](https://github.com/graphcommerce-org/graphcommerce/commit/f78caf5a83683f1ae4b901fb94bd22d50943fa2f) - Updated packages: `next`, `@apollo/client`, `react-hook-form`, `@emotion/*`, `@lingui/*`, `@mui/*` and various others. ([@paales](https://github.com/paales))

- [#1965](https://github.com/graphcommerce-org/graphcommerce/pull/1965) [`44b2911d7`](https://github.com/graphcommerce-org/graphcommerce/commit/44b2911d73fb6c6c7188f16d5890ca93877e9aa7) - Added prop to LayoutHeader to be able to hide the back button ([@bramvanderholst](https://github.com/bramvanderholst))

- [#1946](https://github.com/graphcommerce-org/graphcommerce/pull/1946) [`87260618b`](https://github.com/graphcommerce-org/graphcommerce/commit/87260618b8abaebd727ff4435abb1aea6ed33730) - Firefox: scroll snap overlays would snap to 0 when the scroll snap targets wouldn’t exactly match the possible targets. ([@paales](https://github.com/paales))

- [#1913](https://github.com/graphcommerce-org/graphcommerce/pull/1913) [`17eac116d`](https://github.com/graphcommerce-org/graphcommerce/commit/17eac116dbf2b811a67bfefd735d5a5a3e2b20dc) - Fixed zIndex issue with CartFab and ScrollerButton ([@bramvanderholst](https://github.com/bramvanderholst))

- [#1913](https://github.com/graphcommerce-org/graphcommerce/pull/1913) [`61b1987eb`](https://github.com/graphcommerce-org/graphcommerce/commit/61b1987eb8d37566cb4675f0ae962925aef2fc6d) - Fixed RowLinks ScrollerButton alignment when content is shown beside the Scroller ([@bramvanderholst](https://github.com/bramvanderholst))

- [#1930](https://github.com/graphcommerce-org/graphcommerce/pull/1930) [`c8d023e9e`](https://github.com/graphcommerce-org/graphcommerce/commit/c8d023e9e874131cd9f8fe192b1fca5fe1a26ee3) - Fix the 'close menu' on search and add the option to secondary menu items ([@StefanAngenent](https://github.com/StefanAngenent))

- [#2042](https://github.com/graphcommerce-org/graphcommerce/pull/2042) [`587fd2fe5`](https://github.com/graphcommerce-org/graphcommerce/commit/587fd2fe50c843acd9ffae869372df1df57e0a4b) - Updated german translations ([@action-simon](https://github.com/action-simon))

- [#1897](https://github.com/graphcommerce-org/graphcommerce/pull/1897) [`f44d7cec6`](https://github.com/graphcommerce-org/graphcommerce/commit/f44d7cec61766f4768c30d29b211a12f2846e9f6) - Overlays can now be configured to get a bgColor ([@FrankHarland](https://github.com/FrankHarland))

- [#1980](https://github.com/graphcommerce-org/graphcommerce/pull/1980) [`275aaaba3`](https://github.com/graphcommerce-org/graphcommerce/commit/275aaaba34c9db1705183393c4327e8f16b09386) - Fixed overlays closing while still dragging - overlays should only close after releasing pointer ([@bramvanderholst](https://github.com/bramvanderholst))

- [#1939](https://github.com/graphcommerce-org/graphcommerce/pull/1939) [`0cdccf681`](https://github.com/graphcommerce-org/graphcommerce/commit/0cdccf6817d6a769f59cccb68b1b1b8b4405cbd0) - Make blogListItem date prop optional ([@JoshuaS98](https://github.com/JoshuaS98))

- [#1958](https://github.com/graphcommerce-org/graphcommerce/pull/1958) [`0a311b6eb`](https://github.com/graphcommerce-org/graphcommerce/commit/0a311b6ebb5a52e2a7f1d2e6a0fe113904fa2d34) - Left overlays wouldn't properly snap when the overlay gets wider than the viewport ([@paales](https://github.com/paales))

- [#2005](https://github.com/graphcommerce-org/graphcommerce/pull/2005) [`950521b4d`](https://github.com/graphcommerce-org/graphcommerce/commit/950521b4d46a1b980636c05d68a8f6aba289e85c) - Footer's grid-area's will only be rendered when the props are passed. ([@LeanderMatse](https://github.com/LeanderMatse))

## 6.2.0-canary.98

## 6.2.0-canary.97

### Patch Changes

- [#2042](https://github.com/graphcommerce-org/graphcommerce/pull/2042) [`587fd2fe5`](https://github.com/graphcommerce-org/graphcommerce/commit/587fd2fe50c843acd9ffae869372df1df57e0a4b) - Updated german translations ([@action-simon](https://github.com/action-simon))

## 6.2.0-canary.96

## 6.2.0-canary.95

## 6.2.0-canary.94

## 6.2.0-canary.93

## 6.2.0-canary.92

## 6.2.0-canary.91

## 6.2.0-canary.90

## 6.2.0-canary.89

## 6.2.0-canary.88

## 6.2.0-canary.87

## 6.2.0-canary.86

### Minor Changes

- [#2023](https://github.com/graphcommerce-org/graphcommerce/pull/2023) [`7cd53fb2a`](https://github.com/graphcommerce-org/graphcommerce/commit/7cd53fb2aca18ae4a56025b2a015fecbda2e47b7) - Added links to test components on the test page. ([@Jessevdpoel](https://github.com/Jessevdpoel))

## 6.2.0-canary.85

## 6.2.0-canary.84

## 6.2.0-canary.83

## 6.2.0-canary.82

## 6.2.0-canary.81

### Minor Changes

- [#2003](https://github.com/graphcommerce-org/graphcommerce/pull/2003) [`609b384de`](https://github.com/graphcommerce-org/graphcommerce/commit/609b384de8cded7a9dd2f29bd516ded810ab970a) - Created a new version of the cart using ActionCards for each CartItem. Different types of CartItems can have different ActionCards. These ActionCards will be overridden with the use of Plugins. An example can be found in the @graphcommerce/magento-product-configurable package. ([@Jessevdpoel](https://github.com/Jessevdpoel))

### Patch Changes

- [#2003](https://github.com/graphcommerce-org/graphcommerce/pull/2003) [`e9041802b`](https://github.com/graphcommerce-org/graphcommerce/commit/e9041802b27d6610cc93715ca61acff7f59792e6) - When the switchPoint is zero, make sure the header doesn’t flash when scrolling up on iOS ([@Jessevdpoel](https://github.com/Jessevdpoel))

- [#2003](https://github.com/graphcommerce-org/graphcommerce/pull/2003) [`e81a9722b`](https://github.com/graphcommerce-org/graphcommerce/commit/e81a9722b5f581dacb624246c14d74aafbf55893) - Make sure the className is forwarded for ActionCardLayout ([@Jessevdpoel](https://github.com/Jessevdpoel))

## 6.2.0-canary.80

## 6.2.0-canary.79

### Patch Changes

- [#2013](https://github.com/graphcommerce-org/graphcommerce/pull/2013) [`c57bdf8a4`](https://github.com/graphcommerce-org/graphcommerce/commit/c57bdf8a4ce936c3eedc4dfada3a464a113ac68a) - Updated @mui and framer-motion packages to latest versions ([@paales](https://github.com/paales))

## 6.2.0-canary.78

## 6.2.0-canary.77

## 6.2.0-canary.76

### Patch Changes

- [#2005](https://github.com/graphcommerce-org/graphcommerce/pull/2005) [`950521b4d`](https://github.com/graphcommerce-org/graphcommerce/commit/950521b4d46a1b980636c05d68a8f6aba289e85c) - Footer's grid-area's will only be rendered when the props are passed. ([@LeanderMatse](https://github.com/LeanderMatse))

## 6.2.0-canary.75

## 6.2.0-canary.74

## 6.2.0-canary.73

## 6.2.0-canary.72

## 6.2.0-canary.71

### Patch Changes

- [#1980](https://github.com/graphcommerce-org/graphcommerce/pull/1980) [`275aaaba3`](https://github.com/graphcommerce-org/graphcommerce/commit/275aaaba34c9db1705183393c4327e8f16b09386) - Fixed overlays closing while still dragging - overlays should only close after releasing pointer ([@bramvanderholst](https://github.com/bramvanderholst))

## 6.2.0-canary.70

## 6.2.0-canary.69

## 6.2.0-canary.68

## 6.2.0-canary.67

## 6.2.0-canary.66

## 6.2.0-canary.65

## 6.2.0-canary.64

### Patch Changes

- [#1998](https://github.com/graphcommerce-org/graphcommerce/pull/1998) [`fdbdcb76f`](https://github.com/graphcommerce-org/graphcommerce/commit/fdbdcb76f918cf74b22253bd641a04c490ceb140) - Fixed users accidentally being able to scroll overlays out of view during open animation ([@bramvanderholst](https://github.com/bramvanderholst))

## 6.2.0-canary.63

## 6.2.0-canary.62

## 6.2.0-canary.61

## 6.2.0-canary.60

## 6.2.0-canary.59

## 6.2.0-canary.58

## 6.2.0-canary.57

## 6.2.0-canary.56

## 6.2.0-canary.55

## 6.2.0-canary.54

## 6.2.0-canary.53

## 6.2.0-canary.52

## 6.2.0-canary.51

## 6.2.0-canary.50

### Minor Changes

- [`e55d8c390`](https://github.com/graphcommerce-org/graphcommerce/commit/e55d8c390d90b4bb7bab11c6a99027ac72bd7e3e) - Created a new sidebar layout system, can be configured with productFiltersLayout in the graphcommerce.config.js ([@paales](https://github.com/paales))

## 6.2.0-canary.49

## 6.2.0-canary.48

### Minor Changes

- [#1961](https://github.com/graphcommerce-org/graphcommerce/pull/1961) [`4a759c662`](https://github.com/graphcommerce-org/graphcommerce/commit/4a759c66215eaa69edc342b898e05e8f92c3ba9a) - Add Open Graph meta tags to all pages ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

## 6.2.0-canary.47

## 6.2.0-canary.46

## 6.2.0-canary.45

## 6.2.0-canary.44

## 6.2.0-canary.43

### Patch Changes

- [#1965](https://github.com/graphcommerce-org/graphcommerce/pull/1965) [`44b2911d7`](https://github.com/graphcommerce-org/graphcommerce/commit/44b2911d73fb6c6c7188f16d5890ca93877e9aa7) - Added prop to LayoutHeader to be able to hide the back button ([@bramvanderholst](https://github.com/bramvanderholst))

## 6.2.0-canary.42

## 6.2.0-canary.41

### Patch Changes

- [#1960](https://github.com/graphcommerce-org/graphcommerce/pull/1960) [`f78caf5a8`](https://github.com/graphcommerce-org/graphcommerce/commit/f78caf5a83683f1ae4b901fb94bd22d50943fa2f) - Updated packages @apollo/client, react-hook-form, @emotion/\*, @lingui/\*, @mui/\* and various others. ([@paales](https://github.com/paales))

## 6.2.0-canary.40

## 6.2.0-canary.39

## 6.2.0-canary.38

### Patch Changes

- [#1958](https://github.com/graphcommerce-org/graphcommerce/pull/1958) [`0a311b6eb`](https://github.com/graphcommerce-org/graphcommerce/commit/0a311b6ebb5a52e2a7f1d2e6a0fe113904fa2d34) - Left overlays wouldn't properly snap when the overlay gets wider than the viewport ([@paales](https://github.com/paales))

## 6.2.0-canary.37

## 6.2.0-canary.36

## 6.2.0-canary.35

## 6.2.0-canary.34

## 6.2.0-canary.33

## 6.2.0-canary.32

## 6.2.0-canary.31

## 6.2.0-canary.30

## 6.2.0-canary.29

### Patch Changes

- [#1946](https://github.com/graphcommerce-org/graphcommerce/pull/1946) [`87260618b`](https://github.com/graphcommerce-org/graphcommerce/commit/87260618b8abaebd727ff4435abb1aea6ed33730) - Firefox: scroll snap overlays would snap to 0 when the scroll snap targets wouldn’t exactly match the possible targets. ([@paales](https://github.com/paales))

## 6.2.0-canary.28

## 6.2.0-canary.27

## 6.2.0-canary.26

## 6.2.0-canary.25

## 6.2.0-canary.24

## 6.2.0-canary.23

## 6.2.0-canary.22

### Patch Changes

- [#1939](https://github.com/graphcommerce-org/graphcommerce/pull/1939) [`0cdccf681`](https://github.com/graphcommerce-org/graphcommerce/commit/0cdccf6817d6a769f59cccb68b1b1b8b4405cbd0) - Make blogListItem date prop optional ([@JoshuaS98](https://github.com/JoshuaS98))

## 6.2.0-canary.21

## 6.2.0-canary.20

## 6.2.0-canary.19

## 6.2.0-canary.18

## 6.2.0-canary.17

### Patch Changes

- [#1934](https://github.com/graphcommerce-org/graphcommerce/pull/1934) [`96ac0320a`](https://github.com/graphcommerce-org/graphcommerce/commit/96ac0320a30bc55a6db5d46663d28b552fda4db6) - Fixed floating overlays not closing when clicking beside the overlay ([@bramvanderholst](https://github.com/bramvanderholst))

## 6.2.0-canary.16

### Patch Changes

- [#1930](https://github.com/graphcommerce-org/graphcommerce/pull/1930) [`c8d023e9e`](https://github.com/graphcommerce-org/graphcommerce/commit/c8d023e9e874131cd9f8fe192b1fca5fe1a26ee3) - Fix the close menu on search and add the option to secondary menu items ([@StefanAngenent](https://github.com/StefanAngenent))

## 6.2.0-canary.15

## 6.2.0-canary.14

## 6.2.0-canary.13

## 6.2.0-canary.12

## 6.2.0-canary.11

## 6.2.0-canary.10

## 6.2.0-canary.9

### Patch Changes

- [#1897](https://github.com/graphcommerce-org/graphcommerce/pull/1897) [`f44d7cec6`](https://github.com/graphcommerce-org/graphcommerce/commit/f44d7cec61766f4768c30d29b211a12f2846e9f6) - Overlays can now be configured to get a bgColor ([@FrankHarland](https://github.com/FrankHarland))

## 6.2.0-canary.8

## 6.2.0-canary.7

## 6.2.0-canary.6

## 6.1.1-canary.5

### Patch Changes

- [#1913](https://github.com/graphcommerce-org/graphcommerce/pull/1913) [`17eac116d`](https://github.com/graphcommerce-org/graphcommerce/commit/17eac116dbf2b811a67bfefd735d5a5a3e2b20dc) - Fixed zIndex issue with CartFab and ScrollerButton ([@bramvanderholst](https://github.com/bramvanderholst))

- [#1913](https://github.com/graphcommerce-org/graphcommerce/pull/1913) [`61b1987eb`](https://github.com/graphcommerce-org/graphcommerce/commit/61b1987eb8d37566cb4675f0ae962925aef2fc6d) - Fixed RowLinks ScrollerButton alignment when content is shown beside the Scroller ([@bramvanderholst](https://github.com/bramvanderholst))

## 6.1.1-canary.4

## 6.1.1-canary.3

## 6.1.1-canary.2

## 6.1.1-canary.1

## 6.1.1-canary.0

## 6.1.0

### Patch Changes

- [#1867](https://github.com/graphcommerce-org/graphcommerce/pull/1867) [`8e4bf4ca7`](https://github.com/graphcommerce-org/graphcommerce/commit/8e4bf4ca7d0c32525df50df4a350ab19a2fbf620) - Overlay would show an incorrect box-shadow for the variant=bottom ([@bramvanderholst](https://github.com/bramvanderholst))

- [#1895](https://github.com/graphcommerce-org/graphcommerce/pull/1895) [`49d34bda4`](https://github.com/graphcommerce-org/graphcommerce/commit/49d34bda4b4426ad97272ce0a28e17f52e9f4e06) - When opening the overlay while darkmode was enabled, it would close immediately ([@paales](https://github.com/paales))

- [#1867](https://github.com/graphcommerce-org/graphcommerce/pull/1867) [`9b7e4414c`](https://github.com/graphcommerce-org/graphcommerce/commit/9b7e4414c537e775c1f2d5de65ffde6fc39b7f3b) - Disallow overscrolling on overlays on mobile ([@bramvanderholst](https://github.com/bramvanderholst))

## 6.0.2-canary.22

## 6.0.2-canary.21

## 6.0.2-canary.20

## 6.0.2-canary.19

## 6.0.2-canary.18

## 6.0.2-canary.17

### Patch Changes

- [#1895](https://github.com/graphcommerce-org/graphcommerce/pull/1895) [`49d34bda4`](https://github.com/graphcommerce-org/graphcommerce/commit/49d34bda4b4426ad97272ce0a28e17f52e9f4e06) - When opening the overlay while darkmode was enabled, it would close immediately ([@paales](https://github.com/paales))

## 6.0.2-canary.16

## 6.0.2-canary.15

## 6.0.2-canary.14

## 6.0.2-canary.13

## 6.0.2-canary.12

## 6.0.2-canary.11

## 6.0.2-canary.10

## 6.0.2-canary.9

## 6.0.2-canary.8

## 6.0.2-canary.7

## 6.0.2-canary.6

## 6.0.2-canary.5

## 6.0.2-canary.4

## 6.0.2-canary.3

## 6.0.2-canary.2

### Patch Changes

- [#1867](https://github.com/graphcommerce-org/graphcommerce/pull/1867) [`8e4bf4ca7`](https://github.com/graphcommerce-org/graphcommerce/commit/8e4bf4ca7d0c32525df50df4a350ab19a2fbf620) - Fix incorrect box-shadow on bottom overlays ([@bramvanderholst](https://github.com/bramvanderholst))

- [#1867](https://github.com/graphcommerce-org/graphcommerce/pull/1867) [`5cf7c8c9e`](https://github.com/graphcommerce-org/graphcommerce/commit/5cf7c8c9ee95d28be0a7f476ea3f06f482c4fd5d) - Fix MdBottom class affecting Sm overlay ([@bramvanderholst](https://github.com/bramvanderholst))

- [#1867](https://github.com/graphcommerce-org/graphcommerce/pull/1867) [`9b7e4414c`](https://github.com/graphcommerce-org/graphcommerce/commit/9b7e4414c537e775c1f2d5de65ffde6fc39b7f3b) - Disallow overscrolling on overlays on mobile ([@bramvanderholst](https://github.com/bramvanderholst))

- [#1867](https://github.com/graphcommerce-org/graphcommerce/pull/1867) [`197b71711`](https://github.com/graphcommerce-org/graphcommerce/commit/197b717119da2a1876d36931c0063ad6d32a675c) - Overlay fixess ([@bramvanderholst](https://github.com/bramvanderholst))

## 6.0.2-canary.1

## 6.0.2-canary.0

## 6.0.1

### Patch Changes

- [#1854](https://github.com/graphcommerce-org/graphcommerce/pull/1854) [`f4df162c5`](https://github.com/graphcommerce-org/graphcommerce/commit/f4df162c59d90298f305f51d409974592ab8e680) - Overlay desktop bottom didn't have a box-shadow ([@paales](https://github.com/paales))

- [#1854](https://github.com/graphcommerce-org/graphcommerce/pull/1854) [`ba92b3ebe`](https://github.com/graphcommerce-org/graphcommerce/commit/ba92b3ebe9dae16f156f6c0d62bdf25a7df1a2a7) - Allow bottom overlays to resize and animate in position ([@paales](https://github.com/paales))

## 6.0.1-canary.7

## 6.0.1-canary.6

## 6.0.1-canary.5

## 6.0.1-canary.4

## 6.0.1-canary.3

## 6.0.1-canary.2

## 6.0.1-canary.1

## 6.0.1-canary.0

### Patch Changes

- [#1854](https://github.com/graphcommerce-org/graphcommerce/pull/1854) [`f4df162c5`](https://github.com/graphcommerce-org/graphcommerce/commit/f4df162c59d90298f305f51d409974592ab8e680) - Overlay desktop bottom didn't have a box-shadow ([@paales](https://github.com/paales))

- [#1854](https://github.com/graphcommerce-org/graphcommerce/pull/1854) [`ba92b3ebe`](https://github.com/graphcommerce-org/graphcommerce/commit/ba92b3ebe9dae16f156f6c0d62bdf25a7df1a2a7) - Allow bottom overlays to resize and animate in position ([@paales](https://github.com/paales))

## 6.0.0

### Major Changes

- [#1832](https://github.com/graphcommerce-org/graphcommerce/pull/1832) [`26d4243d5`](https://github.com/graphcommerce-org/graphcommerce/commit/26d4243d5b63d604e5a36386d9b01914db5f2918) - Added a new RowLink component with variants: Inline, ImageLabelSwiper, LogoSwiper and Usps. Updated the demo to show off these new components. ([@ErwinOtten](https://github.com/ErwinOtten))

- [#1749](https://github.com/graphcommerce-org/graphcommerce/pull/1749) [`0cc472915`](https://github.com/graphcommerce-org/graphcommerce/commit/0cc4729154d316227a41712b5f0adf514768e91f) - Introducing the new ProductFiltersPro component set with completely new filter and UI behavior. Filters will appear as a popper on the md and up breakpoints and as an overlay on sm and below breakpoints. Filters now have an Apply button instead of applying directly. ([@paales](https://github.com/paales))

### Minor Changes

- [#1822](https://github.com/graphcommerce-org/graphcommerce/pull/1822) [`cc02c46e3`](https://github.com/graphcommerce-org/graphcommerce/commit/cc02c46e32c9a44a90789591f43d91ae234dac84) - Added Facebook Open Graph tags to product pages:

  - og:title
  - og:image
  - og:url
  - type
  - product:retailer_part_no
  - product:price:amount
  - product:sale_price:amount
  - product:price:currency
  - product:category ([@KMalkowski](https://github.com/KMalkowski))

- [#1830](https://github.com/graphcommerce-org/graphcommerce/pull/1830) [`fafa76ba9`](https://github.com/graphcommerce-org/graphcommerce/commit/fafa76ba9e655739171abc553d309795c9d8e5c2) - Overlays now use an additional scroll container to handle vertical scroll, fixing:

  - Scrolling on desktop will not close the overlay when there is content to be scrolled
  - Scrolling will not snap to bottom / top when the content is barely scrollable
  - Dragging will only open or close the drawer, not something inbetween
  - Swiping up on mobile will not close the overlay, first you need to scroll to the top of the overlay.
  - Floating overlays will now scroll inside the floating overlay. ([@paales](https://github.com/paales))

- [#1798](https://github.com/graphcommerce-org/graphcommerce/pull/1798) [`3cee17a51`](https://github.com/graphcommerce-org/graphcommerce/commit/3cee17a51ff961f4363d95c9decb8c7d1f9ca319) - Added utility function `filterByTypename` function to filter types based on `__typename` ([@mikekeehnen](https://github.com/mikekeehnen))

- [#1814](https://github.com/graphcommerce-org/graphcommerce/pull/1814) [`15aa59049`](https://github.com/graphcommerce-org/graphcommerce/commit/15aa590493bf7639231f3bb3dd623c234ebad7cf) - ActionCard default styling introduced for a more inline and changed the look of selected filters. ([@ErwinOtten](https://github.com/ErwinOtten))

- [#1793](https://github.com/graphcommerce-org/graphcommerce/pull/1793) [`5562fa69b`](https://github.com/graphcommerce-org/graphcommerce/commit/5562fa69b1bc260f68555dcfaf30153eda489bed) - Add newsletter subscribe form ([@ErwinOtten](https://github.com/ErwinOtten))

### Patch Changes

- [#1830](https://github.com/graphcommerce-org/graphcommerce/pull/1830) [`dbc2ae0d3`](https://github.com/graphcommerce-org/graphcommerce/commit/dbc2ae0d360f645c3eab2a8f38b3d1431eab7d80) - Overlays will only hide the body scrollbar for right overlays so the page doesnt jump when opening. ([@paales](https://github.com/paales))

- [#1836](https://github.com/graphcommerce-org/graphcommerce/pull/1836) [`2857229c4`](https://github.com/graphcommerce-org/graphcommerce/commit/2857229c4d1c776540218f5e4cab3be524161502) - Overlays can not be closed as easily by swiping up, it will now always stop at the top over the overlay. ([@bramvanderholst](https://github.com/bramvanderholst))

- [#1771](https://github.com/graphcommerce-org/graphcommerce/pull/1771) [`aec07f567`](https://github.com/graphcommerce-org/graphcommerce/commit/aec07f5679472281b8eb71cf6967a1ff775d2a7f) - Navigation became visible when resizing the viewport. ([@paales](https://github.com/paales))

- [#1809](https://github.com/graphcommerce-org/graphcommerce/pull/1809) [`2da3c9214`](https://github.com/graphcommerce-org/graphcommerce/commit/2da3c92148aef08813b95e404a25796acf0eefd2) - Google Analytics now supports view_item, view_cart and remove_from_cart ([@mikekeehnen](https://github.com/mikekeehnen))

- [#1792](https://github.com/graphcommerce-org/graphcommerce/pull/1792) [`b0b8348b0`](https://github.com/graphcommerce-org/graphcommerce/commit/b0b8348b0d294f98140c2605691d47011add5b01) - Overlay headers with long titles now render correctly ([@bramvanderholst](https://github.com/bramvanderholst))

- [#1829](https://github.com/graphcommerce-org/graphcommerce/pull/1829) [`5f5f0dd1e`](https://github.com/graphcommerce-org/graphcommerce/commit/5f5f0dd1e0960b4cad694c5aaddffc7ccfc2bb1a) - Overlay right variant doesn't close automatically in firefox anymore ([@bramvanderholst](https://github.com/bramvanderholst))

- [#1749](https://github.com/graphcommerce-org/graphcommerce/pull/1749) [`16e91da42`](https://github.com/graphcommerce-org/graphcommerce/commit/16e91da42dcb454ea4761d1780b9338c88ef1463) - Corrected spelling mistake: incomming to incoming ([@paales](https://github.com/paales))

- [#1830](https://github.com/graphcommerce-org/graphcommerce/pull/1830) [`0bac3bdd8`](https://github.com/graphcommerce-org/graphcommerce/commit/0bac3bdd8505ccad8036d13e19559f2b3523fd92) - Navigation layout-animations will now only trigger when the active menu item changes ([@paales](https://github.com/paales))

- [#1830](https://github.com/graphcommerce-org/graphcommerce/pull/1830) [`6bffd680b`](https://github.com/graphcommerce-org/graphcommerce/commit/6bffd680b9d6a370048d06842cd3ce73130471dd) - Overlays now can't be closed when dragging beyong the pane (and actually opening them). ([@paales](https://github.com/paales))

- [#1834](https://github.com/graphcommerce-org/graphcommerce/pull/1834) [`58f7a63a4`](https://github.com/graphcommerce-org/graphcommerce/commit/58f7a63a4a4ef3bfcaeea75e393902b97138ba54) - Overlays may now be larger than 100% of the viewport without breaking. ([@paales](https://github.com/paales))

- [#1831](https://github.com/graphcommerce-org/graphcommerce/pull/1831) [`f4008bae3`](https://github.com/graphcommerce-org/graphcommerce/commit/f4008bae3e3ac8288c731b1dd87e6c6aef8e81fc) - Added a linting rule that disallows `import { Theme } from '@emotion/react'` because that causes huge performance issues. Also added `tsc:trace` to the root project to debug typescript performance issues. ([@paales](https://github.com/paales))

- [`bcaf428a3`](https://github.com/graphcommerce-org/graphcommerce/commit/bcaf428a31f2b480d442d347d09c0131a8569155) - Overlay timing issues resolved which would cause overlays to close or flicker. ([@paales](https://github.com/paales))

- [#1794](https://github.com/graphcommerce-org/graphcommerce/pull/1794) [`29e15cf63`](https://github.com/graphcommerce-org/graphcommerce/commit/29e15cf63251cf98cf42325322fcf09fb7a6c0b7) - Overlays variant=bottom will now work without jank on Android ([@bramvanderholst](https://github.com/bramvanderholst))

- [#1771](https://github.com/graphcommerce-org/graphcommerce/pull/1771) [`55d267ba0`](https://github.com/graphcommerce-org/graphcommerce/commit/55d267ba039f64af2b0248c68a1e1478970c9b31) - Solve issue where overlays would close diring opening when a rerender occured. ([@paales](https://github.com/paales))

- [#1829](https://github.com/graphcommerce-org/graphcommerce/pull/1829) [`52ecfc2ad`](https://github.com/graphcommerce-org/graphcommerce/commit/52ecfc2ad25fc6ef92465862fb94c1829bdd7c52) - CSS dvh property is now used when supported by browsers, causing less rerenders with overlays. ([@bramvanderholst](https://github.com/bramvanderholst))

- [#1806](https://github.com/graphcommerce-org/graphcommerce/pull/1806) [`597396766`](https://github.com/graphcommerce-org/graphcommerce/commit/597396766940de8c4ab5d8c84a0c6637ed72dba2) - Navigation visibility fixes when browser is resized, or exactly 864px width, and when Navigation is reopened after closing, dragging or navigating. Navigation HTML is now permanently in the DOM. ([@ErwinOtten](https://github.com/ErwinOtten))

- [#1825](https://github.com/graphcommerce-org/graphcommerce/pull/1825) [`27302739e`](https://github.com/graphcommerce-org/graphcommerce/commit/27302739e5dcd8791e7a3df06855f6450b0a6d10) - Show mobile footer on tablet to prevent cart fab overlapping footer content ([@bramvanderholst](https://github.com/bramvanderholst))

- [#1830](https://github.com/graphcommerce-org/graphcommerce/pull/1830) [`ff0c70e31`](https://github.com/graphcommerce-org/graphcommerce/commit/ff0c70e3165c64ea4f236a15a5820428dbf36e6a) - Overlays now have vertical visible scrollbars when the content is higher than the viewport. ([@paales](https://github.com/paales))

## 6.0.0-canary.54

## 6.0.0-canary.53

## 6.0.0-canary.52

### Patch Changes

- [#1809](https://github.com/graphcommerce-org/graphcommerce/pull/1809) [`2da3c9214`](https://github.com/graphcommerce-org/graphcommerce/commit/2da3c92148aef08813b95e404a25796acf0eefd2) - Added useMemoObject and implement in GaViewItem, GoogleAnalyticsItemList and GaCartStartCheckoutLinkOrButton ([@mikekeehnen](https://github.com/mikekeehnen))

## 6.0.0-canary.51

## 6.0.0-canary.50

## 6.0.0-canary.49

## 6.0.0-canary.48

## 6.0.0-canary.47

### Minor Changes

- [#1832](https://github.com/graphcommerce-org/graphcommerce/pull/1832) [`26d4243d5`](https://github.com/graphcommerce-org/graphcommerce/commit/26d4243d5b63d604e5a36386d9b01914db5f2918) - - Introduce RowLink component with variants (inline, logoswiper etc.)
  - Add new ImageLabelSwiper component to homepage
  - Multiple darkmode fixes (layered navition, logo invert filter) ([@ErwinOtten](https://github.com/ErwinOtten))

## 6.0.0-canary.46

## 6.0.0-canary.45

### Patch Changes

- [#1836](https://github.com/graphcommerce-org/graphcommerce/pull/1836) [`2857229c4`](https://github.com/graphcommerce-org/graphcommerce/commit/2857229c4d1c776540218f5e4cab3be524161502) - Allow scrolling bottom overlay to top instead of keeping spacing above overlay ([@bramvanderholst](https://github.com/bramvanderholst))

## 6.0.0-canary.44

### Patch Changes

- [#1842](https://github.com/graphcommerce-org/graphcommerce/pull/1842) [`7b67d84bd`](https://github.com/graphcommerce-org/graphcommerce/commit/7b67d84bd269c3fc91afbd69f6683c5d12808d36) - Renamed i18n to storefront in configuration ([@paales](https://github.com/paales))

## 6.0.0-canary.43

## 6.0.0-canary.42

## 6.0.0-canary.41

## 6.0.0-canary.40

## 6.0.0-canary.39

### Patch Changes

- [`bcaf428a3`](https://github.com/graphcommerce-org/graphcommerce/commit/bcaf428a31f2b480d442d347d09c0131a8569155) - Overlay timing issue where the resizeObserver was later than the scroll event ([@paales](https://github.com/paales))

## 6.0.0-canary.38

## 6.0.0-canary.37

### Patch Changes

- [#1834](https://github.com/graphcommerce-org/graphcommerce/pull/1834) [`58f7a63a4`](https://github.com/graphcommerce-org/graphcommerce/commit/58f7a63a4a4ef3bfcaeea75e393902b97138ba54) - Allow overlays to be larger than 100% height/width of the viewport ([@paales](https://github.com/paales))

## 6.0.0-canary.36

## 6.0.0-canary.35

### Minor Changes

- [#1822](https://github.com/graphcommerce-org/graphcommerce/pull/1822) [`cc02c46e3`](https://github.com/graphcommerce-org/graphcommerce/commit/cc02c46e32c9a44a90789591f43d91ae234dac84) - Added basic meta og:tags to the product page. ([@KMalkowski](https://github.com/KMalkowski))

## 6.0.0-canary.34

### Patch Changes

- [#1830](https://github.com/graphcommerce-org/graphcommerce/pull/1830) [`dbc2ae0d3`](https://github.com/graphcommerce-org/graphcommerce/commit/dbc2ae0d360f645c3eab2a8f38b3d1431eab7d80) - Hide body scrollbar only for right overlays ([@paales](https://github.com/paales))

- [#1830](https://github.com/graphcommerce-org/graphcommerce/pull/1830) [`fafa76ba9`](https://github.com/graphcommerce-org/graphcommerce/commit/fafa76ba9e655739171abc553d309795c9d8e5c2) - Overlays now use an additional scroll container to handle vertical scroll, fixing:

  - Scrolling on desktop will not close the overlay when there is content to be scrolled
  - Scrolling will not snap to bottom / top when the content is barely scrollable
  - Dragging will only open or close the drawer, not something inbetween
  - Swiping up on mobile will not close the overlay, first you need to scroll to the top of the overlay.
  - Floating overlays will now scroll inside the floating overlay. ([@paales](https://github.com/paales))

- [#1830](https://github.com/graphcommerce-org/graphcommerce/pull/1830) [`0bac3bdd8`](https://github.com/graphcommerce-org/graphcommerce/commit/0bac3bdd8505ccad8036d13e19559f2b3523fd92) - Navigation layout animation should only trigger when the active menu item changes ([@paales](https://github.com/paales))

- [#1830](https://github.com/graphcommerce-org/graphcommerce/pull/1830) [`6bffd680b`](https://github.com/graphcommerce-org/graphcommerce/commit/6bffd680b9d6a370048d06842cd3ce73130471dd) - Overlay shouldn't be closed when dragging beyond the pane ([@paales](https://github.com/paales))

- [#1830](https://github.com/graphcommerce-org/graphcommerce/pull/1830) [`ff0c70e31`](https://github.com/graphcommerce-org/graphcommerce/commit/ff0c70e3165c64ea4f236a15a5820428dbf36e6a) - Allow scrollbar to left and right full overlay variants. ([@paales](https://github.com/paales))

## 6.0.0-canary.33

### Patch Changes

- [#1831](https://github.com/graphcommerce-org/graphcommerce/pull/1831) [`f4008bae3`](https://github.com/graphcommerce-org/graphcommerce/commit/f4008bae3e3ac8288c731b1dd87e6c6aef8e81fc) - Added a linting rule that disallows `import { Theme } from '@emotion/react'` because that causes huge performance issues. Added tsc:trace to the root project to debug typescript performance issues. ([@paales](https://github.com/paales))

## 6.0.0-canary.32

### Minor Changes

- [#1814](https://github.com/graphcommerce-org/graphcommerce/pull/1814) [`15aa59049`](https://github.com/graphcommerce-org/graphcommerce/commit/15aa590493bf7639231f3bb3dd623c234ebad7cf) - - Show filter label, instead of value
  - Actioncard default styling
  - Active filter styling ([@ErwinOtten](https://github.com/ErwinOtten))

## 6.0.0-canary.31

### Patch Changes

- [#1825](https://github.com/graphcommerce-org/graphcommerce/pull/1825) [`27302739e`](https://github.com/graphcommerce-org/graphcommerce/commit/27302739e5dcd8791e7a3df06855f6450b0a6d10) - Show mobile footer on tablet to prevent cart fab overlapping footer content ([@bramvanderholst](https://github.com/bramvanderholst))

## 6.0.0-canary.30

### Patch Changes

- [#1829](https://github.com/graphcommerce-org/graphcommerce/pull/1829) [`5f5f0dd1e`](https://github.com/graphcommerce-org/graphcommerce/commit/5f5f0dd1e0960b4cad694c5aaddffc7ccfc2bb1a) - Fix overlay right variant closing automatically in Firefox ([@bramvanderholst](https://github.com/bramvanderholst))

- [#1829](https://github.com/graphcommerce-org/graphcommerce/pull/1829) [`52ecfc2ad`](https://github.com/graphcommerce-org/graphcommerce/commit/52ecfc2ad25fc6ef92465862fb94c1829bdd7c52) - Dynamic viewport height when supported ([@bramvanderholst](https://github.com/bramvanderholst))

## 6.0.0-canary.29

## 6.0.0-canary.28

## 6.0.0-canary.27

## 6.0.0-canary.26

## 6.0.0-canary.25

## 6.0.0-canary.24

## 6.0.0-canary.23

## 6.0.0-canary.22

## 6.0.0-canary.21

### Minor Changes

- [#1806](https://github.com/graphcommerce-org/graphcommerce/pull/1806) [`597396766`](https://github.com/graphcommerce-org/graphcommerce/commit/597396766940de8c4ab5d8c84a0c6637ed72dba2) - - Put navigation HTML permanently in the DOM
  - Fix issue where Navigation can't be reopened after closing, dragging or navigating
  - Fix overlay visibility when browser is resized, or exactly 864px width ([@ErwinOtten](https://github.com/ErwinOtten))

## 6.0.0-canary.20

## 5.2.0-canary.19

## 5.2.0-canary.18

## 5.2.0-canary.17

## 5.2.0-canary.16

## 5.2.0-canary.15

### Minor Changes

- [#1798](https://github.com/graphcommerce-org/graphcommerce/pull/1798) [`3cee17a51`](https://github.com/graphcommerce-org/graphcommerce/commit/3cee17a51ff961f4363d95c9decb8c7d1f9ca319) - Added filterByTypename function to filter types based on \_\_typename ([@mikekeehnen](https://github.com/mikekeehnen))

## 5.2.0-canary.14

## 5.2.0-canary.13

### Minor Changes

- [#1795](https://github.com/graphcommerce-org/graphcommerce/pull/1795) [`236d698b2`](https://github.com/graphcommerce-org/graphcommerce/commit/236d698b2aac55598fc45a6a58574a538f23e160) - Navigation link fix, homepage and category style fixes ([@ErwinOtten](https://github.com/ErwinOtten))

## 5.2.0-canary.12

## 5.2.0-canary.11

### Patch Changes

- [#1794](https://github.com/graphcommerce-org/graphcommerce/pull/1794) [`29e15cf63`](https://github.com/graphcommerce-org/graphcommerce/commit/29e15cf63251cf98cf42325322fcf09fb7a6c0b7) - Fix scroll issue with bottom overlay on Android ([@bramvanderholst](https://github.com/bramvanderholst))

## 5.2.0-canary.10

### Minor Changes

- [#1793](https://github.com/graphcommerce-org/graphcommerce/pull/1793) [`5562fa69b`](https://github.com/graphcommerce-org/graphcommerce/commit/5562fa69b1bc260f68555dcfaf30153eda489bed) - Add newsletter subscribe form ([@ErwinOtten](https://github.com/ErwinOtten))

## 5.2.0-canary.9

### Patch Changes

- [`b0b8348b0`](https://github.com/graphcommerce-org/graphcommerce/commit/b0b8348b0d294f98140c2605691d47011add5b01) - Fix ellipsis for long titles on mobile ([@bramvanderholst](https://github.com/bramvanderholst))

## 5.2.0-canary.8

## 5.2.0-canary.7

### Minor Changes

- [#1749](https://github.com/graphcommerce-org/graphcommerce/pull/1749) [`0cc472915`](https://github.com/graphcommerce-org/graphcommerce/commit/0cc4729154d316227a41712b5f0adf514768e91f) - Added new filter UI and behaviour. Filters will appear as a popper on the md and up breakpoints and as an overlay on sm and below breakpoints. Filters now have an Apply button instead of applying directly. ([@paales](https://github.com/paales))

### Patch Changes

- [#1749](https://github.com/graphcommerce-org/graphcommerce/pull/1749) [`16e91da42`](https://github.com/graphcommerce-org/graphcommerce/commit/16e91da42dcb454ea4761d1780b9338c88ef1463) - Fix spelling error incomming to incoming ([@paales](https://github.com/paales))

## 5.2.0-canary.6

## 5.2.0-canary.5

### Patch Changes

- [#1776](https://github.com/graphcommerce-org/graphcommerce/pull/1776) [`09f7312ae`](https://github.com/graphcommerce-org/graphcommerce/commit/09f7312ae44fae531947f9ce64711b7ac5983fc1) - add media query guard to category menu behaviour. ([@FrankHarland](https://github.com/FrankHarland))

## 5.2.0-canary.4

## 5.2.0-canary.3

## 5.2.0-canary.2

### Patch Changes

- [#1771](https://github.com/graphcommerce-org/graphcommerce/pull/1771) [`aec07f567`](https://github.com/graphcommerce-org/graphcommerce/commit/aec07f5679472281b8eb71cf6967a1ff775d2a7f) - Navigation shouldn't become visible when resizing the viewport ([@paales](https://github.com/paales))

- [#1771](https://github.com/graphcommerce-org/graphcommerce/pull/1771) [`55d267ba0`](https://github.com/graphcommerce-org/graphcommerce/commit/55d267ba039f64af2b0248c68a1e1478970c9b31) - Solve issue where overlays would close durting opening when they got rerendered. ([@paales](https://github.com/paales))

## 5.2.0-canary.1

## 5.2.0-canary.0

## 5.1.1

## 5.1.1-canary.1

## 5.1.1-canary.0

## 5.1.0

### Patch Changes

- [#1755](https://github.com/graphcommerce-org/graphcommerce/pull/1755) [`0025ad80f`](https://github.com/graphcommerce-org/graphcommerce/commit/0025ad80fb82d5d1e6c786bb8b5f39b2456c0932) - Renamed clientSizeCssVar.y/x to dvh(100) and dvw(100) ([@paales](https://github.com/paales))

- [#1760](https://github.com/graphcommerce-org/graphcommerce/pull/1760) [`06a81e661`](https://github.com/graphcommerce-org/graphcommerce/commit/06a81e66144b4d94a1e318c2e26cac8d13aa0eb7) - When you navigate back to an overlay (cart, etc.), it can no longer be closed by dragging or clicking on the backdrop. ([@paales](https://github.com/paales))

- [#1750](https://github.com/graphcommerce-org/graphcommerce/pull/1750) [`3479bc1e2`](https://github.com/graphcommerce-org/graphcommerce/commit/3479bc1e24da0e8a751ee301c59fa5f9755c8559) - Show globe icon instead of shopping bag icon for store/language-switcher ([@FrankHarland](https://github.com/FrankHarland))

- [#1755](https://github.com/graphcommerce-org/graphcommerce/pull/1755) [`3fcb03b79`](https://github.com/graphcommerce-org/graphcommerce/commit/3fcb03b79ce634650fd982dc36a112dccd37282f) - New props added to LayoutOverlay and Overlay components: `widthSm` and `widthMd` to control the width of the overlay.

  Defaults to `widthSm = 'max(300px, 80vw)', widthMd = 'max(800px, 50vw)'` ([@paales](https://github.com/paales))

- [#1745](https://github.com/graphcommerce-org/graphcommerce/pull/1745) [`b1444b933`](https://github.com/graphcommerce-org/graphcommerce/commit/b1444b9336107d3ac111563f9b62a884f1b26a8d) - Bring password reset page more in line with standard forms, add missing translations. ([@github-actions](https://github.com/apps/github-actions))

- [#1752](https://github.com/graphcommerce-org/graphcommerce/pull/1752) [`2a6a4d9ec`](https://github.com/graphcommerce-org/graphcommerce/commit/2a6a4d9ecfa1b58a66ba9b9d00016d6feda9aa95) - Updated dependencies to latest versions, except for nextjs; Solve tons of peer dependency issues.

  - Updated the @mui/material package
  - Removed dependencies on react-hook-form-mui and @playwright/test
  - Upgraded dependencies including type-fest and graphql-mesh
  - Solved peer dependency issues ([@paales](https://github.com/paales))

- [#1760](https://github.com/graphcommerce-org/graphcommerce/pull/1760) [`f1ebaa2ae`](https://github.com/graphcommerce-org/graphcommerce/commit/f1ebaa2aea68fe395fddb1b7dd91624251b1d501) - Navigation received focus making the menu visible while it shouldn't ([@paales](https://github.com/paales))

- [#1755](https://github.com/graphcommerce-org/graphcommerce/pull/1755) [`f44a05a6c`](https://github.com/graphcommerce-org/graphcommerce/commit/f44a05a6cedadc17e44c87f53cad5f462bc52aba) - Use a singlular useElementScroll and provide ther scroll from the useScrollerContext ([@paales](https://github.com/paales))

- [#1745](https://github.com/graphcommerce-org/graphcommerce/pull/1745) [`c7dc855af`](https://github.com/graphcommerce-org/graphcommerce/commit/c7dc855af5e096a53e17f3b2980b210642270fd5) - Added a spreadVal utility to replace responsiveVal and breakpointVal ([@github-actions](https://github.com/apps/github-actions))

- [#1755](https://github.com/graphcommerce-org/graphcommerce/pull/1755) [`9de7c6960`](https://github.com/graphcommerce-org/graphcommerce/commit/9de7c6960c7ec7d6d28a670f71ac678c5d3c838f) - The scrollbar was hidden for bottom sheets, while that wasn't necessary ([@paales](https://github.com/paales))

## 5.1.0-canary.11

## 5.1.0-canary.10

### Patch Changes

- [#1760](https://github.com/graphcommerce-org/graphcommerce/pull/1760) [`06a81e661`](https://github.com/graphcommerce-org/graphcommerce/commit/06a81e66144b4d94a1e318c2e26cac8d13aa0eb7) - When you navigate back to an overlay (cart, etc.), it can no longer be closed by dragging or clicking on the backdrop. ([@paales](https://github.com/paales))

- [#1760](https://github.com/graphcommerce-org/graphcommerce/pull/1760) [`f1ebaa2ae`](https://github.com/graphcommerce-org/graphcommerce/commit/f1ebaa2aea68fe395fddb1b7dd91624251b1d501) - Navigation received focus making the menu visible while it shouldn't ([@paales](https://github.com/paales))

## 5.1.0-canary.9

## 5.1.0-canary.8

## 5.1.0-canary.7

## 5.1.0-canary.6

## 5.1.0-canary.5

### Patch Changes

- [`b1444b933`](https://github.com/graphcommerce-org/graphcommerce/commit/b1444b9336107d3ac111563f9b62a884f1b26a8d) - Bring password reset page more in line with standard forms, add missing translations. ([@paales](https://github.com/paales))

- [`c7dc855af`](https://github.com/graphcommerce-org/graphcommerce/commit/c7dc855af5e096a53e17f3b2980b210642270fd5) - Added a spreadVal utility to replace responsiveVal and breakpointVal ([@paales](https://github.com/paales))

## 5.1.0-canary.4

### Patch Changes

- [#1755](https://github.com/graphcommerce-org/graphcommerce/pull/1755) [`0025ad80f`](https://github.com/graphcommerce-org/graphcommerce/commit/0025ad80fb82d5d1e6c786bb8b5f39b2456c0932) - Renamed clientSizeCssVar.y/x to dvh(100) and dvw(100) ([@paales](https://github.com/paales))

- [#1755](https://github.com/graphcommerce-org/graphcommerce/pull/1755) [`3fcb03b79`](https://github.com/graphcommerce-org/graphcommerce/commit/3fcb03b79ce634650fd982dc36a112dccd37282f) - New props added to LayoutOverlay and Overlay components: `widthSm` and `widthMd` to control the width of the overlay.

  Defaults to `widthSm = 'max(300px, 80vw)', widthMd = 'max(800px, 50vw)'` ([@paales](https://github.com/paales))

- [#1755](https://github.com/graphcommerce-org/graphcommerce/pull/1755) [`f44a05a6c`](https://github.com/graphcommerce-org/graphcommerce/commit/f44a05a6cedadc17e44c87f53cad5f462bc52aba) - Use a singlular useElementScroll and provide ther scroll from the useScrollerContext ([@paales](https://github.com/paales))

- [#1755](https://github.com/graphcommerce-org/graphcommerce/pull/1755) [`9de7c6960`](https://github.com/graphcommerce-org/graphcommerce/commit/9de7c6960c7ec7d6d28a670f71ac678c5d3c838f) - The scrollbar was hidden for bottom sheets, while that wasn't necessary ([@paales](https://github.com/paales))

## 5.1.0-canary.3

### Patch Changes

- [#1752](https://github.com/graphcommerce-org/graphcommerce/pull/1752) [`2a6a4d9ec`](https://github.com/graphcommerce-org/graphcommerce/commit/2a6a4d9ecfa1b58a66ba9b9d00016d6feda9aa95) - Updated dependencies to latest versions, except for nextjs; Solve tons of peer dependency issues.

  - Updated the @mui/material package
  - Removed dependencies on react-hook-form-mui and @playwright/test
  - Upgraded dependencies including type-fest and graphql-mesh
  - Solved peer dependency issues ([@paales](https://github.com/paales))

## 5.1.0-canary.2

### Patch Changes

- [#1750](https://github.com/graphcommerce-org/graphcommerce/pull/1750) [`3479bc1e2`](https://github.com/graphcommerce-org/graphcommerce/commit/3479bc1e24da0e8a751ee301c59fa5f9755c8559) - show globe icon instead of shopping bag icon for store/language-switcher ([@FrankHarland](https://github.com/FrankHarland))

## 5.1.0-canary.1

## 5.1.0-canary.0

## 5.0.0

### Major Changes

- [#1734](https://github.com/graphcommerce-org/graphcommerce/pull/1734) [`e4c7fe17e`](https://github.com/graphcommerce-org/graphcommerce/commit/e4c7fe17e413e37362ceae92e67f1b3a5f62d398) - Bump major version of all packages ([@github-actions](https://github.com/apps/github-actions))

### Minor Changes

- [#1732](https://github.com/graphcommerce-org/graphcommerce/pull/1732) [`4bf1f606f`](https://github.com/graphcommerce-org/graphcommerce/commit/4bf1f606f3281a2664d6e2a70202a22af4d2c849) - fix customer service scrollSnapAlign ([@StefanAngenent](https://github.com/StefanAngenent))

### Patch Changes

- [#1734](https://github.com/graphcommerce-org/graphcommerce/pull/1734) [`243d0dad2`](https://github.com/graphcommerce-org/graphcommerce/commit/243d0dad263f7b886a3d68e82729818c7df265bc) - Solve issue where the gallery of the product page would scroll obsessively ([@github-actions](https://github.com/apps/github-actions))

- [#1718](https://github.com/graphcommerce-org/graphcommerce/pull/1718) [`37e86cdc8`](https://github.com/graphcommerce-org/graphcommerce/commit/37e86cdc86ccca3db77d6c59b1e14c8112bb7893) - Remove usage of PropsWithChildren ([@paales](https://github.com/paales))

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`a0eefa762`](https://github.com/graphcommerce-org/graphcommerce/commit/a0eefa762f93f817f506b87753dfe0b92e3318f8) - Added better disabled state for an ActionCard ([@paales](https://github.com/paales))

- [#1734](https://github.com/graphcommerce-org/graphcommerce/pull/1734) [`d1c2f9901`](https://github.com/graphcommerce-org/graphcommerce/commit/d1c2f9901dbe76d4ca23c48614b05990aeb59161) - useTheme() was imported from the wrong file ([@github-actions](https://github.com/apps/github-actions))

- [#1734](https://github.com/graphcommerce-org/graphcommerce/pull/1734) [`0623f8ce7`](https://github.com/graphcommerce-org/graphcommerce/commit/0623f8ce738ace69aa44e55cf6a6ddb33cf0617a) - When clicking on a navigationlink it would animate on mobile ([@github-actions](https://github.com/apps/github-actions))

## 5.0.0-canary.14

## 5.0.0-canary.9

### Major Changes

- [`e4c7fe17e`](https://github.com/graphcommerce-org/graphcommerce/commit/e4c7fe17e413e37362ceae92e67f1b3a5f62d398) - Bump major version of all packages ([@paales](https://github.com/paales))

## 4.31.0-canary.8

## 4.31.0-canary.7

### Patch Changes

- [`d1c2f9901`](https://github.com/graphcommerce-org/graphcommerce/commit/d1c2f9901dbe76d4ca23c48614b05990aeb59161) - useTheme() was imported from the wrong file ([@paales](https://github.com/paales))

## 4.31.0-canary.6

### Patch Changes

- [`243d0dad2`](https://github.com/graphcommerce-org/graphcommerce/commit/243d0dad263f7b886a3d68e82729818c7df265bc) - Solve issue where the gallery of the product page would scroll obsessively ([@paales](https://github.com/paales))

- [`0623f8ce7`](https://github.com/graphcommerce-org/graphcommerce/commit/0623f8ce738ace69aa44e55cf6a6ddb33cf0617a) - When clicking on a navigationlink it would animate on mobile ([@paales](https://github.com/paales))

## 4.31.0-canary.5

## 4.31.0-canary.4

### Minor Changes

- [#1732](https://github.com/graphcommerce-org/graphcommerce/pull/1732) [`4bf1f606f`](https://github.com/graphcommerce-org/graphcommerce/commit/4bf1f606f3281a2664d6e2a70202a22af4d2c849) - fix customer service scrollSnapAlign ([@StefanAngenent](https://github.com/StefanAngenent))

## 4.31.0-canary.3

### Patch Changes

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`a0eefa762`](https://github.com/graphcommerce-org/graphcommerce/commit/a0eefa762f93f817f506b87753dfe0b92e3318f8) - Added better disabled state for an ActionCard ([@paales](https://github.com/paales))

## 4.31.0-canary.2

## 4.31.0-canary.1

### Patch Changes

- [#1718](https://github.com/graphcommerce-org/graphcommerce/pull/1718) [`37e86cdc8`](https://github.com/graphcommerce-org/graphcommerce/commit/37e86cdc86ccca3db77d6c59b1e14c8112bb7893) - Remove usage of PropsWithChildren ([@paales](https://github.com/paales))

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

## 4.29.3

### Patch Changes

- [#1688](https://github.com/graphcommerce-org/graphcommerce/pull/1688) [`8393cb266`](https://github.com/graphcommerce-org/graphcommerce/commit/8393cb2662860be0c2aa5df432447bb73c427d8e) Thanks [@paales](https://github.com/paales)! - Add missing icons for payment methods

- [#1688](https://github.com/graphcommerce-org/graphcommerce/pull/1688) [`f544401c7`](https://github.com/graphcommerce-org/graphcommerce/commit/f544401c7b653fda39c7c260ad0dcfb3bf543b65) Thanks [@paales](https://github.com/paales)! - Return the promise when changing the URL

- [#1688](https://github.com/graphcommerce-org/graphcommerce/pull/1688) [`f105d4223`](https://github.com/graphcommerce-org/graphcommerce/commit/f105d4223aa68df30970149e51ae72897e489bf9) Thanks [@paales](https://github.com/paales)! - Remove redunant confirmation button on ErrorSnackbar implementations

- Updated dependencies []:
  - @graphcommerce/framer-scroller@2.1.45

## 4.29.2

### Patch Changes

- [#1686](https://github.com/graphcommerce-org/graphcommerce/pull/1686) [`1953c7e27`](https://github.com/graphcommerce-org/graphcommerce/commit/1953c7e27eb606a825fce1ad361393b3c781c6da) Thanks [@paales](https://github.com/paales)! - Product page markup and sticky product image when the sidebar is fairly large

- Updated dependencies []:
  - @graphcommerce/framer-scroller@2.1.44

## 4.29.1

### Patch Changes

- [#1684](https://github.com/graphcommerce-org/graphcommerce/pull/1684) [`98d6a9cce`](https://github.com/graphcommerce-org/graphcommerce/commit/98d6a9cce1bb9514088be0af2736721b3edda467) Thanks [@paales](https://github.com/paales)! - When dragging the overlay down it doesn't close

- Updated dependencies []:
  - @graphcommerce/framer-scroller@2.1.43

## 4.29.0

### Minor Changes

- [#1679](https://github.com/graphcommerce-org/graphcommerce/pull/1679) [`0bd9ea582`](https://github.com/graphcommerce-org/graphcommerce/commit/0bd9ea58230dde79c5fe2cdb07e9860151460270) Thanks [@paales](https://github.com/paales)! - Added a new Fab component which adds a loading state

### Patch Changes

- [#1679](https://github.com/graphcommerce-org/graphcommerce/pull/1679) [`e76df6dc3`](https://github.com/graphcommerce-org/graphcommerce/commit/e76df6dc37c11c793a5d008ba36932d17dc23855) Thanks [@paales](https://github.com/paales)! - Added AddProductsToCartFab for a smaller add to cart button

- Updated dependencies []:
  - @graphcommerce/framer-scroller@2.1.42

## 4.28.1

### Patch Changes

- [#1675](https://github.com/graphcommerce-org/graphcommerce/pull/1675) [`9e630670f`](https://github.com/graphcommerce-org/graphcommerce/commit/9e630670ff6c952ab7b938d890b5509804985cf3) Thanks [@paales](https://github.com/paales)! - Added a new ItemScroller component to be able to make horizontal product scrollers

- [#1675](https://github.com/graphcommerce-org/graphcommerce/pull/1675) [`2e9fa5984`](https://github.com/graphcommerce-org/graphcommerce/commit/2e9fa5984a07ff14fc1b3a4f62189a26e8e3ecdd) Thanks [@paales](https://github.com/paales)! - Measure the size of children of the overlay to determine the size of children

- [#1675](https://github.com/graphcommerce-org/graphcommerce/pull/1675) [`adf13069a`](https://github.com/graphcommerce-org/graphcommerce/commit/adf13069af6460c960276b402237371c12fc6dec) Thanks [@paales](https://github.com/paales)! - Use realtime measurements for useOverlayPosition instead of computed values, to improve flickering issues

- [#1675](https://github.com/graphcommerce-org/graphcommerce/pull/1675) [`1b1504c9b`](https://github.com/graphcommerce-org/graphcommerce/commit/1b1504c9b0e51f2787bce91e1ff1940f540411d6) Thanks [@paales](https://github.com/paales)! - Added crosssel functionality

- Updated dependencies [[`81f31d1e5`](https://github.com/graphcommerce-org/graphcommerce/commit/81f31d1e54397368088a4289aaddd29facfceeef), [`a8905d263`](https://github.com/graphcommerce-org/graphcommerce/commit/a8905d263273cb9322583d5759a5fdc66eceb8e4), [`1b1504c9b`](https://github.com/graphcommerce-org/graphcommerce/commit/1b1504c9b0e51f2787bce91e1ff1940f540411d6), [`6c2e27b1b`](https://github.com/graphcommerce-org/graphcommerce/commit/6c2e27b1be4aaa888e65a2bd69eaeb467a54a023)]:
  - @graphcommerce/framer-scroller@2.1.41
  - @graphcommerce/framer-utils@3.2.1
  - @graphcommerce/framer-next-pages@3.3.2
  - @graphcommerce/image@3.1.10

## 4.28.0

### Minor Changes

- [#1662](https://github.com/graphcommerce-org/graphcommerce/pull/1662) [`0c21c5c23`](https://github.com/graphcommerce-org/graphcommerce/commit/0c21c5c233ebab15f6629c234e3de1cc8c0452e1) Thanks [@paales](https://github.com/paales)! - Implement serverRenderDepth prop to the Navigation to limit initial render time and TBT

* [#1662](https://github.com/graphcommerce-org/graphcommerce/pull/1662) [`f5eae0afd`](https://github.com/graphcommerce-org/graphcommerce/commit/f5eae0afdbd474b1f81c450425ffadf2d025187a) Thanks [@paales](https://github.com/paales)! - Move to useMatchMedia to have a simple boolean utility that allows to match to a certain breakpoint

### Patch Changes

- [#1662](https://github.com/graphcommerce-org/graphcommerce/pull/1662) [`de8925aa9`](https://github.com/graphcommerce-org/graphcommerce/commit/de8925aa910b191c62041530c68c697a58a1e52d) Thanks [@paales](https://github.com/paales)! - Allow for a custom Component for magentoMenuToNavigation and allow React.ReactNode for items

- Updated dependencies [[`f5eae0afd`](https://github.com/graphcommerce-org/graphcommerce/commit/f5eae0afdbd474b1f81c450425ffadf2d025187a), [`9e0ca73eb`](https://github.com/graphcommerce-org/graphcommerce/commit/9e0ca73eb50ded578f4a98e40a7eb920bf8ab421)]:
  - @graphcommerce/framer-scroller@2.1.40
  - @graphcommerce/framer-next-pages@3.3.1

## 4.27.0

### Minor Changes

- [#1642](https://github.com/graphcommerce-org/graphcommerce/pull/1642) [`ad63ebf4e`](https://github.com/graphcommerce-org/graphcommerce/commit/ad63ebf4e33bfb0e5c9e5e68ab69b14775f3f8a8) Thanks [@paales](https://github.com/paales)! - Introduced `<AddProductsToCartForm/>`, which is allows for adding all product types to the cart with a single react-hook-form form.

  Which allows you to fully compose the form on the product page without having to modify the page.

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/framer-scroller@2.1.39

## 4.26.0

### Minor Changes

- [#1651](https://github.com/graphcommerce-org/graphcommerce/pull/1651) [`42e7fac75`](https://github.com/graphcommerce-org/graphcommerce/commit/42e7fac75712f9bda7a6b919ede14b3c75d07771) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Correct component usage in /service

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/framer-scroller@2.1.38

## 4.25.0

### Minor Changes

- [#1641](https://github.com/graphcommerce-org/graphcommerce/pull/1641) [`dc6237644`](https://github.com/graphcommerce-org/graphcommerce/commit/dc6237644ac349debb728059e4c937cec25bf4fd) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Fix overlay content stretch bug on hover while animating

* [#1643](https://github.com/graphcommerce-org/graphcommerce/pull/1643) [`48273bccd`](https://github.com/graphcommerce-org/graphcommerce/commit/48273bccd2e471ce4bc024a600e693da791f1cde) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Show current navigation title on item interaction

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/framer-scroller@2.1.37

## 4.24.0

### Minor Changes

- [#1638](https://github.com/graphcommerce-org/graphcommerce/pull/1638) [`104103bc2`](https://github.com/graphcommerce-org/graphcommerce/commit/104103bc2a0fbaa510af2e26b6b00ddc63e8495b) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Fix navigation overlay visibility bug

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/framer-scroller@2.1.36

## 4.23.1

### Patch Changes

- [#1624](https://github.com/graphcommerce-org/graphcommerce/pull/1624) [`9b84a68a1`](https://github.com/graphcommerce-org/graphcommerce/commit/9b84a68a1e7311a79eb687c7dcee905d3000facf) Thanks [@paales](https://github.com/paales)! - Create a GetServerSideProps

- Updated dependencies []:
  - @graphcommerce/framer-scroller@2.1.35

## 4.23.0

### Minor Changes

- [#1620](https://github.com/graphcommerce-org/graphcommerce/pull/1620) [`755d2cf83`](https://github.com/graphcommerce-org/graphcommerce/commit/755d2cf83343a5ad3d61063eff595d821de360aa) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Add spacing feature to navItems

* [#1618](https://github.com/graphcommerce-org/graphcommerce/pull/1618) [`dc7f2dda4`](https://github.com/graphcommerce-org/graphcommerce/commit/dc7f2dda40ff8572fc11161de6eb62ca13e720dd) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Remove prefetch from navigation links

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/framer-scroller@2.1.34

## 4.22.0

### Minor Changes

- [#1610](https://github.com/graphcommerce-org/graphcommerce/pull/1610) [`bb94e7045`](https://github.com/graphcommerce-org/graphcommerce/commit/bb94e7045460cb671c45d612a0833731d7c20c30) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - Previously when the persisted selected value didn't exist in the list of ActionCard items, all items would be hidden. In this fix we set the hidden prop in the ActionCardList component, where we check if the value exists, if not, we display all items

* [#1602](https://github.com/graphcommerce-org/graphcommerce/pull/1602) [`5f781a217`](https://github.com/graphcommerce-org/graphcommerce/commit/5f781a217ce63ed56bc1a9983487b04400a8a315) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Default styles and layout fixes

  - Scaled icons and fonts down. Size in typography is now more gradual: https://graphcommerce.vercel.app/test/typography
  - Multiple accessibility fixes. Missing button/input labels, and fixed spacing issues resulting in high % appropriately sized tap targets
  - Replaced responsiveVal usage with better performaning breakpointVal where possible
  - All buttons are now Pill by default.
  - Cleaned up checkout styles

### Patch Changes

- [#1601](https://github.com/graphcommerce-org/graphcommerce/pull/1601) [`04708dacc`](https://github.com/graphcommerce-org/graphcommerce/commit/04708daccc213c6ea927bc67fa3bd0d5b1fad619) Thanks [@paales](https://github.com/paales)! - Navigation now uses a single `const selection = useNavigationSelection()` motionValue to control the state of the menu, to prevent excessive rerenders.

* [#1611](https://github.com/graphcommerce-org/graphcommerce/pull/1611) [`b0dc4e2e1`](https://github.com/graphcommerce-org/graphcommerce/commit/b0dc4e2e1982d502d38dd50a0f493396360a7a15) Thanks [@FrankHarland](https://github.com/FrankHarland)! - Fix overlay doule click

- [#1609](https://github.com/graphcommerce-org/graphcommerce/pull/1609) [`4a5286dfe`](https://github.com/graphcommerce-org/graphcommerce/commit/4a5286dfeaa1719e594a0078f274fbab53969c4e) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Solve issue where navigation back would happen twice when closing an overlay

* [#1601](https://github.com/graphcommerce-org/graphcommerce/pull/1601) [`d46d5ed0c`](https://github.com/graphcommerce-org/graphcommerce/commit/d46d5ed0cc5794391b7527fc17bbb68ec2212e33) Thanks [@paales](https://github.com/paales)! - Move to newer useScroll hook to watch body scroll, prevents deprecation warnings.

* Updated dependencies [[`5f781a217`](https://github.com/graphcommerce-org/graphcommerce/commit/5f781a217ce63ed56bc1a9983487b04400a8a315), [`01372b918`](https://github.com/graphcommerce-org/graphcommerce/commit/01372b918a291e01cbf5db40edcb40fb1c2af313)]:
  - @graphcommerce/framer-next-pages@3.3.0
  - @graphcommerce/framer-utils@3.2.0
  - @graphcommerce/framer-scroller@2.1.33
  - @graphcommerce/image@3.1.9

## 4.21.0

### Minor Changes

- [#1597](https://github.com/graphcommerce-org/graphcommerce/pull/1597) [`1f7ee6f6c`](https://github.com/graphcommerce-org/graphcommerce/commit/1f7ee6f6cfb28544439ed36e10929ac530d1b2b7) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Fix safari nav bug

### Patch Changes

- Updated dependencies [[`707dbc73d`](https://github.com/graphcommerce-org/graphcommerce/commit/707dbc73d181204d88fdbbd2e09340e25b2b5f7b), [`5c5645e6e`](https://github.com/graphcommerce-org/graphcommerce/commit/5c5645e6eaf5314c063f05547707fcd4b34a8717)]:
  - @graphcommerce/framer-utils@3.1.5
  - @graphcommerce/framer-scroller@2.1.32
  - @graphcommerce/framer-next-pages@3.2.5
  - @graphcommerce/image@3.1.8

## 4.20.0

### Minor Changes

- [#1592](https://github.com/graphcommerce-org/graphcommerce/pull/1592) [`43822fd61`](https://github.com/graphcommerce-org/graphcommerce/commit/43822fd61c949215b8ddce9fb37d09f29b638426) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Animation fixes

* [#1596](https://github.com/graphcommerce-org/graphcommerce/pull/1596) [`3a619b70d`](https://github.com/graphcommerce-org/graphcommerce/commit/3a619b70d082804b8de46a8e8232f9431479a8b7) Thanks [@paales](https://github.com/paales)! - Create products sitemap

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/framer-scroller@2.1.31

## 4.19.0

### Minor Changes

- [#1576](https://github.com/graphcommerce-org/graphcommerce/pull/1576) [`b6d3a3c13`](https://github.com/graphcommerce-org/graphcommerce/commit/b6d3a3c13ea63ef0f691f497507f07c0e094de5b) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Create products sitemap

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/framer-scroller@2.1.30

## 4.18.0

### Minor Changes

- [#1587](https://github.com/graphcommerce-org/graphcommerce/pull/1587) [`6ce2cbaf2`](https://github.com/graphcommerce-org/graphcommerce/commit/6ce2cbaf2cf27e21b753f7cb71e7e74826294de6) Thanks [@paales](https://github.com/paales)! - Navigation fixes

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/framer-scroller@2.1.29

## 4.17.0

### Minor Changes

- [#1583](https://github.com/graphcommerce-org/graphcommerce/pull/1583) [`b6ce5548c`](https://github.com/graphcommerce-org/graphcommerce/commit/b6ce5548c66a8ca62d3aee29467045f7f07f30c8) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Navigation fixes

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/framer-scroller@2.1.28

## 4.16.0

### Minor Changes

- [#1573](https://github.com/graphcommerce-org/graphcommerce/pull/1573) [`1eb131766`](https://github.com/graphcommerce-org/graphcommerce/commit/1eb131766c32db6fcb0a8e83dba2c3d241658595) Thanks [@paales](https://github.com/paales)! - Solve issue where the products query would return multiple products while requesting a single url_key. Filter the result by findByTypename which finds the correct `typename` but also narrows the typescript type.

### Patch Changes

- [#1573](https://github.com/graphcommerce-org/graphcommerce/pull/1573) [`87a188d6f`](https://github.com/graphcommerce-org/graphcommerce/commit/87a188d6f216b7f7b9ec95afbe74f1146cb07ce4) Thanks [@paales](https://github.com/paales)! - Sovle issue where changing images in the scroller causes issues rerendering

- Updated dependencies [[`87a188d6f`](https://github.com/graphcommerce-org/graphcommerce/commit/87a188d6f216b7f7b9ec95afbe74f1146cb07ce4)]:
  - @graphcommerce/framer-scroller@2.1.27

## 4.15.1

### Patch Changes

- [#1570](https://github.com/graphcommerce-org/graphcommerce/pull/1570) [`a88f166f0`](https://github.com/graphcommerce-org/graphcommerce/commit/a88f166f0115c58254fe47171da51a5850658a32) Thanks [@paales](https://github.com/paales)! - Solve issue where chrome would report duplicate ids

- Updated dependencies []:
  - @graphcommerce/framer-scroller@2.1.26

## 4.15.0

### Minor Changes

- [#1566](https://github.com/graphcommerce-org/graphcommerce/pull/1566) [`e167992df`](https://github.com/graphcommerce-org/graphcommerce/commit/e167992dfdc6964a392af719667f8a188626ab1b) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Introduced `@graphcommerce/next-ui/navigation` component.

  - Navigation is always present in the DOM
  - Configurable in LayoutNavigation.tsx
  - Show categories directly, or nest them in a 'products' button
  - Choose prefered mouseEvent: click or hover

* [#1566](https://github.com/graphcommerce-org/graphcommerce/pull/1566) [`9c2504b4e`](https://github.com/graphcommerce-org/graphcommerce/commit/9c2504b4ed75f41d3003c4d3339814010e85e37e) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - publish navigation

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/framer-scroller@2.1.25

## 4.14.0

### Minor Changes

- [#1553](https://github.com/graphcommerce-org/graphcommerce/pull/1553) [`323fdee4b`](https://github.com/graphcommerce-org/graphcommerce/commit/323fdee4b15ae23e0e84dd0588cb2c6446dcfd50) Thanks [@NickdeK](https://github.com/NickdeK)! - Added a new cookies utility to load cookies on the frontend

### Patch Changes

- [#1553](https://github.com/graphcommerce-org/graphcommerce/pull/1553) [`afcd8e4bf`](https://github.com/graphcommerce-org/graphcommerce/commit/afcd8e4bfb7010da4d5faeed85b61991ed7975f4) Thanks [@NickdeK](https://github.com/NickdeK)! - ActionCardList will now show all options when the selected value isn't in any of the options

* [#1553](https://github.com/graphcommerce-org/graphcommerce/pull/1553) [`02e1988e5`](https://github.com/graphcommerce-org/graphcommerce/commit/02e1988e5f361c6f66ae30d3bbee38ef2ac062df) Thanks [@NickdeK](https://github.com/NickdeK)! - Make sure the useDateTimeFormat isn't giving hydration warnings

* Updated dependencies []:
  - @graphcommerce/framer-scroller@2.1.24

## 4.13.1

### Patch Changes

- [#1552](https://github.com/graphcommerce-org/graphcommerce/pull/1552) [`18054c441`](https://github.com/graphcommerce-org/graphcommerce/commit/18054c441962ba750bed3acc39ab46c8d3a341ce) Thanks [@paales](https://github.com/paales)! - Updated to Next.js v12.2.2 and other packages and made compatible

* [#1552](https://github.com/graphcommerce-org/graphcommerce/pull/1552) [`c5c539c44`](https://github.com/graphcommerce-org/graphcommerce/commit/c5c539c44eeac524cd62ce649e132d2e00333794) Thanks [@paales](https://github.com/paales)! - Make sure the gallery doesn't scroll when overlays are opened

- [#1552](https://github.com/graphcommerce-org/graphcommerce/pull/1552) [`6f69bc54c`](https://github.com/graphcommerce-org/graphcommerce/commit/6f69bc54c6e0224452817c532ae58d9c332b61ea) Thanks [@paales](https://github.com/paales)! - Prevent back button scrolling when navigating between overlays

* [#1552](https://github.com/graphcommerce-org/graphcommerce/pull/1552) [`21886d6fa`](https://github.com/graphcommerce-org/graphcommerce/commit/21886d6fa64a48d9e932bfaf8d138c9b13c36e43) Thanks [@paales](https://github.com/paales)! - Fix page stacking and scroll restoration when navigating

* Updated dependencies [[`18054c441`](https://github.com/graphcommerce-org/graphcommerce/commit/18054c441962ba750bed3acc39ab46c8d3a341ce), [`21886d6fa`](https://github.com/graphcommerce-org/graphcommerce/commit/21886d6fa64a48d9e932bfaf8d138c9b13c36e43), [`b4936e961`](https://github.com/graphcommerce-org/graphcommerce/commit/b4936e96175fe80717895822e245274db05638bd)]:
  - @graphcommerce/framer-next-pages@3.2.4
  - @graphcommerce/framer-scroller@2.1.23

## 4.13.0

### Minor Changes

- [#1522](https://github.com/graphcommerce-org/graphcommerce/pull/1522) [`8d8fda262`](https://github.com/graphcommerce-org/graphcommerce/commit/8d8fda2623e561cb43441110c67ffa34b692668a) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Introducing a new Navigation component that builds on the existing navigation component and tries to address the 'mega menu' question where there are tons of categories that need to be navigated quickly.

* [#1522](https://github.com/graphcommerce-org/graphcommerce/pull/1522) [`cefa7b365`](https://github.com/graphcommerce-org/graphcommerce/commit/cefa7b3652b55108d2178927e3c5d98a111cf373) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Introducting a new Overlay component with is the generic part of LayoutOverlay into OverlayBase. The new Overlay is used to render the new Navigation component.

### Patch Changes

- Updated dependencies [[`584b683a2`](https://github.com/graphcommerce-org/graphcommerce/commit/584b683a2aedcdf5067644c8dcc0e63a5b9e894c)]:
  - @graphcommerce/framer-scroller@2.1.22

## 4.12.0

### Minor Changes

- [#1534](https://github.com/graphcommerce-org/graphcommerce/pull/1534) [`c756f42e5`](https://github.com/graphcommerce-org/graphcommerce/commit/c756f42e503761a497e4a5a7a02d02141df231c3) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - Added the method title to the action card title for shipping methods.

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/framer-scroller@2.1.21

## 4.11.2

### Patch Changes

- [#1538](https://github.com/graphcommerce-org/graphcommerce/pull/1538) [`fe4baa42d`](https://github.com/graphcommerce-org/graphcommerce/commit/fe4baa42db0081ed960d62aef688bd36a7ac974f) Thanks [@paales](https://github.com/paales)! - add missing translations

- Updated dependencies []:
  - @graphcommerce/framer-scroller@2.1.20

## 4.11.1

### Patch Changes

- [#1529](https://github.com/graphcommerce-org/graphcommerce/pull/1529) [`11bca2d2f`](https://github.com/graphcommerce-org/graphcommerce/commit/11bca2d2f7dbb7c5e2827c04eb0db43d4099f2fd) Thanks [@paales](https://github.com/paales)! - issue where the error message of actionCardList was incomplete

- Updated dependencies []:
  - @graphcommerce/framer-scroller@2.1.19

## 4.11.0

### Minor Changes

- [#1524](https://github.com/graphcommerce-org/graphcommerce/pull/1524) [`9ec0338df`](https://github.com/graphcommerce-org/graphcommerce/commit/9ec0338dfe34d37b0f2c24e36ffa6ed13ea1145e) Thanks [@paales](https://github.com/paales)! - feat: Added useDateTimeFormat and useNumberFormat which automatically use the locales from nextjs.

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/framer-scroller@2.1.18

## 4.10.0

### Minor Changes

- [#1515](https://github.com/graphcommerce-org/graphcommerce/pull/1515) [`371e6cf52`](https://github.com/graphcommerce-org/graphcommerce/commit/371e6cf52916a3b6c44192bd40cc8271bd608832) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - - Shipping method UI improvements in checkout, like working ripple effect, auto select and other styling changes.
  - Added new inline button variant

* [#1518](https://github.com/graphcommerce-org/graphcommerce/pull/1518) [`4143483f3`](https://github.com/graphcommerce-org/graphcommerce/commit/4143483f37c038d2bbf218be2685e27a31a35745) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - New ActionCardListForm implementation for Payment Methods

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/framer-scroller@2.1.17

## 4.9.0

### Minor Changes

- [#1503](https://github.com/graphcommerce-org/graphcommerce/pull/1503) [`a9213f1f5`](https://github.com/graphcommerce-org/graphcommerce/commit/a9213f1f5a410d217768386ccb6d9b5ce7bd5782) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - Bug fixes for shipping methods in /checkout

### Patch Changes

- [#1490](https://github.com/graphcommerce-org/graphcommerce/pull/1490) [`d311ef48b`](https://github.com/graphcommerce-org/graphcommerce/commit/d311ef48bb3e97806d992af5516d6b7f183ec9cb) Thanks [@paales](https://github.com/paales)! - upgraded packages

- Updated dependencies [[`ddb6d6329`](https://github.com/graphcommerce-org/graphcommerce/commit/ddb6d6329bfad361b2fbe96402ca2bfc0ab3d98c), [`d311ef48b`](https://github.com/graphcommerce-org/graphcommerce/commit/d311ef48bb3e97806d992af5516d6b7f183ec9cb)]:
  - @graphcommerce/framer-scroller@2.1.16
  - @graphcommerce/framer-next-pages@3.2.3
  - @graphcommerce/framer-utils@3.1.4
  - @graphcommerce/image@3.1.7

## 4.8.4

### Patch Changes

- [#1509](https://github.com/graphcommerce-org/graphcommerce/pull/1509) [`0ab7c5465`](https://github.com/graphcommerce-org/graphcommerce/commit/0ab7c5465441cba9bf8cd185a6790ce2f443f4ed) Thanks [@paales](https://github.com/paales)! - SidebarGallery improvements (product page):

  - Prevent vertical scrolling
  - Disable zoom fab when there are no images
  - Hide scroller dots when there in only one image
  - Make sure the prev/next buttons are shown as expected

- Updated dependencies [[`0ab7c5465`](https://github.com/graphcommerce-org/graphcommerce/commit/0ab7c5465441cba9bf8cd185a6790ce2f443f4ed)]:
  - @graphcommerce/framer-scroller@2.1.15

## 4.8.3

### Patch Changes

- [#1487](https://github.com/graphcommerce-org/graphcommerce/pull/1487) [`afc67103d`](https://github.com/graphcommerce-org/graphcommerce/commit/afc67103d0e00583e274465036fd287537f95e79) Thanks [@paales](https://github.com/paales)! - When additing an additional breakpoint it would throw a typescript error

- Updated dependencies []:
  - @graphcommerce/framer-scroller@2.1.14

## 4.8.2

### Patch Changes

- [#1485](https://github.com/graphcommerce-org/graphcommerce/pull/1485) [`c8c246b8a`](https://github.com/graphcommerce-org/graphcommerce/commit/c8c246b8aaab0621b68a2fca2a1c529a56fad962) Thanks [@paales](https://github.com/paales)! - TextInputNumber: when adding a label it should be displayed properly

- Updated dependencies []:
  - @graphcommerce/framer-scroller@2.1.13

## 4.8.1

### Patch Changes

- [#1477](https://github.com/graphcommerce-org/graphcommerce/pull/1477) [`a9df81310`](https://github.com/graphcommerce-org/graphcommerce/commit/a9df81310c051876dd82fb2819105dece47cc213) Thanks [@paales](https://github.com/paales)! - Revert faulty background color on LayoutDefault

* [#1477](https://github.com/graphcommerce-org/graphcommerce/pull/1477) [`f167f9963`](https://github.com/graphcommerce-org/graphcommerce/commit/f167f99630966a7de43717937d43669e66132494) Thanks [@paales](https://github.com/paales)! - LayoutOverlay performance improvements

* Updated dependencies [[`55c2dcde7`](https://github.com/graphcommerce-org/graphcommerce/commit/55c2dcde7869ee51b84494af653b3edfd43904a4), [`597e2f413`](https://github.com/graphcommerce-org/graphcommerce/commit/597e2f413bdb5b76793b40ab631ce61390e26e81), [`f167f9963`](https://github.com/graphcommerce-org/graphcommerce/commit/f167f99630966a7de43717937d43669e66132494)]:
  - @graphcommerce/framer-scroller@2.1.12
  - @graphcommerce/framer-next-pages@3.2.2
  - @graphcommerce/framer-utils@3.1.3
  - @graphcommerce/image@3.1.6

## 4.8.0

### Minor Changes

- [#1462](https://github.com/graphcommerce-org/graphcommerce/pull/1462) [`3ac90b57c`](https://github.com/graphcommerce-org/graphcommerce/commit/3ac90b57c68b96f9d81771d6664ed9435a28fc1d) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - Added translation for the pagination

### Patch Changes

- [#1467](https://github.com/graphcommerce-org/graphcommerce/pull/1467) [`0363b9671`](https://github.com/graphcommerce-org/graphcommerce/commit/0363b9671db7c2932321d97faf6f1eb385238397) Thanks [@timhofman](https://github.com/timhofman)! - optional feedback message upon adding products to wishlist

- Updated dependencies []:
  - @graphcommerce/framer-scroller@2.1.11

## 4.7.2

### Patch Changes

- [#1451](https://github.com/graphcommerce-org/graphcommerce/pull/1451) [`f698ff85d`](https://github.com/graphcommerce-org/graphcommerce/commit/f698ff85df6bb0922288471bb3c81856091b8061) Thanks [@paales](https://github.com/paales)! - Removed all occurences of @lingui/macro and moved to @lingui/macro / @lingui/core in preparation to move to swc.

  Since we've removed @lingui/macro, all occurences need to be replaced with @lingui/core and @lingui/react.

  All occurences of `<Trans>` and `t` need to be replaced:

  ```tsx
  import { Trans, t } from "@lingui/macro";

  function MyComponent() {
    const foo = "bar";
    return (
      <div aria-label={t`Account ${foo}`}>
        <Trans>My Translation {foo}</Trans>
      </div>
    );
  }
  ```

  Needs to be replaced with:

  ```tsx
  import { Trans } from "@lingui/react";
  import { i18n } from "@lingui/core";

  function MyComponent() {
    const foo = "bar";
    return (
      <div aria-label={i18n._(/* i18n */ `Account {foo}`, { foo })}>
        <Trans key="My Translation {foo}" values={{ foo }}></Trans>
      </div>
    );
  }
  ```

  [More examples for Trans](https://lingui.js.org/ref/macro.html#examples-of-jsx-macros) and [more examples for `t`](https://lingui.js.org/ref/macro.html#examples-of-js-macros)

- Updated dependencies [[`f698ff85d`](https://github.com/graphcommerce-org/graphcommerce/commit/f698ff85df6bb0922288471bb3c81856091b8061)]:
  - @graphcommerce/framer-scroller@2.1.10

## 4.7.1

### Patch Changes

- Updated dependencies [[`99600dd09`](https://github.com/graphcommerce-org/graphcommerce/commit/99600dd091980dd9ef335c04d2efac0835c20b2f)]:
  - @graphcommerce/framer-next-pages@3.2.1
  - @graphcommerce/framer-scroller@2.1.9

## 4.7.0

### Minor Changes

- [#1416](https://github.com/graphcommerce-org/graphcommerce/pull/1416) [`f3d06dd83`](https://github.com/graphcommerce-org/graphcommerce/commit/f3d06dd836c9a76412b419d4d2c79bbd0ee92e04) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - SEO audit

### Patch Changes

- Updated dependencies [[`f3d06dd83`](https://github.com/graphcommerce-org/graphcommerce/commit/f3d06dd836c9a76412b419d4d2c79bbd0ee92e04)]:
  - @graphcommerce/framer-next-pages@3.2.0
  - @graphcommerce/framer-scroller@2.1.8

## 4.6.2

### Patch Changes

- [#1426](https://github.com/graphcommerce-org/graphcommerce/pull/1426) [`100f4c38c`](https://github.com/graphcommerce-org/graphcommerce/commit/100f4c38c8fcda4bc6e0425e38028b550b60adc2) Thanks [@paales](https://github.com/paales)! - Upgrade packages

- Updated dependencies []:
  - @graphcommerce/framer-scroller@2.1.7

## 4.6.1

### Patch Changes

- [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542) Thanks [@paales](https://github.com/paales)! - Now using [@graphql-yoga](https://github.com/dotansimha/graphql-yoga) for GraphQL which has full support for [envelop](https://www.envelop.dev/) plugins.

* [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542) Thanks [@paales](https://github.com/paales)! - Added a new @graphcommerce/cli package to generate the mesh so it can be generated _inside_ the @graphcommerce/graphql-mesh package to allow for better future extensibility.

- [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`da0ae7d02`](https://github.com/graphcommerce-org/graphcommerce/commit/da0ae7d0236e4908ba0bf0fa16656be516e841d4) Thanks [@paales](https://github.com/paales)! - Updated dependencies

- Updated dependencies [[`da0ae7d02`](https://github.com/graphcommerce-org/graphcommerce/commit/da0ae7d0236e4908ba0bf0fa16656be516e841d4)]:
  - @graphcommerce/framer-next-pages@3.1.6
  - @graphcommerce/framer-scroller@2.1.6
  - @graphcommerce/framer-utils@3.1.2
  - @graphcommerce/image@3.1.5

## 4.6.0

### Minor Changes

- [#1386](https://github.com/graphcommerce-org/graphcommerce/pull/1386) [`3c801f45c`](https://github.com/graphcommerce-org/graphcommerce/commit/3c801f45c7df55131acf30ae2fe0d2344830d480) Thanks [@FrankHarland](https://github.com/FrankHarland)! - feat: add disabled support to LinkOrButton component

### Patch Changes

- [#1388](https://github.com/graphcommerce-org/graphcommerce/pull/1388) [`3192fab82`](https://github.com/graphcommerce-org/graphcommerce/commit/3192fab82560e2211dfcacadc3b0b305260527d8) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - ConfigurableOptions size=small didn't render correctly when label were to large. The buttons will now just wrap instead of trying to be on a grid when the size=small.

* [#1385](https://github.com/graphcommerce-org/graphcommerce/pull/1385) [`8a354d1cd`](https://github.com/graphcommerce-org/graphcommerce/commit/8a354d1cd4757497ddfc9b1969a0addbc8ff616b) Thanks [@NickdeK](https://github.com/NickdeK)! - Prevent sx prop from being passed to form element

* Updated dependencies [[`0e425e85e`](https://github.com/graphcommerce-org/graphcommerce/commit/0e425e85ee8fed280349317ee0440c7bceea5823)]:
  - @graphcommerce/image@3.1.4
  - @graphcommerce/framer-scroller@2.1.5

## 4.5.1

### Patch Changes

- [#1378](https://github.com/graphcommerce-org/graphcommerce/pull/1378) [`b610a6e40`](https://github.com/graphcommerce-org/graphcommerce/commit/b610a6e4049e8c9e8b5d2aeff31b8e1bfc24abe5) Thanks [@paales](https://github.com/paales)! - Pin all versions internally so we can’t end up in an unfixable state for the user

- Updated dependencies [[`b610a6e40`](https://github.com/graphcommerce-org/graphcommerce/commit/b610a6e4049e8c9e8b5d2aeff31b8e1bfc24abe5)]:
  - @graphcommerce/framer-next-pages@3.1.5
  - @graphcommerce/framer-scroller@2.1.4
  - @graphcommerce/image@3.1.3

## 4.5.0

### Minor Changes

- [#1368](https://github.com/graphcommerce-org/graphcommerce/pull/1368) [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a) Thanks [@paales](https://github.com/paales)! - Added a new <ErrorSnackbar /> component to more easily create an error snackbar.

### Patch Changes

- [#1368](https://github.com/graphcommerce-org/graphcommerce/pull/1368) [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a) Thanks [@paales](https://github.com/paales)! - <FormDiv contained/> would throw an error that contained isn't a recognized prop

* [#1369](https://github.com/graphcommerce-org/graphcommerce/pull/1369) [`ae6449502`](https://github.com/graphcommerce-org/graphcommerce/commit/ae64495024a455bbe5188588604368c1542840c9) Thanks [@paales](https://github.com/paales)! - Upgraded dependencies

* Updated dependencies [[`ae6449502`](https://github.com/graphcommerce-org/graphcommerce/commit/ae64495024a455bbe5188588604368c1542840c9)]:
  - @graphcommerce/framer-next-pages@3.1.4
  - @graphcommerce/framer-scroller@2.1.3
  - @graphcommerce/framer-utils@3.1.1
  - @graphcommerce/image@3.1.2

## 4.4.0

### Minor Changes

- [#1363](https://github.com/graphcommerce-org/graphcommerce/pull/1363) [`f67da3cfb`](https://github.com/graphcommerce-org/graphcommerce/commit/f67da3cfbe2dcf5ea23519d088c5aa0074029182) Thanks [@paales](https://github.com/paales)! - Export useIconSvgSize from IconSvg so that other components can use it's size

### Patch Changes

- [#1360](https://github.com/graphcommerce-org/graphcommerce/pull/1360) [`49a2d6617`](https://github.com/graphcommerce-org/graphcommerce/commit/49a2d661712e1787fba46c6195f7b559189e23d9) Thanks [@paales](https://github.com/paales)! - Make sure Cart and menu isn’t hidden on landscape

* [#1363](https://github.com/graphcommerce-org/graphcommerce/pull/1363) [`218766869`](https://github.com/graphcommerce-org/graphcommerce/commit/218766869f7468c067a590857c942f3819f8add4) Thanks [@paales](https://github.com/paales)! - Use a Fab for the LayoutHeaderClose so it isn't as obtrusive on desktop

- [#1353](https://github.com/graphcommerce-org/graphcommerce/pull/1353) [`0e5ee7ba8`](https://github.com/graphcommerce-org/graphcommerce/commit/0e5ee7ba89698e5e711001e846ed182528060cba) Thanks [@paales](https://github.com/paales)! - Eslint: enable rules that were previously disabled and make fixes

* [#1360](https://github.com/graphcommerce-org/graphcommerce/pull/1360) [`829b8690b`](https://github.com/graphcommerce-org/graphcommerce/commit/829b8690bc5d0a46e596299e4120e9837a9f179c) Thanks [@paales](https://github.com/paales)! - Lots of fixes for LayoutOverlay:

  - When interacting with an overlay it causes browser resizes on mobile and causing a janky experience.
  - Allow interaction with the previous layer after it has been closed, instead of waiting for the actual route to complete.
  - Allow scrolling to the the bottom in the overlay when the height is just a bit higher than the window.
  - Allow sheet positioning for bottom for the overlay: mdSpacingTop, smSpacingTop.
  - Add scrollSnapStop:always to the actual overlay pane, so that when scrolling up it will not just close the overlay. Requiring a second swipe to close the overlay.
  - Remove spacing on the bottom of the overlay that was introduced for Android, not nessesary anymore because of the clientSizeCssVar.y

* Updated dependencies [[`829b8690b`](https://github.com/graphcommerce-org/graphcommerce/commit/829b8690bc5d0a46e596299e4120e9837a9f179c), [`c9f7ac026`](https://github.com/graphcommerce-org/graphcommerce/commit/c9f7ac026b49047eca05be208b515f364e21571c), [`829b8690b`](https://github.com/graphcommerce-org/graphcommerce/commit/829b8690bc5d0a46e596299e4120e9837a9f179c), [`0e5ee7ba8`](https://github.com/graphcommerce-org/graphcommerce/commit/0e5ee7ba89698e5e711001e846ed182528060cba), [`829b8690b`](https://github.com/graphcommerce-org/graphcommerce/commit/829b8690bc5d0a46e596299e4120e9837a9f179c)]:
  - @graphcommerce/framer-scroller@2.1.2
  - @graphcommerce/framer-next-pages@3.1.3
  - @graphcommerce/framer-utils@3.1.0

## 4.3.2

### Patch Changes

- [#1343](https://github.com/graphcommerce-org/graphcommerce/pull/1343) [`b76d0892a`](https://github.com/graphcommerce-org/graphcommerce/commit/b76d0892a11bd916aefd46ba72c2da00e38ce45b) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Canonicals could contain a double slash in the URL

## 4.3.1

### Patch Changes

- [#1326](https://github.com/graphcommerce-org/graphcommerce/pull/1326) [`df0b3e7d5`](https://github.com/graphcommerce-org/graphcommerce/commit/df0b3e7d5f5fee963731a999cb3a8891580cb6fe) Thanks [@paales](https://github.com/paales)! - Latest version of GraphQL Mesh is broken, reverting to older version

## 4.3.0

### Minor Changes

- [#1322](https://github.com/graphcommerce-org/graphcommerce/pull/1322) [`0298a0de1`](https://github.com/graphcommerce-org/graphcommerce/commit/0298a0de1d13e543c4124a6a099297b4e27e2b05) Thanks [@paales](https://github.com/paales)! - Added `<Slider size='large' />` and made styling with variants

* [#1322](https://github.com/graphcommerce-org/graphcommerce/pull/1322) [`3326742a0`](https://github.com/graphcommerce-org/graphcommerce/commit/3326742a0dceb45f0cac4741ca09dc4d4f09ad90) Thanks [@paales](https://github.com/paales)! - Added ‘scrolled’ state to MenuFab to allow for extra styling: `'&.scrolled': {}`

- [#1322](https://github.com/graphcommerce-org/graphcommerce/pull/1322) [`7a3799bfc`](https://github.com/graphcommerce-org/graphcommerce/commit/7a3799bfc107f26aa9991a91db5f228e3476f4aa) Thanks [@paales](https://github.com/paales)! - Make CartFab and MenuFab’s color, size and variant passable by props

### Patch Changes

- [#1322](https://github.com/graphcommerce-org/graphcommerce/pull/1322) [`5266388ea`](https://github.com/graphcommerce-org/graphcommerce/commit/5266388eaffda41592623ef7a3ddbbe03c8e0dad) Thanks [@paales](https://github.com/paales)! - make sure there is no background on darkmode above the image in ImageText

* [#1322](https://github.com/graphcommerce-org/graphcommerce/pull/1322) [`9b35403d9`](https://github.com/graphcommerce-org/graphcommerce/commit/9b35403d9dbb2606ac7cf3bb641a0f9cc3d8a2ba) Thanks [@paales](https://github.com/paales)! - MenuFab darkmode doesn’t need elevationcolor

- [#1322](https://github.com/graphcommerce-org/graphcommerce/pull/1322) [`815132ea4`](https://github.com/graphcommerce-org/graphcommerce/commit/815132ea43937b4b84b59ec9974ac593cb4eb456) Thanks [@paales](https://github.com/paales)! - Make sure canonicals don’t report about double slashes and add warning when incorrect URL is passed

* [#1322](https://github.com/graphcommerce-org/graphcommerce/pull/1322) [`9a77f88ed`](https://github.com/graphcommerce-org/graphcommerce/commit/9a77f88ed26cbecdae9a135c3cb234a5b7ecf4df) Thanks [@paales](https://github.com/paales)! - Reduce footer spacing

- [#1322](https://github.com/graphcommerce-org/graphcommerce/pull/1322) [`0eeaad304`](https://github.com/graphcommerce-org/graphcommerce/commit/0eeaad30461b1d5b486438f0287fa76d49429044) Thanks [@paales](https://github.com/paales)! - LayoutHeaderBack should be a round button on mobile

* [#1322](https://github.com/graphcommerce-org/graphcommerce/pull/1322) [`bc5213547`](https://github.com/graphcommerce-org/graphcommerce/commit/bc52135471479c83d989449dad24798112e898f4) Thanks [@paales](https://github.com/paales)! - make sure LinkOrButton sx props do not break styling

- [#1322](https://github.com/graphcommerce-org/graphcommerce/pull/1322) [`3f1912f55`](https://github.com/graphcommerce-org/graphcommerce/commit/3f1912f553318d5888f8af2b841918ef4ae96a84) Thanks [@paales](https://github.com/paales)! - Button in MessageSnackbarImpl wasn't full width

* [#1322](https://github.com/graphcommerce-org/graphcommerce/pull/1322) [`b6c68cda8`](https://github.com/graphcommerce-org/graphcommerce/commit/b6c68cda8836a1d0c78ef351899cec9ec1037385) Thanks [@paales](https://github.com/paales)! - LayoutOverlay had a very large spacing below the content

* Updated dependencies [[`1e2a07141`](https://github.com/graphcommerce-org/graphcommerce/commit/1e2a071414154600430e6dcf0513d86ab78e0b28), [`d91359871`](https://github.com/graphcommerce-org/graphcommerce/commit/d91359871b023a9f0d305b37353c1ee2d0912248), [`bec88d0d7`](https://github.com/graphcommerce-org/graphcommerce/commit/bec88d0d70b679e15150917df89986ecee5b39a6)]:
  - @graphcommerce/framer-scroller@2.1.0
  - @graphcommerce/framer-utils@3.0.5

## 4.2.5

### Patch Changes

- [#1312](https://github.com/ho-nl/m2-pwa/pull/1312) [`4e1fd4d9f`](https://github.com/ho-nl/m2-pwa/commit/4e1fd4d9fda2109de378be7e39382f7014a7ab54) Thanks [@paales](https://github.com/paales)! - upgraded dependencies

## 4.2.4

### Patch Changes

- [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`3d63b39f7`](https://github.com/ho-nl/m2-pwa/commit/3d63b39f7e330d1827a32dba782667d7b21adaba) Thanks [@paales](https://github.com/paales)! - Possible typescript performance improvement based on [community suggestion](https://gist.github.com/casamia918/dafd630a1cdd81935a4587297acaae00)

* [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655) Thanks [@paales](https://github.com/paales)! - All default exports are now named exports internally and all `index.tsx` are renamed to the component name.

- [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

- Updated dependencies [[`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655), [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef)]:
  - @graphcommerce/framer-next-pages@3.1.2
  - @graphcommerce/framer-scroller@2.0.6
  - @graphcommerce/framer-utils@3.0.4
  - @graphcommerce/image@3.1.1

## 4.2.3

### Patch Changes

- [#1299](https://github.com/ho-nl/m2-pwa/pull/1299) [`e37caf437`](https://github.com/ho-nl/m2-pwa/commit/e37caf4376b304ab733d41f2b4fa8be2c35fd807) Thanks [@paales](https://github.com/paales)! - Make sure Buttons and Fabs can have custom variants

## 4.2.2

### Patch Changes

- [#1296](https://github.com/ho-nl/m2-pwa/pull/1296) [`a9cff2ce6`](https://github.com/ho-nl/m2-pwa/commit/a9cff2ce63fce5b86e9fd6bf63c10c782326d50e) Thanks [@paales](https://github.com/paales)! - Make sure the page is max height when no menuFab or cartFab is present

* [#1296](https://github.com/ho-nl/m2-pwa/pull/1296) [`8473123fa`](https://github.com/ho-nl/m2-pwa/commit/8473123fa7d3f3eb1d282d9b4205c803a88010ea) Thanks [@paales](https://github.com/paales)! - implement handling for canonical URLs based on NEXT_PUBLIC_SITE_URL

- [#1296](https://github.com/ho-nl/m2-pwa/pull/1296) [`50e205c51`](https://github.com/ho-nl/m2-pwa/commit/50e205c51f4d0d67d41d22fd70e8ed9a0996489e) Thanks [@paales](https://github.com/paales)! - make sure the scroll performance of galleries in safari is better

## 4.2.1

### Patch Changes

- [#1294](https://github.com/ho-nl/m2-pwa/pull/1294) [`19f33e0aa`](https://github.com/ho-nl/m2-pwa/commit/19f33e0aaf4e3121edd444926d08b6459d3ef400) Thanks [@paales](https://github.com/paales)! - Make sure the minHeight of overlays always have the correct height, even if the content changes size

* [#1294](https://github.com/ho-nl/m2-pwa/pull/1294) [`aea787542`](https://github.com/ho-nl/m2-pwa/commit/aea787542484a0480a48031fcc4a9a5566c6bfc7) Thanks [@paales](https://github.com/paales)! - Make sure the labels of LayoutHeaderBack/Close aren’t rendered on mobile

* Updated dependencies [[`4e28c8afd`](https://github.com/ho-nl/m2-pwa/commit/4e28c8afd9cead3577dd0eff97b5c44ba4c1c862), [`afb993244`](https://github.com/ho-nl/m2-pwa/commit/afb993244aabc8135ce54a79743cbf63bc5677d3)]:
  - @graphcommerce/framer-scroller@2.0.5
  - @graphcommerce/framer-next-pages@3.1.1

## 4.2.0

### Minor Changes

- [#1292](https://github.com/ho-nl/m2-pwa/pull/1292) [`63f9b56eb`](https://github.com/ho-nl/m2-pwa/commit/63f9b56eb68ba790567ff1427e599fd2c3c8f1ee) Thanks [@paales](https://github.com/paales)! - added responsive size to the Fab component

### Patch Changes

- [#1292](https://github.com/ho-nl/m2-pwa/pull/1292) [`5a1ba9e66`](https://github.com/ho-nl/m2-pwa/commit/5a1ba9e664abbac89c4f5f71f7d6d6ed1aefa5c0) Thanks [@paales](https://github.com/paales)! - Renamed SvgIcon to IconSvg to prevent collisions with MUI

* [#1292](https://github.com/ho-nl/m2-pwa/pull/1292) [`990df655b`](https://github.com/ho-nl/m2-pwa/commit/990df655b73b469718d6cb5837ee65dfe2ad6a1d) Thanks [@paales](https://github.com/paales)! - `<SearchLink />` a more lightweight (less js) alternative for `<SearchButton />`

## 4.1.5

### Patch Changes

- [#1290](https://github.com/ho-nl/m2-pwa/pull/1290) [`47ae012c1`](https://github.com/ho-nl/m2-pwa/commit/47ae012c10f5762f99019ec38409177632377a98) Thanks [@paales](https://github.com/paales)! - `withTheme` didn’t apply styles correcty

* [#1290](https://github.com/ho-nl/m2-pwa/pull/1290) [`39e28a4cd`](https://github.com/ho-nl/m2-pwa/commit/39e28a4cd6cdfaa4fc6dc4500ae86c14f7069150) Thanks [@paales](https://github.com/paales)! - Allow background color on header

- [#1289](https://github.com/ho-nl/m2-pwa/pull/1289) [`ec8026cc5`](https://github.com/ho-nl/m2-pwa/commit/ec8026cc5a5be8d97a6e5dbf208808154fa1d618) Thanks [@LaurensFranken](https://github.com/LaurensFranken)! - add sx prop to UspsList component

* [#1290](https://github.com/ho-nl/m2-pwa/pull/1290) [`35672d8e8`](https://github.com/ho-nl/m2-pwa/commit/35672d8e87011bf4eb049f449e86e851fc91a525) Thanks [@paales](https://github.com/paales)! - Footer didn't accept sx prop

## 4.1.4

### Patch Changes

- [#1287](https://github.com/ho-nl/m2-pwa/pull/1287) [`d17f97d3a`](https://github.com/ho-nl/m2-pwa/commit/d17f97d3a786c33a99a10e4e949251c52fdbbdac) Thanks [@paales](https://github.com/paales)! - Allow passing sx prop to SidebarGallery and ContentLinks

## 4.1.3

### Patch Changes

- [#1285](https://github.com/ho-nl/m2-pwa/pull/1285) [`c85294ba6`](https://github.com/ho-nl/m2-pwa/commit/c85294ba6d742ce78c074559a1e95409b25a5017) Thanks [@paales](https://github.com/paales)! - upgraded dependencies

- Updated dependencies [[`16d77b280`](https://github.com/ho-nl/m2-pwa/commit/16d77b2806e49e376d06bc0d578d38eb724b0c17)]:
  - @graphcommerce/framer-scroller@2.0.4

## 4.1.2

### Patch Changes

- [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96) Thanks [@paales](https://github.com/paales)! - made packages public

* [#1278](https://github.com/ho-nl/m2-pwa/pull/1278) [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Upgraded dependencies to the latest version

- [#1281](https://github.com/ho-nl/m2-pwa/pull/1281) [`3a719c88c`](https://github.com/ho-nl/m2-pwa/commit/3a719c88cad1eab58602de28c41adc0fc4827e1d) Thanks [@paales](https://github.com/paales)! - Make sure we're able to style the backdrop and the regular overlay for LayoutOverlay

* [#1284](https://github.com/ho-nl/m2-pwa/pull/1284) [`5ffcb56bf`](https://github.com/ho-nl/m2-pwa/commit/5ffcb56bfcbe49ebeaf24f9341e819a145ab9a14) Thanks [@paales](https://github.com/paales)! - SvgIcon is now more extenable and flexible:

  - It will automatically calculate the stroke-width of the SVG based on the rendered size, allowing for a more flexible use for icons.

  - Make SvgIcon themable in your own Theme.

  - Create overrides for components that will be used throughout the app.

* Updated dependencies [[`4bb963d75`](https://github.com/ho-nl/m2-pwa/commit/4bb963d7595b5ce6e3a4924cc2e3e8b0210cdcd6), [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96), [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20), [`5ffcb56bf`](https://github.com/ho-nl/m2-pwa/commit/5ffcb56bfcbe49ebeaf24f9341e819a145ab9a14)]:
  - @graphcommerce/framer-next-pages@3.1.0
  - @graphcommerce/framer-scroller@2.0.3
  - @graphcommerce/framer-utils@3.0.3
  - @graphcommerce/image@3.1.0

## 4.1.1

### Patch Changes

- [#1274](https://github.com/ho-nl/m2-pwa/pull/1274) [`381e4c86a`](https://github.com/ho-nl/m2-pwa/commit/381e4c86a8321ce96e1fa5c7d3c0a0c0ff3e02c7) Thanks [@paales](https://github.com/paales)! - Moved `ApolloErrorAlert`, `ApolloErrorFullPage` and `ApolloErrorSnackbar` to the ecommerce-ui package.

  Created `ComposedSubmitButton` and `ComposedSubmitLinkOrButton` to reduce complexity from `magento-graphcms` example.

  Removed dependency an `@graphcommerce/react-hook-form` from `magento-graphcms` example.

  Added dependency `@graphcommerce/ecommerce-ui` from `magento-graphcms` example.

* [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2) Thanks [@paales](https://github.com/paales)! - We've moved lots of internal packages from `dependencies` to `peerDependencies`. The result of this is that there will be significantly less duplicate packages in the node_modules folders.

- [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`e7c8e2756`](https://github.com/ho-nl/m2-pwa/commit/e7c8e2756d637cbcd2e793d62ef5721d35d9fa7b) Thanks [@paales](https://github.com/paales)! - CartFab positioning was incorrect

* [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d) Thanks [@paales](https://github.com/paales)! - Upgraded to [NextJS 12.1](https://nextjs.org/blog/next-12-1)! This is just for compatibility, but we'll be implementing [On-demand Incremental Static Regeneration](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta) soon.

  This will greatly reduce the requirement to rebuid stuff and we'll add a management UI on the frontend to be able to revalidate pages manually.

* Updated dependencies [[`381e4c86a`](https://github.com/ho-nl/m2-pwa/commit/381e4c86a8321ce96e1fa5c7d3c0a0c0ff3e02c7), [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2), [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d)]:
  - @graphcommerce/framer-next-pages@3.0.2
  - @graphcommerce/framer-scroller@2.0.2
  - @graphcommerce/framer-utils@3.0.2
  - @graphcommerce/image@3.0.2

## 4.1.0

### Minor Changes

- [#1273](https://github.com/ho-nl/m2-pwa/pull/1273) [`8c4e4f7cd`](https://github.com/ho-nl/m2-pwa/commit/8c4e4f7cdd2fa4252788fbc9889d0803bba20eef) Thanks [@paales](https://github.com/paales)! - Added darkmode support! ☀️🌑, adds a toggle to the hamburger menu.

### Patch Changes

- [#1271](https://github.com/ho-nl/m2-pwa/pull/1271) [`e0008d60d`](https://github.com/ho-nl/m2-pwa/commit/e0008d60d712603219129dd411d1985bf1ebbed1) Thanks [@paales](https://github.com/paales)! - make sure the CartFab and MenuFab are stylable with sx

* [#1271](https://github.com/ho-nl/m2-pwa/pull/1271) [`5d9f8320f`](https://github.com/ho-nl/m2-pwa/commit/5d9f8320ff9621d7357fbe01319ab0cafdf9095d) Thanks [@paales](https://github.com/paales)! - prevent layout from breaking when url has params

- [#1271](https://github.com/ho-nl/m2-pwa/pull/1271) [`5082b8c81`](https://github.com/ho-nl/m2-pwa/commit/5082b8c8191cc3e0b4627678bf837af093513d57) Thanks [@paales](https://github.com/paales)! - Prevent showing back button on homepage when query parameter is present

## 4.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514) Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files, so that the packages link to back to the website and repository
- Updated dependencies [[`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514)]:
  - @graphcommerce/framer-next-pages@3.0.1
  - @graphcommerce/framer-scroller@2.0.1
  - @graphcommerce/framer-utils@3.0.1
  - @graphcommerce/graphql@3.0.1
  - @graphcommerce/image@3.0.1

## 4.0.0

### Major Changes

- [#1258](https://github.com/ho-nl/m2-pwa/pull/1258) [`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05) Thanks [@paales](https://github.com/paales)! - Upgraded to Material UI 5

### Patch Changes

- Updated dependencies [[`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05)]:
  - @graphcommerce/framer-next-pages@3.0.0
  - @graphcommerce/framer-scroller@2.0.0
  - @graphcommerce/framer-utils@3.0.0
  - @graphcommerce/graphql@3.0.0
  - @graphcommerce/image@3.0.0

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.25.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.25.2...@graphcommerce/next-ui@3.25.3) (2022-02-11)

### Bug Fixes

- Removal of default style where H2 and H3 get converted to H4, style wise. ([68772ec](https://github.com/ho-nl/m2-pwa/commit/68772eccbb3d8c1f1ecd59cf0e47f3435a9f1d55))

## [3.25.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.25.1...@graphcommerce/next-ui@3.25.2) (2022-02-09)

### Bug Fixes

- change breakpoints down in footer component ([9ec181c](https://github.com/ho-nl/m2-pwa/commit/9ec181cc44f6b73450645b3b8a3ab57fd1a68d2e))

## [3.25.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.25.0...@graphcommerce/next-ui@3.25.1) (2022-02-01)

### Bug Fixes

- make DesktopNavActions stylable ([db31369](https://github.com/ho-nl/m2-pwa/commit/db3136931d2ace1bfb6e7fecad0e01758aa2b397))

# [3.25.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.24.3...@graphcommerce/next-ui@3.25.0) (2022-01-25)

### Features

- add beforeHeader prop ([00501ef](https://github.com/ho-nl/m2-pwa/commit/00501efab97fae2469f783751702db95e4e2c93e))
- remove fixed fap and position cart with parent sticky ([bfd8adf](https://github.com/ho-nl/m2-pwa/commit/bfd8adf1372f77e6b27f6e0482ec03762d9148e4))

## [3.24.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.24.2...@graphcommerce/next-ui@3.24.3) (2022-01-21)

### Bug Fixes

- prevent layout from breaking when url has params ([9197bf7](https://github.com/ho-nl/m2-pwa/commit/9197bf72c5c3e422d70741cadbc40b19a1ae4936))

## [3.24.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.24.1...@graphcommerce/next-ui@3.24.2) (2022-01-21)

### Bug Fixes

- favicon.svg path ([fefe20b](https://github.com/ho-nl/m2-pwa/commit/fefe20bd1d8392b9d39632c6335395dd4931af2f))

## [3.24.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.24.0...@graphcommerce/next-ui@3.24.1) (2022-01-18)

### Bug Fixes

- favicon and manifest ([304d6dd](https://github.com/ho-nl/m2-pwa/commit/304d6dd7769d349b02b06dfdfdc3f9d22a4af081))

# [3.24.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.23.1...@graphcommerce/next-ui@3.24.0) (2022-01-17)

### Features

- manifest and favicon ([a82202c](https://github.com/ho-nl/m2-pwa/commit/a82202c0e572f005cbcfca815936af9356eb2767))

## [3.23.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.23.0...@graphcommerce/next-ui@3.23.1) (2022-01-04)

### Bug Fixes

- close button on mobile ([a0c6c07](https://github.com/ho-nl/m2-pwa/commit/a0c6c075a1ee2541c864a561cd5318ed5fb5760c))

# [3.23.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.22.2...@graphcommerce/next-ui@3.23.0) (2022-01-04)

### Bug Fixes

- backbutton wasn't translated ([5f841c0](https://github.com/ho-nl/m2-pwa/commit/5f841c052b454c0d565a68829f78492c5a3b6dab))

### Features

- introduced a withTheme hoc to allow theming per route ([55e3fc1](https://github.com/ho-nl/m2-pwa/commit/55e3fc178b385d0ccdc19a5c09a7887be5db14dc))

## [3.22.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.22.1...@graphcommerce/next-ui@3.22.2) (2022-01-04)

### Bug Fixes

- broder radius of drawer was too small on desktop ([f8b3962](https://github.com/ho-nl/m2-pwa/commit/f8b3962825972e6bc232387e0a2e801289fcc492))
- close button of bottom sheet spacing ([be33c20](https://github.com/ho-nl/m2-pwa/commit/be33c20fc8f41ad85d90bff15842738bc370b81e))
- regression where primary action wasn't visible ([66f8ed2](https://github.com/ho-nl/m2-pwa/commit/66f8ed20ea0728881be81994d49bd6c399f2e914))

## [3.22.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.22.0...@graphcommerce/next-ui@3.22.1) (2022-01-04)

### Bug Fixes

- overlay would have a height instead of minHeight ([07dba4b](https://github.com/ho-nl/m2-pwa/commit/07dba4b875a37beac2ab6a8afe50e6b7a7ba1bf9))

# [3.22.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.21.15...@graphcommerce/next-ui@3.22.0) (2022-01-03)

### Bug Fixes

- backbutton had wrong label ([c6d0b27](https://github.com/ho-nl/m2-pwa/commit/c6d0b2738e5de734af40bc632177dcc867e8e556))
- make sure we're able to close the overlay ([8d19fde](https://github.com/ho-nl/m2-pwa/commit/8d19fde07d51493acfdfaa97a19f61246d04d42a))

### Features

- add support for minimal overlay size ([96e508a](https://github.com/ho-nl/m2-pwa/commit/96e508a94e23fe5b3ec523cddeb19b7b70f50034))
- added support for more positioning options for the overlay ([79eae9e](https://github.com/ho-nl/m2-pwa/commit/79eae9eb39513f5611103c4c745c3db99b11f15a))
- **framer-next-pages:** reduce rerenders when navigating to a new page ([5cf3301](https://github.com/ho-nl/m2-pwa/commit/5cf330130bb3527057da015e3c4a6fa295d7262e))

## [3.21.15](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.21.14...@graphcommerce/next-ui@3.21.15) (2021-12-24)

### Bug Fixes

- make sure the filters are aligned properly on mobile ([4bfe978](https://github.com/ho-nl/m2-pwa/commit/4bfe978f095c1b9867608c138eccf3227b18d4e9))

## [3.21.13](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.21.12...@graphcommerce/next-ui@3.21.13) (2021-12-23)

### Bug Fixes

- **framer-next-pages:** make sure we dont have a double scroll while a bottomsheet is opened ([2887aba](https://github.com/ho-nl/m2-pwa/commit/2887abae0c0c553bdc6343fd2f431e4daeabefb5))

## [3.21.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.21.10...@graphcommerce/next-ui@3.21.11) (2021-12-22)

### Bug Fixes

- cart fab wouldnt properly switch to darkmode ([2f4fe1e](https://github.com/ho-nl/m2-pwa/commit/2f4fe1ed28ab3b63440f40d1455f06bc02e44ce7))

## [3.21.10](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.21.9...@graphcommerce/next-ui@3.21.10) (2021-12-22)

### Bug Fixes

- **framer-scroller:** gallery didn't align images in the center ([0cf6066](https://github.com/ho-nl/m2-pwa/commit/0cf60669b2547d2c421eb07c1ba23d7718df74aa))
- safari hero banner didn't animate border radius ([7301bec](https://github.com/ho-nl/m2-pwa/commit/7301becf33a60f977546be1bcabc68e018f6c5cd))

## [3.21.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.21.8...@graphcommerce/next-ui@3.21.9) (2021-12-21)

### Bug Fixes

- layout overlay sometimes have a horizontal scrollbar ([a1cfe72](https://github.com/ho-nl/m2-pwa/commit/a1cfe72d207dcdf07948080b605b64e7f73939bf))
- make sure the bottomsheet has enough space on android ([02d3e63](https://github.com/ho-nl/m2-pwa/commit/02d3e639388446423149461ae52d0ed12a962f5e))

## [3.21.8](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.21.7...@graphcommerce/next-ui@3.21.8) (2021-12-21)

### Bug Fixes

- logo invert darkmode and consistent logo spacing ([2a80603](https://github.com/ho-nl/m2-pwa/commit/2a80603fd3255544f78d9da28aad17fb3fca0c9c))
- menuFab, cartFab shadows, darkTheme color and opacity bug ([6c7afa7](https://github.com/ho-nl/m2-pwa/commit/6c7afa7d3b584b455476aa26d95041c4cf6c1d0c))

## [3.21.5](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.21.4...@graphcommerce/next-ui@3.21.5) (2021-12-20)

### Bug Fixes

- animations would run on background page, make sure animations are not running when page is not active ([2fcf4b8](https://github.com/ho-nl/m2-pwa/commit/2fcf4b8a853108147477e3a67c7ea202abb2842f))

## [3.21.4](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.21.3...@graphcommerce/next-ui@3.21.4) (2021-12-20)

### Bug Fixes

- **framer-scroller:** remove jank from scroller when opening ([c618bf2](https://github.com/ho-nl/m2-pwa/commit/c618bf290bd580fe5eb45663c44843dd751e00ed))

## [3.21.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.21.0...@graphcommerce/next-ui@3.21.1) (2021-12-17)

### Bug Fixes

- darkMode fixes ([7d33d45](https://github.com/ho-nl/m2-pwa/commit/7d33d452ec801632565839b2fdfef0bc4959c14a))

# [3.21.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.20.9...@graphcommerce/next-ui@3.21.0) (2021-12-17)

### Bug Fixes

- Form contained should be less spacious ([7d9557e](https://github.com/ho-nl/m2-pwa/commit/7d9557e9a75622a3dc40a3c7aab86da152d2e399))
- make sure the snackbar message is formatted correctly ([b9e1e26](https://github.com/ho-nl/m2-pwa/commit/b9e1e2623ec2aff6b623603aa38fe8d71ff59e1c))

### Features

- added ApolloErrorSnackbar ([96bc92e](https://github.com/ho-nl/m2-pwa/commit/96bc92e24bac735b28f5f32e1154f715ddf8cd6c))

## [3.20.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.20.8...@graphcommerce/next-ui@3.20.9) (2021-12-16)

### Bug Fixes

- simplify ButtonLinkList and made more flexible ([e01cc82](https://github.com/ho-nl/m2-pwa/commit/e01cc825b87abf81d1cb8f9dc976f674b9e8e6d3))

## [3.20.8](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.20.7...@graphcommerce/next-ui@3.20.8) (2021-12-15)

### Bug Fixes

- could not scroll to the bottom of a left/right sheet ([b84c86e](https://github.com/ho-nl/m2-pwa/commit/b84c86efa090657fc4cd480547f576bf6d9e0709))
- scroller should not snap to off-axis while dragging and direction isn't set to both ([9118bfc](https://github.com/ho-nl/m2-pwa/commit/9118bfcb1eb9ade5f144167e47e0c26724ce832f))

## [3.20.7](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.20.6...@graphcommerce/next-ui@3.20.7) (2021-12-13)

### Bug Fixes

- header style color ([ea373be](https://github.com/ho-nl/m2-pwa/commit/ea373be9dbf609e0a719b000d27ad79d2be45f65))
- make sure we're allowed to scroll all the way down ([16ee45d](https://github.com/ho-nl/m2-pwa/commit/16ee45d8bea8072388dc1508e48704be5a84c4ec))
- overlay didn't handle portals correctly and closed the overlay ([3cef4e7](https://github.com/ho-nl/m2-pwa/commit/3cef4e73042fd836fc776dad17abcc39d7403eee))

## [3.20.5](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.20.4...@graphcommerce/next-ui@3.20.5) (2021-12-06)

### Bug Fixes

- Accessibility, SEO ([a258837](https://github.com/ho-nl/m2-pwa/commit/a258837476d94d20d33e13a4c4f950fff57f7dca))

## [3.20.4](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.20.3...@graphcommerce/next-ui@3.20.4) (2021-12-06)

### Bug Fixes

- use Locale to set storeSwitcher icons ([65ea397](https://github.com/ho-nl/m2-pwa/commit/65ea397ec53aa27f545b43feda8e35227e119ebe))

## [3.20.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.20.1...@graphcommerce/next-ui@3.20.2) (2021-12-03)

### Bug Fixes

- aria-labels missing ([16570d1](https://github.com/ho-nl/m2-pwa/commit/16570d11efcb264eba6c620c5508c9616c2d0a2a))
- make sure the overlay can be clicked away ([5b43e2f](https://github.com/ho-nl/m2-pwa/commit/5b43e2f0568c2587be63b74271409123fc0a44e2))

## [3.20.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.20.0...@graphcommerce/next-ui@3.20.1) (2021-12-03)

### Bug Fixes

- overlay didn't initialize ([f3b4ad9](https://github.com/ho-nl/m2-pwa/commit/f3b4ad9d96656b965865008f315ffcbdd24842de))
- search page ([85cf721](https://github.com/ho-nl/m2-pwa/commit/85cf72130bce4c3d2c392a3745adf05bca8618b1))
- sidebar gallery hideScrollbar ([da68544](https://github.com/ho-nl/m2-pwa/commit/da68544c7d99b23db8cb0b96c8ae96ede32abc62))
- use standard shadows in overlay ([5383aa2](https://github.com/ho-nl/m2-pwa/commit/5383aa2ae69363ebcff1ebec7c120137a83653d0))

# [3.20.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.19.1...@graphcommerce/next-ui@3.20.0) (2021-12-03)

### Bug Fixes

- classesPicker would sometimes return 'undefined' as a class ([baa51f1](https://github.com/ho-nl/m2-pwa/commit/baa51f1ac6d47460bfc713bd2c10ae14f1f6ecbf))
- close button should always be present ([32d4173](https://github.com/ho-nl/m2-pwa/commit/32d4173e44c6e77815cf483590c1f703d48a386b))
- horizontal scroll on page ([d025a16](https://github.com/ho-nl/m2-pwa/commit/d025a16a02b43756fc58b0b764faa404eb06da6c))
- make sure elements that use scroll positioning are using the right hook ([80ee33f](https://github.com/ho-nl/m2-pwa/commit/80ee33f68ecc223147d63fc37e5b9ba94df4564e))
- make sure galleries are scrollable properly ([8653316](https://github.com/ho-nl/m2-pwa/commit/86533167891f0ae197fdf096b84fdda8e89a0f6e))
- make sure it doesn't error when trying to override root ([99a69a3](https://github.com/ho-nl/m2-pwa/commit/99a69a36579b4c934f3b1be187130983bdf133bf))
- make sure that pill link buttons get the right background color etc. ([c142b31](https://github.com/ho-nl/m2-pwa/commit/c142b31552417d2296341785994e2f7b35462793))
- make sure the overlay becomes visible, even if the overlay is scrolled ([1738c98](https://github.com/ho-nl/m2-pwa/commit/1738c982ea84ec2b93daa824c4b8c86ab2a3f5ed))
- make the headerHeight properly configurable ([c39c942](https://github.com/ho-nl/m2-pwa/commit/c39c942a62a9bb9687ea553be28e37fb49a6b065))
- minHeight of page on iOS is sometimes less high than expected ([8a0bc23](https://github.com/ho-nl/m2-pwa/commit/8a0bc234d153d974ac415369483ddabfb5e7fb0c))
- missing CssBaseline ([d2a7126](https://github.com/ho-nl/m2-pwa/commit/d2a7126295b99b0446dc31b0cf7c60671a18f976))
- only apply page meta when the current page is active ([f099a51](https://github.com/ho-nl/m2-pwa/commit/f099a519d169dcc9e2653db8353ce93d7b0a138e))
- spacing of LayoutTItle ([7afcd31](https://github.com/ho-nl/m2-pwa/commit/7afcd3163d16e902cf2ff7917f56ee6a8798f55b))

### Features

- **framer-scroller-sheet:** created package replacing the framer-sheet package ([f9f2e91](https://github.com/ho-nl/m2-pwa/commit/f9f2e9101191f5cb5c4514ceb9534ddeb2476763))
- **framer-scroller:** split the grid functionality from the scroller ([81307ea](https://github.com/ho-nl/m2-pwa/commit/81307ea2652bf31a1f94e8db72af4ee161bdca2e))
- refactor page shell ([594bdb3](https://github.com/ho-nl/m2-pwa/commit/594bdb32927b797208b2a295bc0db9f9ceb94676))

# [3.19.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.18.2...@graphcommerce/next-ui@3.19.0) (2021-12-01)

### Bug Fixes

- borderRadius ([0999901](https://github.com/ho-nl/m2-pwa/commit/0999901f6a3265f40fef18e72702d80158d8c4a9))
- borderRadius ([b9cffcc](https://github.com/ho-nl/m2-pwa/commit/b9cffccf444cb2ff8d6257ef3a64c0ea18e30477))
- borderRadius toggleButton ([4a97800](https://github.com/ho-nl/m2-pwa/commit/4a97800150bbfe03692a66d7fbde5705a32b9cd7))
- build ([ba97378](https://github.com/ho-nl/m2-pwa/commit/ba97378d40d70b3f47c4c252600c669a53568c27))
- build ([b6cb704](https://github.com/ho-nl/m2-pwa/commit/b6cb7048c1208648687621000ab0d6789032d480))
- finetune svg stroke width ([d788d72](https://github.com/ho-nl/m2-pwa/commit/d788d72c88d5b924a14e9fdde1a52f62be7c274c))
- flicker on menu icon ([04d9633](https://github.com/ho-nl/m2-pwa/commit/04d96331cfdd4678a56a4eb9170141800c03a6a1))
- hero text spacing ([79dd6aa](https://github.com/ho-nl/m2-pwa/commit/79dd6aa2fe576104ebbbdd092f6b415d319dec48))
- icon OrderBefore ([25a2390](https://github.com/ho-nl/m2-pwa/commit/25a2390321c7047c5191a15a9352020b8161ff7a))
- icons ([c561e20](https://github.com/ho-nl/m2-pwa/commit/c561e20a247fef5ea33ac10dbecf55d1e5500dec))
- prevent scaling of video on mobile ([168b5b9](https://github.com/ho-nl/m2-pwa/commit/168b5b9451dbe373703ebc76c44516d1c0eb316f))
- Tap targets are not sized appropriately ([b3b3339](https://github.com/ho-nl/m2-pwa/commit/b3b33398c26cfe775f2e9fc4dacd8eaad2e02725))

### Features

- borderRadius based on theme.shape.borderRadius ([7c34937](https://github.com/ho-nl/m2-pwa/commit/7c349376cd41a131c628324c299106fdb7e60484))
- breakpointVal ([0294503](https://github.com/ho-nl/m2-pwa/commit/029450343051cf6995babad9f9b42c7e6ad1094e))
- closeable menu ([5f94bb5](https://github.com/ho-nl/m2-pwa/commit/5f94bb5644ce1058ec705a8acced71ba2ba95e04))
- icon for 404 ([ff32915](https://github.com/ho-nl/m2-pwa/commit/ff3291578719cb7105d1045d68a78952b27da7fe))
- introduce borderRadius ([183afbc](https://github.com/ho-nl/m2-pwa/commit/183afbc8ee269f6694c372b06afdf41302f86c09))
- responsiveTyp ([6108b61](https://github.com/ho-nl/m2-pwa/commit/6108b6148e76ddbbe2db1614f10aaf88423db5ca))

## [3.18.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.18.1...@graphcommerce/next-ui@3.18.2) (2021-11-27)

### Bug Fixes

- shadow snackbar with elevation ([8d7d011](https://github.com/ho-nl/m2-pwa/commit/8d7d0119357325f5c838def4ae8dc4ae19a43a6f))

## [3.18.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.18.0...@graphcommerce/next-ui@3.18.1) (2021-11-22)

### Bug Fixes

- green app shell header ([a0774e6](https://github.com/ho-nl/m2-pwa/commit/a0774e6da078ea1e96d7d93bccafae5b55a69792))

# [3.18.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.17.1...@graphcommerce/next-ui@3.18.0) (2021-11-22)

### Bug Fixes

- remove styles ([335c8cb](https://github.com/ho-nl/m2-pwa/commit/335c8cb663bdd4c1670cdb3ea88c8a9a42bcf745))
- revert to SvgImageSimple ([b247c6b](https://github.com/ho-nl/m2-pwa/commit/b247c6b96979bc313e597a8ffe1275b73f38bd6a))

### Features

- use Rating component ([ec54f45](https://github.com/ho-nl/m2-pwa/commit/ec54f4522adb2d330bbdecc2ce032f86f13fb7a6))

## [3.17.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.17.0...@graphcommerce/next-ui@3.17.1) (2021-11-12)

### Bug Fixes

- disable CartFab animation for mobile ([ea04e67](https://github.com/ho-nl/m2-pwa/commit/ea04e678b7d5ab23e903a59a7f369053d17f9e79))

# [3.17.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.16.0...@graphcommerce/next-ui@3.17.0) (2021-11-12)

### Features

- added tons of translations ([9bb0ac7](https://github.com/ho-nl/m2-pwa/commit/9bb0ac709b58df6ea6141e92e4923a5ca9ae2963))

# [3.16.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.15.2...@graphcommerce/next-ui@3.16.0) (2021-11-12)

### Bug Fixes

- Accessibility: Tap targets are sized appropriately ([55177f0](https://github.com/ho-nl/m2-pwa/commit/55177f03e79a29a879022ed34439e6c7aebbd80e))
- behaviour for CartFab animation including darkTheme support ([6152ef3](https://github.com/ho-nl/m2-pwa/commit/6152ef32d093e42c58ee79d4d713c5b8c2870746))
- clean up themeProvider ([6868e71](https://github.com/ho-nl/m2-pwa/commit/6868e71b59a637be8229a2ab49791dd324e02bb9))
- darkTheme ([b08f522](https://github.com/ho-nl/m2-pwa/commit/b08f52255c91dcba5498481ba5e9f0fa0b6c5013))
- darkTheme proof background color for sheet ([2af3b4a](https://github.com/ho-nl/m2-pwa/commit/2af3b4a6b7115400c5bbed36a21cd48852bea122))
- design ([a8e2888](https://github.com/ho-nl/m2-pwa/commit/a8e288856011ca7d8fdcb75d7c672629a8f8bcf4))
- design ([2dd5f41](https://github.com/ho-nl/m2-pwa/commit/2dd5f415010d19549158d837f0f98497d350fc2d))
- fab animation should be background paper ([b538f96](https://github.com/ho-nl/m2-pwa/commit/b538f963b6c45a3973b11abe8de7823f2864326b))
- hex for darktheme paper value, so calculations can be made ([c93bb22](https://github.com/ho-nl/m2-pwa/commit/c93bb22ba287c85ad5c27fd5f13d82dbb9a7d16f))
- icon style ([6b9fea9](https://github.com/ho-nl/m2-pwa/commit/6b9fea9112206bb38b419e8257ad1b2b3fad74b6))
- pagination color not primary ([c4e6d4f](https://github.com/ho-nl/m2-pwa/commit/c4e6d4f35d2df7a93fe045bde6c015fbcc5e5089))
- perfectly spaced video ([f1481ed](https://github.com/ho-nl/m2-pwa/commit/f1481edaf08564315a8c6f50fa1a500bbdc58fc5))
- prevent video casting on android ([a8baf94](https://github.com/ho-nl/m2-pwa/commit/a8baf949283c854283fe32befae4a60b119e02e0))
- remove unused wrapping div ([6ced7b9](https://github.com/ho-nl/m2-pwa/commit/6ced7b912229303a9d708db1d2621f50f431c73f))
- replace value with headerInnerHeight ([656fedc](https://github.com/ho-nl/m2-pwa/commit/656fedc573bbdd941c34e05e4dcd9a6af49fe987))
- replace value with headerInnerHeight ([d961720](https://github.com/ho-nl/m2-pwa/commit/d9617200d375a9db98f7f1c3b47a5927764dae71))
- revert background changes ([7661670](https://github.com/ho-nl/m2-pwa/commit/76616703968099039d79a4ca6001b942684adda5))
- set sheet backgroundColor to background.default ([5d3f971](https://github.com/ho-nl/m2-pwa/commit/5d3f9719b446ee9440ac8834679ef5ba14be53d4))
- text color iconBlock and styling ([0f2b0a8](https://github.com/ho-nl/m2-pwa/commit/0f2b0a896b11eafb79ea045c44f0115649a2040e))
- use alpha to set rgba value of theme variable ([aebee87](https://github.com/ho-nl/m2-pwa/commit/aebee87b32eb769c6454ad9ced10d5612c4d1af8))

### Features

- provide all (different type of) overlays with the default background color ([111fe71](https://github.com/ho-nl/m2-pwa/commit/111fe718fbfddbeef452829e08b574ca46d51345))
- remove svg stroke definitions, set all to currentColor ([189814f](https://github.com/ho-nl/m2-pwa/commit/189814f822d111c8adc6be1fff65c9a4a4c50c65))

## [3.15.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.15.1...@graphcommerce/next-ui@3.15.2) (2021-11-12)

### Bug Fixes

- **sheet-shell-base:** prevent sheet backdrop from navigating back multiple times ([5ca2f7e](https://github.com/ho-nl/m2-pwa/commit/5ca2f7e0d3404501a6b5763daf1d442c8080f8cb))

## [3.15.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.15.0...@graphcommerce/next-ui@3.15.1) (2021-11-11)

### Bug Fixes

- better handling to go back from product page ([ff8e72b](https://github.com/ho-nl/m2-pwa/commit/ff8e72beef81b9fb0d20cbfbd50c282f0144aed7))

# [3.15.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.14.8...@graphcommerce/next-ui@3.15.0) (2021-11-11)

### Features

- lingui configuration and integration greatly simplified and fixed ssr ([d8ec22a](https://github.com/ho-nl/m2-pwa/commit/d8ec22a80295af854a4cf6f357c4fb137c5b550d))

## [3.14.8](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.14.7...@graphcommerce/next-ui@3.14.8) (2021-11-09)

### Bug Fixes

- **menu-fab:** revert h3 styling for mobile menu ([7a45b4f](https://github.com/ho-nl/m2-pwa/commit/7a45b4fb8b0165f7a072bc0658833c819c9f8082))
- restyle menu to h4 ([642e166](https://github.com/ho-nl/m2-pwa/commit/642e16635dc06f38bed91ffd1a374922ac70439b))

## [3.14.7](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.14.6...@graphcommerce/next-ui@3.14.7) (2021-11-09)

### Bug Fixes

- make sure the translations are ran ([9d77807](https://github.com/ho-nl/m2-pwa/commit/9d7780711fc1d66884a7465e18d175a6a1d40abb))

## [3.14.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.14.2...@graphcommerce/next-ui@3.14.3) (2021-11-06)

### Bug Fixes

- spacing DesktopNavBar items ([c3373b9](https://github.com/ho-nl/m2-pwa/commit/c3373b97add87864adc5809ab04cf683bc5b0498))

## [3.14.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.14.0...@graphcommerce/next-ui@3.14.1) (2021-11-04)

### Bug Fixes

- can't remove filters on click icon ([2528802](https://github.com/ho-nl/m2-pwa/commit/252880216994da7f8e65c1b565ff996bbab0472a))
- Checkout button margin consistency ([9fcf7e7](https://github.com/ho-nl/m2-pwa/commit/9fcf7e7d96172448b2d2911771d6bf70ab976594))
- remove hardcoded fontSize ([e4e09e1](https://github.com/ho-nl/m2-pwa/commit/e4e09e11baeb8edeff634550b8cdb88571d96911))

# [3.14.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.13.2...@graphcommerce/next-ui@3.14.0) (2021-11-04)

### Bug Fixes

- **menu-fab:** fix route change start event handling ([20dde65](https://github.com/ho-nl/m2-pwa/commit/20dde65f8e8ead449b21f4f5292d653d003e6ead))

### Features

- **sheet-shell-base:** stop animating drawer on browser back ([c6262f1](https://github.com/ho-nl/m2-pwa/commit/c6262f1c3a0d181e57bd5d4971efb469901503b1))

## [3.13.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.13.1...@graphcommerce/next-ui@3.13.2) (2021-11-03)

### Bug Fixes

- various accessibility improvements ([47481a9](https://github.com/ho-nl/m2-pwa/commit/47481a9a882ba87968de6dd797557b0b275d75fb))

## [3.13.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.13.0...@graphcommerce/next-ui@3.13.1) (2021-11-03)

### Bug Fixes

- logo shouldnt invert, because it depends on the logo if it can be inverted. ([8426b09](https://github.com/ho-nl/m2-pwa/commit/8426b09688c7c77f45f912c56684ad1f378fc263))

# [3.13.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.12.4...@graphcommerce/next-ui@3.13.0) (2021-11-03)

### Bug Fixes

- **full-page-shell:** show logo on mobile ([abe2af7](https://github.com/ho-nl/m2-pwa/commit/abe2af7001ce9a31ba67a9fa326c50a07fe86135))
- **logo:** correct props propagation ([968025b](https://github.com/ho-nl/m2-pwa/commit/968025bc0bed4843cce7d11c0ef2740edb2ea02b))

### Features

- **next-ui:** introducing footer component ([a98129b](https://github.com/ho-nl/m2-pwa/commit/a98129b935b9fd45e985f958a60a4ad6b21c880c))

## [3.12.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.12.2...@graphcommerce/next-ui@3.12.3) (2021-11-02)

### Bug Fixes

- **MenuFab:** make icon customizable ([375bafd](https://github.com/ho-nl/m2-pwa/commit/375bafd901b3c53405e02d681ea0dca3af190e35))

## [3.12.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.12.1...@graphcommerce/next-ui@3.12.2) (2021-11-02)

### Bug Fixes

- **message-snackbar:** children alignment ([02051df](https://github.com/ho-nl/m2-pwa/commit/02051df0f09945218117c6ba2c761e4dca3872a3))
- **message-snackbar:** children alignment ([9b9ac09](https://github.com/ho-nl/m2-pwa/commit/9b9ac094e10ec3e57155014366f39a22f07a7f52))

## [3.12.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.12.0...@graphcommerce/next-ui@3.12.1) (2021-11-02)

### Bug Fixes

- RemoveCoupon Button and fix pill-link style to match buttons ([6838812](https://github.com/ho-nl/m2-pwa/commit/68388123773fb4f79a3e4b1beb7ecca601d7748e))

# [3.12.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.11.5...@graphcommerce/next-ui@3.12.0) (2021-11-02)

### Bug Fixes

- build ([2c2d317](https://github.com/ho-nl/m2-pwa/commit/2c2d317432e3a6f2b027f24c00ac2416d56847be))
- build ([5d07e8e](https://github.com/ho-nl/m2-pwa/commit/5d07e8e8dc9b70ab8e58018183c54484944e8822))
- cancel filter icon ([8e03602](https://github.com/ho-nl/m2-pwa/commit/8e03602dd54b2dae714ad514515fad907539b594))
- cleanup blog header styles ([b96aec1](https://github.com/ho-nl/m2-pwa/commit/b96aec13b5a0af74ec2058502c7da558eb675dbb))
- darkMode ([c7573de](https://github.com/ho-nl/m2-pwa/commit/c7573de6bb80643b26931c35ac61735539e7fbf0))
- darkTheme ([df3d326](https://github.com/ho-nl/m2-pwa/commit/df3d326126446c1b92f8e46eff0533bbbe35604f))
- darkTheme ([a12786f](https://github.com/ho-nl/m2-pwa/commit/a12786f33cf09e974cceb8592ec98439ccbc3fad))
- darkTheme ([d0517af](https://github.com/ho-nl/m2-pwa/commit/d0517af5a788532c48f567ee3e840986efa26a67))
- darkTheme ([ae017c1](https://github.com/ho-nl/m2-pwa/commit/ae017c1a1e82f86ee5eb2f67106dac8174950c45))
- full image on blog view page ([6d14b0e](https://github.com/ho-nl/m2-pwa/commit/6d14b0ef24fa60321a442a42d5861adc20e4a5fa))
- icon size in checkout ([d7bb962](https://github.com/ho-nl/m2-pwa/commit/d7bb962a6827b81f737f22e36f828454abef1b47))
- move checkmark icons on select fields ([95ce54d](https://github.com/ho-nl/m2-pwa/commit/95ce54d7fd41d11120847f2fdf6b9097a2c93871))
- remove text from inputprops ([ccc11f2](https://github.com/ho-nl/m2-pwa/commit/ccc11f267e85b8b333877afb4ce11f96dad0a3d0))
- remove text='bold', make contained button text stronger by default ([cd277c9](https://github.com/ho-nl/m2-pwa/commit/cd277c9f434a4a765eac372467e5a05c822d5512))
- remove unused imports ([5018763](https://github.com/ho-nl/m2-pwa/commit/5018763a8a2bbd0ba4a775979cc5885e9b17ad8d))
- style cleanup snackbar ([610221a](https://github.com/ho-nl/m2-pwa/commit/610221ad82f5726e9d745436cb1c08314bd342d5))
- svg color ([095ac85](https://github.com/ho-nl/m2-pwa/commit/095ac8578409ec005fbfe449fe4759d4f63b6f79))

### Features

- add social icons to codebase for convenience ([9e4b404](https://github.com/ho-nl/m2-pwa/commit/9e4b404aa1dbc821562529f7b15ab4761a1ab52c))
- darkTheme ([968f4f1](https://github.com/ho-nl/m2-pwa/commit/968f4f1360417bf7daa36454c19e6bc5cf53ae90))
- darkTheme ([3ed6647](https://github.com/ho-nl/m2-pwa/commit/3ed664714670315bc9f20542549724f66cb5052d))
- Mui true Pagination based on Fab ([572fa7b](https://github.com/ho-nl/m2-pwa/commit/572fa7b031b58b6ffdab60c4a50407a53202fa34))

## [3.11.5](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.11.4...@graphcommerce/next-ui@3.11.5) (2021-11-02)

### Bug Fixes

- back button loop ([4d901e6](https://github.com/ho-nl/m2-pwa/commit/4d901e662579d1cfb97c823d581e60d687908b1a))
- break back button loop ([be2e5ae](https://github.com/ho-nl/m2-pwa/commit/be2e5aefa1e409a97c1ebf94173f4da7ea25386b))
- **framer-next-pages:** prevent back button loop when previous page is the up page of the previous page ([ec829c8](https://github.com/ho-nl/m2-pwa/commit/ec829c8eee2a3744747a7572b32299879c780d45))
- **framer-next-pages:** prevent back button loop when previous page is the up page of the previous page ([cbdde83](https://github.com/ho-nl/m2-pwa/commit/cbdde83790337bdf4c5f03c907ca6e6e02792e70))
- **types:** apollo state props ‘up’ can be null ([9377d7f](https://github.com/ho-nl/m2-pwa/commit/9377d7fd9a080a8a2b8c7127961d64dc66a5729a))
- **types:** make apollo up state optional ([eba9683](https://github.com/ho-nl/m2-pwa/commit/eba96832e372adaeaa2ed71622c88f9dc95071c5))

## [3.11.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.11.2...@graphcommerce/next-ui@3.11.3) (2021-11-01)

### Bug Fixes

- category page design fixs ([d3fccc2](https://github.com/ho-nl/m2-pwa/commit/d3fccc2a86106b854e9a1fd89040a248fe20c99a))

## [3.11.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.11.0...@graphcommerce/next-ui@3.11.1) (2021-10-28)

### Bug Fixes

- External SVG's can't have alt tags ([1b1414a](https://github.com/ho-nl/m2-pwa/commit/1b1414a782d55d3acf7b0e6bcaa50f2ad5f18f39))

# [3.11.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.10.2...@graphcommerce/next-ui@3.11.0) (2021-10-28)

### Bug Fixes

- add missing row container for consistent margins ([10869b8](https://github.com/ho-nl/m2-pwa/commit/10869b8a7ab9579306b268b22a0af47c1a2e2e25))
- alt person icon ([d80d180](https://github.com/ho-nl/m2-pwa/commit/d80d18043a86551feaf5ce49a30752c93ee27924))
- base icon size on responsiveVal ([3bbd2a7](https://github.com/ho-nl/m2-pwa/commit/3bbd2a7be4853b284f90603056ae8990e5d62040))
- build ([25582a4](https://github.com/ho-nl/m2-pwa/commit/25582a496039c704e75bb969d4fa06c13ee6267d))
- build missing import ([5850f25](https://github.com/ho-nl/m2-pwa/commit/5850f2561a2d9d72d4ebe0da5c964b6571a72b03))
- build, remove unused imports ([af6d72c](https://github.com/ho-nl/m2-pwa/commit/af6d72c6e70f670effb4d9e0c1fd883bf771f99d))
- consistent margin product page ([1c65ff6](https://github.com/ho-nl/m2-pwa/commit/1c65ff6b19ebb3fed70abf8326f4e593d77c70da))
- force object-fit image ([df049f7](https://github.com/ho-nl/m2-pwa/commit/df049f727a26aa049c6c9d3aa338223ce442bffd))
- icon size ([6063855](https://github.com/ho-nl/m2-pwa/commit/6063855d9c7360f0ea69ffdb22292de6c93e5f27))
- loading state icon muted ([f7c3a6b](https://github.com/ho-nl/m2-pwa/commit/f7c3a6be199f2d05d1ad918043bf199544824ff6))
- make pill buttons always completely rounded ([9d8e211](https://github.com/ho-nl/m2-pwa/commit/9d8e211303ac6cd371a834bf73fb10a6345ca13a))
- pagination size ([7d16290](https://github.com/ho-nl/m2-pwa/commit/7d16290d8180a2eb06755859cb9dcdbd44e7d59b))
- remove double icons ([1654e34](https://github.com/ho-nl/m2-pwa/commit/1654e3441911f3c7c1600357f8f8e3032f5ee729))
- remove laggy animation ([3ca0922](https://github.com/ho-nl/m2-pwa/commit/3ca09221ecd6e533063c42ec9fbe11f9484099bc))
- remove unused breakpoint ([19dc4c4](https://github.com/ho-nl/m2-pwa/commit/19dc4c4bde18bec74c8f3e13e3769b929f2e9d57))
- small sized chevron for service page links ([1748418](https://github.com/ho-nl/m2-pwa/commit/17484186ae20e8002f38f1dcb820f942023f5bbc))
- smaller icons for search and menu ([f8e8949](https://github.com/ho-nl/m2-pwa/commit/f8e89494f358f9d2868c75901abaca2bffe38bdc))
- strokeWidth for xxl icons ([da131e2](https://github.com/ho-nl/m2-pwa/commit/da131e20beb5bdf94c99de6237d7563b187f20da))
- SvgImage to SvgImageSimple ([0004269](https://github.com/ho-nl/m2-pwa/commit/00042694f89e4a5fc17a4b74a16185cada14b80a))
- SvgImage to SvgImageSimple ([9722167](https://github.com/ho-nl/m2-pwa/commit/9722167cd3c6032b4251ef4a4921d727eb92167e))
- SvgImage to SvgImageSimple ([793fac7](https://github.com/ho-nl/m2-pwa/commit/793fac769f045d283817fe47fbed77d38d282f3c))
- tuning sizeLarge, adjust muted and inverted styles ([49d69ee](https://github.com/ho-nl/m2-pwa/commit/49d69ee8d9a04a87fbd9979594c5a3b445f7dd58))
- update SvgImage to SvgImageSimple ([f116543](https://github.com/ho-nl/m2-pwa/commit/f116543730853fa9782abff0ccacee7032e85789))
- use font from theme for menu ([74522ae](https://github.com/ho-nl/m2-pwa/commit/74522ae9bababbf204d925ae96997dc45f611bfc))
- usp fontsize ([1164907](https://github.com/ho-nl/m2-pwa/commit/1164907be4fa7ed3a517f66b2af67a54df55a38f))

### Features

- add default iconset ([eb78d4c](https://github.com/ho-nl/m2-pwa/commit/eb78d4c081937bc56ce1c593a6632a4ff32e611e))
- dynamic icons, update SvgImage uses to SvgImageSimple ([3d3cc0e](https://github.com/ho-nl/m2-pwa/commit/3d3cc0e0336fcde1cce6ba19705f82c1edf9bfc6))
- icon references ([b477029](https://github.com/ho-nl/m2-pwa/commit/b47702955cf47b19fb0861c0d40751ac43e8eeab))
- mobile menu styling ([3cc3085](https://github.com/ho-nl/m2-pwa/commit/3cc308585d4ded68d2ac8ebf97f96288424ee914))
- more spacious row margins for mobile ([0b3e973](https://github.com/ho-nl/m2-pwa/commit/0b3e9734aa01fcc0801fa12281edd224d9600464))
- rebuild to support svg imports ([59fbda3](https://github.com/ho-nl/m2-pwa/commit/59fbda300ce88c51a5d1c6a7ea457cb3b323b24d))
- replace icons with icon pack ([60951d5](https://github.com/ho-nl/m2-pwa/commit/60951d57684637da8c4aed94f28e69f18129bbd0))
- set correct font sizes ([9317448](https://github.com/ho-nl/m2-pwa/commit/9317448c94a9fb4408dfbcaa320adccc363964d0))
- UspList styling and svg support ([70f472b](https://github.com/ho-nl/m2-pwa/commit/70f472bb143aae86879e69dc911bbbdf229b39b9))

# [3.10.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.9.0...@graphcommerce/next-ui@3.10.0) (2021-10-27)

### Features

- **nextjs:** upgraded to nextjs 12 ([9331bc8](https://github.com/ho-nl/m2-pwa/commit/9331bc801f6419522115cc47d291d49d608d5a90))

# [3.9.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.8.1...@graphcommerce/next-ui@3.9.0) (2021-10-25)

### Features

- prepare for yarn 3 usage (not actually migrated because vercel doesn't support yarn 3) ([41734be](https://github.com/ho-nl/m2-pwa/commit/41734beaa016bf4c3487b3fbd5a402d8024e173f))

# [3.8.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.7.1...@graphcommerce/next-ui@3.8.0) (2021-10-21)

### Features

- **graphql-mesh:** remove the api project and use a single project 🎉👩‍👩‍👦‍👦 ([ea4ad03](https://github.com/ho-nl/m2-pwa/commit/ea4ad0397d4ff289ef3b3253593fb0914c8c5246))

# [3.7.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.6.0...@graphcommerce/next-ui@3.7.0) (2021-10-19)

### Bug Fixes

- solve import issue where @material-ui/styles couldn't be found ([efb3771](https://github.com/ho-nl/m2-pwa/commit/efb3771e8c173799779691d4d52857678dab4c15))

### Features

- **framer-scroller:** better defaults so the Scroller doesn't look broken when providing no props ([b177ce9](https://github.com/ho-nl/m2-pwa/commit/b177ce9570abb9ccfd4eb5cc34e43d157bb4e81a))

# [3.6.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.5.0...@graphcommerce/next-ui@3.6.0) (2021-10-18)

### Features

- **message-snackbar:** severity props ([c7be8a5](https://github.com/ho-nl/m2-pwa/commit/c7be8a51faf7a5937b7fab5bb352df2089ae4eea))

# [3.5.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.4.0...@graphcommerce/next-ui@3.5.0) (2021-10-18)

### Features

- **graphcms:** combined multiple models to bypass model creation limit ([fd6dc14](https://github.com/ho-nl/m2-pwa/commit/fd6dc140cb60c5733dab2e0a43b5df2059e0c739))

# [3.4.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.3.3...@graphcommerce/next-ui@3.4.0) (2021-10-15)

### Features

- **DesktopNavBar:** allow custom scroller button icons ([401f457](https://github.com/ho-nl/m2-pwa/commit/401f4572ce67dbe52008dca8e1d4473e2fcbf5cf))

## [3.3.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.3.2...@graphcommerce/next-ui@3.3.3) (2021-10-13)

### Bug Fixes

- regression in header ([4738fb7](https://github.com/ho-nl/m2-pwa/commit/4738fb7e13fb3be187f58b474219497783525d72))

# [3.3.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.2.3...@graphcommerce/next-ui@3.3.0) (2021-10-13)

### Features

- allow styling DesktopNavBar ([12f99a6](https://github.com/ho-nl/m2-pwa/commit/12f99a603d9e9f89e28ec2452823b58abee59c4c))
- implement extensibility for DesktopNavBar, SearchButton ([5710de8](https://github.com/ho-nl/m2-pwa/commit/5710de8936f59c7d0fcc648978183f0e7fdd26b7))
- make DesktopNavBar Link variant customizable ([d47172f](https://github.com/ho-nl/m2-pwa/commit/d47172f3ebe0cc0b769e0d17c171ae4bb2045bbb))

## [3.2.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.2.2...@graphcommerce/next-ui@3.2.3) (2021-10-11)

### Bug Fixes

- **desktop-nav-bar:** prev/next button alignment in menu ([c7fabf0](https://github.com/ho-nl/m2-pwa/commit/c7fabf0474100aaf40a7526858fa2b01566b3250))
- **section-heeader-filter-items:** remove large paddings ([18f4d77](https://github.com/ho-nl/m2-pwa/commit/18f4d77e4eb1b029bf2e5656b753e2f18fde90ab))

## [3.2.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.2.1...@graphcommerce/next-ui@3.2.2) (2021-10-11)

### Bug Fixes

- **menu-fab:** animation duration ([5b9ece2](https://github.com/ho-nl/m2-pwa/commit/5b9ece293fb7e12663386f9f9cbc99bc4e22aaa9))

## [3.2.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.2.0...@graphcommerce/next-ui@3.2.1) (2021-10-11)

### Bug Fixes

- **framer-scroller:** dots should have a background ([8f2e1a1](https://github.com/ho-nl/m2-pwa/commit/8f2e1a1ffc9de3369938fe2f9e9f25f592739d8d))

# [3.2.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.1.7...@graphcommerce/next-ui@3.2.0) (2021-10-09)

### Bug Fixes

- **framer-scroller:** pan snap does not work on mobile ([660f242](https://github.com/ho-nl/m2-pwa/commit/660f242a38558669fa896a74e14cafdd85069d57))
- **framer-slider:** route changes ([4cadbea](https://github.com/ho-nl/m2-pwa/commit/4cadbea3e494326377e74e2fa9370ab80f8d8c35))
- make sure the gallery never gets higher than 100% ([1eae8c7](https://github.com/ho-nl/m2-pwa/commit/1eae8c7cfb2a9e67f03f1e4e4db5c95213d2dbe0))
- poistioning on mobile ([bec497f](https://github.com/ho-nl/m2-pwa/commit/bec497fca426346b80b453a3871b9c66521a2161))
- **sidebar-gallery:** differentiate drag from click ([acd408e](https://github.com/ho-nl/m2-pwa/commit/acd408e400f8285e2b3a9105b4694d5fd839dd99))
- **sidebar-gallery:** push gallery to history one time ([2c45b64](https://github.com/ho-nl/m2-pwa/commit/2c45b64e171577f7b584662d56416eeae4a22554))
- **sidebar-gallery:** route handling ([1c3b8b1](https://github.com/ho-nl/m2-pwa/commit/1c3b8b1687b0bf637da6c88d2d9b30a734b98d11))
- **sidebar-gallery:** use fullscreen and fullscreen exit icons ([1328d22](https://github.com/ho-nl/m2-pwa/commit/1328d220030f766be2d4046abd87d45175e4fe38))
- use better URL handling and remove drag temporarily ([0b99387](https://github.com/ho-nl/m2-pwa/commit/0b993876280270320eef5301130c5cc3eb339ea9))

### Features

- **sidebar-gallery:** toggle with browser back buttons ([a2f804b](https://github.com/ho-nl/m2-pwa/commit/a2f804b0cedb98df8f6a7b197aeeeeda43c6b1ba))

## [3.1.7](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.1.6...@graphcommerce/next-ui@3.1.7) (2021-10-08)

### Bug Fixes

- SvgImageSimple should pass the layout prop ([a0b5c81](https://github.com/ho-nl/m2-pwa/commit/a0b5c818f93ba24a34c6ce8aa21f8af50bd05dd2))

## [3.1.6](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.1.5...@graphcommerce/next-ui@3.1.6) (2021-10-07)

### Bug Fixes

- Form component added classes attribute ([269fd46](https://github.com/ho-nl/m2-pwa/commit/269fd4629cedcaab74043604ac21a4557b4e514f))

## [3.1.4](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.1.3...@graphcommerce/next-ui@3.1.4) (2021-10-06)

### Bug Fixes

- cart fab alignment ([209ad30](https://github.com/ho-nl/m2-pwa/commit/209ad3027eff32e174c1774d21e9f33a3051a819))
- **cart-fab:** box shadow in safari ([4eb316d](https://github.com/ho-nl/m2-pwa/commit/4eb316dd0f2ab7ee2806a3acdb306af1eb72854b))
- **cart-fab:** positioning ([7bb31b4](https://github.com/ho-nl/m2-pwa/commit/7bb31b4bf6e663d14220aedaddf420b24d427b3a))

## [3.1.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.1.2...@graphcommerce/next-ui@3.1.3) (2021-10-04)

### Bug Fixes

- **blog:** use app shell title ([987bb15](https://github.com/ho-nl/m2-pwa/commit/987bb157c4064141b1c2978935e66cf47ae24ff0))

## [3.1.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.1.1...@graphcommerce/next-ui@3.1.2) (2021-10-04)

### Bug Fixes

- **hero-banner:** too large top spacing ([0ad8499](https://github.com/ho-nl/m2-pwa/commit/0ad8499a1702caf8e121f38e1ccb70fba4f418db))
- **sheet-shell:** mobile border bottom gap ([70104d8](https://github.com/ho-nl/m2-pwa/commit/70104d88994c2324f415eec1efeeba21de7872b9))

## [3.1.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.1.0...@graphcommerce/next-ui@3.1.1) (2021-10-04)

### Bug Fixes

- cart icon alignment ([8b75b40](https://github.com/ho-nl/m2-pwa/commit/8b75b40bcdecf6d43579ee824677bf1a03763157))
- **icon-block:** render href ([738fd82](https://github.com/ho-nl/m2-pwa/commit/738fd82629dd3be92fe0cdd63ed8eeaa5d4886f6))

# [3.1.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.0.6...@graphcommerce/next-ui@3.1.0) (2021-10-01)

### Features

- **sidebar-gallery:** close using esc key ([fd46fe1](https://github.com/ho-nl/m2-pwa/commit/fd46fe1029f436c1e0e04cbcc3b66deca4d1b0b6))

## [3.0.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@3.0.0...@graphcommerce/next-ui@3.0.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/next-ui

# Change Log

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 3.0.0 (2021-09-27)

### Bug Fixes

- account flow (wip) ([0e75aeb](https://github.com/ho-nl/m2-pwa/commit/0e75aebcab3043f9dcd7fd095f9c46cb25d40d57))
- account tweaks ([26ca295](https://github.com/ho-nl/m2-pwa/commit/26ca2955fe7a3ed509aaa7df98cbb4854d636179))
- accuratately calculate the target x-position after drag ends ([817a505](https://github.com/ho-nl/m2-pwa/commit/817a505a78165c7a97fa7e59fc24bb625b810940))
- add blogTags fragment ([8ab1ee8](https://github.com/ho-nl/m2-pwa/commit/8ab1ee874fa0174b15f2df5108cdca03599f1ef5))
- add configurable product to cart ([5b0f6fe](https://github.com/ho-nl/m2-pwa/commit/5b0f6fee6a59ff0b228c47bb124378cd23047adf))
- add styling for subtitle1 ([3b18e36](https://github.com/ho-nl/m2-pwa/commit/3b18e36e66d7c7406585a930723fa4f152763a26))
- add types ([18dac42](https://github.com/ho-nl/m2-pwa/commit/18dac421042e4050407987b33eae0bf33e2f6e12))
- adjust header height ([d22310d](https://github.com/ho-nl/m2-pwa/commit/d22310dca282208c6d7020c6c27f8ba5be980e3c))
- all disabled buttons have white text ([358114d](https://github.com/ho-nl/m2-pwa/commit/358114ddff5d7ffa51c30f6a6e7787e88d5e4c5c))
- app shell consistency ([e062c3d](https://github.com/ho-nl/m2-pwa/commit/e062c3d4af75c6bfe1ad7056dfb172277f1b01cb))
- app shell consistency wip ([be995ca](https://github.com/ho-nl/m2-pwa/commit/be995ca5c3e383b89fea3759186d53af4790e99b))
- app shell fixes ([1b13d0d](https://github.com/ho-nl/m2-pwa/commit/1b13d0d0d4b480ddc9712b4d298af2d81fb2b1d4))
- app shell fixes ([c3bddee](https://github.com/ho-nl/m2-pwa/commit/c3bddee6b878cd9d2183c4938df0824a6eca4f36))
- app shell header scroll spacings ([b1f5706](https://github.com/ho-nl/m2-pwa/commit/b1f570697bb0a9207129c9d24623b6069cf38ab5))
- app shell sticky overlapping buttons on scroll ([7548b30](https://github.com/ho-nl/m2-pwa/commit/7548b30718290d976f4839f0096fea432f9a6b45))
- app shell tests ([10b58bd](https://github.com/ho-nl/m2-pwa/commit/10b58bd1a0271ef5d90a51394a9efd194b285ed0))
- **app-shell-header:** hide divider ([34d183e](https://github.com/ho-nl/m2-pwa/commit/34d183e7ee13c3e6d76bc211d44398cb7e492d67))
- **app-shell-header:** offset not always correctly set ([11a8907](https://github.com/ho-nl/m2-pwa/commit/11a890764be1ab4f6c584a5c8ca4e6620d0d73e5))
- **app-shell-header:** show fallbacktitle instead of back on back button when applicable ([27d7d7d](https://github.com/ho-nl/m2-pwa/commit/27d7d7d716265c856cd64d3f485f0227f99c5cd0))
- **app-shell-header:** title offset top not correctly set ([c144309](https://github.com/ho-nl/m2-pwa/commit/c1443095317c1779074f3a4058f4041159c8e31b))
- **app-shell:** pages after app shell changes ([fb74510](https://github.com/ho-nl/m2-pwa/commit/fb74510121f6124009db72ad2ddebf6459c52a85))
- automatically set SliderImage to the size of the container ([d5a71bf](https://github.com/ho-nl/m2-pwa/commit/d5a71bf687a43d001aa172e58c9b582c3f2f3093))
- back button behavior ([59f7b20](https://github.com/ho-nl/m2-pwa/commit/59f7b2047194c3506037fc88d791302c7c4a1a69))
- back button on service pages ([d89f200](https://github.com/ho-nl/m2-pwa/commit/d89f2003cabdb780819a848d4ca7754c708b3895))
- backdrop click, prevent going back to many times ([08b2c28](https://github.com/ho-nl/m2-pwa/commit/08b2c2846b9cae9f51d680af0d15b547eea43050))
- bad setState when render is in a loop ([fc5223b](https://github.com/ho-nl/m2-pwa/commit/fc5223b27ccc9632c1fd229444d88997842cc04c))
- bad state update fix, drag animation improvements ([fecdb6e](https://github.com/ho-nl/m2-pwa/commit/fecdb6efc87f6defe97b59689bb7ee808173bcf8))
- base mechanics on page relations ([345a682](https://github.com/ho-nl/m2-pwa/commit/345a68274dc7bc7f561a963d29fd9cd96907d4d1))
- big icon header icon on mobile ([3596d96](https://github.com/ho-nl/m2-pwa/commit/3596d96283a60b31228a5c3941c78404cf68308a))
- big indicator on mobile ([2204f9d](https://github.com/ho-nl/m2-pwa/commit/2204f9d219e79af29acdd2db643df06184ae3af5))
- blue back button ([0f134ff](https://github.com/ho-nl/m2-pwa/commit/0f134ffb249e3d7e4885244a6f79b7c4728f7f1b))
- blurry svgimage ([02d1616](https://github.com/ho-nl/m2-pwa/commit/02d16163a79734e6aaa5ca6d3d77c643e69ca459))
- Button font weight styling ([e9c3265](https://github.com/ho-nl/m2-pwa/commit/e9c3265755ce5c6344d7aa534786fbf6687d1856))
- **button:** pill link not visible on mobile ([c4474f5](https://github.com/ho-nl/m2-pwa/commit/c4474f5cfe4dbb6b9aa795d7d175dbce053720d8))
- buttons reporting errors all over the place ([0fa9099](https://github.com/ho-nl/m2-pwa/commit/0fa9099671659094f990449d3286e5216fce6a51))
- cannot export svg icons build error ([b326e5b](https://github.com/ho-nl/m2-pwa/commit/b326e5b312cedfc8a531d0e12d60035e94b33ae6))
- canonical urls ([9ff8d3f](https://github.com/ho-nl/m2-pwa/commit/9ff8d3f950098fb28440f31f5dd93a835dce0bda))
- caption styles bugs ([f223918](https://github.com/ho-nl/m2-pwa/commit/f223918cc557a996b5f321fbf6910b4981646dcb))
- cart fab box shadow animation ([4c73e42](https://github.com/ho-nl/m2-pwa/commit/4c73e423a920f6485f72b24141cccda010a35ab7))
- cart item image sizes ([e7c860c](https://github.com/ho-nl/m2-pwa/commit/e7c860c785e172b9275e1a00c8b51509d6b297a8))
- cart styling ([56feeee](https://github.com/ho-nl/m2-pwa/commit/56feeeeb85657d8abfec1e9613f12bf9d54686b5))
- center overlay ui reaching the bottom ([e9c53e6](https://github.com/ho-nl/m2-pwa/commit/e9c53e6147daa6ba39cd938f2139fd6c569e3871))
- chevron icon consistency ([858725c](https://github.com/ho-nl/m2-pwa/commit/858725c56761d2aa721761f1c089fd70051845a5))
- **chip-menu:** layout shift on open ([c65cf5b](https://github.com/ho-nl/m2-pwa/commit/c65cf5bc18864b5180aba3f2361399bd85967952))
- chipmenu styling ([dcdbbcc](https://github.com/ho-nl/m2-pwa/commit/dcdbbccceb2226de5067b14414f3d4ff5e016a5b))
- close overlay using esc key ([c74940f](https://github.com/ho-nl/m2-pwa/commit/c74940f7c44405ff958ec3e9ceb3f998d98ce35d))
- compact text input number ([8999053](https://github.com/ho-nl/m2-pwa/commit/899905364808d6ea6ef257e948c68dc3851717a6))
- component for returning flag avatars ([38e181f](https://github.com/ho-nl/m2-pwa/commit/38e181f9767aac3d7bfc1d3d6a6c665e57868fe7))
- contained prop throws error on Form ([2eb6651](https://github.com/ho-nl/m2-pwa/commit/2eb6651e2c26274adbf08562918d3f1a9659cbe8))
- container shouldn’t overflow, should be handled by specific implementation ([7d53f83](https://github.com/ho-nl/m2-pwa/commit/7d53f83261e384d92fc1d365b8e8e0e45f2da04d))
- **conten-header:** remove back button box shadow on mobile ([652c778](https://github.com/ho-nl/m2-pwa/commit/652c77826b7765acc9d450ffcfe4a2b3052b80da))
- content header title typography ([1eb2dc9](https://github.com/ho-nl/m2-pwa/commit/1eb2dc94f191f3fb29a470b06a21b1c3bab7744b))
- **content-header:** icon sizes ([a037ec3](https://github.com/ho-nl/m2-pwa/commit/a037ec3dc3c87d54bb8aea0d2d6b78c05d9afc63))
- contentLinks full page width ([2d61eed](https://github.com/ho-nl/m2-pwa/commit/2d61eed6683dfa6ac2446b80a1a18d7a3f1c89a8))
- correct backbutton hover background color ([ff90c12](https://github.com/ho-nl/m2-pwa/commit/ff90c12533c014a9962ce4674763444f1bc117fb))
- correct pdp swatch selected color ([d3c9285](https://github.com/ho-nl/m2-pwa/commit/d3c9285fb1ba3a0b99ba52a04b0dda3b5870dede))
- **country-switcher:** navigate back to correct locale ([579d146](https://github.com/ho-nl/m2-pwa/commit/579d146e1b658a343b1514d8e8a45c01a507c084))
- disable menuscrolllock ([f715fca](https://github.com/ho-nl/m2-pwa/commit/f715fca590ee18329908eb595685fd0f1f163450))
- disappearing asset with zIndex -1 ([44956e5](https://github.com/ho-nl/m2-pwa/commit/44956e5d0b57a62322033395d378d0e4788454b1))
- do not hide the overflow for sliders by default ([1bc3ffa](https://github.com/ho-nl/m2-pwa/commit/1bc3ffa69e8b5fa812c9c82f1d65e9ae54adbff8))
- do not use ToggleButtonGroup, only use the ToggleButton ([5172f70](https://github.com/ho-nl/m2-pwa/commit/5172f709ee26122b0a8700afb4325f23cb9ba9b9))
- downgrade to resize-observer 6 ([32c412c](https://github.com/ho-nl/m2-pwa/commit/32c412c77c2c7b5a5b5b889963c254ff379b018b))
- drag handle rotation ([b1b0dcb](https://github.com/ho-nl/m2-pwa/commit/b1b0dcbfa822fdbae621e9ff121186ec97a65876))
- drawer content overlaps with title ([6f37f50](https://github.com/ho-nl/m2-pwa/commit/6f37f50a6d82e17060cc347491d30d92544afe79))
- drawer stacking issues ([bd5a97d](https://github.com/ho-nl/m2-pwa/commit/bd5a97dd38c6e0f68aa24ee897be3f4a7e22e966))
- duplicate key error when multiple errors of the same error occur ([f2c5bc0](https://github.com/ho-nl/m2-pwa/commit/f2c5bc040c1e9cc1340f67c68460b8fe42230659))
- duplicated (meta) tags in document head ([d52e962](https://github.com/ho-nl/m2-pwa/commit/d52e9629036ccab1f266ddd01600a0bd45930149))
- enable early exit / enter for SheetShellBase ([e8630d2](https://github.com/ho-nl/m2-pwa/commit/e8630d2e74d8754bc3ce55c910e3641a497a2b58))
- filter labels fully shown ([f96d1c9](https://github.com/ho-nl/m2-pwa/commit/f96d1c92c34562474d72277e87622e4b5cd1d70d))
- fix pagination didn’t show next when not available ([58b9fb1](https://github.com/ho-nl/m2-pwa/commit/58b9fb114d2d8b4991c66c6dda0fced42614945c))
- footer spacing missing ([6198665](https://github.com/ho-nl/m2-pwa/commit/61986653411dda9cb70ea15dd2d74ef1d48c2721))
- **Form:** forms always have background ([1f3fa1e](https://github.com/ho-nl/m2-pwa/commit/1f3fa1e53a997b88512335dc344bff3fa24f6bc6))
- forward ref not used IconBlocks ([7af4df3](https://github.com/ho-nl/m2-pwa/commit/7af4df3b03cba0a7748614e1db49d86e8157b75f))
- forwardRef issue ([6bcf15f](https://github.com/ho-nl/m2-pwa/commit/6bcf15f5a4ee7b684ebe57a714340fa4fc416542))
- **framer-next-page:** usePageRouter in SharedLayout ([c2fb164](https://github.com/ho-nl/m2-pwa/commit/c2fb164b342770089b787378a3f79529c36d2152))
- **framer-scroller:** center the prev/next buttons on the gallery ([234dc37](https://github.com/ho-nl/m2-pwa/commit/234dc37fc46f723410e9a844bbcb33cfe5d8a588))
- **framer-sheet:** bottom sheet does not resize properly ([2ae89db](https://github.com/ho-nl/m2-pwa/commit/2ae89dbd651acba10f40ac68956213dd744e2247))
- **framer-slider:** prev/next buttons don't always show up correctly ([ba2510e](https://github.com/ho-nl/m2-pwa/commit/ba2510ea659344a2d71957eed396f4e5ce536a8c))
- **FramerSlider:** handle layout transitions + paddings on the container ([ed8d0fa](https://github.com/ho-nl/m2-pwa/commit/ed8d0fa44e13e496ab4489249234efe527883f36))
- **full-page-shell:** fabs not clickable ([2c8d7f9](https://github.com/ho-nl/m2-pwa/commit/2c8d7f9529e83ac08d4fd758547379b72eb2f3d1))
- **GCOM-430:** only show scrollbar if there is content to scroll ([a67ebfd](https://github.com/ho-nl/m2-pwa/commit/a67ebfd515672b5ef6b74dc902871765494f01db))
- grid blowout on homepage ([8c0e225](https://github.com/ho-nl/m2-pwa/commit/8c0e225a629841e4a391a1edbc0614fc30789ba6))
- header app shell margin bottom in some circumstances ([6030ba7](https://github.com/ho-nl/m2-pwa/commit/6030ba7d07619d0b877a9f557c3e14676c326c7a))
- header fab icons size ([772a721](https://github.com/ho-nl/m2-pwa/commit/772a7213a7ee8274ed006fcd6b6fb5123630a771))
- header spacing ([967573a](https://github.com/ho-nl/m2-pwa/commit/967573a12f3651f2be47e4630dab737ccf8bf498))
- header spacings ([f00462f](https://github.com/ho-nl/m2-pwa/commit/f00462f9abb61a54552c96dbed35ef708fe05608))
- hero banner not full page width ([0ecd014](https://github.com/ho-nl/m2-pwa/commit/0ecd0145a98045eccfde6efe6a4410e83b6fb872))
- hide prev/next buttons ([4ad733b](https://github.com/ho-nl/m2-pwa/commit/4ad733b7109bec257ec19b049ffd8f476f23dfd4))
- icon alignments & sizes ([3b349c9](https://github.com/ho-nl/m2-pwa/commit/3b349c96f08f25cad892cf224ee76e937fb338b8))
- icon size & shadows ([b253e11](https://github.com/ho-nl/m2-pwa/commit/b253e1168e6a47362014038a2d1c6ca9fc4259b2))
- icon title correct heading ([ee7b0b4](https://github.com/ho-nl/m2-pwa/commit/ee7b0b4ce85625673126c4aefd2b8012791a0370))
- **icon-header:** optional no margin prop ([4b189a1](https://github.com/ho-nl/m2-pwa/commit/4b189a12a543825a2036a12a7c06f40f2dd033ba))
- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
- image height in grid ([e95fe1a](https://github.com/ho-nl/m2-pwa/commit/e95fe1a613e2047ca9aae54ea413c592eba19bf3))
- image height on blog view ([2f8aaa3](https://github.com/ho-nl/m2-pwa/commit/2f8aaa32af3d4d8c4e3412c3b4dcab5485a0504f))
- **image:** component would rerender unnessarily ([bfc041d](https://github.com/ho-nl/m2-pwa/commit/bfc041d39e34faf60581dbdba7a15a32928368b3))
- **image:** fix build ([b730cb6](https://github.com/ho-nl/m2-pwa/commit/b730cb6ae4e50dcf2f60e2046d6acf3047caacb3))
- **image:** make sure unoptimized images are preloaded correctly and remove preloads from lots of images ([fb2b4fc](https://github.com/ho-nl/m2-pwa/commit/fb2b4fcb5336ff880a9b32775847d7b6738ba1ea))
- implement next-ui barrel imports ([75bea70](https://github.com/ho-nl/m2-pwa/commit/75bea703dba898f18a2a1dfa3243ebd0a4e6f0e1))
- index page video and image overlay fix ([53c9d70](https://github.com/ho-nl/m2-pwa/commit/53c9d70bae1229c44f6a45730abe47482d0b9ac2))
- input checkmarks ([279c1c1](https://github.com/ho-nl/m2-pwa/commit/279c1c112ada46fdea102024298e8293d1a23293))
- introduced SvgImageSimple and solve issue with review chips ([931d7fd](https://github.com/ho-nl/m2-pwa/commit/931d7fdcf0faa9d2264899b72e564138215b6bd8))
- janky animation for last block on homepage ([a572986](https://github.com/ho-nl/m2-pwa/commit/a572986d87ee450badf96ef6608f75f30f71ed5b))
- labelInnerContainer sectionHeader overwrite ([293f97b](https://github.com/ho-nl/m2-pwa/commit/293f97bf86f43aa6b7807ef96eec0c1826b8438a))
- layout of home ([e2dcacf](https://github.com/ho-nl/m2-pwa/commit/e2dcacf6758a8149346e65e00ef1039cde536db4))
- localized routes didn’t have the correct transition ([ab11c92](https://github.com/ho-nl/m2-pwa/commit/ab11c92c694e1c7330ffd520f8181a3ee2f82287))
- lower image quality for 3g ([be1c7fe](https://github.com/ho-nl/m2-pwa/commit/be1c7fe75d8e2c8e40acad7865b70e45ce5ad5df))
- make fonts more default ([cba1d90](https://github.com/ho-nl/m2-pwa/commit/cba1d90578db33d3458c126bf4932312eed05271))
- make sense of spacings for mobile navigation ([bd42c97](https://github.com/ho-nl/m2-pwa/commit/bd42c973753cd3e09ae8599bfef677979bae21f6))
- make sure sessionVar isn’t throwing a ts error ([a7ae141](https://github.com/ho-nl/m2-pwa/commit/a7ae141f5908dfad0c1a75b47350e2b3a4e364a1))
- make sure the apollo.config.js works as expected ([3c417fa](https://github.com/ho-nl/m2-pwa/commit/3c417fae82bc5db25f482b4092b13db5609b7431))
- make sure the component is still mounted for PictureResponsive ([6bebcd3](https://github.com/ho-nl/m2-pwa/commit/6bebcd37ff05397c2da6a2be1babc3ae3c17051a))
- make sure the ExpandableGallery is always on top ([06de050](https://github.com/ho-nl/m2-pwa/commit/06de0501ec3880fa62c702f328b7ffe8cfccb761))
- make sure the first resize also works properly ([41105c3](https://github.com/ho-nl/m2-pwa/commit/41105c3d0eee92690526f256821384c7e21f46b3))
- make sure the image is sized correctly ([096f1bf](https://github.com/ho-nl/m2-pwa/commit/096f1bf354001d80d45b50010a114832adf9701a))
- make sure the image scales correctly ([595321b](https://github.com/ho-nl/m2-pwa/commit/595321b3c20f26ff94c59d42854e3a724b80c3eb))
- make sure the ToggleButton doesn’t change it’s border width when disabled ([bfd017f](https://github.com/ho-nl/m2-pwa/commit/bfd017f2d4212941c258565059a302596fec5bcf))
- make sure useMutationFormPersist only save diffs ([d50a796](https://github.com/ho-nl/m2-pwa/commit/d50a7960950923f6309eed2624442f158ece5870))
- make sure we can drag any clickable element ([25e3b72](https://github.com/ho-nl/m2-pwa/commit/25e3b72c4386a91f960f333f1a2f9d36fb80ed60))
- make sure we disable the animating property on ExpandableGallery ([197e6df](https://github.com/ho-nl/m2-pwa/commit/197e6df9762f26138ac2cab03e9741babd4cb93f))
- make sure we preload the right image for moto 3g ([55aa6c2](https://github.com/ho-nl/m2-pwa/commit/55aa6c2358db86199d83235a78af8bc295d83a6f))
- make sure we remove the scrollbar only when the animation completes ([aa629e0](https://github.com/ho-nl/m2-pwa/commit/aa629e06b7b13e4cd85332cd6dcfbe8ae973a7f5))
- make sure we render the simplest possible image dependening on the src ([84b322d](https://github.com/ho-nl/m2-pwa/commit/84b322dca776fa80d9e5780b0965006dc0ec4f84))
- make the SingleItemSlider working ([aa1e4b3](https://github.com/ho-nl/m2-pwa/commit/aa1e4b3b7cd35589b2c8c776c99526eefc6ce7e5))
- **message-snackbar:** close on action click ([146c232](https://github.com/ho-nl/m2-pwa/commit/146c232a3a0e78b2be68631b0461e7b4699b99e1))
- minor fixes ([9b7cb41](https://github.com/ho-nl/m2-pwa/commit/9b7cb410659a70042a86b00e89c1dd3b2fe0ff43))
- missing alt tag ([bcdee67](https://github.com/ho-nl/m2-pwa/commit/bcdee67b1b4d36530af54b13ba991edc27464b61))
- my account mobile view ([1fc48e0](https://github.com/ho-nl/m2-pwa/commit/1fc48e0ff7470f5904492619d96315db19dcc42b))
- narrow quote on mobile ([e06ccc2](https://github.com/ho-nl/m2-pwa/commit/e06ccc25048124431dcdb786f1719f688a5e429c))
- **next-ui:** remove decoding=async from images, causes flash when upgrading image ([7719072](https://github.com/ho-nl/m2-pwa/commit/7719072c020390b9b921657527efb1f838e95775))
- **next-ui:** toggle button stylign ([c806d35](https://github.com/ho-nl/m2-pwa/commit/c806d358aed030c54d568275ee497f8cb9b01359))
- **next-ui:** ToggleButton throws because ‘selected’ can’t be passed to Button ([dccedc6](https://github.com/ho-nl/m2-pwa/commit/dccedc68d43385d2f93ef972c65fb8169574b6e4))
- no search results message ([2ecd6e3](https://github.com/ho-nl/m2-pwa/commit/2ecd6e36481e546dc78acfb46dfff08dcfdd8e6a))
- only cart should be fixed on scroll ([9c8f536](https://github.com/ho-nl/m2-pwa/commit/9c8f5366c53798b377dcf397822b0945774b1dce))
- page keeps reloading after each change in @graphcommerce/next-ui ([45ff0f5](https://github.com/ho-nl/m2-pwa/commit/45ff0f51d87e2100faefad93d5d224a8761e6e75))
- pagination markup ([0ab7707](https://github.com/ho-nl/m2-pwa/commit/0ab7707aa4cbf49c5df1da3e806641a840ec2aff))
- pagination showed wrong chevron ([8b0d027](https://github.com/ho-nl/m2-pwa/commit/8b0d027cc2a59dfed6e144c9bcb28b1258e2aa08))
- prevent variable imagesizes ([c707bc7](https://github.com/ho-nl/m2-pwa/commit/c707bc7dcabb26982a7f9a621ff9fbb5515c05cf))
- primary button height ([741279e](https://github.com/ho-nl/m2-pwa/commit/741279e1c92845f067af5ad63adec04b05936fcc))
- prop types ([caccb1a](https://github.com/ho-nl/m2-pwa/commit/caccb1ab4c459642b64498dde22c372fd890f0c7))
- pwa theme color ([6f51e58](https://github.com/ho-nl/m2-pwa/commit/6f51e586519b1b1e58ee13ed7d3255a26e1e0734))
- quantity value not shown in cart item ([d6421aa](https://github.com/ho-nl/m2-pwa/commit/d6421aa5383e095a5c1615595b28b5341238d1ce))
- quantity value not shown in cart items ([013f58c](https://github.com/ho-nl/m2-pwa/commit/013f58cde1e5cc3f7131e5d87f51fdb37d51f784))
- react-hook-form watch with react-fast-refresh ([5d7dfc9](https://github.com/ho-nl/m2-pwa/commit/5d7dfc9ae394d2d2dca3c78d037337ce454edc00))
- **react-hook-form:** handle ComposedForm network errors ([e028ae0](https://github.com/ho-nl/m2-pwa/commit/e028ae06f49fea5d4e4dbdf58f803b365c902404))
- really fix variable imagesizes ([0312ab1](https://github.com/ho-nl/m2-pwa/commit/0312ab18bc2aa32a2ba21da44a064d03bf1b0f04))
- ref couldn't be forwarded for ShippingAddressForm ([1f90f1a](https://github.com/ho-nl/m2-pwa/commit/1f90f1a30437d656fcf841026ad13bb2b45d831b))
- relative time format ([64b9bc5](https://github.com/ho-nl/m2-pwa/commit/64b9bc54c7bc2792bb32560eec20ed138f04b147))
- remove breaking/unused import ([cafd73a](https://github.com/ho-nl/m2-pwa/commit/cafd73ab0e2170b7e7783a30c5e2a87c06de8f46))
- remove canonical metatag when no canonical is given ([167b7f0](https://github.com/ho-nl/m2-pwa/commit/167b7f080f98a10ff35cbd760b24b8198aac6518))
- remove component specific Row ([fcad430](https://github.com/ho-nl/m2-pwa/commit/fcad430ba01b215e77abb2c1ae01071a8ea1ec55))
- remove component specific Rows ([ed60655](https://github.com/ho-nl/m2-pwa/commit/ed60655ffca8e4578cf2627bf0a9428fd9a79337))
- remove conflicting files ([0c17ae4](https://github.com/ho-nl/m2-pwa/commit/0c17ae46be62b775ac83b35f11c532ce2d9401a3))
- remove max width from containers ([afff6f3](https://github.com/ho-nl/m2-pwa/commit/afff6f30c0544fff72b81cbcdd4e3acbb6a52b49))
- remove run up and run down from textinputnumber ([1a30341](https://github.com/ho-nl/m2-pwa/commit/1a30341fcb03b1d7c7963df91045cadd6f235e1b))
- removed unnecessary pixelsize prop ([4921fa0](https://github.com/ho-nl/m2-pwa/commit/4921fa09c20cd7ebb8fd82c66e687cd6f6c380e9))
- rename NextButton to Button, change imports ([976adb0](https://github.com/ho-nl/m2-pwa/commit/976adb0bf906310d1efce888dcc9be1e28ce0f1b))
- replace captionOldOld with overline ([c19bc8a](https://github.com/ho-nl/m2-pwa/commit/c19bc8aee829432a8c72d0d4bc9d266110af65ab))
- **review:** make sure chip is rendered correctly ([387df34](https://github.com/ho-nl/m2-pwa/commit/387df3456973290f9ce98d47823a7c71a6d95850))
- ripple effect icon blocks ([7b6a833](https://github.com/ho-nl/m2-pwa/commit/7b6a8332145e179cba6024f83166e8be494e81ed))
- scrollbar layout shift when using layered nav ([f51f285](https://github.com/ho-nl/m2-pwa/commit/f51f28572e1f0116ef46869bd3eb988585e0d5b9))
- search page white background ([8676bfa](https://github.com/ho-nl/m2-pwa/commit/8676bfa30273b4d5f41b708b2ac45474d2e31e65))
- **search-page:** hide menu and cart fabs when opened virtual keyboard mobile ([e728768](https://github.com/ho-nl/m2-pwa/commit/e7287680545f33079d0af47df1c6ea519b208978))
- set the height of the sliderimage ([9a118a0](https://github.com/ho-nl/m2-pwa/commit/9a118a08092592ed098deebb35e6d28fce071495))
- **sheet-shell-header:** adjust mobile height ([c4310ff](https://github.com/ho-nl/m2-pwa/commit/c4310fff4314aa0121906aa4694af32f77ff12c8))
- SheetPrimaryAction doesn’t accept a ref ([d4b4ae2](https://github.com/ho-nl/m2-pwa/commit/d4b4ae2721144ece22180dfe10bde0b0437f2454))
- show prev/next buttons only when necessary ([f97cbe3](https://github.com/ho-nl/m2-pwa/commit/f97cbe3a01cf2593d3a94596f13e977831b79b76))
- sidebar gallery width ([7185850](https://github.com/ho-nl/m2-pwa/commit/71858500d5b62e1d2130d236247fc06fd80649f9))
- since all links are of next/link we need to add passHref for custom components ([16fb931](https://github.com/ho-nl/m2-pwa/commit/16fb93100d367203ea79bb4f93357221253f2ecd))
- small icon size was too large ([61a4bc7](https://github.com/ho-nl/m2-pwa/commit/61a4bc72ad88a5df764d100a78ba26635c35e035))
- solve page refresh issue ([08086d9](https://github.com/ho-nl/m2-pwa/commit/08086d9dede3c3c78d8f7a674628e14b08667995))
- spacing consistency between app shells ([c57ad81](https://github.com/ho-nl/m2-pwa/commit/c57ad81a1784ca6737ccfa0d7d33c3a5d19d1654))
- spacing on message snackbar ([0899321](https://github.com/ho-nl/m2-pwa/commit/0899321a3ea74a2d4c714e2dbe17c785a07dfc11))
- spacings ([332954f](https://github.com/ho-nl/m2-pwa/commit/332954f92f62ff57391192242fb95e26c6de1aae))
- spacings ([9aab8fb](https://github.com/ho-nl/m2-pwa/commit/9aab8fbdec6afb9ff06f2c66ef00bf0050192b05))
- star rating styling ([0a484d9](https://github.com/ho-nl/m2-pwa/commit/0a484d99e91aa3dbb531344c8d01c11ce3f09244))
- style for snackbar on smaller resolution ([b53473f](https://github.com/ho-nl/m2-pwa/commit/b53473fc5e0aac5819d2c51882a260d108255af9))
- SvgSimpleImage sizing didn't use rem ([1ba07a5](https://github.com/ho-nl/m2-pwa/commit/1ba07a5694bd60ad3cee2e8102814643d2a7c79d))
- tags styling ([1a4bcf2](https://github.com/ho-nl/m2-pwa/commit/1a4bcf2e339647cc93120ea9f951253a4e138142))
- title offset ([2fef3ea](https://github.com/ho-nl/m2-pwa/commit/2fef3ea10ad98467062d4de397b40a83a86d7102))
- transparent filters on hover ([9ca0b71](https://github.com/ho-nl/m2-pwa/commit/9ca0b71928ea34d55c75fce760f29600ec171a43))
- unresponsive back button ([91d66d7](https://github.com/ho-nl/m2-pwa/commit/91d66d762281ef9e9ffe800bb68530073a3d76f1))
- use CSS grid to align pagination ([b9eea01](https://github.com/ho-nl/m2-pwa/commit/b9eea01f842f82189e61f3ac75b6096c2eb2c32b))
- use semantically correct components for menufab ([0196b29](https://github.com/ho-nl/m2-pwa/commit/0196b29523b3f49294dde32d96b348d100de5fa8))
- use SvgImageSimple for multiple areas ([bf851a6](https://github.com/ho-nl/m2-pwa/commit/bf851a6740e1956a78f457c2d90904ee2f65da2f))
- useMutationForm can handle hard GraphQL errors (fields missing etc.) ([e6e6f78](https://github.com/ho-nl/m2-pwa/commit/e6e6f7843a3b88a31c858c160262dc2f072209b9))
- using dynamic values in filter row & behaviour bugfixes with ‘too long filter row’ ([ffdb6ac](https://github.com/ho-nl/m2-pwa/commit/ffdb6acaa000bf455e2aff008aadbc25e1bdb12d))
- vertical align full page message ([b74af1d](https://github.com/ho-nl/m2-pwa/commit/b74af1da88e62cf2aaeae48f727a2f01b12b7850))
- white space after footer on category page ([0fe13a4](https://github.com/ho-nl/m2-pwa/commit/0fe13a4daa284546487dfafcfa93daa8cbcd827b))
- white space below divider on sheet shells ([1159f20](https://github.com/ho-nl/m2-pwa/commit/1159f20452b308f6301749492765af066ab3d673))
- wishlist icon ([5d99ab7](https://github.com/ho-nl/m2-pwa/commit/5d99ab726eda56f0f9aa906914a8204c8f2ec87b))
- write review button mobile styles ([8f6b883](https://github.com/ho-nl/m2-pwa/commit/8f6b883fa0a513f84b7c6d8ed376b0e8d4b8a3bd))
- wrong bottom overlay ui animation ([f2033f8](https://github.com/ho-nl/m2-pwa/commit/f2033f8505884fb5c0efb34ea2396454fb223a4d))
- yarn workspace packages hot reload ([d03fc9f](https://github.com/ho-nl/m2-pwa/commit/d03fc9fdda3486476761786f2b56a934cc92befc))
- zIndex issue OverlayUi ([9dd0892](https://github.com/ho-nl/m2-pwa/commit/9dd089236e912b8cd1f1c0987e46fafb43885c67))

### Features

- add add-to-cart snackbar message ([0644de5](https://github.com/ho-nl/m2-pwa/commit/0644de5acccada024eda2b5c92b52536a1da5385))
- add add-to-cart snackbar to all products ([e9570fd](https://github.com/ho-nl/m2-pwa/commit/e9570fdb55331b2a790f8910c0722dba83480f64))
- Add blog pagination ([04bf2d0](https://github.com/ho-nl/m2-pwa/commit/04bf2d033f14bc159df7ec8a45aabd8ac5d4fd13))
- add blog tags to page ([bdc31af](https://github.com/ho-nl/m2-pwa/commit/bdc31af37e1b348f409dd347fe0c88581b0cf375))
- add Chip with author and publish date ([20a28a5](https://github.com/ho-nl/m2-pwa/commit/20a28a5c4fdbb4cd883b69459e13ac481bdf3a64))
- add default snackbar ([2ccdb26](https://github.com/ho-nl/m2-pwa/commit/2ccdb2661b7bfb6353ed23defcc626e652495514))
- add getFilterTypes to shared client, faster generation ([beccfde](https://github.com/ho-nl/m2-pwa/commit/beccfde6ebc8aaf6223f0e8b33fabf4f5039efed))
- add new customer address ([df7cbe9](https://github.com/ho-nl/m2-pwa/commit/df7cbe92f64ffa1ff0cdfde7fa9a5d74fb05f969))
- add party (tada) icon ([c5daf6f](https://github.com/ho-nl/m2-pwa/commit/c5daf6f78d77aad768c8414a97c76b185250ea87))
- add preload to first item for ProductListItemsBase ([a4e06bc](https://github.com/ho-nl/m2-pwa/commit/a4e06bcb4192596b25d509b61669cff9d8bfdee7))
- add sideDrawerUi component ([072642b](https://github.com/ho-nl/m2-pwa/commit/072642b8eb8e1162d257cee92a2c1f84fe101fd3))
- added decode=async to PictureResponsive ([c2ca558](https://github.com/ho-nl/m2-pwa/commit/c2ca558d9739b2efe45ccccb17e526005b5b9c81))
- added FramerNextPagesSlider for service pages ([282e249](https://github.com/ho-nl/m2-pwa/commit/282e249d5d487f04e1ab37b7551d4a65b5d20789))
- added FramerSlider ImageGallery example ([257cee1](https://github.com/ho-nl/m2-pwa/commit/257cee1660e85991f60fcd3f9d896a2a3e7e332b))
- added full height support for BottomDrawerUi ([d27b842](https://github.com/ho-nl/m2-pwa/commit/d27b842e387fcf514bb5cb27df829aef026c8f77))
- added prev/next keyboard handling ([8e7e42f](https://github.com/ho-nl/m2-pwa/commit/8e7e42fe6b12006612287736c972a2194854febe))
- animated cart rows and checkout stepper component ([5b3294d](https://github.com/ho-nl/m2-pwa/commit/5b3294d4a97c89d5c4690bbeac0814481babe3c9))
- animated filters ([846e233](https://github.com/ho-nl/m2-pwa/commit/846e233c9653821afbe9cfe7742dc42bb869a078))
- apollo error full page component ([fc1e695](https://github.com/ho-nl/m2-pwa/commit/fc1e695251a8792abaec5b9382e8301d3794cb6d))
- apollo error full page on account pages ([ed8c80f](https://github.com/ho-nl/m2-pwa/commit/ed8c80ffa66094e5aee3b0ca830436d863a85e82))
- **app-shell-title:** support typography variants ([74ed6a4](https://github.com/ho-nl/m2-pwa/commit/74ed6a4982bf6f43aa7f6b3771f919156653336c))
- **app-shell:** now consistent ([fb5b506](https://github.com/ho-nl/m2-pwa/commit/fb5b5062729002b508e888a4962f1b2578e5199b))
- barrel file for next-ui components ([04737e0](https://github.com/ho-nl/m2-pwa/commit/04737e02bc36d0b6293a704463023de161a5b89a))
- better 404 handling and simplified getStaticProps ([321ace1](https://github.com/ho-nl/m2-pwa/commit/321ace1850642ee3eddfa674c37e6fca8adcdb74))
- better handling of shipping options ([9598f9b](https://github.com/ho-nl/m2-pwa/commit/9598f9bf5c523dfa2f043e6df42ce5e33aa218db))
- **button:** pill-link variant ([a6d837a](https://github.com/ho-nl/m2-pwa/commit/a6d837adf73fedb4490d9eafb1a7b87e9931ecb3))
- cart fab on mobile ([bd2e9eb](https://github.com/ho-nl/m2-pwa/commit/bd2e9ebe056ba9a81b5c7228f1e5be57171266f4))
- **cart:** when a cart is not active anymore show a clear cart button ([5d04a14](https://github.com/ho-nl/m2-pwa/commit/5d04a14726c040b20b34c0b88f923aee1dff22e5))
- checkout email added ([452a953](https://github.com/ho-nl/m2-pwa/commit/452a95377e116bfa8b757d3ccc45cf2e4ac7cc51))
- configurable product form ([dae6f10](https://github.com/ho-nl/m2-pwa/commit/dae6f10e4b8655761900c7ce3028605efe8e154a))
- content header component ([9cf58cd](https://github.com/ho-nl/m2-pwa/commit/9cf58cd5ced3e89237fc04076aa0fae3618205ef))
- content header context ([95b010a](https://github.com/ho-nl/m2-pwa/commit/95b010a175b7e6875da928f4abe4c45fc5c9e942))
- **content-header:** text buttons on mobile - pill buttons on desktop ([1438838](https://github.com/ho-nl/m2-pwa/commit/1438838fbd2aac1e3510368f2a657314ebd05d2d))
- **content-header:** title animation based on header height ([3eae793](https://github.com/ho-nl/m2-pwa/commit/3eae793c660c64c0862257907f268ae85d5f6e54))
- convert account ([b2ad16a](https://github.com/ho-nl/m2-pwa/commit/b2ad16aeb054ff89688e9fcdd4b5f2081f88aa3c))
- created FramerSlider components ([586f140](https://github.com/ho-nl/m2-pwa/commit/586f140824718eacda41318b57af14bc02e2e3ea))
- created stacked-pages package ([d86008e](https://github.com/ho-nl/m2-pwa/commit/d86008ee659ccb25b194a41d624b394a1ddbd088))
- data agnostic animated header ([17047a6](https://github.com/ho-nl/m2-pwa/commit/17047a6d754494d9443c8f2e486cc232cf199c45))
- detailed cart view ([3a7126c](https://github.com/ho-nl/m2-pwa/commit/3a7126c08a1be580a1d9bba86951e11558cb0e5b))
- divided links component ([14be359](https://github.com/ho-nl/m2-pwa/commit/14be35984b697dc3f182e3767f0d2e294a65e25d))
- form styling consistency ([87cba85](https://github.com/ho-nl/m2-pwa/commit/87cba85e828fa42a02dfe74ac841aa2b39a60f4e))
- framer slider gallery for product view ([43f5c67](https://github.com/ho-nl/m2-pwa/commit/43f5c678f5f075372d5b02c87858d858cde6ce4e))
- **framer-next-page:** introduced SheetHeader ([dd6949f](https://github.com/ho-nl/m2-pwa/commit/dd6949fd027f6ec984f4de44fe75b36265f44906))
- **framer-next-pages:** added useCloseOverlay hook to close multiple steps at once ([55b7473](https://github.com/ho-nl/m2-pwa/commit/55b74730e64060c20072bf10f34d346964edc51f))
- **framer-next-pages:** implemented the FullPageShell for the remaining pages ([88386b4](https://github.com/ho-nl/m2-pwa/commit/88386b4652abb7765d6e755c7fb7a3cb6285a0e7))
- **framer-scroller:** add prev/next buttons to SidebarSlider ([00472e5](https://github.com/ho-nl/m2-pwa/commit/00472e5fe3c3c5408db358c0c78a3559cea902ca))
- **framer-scroller:** added the new slider to the product page ([3c6b726](https://github.com/ho-nl/m2-pwa/commit/3c6b7262fb6418798f828f4517ed097fd9734e96))
- **framer-scroller:** implemented the scroller on all pages ([73fb518](https://github.com/ho-nl/m2-pwa/commit/73fb518eff74edb2b3212e892b3d8cc2b088011b))
- **framer-scroller:** package to implement scroll-snap handling with JS ([b3a279f](https://github.com/ho-nl/m2-pwa/commit/b3a279f8b4acb2b9de99004efe0459c534786bdd))
- FramerSlider support resizing of slider ([8209e98](https://github.com/ho-nl/m2-pwa/commit/8209e980419c9e53e43910be965862cdebe6fbe5))
- friendly no orders message in my account ([46a25b6](https://github.com/ho-nl/m2-pwa/commit/46a25b64ad94540cdaff948557374e9db99cc588))
- full page message component ([659d4ca](https://github.com/ho-nl/m2-pwa/commit/659d4ca8241c88907b5a7aaed29efe25a8d0f82d))
- full page ui back and menu button position swap ([93b3419](https://github.com/ho-nl/m2-pwa/commit/93b34197947d133f4d1480c4ce68a0302201b858))
- full page ui desktop variant ([a70f301](https://github.com/ho-nl/m2-pwa/commit/a70f3013da36fa131f82fb44457b107fb7705df6))
- **FullPageUi:** make backFallbackTitle and backFallbackHref required ([7e65bc7](https://github.com/ho-nl/m2-pwa/commit/7e65bc769ad5071d797481d143f9757611408c1d))
- **graphql:** introduced new graphql package that holds all generated files ([a3e7aa0](https://github.com/ho-nl/m2-pwa/commit/a3e7aa05540540533b5ced9a95f1f802ecbe499f))
- groundwork for complete reimplementation of product pages ([b224da8](https://github.com/ho-nl/m2-pwa/commit/b224da8273eb5c8173ad30d006391b2291331623))
- **image:** introduced completely rewritten Image component ([e3413b3](https://github.com/ho-nl/m2-pwa/commit/e3413b3a57392d6571ea64cb8d9c8dca05ea31df))
- implement ref forwarding for the PictureResponsive and PictureResponsiveNext ([5ce010c](https://github.com/ho-nl/m2-pwa/commit/5ce010cfd1edf3d726d4baf805d6a534d98f5f82))
- implement scrollSnapAlign: start | center | end ([d2c7c17](https://github.com/ho-nl/m2-pwa/commit/d2c7c17a5362b246755ffc7d05a7e722a95bcad8))
- implement sticky snackbar in needed places ([0426e73](https://github.com/ho-nl/m2-pwa/commit/0426e73ff7bb24cae656a082e15f36d5012c6653))
- implemented checkmo payment method ([18525b2](https://github.com/ho-nl/m2-pwa/commit/18525b2f4efe9bd0eea12a7a992d284f341e0c68))
- imported react-modal-sheet ([e3a76f7](https://github.com/ho-nl/m2-pwa/commit/e3a76f71a6c8f7b5cfc0766673265733040ba164))
- improved drawer stacking and stable layoutId support ([b5b0406](https://github.com/ho-nl/m2-pwa/commit/b5b040635993eb3da819606e94d3cd6fdaddb05c))
- introduce bottom drawer stacking ([e82de09](https://github.com/ho-nl/m2-pwa/commit/e82de0904b07093b27be2d660933dd3dc95188e7))
- introduce useFormPersist to complent useMutationFormPersist ([4e75217](https://github.com/ho-nl/m2-pwa/commit/4e75217f1c211a7ae159312ddbcc476d8c4064d9))
- introduced SheetShell as a shared layout component ([eb64f28](https://github.com/ho-nl/m2-pwa/commit/eb64f28fd05b69efbf14fa850c70b0f1da5c4237))
- introduced useFormPersist to store form values without submitting ([c042cdb](https://github.com/ho-nl/m2-pwa/commit/c042cdb6c3211d6354bad16b5b6503efe7321c42))
- introduces framer-next-pages and framer-sheet to next-ui and soxbase package ([e04ad8a](https://github.com/ho-nl/m2-pwa/commit/e04ad8a94cd1fd5a7c5575c9db7916b6e8a88f16))
- introducing useAutoSubmit for useForm to handle shipping address step ([d375a12](https://github.com/ho-nl/m2-pwa/commit/d375a123d5ba88285703fc1706a43c21c5a248d5))
- left and sidebar drawers ([12a3b72](https://github.com/ho-nl/m2-pwa/commit/12a3b72edfad38a4b82701ec502f2f4d85c40e53))
- login flow ([8132b1a](https://github.com/ho-nl/m2-pwa/commit/8132b1a9be7040c3e2f70f1c1d04e6a9d7840a91))
- major performance refactor ([03f8e2f](https://github.com/ho-nl/m2-pwa/commit/03f8e2fa16ef919bd6bd6eadd36922d0245ed960))
- make action optional in snackbar ([70cf9a4](https://github.com/ho-nl/m2-pwa/commit/70cf9a456e483040b2aad087a9cc01ecf85fe4c8))
- make bottom drawer dismissable by dragging ([ff8e575](https://github.com/ho-nl/m2-pwa/commit/ff8e575b51cebe92734e0c8f1ead77c127e9f8aa))
- **mesh:** use mesh with build version with increased stability/performance ([63863f3](https://github.com/ho-nl/m2-pwa/commit/63863f3a2df4d596819b85f3cf736c7f52f828c1))
- minimal page shell ([1693674](https://github.com/ho-nl/m2-pwa/commit/1693674631fc8438c60d9b74b73e607e08971a2d))
- new app shell components ([2db3b7a](https://github.com/ho-nl/m2-pwa/commit/2db3b7a646f45ac273679770715d23e3472e9d2c))
- new my account overview ([6de0761](https://github.com/ho-nl/m2-pwa/commit/6de0761c452e1ba5364345a168b400d90418b44e))
- **next-ui:** SectionContainer/SectionHeader now accepts variantLeft/variantRight as prop ([a58f8f2](https://github.com/ho-nl/m2-pwa/commit/a58f8f2962e74c9aaa41142524d42d9c8f662b8d))
- next.js 11 ([7d61407](https://github.com/ho-nl/m2-pwa/commit/7d614075a778f488045034f74be4f75b93f63c43))
- overlay ui component ([227eedc](https://github.com/ho-nl/m2-pwa/commit/227eedcdace65b77390f635398e9d5a56249df6b))
- pictureResponsiveNext svg support ([3872620](https://github.com/ho-nl/m2-pwa/commit/3872620aba45645110b4691cc0cd9bdf86ec1266))
- PictureResponsiveNext: lossy compression for gifs ([cb9d279](https://github.com/ho-nl/m2-pwa/commit/cb9d279a6a8b8acde4deafc13bad8a39fc7969d0))
- PictureResppnsive: support loading=eager, single img tag instead of picture ([2836f4c](https://github.com/ho-nl/m2-pwa/commit/2836f4cdc8499b0b422b30d8683f8ef0715ffff5))
- **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
- product page review pagination ([4e18395](https://github.com/ho-nl/m2-pwa/commit/4e18395944c08e195fd09192086301c695d044ed))
- quick checkout component on cart page ([0eaafe5](https://github.com/ho-nl/m2-pwa/commit/0eaafe510da3a473b9888707a198361db9b65e06))
- redirect page/1 to /blog ([7ad1eaf](https://github.com/ho-nl/m2-pwa/commit/7ad1eafe2c3046706392f23a7c29b8263288d417))
- reduced page shell component ([7e0b0a1](https://github.com/ho-nl/m2-pwa/commit/7e0b0a1471795f47e2f0f876b0e09cb65b053c2a))
- reimplemented RowSwipeableGrid ([a9131de](https://github.com/ho-nl/m2-pwa/commit/a9131dea19347db2985ee3864e460dfa8a3f2182))
- remove wrapper div from ScrollSnapSlider ([476add8](https://github.com/ho-nl/m2-pwa/commit/476add8db64811f2c7e3fc482487967cd7573cf6))
- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of [@reachdigital](https://github.com/reachdigital) ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
- **reviews:** no reviews written message ([8ade3db](https://github.com/ho-nl/m2-pwa/commit/8ade3dbe830f5a59af09c002dfa38fa5349a4b61))
- RowSwipable ([8908ff6](https://github.com/ho-nl/m2-pwa/commit/8908ff62fbd82695e9a80d2d89cde6cecb19d260))
- SidebarSlider added and implemented ([188f7e3](https://github.com/ho-nl/m2-pwa/commit/188f7e38cad3729a1424a3a808fda9cdd51a6954))
- standalone Blog Title ([311a468](https://github.com/ho-nl/m2-pwa/commit/311a4688833e054660c57e06dc98176163f3d14f))
- sticky footer ([1547cab](https://github.com/ho-nl/m2-pwa/commit/1547cab694c0ebf7cf9acb57817a5fe5565f10fd))
- svgimage component ([f369605](https://github.com/ho-nl/m2-pwa/commit/f3696051e381a24c543fd24e199da5b17f9e124f))
- **theme:** restructured fonts and applied to home and category page ([6adf5f1](https://github.com/ho-nl/m2-pwa/commit/6adf5f11321bdfbf499125f1161c5abf5a1bfe4a))
- **theme:** restructured typography ([6fcddae](https://github.com/ho-nl/m2-pwa/commit/6fcddae6b1b54d071475c59c80a9f8d8a36294d5))
- time ago component ([bf3ca85](https://github.com/ho-nl/m2-pwa/commit/bf3ca852e66d53041ef9f535724b19376c5648ca))
- tweak app performance ([cde0a9b](https://github.com/ho-nl/m2-pwa/commit/cde0a9bda1560b354e9adde3c022e3fddb71ea69))
- upgrade to node 14 ([d079a75](https://github.com/ho-nl/m2-pwa/commit/d079a751e9bfd8dc7f5009d2c9f31c336a0c96ab))
- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))
- use LazyMotion configuration for better bundle splitting ([f043eb7](https://github.com/ho-nl/m2-pwa/commit/f043eb72a3fbe698644afdfe80a4915db142eebc))
- use official nextjs image endpoint ([0e76ab4](https://github.com/ho-nl/m2-pwa/commit/0e76ab4cece15d4d6f192cb938588a34abaebe8a))
- useFormPersist, useFormAutoSubmit, useFormGqlMutation everywhere ([e591285](https://github.com/ho-nl/m2-pwa/commit/e5912854babee87c8efc5b7c00455d61b301aad3))
- useMutationFormPersist to save form field values for current session ([f26197d](https://github.com/ho-nl/m2-pwa/commit/f26197dce51bf76450775dd6ed8ce2b17d70ee55))
- view list of blogposts tagged ([9efe088](https://github.com/ho-nl/m2-pwa/commit/9efe0884d43e0dc63e614f625b81e6f8b3f1dc50))
- working on EmailForm ([f16141f](https://github.com/ho-nl/m2-pwa/commit/f16141f8cc0dfeaef8dee2a3e635bda898550a51))
- working on shipping-method step ([d89a072](https://github.com/ho-nl/m2-pwa/commit/d89a072298baa20bfa0ac7a2a885c40728a23edb))

### Reverts

- Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

## 2.0.8 (2020-10-28)

### Bug Fixes

- make sure themes extensions are found ([5aa18db](https://github.com/ho-nl/m2-pwa/commit/5aa18db514fd2e2f50681367e39523f8e742ece0))

### Features

- added generated graphql.ts files ([3e44415](https://github.com/ho-nl/m2-pwa/commit/3e44415b018e74b502e9e98479aa5e84041f337d))
- split into packages ([2ee7fd6](https://github.com/ho-nl/m2-pwa/commit/2ee7fd6c0056f467d114f04d92c6c0ddf622d151))

### BREAKING CHANGES

- huge folder structure refactor, please read README to reinstall

# Change Log

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.112.6](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.112.5...@graphcommerce/next-ui@2.112.6) (2021-09-24)

### Bug Fixes

- all disabled buttons have white text ([358114d](https://github.com/ho-nl/m2-pwa/commit/358114ddff5d7ffa51c30f6a6e7787e88d5e4c5c))
- **message-snackbar:** close on action click ([146c232](https://github.com/ho-nl/m2-pwa/commit/146c232a3a0e78b2be68631b0461e7b4699b99e1))

## [2.112.5](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.112.4...@graphcommerce/next-ui@2.112.5) (2021-09-24)

### Bug Fixes

- **chip-menu:** layout shift on open ([c65cf5b](https://github.com/ho-nl/m2-pwa/commit/c65cf5bc18864b5180aba3f2361399bd85967952))

## [2.112.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.112.2...@graphcommerce/next-ui@2.112.3) (2021-09-23)

## [2.112.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.112.2...@graphcommerce/next-ui@2.112.3) (2021-09-23)

### Bug Fixes

- do not use ToggleButtonGroup, only use the ToggleButton ([5172f70](https://github.com/ho-nl/m2-pwa/commit/5172f709ee26122b0a8700afb4325f23cb9ba9b9))
- **Form:** forms always have background ([1f3fa1e](https://github.com/ho-nl/m2-pwa/commit/1f3fa1e53a997b88512335dc344bff3fa24f6bc6))

## [2.112.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.112.1...@graphcommerce/next-ui@2.112.2) (2021-09-20)

### Bug Fixes

- header app shell margin bottom in some circumstances ([6030ba7](https://github.com/ho-nl/m2-pwa/commit/6030ba7d07619d0b877a9f557c3e14676c326c7a))

# [2.112.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.111.0...@graphcommerce/next-ui@2.112.0) (2021-09-01)

### Bug Fixes

- **framer-slider:** prev/next buttons don't always show up correctly ([ba2510e](https://github.com/ho-nl/m2-pwa/commit/ba2510ea659344a2d71957eed396f4e5ce536a8c))
- sidebar gallery width ([7185850](https://github.com/ho-nl/m2-pwa/commit/71858500d5b62e1d2130d236247fc06fd80649f9))

### Features

- **framer-scroller:** add prev/next buttons to SidebarSlider ([00472e5](https://github.com/ho-nl/m2-pwa/commit/00472e5fe3c3c5408db358c0c78a3559cea902ca))

# [2.111.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.110.1...@graphcommerce/next-ui@2.111.0) (2021-09-01)

### Bug Fixes

- chipmenu styling ([dcdbbcc](https://github.com/ho-nl/m2-pwa/commit/dcdbbccceb2226de5067b14414f3d4ff5e016a5b))
- **framer-scroller:** center the prev/next buttons on the gallery ([234dc37](https://github.com/ho-nl/m2-pwa/commit/234dc37fc46f723410e9a844bbcb33cfe5d8a588))
- make sure we remove the scrollbar only when the animation completes ([aa629e0](https://github.com/ho-nl/m2-pwa/commit/aa629e06b7b13e4cd85332cd6dcfbe8ae973a7f5))

### Features

- **framer-scroller:** added the new slider to the product page ([3c6b726](https://github.com/ho-nl/m2-pwa/commit/3c6b7262fb6418798f828f4517ed097fd9734e96))
- **framer-scroller:** implemented the scroller on all pages ([73fb518](https://github.com/ho-nl/m2-pwa/commit/73fb518eff74edb2b3212e892b3d8cc2b088011b))
- **framer-scroller:** package to implement scroll-snap handling with JS ([b3a279f](https://github.com/ho-nl/m2-pwa/commit/b3a279f8b4acb2b9de99004efe0459c534786bdd))

## [2.110.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.110.0...@graphcommerce/next-ui@2.110.1) (2021-08-30)

### Bug Fixes

- **app-shell-header:** show fallbacktitle instead of back on back button when applicable ([27d7d7d](https://github.com/ho-nl/m2-pwa/commit/27d7d7d716265c856cd64d3f485f0227f99c5cd0))

# [2.110.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.109.2...@graphcommerce/next-ui@2.110.0) (2021-08-27)

### Bug Fixes

- adjust header height ([d22310d](https://github.com/ho-nl/m2-pwa/commit/d22310dca282208c6d7020c6c27f8ba5be980e3c))
- app shell consistency ([e062c3d](https://github.com/ho-nl/m2-pwa/commit/e062c3d4af75c6bfe1ad7056dfb172277f1b01cb))
- app shell consistency wip ([be995ca](https://github.com/ho-nl/m2-pwa/commit/be995ca5c3e383b89fea3759186d53af4790e99b))
- app shell fixes ([1b13d0d](https://github.com/ho-nl/m2-pwa/commit/1b13d0d0d4b480ddc9712b4d298af2d81fb2b1d4))
- app shell fixes ([c3bddee](https://github.com/ho-nl/m2-pwa/commit/c3bddee6b878cd9d2183c4938df0824a6eca4f36))
- app shell header scroll spacings ([b1f5706](https://github.com/ho-nl/m2-pwa/commit/b1f570697bb0a9207129c9d24623b6069cf38ab5))
- app shell tests ([10b58bd](https://github.com/ho-nl/m2-pwa/commit/10b58bd1a0271ef5d90a51394a9efd194b285ed0))
- **app-shell-header:** hide divider ([34d183e](https://github.com/ho-nl/m2-pwa/commit/34d183e7ee13c3e6d76bc211d44398cb7e492d67))
- **app-shell:** pages after app shell changes ([fb74510](https://github.com/ho-nl/m2-pwa/commit/fb74510121f6124009db72ad2ddebf6459c52a85))
- primary button height ([741279e](https://github.com/ho-nl/m2-pwa/commit/741279e1c92845f067af5ad63adec04b05936fcc))
- search page white background ([8676bfa](https://github.com/ho-nl/m2-pwa/commit/8676bfa30273b4d5f41b708b2ac45474d2e31e65))
- **sheet-shell-header:** adjust mobile height ([c4310ff](https://github.com/ho-nl/m2-pwa/commit/c4310fff4314aa0121906aa4694af32f77ff12c8))
- title offset ([2fef3ea](https://github.com/ho-nl/m2-pwa/commit/2fef3ea10ad98467062d4de397b40a83a86d7102))
- white space below divider on sheet shells ([1159f20](https://github.com/ho-nl/m2-pwa/commit/1159f20452b308f6301749492765af066ab3d673))

### Features

- **app-shell-title:** support typography variants ([74ed6a4](https://github.com/ho-nl/m2-pwa/commit/74ed6a4982bf6f43aa7f6b3771f919156653336c))
- **app-shell:** now consistent ([fb5b506](https://github.com/ho-nl/m2-pwa/commit/fb5b5062729002b508e888a4962f1b2578e5199b))

## [2.109.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.109.1...@graphcommerce/next-ui@2.109.2) (2021-08-26)

### Bug Fixes

- **button:** pill link not visible on mobile ([c4474f5](https://github.com/ho-nl/m2-pwa/commit/c4474f5cfe4dbb6b9aa795d7d175dbce053720d8))
- cart styling ([56feeee](https://github.com/ho-nl/m2-pwa/commit/56feeeeb85657d8abfec1e9613f12bf9d54686b5))

## [2.109.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.109.0...@graphcommerce/next-ui@2.109.1) (2021-08-19)

### Bug Fixes

- app shell sticky overlapping buttons on scroll ([7548b30](https://github.com/ho-nl/m2-pwa/commit/7548b30718290d976f4839f0096fea432f9a6b45))
- white space after footer on category page ([0fe13a4](https://github.com/ho-nl/m2-pwa/commit/0fe13a4daa284546487dfafcfa93daa8cbcd827b))

# [2.109.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.108.3...@graphcommerce/next-ui@2.109.0) (2021-08-17)

### Bug Fixes

- **search-page:** hide menu and cart fabs when opened virtual keyboard mobile ([e728768](https://github.com/ho-nl/m2-pwa/commit/e7287680545f33079d0af47df1c6ea519b208978))

### Features

- left and sidebar drawers ([12a3b72](https://github.com/ho-nl/m2-pwa/commit/12a3b72edfad38a4b82701ec502f2f4d85c40e53))

## [2.108.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.108.1...@graphcommerce/next-ui@2.108.2) (2021-08-13)

### Bug Fixes

- ref couldn't be forwarded for ShippingAddressForm ([1f90f1a](https://github.com/ho-nl/m2-pwa/commit/1f90f1a30437d656fcf841026ad13bb2b45d831b))

# [2.108.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.107.0...@graphcommerce/next-ui@2.108.0) (2021-08-13)

### Features

- **mesh:** use mesh with build version with increased stability/performance ([63863f3](https://github.com/ho-nl/m2-pwa/commit/63863f3a2df4d596819b85f3cf736c7f52f828c1))

# [2.107.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.106.0...@graphcommerce/next-ui@2.107.0) (2021-08-12)

### Bug Fixes

- account tweaks ([26ca295](https://github.com/ho-nl/m2-pwa/commit/26ca2955fe7a3ed509aaa7df98cbb4854d636179))
- grid blowout on homepage ([8c0e225](https://github.com/ho-nl/m2-pwa/commit/8c0e225a629841e4a391a1edbc0614fc30789ba6))

### Features

- sticky footer ([1547cab](https://github.com/ho-nl/m2-pwa/commit/1547cab694c0ebf7cf9acb57817a5fe5565f10fd))

# [2.106.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.105.2...@graphcommerce/next-ui@2.106.0) (2021-08-12)

### Bug Fixes

- small icon size was too large ([61a4bc7](https://github.com/ho-nl/m2-pwa/commit/61a4bc72ad88a5df764d100a78ba26635c35e035))

### Features

- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.105.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.105.1...@graphcommerce/next-ui@2.105.2) (2021-08-09)

### Bug Fixes

- forward ref not used IconBlocks ([7af4df3](https://github.com/ho-nl/m2-pwa/commit/7af4df3b03cba0a7748614e1db49d86e8157b75f))
- page keeps reloading after each change in @graphcommerce/next-ui ([45ff0f5](https://github.com/ho-nl/m2-pwa/commit/45ff0f51d87e2100faefad93d5d224a8761e6e75))
- SvgSimpleImage sizing didn't use rem ([1ba07a5](https://github.com/ho-nl/m2-pwa/commit/1ba07a5694bd60ad3cee2e8102814643d2a7c79d))
- use semantically correct components for menufab ([0196b29](https://github.com/ho-nl/m2-pwa/commit/0196b29523b3f49294dde32d96b348d100de5fa8))
- use SvgImageSimple for multiple areas ([bf851a6](https://github.com/ho-nl/m2-pwa/commit/bf851a6740e1956a78f457c2d90904ee2f65da2f))

### Reverts

- Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

## [2.105.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.105.0...@graphcommerce/next-ui@2.105.1) (2021-08-09)

### Bug Fixes

- make fonts more default ([cba1d90](https://github.com/ho-nl/m2-pwa/commit/cba1d90578db33d3458c126bf4932312eed05271))
- **review:** make sure chip is rendered correctly ([387df34](https://github.com/ho-nl/m2-pwa/commit/387df3456973290f9ce98d47823a7c71a6d95850))

# [2.105.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.104.0...@graphcommerce/next-ui@2.105.0) (2021-08-06)

### Bug Fixes

- introduced SvgImageSimple and solve issue with review chips ([931d7fd](https://github.com/ho-nl/m2-pwa/commit/931d7fdcf0faa9d2264899b72e564138215b6bd8))
- replace captionOldOld with overline ([c19bc8a](https://github.com/ho-nl/m2-pwa/commit/c19bc8aee829432a8c72d0d4bc9d266110af65ab))

### Features

- **theme:** restructured fonts and applied to home and category page ([6adf5f1](https://github.com/ho-nl/m2-pwa/commit/6adf5f11321bdfbf499125f1161c5abf5a1bfe4a))
- **theme:** restructured typography ([6fcddae](https://github.com/ho-nl/m2-pwa/commit/6fcddae6b1b54d071475c59c80a9f8d8a36294d5))

# [2.104.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.103.5...@graphcommerce/next-ui@2.104.0) (2021-08-04)

### Bug Fixes

- add blogTags fragment ([8ab1ee8](https://github.com/ho-nl/m2-pwa/commit/8ab1ee874fa0174b15f2df5108cdca03599f1ef5))
- add types ([18dac42](https://github.com/ho-nl/m2-pwa/commit/18dac421042e4050407987b33eae0bf33e2f6e12))
- base mechanics on page relations ([345a682](https://github.com/ho-nl/m2-pwa/commit/345a68274dc7bc7f561a963d29fd9cd96907d4d1))
- cart item image sizes ([e7c860c](https://github.com/ho-nl/m2-pwa/commit/e7c860c785e172b9275e1a00c8b51509d6b297a8))
- compact text input number ([8999053](https://github.com/ho-nl/m2-pwa/commit/899905364808d6ea6ef257e948c68dc3851717a6))
- image height in grid ([e95fe1a](https://github.com/ho-nl/m2-pwa/commit/e95fe1a613e2047ca9aae54ea413c592eba19bf3))
- image height on blog view ([2f8aaa3](https://github.com/ho-nl/m2-pwa/commit/2f8aaa32af3d4d8c4e3412c3b4dcab5485a0504f))
- remove component specific Row ([fcad430](https://github.com/ho-nl/m2-pwa/commit/fcad430ba01b215e77abb2c1ae01071a8ea1ec55))
- remove component specific Rows ([ed60655](https://github.com/ho-nl/m2-pwa/commit/ed60655ffca8e4578cf2627bf0a9428fd9a79337))
- tags styling ([1a4bcf2](https://github.com/ho-nl/m2-pwa/commit/1a4bcf2e339647cc93120ea9f951253a4e138142))

### Features

- add blog tags to page ([bdc31af](https://github.com/ho-nl/m2-pwa/commit/bdc31af37e1b348f409dd347fe0c88581b0cf375))
- add Chip with author and publish date ([20a28a5](https://github.com/ho-nl/m2-pwa/commit/20a28a5c4fdbb4cd883b69459e13ac481bdf3a64))
- standalone Blog Title ([311a468](https://github.com/ho-nl/m2-pwa/commit/311a4688833e054660c57e06dc98176163f3d14f))
- view list of blogposts tagged ([9efe088](https://github.com/ho-nl/m2-pwa/commit/9efe0884d43e0dc63e614f625b81e6f8b3f1dc50))

## [2.103.5](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.103.4...@graphcommerce/next-ui@2.103.5) (2021-08-03)

### Bug Fixes

- footer spacing missing ([6198665](https://github.com/ho-nl/m2-pwa/commit/61986653411dda9cb70ea15dd2d74ef1d48c2721))
- index page video and image overlay fix ([53c9d70](https://github.com/ho-nl/m2-pwa/commit/53c9d70bae1229c44f6a45730abe47482d0b9ac2))
- janky animation for last block on homepage ([a572986](https://github.com/ho-nl/m2-pwa/commit/a572986d87ee450badf96ef6608f75f30f71ed5b))
- spacing on message snackbar ([0899321](https://github.com/ho-nl/m2-pwa/commit/0899321a3ea74a2d4c714e2dbe17c785a07dfc11))

## [2.103.4](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.103.3...@graphcommerce/next-ui@2.103.4) (2021-08-02)

### Bug Fixes

- disappearing asset with zIndex -1 ([44956e5](https://github.com/ho-nl/m2-pwa/commit/44956e5d0b57a62322033395d378d0e4788454b1))

## [2.103.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.103.2...@graphcommerce/next-ui@2.103.3) (2021-07-29)

### Bug Fixes

- duplicate key error when multiple errors of the same error occur ([f2c5bc0](https://github.com/ho-nl/m2-pwa/commit/f2c5bc040c1e9cc1340f67c68460b8fe42230659))

## [2.103.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.103.0...@graphcommerce/next-ui@2.103.1) (2021-07-28)

### Bug Fixes

- buttons reporting errors all over the place ([0fa9099](https://github.com/ho-nl/m2-pwa/commit/0fa9099671659094f990449d3286e5216fce6a51))

# [2.103.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.102.3...@graphcommerce/next-ui@2.103.0) (2021-07-26)

### Features

- **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))

## [2.102.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.102.2...@graphcommerce/next-ui@2.102.3) (2021-07-26)

### Bug Fixes

- **full-page-shell:** fabs not clickable ([2c8d7f9](https://github.com/ho-nl/m2-pwa/commit/2c8d7f9529e83ac08d4fd758547379b72eb2f3d1))

## [2.102.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.102.1...@graphcommerce/next-ui@2.102.2) (2021-07-23)

### Bug Fixes

- **app-shell-header:** offset not always correctly set ([11a8907](https://github.com/ho-nl/m2-pwa/commit/11a890764be1ab4f6c584a5c8ca4e6620d0d73e5))
- **app-shell-header:** title offset top not correctly set ([c144309](https://github.com/ho-nl/m2-pwa/commit/c1443095317c1779074f3a4058f4041159c8e31b))

## [2.102.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.102.0...@graphcommerce/next-ui@2.102.1) (2021-07-21)

### Bug Fixes

- header spacings ([f00462f](https://github.com/ho-nl/m2-pwa/commit/f00462f9abb61a54552c96dbed35ef708fe05608))

# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.101.3...@graphcommerce/next-ui@2.102.0) (2021-07-21)

### Bug Fixes

- pagination markup ([0ab7707](https://github.com/ho-nl/m2-pwa/commit/0ab7707aa4cbf49c5df1da3e806641a840ec2aff))
- write review button mobile styles ([8f6b883](https://github.com/ho-nl/m2-pwa/commit/8f6b883fa0a513f84b7c6d8ed376b0e8d4b8a3bd))

### Features

- **reviews:** no reviews written message ([8ade3db](https://github.com/ho-nl/m2-pwa/commit/8ade3dbe830f5a59af09c002dfa38fa5349a4b61))

## [2.101.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.101.2...@graphcommerce/next-ui@2.101.3) (2021-07-21)

### Bug Fixes

- unresponsive back button ([91d66d7](https://github.com/ho-nl/m2-pwa/commit/91d66d762281ef9e9ffe800bb68530073a3d76f1))

## [2.101.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.101.1...@graphcommerce/next-ui@2.101.2) (2021-07-21)

### Bug Fixes

- scrollbar layout shift when using layered nav ([f51f285](https://github.com/ho-nl/m2-pwa/commit/f51f28572e1f0116ef46869bd3eb988585e0d5b9))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-ui@2.100.10...@graphcommerce/next-ui@2.101.0) (2021-07-20)

### Bug Fixes

- back button behavior ([59f7b20](https://github.com/ho-nl/m2-pwa/commit/59f7b2047194c3506037fc88d791302c7c4a1a69))
- big indicator on mobile ([2204f9d](https://github.com/ho-nl/m2-pwa/commit/2204f9d219e79af29acdd2db643df06184ae3af5))
- blue back button ([0f134ff](https://github.com/ho-nl/m2-pwa/commit/0f134ffb249e3d7e4885244a6f79b7c4728f7f1b))
- cart fab box shadow animation ([4c73e42](https://github.com/ho-nl/m2-pwa/commit/4c73e423a920f6485f72b24141cccda010a35ab7))
- close overlay using esc key ([c74940f](https://github.com/ho-nl/m2-pwa/commit/c74940f7c44405ff958ec3e9ceb3f998d98ce35d))
- **conten-header:** remove back button box shadow on mobile ([652c778](https://github.com/ho-nl/m2-pwa/commit/652c77826b7765acc9d450ffcfe4a2b3052b80da))
- content header title typography ([1eb2dc9](https://github.com/ho-nl/m2-pwa/commit/1eb2dc94f191f3fb29a470b06a21b1c3bab7744b))
- **content-header:** icon sizes ([a037ec3](https://github.com/ho-nl/m2-pwa/commit/a037ec3dc3c87d54bb8aea0d2d6b78c05d9afc63))
- drag handle rotation ([b1b0dcb](https://github.com/ho-nl/m2-pwa/commit/b1b0dcbfa822fdbae621e9ff121186ec97a65876))
- header spacing ([967573a](https://github.com/ho-nl/m2-pwa/commit/967573a12f3651f2be47e4630dab737ccf8bf498))
- **icon-header:** optional no margin prop ([4b189a1](https://github.com/ho-nl/m2-pwa/commit/4b189a12a543825a2036a12a7c06f40f2dd033ba))
- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
- only cart should be fixed on scroll ([9c8f536](https://github.com/ho-nl/m2-pwa/commit/9c8f5366c53798b377dcf397822b0945774b1dce))
- SheetPrimaryAction doesn’t accept a ref ([d4b4ae2](https://github.com/ho-nl/m2-pwa/commit/d4b4ae2721144ece22180dfe10bde0b0437f2454))
- spacing consistency between app shells ([c57ad81](https://github.com/ho-nl/m2-pwa/commit/c57ad81a1784ca6737ccfa0d7d33c3a5d19d1654))
- spacings ([332954f](https://github.com/ho-nl/m2-pwa/commit/332954f92f62ff57391192242fb95e26c6de1aae))

### Features

- **button:** pill-link variant ([a6d837a](https://github.com/ho-nl/m2-pwa/commit/a6d837adf73fedb4490d9eafb1a7b87e9931ecb3))
- cart fab on mobile ([bd2e9eb](https://github.com/ho-nl/m2-pwa/commit/bd2e9ebe056ba9a81b5c7228f1e5be57171266f4))
- content header component ([9cf58cd](https://github.com/ho-nl/m2-pwa/commit/9cf58cd5ced3e89237fc04076aa0fae3618205ef))
- content header context ([95b010a](https://github.com/ho-nl/m2-pwa/commit/95b010a175b7e6875da928f4abe4c45fc5c9e942))
- **content-header:** text buttons on mobile - pill buttons on desktop ([1438838](https://github.com/ho-nl/m2-pwa/commit/1438838fbd2aac1e3510368f2a657314ebd05d2d))
- **content-header:** title animation based on header height ([3eae793](https://github.com/ho-nl/m2-pwa/commit/3eae793c660c64c0862257907f268ae85d5f6e54))
- convert account ([b2ad16a](https://github.com/ho-nl/m2-pwa/commit/b2ad16aeb054ff89688e9fcdd4b5f2081f88aa3c))
- full page ui back and menu button position swap ([93b3419](https://github.com/ho-nl/m2-pwa/commit/93b34197947d133f4d1480c4ce68a0302201b858))
- full page ui desktop variant ([a70f301](https://github.com/ho-nl/m2-pwa/commit/a70f3013da36fa131f82fb44457b107fb7705df6))
- minimal page shell ([1693674](https://github.com/ho-nl/m2-pwa/commit/1693674631fc8438c60d9b74b73e607e08971a2d))
- new app shell components ([2db3b7a](https://github.com/ho-nl/m2-pwa/commit/2db3b7a646f45ac273679770715d23e3472e9d2c))
