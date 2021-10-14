# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.105.7](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/framer-sheet@2.105.6...@graphcommerce/framer-sheet@2.105.7) (2021-10-11)


### Bug Fixes

* adjust animation speeds ([345e60d](https://github.com/ho-nl/m2-pwa/commit/345e60d93a16b98eda404fe1547a0e1c020eb0d4))
* **menu-fab:** animation duration ([5b9ece2](https://github.com/ho-nl/m2-pwa/commit/5b9ece293fb7e12663386f9f9cbc99bc4e22aaa9))





## [2.105.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/framer-sheet@2.105.0...@graphcommerce/framer-sheet@2.105.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/framer-sheet





# 2.105.0 (2021-09-27)


### Bug Fixes

* **app-shell-header:** title offset top not correctly set ([c144309](https://github.com/ho-nl/m2-pwa/commit/c1443095317c1779074f3a4058f4041159c8e31b))
* drag handle rotation ([b1b0dcb](https://github.com/ho-nl/m2-pwa/commit/b1b0dcbfa822fdbae621e9ff121186ec97a65876))
* **framer-sheet:** allow backdrop click while sheet is on a snapPoint ([efd9c3e](https://github.com/ho-nl/m2-pwa/commit/efd9c3e381955101e369d029c0b1af3a548b6a8c))
* **framer-sheet:** allow different header sizes ([4fa7c99](https://github.com/ho-nl/m2-pwa/commit/4fa7c995f7b5f8d532b0bf4922df419fcade3cc0))
* **framer-sheet:** bottom sheet does not resize properly ([2ae89db](https://github.com/ho-nl/m2-pwa/commit/2ae89dbd651acba10f40ac68956213dd744e2247))
* **framer-sheet:** drag indicator for all directions ([72158d1](https://github.com/ho-nl/m2-pwa/commit/72158d13c42a11330dfb6cfaab7c8c23b9996d4f))
* **framer-sheet:** fix janky closing of SheetPanel ([c500b53](https://github.com/ho-nl/m2-pwa/commit/c500b5327815dac2e0a7ddf6fa1c90c96086bd29))
* **framer-sheet:** Illegal Invocation for resize observer ([04b06d9](https://github.com/ho-nl/m2-pwa/commit/04b06d9391b0cd0e1c6a7801e4938914f41d7de5))
* **framer-sheet:** left/rigth sheet is a little higher than the page ([4c4679d](https://github.com/ho-nl/m2-pwa/commit/4c4679d00de1e3306aa0587ad9f9f10df8e2324a))
* **framer-sheet:** make opacity animation of SheetBackdrop less jarring when dragging fast ([f25b7ce](https://github.com/ho-nl/m2-pwa/commit/f25b7ce2a16a621799a434704ed77b59089808cb))
* **framer-sheet:** make sure the drag handling is smooth ([863bc29](https://github.com/ho-nl/m2-pwa/commit/863bc291c8efb02e4e2d2956b9a03178422fb775))
* **framer-sheet:** make sure the left/right drawer have more space / better scrollbar ([226387a](https://github.com/ho-nl/m2-pwa/commit/226387a5e7b9b8a93f9516c97879be959b8072dc))
* **framer-sheet:** panel not cleaned up after exiting ([2e18aba](https://github.com/ho-nl/m2-pwa/commit/2e18aba57719736e930be9a99acba22761a06947))
* **framer-sheet:** prevent cross-axis scroll ([dad87a4](https://github.com/ho-nl/m2-pwa/commit/dad87a481fb9f90788f02ac30824dd43efe3ba07))
* **framer-sheet:** when the variant changes it throws a react error ([5e221ef](https://github.com/ho-nl/m2-pwa/commit/5e221ef53fc521019a0a63eea25823eaae2fef02))
* ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))


### Features

* **app-shell:** now consistent ([fb5b506](https://github.com/ho-nl/m2-pwa/commit/fb5b5062729002b508e888a4962f1b2578e5199b))
* content header component ([9cf58cd](https://github.com/ho-nl/m2-pwa/commit/9cf58cd5ced3e89237fc04076aa0fae3618205ef))
* **content-header:** text buttons on mobile - pill buttons on desktop ([1438838](https://github.com/ho-nl/m2-pwa/commit/1438838fbd2aac1e3510368f2a657314ebd05d2d))
* **framer-next-pages:** implemented the FullPageShell for the remaining pages ([88386b4](https://github.com/ho-nl/m2-pwa/commit/88386b4652abb7765d6e755c7fb7a3cb6285a0e7))
* **framer-sheet:** added SheetHeader component ([2cc164e](https://github.com/ho-nl/m2-pwa/commit/2cc164eac4b5022cfdf347a83ea559e26103063f))
* **framer-sheet:** created separate package that can be implemented ([69cc8ce](https://github.com/ho-nl/m2-pwa/commit/69cc8ce3237125335524728a70f4dae050032108))
* **framer-utils:** created framer-utils and implemented for framer-sheet and framer-next-pages ([788bf28](https://github.com/ho-nl/m2-pwa/commit/788bf282d4a38ec5e78ab7244065c540dfc132a1))
* introduced SheetShell as a shared layout component ([eb64f28](https://github.com/ho-nl/m2-pwa/commit/eb64f28fd05b69efbf14fa850c70b0f1da5c4237))
* introduces framer-next-pages and framer-sheet to next-ui and soxbase package ([e04ad8a](https://github.com/ho-nl/m2-pwa/commit/e04ad8a94cd1fd5a7c5575c9db7916b6e8a88f16))
* left and sidebar drawers ([12a3b72](https://github.com/ho-nl/m2-pwa/commit/12a3b72edfad38a4b82701ec502f2f4d85c40e53))
* minimal page shell ([1693674](https://github.com/ho-nl/m2-pwa/commit/1693674631fc8438c60d9b74b73e607e08971a2d))
* new app shell components ([2db3b7a](https://github.com/ho-nl/m2-pwa/commit/2db3b7a646f45ac273679770715d23e3472e9d2c))
* **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
* renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of [@reachdigital](https://github.com/reachdigital) ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))





# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.104.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/framer-sheet@2.103.0...@graphcommerce/framer-sheet@2.104.0) (2021-08-27)

### Features

- **app-shell:** now consistent
  ([fb5b506](https://github.com/ho-nl/m2-pwa/commit/fb5b5062729002b508e888a4962f1b2578e5199b))

# [2.103.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/framer-sheet@2.102.4...@graphcommerce/framer-sheet@2.103.0) (2021-08-17)

### Features

- left and sidebar drawers
  ([12a3b72](https://github.com/ho-nl/m2-pwa/commit/12a3b72edfad38a4b82701ec502f2f4d85c40e53))

# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/framer-sheet@2.101.2...@graphcommerce/framer-sheet@2.102.0) (2021-07-26)

### Features

- **playwright:** added new playwright package to enable browser testing
  ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))

## [2.101.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/framer-sheet@2.101.1...@graphcommerce/framer-sheet@2.101.2) (2021-07-23)

### Bug Fixes

- **app-shell-header:** title offset top not correctly set
  ([c144309](https://github.com/ho-nl/m2-pwa/commit/c1443095317c1779074f3a4058f4041159c8e31b))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/framer-sheet@2.100.10...@graphcommerce/framer-sheet@2.101.0) (2021-07-20)

### Bug Fixes

- drag handle rotation
  ([b1b0dcb](https://github.com/ho-nl/m2-pwa/commit/b1b0dcbfa822fdbae621e9ff121186ec97a65876))
- ignore md files from triggering version updates
  ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))

### Features

- content header component
  ([9cf58cd](https://github.com/ho-nl/m2-pwa/commit/9cf58cd5ced3e89237fc04076aa0fae3618205ef))
- **content-header:** text buttons on mobile - pill buttons on desktop
  ([1438838](https://github.com/ho-nl/m2-pwa/commit/1438838fbd2aac1e3510368f2a657314ebd05d2d))
- minimal page shell
  ([1693674](https://github.com/ho-nl/m2-pwa/commit/1693674631fc8438c60d9b74b73e607e08971a2d))
- new app shell components
  ([2db3b7a](https://github.com/ho-nl/m2-pwa/commit/2db3b7a646f45ac273679770715d23e3472e9d2c))
