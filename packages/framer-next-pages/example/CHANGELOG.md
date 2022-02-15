# Change Log

## 3.0.0

### Major Changes

- [#1258](https://github.com/ho-nl/m2-pwa/pull/1258)
  [`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05)
  Thanks [@paales](https://github.com/paales)! - Upgraded to Material UI 5

### Patch Changes

- Updated dependencies
  [[`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05)]:
  - @graphcommerce/framer-next-pages@3.0.0
  - @graphcommerce/next-ui@4.0.0
  - @graphcommerce/next-config@3.0.0

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.105.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/framer-next-pages-example@2.104.61...@graphcommerce/framer-next-pages-example@2.105.0) (2022-01-03)

### Features

- **framer-next-pages:** reduce rerenders when navigating to a new page
  ([5cf3301](https://github.com/ho-nl/m2-pwa/commit/5cf330130bb3527057da015e3c4a6fa295d7262e))

# [2.104.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/framer-next-pages-example@2.103.35...@graphcommerce/framer-next-pages-example@2.104.0) (2021-10-27)

### Features

- **nextjs:** upgraded to nextjs 12
  ([9331bc8](https://github.com/ho-nl/m2-pwa/commit/9331bc801f6419522115cc47d291d49d608d5a90))

# 2.103.0 (2021-09-27)

### Bug Fixes

- **framer-next-pages:** fix closing of overlay in example
  ([049a9a7](https://github.com/ho-nl/m2-pwa/commit/049a9a79f882bcf6251fc24cb395b88418349557))
- **framer-next-pages:** prevent unessary rerender when navigating back to a previous page
  ([a5568d0](https://github.com/ho-nl/m2-pwa/commit/a5568d00a034ef0686bd36b548af1def93ad1522))
- **framer-next-page:** usePageRouter in SharedLayout
  ([c2fb164](https://github.com/ho-nl/m2-pwa/commit/c2fb164b342770089b787378a3f79529c36d2152))
- **framer-sheet:** left/rigth sheet is a little higher than the page
  ([4c4679d](https://github.com/ho-nl/m2-pwa/commit/4c4679d00de1e3306aa0587ad9f9f10df8e2324a))
- **framer-sheet:** make opacity animation of SheetBackdrop less jarring when dragging fast
  ([f25b7ce](https://github.com/ho-nl/m2-pwa/commit/f25b7ce2a16a621799a434704ed77b59089808cb))
- **framer-sheet:** make sure the left/right drawer have more space / better scrollbar
  ([226387a](https://github.com/ho-nl/m2-pwa/commit/226387a5e7b9b8a93f9516c97879be959b8072dc))
- ignore md files from triggering version updates
  ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
- make packages private so they dont get published accidently
  ([f7b693f](https://github.com/ho-nl/m2-pwa/commit/f7b693ff6a4d232d0871f6a68922d14678853a96))
- versions
  ([b8b306c](https://github.com/ho-nl/m2-pwa/commit/b8b306c8f3a13415e441d0593c638ae2a3731cd6))

### Features

- **framer-next-motion:** handle resizes
  ([4d9c297](https://github.com/ho-nl/m2-pwa/commit/4d9c2975c7b08cfdb1c024338a8d018e22808fc6))
- **framer-next-pages:** add sheet variants top, left, bottom, right
  ([f0b44b4](https://github.com/ho-nl/m2-pwa/commit/f0b44b44a3c4976a35ca3235e305bd5f281f78d7))
- **framer-next-pages:** added SheetBackdrop component
  ([4981744](https://github.com/ho-nl/m2-pwa/commit/4981744a8bc5f74a0b7d510e0000d3070b388c79))
- **framer-next-pages:** added useCloseOverlay hook to close multiple steps at once
  ([55b7473](https://github.com/ho-nl/m2-pwa/commit/55b74730e64060c20072bf10f34d346964edc51f))
- **framer-next-pages:** added usePageRouter().go(-2) functionality to close overlays
  ([cb177e7](https://github.com/ho-nl/m2-pwa/commit/cb177e7266939b3a6a4f04c03852f024fd2dca3e))
- **framer-next-pages:** base sheet on container height
  ([b8293e3](https://github.com/ho-nl/m2-pwa/commit/b8293e3762892529d39d3e12032d0450166ae79e))
- **framer-next-pages:** enable dragging when the content isn’t scrollable
  ([3df9115](https://github.com/ho-nl/m2-pwa/commit/3df9115d3fbf72dbe547780f0bc6ce80e42b9e47))
- **framer-next-pages:** implemented the FullPageShell for the remaining pages
  ([88386b4](https://github.com/ho-nl/m2-pwa/commit/88386b4652abb7765d6e755c7fb7a3cb6285a0e7))
- **framer-next-pages:** made all animations renderless
  ([7604fc0](https://github.com/ho-nl/m2-pwa/commit/7604fc037d76cefda711b7b6ccb40f14c1ef4c8e))
- **framer-next-pages:** move example to @reachdigital/next-config
  ([b801856](https://github.com/ho-nl/m2-pwa/commit/b801856d370804616a986a6a66ba88ae4f193b4b))
- **framer-next-pages:** working on new sheet component
  ([cc6fb11](https://github.com/ho-nl/m2-pwa/commit/cc6fb11b22db59276a3ea32493bf340c02850a2c))
- **framer-sheet:** added SheetHeader component
  ([2cc164e](https://github.com/ho-nl/m2-pwa/commit/2cc164eac4b5022cfdf347a83ea559e26103063f))
- **framer-sheet:** created separate package that can be implemented
  ([69cc8ce](https://github.com/ho-nl/m2-pwa/commit/69cc8ce3237125335524728a70f4dae050032108))
- **image:** introduced completely rewritten Image component
  ([e3413b3](https://github.com/ho-nl/m2-pwa/commit/e3413b3a57392d6571ea64cb8d9c8dca05ea31df))
- imported react-modal-sheet
  ([e3a76f7](https://github.com/ho-nl/m2-pwa/commit/e3a76f71a6c8f7b5cfc0766673265733040ba164))
- introduces framer-next-pages and framer-sheet to next-ui and soxbase package
  ([e04ad8a](https://github.com/ho-nl/m2-pwa/commit/e04ad8a94cd1fd5a7c5575c9db7916b6e8a88f16))
- left and sidebar drawers
  ([12a3b72](https://github.com/ho-nl/m2-pwa/commit/12a3b72edfad38a4b82701ec502f2f4d85c40e53))
- next.js 11
  ([7d61407](https://github.com/ho-nl/m2-pwa/commit/7d614075a778f488045034f74be4f75b93f63c43))
- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of
  [@reachdigital](https://github.com/reachdigital)
  ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
- upgraded to nextjs 11
  ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/framer-next-pages-example@2.101.5...@graphcommerce/framer-next-pages-example@2.102.0) (2021-08-17)

### Features

- left and sidebar drawers
  ([12a3b72](https://github.com/ho-nl/m2-pwa/commit/12a3b72edfad38a4b82701ec502f2f4d85c40e53))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/framer-next-pages-example@2.100.28...@graphcommerce/framer-next-pages-example@2.101.0) (2021-08-12)

### Features

- upgraded to nextjs 11
  ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.100.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/framer-next-pages-example@2.100.10...@graphcommerce/framer-next-pages-example@2.100.11) (2021-07-20)

### Bug Fixes

- **framer-next-pages:** fix closing of overlay in example
  ([049a9a7](https://github.com/ho-nl/m2-pwa/commit/049a9a79f882bcf6251fc24cb395b88418349557))
- ignore md files from triggering version updates
  ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
