# Change Log

## 9.0.4-canary.10

### Patch Changes

- [#2487](https://github.com/graphcommerce-org/graphcommerce/pull/2487) [`8b25322`](https://github.com/graphcommerce-org/graphcommerce/commit/8b253224997b59ac74d72813214dfc224f526c0a) - When a dependency is optional or has peerDependenciesMeta set to optional, make sure it doesn't crash when it is not found when calling resolveDependenciesSync ([@paales](https://github.com/paales))

- [#2487](https://github.com/graphcommerce-org/graphcommerce/pull/2487) [`2c79a4c`](https://github.com/graphcommerce-org/graphcommerce/commit/2c79a4cba2779bc367104ebb13e6c0d6feb6574f) - Remove redirects for `/product/$type/[url]` routes, those haven't been used for years anymore. ([@paales](https://github.com/paales))

- [#2487](https://github.com/graphcommerce-org/graphcommerce/pull/2487) [`30b7356`](https://github.com/graphcommerce-org/graphcommerce/commit/30b7356790efbac0f0017ef61cb1619b920100ab) - Solve issue where withGraphCommerce had a hard dependency on Magento specific configurations ([@paales](https://github.com/paales))

- [#2487](https://github.com/graphcommerce-org/graphcommerce/pull/2487) [`9825f59`](https://github.com/graphcommerce-org/graphcommerce/commit/9825f59b8626c315e6092950faceeab4311a5424) - Remove rewriteLegacyEnv as that hasn't been used for years ([@paales](https://github.com/paales))

- [#2487](https://github.com/graphcommerce-org/graphcommerce/pull/2487) [`5ffa0ee`](https://github.com/graphcommerce-org/graphcommerce/commit/5ffa0ee1d620f4f1c38bc5df36cbd527bcc43cf9) - Migrated `@graphcommerce/next-config` package to `"type": "module"` ([@paales](https://github.com/paales))

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

### Patch Changes

- [#2472](https://github.com/graphcommerce-org/graphcommerce/pull/2472) [`905157b`](https://github.com/graphcommerce-org/graphcommerce/commit/905157bec2c9e1dcf51b6e6f7b6913aa9be7b609) - Solve issue with chalk compilation because we’re not migrated to esm modules. ([@paales](https://github.com/paales))

## 9.0.0

### Major Changes

- [#2306](https://github.com/graphcommerce-org/graphcommerce/pull/2306) [`5e188e8`](https://github.com/graphcommerce-org/graphcommerce/commit/5e188e830dca4730c73830858f59a94e9d41ed12) - Magento 2.4.7: Imlemented `deleteCustomer` mutation to the account section. Disabled by default and can be enabled through the config. ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

- [#2452](https://github.com/graphcommerce-org/graphcommerce/pull/2452) [`aab290f`](https://github.com/graphcommerce-org/graphcommerce/commit/aab290f9c905be06e742cd8ad50d7d415930828a) - Migrated to `next.config.ts` ([@paales](https://github.com/paales))

- [#2305](https://github.com/graphcommerce-org/graphcommerce/pull/2305) [`77e8297`](https://github.com/graphcommerce-org/graphcommerce/commit/77e82976816994336c616208a651cb18ce9ea270) - Added `<CompanyFields/>` with `<CompanyName />` and `<CompanyVAT />` to shipping and billing forms. ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

- [#2226](https://github.com/graphcommerce-org/graphcommerce/pull/2226) [`8939df2`](https://github.com/graphcommerce-org/graphcommerce/commit/8939df22eda57e681f83076707e856700f8b2e21) - Big improvements to the plugin system: Typescript validated, deeper resolution, new configuration object, replace plugins, and more ifConfig options.

  1. Plugins now use TypeScript's `"moduleSuffixes": [".interceptor", ""]` [functionality](https://www.typescriptlang.org/tsconfig#moduleSuffixes) which means that plugins now correctly resolve via TypeScript. So if you _go to reference_ in VSCode (or any other editor), you go to the interceptor directly and see which plugins are applied there. This also means that plugins are automatically checked during build (and will fail if there are errors).
  2. The exported type of an _intercepted component_ now has the types of all plugins applied. This means that plugins can modify the props of components (and is still validated with TypeScript). To make this work a plugin must always forward props to the `<Prev>` to ensure that values are correctly passed on.
  3. Plugins will now always be applied to deepest resolved path. This means that a plugin automatically applies to internal usages as well. This thus means that plugins do not need to be written with an internal path, but can keep the parent path. Istead of writing `@graphcommerce/magento-cart-items/components/RemoveItemFromCart/RemoveItemFromCartFab` you can now write `@graphcommerce/magento-cart-items`.
  4. A new configuration object for plugins is created instead of separate exports (the legacy format is still supported though):

     ```tsx
     export const config: PluginConfig = {
       type: 'component'
       module: '@graphcommerce/magento-product',
       ifConfig: 'demoMode',
     }
     ```

     This also means that the _name of the export_ dictates the name of the component/function the plugin is applied.

  5. We now support replace plugins (`type: 'replace'`), which allow you to replace the original component/function/const completely (and type checked of course).

     ```tsx
     import { ProductPageNameProps } from '@graphcommerce/magento-product'
     import { PluginConfig } from '@graphcommerce/next-config'

     export const config: PluginConfig = {
       type: 'replace',
       module: '@graphcommerce/magento-product',
     }

     export function ProductPageName(props: ProductPageNameProps) {
       const { product } = props
       return <div>REPLACEMENT {product.url_key}</div>
     }
     ```

     Plugin files can now have multiple exports for the same configuration. So next to the `ProductPageName` you can also have a `ProductPagePrice` export for example in the same file.

  6. We now support `ifConfig` tuple which allows you to apply a plugin only if a certain configuration is set.

     ```tsx
     export const config: PluginConfig = {
       type: 'replace',
       module: '@graphcommerce/magento-product',
       ifConfig: ['theme', 'my-theme'],
     }
     ```

     This allows you to support multiple builds with different plugins applied. For example one build with `GC_THEME=my-theme` and another with `GC_THEME=my-other-theme`. ([@paales](https://github.com/paales))

- [#2242](https://github.com/graphcommerce-org/graphcommerce/pull/2242) [`a4cce76`](https://github.com/graphcommerce-org/graphcommerce/commit/a4cce76ca37af2bec604e953ada4bb11bd91f55d) - Add option to show an extended version of the pagination component. Configurable via the `productListPaginationVariant` key in your `graphcommerce.config.js`. `COMPACT` means: `< Page X of Y >` and `EXTENDED` means: `< 1 2 ... [5] ... 10 11 >` ([@FrankHarland](https://github.com/FrankHarland))

- [#2313](https://github.com/graphcommerce-org/graphcommerce/pull/2313) [`511e75c`](https://github.com/graphcommerce-org/graphcommerce/commit/511e75c3f8c077e617ed17e5042796e2411f312f) - Add the `customerNote` field to the shipping and customer address forms. Added configuration `customerAddressNoteEnable` to enable or disable the field. ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

- [#2227](https://github.com/graphcommerce-org/graphcommerce/pull/2227) [`d597719`](https://github.com/graphcommerce-org/graphcommerce/commit/d597719baaabbe079660ac063fd021d871831511) - Added option to change sort order (ASC / DESC) for sort options (Name, price, position etc) on catalog and search pages. ([@FrankHarland](https://github.com/FrankHarland))

### Minor Changes

- [#2385](https://github.com/graphcommerce-org/graphcommerce/pull/2385) [`3434ede`](https://github.com/graphcommerce-org/graphcommerce/commit/3434ede37855c36949711d05d13eb01906b29ad0) - Added a functionality to copy directories from packages to the project and keep them managed by the package. This allows for injecting additional routes etc. ([@paales](https://github.com/paales))

- [#2247](https://github.com/graphcommerce-org/graphcommerce/pull/2247) [`5153904`](https://github.com/graphcommerce-org/graphcommerce/commit/51539045cb3e14424141a65a1fd89216d3ee6fc2) - Added `PRIVATE_ADDITIONAL_DEPENDENCIES` env variable support to enable packages that we do not want to have in the examples directory but we do want to be able to demo. ([@paales](https://github.com/paales))

- [#2418](https://github.com/graphcommerce-org/graphcommerce/pull/2418) [`e0a5b98`](https://github.com/graphcommerce-org/graphcommerce/commit/e0a5b9858a3b675ce749609ffa122d293c6e2a62) - Added `PRIVATE_PACKAGE_NAMESPACES` env variable to have additional namespaces to be considered to be a graphcommerce package. ([@paales](https://github.com/paales))

- [#2196](https://github.com/graphcommerce-org/graphcommerce/pull/2196) [`84c50e4`](https://github.com/graphcommerce-org/graphcommerce/commit/84c50e49a1a7f154d4a8f4045c37e773e20283ad) - Allow Lingui to use `linguiLocale` with country identifiers like `en-us`, it would always load `en` in this case. Introduced a new `useLocale` hook to use the correct locale string to use in Intl methods. ([@paales](https://github.com/paales))

- [#2223](https://github.com/graphcommerce-org/graphcommerce/pull/2223) [`4543c8d`](https://github.com/graphcommerce-org/graphcommerce/commit/4543c8d3af455b709a4cb3cad2e9d5d70cffb969) - Created dedicated sitemap route for categories so it isn't dependend on static generation. ([@bramvanderholst](https://github.com/bramvanderholst))

- [#2223](https://github.com/graphcommerce-org/graphcommerce/pull/2223) [`4ef6765`](https://github.com/graphcommerce-org/graphcommerce/commit/4ef6765d52fa56cfbe12b7e4e81aa183cc590a87) - Created dedicated sitemap route for products so it isn't dependend on static generation. ([@bramvanderholst](https://github.com/bramvanderholst))

### Patch Changes

- [#2380](https://github.com/graphcommerce-org/graphcommerce/pull/2380) [`3710d8b`](https://github.com/graphcommerce-org/graphcommerce/commit/3710d8bf1cceb5a991e5cfdfc15d42e462704c6d) - Solves the issue `TypeError: url?.startsWith is not a function`. The generated `.mesh/index.ts` would be generated as a requirejs module while next.js expects an esm module. In the end we properly generated the mesh correctly and now there is an `import.meta.url` instead of using `require('node:url')`. To solve this we needed to solve a chain of issues:

  1. The generation of the mesh is based on the version of the mesh that is imported (esm or commonjs). See [source](https://github.com/ardatan/graphql-mesh/blob/bf588d372c0078378aaa24beea2da794af7949e6/scripts/replace-import-meta-url-in-cjs.ts#L9-L10) for the lines that need to be different. This meant that we needed to change the @graphcommerce/cli package to be of type:module instead of a commonjs module.

  2) To properly convert the module to an esm module we've migrated the build of the cli package to use 'pkgroll' instead of tsc, because tsc is limited in what it outputs and can't really convert classic imports to esm.
  3) To load possible mesh plugins we require additional .ts files to be loaded with [tsx](https://tsx.is/). To get the tsx loader to work properly in combination with esm modules, we need at least [node 18.19.0](https://nodejs.org/en/blog/release/v18.19.0#new-nodemodule-api-register-for-module-customization-hooks-new-initialize-hook). Minimal Node version upped to 18.19.0 and add support for node 22. ([@paales](https://github.com/paales))

- [#2213](https://github.com/graphcommerce-org/graphcommerce/pull/2213) [`9b8349f`](https://github.com/graphcommerce-org/graphcommerce/commit/9b8349f0001a786f9b1666f050ae226316bd16f3) - Removed the `ProductPage.graphql` query from the examples directory as it isn't used anymore. ([@paales](https://github.com/paales))

- [#2234](https://github.com/graphcommerce-org/graphcommerce/pull/2234) [`0767bc4`](https://github.com/graphcommerce-org/graphcommerce/commit/0767bc40f7b596209f24ca4e745ff0441f3275c9) - Upgrade input components to no longer use `muiRegister`, which improves INP scores. ([@FrankHarland](https://github.com/FrankHarland))

- [#2450](https://github.com/graphcommerce-org/graphcommerce/pull/2450) [`c37d1ec`](https://github.com/graphcommerce-org/graphcommerce/commit/c37d1ec016bc26c2a59296b0c76c14b513d94306) - Make sure categories and products create the correct URL's in sitemaps ([@paales](https://github.com/paales))

- [#2423](https://github.com/graphcommerce-org/graphcommerce/pull/2423) [`dbf233b`](https://github.com/graphcommerce-org/graphcommerce/commit/dbf233bb6d11432a8effc38fd4672aaa0856e1aa) - Added graphql.config.ts to projects ([@paales](https://github.com/paales))

- [#2223](https://github.com/graphcommerce-org/graphcommerce/pull/2223) [`4f7fe02`](https://github.com/graphcommerce-org/graphcommerce/commit/4f7fe02c6f0f017d7a52559df1972551eb0cba47) - Added robotsAllow to storefront config ([@bramvanderholst](https://github.com/bramvanderholst))

- [#2379](https://github.com/graphcommerce-org/graphcommerce/pull/2379) [`9828754`](https://github.com/graphcommerce-org/graphcommerce/commit/9828754192348b966fb9736d7b0e1c78c4a909fa) - All automatically generated interceptor files are now read-only in vscode to prevent accidental changes. ([@paales](https://github.com/paales))

- [#2247](https://github.com/graphcommerce-org/graphcommerce/pull/2247) [`6831040`](https://github.com/graphcommerce-org/graphcommerce/commit/68310401448b7b42b53757db4a84de4a01e35aa2) - Reduce bundlesize of `@apollo/client`. ([@paales](https://github.com/paales))

- [#2247](https://github.com/graphcommerce-org/graphcommerce/pull/2247) [`81c6c81`](https://github.com/graphcommerce-org/graphcommerce/commit/81c6c81e1b4a31df3c400a3ee4311bdf2b46a2b5) - Solved an issue where the plugins would be generated with the wrong path ([@paales](https://github.com/paales))

- [#2421](https://github.com/graphcommerce-org/graphcommerce/pull/2421) [`d500643`](https://github.com/graphcommerce-org/graphcommerce/commit/d500643138799b6db1610cb10a1d065d6219d8ea) - Resolve peer dependency issues so we get a clean install ([@paales](https://github.com/paales))

- [#2299](https://github.com/graphcommerce-org/graphcommerce/pull/2299) [`85d258a`](https://github.com/graphcommerce-org/graphcommerce/commit/85d258a0d1a48bb1b502cccba30a9844f2257814) - Solve an issue where an env variable wouldn't be coerced to a Number if a `Config.graphqls` value is defined as an `Int`/`Float`. ([@paales](https://github.com/paales))

- [#2314](https://github.com/graphcommerce-org/graphcommerce/pull/2314) [`ccd218c`](https://github.com/graphcommerce-org/graphcommerce/commit/ccd218c827d8ba7e632fa40ed75ad63a38620275) - Solve an issue where interceptors were immediately deleted after generating ([@paales](https://github.com/paales))

- [#2292](https://github.com/graphcommerce-org/graphcommerce/pull/2292) [`6258adb`](https://github.com/graphcommerce-org/graphcommerce/commit/6258adbe294590ba52d3aaf65712cdc561f32c4c) - Be able to handle plugin runtime values values when parsing the source. Also, make sure parsed plugin sources do not return duplicate plugins. ([@paales](https://github.com/paales))

- [#2247](https://github.com/graphcommerce-org/graphcommerce/pull/2247) [`6831040`](https://github.com/graphcommerce-org/graphcommerce/commit/68310401448b7b42b53757db4a84de4a01e35aa2) - Suppress warning where a dependency is an expression, Added uglify-es and long as the dependencies couldn’t be found ([@paales](https://github.com/paales))

- [#2418](https://github.com/graphcommerce-org/graphcommerce/pull/2418) [`22a0ef2`](https://github.com/graphcommerce-org/graphcommerce/commit/22a0ef2ffd2841d050a413a885ff54331e1e7ebf) - Solve peer dependency issues for webpack and framer-motion ([@paales](https://github.com/paales))

- [#2247](https://github.com/graphcommerce-org/graphcommerce/pull/2247) [`cfc0f4e`](https://github.com/graphcommerce-org/graphcommerce/commit/cfc0f4e015f3b3a7348b882eb7440222b3e26a07) - Make sure the interceptors are generated before the typecheck is ran. ([@paales](https://github.com/paales))

- [#2247](https://github.com/graphcommerce-org/graphcommerce/pull/2247) [`444e446`](https://github.com/graphcommerce-org/graphcommerce/commit/444e446a218cc9da3defb940a6d5cce0229ff845) - Added clear upgrade instructions for `linguiLocale`. ([@paales](https://github.com/paales))

- [#2247](https://github.com/graphcommerce-org/graphcommerce/pull/2247) [`3f9d8f5`](https://github.com/graphcommerce-org/graphcommerce/commit/3f9d8f5ee9437fa90589ebd8ba8d1e790006b6ae) - Added better interceptor comments and link to original files ([@paales](https://github.com/paales))

## 8.0.5

### Patch Changes

- [#2236](https://github.com/graphcommerce-org/graphcommerce/pull/2236) [`1a20a34`](https://github.com/graphcommerce-org/graphcommerce/commit/1a20a34a8b55781ee3e88731b5e2623a85c64ccd) - Enable bundlePagesExternals for Vercel environments ([@paales](https://github.com/paales))

## 8.0.0

### Minor Changes

- [#2113](https://github.com/graphcommerce-org/graphcommerce/pull/2113) [`437f467`](https://github.com/graphcommerce-org/graphcommerce/commit/437f467ce1bd9182954be753f1ce17056ab62e85) - Upgraded the graphcommerce repo to the yarn 4 package manager ([@paales](https://github.com/paales))

### Patch Changes

- [#2156](https://github.com/graphcommerce-org/graphcommerce/pull/2156) [`69b816c`](https://github.com/graphcommerce-org/graphcommerce/commit/69b816cd739af2999ec2a5053f09b9bb10379c52) - Updated dependencies. Fixed trace-to-tree.mjs to debug build perf and added trace-to-event-format.mjs for compatibility with about://tracing. ([@paales](https://github.com/paales))

- [#2078](https://github.com/graphcommerce-org/graphcommerce/pull/2078) [`5f409e6`](https://github.com/graphcommerce-org/graphcommerce/commit/5f409e617afae36d5c6224f3c6eb8d085fc2e84c) - Added @graphcommerce packages in node_modules to nextjs watch options ([@KMalkowski](https://github.com/KMalkowski))

- [#2129](https://github.com/graphcommerce-org/graphcommerce/pull/2129) [`dca4490`](https://github.com/graphcommerce-org/graphcommerce/commit/dca4490b97319e9d4117277719adef395ed1e7b4) - Created `./devcontainer/devcontainer.json` to automatically run Graphcommerce after opening Codespaces ([@action-simon](https://github.com/action-simon))

- [#2113](https://github.com/graphcommerce-org/graphcommerce/pull/2113) [`6306182`](https://github.com/graphcommerce-org/graphcommerce/commit/6306182196321bdab509a8dcfe09eb00da10303a) - Moved all internal `@graphcommerce/*` dependencies to `peerDependencies` and resolve remaining peer dependency issues ([@paales](https://github.com/paales))

- [`d267f19`](https://github.com/graphcommerce-org/graphcommerce/commit/d267f19d6ab85f7dc1088974b3fee6148a537c20) - Disable the pagination thumbnails ([@paales](https://github.com/paales))

- [#2172](https://github.com/graphcommerce-org/graphcommerce/pull/2172) [`279599e`](https://github.com/graphcommerce-org/graphcommerce/commit/279599e7a86bd96ea9e36065af3c367df9e02a63) - Updated examples in the documentation to reflect the changes made in GraphCommerce. ([@paales](https://github.com/paales))

- [#2116](https://github.com/graphcommerce-org/graphcommerce/pull/2116) [`e0e5e82`](https://github.com/graphcommerce-org/graphcommerce/commit/e0e5e82af36ca38a78fc031e0c680daaab5909ad) - Node.js version of gitpod updated to node 18 ([@action-simon](https://github.com/action-simon))

- [#2113](https://github.com/graphcommerce-org/graphcommerce/pull/2113) [`77b1bac`](https://github.com/graphcommerce-org/graphcommerce/commit/77b1bac4db9c903a29c3969823da663875408be0) - Upgraded to nextjs 14.0.2, and updated other related dependencies. Removed @mui/material/modern alias as that doesnt work in combination with nextjs 14.0.2. ([@paales](https://github.com/paales))

- [#2169](https://github.com/graphcommerce-org/graphcommerce/pull/2169) [`eab3f0b`](https://github.com/graphcommerce-org/graphcommerce/commit/eab3f0b0b459f5b6cc4e50d787ac1e8ae545b708) - Solve issue where a Hygraph DynamicRow conditions were missing fields in the OrCondition ([@Jessevdpoel](https://github.com/Jessevdpoel))

## 7.0.1

### Patch Changes

- [`5652342e1`](https://github.com/graphcommerce-org/graphcommerce/commit/5652342e10754cc0b4fa0596e55125539b69c442) - Add missing dependency @types/react-is as it would cause build errors. ([@paales](https://github.com/paales))

- [`2e3b9d64e`](https://github.com/graphcommerce-org/graphcommerce/commit/2e3b9d64e0cf610d27c05a067a3c5a25e2681dde) - Pin version of graphql-jit to 0.8.2 to prevent error: `Got unexpected PRIMITIVES type: RichTextAST` ([@paales](https://github.com/paales))

- [#2043](https://github.com/graphcommerce-org/graphcommerce/pull/2043) [`b5584f689`](https://github.com/graphcommerce-org/graphcommerce/commit/b5584f689d22a3d2c043ecf5eb4ef02920fc5bdd) - Support for node 20 ([@paales](https://github.com/paales))

- [#2047](https://github.com/graphcommerce-org/graphcommerce/pull/2047) [`ca9ce846c`](https://github.com/graphcommerce-org/graphcommerce/commit/ca9ce846cb24a2ab0e365df6e60a962187151030) - Solved an issue where any dynamic route like product pages or search pages would give a 404 during development. ([@paales](https://github.com/paales))

- [#2063](https://github.com/graphcommerce-org/graphcommerce/pull/2063) [`12842a28e`](https://github.com/graphcommerce-org/graphcommerce/commit/12842a28e226ef970f250fad4100e46eebc53118) - Update graphql dependency to 16.8.1 and loosen constraint so that it doesn’t fail during installation ([@paales](https://github.com/paales))

- [#2047](https://github.com/graphcommerce-org/graphcommerce/pull/2047) [`136580b39`](https://github.com/graphcommerce-org/graphcommerce/commit/136580b39e3cffdd07e3fa087e049bd532c3e8f1) - Updated all dependencies to the latest version where possible. ([@paales](https://github.com/paales))

## 7.0.0

### Major Changes

- [`e55d8c390`](https://github.com/graphcommerce-org/graphcommerce/commit/e55d8c390d90b4bb7bab11c6a99027ac72bd7e3e) - Created a new sidebar layout system, can be configured with productFiltersLayout in the graphcommerce.config.js ([@paales](https://github.com/paales))

### Minor Changes

- [#1988](https://github.com/graphcommerce-org/graphcommerce/pull/1988) [`af8e0d176`](https://github.com/graphcommerce-org/graphcommerce/commit/af8e0d176af8197a0c13b9a29b438cb54cc29ce4) - Multi website with multiple duplicates locales support. Use website suffixes like `en-us-website1` and `en-us-website2` as the locale declaration. ([@hnsr](https://github.com/hnsr))

- [#1915](https://github.com/graphcommerce-org/graphcommerce/pull/1915) [`f4a8c3881`](https://github.com/graphcommerce-org/graphcommerce/commit/f4a8c388183e17c52e7f66536c5448749f494d7f) - Added the ability to create function-plugins for usage in non-component areas and hooks ([@paales](https://github.com/paales))

### Patch Changes

- [#2034](https://github.com/graphcommerce-org/graphcommerce/pull/2034) [`6fca47484`](https://github.com/graphcommerce-org/graphcommerce/commit/6fca474847fe52f004a6ac0abbd88492512b46ad) - Pre-resolve the customFetch in mesh config, so that it works with the new mesh version. ([@paales](https://github.com/paales))

- [#1925](https://github.com/graphcommerce-org/graphcommerce/pull/1925) [`2b595bf13`](https://github.com/graphcommerce-org/graphcommerce/commit/2b595bf13f3725a77661586cce021ce8d4791558) - Fixed bug for type error in `demoConfig.ts`. All storefront config values in the demo config are now optional. ([@mikekeehnen](https://github.com/mikekeehnen))

- [#1924](https://github.com/graphcommerce-org/graphcommerce/pull/1924) [`04581f619`](https://github.com/graphcommerce-org/graphcommerce/commit/04581f619c609f2f6ca5268ee5effb6a1db3f0eb) - Use the latest branch from graphql-mesh so that all versions are in sync ([@paales](https://github.com/paales))

- [#1936](https://github.com/graphcommerce-org/graphcommerce/pull/1936) [`2869ac874`](https://github.com/graphcommerce-org/graphcommerce/commit/2869ac87401d5f00f41cfc9d976fd2c2b23ffac3) - Added redirect for /customer/account so links in (transactional) emails function properly ([@bramvanderholst](https://github.com/bramvanderholst))

- [#1960](https://github.com/graphcommerce-org/graphcommerce/pull/1960) [`86e14569b`](https://github.com/graphcommerce-org/graphcommerce/commit/86e14569b1f68f73be7f93b614e36b382c5debff) - Updated to the latest release of GraphQL codegen and solve compatibility issues with our own generator ([@paales](https://github.com/paales))

- [#2030](https://github.com/graphcommerce-org/graphcommerce/pull/2030) [`15939ca62`](https://github.com/graphcommerce-org/graphcommerce/commit/15939ca62021c28f7d60382c65927aed15c1ac84) - next-pwa dependency change and next-image caching optimalization ([@mikekeehnen](https://github.com/mikekeehnen))

- [#1982](https://github.com/graphcommerce-org/graphcommerce/pull/1982) [`e1fab2f6d`](https://github.com/graphcommerce-org/graphcommerce/commit/e1fab2f6d8f57d0488d8a915596d5c19cb7718e6) - Better detection what the package roots are when a custom node_modules directory is used ([@paales](https://github.com/paales))

- [#1959](https://github.com/graphcommerce-org/graphcommerce/pull/1959) [`d0809b132`](https://github.com/graphcommerce-org/graphcommerce/commit/d0809b132a0e4cbdfeb86164f6c16a89ebecd987) - Added support for default values in the Config.graphqls files for the documentation ([@JoshuaS98](https://github.com/JoshuaS98))

## 6.1.0

### Minor Changes

- [#1874](https://github.com/graphcommerce-org/graphcommerce/pull/1874) [`2a60491c2`](https://github.com/graphcommerce-org/graphcommerce/commit/2a60491c23a9cd0bfd79296d29f6c9ee31faada5) - Big Magento performance improvements; Magento couldn't respond with any cached Varnish responses because there was an empty authorization header sent with each request. ([@paales](https://github.com/paales))

### Patch Changes

- [#1876](https://github.com/graphcommerce-org/graphcommerce/pull/1876) [`8dffc59c0`](https://github.com/graphcommerce-org/graphcommerce/commit/8dffc59c04bf6f2a6000b73db13592e10afd936c) - Added an configuration `wishlistShowFeedbackMessage` to show a feedback message when a product is added to the wishlist. ([@paales](https://github.com/paales))

- [#1872](https://github.com/graphcommerce-org/graphcommerce/pull/1872) [`05522796f`](https://github.com/graphcommerce-org/graphcommerce/commit/05522796f3f132db50e7b4c26089740a12a9153a) - Fix issue where a deeper plugin from the root of the project doesn't have a correct relative path ([@paales](https://github.com/paales))

## 6.0.1

### Patch Changes

- [#1863](https://github.com/graphcommerce-org/graphcommerce/pull/1863) [`ce6c990b2`](https://github.com/graphcommerce-org/graphcommerce/commit/ce6c990b25286bed393470a818f8daab2bb51457) - Solve issue where intercepters coudn’t be properly deleted because it was already deleted, fixe ([@paales](https://github.com/paales))

## 6.0.0

### Major Changes

- [#1766](https://github.com/graphcommerce-org/graphcommerce/pull/1766) [`e34169ee2`](https://github.com/graphcommerce-org/graphcommerce/commit/e34169ee2e0fdc052ff589ceca0bc67557584c1f) - Upgraded to Next.js 13

  - NextLink integrates the next/link functionality with @mui/material's Link and ButtonBase (and all it's derivatives) components.
  - NextLink automatically adds `target="_blank"` when the href is external.
  - NextLink makes all relative href absolute. `href="my-page"` will be rendered as `href="/my-page"`. ([@paales](https://github.com/paales))

- [#1786](https://github.com/graphcommerce-org/graphcommerce/pull/1786) [`b76679204`](https://github.com/graphcommerce-org/graphcommerce/commit/b766792049e1e6ebe45671c0b36e78746ef159e2) - Created a completely new [GraphCommerce config system](https://www.graphcommerce.org/docs/framework/config) to allow for greater confiugration options and rely less on a .env file to configuration.

  - GraphCommerce can be configured in the graphcommerce.config.js
  - The configuration is automatically validated on startup.
  - All configuration values can be overwritten by environment variables. ([@paales](https://github.com/paales))

### Minor Changes

- [#1828](https://github.com/graphcommerce-org/graphcommerce/pull/1828) [`3df85faf1`](https://github.com/graphcommerce-org/graphcommerce/commit/3df85faf189b95e2c7d9c3fc756474fcafb1c8b4) - Added a new `productRoute` configuration to create freedom in the actual product route used (default: /p/). Simplified redirects from legacy product routes to new routes by creating redirects. ([@paales](https://github.com/paales))

- [#1810](https://github.com/graphcommerce-org/graphcommerce/pull/1810) [`543c5d5b2`](https://github.com/graphcommerce-org/graphcommerce/commit/543c5d5b2b6f29c1f6a0a405524d4cc86f399596) - Added `limitSsg: Boolean` configuration option to limit the getStaticPaths generation during build. This is useful to make quick deployments on preview environments. ([@paales](https://github.com/paales))

- [#1833](https://github.com/graphcommerce-org/graphcommerce/pull/1833) [`7dc3e036c`](https://github.com/graphcommerce-org/graphcommerce/commit/7dc3e036c776224aa184e03cc957dcb8d3faa55c) - Added ability to have local plugins and added example plugin in the plugins directory ([@paales](https://github.com/paales))

### Patch Changes

- [#1786](https://github.com/graphcommerce-org/graphcommerce/pull/1786) [`fff2420c6`](https://github.com/graphcommerce-org/graphcommerce/commit/fff2420c62472edfd2c3d6eba1012dbf48efa3db) - Added `debug.webpackCircularDependencyPlugin`, `debug.webpackDuplicatesPlugin` and `debug.pluginStatus` to be able to run some debugging commands. ([@paales](https://github.com/paales))

- [#1844](https://github.com/graphcommerce-org/graphcommerce/pull/1844) [`929cffafb`](https://github.com/graphcommerce-org/graphcommerce/commit/929cffafbc8b2e57433b6448c95234fb057880b1) - Plugins now are correctly sorted and local plugins will always be closest to the original component. ([@paales](https://github.com/paales))

- [#1831](https://github.com/graphcommerce-org/graphcommerce/pull/1831) [`4d4a3464c`](https://github.com/graphcommerce-org/graphcommerce/commit/4d4a3464c807e34a36952d01e63a5c556176b0b6) - Removed of next-transpile-modules and use transpilePackages option of nextjs. ([@paales](https://github.com/paales))

## 5.1.0

### Patch Changes

- [#1755](https://github.com/graphcommerce-org/graphcommerce/pull/1755) [`225a69dc9`](https://github.com/graphcommerce-org/graphcommerce/commit/225a69dc9eb76d85adee1c6ea8c4eff16a5fed63) - When a plugin doesn't target a file anymore, it will now cleanup the existing interceptor file. ([@paales](https://github.com/paales))

- [#1760](https://github.com/graphcommerce-org/graphcommerce/pull/1760) [`8badc8550`](https://github.com/graphcommerce-org/graphcommerce/commit/8badc8550c402ac7b80c8d3238d313550c28a055) - Updated dependencies ([@paales](https://github.com/paales))

- [#1752](https://github.com/graphcommerce-org/graphcommerce/pull/1752) [`2a6a4d9ec`](https://github.com/graphcommerce-org/graphcommerce/commit/2a6a4d9ecfa1b58a66ba9b9d00016d6feda9aa95) - Updated dependencies to latest versions, except for nextjs; Solve tons of peer dependency issues.

  - Updated the @mui/material package
  - Removed dependencies on react-hook-form-mui and @playwright/test
  - Upgraded dependencies including type-fest and graphql-mesh
  - Solved peer dependency issues ([@paales](https://github.com/paales))

- [#1755](https://github.com/graphcommerce-org/graphcommerce/pull/1755) [`4759c1781`](https://github.com/graphcommerce-org/graphcommerce/commit/4759c1781ebe94c18f557e2ba189000580a05692) - Interceptors are regenerated when a plugin contains a faulty configuration (happens a lot when building a plugin). ([@paales](https://github.com/paales))

- [#1745](https://github.com/graphcommerce-org/graphcommerce/pull/1745) [`2a859970d`](https://github.com/graphcommerce-org/graphcommerce/commit/2a859970de34ad768a0ba54f50d53ad17823cc15) - Make sure the interceptors aren't cleaned up constantly ([@github-actions](https://github.com/apps/github-actions))

## 5.0.0

### Major Changes

- [#1734](https://github.com/graphcommerce-org/graphcommerce/pull/1734) [`e4c7fe17e`](https://github.com/graphcommerce-org/graphcommerce/commit/e4c7fe17e413e37362ceae92e67f1b3a5f62d398) - Bump major version of all packages ([@github-actions](https://github.com/apps/github-actions))

### Minor Changes

- [#1729](https://github.com/graphcommerce-org/graphcommerce/pull/1729) [`4f85e4878`](https://github.com/graphcommerce-org/graphcommerce/commit/4f85e4878e4ad0dd528d60ad35826da0677059a9) - Add the ability to specificy plugins on the package name (e.g. `@graphcommerce/magento-cart-payment-method`) ([@paales](https://github.com/paales))

- [#1718](https://github.com/graphcommerce-org/graphcommerce/pull/1718) [`16abc9995`](https://github.com/graphcommerce-org/graphcommerce/commit/16abc9995377f5c00032674de0a1ea3ebad88c4c) - Introducing a new **Plugin system for GraphCommerce** which allows you to extend GraphCommerce in a plug-and-play manner. [Read the documentation to learn more](https://github.com/graphcommerce-org/graphcommerce/blob/main/docs/framework/plugins.md) ([@paales](https://github.com/paales))

- [#1738](https://github.com/graphcommerce-org/graphcommerce/pull/1738) [`6171ad02c`](https://github.com/graphcommerce-org/graphcommerce/commit/6171ad02c19782b1e1f0eb00ea25ea6b764250b5) - Added topological sorting to plugins and added ifEnv export to plugins to conditionally load plugins ([@paales](https://github.com/paales))

### Patch Changes

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`b2d73c726`](https://github.com/graphcommerce-org/graphcommerce/commit/b2d73c726fa123435fa6c54b4e0fd0db2df7c4ab) - Move to <Prev/> instead of <Component/> to call the plugin component ([@paales](https://github.com/paales))

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`d6abe2646`](https://github.com/graphcommerce-org/graphcommerce/commit/d6abe26461d92e6f6c39da1cb7e6ac896bb9475f) - Added comments to generated interceptor ([@paales](https://github.com/paales))

- [#1734](https://github.com/graphcommerce-org/graphcommerce/pull/1734) [`fdb33b4e6`](https://github.com/graphcommerce-org/graphcommerce/commit/fdb33b4e6cace84a370aa000bf86c9c3c377aaae) - Make sure the root package is always included even if it doesn't include graphcommerce in the name ([@github-actions](https://github.com/apps/github-actions))

## 4.30.1

### Patch Changes

- [#1724](https://github.com/graphcommerce-org/graphcommerce/pull/1724) [`0c54f0b78`](https://github.com/graphcommerce-org/graphcommerce/commit/0c54f0b7828d78df373a96dc6d6dcd1ee108704f) Thanks [@paales](https://github.com/paales)! - Fix issue where the build version of next-config wasn't available

## 4.30.0

### Minor Changes

- [#1613](https://github.com/graphcommerce-org/graphcommerce/pull/1613) [`6c1c69ca4`](https://github.com/graphcommerce-org/graphcommerce/commit/6c1c69ca45ea1c8737cc7dcdc341fe5d825ed380) Thanks [@paales](https://github.com/paales)! - Refactor next-config to also use the new resolveDependenciesSync by exposing withGraphCommerce

### Patch Changes

- [#1702](https://github.com/graphcommerce-org/graphcommerce/pull/1702) [`abb15ef4a`](https://github.com/graphcommerce-org/graphcommerce/commit/abb15ef4a79b12eddb32cc006e5d1d31dd06ac2d) Thanks [@paales](https://github.com/paales)! - Added canary releases to GraphCommerce

## 3.2.0

### Minor Changes

- [#1600](https://github.com/graphcommerce-org/graphcommerce/pull/1600) [`7949c1ce1`](https://github.com/graphcommerce-org/graphcommerce/commit/7949c1ce1fd9babba5f7a440e2bb18e71f7ea515) Thanks [@paales](https://github.com/paales)! - Allow for multiple packages to be watched by webpack at the same time

## 3.1.6

### Patch Changes

- [#1552](https://github.com/graphcommerce-org/graphcommerce/pull/1552) [`18054c441`](https://github.com/graphcommerce-org/graphcommerce/commit/18054c441962ba750bed3acc39ab46c8d3a341ce) Thanks [@paales](https://github.com/paales)! - Updated to Next.js v12.2.2 and other packages and made compatible

## 3.1.5

### Patch Changes

- [#1490](https://github.com/graphcommerce-org/graphcommerce/pull/1490) [`d311ef48b`](https://github.com/graphcommerce-org/graphcommerce/commit/d311ef48bb3e97806d992af5516d6b7f183ec9cb) Thanks [@paales](https://github.com/paales)! - upgraded packages

## 3.1.4

### Patch Changes

- [#1426](https://github.com/graphcommerce-org/graphcommerce/pull/1426) [`100f4c38c`](https://github.com/graphcommerce-org/graphcommerce/commit/100f4c38c8fcda4bc6e0425e38028b550b60adc2) Thanks [@paales](https://github.com/paales)! - Upgrade packages

## 3.1.3

### Patch Changes

- [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542) Thanks [@paales](https://github.com/paales)! - Now using [@graphql-yoga](https://github.com/dotansimha/graphql-yoga) for GraphQL which has full support for [envelop](https://www.envelop.dev/) plugins.

* [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542) Thanks [@paales](https://github.com/paales)! - Added a new @graphcommerce/cli package to generate the mesh so it can be generated _inside_ the @graphcommerce/graphql-mesh package to allow for better future extensibility.

- [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`da0ae7d02`](https://github.com/graphcommerce-org/graphcommerce/commit/da0ae7d0236e4908ba0bf0fa16656be516e841d4) Thanks [@paales](https://github.com/paales)! - Updated dependencies

## 3.1.2

### Patch Changes

- [#1378](https://github.com/graphcommerce-org/graphcommerce/pull/1378) [`b610a6e40`](https://github.com/graphcommerce-org/graphcommerce/commit/b610a6e4049e8c9e8b5d2aeff31b8e1bfc24abe5) Thanks [@paales](https://github.com/paales)! - Pin all versions internally so we can’t end up in an unfixable state for the user

## 3.1.1

### Patch Changes

- [#1369](https://github.com/graphcommerce-org/graphcommerce/pull/1369) [`ae6449502`](https://github.com/graphcommerce-org/graphcommerce/commit/ae64495024a455bbe5188588604368c1542840c9) Thanks [@paales](https://github.com/paales)! - Upgraded dependencies

## 3.1.0

### Minor Changes

- [#1341](https://github.com/graphcommerce-org/graphcommerce/pull/1341) [`47a03c6c7`](https://github.com/graphcommerce-org/graphcommerce/commit/47a03c6c764cb1f544d3de3af52456608694a9d7) Thanks [@paales](https://github.com/paales)! - Files in node_modules/@graphcommerce will now also be watched and won’t be cached

### Patch Changes

- [#1341](https://github.com/graphcommerce-org/graphcommerce/pull/1341) [`2e29c5852`](https://github.com/graphcommerce-org/graphcommerce/commit/2e29c585247d356e3027be92beb7815f2070c855) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

## 3.0.4

### Patch Changes

- [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655) Thanks [@paales](https://github.com/paales)! - All default exports are now named exports internally and all `index.tsx` are renamed to the component name.

* [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

## 3.0.3

### Patch Changes

- [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96) Thanks [@paales](https://github.com/paales)! - made packages public

* [#1278](https://github.com/ho-nl/m2-pwa/pull/1278) [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Upgraded dependencies to the latest version

## 3.0.2

### Patch Changes

- [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2) Thanks [@paales](https://github.com/paales)! - We've moved lots of internal packages from `dependencies` to `peerDependencies`. The result of this is that there will be significantly less duplicate packages in the node_modules folders.

* [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d) Thanks [@paales](https://github.com/paales)! - Upgraded to [NextJS 12.1](https://nextjs.org/blog/next-12-1)! This is just for compatibility, but we'll be implementing [On-demand Incremental Static Regeneration](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta) soon.

  This will greatly reduce the requirement to rebuid stuff and we'll add a management UI on the frontend to be able to revalidate pages manually.

## 3.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514) Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files, so that the packages link to back to the website and repository

## 3.0.0

### Major Changes

- [#1258](https://github.com/ho-nl/m2-pwa/pull/1258) [`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05) Thanks [@paales](https://github.com/paales)! - Upgraded to Material UI 5

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.109.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.108.0...@graphcommerce/next-config@2.109.0) (2021-11-12)

### Features

- added tons of translations ([9bb0ac7](https://github.com/ho-nl/m2-pwa/commit/9bb0ac709b58df6ea6141e92e4923a5ca9ae2963))

# [2.108.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.107.3...@graphcommerce/next-config@2.108.0) (2021-11-09)

### Features

- **next-config:** support for .po files to be imported ([79b64ce](https://github.com/ho-nl/m2-pwa/commit/79b64ce9b444fcf620279d9a8e5d253b8e9cfa84))

# [2.107.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.106.1...@graphcommerce/next-config@2.107.0) (2021-10-27)

### Features

- **nextjs:** upgraded to nextjs 12 ([9331bc8](https://github.com/ho-nl/m2-pwa/commit/9331bc801f6419522115cc47d291d49d608d5a90))

# [2.106.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.105.1...@graphcommerce/next-config@2.106.0) (2021-10-20)

### Features

- **next-config:** support topLevelAwait ([3cb4f90](https://github.com/ho-nl/m2-pwa/commit/3cb4f90ac3af797f5fcba888dfd28aa2b76480b8))

## [2.105.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.105.0...@graphcommerce/next-config@2.105.1) (2021-10-19)

### Bug Fixes

- **next-config:** make sure webpack is available ([46edb3e](https://github.com/ho-nl/m2-pwa/commit/46edb3e6fd1b716d7d9dbe59cb1530375d24c228))

# [2.105.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.104.7...@graphcommerce/next-config@2.105.0) (2021-10-19)

### Bug Fixes

- **next-config:** move the @apollo/client **DEV** env to next-config ([fb1df3f](https://github.com/ho-nl/m2-pwa/commit/fb1df3fe4edbf769afb4149c7beced70bb948be5))

### Features

- **mesh:** move to a default .meshrc.yml format instead of the json file ([d9a30a7](https://github.com/ho-nl/m2-pwa/commit/d9a30a78baed2b85b77bbd80e94a6f047e2255b6))

## [2.104.4](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.104.3...@graphcommerce/next-config@2.104.4) (2021-10-07)

### Bug Fixes

- replace **DEV** with proper variable for optimizing the bundle size ([9b03209](https://github.com/ho-nl/m2-pwa/commit/9b032095f618846d132c00b8dc14fbb1b09c6ed8))

## [2.104.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.104.2...@graphcommerce/next-config@2.104.3) (2021-09-30)

### Bug Fixes

- .next folder doesn't always exist on vercel ([5f8f1a7](https://github.com/ho-nl/m2-pwa/commit/5f8f1a7c2c6690be113adfe2fef662c63781e91f))

## [2.104.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.104.1...@graphcommerce/next-config@2.104.2) (2021-09-29)

### Bug Fixes

- cache dependencylist ([257da86](https://github.com/ho-nl/m2-pwa/commit/257da860c22a7134896e99e2fcf9f67c0ce99363))

## [2.104.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.104.0...@graphcommerce/next-config@2.104.1) (2021-09-28)

### Bug Fixes

- do not build on install ([254e2a6](https://github.com/ho-nl/m2-pwa/commit/254e2a6f4b2a7e81f46466a0abe06ae2f3a79575))

# [2.104.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.103.0...@graphcommerce/next-config@2.104.0) (2021-09-28)

### Features

- created withYarn1Scopes functionality so we don't rely on actual workspaces ([7e491ca](https://github.com/ho-nl/m2-pwa/commit/7e491ca2276028a8587f6cd88b98ee451755c3d0))

# [2.103.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.102.3...@graphcommerce/next-config@2.103.0) (2021-09-28)

### Bug Fixes

- withYarn1Workspaces is not a function ([a095bc9](https://github.com/ho-nl/m2-pwa/commit/a095bc9f0011fbe9180d0e1718f1b41e89a5f6d9))

### Features

- add postinstall commands to run properly on deploy ([d512ee3](https://github.com/ho-nl/m2-pwa/commit/d512ee3ba5c3a9573651ec5333595fe2f1aa141c))

## [2.102.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.102.2...@graphcommerce/next-config@2.102.3) (2021-09-27)

### Bug Fixes

- build packages before releasing ([c4761cf](https://github.com/ho-nl/m2-pwa/commit/c4761cf6d1810c140fd56f6eac8fca922f8c0edc))

## [2.102.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.102.0...@graphcommerce/next-config@2.102.2) (2021-09-27)

### Bug Fixes

- add warnings to next.config.js when .env variables are missing ([d9dffec](https://github.com/ho-nl/m2-pwa/commit/d9dffec8ebc9cb1c70ca5591cad5e42c9bbe30e6))

## [2.102.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.102.0...@graphcommerce/next-config@2.102.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/next-config

# 2.102.0 (2021-09-27)

### Bug Fixes

- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
- **next-config:** another shot at fixing next-config ([a4afe11](https://github.com/ho-nl/m2-pwa/commit/a4afe112aa1308c10bb407d5e3eebf1f239d789c))
- **next-config:** automatically resolve the workspace dependencies ([4d739ec](https://github.com/ho-nl/m2-pwa/commit/4d739ec969591f96392f99e476016c6ad1d092cb))
- playwright can't find the place order button ([b1fda5b](https://github.com/ho-nl/m2-pwa/commit/b1fda5b3e403dad621aba8ed895427f2166bc985))

### Features

- **framer-sheet:** created separate package that can be implemented ([69cc8ce](https://github.com/ho-nl/m2-pwa/commit/69cc8ce3237125335524728a70f4dae050032108))
- **next-config:** introduced package to streamline the setup of new examples ([b8a3958](https://github.com/ho-nl/m2-pwa/commit/b8a39584e5b529fcaa22db67d3f986b91ae683ad))
- next.js 11 ([7d61407](https://github.com/ho-nl/m2-pwa/commit/7d614075a778f488045034f74be4f75b93f63c43))
- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of [@reachdigital](https://github.com/reachdigital) ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.101.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.101.0...@graphcommerce/next-config@2.101.1) (2021-09-01)

### Bug Fixes

- playwright can't find the place order button ([b1fda5b](https://github.com/ho-nl/m2-pwa/commit/b1fda5b3e403dad621aba8ed895427f2166bc985))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.100.10...@graphcommerce/next-config@2.101.0) (2021-08-12)

### Features

- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.100.10](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.100.9...@graphcommerce/next-config@2.100.10) (2021-08-09)

### Bug Fixes

- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
