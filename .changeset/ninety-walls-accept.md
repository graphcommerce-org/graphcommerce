---
'@graphcommerce/docs': major
'@graphcommerce/magento-graphcms': major
'@graphcommerce/magento-open-source': major
'@graphcommerce/address-fields-nl': major
'@graphcommerce/algolia-categories': major
'@graphcommerce/algolia-insights': major
'@graphcommerce/algolia-personalization': major
'@graphcommerce/algolia-products': major
'@graphcommerce/algolia-recommend': major
'@graphcommerce/algolia-search': major
'@graphcommerce/cli': major
'@graphcommerce/demo-magento-graphcommerce': major
'@graphcommerce/ecommerce-ui': major
'@graphcommerce/framer-next-pages': major
'@graphcommerce/framer-next-pages-example': major
'@graphcommerce/framer-scroller': major
'@graphcommerce/framer-scroller-example': major
'@graphcommerce/framer-utils': major
'@graphcommerce/google-datalayer': major
'@graphcommerce/google-playstore': major
'@graphcommerce/googleanalytics': major
'@graphcommerce/googlerecaptcha': major
'@graphcommerce/googletagmanager': major
'@graphcommerce/graphcms-ui': major
'@graphcommerce/graphql': major
'@graphcommerce/graphql-mesh': major
'@graphcommerce/hygraph-cli': major
'@graphcommerce/hygraph-dynamic-rows': major
'@graphcommerce/hygraph-dynamic-rows-ui': major
'@graphcommerce/hygraph-ui': major
'@graphcommerce/image': major
'@graphcommerce/image-example': major
'@graphcommerce/lingui-next': major
'@graphcommerce/magento-cart': major
'@graphcommerce/magento-cart-checkout': major
'@graphcommerce/magento-cart-coupon': major
'@graphcommerce/magento-cart-email': major
'@graphcommerce/magento-cart-items': major
'@graphcommerce/magento-cart-payment-method': major
'@graphcommerce/magento-cart-pickup': major
'@graphcommerce/magento-cart-shipping-address': major
'@graphcommerce/magento-cart-shipping-method': major
'@graphcommerce/magento-category': major
'@graphcommerce/magento-cms': major
'@graphcommerce/magento-compare': major
'@graphcommerce/magento-customer': major
'@graphcommerce/magento-graphql': major
'@graphcommerce/magento-graphql-rest': major
'@graphcommerce/magento-newsletter': major
'@graphcommerce/magento-payment-adyen': major
'@graphcommerce/magento-payment-braintree': major
'@graphcommerce/magento-payment-included': major
'@graphcommerce/magento-payment-klarna': major
'@graphcommerce/magento-payment-multisafepay': major
'@graphcommerce/magento-payment-paypal': major
'@graphcommerce/magento-payment-tokens': major
'@graphcommerce/magento-product': major
'@graphcommerce/magento-product-bundle': major
'@graphcommerce/magento-product-configurable': major
'@graphcommerce/magento-product-downloadable': major
'@graphcommerce/magento-product-grouped': major
'@graphcommerce/magento-product-simple': major
'@graphcommerce/magento-product-virtual': major
'@graphcommerce/magento-recently-viewed-products': major
'@graphcommerce/magento-review': major
'@graphcommerce/magento-search': major
'@graphcommerce/magento-search-overlay': major
'@graphcommerce/magento-store': major
'@graphcommerce/magento-wishlist': major
'@graphcommerce/mollie-magento-payment': major
'@graphcommerce/next-ui': major
'@graphcommerce/react-hook-form': major
'@graphcommerce/service-worker': major
'@graphcommerce/browserslist-config-pwa': major
'@graphcommerce/changeset-changelog': major
'@graphcommerce/eslint-config-pwa': major
'@graphcommerce/graphql-codegen-markdown-docs': major
'@graphcommerce/graphql-codegen-near-operation-file': major
'@graphcommerce/graphql-codegen-relay-optimizer-plugin': major
'@graphcommerce/misc': major
'@graphcommerce/next-config': major
'@graphcommerce/prettier-config-pwa': major
'@graphcommerce/typescript-config-pwa': major
---

## GraphCommerce 10 - Turbopack Support

This major release brings full Turbopack compatibility, dramatically improving development speed.

### 🚀 Turbopack-Compatible Interceptor System

The entire plugin/interceptor system has been rewritten to work with Turbopack:

- **No more Webpack plugins** - Removed `InterceptorPlugin` webpack plugin entirely
- **File-based interception** - Original files are moved to `.original.tsx` and replaced with interceptor content
- **Direct imports** - Interceptors import from `.original` files instead of embedding source
- **New CLI commands**:
  - `graphcommerce codegen-interceptors` - Generate interceptor files
  - `graphcommerce cleanup-interceptors` - Reset interceptor system, restore original files
- **Stable file hashing** - Deterministic interceptor generation for better caching

### ⚙️ Treeshakable Configuration System

Replaced Webpack `DefinePlugin`-based `import.meta.graphCommerce` with a new generated configuration system:

- **New `codegen-config-values` command** - Generates TypeScript files with precise typing
- **Schema-driven** - Dynamically introspects Zod schemas to determine all available properties
- **Fully treeshakable** - Unused config values are eliminated from the bundle
- **Type-safe** - Uses `Get<GraphCommerceConfig, 'path'>` for nested property access
- **Separate files for nested objects** - Optimal treeshaking for complex configurations

### 🔧 withGraphCommerce Changes

- **Removed** `InterceptorPlugin` - No longer needed with file-based interception
- **Removed** `DefinePlugin` for `import.meta.graphCommerce` - Replaced with generated config
- **Removed** `@mui/*` alias rewrites - No longer required
- **Added** Turbopack loader rules for `.yaml`, `.yml`, and `.po` files
- **Added** `serverExternalPackages` for all `@whatwg-node/*` packages
- **Added** `optimizePackageImports` for better bundle optimization
- **Added** `images.qualities: [52, 75]` for Next.js image optimization

### 📦 Lingui Configuration

- **Renamed** `lingui.config.js` → `lingui.config.ts` with TypeScript support
- **Updated** `@graphcommerce/lingui-next/config` to TypeScript with proper exports
- **Simplified** formatter options

### ⚛️ React 19 & Next.js 16 Compatibility

- Updated `RefObject<T>` types for React 19 (now includes `null` by default)
- Replaced deprecated `React.VFC` with `React.FC`
- Fixed `useRef` calls to require explicit initial values
- Updated `MutableRefObject` usage in `framer-scroller`

### 📋 ESLint 9 Flat Config

- Migrated from legacy `.eslintrc` to new flat config format (`eslint.config.mjs`)
- Updated `@typescript-eslint/*` packages to v8
- Fixed AST selector for `SxProps` rule (`typeParameters` → `typeArguments`)

### 🔄 Apollo Client

- Fixed deprecated `name` option → `clientAwareness: { name: 'ssr' }`
- Updated error handling types to accept `ApolloError | null | undefined`

### ⚠️ Breaking Changes

- **Node.js 24.x not supported** - Restricted to `>=20 <24.0.0` due to [nodejs/undici#4290](https://github.com/nodejs/undici/issues/4290)
- **Interceptor files changed** - Original components now at `.original.tsx`
- **Config access changed** - Use generated config values instead of `import.meta.graphCommerce`
- **ESLint config format** - Must use flat config (`eslint.config.mjs`)
- **Lingui config** - Rename `lingui.config.js` to `lingui.config.ts`

### 🗑️ Removed

- `InterceptorPlugin` webpack plugin
- `configToImportMeta` utility
- Webpack `DefinePlugin` usage for config
- `@mui/*` modern alias rewrites
- Debug plugins (`CircularDependencyPlugin`, `DuplicatesPlugin`)
