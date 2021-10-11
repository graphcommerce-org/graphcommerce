# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.130.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.130.1...@graphcommerce/graphcommerce@2.130.2) (2021-10-11)


### Bug Fixes

* adjust animation speeds ([345e60d](https://github.com/ho-nl/m2-pwa/commit/345e60d93a16b98eda404fe1547a0e1c020eb0d4))
* **menu-fab:** animation duration ([5b9ece2](https://github.com/ho-nl/m2-pwa/commit/5b9ece293fb7e12663386f9f9cbc99bc4e22aaa9))





## [2.130.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.130.0...@graphcommerce/graphcommerce@2.130.1) (2021-10-11)


### Bug Fixes

* **framer-scroller:** dots should have a background ([8f2e1a1](https://github.com/ho-nl/m2-pwa/commit/8f2e1a1ffc9de3369938fe2f9e9f25f592739d8d))





# [2.130.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.129.0...@graphcommerce/graphcommerce@2.130.0) (2021-10-09)


### Bug Fixes

* clientSize.x was incorrect ([39d12c4](https://github.com/ho-nl/m2-pwa/commit/39d12c4b583b7806f943dbd08c31b2dd940cc74b))
* **framer-scroller:** pan snap does not work on mobile ([660f242](https://github.com/ho-nl/m2-pwa/commit/660f242a38558669fa896a74e14cafdd85069d57))
* **framer-slider:** route changes ([4cadbea](https://github.com/ho-nl/m2-pwa/commit/4cadbea3e494326377e74e2fa9370ab80f8d8c35))
* make sure the gallery never gets higher than 100% ([1eae8c7](https://github.com/ho-nl/m2-pwa/commit/1eae8c7cfb2a9e67f03f1e4e4db5c95213d2dbe0))
* poistioning on mobile ([bec497f](https://github.com/ho-nl/m2-pwa/commit/bec497fca426346b80b453a3871b9c66521a2161))
* **sidebar-gallery:** differentiate drag from click ([acd408e](https://github.com/ho-nl/m2-pwa/commit/acd408e400f8285e2b3a9105b4694d5fd839dd99))
* **sidebar-gallery:** push gallery to history one time ([2c45b64](https://github.com/ho-nl/m2-pwa/commit/2c45b64e171577f7b584662d56416eeae4a22554))
* **sidebar-gallery:** route handling ([1c3b8b1](https://github.com/ho-nl/m2-pwa/commit/1c3b8b1687b0bf637da6c88d2d9b30a734b98d11))
* **sidebar-gallery:** use fullscreen and fullscreen exit icons ([1328d22](https://github.com/ho-nl/m2-pwa/commit/1328d220030f766be2d4046abd87d45175e4fe38))
* use better URL handling and remove drag temporarily ([0b99387](https://github.com/ho-nl/m2-pwa/commit/0b993876280270320eef5301130c5cc3eb339ea9))


### Features

* **sidebar-gallery:** toggle with browser back buttons ([a2f804b](https://github.com/ho-nl/m2-pwa/commit/a2f804b0cedb98df8f6a7b197aeeeeda43c6b1ba))





# [2.129.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.128.0...@graphcommerce/graphcommerce@2.129.0) (2021-10-08)


### Bug Fixes

*  make sure we can useCartLock on the success page ([139349a](https://github.com/ho-nl/m2-pwa/commit/139349a73836c0c58c5d8000a801c912dbe23b3b))
* conditional hook in CartSummary ([780c5c1](https://github.com/ho-nl/m2-pwa/commit/780c5c140e03ea5f77ea9cf5409498ed853e772c))
* issue where the cart shippingMethod didn't have a value defined ([a1f27d1](https://github.com/ho-nl/m2-pwa/commit/a1f27d1bff01921ff2cf783394c2bb4a65285d17))
* **mollie:** make sure we're redirected to the success page ([316d2b2](https://github.com/ho-nl/m2-pwa/commit/316d2b2a99189f093e74db98521c27e8e7267dd4))
* SvgImageSimple should pass the layout prop ([a0b5c81](https://github.com/ho-nl/m2-pwa/commit/a0b5c818f93ba24a34c6ce8aa21f8af50bd05dd2))


### Features

* made empty success page when no cart is present and removed backbuttons ([1e29450](https://github.com/ho-nl/m2-pwa/commit/1e294500f9f1f2cfeab0de8bd8211ee517af5d8c))





# [2.128.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.127.4...@graphcommerce/graphcommerce@2.128.0) (2021-10-08)


### Bug Fixes

* **product-grid:** product title is not a link ([d5707f9](https://github.com/ho-nl/m2-pwa/commit/d5707f97a53a01c18db967db3420d78b1132c53c))
* **product-list-item:** add ripple effect ([cdb2b9a](https://github.com/ho-nl/m2-pwa/commit/cdb2b9a63f65e6c1e8c819e6a20aca75c6cc286a))


### Features

* **row-service-options:** show email and telephone number ([8291b25](https://github.com/ho-nl/m2-pwa/commit/8291b25b6e408c480eedbc5aa1353a99785e4df5))





## [2.127.4](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.127.3...@graphcommerce/graphcommerce@2.127.4) (2021-10-07)


### Bug Fixes

* always comment on pr when reporting bundle sizes ([86fabb0](https://github.com/ho-nl/m2-pwa/commit/86fabb0c213098c2414eb0fad367a47e47b3dc48))
* api build ([423564e](https://github.com/ho-nl/m2-pwa/commit/423564e23769298c98305edb89b8486265beb50b))
* **cart:** agreements didn't handle state updates properly ([4401ff9](https://github.com/ho-nl/m2-pwa/commit/4401ff96a410379805d89bb2fa711df2d8a8fad0))
* Form component added classes attribute ([269fd46](https://github.com/ho-nl/m2-pwa/commit/269fd4629cedcaab74043604ac21a4557b4e514f))
* make sure if no payment method is filled in we get an error shown ([a203e57](https://github.com/ho-nl/m2-pwa/commit/a203e570caad0732427a178e8e8b10b4a15d676b))
* make sure the CartAgreementsForm validates immediately ([eceacbb](https://github.com/ho-nl/m2-pwa/commit/eceacbb4803dd6e2701bf1835aa601c06ba4d6a3))





## [2.127.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.127.2...@graphcommerce/graphcommerce@2.127.3) (2021-10-07)


### Bug Fixes

* replace __DEV__ with proper variable for optimizing the bundle size ([9b03209](https://github.com/ho-nl/m2-pwa/commit/9b032095f618846d132c00b8dc14fbb1b09c6ed8))
* try to define the __DEV__ variable for better tree shaking ([465125d](https://github.com/ho-nl/m2-pwa/commit/465125dff36ac4d269f74ce3598d5257c3c1d801))





## [2.127.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.127.1...@graphcommerce/graphcommerce@2.127.2) (2021-10-06)


### Bug Fixes

* remove default orientation ([2260d03](https://github.com/ho-nl/m2-pwa/commit/2260d0312196a46171580d00d0ade4a3e7efa9e7))





## [2.127.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.127.0...@graphcommerce/graphcommerce@2.127.1) (2021-10-06)


### Bug Fixes

* cart fab alignment ([209ad30](https://github.com/ho-nl/m2-pwa/commit/209ad3027eff32e174c1774d21e9f33a3051a819))
* **cart-fab:** box shadow in safari ([4eb316d](https://github.com/ho-nl/m2-pwa/commit/4eb316dd0f2ab7ee2806a3acdb306af1eb72854b))
* **cart-fab:** positioning ([7bb31b4](https://github.com/ho-nl/m2-pwa/commit/7bb31b4bf6e663d14220aedaddf420b24d427b3a))
* **product-list-filters-container:** drop shadow fades in too fast ([2e8f848](https://github.com/ho-nl/m2-pwa/commit/2e8f84809baa3fe6c2861f8992f46b6a07842ec6))





# [2.127.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.126.0...@graphcommerce/graphcommerce@2.127.0) (2021-10-05)


### Features

* **checkout-shipping:** edit shipping address link ([b598008](https://github.com/ho-nl/m2-pwa/commit/b598008ffccb499fe0109ee557e08d557cf20d6e))





# [2.126.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.125.2...@graphcommerce/graphcommerce@2.126.0) (2021-10-04)


### Bug Fixes

* **blog:** use app shell title ([987bb15](https://github.com/ho-nl/m2-pwa/commit/987bb157c4064141b1c2978935e66cf47ae24ff0))
* **checkout-success:** go back to empty cart ([17af765](https://github.com/ho-nl/m2-pwa/commit/17af76504084e90d5a57ab42788155bcace3187d))
* **checkout-success:** remove clear current cart id ([aa15065](https://github.com/ho-nl/m2-pwa/commit/aa150655e1ee4dc70f0330cf6a7b58e9a00d1ac0))
* **payment:** payment button does nothing when all values are filled ([65834c9](https://github.com/ho-nl/m2-pwa/commit/65834c9de4fed71a1f6bbe1af94b2e3541b5bebc))


### Features

* sort payment methods by availability ([52f5d45](https://github.com/ho-nl/m2-pwa/commit/52f5d450a7a2fdec0c7eea9cd5d48336cb304138))





## [2.125.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.125.1...@graphcommerce/graphcommerce@2.125.2) (2021-10-04)


### Bug Fixes

* **full-page-shell:** header height consistency on mobile ([a18f7a3](https://github.com/ho-nl/m2-pwa/commit/a18f7a3f22b6b1b8e7029d17b2086827bcee48f2))
* **hero-banner:** too large top spacing ([0ad8499](https://github.com/ho-nl/m2-pwa/commit/0ad8499a1702caf8e121f38e1ccb70fba4f418db))
* **sheet-shell:** mobile border bottom gap ([70104d8](https://github.com/ho-nl/m2-pwa/commit/70104d88994c2324f415eec1efeeba21de7872b9))
* **sheet-shell:** mobile border bottom overlaps text ([54a50d3](https://github.com/ho-nl/m2-pwa/commit/54a50d335ade33a97d2c33ce68d62bfcc37f8f2e))





## [2.125.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.125.0...@graphcommerce/graphcommerce@2.125.1) (2021-10-04)


### Bug Fixes

* cart icon alignment ([8b75b40](https://github.com/ho-nl/m2-pwa/commit/8b75b40bcdecf6d43579ee824677bf1a03763157))
* **category-childeren:** scrollbar shown ([638e3ef](https://github.com/ho-nl/m2-pwa/commit/638e3efea3a537f90d23fb2f8953a62acb370288))
* **category-children:** scrollbar shown ([3ccc78b](https://github.com/ho-nl/m2-pwa/commit/3ccc78b329fa844c57bfeb2406c593d0533039d2))
* **icon-block:** render href ([738fd82](https://github.com/ho-nl/m2-pwa/commit/738fd82629dd3be92fe0cdd63ed8eeaa5d4886f6))
* **service:** align title ([c1d749c](https://github.com/ho-nl/m2-pwa/commit/c1d749c0ed6c8600085afd2d102c61771e2afc70))
* **shipping:** sort available shipping methods by availability ([27d13ab](https://github.com/ho-nl/m2-pwa/commit/27d13ab1a0d923197bb13557256307f60a243f4a))





# [2.125.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.124.10...@graphcommerce/graphcommerce@2.125.0) (2021-10-01)


### Features

* **sidebar-gallery:** close using esc key ([fd46fe1](https://github.com/ho-nl/m2-pwa/commit/fd46fe1029f436c1e0e04cbcc3b66deca4d1b0b6))





## [2.124.10](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.124.9...@graphcommerce/graphcommerce@2.124.10) (2021-09-30)


### Bug Fixes

* dependency cycle issues causes release version issues ([f9d82e3](https://github.com/ho-nl/m2-pwa/commit/f9d82e3bf152acaf90f9d5328bc3d020ca1c53d8))





## [2.124.8](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.124.7...@graphcommerce/graphcommerce@2.124.8) (2021-09-30)


### Bug Fixes

* **filter-range-type:** invalid filter value after browser back ([b1e0a78](https://github.com/ho-nl/m2-pwa/commit/b1e0a78bb92719fb0f23eef53053e825e78d7ed1))
* **filters:** only push first filter to the history ([bbe1ac5](https://github.com/ho-nl/m2-pwa/commit/bbe1ac5b629f8ed7798094d64a413d0c27519854))





## [2.124.7](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.124.6...@graphcommerce/graphcommerce@2.124.7) (2021-09-30)


### Bug Fixes

* .next folder doesn't always exist on vercel ([5f8f1a7](https://github.com/ho-nl/m2-pwa/commit/5f8f1a7c2c6690be113adfe2fef662c63781e91f))





## [2.124.6](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.124.5...@graphcommerce/graphcommerce@2.124.6) (2021-09-30)


### Bug Fixes

* with the latest version of graphql codegen the preresovled types inlined Maybe, make sure we reflect that ([7cb27b0](https://github.com/ho-nl/m2-pwa/commit/7cb27b04cbe31bee5ef4000d408f08bc9ac505c5))





## [2.124.5](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.124.4...@graphcommerce/graphcommerce@2.124.5) (2021-09-30)


### Bug Fixes

* braintree typescript warning ([8bb6a8a](https://github.com/ho-nl/m2-pwa/commit/8bb6a8a7bdd4d90cb1486d88263971143a571fa1))





## [2.124.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.124.2...@graphcommerce/graphcommerce@2.124.3) (2021-09-29)


### Bug Fixes

* make sure the mollie module doesn't start with magento- to prevent building from node moduels ([ed406b9](https://github.com/ho-nl/m2-pwa/commit/ed406b9f56bd8cb5df0463cc50e4b1e9a728d4ca))





## [2.124.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.124.1...@graphcommerce/graphcommerce@2.124.2) (2021-09-29)


### Bug Fixes

* cache dependencylist ([257da86](https://github.com/ho-nl/m2-pwa/commit/257da860c22a7134896e99e2fcf9f67c0ce99363))
* when deploying from inside the monorepo we need to build the other packages as well ([93b2491](https://github.com/ho-nl/m2-pwa/commit/93b2491d8b17bdd03962db532def4a91b35019f6))





## [2.124.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.124.0...@graphcommerce/graphcommerce@2.124.1) (2021-09-28)


### Bug Fixes

* do not build on install ([254e2a6](https://github.com/ho-nl/m2-pwa/commit/254e2a6f4b2a7e81f46466a0abe06ae2f3a79575))





# [2.124.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.123.0...@graphcommerce/graphcommerce@2.124.0) (2021-09-28)


### Features

* created withYarn1Scopes functionality so we don't rely on actual workspaces ([7e491ca](https://github.com/ho-nl/m2-pwa/commit/7e491ca2276028a8587f6cd88b98ee451755c3d0))





# [2.123.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.122.2...@graphcommerce/graphcommerce@2.123.0) (2021-09-28)


### Bug Fixes

* add to cart button ([8a69454](https://github.com/ho-nl/m2-pwa/commit/8a69454b1372a563020e1ef1b7c50363b8d29717))
* eslint not working ([68c76b3](https://github.com/ho-nl/m2-pwa/commit/68c76b3f4bc1f7dbf490b331e72f0d91afc634bf))
* withYarn1Workspaces is not a function ([a095bc9](https://github.com/ho-nl/m2-pwa/commit/a095bc9f0011fbe9180d0e1718f1b41e89a5f6d9))


### Features

* add postinstall commands to run properly on deploy ([d512ee3](https://github.com/ho-nl/m2-pwa/commit/d512ee3ba5c3a9573651ec5333595fe2f1aa141c))
* add typescript incremental builds ([948a9d9](https://github.com/ho-nl/m2-pwa/commit/948a9d92092aa0fa4466ca420cf32e59ce325828))
* check if NEXT_PUBLIC_GRAPHQL_ENDPOINT exists ([71460bd](https://github.com/ho-nl/m2-pwa/commit/71460bdc2abb524c24fed0a6d5d3651643ef9956))





## [2.122.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.122.1...@graphcommerce/graphcommerce@2.122.2) (2021-09-27)


### Bug Fixes

* build packages before releasing ([c4761cf](https://github.com/ho-nl/m2-pwa/commit/c4761cf6d1810c140fd56f6eac8fca922f8c0edc))





## [2.122.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.122.0...@graphcommerce/graphcommerce@2.122.1) (2021-09-27)


### Bug Fixes

* add warnings to next.config.js when .env variables are missing ([d9dffec](https://github.com/ho-nl/m2-pwa/commit/d9dffec8ebc9cb1c70ca5591cad5e42c9bbe30e6))





# [2.122.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.120.1...@graphcommerce/graphcommerce@2.122.0) (2021-09-27)


### Bug Fixes

* **account-addresses:** single address not shown ([798bb9c](https://github.com/ho-nl/m2-pwa/commit/798bb9ce2ae7347f161d1a7285e21a3aad0f835f))
* added product description to all product types ([7c0fcf5](https://github.com/ho-nl/m2-pwa/commit/7c0fcf552f8a937e54fde209f0a351d6e342274b))
* agreements positioning ([89c2dee](https://github.com/ho-nl/m2-pwa/commit/89c2dee1debeb84c8b2cd9abaac85f03759604c8))
* all disabled buttons have white text ([358114d](https://github.com/ho-nl/m2-pwa/commit/358114ddff5d7ffa51c30f6a6e7787e88d5e4c5c))
* also release the root package ([daa720c](https://github.com/ho-nl/m2-pwa/commit/daa720c393c5027ff25fa5c2d26e6852b7f5c34b))
* cart cache not up-to-date ([aae4d30](https://github.com/ho-nl/m2-pwa/commit/aae4d302e320475d28a356ec304ea6afb64c3080))
* **cart-summary:** spacings ([73b7379](https://github.com/ho-nl/m2-pwa/commit/73b7379731bd1fe21c27d9b12f29b518efe73dce))
* **chip-menu:** layout shift on open ([c65cf5b](https://github.com/ho-nl/m2-pwa/commit/c65cf5bc18864b5180aba3f2361399bd85967952))
* do not use ToggleButtonGroup, only use the ToggleButton ([5172f70](https://github.com/ho-nl/m2-pwa/commit/5172f709ee26122b0a8700afb4325f23cb9ba9b9))
* edit billing address updating state ([ecd9f48](https://github.com/ho-nl/m2-pwa/commit/ecd9f48ce313d8e7a698c06ff29b88231dc50168))
* **Form:** forms always have background ([1f3fa1e](https://github.com/ho-nl/m2-pwa/commit/1f3fa1e53a997b88512335dc344bff3fa24f6bc6))
* full text link ([1186248](https://github.com/ho-nl/m2-pwa/commit/1186248d47898649b2f06c63a78cf254396c7f60))
* ignore example directories when publishing ([620cbb2](https://github.com/ho-nl/m2-pwa/commit/620cbb2d8e68b727b8593e2e45702c4d12276d92))
* **message-snackbar:** close on action click ([146c232](https://github.com/ho-nl/m2-pwa/commit/146c232a3a0e78b2be68631b0461e7b4699b99e1))
* **my-account-order:** show carrier in order details ([45f2a1e](https://github.com/ho-nl/m2-pwa/commit/45f2a1e265e8dbe4e1e76fe8dbedb3b40ba693fa))
* **my-account-orders:** order item row image too large ([dfc7611](https://github.com/ho-nl/m2-pwa/commit/dfc76111e6bd7c33c616881892adcd29c18f907d))
* **order-details:** show shipping method ([36964a8](https://github.com/ho-nl/m2-pwa/commit/36964a85efa358cb4987f881b72598e48a2278f4))
* **orders:** show order number ([b2d9f27](https://github.com/ho-nl/m2-pwa/commit/b2d9f2758cb29966965964eca58d91896654e68b))
* placeholder cart fab is visible on hover ([00a7186](https://github.com/ho-nl/m2-pwa/commit/00a7186197b3e558c0afb40fa900c5951c4b9ba8))
* **product-description:** remove typography component ([b92a028](https://github.com/ho-nl/m2-pwa/commit/b92a0285fda09ae4ffe48d91150337438d08f3eb))
* **release:** authentication for lerna ([714a89d](https://github.com/ho-nl/m2-pwa/commit/714a89d0090032d29c36442de98ea963ecf00c2e))
* remove popover from configurable cart items ([90866a0](https://github.com/ho-nl/m2-pwa/commit/90866a07d43fae8fac1c633f123fb4c4d910a2a9))
* show short description on product page ([f51d39c](https://github.com/ho-nl/m2-pwa/commit/f51d39c3122e4e1523cfc066d5c0ca8a210879e4))
* **test:** no children found ([2ba74d8](https://github.com/ho-nl/m2-pwa/commit/2ba74d8364c9eb24418871b3cc62a4f509c403e8))
* top spacing ([486fdb0](https://github.com/ho-nl/m2-pwa/commit/486fdb0536e5f6b08f293ea442661d7ad7541717))
* versions ([b8b306c](https://github.com/ho-nl/m2-pwa/commit/b8b306c8f3a13415e441d0593c638ae2a3731cd6))


### Features

* added magento-newsletter package ([9b48b1b](https://github.com/ho-nl/m2-pwa/commit/9b48b1b4dc29f9ea3271f4a6370abba15dd8999c))
* **checkout:** checkout agreements checkboxes in checkout ([a8b4ddb](https://github.com/ho-nl/m2-pwa/commit/a8b4ddb3a9750c2b7ff86cd460e0ff7fc4cc0ad1))
* edit billing address on checkout payment step ([96a5719](https://github.com/ho-nl/m2-pwa/commit/96a5719437616006efb2588c3516d3f2608c1fb8))
* guest newsletter toggle ([c747aed](https://github.com/ho-nl/m2-pwa/commit/c747aed081b2c5c134e2be1bc4c32de2a5e6e220))
* **inline-account:** re-added the component ([c508d34](https://github.com/ho-nl/m2-pwa/commit/c508d341ca34daa26a6db13ead72f7f4bdc72160))
* **payment-agreements-form:** checkout agreements checkboxes ([13c8164](https://github.com/ho-nl/m2-pwa/commit/13c816499d220a2ce940672a95beca508b78ddc9))
* **react-hook-form:** updated readme ([aede77a](https://github.com/ho-nl/m2-pwa/commit/aede77ab6d30fe5ca47b9d08bbdadca9b371713c))
* read checkout policies in sidebar sheet ([3fb765e](https://github.com/ho-nl/m2-pwa/commit/3fb765e14a8cfaf0bb27acd8368926ac27ed6a4c))
* rename soxbase to magento-graphcms ([e363435](https://github.com/ho-nl/m2-pwa/commit/e3634350bffec27221f9b3d016789b2e5eda298d))
* renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of [@reachdigital](https://github.com/reachdigital) ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
* signup newsletter component ([7ee961d](https://github.com/ho-nl/m2-pwa/commit/7ee961ded34e9fe012faa7041e96b35fb44b1f35))





# [2.121.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.120.1...@graphcommerce/graphcommerce@2.121.0) (2021-09-27)


### Bug Fixes

* added product description to all product types ([7c0fcf5](https://github.com/ho-nl/m2-pwa/commit/7c0fcf5))
* also release the root package ([daa720c](https://github.com/ho-nl/m2-pwa/commit/daa720c))
* edit billing address updating state ([ecd9f48](https://github.com/ho-nl/m2-pwa/commit/ecd9f48))
* **account-addresses:** single address not shown ([798bb9c](https://github.com/ho-nl/m2-pwa/commit/798bb9c))
* **cart-summary:** spacings ([73b7379](https://github.com/ho-nl/m2-pwa/commit/73b7379))
* **chip-menu:** layout shift on open ([c65cf5b](https://github.com/ho-nl/m2-pwa/commit/c65cf5b))
* **Form:** forms always have background ([1f3fa1e](https://github.com/ho-nl/m2-pwa/commit/1f3fa1e))
* **message-snackbar:** close on action click ([146c232](https://github.com/ho-nl/m2-pwa/commit/146c232))
* **my-account-order:** show carrier in order details ([45f2a1e](https://github.com/ho-nl/m2-pwa/commit/45f2a1e))
* **my-account-orders:** order item row image too large ([dfc7611](https://github.com/ho-nl/m2-pwa/commit/dfc7611))
* **order-details:** show shipping method ([36964a8](https://github.com/ho-nl/m2-pwa/commit/36964a8))
* **orders:** show order number ([b2d9f27](https://github.com/ho-nl/m2-pwa/commit/b2d9f27))
* **product-description:** remove typography component ([b92a028](https://github.com/ho-nl/m2-pwa/commit/b92a028))
* **release:** authentication for lerna ([714a89d](https://github.com/ho-nl/m2-pwa/commit/714a89d))
* **test:** no children found ([2ba74d8](https://github.com/ho-nl/m2-pwa/commit/2ba74d8))
* agreements positioning ([89c2dee](https://github.com/ho-nl/m2-pwa/commit/89c2dee))
* all disabled buttons have white text ([358114d](https://github.com/ho-nl/m2-pwa/commit/358114d))
* cart cache not up-to-date ([aae4d30](https://github.com/ho-nl/m2-pwa/commit/aae4d30))
* do not use ToggleButtonGroup, only use the ToggleButton ([5172f70](https://github.com/ho-nl/m2-pwa/commit/5172f70))
* full text link ([1186248](https://github.com/ho-nl/m2-pwa/commit/1186248))
* placeholder cart fab is visible on hover ([00a7186](https://github.com/ho-nl/m2-pwa/commit/00a7186))
* remove popover from configurable cart items ([90866a0](https://github.com/ho-nl/m2-pwa/commit/90866a0))
* show short description on product page ([f51d39c](https://github.com/ho-nl/m2-pwa/commit/f51d39c))
* top spacing ([486fdb0](https://github.com/ho-nl/m2-pwa/commit/486fdb0))


### Features

* added magento-newsletter package ([9b48b1b](https://github.com/ho-nl/m2-pwa/commit/9b48b1b))
* edit billing address on checkout payment step ([96a5719](https://github.com/ho-nl/m2-pwa/commit/96a5719))
* guest newsletter toggle ([c747aed](https://github.com/ho-nl/m2-pwa/commit/c747aed))
* read checkout policies in sidebar sheet ([3fb765e](https://github.com/ho-nl/m2-pwa/commit/3fb765e))
* rename soxbase to magento-graphcms ([e363435](https://github.com/ho-nl/m2-pwa/commit/e363435))
* renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of [@reachdigital](https://github.com/reachdigital) ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4ce))
* **checkout:** checkout agreements checkboxes in checkout ([a8b4ddb](https://github.com/ho-nl/m2-pwa/commit/a8b4ddb))
* **inline-account:** re-added the component ([c508d34](https://github.com/ho-nl/m2-pwa/commit/c508d34))
* **payment-agreements-form:** checkout agreements checkboxes ([13c8164](https://github.com/ho-nl/m2-pwa/commit/13c8164))
* **react-hook-form:** updated readme ([aede77a](https://github.com/ho-nl/m2-pwa/commit/aede77a))
* signup newsletter component ([7ee961d](https://github.com/ho-nl/m2-pwa/commit/7ee961d))





## [2.120.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.120.0...@graphcommerce/graphcommerce@2.120.1) (2021-09-23)


### Bug Fixes

* make sure mollie only gets build optionally ([e5e2347](https://github.com/ho-nl/m2-pwa/commit/e5e23475e170dc2fc0c13103dfb8fbdb9009715f))





# [2.120.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.119.3...@graphcommerce/graphcommerce@2.120.0) (2021-09-22)


### Bug Fixes

* use gtm id directly from process.env ([1682834](https://github.com/ho-nl/m2-pwa/commit/16828342b0f432da5c7051b1b9834fdad1c58ec8))


### Features

* google tag manager integration ([6697639](https://github.com/ho-nl/m2-pwa/commit/6697639b479bd1f9efecf609db1e606a540fc24c))
* no gtm id present warning ([94cda8a](https://github.com/ho-nl/m2-pwa/commit/94cda8a30a3ec556d3e5484824fbf349e2e1e342))





## [2.119.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.119.2...@graphcommerce/graphcommerce@2.119.3) (2021-09-20)


### Bug Fixes

* header app shell margin bottom in some circumstances ([6030ba7](https://github.com/ho-nl/m2-pwa/commit/6030ba7d07619d0b877a9f557c3e14676c326c7a))





## [2.119.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.119.1...@graphcommerce/graphcommerce@2.119.2) (2021-09-11)


### Bug Fixes

* make sure we dont load all the category data into the apollo client cache ([ffc4e15](https://github.com/ho-nl/m2-pwa/commit/ffc4e15755741900b247a17e6606dc9eddc2aa0b))





# [2.119.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.118.0...@graphcommerce/graphcommerce@2.119.0) (2021-09-01)


### Bug Fixes

* **framer-slider:** prev/next buttons don't always show up correctly ([ba2510e](https://github.com/ho-nl/m2-pwa/commit/ba2510ea659344a2d71957eed396f4e5ce536a8c))
* **magento-product:** hide sorting options when there are no products ([c5e37d7](https://github.com/ho-nl/m2-pwa/commit/c5e37d709c570596994beafe5a6afccfa5704548))
* make sure we can actually observe items ([4767b2a](https://github.com/ho-nl/m2-pwa/commit/4767b2a1bb23fc6d2e445c10c96da0a666212c55))
* playwright can't find the place order button ([b1fda5b](https://github.com/ho-nl/m2-pwa/commit/b1fda5b3e403dad621aba8ed895427f2166bc985))
* sidebar gallery width ([7185850](https://github.com/ho-nl/m2-pwa/commit/71858500d5b62e1d2130d236247fc06fd80649f9))


### Features

* **framer-scroller:** add prev/next buttons to SidebarSlider ([00472e5](https://github.com/ho-nl/m2-pwa/commit/00472e5fe3c3c5408db358c0c78a3559cea902ca))





# [2.118.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.117.1...@graphcommerce/graphcommerce@2.118.0) (2021-09-01)


### Bug Fixes

* chipmenu styling ([dcdbbcc](https://github.com/ho-nl/m2-pwa/commit/dcdbbccceb2226de5067b14414f3d4ff5e016a5b))
* **framer-scroller:** center the prev/next buttons on the gallery ([234dc37](https://github.com/ho-nl/m2-pwa/commit/234dc37fc46f723410e9a844bbcb33cfe5d8a588))
* **framer-scroller:** check if the ref exists instead of throwing an exception ([9cdfa0d](https://github.com/ho-nl/m2-pwa/commit/9cdfa0dd749c59159ce8f6f53dbabbcdddab049c))
* **framer-scroller:** velocity of value was always 0 ([c314d8c](https://github.com/ho-nl/m2-pwa/commit/c314d8c06afe0d187576227355bb47c0bff1e2e0))
* **framer-utils:** reading of values didn't happen at the right moment, causing unnessary layout reflows ([b119262](https://github.com/ho-nl/m2-pwa/commit/b119262ffb2907a215f9f37f12ef6cf6f62fadcd))
* **framer-utils:** state wasn't directly set when initializing useMotionValueValue ([3560456](https://github.com/ho-nl/m2-pwa/commit/35604562a4a39fef3b5dc4c0305ce0753608d9e8))
* make sure we remove the scrollbar only when the animation completes ([aa629e0](https://github.com/ho-nl/m2-pwa/commit/aa629e06b7b13e4cd85332cd6dcfbe8ae973a7f5))


### Features

* **framer-scroller:** added the new slider to the product page ([3c6b726](https://github.com/ho-nl/m2-pwa/commit/3c6b7262fb6418798f828f4517ed097fd9734e96))
* **framer-scroller:** created an MotionImageAspect component to properly center and handle scorller resizes ([2eb117e](https://github.com/ho-nl/m2-pwa/commit/2eb117e6c135ea8e009c91f854e9f9ef8e7375c5))
* **framer-scroller:** implemented the scroller on all pages ([73fb518](https://github.com/ho-nl/m2-pwa/commit/73fb518eff74edb2b3212e892b3d8cc2b088011b))
* **framer-scroller:** option to hide scrollbar ([f6a8329](https://github.com/ho-nl/m2-pwa/commit/f6a8329d2f761956a9d7bdc5243de336aa2e5ad4))
* **framer-scroller:** package to implement scroll-snap handling with JS ([b3a279f](https://github.com/ho-nl/m2-pwa/commit/b3a279f8b4acb2b9de99004efe0459c534786bdd))
* **framer-scroller:** pagination dots ([6a5557d](https://github.com/ho-nl/m2-pwa/commit/6a5557d10d08661662eb476c5fe2296b558c1cb5))
* **image:** allow passing props to the picture component ([3425664](https://github.com/ho-nl/m2-pwa/commit/3425664f197974d2e9db048fc94d447b2d34c280))





# [2.117.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.116.0...@graphcommerce/graphcommerce@2.117.0) (2021-08-30)


### Bug Fixes

* **app-shell-header:** show fallbacktitle instead of back on back button when applicable ([27d7d7d](https://github.com/ho-nl/m2-pwa/commit/27d7d7d716265c856cd64d3f485f0227f99c5cd0))
* **use-back-link:** pop history after going back ([20d69ef](https://github.com/ho-nl/m2-pwa/commit/20d69eff868d53d07084e5d1f78819939a5f429c))


### Features

* **pageContext:** history prop ([9094551](https://github.com/ho-nl/m2-pwa/commit/909455146d159a839fa72046c15332fc763f315f))
* **use-back-link:** go back in history when links are identical ([9be8a05](https://github.com/ho-nl/m2-pwa/commit/9be8a050d418d2ef24bb6894c5946a1268883aba))





# [2.116.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.115.0...@graphcommerce/graphcommerce@2.116.0) (2021-08-27)


### Bug Fixes

* adjust header height ([d22310d](https://github.com/ho-nl/m2-pwa/commit/d22310dca282208c6d7020c6c27f8ba5be980e3c))
* app shell consistency ([e062c3d](https://github.com/ho-nl/m2-pwa/commit/e062c3d4af75c6bfe1ad7056dfb172277f1b01cb))
* app shell consistency wip ([be995ca](https://github.com/ho-nl/m2-pwa/commit/be995ca5c3e383b89fea3759186d53af4790e99b))
* app shell fixes ([1b13d0d](https://github.com/ho-nl/m2-pwa/commit/1b13d0d0d4b480ddc9712b4d298af2d81fb2b1d4))
* app shell fixes ([c3bddee](https://github.com/ho-nl/m2-pwa/commit/c3bddee6b878cd9d2183c4938df0824a6eca4f36))
* app shell header scroll spacings ([b1f5706](https://github.com/ho-nl/m2-pwa/commit/b1f570697bb0a9207129c9d24623b6069cf38ab5))
* app shell tests ([10b58bd](https://github.com/ho-nl/m2-pwa/commit/10b58bd1a0271ef5d90a51394a9efd194b285ed0))
* **app-shell-header:** hide divider ([34d183e](https://github.com/ho-nl/m2-pwa/commit/34d183e7ee13c3e6d76bc211d44398cb7e492d67))
* **app-shell:** pages after app shell changes ([fb74510](https://github.com/ho-nl/m2-pwa/commit/fb74510121f6124009db72ad2ddebf6459c52a85))
* base url not correct in app shell test ([a9624ea](https://github.com/ho-nl/m2-pwa/commit/a9624ea9fb514ab6644d4a9899794c20dc510e30))
* primary button height ([741279e](https://github.com/ho-nl/m2-pwa/commit/741279e1c92845f067af5ad63adec04b05936fcc))
* search page white background ([8676bfa](https://github.com/ho-nl/m2-pwa/commit/8676bfa30273b4d5f41b708b2ac45474d2e31e65))
* **sheet-shell-header:** adjust mobile height ([c4310ff](https://github.com/ho-nl/m2-pwa/commit/c4310fff4314aa0121906aa4694af32f77ff12c8))
* title offset ([2fef3ea](https://github.com/ho-nl/m2-pwa/commit/2fef3ea10ad98467062d4de397b40a83a86d7102))
* white space below divider on sheet shells ([1159f20](https://github.com/ho-nl/m2-pwa/commit/1159f20452b308f6301749492765af066ab3d673))


### Features

* **app-shell-title:** support typography variants ([74ed6a4](https://github.com/ho-nl/m2-pwa/commit/74ed6a4982bf6f43aa7f6b3771f919156653336c))
* **app-shell:** now consistent ([fb5b506](https://github.com/ho-nl/m2-pwa/commit/fb5b5062729002b508e888a4962f1b2578e5199b))





# [2.115.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.114.3...@graphcommerce/graphcommerce@2.115.0) (2021-08-26)


### Bug Fixes

* **button:** pill link not visible on mobile ([c4474f5](https://github.com/ho-nl/m2-pwa/commit/c4474f5cfe4dbb6b9aa795d7d175dbce053720d8))
* cart styling ([56feeee](https://github.com/ho-nl/m2-pwa/commit/56feeeeb85657d8abfec1e9613f12bf9d54686b5))
* **cart:** mobile styles ([aa601af](https://github.com/ho-nl/m2-pwa/commit/aa601af28ca7190ad90c33cc180fe63a28682519))
* empty cart title ([24ef4c1](https://github.com/ho-nl/m2-pwa/commit/24ef4c10bee208280c76563a78961b4305cbcf0c))
* use endicon for end icons ([9cfde76](https://github.com/ho-nl/m2-pwa/commit/9cfde76bbf8b189d9f777ae9cbf95b290bb760bf))


### Features

* **cart:** submit address from header ([6ae2a8d](https://github.com/ho-nl/m2-pwa/commit/6ae2a8d0f311ad8bae0198efafab5ae9d99040b6))





## [2.114.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.114.2...@graphcommerce/graphcommerce@2.114.3) (2021-08-24)


### Bug Fixes

* error message when no shipping method chosen ([f948ce1](https://github.com/ho-nl/m2-pwa/commit/f948ce19cbf46db8fd7e8115c93f4f7549ad4e64))





## [2.114.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.114.1...@graphcommerce/graphcommerce@2.114.2) (2021-08-19)


### Bug Fixes

* app shell sticky overlapping buttons on scroll ([7548b30](https://github.com/ho-nl/m2-pwa/commit/7548b30718290d976f4839f0096fea432f9a6b45))
* white space after footer on category page ([0fe13a4](https://github.com/ho-nl/m2-pwa/commit/0fe13a4daa284546487dfafcfa93daa8cbcd827b))





## [2.114.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.114.0...@graphcommerce/graphcommerce@2.114.1) (2021-08-18)


### Bug Fixes

* **cart:** display prices with taxes for specific store views ([fd25541](https://github.com/ho-nl/m2-pwa/commit/fd25541646c41111f5ea53822d244591cb08b199))
* display prices excl and incl tax ([0d41135](https://github.com/ho-nl/m2-pwa/commit/0d411350e4621928411c2800be6ea02c6125049a))
* make sure the session token gets deactivated when trying to merge carts when it cant ([2a9416b](https://github.com/ho-nl/m2-pwa/commit/2a9416b5c9efcd28a27f4183922ab419f62ea767))





# [2.114.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.113.4...@graphcommerce/graphcommerce@2.114.0) (2021-08-17)


### Bug Fixes

* **404-page:** prevent auto focus search form ([9e89ed3](https://github.com/ho-nl/m2-pwa/commit/9e89ed31ea192312641f46f01b69dc5f319331e8))
* account drawer not animating ([8001ab5](https://github.com/ho-nl/m2-pwa/commit/8001ab5bff6b62f676cf7b821f287b20ff767a35))
* **search-page:** hide menu and cart fabs when opened virtual keyboard mobile ([e728768](https://github.com/ho-nl/m2-pwa/commit/e7287680545f33079d0af47df1c6ea519b208978))
* **service-page:** hide drag indicator ([49b20eb](https://github.com/ho-nl/m2-pwa/commit/49b20ebcb53cf01401c3502affe0469b22484511))
* **sign-in-up:** form not showing up without refresh ([49782d9](https://github.com/ho-nl/m2-pwa/commit/49782d9893dc6d32e28247ebc25a2f6c7a37339e))
* **sign-in:** page hierarchy ([cde1f7a](https://github.com/ho-nl/m2-pwa/commit/cde1f7a96ca9111c718751731abf17b5d36fca0c))
* sticky filter drop shadow on scroll ([1d84c5e](https://github.com/ho-nl/m2-pwa/commit/1d84c5e699dc3dd7e46e0f567bec18ac95b73316))
* **switch-stores:** use sidebar drawer ([167518e](https://github.com/ho-nl/m2-pwa/commit/167518e3eeff7670a8f55d8d53103b90dc299817))
* unused swatches should not show up ([86a06fb](https://github.com/ho-nl/m2-pwa/commit/86a06fb3a7e0232611b8bb4971cadbcfd94ae525))


### Features

* left and sidebar drawers ([12a3b72](https://github.com/ho-nl/m2-pwa/commit/12a3b72edfad38a4b82701ec502f2f4d85c40e53))





## [2.113.4](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.113.3...@graphcommerce/graphcommerce@2.113.4) (2021-08-17)


### Bug Fixes

* **playwright:** checkout button was renamed ([09e5b79](https://github.com/ho-nl/m2-pwa/commit/09e5b79333708cfac04232d8071d1dad72968297))
* **playwright:** set a reasonable timeout so playwright doesnt run indefinitely ([9f58d7a](https://github.com/ho-nl/m2-pwa/commit/9f58d7ae1178a57d4afe210071637a4e8bd75754))





## [2.113.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.113.2...@graphcommerce/graphcommerce@2.113.3) (2021-08-13)


### Bug Fixes

* **cart-item-summary:** remove unnecessary animate presence ([95a0750](https://github.com/ho-nl/m2-pwa/commit/95a0750a3d27fa206a7f88635cbfbcfd8034957c))
* **cart-item-summary:** thumbnail image bottom spacing ([f761a42](https://github.com/ho-nl/m2-pwa/commit/f761a4221f65f3c8897cc36298ed973bccbd3266))





## [2.113.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.113.1...@graphcommerce/graphcommerce@2.113.2) (2021-08-13)


### Bug Fixes

* cart didn't use the AppShellTitle ([65a58c8](https://github.com/ho-nl/m2-pwa/commit/65a58c8dc7d39cd4c9cb31c4005828376c9e7ad1))
* ref couldn't be forwarded for ShippingAddressForm ([1f90f1a](https://github.com/ho-nl/m2-pwa/commit/1f90f1a30437d656fcf841026ad13bb2b45d831b))
* service, reviews/add didn't use AppShellTitle ([abc5778](https://github.com/ho-nl/m2-pwa/commit/abc57783fa7281c72bb4ca94c18c81de0fbf1315))





# [2.113.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.112.1...@graphcommerce/graphcommerce@2.113.0) (2021-08-13)


### Features

* coupon form on payment page ([a163961](https://github.com/ho-nl/m2-pwa/commit/a1639617be756b357177fcce255cf662c5314499))





# [2.112.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.111.0...@graphcommerce/graphcommerce@2.112.0) (2021-08-13)


### Bug Fixes

* **mesh:** add postinstall step to make sure the mesh is build at least once ([ff46ca8](https://github.com/ho-nl/m2-pwa/commit/ff46ca8ef481c4104823312013eb3810477bcace))
* **mesh:** compilation errors while esmExternals is used, disable for now ([8a98b34](https://github.com/ho-nl/m2-pwa/commit/8a98b34b3fa10aaa896455c292ccc429f7f9e752))


### Features

* **mesh:** use mesh with build version with increased stability/performance ([63863f3](https://github.com/ho-nl/m2-pwa/commit/63863f3a2df4d596819b85f3cf736c7f52f828c1))





# [2.111.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.110.0...@graphcommerce/graphcommerce@2.111.0) (2021-08-12)


### Bug Fixes

* account sizing ([ff8eb08](https://github.com/ho-nl/m2-pwa/commit/ff8eb08fb8ef0e08be00a3abac1582799ec9d553))
* account tweaks ([26ca295](https://github.com/ho-nl/m2-pwa/commit/26ca2955fe7a3ed509aaa7df98cbb4854d636179))
* disableMargin for minimal page shell footer ([4b72627](https://github.com/ho-nl/m2-pwa/commit/4b72627b844828e69aa8aef28d6dd67b1e107cfa))
* grid blowout on homepage ([8c0e225](https://github.com/ho-nl/m2-pwa/commit/8c0e225a629841e4a391a1edbc0614fc30789ba6))
* prevent re-render newsletter form ([aa180d2](https://github.com/ho-nl/m2-pwa/commit/aa180d27371e64f08d2965e27381d160fe3b3f81))
* remove switch margin right ([5aaa609](https://github.com/ho-nl/m2-pwa/commit/5aaa609d28a679d7b5f0a746dc8f34b5f6591e39))


### Features

* sticky footer ([1547cab](https://github.com/ho-nl/m2-pwa/commit/1547cab694c0ebf7cf9acb57817a5fe5565f10fd))
* toggle subscribe customer to newsletter ([85688e4](https://github.com/ho-nl/m2-pwa/commit/85688e47b0571c28a2f967310915336b397fc120))





# [2.110.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.109.0...@graphcommerce/graphcommerce@2.110.0) (2021-08-12)


### Bug Fixes

* remove coupon form style was too large ([30df274](https://github.com/ho-nl/m2-pwa/commit/30df274ecdffdcebd76710a5304d6fa248e81211))
* small icon size was too large ([61a4bc7](https://github.com/ho-nl/m2-pwa/commit/61a4bc72ad88a5df764d100a78ba26635c35e035))


### Features

* enable esmExternals ([c412e09](https://github.com/ho-nl/m2-pwa/commit/c412e09e74cd72f7745da9d62f6e8066c46a6336))
* upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))





# [2.109.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.108.2...@graphcommerce/graphcommerce@2.109.0) (2021-08-11)


### Features

* added Yarn install to base instruction ([b13374f](https://github.com/ho-nl/m2-pwa/commit/b13374f25602f2eee5b7996800fc2699afc23762))





## [2.108.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.108.1...@graphcommerce/graphcommerce@2.108.2) (2021-08-09)


### Bug Fixes

* **account:** continue button wasn't visible when loading the page ([c33fdc8](https://github.com/ho-nl/m2-pwa/commit/c33fdc8675ddf5f5fa5b57cb7ec07be3a93f0b30))
* fast refresh will use a browser load instead of a nextjs load ([3d018d1](https://github.com/ho-nl/m2-pwa/commit/3d018d1cfb21423419c29e7191150c0e898b6b25))
* forward ref not used IconBlocks ([7af4df3](https://github.com/ho-nl/m2-pwa/commit/7af4df3b03cba0a7748614e1db49d86e8157b75f))
* page keeps reloading after each change in @graphcommerce/next-ui ([45ff0f5](https://github.com/ho-nl/m2-pwa/commit/45ff0f51d87e2100faefad93d5d224a8761e6e75))
* SvgSimpleImage sizing didn't use rem ([1ba07a5](https://github.com/ho-nl/m2-pwa/commit/1ba07a5694bd60ad3cee2e8102814643d2a7c79d))
* use semantically correct components for menufab ([0196b29](https://github.com/ho-nl/m2-pwa/commit/0196b29523b3f49294dde32d96b348d100de5fa8))
* use SvgImageSimple for multiple areas ([bf851a6](https://github.com/ho-nl/m2-pwa/commit/bf851a6740e1956a78f457c2d90904ee2f65da2f))


### Reverts

* Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))





## [2.108.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.108.0...@graphcommerce/graphcommerce@2.108.1) (2021-08-09)


### Bug Fixes

* **image:** do not report when image isn't rendered yet ([5aa08ef](https://github.com/ho-nl/m2-pwa/commit/5aa08efc1eade69f53e1645c37fcb0632d83bc5e))
* **image:** RowSpecialBanner/RowSwipableGrid doesn't download the right image ([276896f](https://github.com/ho-nl/m2-pwa/commit/276896fcd747efc3f25c9eb9813fe550d942b7fb))
* make fonts more default ([cba1d90](https://github.com/ho-nl/m2-pwa/commit/cba1d90578db33d3458c126bf4932312eed05271))
* product image alt tag was the URL ([e02c743](https://github.com/ho-nl/m2-pwa/commit/e02c74341be195e90fa290fc6ff54a4a44c29bed))
* **review:** make sure chip is rendered correctly ([387df34](https://github.com/ho-nl/m2-pwa/commit/387df3456973290f9ce98d47823a7c71a6d95850))





# [2.108.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.107.0...@graphcommerce/graphcommerce@2.108.0) (2021-08-06)


### Bug Fixes

* introduced SvgImageSimple and solve issue with review chips ([931d7fd](https://github.com/ho-nl/m2-pwa/commit/931d7fdcf0faa9d2264899b72e564138215b6bd8))
* replace captionOldOld with overline ([c19bc8a](https://github.com/ho-nl/m2-pwa/commit/c19bc8aee829432a8c72d0d4bc9d266110af65ab))
* **theme:** make breakpoints more in line with default material ui, only make lg/xl larger ([a061f5e](https://github.com/ho-nl/m2-pwa/commit/a061f5eda78a581d3ea0db1a8b071becd147667d))


### Features

* **theme:** restructured fonts and applied to home and category page ([6adf5f1](https://github.com/ho-nl/m2-pwa/commit/6adf5f11321bdfbf499125f1161c5abf5a1bfe4a))
* **theme:** restructured typography ([6fcddae](https://github.com/ho-nl/m2-pwa/commit/6fcddae6b1b54d071475c59c80a9f8d8a36294d5))





# [2.107.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.106.2...@graphcommerce/graphcommerce@2.107.0) (2021-08-04)


### Bug Fixes

* add blogTags fragment ([8ab1ee8](https://github.com/ho-nl/m2-pwa/commit/8ab1ee874fa0174b15f2df5108cdca03599f1ef5))
* add Rows ([1445e88](https://github.com/ho-nl/m2-pwa/commit/1445e883bc4a051b1e7b05a48511558ac1c020dd))
* add types ([18dac42](https://github.com/ho-nl/m2-pwa/commit/18dac421042e4050407987b33eae0bf33e2f6e12))
* base mechanics on page relations ([345a682](https://github.com/ho-nl/m2-pwa/commit/345a68274dc7bc7f561a963d29fd9cd96907d4d1))
* blogTags ([eef3c86](https://github.com/ho-nl/m2-pwa/commit/eef3c86680846618b8408328874f4b9be8c01254))
* bottom sheet is not properly sized when scrolled ([93a1dc4](https://github.com/ho-nl/m2-pwa/commit/93a1dc40c37de74a8223657add77c51d51a24d92))
* cart item image sizes ([e7c860c](https://github.com/ho-nl/m2-pwa/commit/e7c860c785e172b9275e1a00c8b51509d6b297a8))
* compact text input number ([8999053](https://github.com/ho-nl/m2-pwa/commit/899905364808d6ea6ef257e948c68dc3851717a6))
* coupon stylign ([796bbb2](https://github.com/ho-nl/m2-pwa/commit/796bbb2ad5eda6dc9c5aa37034586705b24a0023))
* **coupon:** applying coupon doesnt change totals ([5e4d768](https://github.com/ho-nl/m2-pwa/commit/5e4d768e19471b527da92cd46c313b59df9ca8cb))
* deploy ([f662c5c](https://github.com/ho-nl/m2-pwa/commit/f662c5cfbb26138208c272f27facacbd5f17be8d))
* image height in grid ([e95fe1a](https://github.com/ho-nl/m2-pwa/commit/e95fe1a613e2047ca9aae54ea413c592eba19bf3))
* image height on blog view ([2f8aaa3](https://github.com/ho-nl/m2-pwa/commit/2f8aaa32af3d4d8c4e3412c3b4dcab5485a0504f))
* playwright timeout ([af21611](https://github.com/ho-nl/m2-pwa/commit/af2161119b4ea83edd27ce7238ebca70368e8b85))
* relatedPages in BlogTags fragment ([8f87250](https://github.com/ho-nl/m2-pwa/commit/8f87250c6213039e3b95b6d0be334d6f64048b73))
* remove component specific Row ([fcad430](https://github.com/ho-nl/m2-pwa/commit/fcad430ba01b215e77abb2c1ae01071a8ea1ec55))
* remove component specific Rows ([ed60655](https://github.com/ho-nl/m2-pwa/commit/ed60655ffca8e4578cf2627bf0a9428fd9a79337))
* staticPaths for blog/tagged/ ([5b170e4](https://github.com/ho-nl/m2-pwa/commit/5b170e43de9620bca2681e8459fa02b838d6fe45))
* tags styling ([1a4bcf2](https://github.com/ho-nl/m2-pwa/commit/1a4bcf2e339647cc93120ea9f951253a4e138142))


### Features

* add blog tags to page ([bdc31af](https://github.com/ho-nl/m2-pwa/commit/bdc31af37e1b348f409dd347fe0c88581b0cf375))
* add Chip with author and publish date ([20a28a5](https://github.com/ho-nl/m2-pwa/commit/20a28a5c4fdbb4cd883b69459e13ac481bdf3a64))
* change pageSize ([5cb824e](https://github.com/ho-nl/m2-pwa/commit/5cb824e23287eb86a8460f15ff4027af4ded407e))
* individual components for title and author ([e1962b6](https://github.com/ho-nl/m2-pwa/commit/e1962b6f873442dba731d288872a03af9dee2e1f))
* medium style layout ([b872843](https://github.com/ho-nl/m2-pwa/commit/b87284333b4c2753f3f126c9c5897a1008e5cdb0))
* standalone Blog Title ([311a468](https://github.com/ho-nl/m2-pwa/commit/311a4688833e054660c57e06dc98176163f3d14f))
* tagged list index meta ([93697f4](https://github.com/ho-nl/m2-pwa/commit/93697f4c93326d5d4b0f66db6e2bba1e17599b3a))
* view list of blogposts tagged ([9efe088](https://github.com/ho-nl/m2-pwa/commit/9efe0884d43e0dc63e614f625b81e6f8b3f1dc50))





## [2.106.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.106.1...@graphcommerce/graphcommerce@2.106.2) (2021-08-03)


### Bug Fixes

* coupon animations, spacing, rippl;ie ([cef3a08](https://github.com/ho-nl/m2-pwa/commit/cef3a08d0545947518873c5257c59fc1b98f1a21))
* discount error when removing a discount ([bb6fae3](https://github.com/ho-nl/m2-pwa/commit/bb6fae3ccee694d6a19d9de01febd4cc0166b49c))
* footer spacing missing ([6198665](https://github.com/ho-nl/m2-pwa/commit/61986653411dda9cb70ea15dd2d74ef1d48c2721))
* index page video and image overlay fix ([53c9d70](https://github.com/ho-nl/m2-pwa/commit/53c9d70bae1229c44f6a45730abe47482d0b9ac2))
* janky animation for last block on homepage ([a572986](https://github.com/ho-nl/m2-pwa/commit/a572986d87ee450badf96ef6608f75f30f71ed5b))
* magento-customer circular dependency ([57052d5](https://github.com/ho-nl/m2-pwa/commit/57052d504c488ee15b22aa204e50fa61a8ff6cae))
* remove magento-category package from magento-product solving a circular dependency ([7379e6e](https://github.com/ho-nl/m2-pwa/commit/7379e6ede4829392b35008c17743181d9cac0636))
* spacing on message snackbar ([0899321](https://github.com/ho-nl/m2-pwa/commit/0899321a3ea74a2d4c714e2dbe17c785a07dfc11))


### Reverts

* Revert "style: coupon input conform design" ([3ac7182](https://github.com/ho-nl/m2-pwa/commit/3ac7182eb6bb7c86ccba6464d1f206dc30a5a1da))
* Revert "style: coupon accordion icon/button alignment" ([165f91c](https://github.com/ho-nl/m2-pwa/commit/165f91c8f0e587ea26bcf441f48a6a13df74891c))





## [2.106.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.106.0...@graphcommerce/graphcommerce@2.106.1) (2021-08-02)


### Bug Fixes

* disappearing asset with zIndex -1 ([44956e5](https://github.com/ho-nl/m2-pwa/commit/44956e5d0b57a62322033395d378d0e4788454b1))





# [2.106.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.105.1...@graphcommerce/graphcommerce@2.106.0) (2021-07-29)


### Bug Fixes

* add footer to MinimalPageShell on all pages ([698a012](https://github.com/ho-nl/m2-pwa/commit/698a012e17ffe0bbb845a4a593d798f8fff38aa3))
* **checkout:** succes page links /checkout/payment ([0927790](https://github.com/ho-nl/m2-pwa/commit/09277909f16e627dcebfacd435738495a7de8776))
* duplicate key error when multiple errors of the same error occur ([f2c5bc0](https://github.com/ho-nl/m2-pwa/commit/f2c5bc040c1e9cc1340f67c68460b8fe42230659))
* paymentDone removed in favor of a more simple clearCart method ([5314f77](https://github.com/ho-nl/m2-pwa/commit/5314f7752c2f75a55dcd926bfc26607124561e5d))
* **react-hook-form:** validate if the previous request succeeds before moving on to the next request ([1985d09](https://github.com/ho-nl/m2-pwa/commit/1985d0938cd509532fa3b6bc801a3399c2baae09))


### Features

* **braintree:** very basic implementation of credit card ([bb24f7e](https://github.com/ho-nl/m2-pwa/commit/bb24f7ec0577d018f0aff9b50de14f219e7504c5))





# [2.105.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.104.0...@graphcommerce/graphcommerce@2.105.0) (2021-07-28)


### Bug Fixes

* **braintree:** allow for proper initialization of braintree client libraries ([af87d1c](https://github.com/ho-nl/m2-pwa/commit/af87d1ccde1378127b9ef76b197d3946a9c7ca92))
* buttons reporting errors all over the place ([0fa9099](https://github.com/ho-nl/m2-pwa/commit/0fa9099671659094f990449d3286e5216fce6a51))
* playwright ([57098a5](https://github.com/ho-nl/m2-pwa/commit/57098a56f50f175cc753339aeba7c577288e20d6))
* **playwright:** github action missed graphql-codegen modules ([aca35d8](https://github.com/ho-nl/m2-pwa/commit/aca35d8a212f9a8ef940625773197a08d3e274f0))


### Features

* **eslint:** no-relative-packages, prevent importing other packages by relative paths ([b3d23b0](https://github.com/ho-nl/m2-pwa/commit/b3d23b0217f808bb251ecaf67ccc618f9a10eefe))





# [2.104.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.103.2...@graphcommerce/graphcommerce@2.104.0) (2021-07-26)


### Bug Fixes

* playwright.ts files error ([4296f64](https://github.com/ho-nl/m2-pwa/commit/4296f648b11ea2a01e220cc0cbe1f6114e83e747))
* **playwright:** install dependencies ([50fa562](https://github.com/ho-nl/m2-pwa/commit/50fa562ffbd4755d02792d296a40c035564e5dc7))
* try and use the right url to test ([39180c3](https://github.com/ho-nl/m2-pwa/commit/39180c3c98f49dfd3e233e389f639bfecd742013))


### Features

* **playwright:** add github action ([0ef1094](https://github.com/ho-nl/m2-pwa/commit/0ef109400488869b40e1cc973effeb5976a2adb9))
* **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))





## [2.103.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.103.1...@graphcommerce/graphcommerce@2.103.2) (2021-07-26)


### Bug Fixes

* **full-page-shell:** fabs not clickable ([2c8d7f9](https://github.com/ho-nl/m2-pwa/commit/2c8d7f9529e83ac08d4fd758547379b72eb2f3d1))





## [2.103.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.103.0...@graphcommerce/graphcommerce@2.103.1) (2021-07-23)


### Bug Fixes

* **app-shell-header:** offset not always correctly set ([11a8907](https://github.com/ho-nl/m2-pwa/commit/11a890764be1ab4f6c584a5c8ca4e6620d0d73e5))
* **app-shell-header:** title offset top not correctly set ([c144309](https://github.com/ho-nl/m2-pwa/commit/c1443095317c1779074f3a4058f4041159c8e31b))
* category hero nav margin top ([31f8dee](https://github.com/ho-nl/m2-pwa/commit/31f8deed1d545d78bb856d4cfdfe0c7ec8671308))
* top sheets to bottom sheets ([ae18115](https://github.com/ho-nl/m2-pwa/commit/ae1811590ca3c7b7eba6569f11129ce1c1d593f1))





# [2.103.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.102.1...@graphcommerce/graphcommerce@2.103.0) (2021-07-23)


### Bug Fixes

* adjust imports to correct ones ([c6e3092](https://github.com/ho-nl/m2-pwa/commit/c6e3092569d1c49fe138b3810704da8e04acbbe2))
* customer-order folder structure ([b7fabd1](https://github.com/ho-nl/m2-pwa/commit/b7fabd12014b2925d0b89c21f58e9974ce1c8b40))
* make separate queries folder, create injectable for account and inject reviews ([5d82a5d](https://github.com/ho-nl/m2-pwa/commit/5d82a5d9162f687c2678cce215b77eedbaf1669e))
* missing NoOrdersFound export ([81e1177](https://github.com/ho-nl/m2-pwa/commit/81e1177dfa6347b310ec5cf4a7085edec7c86497))
* move trackinglink to order package ([1ddf923](https://github.com/ho-nl/m2-pwa/commit/1ddf9235a9ee0e5cda8f657de2ebb559836278ec))
* simplify xl grid items ([af1e851](https://github.com/ho-nl/m2-pwa/commit/af1e85133f8c6681c97cd0d4f066844589dade38))
* versions of @graphcommerce/magento-order package ([28c41a6](https://github.com/ho-nl/m2-pwa/commit/28c41a626c8131ef46be275778872e2a19f6c7b9))
* wrong export for accountmenuitem ([5c6c21f](https://github.com/ho-nl/m2-pwa/commit/5c6c21f7759799b2725bff3d943d94fd9aef6820))


### Features

* setup magento-order package ([7995c56](https://github.com/ho-nl/m2-pwa/commit/7995c56b73d2e52cfb61cc7e6ddf32e77bcab50f))





## [2.102.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.102.0...@graphcommerce/graphcommerce@2.102.1) (2021-07-21)


### Bug Fixes

* header spacings ([f00462f](https://github.com/ho-nl/m2-pwa/commit/f00462f9abb61a54552c96dbed35ef708fe05608))





# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.101.4...@graphcommerce/graphcommerce@2.102.0) (2021-07-21)


### Bug Fixes

* pagination markup ([0ab7707](https://github.com/ho-nl/m2-pwa/commit/0ab7707aa4cbf49c5df1da3e806641a840ec2aff))
* write review button mobile styles ([8f6b883](https://github.com/ho-nl/m2-pwa/commit/8f6b883fa0a513f84b7c6d8ed376b0e8d4b8a3bd))


### Features

* **reviews:** no reviews written message ([8ade3db](https://github.com/ho-nl/m2-pwa/commit/8ade3dbe830f5a59af09c002dfa38fa5349a4b61))





## [2.101.4](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.101.3...@graphcommerce/graphcommerce@2.101.4) (2021-07-21)


### Bug Fixes

* backdrop overlays ([7a3b7a6](https://github.com/ho-nl/m2-pwa/commit/7a3b7a6d9ef6dec8872c598f2c5674ed1c4775f2))
* product page app shell mobile view ([2d4e91a](https://github.com/ho-nl/m2-pwa/commit/2d4e91a741dc78e563eabcccad1ce183c0b41d85))
* shared key usage ([5664886](https://github.com/ho-nl/m2-pwa/commit/56648860f7b77cabc1f294f6cf41f9621b9ee94b))
* unresponsive back button ([91d66d7](https://github.com/ho-nl/m2-pwa/commit/91d66d762281ef9e9ffe800bb68530073a3d76f1))





## [2.101.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.101.2...@graphcommerce/graphcommerce@2.101.3) (2021-07-21)


### Bug Fixes

* scrollbar layout shift when using layered nav ([f51f285](https://github.com/ho-nl/m2-pwa/commit/f51f28572e1f0116ef46869bd3eb988585e0d5b9))





## [2.101.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.101.1...@graphcommerce/graphcommerce@2.101.2) (2021-07-20)


### Bug Fixes

* apollo server ([43c3535](https://github.com/ho-nl/m2-pwa/commit/43c3535fe26ab9c7b97be8feacba34794bb3fa20))





# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.100.14...@graphcommerce/graphcommerce@2.101.0) (2021-07-20)


### Bug Fixes

* back button behavior ([59f7b20](https://github.com/ho-nl/m2-pwa/commit/59f7b2047194c3506037fc88d791302c7c4a1a69))
* big indicator on mobile ([2204f9d](https://github.com/ho-nl/m2-pwa/commit/2204f9d219e79af29acdd2db643df06184ae3af5))
* blue back button ([0f134ff](https://github.com/ho-nl/m2-pwa/commit/0f134ffb249e3d7e4885244a6f79b7c4728f7f1b))
* cart fab box shadow animation ([4c73e42](https://github.com/ho-nl/m2-pwa/commit/4c73e423a920f6485f72b24141cccda010a35ab7))
* close overlay using esc key ([c74940f](https://github.com/ho-nl/m2-pwa/commit/c74940f7c44405ff958ec3e9ceb3f998d98ce35d))
* **conten-header:** remove back button box shadow on mobile ([652c778](https://github.com/ho-nl/m2-pwa/commit/652c77826b7765acc9d450ffcfe4a2b3052b80da))
* content header title typography ([1eb2dc9](https://github.com/ho-nl/m2-pwa/commit/1eb2dc94f191f3fb29a470b06a21b1c3bab7744b))
* **content-header:** icon sizes ([a037ec3](https://github.com/ho-nl/m2-pwa/commit/a037ec3dc3c87d54bb8aea0d2d6b78c05d9afc63))
* demo ([0f22408](https://github.com/ho-nl/m2-pwa/commit/0f22408a274721c949c6009362e46f7ffe3d2d90))
* drag handle rotation ([b1b0dcb](https://github.com/ho-nl/m2-pwa/commit/b1b0dcbfa822fdbae621e9ff121186ec97a65876))
* **framer-next-pages:** back navigation renders the wrong page, items were reversed ([7168fc1](https://github.com/ho-nl/m2-pwa/commit/7168fc1d1daa3920ae401dda0029e35a253068ec))
* **framer-next-pages:** backSteps returns NaN ([31ac95a](https://github.com/ho-nl/m2-pwa/commit/31ac95a75fb166efdc2d52d0aa0e40e45290e6bb))
* **framer-next-pages:** fix closing of overlay in example ([049a9a7](https://github.com/ho-nl/m2-pwa/commit/049a9a79f882bcf6251fc24cb395b88418349557))
* **framer-next-pages:** stacking order becomes reversed ([65bda4e](https://github.com/ho-nl/m2-pwa/commit/65bda4e8df199d805da6edc12ba61badf56eac8f))
* header spacing ([967573a](https://github.com/ho-nl/m2-pwa/commit/967573a12f3651f2be47e4630dab737ccf8bf498))
* **icon-header:** optional no margin prop ([4b189a1](https://github.com/ho-nl/m2-pwa/commit/4b189a12a543825a2036a12a7c06f40f2dd033ba))
* only cart should be fixed on scroll ([9c8f536](https://github.com/ho-nl/m2-pwa/commit/9c8f5366c53798b377dcf397822b0945774b1dce))
* search button on click type ([33a6a08](https://github.com/ho-nl/m2-pwa/commit/33a6a0826acf795750503b39bd0d224baa795a47))
* SheetPrimaryAction doesn’t accept a ref ([d4b4ae2](https://github.com/ho-nl/m2-pwa/commit/d4b4ae2721144ece22180dfe10bde0b0437f2454))
* spacing consistency between app shells ([c57ad81](https://github.com/ho-nl/m2-pwa/commit/c57ad81a1784ca6737ccfa0d7d33c3a5d19d1654))
* spacings ([332954f](https://github.com/ho-nl/m2-pwa/commit/332954f92f62ff57391192242fb95e26c6de1aae))


### Features

* **button:** pill-link variant ([a6d837a](https://github.com/ho-nl/m2-pwa/commit/a6d837adf73fedb4490d9eafb1a7b87e9931ecb3))
* cart fab on mobile ([bd2e9eb](https://github.com/ho-nl/m2-pwa/commit/bd2e9ebe056ba9a81b5c7228f1e5be57171266f4))
* content header component ([9cf58cd](https://github.com/ho-nl/m2-pwa/commit/9cf58cd5ced3e89237fc04076aa0fae3618205ef))
* content header context ([95b010a](https://github.com/ho-nl/m2-pwa/commit/95b010a175b7e6875da928f4abe4c45fc5c9e942))
* **content-header:** text buttons on mobile - pill buttons on desktop ([1438838](https://github.com/ho-nl/m2-pwa/commit/1438838fbd2aac1e3510368f2a657314ebd05d2d))
* **content-header:** title animation based on header height ([3eae793](https://github.com/ho-nl/m2-pwa/commit/3eae793c660c64c0862257907f268ae85d5f6e54))
* convert account ([b2ad16a](https://github.com/ho-nl/m2-pwa/commit/b2ad16aeb054ff89688e9fcdd4b5f2081f88aa3c))
* full page ui back and menu button position swap ([93b3419](https://github.com/ho-nl/m2-pwa/commit/93b34197947d133f4d1480c4ce68a0302201b858))
* full page ui desktop variant ([a70f301](https://github.com/ho-nl/m2-pwa/commit/a70f3013da36fa131f82fb44457b107fb7705df6))
* minimal page shell ([1693674](https://github.com/ho-nl/m2-pwa/commit/1693674631fc8438c60d9b74b73e607e08971a2d))
* new app shell components ([2db3b7a](https://github.com/ho-nl/m2-pwa/commit/2db3b7a646f45ac273679770715d23e3472e9d2c))





## [2.100.14](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.100.13...@graphcommerce/graphcommerce@2.100.14) (2021-07-20)


### Bug Fixes

* **configurable-product-add-to-cart:** don't show success message when add to cart fails ([1095581](https://github.com/ho-nl/m2-pwa/commit/10955819d720b84c85b7870dc6cd2d7bc34f7dc5))





## [2.100.13](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/graphcommerce@2.100.12...@graphcommerce/graphcommerce@2.100.13) (2021-07-20)


### Bug Fixes

* ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
