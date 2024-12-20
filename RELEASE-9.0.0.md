# GraphCommerce 9.0.0 Release Notes

## 🚀 New Features

- Added `<CompanyFields/>` with `<CompanyName />` and `<CompanyVAT />` to shipping and billing forms. (@Giovanni-Schroevers)
  [magento-cart](#package-magento-cart) [magento-cart-billing-address](#package-magento-cart-billing-address) [magento-cart-shipping-address](#package-magento-cart-shipping-address) [magento-customer](#package-magento-customer) [next-config](#package-next-config) [magento-graphcms](#package-magento-graphcms)

- Add `permissions` configuration to disable functionalities.

  - Added new `permissions` configuration for GraphCommerce
  - Added `permissions.cart`: `ENABLED` | `CUSTOMER_ONLY` | `DISABLED`
  - Added `permissions.checkout`: `ENABLED` | `CUSTOMER_ONLY` | `DISABLED`
  - Added `permissions.customerAccount`: `ENABLED` | `DISABLE_REGISTRATION` | `DISABLE` ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))
- INP improvements: Moved all usages of `useFormPersist` to the `<FormPersist/>` component to prevent rerenders. (@FrankHarland)
  [magento-cart](#package-magento-cart) [magento-cart-payment-method](#package-magento-cart-payment-method) [magento-cart-shipping-address](#package-magento-cart-shipping-address) [magento-cart-shipping-method](#package-magento-cart-shipping-method) [magento-compare](#package-magento-compare) [magento-customer](#package-magento-customer) [magento-newsletter](#package-magento-newsletter) [magento-payment-adyen](#package-magento-payment-adyen) [magento-payment-multisafepay](#package-magento-payment-multisafepay) [mollie-magento-payment](#package-mollie-magento-payment)

- Added the ability to edit cart items with full support for all product types and custom options (@Jessevdpoel)
  [magento-cart-items](#package-magento-cart-items)

- Add a 'Save in address book' checkbox to the shipping address form. (@Giovanni-Schroevers)
  [magento-cart-shipping-address](#package-magento-cart-shipping-address) [magento-graphcms](#package-magento-graphcms)

- Add the `customerNote` field to the shipping and customer address forms. Added configuration `customerAddressNoteEnable` to enable or disable the field. (@Giovanni-Schroevers)
  [magento-cart-shipping-address](#package-magento-cart-shipping-address) [next-config](#package-next-config)

- Added support for real `<Breadcrumbs/>` on the frontend. (@Jessevdpoel)
  [magento-category](#package-magento-category) [magento-product](#package-magento-product) [next-ui](#package-next-ui)

- Show category siblings if a category has no children, will be shown in location where children are located. (@Jessevdpoel)
  [magento-category](#package-magento-category)

- Added option to change sort order (ASC / DESC) for sort options (Name, price, position etc) on catalog and search pages. (@FrankHarland)
  [magento-category](#package-magento-category) [magento-product](#package-magento-product) [next-config](#package-next-config) [magento-graphcms](#package-magento-graphcms)

- Magento 2.4.7: Implemented `cancelOrder` mutation and added a cancel order overlay to the account section. (@Giovanni-Schroevers)
  [magento-customer](#package-magento-customer) [magento-store](#package-magento-store) [magento-graphcms](#package-magento-graphcms)

- Magento 2.4.7: Imlemented `deleteCustomer` mutation to the account section. Disabled by default and can be enabled through the config. (@Giovanni-Schroevers)
  [magento-customer](#package-magento-customer) [next-ui](#package-next-ui) [next-config](#package-next-config) [magento-graphcms](#package-magento-graphcms)

- Add `reorderItems` mutation, add `reorder` button to order detail page. (@Giovanni-Schroevers)
  [magento-customer](#package-magento-customer)

- Magento 2.4.7: Implement the `contactUs` mutation, add contact us overlay. (@Giovanni-Schroevers)
  [magento-customer](#package-magento-customer) [magento-graphcms](#package-magento-graphcms)

- Added support `X-Magento-Cache-Id` to allow Varnish to cache requests that are made in the browser while users are logged in. For example the products query can now be cached for logged in users. Functionality can be disabled by setting `customerXMagentoCacheIdDisable: true` in your configuration. (@paales)
  [magento-customer](#package-magento-customer)

- Magento 2.4.7: Add `guestOrder` functionality. (@Giovanni-Schroevers)
  [magento-customer](#package-magento-customer) [graphql](#package-graphql) [next-ui](#package-next-ui) [magento-graphcms](#package-magento-graphcms)

- Magento 2.4.7: implement confirmEmail mutation (@Giovanni-Schroevers)
  [magento-customer](#package-magento-customer) [magento-store](#package-magento-store) [magento-graphcms](#package-magento-graphcms)

- Magento 2.4.7: Created a GraphQL query field for products: `custom_attribute(attribute_code: "attribute_code")` to retrieve attribute option value labels. This is different from the `custom_attributes` endpoint (note the plural) and allows for retrieving singular attribute values, like brand or any other select or multiselect attribute. (@paales)
  [magento-graphql](#package-magento-graphql)

- Magento 2.4.7: Added a `magentoVersion` configuration value to be able to differentiate features based on the Magento version. GraphCommerce will automatically load any schema's that are defined in later version of Magento, allowing GraphCommerce to be forward compatible. See [schema-246](https://github.com/graphcommerce-org/graphcommerce/tree/canary/packages/magento-graphql/schema-246) and [schema-247](https://github.com/graphcommerce-org/graphcommerce/tree/canary/packages/magento-graphql/schema-247) directories for the changes made to the schema. This is only for compatibility and doesn't make the functionality work. (@paales)
  [magento-graphql](#package-magento-graphql)

- Created a new `@graphcommerce/magento-graphql-rest` package to integrate with Magento's REST API. By default allows you to retrieve the customer with `m2rest_GetV1CustomersMe` and only provides the `group_id` additionally on the customer. (@Renzovh)
  [magento-graphql-rest](#package-magento-graphql-rest)

- Add option to show an extended version of the pagination component. Configurable via the `productListPaginationVariant` key in your `graphcommerce.config.js`. `COMPACT` means: `< Page X of Y >` and `EXTENDED` means: `< 1 2 ... [5] ... 10 11 >` (@FrankHarland)
  [magento-product](#package-magento-product) [next-ui](#package-next-ui) [next-config](#package-next-config) [docs](#package-docs)

- Magento 2.4.7: Use `custom_attributesV2` for product specs. (@Giovanni-Schroevers)
  [magento-product](#package-magento-product) [magento-graphcms](#package-magento-graphcms)

- Added functionality to constrain the container sizing of the frontend. Added a new configuration `containerSizingShell` and `containerSizingContent` configuration options. Actual sizing can be configured in the `theme.ts`. (@StefanAngenent)
  [magento-product](#package-magento-product) [magento-graphcms](#package-magento-graphcms)

- Completely new SearchOverlay package this is compatible with Magento's default search as well as any other implementation like Algolia and Adobe Sensei. (@paales)
  [magento-search](#package-magento-search) [magento-search-overlay](#package-magento-search-overlay)

- Algolia: Enables Algolia category search in GraphQL Mesh. Integrated Algolia category search into the `categories` type within the Mesh. This will only be used on search pages. (@Renzovh)
  [algolia-categories](#package-algolia-categories)

- Algolia: Integrated algolia personalisation and algolia analytics into GraphQL Mesh. Built user profiles and gives user personalised results. Keep track of the user data and view in algolia analytics dashboard. (@Renzovh)
  [algolia-personalization](#package-algolia-personalization)

- Algolia: Added search suggestions (@Renzovh)
  [algolia-products](#package-algolia-products)

- Algolia: Magento 2 implemented as a GraphQL Mesh resolver: Allows full integration without modying any frontend components. (@Renzovh)
  [algolia-products](#package-algolia-products)

- Algolia: Integrated product queries into graphql-mesh. Provides fast and accurate searches, that can be personalised via magento-algolia and its algolia dashboard (@Renzovh)
  [algolia-products](#package-algolia-products)

- Algolia: Integrated algolia recommend queries into graphql mesh. Provide accurate upsells and related products on pdp pages (@Renzovh)
  [algolia-recommend](#package-algolia-recommend)

- Update manifest for app store submission (@ErwinOtten)
  [google-playstore](#package-google-playstore)

- Added Draft Mode support. When enabled it will be shown. (@paales)
  [graphcms-ui](#package-graphcms-ui) [graphql](#package-graphql) [hygraph-dynamic-rows-ui](#package-hygraph-dynamic-rows-ui)

- Created a new `@graphql-mesh` plugin to forward headers from backends as `forwardedHeaders` in extensions. (@paales)
  [graphql-mesh](#package-graphql-mesh)

- Added `<MediaQuery/>` Component: Render (and hydrate) a Component based on a media query given.

  ```tsx
  <MediaQuery query={(theme) => theme.breakpoints.up('md')}>
    <MyExpensiveDesktopComponent>
      Only visisble on desktop
    </MyExpensiveDesktopComponent>
  </MediaQuery>
  ```

  When to use, replacement for:

  1. useMediaQuery: When you are now using useMediaQuery to conditionally render content for mobile or desktop. a. Is very slow as it has to wait for the JS to initialize on pageload. b. Can cause CLS problems if the useMediaQuery is used to render elements in the viewport. c. Can cause LCP issues if useMediaQuery is used to render the LCP element. d. Causes TBT problems as a component always needs to be rerendered. (And bad TBT can cause INP problems) e. HTML isn't present in the DOM, which can cause SEO issues.
  2. CSS Media query: When you are using CSS to show or hide content based on media queries. a. Causes TBT problems as both code paths need to be rendered. (And bad TBT can cause INP problems)

  It wraps the component in a div that has 'display: contents;' when shown and 'display: none;' when hidden so it should not interfere with other styling. It conditionally hydrates the component if the query matches. If it doesn't match, it will NOT hydrate the component (and thus not execute the JS). (@bramvanderholst)
  [next-ui](#package-next-ui)

- Created a `cssFlags` functionality which allows showing content based on a value in the local storage. This allows hiding/showing small things (is logged in / light or darkmode) (@Giovanni-Schroevers)
  [next-ui](#package-next-ui)

- Big INP improvments: Moved all usages of `useFormPersist` to the `<FormPersist/>` component to prevent rerenders. (@FrankHarland)
  [react-hook-form](#package-react-hook-form)

- Moved to [serwist](https://serwist.pages.dev/) for service workers. (@paales)
  [service-worker](#package-service-worker) [docs](#package-docs)

- All fragments are now `@injectable` by default and the `@injectable` directive isn't required anymore. Always accept `@inject` directives. (@paales)
  [graphql-codegen-near-operation-file](#package-graphql-codegen-near-operation-file)

- Migrated to `next.config.ts` (@paales)
  [next-config](#package-next-config)

- Big improvements to the plugin system: Typescript validated, deeper resolution, new configuration object, replace plugins, and more ifConfig options.

  1. Plugins now use TypeScript's `"moduleSuffixes": [".interceptor", ""]` [functionality](https://www.typescriptlang.org/tsconfig#moduleSuffixes) which means that plugins now correctly resolve via TypeScript. So if you *go to reference* in VSCode (or any other editor), you go to the interceptor directly and see which plugins are applied there. This also means that plugins are automatically checked during build (and will fail if there are errors).

  2. The exported type of an *intercepted component* now has the types of all plugins applied. This means that plugins can modify the props of components (and is still validated with TypeScript). To make this work a plugin must always forward props to the `<Prev>` to ensure that values are correctly passed on.

  3. Plugins will now always be applied to deepest resolved path. This means that a plugin automatically applies to internal usages as well. This thus means that plugins do not need to be written with an internal path, but can keep the parent path. Istead of writing `@graphcommerce/magento-cart-items/components/RemoveItemFromCart/RemoveItemFromCartFab` you can now write `@graphcommerce/magento-cart-items`.

  4. A new configuration object for plugins is created instead of separate exports (the legacy format is still supported though):

     ```tsx
     export const config: PluginConfig = {
       type: 'component'
       module: '@graphcommerce/magento-product',
       ifConfig: 'demoMode',
     }
     ```

     This also means that the *name of the export* dictates the name of the component/function the plugin is applied.

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
- Fully replaced the sitemap and robots.txt generation. We previously relied on next-sitemap to generate the sitemap based on static generated pages. However with bigger shops the SSG woudn't be complete. Full support for multi domain setups. (@bramvanderholst)
  [magento-graphcms](#package-magento-graphcms) [docs](#package-docs)

- Play store publishing to be able to submit to the playstore. (@ErwinOtten)
  [magento-graphcms](#package-magento-graphcms)


## ✨ Small Improvements

- Created a new `<EmailElement/>` component to make re-use easier. (@Giovanni-Schroevers)
  [magento-cart](#package-magento-cart) [magento-cart-email](#package-magento-cart-email) [magento-customer](#package-magento-customer) [ecommerce-ui](#package-ecommerce-ui)

- Created a new `<TelephoneElement />` component to make re-use easier. (@Giovanni-Schroevers)
  [magento-cart-billing-address](#package-magento-cart-billing-address) [magento-cart-shipping-address](#package-magento-cart-shipping-address) [magento-customer](#package-magento-customer) [ecommerce-ui](#package-ecommerce-ui)

- Replace deprecated `updateCustomer` mutations with `updateCustomerV2`. (@Giovanni-Schroevers)
  [magento-customer](#package-magento-customer) [magento-newsletter](#package-magento-newsletter)

- Magento 2.4.7: To make the `custom_attribute` field more valueable, we've added an `attribute`-field to the `AttributeValueInterface` to be able to retrieve attribute metadata from the value of an attribute. To be able
  [magento-graphql](#package-magento-graphql)

- Created a new \`
  [magento-newsletter](#package-magento-newsletter)

- Allow Lingui to use `linguiLocale` with country identifiers like `en-us`, it would always load `en` in this case. Introduced a new `useLocale` hook to use the correct locale string to use in Intl methods. (@paales)
  [magento-product](#package-magento-product) [magento-product-configurable](#package-magento-product-configurable) [lingui-next](#package-lingui-next) [next-ui](#package-next-ui) [next-config](#package-next-config) [docs](#package-docs)

- When generating the mesh the configuration is passed through `@graphcommerce/graphql-mesh/meshConfig` allowing plugins to modify the mesh configuration without having to change the `.meshrc.yaml` itself. (@Renzovh)
  [cli](#package-cli) [graphql-mesh](#package-graphql-mesh)

- Added separate sitemap for Hygraph pages (@bramvanderholst)
  [hygraph-ui](#package-hygraph-ui) [magento-graphcms](#package-magento-graphcms)

- Added Intl components, deprecated `useNumberFormat` and `useDateTimeFormatter`, and replaced usage sites. New components and hooks:

  - `<DisplayNames />` and `useIntlDisplayNames`
  - `<DateTimeFormat />`, `<DateFormat/>`, `<TimeFormat />` and `useIntlDateTimeFormat`
  - `<ListFormat />` and `useIntlListFormat`
  - `<CurrencyFormat />`, `<NumberFormat />`, `<UnitFormat />`, `<PercentFormat/>` and `useIntlNumberFormat` ([@paales](https://github.com/paales))
- Add props to `<DarkLightModeThemeProvider />` to disable dark/light mode or to change the default ssr mode. Save user chosen mode in localStorage. (@Giovanni-Schroevers)
  [next-ui](#package-next-ui)

- Added a new `<OverlayHeader />` component to be used in combination with the `<Overlay />` component. (@JoshuaS98)
  [next-ui](#package-next-ui)

- The `<LazyHydrate />` component now accepts a `height` prop that allows deferring of rendering of the child component when initially rendered on the client. This improves performance when used. (@paales)
  [next-ui](#package-next-ui)

- Added `<RelativeTimeFormat/>` and `<RelativeToTimeFormat/>` and `useIntlRelativeTimeFormat` to display relative dates in all locales. (@paales)
  [next-ui](#package-next-ui)

- Added new plugin insertion points: `<DocumentHeadStart/>`, `<DocumentHeadEnd/>`, `<DocumentBodyEnd/>`, `<DocumentBodyStart/>` for the `_document.app` to allow creating plugins for those locations to insert scripts etc. (@paales)
  [next-ui](#package-next-ui)

- Added a functionality to copy directories from packages to the project and keep them managed by the package. This allows for injecting additional routes etc. (@paales)
  [next-config](#package-next-config)

- Added `PRIVATE_ADDITIONAL_DEPENDENCIES` env variable support to enable packages that we do not want to have in the examples directory but we do want to be able to demo. (@paales)
  [next-config](#package-next-config)

- Added `PRIVATE_PACKAGE_NAMESPACES` env variable to have additional namespaces to be considered to be a graphcommerce package. (@paales)
  [next-config](#package-next-config)

- Created dedicated sitemap route for categories so it isn't dependend on static generation. (@bramvanderholst)
  [next-config](#package-next-config) [magento-graphcms](#package-magento-graphcms)

- Created dedicated sitemap route for products so it isn't dependend on static generation. (@bramvanderholst)
  [next-config](#package-next-config) [magento-graphcms](#package-magento-graphcms)


## 🐛 Fixes

- Get `shippingMethodPrices` from selected shipping method if supported on the magento version (@Giovanni-Schroevers)
  [magento-cart](#package-magento-cart)

- When signing in make sure the cart isn't merged if the login is unsuccesful. (@paales)
  [magento-cart](#package-magento-cart)

- Upgrade input components to no longer use `muiRegister`, which improves INP scores. (@FrankHarland)
  [magento-cart](#package-magento-cart) [magento-cart-billing-address](#package-magento-cart-billing-address) [magento-cart-coupon](#package-magento-cart-coupon) [magento-cart-shipping-address](#package-magento-cart-shipping-address) [magento-customer](#package-magento-customer) [magento-payment-adyen](#package-magento-payment-adyen) [magento-payment-included](#package-magento-payment-included) [magento-product](#package-magento-product) [magento-product-configurable](#package-magento-product-configurable) [magento-review](#package-magento-review) [ecommerce-ui](#package-ecommerce-ui) [next-ui](#package-next-ui) [react-hook-form](#package-react-hook-form) [next-config](#package-next-config) [magento-graphcms](#package-magento-graphcms)

- Solve an issue where the cart would be sometimes undefined, but a typescript `Partial` was too general. (@paales)
  [magento-cart](#package-magento-cart)

- Enable the use of one or more anchor links within the `checkbox_text` field and customize their paths. (@carlocarels90)
  [magento-cart](#package-magento-cart)

- Pass `sx` props to `<EmptyCart/>` component. (@JoshuaS98)
  [magento-cart](#package-magento-cart)

- Fix bug with persist not applying saved changes by moving `<FromPersist/>` below the form components. (@Giovanni-Schroevers)
  [magento-cart](#package-magento-cart) [magento-cart-payment-method](#package-magento-cart-payment-method) [magento-cart-shipping-address](#package-magento-cart-shipping-address) [magento-compare](#package-magento-compare) [magento-customer](#package-magento-customer) [magento-newsletter](#package-magento-newsletter) [magento-payment-adyen](#package-magento-payment-adyen) [magento-payment-multisafepay](#package-magento-payment-multisafepay) [mollie-magento-payment](#package-mollie-magento-payment) [react-hook-form](#package-react-hook-form)

- Made all component prop types exported (@bramvanderholst)
  [magento-cart](#package-magento-cart) [magento-cart-items](#package-magento-cart-items) [magento-cart-shipping-address](#package-magento-cart-shipping-address) [magento-cart-shipping-method](#package-magento-cart-shipping-method) [magento-category](#package-magento-category) [magento-compare](#package-magento-compare) [magento-customer](#package-magento-customer) [magento-newsletter](#package-magento-newsletter) [magento-pagebuilder](#package-magento-pagebuilder) [magento-product](#package-magento-product) [magento-product-bundle](#package-magento-product-bundle) [magento-product-configurable](#package-magento-product-configurable) [magento-product-downloadable](#package-magento-product-downloadable) [magento-product-grouped](#package-magento-product-grouped) [magento-review](#package-magento-review) [magento-search](#package-magento-search) [magento-store](#package-magento-store) [magento-wishlist](#package-magento-wishlist) [algolia-search](#package-algolia-search) [ecommerce-ui](#package-ecommerce-ui) [framer-scroller](#package-framer-scroller) [graphcms-ui](#package-graphcms-ui) [mollie-magento-payment](#package-mollie-magento-payment) [next-ui](#package-next-ui)

- Add missing gutter to /checkout/item page (@bramvanderholst)
  [magento-cart](#package-magento-cart) [magento-graphcms](#package-magento-graphcms)

- Forward BadgeProps to WishlistFab, CartFab and CustomerFab (@paales)
  [magento-cart](#package-magento-cart) [magento-customer](#package-magento-customer) [magento-wishlist](#package-magento-wishlist)

- Prevent a reloading the `ShippingPage` query when selecting a shipping method. (@Giovanni-Schroevers)
  [magento-cart-checkout](#package-magento-cart-checkout)

- Rename `configurable_customizable` back to `customizable_options`. (@Giovanni-Schroevers)
  [magento-cart-items](#package-magento-cart-items) [magento-product](#package-magento-product) [magento-product-configurable](#package-magento-product-configurable)

- Rename `experimental_useV2` prop to `deprecated_useV1` in `useFromGql` and enable it by default. (@Giovanni-Schroevers)
  [magento-cart-items](#package-magento-cart-items) [magento-cart-shipping-address](#package-magento-cart-shipping-address) [magento-cart-shipping-method](#package-magento-cart-shipping-method) [magento-customer](#package-magento-customer) [magento-payment-braintree](#package-magento-payment-braintree) [magento-product](#package-magento-product) [react-hook-form](#package-react-hook-form)

- Removed `useMediaQuery` from the `<WishlistItemActionCard />` and `<CartItemActionCard />` and replaced it with a new responsive `size` prop. (@Jessevdpoel)
  [magento-cart-items](#package-magento-cart-items) [magento-wishlist](#package-magento-wishlist) [next-ui](#package-next-ui) [magento-graphcms](#package-magento-graphcms)

- Make sure the edit cart item isn't shown for an order (@paales)
  [magento-cart-items](#package-magento-cart-items)

- Solve issue where the `<CartEditForm />` would temporarily show an empty cart after saving. (@Giovanni-Schroevers)
  [magento-cart-items](#package-magento-cart-items)

- Create `useRemoveItemFromCart` hook to allow for reuse while keeping compatibility with plugins. (@Jessevdpoel)
  [magento-cart-items](#package-magento-cart-items) [google-datalayer](#package-google-datalayer)

- Use the non resolved payment methods as a placeholder for the actual payment methods (@FrankHarland)
  [magento-cart-payment-method](#package-magento-cart-payment-method)

- Solve issue where Braintree wouldn't place the order after successfully validating a Credit Card. (@paales)
  [magento-cart-payment-method](#package-magento-cart-payment-method) [magento-payment-braintree](#package-magento-payment-braintree)

- Due to a cyclic dependency the actual `<PaymentMethodPlaceOrder />` button would sometimes be undefined. (@paales)
  [magento-cart-payment-method](#package-magento-cart-payment-method)

- Prevent the `<BillingPage />` query from rerunning on each mutation. (@FrankHarland)
  [magento-cart-payment-method](#package-magento-cart-payment-method) [magento-payment-adyen](#package-magento-payment-adyen) [magento-payment-braintree](#package-magento-payment-braintree) [magento-product](#package-magento-product) [google-datalayer](#package-google-datalayer)

- Moved plugins to new format (@paales)
  [magento-cart-pickup](#package-magento-cart-pickup) [magento-compare](#package-magento-compare) [magento-payment-adyen](#package-magento-payment-adyen) [magento-payment-braintree](#package-magento-payment-braintree) [magento-payment-included](#package-magento-payment-included) [magento-payment-klarna](#package-magento-payment-klarna) [magento-payment-multisafepay](#package-magento-payment-multisafepay) [magento-payment-paypal](#package-magento-payment-paypal) [demo-magento-graphcommerce](#package-demo-magento-graphcommerce) [google-datalayer](#package-google-datalayer) [googleanalytics](#package-googleanalytics) [googlerecaptcha](#package-googlerecaptcha) [googletagmanager](#package-googletagmanager) [graphcms-ui](#package-graphcms-ui) [hygraph-dynamic-rows](#package-hygraph-dynamic-rows) [mollie-magento-payment](#package-mollie-magento-payment)

- In the shipping step show errors with a `<ApolloCartErrorSnackbar />` instead of a `<ApolloCartErrorAlert />`. (@Giovanni-Schroevers)
  [magento-cart-shipping-address](#package-magento-cart-shipping-address)

- When saving a shipping address it would always save the company after it was once saved. (@Giovanni-Schroevers)
  [magento-cart-shipping-address](#package-magento-cart-shipping-address)

- Fixed shipping address not getting set for logged-in customers with default address. (@bramvanderholst)
  [magento-cart-shipping-address](#package-magento-cart-shipping-address)

- Fixed `<CustomerAddressForm/>` resetting to a saved address when trying to use a new address. (@bramvanderholst)
  [magento-cart-shipping-address](#package-magento-cart-shipping-address)

- The billing and shipping address of a customer would not be recognized as the same address although they would effectively be the same (@FrankHarland)
  [magento-cart-shipping-address](#package-magento-cart-shipping-address)

- Select the only available shipping method as the current cart shipping method when there is only one shipping method available. (@LaurensFranken)
  [magento-cart-shipping-method](#package-magento-cart-shipping-method)

- Prevent rendering `null` when `method_title` is not provided. (@carlocarels90)
  [magento-cart-shipping-method](#package-magento-cart-shipping-method)

- Allow changing various props for internal components (@bramvanderholst)
  [magento-cart-shipping-method](#package-magento-cart-shipping-method) [magento-customer](#package-magento-customer) [magento-product](#package-magento-product) [magento-product-configurable](#package-magento-product-configurable) [magento-wishlist](#package-magento-wishlist) [ecommerce-ui](#package-ecommerce-ui) [next-ui](#package-next-ui)

- When a user access a category page which is beyond the available total\_pages, the user will be redirected to the last available page. (@paales)
  [magento-category](#package-magento-category) [magento-product](#package-magento-product) [magento-store](#package-magento-store)

- Redirect users to homepage after password reset as `router.back()` often returns an empty or invalid history state. (@carlocarels90)
  [magento-customer](#package-magento-customer) [magento-graphcms](#package-magento-graphcms)

- In some cases the `xMagentoCacheId` wasn't defined in the returned query, making sure the application doesn't crash. (@paales)
  [magento-customer](#package-magento-customer)

- Show actual order status from the backend, improve order state logic. (@Giovanni-Schroevers)
  [magento-customer](#package-magento-customer) [magento-graphcms](#package-magento-graphcms)

- Fix issues when using non-hex colors in theme (@bramvanderholst)
  [magento-customer](#package-magento-customer) [next-ui](#package-next-ui)

- The `<AddressCountryRegion/>` component would show a warning if the countries weren't loaded yet. It will now show a readonly field with the country code. (@Giovanni-Schroevers)
  [magento-customer](#package-magento-customer)

- Replace useWatch with watch in order to prevent email from being undefinded when already being prefilled for expired sessions (@Giovanni-Schroevers)
  [magento-customer](#package-magento-customer)

- Solve issue where persisted Form-data would remain in the sessionStorage after logging out. (@paales)
  [magento-customer](#package-magento-customer)

- The `useSignInForm` hook now optionally accepts an email prop. (@paales)
  [magento-customer](#package-magento-customer)

- fix session expired email not always available in cache (@StefanAngenent)
  [magento-customer](#package-magento-customer)

- Prevent overlap between autofilled data and input label for all TextFieldElements and its derivatives. (@carlocarels90)
  [magento-customer](#package-magento-customer)

- The `<CompanyFields />` toggle wouldn't be valid when Private was selected and would only validate if Business was selected. (@Giovanni-Schroevers)
  [magento-customer](#package-magento-customer)

- Check validation of email field in SignInForm and SignUpForm (@Giovanni-Schroevers)
  [magento-customer](#package-magento-customer)

- The `formData.region` value could be `undefined` when creating new address (@FrankHarland)
  [magento-customer](#package-magento-customer)

- Add `disableMargin` prop to `<WaitForCustomer/>` component. (@JoshuaS98)
  [magento-customer](#package-magento-customer)

- Prevent success message from showing up when updating the users email while the form is still submitting a new request to update the users email. (@Giovanni-Schroevers)
  [magento-customer](#package-magento-customer)

- Remove the privateContext directive from the query before sending to the server (@paales)
  [magento-customer](#package-magento-customer)

- fix session expired email not always available in cache (@StefanAngenent)
  [magento-customer](#package-magento-customer)

- Renamed useInContextQuery to usePrivateQuery (@paales)
  [magento-customer](#package-magento-customer) [magento-product](#package-magento-product) [magento-search](#package-magento-search) [algolia-personalization](#package-algolia-personalization) [graphql](#package-graphql)

- Avoid displaying `undefined` for `countryName` or `regionName`. (@carlocarels90)
  [magento-customer](#package-magento-customer)

- Add `X-Forwarded-For` header to mesh requests. (@SumVur)
  [magento-graphql](#package-magento-graphql)

- Payment method will now throw an error in `onComplete` to handle obscure errors. (@Giovanni-Schroevers)
  [magento-payment-adyen](#package-magento-payment-adyen) [magento-payment-included](#package-magento-payment-included) [magento-payment-multisafepay](#package-magento-payment-multisafepay) [mollie-magento-payment](#package-mollie-magento-payment)

- Fixed the Place order button not working (in dev mode) for certain payment methods. (@bramvanderholst)
  [magento-payment-included](#package-magento-payment-included)

- Move render logic from `<AddProductsToCartSnackbar />` to `<AddProductsToCartSnackbarMessage />` so this can be reused outside of `<AddProductsToCartForm />`. (@Giovanni-Schroevers)
  [magento-product](#package-magento-product)

- Hide ProductScroller components when no items are available (@bramvanderholst)
  [magento-product](#package-magento-product)

- Hide the `<SortChip />` or `<SortSection />` when there is only a single filter option. (@Renzovh)
  [magento-product](#package-magento-product)

- When applying a filter it would not always scroll to the `#products`. (@FrankHarland)
  [magento-product](#package-magento-product)

- Move to `attributesList` to get a list of filterable attributes instead of using an introspection query. `productFiltersProSectionRenderer` and `productFiltersProChipRenderer` keys now use `AttributeFrontendInputEnum`. (@paales)
  [magento-product](#package-magento-product) [magento-search](#package-magento-search)

- Fixed the products sitemap not containing more than 100 products when limit SSG is enabled (@rustmaestro)
  [magento-product](#package-magento-product)

- Allow adding elements after/between product list items (e.g. banners) (@bramvanderholst)
  [magento-product](#package-magento-product)

- Render multiple items in the `RowSpecs` table as a list. (@paales)
  [magento-product](#package-magento-product)

- Add requireOptionSelection boolean to prevent users from deselecting configurable options (@carlocarels90)
  [magento-product-configurable](#package-magento-product-configurable) [ecommerce-ui](#package-ecommerce-ui)

- Disable configurable product options that are unavailable for selection. (@carlocarels90)
  [magento-product-configurable](#package-magento-product-configurable)

- Fixed tier prices not working for non-configurable products. (@bramvanderholst)
  [magento-product-configurable](#package-magento-product-configurable)

- Respect configurableVariantValues.gallery config when selecting a configurable variant. The image should only change to the simple product image when the config is set to true, otherwise the configurable image should remain. To keep this functionality, please set `configurableVariantValues: { gallery: true }` in your graphcommerce.config.js (@bramvanderholst)
  [magento-product-configurable](#package-magento-product-configurable)

- Added clear upgrade instructions for `linguiLocale`. (@paales)
  [magento-product-configurable](#package-magento-product-configurable) [lingui-next](#package-lingui-next) [next-ui](#package-next-ui) [next-config](#package-next-config) [docs](#package-docs)

- Moved product reviews to the `relatedUpsells` query so we do not pass the queryComplexity limit. (@paales)
  [magento-product-configurable](#package-magento-product-configurable) [magento-review](#package-magento-review)

- Solved issue where Recently Viewed Products would execute a query even if there were no products to display. (@paales)
  [magento-recently-viewed-products](#package-magento-recently-viewed-products)

- Add early return when there are no reviews to prevent invalid enhanced results. (@carlocarels90)
  [magento-review](#package-magento-review)

- Solved an issue where the Search Input field wouldn't open and wouldn't be focussed on render. (@Renzovh)
  [magento-search](#package-magento-search)

- Solve issue: Warning: Cannot update a component (`FormAutoSubmitBase`) while rendering a different component (`ActionCardListForm`). (@paales)
  [magento-search](#package-magento-search) [ecommerce-ui](#package-ecommerce-ui)

- Handle the case where one switches from using the default `.html` URL suffix, to not using one. (@hnsr)
  [magento-store](#package-magento-store)

- Default to permanent redirects unless specified (@hnsr)
  [magento-store](#package-magento-store)

- Contain ripple to wishlist button instead of propagating to product list item (@bramvanderholst)
  [magento-wishlist](#package-magento-wishlist)

- Add to wishlist message missed the product name (@paales)
  [magento-wishlist](#package-magento-wishlist)

- Algolia: Added support for Adobe Commerce for Algolia. (@paales)
  [algolia-products](#package-algolia-products) [algolia-recommend](#package-algolia-recommend)

- Algolia: Added support for customer group pricing in Algolia. (@Renzovh)
  [algolia-products](#package-algolia-products)

- Algolia: Prevent errors by returning string instead of array (@Renzovh)
  [algolia-products](#package-algolia-products)

- Algolia: Automatically fall back to existing upsells/related products if they are defined and Algolia returns an error (@paales)
  [algolia-recommend](#package-algolia-recommend)

- [@paales](https://github.com/paales)(@paales)
  [cli](#package-cli)

- Solve issue where `customFetch` couldn't be loaded correctly. (@paales)
  [cli](#package-cli) [graphql-mesh](#package-graphql-mesh) [magento-graphcms](#package-magento-graphcms)

- [@paales](https://github.com/paales)(@paales)
  [cli](#package-cli)

- Resolve peer dependency issues so we get a clean install (@paales)
  [cli](#package-cli) [google-datalayer](#package-google-datalayer) [googleanalytics](#package-googleanalytics) [googletagmanager](#package-googletagmanager) [graphql](#package-graphql) [graphql-mesh](#package-graphql-mesh) [hygraph-cli](#package-hygraph-cli) [next-ui](#package-next-ui) [react-hook-form](#package-react-hook-form) [eslint-config-pwa](#package-eslint-config-pwa) [graphql-codegen-markdown-docs](#package-graphql-codegen-markdown-docs) [graphql-codegen-near-operation-file](#package-graphql-codegen-near-operation-file) [graphql-codegen-relay-optimizer-plugin](#package-graphql-codegen-relay-optimizer-plugin) [next-config](#package-next-config) [prettier-config-pwa](#package-prettier-config-pwa)

- Make sure the interceptors are generated before the typecheck is ran. (@paales)
  [cli](#package-cli) [next-config](#package-next-config)

- The mesh would always include all graphqls files even though they aren't necessary for Magento 2.4.7 (@Giovanni-Schroevers)
  [cli](#package-cli)

- Remove large demo item, as it doesn't properly work and isn't as pretty as it can be (@paales)
  [demo-magento-graphcommerce](#package-demo-magento-graphcommerce)

- Added ref forwarding for the inputRef (@paales)
  [ecommerce-ui](#package-ecommerce-ui)

- Updated all form `<FieldElement />` components to also accept `defaultValue`, `shouldUnregister` and `disabled`. Moved `<AutoCompleteElement />`, `<CheckboxElement />`, `<MultiSelectElement />`, `<SliderElement />`, `<SwitchElement />`, `<ToggleButtonGroup />` to `useController`. Removed all `parseError` props. (@Giovanni-Schroevers)
  [ecommerce-ui](#package-ecommerce-ui)

- Make sure the `<TextFieldElement/>` doesn’t give a uncontrolled to controlled warning. Convert `<SelectElement/>` to `useController` instead of a separate Controller component. Make sure the original `endAdornment` is always shown only until the value is valid. (@FrankHarland)
  [ecommerce-ui](#package-ecommerce-ui)

- The `<WaitForQueries/>` component now uses the `useIsSSR` hook which prevents loading spinners when navigating on the client, which make all account/cart/checkout pages faster. (@FrankHarland)
  [ecommerce-ui](#package-ecommerce-ui)

- Omit disableUnderline prop for ‘outlined’ variant, because its not supported. (@carlocarels90)
  [ecommerce-ui](#package-ecommerce-ui)

- Moved `<ActionCardListForm />` to `@graphcommerce/ecommerce-ui` to resolve issue with circular dependencies. (@Giovanni-Schroevers)
  [ecommerce-ui](#package-ecommerce-ui)

- Destructure InputProps to ensure they are passed only to relevant components. (@carlocarels90)
  [ecommerce-ui](#package-ecommerce-ui)

- Solve issue where `<NumberFieldElement />` would allow numbers below zero when `min = 0`. (@JoshuaS98)
  [ecommerce-ui](#package-ecommerce-ui)

- Prevent checkout from looping back and forth with the cart overlay when navigating directly to the checkout. (@Giovanni-Schroevers)
  [framer-next-pages](#package-framer-next-pages)

- Loading an overlay page directly would animate in the overlay instead of directly showing it. (@paales)
  [framer-next-pages](#package-framer-next-pages) [next-ui](#package-next-ui)

- Prevent retriggering a `scrollTo` animation in Firefox when the current `scrollLeft/scrollTop` is a float. (@Giovanni-Schroevers)
  [framer-scroller](#package-framer-scroller)

- The `<SidebarGallery />` now supports two more props: `disableSticky` and `variantMd` (`default | oneColumn`). (@Jessevdpoel)
  [framer-scroller](#package-framer-scroller)

- Prevent `<ScrollerThumbnail />` from scrolling the page horizontally. (@Giovanni-Schroevers)
  [framer-scroller](#package-framer-scroller)

- Prevent gallery thumbnails from scrolling when opening or closing a layout overlay. (@Giovanni-Schroevers)
  [framer-scroller](#package-framer-scroller) [next-ui](#package-next-ui)

- All `sendEvent` calls are now the return type of `useSendEvent`, to allow plugins to use hooks themselves. (@Renzovh)
  [google-datalayer](#package-google-datalayer)

- Solved an issue where the `BillingPage` query would be re-queried after setting the payment method. (@Giovanni-Schroevers)
  [google-datalayer](#package-google-datalayer)

- Moved import locations of Google Analytics and Google Tagmanager scripts to their officialrecommended locations. (@paales)
  [googleanalytics](#package-googleanalytics) [googletagmanager](#package-googletagmanager)

- Solve an issue where the `grecaptcha.execute` method would throw `null` causing the checkout to break in unexpected ways. (@paales)
  [googlerecaptcha](#package-googlerecaptcha)

- fix: Google tag manager noscript tag would output escaped html causing hydration errors (@FrankHarland)
  [googletagmanager](#package-googletagmanager)

- Renamed from `@graphcommerce/graphcms-ui` to `@graphcommerce/hygraph-ui`. (@paales)
  [graphcms-ui](#package-graphcms-ui) [hygraph-ui](#package-hygraph-ui)

- Remove ‘up’ data from the blogoverview page. (@carlocarels90)
  [graphcms-ui](#package-graphcms-ui) [magento-graphcms](#package-magento-graphcms)

- Allow blog pages to be nested. (@Jessevdpoel)
  [graphcms-ui](#package-graphcms-ui)

- Added helper method to get Hygraph paths (@bramvanderholst)
  [graphcms-ui](#package-graphcms-ui)

- Add support for linebreaks in Hygraph content (@FrankHarland)
  [graphcms-ui](#package-graphcms-ui)

- The `<PrivateQueryMask />` component now only warns when a block is rendered during the initial SSR render. (@Giovanni-Schroevers)
  [graphql](#package-graphql)

- When loading a page, always create a new GraphQL client, so that cache isn't shared for each request, causing an unnecessary large page size. (@paales)
  [graphql](#package-graphql)

- Added back ApolloClient caching for SSR requests to projects (@paales)
  [graphql](#package-graphql)

- Added eslint rule: Importing `\*.interceptor` is NOT allowed (@paales)
  [graphql](#package-graphql) [eslint-config-pwa](#package-eslint-config-pwa)

- measurePerformanceLink now reports queries made in the subgraph and is only included during development and not in production. (@paales)
  [graphql](#package-graphql)

- When a `usePrivateQuery` is called, only execute when there is no `PrivateQueryMaskContext` defined above. (@paales)
  [graphql](#package-graphql)

- Solves the issue `TypeError: url?.startsWith is not a function`. The generated `.mesh/index.ts` would be generated as a requirejs module while next.js expects an esm module. In the end we properly generated the mesh correctly and now there is an `import.meta.url` instead of using `require('node:url')`. To solve this we needed to solve a chain of issues:

  1. The generation of the mesh is based on the version of the mesh that is imported (esm or commonjs). See [source](https://github.com/ardatan/graphql-mesh/blob/bf588d372c0078378aaa24beea2da794af7949e6/scripts/replace-import-meta-url-in-cjs.ts#L9-L10) for the lines that need to be different. This meant that we needed to change the @graphcommerce/cli package to be of type:module instead of a commonjs module.

  2) To properly convert the module to an esm module we've migrated the build of the cli package to use 'pkgroll' instead of tsc, because tsc is limited in what it outputs and can't really convert classic imports to esm.
  3) To load possible mesh plugins we require additional .ts files to be loaded with [tsx](https://tsx.is/). To get the tsx loader to work properly in combination with esm modules, we need at least [node 18.19.0](https://nodejs.org/en/blog/release/v18.19.0#new-nodemodule-api-register-for-module-customization-hooks-new-initialize-hook). Minimal Node version upped to 18.19.0 and add support for node 22. ([@paales](https://github.com/paales))
- Added `traverseSelectionSet` utility function to extract a child selection set from the parent. (@Renzovh)
  [graphql-mesh](#package-graphql-mesh)

- Fix cors issues with Dynamic Row Property Picker App (@JoshuaS98)
  [graphql-mesh](#package-graphql-mesh)

- [@paales](https://github.com/paales)(@paales)
  [graphql-mesh](#package-graphql-mesh)

- Revert Pin versions of @graphql-mesh/config and utils (@paales)
  [graphql-mesh](#package-graphql-mesh)

- Made all graphql mesh dependencies peer dependencies so users can upgrade without problems (@paales)
  [graphql-mesh](#package-graphql-mesh)

- Suppress warning where a dependency is an expression, Added uglify-es and long as the dependencies couldn’t be found (@paales)
  [graphql-mesh](#package-graphql-mesh) [next-config](#package-next-config)

- Remove `row` field on DynamicRows\` model (@JoshuaS98)
  [hygraph-dynamic-rows](#package-hygraph-dynamic-rows)

- Solve issue where an Apollo object couldn't be modified as it is read only when Dynamic rows are added to the project. (@JoshuaS98)
  [hygraph-dynamic-rows](#package-hygraph-dynamic-rows)

- Resolve issue where the dynamic rows UI wouldn’t load any definitions (@paales)
  [hygraph-dynamic-rows-ui](#package-hygraph-dynamic-rows-ui)

- Solve bugs in the Dynamic Row UI module and styled the config screen. (@JoshuaS98)
  [hygraph-dynamic-rows-ui](#package-hygraph-dynamic-rows-ui)

- Allow attributes with deprecationReasons (e.g. custom attributes) as PropertyPicker value (@carlocarels90)
  [hygraph-dynamic-rows-ui](#package-hygraph-dynamic-rows-ui)

- When viewing the website on a 1x monitor, serve a little bit smaller images. (@paales)
  [image](#package-image)

- Solve an issue where image sizes are served in higher resolution than expected. (@bramvanderholst)
  [image](#package-image)

- Solve issue where the page would reload during development when the first call to `/graphql` was made. (@paales)
  [lingui-next](#package-lingui-next) [next-ui](#package-next-ui)

- Resolve the overlay issue when navigating from the 'Forgot Password' page to the 'Sign In' page. (@carlocarels90)
  [next-ui](#package-next-ui) [magento-graphcms](#package-magento-graphcms)

- Fix back button transparency on hover (@bramvanderholst)
  [next-ui](#package-next-ui)

- Added `useIsSSR` hook that will properly resolve when the page is rendered on the server and on first render, but will return false when a component is rendered on the client directly. (@FrankHarland)
  [next-ui](#package-next-ui)

- USPS would be loaded after other queries, causing unnecessary slowdown. (@paales)
  [next-ui](#package-next-ui)

- Added the possibility to place content before or after the scroller. (@carlocarels90)
  [next-ui](#package-next-ui)

- Mark the menu item as active if router.asPath matches the href, or if the first URL segment matches, indicating it's the parent item. (@carlocarels90)
  [next-ui](#package-next-ui)

- Solve an issue where the success page would show a back button which would go back to the payment page (which would be empty) (@carlocarels90)
  [next-ui](#package-next-ui) [magento-graphcms](#package-magento-graphcms)

- Move arguments of `responsiveVal` around so the `minBreakpoint` can be given as third argument. (@paales)
  [next-ui](#package-next-ui)

- OverlayBase now supports disableAnimation and disableDrag (@paales)
  [next-ui](#package-next-ui)

- Updated canonicalize helper for better multi domain support (@bramvanderholst)
  [next-ui](#package-next-ui)

- Added locale prop support for all `<Intl/>` components and exposed all functionality as hooks. (@paales)
  [next-ui](#package-next-ui)

- `memoDeep` function that is a deep compare variant of `React.memo`. Performance seems to be pretty good, but should only be used as a result of a profiling session. (@paales)
  [next-ui](#package-next-ui)

- Solve an issue where internal full URL's would cause prefetching errors and would use a hard navigation. (@paales)
  [next-ui](#package-next-ui)

- Added functionality to constrain the container sizing of the frontend. Added a new configuration `containerSizingShell` and `containerSizingContent` configuration options. Actual sizing can be configured in the `theme.ts`. (@StefanAngenent)
  [next-ui](#package-next-ui)

- Exclude ‘disableBackNavigation’ prop from LinkOrButton in LayoutHeaderBack. (@carlocarels90)
  [next-ui](#package-next-ui)

- The `<ActionCardList />` can now recieve focus, allowing form submissions to scroll to the field. Focussed fields now are now highlighted even when there is an error. (@Giovanni-Schroevers)
  [next-ui](#package-next-ui)

- Hide the back button on desktop pages where breadcrumbs are displayed. (@carlocarels90)
  [next-ui](#package-next-ui) [magento-graphcms](#package-magento-graphcms)

- Properly align cart loading state (and other FullPageMessage usages) (@bramvanderholst)
  [next-ui](#package-next-ui)

- Make the back/up buttons translatable (@carlocarels90)
  [next-ui](#package-next-ui) [magento-graphcms](#package-magento-graphcms)

- Date strings (12-12-2012) are not supported by older Safari browser versions. must be converted (12/12/2012) in order for it to function; otherwise, it will return NaN if we attempt to access the getTime() on an object. (@Vignesh-M21)
  [next-ui](#package-next-ui) [magento-graphcms](#package-magento-graphcms)

- MediaQuery component now accepts a display prop to not always render with display contents. Implement the MediaQuery component for the DesktopNavBar and filter page for StickyBelowHeader and ProductFiltersPro sidebar (@paales)
  [next-ui](#package-next-ui)

- `useFormGql` and it's derived hooks now have a new `skipUnchanged` prop. The form will only be submitted when there are fields dirty in a form. This reduces the amount of queries ran in the checkout greatly. (@Giovanni-Schroevers)
  [react-hook-form](#package-react-hook-form)

- Added deprecation warnings for `useFormMuiRegister`. Refactored `useFormPersist` to use `useWatch` and added a separate `<FormPersist />` component to prevent rerenders. (@FrankHarland)
  [react-hook-form](#package-react-hook-form)

- Solve an issue where `onBeforeSubmit` and `onComplete` would become an 'stale closure' where variables inside wouldn't be updated. By wrapping `onBeforeSubmit` and `onComplete` in `useEventCallback` these functions are updated when outside values get changed. (@Giovanni-Schroevers)
  [react-hook-form](#package-react-hook-form)

- Prevent overwriting custom context in useFormGqlMutation by merging operationOptions before execution. (@wimvdputten)
  [react-hook-form](#package-react-hook-form)

- When a `useFormGql` throws an error in the `onBeforeSubmit` method or `onComplete` method it will be set as an ApolloError with the message, allowing it to be displayed somewhere. The `<PaymentMethodButton />` will now render this as an `<ErrorSnackbar />`. (@Giovanni-Schroevers)
  [react-hook-form](#package-react-hook-form)

- Added missing dependencies of `lodash` and `@types/lodash`. (@paales)
  [react-hook-form](#package-react-hook-form)

- Mark `useFormValidFields` as deprecated: Please use `<TextInputElement />`, `<SelectElement />`, etc. with the `showValid` prop. (@FrankHarland)
  [react-hook-form](#package-react-hook-form)

- Let eslint also work for js/mjs files (@paales)
  [eslint-config-pwa](#package-eslint-config-pwa)

- [@paales](https://github.com/paales)(@paales)
  [eslint-config-pwa](#package-eslint-config-pwa)

- Removed the `ProductPage.graphql` query from the examples directory as it isn't used anymore. (@paales)
  [next-config](#package-next-config)

- Make sure categories and products create the correct URL's in sitemaps (@paales)
  [next-config](#package-next-config)

- Added graphql.config.ts to projects (@paales)
  [next-config](#package-next-config)

- Added robotsAllow to storefront config (@bramvanderholst)
  [next-config](#package-next-config)

- All automatically generated interceptor files are now read-only in vscode to prevent accidental changes. (@paales)
  [next-config](#package-next-config)

- Reduce bundlesize of `@apollo/client`. (@paales)
  [next-config](#package-next-config)

- Solved an issue where the plugins would be generated with the wrong path (@paales)
  [next-config](#package-next-config)

- Solve an issue where an env variable wouldn't be coerced to a Number if a `Config.graphqls` value is defined as an `Int`/`Float`. (@paales)
  [next-config](#package-next-config)

- Solve an issue where interceptors were immediately deleted after generating (@paales)
  [next-config](#package-next-config)

- Be able to handle plugin runtime values values when parsing the source. Also, make sure parsed plugin sources do not return duplicate plugins. (@paales)
  [next-config](#package-next-config)

- Solve peer dependency issues for webpack and framer-motion (@paales)
  [next-config](#package-next-config)

- Added better interceptor comments and link to original files (@paales)
  [next-config](#package-next-config)

- Enable prettier-plugin-jsdoc (@paales)
  [prettier-config-pwa](#package-prettier-config-pwa)

- Added docs about caching. (@paales)
  [docs](#package-docs)

- Added documentation about the Canonical URL and Sitemap handling (@paales)
  [docs](#package-docs)

- Document patch `custom_attributesV2` for null attribute values issue. (@SimonPrins)
  [docs](#package-docs)

- Create a 'Third-Party Libraries' page that includes further details on tools such as Google Analytics and Google Tag Manager. (@carlocarels90)
  [docs](#package-docs)

- Added web vitals document (@paales)
  [docs](#package-docs)


## Packages

- <a name="package-magento-cart"></a>@graphcommerce/magento-cart: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-cart) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-cart/CHANGELOG.md))
- <a name="package-magento-cart-billing-address"></a>@graphcommerce/magento-cart-billing-address: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-cart-billing-address) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-cart-billing-address/CHANGELOG.md))
- <a name="package-magento-cart-shipping-address"></a>@graphcommerce/magento-cart-shipping-address: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-cart-shipping-address) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-cart-shipping-address/CHANGELOG.md))
- <a name="package-magento-customer"></a>@graphcommerce/magento-customer: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-customer) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-customer/CHANGELOG.md))
- <a name="package-next-config"></a>@graphcommerce/next-config: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packagesDev/next-config) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packagesDev/next-config/CHANGELOG.md))
- <a name="package-magento-graphcms"></a>@graphcommerce/magento-graphcms: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-graphcms) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-graphcms/CHANGELOG.md))
- <a name="package-magento-cart-email"></a>@graphcommerce/magento-cart-email: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-cart-email) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-cart-email/CHANGELOG.md))
- <a name="package-ecommerce-ui"></a>@graphcommerce/ecommerce-ui: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/ecommerce-ui) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/ecommerce-ui/CHANGELOG.md))
- <a name="package-magento-cart-payment-method"></a>@graphcommerce/magento-cart-payment-method: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-cart-payment-method) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-cart-payment-method/CHANGELOG.md))
- <a name="package-magento-cart-shipping-method"></a>@graphcommerce/magento-cart-shipping-method: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-cart-shipping-method) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-cart-shipping-method/CHANGELOG.md))
- <a name="package-magento-compare"></a>@graphcommerce/magento-compare: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-compare) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-compare/CHANGELOG.md))
- <a name="package-magento-newsletter"></a>@graphcommerce/magento-newsletter: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-newsletter) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-newsletter/CHANGELOG.md))
- <a name="package-magento-payment-adyen"></a>@graphcommerce/magento-payment-adyen: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-payment-adyen) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-payment-adyen/CHANGELOG.md))
- <a name="package-magento-payment-multisafepay"></a>@graphcommerce/magento-payment-multisafepay: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-payment-multisafepay) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-payment-multisafepay/CHANGELOG.md))
- <a name="package-mollie-magento-payment"></a>@graphcommerce/mollie-magento-payment: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/mollie-magento-payment) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/mollie-magento-payment/CHANGELOG.md))
- <a name="package-magento-cart-items"></a>@graphcommerce/magento-cart-items: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-cart-items) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-cart-items/CHANGELOG.md))
- <a name="package-magento-category"></a>@graphcommerce/magento-category: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-category) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-category/CHANGELOG.md))
- <a name="package-magento-product"></a>@graphcommerce/magento-product: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-product) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-product/CHANGELOG.md))
- <a name="package-next-ui"></a>@graphcommerce/next-ui: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packagesDev/next-ui) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packagesDev/next-ui/CHANGELOG.md))
- <a name="package-magento-store"></a>@graphcommerce/magento-store: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-store) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-store/CHANGELOG.md))
- <a name="package-graphql"></a>@graphcommerce/graphql: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/graphql) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/graphql/CHANGELOG.md))
- <a name="package-magento-graphql"></a>@graphcommerce/magento-graphql: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-graphql) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-graphql/CHANGELOG.md))
- <a name="package-magento-graphql-rest"></a>@graphcommerce/magento-graphql-rest: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-graphql-rest) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-graphql-rest/CHANGELOG.md))
- <a name="package-docs"></a>@graphcommerce/docs: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/docs) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/docs/CHANGELOG.md))
- <a name="package-magento-search"></a>@graphcommerce/magento-search: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-search) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-search/CHANGELOG.md))
- <a name="package-magento-search-overlay"></a>@graphcommerce/magento-search-overlay: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-search-overlay) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-search-overlay/CHANGELOG.md))
- <a name="package-algolia-categories"></a>@graphcommerce/algolia-categories: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/algolia-categories) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/algolia-categories/CHANGELOG.md))
- <a name="package-algolia-personalization"></a>@graphcommerce/algolia-personalization: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/algolia-personalization) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/algolia-personalization/CHANGELOG.md))
- <a name="package-algolia-products"></a>@graphcommerce/algolia-products: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/algolia-products) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/algolia-products/CHANGELOG.md))
- <a name="package-algolia-recommend"></a>@graphcommerce/algolia-recommend: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/algolia-recommend) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/algolia-recommend/CHANGELOG.md))
- <a name="package-google-playstore"></a>@graphcommerce/google-playstore: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/google-playstore) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/google-playstore/CHANGELOG.md))
- <a name="package-graphcms-ui"></a>@graphcommerce/graphcms-ui: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/graphcms-ui) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/graphcms-ui/CHANGELOG.md))
- <a name="package-hygraph-dynamic-rows-ui"></a>@graphcommerce/hygraph-dynamic-rows-ui: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/hygraph-dynamic-rows-ui) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/hygraph-dynamic-rows-ui/CHANGELOG.md))
- <a name="package-graphql-mesh"></a>@graphcommerce/graphql-mesh: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/graphql-mesh) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/graphql-mesh/CHANGELOG.md))
- <a name="package-react-hook-form"></a>@graphcommerce/react-hook-form: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/react-hook-form) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/react-hook-form/CHANGELOG.md))
- <a name="package-service-worker"></a>@graphcommerce/service-worker: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/service-worker) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/service-worker/CHANGELOG.md))
- <a name="package-graphql-codegen-near-operation-file"></a>@graphcommerce/graphql-codegen-near-operation-file: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/graphql-codegen-near-operation-file) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/graphql-codegen-near-operation-file/CHANGELOG.md))
- <a name="package-magento-product-configurable"></a>@graphcommerce/magento-product-configurable: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-product-configurable) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-product-configurable/CHANGELOG.md))
- <a name="package-lingui-next"></a>@graphcommerce/lingui-next: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/lingui-next) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/lingui-next/CHANGELOG.md))
- <a name="package-cli"></a>@graphcommerce/cli: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/cli) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/cli/CHANGELOG.md))
- <a name="package-hygraph-ui"></a>@graphcommerce/hygraph-ui: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/hygraph-ui) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/hygraph-ui/CHANGELOG.md))
- <a name="package-magento-cart-coupon"></a>@graphcommerce/magento-cart-coupon: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-cart-coupon) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-cart-coupon/CHANGELOG.md))
- <a name="package-magento-payment-included"></a>@graphcommerce/magento-payment-included: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-payment-included) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-payment-included/CHANGELOG.md))
- <a name="package-magento-review"></a>@graphcommerce/magento-review: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-review) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-review/CHANGELOG.md))
- <a name="package-magento-pagebuilder"></a>@graphcommerce/magento-pagebuilder: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-pagebuilder) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-pagebuilder/CHANGELOG.md))
- <a name="package-magento-product-bundle"></a>@graphcommerce/magento-product-bundle: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-product-bundle) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-product-bundle/CHANGELOG.md))
- <a name="package-magento-product-downloadable"></a>@graphcommerce/magento-product-downloadable: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-product-downloadable) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-product-downloadable/CHANGELOG.md))
- <a name="package-magento-product-grouped"></a>@graphcommerce/magento-product-grouped: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-product-grouped) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-product-grouped/CHANGELOG.md))
- <a name="package-magento-wishlist"></a>@graphcommerce/magento-wishlist: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-wishlist) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-wishlist/CHANGELOG.md))
- <a name="package-algolia-search"></a>@graphcommerce/algolia-search: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/algolia-search) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/algolia-search/CHANGELOG.md))
- <a name="package-framer-scroller"></a>@graphcommerce/framer-scroller: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/framer-scroller) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/framer-scroller/CHANGELOG.md))
- <a name="package-magento-cart-checkout"></a>@graphcommerce/magento-cart-checkout: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-cart-checkout) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-cart-checkout/CHANGELOG.md))
- <a name="package-magento-payment-braintree"></a>@graphcommerce/magento-payment-braintree: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-payment-braintree) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-payment-braintree/CHANGELOG.md))
- <a name="package-google-datalayer"></a>@graphcommerce/google-datalayer: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/google-datalayer) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/google-datalayer/CHANGELOG.md))
- <a name="package-magento-cart-pickup"></a>@graphcommerce/magento-cart-pickup: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-cart-pickup) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-cart-pickup/CHANGELOG.md))
- <a name="package-magento-payment-klarna"></a>@graphcommerce/magento-payment-klarna: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-payment-klarna) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-payment-klarna/CHANGELOG.md))
- <a name="package-magento-payment-paypal"></a>@graphcommerce/magento-payment-paypal: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-payment-paypal) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-payment-paypal/CHANGELOG.md))
- <a name="package-demo-magento-graphcommerce"></a>@graphcommerce/demo-magento-graphcommerce: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/demo-magento-graphcommerce) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/demo-magento-graphcommerce/CHANGELOG.md))
- <a name="package-googleanalytics"></a>@graphcommerce/googleanalytics: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/googleanalytics) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/googleanalytics/CHANGELOG.md))
- <a name="package-googlerecaptcha"></a>@graphcommerce/googlerecaptcha: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/googlerecaptcha) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/googlerecaptcha/CHANGELOG.md))
- <a name="package-googletagmanager"></a>@graphcommerce/googletagmanager: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/googletagmanager) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/googletagmanager/CHANGELOG.md))
- <a name="package-hygraph-dynamic-rows"></a>@graphcommerce/hygraph-dynamic-rows: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/hygraph-dynamic-rows) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/hygraph-dynamic-rows/CHANGELOG.md))
- <a name="package-magento-recently-viewed-products"></a>@graphcommerce/magento-recently-viewed-products: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-recently-viewed-products) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-recently-viewed-products/CHANGELOG.md))
- <a name="package-hygraph-cli"></a>@graphcommerce/hygraph-cli: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/hygraph-cli) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/hygraph-cli/CHANGELOG.md))
- <a name="package-eslint-config-pwa"></a>@graphcommerce/eslint-config-pwa: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/eslint-config-pwa) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/eslint-config-pwa/CHANGELOG.md))
- <a name="package-graphql-codegen-markdown-docs"></a>@graphcommerce/graphql-codegen-markdown-docs: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/graphql-codegen-markdown-docs) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/graphql-codegen-markdown-docs/CHANGELOG.md))
- <a name="package-graphql-codegen-relay-optimizer-plugin"></a>@graphcommerce/graphql-codegen-relay-optimizer-plugin: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/graphql-codegen-relay-optimizer-plugin) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/graphql-codegen-relay-optimizer-plugin/CHANGELOG.md))
- <a name="package-prettier-config-pwa"></a>@graphcommerce/prettier-config-pwa: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/prettier-config-pwa) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/prettier-config-pwa/CHANGELOG.md))
- <a name="package-framer-next-pages"></a>@graphcommerce/framer-next-pages: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/framer-next-pages) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/framer-next-pages/CHANGELOG.md))
- <a name="package-image"></a>@graphcommerce/image: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/image) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/image/CHANGELOG.md))
