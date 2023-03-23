# Change Log

## 6.0.2-canary.0

## 6.0.1

### Patch Changes

- [#1854](https://github.com/graphcommerce-org/graphcommerce/pull/1854) [`8f330e704`](https://github.com/graphcommerce-org/graphcommerce/commit/8f330e704eabc8466cb20bc7fc110aef6f52e3a5) - Crossell items doesn't wait to animate, caused the overlay to auto-close. ([@paales](https://github.com/paales))

- [#1858](https://github.com/graphcommerce-org/graphcommerce/pull/1858) [`68ea507ba`](https://github.com/graphcommerce-org/graphcommerce/commit/68ea507baf4023f5d5a13ed50b5b53930e9fc405) - show search fab instead of SearchLink below lg breakpoint ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

## 6.0.1-canary.7

## 6.0.1-canary.6

### Patch Changes

- [#1858](https://github.com/graphcommerce-org/graphcommerce/pull/1858) [`68ea507ba`](https://github.com/graphcommerce-org/graphcommerce/commit/68ea507baf4023f5d5a13ed50b5b53930e9fc405) - show search fab instead of SearchLink below lg breakpoint ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

## 6.0.1-canary.5

## 6.0.1-canary.4

## 6.0.1-canary.3

## 6.0.1-canary.2

## 6.0.1-canary.1

## 6.0.1-canary.0

### Patch Changes

- [#1854](https://github.com/graphcommerce-org/graphcommerce/pull/1854) [`8f330e704`](https://github.com/graphcommerce-org/graphcommerce/commit/8f330e704eabc8466cb20bc7fc110aef6f52e3a5) - Crossell items doesn't wait to animate, caused the overlay to auto-close. ([@paales](https://github.com/paales))

## 6.0.0

### Major Changes

- [#1786](https://github.com/graphcommerce-org/graphcommerce/pull/1786) [`26239ef73`](https://github.com/graphcommerce-org/graphcommerce/commit/26239ef73e49731224b227f1eb850dde56d40584) - Updated the supported NodeJS versions to 16 and 18, removed support for NodeJS 14. ([@paales](https://github.com/paales))

- [#1832](https://github.com/graphcommerce-org/graphcommerce/pull/1832) [`26d4243d5`](https://github.com/graphcommerce-org/graphcommerce/commit/26d4243d5b63d604e5a36386d9b01914db5f2918) - Added a new RowLink component with variants: Inline, ImageLabelSwiper, LogoSwiper and Usps. Updated the demo to show off these new components. ([@ErwinOtten](https://github.com/ErwinOtten))

- [#1749](https://github.com/graphcommerce-org/graphcommerce/pull/1749) [`0cc472915`](https://github.com/graphcommerce-org/graphcommerce/commit/0cc4729154d316227a41712b5f0adf514768e91f) - Introducing the new ProductFiltersPro component set with completely new filter and UI behavior. Filters will appear as a popper on the md and up breakpoints and as an overlay on sm and below breakpoints. Filters now have an Apply button instead of applying directly. ([@paales](https://github.com/paales))

- [#1766](https://github.com/graphcommerce-org/graphcommerce/pull/1766) [`e34169ee2`](https://github.com/graphcommerce-org/graphcommerce/commit/e34169ee2e0fdc052ff589ceca0bc67557584c1f) - Upgraded to Next.js 13

  - NextLink integrates the next/link functionality with @mui/material's Link and ButtonBase (and all it's derivatives) components.
  - NextLink automatically adds `target="_blank"` when the href is external.
  - NextLink makes all relative href absolute. `href="my-page"` will be rendered as `href="/my-page"`. ([@paales](https://github.com/paales))

- [#1786](https://github.com/graphcommerce-org/graphcommerce/pull/1786) [`b76679204`](https://github.com/graphcommerce-org/graphcommerce/commit/b766792049e1e6ebe45671c0b36e78746ef159e2) - Created a completely new [GraphCommerce config system](https://www.graphcommerce.org/docs/framework/config) to allow for greater confiugration options and rely less on a .env file to configuration.

  - GraphCommerce can be configured in the graphcommerce.config.js
  - The configuration is automatically validated on startup.
  - All configuration values can be overwritten by environment variables. ([@paales](https://github.com/paales))

### Minor Changes

- [#1814](https://github.com/graphcommerce-org/graphcommerce/pull/1814) [`15aa59049`](https://github.com/graphcommerce-org/graphcommerce/commit/15aa590493bf7639231f3bb3dd623c234ebad7cf) - ActionCard default styling introduced for a more inline and changed the look of selected filters. ([@ErwinOtten](https://github.com/ErwinOtten))

- [#1828](https://github.com/graphcommerce-org/graphcommerce/pull/1828) [`3df85faf1`](https://github.com/graphcommerce-org/graphcommerce/commit/3df85faf189b95e2c7d9c3fc756474fcafb1c8b4) - Added a new `productRoute` configuration to create freedom in the actual product route used (default: /p/). Simplified redirects from legacy product routes to new routes by creating redirects. ([@paales](https://github.com/paales))

- [#1790](https://github.com/graphcommerce-org/graphcommerce/pull/1790) [`1fbd1e2b2`](https://github.com/graphcommerce-org/graphcommerce/commit/1fbd1e2b20cd875c481e10a81343da961c8baf8f) - PayPal now shows the ‘processing payment’ message giving the impression it wasn’t doing anything. This adds the check for the PayerID in the useCartLock hook. ([@LaurensFranken](https://github.com/LaurensFranken))

- [#1810](https://github.com/graphcommerce-org/graphcommerce/pull/1810) [`543c5d5b2`](https://github.com/graphcommerce-org/graphcommerce/commit/543c5d5b2b6f29c1f6a0a405524d4cc86f399596) - Added `limitSsg: Boolean` configuration option to limit the getStaticPaths generation during build. This is useful to make quick deployments on preview environments. ([@paales](https://github.com/paales))

- [#1816](https://github.com/graphcommerce-org/graphcommerce/pull/1816) [`f61e2e572`](https://github.com/graphcommerce-org/graphcommerce/commit/f61e2e5721806c258b771a7ed5165da8dc7b815b) - Add feedback messages on 'add address form' ([@FrankHarland](https://github.com/FrankHarland))

- [#1793](https://github.com/graphcommerce-org/graphcommerce/pull/1793) [`5562fa69b`](https://github.com/graphcommerce-org/graphcommerce/commit/5562fa69b1bc260f68555dcfaf30153eda489bed) - Add newsletter subscribe form ([@ErwinOtten](https://github.com/ErwinOtten))

- [#1833](https://github.com/graphcommerce-org/graphcommerce/pull/1833) [`7dc3e036c`](https://github.com/graphcommerce-org/graphcommerce/commit/7dc3e036c776224aa184e03cc957dcb8d3faa55c) - Added ability to have local plugins and added example plugin in the plugins directory ([@paales](https://github.com/paales))

### Patch Changes

- [#1821](https://github.com/graphcommerce-org/graphcommerce/pull/1821) [`1abc50a21`](https://github.com/graphcommerce-org/graphcommerce/commit/1abc50a21103270fad04e4a9ea892ee1e75233e9) - Upgrade packages to latest version ([@paales](https://github.com/paales))

- [#1830](https://github.com/graphcommerce-org/graphcommerce/pull/1830) [`b2fa21490`](https://github.com/graphcommerce-org/graphcommerce/commit/b2fa2149001cc304d9640bb35f485827ddf9f34a) - When using `i18n` in getStaticProps it could return an incorrect language. ([@paales](https://github.com/paales))

- [#1786](https://github.com/graphcommerce-org/graphcommerce/pull/1786) [`090102051`](https://github.com/graphcommerce-org/graphcommerce/commit/09010205174d7c8b48ed94b44226b4c03fd6e680) - Hygraph schema gets filtered in the .meshrc.yml file by default, reducing the size of the generated schema and type definitions. ([@paales](https://github.com/paales))

- [#1768](https://github.com/graphcommerce-org/graphcommerce/pull/1768) [`23e9a4728`](https://github.com/graphcommerce-org/graphcommerce/commit/23e9a472899dfc0b56b989f5d0e8ffb802c8cc5f) - Deprecated @graphcommerce/magento-customer-account & @graphcommerce/magento-customer-order packages and moved all functionality to @graphcomemrce/magento-customer ([@bramvanderholst](https://github.com/bramvanderholst))

- [#1778](https://github.com/graphcommerce-org/graphcommerce/pull/1778) [`bac564119`](https://github.com/graphcommerce-org/graphcommerce/commit/bac5641198b8c91df0e27a730cd663fd177afc70) - Added proper translations for iDeal Multi Safe Pay ([@FrankHarland](https://github.com/FrankHarland))

- [#1850](https://github.com/graphcommerce-org/graphcommerce/pull/1850) [`e75b47e31`](https://github.com/graphcommerce-org/graphcommerce/commit/e75b47e31a01533e9c47412a91b77e25bed24a1a) - The checkout customer address selector will only render when there is at least one customer address.s ([@LaurensFranken](https://github.com/LaurensFranken))

- [#1808](https://github.com/graphcommerce-org/graphcommerce/pull/1808) [`847ee17e5`](https://github.com/graphcommerce-org/graphcommerce/commit/847ee17e512fcfd5367c5f6b3840d19b6bc9299f) - Added ability to translate various strings: 'Several errors occured', 'Processing your payment', 'Loading', 'Loading your account' and updated all translations. ([@carlocarels90](https://github.com/carlocarels90))

- [#1833](https://github.com/graphcommerce-org/graphcommerce/pull/1833) [`0abfe5852`](https://github.com/graphcommerce-org/graphcommerce/commit/0abfe5852ba5d0181a5caf9fd4cff633b03a5be1) - Crosssells wont do an additional query before the product is known. ([@paales](https://github.com/paales))

- [#1835](https://github.com/graphcommerce-org/graphcommerce/pull/1835) [`060e30f36`](https://github.com/graphcommerce-org/graphcommerce/commit/060e30f361a9646b16ed2d0dd96b01627124866c) - Updated to next.js 13.2.4 ([@paales](https://github.com/paales))

- [#1786](https://github.com/graphcommerce-org/graphcommerce/pull/1786) [`b8c951678`](https://github.com/graphcommerce-org/graphcommerce/commit/b8c95167839b03d8bf2299a230d36fd3144cea0b) - Enabled [onDemandEntries](https://nextjs.org/docs/api-reference/next.config.js/configuring-onDemandEntries) for faster development flow. ([@paales](https://github.com/paales))

- [#1790](https://github.com/graphcommerce-org/graphcommerce/pull/1790) [`875a595da`](https://github.com/graphcommerce-org/graphcommerce/commit/875a595da5f52b77bc2535cf4a660267b0046a1e) - ApolloClient cache size would balloon with all redirects and make sure redirects work ([@LaurensFranken](https://github.com/LaurensFranken))

## 6.0.0-canary.54

## 6.0.0-canary.53

### Patch Changes

- [#1850](https://github.com/graphcommerce-org/graphcommerce/pull/1850) [`e75b47e31`](https://github.com/graphcommerce-org/graphcommerce/commit/e75b47e31a01533e9c47412a91b77e25bed24a1a) - - Fix render condition of CustomerAddressForm so it only renders when a customer has at least one address. ([@LaurensFranken](https://github.com/LaurensFranken))

## 6.0.0-canary.52

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

### Patch Changes

- [#1844](https://github.com/graphcommerce-org/graphcommerce/pull/1844) [`4e3ec6aaf`](https://github.com/graphcommerce-org/graphcommerce/commit/4e3ec6aafdff036a19479b09031e6ae018c4ee21) - Crosssels had a vertical scrollbar when opening ([@paales](https://github.com/paales))

## 6.0.0-canary.45

## 6.0.0-canary.44

### Patch Changes

- [#1842](https://github.com/graphcommerce-org/graphcommerce/pull/1842) [`7b67d84bd`](https://github.com/graphcommerce-org/graphcommerce/commit/7b67d84bd269c3fc91afbd69f6683c5d12808d36) - Renamed i18n to storefront in configuration ([@paales](https://github.com/paales))

## 6.0.0-canary.43

## 6.0.0-canary.42

### Patch Changes

- [#1840](https://github.com/graphcommerce-org/graphcommerce/pull/1840) [`c244f4408`](https://github.com/graphcommerce-org/graphcommerce/commit/c244f4408ad56efed3342ac83c2cdcb70409f4c1) - After changing a file inside node_modules, nextjs would refresh the whole page ([@paales](https://github.com/paales))

## 6.0.0-canary.41

## 6.0.0-canary.40

## 6.0.0-canary.39

## 6.0.0-canary.38

### Patch Changes

- [#1835](https://github.com/graphcommerce-org/graphcommerce/pull/1835) [`060e30f36`](https://github.com/graphcommerce-org/graphcommerce/commit/060e30f361a9646b16ed2d0dd96b01627124866c) - Updated to next.js 13.2.4, no more performance patch needed ([@paales](https://github.com/paales))

## 6.0.0-canary.37

## 6.0.0-canary.36

### Minor Changes

- [#1833](https://github.com/graphcommerce-org/graphcommerce/pull/1833) [`7dc3e036c`](https://github.com/graphcommerce-org/graphcommerce/commit/7dc3e036c776224aa184e03cc957dcb8d3faa55c) - Added ability to have local plugins and added example plugin in the plugins directory ([@paales](https://github.com/paales))

### Patch Changes

- [#1833](https://github.com/graphcommerce-org/graphcommerce/pull/1833) [`0abfe5852`](https://github.com/graphcommerce-org/graphcommerce/commit/0abfe5852ba5d0181a5caf9fd4cff633b03a5be1) - Skip empty query when loading crosssells ([@paales](https://github.com/paales))

## 6.0.0-canary.35

## 6.0.0-canary.34

### Patch Changes

- [#1830](https://github.com/graphcommerce-org/graphcommerce/pull/1830) [`b2fa21490`](https://github.com/graphcommerce-org/graphcommerce/commit/b2fa2149001cc304d9640bb35f485827ddf9f34a) - Load translations when running getStaticProps ([@paales](https://github.com/paales))

## 6.0.0-canary.33

## 6.0.0-canary.32

### Minor Changes

- [#1814](https://github.com/graphcommerce-org/graphcommerce/pull/1814) [`15aa59049`](https://github.com/graphcommerce-org/graphcommerce/commit/15aa590493bf7639231f3bb3dd623c234ebad7cf) - - Show filter label, instead of value
  - Actioncard default styling
  - Active filter styling ([@ErwinOtten](https://github.com/ErwinOtten))

## 6.0.0-canary.31

## 6.0.0-canary.30

## 6.0.0-canary.29

### Minor Changes

- [#1828](https://github.com/graphcommerce-org/graphcommerce/pull/1828) [`3df85faf1`](https://github.com/graphcommerce-org/graphcommerce/commit/3df85faf189b95e2c7d9c3fc756474fcafb1c8b4) - Added new `productRoute` configuration to create freedom in the actual product route used (default: /p/). Simplified redirects from legacy product routes to new routes by creating redirects. ([@paales](https://github.com/paales))

### Patch Changes

- [#1827](https://github.com/graphcommerce-org/graphcommerce/pull/1827) [`b23c415da`](https://github.com/graphcommerce-org/graphcommerce/commit/b23c415da019e7b4378de6619c6fcbd03d85a1e8) - Fix recaptcha ([@paales](https://github.com/paales))

## 6.0.0-canary.28

### Patch Changes

- [#1823](https://github.com/graphcommerce-org/graphcommerce/pull/1823) [`605d74434`](https://github.com/graphcommerce-org/graphcommerce/commit/605d74434b78baa83f3574b6a4249eae0431d570) - Fix/upgrade instructions ([@paales](https://github.com/paales))

## 6.0.0-canary.27

### Patch Changes

- [#1821](https://github.com/graphcommerce-org/graphcommerce/pull/1821) [`1abc50a21`](https://github.com/graphcommerce-org/graphcommerce/commit/1abc50a21103270fad04e4a9ea892ee1e75233e9) - Fix regression bugs and upgrade packages to latest versions ([@paales](https://github.com/paales))

- [#1820](https://github.com/graphcommerce-org/graphcommerce/pull/1820) [`6f8f5c1fe`](https://github.com/graphcommerce-org/graphcommerce/commit/6f8f5c1feb551539a58aa8bdaed30f3890576e80) - Fix/default config ([@paales](https://github.com/paales))

- [#1818](https://github.com/graphcommerce-org/graphcommerce/pull/1818) [`ab816a603`](https://github.com/graphcommerce-org/graphcommerce/commit/ab816a6036c64765fcb5219ab07d44433d5b0bba) - activate i18n with correct locale for ssr ([@FrankHarland](https://github.com/FrankHarland))

## 6.0.0-canary.26

### Patch Changes

- [#1817](https://github.com/graphcommerce-org/graphcommerce/pull/1817) [`51ac99eb5`](https://github.com/graphcommerce-org/graphcommerce/commit/51ac99eb501538fb6e339557ae055b115d01c928) - feat(GCOM-1015): fix bug where page heading would dissapear after rem… ([@FrankHarland](https://github.com/FrankHarland))

## 6.0.0-canary.25

### Patch Changes

- [#1816](https://github.com/graphcommerce-org/graphcommerce/pull/1816) [`f61e2e572`](https://github.com/graphcommerce-org/graphcommerce/commit/f61e2e5721806c258b771a7ed5165da8dc7b815b) - feat(GCOM-1015): add feedback on add address form, update addresslist… ([@FrankHarland](https://github.com/FrankHarland))

## 6.0.0-canary.24

## 6.0.0-canary.23

### Minor Changes

- [#1810](https://github.com/graphcommerce-org/graphcommerce/pull/1810) [`543c5d5b2`](https://github.com/graphcommerce-org/graphcommerce/commit/543c5d5b2b6f29c1f6a0a405524d4cc86f399596) - Added `limitSsg: Boolean` configuration option to limit the getStaticPaths generation during build. This is useful to make quick deployments on preview environments. ([@paales](https://github.com/paales))

## 6.0.0-canary.22

### Patch Changes

- [#1808](https://github.com/graphcommerce-org/graphcommerce/pull/1808) [`847ee17e5`](https://github.com/graphcommerce-org/graphcommerce/commit/847ee17e512fcfd5367c5f6b3840d19b6bc9299f) - make FullPageMessage titles translatable and update translations. ([@carlocarels90](https://github.com/carlocarels90))

## 6.0.0-canary.21

## 6.0.0-canary.20

### Major Changes

- [#1786](https://github.com/graphcommerce-org/graphcommerce/pull/1786) [`26239ef73`](https://github.com/graphcommerce-org/graphcommerce/commit/26239ef73e49731224b227f1eb850dde56d40584) - Bumped minimum version to node16 ([@paales](https://github.com/paales))

### Minor Changes

- [#1786](https://github.com/graphcommerce-org/graphcommerce/pull/1786) [`b76679204`](https://github.com/graphcommerce-org/graphcommerce/commit/b766792049e1e6ebe45671c0b36e78746ef159e2) - Added a new graphcommerce.config.ts which can be accessed with import.mete.graphCommerce.myConfig ([@paales](https://github.com/paales))

### Patch Changes

- [#1786](https://github.com/graphcommerce-org/graphcommerce/pull/1786) [`090102051`](https://github.com/graphcommerce-org/graphcommerce/commit/09010205174d7c8b48ed94b44226b4c03fd6e680) - Filter the Hygraph schema to be smaller ([@paales](https://github.com/paales))

- [#1786](https://github.com/graphcommerce-org/graphcommerce/pull/1786) [`b8c951678`](https://github.com/graphcommerce-org/graphcommerce/commit/b8c95167839b03d8bf2299a230d36fd3144cea0b) - Enabled [onDemandEntries](https://nextjs.org/docs/api-reference/next.config.js/configuring-onDemandEntries) for faster development flow. ([@paales](https://github.com/paales))

- [#1786](https://github.com/graphcommerce-org/graphcommerce/pull/1786) [`71624a87f`](https://github.com/graphcommerce-org/graphcommerce/commit/71624a87f4b6add01eb9e1d1e2f927a995aa3b8b) - patch @graphql-mesh/graphql that will prevent generating the complete schema in code. ([@paales](https://github.com/paales))

## 5.2.0-canary.19

## 5.2.0-canary.18

### Minor Changes

- [#1790](https://github.com/graphcommerce-org/graphcommerce/pull/1790) [`1fbd1e2b2`](https://github.com/graphcommerce-org/graphcommerce/commit/1fbd1e2b20cd875c481e10a81343da961c8baf8f) - - PayPal: PayPal didn’t show the ‘processing payment’ message giving the impression it wasn’t doing anything. ([@LaurensFranken](https://github.com/LaurensFranken))

### Patch Changes

- [#1790](https://github.com/graphcommerce-org/graphcommerce/pull/1790) [`875a595da`](https://github.com/graphcommerce-org/graphcommerce/commit/875a595da5f52b77bc2535cf4a660267b0046a1e) - ApolloClient cache would balloon with all redirects and make sure redirects work ([@LaurensFranken](https://github.com/LaurensFranken))

## 5.2.0-canary.17

## 5.2.0-canary.16

## 5.2.0-canary.15

## 5.2.0-canary.14

## 5.2.0-canary.13

### Minor Changes

- [#1795](https://github.com/graphcommerce-org/graphcommerce/pull/1795) [`236d698b2`](https://github.com/graphcommerce-org/graphcommerce/commit/236d698b2aac55598fc45a6a58574a538f23e160) - Navigation link fix, homepage and category style fixes ([@ErwinOtten](https://github.com/ErwinOtten))

## 5.2.0-canary.12

## 5.2.0-canary.11

## 5.2.0-canary.10

### Minor Changes

- [#1793](https://github.com/graphcommerce-org/graphcommerce/pull/1793) [`5562fa69b`](https://github.com/graphcommerce-org/graphcommerce/commit/5562fa69b1bc260f68555dcfaf30153eda489bed) - Add newsletter subscribe form ([@ErwinOtten](https://github.com/ErwinOtten))

## 5.2.0-canary.9

## 5.2.0-canary.8

### Patch Changes

- [#1780](https://github.com/graphcommerce-org/graphcommerce/pull/1780) [`667f58856`](https://github.com/graphcommerce-org/graphcommerce/commit/667f58856107c25f6c44561e12083239637e6a09) - Option to not require meta tags for categories ([@StefanAngenent](https://github.com/StefanAngenent))

## 5.2.0-canary.7

### Minor Changes

- [#1749](https://github.com/graphcommerce-org/graphcommerce/pull/1749) [`0cc472915`](https://github.com/graphcommerce-org/graphcommerce/commit/0cc4729154d316227a41712b5f0adf514768e91f) - Added new filter UI and behaviour. Filters will appear as a popper on the md and up breakpoints and as an overlay on sm and below breakpoints. Filters now have an Apply button instead of applying directly. ([@paales](https://github.com/paales))

### Patch Changes

- [#1782](https://github.com/graphcommerce-org/graphcommerce/pull/1782) [`fd75a8b80`](https://github.com/graphcommerce-org/graphcommerce/commit/fd75a8b80934337285ffde031474466b8d88686b) - Update .env example with work-around for self-signed TLS/SSL certs when developing ([@hnsr](https://github.com/hnsr))

## 5.2.0-canary.6

### Patch Changes

- [#1778](https://github.com/graphcommerce-org/graphcommerce/pull/1778) [`bac564119`](https://github.com/graphcommerce-org/graphcommerce/commit/bac5641198b8c91df0e27a730cd663fd177afc70) - add translated label for ideal/msp ([@FrankHarland](https://github.com/FrankHarland))

## 5.2.0-canary.5

## 5.2.0-canary.4

## 5.2.0-canary.3

### Minor Changes

- [#1766](https://github.com/graphcommerce-org/graphcommerce/pull/1766) [`e34169ee2`](https://github.com/graphcommerce-org/graphcommerce/commit/e34169ee2e0fdc052ff589ceca0bc67557584c1f) - Upgraded to Next.js 13

  - NextLink integrates the next/link functionality with @mui/material's Link and ButtonBase (and all it's derivatives) components.
  - NextLink automatically adds `target="_blank"` when the href is external.
  - NextLink makes all relative href absolute. `href="my-page"` will be rendered as `href="/my-page"`.

  Upgrade instructions: https://www.graphcommerce.org/docs/framework/links#upgrading-from-nextjs-12 ([@paales](https://github.com/paales))

## 5.2.0-canary.2

## 5.2.0-canary.1

### Patch Changes

- [#1768](https://github.com/graphcommerce-org/graphcommerce/pull/1768) [`23e9a4728`](https://github.com/graphcommerce-org/graphcommerce/commit/23e9a472899dfc0b56b989f5d0e8ffb802c8cc5f) - Move magento-customer-account & magento-customer-order into magento-customer package (magento-customer-account & magento-customer-order are now deprecated) ([@bramvanderholst](https://github.com/bramvanderholst))

## 5.2.0-canary.0

## 5.1.1

## 5.1.1-canary.1

## 5.1.1-canary.0

## 5.1.0

### Minor Changes

- [#1757](https://github.com/graphcommerce-org/graphcommerce/pull/1757) [`ca2e2ab59`](https://github.com/graphcommerce-org/graphcommerce/commit/ca2e2ab594ab1cc0fedf908869829811e1f4009f) - Handle stock_status OUT_OF_STOCK properly and show only_x_left_in_stock if feature is enabled ([@paales](https://github.com/paales))

- [#1761](https://github.com/graphcommerce-org/graphcommerce/pull/1761) [`c17318d6e`](https://github.com/graphcommerce-org/graphcommerce/commit/c17318d6ee7ca9faaaaccff121d84d4e1b1f2a13) - Generate sitemaps per locale so it can better handle large number of products ([@paales](https://github.com/paales))

- [#1755](https://github.com/graphcommerce-org/graphcommerce/pull/1755) [`472486194`](https://github.com/graphcommerce-org/graphcommerce/commit/472486194f4a085e8a4dc0251b862024fb62ec86) - Magento URL Rewrites support to GraphCommerce compatible URL's. ([@paales](https://github.com/paales))

- [#1755](https://github.com/graphcommerce-org/graphcommerce/pull/1755) [`472486194`](https://github.com/graphcommerce-org/graphcommerce/commit/472486194f4a085e8a4dc0251b862024fb62ec86) - Magento URL Rewrites redirect 301 and 302 support ([@paales](https://github.com/paales))

### Patch Changes

- [#1750](https://github.com/graphcommerce-org/graphcommerce/pull/1750) [`3479bc1e2`](https://github.com/graphcommerce-org/graphcommerce/commit/3479bc1e24da0e8a751ee301c59fa5f9755c8559) - Show globe icon instead of shopping bag icon for store/language-switcher ([@FrankHarland](https://github.com/FrankHarland))

- [#1745](https://github.com/graphcommerce-org/graphcommerce/pull/1745) [`b1444b933`](https://github.com/graphcommerce-org/graphcommerce/commit/b1444b9336107d3ac111563f9b62a884f1b26a8d) - Bring password reset page more in line with standard forms, add missing translations. ([@github-actions](https://github.com/apps/github-actions))

- [#1745](https://github.com/graphcommerce-org/graphcommerce/pull/1745) [`23094f955`](https://github.com/graphcommerce-org/graphcommerce/commit/23094f955a2e9fa9beabe0a0b31060f6c9bc862c) - Password reset back button URL was incorrect, use one shared layout for all public account pages ([@github-actions](https://github.com/apps/github-actions))

- [#1760](https://github.com/graphcommerce-org/graphcommerce/pull/1760) [`8badc8550`](https://github.com/graphcommerce-org/graphcommerce/commit/8badc8550c402ac7b80c8d3238d313550c28a055) - Updated dependencies ([@paales](https://github.com/paales))

- [#1752](https://github.com/graphcommerce-org/graphcommerce/pull/1752) [`f0816973b`](https://github.com/graphcommerce-org/graphcommerce/commit/f0816973ba38ed091189338b1863983da8c6e806) - Redirect old product URLs to the new /p/ route ([@paales](https://github.com/paales))

- [#1756](https://github.com/graphcommerce-org/graphcommerce/pull/1756) [`1abaaedde`](https://github.com/graphcommerce-org/graphcommerce/commit/1abaaedde4062d3b19696e333d0016972681afaf) - Show cart item error messages when running Magento >= 2.4.5 or this [patch is applied](https://raw.githubusercontent.com/graphcommerce-org/graphcommerce/main/packages/magento-cart/243-244-magento-module-quote-graphql-cart-item-errors.patch)

  - Fixes an issue where the cart can get into a broken state, if items contain errors.
  - AddToCartForm now shows a success message if there is an error but the error is related to another item in the cart.
  - Disable checkout buttons when there are cart item errors and show a message. ([@paales](https://github.com/paales))

- [#1752](https://github.com/graphcommerce-org/graphcommerce/pull/1752) [`2a6a4d9ec`](https://github.com/graphcommerce-org/graphcommerce/commit/2a6a4d9ecfa1b58a66ba9b9d00016d6feda9aa95) - Updated dependencies to latest versions, except for nextjs; Solve tons of peer dependency issues.

  - Updated the @mui/material package
  - Removed dependencies on react-hook-form-mui and @playwright/test
  - Upgraded dependencies including type-fest and graphql-mesh
  - Solved peer dependency issues ([@paales](https://github.com/paales))

- [#1743](https://github.com/graphcommerce-org/graphcommerce/pull/1743) [`80d3b2384`](https://github.com/graphcommerce-org/graphcommerce/commit/80d3b2384cea0c24317e06b3fe6f233857d91f33) - When deploying on a non Vercel env it expected process.env.VERCEL_ENV to exist ([@hnsr](https://github.com/hnsr))

- [#1756](https://github.com/graphcommerce-org/graphcommerce/pull/1756) [`4eee6abf0`](https://github.com/graphcommerce-org/graphcommerce/commit/4eee6abf0133b16872fc70c625ce2c21d1a0a4f4) - Add missing translations ([@paales](https://github.com/paales))

- [#1745](https://github.com/graphcommerce-org/graphcommerce/pull/1745) [`86afcf462`](https://github.com/graphcommerce-org/graphcommerce/commit/86afcf4620cc1053d28b9e77bf8f76490dec6f09) - Crosssells wouldn't show when navigating back from another page ([@github-actions](https://github.com/apps/github-actions))

- [#1755](https://github.com/graphcommerce-org/graphcommerce/pull/1755) [`91d96772d`](https://github.com/graphcommerce-org/graphcommerce/commit/91d96772dd9bb250db98a760c4068b986b47a4cb) - AddProductsToCartForm should not be maintained when the ProductPage is rendered with new product information ([@paales](https://github.com/paales))

- [#1756](https://github.com/graphcommerce-org/graphcommerce/pull/1756) [`47cf3d49f`](https://github.com/graphcommerce-org/graphcommerce/commit/47cf3d49fda044220163ec6b0f0c4fe3dd8005fb) - When navigation from checkout/added the cart didn't animate and it didn't work properly. ([@paales](https://github.com/paales))

## 5.1.0-canary.11

### Minor Changes

- [#1761](https://github.com/graphcommerce-org/graphcommerce/pull/1761) [`c17318d6e`](https://github.com/graphcommerce-org/graphcommerce/commit/c17318d6ee7ca9faaaaccff121d84d4e1b1f2a13) - Generate sitemaps per locale so it can better handle large number of products ([@paales](https://github.com/paales))

## 5.1.0-canary.10

### Patch Changes

- [#1760](https://github.com/graphcommerce-org/graphcommerce/pull/1760) [`8badc8550`](https://github.com/graphcommerce-org/graphcommerce/commit/8badc8550c402ac7b80c8d3238d313550c28a055) - Updated dependencies ([@paales](https://github.com/paales))

## 5.1.0-canary.9

## 5.1.0-canary.8

### Minor Changes

- [#1757](https://github.com/graphcommerce-org/graphcommerce/pull/1757) [`ca2e2ab59`](https://github.com/graphcommerce-org/graphcommerce/commit/ca2e2ab594ab1cc0fedf908869829811e1f4009f) - Handle stock_status OUT_OF_STOCK properly and show only_x_left_in_stock if feature is enabled ([@paales](https://github.com/paales))

## 5.1.0-canary.7

### Patch Changes

- [#1756](https://github.com/graphcommerce-org/graphcommerce/pull/1756) [`1abaaedde`](https://github.com/graphcommerce-org/graphcommerce/commit/1abaaedde4062d3b19696e333d0016972681afaf) - Show cart item error messages when running Magento >= 2.4.5 or this [patch is applied](https://raw.githubusercontent.com/graphcommerce-org/graphcommerce/main/packages/magento-cart/243-244-magento-module-quote-graphql-cart-item-errors.patch)

  - Fixes an issue where the cart can get into a broken state, if items contain errors.
  - AddToCartForm now shows a success message if there is an error but the error is related to another item in the cart.
  - Disable checkout buttons when there are cart item errors and show a message. ([@paales](https://github.com/paales))

- [#1756](https://github.com/graphcommerce-org/graphcommerce/pull/1756) [`4eee6abf0`](https://github.com/graphcommerce-org/graphcommerce/commit/4eee6abf0133b16872fc70c625ce2c21d1a0a4f4) - Add missing translations ([@paales](https://github.com/paales))

- [#1756](https://github.com/graphcommerce-org/graphcommerce/pull/1756) [`47cf3d49f`](https://github.com/graphcommerce-org/graphcommerce/commit/47cf3d49fda044220163ec6b0f0c4fe3dd8005fb) - When navigation from checkout/added the cart didn't animate and it didn't work properly. ([@paales](https://github.com/paales))

## 5.1.0-canary.6

## 5.1.0-canary.5

### Patch Changes

- [`b1444b933`](https://github.com/graphcommerce-org/graphcommerce/commit/b1444b9336107d3ac111563f9b62a884f1b26a8d) - Bring password reset page more in line with standard forms, add missing translations. ([@paales](https://github.com/paales))

- [`23094f955`](https://github.com/graphcommerce-org/graphcommerce/commit/23094f955a2e9fa9beabe0a0b31060f6c9bc862c) - Password reset back button URL was incorrect, use one shared layout for all public account pages ([@paales](https://github.com/paales))

- [`86afcf462`](https://github.com/graphcommerce-org/graphcommerce/commit/86afcf4620cc1053d28b9e77bf8f76490dec6f09) - Crosssells wouldn't show when navigating back from another page ([@paales](https://github.com/paales))

## 5.1.0-canary.4

### Minor Changes

- [#1755](https://github.com/graphcommerce-org/graphcommerce/pull/1755) [`472486194`](https://github.com/graphcommerce-org/graphcommerce/commit/472486194f4a085e8a4dc0251b862024fb62ec86) - Magento URL Rewrites support to GraphCommerce compatible URL's. ([@paales](https://github.com/paales))

- [#1755](https://github.com/graphcommerce-org/graphcommerce/pull/1755) [`472486194`](https://github.com/graphcommerce-org/graphcommerce/commit/472486194f4a085e8a4dc0251b862024fb62ec86) - Magento URL Rewrites redirect 301 and 302 support ([@paales](https://github.com/paales))

### Patch Changes

- [#1755](https://github.com/graphcommerce-org/graphcommerce/pull/1755) [`91d96772d`](https://github.com/graphcommerce-org/graphcommerce/commit/91d96772dd9bb250db98a760c4068b986b47a4cb) - AddProductsToCartForm should not be maintained when the ProductPage is rendered with new product information ([@paales](https://github.com/paales))

## 5.1.0-canary.3

### Patch Changes

- [#1752](https://github.com/graphcommerce-org/graphcommerce/pull/1752) [`f0816973b`](https://github.com/graphcommerce-org/graphcommerce/commit/f0816973ba38ed091189338b1863983da8c6e806) - Redirect old product URLs to the new /p/ route ([@paales](https://github.com/paales))

- [#1752](https://github.com/graphcommerce-org/graphcommerce/pull/1752) [`2a6a4d9ec`](https://github.com/graphcommerce-org/graphcommerce/commit/2a6a4d9ecfa1b58a66ba9b9d00016d6feda9aa95) - Updated dependencies to latest versions, except for nextjs; Solve tons of peer dependency issues.

  - Updated the @mui/material package
  - Removed dependencies on react-hook-form-mui and @playwright/test
  - Upgraded dependencies including type-fest and graphql-mesh
  - Solved peer dependency issues ([@paales](https://github.com/paales))

## 5.1.0-canary.2

### Patch Changes

- [#1750](https://github.com/graphcommerce-org/graphcommerce/pull/1750) [`3479bc1e2`](https://github.com/graphcommerce-org/graphcommerce/commit/3479bc1e24da0e8a751ee301c59fa5f9755c8559) - show globe icon instead of shopping bag icon for store/language-switcher ([@FrankHarland](https://github.com/FrankHarland))

## 5.1.0-canary.1

### Minor Changes

- [#1743](https://github.com/graphcommerce-org/graphcommerce/pull/1743) [`80d3b2384`](https://github.com/graphcommerce-org/graphcommerce/commit/80d3b2384cea0c24317e06b3fe6f233857d91f33) - When deploying on a non Vercel env it expected process.env.VERCEL_ENV to exist ([@hnsr](https://github.com/hnsr))

## 5.1.0-canary.0

## 5.0.0

### Major Changes

- [#1734](https://github.com/graphcommerce-org/graphcommerce/pull/1734) [`e4c7fe17e`](https://github.com/graphcommerce-org/graphcommerce/commit/e4c7fe17e413e37362ceae92e67f1b3a5f62d398) - Bump major version of all packages ([@github-actions](https://github.com/apps/github-actions))

### Minor Changes

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`761bd2832`](https://github.com/graphcommerce-org/graphcommerce/commit/761bd2832f115afc8b95bedbf479266309dd5acc) - ApolloLinks, typePolicies and migration scripts are now handled with plugins on the new library component `<GraphQLProvider/>`. Hygraph's, Magento Cart, Customer, Store, Wishlist and Magento GraphQL are all migrated to be using plugins.

  If you are using custom `links` / `policies` / `migrations` you can pass them as props to the `<GraphQLProvider/>` or create your own local plugin. ([@paales](https://github.com/paales))

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`85afcf4d0`](https://github.com/graphcommerce-org/graphcommerce/commit/85afcf4d011701f4b80e59e2b2b52a2e1f99a655) - Google Tagmanager now uses the new plugin system ([@paales](https://github.com/paales))

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`493506480`](https://github.com/graphcommerce-org/graphcommerce/commit/4935064809501682ec4df55ea47e022550dcd336) - Google Recaptcha now uses the new plugin system. Whenever the @graphcommerce/ecommerce-ui ApolloErrorAlert, ApolloErrorFullPage and ApolloErrorSnackbar components are rendered it will activate the Google Recaptcha plugins. ([@paales](https://github.com/paales))

- [#1737](https://github.com/graphcommerce-org/graphcommerce/pull/1737) [`1f5ece0c2`](https://github.com/graphcommerce-org/graphcommerce/commit/1f5ece0c24524f33561614adf09f669d305666b0) - Allow Simple Products to show the Confgurable product page. Created a new defaultConfigurableOptionsSelection utility function to set up all the data correctly. ([@paales](https://github.com/paales))

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`fc9de1160`](https://github.com/graphcommerce-org/graphcommerce/commit/fc9de1160714cb909a9d0cb6fc0c068422f35310) - GoogleTagManagerScript is now added with a plugin ([@paales](https://github.com/paales))

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`85afcf4d0`](https://github.com/graphcommerce-org/graphcommerce/commit/85afcf4d011701f4b80e59e2b2b52a2e1f99a655) - Google Analytics now uses the new plugin system ([@paales](https://github.com/paales))

### Patch Changes

- [#1722](https://github.com/graphcommerce-org/graphcommerce/pull/1722) [`7b36ea1d1`](https://github.com/graphcommerce-org/graphcommerce/commit/7b36ea1d100239892f21f67e5606852dd29b7c75) - Feature/fix cross sell item ([@FrankHarland](https://github.com/FrankHarland))

- [#1718](https://github.com/graphcommerce-org/graphcommerce/pull/1718) [`416ce4e99`](https://github.com/graphcommerce-org/graphcommerce/commit/416ce4e996910b83dd229cbaeef64d8c49f5da2f) - Do not use the loopback method for local development, as that doesn’t improve perf ([@paales](https://github.com/paales))

- [#1734](https://github.com/graphcommerce-org/graphcommerce/pull/1734) [`e2683dbfc`](https://github.com/graphcommerce-org/graphcommerce/commit/e2683dbfce440b8e1f745228d8ca4747156c87e6) - GraphQL HttpLink wasn't created, not allow to generate new pages on Vercel. ([@github-actions](https://github.com/apps/github-actions))

- [#1718](https://github.com/graphcommerce-org/graphcommerce/pull/1718) [`acef2a3ae`](https://github.com/graphcommerce-org/graphcommerce/commit/acef2a3aedd60e1882330cde56877bf26857d238) - Make the modules prop optional for the `<PaymentMethodContextProvider />` component ([@paales](https://github.com/paales))

## 5.0.0-canary.14

## 5.0.0-canary.13

### Major Changes

- [`e4c7fe17e`](https://github.com/graphcommerce-org/graphcommerce/commit/e4c7fe17e413e37362ceae92e67f1b3a5f62d398) - Bump major version of all packages ([@paales](https://github.com/paales))

## 4.14.0-canary.12

## 4.14.0-canary.11

## 4.14.0-canary.10

## 4.14.0-canary.9

## 4.14.0-canary.8

### Patch Changes

- [`e2683dbfc`](https://github.com/graphcommerce-org/graphcommerce/commit/e2683dbfce440b8e1f745228d8ca4747156c87e6) - GraphQL HttpLink wasn't created, not allow to generate new pages on Vercel. ([@paales](https://github.com/paales))

## 4.14.0-canary.7

## 4.14.0-canary.6

### Minor Changes

- [#1737](https://github.com/graphcommerce-org/graphcommerce/pull/1737) [`1f5ece0c2`](https://github.com/graphcommerce-org/graphcommerce/commit/1f5ece0c24524f33561614adf09f669d305666b0) - Allow Simple Products to show the Confgurable product page. Created a new defaultConfigurableOptionsSelection utility function to set up all the data correctly. ([@paales](https://github.com/paales))

## 4.14.0-canary.5

## 4.14.0-canary.4

### Minor Changes

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`761bd2832`](https://github.com/graphcommerce-org/graphcommerce/commit/761bd2832f115afc8b95bedbf479266309dd5acc) - ApolloLinks, typePolicies and migration scripts are now handled with plugins on the new library component `<GraphQLProvider/>`. Hygraph's, Magento Cart, Customer, Store, Wishlist and Magento GraphQL are all migrated to be using plugins.

  If you are using custom `links` / `policies` / `migrations` you can pass them as props to the `<GraphQLProvider/>` or create your own local plugin. ([@paales](https://github.com/paales))

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`85afcf4d0`](https://github.com/graphcommerce-org/graphcommerce/commit/85afcf4d011701f4b80e59e2b2b52a2e1f99a655) - Google Tagmanager now uses the new plugin system ([@paales](https://github.com/paales))

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`493506480`](https://github.com/graphcommerce-org/graphcommerce/commit/4935064809501682ec4df55ea47e022550dcd336) - Google Recaptcha now uses the new plugin system. Whenever the @graphcommerce/ecommerce-ui ApolloErrorAlert, ApolloErrorFullPage and ApolloErrorSnackbar components are rendered it will activate the Google Recaptcha plugins. ([@paales](https://github.com/paales))

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`fc9de1160`](https://github.com/graphcommerce-org/graphcommerce/commit/fc9de1160714cb909a9d0cb6fc0c068422f35310) - GoogleTagManagerScript is now added with a plugin ([@paales](https://github.com/paales))

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`85afcf4d0`](https://github.com/graphcommerce-org/graphcommerce/commit/85afcf4d011701f4b80e59e2b2b52a2e1f99a655) - Google Analytics now uses the new plugin system ([@paales](https://github.com/paales))

## 4.14.0-canary.3

## 4.14.0-canary.2

### Patch Changes

- [#1718](https://github.com/graphcommerce-org/graphcommerce/pull/1718) [`416ce4e99`](https://github.com/graphcommerce-org/graphcommerce/commit/416ce4e996910b83dd229cbaeef64d8c49f5da2f) - Do not use the loopback method for local development, as that doesn’t improve perf ([@paales](https://github.com/paales))

- [#1718](https://github.com/graphcommerce-org/graphcommerce/pull/1718) [`acef2a3ae`](https://github.com/graphcommerce-org/graphcommerce/commit/acef2a3aedd60e1882330cde56877bf26857d238) - Make the modules prop optional for the `<PaymentMethodContextProvider />` component ([@paales](https://github.com/paales))

## 4.13.2-canary.1

### Patch Changes

- [#1722](https://github.com/graphcommerce-org/graphcommerce/pull/1722) [`7b36ea1d1`](https://github.com/graphcommerce-org/graphcommerce/commit/7b36ea1d100239892f21f67e5606852dd29b7c75) Thanks [@FrankHarland](https://github.com/FrankHarland)! - Feature/fix cross sell item

## 4.13.2-canary.0

## 4.13.3

## 4.13.2

## 4.13.1

### Patch Changes

- [#1716](https://github.com/graphcommerce-org/graphcommerce/pull/1716) [`074d501f8`](https://github.com/graphcommerce-org/graphcommerce/commit/074d501f86a2c692d64e6a8b03edeea9487557ad) Thanks [@github-actions](https://github.com/apps/github-actions)! - Fix issue where standalone installations would throw an error

## 4.13.1-canary.2

## 4.13.1-canary.1

### Patch Changes

- [#1710](https://github.com/graphcommerce-org/graphcommerce/pull/1710) [`231dd4925`](https://github.com/graphcommerce-org/graphcommerce/commit/231dd49257438da38edbe6405f5863cdd45aa924) Thanks [@paales](https://github.com/paales)! - Fix issue where standalone installations would throw an error

## 4.13.1-canary.0

## 4.13.0

### Minor Changes

- [#1613](https://github.com/graphcommerce-org/graphcommerce/pull/1613) [`6c1c69ca4`](https://github.com/graphcommerce-org/graphcommerce/commit/6c1c69ca45ea1c8737cc7dcdc341fe5d825ed380) Thanks [@paales](https://github.com/paales)! - Refactor next-config to also use the new resolveDependenciesSync by exposing withGraphCommerce

- [#1613](https://github.com/graphcommerce-org/graphcommerce/pull/1613) [`1ef81efa2`](https://github.com/graphcommerce-org/graphcommerce/commit/1ef81efa238b2e79312ab35c6829abec266e4ad1) Thanks [@paales](https://github.com/paales)! - All codegen files that need to be scanned will be handled by a new resolveDependenciesSync method

- [#1613](https://github.com/graphcommerce-org/graphcommerce/pull/1613) [`c5af837f8`](https://github.com/graphcommerce-org/graphcommerce/commit/c5af837f86ac097089eded39dcdd0100f61a1990) Thanks [@paales](https://github.com/paales)! - Remove the usage of scripts_local

### Patch Changes

- [#1613](https://github.com/graphcommerce-org/graphcommerce/pull/1613) [`d95ec2ae6`](https://github.com/graphcommerce-org/graphcommerce/commit/d95ec2ae6d8da574995c2b110425c4445b30351b) Thanks [@paales](https://github.com/paales)! - Removed the usage of a separate env variables for the monorepo for lingui, creating command parity with non monorepo setups.

- [#1702](https://github.com/graphcommerce-org/graphcommerce/pull/1702) [`abb15ef4a`](https://github.com/graphcommerce-org/graphcommerce/commit/abb15ef4a79b12eddb32cc006e5d1d31dd06ac2d) Thanks [@paales](https://github.com/paales)! - Added canary releases to GraphCommerce

- [#1613](https://github.com/graphcommerce-org/graphcommerce/pull/1613) [`da20e4e72`](https://github.com/graphcommerce-org/graphcommerce/commit/da20e4e72ca3f29216592e0ecfb59c0e44bcbe20) Thanks [@paales](https://github.com/paales)! - Created an is-monorepo command to exectute scripts based if they are in the monorepo or in a project

## 4.13.0-canary.1

### Patch Changes

- [`abb15ef4a`](https://github.com/graphcommerce-org/graphcommerce/commit/abb15ef4a79b12eddb32cc006e5d1d31dd06ac2d) Thanks [@paales](https://github.com/paales)! - Added canary releases to GraphCommerce

## 4.13.0-canary.0

### Minor Changes

- [#1613](https://github.com/graphcommerce-org/graphcommerce/pull/1613) [`6c1c69ca4`](https://github.com/graphcommerce-org/graphcommerce/commit/6c1c69ca45ea1c8737cc7dcdc341fe5d825ed380) Thanks [@paales](https://github.com/paales)! - Refactor next-config to also use the new resolveDependenciesSync by exposing withGraphCommerce

- [#1613](https://github.com/graphcommerce-org/graphcommerce/pull/1613) [`1ef81efa2`](https://github.com/graphcommerce-org/graphcommerce/commit/1ef81efa238b2e79312ab35c6829abec266e4ad1) Thanks [@paales](https://github.com/paales)! - All codegen files that need to be scanned will be handled by a new resolveDependenciesSync method

- [#1613](https://github.com/graphcommerce-org/graphcommerce/pull/1613) [`c5af837f8`](https://github.com/graphcommerce-org/graphcommerce/commit/c5af837f86ac097089eded39dcdd0100f61a1990) Thanks [@paales](https://github.com/paales)! - Remove the usage of scripts_local

### Patch Changes

- [#1613](https://github.com/graphcommerce-org/graphcommerce/pull/1613) [`d95ec2ae6`](https://github.com/graphcommerce-org/graphcommerce/commit/d95ec2ae6d8da574995c2b110425c4445b30351b) Thanks [@paales](https://github.com/paales)! - Removed the usage of a separate env variables for the monorepo for lingui, creating command parity with non monorepo setups.

- [#1613](https://github.com/graphcommerce-org/graphcommerce/pull/1613) [`da20e4e72`](https://github.com/graphcommerce-org/graphcommerce/commit/da20e4e72ca3f29216592e0ecfb59c0e44bcbe20) Thanks [@paales](https://github.com/paales)! - Created an is-monorepo command to exectute scripts based if they are in the monorepo or in a project

## 3.28.7

### Patch Changes

- Updated dependencies [[`63e52a25d`](https://github.com/graphcommerce-org/graphcommerce/commit/63e52a25d35aa9600820155760fce23e91920185)]:
  - @graphcommerce/magento-payment-paypal@1.0.2

## 3.28.6

### Patch Changes

- Updated dependencies [[`a7fbe58d4`](https://github.com/graphcommerce-org/graphcommerce/commit/a7fbe58d4bbb43c59fa2ead05935757d2013404c), [`a26a2d05e`](https://github.com/graphcommerce-org/graphcommerce/commit/a26a2d05eecabeeef70e4d69105343197ae092b7), [`edbecfbfd`](https://github.com/graphcommerce-org/graphcommerce/commit/edbecfbfd532a6c78ae75ffe850c4bcf898e855d)]:
  - @graphcommerce/magento-cart-payment-method@3.6.9
  - @graphcommerce/magento-payment-paypal@1.0.1
  - @graphcommerce/magento-cart@4.9.5
  - @graphcommerce/magento-customer-order@3.1.15
  - @graphcommerce/magento-product@4.8.4
  - @graphcommerce/magento-review@3.4.10
  - @graphcommerce/magento-payment-braintree@3.0.66
  - @graphcommerce/magento-payment-included@3.2.5
  - @graphcommerce/mollie-magento-payment@3.5.19
  - @graphcommerce/magento-cart-billing-address@3.1.19
  - @graphcommerce/magento-cart-checkout@3.0.69
  - @graphcommerce/magento-cart-coupon@3.2.19
  - @graphcommerce/magento-cart-email@3.0.69
  - @graphcommerce/magento-cart-items@3.1.21
  - @graphcommerce/magento-cart-shipping-address@3.5.9
  - @graphcommerce/magento-cart-shipping-method@3.7.9
  - @graphcommerce/magento-newsletter@2.2.10
  - @graphcommerce/magento-product-bundle@4.1.10
  - @graphcommerce/magento-product-configurable@4.3.10
  - @graphcommerce/magento-product-downloadable@4.1.10
  - @graphcommerce/magento-product-grouped@3.1.10
  - @graphcommerce/magento-product-simple@4.1.10
  - @graphcommerce/magento-product-virtual@4.1.10
  - @graphcommerce/magento-wishlist@1.7.10
  - @graphcommerce/magento-customer-account@3.2.19
  - @graphcommerce/googleanalytics@3.0.6
  - @graphcommerce/magento-category@4.8.4
  - @graphcommerce/magento-cart-pickup@3.2.9

## 3.28.5

### Patch Changes

- [#1688](https://github.com/graphcommerce-org/graphcommerce/pull/1688) [`4490bde21`](https://github.com/graphcommerce-org/graphcommerce/commit/4490bde217c49d022d39486b21ca77a7dbc74f4c) Thanks [@paales](https://github.com/paales)! - Created PayPal express integration

- Updated dependencies [[`8393cb266`](https://github.com/graphcommerce-org/graphcommerce/commit/8393cb2662860be0c2aa5df432447bb73c427d8e), [`f544401c7`](https://github.com/graphcommerce-org/graphcommerce/commit/f544401c7b653fda39c7c260ad0dcfb3bf543b65), [`f105d4223`](https://github.com/graphcommerce-org/graphcommerce/commit/f105d4223aa68df30970149e51ae72897e489bf9), [`ea6f120eb`](https://github.com/graphcommerce-org/graphcommerce/commit/ea6f120eb46d18c8be48fd7ecfa9b5b838875c6c), [`e0be98a26`](https://github.com/graphcommerce-org/graphcommerce/commit/e0be98a260882039a59a785f41e26517797307fd), [`4490bde21`](https://github.com/graphcommerce-org/graphcommerce/commit/4490bde217c49d022d39486b21ca77a7dbc74f4c)]:
  - @graphcommerce/magento-payment-included@3.2.4
  - @graphcommerce/mollie-magento-payment@3.5.18
  - @graphcommerce/next-ui@4.29.3
  - @graphcommerce/magento-cart-payment-method@3.6.8
  - @graphcommerce/ecommerce-ui@1.5.8
  - @graphcommerce/magento-product@4.8.3
  - @graphcommerce/magento-cart-billing-address@3.1.18
  - @graphcommerce/magento-cart-shipping-address@3.5.8
  - @graphcommerce/magento-customer@4.12.4
  - @graphcommerce/magento-payment-paypal@1.0.0
  - @graphcommerce/framer-scroller@2.1.45
  - @graphcommerce/googleanalytics@3.0.5
  - @graphcommerce/graphcms-ui@3.1.6
  - @graphcommerce/magento-cart@4.9.4
  - @graphcommerce/magento-cart-checkout@3.0.68
  - @graphcommerce/magento-cart-coupon@3.2.18
  - @graphcommerce/magento-cart-email@3.0.68
  - @graphcommerce/magento-cart-items@3.1.20
  - @graphcommerce/magento-cart-pickup@3.2.8
  - @graphcommerce/magento-cart-shipping-method@3.7.8
  - @graphcommerce/magento-category@4.8.3
  - @graphcommerce/magento-customer-account@3.2.18
  - @graphcommerce/magento-customer-order@3.1.14
  - @graphcommerce/magento-newsletter@2.2.9
  - @graphcommerce/magento-payment-braintree@3.0.65
  - @graphcommerce/magento-product-bundle@4.1.9
  - @graphcommerce/magento-product-configurable@4.3.9
  - @graphcommerce/magento-product-downloadable@4.1.9
  - @graphcommerce/magento-review@3.4.9
  - @graphcommerce/magento-search@4.2.16
  - @graphcommerce/magento-store@4.3.6
  - @graphcommerce/magento-wishlist@1.7.9
  - @graphcommerce/magento-product-grouped@3.1.9
  - @graphcommerce/magento-product-simple@4.1.9
  - @graphcommerce/magento-product-virtual@4.1.9
  - @graphcommerce/magento-cms@4.0.53

## 3.28.4

### Patch Changes

- [#1686](https://github.com/graphcommerce-org/graphcommerce/pull/1686) [`1953c7e27`](https://github.com/graphcommerce-org/graphcommerce/commit/1953c7e27eb606a825fce1ad361393b3c781c6da) Thanks [@paales](https://github.com/paales)! - Product page markup and sticky product image when the sidebar is fairly large

- Updated dependencies [[`1953c7e27`](https://github.com/graphcommerce-org/graphcommerce/commit/1953c7e27eb606a825fce1ad361393b3c781c6da)]:
  - @graphcommerce/magento-cart-payment-method@3.6.7
  - @graphcommerce/magento-cart-pickup@3.2.7
  - @graphcommerce/magento-cart-shipping-address@3.5.7
  - @graphcommerce/magento-cart-shipping-method@3.7.7
  - @graphcommerce/magento-product@4.8.2
  - @graphcommerce/magento-product-bundle@4.1.8
  - @graphcommerce/next-ui@4.29.2
  - @graphcommerce/magento-payment-braintree@3.0.64
  - @graphcommerce/magento-payment-included@3.2.3
  - @graphcommerce/mollie-magento-payment@3.5.17
  - @graphcommerce/googleanalytics@3.0.4
  - @graphcommerce/magento-cart-email@3.0.67
  - @graphcommerce/magento-cart-items@3.1.19
  - @graphcommerce/magento-category@4.8.2
  - @graphcommerce/magento-product-configurable@4.3.8
  - @graphcommerce/magento-product-downloadable@4.1.8
  - @graphcommerce/magento-product-grouped@3.1.8
  - @graphcommerce/magento-product-simple@4.1.8
  - @graphcommerce/magento-product-virtual@4.1.8
  - @graphcommerce/magento-review@3.4.8
  - @graphcommerce/magento-wishlist@1.7.8
  - @graphcommerce/ecommerce-ui@1.5.7
  - @graphcommerce/framer-scroller@2.1.44
  - @graphcommerce/graphcms-ui@3.1.5
  - @graphcommerce/magento-cart@4.9.3
  - @graphcommerce/magento-cart-billing-address@3.1.17
  - @graphcommerce/magento-cart-checkout@3.0.67
  - @graphcommerce/magento-cart-coupon@3.2.17
  - @graphcommerce/magento-customer@4.12.3
  - @graphcommerce/magento-customer-account@3.2.17
  - @graphcommerce/magento-customer-order@3.1.13
  - @graphcommerce/magento-newsletter@2.2.8
  - @graphcommerce/magento-search@4.2.15
  - @graphcommerce/magento-store@4.3.5
  - @graphcommerce/magento-cms@4.0.52

## 3.28.3

### Patch Changes

- [#1684](https://github.com/graphcommerce-org/graphcommerce/pull/1684) [`ae28fb14c`](https://github.com/graphcommerce-org/graphcommerce/commit/ae28fb14cec298c52970260a4fc2c2551b5f175e) Thanks [@paales](https://github.com/paales)! - Only show products in stock on crosssells

- Updated dependencies [[`ae28fb14c`](https://github.com/graphcommerce-org/graphcommerce/commit/ae28fb14cec298c52970260a4fc2c2551b5f175e), [`98d6a9cce`](https://github.com/graphcommerce-org/graphcommerce/commit/98d6a9cce1bb9514088be0af2736721b3edda467), [`aab6b4fa5`](https://github.com/graphcommerce-org/graphcommerce/commit/aab6b4fa5b4708003cfb5bf673a617dc5dbf3078)]:
  - @graphcommerce/magento-cart@4.9.2
  - @graphcommerce/next-ui@4.29.1
  - @graphcommerce/magento-product@4.8.1
  - @graphcommerce/magento-cart-billing-address@3.1.16
  - @graphcommerce/magento-cart-checkout@3.0.66
  - @graphcommerce/magento-cart-coupon@3.2.16
  - @graphcommerce/magento-cart-email@3.0.66
  - @graphcommerce/magento-cart-items@3.1.18
  - @graphcommerce/magento-cart-payment-method@3.6.6
  - @graphcommerce/magento-cart-shipping-address@3.5.6
  - @graphcommerce/magento-cart-shipping-method@3.7.6
  - @graphcommerce/magento-newsletter@2.2.7
  - @graphcommerce/magento-payment-braintree@3.0.63
  - @graphcommerce/magento-payment-included@3.2.2
  - @graphcommerce/magento-product-bundle@4.1.7
  - @graphcommerce/magento-product-configurable@4.3.7
  - @graphcommerce/magento-product-downloadable@4.1.7
  - @graphcommerce/magento-product-grouped@3.1.7
  - @graphcommerce/magento-product-simple@4.1.7
  - @graphcommerce/magento-product-virtual@4.1.7
  - @graphcommerce/magento-wishlist@1.7.7
  - @graphcommerce/mollie-magento-payment@3.5.16
  - @graphcommerce/ecommerce-ui@1.5.6
  - @graphcommerce/framer-scroller@2.1.43
  - @graphcommerce/googleanalytics@3.0.3
  - @graphcommerce/graphcms-ui@3.1.4
  - @graphcommerce/magento-cart-pickup@3.2.6
  - @graphcommerce/magento-category@4.8.1
  - @graphcommerce/magento-customer@4.12.2
  - @graphcommerce/magento-customer-account@3.2.16
  - @graphcommerce/magento-customer-order@3.1.12
  - @graphcommerce/magento-review@3.4.7
  - @graphcommerce/magento-search@4.2.14
  - @graphcommerce/magento-store@4.3.4
  - @graphcommerce/magento-cms@4.0.51

## 3.28.2

### Patch Changes

- [#1679](https://github.com/graphcommerce-org/graphcommerce/pull/1679) [`2b5451395`](https://github.com/graphcommerce-org/graphcommerce/commit/2b5451395dc1173de55d18d08968866e561f90ab) Thanks [@paales](https://github.com/paales)! - Move AddProductsToCartSnackbar to inside AddProductsToCartForm and make AddProductsToCartForm configrable via theme.ts

- [#1679](https://github.com/graphcommerce-org/graphcommerce/pull/1679) [`63212f475`](https://github.com/graphcommerce-org/graphcommerce/commit/63212f47509acc88b0d88cfd9f9b85f5813eb31f) Thanks [@paales](https://github.com/paales)! - When adding a crosssell to the cart directly from the list, it would jump down while it was loading, show the old crosssels while loading

- [#1679](https://github.com/graphcommerce-org/graphcommerce/pull/1679) [`2f303401f`](https://github.com/graphcommerce-org/graphcommerce/commit/2f303401f68c95a3a547ebe1ac5caed2623a989e) Thanks [@paales](https://github.com/paales)! - Explicitly use a type=“button” so it isn’t registered as a submit handler

- [#1679](https://github.com/graphcommerce-org/graphcommerce/pull/1679) [`ac4a7481d`](https://github.com/graphcommerce-org/graphcommerce/commit/ac4a7481dc7a90222074751f32a65eccec97ba52) Thanks [@paales](https://github.com/paales)! - Let crosssels use a floating variant on desktop

- [#1679](https://github.com/graphcommerce-org/graphcommerce/pull/1679) [`5d5da13fd`](https://github.com/graphcommerce-org/graphcommerce/commit/5d5da13fd873cd0eb4539c129a4e4baba779fc27) Thanks [@paales](https://github.com/paales)! - Renamed crosssell label to Complete your purchase

- Updated dependencies [[`2b5451395`](https://github.com/graphcommerce-org/graphcommerce/commit/2b5451395dc1173de55d18d08968866e561f90ab), [`e76df6dc3`](https://github.com/graphcommerce-org/graphcommerce/commit/e76df6dc37c11c793a5d008ba36932d17dc23855), [`c4ed376e2`](https://github.com/graphcommerce-org/graphcommerce/commit/c4ed376e2c72b16b34704d7d1ca69c074de172ba), [`78d7d51cb`](https://github.com/graphcommerce-org/graphcommerce/commit/78d7d51cb1551601d3a4756cd1f2157a49ff93b9), [`0bd9ea582`](https://github.com/graphcommerce-org/graphcommerce/commit/0bd9ea58230dde79c5fe2cdb07e9860151460270)]:
  - @graphcommerce/magento-product@4.8.0
  - @graphcommerce/next-ui@4.29.0
  - @graphcommerce/magento-category@4.8.0
  - @graphcommerce/googleanalytics@3.0.2
  - @graphcommerce/magento-cart-email@3.0.65
  - @graphcommerce/magento-cart-items@3.1.17
  - @graphcommerce/magento-payment-braintree@3.0.62
  - @graphcommerce/magento-payment-included@3.2.1
  - @graphcommerce/magento-product-bundle@4.1.6
  - @graphcommerce/magento-product-configurable@4.3.6
  - @graphcommerce/magento-product-downloadable@4.1.6
  - @graphcommerce/magento-product-grouped@3.1.6
  - @graphcommerce/magento-product-simple@4.1.6
  - @graphcommerce/magento-product-virtual@4.1.6
  - @graphcommerce/magento-review@3.4.6
  - @graphcommerce/magento-wishlist@1.7.6
  - @graphcommerce/mollie-magento-payment@3.5.15
  - @graphcommerce/ecommerce-ui@1.5.5
  - @graphcommerce/framer-scroller@2.1.42
  - @graphcommerce/graphcms-ui@3.1.3
  - @graphcommerce/magento-cart@4.9.1
  - @graphcommerce/magento-cart-billing-address@3.1.15
  - @graphcommerce/magento-cart-checkout@3.0.65
  - @graphcommerce/magento-cart-coupon@3.2.15
  - @graphcommerce/magento-cart-payment-method@3.6.5
  - @graphcommerce/magento-cart-pickup@3.2.5
  - @graphcommerce/magento-cart-shipping-address@3.5.5
  - @graphcommerce/magento-cart-shipping-method@3.7.5
  - @graphcommerce/magento-customer@4.12.1
  - @graphcommerce/magento-customer-account@3.2.15
  - @graphcommerce/magento-customer-order@3.1.11
  - @graphcommerce/magento-newsletter@2.2.6
  - @graphcommerce/magento-search@4.2.13
  - @graphcommerce/magento-store@4.3.3
  - @graphcommerce/magento-cms@4.0.50

## 3.28.1

### Patch Changes

- Updated dependencies [[`55cabbbc5`](https://github.com/graphcommerce-org/graphcommerce/commit/55cabbbc517b35c5f909bd771e619a87614e4c97)]:
  - @graphcommerce/googleanalytics@3.0.1

## 3.28.0

### Minor Changes

- [#1675](https://github.com/graphcommerce-org/graphcommerce/pull/1675) [`1b1504c9b`](https://github.com/graphcommerce-org/graphcommerce/commit/1b1504c9b0e51f2787bce91e1ff1940f540411d6) Thanks [@paales](https://github.com/paales)! - Added crosssel functionality

- [#1655](https://github.com/graphcommerce-org/graphcommerce/pull/1655) [`3dde492ad`](https://github.com/graphcommerce-org/graphcommerce/commit/3dde492ad3a49d96481eeb7453fb305d0017b1a5) Thanks [@FrankHarland](https://github.com/FrankHarland)! - Added Google Analytics support.

### Patch Changes

- [#1675](https://github.com/graphcommerce-org/graphcommerce/pull/1675) [`4b1706fef`](https://github.com/graphcommerce-org/graphcommerce/commit/4b1706fef05488600ed93ce6cf04972d632a8e65) Thanks [@paales](https://github.com/paales)! - Update `@graphql-tools/url-loader` to latest version

- Updated dependencies [[`9e630670f`](https://github.com/graphcommerce-org/graphcommerce/commit/9e630670ff6c952ab7b938d890b5509804985cf3), [`cf3518499`](https://github.com/graphcommerce-org/graphcommerce/commit/cf351849999ad6fe73ce2bb258098a7dd301d517), [`81f31d1e5`](https://github.com/graphcommerce-org/graphcommerce/commit/81f31d1e54397368088a4289aaddd29facfceeef), [`2e9fa5984`](https://github.com/graphcommerce-org/graphcommerce/commit/2e9fa5984a07ff14fc1b3a4f62189a26e8e3ecdd), [`82a0c9049`](https://github.com/graphcommerce-org/graphcommerce/commit/82a0c904992f104bc1ffc3b1be65eb17bdd0ef1d), [`f2276e263`](https://github.com/graphcommerce-org/graphcommerce/commit/f2276e2639cb6d58035962c36a6a8cfc53460395), [`adf13069a`](https://github.com/graphcommerce-org/graphcommerce/commit/adf13069af6460c960276b402237371c12fc6dec), [`a8905d263`](https://github.com/graphcommerce-org/graphcommerce/commit/a8905d263273cb9322583d5759a5fdc66eceb8e4), [`1b1504c9b`](https://github.com/graphcommerce-org/graphcommerce/commit/1b1504c9b0e51f2787bce91e1ff1940f540411d6), [`1b1504c9b`](https://github.com/graphcommerce-org/graphcommerce/commit/1b1504c9b0e51f2787bce91e1ff1940f540411d6), [`8a34f8081`](https://github.com/graphcommerce-org/graphcommerce/commit/8a34f808186274a6fe1d4f309472f1a9c6d00efd), [`3dde492ad`](https://github.com/graphcommerce-org/graphcommerce/commit/3dde492ad3a49d96481eeb7453fb305d0017b1a5)]:
  - @graphcommerce/next-ui@4.28.1
  - @graphcommerce/graphql@3.5.0
  - @graphcommerce/framer-scroller@2.1.41
  - @graphcommerce/magento-cart-payment-method@3.6.4
  - @graphcommerce/magento-wishlist@1.7.5
  - @graphcommerce/magento-cart@4.9.0
  - @graphcommerce/magento-cart-checkout@3.0.64
  - @graphcommerce/magento-cart-items@3.1.16
  - @graphcommerce/magento-customer@4.12.0
  - @graphcommerce/magento-customer-order@3.1.10
  - @graphcommerce/magento-product@4.7.3
  - @graphcommerce/magento-product-bundle@4.1.5
  - @graphcommerce/magento-product-configurable@4.3.5
  - @graphcommerce/magento-review@3.4.5
  - @graphcommerce/magento-payment-included@3.2.0
  - @graphcommerce/ecommerce-ui@1.5.4
  - @graphcommerce/googleanalytics@3.0.0
  - @graphcommerce/graphcms-ui@3.1.2
  - @graphcommerce/magento-cart-billing-address@3.1.14
  - @graphcommerce/magento-cart-coupon@3.2.14
  - @graphcommerce/magento-cart-email@3.0.64
  - @graphcommerce/magento-cart-pickup@3.2.4
  - @graphcommerce/magento-cart-shipping-address@3.5.4
  - @graphcommerce/magento-cart-shipping-method@3.7.4
  - @graphcommerce/magento-category@4.7.2
  - @graphcommerce/magento-customer-account@3.2.14
  - @graphcommerce/magento-newsletter@2.2.5
  - @graphcommerce/magento-payment-braintree@3.0.61
  - @graphcommerce/magento-product-downloadable@4.1.5
  - @graphcommerce/magento-search@4.2.12
  - @graphcommerce/magento-store@4.3.2
  - @graphcommerce/mollie-magento-payment@3.5.14
  - @graphcommerce/googlerecaptcha@2.1.20
  - @graphcommerce/magento-cms@4.0.49
  - @graphcommerce/magento-graphql@3.1.9
  - @graphcommerce/magento-product-grouped@3.1.5
  - @graphcommerce/magento-product-simple@4.1.5
  - @graphcommerce/magento-product-virtual@4.1.5
  - @graphcommerce/framer-next-pages@3.3.2
  - @graphcommerce/image@3.1.10

## 3.27.5

### Patch Changes

- Updated dependencies [[`97185dc67`](https://github.com/graphcommerce-org/graphcommerce/commit/97185dc670a6d0ce5428393e5b62f786131575fb)]:
  - @graphcommerce/googlerecaptcha@2.1.19

## 3.27.4

### Patch Changes

- Updated dependencies [[`fc32b9ab3`](https://github.com/graphcommerce-org/graphcommerce/commit/fc32b9ab3818eb99c546a89e7f42045a6fbfba81)]:
  - @graphcommerce/ecommerce-ui@1.5.3
  - @graphcommerce/magento-cart@4.8.7
  - @graphcommerce/magento-cart-billing-address@3.1.13
  - @graphcommerce/magento-cart-checkout@3.0.63
  - @graphcommerce/magento-cart-coupon@3.2.13
  - @graphcommerce/magento-cart-email@3.0.63
  - @graphcommerce/magento-cart-items@3.1.15
  - @graphcommerce/magento-cart-payment-method@3.6.3
  - @graphcommerce/magento-cart-pickup@3.2.3
  - @graphcommerce/magento-cart-shipping-method@3.7.3
  - @graphcommerce/magento-customer@4.11.7
  - @graphcommerce/magento-customer-account@3.2.13
  - @graphcommerce/magento-newsletter@2.2.4
  - @graphcommerce/magento-payment-braintree@3.0.60
  - @graphcommerce/magento-payment-included@3.1.32
  - @graphcommerce/magento-product-configurable@4.3.4
  - @graphcommerce/magento-review@3.4.4
  - @graphcommerce/magento-search@4.2.11
  - @graphcommerce/mollie-magento-payment@3.5.13
  - @graphcommerce/magento-cart-shipping-address@3.5.3
  - @graphcommerce/magento-product@4.7.2
  - @graphcommerce/magento-product-bundle@4.1.4
  - @graphcommerce/magento-product-downloadable@4.1.4
  - @graphcommerce/magento-product-grouped@3.1.4
  - @graphcommerce/magento-product-simple@4.1.4
  - @graphcommerce/magento-product-virtual@4.1.4
  - @graphcommerce/magento-wishlist@1.7.4
  - @graphcommerce/magento-category@4.7.1

## 3.27.3

### Patch Changes

- [#1662](https://github.com/graphcommerce-org/graphcommerce/pull/1662) [`0c21c5c23`](https://github.com/graphcommerce-org/graphcommerce/commit/0c21c5c233ebab15f6629c234e3de1cc8c0452e1) Thanks [@paales](https://github.com/paales)! - Implement serverRenderDepth prop to the Navigation to limit initial render time and TBT

* [#1662](https://github.com/graphcommerce-org/graphcommerce/pull/1662) [`de8925aa9`](https://github.com/graphcommerce-org/graphcommerce/commit/de8925aa910b191c62041530c68c697a58a1e52d) Thanks [@paales](https://github.com/paales)! - Allow for a custom Component for magentoMenuToNavigation and allow React.ReactNode for items

* Updated dependencies [[`93c8f3a3f`](https://github.com/graphcommerce-org/graphcommerce/commit/93c8f3a3f2fd2d16e5a5132652bf489858583f63), [`0c21c5c23`](https://github.com/graphcommerce-org/graphcommerce/commit/0c21c5c233ebab15f6629c234e3de1cc8c0452e1), [`de8925aa9`](https://github.com/graphcommerce-org/graphcommerce/commit/de8925aa910b191c62041530c68c697a58a1e52d), [`f5eae0afd`](https://github.com/graphcommerce-org/graphcommerce/commit/f5eae0afdbd474b1f81c450425ffadf2d025187a), [`9e0ca73eb`](https://github.com/graphcommerce-org/graphcommerce/commit/9e0ca73eb50ded578f4a98e40a7eb920bf8ab421)]:
  - @graphcommerce/magento-cart@4.8.6
  - @graphcommerce/next-ui@4.28.0
  - @graphcommerce/magento-category@4.7.0
  - @graphcommerce/framer-scroller@2.1.40
  - @graphcommerce/framer-next-pages@3.3.1
  - @graphcommerce/magento-cart-billing-address@3.1.12
  - @graphcommerce/magento-cart-checkout@3.0.62
  - @graphcommerce/magento-cart-coupon@3.2.12
  - @graphcommerce/magento-cart-email@3.0.62
  - @graphcommerce/magento-cart-items@3.1.14
  - @graphcommerce/magento-cart-payment-method@3.6.2
  - @graphcommerce/magento-cart-shipping-address@3.5.2
  - @graphcommerce/magento-cart-shipping-method@3.7.2
  - @graphcommerce/magento-newsletter@2.2.3
  - @graphcommerce/magento-payment-braintree@3.0.59
  - @graphcommerce/magento-payment-included@3.1.31
  - @graphcommerce/magento-product@4.7.1
  - @graphcommerce/magento-product-bundle@4.1.3
  - @graphcommerce/magento-product-configurable@4.3.3
  - @graphcommerce/magento-product-downloadable@4.1.3
  - @graphcommerce/magento-product-grouped@3.1.3
  - @graphcommerce/magento-product-simple@4.1.3
  - @graphcommerce/magento-product-virtual@4.1.3
  - @graphcommerce/magento-wishlist@1.7.3
  - @graphcommerce/mollie-magento-payment@3.5.12
  - @graphcommerce/ecommerce-ui@1.5.2
  - @graphcommerce/graphcms-ui@3.1.1
  - @graphcommerce/magento-cart-pickup@3.2.2
  - @graphcommerce/magento-customer@4.11.6
  - @graphcommerce/magento-customer-account@3.2.12
  - @graphcommerce/magento-customer-order@3.1.9
  - @graphcommerce/magento-review@3.4.3
  - @graphcommerce/magento-search@4.2.10
  - @graphcommerce/magento-store@4.3.1
  - @graphcommerce/magento-cms@4.0.48

## 3.27.2

### Patch Changes

- Updated dependencies [[`6987ec7d2`](https://github.com/graphcommerce-org/graphcommerce/commit/6987ec7d21ce2d481fabbd6eda039702fcf5242b)]:
  - @graphcommerce/magento-category@4.6.0
  - @graphcommerce/magento-product@4.7.0
  - @graphcommerce/magento-product-configurable@4.3.2
  - @graphcommerce/magento-cart-email@3.0.61
  - @graphcommerce/magento-cart-items@3.1.13
  - @graphcommerce/magento-product-bundle@4.1.2
  - @graphcommerce/magento-product-downloadable@4.1.2
  - @graphcommerce/magento-product-grouped@3.1.2
  - @graphcommerce/magento-product-simple@4.1.2
  - @graphcommerce/magento-product-virtual@4.1.2
  - @graphcommerce/magento-review@3.4.2
  - @graphcommerce/magento-wishlist@1.7.2
  - @graphcommerce/magento-cart-checkout@3.0.61

## 3.27.1

### Patch Changes

- [#1660](https://github.com/graphcommerce-org/graphcommerce/pull/1660) [`37b1980a0`](https://github.com/graphcommerce-org/graphcommerce/commit/37b1980a04a4a3d77663b404ae83539620cf65b9) Thanks [@paales](https://github.com/paales)! - Do not static build old product pages when the new product page is used an vice versa

- Updated dependencies [[`48e6522bb`](https://github.com/graphcommerce-org/graphcommerce/commit/48e6522bb9424d4bd77fd77c68065f5625f3ec8d), [`37b1980a0`](https://github.com/graphcommerce-org/graphcommerce/commit/37b1980a04a4a3d77663b404ae83539620cf65b9), [`140004b2b`](https://github.com/graphcommerce-org/graphcommerce/commit/140004b2bda44e17a4fe6b3c13c1253ff9e99c92), [`e5048c5ec`](https://github.com/graphcommerce-org/graphcommerce/commit/e5048c5ec52b83dbe70a246ffdcea65b55a884c6)]:
  - @graphcommerce/magento-product@4.6.1
  - @graphcommerce/graphcms-ui@3.1.0
  - @graphcommerce/ecommerce-ui@1.5.1
  - @graphcommerce/magento-cart-email@3.0.60
  - @graphcommerce/magento-cart-items@3.1.12
  - @graphcommerce/magento-category@4.5.12
  - @graphcommerce/magento-payment-braintree@3.0.58
  - @graphcommerce/magento-payment-included@3.1.30
  - @graphcommerce/magento-product-bundle@4.1.1
  - @graphcommerce/magento-product-configurable@4.3.1
  - @graphcommerce/magento-product-downloadable@4.1.1
  - @graphcommerce/magento-product-grouped@3.1.1
  - @graphcommerce/magento-product-simple@4.1.1
  - @graphcommerce/magento-product-virtual@4.1.1
  - @graphcommerce/magento-review@3.4.1
  - @graphcommerce/magento-wishlist@1.7.1
  - @graphcommerce/mollie-magento-payment@3.5.11
  - @graphcommerce/magento-cart@4.8.5
  - @graphcommerce/magento-cart-billing-address@3.1.11
  - @graphcommerce/magento-cart-checkout@3.0.60
  - @graphcommerce/magento-cart-coupon@3.2.11
  - @graphcommerce/magento-cart-payment-method@3.6.1
  - @graphcommerce/magento-cart-pickup@3.2.1
  - @graphcommerce/magento-cart-shipping-method@3.7.1
  - @graphcommerce/magento-customer@4.11.5
  - @graphcommerce/magento-customer-account@3.2.11
  - @graphcommerce/magento-newsletter@2.2.2
  - @graphcommerce/magento-search@4.2.9
  - @graphcommerce/magento-cart-shipping-address@3.5.1

## 3.27.0

### Minor Changes

- [#1642](https://github.com/graphcommerce-org/graphcommerce/pull/1642) [`ad63ebf4e`](https://github.com/graphcommerce-org/graphcommerce/commit/ad63ebf4e33bfb0e5c9e5e68ab69b14775f3f8a8) Thanks [@paales](https://github.com/paales)! - Introduced `<AddProductsToCartForm/>`, which is allows for adding all product types to the cart with a single react-hook-form form.

  Which allows you to fully compose the form on the product page without having to modify the page.

* [#1652](https://github.com/graphcommerce-org/graphcommerce/pull/1652) [`961b06fbb`](https://github.com/graphcommerce-org/graphcommerce/commit/961b06fbbfef3dd9b7b41b3dcdefbe78ddbc58c3) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - Improved useWishlistItems hook, and merge guest wishlist based on url_key instead of sku

- [#1648](https://github.com/graphcommerce-org/graphcommerce/pull/1648) [`f18e47d04`](https://github.com/graphcommerce-org/graphcommerce/commit/f18e47d044ca765cfef82bb47831070afa8ff494) Thanks [@LaurensFranken](https://github.com/LaurensFranken)! - Make review textfield labels translatable and add translations

### Patch Changes

- [#1642](https://github.com/graphcommerce-org/graphcommerce/pull/1642) [`580f0bb67`](https://github.com/graphcommerce-org/graphcommerce/commit/580f0bb67932c1a979177decbea6005492b589fe) Thanks [@paales](https://github.com/paales)! - Disable arrayInputCoercion, this makes handling GraphQL array input types easier in the codebase. Although GraphQL accepts both array and a single value and it is following the spec, this makes handing it much easier.

- Updated dependencies [[`ad63ebf4e`](https://github.com/graphcommerce-org/graphcommerce/commit/ad63ebf4e33bfb0e5c9e5e68ab69b14775f3f8a8), [`9e6fd498e`](https://github.com/graphcommerce-org/graphcommerce/commit/9e6fd498e3242ab30602767ae77a8e22f80d9fd3), [`87c897cda`](https://github.com/graphcommerce-org/graphcommerce/commit/87c897cda1934f072887d5302b7b7ef5ecccd1c0), [`961b06fbb`](https://github.com/graphcommerce-org/graphcommerce/commit/961b06fbbfef3dd9b7b41b3dcdefbe78ddbc58c3), [`b6bf2c941`](https://github.com/graphcommerce-org/graphcommerce/commit/b6bf2c94197ddacbf8f1fc0d352cd0d46e096f30), [`f18e47d04`](https://github.com/graphcommerce-org/graphcommerce/commit/f18e47d044ca765cfef82bb47831070afa8ff494), [`b91b9eb1f`](https://github.com/graphcommerce-org/graphcommerce/commit/b91b9eb1f3f9c2740fcbe03d8047f23941b10dcc)]:
  - @graphcommerce/ecommerce-ui@1.5.0
  - @graphcommerce/magento-cart-payment-method@3.6.0
  - @graphcommerce/magento-cart-pickup@3.2.0
  - @graphcommerce/magento-cart-shipping-address@3.5.0
  - @graphcommerce/magento-cart-shipping-method@3.7.0
  - @graphcommerce/magento-product@4.6.0
  - @graphcommerce/magento-product-bundle@4.1.0
  - @graphcommerce/magento-product-configurable@4.3.0
  - @graphcommerce/magento-product-downloadable@4.1.0
  - @graphcommerce/magento-product-grouped@3.1.0
  - @graphcommerce/magento-product-simple@4.1.0
  - @graphcommerce/magento-product-virtual@4.1.0
  - @graphcommerce/magento-store@4.3.0
  - @graphcommerce/magento-wishlist@1.7.0
  - @graphcommerce/next-ui@4.27.0
  - @graphcommerce/magento-review@3.4.0
  - @graphcommerce/magento-cart@4.8.4
  - @graphcommerce/magento-cart-email@3.0.59
  - @graphcommerce/magento-customer@4.11.4
  - @graphcommerce/magento-payment-braintree@3.0.57
  - @graphcommerce/magento-payment-included@3.1.29
  - @graphcommerce/mollie-magento-payment@3.5.10
  - @graphcommerce/magento-cart-items@3.1.11
  - @graphcommerce/magento-category@4.5.11
  - @graphcommerce/magento-cart-billing-address@3.1.10
  - @graphcommerce/magento-cart-checkout@3.0.59
  - @graphcommerce/magento-cart-coupon@3.2.10
  - @graphcommerce/magento-cms@4.0.47
  - @graphcommerce/magento-customer-account@3.2.10
  - @graphcommerce/magento-customer-order@3.1.8
  - @graphcommerce/framer-scroller@2.1.39
  - @graphcommerce/graphcms-ui@3.0.48
  - @graphcommerce/magento-newsletter@2.2.1
  - @graphcommerce/magento-search@4.2.8

## 3.26.2

### Patch Changes

- [#1645](https://github.com/graphcommerce-org/graphcommerce/pull/1645) [`f0ddcb868`](https://github.com/graphcommerce-org/graphcommerce/commit/f0ddcb86815d0525842c79a168c08e99f5799c76) Thanks [@Jessevdpoel](https://github.com/Jessevdpoel)! - Added Subscribe to newsletter checkbox

- Updated dependencies [[`fad7b6b48`](https://github.com/graphcommerce-org/graphcommerce/commit/fad7b6b48732fd631599c17abd8961de3f49c7dc), [`f0ddcb868`](https://github.com/graphcommerce-org/graphcommerce/commit/f0ddcb86815d0525842c79a168c08e99f5799c76), [`42e7fac75`](https://github.com/graphcommerce-org/graphcommerce/commit/42e7fac75712f9bda7a6b919ede14b3c75d07771)]:
  - @graphcommerce/ecommerce-ui@1.4.0
  - @graphcommerce/magento-newsletter@2.2.0
  - @graphcommerce/next-ui@4.26.0
  - @graphcommerce/magento-cart@4.8.3
  - @graphcommerce/magento-cart-email@3.0.58
  - @graphcommerce/magento-cart-shipping-address@3.4.9
  - @graphcommerce/magento-customer@4.11.3
  - @graphcommerce/framer-scroller@2.1.38
  - @graphcommerce/graphcms-ui@3.0.47
  - @graphcommerce/magento-cart-billing-address@3.1.9
  - @graphcommerce/magento-cart-checkout@3.0.58
  - @graphcommerce/magento-cart-coupon@3.2.9
  - @graphcommerce/magento-cart-items@3.1.10
  - @graphcommerce/magento-cart-payment-method@3.5.9
  - @graphcommerce/magento-cart-pickup@3.1.19
  - @graphcommerce/magento-cart-shipping-method@3.6.9
  - @graphcommerce/magento-category@4.5.10
  - @graphcommerce/magento-customer-account@3.2.9
  - @graphcommerce/magento-customer-order@3.1.7
  - @graphcommerce/magento-payment-braintree@3.0.56
  - @graphcommerce/magento-payment-included@3.1.28
  - @graphcommerce/magento-product@4.5.10
  - @graphcommerce/magento-product-configurable@4.2.11
  - @graphcommerce/magento-review@3.3.10
  - @graphcommerce/magento-search@4.2.7
  - @graphcommerce/magento-store@4.2.35
  - @graphcommerce/magento-wishlist@1.6.11
  - @graphcommerce/mollie-magento-payment@3.5.9
  - @graphcommerce/magento-product-bundle@4.0.58
  - @graphcommerce/magento-product-downloadable@4.0.58
  - @graphcommerce/magento-product-grouped@3.0.58
  - @graphcommerce/magento-product-simple@4.0.58
  - @graphcommerce/magento-product-virtual@4.0.58
  - @graphcommerce/magento-cms@4.0.46

## 3.26.1

### Patch Changes

- Updated dependencies [[`dc6237644`](https://github.com/graphcommerce-org/graphcommerce/commit/dc6237644ac349debb728059e4c937cec25bf4fd), [`48273bccd`](https://github.com/graphcommerce-org/graphcommerce/commit/48273bccd2e471ce4bc024a600e693da791f1cde)]:
  - @graphcommerce/next-ui@4.25.0
  - @graphcommerce/ecommerce-ui@1.3.3
  - @graphcommerce/framer-scroller@2.1.37
  - @graphcommerce/graphcms-ui@3.0.46
  - @graphcommerce/magento-cart@4.8.2
  - @graphcommerce/magento-cart-billing-address@3.1.8
  - @graphcommerce/magento-cart-checkout@3.0.57
  - @graphcommerce/magento-cart-coupon@3.2.8
  - @graphcommerce/magento-cart-email@3.0.57
  - @graphcommerce/magento-cart-items@3.1.9
  - @graphcommerce/magento-cart-payment-method@3.5.8
  - @graphcommerce/magento-cart-pickup@3.1.18
  - @graphcommerce/magento-cart-shipping-address@3.4.8
  - @graphcommerce/magento-cart-shipping-method@3.6.8
  - @graphcommerce/magento-category@4.5.9
  - @graphcommerce/magento-customer@4.11.2
  - @graphcommerce/magento-customer-account@3.2.8
  - @graphcommerce/magento-customer-order@3.1.6
  - @graphcommerce/magento-newsletter@2.1.8
  - @graphcommerce/magento-payment-braintree@3.0.55
  - @graphcommerce/magento-payment-included@3.1.27
  - @graphcommerce/magento-product@4.5.9
  - @graphcommerce/magento-product-configurable@4.2.10
  - @graphcommerce/magento-review@3.3.9
  - @graphcommerce/magento-search@4.2.6
  - @graphcommerce/magento-store@4.2.34
  - @graphcommerce/magento-wishlist@1.6.10
  - @graphcommerce/mollie-magento-payment@3.5.8
  - @graphcommerce/magento-product-bundle@4.0.57
  - @graphcommerce/magento-product-downloadable@4.0.57
  - @graphcommerce/magento-product-grouped@3.0.57
  - @graphcommerce/magento-product-simple@4.0.57
  - @graphcommerce/magento-product-virtual@4.0.57
  - @graphcommerce/magento-cms@4.0.45

## 3.26.0

### Minor Changes

- [#1633](https://github.com/graphcommerce-org/graphcommerce/pull/1633) [`4487db309`](https://github.com/graphcommerce-org/graphcommerce/commit/4487db309df01a22f49876cf4a5574ece303a8ca) Thanks [@timhofman](https://github.com/timhofman)! - Send gcms-locales header to the Hypgraph backend so requests are translated.

### Patch Changes

- Updated dependencies [[`104103bc2`](https://github.com/graphcommerce-org/graphcommerce/commit/104103bc2a0fbaa510af2e26b6b00ddc63e8495b), [`4487db309`](https://github.com/graphcommerce-org/graphcommerce/commit/4487db309df01a22f49876cf4a5574ece303a8ca)]:
  - @graphcommerce/next-ui@4.24.0
  - @graphcommerce/graphql-mesh@4.2.0
  - @graphcommerce/ecommerce-ui@1.3.2
  - @graphcommerce/framer-scroller@2.1.36
  - @graphcommerce/graphcms-ui@3.0.45
  - @graphcommerce/magento-cart@4.8.1
  - @graphcommerce/magento-cart-billing-address@3.1.7
  - @graphcommerce/magento-cart-checkout@3.0.56
  - @graphcommerce/magento-cart-coupon@3.2.7
  - @graphcommerce/magento-cart-email@3.0.56
  - @graphcommerce/magento-cart-items@3.1.8
  - @graphcommerce/magento-cart-payment-method@3.5.7
  - @graphcommerce/magento-cart-pickup@3.1.17
  - @graphcommerce/magento-cart-shipping-address@3.4.7
  - @graphcommerce/magento-cart-shipping-method@3.6.7
  - @graphcommerce/magento-category@4.5.8
  - @graphcommerce/magento-customer@4.11.1
  - @graphcommerce/magento-customer-account@3.2.7
  - @graphcommerce/magento-customer-order@3.1.5
  - @graphcommerce/magento-newsletter@2.1.7
  - @graphcommerce/magento-payment-braintree@3.0.54
  - @graphcommerce/magento-payment-included@3.1.26
  - @graphcommerce/magento-product@4.5.8
  - @graphcommerce/magento-product-configurable@4.2.9
  - @graphcommerce/magento-review@3.3.8
  - @graphcommerce/magento-search@4.2.5
  - @graphcommerce/magento-store@4.2.33
  - @graphcommerce/magento-wishlist@1.6.9
  - @graphcommerce/mollie-magento-payment@3.5.7
  - @graphcommerce/magento-product-bundle@4.0.56
  - @graphcommerce/magento-product-downloadable@4.0.56
  - @graphcommerce/magento-product-grouped@3.0.56
  - @graphcommerce/magento-product-simple@4.0.56
  - @graphcommerce/magento-product-virtual@4.0.56
  - @graphcommerce/magento-cms@4.0.44

## 3.25.5

### Patch Changes

- [#1629](https://github.com/graphcommerce-org/graphcommerce/pull/1629) [`cb94be945`](https://github.com/graphcommerce-org/graphcommerce/commit/cb94be9456622995b83c80d15fa34aab075c0c16) Thanks [@paales](https://github.com/paales)! - Make sure that pages that come from graphcms can render when it isn't associated with a magent ocategory

* [#1629](https://github.com/graphcommerce-org/graphcommerce/pull/1629) [`cb94be945`](https://github.com/graphcommerce-org/graphcommerce/commit/cb94be9456622995b83c80d15fa34aab075c0c16) Thanks [@paales](https://github.com/paales)! - Make sure the checkout pages dont show anything when there is nothing in your cart

* Updated dependencies [[`c1b8b0352`](https://github.com/graphcommerce-org/graphcommerce/commit/c1b8b03520532223f7b572ff23f1d368a4dfe306), [`8d5207288`](https://github.com/graphcommerce-org/graphcommerce/commit/8d52072887f124831ed85d28ec79998f0ce55f1c)]:
  - @graphcommerce/magento-customer@4.11.0
  - @graphcommerce/magento-cart@4.8.0
  - @graphcommerce/magento-cart-billing-address@3.1.6
  - @graphcommerce/magento-cart-checkout@3.0.55
  - @graphcommerce/magento-cart-email@3.0.55
  - @graphcommerce/magento-cart-items@3.1.7
  - @graphcommerce/magento-cart-shipping-address@3.4.6
  - @graphcommerce/magento-customer-account@3.2.6
  - @graphcommerce/magento-newsletter@2.1.6
  - @graphcommerce/magento-product-configurable@4.2.8
  - @graphcommerce/magento-review@3.3.7
  - @graphcommerce/magento-wishlist@1.6.8
  - @graphcommerce/magento-cart-coupon@3.2.6
  - @graphcommerce/magento-cart-payment-method@3.5.6
  - @graphcommerce/magento-cart-shipping-method@3.6.6
  - @graphcommerce/magento-payment-braintree@3.0.53
  - @graphcommerce/magento-payment-included@3.1.25
  - @graphcommerce/magento-product@4.5.7
  - @graphcommerce/magento-product-bundle@4.0.55
  - @graphcommerce/magento-product-downloadable@4.0.55
  - @graphcommerce/magento-product-grouped@3.0.55
  - @graphcommerce/magento-product-simple@4.0.55
  - @graphcommerce/magento-product-virtual@4.0.55
  - @graphcommerce/mollie-magento-payment@3.5.6
  - @graphcommerce/ecommerce-ui@1.3.1
  - @graphcommerce/magento-cart-pickup@3.1.16
  - @graphcommerce/magento-search@4.2.4
  - @graphcommerce/magento-category@4.5.7

## 3.25.4

### Patch Changes

- Updated dependencies [[`b20f3e52a`](https://github.com/graphcommerce-org/graphcommerce/commit/b20f3e52a48751da217e574f0339282155748995), [`b20f3e52a`](https://github.com/graphcommerce-org/graphcommerce/commit/b20f3e52a48751da217e574f0339282155748995)]:
  - @graphcommerce/magento-cart-checkout@3.0.54
  - @graphcommerce/magento-category@4.5.6
  - @graphcommerce/magento-product@4.5.6
  - @graphcommerce/magento-product-configurable@4.2.7
  - @graphcommerce/magento-cart-email@3.0.54
  - @graphcommerce/magento-cart-items@3.1.6
  - @graphcommerce/magento-product-bundle@4.0.54
  - @graphcommerce/magento-product-downloadable@4.0.54
  - @graphcommerce/magento-product-grouped@3.0.54
  - @graphcommerce/magento-product-simple@4.0.54
  - @graphcommerce/magento-product-virtual@4.0.54
  - @graphcommerce/magento-review@3.3.6
  - @graphcommerce/magento-wishlist@1.6.7

## 3.25.3

### Patch Changes

- Updated dependencies [[`e8639ec5f`](https://github.com/graphcommerce-org/graphcommerce/commit/e8639ec5f6759504211d70a966f5c348c6b3a7f6)]:
  - @graphcommerce/ecommerce-ui@1.3.0
  - @graphcommerce/magento-cart-shipping-address@3.4.5
  - @graphcommerce/magento-customer@4.10.5
  - @graphcommerce/magento-cart@4.7.5
  - @graphcommerce/magento-cart-email@3.0.53
  - @graphcommerce/magento-cart-payment-method@3.5.5
  - @graphcommerce/magento-cart-shipping-method@3.6.5
  - @graphcommerce/magento-payment-braintree@3.0.52
  - @graphcommerce/magento-payment-included@3.1.24
  - @graphcommerce/mollie-magento-payment@3.5.5
  - @graphcommerce/magento-cart-billing-address@3.1.5
  - @graphcommerce/magento-cart-checkout@3.0.53
  - @graphcommerce/magento-cart-items@3.1.5
  - @graphcommerce/magento-customer-account@3.2.5
  - @graphcommerce/magento-newsletter@2.1.5
  - @graphcommerce/magento-product-configurable@4.2.6
  - @graphcommerce/magento-review@3.3.5
  - @graphcommerce/magento-wishlist@1.6.6
  - @graphcommerce/magento-cart-coupon@3.2.5
  - @graphcommerce/magento-product@4.5.5
  - @graphcommerce/magento-product-bundle@4.0.53
  - @graphcommerce/magento-product-downloadable@4.0.53
  - @graphcommerce/magento-product-grouped@3.0.53
  - @graphcommerce/magento-product-simple@4.0.53
  - @graphcommerce/magento-product-virtual@4.0.53
  - @graphcommerce/magento-cart-pickup@3.1.15
  - @graphcommerce/magento-category@4.5.5

## 3.25.2

### Patch Changes

- Updated dependencies [[`9b84a68a1`](https://github.com/graphcommerce-org/graphcommerce/commit/9b84a68a1e7311a79eb687c7dcee905d3000facf)]:
  - @graphcommerce/next-ui@4.23.1
  - @graphcommerce/ecommerce-ui@1.2.3
  - @graphcommerce/framer-scroller@2.1.35
  - @graphcommerce/graphcms-ui@3.0.44
  - @graphcommerce/magento-cart@4.7.4
  - @graphcommerce/magento-cart-billing-address@3.1.4
  - @graphcommerce/magento-cart-checkout@3.0.52
  - @graphcommerce/magento-cart-coupon@3.2.4
  - @graphcommerce/magento-cart-email@3.0.52
  - @graphcommerce/magento-cart-items@3.1.4
  - @graphcommerce/magento-cart-payment-method@3.5.4
  - @graphcommerce/magento-cart-pickup@3.1.14
  - @graphcommerce/magento-cart-shipping-address@3.4.4
  - @graphcommerce/magento-cart-shipping-method@3.6.4
  - @graphcommerce/magento-category@4.5.4
  - @graphcommerce/magento-customer@4.10.4
  - @graphcommerce/magento-customer-account@3.2.4
  - @graphcommerce/magento-customer-order@3.1.4
  - @graphcommerce/magento-newsletter@2.1.4
  - @graphcommerce/magento-payment-braintree@3.0.51
  - @graphcommerce/magento-payment-included@3.1.23
  - @graphcommerce/magento-product@4.5.4
  - @graphcommerce/magento-product-configurable@4.2.5
  - @graphcommerce/magento-review@3.3.4
  - @graphcommerce/magento-search@4.2.3
  - @graphcommerce/magento-store@4.2.32
  - @graphcommerce/magento-wishlist@1.6.5
  - @graphcommerce/mollie-magento-payment@3.5.4
  - @graphcommerce/magento-product-bundle@4.0.52
  - @graphcommerce/magento-product-downloadable@4.0.52
  - @graphcommerce/magento-product-grouped@3.0.52
  - @graphcommerce/magento-product-simple@4.0.52
  - @graphcommerce/magento-product-virtual@4.0.52
  - @graphcommerce/magento-cms@4.0.43

## 3.25.1

### Patch Changes

- Updated dependencies [[`396b5de5d`](https://github.com/graphcommerce-org/graphcommerce/commit/396b5de5d50c7b8f59bf636807e7a4b50f14e0b2)]:
  - @graphcommerce/graphql@3.4.8
  - @graphcommerce/magento-graphql@3.1.8
  - @graphcommerce/ecommerce-ui@1.2.2
  - @graphcommerce/googlerecaptcha@2.1.18
  - @graphcommerce/graphcms-ui@3.0.43
  - @graphcommerce/magento-cart@4.7.3
  - @graphcommerce/magento-cart-billing-address@3.1.3
  - @graphcommerce/magento-cart-checkout@3.0.51
  - @graphcommerce/magento-cart-coupon@3.2.3
  - @graphcommerce/magento-cart-email@3.0.51
  - @graphcommerce/magento-cart-items@3.1.3
  - @graphcommerce/magento-cart-payment-method@3.5.3
  - @graphcommerce/magento-cart-pickup@3.1.13
  - @graphcommerce/magento-cart-shipping-address@3.4.3
  - @graphcommerce/magento-cart-shipping-method@3.6.3
  - @graphcommerce/magento-category@4.5.3
  - @graphcommerce/magento-cms@4.0.42
  - @graphcommerce/magento-customer@4.10.3
  - @graphcommerce/magento-customer-account@3.2.3
  - @graphcommerce/magento-customer-order@3.1.3
  - @graphcommerce/magento-newsletter@2.1.3
  - @graphcommerce/magento-payment-braintree@3.0.50
  - @graphcommerce/magento-payment-included@3.1.22
  - @graphcommerce/magento-product@4.5.3
  - @graphcommerce/magento-product-bundle@4.0.51
  - @graphcommerce/magento-product-configurable@4.2.4
  - @graphcommerce/magento-product-downloadable@4.0.51
  - @graphcommerce/magento-product-grouped@3.0.51
  - @graphcommerce/magento-product-simple@4.0.51
  - @graphcommerce/magento-product-virtual@4.0.51
  - @graphcommerce/magento-review@3.3.3
  - @graphcommerce/magento-search@4.2.2
  - @graphcommerce/magento-store@4.2.31
  - @graphcommerce/magento-wishlist@1.6.4
  - @graphcommerce/mollie-magento-payment@3.5.3

## 3.25.0

### Minor Changes

- [#1617](https://github.com/graphcommerce-org/graphcommerce/pull/1617) [`47db867ef`](https://github.com/graphcommerce-org/graphcommerce/commit/47db867efd5f7f54c2912d576f00db57a42c95bc) Thanks [@paales](https://github.com/paales)! - Implement a separate Layout query to allow for better caching from Magento

### Patch Changes

- [#1617](https://github.com/graphcommerce-org/graphcommerce/pull/1617) [`a2fccf87c`](https://github.com/graphcommerce-org/graphcommerce/commit/a2fccf87c84d56d02b7dee0df2e223eb4507a93f) Thanks [@paales](https://github.com/paales)! - Make sure the measurePerformanceLink only gets included on the server

* [#1617](https://github.com/graphcommerce-org/graphcommerce/pull/1617) [`a2fccf87c`](https://github.com/graphcommerce-org/graphcommerce/commit/a2fccf87c84d56d02b7dee0df2e223eb4507a93f) Thanks [@paales](https://github.com/paales)! - Make sure the error link always gets included on the server

- [#1617](https://github.com/graphcommerce-org/graphcommerce/pull/1617) [`fd55e94bf`](https://github.com/graphcommerce-org/graphcommerce/commit/fd55e94bf8321983acb1e325d5c92d003b1f1504) Thanks [@paales](https://github.com/paales)! - Add Cache Control headers to the filtered pages so they stay relatively fresh.

- Updated dependencies [[`978e22c1e`](https://github.com/graphcommerce-org/graphcommerce/commit/978e22c1e1c8f29cfda246a7ec2a24e3b570435c), [`b6427e375`](https://github.com/graphcommerce-org/graphcommerce/commit/b6427e37597b2d0970cc0a14556d8517f2754b73)]:
  - @graphcommerce/googletagmanager@2.0.9
  - @graphcommerce/magento-product-configurable@4.2.3
  - @graphcommerce/magento-wishlist@1.6.3

## 3.24.0

### Minor Changes

- [#1620](https://github.com/graphcommerce-org/graphcommerce/pull/1620) [`755d2cf83`](https://github.com/graphcommerce-org/graphcommerce/commit/755d2cf83343a5ad3d61063eff595d821de360aa) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Add spacing feature to navItems

### Patch Changes

- Updated dependencies [[`755d2cf83`](https://github.com/graphcommerce-org/graphcommerce/commit/755d2cf83343a5ad3d61063eff595d821de360aa), [`dc7f2dda4`](https://github.com/graphcommerce-org/graphcommerce/commit/dc7f2dda40ff8572fc11161de6eb62ca13e720dd)]:
  - @graphcommerce/next-ui@4.23.0
  - @graphcommerce/ecommerce-ui@1.2.1
  - @graphcommerce/framer-scroller@2.1.34
  - @graphcommerce/graphcms-ui@3.0.42
  - @graphcommerce/magento-cart@4.7.2
  - @graphcommerce/magento-cart-billing-address@3.1.2
  - @graphcommerce/magento-cart-checkout@3.0.50
  - @graphcommerce/magento-cart-coupon@3.2.2
  - @graphcommerce/magento-cart-email@3.0.50
  - @graphcommerce/magento-cart-items@3.1.2
  - @graphcommerce/magento-cart-payment-method@3.5.2
  - @graphcommerce/magento-cart-pickup@3.1.12
  - @graphcommerce/magento-cart-shipping-address@3.4.2
  - @graphcommerce/magento-cart-shipping-method@3.6.2
  - @graphcommerce/magento-category@4.5.2
  - @graphcommerce/magento-customer@4.10.2
  - @graphcommerce/magento-customer-account@3.2.2
  - @graphcommerce/magento-customer-order@3.1.2
  - @graphcommerce/magento-newsletter@2.1.2
  - @graphcommerce/magento-payment-braintree@3.0.49
  - @graphcommerce/magento-payment-included@3.1.21
  - @graphcommerce/magento-product@4.5.2
  - @graphcommerce/magento-product-configurable@4.2.2
  - @graphcommerce/magento-review@3.3.2
  - @graphcommerce/magento-search@4.2.1
  - @graphcommerce/magento-store@4.2.30
  - @graphcommerce/magento-wishlist@1.6.2
  - @graphcommerce/mollie-magento-payment@3.5.2
  - @graphcommerce/magento-product-bundle@4.0.50
  - @graphcommerce/magento-product-downloadable@4.0.50
  - @graphcommerce/magento-product-grouped@3.0.50
  - @graphcommerce/magento-product-simple@4.0.50
  - @graphcommerce/magento-product-virtual@4.0.50
  - @graphcommerce/magento-cms@4.0.41

## 3.23.1

### Patch Changes

- Updated dependencies [[`448c77681`](https://github.com/graphcommerce-org/graphcommerce/commit/448c77681f9a7794e84ec93139d7e0f16afafbd9)]:
  - @graphcommerce/cli@1.0.10
  - @graphcommerce/graphql-mesh@4.1.9
  - @graphcommerce/magento-customer@4.10.1
  - @graphcommerce/magento-customer-order@3.1.1
  - @graphcommerce/magento-product@4.5.1
  - @graphcommerce/magento-product-configurable@4.2.1
  - @graphcommerce/magento-review@3.3.1
  - @graphcommerce/magento-store@4.2.29
  - @graphcommerce/magento-wishlist@1.6.1
  - @graphcommerce/mollie-magento-payment@3.5.1
  - @graphcommerce/magento-cart@4.7.1
  - @graphcommerce/magento-cart-billing-address@3.1.1
  - @graphcommerce/magento-cart-checkout@3.0.49
  - @graphcommerce/magento-cart-email@3.0.49
  - @graphcommerce/magento-cart-items@3.1.1
  - @graphcommerce/magento-cart-shipping-address@3.4.1
  - @graphcommerce/magento-customer-account@3.2.1
  - @graphcommerce/magento-newsletter@2.1.1
  - @graphcommerce/magento-category@4.5.1
  - @graphcommerce/magento-payment-braintree@3.0.48
  - @graphcommerce/magento-payment-included@3.1.20
  - @graphcommerce/magento-product-bundle@4.0.49
  - @graphcommerce/magento-product-downloadable@4.0.49
  - @graphcommerce/magento-product-grouped@3.0.49
  - @graphcommerce/magento-product-simple@4.0.49
  - @graphcommerce/magento-product-virtual@4.0.49
  - @graphcommerce/magento-cart-coupon@3.2.1
  - @graphcommerce/magento-cart-payment-method@3.5.1
  - @graphcommerce/magento-cart-pickup@3.1.11
  - @graphcommerce/magento-cart-shipping-method@3.6.1
  - @graphcommerce/magento-cms@4.0.40

## 3.23.0

### Minor Changes

- [#1609](https://github.com/graphcommerce-org/graphcommerce/pull/1609) [`0ad5159eb`](https://github.com/graphcommerce-org/graphcommerce/commit/0ad5159ebef54b4ce7fee6f71b4bf710dba9ef8e) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Use WaitForCustomer component

  - Fixes bugs where loaders where shown on all pages that require user to log in

* [#1602](https://github.com/graphcommerce-org/graphcommerce/pull/1602) [`5f781a217`](https://github.com/graphcommerce-org/graphcommerce/commit/5f781a217ce63ed56bc1a9983487b04400a8a315) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Default styles and layout fixes

  - Scaled icons and fonts down. Size in typography is now more gradual: https://graphcommerce.vercel.app/test/typography
  - Multiple accessibility fixes. Missing button/input labels, and fixed spacing issues resulting in high % appropriately sized tap targets
  - Replaced responsiveVal usage with better performaning breakpointVal where possible
  - All buttons are now Pill by default.
  - Cleaned up checkout styles

- [#1608](https://github.com/graphcommerce-org/graphcommerce/pull/1608) [`ac6eedbb1`](https://github.com/graphcommerce-org/graphcommerce/commit/ac6eedbb14d3abd8cf1231a98dc2a8b7f4659f1f) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - Added global errorhandling on cart errors. When a cart query return an error, the currentCartId wil be renewed with the actual cartId when the user is authenticated. When there is an error in a guest cart, a new cartId will be generated and the cart will be empty

### Patch Changes

- [#1590](https://github.com/graphcommerce-org/graphcommerce/pull/1590) [`06a691fe4`](https://github.com/graphcommerce-org/graphcommerce/commit/06a691fe46d8ca97dd526bd2d171c8c3fd96724f) Thanks [@paales](https://github.com/paales)! - Make sure the CategoryPage/Index/testpages document doesn’t rely on the the root_category_uid

* [#1590](https://github.com/graphcommerce-org/graphcommerce/pull/1590) [`b40a352f7`](https://github.com/graphcommerce-org/graphcommerce/commit/b40a352f7bccdb831dce1d45baf98d51b0921d58) Thanks [@paales](https://github.com/paales)! - Split ProductList query into two separate queries so the backend can use varnish more effectively

- [#1590](https://github.com/graphcommerce-org/graphcommerce/pull/1590) [`d3bbe3058`](https://github.com/graphcommerce-org/graphcommerce/commit/d3bbe3058ab7db8c1e5e1c0dd325ff0b3e4e4d7f) Thanks [@paales](https://github.com/paales)! - Added retry functionality for the graphcms backend to make deployments more stable

* [#1601](https://github.com/graphcommerce-org/graphcommerce/pull/1601) [`04708dacc`](https://github.com/graphcommerce-org/graphcommerce/commit/04708daccc213c6ea927bc67fa3bd0d5b1fad619) Thanks [@paales](https://github.com/paales)! - Navigation now uses a single `const selection = useNavigationSelection()` motionValue to control the state of the menu, to prevent excessive rerenders.

- [#1590](https://github.com/graphcommerce-org/graphcommerce/pull/1590) [`9660fe5d1`](https://github.com/graphcommerce-org/graphcommerce/commit/9660fe5d1839662a5064943538c4a15ce36364cc) Thanks [@paales](https://github.com/paales)! - Leverage Magento Varnish caching by enabling useGETForQueries to backends

* [#1604](https://github.com/graphcommerce-org/graphcommerce/pull/1604) [`c98cef65e`](https://github.com/graphcommerce-org/graphcommerce/commit/c98cef65eb7cfed42f016b6134d10bf5d3c67d92) Thanks [@paales](https://github.com/paales)! - Downgrade next-pwa because there are issue with the latest release:

  - https://github.com/shadowwalker/next-pwa/issues/375
  - https://github.com/shadowwalker/next-pwa/pull/384

  Note: It will currently generate a warning `Invalid next.config.js options detected`.

- [#1590](https://github.com/graphcommerce-org/graphcommerce/pull/1590) [`40983df17`](https://github.com/graphcommerce-org/graphcommerce/commit/40983df170ed0435c47496285dfe30aafeb2eeac) Thanks [@paales](https://github.com/paales)! - Implement search results with a base static page and dynamic pages after paginating/filtering

* [#1609](https://github.com/graphcommerce-org/graphcommerce/pull/1609) [`e573278e4`](https://github.com/graphcommerce-org/graphcommerce/commit/e573278e43506a6b17a2981e61d0e9fad41eb2eb) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Fix the account review modal

- [#1590](https://github.com/graphcommerce-org/graphcommerce/pull/1590) [`ec96a0eb0`](https://github.com/graphcommerce-org/graphcommerce/commit/ec96a0eb049ee2204f32f9c578455cf9c131dbd2) Thanks [@paales](https://github.com/paales)! - Filtered category pages are now servered by a separate route with getServerSideProps. Since there are practically infinite variations of filters, it doesn't make sense to query those on a URL level and we're leveraging the backend caching possibilities.

* [#1590](https://github.com/graphcommerce-org/graphcommerce/pull/1590) [`c13b65373`](https://github.com/graphcommerce-org/graphcommerce/commit/c13b6537300e61bc0d281a134d971f5ab62c7026) Thanks [@paales](https://github.com/paales)! - Added prettier config to vscode default config for typescript files

- [#1604](https://github.com/graphcommerce-org/graphcommerce/pull/1604) [`3e983e2af`](https://github.com/graphcommerce-org/graphcommerce/commit/3e983e2af223d1dcfc49a2b10ce92114eeb246be) Thanks [@paales](https://github.com/paales)! - Remove unused dependencies from main package

- Updated dependencies [[`b40a352f7`](https://github.com/graphcommerce-org/graphcommerce/commit/b40a352f7bccdb831dce1d45baf98d51b0921d58), [`3ff0e7f2d`](https://github.com/graphcommerce-org/graphcommerce/commit/3ff0e7f2d26edad228848268d24e9aaf56cd2c30), [`04708dacc`](https://github.com/graphcommerce-org/graphcommerce/commit/04708daccc213c6ea927bc67fa3bd0d5b1fad619), [`bb94e7045`](https://github.com/graphcommerce-org/graphcommerce/commit/bb94e7045460cb671c45d612a0833731d7c20c30), [`b0dc4e2e1`](https://github.com/graphcommerce-org/graphcommerce/commit/b0dc4e2e1982d502d38dd50a0f493396360a7a15), [`4a5286dfe`](https://github.com/graphcommerce-org/graphcommerce/commit/4a5286dfeaa1719e594a0078f274fbab53969c4e), [`0ad5159eb`](https://github.com/graphcommerce-org/graphcommerce/commit/0ad5159ebef54b4ce7fee6f71b4bf710dba9ef8e), [`40983df17`](https://github.com/graphcommerce-org/graphcommerce/commit/40983df170ed0435c47496285dfe30aafeb2eeac), [`d46d5ed0c`](https://github.com/graphcommerce-org/graphcommerce/commit/d46d5ed0cc5794391b7527fc17bbb68ec2212e33), [`e573278e4`](https://github.com/graphcommerce-org/graphcommerce/commit/e573278e43506a6b17a2981e61d0e9fad41eb2eb), [`5f781a217`](https://github.com/graphcommerce-org/graphcommerce/commit/5f781a217ce63ed56bc1a9983487b04400a8a315), [`e573278e4`](https://github.com/graphcommerce-org/graphcommerce/commit/e573278e43506a6b17a2981e61d0e9fad41eb2eb), [`ec96a0eb0`](https://github.com/graphcommerce-org/graphcommerce/commit/ec96a0eb049ee2204f32f9c578455cf9c131dbd2), [`b7009c3eb`](https://github.com/graphcommerce-org/graphcommerce/commit/b7009c3ebf4e4062eeaa00eaae8d572725d3eeb1), [`ac6eedbb1`](https://github.com/graphcommerce-org/graphcommerce/commit/ac6eedbb14d3abd8cf1231a98dc2a8b7f4659f1f)]:
  - @graphcommerce/magento-product@4.5.0
  - @graphcommerce/graphql-mesh@4.1.8
  - @graphcommerce/magento-category@4.5.0
  - @graphcommerce/next-ui@4.22.0
  - @graphcommerce/ecommerce-ui@1.2.0
  - @graphcommerce/magento-customer@4.10.0
  - @graphcommerce/magento-search@4.2.0
  - @graphcommerce/magento-cart@4.7.0
  - @graphcommerce/framer-next-pages@3.3.0
  - @graphcommerce/magento-cart-billing-address@3.1.0
  - @graphcommerce/magento-cart-coupon@3.2.0
  - @graphcommerce/magento-cart-items@3.1.0
  - @graphcommerce/magento-cart-payment-method@3.5.0
  - @graphcommerce/magento-cart-shipping-address@3.4.0
  - @graphcommerce/magento-cart-shipping-method@3.6.0
  - @graphcommerce/magento-customer-account@3.2.0
  - @graphcommerce/magento-customer-order@3.1.0
  - @graphcommerce/magento-newsletter@2.1.0
  - @graphcommerce/magento-product-configurable@4.2.0
  - @graphcommerce/magento-review@3.3.0
  - @graphcommerce/magento-wishlist@1.6.0
  - @graphcommerce/mollie-magento-payment@3.5.0
  - @graphcommerce/cli@1.0.9
  - @graphcommerce/magento-cart-email@3.0.48
  - @graphcommerce/magento-payment-braintree@3.0.47
  - @graphcommerce/magento-payment-included@3.1.19
  - @graphcommerce/magento-product-bundle@4.0.48
  - @graphcommerce/magento-product-downloadable@4.0.48
  - @graphcommerce/magento-product-grouped@3.0.48
  - @graphcommerce/magento-product-simple@4.0.48
  - @graphcommerce/magento-product-virtual@4.0.48
  - @graphcommerce/magento-store@4.2.28
  - @graphcommerce/framer-scroller@2.1.33
  - @graphcommerce/graphcms-ui@3.0.41
  - @graphcommerce/magento-cart-checkout@3.0.48
  - @graphcommerce/magento-cart-pickup@3.1.10
  - @graphcommerce/graphql@3.4.7
  - @graphcommerce/image@3.1.9
  - @graphcommerce/magento-cms@4.0.39
  - @graphcommerce/googlerecaptcha@2.1.17
  - @graphcommerce/magento-graphql@3.1.7

## 3.22.1

### Patch Changes

- [#1600](https://github.com/graphcommerce-org/graphcommerce/pull/1600) [`127593b65`](https://github.com/graphcommerce-org/graphcommerce/commit/127593b65b0cc367dcb38ba88b589a2abcca75c2) Thanks [@paales](https://github.com/paales)! - Make sure \*.ts files are also scanned when extracting lingui files

* [#1598](https://github.com/graphcommerce-org/graphcommerce/pull/1598) [`707dbc73d`](https://github.com/graphcommerce-org/graphcommerce/commit/707dbc73d181204d88fdbbd2e09340e25b2b5f7b) Thanks [@paales](https://github.com/paales)! - Upgraded dependencies

* Updated dependencies [[`7949c1ce1`](https://github.com/graphcommerce-org/graphcommerce/commit/7949c1ce1fd9babba5f7a440e2bb18e71f7ea515), [`127593b65`](https://github.com/graphcommerce-org/graphcommerce/commit/127593b65b0cc367dcb38ba88b589a2abcca75c2), [`1f7ee6f6c`](https://github.com/graphcommerce-org/graphcommerce/commit/1f7ee6f6cfb28544439ed36e10929ac530d1b2b7), [`707dbc73d`](https://github.com/graphcommerce-org/graphcommerce/commit/707dbc73d181204d88fdbbd2e09340e25b2b5f7b)]:
  - @graphcommerce/next-config@3.2.0
  - @graphcommerce/lingui-next@2.2.1
  - @graphcommerce/next-ui@4.21.0
  - @graphcommerce/cli@1.0.8
  - @graphcommerce/graphql@3.4.6
  - @graphcommerce/graphql-mesh@4.1.7
  - @graphcommerce/magento-payment-braintree@3.0.46
  - @graphcommerce/mollie-magento-payment@3.4.12
  - @graphcommerce/ecommerce-ui@1.1.12
  - @graphcommerce/framer-scroller@2.1.32
  - @graphcommerce/graphcms-ui@3.0.40
  - @graphcommerce/magento-cart@4.6.9
  - @graphcommerce/magento-cart-billing-address@3.0.45
  - @graphcommerce/magento-cart-checkout@3.0.47
  - @graphcommerce/magento-cart-coupon@3.1.15
  - @graphcommerce/magento-cart-email@3.0.47
  - @graphcommerce/magento-cart-items@3.0.48
  - @graphcommerce/magento-cart-payment-method@3.4.12
  - @graphcommerce/magento-cart-pickup@3.1.9
  - @graphcommerce/magento-cart-shipping-address@3.3.9
  - @graphcommerce/magento-cart-shipping-method@3.5.9
  - @graphcommerce/magento-category@4.4.1
  - @graphcommerce/magento-customer@4.9.5
  - @graphcommerce/magento-customer-account@3.1.40
  - @graphcommerce/magento-customer-order@3.0.41
  - @graphcommerce/magento-newsletter@2.0.45
  - @graphcommerce/magento-payment-included@3.1.18
  - @graphcommerce/magento-product@4.4.25
  - @graphcommerce/magento-product-configurable@4.1.32
  - @graphcommerce/magento-review@3.2.33
  - @graphcommerce/magento-search@4.1.35
  - @graphcommerce/magento-store@4.2.27
  - @graphcommerce/magento-wishlist@1.5.3
  - @graphcommerce/framer-next-pages@3.2.5
  - @graphcommerce/image@3.1.8
  - @graphcommerce/googlerecaptcha@2.1.16
  - @graphcommerce/magento-cms@4.0.38
  - @graphcommerce/magento-graphql@3.1.6
  - @graphcommerce/magento-product-bundle@4.0.47
  - @graphcommerce/magento-product-downloadable@4.0.47
  - @graphcommerce/magento-product-grouped@3.0.47
  - @graphcommerce/magento-product-simple@4.0.47
  - @graphcommerce/magento-product-virtual@4.0.47

## 3.22.0

### Minor Changes

- [#1591](https://github.com/graphcommerce-org/graphcommerce/pull/1591) [`eee08c956`](https://github.com/graphcommerce-org/graphcommerce/commit/eee08c956fbcc4fe8d915b6fa8b399dafca69acd) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Remove need for rootCategory query

* [#1591](https://github.com/graphcommerce-org/graphcommerce/pull/1591) [`79f057889`](https://github.com/graphcommerce-org/graphcommerce/commit/79f057889847c61d75db7f567fd6575a57cf1022) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Remove need for query rootCategory

- [#1596](https://github.com/graphcommerce-org/graphcommerce/pull/1596) [`3a619b70d`](https://github.com/graphcommerce-org/graphcommerce/commit/3a619b70d082804b8de46a8e8232f9431479a8b7) Thanks [@paales](https://github.com/paales)! - Create products sitemap

### Patch Changes

- Updated dependencies [[`eee08c956`](https://github.com/graphcommerce-org/graphcommerce/commit/eee08c956fbcc4fe8d915b6fa8b399dafca69acd), [`79f057889`](https://github.com/graphcommerce-org/graphcommerce/commit/79f057889847c61d75db7f567fd6575a57cf1022), [`43822fd61`](https://github.com/graphcommerce-org/graphcommerce/commit/43822fd61c949215b8ddce9fb37d09f29b638426), [`3a619b70d`](https://github.com/graphcommerce-org/graphcommerce/commit/3a619b70d082804b8de46a8e8232f9431479a8b7), [`3a619b70d`](https://github.com/graphcommerce-org/graphcommerce/commit/3a619b70d082804b8de46a8e8232f9431479a8b7), [`3a619b70d`](https://github.com/graphcommerce-org/graphcommerce/commit/3a619b70d082804b8de46a8e8232f9431479a8b7)]:
  - @graphcommerce/magento-category@4.4.0
  - @graphcommerce/lingui-next@2.2.0
  - @graphcommerce/next-ui@4.20.0
  - @graphcommerce/magento-customer@4.9.4
  - @graphcommerce/magento-product-configurable@4.1.31
  - @graphcommerce/ecommerce-ui@1.1.11
  - @graphcommerce/framer-scroller@2.1.31
  - @graphcommerce/graphcms-ui@3.0.39
  - @graphcommerce/magento-cart@4.6.8
  - @graphcommerce/magento-cart-billing-address@3.0.44
  - @graphcommerce/magento-cart-checkout@3.0.46
  - @graphcommerce/magento-cart-coupon@3.1.14
  - @graphcommerce/magento-cart-email@3.0.46
  - @graphcommerce/magento-cart-items@3.0.47
  - @graphcommerce/magento-cart-payment-method@3.4.11
  - @graphcommerce/magento-cart-pickup@3.1.8
  - @graphcommerce/magento-cart-shipping-address@3.3.8
  - @graphcommerce/magento-cart-shipping-method@3.5.8
  - @graphcommerce/magento-customer-account@3.1.39
  - @graphcommerce/magento-customer-order@3.0.40
  - @graphcommerce/magento-newsletter@2.0.44
  - @graphcommerce/magento-payment-braintree@3.0.45
  - @graphcommerce/magento-payment-included@3.1.17
  - @graphcommerce/magento-product@4.4.24
  - @graphcommerce/magento-review@3.2.32
  - @graphcommerce/magento-search@4.1.34
  - @graphcommerce/magento-store@4.2.26
  - @graphcommerce/magento-wishlist@1.5.2
  - @graphcommerce/mollie-magento-payment@3.4.11
  - @graphcommerce/magento-product-bundle@4.0.46
  - @graphcommerce/magento-product-downloadable@4.0.46
  - @graphcommerce/magento-product-grouped@3.0.46
  - @graphcommerce/magento-product-simple@4.0.46
  - @graphcommerce/magento-product-virtual@4.0.46
  - @graphcommerce/magento-cms@4.0.37

## 3.21.0

### Minor Changes

- [#1576](https://github.com/graphcommerce-org/graphcommerce/pull/1576) [`b6d3a3c13`](https://github.com/graphcommerce-org/graphcommerce/commit/b6d3a3c13ea63ef0f691f497507f07c0e094de5b) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Create products sitemap

### Patch Changes

- Updated dependencies [[`42030e04b`](https://github.com/graphcommerce-org/graphcommerce/commit/42030e04b2ebe004379c6f052e10407c2f5df18f), [`b6d3a3c13`](https://github.com/graphcommerce-org/graphcommerce/commit/b6d3a3c13ea63ef0f691f497507f07c0e094de5b), [`1be392e42`](https://github.com/graphcommerce-org/graphcommerce/commit/1be392e42241d38b0ce1862e8ba184d2b5ec23c3)]:
  - @graphcommerce/magento-category@4.3.1
  - @graphcommerce/next-ui@4.19.0
  - @graphcommerce/magento-customer@4.9.3
  - @graphcommerce/magento-product-configurable@4.1.30
  - @graphcommerce/ecommerce-ui@1.1.10
  - @graphcommerce/framer-scroller@2.1.30
  - @graphcommerce/graphcms-ui@3.0.38
  - @graphcommerce/magento-cart@4.6.7
  - @graphcommerce/magento-cart-billing-address@3.0.43
  - @graphcommerce/magento-cart-checkout@3.0.45
  - @graphcommerce/magento-cart-coupon@3.1.13
  - @graphcommerce/magento-cart-email@3.0.45
  - @graphcommerce/magento-cart-items@3.0.46
  - @graphcommerce/magento-cart-payment-method@3.4.10
  - @graphcommerce/magento-cart-pickup@3.1.7
  - @graphcommerce/magento-cart-shipping-address@3.3.7
  - @graphcommerce/magento-cart-shipping-method@3.5.7
  - @graphcommerce/magento-customer-account@3.1.38
  - @graphcommerce/magento-customer-order@3.0.39
  - @graphcommerce/magento-newsletter@2.0.43
  - @graphcommerce/magento-payment-braintree@3.0.44
  - @graphcommerce/magento-payment-included@3.1.16
  - @graphcommerce/magento-product@4.4.23
  - @graphcommerce/magento-review@3.2.31
  - @graphcommerce/magento-search@4.1.33
  - @graphcommerce/magento-store@4.2.25
  - @graphcommerce/magento-wishlist@1.5.1
  - @graphcommerce/mollie-magento-payment@3.4.10
  - @graphcommerce/magento-product-bundle@4.0.45
  - @graphcommerce/magento-product-downloadable@4.0.45
  - @graphcommerce/magento-product-grouped@3.0.45
  - @graphcommerce/magento-product-simple@4.0.45
  - @graphcommerce/magento-product-virtual@4.0.45
  - @graphcommerce/magento-cms@4.0.36

## 3.20.0

### Minor Changes

- [#1577](https://github.com/graphcommerce-org/graphcommerce/pull/1577) [`ad55e6c50`](https://github.com/graphcommerce-org/graphcommerce/commit/ad55e6c50c3a3223ee2c17826881808fa9d8f27c) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - Added improvements voor the category pages' meta description

* [#1587](https://github.com/graphcommerce-org/graphcommerce/pull/1587) [`6ce2cbaf2`](https://github.com/graphcommerce-org/graphcommerce/commit/6ce2cbaf2cf27e21b753f7cb71e7e74826294de6) Thanks [@paales](https://github.com/paales)! - Navigation fixes

### Patch Changes

- Updated dependencies [[`6ce2cbaf2`](https://github.com/graphcommerce-org/graphcommerce/commit/6ce2cbaf2cf27e21b753f7cb71e7e74826294de6), [`6ce2cbaf2`](https://github.com/graphcommerce-org/graphcommerce/commit/6ce2cbaf2cf27e21b753f7cb71e7e74826294de6), [`6ce2cbaf2`](https://github.com/graphcommerce-org/graphcommerce/commit/6ce2cbaf2cf27e21b753f7cb71e7e74826294de6), [`6ce2cbaf2`](https://github.com/graphcommerce-org/graphcommerce/commit/6ce2cbaf2cf27e21b753f7cb71e7e74826294de6), [`ad55e6c50`](https://github.com/graphcommerce-org/graphcommerce/commit/ad55e6c50c3a3223ee2c17826881808fa9d8f27c), [`6ce2cbaf2`](https://github.com/graphcommerce-org/graphcommerce/commit/6ce2cbaf2cf27e21b753f7cb71e7e74826294de6)]:
  - @graphcommerce/magento-cart-pickup@3.1.6
  - @graphcommerce/magento-product@4.4.22
  - @graphcommerce/magento-review@3.2.30
  - @graphcommerce/magento-wishlist@1.5.0
  - @graphcommerce/graphql@3.4.5
  - @graphcommerce/magento-category@4.3.0
  - @graphcommerce/next-ui@4.18.0
  - @graphcommerce/magento-cart-email@3.0.44
  - @graphcommerce/magento-cart-items@3.0.45
  - @graphcommerce/magento-payment-braintree@3.0.43
  - @graphcommerce/magento-payment-included@3.1.15
  - @graphcommerce/magento-product-bundle@4.0.44
  - @graphcommerce/magento-product-configurable@4.1.29
  - @graphcommerce/magento-product-downloadable@4.0.44
  - @graphcommerce/magento-product-grouped@3.0.44
  - @graphcommerce/magento-product-simple@4.0.44
  - @graphcommerce/magento-product-virtual@4.0.44
  - @graphcommerce/mollie-magento-payment@3.4.9
  - @graphcommerce/ecommerce-ui@1.1.9
  - @graphcommerce/googlerecaptcha@2.1.15
  - @graphcommerce/graphcms-ui@3.0.37
  - @graphcommerce/magento-cart@4.6.6
  - @graphcommerce/magento-cart-billing-address@3.0.42
  - @graphcommerce/magento-cart-checkout@3.0.44
  - @graphcommerce/magento-cart-coupon@3.1.12
  - @graphcommerce/magento-cart-payment-method@3.4.9
  - @graphcommerce/magento-cart-shipping-address@3.3.6
  - @graphcommerce/magento-cart-shipping-method@3.5.6
  - @graphcommerce/magento-cms@4.0.35
  - @graphcommerce/magento-customer@4.9.2
  - @graphcommerce/magento-customer-account@3.1.37
  - @graphcommerce/magento-customer-order@3.0.38
  - @graphcommerce/magento-graphql@3.1.5
  - @graphcommerce/magento-newsletter@2.0.42
  - @graphcommerce/magento-search@4.1.32
  - @graphcommerce/magento-store@4.2.24
  - @graphcommerce/framer-scroller@2.1.29

## 3.19.0

### Minor Changes

- [#1583](https://github.com/graphcommerce-org/graphcommerce/pull/1583) [`b6ce5548c`](https://github.com/graphcommerce-org/graphcommerce/commit/b6ce5548c66a8ca62d3aee29467045f7f07f30c8) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Navigation fixes

### Patch Changes

- Updated dependencies [[`b93988eee`](https://github.com/graphcommerce-org/graphcommerce/commit/b93988eeea007ced5ed365971f01913601fc2603), [`bfbcd59d8`](https://github.com/graphcommerce-org/graphcommerce/commit/bfbcd59d8f7652d7a7c028f79cc994216e8dbe3a), [`56de0a179`](https://github.com/graphcommerce-org/graphcommerce/commit/56de0a1792c0511a7dac47c1af7476f8fe112c8b), [`49370878a`](https://github.com/graphcommerce-org/graphcommerce/commit/49370878a48b90a4579026a7c56c54f97840cebb), [`b6ce5548c`](https://github.com/graphcommerce-org/graphcommerce/commit/b6ce5548c66a8ca62d3aee29467045f7f07f30c8)]:
  - @graphcommerce/magento-cart-pickup@3.1.5
  - @graphcommerce/magento-product@4.4.21
  - @graphcommerce/magento-review@3.2.29
  - @graphcommerce/magento-wishlist@1.4.0
  - @graphcommerce/graphql@3.4.4
  - @graphcommerce/next-ui@4.17.0
  - @graphcommerce/magento-cart-email@3.0.43
  - @graphcommerce/magento-cart-items@3.0.44
  - @graphcommerce/magento-category@4.2.3
  - @graphcommerce/magento-payment-braintree@3.0.42
  - @graphcommerce/magento-payment-included@3.1.14
  - @graphcommerce/magento-product-bundle@4.0.43
  - @graphcommerce/magento-product-configurable@4.1.28
  - @graphcommerce/magento-product-downloadable@4.0.43
  - @graphcommerce/magento-product-grouped@3.0.43
  - @graphcommerce/magento-product-simple@4.0.43
  - @graphcommerce/magento-product-virtual@4.0.43
  - @graphcommerce/mollie-magento-payment@3.4.8
  - @graphcommerce/ecommerce-ui@1.1.8
  - @graphcommerce/googlerecaptcha@2.1.14
  - @graphcommerce/graphcms-ui@3.0.36
  - @graphcommerce/magento-cart@4.6.5
  - @graphcommerce/magento-cart-billing-address@3.0.41
  - @graphcommerce/magento-cart-checkout@3.0.43
  - @graphcommerce/magento-cart-coupon@3.1.11
  - @graphcommerce/magento-cart-payment-method@3.4.8
  - @graphcommerce/magento-cart-shipping-address@3.3.5
  - @graphcommerce/magento-cart-shipping-method@3.5.5
  - @graphcommerce/magento-cms@4.0.34
  - @graphcommerce/magento-customer@4.9.1
  - @graphcommerce/magento-customer-account@3.1.36
  - @graphcommerce/magento-customer-order@3.0.37
  - @graphcommerce/magento-graphql@3.1.4
  - @graphcommerce/magento-newsletter@2.0.41
  - @graphcommerce/magento-search@4.1.31
  - @graphcommerce/magento-store@4.2.23
  - @graphcommerce/framer-scroller@2.1.28

## 3.18.2

### Patch Changes

- [#1573](https://github.com/graphcommerce-org/graphcommerce/pull/1573) [`2014f10e9`](https://github.com/graphcommerce-org/graphcommerce/commit/2014f10e935fd112ac98eca69f030d30982ba18e) Thanks [@paales](https://github.com/paales)! - SchemaDts caused major Typescript performance issues when running in VSCode, types were loosened and react-schemaorg dependency was removed.

* [#1573](https://github.com/graphcommerce-org/graphcommerce/pull/1573) [`1eb131766`](https://github.com/graphcommerce-org/graphcommerce/commit/1eb131766c32db6fcb0a8e83dba2c3d241658595) Thanks [@paales](https://github.com/paales)! - Solve issue where the products query would return multiple products while requesting a single url_key. Filter the result by findByTypename which finds the correct `typename` but also narrows the typescript type.

* Updated dependencies [[`87a188d6f`](https://github.com/graphcommerce-org/graphcommerce/commit/87a188d6f216b7f7b9ec95afbe74f1146cb07ce4), [`3c809a3a4`](https://github.com/graphcommerce-org/graphcommerce/commit/3c809a3a438995503f6d2290d6c0bb90fbc489be), [`2c66cca15`](https://github.com/graphcommerce-org/graphcommerce/commit/2c66cca154098a09445977428983e05fe19b9510), [`199dc8599`](https://github.com/graphcommerce-org/graphcommerce/commit/199dc859989c376281243b59a59addc35138f119), [`2014f10e9`](https://github.com/graphcommerce-org/graphcommerce/commit/2014f10e935fd112ac98eca69f030d30982ba18e), [`8e3b24500`](https://github.com/graphcommerce-org/graphcommerce/commit/8e3b24500a55fa2a1fb4a3ef08c1f1990a46a0ae), [`2c66cca15`](https://github.com/graphcommerce-org/graphcommerce/commit/2c66cca154098a09445977428983e05fe19b9510), [`2c66cca15`](https://github.com/graphcommerce-org/graphcommerce/commit/2c66cca154098a09445977428983e05fe19b9510), [`1eb131766`](https://github.com/graphcommerce-org/graphcommerce/commit/1eb131766c32db6fcb0a8e83dba2c3d241658595)]:
  - @graphcommerce/framer-scroller@2.1.27
  - @graphcommerce/next-ui@4.16.0
  - @graphcommerce/magento-customer@4.9.0
  - @graphcommerce/ecommerce-ui@1.1.7
  - @graphcommerce/magento-product@4.4.20
  - @graphcommerce/magento-review@3.2.28
  - @graphcommerce/magento-cart@4.6.4
  - @graphcommerce/magento-cart-billing-address@3.0.40
  - @graphcommerce/magento-cart-checkout@3.0.42
  - @graphcommerce/magento-cart-coupon@3.1.10
  - @graphcommerce/magento-cart-email@3.0.42
  - @graphcommerce/magento-cart-items@3.0.43
  - @graphcommerce/magento-cart-payment-method@3.4.7
  - @graphcommerce/magento-cart-pickup@3.1.4
  - @graphcommerce/magento-cart-shipping-address@3.3.4
  - @graphcommerce/magento-cart-shipping-method@3.5.4
  - @graphcommerce/magento-customer-account@3.1.35
  - @graphcommerce/magento-newsletter@2.0.40
  - @graphcommerce/magento-payment-braintree@3.0.41
  - @graphcommerce/magento-payment-included@3.1.13
  - @graphcommerce/magento-product-configurable@4.1.27
  - @graphcommerce/magento-search@4.1.30
  - @graphcommerce/mollie-magento-payment@3.4.7
  - @graphcommerce/magento-category@4.2.2
  - @graphcommerce/graphcms-ui@3.0.35
  - @graphcommerce/magento-customer-order@3.0.36
  - @graphcommerce/magento-store@4.2.22
  - @graphcommerce/magento-wishlist@1.3.14
  - @graphcommerce/magento-product-bundle@4.0.42
  - @graphcommerce/magento-product-downloadable@4.0.42
  - @graphcommerce/magento-product-grouped@3.0.42
  - @graphcommerce/magento-product-simple@4.0.42
  - @graphcommerce/magento-product-virtual@4.0.42
  - @graphcommerce/magento-cms@4.0.33

## 3.18.1

### Patch Changes

- Updated dependencies [[`a88f166f0`](https://github.com/graphcommerce-org/graphcommerce/commit/a88f166f0115c58254fe47171da51a5850658a32), [`d92780d5c`](https://github.com/graphcommerce-org/graphcommerce/commit/d92780d5c3bb80b5a1519c087338548303e4cc2f)]:
  - @graphcommerce/next-ui@4.15.1
  - @graphcommerce/magento-cart@4.6.3
  - @graphcommerce/magento-customer@4.8.3
  - @graphcommerce/ecommerce-ui@1.1.6
  - @graphcommerce/framer-scroller@2.1.26
  - @graphcommerce/graphcms-ui@3.0.34
  - @graphcommerce/magento-cart-billing-address@3.0.39
  - @graphcommerce/magento-cart-checkout@3.0.41
  - @graphcommerce/magento-cart-coupon@3.1.9
  - @graphcommerce/magento-cart-email@3.0.41
  - @graphcommerce/magento-cart-items@3.0.42
  - @graphcommerce/magento-cart-payment-method@3.4.6
  - @graphcommerce/magento-cart-pickup@3.1.3
  - @graphcommerce/magento-cart-shipping-address@3.3.3
  - @graphcommerce/magento-cart-shipping-method@3.5.3
  - @graphcommerce/magento-category@4.2.1
  - @graphcommerce/magento-customer-account@3.1.34
  - @graphcommerce/magento-customer-order@3.0.35
  - @graphcommerce/magento-newsletter@2.0.39
  - @graphcommerce/magento-payment-braintree@3.0.40
  - @graphcommerce/magento-payment-included@3.1.12
  - @graphcommerce/magento-product@4.4.19
  - @graphcommerce/magento-product-configurable@4.1.26
  - @graphcommerce/magento-review@3.2.27
  - @graphcommerce/magento-search@4.1.29
  - @graphcommerce/magento-store@4.2.21
  - @graphcommerce/magento-wishlist@1.3.13
  - @graphcommerce/mollie-magento-payment@3.4.6
  - @graphcommerce/magento-product-bundle@4.0.41
  - @graphcommerce/magento-product-downloadable@4.0.41
  - @graphcommerce/magento-product-grouped@3.0.41
  - @graphcommerce/magento-product-simple@4.0.41
  - @graphcommerce/magento-product-virtual@4.0.41
  - @graphcommerce/magento-cms@4.0.32

## 3.18.0

### Minor Changes

- [#1566](https://github.com/graphcommerce-org/graphcommerce/pull/1566) [`e167992df`](https://github.com/graphcommerce-org/graphcommerce/commit/e167992dfdc6964a392af719667f8a188626ab1b) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Introduced `@graphcommerce/next-ui/navigation` component.

  - Navigation is always present in the DOM
  - Configurable in LayoutNavigation.tsx
  - Show categories directly, or nest them in a 'products' button
  - Choose prefered mouseEvent: click or hover

* [#1566](https://github.com/graphcommerce-org/graphcommerce/pull/1566) [`9c2504b4e`](https://github.com/graphcommerce-org/graphcommerce/commit/9c2504b4ed75f41d3003c4d3339814010e85e37e) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - publish navigation

### Patch Changes

- Updated dependencies [[`e167992df`](https://github.com/graphcommerce-org/graphcommerce/commit/e167992dfdc6964a392af719667f8a188626ab1b), [`9c2504b4e`](https://github.com/graphcommerce-org/graphcommerce/commit/9c2504b4ed75f41d3003c4d3339814010e85e37e)]:
  - @graphcommerce/magento-category@4.2.0
  - @graphcommerce/next-ui@4.15.0
  - @graphcommerce/magento-product-configurable@4.1.25
  - @graphcommerce/ecommerce-ui@1.1.5
  - @graphcommerce/framer-scroller@2.1.25
  - @graphcommerce/graphcms-ui@3.0.33
  - @graphcommerce/magento-cart@4.6.2
  - @graphcommerce/magento-cart-billing-address@3.0.38
  - @graphcommerce/magento-cart-checkout@3.0.40
  - @graphcommerce/magento-cart-coupon@3.1.8
  - @graphcommerce/magento-cart-email@3.0.40
  - @graphcommerce/magento-cart-items@3.0.41
  - @graphcommerce/magento-cart-payment-method@3.4.5
  - @graphcommerce/magento-cart-pickup@3.1.2
  - @graphcommerce/magento-cart-shipping-address@3.3.2
  - @graphcommerce/magento-cart-shipping-method@3.5.2
  - @graphcommerce/magento-customer@4.8.2
  - @graphcommerce/magento-customer-account@3.1.33
  - @graphcommerce/magento-customer-order@3.0.34
  - @graphcommerce/magento-newsletter@2.0.38
  - @graphcommerce/magento-payment-braintree@3.0.39
  - @graphcommerce/magento-payment-included@3.1.11
  - @graphcommerce/magento-product@4.4.18
  - @graphcommerce/magento-review@3.2.26
  - @graphcommerce/magento-search@4.1.28
  - @graphcommerce/magento-store@4.2.20
  - @graphcommerce/magento-wishlist@1.3.12
  - @graphcommerce/mollie-magento-payment@3.4.5
  - @graphcommerce/magento-product-bundle@4.0.40
  - @graphcommerce/magento-product-downloadable@4.0.40
  - @graphcommerce/magento-product-grouped@3.0.40
  - @graphcommerce/magento-product-simple@4.0.40
  - @graphcommerce/magento-product-virtual@4.0.40
  - @graphcommerce/magento-cms@4.0.31

## 3.17.1

### Patch Changes

- [#1562](https://github.com/graphcommerce-org/graphcommerce/pull/1562) [`01f1588c9`](https://github.com/graphcommerce-org/graphcommerce/commit/01f1588c9200bb39dd61146e260bfa2b32060612) Thanks [@paales](https://github.com/paales)! - The context was missing in apollo client

* [#1501](https://github.com/graphcommerce-org/graphcommerce/pull/1501) [`475d23197`](https://github.com/graphcommerce-org/graphcommerce/commit/475d23197a6ce4b08cc325f872834ca592aa28dc) Thanks [@paales](https://github.com/paales)! - Native windows support added: Directory separator differences and package.json interpretation differences

- [#1558](https://github.com/graphcommerce-org/graphcommerce/pull/1558) [`89b5ea7ae`](https://github.com/graphcommerce-org/graphcommerce/commit/89b5ea7aefa00690816853ac4617f81398c8dfd2) Thanks [@paales](https://github.com/paales)! - Revert to an older version of cross-undici-fetch, new version is [broken](https://github.com/ardatan/whatwg-node/issues/54).

- Updated dependencies [[`01f1588c9`](https://github.com/graphcommerce-org/graphcommerce/commit/01f1588c9200bb39dd61146e260bfa2b32060612), [`84428ccab`](https://github.com/graphcommerce-org/graphcommerce/commit/84428ccab8d1d263893766197076651eae68759c), [`c0a7f9427`](https://github.com/graphcommerce-org/graphcommerce/commit/c0a7f9427466f0a3886b2c3ebf2f0aa5d79ee081), [`475d23197`](https://github.com/graphcommerce-org/graphcommerce/commit/475d23197a6ce4b08cc325f872834ca592aa28dc), [`2ce406727`](https://github.com/graphcommerce-org/graphcommerce/commit/2ce406727c01a3367cea26c331d8455748592ce9)]:
  - @graphcommerce/cli@1.0.7
  - @graphcommerce/graphql-mesh@4.1.6
  - @graphcommerce/graphql@3.4.3
  - @graphcommerce/magento-cart-email@3.0.39
  - @graphcommerce/magento-customer@4.8.1
  - @graphcommerce/ecommerce-ui@1.1.4
  - @graphcommerce/magento-cart@4.6.1
  - @graphcommerce/magento-customer-order@3.0.33
  - @graphcommerce/magento-product@4.4.17
  - @graphcommerce/magento-product-configurable@4.1.24
  - @graphcommerce/magento-review@3.2.25
  - @graphcommerce/magento-store@4.2.19
  - @graphcommerce/magento-wishlist@1.3.11
  - @graphcommerce/mollie-magento-payment@3.4.4
  - @graphcommerce/googlerecaptcha@2.1.13
  - @graphcommerce/graphcms-ui@3.0.32
  - @graphcommerce/magento-cart-billing-address@3.0.37
  - @graphcommerce/magento-cart-checkout@3.0.39
  - @graphcommerce/magento-cart-coupon@3.1.7
  - @graphcommerce/magento-cart-items@3.0.40
  - @graphcommerce/magento-cart-payment-method@3.4.4
  - @graphcommerce/magento-cart-pickup@3.1.1
  - @graphcommerce/magento-cart-shipping-address@3.3.1
  - @graphcommerce/magento-cart-shipping-method@3.5.1
  - @graphcommerce/magento-category@4.1.25
  - @graphcommerce/magento-cms@4.0.30
  - @graphcommerce/magento-customer-account@3.1.32
  - @graphcommerce/magento-graphql@3.1.3
  - @graphcommerce/magento-newsletter@2.0.37
  - @graphcommerce/magento-payment-braintree@3.0.38
  - @graphcommerce/magento-payment-included@3.1.10
  - @graphcommerce/magento-product-bundle@4.0.39
  - @graphcommerce/magento-product-downloadable@4.0.39
  - @graphcommerce/magento-product-grouped@3.0.39
  - @graphcommerce/magento-product-simple@4.0.39
  - @graphcommerce/magento-product-virtual@4.0.39
  - @graphcommerce/magento-search@4.1.27

## 3.17.0

### Minor Changes

- [#1553](https://github.com/graphcommerce-org/graphcommerce/pull/1553) [`db5d485a2`](https://github.com/graphcommerce-org/graphcommerce/commit/db5d485a23b6b90cfabc9a1320d3c05acbaeb8e2) Thanks [@NickdeK](https://github.com/NickdeK)! - Pickup in store functionality added to checkout

### Patch Changes

- [#1553](https://github.com/graphcommerce-org/graphcommerce/pull/1553) [`798034363`](https://github.com/graphcommerce-org/graphcommerce/commit/798034363c96c8cd19e01bd54b96c89959411f16) Thanks [@NickdeK](https://github.com/NickdeK)! - Do not merge the guest wishlist with in checkout, because we're not logging in there

- Updated dependencies [[`1afc6a547`](https://github.com/graphcommerce-org/graphcommerce/commit/1afc6a5473d6e31f47b5d0188801803b31865290), [`03d01c06c`](https://github.com/graphcommerce-org/graphcommerce/commit/03d01c06c6dc13df8d38ab5b40bd100c567a9e8d), [`db5d485a2`](https://github.com/graphcommerce-org/graphcommerce/commit/db5d485a23b6b90cfabc9a1320d3c05acbaeb8e2), [`afcd8e4bf`](https://github.com/graphcommerce-org/graphcommerce/commit/afcd8e4bfb7010da4d5faeed85b61991ed7975f4), [`02e1988e5`](https://github.com/graphcommerce-org/graphcommerce/commit/02e1988e5f361c6f66ae30d3bbee38ef2ac062df), [`323fdee4b`](https://github.com/graphcommerce-org/graphcommerce/commit/323fdee4b15ae23e0e84dd0588cb2c6446dcfd50), [`4ad45a2f3`](https://github.com/graphcommerce-org/graphcommerce/commit/4ad45a2f3389838c33da8c447f9647c1cd17aa91), [`d03f0860b`](https://github.com/graphcommerce-org/graphcommerce/commit/d03f0860b882db4f280d9467aef9d66e56c1c030), [`b68d0b44a`](https://github.com/graphcommerce-org/graphcommerce/commit/b68d0b44a87688c80fb0aa4a5c840f262ce48d2f)]:
  - @graphcommerce/graphql@3.4.2
  - @graphcommerce/magento-cart@4.6.0
  - @graphcommerce/magento-customer@4.8.0
  - @graphcommerce/magento-cart-pickup@3.1.0
  - @graphcommerce/magento-cart-shipping-address@3.3.0
  - @graphcommerce/magento-cart-shipping-method@3.5.0
  - @graphcommerce/next-ui@4.14.0
  - @graphcommerce/magento-customer-order@3.0.32
  - @graphcommerce/magento-review@3.2.24
  - @graphcommerce/magento-cart-email@3.0.38
  - @graphcommerce/ecommerce-ui@1.1.3
  - @graphcommerce/googlerecaptcha@2.1.12
  - @graphcommerce/graphcms-ui@3.0.31
  - @graphcommerce/magento-cart-billing-address@3.0.36
  - @graphcommerce/magento-cart-checkout@3.0.38
  - @graphcommerce/magento-cart-coupon@3.1.6
  - @graphcommerce/magento-cart-items@3.0.39
  - @graphcommerce/magento-cart-payment-method@3.4.3
  - @graphcommerce/magento-category@4.1.24
  - @graphcommerce/magento-cms@4.0.29
  - @graphcommerce/magento-customer-account@3.1.31
  - @graphcommerce/magento-graphql@3.1.2
  - @graphcommerce/magento-newsletter@2.0.36
  - @graphcommerce/magento-payment-braintree@3.0.37
  - @graphcommerce/magento-payment-included@3.1.9
  - @graphcommerce/magento-product@4.4.16
  - @graphcommerce/magento-product-bundle@4.0.38
  - @graphcommerce/magento-product-configurable@4.1.23
  - @graphcommerce/magento-product-downloadable@4.0.38
  - @graphcommerce/magento-product-grouped@3.0.38
  - @graphcommerce/magento-product-simple@4.0.38
  - @graphcommerce/magento-product-virtual@4.0.38
  - @graphcommerce/magento-search@4.1.26
  - @graphcommerce/magento-store@4.2.18
  - @graphcommerce/magento-wishlist@1.3.10
  - @graphcommerce/mollie-magento-payment@3.4.3
  - @graphcommerce/framer-scroller@2.1.24

## 3.16.0

### Minor Changes

- [#1548](https://github.com/graphcommerce-org/graphcommerce/pull/1548) [`4b8c0a3ef`](https://github.com/graphcommerce-org/graphcommerce/commit/4b8c0a3efa163bc7e4e590f1c251a2a78e000a81) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - Fix for empty shipping methods in checkout

### Patch Changes

- [#1552](https://github.com/graphcommerce-org/graphcommerce/pull/1552) [`18054c441`](https://github.com/graphcommerce-org/graphcommerce/commit/18054c441962ba750bed3acc39ab46c8d3a341ce) Thanks [@paales](https://github.com/paales)! - Updated to Next.js v12.2.2 and other packages and made compatible

* [#1550](https://github.com/graphcommerce-org/graphcommerce/pull/1550) [`b4936e961`](https://github.com/graphcommerce-org/graphcommerce/commit/b4936e96175fe80717895822e245274db05638bd) Thanks [@paales](https://github.com/paales)! - Upgraded Framer Motion to latest version, which reduces initial bundle size load

* Updated dependencies [[`4b8c0a3ef`](https://github.com/graphcommerce-org/graphcommerce/commit/4b8c0a3efa163bc7e4e590f1c251a2a78e000a81), [`18054c441`](https://github.com/graphcommerce-org/graphcommerce/commit/18054c441962ba750bed3acc39ab46c8d3a341ce), [`c5c539c44`](https://github.com/graphcommerce-org/graphcommerce/commit/c5c539c44eeac524cd62ce649e132d2e00333794), [`6f69bc54c`](https://github.com/graphcommerce-org/graphcommerce/commit/6f69bc54c6e0224452817c532ae58d9c332b61ea), [`21886d6fa`](https://github.com/graphcommerce-org/graphcommerce/commit/21886d6fa64a48d9e932bfaf8d138c9b13c36e43), [`b4936e961`](https://github.com/graphcommerce-org/graphcommerce/commit/b4936e96175fe80717895822e245274db05638bd)]:
  - @graphcommerce/magento-cart-shipping-method@3.4.0
  - @graphcommerce/cli@1.0.6
  - @graphcommerce/framer-next-pages@3.2.4
  - @graphcommerce/graphql@3.4.1
  - @graphcommerce/graphql-mesh@4.1.5
  - @graphcommerce/magento-customer@4.7.2
  - @graphcommerce/magento-payment-braintree@3.0.36
  - @graphcommerce/magento-product-configurable@4.1.22
  - @graphcommerce/next-ui@4.13.1
  - @graphcommerce/next-config@3.1.6
  - @graphcommerce/framer-scroller@2.1.23
  - @graphcommerce/magento-cart@4.5.2
  - @graphcommerce/magento-cart-billing-address@3.0.35
  - @graphcommerce/ecommerce-ui@1.1.2
  - @graphcommerce/googlerecaptcha@2.1.11
  - @graphcommerce/graphcms-ui@3.0.30
  - @graphcommerce/magento-cart-checkout@3.0.37
  - @graphcommerce/magento-cart-coupon@3.1.5
  - @graphcommerce/magento-cart-email@3.0.37
  - @graphcommerce/magento-cart-items@3.0.38
  - @graphcommerce/magento-cart-payment-method@3.4.2
  - @graphcommerce/magento-cart-shipping-address@3.2.7
  - @graphcommerce/magento-category@4.1.23
  - @graphcommerce/magento-cms@4.0.28
  - @graphcommerce/magento-customer-account@3.1.30
  - @graphcommerce/magento-customer-order@3.0.31
  - @graphcommerce/magento-graphql@3.1.1
  - @graphcommerce/magento-newsletter@2.0.35
  - @graphcommerce/magento-payment-included@3.1.8
  - @graphcommerce/magento-product@4.4.15
  - @graphcommerce/magento-product-bundle@4.0.37
  - @graphcommerce/magento-product-downloadable@4.0.37
  - @graphcommerce/magento-product-grouped@3.0.37
  - @graphcommerce/magento-product-simple@4.0.37
  - @graphcommerce/magento-product-virtual@4.0.37
  - @graphcommerce/magento-review@3.2.23
  - @graphcommerce/magento-search@4.1.25
  - @graphcommerce/magento-store@4.2.17
  - @graphcommerce/magento-wishlist@1.3.9
  - @graphcommerce/mollie-magento-payment@3.4.2

## 3.15.1

### Patch Changes

- Updated dependencies [[`8d8fda262`](https://github.com/graphcommerce-org/graphcommerce/commit/8d8fda2623e561cb43441110c67ffa34b692668a), [`d41cff721`](https://github.com/graphcommerce-org/graphcommerce/commit/d41cff7211230561ceeb7786cf75790efd6377cd), [`cefa7b365`](https://github.com/graphcommerce-org/graphcommerce/commit/cefa7b3652b55108d2178927e3c5d98a111cf373), [`584b683a2`](https://github.com/graphcommerce-org/graphcommerce/commit/584b683a2aedcdf5067644c8dcc0e63a5b9e894c)]:
  - @graphcommerce/magento-category@4.1.22
  - @graphcommerce/next-ui@4.13.0
  - @graphcommerce/magento-store@4.2.16
  - @graphcommerce/framer-scroller@2.1.22
  - @graphcommerce/magento-product-configurable@4.1.21
  - @graphcommerce/ecommerce-ui@1.1.1
  - @graphcommerce/graphcms-ui@3.0.29
  - @graphcommerce/magento-cart@4.5.1
  - @graphcommerce/magento-cart-billing-address@3.0.34
  - @graphcommerce/magento-cart-checkout@3.0.36
  - @graphcommerce/magento-cart-coupon@3.1.4
  - @graphcommerce/magento-cart-email@3.0.36
  - @graphcommerce/magento-cart-items@3.0.37
  - @graphcommerce/magento-cart-payment-method@3.4.1
  - @graphcommerce/magento-cart-shipping-address@3.2.6
  - @graphcommerce/magento-cart-shipping-method@3.3.1
  - @graphcommerce/magento-customer@4.7.1
  - @graphcommerce/magento-customer-account@3.1.29
  - @graphcommerce/magento-customer-order@3.0.30
  - @graphcommerce/magento-newsletter@2.0.34
  - @graphcommerce/magento-payment-braintree@3.0.35
  - @graphcommerce/magento-payment-included@3.1.7
  - @graphcommerce/magento-product@4.4.14
  - @graphcommerce/magento-review@3.2.22
  - @graphcommerce/magento-search@4.1.24
  - @graphcommerce/magento-wishlist@1.3.8
  - @graphcommerce/mollie-magento-payment@3.4.1
  - @graphcommerce/magento-cms@4.0.27
  - @graphcommerce/magento-product-bundle@4.0.36
  - @graphcommerce/magento-product-downloadable@4.0.36
  - @graphcommerce/magento-product-grouped@3.0.36
  - @graphcommerce/magento-product-simple@4.0.36
  - @graphcommerce/magento-product-virtual@4.0.36

## 3.15.0

### Minor Changes

- [#1544](https://github.com/graphcommerce-org/graphcommerce/pull/1544) [`5f927ebdc`](https://github.com/graphcommerce-org/graphcommerce/commit/5f927ebdc6f0331833e02b96e4f169bfe475ac6b) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - Fixed hydration errors on account, cart and wishlist

* [#1534](https://github.com/graphcommerce-org/graphcommerce/pull/1534) [`c756f42e5`](https://github.com/graphcommerce-org/graphcommerce/commit/c756f42e503761a497e4a5a7a02d02141df231c3) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - Added the method title to the action card title for shipping methods.

### Patch Changes

- [#1542](https://github.com/graphcommerce-org/graphcommerce/pull/1542) [`84df00e00`](https://github.com/graphcommerce-org/graphcommerce/commit/84df00e008af99b377029da93d25881bd87644ee) Thanks [@NickdeK](https://github.com/NickdeK)! - Updated @mui/material and @mui/labs

* [#1545](https://github.com/graphcommerce-org/graphcommerce/pull/1545) [`c87a28e7d`](https://github.com/graphcommerce-org/graphcommerce/commit/c87a28e7dad87bffd0bd125ad5fdca65aaa389cc) Thanks [@paales](https://github.com/paales)! - Faster hydration with useLayoutEffect

* Updated dependencies [[`5f927ebdc`](https://github.com/graphcommerce-org/graphcommerce/commit/5f927ebdc6f0331833e02b96e4f169bfe475ac6b), [`1e0a8b0a3`](https://github.com/graphcommerce-org/graphcommerce/commit/1e0a8b0a3842d150fdfd6e040b408a6fb3f76c7c), [`c87a28e7d`](https://github.com/graphcommerce-org/graphcommerce/commit/c87a28e7dad87bffd0bd125ad5fdca65aaa389cc), [`c756f42e5`](https://github.com/graphcommerce-org/graphcommerce/commit/c756f42e503761a497e4a5a7a02d02141df231c3)]:
  - @graphcommerce/ecommerce-ui@1.1.0
  - @graphcommerce/graphql@3.4.0
  - @graphcommerce/magento-cart@4.5.0
  - @graphcommerce/magento-cart-payment-method@3.4.0
  - @graphcommerce/magento-cart-shipping-method@3.3.0
  - @graphcommerce/magento-customer@4.7.0
  - @graphcommerce/magento-graphql@3.1.0
  - @graphcommerce/mollie-magento-payment@3.4.0
  - @graphcommerce/lingui-next@2.1.11
  - @graphcommerce/next-ui@4.12.0
  - @graphcommerce/googlerecaptcha@2.1.10
  - @graphcommerce/graphcms-ui@3.0.28
  - @graphcommerce/magento-cart-billing-address@3.0.33
  - @graphcommerce/magento-cart-checkout@3.0.35
  - @graphcommerce/magento-cart-coupon@3.1.3
  - @graphcommerce/magento-cart-email@3.0.35
  - @graphcommerce/magento-cart-items@3.0.36
  - @graphcommerce/magento-cart-shipping-address@3.2.5
  - @graphcommerce/magento-category@4.1.21
  - @graphcommerce/magento-cms@4.0.26
  - @graphcommerce/magento-customer-account@3.1.28
  - @graphcommerce/magento-customer-order@3.0.29
  - @graphcommerce/magento-newsletter@2.0.33
  - @graphcommerce/magento-payment-braintree@3.0.34
  - @graphcommerce/magento-payment-included@3.1.6
  - @graphcommerce/magento-product@4.4.13
  - @graphcommerce/magento-product-bundle@4.0.35
  - @graphcommerce/magento-product-configurable@4.1.20
  - @graphcommerce/magento-product-downloadable@4.0.35
  - @graphcommerce/magento-product-grouped@3.0.35
  - @graphcommerce/magento-product-simple@4.0.35
  - @graphcommerce/magento-product-virtual@4.0.35
  - @graphcommerce/magento-review@3.2.21
  - @graphcommerce/magento-search@4.1.23
  - @graphcommerce/magento-store@4.2.15
  - @graphcommerce/magento-wishlist@1.3.7
  - @graphcommerce/framer-scroller@2.1.21

## 3.14.4

### Patch Changes

- [#1538](https://github.com/graphcommerce-org/graphcommerce/pull/1538) [`fe4baa42d`](https://github.com/graphcommerce-org/graphcommerce/commit/fe4baa42db0081ed960d62aef688bd36a7ac974f) Thanks [@paales](https://github.com/paales)! - add missing translations

- Updated dependencies [[`fe4baa42d`](https://github.com/graphcommerce-org/graphcommerce/commit/fe4baa42db0081ed960d62aef688bd36a7ac974f)]:
  - @graphcommerce/magento-cart@4.4.8
  - @graphcommerce/magento-cart-billing-address@3.0.32
  - @graphcommerce/magento-cart-items@3.0.35
  - @graphcommerce/magento-cart-payment-method@3.3.5
  - @graphcommerce/magento-cart-shipping-address@3.2.4
  - @graphcommerce/magento-cart-shipping-method@3.2.4
  - @graphcommerce/magento-customer@4.6.3
  - @graphcommerce/magento-search@4.1.22
  - @graphcommerce/magento-wishlist@1.3.6
  - @graphcommerce/next-ui@4.11.2
  - @graphcommerce/magento-cart-checkout@3.0.34
  - @graphcommerce/magento-cart-coupon@3.1.2
  - @graphcommerce/magento-cart-email@3.0.34
  - @graphcommerce/magento-newsletter@2.0.32
  - @graphcommerce/magento-payment-braintree@3.0.33
  - @graphcommerce/magento-payment-included@3.1.5
  - @graphcommerce/magento-product@4.4.12
  - @graphcommerce/magento-product-bundle@4.0.34
  - @graphcommerce/magento-product-configurable@4.1.19
  - @graphcommerce/magento-product-downloadable@4.0.34
  - @graphcommerce/magento-product-grouped@3.0.34
  - @graphcommerce/magento-product-simple@4.0.34
  - @graphcommerce/magento-product-virtual@4.0.34
  - @graphcommerce/mollie-magento-payment@3.3.5
  - @graphcommerce/magento-customer-account@3.1.27
  - @graphcommerce/magento-review@3.2.20
  - @graphcommerce/ecommerce-ui@1.0.23
  - @graphcommerce/framer-scroller@2.1.20
  - @graphcommerce/graphcms-ui@3.0.27
  - @graphcommerce/magento-category@4.1.20
  - @graphcommerce/magento-customer-order@3.0.28
  - @graphcommerce/magento-store@4.2.14
  - @graphcommerce/magento-cms@4.0.25

## 3.14.3

### Patch Changes

- [#1536](https://github.com/graphcommerce-org/graphcommerce/pull/1536) [`574256d53`](https://github.com/graphcommerce-org/graphcommerce/commit/574256d53dd88313d2c89aae59e10f6b66bdb9c2) Thanks [@paales](https://github.com/paales)! - make sure we don’t have a dependency mismatch where @lingui/react will still try to install 3.14.0

## 3.14.2

### Patch Changes

- Updated dependencies [[`aec1f42fa`](https://github.com/graphcommerce-org/graphcommerce/commit/aec1f42fa2c02764c3071bfcccbf5eb6a13fbaef)]:
  - @graphcommerce/lingui-next@2.1.10

## 3.14.1

### Patch Changes

- Updated dependencies [[`11bca2d2f`](https://github.com/graphcommerce-org/graphcommerce/commit/11bca2d2f7dbb7c5e2827c04eb0db43d4099f2fd), [`d5e012462`](https://github.com/graphcommerce-org/graphcommerce/commit/d5e012462dda18a61aa20eca8dc57e26cc4c7931)]:
  - @graphcommerce/next-ui@4.11.1
  - @graphcommerce/magento-cart-payment-method@3.3.4
  - @graphcommerce/ecommerce-ui@1.0.22
  - @graphcommerce/framer-scroller@2.1.19
  - @graphcommerce/graphcms-ui@3.0.26
  - @graphcommerce/magento-cart@4.4.7
  - @graphcommerce/magento-cart-billing-address@3.0.31
  - @graphcommerce/magento-cart-checkout@3.0.33
  - @graphcommerce/magento-cart-coupon@3.1.1
  - @graphcommerce/magento-cart-email@3.0.33
  - @graphcommerce/magento-cart-items@3.0.34
  - @graphcommerce/magento-cart-shipping-address@3.2.3
  - @graphcommerce/magento-cart-shipping-method@3.2.3
  - @graphcommerce/magento-category@4.1.19
  - @graphcommerce/magento-customer@4.6.2
  - @graphcommerce/magento-customer-account@3.1.26
  - @graphcommerce/magento-customer-order@3.0.27
  - @graphcommerce/magento-newsletter@2.0.31
  - @graphcommerce/magento-payment-braintree@3.0.32
  - @graphcommerce/magento-payment-included@3.1.4
  - @graphcommerce/magento-product@4.4.11
  - @graphcommerce/magento-product-configurable@4.1.18
  - @graphcommerce/magento-review@3.2.19
  - @graphcommerce/magento-search@4.1.21
  - @graphcommerce/magento-store@4.2.13
  - @graphcommerce/magento-wishlist@1.3.5
  - @graphcommerce/mollie-magento-payment@3.3.4
  - @graphcommerce/magento-product-bundle@4.0.33
  - @graphcommerce/magento-product-downloadable@4.0.33
  - @graphcommerce/magento-product-grouped@3.0.33
  - @graphcommerce/magento-product-simple@4.0.33
  - @graphcommerce/magento-product-virtual@4.0.33
  - @graphcommerce/magento-cms@4.0.24

## 3.14.0

### Minor Changes

- [#1524](https://github.com/graphcommerce-org/graphcommerce/pull/1524) [`735b78672`](https://github.com/graphcommerce-org/graphcommerce/commit/735b786724d5401cbe6e88f2515e121a1a0945b2) Thanks [@paales](https://github.com/paales)! - Add errorLink while in development mode to allow for better error reporting when sending faulty queries to backends

### Patch Changes

- [#1524](https://github.com/graphcommerce-org/graphcommerce/pull/1524) [`13623f3cc`](https://github.com/graphcommerce-org/graphcommerce/commit/13623f3cc68fa60fc9686d71a077d6ab73ccc696) Thanks [@paales](https://github.com/paales)! - correctly set the ssr mode for Apollo Client

* [#1524](https://github.com/graphcommerce-org/graphcommerce/pull/1524) [`9ec0338df`](https://github.com/graphcommerce-org/graphcommerce/commit/9ec0338dfe34d37b0f2c24e36ffa6ed13ea1145e) Thanks [@paales](https://github.com/paales)! - feat: Added useDateTimeFormat and useNumberFormat which automatically use the locales from nextjs.

* Updated dependencies [[`d140fca34`](https://github.com/graphcommerce-org/graphcommerce/commit/d140fca3463b73e761e23fd1d9216305727f0c1a), [`c80e10d96`](https://github.com/graphcommerce-org/graphcommerce/commit/c80e10d96de18de73e7768f93aae806ce9cc45de), [`66559536f`](https://github.com/graphcommerce-org/graphcommerce/commit/66559536f8bb4faf597ae9f2efe4946d7add43c4), [`9ec0338df`](https://github.com/graphcommerce-org/graphcommerce/commit/9ec0338dfe34d37b0f2c24e36ffa6ed13ea1145e), [`dae4551b7`](https://github.com/graphcommerce-org/graphcommerce/commit/dae4551b7b8181adc3405fb1ce88eae56495a8a9), [`735b78672`](https://github.com/graphcommerce-org/graphcommerce/commit/735b786724d5401cbe6e88f2515e121a1a0945b2)]:
  - @graphcommerce/magento-cart@4.4.6
  - @graphcommerce/magento-cart-coupon@3.1.0
  - @graphcommerce/mollie-magento-payment@3.3.3
  - @graphcommerce/next-ui@4.11.0
  - @graphcommerce/magento-customer-order@3.0.26
  - @graphcommerce/magento-product@4.4.10
  - @graphcommerce/magento-review@3.2.18
  - @graphcommerce/magento-store@4.2.12
  - @graphcommerce/magento-cart-payment-method@3.3.3
  - @graphcommerce/graphql@3.3.0
  - @graphcommerce/magento-cart-billing-address@3.0.30
  - @graphcommerce/magento-cart-checkout@3.0.32
  - @graphcommerce/magento-cart-email@3.0.32
  - @graphcommerce/magento-cart-items@3.0.33
  - @graphcommerce/magento-cart-shipping-address@3.2.2
  - @graphcommerce/magento-cart-shipping-method@3.2.2
  - @graphcommerce/magento-newsletter@2.0.30
  - @graphcommerce/magento-payment-braintree@3.0.31
  - @graphcommerce/magento-payment-included@3.1.3
  - @graphcommerce/magento-product-bundle@4.0.32
  - @graphcommerce/magento-product-configurable@4.1.17
  - @graphcommerce/magento-product-downloadable@4.0.32
  - @graphcommerce/magento-product-grouped@3.0.32
  - @graphcommerce/magento-product-simple@4.0.32
  - @graphcommerce/magento-product-virtual@4.0.32
  - @graphcommerce/magento-wishlist@1.3.4
  - @graphcommerce/ecommerce-ui@1.0.21
  - @graphcommerce/framer-scroller@2.1.18
  - @graphcommerce/graphcms-ui@3.0.25
  - @graphcommerce/magento-category@4.1.18
  - @graphcommerce/magento-customer@4.6.1
  - @graphcommerce/magento-customer-account@3.1.25
  - @graphcommerce/magento-search@4.1.20
  - @graphcommerce/magento-cms@4.0.23
  - @graphcommerce/googlerecaptcha@2.1.9
  - @graphcommerce/magento-graphql@3.0.15

## 3.13.2

### Patch Changes

- Updated dependencies [[`98ff2334d`](https://github.com/graphcommerce-org/graphcommerce/commit/98ff2334d1b7dedb8bc56ebe6abb50836eefedd3)]:
  - @graphcommerce/magento-customer@4.6.0
  - @graphcommerce/magento-cart@4.4.5
  - @graphcommerce/magento-cart-billing-address@3.0.29
  - @graphcommerce/magento-cart-checkout@3.0.31
  - @graphcommerce/magento-cart-email@3.0.31
  - @graphcommerce/magento-cart-items@3.0.32
  - @graphcommerce/magento-cart-shipping-address@3.2.1
  - @graphcommerce/magento-customer-account@3.1.24
  - @graphcommerce/magento-newsletter@2.0.29
  - @graphcommerce/magento-product-configurable@4.1.16
  - @graphcommerce/magento-review@3.2.17
  - @graphcommerce/magento-wishlist@1.3.3
  - @graphcommerce/magento-cart-coupon@3.0.31
  - @graphcommerce/magento-cart-payment-method@3.3.2
  - @graphcommerce/magento-cart-shipping-method@3.2.1
  - @graphcommerce/magento-payment-braintree@3.0.30
  - @graphcommerce/magento-payment-included@3.1.2
  - @graphcommerce/magento-product@4.4.9
  - @graphcommerce/magento-product-bundle@4.0.31
  - @graphcommerce/magento-product-downloadable@4.0.31
  - @graphcommerce/magento-product-grouped@3.0.31
  - @graphcommerce/magento-product-simple@4.0.31
  - @graphcommerce/magento-product-virtual@4.0.31
  - @graphcommerce/mollie-magento-payment@3.3.2
  - @graphcommerce/magento-category@4.1.17

## 3.13.1

### Patch Changes

- Updated dependencies [[`64c7b6b45`](https://github.com/graphcommerce-org/graphcommerce/commit/64c7b6b4595a13110453f98680ffd69f27f2c656)]:
  - @graphcommerce/magento-cart-payment-method@3.3.1
  - @graphcommerce/mollie-magento-payment@3.3.1
  - @graphcommerce/magento-payment-braintree@3.0.29
  - @graphcommerce/magento-payment-included@3.1.1

## 3.13.0

### Minor Changes

- [#1515](https://github.com/graphcommerce-org/graphcommerce/pull/1515) [`371e6cf52`](https://github.com/graphcommerce-org/graphcommerce/commit/371e6cf52916a3b6c44192bd40cc8271bd608832) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - - Shipping method UI improvements in checkout, like working ripple effect, auto select and other styling changes.
  - Added new inline button variant

* [#1518](https://github.com/graphcommerce-org/graphcommerce/pull/1518) [`4143483f3`](https://github.com/graphcommerce-org/graphcommerce/commit/4143483f37c038d2bbf218be2685e27a31a35745) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - New ActionCardListForm implementation for Payment Methods

### Patch Changes

- Updated dependencies [[`c877e438a`](https://github.com/graphcommerce-org/graphcommerce/commit/c877e438a48f30204fa3e36b611906a546e1cf5c), [`371e6cf52`](https://github.com/graphcommerce-org/graphcommerce/commit/371e6cf52916a3b6c44192bd40cc8271bd608832), [`4143483f3`](https://github.com/graphcommerce-org/graphcommerce/commit/4143483f37c038d2bbf218be2685e27a31a35745)]:
  - @graphcommerce/magento-customer@4.5.4
  - @graphcommerce/magento-cart-shipping-address@3.2.0
  - @graphcommerce/magento-cart-shipping-method@3.2.0
  - @graphcommerce/next-ui@4.10.0
  - @graphcommerce/magento-cart-payment-method@3.3.0
  - @graphcommerce/magento-payment-included@3.1.0
  - @graphcommerce/mollie-magento-payment@3.3.0
  - @graphcommerce/magento-cart@4.4.4
  - @graphcommerce/magento-cart-billing-address@3.0.28
  - @graphcommerce/magento-cart-checkout@3.0.30
  - @graphcommerce/magento-cart-email@3.0.30
  - @graphcommerce/magento-cart-items@3.0.31
  - @graphcommerce/magento-customer-account@3.1.23
  - @graphcommerce/magento-newsletter@2.0.28
  - @graphcommerce/magento-product-configurable@4.1.15
  - @graphcommerce/magento-review@3.2.16
  - @graphcommerce/magento-wishlist@1.3.2
  - @graphcommerce/magento-payment-braintree@3.0.28
  - @graphcommerce/ecommerce-ui@1.0.20
  - @graphcommerce/framer-scroller@2.1.17
  - @graphcommerce/graphcms-ui@3.0.24
  - @graphcommerce/magento-cart-coupon@3.0.30
  - @graphcommerce/magento-category@4.1.16
  - @graphcommerce/magento-customer-order@3.0.25
  - @graphcommerce/magento-product@4.4.8
  - @graphcommerce/magento-search@4.1.19
  - @graphcommerce/magento-store@4.2.11
  - @graphcommerce/magento-product-bundle@4.0.30
  - @graphcommerce/magento-product-downloadable@4.0.30
  - @graphcommerce/magento-product-grouped@3.0.30
  - @graphcommerce/magento-product-simple@4.0.30
  - @graphcommerce/magento-product-virtual@4.0.30
  - @graphcommerce/magento-cms@4.0.22

## 3.12.0

### Minor Changes

- [#1503](https://github.com/graphcommerce-org/graphcommerce/pull/1503) [`a9213f1f5`](https://github.com/graphcommerce-org/graphcommerce/commit/a9213f1f5a410d217768386ccb6d9b5ce7bd5782) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - Bug fixes for shipping methods in /checkout

### Patch Changes

- [#1490](https://github.com/graphcommerce-org/graphcommerce/pull/1490) [`d311ef48b`](https://github.com/graphcommerce-org/graphcommerce/commit/d311ef48bb3e97806d992af5516d6b7f183ec9cb) Thanks [@paales](https://github.com/paales)! - upgraded packages

- Updated dependencies [[`8a626ecf7`](https://github.com/graphcommerce-org/graphcommerce/commit/8a626ecf7ed00c46a28088e0b9bae00a4e1ae019), [`a2b4d7804`](https://github.com/graphcommerce-org/graphcommerce/commit/a2b4d78046a55d70194bd8bcd1efa499d5a73b74), [`a9213f1f5`](https://github.com/graphcommerce-org/graphcommerce/commit/a9213f1f5a410d217768386ccb6d9b5ce7bd5782), [`ddb6d6329`](https://github.com/graphcommerce-org/graphcommerce/commit/ddb6d6329bfad361b2fbe96402ca2bfc0ab3d98c), [`d311ef48b`](https://github.com/graphcommerce-org/graphcommerce/commit/d311ef48bb3e97806d992af5516d6b7f183ec9cb)]:
  - @graphcommerce/magento-customer@4.5.3
  - @graphcommerce/magento-cart-payment-method@3.2.0
  - @graphcommerce/magento-cart-shipping-address@3.1.0
  - @graphcommerce/magento-cart-shipping-method@3.1.0
  - @graphcommerce/next-ui@4.9.0
  - @graphcommerce/framer-scroller@2.1.16
  - @graphcommerce/cli@1.0.5
  - @graphcommerce/ecommerce-ui@1.0.19
  - @graphcommerce/framer-next-pages@3.2.3
  - @graphcommerce/googleanalytics@2.0.7
  - @graphcommerce/googlerecaptcha@2.1.8
  - @graphcommerce/googletagmanager@2.0.8
  - @graphcommerce/graphcms-ui@3.0.23
  - @graphcommerce/graphql@3.2.1
  - @graphcommerce/graphql-mesh@4.1.4
  - @graphcommerce/image@3.1.7
  - @graphcommerce/lingui-next@2.1.9
  - @graphcommerce/magento-cart@4.4.3
  - @graphcommerce/magento-cart-billing-address@3.0.27
  - @graphcommerce/magento-cart-checkout@3.0.29
  - @graphcommerce/magento-cart-coupon@3.0.29
  - @graphcommerce/magento-cart-email@3.0.29
  - @graphcommerce/magento-cart-items@3.0.30
  - @graphcommerce/magento-category@4.1.15
  - @graphcommerce/magento-cms@4.0.21
  - @graphcommerce/magento-customer-account@3.1.22
  - @graphcommerce/magento-customer-order@3.0.24
  - @graphcommerce/magento-graphql@3.0.14
  - @graphcommerce/magento-newsletter@2.0.27
  - @graphcommerce/magento-payment-braintree@3.0.27
  - @graphcommerce/magento-payment-included@3.0.27
  - @graphcommerce/magento-product@4.4.7
  - @graphcommerce/magento-product-bundle@4.0.29
  - @graphcommerce/magento-product-configurable@4.1.14
  - @graphcommerce/magento-product-downloadable@4.0.29
  - @graphcommerce/magento-product-grouped@3.0.29
  - @graphcommerce/magento-product-simple@4.0.29
  - @graphcommerce/magento-product-virtual@4.0.29
  - @graphcommerce/magento-review@3.2.15
  - @graphcommerce/magento-search@4.1.18
  - @graphcommerce/magento-store@4.2.10
  - @graphcommerce/magento-wishlist@1.3.1
  - @graphcommerce/mollie-magento-payment@3.2.20
  - @graphcommerce/next-config@3.1.5

## 3.11.2

### Patch Changes

- Updated dependencies [[`de6781908`](https://github.com/graphcommerce-org/graphcommerce/commit/de6781908cbf514b9fd225aa1407fa1385c8e53b), [`d5d9550fe`](https://github.com/graphcommerce-org/graphcommerce/commit/d5d9550fe8991a90e432d8c3bd6e1be117acd18f), [`0ab7c5465`](https://github.com/graphcommerce-org/graphcommerce/commit/0ab7c5465441cba9bf8cd185a6790ce2f443f4ed), [`711fa6e04`](https://github.com/graphcommerce-org/graphcommerce/commit/711fa6e04519bbe91825fec7e1714277c1a8fa68)]:
  - @graphcommerce/magento-product-configurable@4.1.13
  - @graphcommerce/magento-product@4.4.6
  - @graphcommerce/magento-wishlist@1.3.0
  - @graphcommerce/framer-scroller@2.1.15
  - @graphcommerce/next-ui@4.8.4
  - @graphcommerce/magento-customer@4.5.2
  - @graphcommerce/magento-payment-braintree@3.0.26
  - @graphcommerce/magento-payment-included@3.0.26
  - @graphcommerce/mollie-magento-payment@3.2.19
  - @graphcommerce/magento-cart-email@3.0.28
  - @graphcommerce/magento-cart-items@3.0.29
  - @graphcommerce/magento-category@4.1.14
  - @graphcommerce/magento-product-bundle@4.0.28
  - @graphcommerce/magento-product-downloadable@4.0.28
  - @graphcommerce/magento-product-grouped@3.0.28
  - @graphcommerce/magento-product-simple@4.0.28
  - @graphcommerce/magento-product-virtual@4.0.28
  - @graphcommerce/magento-review@3.2.14
  - @graphcommerce/magento-cart@4.4.2
  - @graphcommerce/magento-cart-payment-method@3.1.19
  - @graphcommerce/magento-cart-shipping-method@3.0.28
  - @graphcommerce/ecommerce-ui@1.0.18
  - @graphcommerce/graphcms-ui@3.0.22
  - @graphcommerce/magento-cart-billing-address@3.0.26
  - @graphcommerce/magento-cart-checkout@3.0.28
  - @graphcommerce/magento-cart-coupon@3.0.28
  - @graphcommerce/magento-cart-shipping-address@3.0.27
  - @graphcommerce/magento-customer-account@3.1.21
  - @graphcommerce/magento-customer-order@3.0.23
  - @graphcommerce/magento-newsletter@2.0.26
  - @graphcommerce/magento-search@4.1.17
  - @graphcommerce/magento-store@4.2.9
  - @graphcommerce/magento-cms@4.0.20

## 3.11.1

### Patch Changes

- [#1499](https://github.com/graphcommerce-org/graphcommerce/pull/1499) [`c44400e79`](https://github.com/graphcommerce-org/graphcommerce/commit/c44400e7913457700a9ed9a132dedb96752e06fc) Thanks [@paales](https://github.com/paales)! - Encountered two children with the same key

- Updated dependencies [[`d205b037f`](https://github.com/graphcommerce-org/graphcommerce/commit/d205b037fee82b8c03993f2c586f477e826093bf)]:
  - @graphcommerce/magento-cart@4.4.1
  - @graphcommerce/magento-customer@4.5.1
  - @graphcommerce/magento-cart-billing-address@3.0.25
  - @graphcommerce/magento-cart-checkout@3.0.27
  - @graphcommerce/magento-cart-coupon@3.0.27
  - @graphcommerce/magento-cart-email@3.0.27
  - @graphcommerce/magento-cart-items@3.0.28
  - @graphcommerce/magento-cart-payment-method@3.1.18
  - @graphcommerce/magento-cart-shipping-address@3.0.26
  - @graphcommerce/magento-cart-shipping-method@3.0.27
  - @graphcommerce/magento-newsletter@2.0.25
  - @graphcommerce/magento-payment-braintree@3.0.25
  - @graphcommerce/magento-payment-included@3.0.25
  - @graphcommerce/magento-product@4.4.5
  - @graphcommerce/magento-product-bundle@4.0.27
  - @graphcommerce/magento-product-configurable@4.1.12
  - @graphcommerce/magento-product-downloadable@4.0.27
  - @graphcommerce/magento-product-grouped@3.0.27
  - @graphcommerce/magento-product-simple@4.0.27
  - @graphcommerce/magento-product-virtual@4.0.27
  - @graphcommerce/magento-wishlist@1.2.5
  - @graphcommerce/mollie-magento-payment@3.2.18
  - @graphcommerce/magento-customer-account@3.1.20
  - @graphcommerce/magento-review@3.2.13
  - @graphcommerce/magento-category@4.1.13

## 3.11.0

### Minor Changes

- [#1492](https://github.com/graphcommerce-org/graphcommerce/pull/1492) [`bed806ddd`](https://github.com/graphcommerce-org/graphcommerce/commit/bed806dddd7e025806a69798ef9587aa165d392f) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - Removed useExtractCustomerErrors hook and implemented error handling via HttpLink Error

### Patch Changes

- Updated dependencies [[`d6d3a750e`](https://github.com/graphcommerce-org/graphcommerce/commit/d6d3a750ee15c40ba022f29b923a1b872a4796ea), [`bed806ddd`](https://github.com/graphcommerce-org/graphcommerce/commit/bed806dddd7e025806a69798ef9587aa165d392f)]:
  - @graphcommerce/googlerecaptcha@2.1.7
  - @graphcommerce/graphql@3.2.0
  - @graphcommerce/magento-cart@4.4.0
  - @graphcommerce/magento-customer@4.5.0
  - @graphcommerce/ecommerce-ui@1.0.17
  - @graphcommerce/magento-cart-billing-address@3.0.24
  - @graphcommerce/magento-cart-checkout@3.0.26
  - @graphcommerce/magento-cart-coupon@3.0.26
  - @graphcommerce/magento-cart-email@3.0.26
  - @graphcommerce/magento-cart-items@3.0.27
  - @graphcommerce/magento-cart-payment-method@3.1.17
  - @graphcommerce/magento-cart-shipping-address@3.0.25
  - @graphcommerce/magento-cart-shipping-method@3.0.26
  - @graphcommerce/magento-customer-account@3.1.19
  - @graphcommerce/magento-newsletter@2.0.24
  - @graphcommerce/magento-payment-braintree@3.0.24
  - @graphcommerce/magento-payment-included@3.0.24
  - @graphcommerce/magento-product-configurable@4.1.11
  - @graphcommerce/magento-review@3.2.12
  - @graphcommerce/magento-search@4.1.16
  - @graphcommerce/mollie-magento-payment@3.2.17
  - @graphcommerce/graphcms-ui@3.0.21
  - @graphcommerce/magento-category@4.1.12
  - @graphcommerce/magento-cms@4.0.19
  - @graphcommerce/magento-customer-order@3.0.22
  - @graphcommerce/magento-graphql@3.0.13
  - @graphcommerce/magento-product@4.4.4
  - @graphcommerce/magento-product-bundle@4.0.26
  - @graphcommerce/magento-product-downloadable@4.0.26
  - @graphcommerce/magento-product-grouped@3.0.26
  - @graphcommerce/magento-product-simple@4.0.26
  - @graphcommerce/magento-product-virtual@4.0.26
  - @graphcommerce/magento-store@4.2.8
  - @graphcommerce/magento-wishlist@1.2.4

## 3.10.4

### Patch Changes

- Updated dependencies []:
  - @graphcommerce/ecommerce-ui@1.0.16
  - @graphcommerce/magento-cart@4.3.4
  - @graphcommerce/magento-cart-billing-address@3.0.23
  - @graphcommerce/magento-cart-checkout@3.0.25
  - @graphcommerce/magento-cart-coupon@3.0.25
  - @graphcommerce/magento-cart-email@3.0.25
  - @graphcommerce/magento-cart-items@3.0.26
  - @graphcommerce/magento-cart-payment-method@3.1.16
  - @graphcommerce/magento-cart-shipping-address@3.0.24
  - @graphcommerce/magento-cart-shipping-method@3.0.25
  - @graphcommerce/magento-customer@4.4.2
  - @graphcommerce/magento-customer-account@3.1.18
  - @graphcommerce/magento-newsletter@2.0.23
  - @graphcommerce/magento-payment-braintree@3.0.23
  - @graphcommerce/magento-payment-included@3.0.23
  - @graphcommerce/magento-product-configurable@4.1.10
  - @graphcommerce/magento-review@3.2.11
  - @graphcommerce/magento-search@4.1.15
  - @graphcommerce/mollie-magento-payment@3.2.16
  - @graphcommerce/magento-product@4.4.3
  - @graphcommerce/magento-product-bundle@4.0.25
  - @graphcommerce/magento-product-downloadable@4.0.25
  - @graphcommerce/magento-product-grouped@3.0.25
  - @graphcommerce/magento-product-simple@4.0.25
  - @graphcommerce/magento-product-virtual@4.0.25
  - @graphcommerce/magento-wishlist@1.2.3
  - @graphcommerce/magento-category@4.1.11

## 3.10.3

### Patch Changes

- [#1487](https://github.com/graphcommerce-org/graphcommerce/pull/1487) [`c5f368c44`](https://github.com/graphcommerce-org/graphcommerce/commit/c5f368c44b802ef91156499378439b950e9109ba) Thanks [@paales](https://github.com/paales)! - when using the context in custom resolvers it should have the meshContext available

- Updated dependencies [[`c63ab89c2`](https://github.com/graphcommerce-org/graphcommerce/commit/c63ab89c20cb81d79188900d57f3d65a7bba71cc), [`238aa4d34`](https://github.com/graphcommerce-org/graphcommerce/commit/238aa4d3478773b8cb0973f4112c9829e59e16d6), [`13b174d28`](https://github.com/graphcommerce-org/graphcommerce/commit/13b174d28d1886043d9e02aef09c794ff23ea918), [`afc67103d`](https://github.com/graphcommerce-org/graphcommerce/commit/afc67103d0e00583e274465036fd287537f95e79)]:
  - @graphcommerce/magento-product-configurable@4.1.9
  - @graphcommerce/magento-product@4.4.2
  - @graphcommerce/magento-customer@4.4.1
  - @graphcommerce/magento-category@4.1.10
  - @graphcommerce/next-ui@4.8.3
  - @graphcommerce/magento-payment-braintree@3.0.22
  - @graphcommerce/magento-payment-included@3.0.22
  - @graphcommerce/magento-wishlist@1.2.2
  - @graphcommerce/mollie-magento-payment@3.2.15
  - @graphcommerce/magento-cart-email@3.0.24
  - @graphcommerce/magento-cart-items@3.0.25
  - @graphcommerce/magento-product-bundle@4.0.24
  - @graphcommerce/magento-product-downloadable@4.0.24
  - @graphcommerce/magento-product-grouped@3.0.24
  - @graphcommerce/magento-product-simple@4.0.24
  - @graphcommerce/magento-product-virtual@4.0.24
  - @graphcommerce/magento-review@3.2.10
  - @graphcommerce/magento-cart@4.3.3
  - @graphcommerce/magento-cart-billing-address@3.0.22
  - @graphcommerce/magento-cart-checkout@3.0.24
  - @graphcommerce/magento-cart-shipping-address@3.0.23
  - @graphcommerce/magento-customer-account@3.1.17
  - @graphcommerce/magento-newsletter@2.0.22
  - @graphcommerce/ecommerce-ui@1.0.15
  - @graphcommerce/framer-scroller@2.1.14
  - @graphcommerce/graphcms-ui@3.0.20
  - @graphcommerce/magento-cart-coupon@3.0.24
  - @graphcommerce/magento-cart-payment-method@3.1.15
  - @graphcommerce/magento-cart-shipping-method@3.0.24
  - @graphcommerce/magento-customer-order@3.0.21
  - @graphcommerce/magento-search@4.1.14
  - @graphcommerce/magento-store@4.2.7
  - @graphcommerce/magento-cms@4.0.18

## 3.10.2

### Patch Changes

- Updated dependencies [[`d6262de71`](https://github.com/graphcommerce-org/graphcommerce/commit/d6262de71d2254a2b0b492e1a60f9e141767470e), [`c8c246b8a`](https://github.com/graphcommerce-org/graphcommerce/commit/c8c246b8aaab0621b68a2fca2a1c529a56fad962), [`e3005fe63`](https://github.com/graphcommerce-org/graphcommerce/commit/e3005fe6306093d47b08c6756c21c8175649e30b)]:
  - @graphcommerce/magento-customer@4.4.0
  - @graphcommerce/magento-cart@4.3.2
  - @graphcommerce/magento-newsletter@2.0.21
  - @graphcommerce/magento-wishlist@1.2.1
  - @graphcommerce/next-ui@4.8.2
  - @graphcommerce/magento-cart-billing-address@3.0.21
  - @graphcommerce/magento-cart-checkout@3.0.23
  - @graphcommerce/magento-cart-email@3.0.23
  - @graphcommerce/magento-cart-items@3.0.24
  - @graphcommerce/magento-cart-shipping-address@3.0.22
  - @graphcommerce/magento-customer-account@3.1.16
  - @graphcommerce/magento-product-configurable@4.1.8
  - @graphcommerce/magento-review@3.2.9
  - @graphcommerce/magento-cart-coupon@3.0.23
  - @graphcommerce/magento-cart-payment-method@3.1.14
  - @graphcommerce/magento-cart-shipping-method@3.0.23
  - @graphcommerce/magento-payment-braintree@3.0.21
  - @graphcommerce/magento-payment-included@3.0.21
  - @graphcommerce/magento-product@4.4.1
  - @graphcommerce/magento-product-bundle@4.0.23
  - @graphcommerce/magento-product-downloadable@4.0.23
  - @graphcommerce/magento-product-grouped@3.0.23
  - @graphcommerce/magento-product-simple@4.0.23
  - @graphcommerce/magento-product-virtual@4.0.23
  - @graphcommerce/mollie-magento-payment@3.2.14
  - @graphcommerce/ecommerce-ui@1.0.14
  - @graphcommerce/framer-scroller@2.1.13
  - @graphcommerce/graphcms-ui@3.0.19
  - @graphcommerce/magento-category@4.1.9
  - @graphcommerce/magento-customer-order@3.0.20
  - @graphcommerce/magento-search@4.1.13
  - @graphcommerce/magento-store@4.2.6
  - @graphcommerce/magento-cms@4.0.17

## 3.10.1

### Patch Changes

- [#1480](https://github.com/graphcommerce-org/graphcommerce/pull/1480) [`9fa0fa2cd`](https://github.com/graphcommerce-org/graphcommerce/commit/9fa0fa2cd0b950ffae47d536fc0cde4df026771a) Thanks [@NickdeK](https://github.com/NickdeK)! - Use vercel preview endpoint

- Updated dependencies [[`a9df81310`](https://github.com/graphcommerce-org/graphcommerce/commit/a9df81310c051876dd82fb2819105dece47cc213), [`55c2dcde7`](https://github.com/graphcommerce-org/graphcommerce/commit/55c2dcde7869ee51b84494af653b3edfd43904a4), [`597e2f413`](https://github.com/graphcommerce-org/graphcommerce/commit/597e2f413bdb5b76793b40ab631ce61390e26e81), [`b359fe252`](https://github.com/graphcommerce-org/graphcommerce/commit/b359fe252a50bb8195601ba97c3eef6a7be146ba), [`f167f9963`](https://github.com/graphcommerce-org/graphcommerce/commit/f167f99630966a7de43717937d43669e66132494)]:
  - @graphcommerce/next-ui@4.8.1
  - @graphcommerce/framer-scroller@2.1.12
  - @graphcommerce/framer-next-pages@3.2.2
  - @graphcommerce/magento-product@4.4.0
  - @graphcommerce/magento-wishlist@1.2.0
  - @graphcommerce/ecommerce-ui@1.0.13
  - @graphcommerce/graphcms-ui@3.0.18
  - @graphcommerce/magento-cart@4.3.1
  - @graphcommerce/magento-cart-billing-address@3.0.20
  - @graphcommerce/magento-cart-checkout@3.0.22
  - @graphcommerce/magento-cart-coupon@3.0.22
  - @graphcommerce/magento-cart-email@3.0.22
  - @graphcommerce/magento-cart-items@3.0.23
  - @graphcommerce/magento-cart-payment-method@3.1.13
  - @graphcommerce/magento-cart-shipping-address@3.0.21
  - @graphcommerce/magento-cart-shipping-method@3.0.22
  - @graphcommerce/magento-category@4.1.8
  - @graphcommerce/magento-customer@4.3.2
  - @graphcommerce/magento-customer-account@3.1.15
  - @graphcommerce/magento-customer-order@3.0.19
  - @graphcommerce/magento-newsletter@2.0.20
  - @graphcommerce/magento-payment-braintree@3.0.20
  - @graphcommerce/magento-payment-included@3.0.20
  - @graphcommerce/magento-product-configurable@4.1.7
  - @graphcommerce/magento-review@3.2.8
  - @graphcommerce/magento-search@4.1.12
  - @graphcommerce/magento-store@4.2.5
  - @graphcommerce/mollie-magento-payment@3.2.13
  - @graphcommerce/magento-product-bundle@4.0.22
  - @graphcommerce/magento-product-downloadable@4.0.22
  - @graphcommerce/magento-product-grouped@3.0.22
  - @graphcommerce/magento-product-simple@4.0.22
  - @graphcommerce/magento-product-virtual@4.0.22
  - @graphcommerce/image@3.1.6
  - @graphcommerce/magento-cms@4.0.16

## 3.10.0

### Minor Changes

- [#1474](https://github.com/graphcommerce-org/graphcommerce/pull/1474) [`267a85c73`](https://github.com/graphcommerce-org/graphcommerce/commit/267a85c734e86541cb38a9695a1583ea343d6e00) Thanks [@timhofman](https://github.com/timhofman)! - show loading screen when wishlist data is being fetched

* [#1475](https://github.com/graphcommerce-org/graphcommerce/pull/1475) [`08d710c7b`](https://github.com/graphcommerce-org/graphcommerce/commit/08d710c7bb13f8485c820cba2578ec9a70d1c77d) Thanks [@timhofman](https://github.com/timhofman)! - prevent blank page when loading cart items takes a bit longer

- [#1472](https://github.com/graphcommerce-org/graphcommerce/pull/1472) [`cf575395c`](https://github.com/graphcommerce-org/graphcommerce/commit/cf575395c16e9c571f75d4563004c3018a29aeaa) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - Added translations to cart errors

### Patch Changes

- [#1476](https://github.com/graphcommerce-org/graphcommerce/pull/1476) [`f45aa38fa`](https://github.com/graphcommerce-org/graphcommerce/commit/f45aa38faab25fe2de3148883e9b208ed78a96e1) Thanks [@paales](https://github.com/paales)! - remove unused metaDescriptions for noindex pages

* [#1476](https://github.com/graphcommerce-org/graphcommerce/pull/1476) [`4cda98ea6`](https://github.com/graphcommerce-org/graphcommerce/commit/4cda98ea6f5f0cbb68fd67956b69524618c396fa) Thanks [@paales](https://github.com/paales)! - move CustomerAddressForm import to package root

* Updated dependencies [[`849ea6595`](https://github.com/graphcommerce-org/graphcommerce/commit/849ea6595f9d3057bbf120d117529cbe74c0998a), [`4cda98ea6`](https://github.com/graphcommerce-org/graphcommerce/commit/4cda98ea6f5f0cbb68fd67956b69524618c396fa), [`a12db31b9`](https://github.com/graphcommerce-org/graphcommerce/commit/a12db31b9db9d27d86f59c1bfe58a0879999b9d3), [`cf575395c`](https://github.com/graphcommerce-org/graphcommerce/commit/cf575395c16e9c571f75d4563004c3018a29aeaa)]:
  - @graphcommerce/magento-wishlist@1.1.1
  - @graphcommerce/magento-cart-shipping-address@3.0.20
  - @graphcommerce/magento-customer@4.3.1
  - @graphcommerce/magento-cart@4.3.0
  - @graphcommerce/magento-cart-payment-method@3.1.12
  - @graphcommerce/magento-cart-shipping-method@3.0.21
  - @graphcommerce/magento-payment-braintree@3.0.19
  - @graphcommerce/magento-payment-included@3.0.19
  - @graphcommerce/mollie-magento-payment@3.2.12
  - @graphcommerce/magento-cart-billing-address@3.0.19
  - @graphcommerce/magento-cart-checkout@3.0.21
  - @graphcommerce/magento-cart-email@3.0.21
  - @graphcommerce/magento-cart-items@3.0.22
  - @graphcommerce/magento-customer-account@3.1.14
  - @graphcommerce/magento-newsletter@2.0.19
  - @graphcommerce/magento-product-configurable@4.1.6
  - @graphcommerce/magento-review@3.2.7
  - @graphcommerce/magento-cart-coupon@3.0.21
  - @graphcommerce/magento-product@4.3.6
  - @graphcommerce/magento-product-bundle@4.0.21
  - @graphcommerce/magento-product-downloadable@4.0.21
  - @graphcommerce/magento-product-grouped@3.0.21
  - @graphcommerce/magento-product-simple@4.0.21
  - @graphcommerce/magento-product-virtual@4.0.21
  - @graphcommerce/magento-category@4.1.7

## 3.9.1

### Patch Changes

- Updated dependencies [[`aac7bb3ad`](https://github.com/graphcommerce-org/graphcommerce/commit/aac7bb3adc62b0646813ab6a3ca9c3eb216e9caf)]:
  - @graphcommerce/magento-cart-shipping-address@3.0.19
  - @graphcommerce/magento-cart-shipping-method@3.0.20

## 3.9.0

### Minor Changes

- [#1467](https://github.com/graphcommerce-org/graphcommerce/pull/1467) [`0363b9671`](https://github.com/graphcommerce-org/graphcommerce/commit/0363b9671db7c2932321d97faf6f1eb385238397) Thanks [@timhofman](https://github.com/timhofman)! - optional feedback message upon adding products to wishlist

* [#1462](https://github.com/graphcommerce-org/graphcommerce/pull/1462) [`3ac90b57c`](https://github.com/graphcommerce-org/graphcommerce/commit/3ac90b57c68b96f9d81771d6664ed9435a28fc1d) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - Added translation for the pagination

### Patch Changes

- [#1463](https://github.com/graphcommerce-org/graphcommerce/pull/1463) [`1288c6e47`](https://github.com/graphcommerce-org/graphcommerce/commit/1288c6e47caba3d1b9b7f6abf564ef28cde1e828) Thanks [@paales](https://github.com/paales)! - make sure ApolloClient correctly detects ssrMode

* [#1457](https://github.com/graphcommerce-org/graphcommerce/pull/1457) [`c3b9496e0`](https://github.com/graphcommerce-org/graphcommerce/commit/c3b9496e0e7e48a375251134b19b342cdc4c4c57) Thanks [@timhofman](https://github.com/timhofman)! - fix: error when adding downloadable product to cart in wishlist

* Updated dependencies [[`0363b9671`](https://github.com/graphcommerce-org/graphcommerce/commit/0363b9671db7c2932321d97faf6f1eb385238397), [`c6a62a338`](https://github.com/graphcommerce-org/graphcommerce/commit/c6a62a338abf8af83d3a6eb7ed796586009910ca), [`3ac90b57c`](https://github.com/graphcommerce-org/graphcommerce/commit/3ac90b57c68b96f9d81771d6664ed9435a28fc1d), [`00f6167ff`](https://github.com/graphcommerce-org/graphcommerce/commit/00f6167ff4096bf7432f3d8e8e739ecbf6ab0dd2), [`7159d3ab3`](https://github.com/graphcommerce-org/graphcommerce/commit/7159d3ab31e937c9c921023c46e80db5813e789c), [`c74089bd7`](https://github.com/graphcommerce-org/graphcommerce/commit/c74089bd7475bd8dd6090d3cdb5f2cff2570a4fc), [`31ce79a89`](https://github.com/graphcommerce-org/graphcommerce/commit/31ce79a89624205ce12d7192375b864d9a87e31a), [`a71a7e4bc`](https://github.com/graphcommerce-org/graphcommerce/commit/a71a7e4bced2c2719839eecdd995e5b3a0faadb8), [`32370574b`](https://github.com/graphcommerce-org/graphcommerce/commit/32370574bef6345b857ae911049ca27a64bc7e08), [`ed2b67a06`](https://github.com/graphcommerce-org/graphcommerce/commit/ed2b67a0618d9db97e79ed2a8226e0ae12403943), [`4c146c682`](https://github.com/graphcommerce-org/graphcommerce/commit/4c146c68242e6edc616807fb73173cc959c26034)]:
  - @graphcommerce/magento-wishlist@1.1.0
  - @graphcommerce/next-ui@4.8.0
  - @graphcommerce/magento-product@4.3.5
  - @graphcommerce/magento-customer@4.3.0
  - @graphcommerce/magento-cart@4.2.15
  - @graphcommerce/ecommerce-ui@1.0.12
  - @graphcommerce/framer-scroller@2.1.11
  - @graphcommerce/graphcms-ui@3.0.17
  - @graphcommerce/magento-cart-billing-address@3.0.18
  - @graphcommerce/magento-cart-checkout@3.0.20
  - @graphcommerce/magento-cart-coupon@3.0.20
  - @graphcommerce/magento-cart-email@3.0.20
  - @graphcommerce/magento-cart-items@3.0.21
  - @graphcommerce/magento-cart-payment-method@3.1.11
  - @graphcommerce/magento-cart-shipping-address@3.0.18
  - @graphcommerce/magento-cart-shipping-method@3.0.19
  - @graphcommerce/magento-category@4.1.6
  - @graphcommerce/magento-customer-account@3.1.13
  - @graphcommerce/magento-customer-order@3.0.18
  - @graphcommerce/magento-newsletter@2.0.18
  - @graphcommerce/magento-payment-braintree@3.0.18
  - @graphcommerce/magento-payment-included@3.0.18
  - @graphcommerce/magento-product-configurable@4.1.5
  - @graphcommerce/magento-review@3.2.6
  - @graphcommerce/magento-search@4.1.11
  - @graphcommerce/magento-store@4.2.4
  - @graphcommerce/mollie-magento-payment@3.2.11
  - @graphcommerce/magento-product-bundle@4.0.20
  - @graphcommerce/magento-product-downloadable@4.0.20
  - @graphcommerce/magento-product-grouped@3.0.20
  - @graphcommerce/magento-product-simple@4.0.20
  - @graphcommerce/magento-product-virtual@4.0.20
  - @graphcommerce/magento-cms@4.0.15

## 3.8.2

### Patch Changes

- [#1454](https://github.com/graphcommerce-org/graphcommerce/pull/1454) [`7daa4bdb2`](https://github.com/graphcommerce-org/graphcommerce/commit/7daa4bdb2eb5132f057b34b03465704ad58f77bd) Thanks [@paales](https://github.com/paales)! - Add missing cart translations

* [#1454](https://github.com/graphcommerce-org/graphcommerce/pull/1454) [`d38b58bb3`](https://github.com/graphcommerce-org/graphcommerce/commit/d38b58bb3499a8055e1a60ec416064811e7412ed) Thanks [@paales](https://github.com/paales)! - Make sure to keep casing when generating graphql documents to match graphql-mesh's casing.

* Updated dependencies [[`d38b58bb3`](https://github.com/graphcommerce-org/graphcommerce/commit/d38b58bb3499a8055e1a60ec416064811e7412ed)]:
  - @graphcommerce/magento-wishlist@1.0.5

## 3.8.1

### Patch Changes

- Updated dependencies [[`c30893857`](https://github.com/graphcommerce-org/graphcommerce/commit/c3089385791291e812a48c2691a39a2325ee0439), [`062c19664`](https://github.com/graphcommerce-org/graphcommerce/commit/062c19664689a0b8675e986806dbb243cfb6c063)]:
  - @graphcommerce/magento-store@4.2.3
  - @graphcommerce/magento-wishlist@1.0.4
  - @graphcommerce/magento-cart@4.2.14
  - @graphcommerce/magento-cart-billing-address@3.0.17
  - @graphcommerce/magento-cart-checkout@3.0.19
  - @graphcommerce/magento-cart-coupon@3.0.19
  - @graphcommerce/magento-cart-email@3.0.19
  - @graphcommerce/magento-cart-items@3.0.20
  - @graphcommerce/magento-cart-payment-method@3.1.10
  - @graphcommerce/magento-cart-shipping-address@3.0.17
  - @graphcommerce/magento-cart-shipping-method@3.0.18
  - @graphcommerce/magento-category@4.1.5
  - @graphcommerce/magento-cms@4.0.14
  - @graphcommerce/magento-customer@4.2.12
  - @graphcommerce/magento-customer-account@3.1.12
  - @graphcommerce/magento-customer-order@3.0.17
  - @graphcommerce/magento-payment-braintree@3.0.17
  - @graphcommerce/magento-payment-included@3.0.17
  - @graphcommerce/magento-product@4.3.4
  - @graphcommerce/magento-product-configurable@4.1.4
  - @graphcommerce/magento-review@3.2.5
  - @graphcommerce/mollie-magento-payment@3.2.10
  - @graphcommerce/magento-newsletter@2.0.17
  - @graphcommerce/magento-product-bundle@4.0.19
  - @graphcommerce/magento-product-downloadable@4.0.19
  - @graphcommerce/magento-product-grouped@3.0.19
  - @graphcommerce/magento-product-simple@4.0.19
  - @graphcommerce/magento-product-virtual@4.0.19

## 3.8.0

### Minor Changes

- [#1451](https://github.com/graphcommerce-org/graphcommerce/pull/1451) [`5d22428db`](https://github.com/graphcommerce-org/graphcommerce/commit/5d22428db11bcd5ee70674c7acce7c07f0681a55) Thanks [@paales](https://github.com/paales)! - Switched to swc compiler, dev build times will be about 3 times faster!

### Patch Changes

- [#1444](https://github.com/graphcommerce-org/graphcommerce/pull/1444) [`3b623efdd`](https://github.com/graphcommerce-org/graphcommerce/commit/3b623efdd1d26cc533b707ad4ef08c00989539a1) Thanks [@timhofman](https://github.com/timhofman)! - Lowest product price was based on regular_price instead of final_price

* [#1451](https://github.com/graphcommerce-org/graphcommerce/pull/1451) [`f698ff85d`](https://github.com/graphcommerce-org/graphcommerce/commit/f698ff85df6bb0922288471bb3c81856091b8061) Thanks [@paales](https://github.com/paales)! - Removed all occurences of @lingui/macro and moved to @lingui/macro / @lingui/core in preparation to move to swc.

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

* Updated dependencies [[`50188e378`](https://github.com/graphcommerce-org/graphcommerce/commit/50188e378b4c77561ebc600958ea11cd114fa61a), [`3b623efdd`](https://github.com/graphcommerce-org/graphcommerce/commit/3b623efdd1d26cc533b707ad4ef08c00989539a1), [`f698ff85d`](https://github.com/graphcommerce-org/graphcommerce/commit/f698ff85df6bb0922288471bb3c81856091b8061)]:
  - @graphcommerce/magento-cart-payment-method@3.1.9
  - @graphcommerce/mollie-magento-payment@3.2.9
  - @graphcommerce/magento-wishlist@1.0.3
  - @graphcommerce/ecommerce-ui@1.0.11
  - @graphcommerce/framer-scroller@2.1.10
  - @graphcommerce/lingui-next@2.1.8
  - @graphcommerce/magento-cart@4.2.13
  - @graphcommerce/magento-cart-billing-address@3.0.16
  - @graphcommerce/magento-cart-checkout@3.0.18
  - @graphcommerce/magento-cart-coupon@3.0.18
  - @graphcommerce/magento-cart-email@3.0.18
  - @graphcommerce/magento-cart-items@3.0.19
  - @graphcommerce/magento-cart-shipping-address@3.0.16
  - @graphcommerce/magento-cart-shipping-method@3.0.17
  - @graphcommerce/magento-category@4.1.4
  - @graphcommerce/magento-cms@4.0.13
  - @graphcommerce/magento-customer@4.2.11
  - @graphcommerce/magento-customer-account@3.1.11
  - @graphcommerce/magento-customer-order@3.0.16
  - @graphcommerce/magento-newsletter@2.0.16
  - @graphcommerce/magento-payment-braintree@3.0.16
  - @graphcommerce/magento-payment-included@3.0.16
  - @graphcommerce/magento-product@4.3.3
  - @graphcommerce/magento-product-bundle@4.0.18
  - @graphcommerce/magento-product-configurable@4.1.3
  - @graphcommerce/magento-product-downloadable@4.0.18
  - @graphcommerce/magento-product-grouped@3.0.18
  - @graphcommerce/magento-product-simple@4.0.18
  - @graphcommerce/magento-product-virtual@4.0.18
  - @graphcommerce/magento-review@3.2.4
  - @graphcommerce/magento-search@4.1.10
  - @graphcommerce/magento-store@4.2.2
  - @graphcommerce/next-ui@4.7.2
  - @graphcommerce/graphql@3.1.3
  - @graphcommerce/graphcms-ui@3.0.16
  - @graphcommerce/googlerecaptcha@2.1.6
  - @graphcommerce/magento-graphql@3.0.12

## 3.7.4

### Patch Changes

- Updated dependencies [[`7618f86da`](https://github.com/graphcommerce-org/graphcommerce/commit/7618f86da930929b10b6baf145646356b1bb3793)]:
  - @graphcommerce/magento-graphql@3.0.11
  - @graphcommerce/magento-cart@4.2.12
  - @graphcommerce/magento-customer@4.2.10
  - @graphcommerce/magento-customer-account@3.1.10
  - @graphcommerce/magento-customer-order@3.0.15
  - @graphcommerce/magento-cart-billing-address@3.0.15
  - @graphcommerce/magento-cart-checkout@3.0.17
  - @graphcommerce/magento-cart-coupon@3.0.17
  - @graphcommerce/magento-cart-email@3.0.17
  - @graphcommerce/magento-cart-items@3.0.18
  - @graphcommerce/magento-cart-payment-method@3.1.8
  - @graphcommerce/magento-cart-shipping-address@3.0.15
  - @graphcommerce/magento-cart-shipping-method@3.0.16
  - @graphcommerce/magento-newsletter@2.0.15
  - @graphcommerce/magento-payment-braintree@3.0.15
  - @graphcommerce/magento-payment-included@3.0.15
  - @graphcommerce/magento-product@4.3.2
  - @graphcommerce/magento-product-bundle@4.0.17
  - @graphcommerce/magento-product-configurable@4.1.2
  - @graphcommerce/magento-product-downloadable@4.0.17
  - @graphcommerce/magento-product-grouped@3.0.17
  - @graphcommerce/magento-product-simple@4.0.17
  - @graphcommerce/magento-product-virtual@4.0.17
  - @graphcommerce/magento-wishlist@1.0.2
  - @graphcommerce/mollie-magento-payment@3.2.8
  - @graphcommerce/magento-review@3.2.3
  - @graphcommerce/magento-category@4.1.3

## 3.7.3

### Patch Changes

- [#1432](https://github.com/graphcommerce-org/graphcommerce/pull/1432) [`80e30bb77`](https://github.com/graphcommerce-org/graphcommerce/commit/80e30bb77015755fbc00a7935d590f80c1c1c18c) Thanks [@paales](https://github.com/paales)! - Updated translations

- Updated dependencies [[`25ef6cf08`](https://github.com/graphcommerce-org/graphcommerce/commit/25ef6cf08c278105307d6f604b7135d637e9046c), [`99600dd09`](https://github.com/graphcommerce-org/graphcommerce/commit/99600dd091980dd9ef335c04d2efac0835c20b2f), [`80e30bb77`](https://github.com/graphcommerce-org/graphcommerce/commit/80e30bb77015755fbc00a7935d590f80c1c1c18c)]:
  - @graphcommerce/cli@1.0.4
  - @graphcommerce/graphql@3.1.2
  - @graphcommerce/graphql-mesh@4.1.3
  - @graphcommerce/framer-next-pages@3.2.1
  - @graphcommerce/magento-customer@4.2.9
  - @graphcommerce/ecommerce-ui@1.0.10
  - @graphcommerce/googlerecaptcha@2.1.5
  - @graphcommerce/graphcms-ui@3.0.15
  - @graphcommerce/magento-cart@4.2.11
  - @graphcommerce/magento-cart-billing-address@3.0.14
  - @graphcommerce/magento-cart-checkout@3.0.16
  - @graphcommerce/magento-cart-coupon@3.0.16
  - @graphcommerce/magento-cart-email@3.0.16
  - @graphcommerce/magento-cart-items@3.0.17
  - @graphcommerce/magento-cart-payment-method@3.1.7
  - @graphcommerce/magento-cart-shipping-address@3.0.14
  - @graphcommerce/magento-cart-shipping-method@3.0.15
  - @graphcommerce/magento-category@4.1.2
  - @graphcommerce/magento-cms@4.0.12
  - @graphcommerce/magento-customer-account@3.1.9
  - @graphcommerce/magento-customer-order@3.0.14
  - @graphcommerce/magento-graphql@3.0.10
  - @graphcommerce/magento-newsletter@2.0.14
  - @graphcommerce/magento-payment-braintree@3.0.14
  - @graphcommerce/magento-payment-included@3.0.14
  - @graphcommerce/magento-product@4.3.1
  - @graphcommerce/magento-product-bundle@4.0.16
  - @graphcommerce/magento-product-configurable@4.1.1
  - @graphcommerce/magento-product-downloadable@4.0.16
  - @graphcommerce/magento-product-grouped@3.0.16
  - @graphcommerce/magento-product-simple@4.0.16
  - @graphcommerce/magento-product-virtual@4.0.16
  - @graphcommerce/magento-review@3.2.2
  - @graphcommerce/magento-search@4.1.9
  - @graphcommerce/magento-store@4.2.1
  - @graphcommerce/magento-wishlist@1.0.1
  - @graphcommerce/mollie-magento-payment@3.2.7
  - @graphcommerce/next-ui@4.7.1
  - @graphcommerce/framer-scroller@2.1.9

## 3.7.2

### Patch Changes

- Updated dependencies [[`669a17a97`](https://github.com/graphcommerce-org/graphcommerce/commit/669a17a973c47c00fed4a649a9da0bfc5670c5da)]:
  - @graphcommerce/magento-product@4.3.0
  - @graphcommerce/magento-product-configurable@4.1.0
  - @graphcommerce/magento-wishlist@1.0.0
  - @graphcommerce/magento-cart-email@3.0.15
  - @graphcommerce/magento-cart-items@3.0.16
  - @graphcommerce/magento-category@4.1.1
  - @graphcommerce/magento-product-bundle@4.0.15
  - @graphcommerce/magento-product-downloadable@4.0.15
  - @graphcommerce/magento-product-grouped@3.0.15
  - @graphcommerce/magento-product-simple@4.0.15
  - @graphcommerce/magento-product-virtual@4.0.15
  - @graphcommerce/magento-review@3.2.1
  - @graphcommerce/magento-cart-checkout@3.0.15

## 3.7.1

### Patch Changes

- Updated dependencies [[`3c1c9ce2a`](https://github.com/graphcommerce-org/graphcommerce/commit/3c1c9ce2a947386515df019c31d697114a87dc07)]:
  - @graphcommerce/magento-category@4.1.0
  - @graphcommerce/magento-product-configurable@4.0.17

## 3.7.0

### Minor Changes

- [#1416](https://github.com/graphcommerce-org/graphcommerce/pull/1416) [`f3d06dd83`](https://github.com/graphcommerce-org/graphcommerce/commit/f3d06dd836c9a76412b419d4d2c79bbd0ee92e04) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - SEO audit

### Patch Changes

- Updated dependencies [[`f3d06dd83`](https://github.com/graphcommerce-org/graphcommerce/commit/f3d06dd836c9a76412b419d4d2c79bbd0ee92e04)]:
  - @graphcommerce/framer-next-pages@3.2.0
  - @graphcommerce/magento-product@4.2.0
  - @graphcommerce/magento-review@3.2.0
  - @graphcommerce/magento-store@4.2.0
  - @graphcommerce/next-ui@4.7.0
  - @graphcommerce/magento-cart@4.2.10
  - @graphcommerce/magento-cart-billing-address@3.0.13
  - @graphcommerce/magento-cart-email@3.0.14
  - @graphcommerce/magento-cart-items@3.0.15
  - @graphcommerce/magento-category@4.0.15
  - @graphcommerce/magento-payment-braintree@3.0.13
  - @graphcommerce/magento-payment-included@3.0.13
  - @graphcommerce/magento-product-bundle@4.0.14
  - @graphcommerce/magento-product-configurable@4.0.16
  - @graphcommerce/magento-product-downloadable@4.0.14
  - @graphcommerce/magento-product-grouped@3.0.14
  - @graphcommerce/magento-product-simple@4.0.14
  - @graphcommerce/magento-product-virtual@4.0.14
  - @graphcommerce/mollie-magento-payment@3.2.6
  - @graphcommerce/magento-cart-checkout@3.0.14
  - @graphcommerce/magento-cart-coupon@3.0.15
  - @graphcommerce/magento-cart-payment-method@3.1.6
  - @graphcommerce/magento-cart-shipping-address@3.0.13
  - @graphcommerce/magento-cart-shipping-method@3.0.14
  - @graphcommerce/magento-cms@4.0.11
  - @graphcommerce/magento-customer@4.2.8
  - @graphcommerce/magento-customer-account@3.1.8
  - @graphcommerce/magento-customer-order@3.0.13
  - @graphcommerce/ecommerce-ui@1.0.9
  - @graphcommerce/framer-scroller@2.1.8
  - @graphcommerce/graphcms-ui@3.0.14
  - @graphcommerce/magento-newsletter@2.0.13
  - @graphcommerce/magento-search@4.1.8

## 3.6.4

### Patch Changes

- [#1429](https://github.com/graphcommerce-org/graphcommerce/pull/1429) [`ba8cd4d34`](https://github.com/graphcommerce-org/graphcommerce/commit/ba8cd4d3480a7ec7e555b051cfd0fbc809c7aa12) Thanks [@paales](https://github.com/paales)! - mesh couldn’t be generated properly in a non-monorepo setup

- Updated dependencies [[`e58df7278`](https://github.com/graphcommerce-org/graphcommerce/commit/e58df727829a12941e7b2ae2159ee2233969493c), [`ba8cd4d34`](https://github.com/graphcommerce-org/graphcommerce/commit/ba8cd4d3480a7ec7e555b051cfd0fbc809c7aa12)]:
  - @graphcommerce/magento-graphql@3.0.9
  - @graphcommerce/cli@1.0.3
  - @graphcommerce/graphql-mesh@4.1.2
  - @graphcommerce/magento-cart@4.2.9
  - @graphcommerce/magento-customer@4.2.7
  - @graphcommerce/magento-customer-account@3.1.7
  - @graphcommerce/magento-customer-order@3.0.12
  - @graphcommerce/magento-product@4.1.11
  - @graphcommerce/magento-product-configurable@4.0.15
  - @graphcommerce/magento-review@3.1.9
  - @graphcommerce/magento-store@4.1.9
  - @graphcommerce/mollie-magento-payment@3.2.5
  - @graphcommerce/magento-cart-billing-address@3.0.12
  - @graphcommerce/magento-cart-checkout@3.0.13
  - @graphcommerce/magento-cart-coupon@3.0.14
  - @graphcommerce/magento-cart-email@3.0.13
  - @graphcommerce/magento-cart-items@3.0.14
  - @graphcommerce/magento-cart-payment-method@3.1.5
  - @graphcommerce/magento-cart-shipping-address@3.0.12
  - @graphcommerce/magento-cart-shipping-method@3.0.13
  - @graphcommerce/magento-newsletter@2.0.12
  - @graphcommerce/magento-payment-braintree@3.0.12
  - @graphcommerce/magento-payment-included@3.0.12
  - @graphcommerce/magento-product-bundle@4.0.13
  - @graphcommerce/magento-product-downloadable@4.0.13
  - @graphcommerce/magento-product-grouped@3.0.13
  - @graphcommerce/magento-product-simple@4.0.13
  - @graphcommerce/magento-product-virtual@4.0.13
  - @graphcommerce/magento-category@4.0.14
  - @graphcommerce/magento-cms@4.0.10

## 3.6.3

### Patch Changes

- [#1426](https://github.com/graphcommerce-org/graphcommerce/pull/1426) [`100f4c38c`](https://github.com/graphcommerce-org/graphcommerce/commit/100f4c38c8fcda4bc6e0425e38028b550b60adc2) Thanks [@paales](https://github.com/paales)! - Upgrade packages

* [#1427](https://github.com/graphcommerce-org/graphcommerce/pull/1427) [`cbbbcab55`](https://github.com/graphcommerce-org/graphcommerce/commit/cbbbcab55bfccff95e779fd18a49412127adcd78) Thanks [@paales](https://github.com/paales)! - Change mesh generation strategy where mesh paths could't be found when using the mock store

- [#1394](https://github.com/graphcommerce-org/graphcommerce/pull/1394) [`b6b8bb5b3`](https://github.com/graphcommerce-org/graphcommerce/commit/b6b8bb5b31b0891ea24733de34a3bd5c0a9604e4) Thanks [@paales](https://github.com/paales)! - Corrected spelling mistake

- Updated dependencies [[`b6b8bb5b3`](https://github.com/graphcommerce-org/graphcommerce/commit/b6b8bb5b31b0891ea24733de34a3bd5c0a9604e4), [`06f7bdff8`](https://github.com/graphcommerce-org/graphcommerce/commit/06f7bdff882396f2b0e1a2873fbb718c7b06fab4), [`b6b8bb5b3`](https://github.com/graphcommerce-org/graphcommerce/commit/b6b8bb5b31b0891ea24733de34a3bd5c0a9604e4), [`100f4c38c`](https://github.com/graphcommerce-org/graphcommerce/commit/100f4c38c8fcda4bc6e0425e38028b550b60adc2), [`cbbbcab55`](https://github.com/graphcommerce-org/graphcommerce/commit/cbbbcab55bfccff95e779fd18a49412127adcd78)]:
  - @graphcommerce/cli@1.0.2
  - @graphcommerce/graphql-mesh@4.1.1
  - @graphcommerce/magento-category@4.0.13
  - @graphcommerce/magento-cms@4.0.9
  - @graphcommerce/magento-product@4.1.10
  - @graphcommerce/graphql@3.1.1
  - @graphcommerce/lingui-next@2.1.7
  - @graphcommerce/next-ui@4.6.2
  - @graphcommerce/next-config@3.1.4
  - @graphcommerce/magento-customer@4.2.6
  - @graphcommerce/magento-customer-order@3.0.11
  - @graphcommerce/magento-product-configurable@4.0.14
  - @graphcommerce/magento-review@3.1.8
  - @graphcommerce/magento-store@4.1.8
  - @graphcommerce/mollie-magento-payment@3.2.4
  - @graphcommerce/magento-cart-email@3.0.12
  - @graphcommerce/magento-cart-items@3.0.13
  - @graphcommerce/magento-payment-braintree@3.0.11
  - @graphcommerce/magento-payment-included@3.0.11
  - @graphcommerce/magento-product-bundle@4.0.12
  - @graphcommerce/magento-product-downloadable@4.0.12
  - @graphcommerce/magento-product-grouped@3.0.12
  - @graphcommerce/magento-product-simple@4.0.12
  - @graphcommerce/magento-product-virtual@4.0.12
  - @graphcommerce/ecommerce-ui@1.0.8
  - @graphcommerce/googlerecaptcha@2.1.4
  - @graphcommerce/graphcms-ui@3.0.13
  - @graphcommerce/magento-cart@4.2.8
  - @graphcommerce/magento-cart-billing-address@3.0.11
  - @graphcommerce/magento-cart-checkout@3.0.12
  - @graphcommerce/magento-cart-coupon@3.0.13
  - @graphcommerce/magento-cart-payment-method@3.1.4
  - @graphcommerce/magento-cart-shipping-address@3.0.11
  - @graphcommerce/magento-cart-shipping-method@3.0.12
  - @graphcommerce/magento-customer-account@3.1.6
  - @graphcommerce/magento-graphql@3.0.8
  - @graphcommerce/magento-newsletter@2.0.11
  - @graphcommerce/magento-search@4.1.7
  - @graphcommerce/framer-scroller@2.1.7

## 3.6.2

### Patch Changes

- Updated dependencies [[`a52a863f9`](https://github.com/graphcommerce-org/graphcommerce/commit/a52a863f9c69c6b3ae657dcce3bc9b14413ce125)]:
  - @graphcommerce/magento-product@4.1.9
  - @graphcommerce/magento-cart-email@3.0.11
  - @graphcommerce/magento-cart-items@3.0.12
  - @graphcommerce/magento-category@4.0.12
  - @graphcommerce/magento-product-bundle@4.0.11
  - @graphcommerce/magento-product-configurable@4.0.13
  - @graphcommerce/magento-product-downloadable@4.0.11
  - @graphcommerce/magento-product-grouped@3.0.11
  - @graphcommerce/magento-product-simple@4.0.11
  - @graphcommerce/magento-product-virtual@4.0.11
  - @graphcommerce/magento-review@3.1.7
  - @graphcommerce/magento-cart-checkout@3.0.11

## 3.6.1

### Patch Changes

- [#1410](https://github.com/graphcommerce-org/graphcommerce/pull/1410) [`6d1a1a64a`](https://github.com/graphcommerce-org/graphcommerce/commit/6d1a1a64a95b5444322a022a30f8353f3b3fd017) Thanks [@FrankHarland](https://github.com/FrankHarland)! - exclude /modal from sitemap

* [#1414](https://github.com/graphcommerce-org/graphcommerce/pull/1414) [`be3467b41`](https://github.com/graphcommerce-org/graphcommerce/commit/be3467b4179aca333f3be653673458ad5f59277f) Thanks [@paales](https://github.com/paales)! - Fixed an error when running yarn codegen: Unable to find any GraphQL type definitions for the following pointers

* Updated dependencies [[`d8906cf4a`](https://github.com/graphcommerce-org/graphcommerce/commit/d8906cf4afbfc234aedd91a2c581f82623267357), [`be3467b41`](https://github.com/graphcommerce-org/graphcommerce/commit/be3467b4179aca333f3be653673458ad5f59277f)]:
  - @graphcommerce/magento-cart@4.2.7
  - @graphcommerce/magento-customer@4.2.5
  - @graphcommerce/cli@1.0.1
  - @graphcommerce/magento-cart-billing-address@3.0.10
  - @graphcommerce/magento-cart-checkout@3.0.10
  - @graphcommerce/magento-cart-coupon@3.0.12
  - @graphcommerce/magento-cart-email@3.0.10
  - @graphcommerce/magento-cart-items@3.0.11
  - @graphcommerce/magento-cart-payment-method@3.1.3
  - @graphcommerce/magento-cart-shipping-address@3.0.10
  - @graphcommerce/magento-cart-shipping-method@3.0.11
  - @graphcommerce/magento-newsletter@2.0.10
  - @graphcommerce/magento-payment-braintree@3.0.10
  - @graphcommerce/magento-payment-included@3.0.10
  - @graphcommerce/magento-product@4.1.8
  - @graphcommerce/magento-product-bundle@4.0.10
  - @graphcommerce/magento-product-configurable@4.0.12
  - @graphcommerce/magento-product-downloadable@4.0.10
  - @graphcommerce/magento-product-grouped@3.0.10
  - @graphcommerce/magento-product-simple@4.0.10
  - @graphcommerce/magento-product-virtual@4.0.10
  - @graphcommerce/mollie-magento-payment@3.2.3
  - @graphcommerce/magento-customer-account@3.1.5
  - @graphcommerce/magento-review@3.1.6
  - @graphcommerce/magento-category@4.0.11

## 3.6.0

### Minor Changes

- [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542) Thanks [@paales](https://github.com/paales)! - Now using [@graphql-yoga](https://github.com/dotansimha/graphql-yoga) for GraphQL which has full support for [envelop](https://www.envelop.dev/) plugins.

* [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542) Thanks [@paales](https://github.com/paales)! - Added a new @graphcommerce/cli package to generate the mesh so it can be generated _inside_ the @graphcommerce/graphql-mesh package to allow for better future extensibility.

### Patch Changes

- [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`da0ae7d02`](https://github.com/graphcommerce-org/graphcommerce/commit/da0ae7d0236e4908ba0bf0fa16656be516e841d4) Thanks [@paales](https://github.com/paales)! - Updated dependencies

- Updated dependencies [[`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542), [`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542), [`8652662cf`](https://github.com/graphcommerce-org/graphcommerce/commit/8652662cf9a8711d1c685d4f5cd788870a8242e2), [`da0ae7d02`](https://github.com/graphcommerce-org/graphcommerce/commit/da0ae7d0236e4908ba0bf0fa16656be516e841d4)]:
  - @graphcommerce/cli@1.0.0
  - @graphcommerce/graphql@3.1.0
  - @graphcommerce/graphql-mesh@4.1.0
  - @graphcommerce/graphcms-ui@3.0.12
  - @graphcommerce/magento-cart@4.2.6
  - @graphcommerce/magento-cart-payment-method@3.1.2
  - @graphcommerce/magento-cart-shipping-method@3.0.10
  - @graphcommerce/magento-customer@4.2.4
  - @graphcommerce/magento-customer-order@3.0.10
  - @graphcommerce/magento-graphql@3.0.7
  - @graphcommerce/magento-payment-braintree@3.0.9
  - @graphcommerce/magento-product@4.1.7
  - @graphcommerce/magento-product-configurable@4.0.11
  - @graphcommerce/magento-review@3.1.5
  - @graphcommerce/magento-search@4.1.6
  - @graphcommerce/magento-store@4.1.7
  - @graphcommerce/mollie-magento-payment@3.2.2
  - @graphcommerce/next-ui@4.6.1
  - @graphcommerce/next-config@3.1.3
  - @graphcommerce/ecommerce-ui@1.0.7
  - @graphcommerce/framer-next-pages@3.1.6
  - @graphcommerce/framer-scroller@2.1.6
  - @graphcommerce/googlerecaptcha@2.1.3
  - @graphcommerce/googletagmanager@2.0.7
  - @graphcommerce/image@3.1.5
  - @graphcommerce/lingui-next@2.1.6
  - @graphcommerce/magento-cart-billing-address@3.0.9
  - @graphcommerce/magento-cart-checkout@3.0.9
  - @graphcommerce/magento-cart-coupon@3.0.11
  - @graphcommerce/magento-cart-email@3.0.9
  - @graphcommerce/magento-cart-items@3.0.10
  - @graphcommerce/magento-cart-shipping-address@3.0.9
  - @graphcommerce/magento-category@4.0.10
  - @graphcommerce/magento-cms@4.0.8
  - @graphcommerce/magento-customer-account@3.1.4
  - @graphcommerce/magento-newsletter@2.0.9
  - @graphcommerce/magento-payment-included@3.0.9
  - @graphcommerce/magento-product-bundle@4.0.9
  - @graphcommerce/magento-product-downloadable@4.0.9
  - @graphcommerce/magento-product-grouped@3.0.9
  - @graphcommerce/magento-product-simple@4.0.9
  - @graphcommerce/magento-product-virtual@4.0.9

## 3.5.7

### Patch Changes

- Updated dependencies [[`4169b8c68`](https://github.com/graphcommerce-org/graphcommerce/commit/4169b8c686f682ff6e981b029f13abd87fd5f52a)]:
  - @graphcommerce/magento-customer-order@3.0.9
  - @graphcommerce/magento-customer@4.2.3
  - @graphcommerce/magento-customer-account@3.1.3
  - @graphcommerce/magento-cart@4.2.5
  - @graphcommerce/magento-cart-billing-address@3.0.8
  - @graphcommerce/magento-cart-checkout@3.0.8
  - @graphcommerce/magento-cart-email@3.0.8
  - @graphcommerce/magento-cart-items@3.0.9
  - @graphcommerce/magento-cart-shipping-address@3.0.8
  - @graphcommerce/magento-newsletter@2.0.8
  - @graphcommerce/magento-product-configurable@4.0.10
  - @graphcommerce/magento-review@3.1.4
  - @graphcommerce/magento-cart-coupon@3.0.10
  - @graphcommerce/magento-cart-payment-method@3.1.1
  - @graphcommerce/magento-cart-shipping-method@3.0.9
  - @graphcommerce/magento-payment-braintree@3.0.8
  - @graphcommerce/magento-payment-included@3.0.8
  - @graphcommerce/magento-product@4.1.6
  - @graphcommerce/magento-product-bundle@4.0.8
  - @graphcommerce/magento-product-downloadable@4.0.8
  - @graphcommerce/magento-product-grouped@3.0.8
  - @graphcommerce/magento-product-simple@4.0.8
  - @graphcommerce/magento-product-virtual@4.0.8
  - @graphcommerce/mollie-magento-payment@3.2.1
  - @graphcommerce/magento-category@4.0.9

## 3.5.6

### Patch Changes

- Updated dependencies [[`123d441ac`](https://github.com/graphcommerce-org/graphcommerce/commit/123d441acb74706d08e453abae4a6a8dad3130e0)]:
  - @graphcommerce/graphcms-ui@3.0.11

## 3.5.5

### Patch Changes

- [#1379](https://github.com/graphcommerce-org/graphcommerce/pull/1379) [`803b0082d`](https://github.com/graphcommerce-org/graphcommerce/commit/803b0082d720a7f17bebfde4cdf96cc63b91de4a) Thanks [@paales](https://github.com/paales)! - Input should have a focus color so it is clear which fields have errors when focused

* [#1379](https://github.com/graphcommerce-org/graphcommerce/pull/1379) [`b8d04130a`](https://github.com/graphcommerce-org/graphcommerce/commit/b8d04130a1b1cb8fc85308939235140288744465) Thanks [@paales](https://github.com/paales)! - Removed unused trigger: onChange for useForm handler

- [#1384](https://github.com/graphcommerce-org/graphcommerce/pull/1384) [`16659f251`](https://github.com/graphcommerce-org/graphcommerce/commit/16659f251f503c023892b76018733c3dacf49d34) Thanks [@carlocarels90](https://github.com/carlocarels90)! - use a correct translation

- Updated dependencies [[`3c801f45c`](https://github.com/graphcommerce-org/graphcommerce/commit/3c801f45c7df55131acf30ae2fe0d2344830d480), [`b8d04130a`](https://github.com/graphcommerce-org/graphcommerce/commit/b8d04130a1b1cb8fc85308939235140288744465), [`7c1b45348`](https://github.com/graphcommerce-org/graphcommerce/commit/7c1b45348bcf99a0dd16d2079893680c5cb6ffc9), [`3192fab82`](https://github.com/graphcommerce-org/graphcommerce/commit/3192fab82560e2211dfcacadc3b0b305260527d8), [`0e425e85e`](https://github.com/graphcommerce-org/graphcommerce/commit/0e425e85ee8fed280349317ee0440c7bceea5823), [`8a354d1cd`](https://github.com/graphcommerce-org/graphcommerce/commit/8a354d1cd4757497ddfc9b1969a0addbc8ff616b), [`6ebe9d12d`](https://github.com/graphcommerce-org/graphcommerce/commit/6ebe9d12db9fcaa2af67a475e64a08d63e232b46), [`9b3488c6a`](https://github.com/graphcommerce-org/graphcommerce/commit/9b3488c6a03cc09a647f43f6a8b36d96e97e5bb8)]:
  - @graphcommerce/next-ui@4.6.0
  - @graphcommerce/magento-cart@4.2.4
  - @graphcommerce/magento-cart-payment-method@3.1.0
  - @graphcommerce/magento-cart-shipping-method@3.0.8
  - @graphcommerce/magento-payment-included@3.0.7
  - @graphcommerce/mollie-magento-payment@3.2.0
  - @graphcommerce/magento-product-configurable@4.0.9
  - @graphcommerce/image@3.1.4
  - @graphcommerce/magento-product@4.1.5
  - @graphcommerce/ecommerce-ui@1.0.6
  - @graphcommerce/framer-scroller@2.1.5
  - @graphcommerce/graphcms-ui@3.0.10
  - @graphcommerce/magento-cart-billing-address@3.0.7
  - @graphcommerce/magento-cart-checkout@3.0.7
  - @graphcommerce/magento-cart-coupon@3.0.9
  - @graphcommerce/magento-cart-email@3.0.7
  - @graphcommerce/magento-cart-items@3.0.8
  - @graphcommerce/magento-cart-shipping-address@3.0.7
  - @graphcommerce/magento-category@4.0.8
  - @graphcommerce/magento-customer@4.2.2
  - @graphcommerce/magento-customer-account@3.1.2
  - @graphcommerce/magento-customer-order@3.0.8
  - @graphcommerce/magento-newsletter@2.0.7
  - @graphcommerce/magento-payment-braintree@3.0.7
  - @graphcommerce/magento-review@3.1.3
  - @graphcommerce/magento-search@4.1.5
  - @graphcommerce/magento-store@4.1.6
  - @graphcommerce/magento-product-bundle@4.0.7
  - @graphcommerce/magento-product-downloadable@4.0.7
  - @graphcommerce/magento-product-grouped@3.0.7
  - @graphcommerce/magento-product-simple@4.0.7
  - @graphcommerce/magento-product-virtual@4.0.7
  - @graphcommerce/magento-cms@4.0.7

## 3.5.4

### Patch Changes

- [#1378](https://github.com/graphcommerce-org/graphcommerce/pull/1378) [`b610a6e40`](https://github.com/graphcommerce-org/graphcommerce/commit/b610a6e4049e8c9e8b5d2aeff31b8e1bfc24abe5) Thanks [@paales](https://github.com/paales)! - Pin all versions internally so we can’t end up in an unfixable state for the user

* [#1378](https://github.com/graphcommerce-org/graphcommerce/pull/1378) [`22ff9df16`](https://github.com/graphcommerce-org/graphcommerce/commit/22ff9df1677742ae8e07d9b7e5b12fbb487580dc) Thanks [@paales](https://github.com/paales)! - upgrade to latest versions of packages

* Updated dependencies [[`b610a6e40`](https://github.com/graphcommerce-org/graphcommerce/commit/b610a6e4049e8c9e8b5d2aeff31b8e1bfc24abe5), [`22ff9df16`](https://github.com/graphcommerce-org/graphcommerce/commit/22ff9df1677742ae8e07d9b7e5b12fbb487580dc)]:
  - @graphcommerce/ecommerce-ui@1.0.5
  - @graphcommerce/framer-next-pages@3.1.5
  - @graphcommerce/framer-scroller@2.1.4
  - @graphcommerce/googleanalytics@2.0.6
  - @graphcommerce/googlerecaptcha@2.1.2
  - @graphcommerce/googletagmanager@2.0.6
  - @graphcommerce/graphcms-ui@3.0.9
  - @graphcommerce/graphql@3.0.7
  - @graphcommerce/image@3.1.3
  - @graphcommerce/lingui-next@2.1.5
  - @graphcommerce/magento-cart@4.2.3
  - @graphcommerce/magento-cart-billing-address@3.0.6
  - @graphcommerce/magento-cart-checkout@3.0.6
  - @graphcommerce/magento-cart-coupon@3.0.8
  - @graphcommerce/magento-cart-email@3.0.6
  - @graphcommerce/magento-cart-items@3.0.7
  - @graphcommerce/magento-cart-payment-method@3.0.7
  - @graphcommerce/magento-cart-shipping-address@3.0.6
  - @graphcommerce/magento-cart-shipping-method@3.0.7
  - @graphcommerce/magento-category@4.0.7
  - @graphcommerce/magento-cms@4.0.6
  - @graphcommerce/magento-customer@4.2.1
  - @graphcommerce/magento-customer-account@3.1.1
  - @graphcommerce/magento-customer-order@3.0.7
  - @graphcommerce/magento-graphql@3.0.6
  - @graphcommerce/magento-newsletter@2.0.6
  - @graphcommerce/magento-payment-braintree@3.0.6
  - @graphcommerce/magento-payment-included@3.0.6
  - @graphcommerce/magento-product@4.1.4
  - @graphcommerce/magento-product-bundle@4.0.6
  - @graphcommerce/magento-product-configurable@4.0.8
  - @graphcommerce/magento-product-downloadable@4.0.6
  - @graphcommerce/magento-product-grouped@3.0.6
  - @graphcommerce/magento-product-simple@4.0.6
  - @graphcommerce/magento-product-virtual@4.0.6
  - @graphcommerce/magento-review@3.1.2
  - @graphcommerce/magento-search@4.1.4
  - @graphcommerce/magento-store@4.1.5
  - @graphcommerce/mollie-magento-payment@3.1.1
  - @graphcommerce/next-ui@4.5.1
  - @graphcommerce/next-config@3.1.2
  - @graphcommerce/graphql-mesh@4.0.11

## 3.5.3

### Patch Changes

- [#1368](https://github.com/graphcommerce-org/graphcommerce/pull/1368) [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a) Thanks [@paales](https://github.com/paales)! - Minor layout fixes for the layout

* [#1369](https://github.com/graphcommerce-org/graphcommerce/pull/1369) [`ae6449502`](https://github.com/graphcommerce-org/graphcommerce/commit/ae64495024a455bbe5188588604368c1542840c9) Thanks [@paales](https://github.com/paales)! - Upgraded dependencies

* Updated dependencies [[`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`ae6449502`](https://github.com/graphcommerce-org/graphcommerce/commit/ae64495024a455bbe5188588604368c1542840c9), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`6213f0b0f`](https://github.com/graphcommerce-org/graphcommerce/commit/6213f0b0f5f53d622b993d9f7ea96cbbeb5bd670), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a)]:
  - @graphcommerce/graphql@3.0.6
  - @graphcommerce/next-ui@4.5.0
  - @graphcommerce/ecommerce-ui@1.0.4
  - @graphcommerce/framer-next-pages@3.1.4
  - @graphcommerce/framer-scroller@2.1.3
  - @graphcommerce/googlerecaptcha@2.1.1
  - @graphcommerce/googletagmanager@2.0.5
  - @graphcommerce/graphcms-ui@3.0.8
  - @graphcommerce/graphql-mesh@4.0.10
  - @graphcommerce/image@3.1.2
  - @graphcommerce/lingui-next@2.1.4
  - @graphcommerce/magento-cart@4.2.2
  - @graphcommerce/magento-cart-billing-address@3.0.5
  - @graphcommerce/magento-cart-checkout@3.0.5
  - @graphcommerce/magento-cart-coupon@3.0.7
  - @graphcommerce/magento-cart-email@3.0.5
  - @graphcommerce/magento-cart-items@3.0.6
  - @graphcommerce/magento-cart-payment-method@3.0.6
  - @graphcommerce/magento-cart-shipping-address@3.0.5
  - @graphcommerce/magento-cart-shipping-method@3.0.6
  - @graphcommerce/magento-category@4.0.6
  - @graphcommerce/magento-cms@4.0.5
  - @graphcommerce/magento-customer@4.2.0
  - @graphcommerce/magento-customer-account@3.1.0
  - @graphcommerce/magento-customer-order@3.0.6
  - @graphcommerce/magento-graphql@3.0.5
  - @graphcommerce/magento-newsletter@2.0.5
  - @graphcommerce/magento-payment-braintree@3.0.5
  - @graphcommerce/magento-payment-included@3.0.5
  - @graphcommerce/magento-product@4.1.3
  - @graphcommerce/magento-product-bundle@4.0.5
  - @graphcommerce/magento-product-configurable@4.0.7
  - @graphcommerce/magento-product-downloadable@4.0.5
  - @graphcommerce/magento-product-grouped@3.0.5
  - @graphcommerce/magento-product-simple@4.0.5
  - @graphcommerce/magento-product-virtual@4.0.5
  - @graphcommerce/magento-review@3.1.1
  - @graphcommerce/magento-search@4.1.3
  - @graphcommerce/magento-store@4.1.4
  - @graphcommerce/mollie-magento-payment@3.1.0
  - @graphcommerce/next-config@3.1.1

## 3.5.2

### Patch Changes

- [#1364](https://github.com/graphcommerce-org/graphcommerce/pull/1364) [`9b0233513`](https://github.com/graphcommerce-org/graphcommerce/commit/9b0233513e33b373d3b287c71fabe568a2111a3d) Thanks [@paales](https://github.com/paales)! - An anchor tag in a rich text field can have a openInNewTab prop

* [#1353](https://github.com/graphcommerce-org/graphcommerce/pull/1353) [`0e5ee7ba8`](https://github.com/graphcommerce-org/graphcommerce/commit/0e5ee7ba89698e5e711001e846ed182528060cba) Thanks [@paales](https://github.com/paales)! - Eslint: enable rules that were previously disabled and make fixes

* Updated dependencies [[`829b8690b`](https://github.com/graphcommerce-org/graphcommerce/commit/829b8690bc5d0a46e596299e4120e9837a9f179c), [`49a2d6617`](https://github.com/graphcommerce-org/graphcommerce/commit/49a2d661712e1787fba46c6195f7b559189e23d9), [`c9f7ac026`](https://github.com/graphcommerce-org/graphcommerce/commit/c9f7ac026b49047eca05be208b515f364e21571c), [`f67da3cfb`](https://github.com/graphcommerce-org/graphcommerce/commit/f67da3cfbe2dcf5ea23519d088c5aa0074029182), [`218766869`](https://github.com/graphcommerce-org/graphcommerce/commit/218766869f7468c067a590857c942f3819f8add4), [`0e5ee7ba8`](https://github.com/graphcommerce-org/graphcommerce/commit/0e5ee7ba89698e5e711001e846ed182528060cba), [`5fa60655c`](https://github.com/graphcommerce-org/graphcommerce/commit/5fa60655c85ff3b3debe663b94450cbff5c52520), [`829b8690b`](https://github.com/graphcommerce-org/graphcommerce/commit/829b8690bc5d0a46e596299e4120e9837a9f179c), [`829b8690b`](https://github.com/graphcommerce-org/graphcommerce/commit/829b8690bc5d0a46e596299e4120e9837a9f179c), [`829b8690b`](https://github.com/graphcommerce-org/graphcommerce/commit/829b8690bc5d0a46e596299e4120e9837a9f179c), [`59c71d6bf`](https://github.com/graphcommerce-org/graphcommerce/commit/59c71d6bf094ea27074b5d91efa79e1c9392445b)]:
  - @graphcommerce/framer-scroller@2.1.2
  - @graphcommerce/next-ui@4.4.0
  - @graphcommerce/framer-next-pages@3.1.3
  - @graphcommerce/graphcms-ui@3.0.7
  - @graphcommerce/magento-customer@4.1.6
  - @graphcommerce/magento-customer-account@3.0.6
  - @graphcommerce/magento-product@4.1.2
  - @graphcommerce/magento-search@4.1.2
  - @graphcommerce/mollie-magento-payment@3.0.6
  - @graphcommerce/magento-cart@4.2.1

## 3.5.1

### Patch Changes

- [#1348](https://github.com/graphcommerce-org/graphcommerce/pull/1348) [`3f454bf5b`](https://github.com/graphcommerce-org/graphcommerce/commit/3f454bf5ba6339ffebead0818fb9bdfeb40d6063) Thanks [@paales](https://github.com/paales)! - Make sure all versions are pinned so that we don’t accidently install mismatched versions

## 3.5.0

### Minor Changes

- [#1344](https://github.com/graphcommerce-org/graphcommerce/pull/1344) [`5ab19683c`](https://github.com/graphcommerce-org/graphcommerce/commit/5ab19683ca4e1ff78c21dbe09b73aeea43ef3b64) Thanks [@paales](https://github.com/paales)! - Added Google reCAPTCHA conditional loading to make it fully compatible, but load the reCAPTCHA only on pages with forms.

### Patch Changes

- [#1343](https://github.com/graphcommerce-org/graphcommerce/pull/1343) [`b76d0892a`](https://github.com/graphcommerce-org/graphcommerce/commit/b76d0892a11bd916aefd46ba72c2da00e38ce45b) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Canonicals could contain a double slash in the URL

- Updated dependencies [[`b76d0892a`](https://github.com/graphcommerce-org/graphcommerce/commit/b76d0892a11bd916aefd46ba72c2da00e38ce45b), [`5ab19683c`](https://github.com/graphcommerce-org/graphcommerce/commit/5ab19683ca4e1ff78c21dbe09b73aeea43ef3b64), [`eee3c867d`](https://github.com/graphcommerce-org/graphcommerce/commit/eee3c867d0c56401b4290862917a2e34cea92ffe)]:
  - @graphcommerce/next-ui@4.3.2
  - @graphcommerce/googlerecaptcha@2.1.0
  - @graphcommerce/magento-cart-coupon@3.0.6

## 3.4.3

### Patch Changes

- [#1341](https://github.com/graphcommerce-org/graphcommerce/pull/1341) [`2e29c5852`](https://github.com/graphcommerce-org/graphcommerce/commit/2e29c585247d356e3027be92beb7815f2070c855) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

- Updated dependencies [[`47a03c6c7`](https://github.com/graphcommerce-org/graphcommerce/commit/47a03c6c764cb1f544d3de3af52456608694a9d7), [`2e29c5852`](https://github.com/graphcommerce-org/graphcommerce/commit/2e29c585247d356e3027be92beb7815f2070c855)]:
  - @graphcommerce/next-config@3.1.0
  - @graphcommerce/googleanalytics@2.0.5
  - @graphcommerce/googlerecaptcha@2.0.5
  - @graphcommerce/graphql@3.0.5
  - @graphcommerce/graphql-mesh@4.0.9

## 3.4.2

### Patch Changes

- [#1328](https://github.com/graphcommerce-org/graphcommerce/pull/1328) [`f44443619`](https://github.com/graphcommerce-org/graphcommerce/commit/f44443619eda9eba8f16beb6ffb462d6511fbfb2) Thanks [@paales](https://github.com/paales)! - Another shot at fixing the graphql-mesh version

- Updated dependencies [[`f44443619`](https://github.com/graphcommerce-org/graphcommerce/commit/f44443619eda9eba8f16beb6ffb462d6511fbfb2)]:
  - @graphcommerce/graphql-mesh@4.0.8

## 3.4.1

### Patch Changes

- [#1326](https://github.com/graphcommerce-org/graphcommerce/pull/1326) [`df0b3e7d5`](https://github.com/graphcommerce-org/graphcommerce/commit/df0b3e7d5f5fee963731a999cb3a8891580cb6fe) Thanks [@paales](https://github.com/paales)! - Latest version of GraphQL Mesh is broken, reverting to older version

- Updated dependencies [[`df0b3e7d5`](https://github.com/graphcommerce-org/graphcommerce/commit/df0b3e7d5f5fee963731a999cb3a8891580cb6fe)]:
  - @graphcommerce/graphql-mesh@4.0.7
  - @graphcommerce/next-ui@4.3.1

## 3.4.0

### Minor Changes

- [#1322](https://github.com/graphcommerce-org/graphcommerce/pull/1322) [`0298a0de1`](https://github.com/graphcommerce-org/graphcommerce/commit/0298a0de1d13e543c4124a6a099297b4e27e2b05) Thanks [@paales](https://github.com/paales)! - Added `<Slider size='large' />` and made styling with variants

### Patch Changes

- [#1322](https://github.com/graphcommerce-org/graphcommerce/pull/1322) [`815132ea4`](https://github.com/graphcommerce-org/graphcommerce/commit/815132ea43937b4b84b59ec9974ac593cb4eb456) Thanks [@paales](https://github.com/paales)! - Make sure canonicals don’t report about double slashes and add warning when incorrect URL is passed

* [#1322](https://github.com/graphcommerce-org/graphcommerce/pull/1322) [`ae7385b94`](https://github.com/graphcommerce-org/graphcommerce/commit/ae7385b943e591fcd6fe9e5747f22e03a73e481a) Thanks [@paales](https://github.com/paales)! - RichText component’s first and last element should have no marginTop and marginBottom respectively unless withMargin is specified

- [#1324](https://github.com/graphcommerce-org/graphcommerce/pull/1324) [`73d07c6bb`](https://github.com/graphcommerce-org/graphcommerce/commit/73d07c6bbf630a92e44a2b2baf14200eb6900db5) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Update docs, add new graphcms media url

* [#1322](https://github.com/graphcommerce-org/graphcommerce/pull/1322) [`e4ded94d7`](https://github.com/graphcommerce-org/graphcommerce/commit/e4ded94d7b0f0c87f86abcd31340d75533bde73e) Thanks [@paales](https://github.com/paales)! - Added a fontSize property to the ProductPageDescription to change the fontSize for the rendered paragraph

* Updated dependencies [[`5266388ea`](https://github.com/graphcommerce-org/graphcommerce/commit/5266388eaffda41592623ef7a3ddbbe03c8e0dad), [`9b35403d9`](https://github.com/graphcommerce-org/graphcommerce/commit/9b35403d9dbb2606ac7cf3bb641a0f9cc3d8a2ba), [`0298a0de1`](https://github.com/graphcommerce-org/graphcommerce/commit/0298a0de1d13e543c4124a6a099297b4e27e2b05), [`815132ea4`](https://github.com/graphcommerce-org/graphcommerce/commit/815132ea43937b4b84b59ec9974ac593cb4eb456), [`3326742a0`](https://github.com/graphcommerce-org/graphcommerce/commit/3326742a0dceb45f0cac4741ca09dc4d4f09ad90), [`7a3799bfc`](https://github.com/graphcommerce-org/graphcommerce/commit/7a3799bfc107f26aa9991a91db5f228e3476f4aa), [`6f9d23688`](https://github.com/graphcommerce-org/graphcommerce/commit/6f9d23688ea26c74a41623c7f62597d33281d7c1), [`9a77f88ed`](https://github.com/graphcommerce-org/graphcommerce/commit/9a77f88ed26cbecdae9a135c3cb234a5b7ecf4df), [`1e2a07141`](https://github.com/graphcommerce-org/graphcommerce/commit/1e2a071414154600430e6dcf0513d86ab78e0b28), [`bc8826b9d`](https://github.com/graphcommerce-org/graphcommerce/commit/bc8826b9dc1e6418b2720c9211e46791c33fca8a), [`0eeaad304`](https://github.com/graphcommerce-org/graphcommerce/commit/0eeaad30461b1d5b486438f0287fa76d49429044), [`ae7385b94`](https://github.com/graphcommerce-org/graphcommerce/commit/ae7385b943e591fcd6fe9e5747f22e03a73e481a), [`bc5213547`](https://github.com/graphcommerce-org/graphcommerce/commit/bc52135471479c83d989449dad24798112e898f4), [`3f1912f55`](https://github.com/graphcommerce-org/graphcommerce/commit/3f1912f553318d5888f8af2b841918ef4ae96a84), [`7e910f3b8`](https://github.com/graphcommerce-org/graphcommerce/commit/7e910f3b8eb73cff33261956937124f95520d8e5), [`3b4d46de2`](https://github.com/graphcommerce-org/graphcommerce/commit/3b4d46de2555db9eed733c8fac574bc809d75da4), [`d91359871`](https://github.com/graphcommerce-org/graphcommerce/commit/d91359871b023a9f0d305b37353c1ee2d0912248), [`b6c68cda8`](https://github.com/graphcommerce-org/graphcommerce/commit/b6c68cda8836a1d0c78ef351899cec9ec1037385), [`ffb3dfa75`](https://github.com/graphcommerce-org/graphcommerce/commit/ffb3dfa752bd2304f92caaf253ffe685d7652a9e), [`e4ded94d7`](https://github.com/graphcommerce-org/graphcommerce/commit/e4ded94d7b0f0c87f86abcd31340d75533bde73e), [`a26db0656`](https://github.com/graphcommerce-org/graphcommerce/commit/a26db0656e371f2bad4901aefa14507840e3d4cd)]:
  - @graphcommerce/next-ui@4.3.0
  - @graphcommerce/magento-product@4.1.0
  - @graphcommerce/magento-review@3.1.0
  - @graphcommerce/magento-category@4.0.5
  - @graphcommerce/magento-store@4.1.3
  - @graphcommerce/magento-cart@4.2.0
  - @graphcommerce/framer-scroller@2.1.0
  - @graphcommerce/graphcms-ui@3.0.6
  - @graphcommerce/magento-customer@4.1.5

## 3.3.5

### Patch Changes

- [#1316](https://github.com/graphcommerce-org/graphcommerce/pull/1316) [`6a8c84fb9`](https://github.com/graphcommerce-org/graphcommerce/commit/6a8c84fb910b9e23cdb08825b87c238510484f4a) Thanks [@paales](https://github.com/paales)! - Renamed all repository references to the [new repository](https://github.com/graphcommerce-org/graphcommerce).

* [#1314](https://github.com/graphcommerce-org/graphcommerce/pull/1314) [`6474d1215`](https://github.com/graphcommerce-org/graphcommerce/commit/6474d1215f6cbd2e227bdc0304893522797003ec) Thanks [@paales](https://github.com/paales)! - sometimes after an upgrade .gql.ts files were still present causing typescript errors and making the editor slow

## 3.3.4

### Patch Changes

- [#1312](https://github.com/ho-nl/m2-pwa/pull/1312) [`45f6351c2`](https://github.com/ho-nl/m2-pwa/commit/45f6351c2e19806205d98429d301f477221a04ca) Thanks [@paales](https://github.com/paales)! - Now graphql-codegen always uses the generated graphql-mesh even when in development mode.

* [#1312](https://github.com/ho-nl/m2-pwa/pull/1312) [`4e1fd4d9f`](https://github.com/ho-nl/m2-pwa/commit/4e1fd4d9fda2109de378be7e39382f7014a7ab54) Thanks [@paales](https://github.com/paales)! - upgraded dependencies

* Updated dependencies [[`4e1fd4d9f`](https://github.com/ho-nl/m2-pwa/commit/4e1fd4d9fda2109de378be7e39382f7014a7ab54)]:
  - @graphcommerce/graphql-mesh@4.0.6
  - @graphcommerce/next-ui@4.2.5

## 3.3.3

### Patch Changes

- [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef) Thanks [@paales](https://github.com/paales)! - Upgrade required for `./.meshrc.yml`:

  Replace `'{env.MAGENTO_ENDPOINT}'` and other `'{env.SOMETHING}'` with `${MAGENTO_ENDPOINT}` and other `${SOMETHING}`. See the [.meshrc.yml in the examples directory](https://github.com/ho-nl/m2-pwa/blob/master/examples/magento-graphcms/.meshrc.yml) for the result.

* [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

* Updated dependencies [[`3d63b39f7`](https://github.com/ho-nl/m2-pwa/commit/3d63b39f7e330d1827a32dba782667d7b21adaba), [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655), [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef)]:
  - @graphcommerce/next-ui@4.2.4
  - @graphcommerce/ecommerce-ui@1.0.3
  - @graphcommerce/framer-next-pages@3.1.2
  - @graphcommerce/googleanalytics@2.0.4
  - @graphcommerce/googlerecaptcha@2.0.4
  - @graphcommerce/googletagmanager@2.0.4
  - @graphcommerce/graphcms-ui@3.0.5
  - @graphcommerce/graphql@3.0.4
  - @graphcommerce/graphql-mesh@4.0.5
  - @graphcommerce/image@3.1.1
  - @graphcommerce/lingui-next@2.1.2
  - @graphcommerce/magento-cart@4.1.4
  - @graphcommerce/magento-cart-billing-address@3.0.4
  - @graphcommerce/magento-cart-checkout@3.0.4
  - @graphcommerce/magento-cart-coupon@3.0.5
  - @graphcommerce/magento-cart-email@3.0.4
  - @graphcommerce/magento-cart-items@3.0.5
  - @graphcommerce/magento-cart-payment-method@3.0.5
  - @graphcommerce/magento-cart-shipping-address@3.0.4
  - @graphcommerce/magento-cart-shipping-method@3.0.5
  - @graphcommerce/magento-category@4.0.4
  - @graphcommerce/magento-cms@4.0.4
  - @graphcommerce/magento-customer@4.1.4
  - @graphcommerce/magento-customer-account@3.0.5
  - @graphcommerce/magento-customer-order@3.0.5
  - @graphcommerce/magento-graphql@3.0.4
  - @graphcommerce/magento-newsletter@2.0.4
  - @graphcommerce/magento-payment-braintree@3.0.4
  - @graphcommerce/magento-payment-included@3.0.4
  - @graphcommerce/magento-product@4.0.6
  - @graphcommerce/magento-product-bundle@4.0.4
  - @graphcommerce/magento-product-configurable@4.0.6
  - @graphcommerce/magento-product-downloadable@4.0.4
  - @graphcommerce/magento-product-grouped@3.0.4
  - @graphcommerce/magento-product-simple@4.0.4
  - @graphcommerce/magento-product-virtual@4.0.4
  - @graphcommerce/magento-review@3.0.6
  - @graphcommerce/magento-search@4.1.1
  - @graphcommerce/magento-store@4.1.2
  - @graphcommerce/mollie-magento-payment@3.0.5
  - @graphcommerce/next-config@3.0.4

## 3.3.2

### Patch Changes

- [#1296](https://github.com/ho-nl/m2-pwa/pull/1296) [`8473123fa`](https://github.com/ho-nl/m2-pwa/commit/8473123fa7d3f3eb1d282d9b4205c803a88010ea) Thanks [@paales](https://github.com/paales)! - implement handling for canonical URLs based on NEXT_PUBLIC_SITE_URL

- Updated dependencies [[`a9cff2ce6`](https://github.com/ho-nl/m2-pwa/commit/a9cff2ce63fce5b86e9fd6bf63c10c782326d50e), [`8473123fa`](https://github.com/ho-nl/m2-pwa/commit/8473123fa7d3f3eb1d282d9b4205c803a88010ea), [`50e205c51`](https://github.com/ho-nl/m2-pwa/commit/50e205c51f4d0d67d41d22fd70e8ed9a0996489e)]:
  - @graphcommerce/next-ui@4.2.2
  - @graphcommerce/magento-store@4.1.1

## 3.3.1

### Patch Changes

- [#1292](https://github.com/ho-nl/m2-pwa/pull/1292) [`5a1ba9e66`](https://github.com/ho-nl/m2-pwa/commit/5a1ba9e664abbac89c4f5f71f7d6d6ed1aefa5c0) Thanks [@paales](https://github.com/paales)! - Renamed SvgIcon to IconSvg to prevent collisions with MUI

* [#1292](https://github.com/ho-nl/m2-pwa/pull/1292) [`63f9b56eb`](https://github.com/ho-nl/m2-pwa/commit/63f9b56eb68ba790567ff1427e599fd2c3c8f1ee) Thanks [@paales](https://github.com/paales)! - added responsive size to the Fab component

* Updated dependencies [[`5a1ba9e66`](https://github.com/ho-nl/m2-pwa/commit/5a1ba9e664abbac89c4f5f71f7d6d6ed1aefa5c0), [`990df655b`](https://github.com/ho-nl/m2-pwa/commit/990df655b73b469718d6cb5837ee65dfe2ad6a1d), [`63f9b56eb`](https://github.com/ho-nl/m2-pwa/commit/63f9b56eb68ba790567ff1427e599fd2c3c8f1ee)]:
  - @graphcommerce/ecommerce-ui@1.0.2
  - @graphcommerce/magento-cart@4.1.3
  - @graphcommerce/magento-cart-coupon@3.0.4
  - @graphcommerce/magento-cart-items@3.0.4
  - @graphcommerce/magento-cart-payment-method@3.0.4
  - @graphcommerce/magento-cart-shipping-method@3.0.4
  - @graphcommerce/magento-customer@4.1.3
  - @graphcommerce/magento-customer-account@3.0.4
  - @graphcommerce/magento-customer-order@3.0.4
  - @graphcommerce/magento-product@4.0.5
  - @graphcommerce/magento-product-configurable@4.0.5
  - @graphcommerce/magento-review@3.0.5
  - @graphcommerce/magento-search@4.1.0
  - @graphcommerce/mollie-magento-payment@3.0.4
  - @graphcommerce/next-ui@4.2.0

## 3.3.0

### Minor Changes

- [#1285](https://github.com/ho-nl/m2-pwa/pull/1285) [`c8d5c4c20`](https://github.com/ho-nl/m2-pwa/commit/c8d5c4c20d6d4cc29b47a2e768fb517ad0c4cb26) Thanks [@paales](https://github.com/paales)! - Added Italian locale 🍕🍝🇮🇹

### Patch Changes

- [#1285](https://github.com/ho-nl/m2-pwa/pull/1285) [`c85294ba6`](https://github.com/ho-nl/m2-pwa/commit/c85294ba6d742ce78c074559a1e95409b25a5017) Thanks [@paales](https://github.com/paales)! - upgraded dependencies

* [#1285](https://github.com/ho-nl/m2-pwa/pull/1285) [`8922b8792`](https://github.com/ho-nl/m2-pwa/commit/8922b879210e0c8bd86beccff3a168e69e6aaea4) Thanks [@paales](https://github.com/paales)! - Updated locales with new translations

* Updated dependencies [[`ed9703b06`](https://github.com/ho-nl/m2-pwa/commit/ed9703b062d23ee01b1605ff9917c0ac3247fc25), [`c85294ba6`](https://github.com/ho-nl/m2-pwa/commit/c85294ba6d742ce78c074559a1e95409b25a5017), [`27368edbd`](https://github.com/ho-nl/m2-pwa/commit/27368edbdb0543658bf925cfa33b61de0e6dda38), [`d9cd4acca`](https://github.com/ho-nl/m2-pwa/commit/d9cd4acca218018dd6e20f033875ef93919fb462)]:
  - @graphcommerce/magento-store@4.1.0
  - @graphcommerce/graphql-mesh@4.0.4
  - @graphcommerce/magento-product@4.0.4
  - @graphcommerce/magento-product-configurable@4.0.4
  - @graphcommerce/magento-review@3.0.4
  - @graphcommerce/next-ui@4.1.3
  - @graphcommerce/graphcms-ui@3.0.4

## 3.2.1

### Patch Changes

- [#1278](https://github.com/ho-nl/m2-pwa/pull/1278) [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Written documentation for GraphCommerce! 👩‍🏫🧑‍🏫📚📖

* [#1280](https://github.com/ho-nl/m2-pwa/pull/1280) [`bdd460c6f`](https://github.com/ho-nl/m2-pwa/commit/bdd460c6f09af148a96c55324012b8f53c3618f1) Thanks [@paales](https://github.com/paales)! - Review forms now work by using the url_key of a product instead of the SKU. Some backends do not support filtering by sku

- [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96) Thanks [@paales](https://github.com/paales)! - made packages public

* [#1278](https://github.com/ho-nl/m2-pwa/pull/1278) [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Upgraded dependencies to the latest version

* Updated dependencies [[`4bb963d75`](https://github.com/ho-nl/m2-pwa/commit/4bb963d7595b5ce6e3a4924cc2e3e8b0210cdcd6), [`bdd460c6f`](https://github.com/ho-nl/m2-pwa/commit/bdd460c6f09af148a96c55324012b8f53c3618f1), [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96), [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20), [`3a719c88c`](https://github.com/ho-nl/m2-pwa/commit/3a719c88cad1eab58602de28c41adc0fc4827e1d), [`5ffcb56bf`](https://github.com/ho-nl/m2-pwa/commit/5ffcb56bfcbe49ebeaf24f9341e819a145ab9a14)]:
  - @graphcommerce/framer-next-pages@3.1.0
  - @graphcommerce/magento-review@3.0.3
  - @graphcommerce/ecommerce-ui@1.0.1
  - @graphcommerce/googleanalytics@2.0.3
  - @graphcommerce/googlerecaptcha@2.0.3
  - @graphcommerce/googletagmanager@2.0.3
  - @graphcommerce/graphcms-ui@3.0.3
  - @graphcommerce/graphql@3.0.3
  - @graphcommerce/graphql-mesh@4.0.3
  - @graphcommerce/image@3.1.0
  - @graphcommerce/lingui-next@2.1.1
  - @graphcommerce/magento-cart@4.1.2
  - @graphcommerce/magento-cart-billing-address@3.0.3
  - @graphcommerce/magento-cart-checkout@3.0.3
  - @graphcommerce/magento-cart-coupon@3.0.3
  - @graphcommerce/magento-cart-email@3.0.3
  - @graphcommerce/magento-cart-items@3.0.3
  - @graphcommerce/magento-cart-payment-method@3.0.3
  - @graphcommerce/magento-cart-shipping-address@3.0.3
  - @graphcommerce/magento-cart-shipping-method@3.0.3
  - @graphcommerce/magento-category@4.0.3
  - @graphcommerce/magento-cms@4.0.3
  - @graphcommerce/magento-customer@4.1.2
  - @graphcommerce/magento-customer-account@3.0.3
  - @graphcommerce/magento-customer-order@3.0.3
  - @graphcommerce/magento-graphql@3.0.3
  - @graphcommerce/magento-newsletter@2.0.3
  - @graphcommerce/magento-payment-braintree@3.0.3
  - @graphcommerce/magento-payment-included@3.0.3
  - @graphcommerce/magento-product@4.0.3
  - @graphcommerce/magento-product-bundle@4.0.3
  - @graphcommerce/magento-product-configurable@4.0.3
  - @graphcommerce/magento-product-downloadable@4.0.3
  - @graphcommerce/magento-product-grouped@3.0.3
  - @graphcommerce/magento-product-simple@4.0.3
  - @graphcommerce/magento-product-virtual@4.0.3
  - @graphcommerce/magento-search@4.0.3
  - @graphcommerce/magento-store@4.0.3
  - @graphcommerce/mollie-magento-payment@3.0.3
  - @graphcommerce/next-ui@4.1.2

## 3.2.0

### Minor Changes

- [#1274](https://github.com/ho-nl/m2-pwa/pull/1274) [`d8bc94f26`](https://github.com/ho-nl/m2-pwa/commit/d8bc94f269c7f5194b68093eb2ed0997b088871b) Thanks [@paales](https://github.com/paales)! - Added french 🇫🇷🥖 and german 🇩🇪🍻 languages

* [#1274](https://github.com/ho-nl/m2-pwa/pull/1274) [`43a6a76f9`](https://github.com/ho-nl/m2-pwa/commit/43a6a76f9fcb966fa87c4a991bec40a54a6c8265) Thanks [@paales](https://github.com/paales)! - Added spanish 🇪🇸 translation

### Patch Changes

- [#1274](https://github.com/ho-nl/m2-pwa/pull/1274) [`381e4c86a`](https://github.com/ho-nl/m2-pwa/commit/381e4c86a8321ce96e1fa5c7d3c0a0c0ff3e02c7) Thanks [@paales](https://github.com/paales)! - Moved `ApolloErrorAlert`, `ApolloErrorFullPage` and `ApolloErrorSnackbar` to the ecommerce-ui package.

  Created `ComposedSubmitButton` and `ComposedSubmitLinkOrButton` to reduce complexity from `magento-graphcms` example.

  Removed dependency an `@graphcommerce/react-hook-form` from `magento-graphcms` example.

  Added dependency `@graphcommerce/ecommerce-ui` from `magento-graphcms` example.

* [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2) Thanks [@paales](https://github.com/paales)! - We've moved lots of internal packages from `dependencies` to `peerDependencies`. The result of this is that there will be significantly less duplicate packages in the node_modules folders.

- [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d) Thanks [@paales](https://github.com/paales)! - Upgraded to [NextJS 12.1](https://nextjs.org/blog/next-12-1)! This is just for compatibility, but we'll be implementing [On-demand Incremental Static Regeneration](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta) soon.

  This will greatly reduce the requirement to rebuid stuff and we'll add a management UI on the frontend to be able to revalidate pages manually.

- Updated dependencies [[`381e4c86a`](https://github.com/ho-nl/m2-pwa/commit/381e4c86a8321ce96e1fa5c7d3c0a0c0ff3e02c7), [`351347afe`](https://github.com/ho-nl/m2-pwa/commit/351347afeae5bd837408d46c7593bcf5473dc621), [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2), [`e7c8e2756`](https://github.com/ho-nl/m2-pwa/commit/e7c8e2756d637cbcd2e793d62ef5721d35d9fa7b), [`b08a8eb1d`](https://github.com/ho-nl/m2-pwa/commit/b08a8eb1d024b9d3e7712ef034029151670db275), [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d), [`5a4809b1a`](https://github.com/ho-nl/m2-pwa/commit/5a4809b1a705aa32f620f520085df48ee25f9949)]:
  - @graphcommerce/ecommerce-ui@1.0.0
  - @graphcommerce/framer-next-pages@3.0.2
  - @graphcommerce/magento-cart@4.1.1
  - @graphcommerce/magento-cart-payment-method@3.0.2
  - @graphcommerce/magento-customer@4.1.1
  - @graphcommerce/next-ui@4.1.1
  - @graphcommerce/googleanalytics@2.0.2
  - @graphcommerce/googlerecaptcha@2.0.2
  - @graphcommerce/googletagmanager@2.0.2
  - @graphcommerce/graphcms-ui@3.0.2
  - @graphcommerce/graphql@3.0.2
  - @graphcommerce/graphql-mesh@4.0.2
  - @graphcommerce/image@3.0.2
  - @graphcommerce/lingui-next@2.1.0
  - @graphcommerce/magento-cart-billing-address@3.0.2
  - @graphcommerce/magento-cart-checkout@3.0.2
  - @graphcommerce/magento-cart-coupon@3.0.2
  - @graphcommerce/magento-cart-email@3.0.2
  - @graphcommerce/magento-cart-items@3.0.2
  - @graphcommerce/magento-cart-shipping-address@3.0.2
  - @graphcommerce/magento-cart-shipping-method@3.0.2
  - @graphcommerce/magento-category@4.0.2
  - @graphcommerce/magento-cms@4.0.2
  - @graphcommerce/magento-customer-account@3.0.2
  - @graphcommerce/magento-customer-order@3.0.2
  - @graphcommerce/magento-graphql@3.0.2
  - @graphcommerce/magento-newsletter@2.0.2
  - @graphcommerce/magento-payment-braintree@3.0.2
  - @graphcommerce/magento-payment-included@3.0.2
  - @graphcommerce/magento-product@4.0.2
  - @graphcommerce/magento-product-bundle@4.0.2
  - @graphcommerce/magento-product-configurable@4.0.2
  - @graphcommerce/magento-product-downloadable@4.0.2
  - @graphcommerce/magento-product-grouped@3.0.2
  - @graphcommerce/magento-product-simple@4.0.2
  - @graphcommerce/magento-product-virtual@4.0.2
  - @graphcommerce/magento-review@3.0.2
  - @graphcommerce/magento-search@4.0.2
  - @graphcommerce/magento-store@4.0.2
  - @graphcommerce/mollie-magento-payment@3.0.2

## 3.1.0

### Minor Changes

- [#1273](https://github.com/ho-nl/m2-pwa/pull/1273) [`8c4e4f7cd`](https://github.com/ho-nl/m2-pwa/commit/8c4e4f7cdd2fa4252788fbc9889d0803bba20eef) Thanks [@paales](https://github.com/paales)! - Added darkmode support! ☀️🌑, adds a toggle to the hamburger menu.

### Patch Changes

- [#1273](https://github.com/ho-nl/m2-pwa/pull/1273) [`448363d9e`](https://github.com/ho-nl/m2-pwa/commit/448363d9ecfac5b9093ef8d15a843c6d00640f93) Thanks [@paales](https://github.com/paales)! - Footer should have inverted icons when in darkmode

* [#1271](https://github.com/ho-nl/m2-pwa/pull/1271) [`4a2b3ba38`](https://github.com/ho-nl/m2-pwa/commit/4a2b3ba380208214705547dd516a0dd0e7061f31) Thanks [@paales](https://github.com/paales)! - make sure the /graphql generates code as well

- [#1271](https://github.com/ho-nl/m2-pwa/pull/1271) [`574961134`](https://github.com/ho-nl/m2-pwa/commit/574961134b1e32b4a4ec1c55fa4810cda37a8489) Thanks [@paales](https://github.com/paales)! - add prettier as de the default code formatter for vscode

- Updated dependencies [[`e0008d60d`](https://github.com/ho-nl/m2-pwa/commit/e0008d60d712603219129dd411d1985bf1ebbed1), [`5d9f8320f`](https://github.com/ho-nl/m2-pwa/commit/5d9f8320ff9621d7357fbe01319ab0cafdf9095d), [`8c4e4f7cd`](https://github.com/ho-nl/m2-pwa/commit/8c4e4f7cdd2fa4252788fbc9889d0803bba20eef), [`5082b8c81`](https://github.com/ho-nl/m2-pwa/commit/5082b8c8191cc3e0b4627678bf837af093513d57)]:
  - @graphcommerce/magento-cart@4.1.0
  - @graphcommerce/next-ui@4.1.0
  - @graphcommerce/magento-customer@4.1.0

## 3.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514) Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files, so that the packages link to back to the website and repository
- Updated dependencies [[`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514)]:
  - @graphcommerce/framer-next-pages@3.0.1
  - @graphcommerce/googleanalytics@2.0.1
  - @graphcommerce/googlerecaptcha@2.0.1
  - @graphcommerce/googletagmanager@2.0.1
  - @graphcommerce/graphcms-ui@3.0.1
  - @graphcommerce/graphql@3.0.1
  - @graphcommerce/graphql-mesh@4.0.1
  - @graphcommerce/image@3.0.1
  - @graphcommerce/lingui-next@2.0.1
  - @graphcommerce/magento-cart@4.0.1
  - @graphcommerce/magento-cart-billing-address@3.0.1
  - @graphcommerce/magento-cart-checkout@3.0.1
  - @graphcommerce/magento-cart-coupon@3.0.1
  - @graphcommerce/magento-cart-email@3.0.1
  - @graphcommerce/magento-cart-items@3.0.1
  - @graphcommerce/magento-cart-payment-method@3.0.1
  - @graphcommerce/magento-cart-shipping-address@3.0.1
  - @graphcommerce/magento-cart-shipping-method@3.0.1
  - @graphcommerce/magento-category@4.0.1
  - @graphcommerce/magento-cms@4.0.1
  - @graphcommerce/magento-customer@4.0.1
  - @graphcommerce/magento-customer-account@3.0.1
  - @graphcommerce/magento-customer-order@3.0.1
  - @graphcommerce/magento-graphql@3.0.1
  - @graphcommerce/magento-newsletter@2.0.1
  - @graphcommerce/magento-payment-braintree@3.0.1
  - @graphcommerce/magento-payment-included@3.0.1
  - @graphcommerce/magento-product@4.0.1
  - @graphcommerce/magento-product-bundle@4.0.1
  - @graphcommerce/magento-product-configurable@4.0.1
  - @graphcommerce/magento-product-downloadable@4.0.1
  - @graphcommerce/magento-product-grouped@3.0.1
  - @graphcommerce/magento-product-simple@4.0.1
  - @graphcommerce/magento-product-virtual@4.0.1
  - @graphcommerce/magento-review@3.0.1
  - @graphcommerce/magento-search@4.0.1
  - @graphcommerce/magento-store@4.0.1
  - @graphcommerce/mollie-magento-payment@3.0.1
  - @graphcommerce/next-ui@4.0.1
  - @graphcommerce/react-hook-form@3.0.1
  - @graphcommerce/eslint-config-pwa@4.0.1
  - @graphcommerce/next-config@3.0.1
  - @graphcommerce/prettier-config-pwa@4.0.1
  - @graphcommerce/typescript-config-pwa@4.0.1

## 3.0.0

### Major Changes

- [#1258](https://github.com/ho-nl/m2-pwa/pull/1258) [`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05) Thanks [@paales](https://github.com/paales)! - Upgraded to Material UI 5

### Patch Changes

- Updated dependencies [[`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05)]:
  - @graphcommerce/framer-next-pages@3.0.0
  - @graphcommerce/googleanalytics@2.0.0
  - @graphcommerce/googlerecaptcha@2.0.0
  - @graphcommerce/googletagmanager@2.0.0
  - @graphcommerce/graphcms-ui@3.0.0
  - @graphcommerce/graphql@3.0.0
  - @graphcommerce/graphql-mesh@4.0.0
  - @graphcommerce/image@3.0.0
  - @graphcommerce/lingui-next@2.0.0
  - @graphcommerce/magento-cart@4.0.0
  - @graphcommerce/magento-cart-billing-address@3.0.0
  - @graphcommerce/magento-cart-checkout@3.0.0
  - @graphcommerce/magento-cart-coupon@3.0.0
  - @graphcommerce/magento-cart-email@3.0.0
  - @graphcommerce/magento-cart-items@3.0.0
  - @graphcommerce/magento-cart-payment-method@3.0.0
  - @graphcommerce/magento-cart-shipping-address@3.0.0
  - @graphcommerce/magento-cart-shipping-method@3.0.0
  - @graphcommerce/magento-category@4.0.0
  - @graphcommerce/magento-cms@4.0.0
  - @graphcommerce/magento-customer@4.0.0
  - @graphcommerce/magento-customer-account@3.0.0
  - @graphcommerce/magento-customer-order@3.0.0
  - @graphcommerce/magento-graphql@3.0.0
  - @graphcommerce/magento-newsletter@2.0.0
  - @graphcommerce/magento-payment-braintree@3.0.0
  - @graphcommerce/magento-payment-included@3.0.0
  - @graphcommerce/magento-product@4.0.0
  - @graphcommerce/magento-product-bundle@4.0.0
  - @graphcommerce/magento-product-configurable@4.0.0
  - @graphcommerce/magento-product-downloadable@4.0.0
  - @graphcommerce/magento-product-grouped@3.0.0
  - @graphcommerce/magento-product-simple@4.0.0
  - @graphcommerce/magento-product-virtual@4.0.0
  - @graphcommerce/magento-review@3.0.0
  - @graphcommerce/magento-search@4.0.0
  - @graphcommerce/magento-store@4.0.0
  - @graphcommerce/mollie-magento-payment@3.0.0
  - @graphcommerce/next-ui@4.0.0
  - @graphcommerce/react-hook-form@3.0.0
  - @graphcommerce/eslint-config-pwa@4.0.0
  - @graphcommerce/next-config@3.0.0
  - @graphcommerce/typescript-config-pwa@4.0.0
  - @graphcommerce/prettier-config-pwa@4.0.0

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.145.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.145.1...@graphcommerce/magento-graphcms@2.145.2) (2022-02-11)

### Bug Fixes

- Import of RowColumnOneFragement fixed. ([a3e0956](https://github.com/ho-nl/m2-pwa/commit/a3e09569b8e9cecec1d0d4fa6d63cff279583670))
- removal of non existing prop. ([8802ab2](https://github.com/ho-nl/m2-pwa/commit/8802ab2f4c9b5463629bcf78875d2f181b8559a1))
- Removal of UseRichTextStyles passed as prop. This is already handled in de <RichText /> component. ([3803dd8](https://github.com/ho-nl/m2-pwa/commit/3803dd88c5f29be57030026547b2948188551bdb))
- Removal of UseRichTextStyles passed as prop. This is already handled in de <RichText /> component. ([ae2681b](https://github.com/ho-nl/m2-pwa/commit/ae2681bf95dcc640933b2d872626236cd7b25ceb))

# [2.145.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.144.9...@graphcommerce/magento-graphcms@2.145.0) (2022-02-07)

### Features

- get cms pages from graphcms instead of Magento ([cd32634](https://github.com/ho-nl/m2-pwa/commit/cd32634e24b7d4b514c7e6df9a5301a39b700d6c))

## [2.144.6](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.144.5...@graphcommerce/magento-graphcms@2.144.6) (2022-01-21)

### Bug Fixes

- prevent layout from breaking when url has params ([9197bf7](https://github.com/ho-nl/m2-pwa/commit/9197bf72c5c3e422d70741cadbc40b19a1ae4936))
- rename dark to darkmode ([3d83669](https://github.com/ho-nl/m2-pwa/commit/3d83669f2fcce057f088e407cdce8345d0e0c485))

## [2.144.5](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.144.4...@graphcommerce/magento-graphcms@2.144.5) (2022-01-21)

### Bug Fixes

- darkMode logo ([80455ab](https://github.com/ho-nl/m2-pwa/commit/80455ab1deaad97b3fb92eeebc846e41f39da18f))

## [2.144.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.144.2...@graphcommerce/magento-graphcms@2.144.3) (2022-01-20)

### Bug Fixes

- search result label translation ([7e14ff5](https://github.com/ho-nl/m2-pwa/commit/7e14ff5548d86bc6b4f7afd51c259c0b833878f7))

## [2.144.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.144.0...@graphcommerce/magento-graphcms@2.144.1) (2022-01-18)

### Bug Fixes

- favicon and manifest ([304d6dd](https://github.com/ho-nl/m2-pwa/commit/304d6dd7769d349b02b06dfdfdc3f9d22a4af081))

# [2.144.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.143.1...@graphcommerce/magento-graphcms@2.144.0) (2022-01-17)

### Features

- manifest and favicon ([a82202c](https://github.com/ho-nl/m2-pwa/commit/a82202c0e572f005cbcfca815936af9356eb2767))

# [2.143.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.142.2...@graphcommerce/magento-graphcms@2.143.0) (2022-01-04)

### Bug Fixes

- pages would be blank because the locale couldn't properly be loaded ([5fe9ecd](https://github.com/ho-nl/m2-pwa/commit/5fe9ecd204c3f9efddcf95d54464b1b931ef682e))

### Features

- introduced a withTheme hoc to allow theming per route ([55e3fc1](https://github.com/ho-nl/m2-pwa/commit/55e3fc178b385d0ccdc19a5c09a7887be5db14dc))

# [2.142.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.141.21...@graphcommerce/magento-graphcms@2.142.0) (2022-01-03)

### Bug Fixes

- make sure spacing of category is only collapsed when there are no child categories or description ([7b6b313](https://github.com/ho-nl/m2-pwa/commit/7b6b3139e9b9db6f7cb96d32a8e9f6ad8ec10612))

### Features

- add support for minimal overlay size ([96e508a](https://github.com/ho-nl/m2-pwa/commit/96e508a94e23fe5b3ec523cddeb19b7b70f50034))
- added support for more positioning options for the overlay ([79eae9e](https://github.com/ho-nl/m2-pwa/commit/79eae9eb39513f5611103c4c745c3db99b11f15a))
- faster development api, doesn't continuously restart by using a loopback and assuming the graphql API is available over http ([28fbb0f](https://github.com/ho-nl/m2-pwa/commit/28fbb0f38efc5fd52da8536c9a798d39fa9ceec2))
- **framer-next-pages:** reduce rerenders when navigating to a new page ([5cf3301](https://github.com/ho-nl/m2-pwa/commit/5cf330130bb3527057da015e3c4a6fa295d7262e))
- when cloning a new project make sure we also have a settings.json ([49644c9](https://github.com/ho-nl/m2-pwa/commit/49644c907f891849fcdd3c1fa37e7c9727168bf3))

## [2.141.21](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.141.20...@graphcommerce/magento-graphcms@2.141.21) (2021-12-24)

### Bug Fixes

- make sure the filters are aligned properly on mobile ([4bfe978](https://github.com/ho-nl/m2-pwa/commit/4bfe978f095c1b9867608c138eccf3227b18d4e9))
- make sure the search results have the proper translation ([dc32280](https://github.com/ho-nl/m2-pwa/commit/dc32280daec17f15b42289f5ecd237b5ca5e5eed))

## [2.141.20](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.141.19...@graphcommerce/magento-graphcms@2.141.20) (2021-12-23)

### Bug Fixes

- **framer-next-pages:** closing is janky, caused by setting pointer-events to none, trying without resetting the pointerevents ([9247fa3](https://github.com/ho-nl/m2-pwa/commit/9247fa312926416802abd68ea04b1e6b52531f2c))

## [2.141.17](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.141.16...@graphcommerce/magento-graphcms@2.141.17) (2021-12-22)

### Bug Fixes

- darkmode would not initialize properly ([2aef061](https://github.com/ho-nl/m2-pwa/commit/2aef0618eedda4302cf83eca23092ed4c1d22bca))

## [2.141.13](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.141.12...@graphcommerce/magento-graphcms@2.141.13) (2021-12-21)

### Bug Fixes

- **graphql:** make sure we're passing the correct store code to the schema endpoint ([39753f2](https://github.com/ho-nl/m2-pwa/commit/39753f2117ce7ba79dab035c4134e642829e7f18))
- make sure bundlesize action can run ([64c9f68](https://github.com/ho-nl/m2-pwa/commit/64c9f68f82a573fa704d929d4132e320cb361ffa))
- make sure the homepage doesn't have a topbar when navigating from overlay to home ([f71f151](https://github.com/ho-nl/m2-pwa/commit/f71f151ae7a0129ae9d9f3f6a106453d79c1a4bb))
- make sure we're remounting when the store changes ([10756e3](https://github.com/ho-nl/m2-pwa/commit/10756e3eb252f8a91d84534ae024edb382a4ea0d))

## [2.141.10](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.141.9...@graphcommerce/magento-graphcms@2.141.10) (2021-12-20)

### Bug Fixes

- positioning of product review overlay should be left ([0c43bb1](https://github.com/ho-nl/m2-pwa/commit/0c43bb1b585bb05f2d717420735c9cccb433dc5b))

## [2.141.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.141.8...@graphcommerce/magento-graphcms@2.141.9) (2021-12-20)

### Bug Fixes

- blog images were to large ([c832b2b](https://github.com/ho-nl/m2-pwa/commit/c832b2b921f41fbb9a4767fa786200a57e1fcb59))

## [2.141.8](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.141.7...@graphcommerce/magento-graphcms@2.141.8) (2021-12-20)

### Bug Fixes

- make sure analytics only tracks once on page load ([94def43](https://github.com/ho-nl/m2-pwa/commit/94def43db7075b6b039696612547c6b6ff7c7c6e))
- make sure we're not loading gogole properties when keys are not given ([8636715](https://github.com/ho-nl/m2-pwa/commit/8636715d61985e0919208ffb64354c3ebb43ed01))

## [2.141.7](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.141.6...@graphcommerce/magento-graphcms@2.141.7) (2021-12-20)

### Reverts

- Revert "fix: build" ([71df800](https://github.com/ho-nl/m2-pwa/commit/71df8009744e606b0753cb4c5e7fe3c3c11d3416))

## [2.141.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.141.0...@graphcommerce/magento-graphcms@2.141.1) (2021-12-17)

### Bug Fixes

- darkMode fixes ([7d33d45](https://github.com/ho-nl/m2-pwa/commit/7d33d452ec801632565839b2fdfef0bc4959c14a))

# [2.141.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.140.1...@graphcommerce/magento-graphcms@2.141.0) (2021-12-17)

### Bug Fixes

- added various translations ([66c089d](https://github.com/ho-nl/m2-pwa/commit/66c089dc458e2d7b9f0318b2e14d88cb0e6effc8))
- darkmode handling ([e1c8cf9](https://github.com/ho-nl/m2-pwa/commit/e1c8cf9561d4bd96bec8ca8bb2696e0e12406795))
- make sure the orders overview and view are shared ([b8b2347](https://github.com/ho-nl/m2-pwa/commit/b8b2347ebd1c42e8a804ddcab255c41ce5deb819))

### Features

- **googleanalytics:** created pacakge to support Google Analytics ([308b6df](https://github.com/ho-nl/m2-pwa/commit/308b6df1f216d2bc726c770a9ead039bd114a995))

## [2.140.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.140.0...@graphcommerce/magento-graphcms@2.140.1) (2021-12-16)

### Bug Fixes

- simplify ButtonLinkList and made more flexible ([e01cc82](https://github.com/ho-nl/m2-pwa/commit/e01cc825b87abf81d1cb8f9dc976f674b9e8e6d3))

# [2.140.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.139.9...@graphcommerce/magento-graphcms@2.140.0) (2021-12-15)

### Bug Fixes

- logo invert ([2c56128](https://github.com/ho-nl/m2-pwa/commit/2c561280e41149ad986fae31df2da8d9f2846962))

### Features

- darkTheme set ([2513bba](https://github.com/ho-nl/m2-pwa/commit/2513bba71dddb9664c135eafd9f3d7b8c5ae0681))

## [2.139.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.139.8...@graphcommerce/magento-graphcms@2.139.9) (2021-12-15)

### Bug Fixes

- issue where multiple versions of graphql-typed-document-node were used causing build errors ([bd61212](https://github.com/ho-nl/m2-pwa/commit/bd61212d321290239e79ba5e2691c061b21dd422))
- removed unused postinstall-postinstall package ([365cb32](https://github.com/ho-nl/m2-pwa/commit/365cb32077e7e2e22c1fc0a89eaf3a8ed9d75581))

## [2.139.8](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.139.7...@graphcommerce/magento-graphcms@2.139.8) (2021-12-13)

### Bug Fixes

- make sure we're using the correct variant ([7fff606](https://github.com/ho-nl/m2-pwa/commit/7fff606390bc63c14cd8c033fbe5138226517869))

## [2.139.6](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.139.5...@graphcommerce/magento-graphcms@2.139.6) (2021-12-06)

### Bug Fixes

- bugs ([f7fac90](https://github.com/ho-nl/m2-pwa/commit/f7fac906b4563559ed382165983cde4271f65d01))

## [2.139.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.139.0...@graphcommerce/magento-graphcms@2.139.1) (2021-12-03)

### Bug Fixes

- search page ([85cf721](https://github.com/ho-nl/m2-pwa/commit/85cf72130bce4c3d2c392a3745adf05bca8618b1))

# [2.139.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.138.1...@graphcommerce/magento-graphcms@2.139.0) (2021-12-03)

### Bug Fixes

- make sure that pill link buttons get the right background color etc. ([c142b31](https://github.com/ho-nl/m2-pwa/commit/c142b31552417d2296341785994e2f7b35462793))
- make the headerHeight properly configurable ([c39c942](https://github.com/ho-nl/m2-pwa/commit/c39c942a62a9bb9687ea553be28e37fb49a6b065))
- missing CssBaseline ([d2a7126](https://github.com/ho-nl/m2-pwa/commit/d2a7126295b99b0446dc31b0cf7c60671a18f976))
- spacing of LayoutTItle ([7afcd31](https://github.com/ho-nl/m2-pwa/commit/7afcd3163d16e902cf2ff7917f56ee6a8798f55b))

### Features

- **framer-scroller-sheet:** created package replacing the framer-sheet package ([f9f2e91](https://github.com/ho-nl/m2-pwa/commit/f9f2e9101191f5cb5c4514ceb9534ddeb2476763))
- **framer-scroller:** get the scrollSnapAlign from the element instead of the body ([ec8c24e](https://github.com/ho-nl/m2-pwa/commit/ec8c24e6d457a3ed1c055b27d7b94be5ed4b6f2c))
- refactor page shell ([594bdb3](https://github.com/ho-nl/m2-pwa/commit/594bdb32927b797208b2a295bc0db9f9ceb94676))
- test for scroll snap on body ([12870f6](https://github.com/ho-nl/m2-pwa/commit/12870f60089792f31a1394237079c4fbda86d33c))

# [2.138.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.137.2...@graphcommerce/magento-graphcms@2.138.0) (2021-12-01)

### Bug Fixes

- comma ([a8c2db8](https://github.com/ho-nl/m2-pwa/commit/a8c2db887c9da5bb9a81bc97003f64ef097fb4d4))
- default borderRadius ([f816d7a](https://github.com/ho-nl/m2-pwa/commit/f816d7a4d4a7c76254b21bf129652d8a7c42ca4f))
- fontWeights ([7172527](https://github.com/ho-nl/m2-pwa/commit/71725272fe9f0b854d918ae357a668f641bfe8e5))
- ios zoom bug when using search. Fontsize should always be > 16 ([22abcd4](https://github.com/ho-nl/m2-pwa/commit/22abcd499b152448b3c38f84325debe07d2b9a68))
- remove Tagmanager, add Recaptcha back ([db1518d](https://github.com/ho-nl/m2-pwa/commit/db1518d8a97ffd2f1f826b85f1162036812762f2))
- slightly darker bg ([bd210b0](https://github.com/ho-nl/m2-pwa/commit/bd210b0f4a89149c2e912d4e4ce96f3500c22be6))

### Features

- add title to login form ([563157b](https://github.com/ho-nl/m2-pwa/commit/563157bc7059d0b10d8e93c71b918b816ca45943))
- borderRadius based on theme.shape.borderRadius ([7c34937](https://github.com/ho-nl/m2-pwa/commit/7c349376cd41a131c628324c299106fdb7e60484))
- breakpointVal ([0294503](https://github.com/ho-nl/m2-pwa/commit/029450343051cf6995babad9f9b42c7e6ad1094e))
- closeable menu ([5f94bb5](https://github.com/ho-nl/m2-pwa/commit/5f94bb5644ce1058ec705a8acced71ba2ba95e04))
- icon for 404 ([ff32915](https://github.com/ho-nl/m2-pwa/commit/ff3291578719cb7105d1045d68a78952b27da7fe))
- introduce borderRadius ([183afbc](https://github.com/ho-nl/m2-pwa/commit/183afbc8ee269f6694c372b06afdf41302f86c09))
- responsiveTyp ([6108b61](https://github.com/ho-nl/m2-pwa/commit/6108b6148e76ddbbe2db1614f10aaf88423db5ca))
- variable font weights ([bfd8142](https://github.com/ho-nl/m2-pwa/commit/bfd8142b96742efd1208556e3c48de382d8d8ceb))

## [2.137.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.137.1...@graphcommerce/magento-graphcms@2.137.2) (2021-11-27)

### Bug Fixes

- correct footer button color ([8cfe444](https://github.com/ho-nl/m2-pwa/commit/8cfe44434a8c37075470927b176c7dabcb9e06ab))
- nice shadow palette ([8aee834](https://github.com/ho-nl/m2-pwa/commit/8aee8341045320389d794ec127a83c8861a17b2c))
- reset MuiButton shadow to default ([c0d2ea7](https://github.com/ho-nl/m2-pwa/commit/c0d2ea7601cb16f3443e978b4a0076330317768a))
- shadows ([bddd006](https://github.com/ho-nl/m2-pwa/commit/bddd0063f520f62ae5f7d1323cdf6a79ec341ac2))
- shadows ([877f431](https://github.com/ho-nl/m2-pwa/commit/877f4312a1fd4e2fed7375ea7ef1208549c7d892))
- softer shadows ([7b6664f](https://github.com/ho-nl/m2-pwa/commit/7b6664f8b16ada8f65113bd1f990735b91356650))

# [2.137.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.136.0...@graphcommerce/magento-graphcms@2.137.0) (2021-11-22)

### Bug Fixes

- consistent mapping ([0b838d0](https://github.com/ho-nl/m2-pwa/commit/0b838d084b0f85c132f49b8d5360c9ecba40054a))
- revert to SvgImageSimple ([b247c6b](https://github.com/ho-nl/m2-pwa/commit/b247c6b96979bc313e597a8ffe1275b73f38bd6a))
- use fragment types ([0a06309](https://github.com/ho-nl/m2-pwa/commit/0a0630916e191c59eed402904b9ace6b87831bd8))

### Features

- add ReviewSummary component ([b823669](https://github.com/ho-nl/m2-pwa/commit/b823669d32e92238d05cac181c3453a13da49601))
- style all rating components from ThemedProvider ([bfc7b41](https://github.com/ho-nl/m2-pwa/commit/bfc7b415cb42d1cad4b61644a1c60a6772ebe6b3))
- use Rating component ([ec54f45](https://github.com/ho-nl/m2-pwa/commit/ec54f4522adb2d330bbdecc2ce032f86f13fb7a6))

# [2.136.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.135.1...@graphcommerce/magento-graphcms@2.136.0) (2021-11-16)

### Features

- legal pages should render as cms page ([8bbd195](https://github.com/ho-nl/m2-pwa/commit/8bbd195bd178c443b0f2afb8abe52503666ead36))

# [2.135.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.134.1...@graphcommerce/magento-graphcms@2.135.0) (2021-11-12)

### Bug Fixes

- even more translations ([1a1f988](https://github.com/ho-nl/m2-pwa/commit/1a1f98837c704b978f6b42b619d9c52f540b2d48))

### Features

- added tons of translations ([9bb0ac7](https://github.com/ho-nl/m2-pwa/commit/9bb0ac709b58df6ea6141e92e4923a5ca9ae2963))

## [2.134.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.134.0...@graphcommerce/magento-graphcms@2.134.1) (2021-11-12)

### Bug Fixes

- **account-orders:** empty orders page ([196df0e](https://github.com/ho-nl/m2-pwa/commit/196df0e4ed0e1931a4e6092cc273b70fe26f62c9))

# [2.134.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.133.3...@graphcommerce/magento-graphcms@2.134.0) (2021-11-12)

### Bug Fixes

- back to light theme ([c2d71d2](https://github.com/ho-nl/m2-pwa/commit/c2d71d219680a02eb535c46e15d76af2d1aceab0))
- checkbox primary color ([a80b097](https://github.com/ho-nl/m2-pwa/commit/a80b0973e3f058236389b69b882bce39a063e898))
- clean up themeProvider ([6868e71](https://github.com/ho-nl/m2-pwa/commit/6868e71b59a637be8229a2ab49791dd324e02bb9))
- design ([a095309](https://github.com/ho-nl/m2-pwa/commit/a095309bb3d77228985e08e30f626cd26e878f57))
- design darkTheme ([9fef7d1](https://github.com/ho-nl/m2-pwa/commit/9fef7d1b12243267761a92b2d3f1ce7254932c81))
- disable casting for category video's ([8a15770](https://github.com/ho-nl/m2-pwa/commit/8a157704cbd030def66bb15cc70d843818037cdb))
- disabled svg color ([590e2aa](https://github.com/ho-nl/m2-pwa/commit/590e2aa558c7e6363207cfcbc71a06bde8ca686a))
- hex for darktheme paper value, so calculations can be made ([c93bb22](https://github.com/ho-nl/m2-pwa/commit/c93bb22ba287c85ad5c27fd5f13d82dbb9a7d16f))
- icon style ([6b9fea9](https://github.com/ho-nl/m2-pwa/commit/6b9fea9112206bb38b419e8257ad1b2b3fad74b6))
- MuiChip defaults ([a8ca2c0](https://github.com/ho-nl/m2-pwa/commit/a8ca2c0a90298b0479e864c056958cd49977a7cf))
- pagination color not primary ([c4e6d4f](https://github.com/ho-nl/m2-pwa/commit/c4e6d4f35d2df7a93fe045bde6c015fbcc5e5089))
- perfect sized xl image tiles ([9421828](https://github.com/ho-nl/m2-pwa/commit/94218283b266d80dd47349a0538cec08126ed000))
- remove hiding recaptcha from themeProvider, add to component ([6a49f77](https://github.com/ho-nl/m2-pwa/commit/6a49f77ef9fd22ea66e7acd1322c65ac6426fd3b))
- remove review/add back button ([d5818e8](https://github.com/ho-nl/m2-pwa/commit/d5818e86268272ed1816c2621eb0def54aacc6bd))
- searchButton styling ([846e0cd](https://github.com/ho-nl/m2-pwa/commit/846e0cdb76eec7c5baf5fbfc4c501f99ebe59bf5))
- text color iconBlock and styling ([0f2b0a8](https://github.com/ho-nl/m2-pwa/commit/0f2b0a896b11eafb79ea045c44f0115649a2040e))

### Features

- hide recaptcha badge ([18d232d](https://github.com/ho-nl/m2-pwa/commit/18d232d7bbd42575630896fb291d57ed43a2c93d))
- provide all (different type of) overlays with the default background color ([111fe71](https://github.com/ho-nl/m2-pwa/commit/111fe718fbfddbeef452829e08b574ca46d51345))
- remove svg stroke definitions, set all to currentColor ([189814f](https://github.com/ho-nl/m2-pwa/commit/189814f822d111c8adc6be1fff65c9a4a4c50c65))

## [2.133.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.133.2...@graphcommerce/magento-graphcms@2.133.3) (2021-11-12)

### Bug Fixes

- **minimal-page-shell:** hide logo on mobile minimal page shell ([75f743b](https://github.com/ho-nl/m2-pwa/commit/75f743bad0a0a24826e0836a8af58f5c9589d7db))

# [2.133.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.132.3...@graphcommerce/magento-graphcms@2.133.0) (2021-11-11)

### Features

- lingui configuration and integration greatly simplified and fixed ssr ([d8ec22a](https://github.com/ho-nl/m2-pwa/commit/d8ec22a80295af854a4cf6f357c4fb137c5b550d))

## [2.132.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.132.2...@graphcommerce/magento-graphcms@2.132.3) (2021-11-09)

### Bug Fixes

- lingui locales ([738dc33](https://github.com/ho-nl/m2-pwa/commit/738dc336c1590c9deed9b575ecb147f3848a681a))

## [2.132.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.132.1...@graphcommerce/magento-graphcms@2.132.2) (2021-11-09)

### Bug Fixes

- **search-button:** add label for accessibility score ([1871e5b](https://github.com/ho-nl/m2-pwa/commit/1871e5b0b264ae4c98ebf3af1d074bb23d4dbbd8))

## [2.132.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.132.0...@graphcommerce/magento-graphcms@2.132.1) (2021-11-09)

### Bug Fixes

- **full-page-shell-header:** always show logo ([80c760a](https://github.com/ho-nl/m2-pwa/commit/80c760ade6fde88765cd8f13181f61ee70db1081))

# [2.132.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.131.11...@graphcommerce/magento-graphcms@2.132.0) (2021-11-09)

### Bug Fixes

- make sure the translations are ran ([9d77807](https://github.com/ho-nl/m2-pwa/commit/9d7780711fc1d66884a7465e18d175a6a1d40abb))

### Features

- added dutch translations ([59a4fd9](https://github.com/ho-nl/m2-pwa/commit/59a4fd9d170d9454c443b4723fdf5da0196cec7d))
- added translations to all pages ([8cf4ecd](https://github.com/ho-nl/m2-pwa/commit/8cf4ecd5db5edfec04ab205aa49f5de433d26579))
- string localization with [@lingui](https://github.com/lingui) ([0fa6071](https://github.com/ho-nl/m2-pwa/commit/0fa6071d8a5d37a7b81133731986c77d3c5068a0))

## [2.131.10](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.131.9...@graphcommerce/magento-graphcms@2.131.10) (2021-11-08)

### Bug Fixes

- build ([4b469a8](https://github.com/ho-nl/m2-pwa/commit/4b469a8eb9545c3bcae6f80b2b96cc18d45c2490))

## [2.131.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.131.8...@graphcommerce/magento-graphcms@2.131.9) (2021-11-08)

### Bug Fixes

- error typos ([d3f5357](https://github.com/ho-nl/m2-pwa/commit/d3f5357ffd840fb236db4e40cb52a324752591fb))
- **row-product:** additional props ([2b706a3](https://github.com/ho-nl/m2-pwa/commit/2b706a3d438b3fc227a8d2250d0996fed08475c3))

## [2.131.4](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.131.3...@graphcommerce/magento-graphcms@2.131.4) (2021-11-04)

### Bug Fixes

- Checkout button margin consistency ([9fcf7e7](https://github.com/ho-nl/m2-pwa/commit/9fcf7e7d96172448b2d2911771d6bf70ab976594))

## [2.131.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.131.2...@graphcommerce/magento-graphcms@2.131.3) (2021-11-04)

### Bug Fixes

- **blog-item:** image sizes ([1d15c3c](https://github.com/ho-nl/m2-pwa/commit/1d15c3cfc8002fc1b5af1c977199e70130a6bbd4))

## [2.131.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.131.1...@graphcommerce/magento-graphcms@2.131.2) (2021-11-03)

### Bug Fixes

- various accessibility improvements ([47481a9](https://github.com/ho-nl/m2-pwa/commit/47481a9a882ba87968de6dd797557b0b275d75fb))

## [2.131.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.131.0...@graphcommerce/magento-graphcms@2.131.1) (2021-11-03)

### Bug Fixes

- logo shouldnt invert, because it depends on the logo if it can be inverted. ([8426b09](https://github.com/ho-nl/m2-pwa/commit/8426b09688c7c77f45f912c56684ad1f378fc263))

# [2.131.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.130.0...@graphcommerce/magento-graphcms@2.131.0) (2021-11-03)

### Bug Fixes

- **full-page-shell:** show logo on mobile ([abe2af7](https://github.com/ho-nl/m2-pwa/commit/abe2af7001ce9a31ba67a9fa326c50a07fe86135))
- **logo:** correct props propagation ([968025b](https://github.com/ho-nl/m2-pwa/commit/968025bc0bed4843cce7d11c0ef2740edb2ea02b))

### Features

- **next-ui:** introducing footer component ([a98129b](https://github.com/ho-nl/m2-pwa/commit/a98129b935b9fd45e985f958a60a4ad6b21c880c))

# [2.130.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.129.3...@graphcommerce/magento-graphcms@2.130.0) (2021-11-03)

### Bug Fixes

- add x-recaptcha header to apollo link context when using mutations ([380fe52](https://github.com/ho-nl/m2-pwa/commit/380fe52ebd283df034d8a2c6a4f6a3713955bdd3))
- remove useless check for cartId ([3ed24ab](https://github.com/ho-nl/m2-pwa/commit/3ed24ab18c8a8be882f03111a50790e25f894053))
- solve issue where headers weren't properly passed to the backend. ([b481630](https://github.com/ho-nl/m2-pwa/commit/b48163028b063cb2cb17870da230019e7f95c58e))
- **use-form-gql:** context type ([f355495](https://github.com/ho-nl/m2-pwa/commit/f3554951697fe394a76dd75ecf119f038f8d9bbc))

### Features

- google recaptcha v3 integration ([a9fcc16](https://github.com/ho-nl/m2-pwa/commit/a9fcc16f93951e61378c99a2e183e2d754da1d50))

## [2.129.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.129.0...@graphcommerce/magento-graphcms@2.129.1) (2021-11-02)

### Bug Fixes

- RemoveCoupon Button and fix pill-link style to match buttons ([6838812](https://github.com/ho-nl/m2-pwa/commit/68388123773fb4f79a3e4b1beb7ecca601d7748e))

# [2.129.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.128.6...@graphcommerce/magento-graphcms@2.129.0) (2021-11-02)

### Bug Fixes

- darkMode ([c7573de](https://github.com/ho-nl/m2-pwa/commit/c7573de6bb80643b26931c35ac61735539e7fbf0))
- darkTheme ([df3d326](https://github.com/ho-nl/m2-pwa/commit/df3d326126446c1b92f8e46eff0533bbbe35604f))
- darkTheme ([a12786f](https://github.com/ho-nl/m2-pwa/commit/a12786f33cf09e974cceb8592ec98439ccbc3fad))
- darkTheme ([d0517af](https://github.com/ho-nl/m2-pwa/commit/d0517af5a788532c48f567ee3e840986efa26a67))
- darkTheme ([ae017c1](https://github.com/ho-nl/m2-pwa/commit/ae017c1a1e82f86ee5eb2f67106dac8174950c45))
- darkTheme, prevent cart total color overlap ([9d4d7aa](https://github.com/ho-nl/m2-pwa/commit/9d4d7aa20ec05f13662efccce99dee10e462bf18))
- disable google font but keep example ([6daeb07](https://github.com/ho-nl/m2-pwa/commit/6daeb07961581584d19173bc81dea60df3bb5fbf))
- minimal fontsize > 16px to prevent ios form input zoom ([1324f34](https://github.com/ho-nl/m2-pwa/commit/1324f343b3e9bbbe87ea8b85201ac65fa157c642))
- no more zoom on ios when focus on inputs ([d9e2dc5](https://github.com/ho-nl/m2-pwa/commit/d9e2dc5569822e106599207cb9120964df5263a0))
- remove text='bold', make contained button text stronger by default ([cd277c9](https://github.com/ho-nl/m2-pwa/commit/cd277c9f434a4a765eac372467e5a05c822d5512))
- ReviewChip should only differ from default MuiChip in product grid ([c22a029](https://github.com/ho-nl/m2-pwa/commit/c22a0291afbbc03099fd0487421ff9fd31caf226))
- transparent MuiChip mobile ([a86d25f](https://github.com/ho-nl/m2-pwa/commit/a86d25ff0dab502f4e42c1a62f72b546bc7375ce))

### Features

- darkTheme ([968f4f1](https://github.com/ho-nl/m2-pwa/commit/968f4f1360417bf7daa36454c19e6bc5cf53ae90))
- darkTheme ([3ed6647](https://github.com/ho-nl/m2-pwa/commit/3ed664714670315bc9f20542549724f66cb5052d))
- easier theme switching and theme dependend button contained backgroundColor ([6ae8565](https://github.com/ho-nl/m2-pwa/commit/6ae856546f139b9ff36d8d9bae1ea47f58981f7c))
- Mui true Pagination based on Fab ([572fa7b](https://github.com/ho-nl/m2-pwa/commit/572fa7b031b58b6ffdab60c4a50407a53202fa34))

## [2.128.6](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.128.5...@graphcommerce/magento-graphcms@2.128.6) (2021-11-02)

### Bug Fixes

- break back button loop ([be2e5ae](https://github.com/ho-nl/m2-pwa/commit/be2e5aefa1e409a97c1ebf94173f4da7ea25386b))
- **framer-next-pages:** prevent back button loop when previous page is the up page of the previous page ([cbdde83](https://github.com/ho-nl/m2-pwa/commit/cbdde83790337bdf4c5f03c907ca6e6e02792e70))
- remove up from sheet shell pages ([9fd48e3](https://github.com/ho-nl/m2-pwa/commit/9fd48e34ade47daaff2298d3ff710119a9c6f7b2))
- **service:** undefined cannot be serialized as json ([7a3d494](https://github.com/ho-nl/m2-pwa/commit/7a3d494a53c6126c66b314227f3894d3bdefb456))
- typings product pages ([4ac24fc](https://github.com/ho-nl/m2-pwa/commit/4ac24fcba90f98c63181c339634e71bb91d78ebd))

## [2.128.5](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.128.4...@graphcommerce/magento-graphcms@2.128.5) (2021-11-02)

### Bug Fixes

- make sure graphql files are generated for projects ([bc1cf81](https://github.com/ho-nl/m2-pwa/commit/bc1cf8154f1f158934f42d757e26956ed738f128))

## [2.128.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.128.2...@graphcommerce/magento-graphcms@2.128.3) (2021-11-01)

### Bug Fixes

- category page design fixs ([d3fccc2](https://github.com/ho-nl/m2-pwa/commit/d3fccc2a86106b854e9a1fd89040a248fe20c99a))

## [2.128.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.128.1...@graphcommerce/magento-graphcms@2.128.2) (2021-10-29)

### Bug Fixes

- spacing of title on category landing on mobile ([8ed3550](https://github.com/ho-nl/m2-pwa/commit/8ed35502fd231d1d6a8e0a282f8961335d9dead3))

## [2.128.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.128.0...@graphcommerce/magento-graphcms@2.128.1) (2021-10-28)

### Bug Fixes

- External SVG's can't have alt tags ([1b1414a](https://github.com/ho-nl/m2-pwa/commit/1b1414a782d55d3acf7b0e6bcaa50f2ad5f18f39))
- sadFace size ([b75dd19](https://github.com/ho-nl/m2-pwa/commit/b75dd19dd49ff95d5f99305637b6687171ebb7d5))

# [2.128.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.127.2...@graphcommerce/magento-graphcms@2.128.0) (2021-10-28)

### Bug Fixes

- back to using SvgImage for CMS icons ([5c187f6](https://github.com/ho-nl/m2-pwa/commit/5c187f63a1b9cc06e4aa168fae245da3eced7184))
- base icon size on responsiveVal ([3bbd2a7](https://github.com/ho-nl/m2-pwa/commit/3bbd2a7be4853b284f90603056ae8990e5d62040))
- blog title size ([9c44d03](https://github.com/ho-nl/m2-pwa/commit/9c44d0349af28192f3f9d7f360b08b0370d3e437))
- build ([25582a4](https://github.com/ho-nl/m2-pwa/commit/25582a496039c704e75bb969d4fa06c13ee6267d))
- build, remove unused imports ([af6d72c](https://github.com/ho-nl/m2-pwa/commit/af6d72c6e70f670effb4d9e0c1fd883bf771f99d))
- colorSecondary for MuiCheckbox ([13a5c5e](https://github.com/ho-nl/m2-pwa/commit/13a5c5e8b8c30eabaafc909b325692d93d65c97b))
- Correct image sizes fixes layout shift ([30e04ba](https://github.com/ho-nl/m2-pwa/commit/30e04baec1674403be934dbae81e278af72f2382))
- footer mobile vertical spacing ([a75028e](https://github.com/ho-nl/m2-pwa/commit/a75028e982497fdd74c6d1d51a8ca24e2e1a849c))
- invert icon on checkout button ([169168d](https://github.com/ho-nl/m2-pwa/commit/169168d1a597ac02a97b1cb160c3c5c0fb0db12a))
- keep original review chip for now ([9664cd9](https://github.com/ho-nl/m2-pwa/commit/9664cd90801c6776e1c694eec8f393118810a792))
- max size Swipable ([d980711](https://github.com/ho-nl/m2-pwa/commit/d9807118b7a370f4f8662e55155fda55f420fc9a))
- remove double icons ([1654e34](https://github.com/ho-nl/m2-pwa/commit/1654e3441911f3c7c1600357f8f8e3032f5ee729))
- remove unused /view/ about route ([2ea8eb9](https://github.com/ho-nl/m2-pwa/commit/2ea8eb909d25840fde19470f3c5f9b0045178f2f))
- remove wishlist from mobile menu ([ac003bf](https://github.com/ho-nl/m2-pwa/commit/ac003bf6d4630c88d5684771c2991ec70f4c7a04))
- revert fontsizes ([0606a44](https://github.com/ho-nl/m2-pwa/commit/0606a44ecda9f1a743f9954e7bd53d20ddfe5802))
- small design changes ([d9936e9](https://github.com/ho-nl/m2-pwa/commit/d9936e90baab3694066d73216c9ad2941fdbaaa8))
- smaller logo ([a50196a](https://github.com/ho-nl/m2-pwa/commit/a50196a67941d92b860865740f7cee2ac10ccee9))
- softer gray ([536fc52](https://github.com/ho-nl/m2-pwa/commit/536fc5257ecbca9db926d59164e1fa1c94627bed))
- subtitles ([9ef1d8b](https://github.com/ho-nl/m2-pwa/commit/9ef1d8b9079c50340015e482fe6f1bf577610269))
- SvgImage to SvgImageSimple ([e556c72](https://github.com/ho-nl/m2-pwa/commit/e556c720b299efed185c1d7c3a9b718190d90052))
- SvgImage to SvgImageSimple ([793fac7](https://github.com/ho-nl/m2-pwa/commit/793fac769f045d283817fe47fbed77d38d282f3c))
- typo ([b235112](https://github.com/ho-nl/m2-pwa/commit/b235112871815f3e44376eb2186dcd4cd6aef26b))
- update SvgImage to SvgImageSimple ([f116543](https://github.com/ho-nl/m2-pwa/commit/f116543730853fa9782abff0ccacee7032e85789))

### Features

- add routing for /about pages ([6127333](https://github.com/ho-nl/m2-pwa/commit/6127333ed628a561af8b930f4ef5aa299587d0d1))
- adjust font sizes, bring back h1 as usable style ([6ea3886](https://github.com/ho-nl/m2-pwa/commit/6ea3886f188d8a5567f20292b8ddc6f2877e1ccf))
- Bring back descriptions ([75f372b](https://github.com/ho-nl/m2-pwa/commit/75f372b9f7c959ac60d436d6c9f469da46820693))
- button sizes ([8a5126e](https://github.com/ho-nl/m2-pwa/commit/8a5126e05244cab49b4386948e96e260eaa39cf2))
- cleanup grid, add visual star chip ([0571569](https://github.com/ho-nl/m2-pwa/commit/057156937f603bc399f5f8f8ac2837ff5cfaef28))
- dynamic icons, update SvgImage uses to SvgImageSimple ([3d3cc0e](https://github.com/ho-nl/m2-pwa/commit/3d3cc0e0336fcde1cce6ba19705f82c1edf9bfc6))
- enable use of both small and medium chips in design ([4536f96](https://github.com/ho-nl/m2-pwa/commit/4536f96b031734a71faf7c10f94aa5d5da90b9a8))
- full width category pages ([5f5c264](https://github.com/ho-nl/m2-pwa/commit/5f5c26487e7264fdbbf38ca51c7c453c7f5b6a17))
- responsive social icons ([aea4c9f](https://github.com/ho-nl/m2-pwa/commit/aea4c9fa245b3dd1357667d015af7f3d86fa9b6a))
- SALE color is primary ([91ca1d8](https://github.com/ho-nl/m2-pwa/commit/91ca1d8a1d8c4c573747a19175f46953e9bcf7de))
- set correct font sizes ([9317448](https://github.com/ho-nl/m2-pwa/commit/9317448c94a9fb4408dfbcaa320adccc363964d0))
- typography, add heading1 styling for cms h2's ([36437f8](https://github.com/ho-nl/m2-pwa/commit/36437f860bd2cdbdbece720ae10873da9fdb02d6))

# [2.127.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.126.0...@graphcommerce/magento-graphcms@2.127.0) (2021-10-27)

### Bug Fixes

- revert back to babel build for smaller (but slower) builds ([9a127fb](https://github.com/ho-nl/m2-pwa/commit/9a127fb3495070db28d4046e258792988be15f00))

### Features

- enable swcMinify for faster builds ([5c54f2b](https://github.com/ho-nl/m2-pwa/commit/5c54f2bc13e702be3bd24e4642299d58148f895a))
- **graphql:** log the graphql operation and variables when an error occurs ([65a7700](https://github.com/ho-nl/m2-pwa/commit/65a77000c0f212eaaa984b2930f57234c90dfdb8))
- **nextjs:** upgraded to nextjs 12 ([9331bc8](https://github.com/ho-nl/m2-pwa/commit/9331bc801f6419522115cc47d291d49d608d5a90))

# [2.126.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.125.3...@graphcommerce/magento-graphcms@2.126.0) (2021-10-25)

### Features

- prepare for yarn 3 usage (not actually migrated because vercel doesn't support yarn 3) ([41734be](https://github.com/ho-nl/m2-pwa/commit/41734beaa016bf4c3487b3fbd5a402d8024e173f))

# [2.125.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.124.0...@graphcommerce/magento-graphcms@2.125.0) (2021-10-21)

### Bug Fixes

- **graphql-mesh:** use a build mesh for production environments ([cd2f318](https://github.com/ho-nl/m2-pwa/commit/cd2f3189383fa9d304bd367334e3f47ca4aa6100))

### Features

- **graphql-mesh:** remove the api project and use a single project 🎉👩‍👩‍👦‍👦 ([ea4ad03](https://github.com/ho-nl/m2-pwa/commit/ea4ad0397d4ff289ef3b3253593fb0914c8c5246))

# [2.124.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.123.8...@graphcommerce/magento-graphcms@2.124.0) (2021-10-20)

### Features

- **graphql-mesh:** simplified the handler to use less code in the project ([f62b752](https://github.com/ho-nl/m2-pwa/commit/f62b75249492f40c5972deede529a25a17c8a617))

## [2.123.8](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.123.7...@graphcommerce/magento-graphcms@2.123.8) (2021-10-20)

### Bug Fixes

- spacing below the footer is not nessesary with the new layout ([ffe0ab9](https://github.com/ho-nl/m2-pwa/commit/ffe0ab98823c1f035fcb7d98d147c871cc8a5b91))

## [2.123.6](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.123.5...@graphcommerce/magento-graphcms@2.123.6) (2021-10-19)

### Bug Fixes

- **next-config:** move the @apollo/client **DEV** env to next-config ([fb1df3f](https://github.com/ho-nl/m2-pwa/commit/fb1df3fe4edbf769afb4149c7beced70bb948be5))

## [2.123.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.123.0...@graphcommerce/magento-graphcms@2.123.1) (2021-10-19)

### Bug Fixes

- productCopy error ([95a8dbf](https://github.com/ho-nl/m2-pwa/commit/95a8dbf6fa48910ace728da4a200a3847a582899))

# [2.123.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.122.2...@graphcommerce/magento-graphcms@2.123.0) (2021-10-19)

### Features

- **framer-scroller:** better defaults so the Scroller doesn't look broken when providing no props ([b177ce9](https://github.com/ho-nl/m2-pwa/commit/b177ce9570abb9ccfd4eb5cc34e43d157bb4e81a))

## [2.122.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.122.0...@graphcommerce/magento-graphcms@2.122.1) (2021-10-18)

### Bug Fixes

- graphql-mesh missing inmemory lru ([6c71c25](https://github.com/ho-nl/m2-pwa/commit/6c71c256911072ace19037616e0ce2ab478bf070))

# [2.122.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.121.11...@graphcommerce/magento-graphcms@2.122.0) (2021-10-18)

### Bug Fixes

- **row-product:** import row-product-fragment ([9baca83](https://github.com/ho-nl/m2-pwa/commit/9baca8378b1a19fab8eda98548ed498f8ea69e24))
- **row-product:** render correct product items ([91509a7](https://github.com/ho-nl/m2-pwa/commit/91509a78de775cd059f67a256dc0107a06a765d8))

### Features

- **graphcms:** combined multiple models to bypass model creation limit ([fd6dc14](https://github.com/ho-nl/m2-pwa/commit/fd6dc140cb60c5733dab2e0a43b5df2059e0c739))
- **row-product:** actually render something ([fba6811](https://github.com/ho-nl/m2-pwa/commit/fba6811d2880cb38196f579fbd1423dfb323654f))
- **row-product:** allow to render row product variants ([c391c09](https://github.com/ho-nl/m2-pwa/commit/c391c093bc638d14d0630cc441bfc43aca11a51e))

## [2.121.10](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.121.9...@graphcommerce/magento-graphcms@2.121.10) (2021-10-13)

### Bug Fixes

- removed useless backFallbackHref declarations on pages ([5906be2](https://github.com/ho-nl/m2-pwa/commit/5906be224dcd1f7c25ec9b6f3c654944fb42b147))

## [2.121.5](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.121.4...@graphcommerce/magento-graphcms@2.121.5) (2021-10-12)

### Bug Fixes

- **account-signin-page:** remove back button ([47d09b1](https://github.com/ho-nl/m2-pwa/commit/47d09b1f497320a1d1c6a9d9493a490ac2189782))
- **forgot-password-page:** hide back button ([a64c9a4](https://github.com/ho-nl/m2-pwa/commit/a64c9a449afed033280c46d740a2ee81c89cbeef))

## [2.121.4](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.121.3...@graphcommerce/magento-graphcms@2.121.4) (2021-10-11)

### Bug Fixes

- **downloadable-product:** import fix ([9efc08c](https://github.com/ho-nl/m2-pwa/commit/9efc08c0c38f71429388bcd42c39865135e898b4))
- **product-pages:** remove top spacing short descriptions ([7ba7d32](https://github.com/ho-nl/m2-pwa/commit/7ba7d321d8eaf1d323047b87c6c086e9445f5263))

# [2.121.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.120.0...@graphcommerce/magento-graphcms@2.121.0) (2021-10-08)

### Features

- made empty success page when no cart is present and removed backbuttons ([1e29450](https://github.com/ho-nl/m2-pwa/commit/1e294500f9f1f2cfeab0de8bd8211ee517af5d8c))

# [2.120.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.119.18...@graphcommerce/magento-graphcms@2.120.0) (2021-10-08)

### Features

- **row-service-options:** show email and telephone number ([8291b25](https://github.com/ho-nl/m2-pwa/commit/8291b25b6e408c480eedbc5aa1353a99785e4df5))

## [2.119.18](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.119.17...@graphcommerce/magento-graphcms@2.119.18) (2021-10-07)

### Bug Fixes

- make sure if no payment method is filled in we get an error shown ([a203e57](https://github.com/ho-nl/m2-pwa/commit/a203e570caad0732427a178e8e8b10b4a15d676b))

## [2.119.17](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.119.16...@graphcommerce/magento-graphcms@2.119.17) (2021-10-07)

### Bug Fixes

- replace **DEV** with proper variable for optimizing the bundle size ([9b03209](https://github.com/ho-nl/m2-pwa/commit/9b032095f618846d132c00b8dc14fbb1b09c6ed8))
- try to define the **DEV** variable for better tree shaking ([465125d](https://github.com/ho-nl/m2-pwa/commit/465125dff36ac4d269f74ce3598d5257c3c1d801))

## [2.119.16](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.119.15...@graphcommerce/magento-graphcms@2.119.16) (2021-10-06)

### Bug Fixes

- remove default orientation ([2260d03](https://github.com/ho-nl/m2-pwa/commit/2260d0312196a46171580d00d0ade4a3e7efa9e7))

## [2.119.15](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.119.14...@graphcommerce/magento-graphcms@2.119.15) (2021-10-06)

### Bug Fixes

- **cart-fab:** box shadow in safari ([4eb316d](https://github.com/ho-nl/m2-pwa/commit/4eb316dd0f2ab7ee2806a3acdb306af1eb72854b))

## [2.119.13](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.119.12...@graphcommerce/magento-graphcms@2.119.13) (2021-10-04)

### Bug Fixes

- **blog:** use app shell title ([987bb15](https://github.com/ho-nl/m2-pwa/commit/987bb157c4064141b1c2978935e66cf47ae24ff0))
- **checkout-success:** go back to empty cart ([17af765](https://github.com/ho-nl/m2-pwa/commit/17af76504084e90d5a57ab42788155bcace3187d))
- **checkout-success:** remove clear current cart id ([aa15065](https://github.com/ho-nl/m2-pwa/commit/aa150655e1ee4dc70f0330cf6a7b58e9a00d1ac0))

## [2.119.12](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.119.11...@graphcommerce/magento-graphcms@2.119.12) (2021-10-04)

### Bug Fixes

- **full-page-shell:** header height consistency on mobile ([a18f7a3](https://github.com/ho-nl/m2-pwa/commit/a18f7a3f22b6b1b8e7029d17b2086827bcee48f2))
- **sheet-shell:** mobile border bottom overlaps text ([54a50d3](https://github.com/ho-nl/m2-pwa/commit/54a50d335ade33a97d2c33ce68d62bfcc37f8f2e))

## [2.119.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.119.10...@graphcommerce/magento-graphcms@2.119.11) (2021-10-04)

### Bug Fixes

- **service:** align title ([c1d749c](https://github.com/ho-nl/m2-pwa/commit/c1d749c0ed6c8600085afd2d102c61771e2afc70))

## [2.119.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.119.8...@graphcommerce/magento-graphcms@2.119.9) (2021-09-30)

### Bug Fixes

- dependency cycle issues causes release version issues ([f9d82e3](https://github.com/ho-nl/m2-pwa/commit/f9d82e3bf152acaf90f9d5328bc3d020ca1c53d8))

## [2.119.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.119.2...@graphcommerce/magento-graphcms@2.119.3) (2021-09-29)

### Bug Fixes

- make sure the mollie module doesn't start with magento- to prevent building from node moduels ([ed406b9](https://github.com/ho-nl/m2-pwa/commit/ed406b9f56bd8cb5df0463cc50e4b1e9a728d4ca))

## [2.119.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.119.1...@graphcommerce/magento-graphcms@2.119.2) (2021-09-29)

### Bug Fixes

- when deploying from inside the monorepo we need to build the other packages as well ([93b2491](https://github.com/ho-nl/m2-pwa/commit/93b2491d8b17bdd03962db532def4a91b35019f6))

# [2.119.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.118.0...@graphcommerce/magento-graphcms@2.119.0) (2021-09-28)

### Features

- created withYarn1Scopes functionality so we don't rely on actual workspaces ([7e491ca](https://github.com/ho-nl/m2-pwa/commit/7e491ca2276028a8587f6cd88b98ee451755c3d0))

# [2.118.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.117.4...@graphcommerce/magento-graphcms@2.118.0) (2021-09-28)

### Bug Fixes

- add to cart button ([8a69454](https://github.com/ho-nl/m2-pwa/commit/8a69454b1372a563020e1ef1b7c50363b8d29717))

### Features

- check if NEXT_PUBLIC_GRAPHQL_ENDPOINT exists ([71460bd](https://github.com/ho-nl/m2-pwa/commit/71460bdc2abb524c24fed0a6d5d3651643ef9956))

## [2.117.4](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.117.3...@graphcommerce/magento-graphcms@2.117.4) (2021-09-27)

### Bug Fixes

- build packages before releasing ([c4761cf](https://github.com/ho-nl/m2-pwa/commit/c4761cf6d1810c140fd56f6eac8fca922f8c0edc))

## [2.117.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.117.2...@graphcommerce/magento-graphcms@2.117.3) (2021-09-27)

### Bug Fixes

- add warnings to next.config.js when .env variables are missing ([d9dffec](https://github.com/ho-nl/m2-pwa/commit/d9dffec8ebc9cb1c70ca5591cad5e42c9bbe30e6))

## [2.117.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.117.0...@graphcommerce/magento-graphcms@2.117.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/magento-graphcms

# 2.117.0 (2021-09-27)

### Bug Fixes

- added product description to all product types ([7c0fcf5](https://github.com/ho-nl/m2-pwa/commit/7c0fcf552f8a937e54fde209f0a351d6e342274b))

### Features

- rename soxbase to magento-graphcms ([e363435](https://github.com/ho-nl/m2-pwa/commit/e3634350bffec27221f9b3d016789b2e5eda298d))

# Change Log

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.116.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.115.0...@graphcommerce/magento-graphcms@2.116.0) (2021-09-24)

### Bug Fixes

- agreements positioning ([89c2dee](https://github.com/ho-nl/m2-pwa/commit/89c2dee1debeb84c8b2cd9abaac85f03759604c8))

### Features

- **checkout:** checkout agreements checkboxes in checkout ([a8b4ddb](https://github.com/ho-nl/m2-pwa/commit/a8b4ddb3a9750c2b7ff86cd460e0ff7fc4cc0ad1))
- **payment-agreements-form:** checkout agreements checkboxes ([13c8164](https://github.com/ho-nl/m2-pwa/commit/13c816499d220a2ce940672a95beca508b78ddc9))
- read checkout policies in sidebar sheet ([3fb765e](https://github.com/ho-nl/m2-pwa/commit/3fb765e14a8cfaf0bb27acd8368926ac27ed6a4c))

# [2.115.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.114.3...@graphcommerce/magento-graphcms@2.115.0) (2021-09-24)

### Bug Fixes

- **account-addresses:** single address not shown ([798bb9c](https://github.com/ho-nl/m2-pwa/commit/798bb9ce2ae7347f161d1a7285e21a3aad0f835f))
- cart cache not up-to-date ([aae4d30](https://github.com/ho-nl/m2-pwa/commit/aae4d302e320475d28a356ec304ea6afb64c3080))
- edit billing address updating state ([ecd9f48](https://github.com/ho-nl/m2-pwa/commit/ecd9f48ce313d8e7a698c06ff29b88231dc50168))

### Features

- added magento-newsletter package ([9b48b1b](https://github.com/ho-nl/m2-pwa/commit/9b48b1b4dc29f9ea3271f4a6370abba15dd8999c))
- edit billing address on checkout payment step ([96a5719](https://github.com/ho-nl/m2-pwa/commit/96a5719437616006efb2588c3516d3f2608c1fb8))
- guest newsletter toggle ([c747aed](https://github.com/ho-nl/m2-pwa/commit/c747aed081b2c5c134e2be1bc4c32de2a5e6e220))
- **inline-account:** re-added the component ([c508d34](https://github.com/ho-nl/m2-pwa/commit/c508d341ca34daa26a6db13ead72f7f4bdc72160))
- signup newsletter component ([7ee961d](https://github.com/ho-nl/m2-pwa/commit/7ee961ded34e9fe012faa7041e96b35fb44b1f35))

## [2.114.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.114.2...@graphcommerce/magento-graphcms@2.114.3) (2021-09-24)

### Bug Fixes

- **chip-menu:** layout shift on open ([c65cf5b](https://github.com/ho-nl/m2-pwa/commit/c65cf5bc18864b5180aba3f2361399bd85967952))
- placeholder cart fab is visible on hover ([00a7186](https://github.com/ho-nl/m2-pwa/commit/00a7186197b3e558c0afb40fa900c5951c4b9ba8))
- **product-description:** remove typography component ([b92a028](https://github.com/ho-nl/m2-pwa/commit/b92a0285fda09ae4ffe48d91150337438d08f3eb))
- show short description on product page ([f51d39c](https://github.com/ho-nl/m2-pwa/commit/f51d39c3122e4e1523cfc066d5c0ca8a210879e4))
- **test:** no children found ([2ba74d8](https://github.com/ho-nl/m2-pwa/commit/2ba74d8364c9eb24418871b3cc62a4f509c403e8))

## [2.114.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.114.0...@graphcommerce/magento-graphcms@2.114.1) (2021-09-23)

### Bug Fixes

- make sure mollie only gets build optionally ([e5e2347](https://github.com/ho-nl/m2-pwa/commit/e5e23475e170dc2fc0c13103dfb8fbdb9009715f))

# [2.114.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.113.4...@graphcommerce/magento-graphcms@2.114.0) (2021-09-22)

### Bug Fixes

- use gtm id directly from process.env ([1682834](https://github.com/ho-nl/m2-pwa/commit/16828342b0f432da5c7051b1b9834fdad1c58ec8))

### Features

- google tag manager integration ([6697639](https://github.com/ho-nl/m2-pwa/commit/6697639b479bd1f9efecf609db1e606a540fc24c))

## [2.113.4](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.113.3...@graphcommerce/magento-graphcms@2.113.4) (2021-09-20)

### Bug Fixes

- header app shell margin bottom in some circumstances ([6030ba7](https://github.com/ho-nl/m2-pwa/commit/6030ba7d07619d0b877a9f557c3e14676c326c7a))

## [2.113.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.113.2...@graphcommerce/magento-graphcms@2.113.3) (2021-09-11)

### Bug Fixes

- make sure we dont load all the category data into the apollo client cache ([ffc4e15](https://github.com/ho-nl/m2-pwa/commit/ffc4e15755741900b247a17e6606dc9eddc2aa0b))

## [2.113.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.113.0...@graphcommerce/magento-graphcms@2.113.1) (2021-09-01)

### Bug Fixes

- **magento-product:** hide sorting options when there are no products ([c5e37d7](https://github.com/ho-nl/m2-pwa/commit/c5e37d709c570596994beafe5a6afccfa5704548))

# [2.113.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.112.0...@graphcommerce/magento-graphcms@2.113.0) (2021-09-01)

### Features

- **framer-scroller:** implemented the scroller on all pages ([73fb518](https://github.com/ho-nl/m2-pwa/commit/73fb518eff74edb2b3212e892b3d8cc2b088011b))

# [2.112.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.111.1...@graphcommerce/magento-graphcms@2.112.0) (2021-08-30)

### Bug Fixes

- **use-back-link:** pop history after going back ([20d69ef](https://github.com/ho-nl/m2-pwa/commit/20d69eff868d53d07084e5d1f78819939a5f429c))

### Features

- **pageContext:** history prop ([9094551](https://github.com/ho-nl/m2-pwa/commit/909455146d159a839fa72046c15332fc763f315f))
- **use-back-link:** go back in history when links are identical ([9be8a05](https://github.com/ho-nl/m2-pwa/commit/9be8a050d418d2ef24bb6894c5946a1268883aba))

## [2.111.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.111.0...@graphcommerce/magento-graphcms@2.111.1) (2021-08-27)

### Bug Fixes

- adjust header height ([d22310d](https://github.com/ho-nl/m2-pwa/commit/d22310dca282208c6d7020c6c27f8ba5be980e3c))
- app shell consistency ([e062c3d](https://github.com/ho-nl/m2-pwa/commit/e062c3d4af75c6bfe1ad7056dfb172277f1b01cb))
- app shell consistency wip ([be995ca](https://github.com/ho-nl/m2-pwa/commit/be995ca5c3e383b89fea3759186d53af4790e99b))
- app shell fixes ([1b13d0d](https://github.com/ho-nl/m2-pwa/commit/1b13d0d0d4b480ddc9712b4d298af2d81fb2b1d4))
- app shell fixes ([c3bddee](https://github.com/ho-nl/m2-pwa/commit/c3bddee6b878cd9d2183c4938df0824a6eca4f36))
- app shell header scroll spacings ([b1f5706](https://github.com/ho-nl/m2-pwa/commit/b1f570697bb0a9207129c9d24623b6069cf38ab5))
- app shell tests ([10b58bd](https://github.com/ho-nl/m2-pwa/commit/10b58bd1a0271ef5d90a51394a9efd194b285ed0))
- **app-shell:** pages after app shell changes ([fb74510](https://github.com/ho-nl/m2-pwa/commit/fb74510121f6124009db72ad2ddebf6459c52a85))
- base url not correct in app shell test ([a9624ea](https://github.com/ho-nl/m2-pwa/commit/a9624ea9fb514ab6644d4a9899794c20dc510e30))
- title offset ([2fef3ea](https://github.com/ho-nl/m2-pwa/commit/2fef3ea10ad98467062d4de397b40a83a86d7102))

# [2.111.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.110.3...@graphcommerce/magento-graphcms@2.111.0) (2021-08-26)

### Bug Fixes

- cart styling ([56feeee](https://github.com/ho-nl/m2-pwa/commit/56feeeeb85657d8abfec1e9613f12bf9d54686b5))
- **cart:** mobile styles ([aa601af](https://github.com/ho-nl/m2-pwa/commit/aa601af28ca7190ad90c33cc180fe63a28682519))
- empty cart title ([24ef4c1](https://github.com/ho-nl/m2-pwa/commit/24ef4c10bee208280c76563a78961b4305cbcf0c))
- use endicon for end icons ([9cfde76](https://github.com/ho-nl/m2-pwa/commit/9cfde76bbf8b189d9f777ae9cbf95b290bb760bf))

### Features

- **cart:** submit address from header ([6ae2a8d](https://github.com/ho-nl/m2-pwa/commit/6ae2a8d0f311ad8bae0198efafab5ae9d99040b6))

## [2.110.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.110.0...@graphcommerce/magento-graphcms@2.110.1) (2021-08-18)

### Bug Fixes

- display prices excl and incl tax ([0d41135](https://github.com/ho-nl/m2-pwa/commit/0d411350e4621928411c2800be6ea02c6125049a))

# [2.110.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.109.4...@graphcommerce/magento-graphcms@2.110.0) (2021-08-17)

### Bug Fixes

- **404-page:** prevent auto focus search form ([9e89ed3](https://github.com/ho-nl/m2-pwa/commit/9e89ed31ea192312641f46f01b69dc5f319331e8))
- **search-page:** hide menu and cart fabs when opened virtual keyboard mobile ([e728768](https://github.com/ho-nl/m2-pwa/commit/e7287680545f33079d0af47df1c6ea519b208978))
- **service-page:** hide drag indicator ([49b20eb](https://github.com/ho-nl/m2-pwa/commit/49b20ebcb53cf01401c3502affe0469b22484511))
- **sign-in-up:** form not showing up without refresh ([49782d9](https://github.com/ho-nl/m2-pwa/commit/49782d9893dc6d32e28247ebc25a2f6c7a37339e))
- **sign-in:** page hierarchy ([cde1f7a](https://github.com/ho-nl/m2-pwa/commit/cde1f7a96ca9111c718751731abf17b5d36fca0c))
- sticky filter drop shadow on scroll ([1d84c5e](https://github.com/ho-nl/m2-pwa/commit/1d84c5e699dc3dd7e46e0f567bec18ac95b73316))
- **switch-stores:** use sidebar drawer ([167518e](https://github.com/ho-nl/m2-pwa/commit/167518e3eeff7670a8f55d8d53103b90dc299817))

### Features

- left and sidebar drawers ([12a3b72](https://github.com/ho-nl/m2-pwa/commit/12a3b72edfad38a4b82701ec502f2f4d85c40e53))

## [2.109.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.109.1...@graphcommerce/magento-graphcms@2.109.2) (2021-08-13)

### Bug Fixes

- cart didn't use the AppShellTitle ([65a58c8](https://github.com/ho-nl/m2-pwa/commit/65a58c8dc7d39cd4c9cb31c4005828376c9e7ad1))
- ref couldn't be forwarded for ShippingAddressForm ([1f90f1a](https://github.com/ho-nl/m2-pwa/commit/1f90f1a30437d656fcf841026ad13bb2b45d831b))
- service, reviews/add didn't use AppShellTitle ([abc5778](https://github.com/ho-nl/m2-pwa/commit/abc57783fa7281c72bb4ca94c18c81de0fbf1315))

# [2.109.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.108.1...@graphcommerce/magento-graphcms@2.109.0) (2021-08-13)

### Features

- coupon form on payment page ([a163961](https://github.com/ho-nl/m2-pwa/commit/a1639617be756b357177fcce255cf662c5314499))

# [2.108.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.107.0...@graphcommerce/magento-graphcms@2.108.0) (2021-08-12)

### Bug Fixes

- account tweaks ([26ca295](https://github.com/ho-nl/m2-pwa/commit/26ca2955fe7a3ed509aaa7df98cbb4854d636179))
- disableMargin for minimal page shell footer ([4b72627](https://github.com/ho-nl/m2-pwa/commit/4b72627b844828e69aa8aef28d6dd67b1e107cfa))
- prevent re-render newsletter form ([aa180d2](https://github.com/ho-nl/m2-pwa/commit/aa180d27371e64f08d2965e27381d160fe3b3f81))

### Features

- sticky footer ([1547cab](https://github.com/ho-nl/m2-pwa/commit/1547cab694c0ebf7cf9acb57817a5fe5565f10fd))
- toggle subscribe customer to newsletter ([85688e4](https://github.com/ho-nl/m2-pwa/commit/85688e47b0571c28a2f967310915336b397fc120))

# [2.107.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.106.3...@graphcommerce/magento-graphcms@2.107.0) (2021-08-12)

### Features

- enable esmExternals ([c412e09](https://github.com/ho-nl/m2-pwa/commit/c412e09e74cd72f7745da9d62f6e8066c46a6336))
- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.106.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.106.1...@graphcommerce/magento-graphcms@2.106.2) (2021-08-09)

### Bug Fixes

- forward ref not used IconBlocks ([7af4df3](https://github.com/ho-nl/m2-pwa/commit/7af4df3b03cba0a7748614e1db49d86e8157b75f))
- page keeps reloading after each change in @graphcommerce/next-ui ([45ff0f5](https://github.com/ho-nl/m2-pwa/commit/45ff0f51d87e2100faefad93d5d224a8761e6e75))
- use SvgImageSimple for multiple areas ([bf851a6](https://github.com/ho-nl/m2-pwa/commit/bf851a6740e1956a78f457c2d90904ee2f65da2f))

### Reverts

- Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

## [2.106.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.106.0...@graphcommerce/magento-graphcms@2.106.1) (2021-08-09)

### Bug Fixes

- **image:** RowSpecialBanner/RowSwipableGrid doesn't download the right image ([276896f](https://github.com/ho-nl/m2-pwa/commit/276896fcd747efc3f25c9eb9813fe550d942b7fb))
- **review:** make sure chip is rendered correctly ([387df34](https://github.com/ho-nl/m2-pwa/commit/387df3456973290f9ce98d47823a7c71a6d95850))

# [2.106.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.105.0...@graphcommerce/magento-graphcms@2.106.0) (2021-08-06)

### Bug Fixes

- introduced SvgImageSimple and solve issue with review chips ([931d7fd](https://github.com/ho-nl/m2-pwa/commit/931d7fdcf0faa9d2264899b72e564138215b6bd8))
- replace captionOldOld with overline ([c19bc8a](https://github.com/ho-nl/m2-pwa/commit/c19bc8aee829432a8c72d0d4bc9d266110af65ab))
- **theme:** make breakpoints more in line with default material ui, only make lg/xl larger ([a061f5e](https://github.com/ho-nl/m2-pwa/commit/a061f5eda78a581d3ea0db1a8b071becd147667d))

### Features

- **theme:** restructured fonts and applied to home and category page ([6adf5f1](https://github.com/ho-nl/m2-pwa/commit/6adf5f11321bdfbf499125f1161c5abf5a1bfe4a))
- **theme:** restructured typography ([6fcddae](https://github.com/ho-nl/m2-pwa/commit/6fcddae6b1b54d071475c59c80a9f8d8a36294d5))

# [2.105.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.104.2...@graphcommerce/magento-graphcms@2.105.0) (2021-08-04)

### Bug Fixes

- add blogTags fragment ([8ab1ee8](https://github.com/ho-nl/m2-pwa/commit/8ab1ee874fa0174b15f2df5108cdca03599f1ef5))
- add Rows ([1445e88](https://github.com/ho-nl/m2-pwa/commit/1445e883bc4a051b1e7b05a48511558ac1c020dd))
- base mechanics on page relations ([345a682](https://github.com/ho-nl/m2-pwa/commit/345a68274dc7bc7f561a963d29fd9cd96907d4d1))
- blogTags ([eef3c86](https://github.com/ho-nl/m2-pwa/commit/eef3c86680846618b8408328874f4b9be8c01254))
- deploy ([f662c5c](https://github.com/ho-nl/m2-pwa/commit/f662c5cfbb26138208c272f27facacbd5f17be8d))
- relatedPages in BlogTags fragment ([8f87250](https://github.com/ho-nl/m2-pwa/commit/8f87250c6213039e3b95b6d0be334d6f64048b73))
- remove component specific Rows ([ed60655](https://github.com/ho-nl/m2-pwa/commit/ed60655ffca8e4578cf2627bf0a9428fd9a79337))
- staticPaths for blog/tagged/ ([5b170e4](https://github.com/ho-nl/m2-pwa/commit/5b170e43de9620bca2681e8459fa02b838d6fe45))

### Features

- add blog tags to page ([bdc31af](https://github.com/ho-nl/m2-pwa/commit/bdc31af37e1b348f409dd347fe0c88581b0cf375))
- add Chip with author and publish date ([20a28a5](https://github.com/ho-nl/m2-pwa/commit/20a28a5c4fdbb4cd883b69459e13ac481bdf3a64))
- change pageSize ([5cb824e](https://github.com/ho-nl/m2-pwa/commit/5cb824e23287eb86a8460f15ff4027af4ded407e))
- individual components for title and author ([e1962b6](https://github.com/ho-nl/m2-pwa/commit/e1962b6f873442dba731d288872a03af9dee2e1f))
- medium style layout ([b872843](https://github.com/ho-nl/m2-pwa/commit/b87284333b4c2753f3f126c9c5897a1008e5cdb0))
- standalone Blog Title ([311a468](https://github.com/ho-nl/m2-pwa/commit/311a4688833e054660c57e06dc98176163f3d14f))
- tagged list index meta ([93697f4](https://github.com/ho-nl/m2-pwa/commit/93697f4c93326d5d4b0f66db6e2bba1e17599b3a))
- view list of blogposts tagged ([9efe088](https://github.com/ho-nl/m2-pwa/commit/9efe0884d43e0dc63e614f625b81e6f8b3f1dc50))

## [2.104.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.104.1...@graphcommerce/magento-graphcms@2.104.2) (2021-08-03)

### Bug Fixes

- remove magento-category package from magento-product solving a circular dependency ([7379e6e](https://github.com/ho-nl/m2-pwa/commit/7379e6ede4829392b35008c17743181d9cac0636))

# [2.104.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.103.2...@graphcommerce/magento-graphcms@2.104.0) (2021-07-29)

### Bug Fixes

- add footer to MinimalPageShell on all pages ([698a012](https://github.com/ho-nl/m2-pwa/commit/698a012e17ffe0bbb845a4a593d798f8fff38aa3))
- **checkout:** succes page links /checkout/payment ([0927790](https://github.com/ho-nl/m2-pwa/commit/09277909f16e627dcebfacd435738495a7de8776))

### Features

- **braintree:** very basic implementation of credit card ([bb24f7e](https://github.com/ho-nl/m2-pwa/commit/bb24f7ec0577d018f0aff9b50de14f219e7504c5))

# [2.103.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.102.4...@graphcommerce/magento-graphcms@2.103.0) (2021-07-26)

### Features

- **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))

## [2.102.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.102.2...@graphcommerce/magento-graphcms@2.102.3) (2021-07-23)

### Bug Fixes

- **app-shell-header:** offset not always correctly set ([11a8907](https://github.com/ho-nl/m2-pwa/commit/11a890764be1ab4f6c584a5c8ca4e6620d0d73e5))
- **app-shell-header:** title offset top not correctly set ([c144309](https://github.com/ho-nl/m2-pwa/commit/c1443095317c1779074f3a4058f4041159c8e31b))
- top sheets to bottom sheets ([ae18115](https://github.com/ho-nl/m2-pwa/commit/ae1811590ca3c7b7eba6569f11129ce1c1d593f1))

## [2.102.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.102.1...@graphcommerce/magento-graphcms@2.102.2) (2021-07-23)

### Bug Fixes

- adjust imports to correct ones ([c6e3092](https://github.com/ho-nl/m2-pwa/commit/c6e3092569d1c49fe138b3810704da8e04acbbe2))
- make separate queries folder, create injectable for account and inject reviews ([5d82a5d](https://github.com/ho-nl/m2-pwa/commit/5d82a5d9162f687c2678cce215b77eedbaf1669e))
- simplify xl grid items ([af1e851](https://github.com/ho-nl/m2-pwa/commit/af1e85133f8c6681c97cd0d4f066844589dade38))
- wrong export for accountmenuitem ([5c6c21f](https://github.com/ho-nl/m2-pwa/commit/5c6c21f7759799b2725bff3d943d94fd9aef6820))

# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.101.3...@graphcommerce/magento-graphcms@2.102.0) (2021-07-21)

### Features

- **reviews:** no reviews written message ([8ade3db](https://github.com/ho-nl/m2-pwa/commit/8ade3dbe830f5a59af09c002dfa38fa5349a4b61))

## [2.101.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.101.2...@graphcommerce/magento-graphcms@2.101.3) (2021-07-21)

### Bug Fixes

- backdrop overlays ([7a3b7a6](https://github.com/ho-nl/m2-pwa/commit/7a3b7a6d9ef6dec8872c598f2c5674ed1c4775f2))
- product page app shell mobile view ([2d4e91a](https://github.com/ho-nl/m2-pwa/commit/2d4e91a741dc78e563eabcccad1ce183c0b41d85))
- shared key usage ([5664886](https://github.com/ho-nl/m2-pwa/commit/56648860f7b77cabc1f294f6cf41f9621b9ee94b))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.100.11...@graphcommerce/magento-graphcms@2.101.0) (2021-07-20)

### Bug Fixes

- blue back button ([0f134ff](https://github.com/ho-nl/m2-pwa/commit/0f134ffb249e3d7e4885244a6f79b7c4728f7f1b))
- cart fab box shadow animation ([4c73e42](https://github.com/ho-nl/m2-pwa/commit/4c73e423a920f6485f72b24141cccda010a35ab7))
- content header title typography ([1eb2dc9](https://github.com/ho-nl/m2-pwa/commit/1eb2dc94f191f3fb29a470b06a21b1c3bab7744b))
- **content-header:** icon sizes ([a037ec3](https://github.com/ho-nl/m2-pwa/commit/a037ec3dc3c87d54bb8aea0d2d6b78c05d9afc63))
- demo ([0f22408](https://github.com/ho-nl/m2-pwa/commit/0f22408a274721c949c6009362e46f7ffe3d2d90))
- header spacing ([967573a](https://github.com/ho-nl/m2-pwa/commit/967573a12f3651f2be47e4630dab737ccf8bf498))
- only cart should be fixed on scroll ([9c8f536](https://github.com/ho-nl/m2-pwa/commit/9c8f5366c53798b377dcf397822b0945774b1dce))
- search button on click type ([33a6a08](https://github.com/ho-nl/m2-pwa/commit/33a6a0826acf795750503b39bd0d224baa795a47))
- spacing consistency between app shells ([c57ad81](https://github.com/ho-nl/m2-pwa/commit/c57ad81a1784ca6737ccfa0d7d33c3a5d19d1654))

### Features

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

## [2.100.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphcms@2.100.10...@graphcommerce/magento-graphcms@2.100.11) (2021-07-20)

### Bug Fixes

- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
