# GraphCommerce 10.0.0 Release Notes

GraphCommerce 10.0.0 bring major performance improvements during development, expect a 10x speed improvement with fast refresh and a 5x speed improvements for production builds. We've updated to the latest version of Next.js, React 19, MUI and Apollo Client 4.

## Next.js 16

- [Node.js middleware](https://nextjs.org/blog/next-15-5#nodejs-middleware-stable).
- [Turbopack](https://nextjs.org/blog/next-16#turbopack-stable) with [bundle analyzer](https://nextjs.org/blog/next-16-1#nextjs-bundle-analyzer-experimental)

## React 19

- [Actions](https://react.dev/blog/2024/12/05/react-19#actions)
- [`useActionState`](https://react.dev/blog/2024/12/05/react-19#new-hook-useactionstate)
- [`useOptimistic`](https://react.dev/blog/2024/12/05/react-19#new-hook-optimistic-updates)
- [`use`](https://react.dev/blog/2024/12/05/react-19#new-feature-use)
- [`<form>`](https://react.dev/blog/2024/12/05/react-19#form-actions)
- [`useFormStatus`](https://react.dev/blog/2024/12/05/react-19#new-hook-useformstatus)
- [`ref` as prop](https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop) and [`ref` cleanup](https://react.dev/blog/2024/12/05/react-19#cleanup-functions-for-refs)
- [`Custom Elements`](https://react.dev/blog/2024/12/05/react-19#support-for-custom-elements)
- [`useEventEffect`](https://react.dev/blog/2025/10/01/react-19-2#use-effect-event)

## React Compiler + Eslint

Next.js 16 comes with support for the new [React Compiler 1.0](https://react.dev/blog/2025/10/07/react-compiler-1), although not enabled by default and we're not using it on our side yet, all groundwork has been laid out to start experimenting with it. This also comes with the new advanced `eslint-plugin-react-hooks` which will warn you thoughout the codebase when using unsupported patterns.

## MUI 7

We've updated from MUI 6 yo MUI 7. See release notes of [MUI 6](https://mui.com/blog/material-ui-v6-is-out/) and [MUI 7](https://mui.com/blog/material-ui-v7-is-out/) for more details.

- [CSS Variables](https://mui.com/blog/material-ui-v6-is-out/#css-theme-variables): All variables can be accessed in JS via `theme.vars.palette.primary.main` or directly with `var(--palette-primary-main)`.
- [Container Queries](https://mui.com/blog/material-ui-v6-is-out/#container-queries): With great browser support it comes as a welcome addition to the framework.
- [CSS Layer support](https://mui.com/blog/material-ui-v7-is-here/#opt-in-support-for-css-layers)

## Apollo Client 4

- [Unified error handling](https://github.com/apollographql/apollo-client/blob/main/CHANGELOG.md#-unified-error-handling)
- [Better typescript support](https://github.com/apollographql/apollo-client/blob/main/CHANGELOG.md#-enhanced-typescript-support)
- [rxjs](https://github.com/apollographql/apollo-client/blob/main/CHANGELOG.md#-modern-observable-implementation)

## Turbopack

This major release brings full Turbopack compatibility, dramatically improving development speed. To allow for Turbopack we needed to migrate away from all Webpack plugins and replace them with replacements that do not rely on customizations of the build process.

- **Plugin/Interceptor system rewrite:** Before we created a FileName.interceptor.tsx that would be loaded when the original file was requested (with a custom Webpack plugin), now we rename the original file to FileName.original.tsx and create the interceptor at Filename.tsx. This does two things: We don't need to copy the original source code to the file, making for cleaner interceptors which work better wiht hot reloading and we don't need to create a custom Turbopack plugin (which isn't even possible yet). New CLI commands: `yarn graphcommerce codegen-interceptors` to generate interceptor files and `yarn graphcommerce cleanup-interceptors` to reset the interceptor system and restore original files.

- **Treeshakable Configuration System:** Replaced Webpack `DefinePlugin`-based `import.meta.graphCommerce` with a new generated configuration system. New `yarn graphcommerce codegen-config-values` command generates TypeScript files with precise typing. All configurations are now available as contants `import { myConfig } from '@graphcommerce/next-config/config'` to use in your code. By generating multiple files for nested objects we allow the compiler to understand what can be tree-shaken.

## Breaking change: Node 18 not supported, 20 and 22 are.

- Node 18 is EOL
- Added support for Node 20 and 22
- Node 24 will be added later (After this is fixed https://github.com/ardatan/whatwg-node/issues/2971)
- Migrated to vitest (@paales) [graphql-codegen-markdown-docs](#package-graphql-codegen-markdown-docs) [graphql-codegen-relay-optimizer-plugin](#package-graphql-codegen-relay-optimizer-plugin) [next-config](#package-next-config)

## Magento improvements

- Added support for multiple display currencies in the frontend. Multiple currencies were already supported, but this introduces Display Currencies for viewing the cart in different currencies. (@paales) [magento-store](#package-magento-store)

- Refactored the Store Selector to be more of a form and have multiple nested toggles to switch groups, stores and currencies. It automatically hides features that aren't used: If only a single group is used with multiple stores only the store selector is shown. If multiple groups are used with each a single store is used, only the group selector is shown. If only a single currency is used, there is no currency selector. If multiple currencies are used, the currency selector is shown. (@paales) [magento-store](#package-magento-store)

- Add billingAddress permission (EDITABLE | READONLY) that controls whether the end user can update their billing address in the account section and checkout. (@Giovanni-Schroevers) [magento-cart](#package-magento-cart) [magento-cart-shipping-address](#package-magento-cart-shipping-address) [magento-customer](#package-magento-customer) [magento-graphcms](#package-magento-graphcms) [magento-open-source](#package-magento-open-source)

- Magento 2.4.7: Implemented the `customer_account_create` and `customer_account_edit` forms using the `attributeForm` query for the registration page and customer information form. The forms respect the settings configured in the 'Customer Configuration section'. It allows configuration for `prefix`, `middlename`, `suffix`,`dob`, `gender` and other fields. This also makes the frontend compatible with Adobe Commerce's Customer Attributes module. (@paales) [magento-customer](#package-magento-customer)

- Added support for viewing Invoices/Shipments and Credit Memo's (@paales) [magento-customer](#package-magento-customer)

- Magento: Introduce a new Product-`uid` to solve an issue where cache normalization was not working properly on the frontend when viewing products with a differen curreny, etc.

  Products now have a more detailed `uid` which will include the scope the product is retrieved from. For example: `NDg5MDM=?store=nl_NL&currencyCode=EUR`. This results in a better cache normalization in Apollo Client and allows for switching between scopes (store/currency/price views/accounts) without creating a broken cache state.

  We have implemented this with a new resolver that rewrites the `uid` passed from Magento to the Mesh Resolver, and additing additonal data to the `uid` based on the headers passed from the client. This also requires each package to implement the `getPrivateQueryContextMesh` method to retrieve the current PrivateQuery context from the GraphQL request headers. (@paales) [magento-graphql](#package-magento-graphql) [magento-store](#package-magento-store) [graphql](#package-graphql)

- Improved Downloadable products functionality:
  - Account Dashboard Link and Download Page
  - Download samples / linkSamples and links from the backend.
  - CartItem edit functionality for the DownloadableCartItem
  - Dynamic ProductPagePrice for downloadable options ([@paales](https://github.com/paales))

- Implemented the `query { attributesForm }` to be able to dynamically render forms with useAttributesForm/preloadAttributesForm and AttributesFormAutoLayout, and additional utilities to handle form submissions. (@paales) [magento-store](#package-magento-store)

## Algolia improvements

- Algolia stock status fix: Use `in_stock` instead of `is_stock` in Algolia hit to Magento product conversion (@davido-priority)

- Search Categories through algolia (@paales) [magento-search](#package-magento-search) [algolia-categories](#package-algolia-categories)

- Added support for Algolia's facetOrdering which allows you to change the presented filters based on rules. (@paales) [algolia-products](#package-algolia-products)

## Other

- Make hygraph-cli dependency for the cli package optional, so that resolveDependenciesSync accepts it not being installed. (@Giovanni-Schroevers) [cli](#package-cli)

## 🐛 Fixes

- When running a cart mutation and the cartId is already passed to the form we use that value instead of retrieving the current cart again. (@paales) [magento-cart](#package-magento-cart)

- Allow setting the cartId in the form for useFormGqlMutationCart by setting the cartId in the form AND allow setting the cartId for a whole context by wrapping with CartIdProvider (@paales) [magento-cart](#package-magento-cart) [magento-cart-shipping-address](#package-magento-cart-shipping-address)

- Allow setting the redirect value in the AddProductsToCartForm as a form value. (@paales) [magento-cart](#package-magento-cart)

- Forwarded ref to AddProductsToCartButton (@paales) [magento-cart](#package-magento-cart)

- Solve issue where the total of the cart was zero due to discount or store credit the user couldn't proceed to the checkout. We now check for items and errors instead of the total. (@Giovanni-Schroevers) [magento-cart](#package-magento-cart)

- Remove all usages of the NoSsr component as the GraphQL layer already handles this. (@paales) [magento-cart](#package-magento-cart) [magento-compare](#package-magento-compare) [magento-customer](#package-magento-customer) [magento-wishlist](#package-magento-wishlist)

- Solve typescript issue were product types were added incorrectly. (@paales) [magento-cart](#package-magento-cart) [magento-wishlist](#package-magento-wishlist)

- Removed deprecated fields from AddProductsToCartForm (@paales) [magento-cart](#package-magento-cart)

- When ordering a virtual product the checkout would still reference a Track & Trace (@paales) [magento-cart](#package-magento-cart)

- Solve issue where if the onBeforeSubmit would return false, it would still error if submitted while the cart is locked. (@paales) [magento-cart](#package-magento-cart)

- Moved all functionality from the @graphcommerce/magento-cart-billing-address package to the @graphcommerce/magento-cart package. All occurences of @graphcommerce/magento-cart-billing-address should be removed for your codebase. (@paales) [magento-cart](#package-magento-cart)

- Allow awaitable async requests for onStart on checkout button (@paales) [magento-cart](#package-magento-cart) [google-datalayer](#package-google-datalayer)

- When the cart totals are updated via a mutation, make sure to also fetch the id when the query is used so that automatically updates. (@paales) [magento-cart](#package-magento-cart)

- CartTotals now accepts a readOnly prop to handle plugins showing information based on that prop (@paales) [magento-cart](#package-magento-cart)

- Solve issue where available_payment_methods would give an apollo client error that it couldn’t be properly merged (@paales) [magento-cart](#package-magento-cart)

- Prevent rendering "You have not placed an order" before the router resolves. (@carlocarels90) [magento-cart-checkout](#package-magento-cart-checkout)

- Resolve issue where a 400 error occurred due to missing coupon code data in the request. The coupon input field was being disabled before form submission, preventing the code from being included in the request payload (@joshdavenport) [magento-cart-coupon](#package-magento-cart-coupon)

- Align coupon accordion with other accordion types that can still expand with chips rendered (@paales) [magento-cart-coupon](#package-magento-cart-coupon)

- Split out various Cart related fragments to allow for easier extensibility: AppliedCoupon, CartPrices, CartTaxItem, Discount (@paales) [magento-cart-coupon](#package-magento-cart-coupon)

- fix(checkout): fix faulty check if email exists in the checkout; keep special characters in email on redirect to login (@FrankHarland) [magento-cart-email](#package-magento-cart-email)

- Added support for TIME and DATE for the customizable options. Added required stars. (@paales) [magento-cart-items](#package-magento-cart-items) [magento-product](#package-magento-product)

- Created a new PriceModifiers component that is implemented on CartItems, allowing different product types to render their options in a consistent manner and allow rendering a base price so that the sum in the cart is correct. (@paales) [magento-cart-items](#package-magento-cart-items) [magento-store](#package-magento-store)

- Currency wasn't set properly while rendering custom options for cart items that had a different currency than the current store. (@paales) [magento-cart-items](#package-magento-cart-items)

- Solve issue where the UpdateItemQuantity would send a wrong query to the backend. (@paales) [magento-cart-items](#package-magento-cart-items)

- Solve issue where the CartItem href wouldn't be correct (@paales) [magento-cart-items](#package-magento-cart-items)

- Solve issue where if a product wasn't available in the cart anymore from the server the user wouldn't be able to remove the item from the cart. (@paales) [magento-cart-items](#package-magento-cart-items)

- Exported cartItemToCartItemInput so it can be extended with plugins (@paales) [magento-cart-items](#package-magento-cart-items)

- Solve issue where the Place order button would remain in a loading state because the back/forward cache of chrome started working for the checkout and thus React's state would not be reset, thinking we were still exiting the page. (@paales) [magento-cart-payment-method](#package-magento-cart-payment-method)

- Forward productListRenderer for all locations that can be rendered by pagebuilder (@paales) [magento-category](#package-magento-category) [magento-product](#package-magento-product) [magento-graphcms](#package-magento-graphcms)

- Added support for meta_keyword for products and categories (@paales) [magento-category](#package-magento-category) [magento-product](#package-magento-product) [next-ui](#package-next-ui)

- Solve issue where productListRenderer was passed as a DOM element, causing react warnings. (@paales) [magento-category](#package-magento-category)

- Fix bug where allName would not be translated when switching stores (@Giovanni-Schroevers) [magento-category](#package-magento-category)

- Move the category fragment to the category prop (@paales) [magento-category](#package-magento-category)

- Solve issue where in some cases a second ProductList query was made because the category used an `eq` filter instead of an `in` filter. (@paales) [magento-category](#package-magento-category) [magento-product](#package-magento-product)

- Convert home to render the home CmsPage and add page/\[…url] route for additional pages. (@paales) [magento-cms](#package-magento-cms)

- Added support for loading CMS Pages from Magento (@paales) [magento-cms](#package-magento-cms)

- Added cmsBlocks query and `<CmsBlock />` component. (@paales) [magento-cms](#package-magento-cms)

- Render the no-route page (or whatever is configured) on the 404 page when running with only Magento. (@paales) [magento-cms](#package-magento-cms)

- Created a AccountDashboardQueryFragment instead of only a query to allow for adding customerDownloadableProducts to the dashboard query (@paales) [magento-customer](#package-magento-customer)

- Forward address field props (@paales) [magento-customer](#package-magento-customer)

- Migrate to default OrderItem resolver and remove useOrderCardItemImages as OrderItem now returns a product. Add a custom resolver for 2.4.5 and 2.4.6 that implements the functionality for older versions. (@paales) [magento-customer](#package-magento-customer)

- Created a refactored the AccountOrders page and refactored the OrderCard. (@paales) [magento-customer](#package-magento-customer)

- Implemented order sorting for account overview and account list and implement custom resolver for Magento 2.4.5 (which is slow but works). (@paales) [magento-customer](#package-magento-customer) [magento-graphql](#package-magento-graphql)

- Deleting an account will now require reauthentication and moved the menu item to the Authentication section (@paales) [magento-customer](#package-magento-customer)

- Use OrderStateLabel in my account instead of OrderStateLabelInline and deprecate that one. (@paales) [magento-customer](#package-magento-customer)

- Solve issue where the user is getting a 400 error when logging in because the password is not being sent. The password field was disabled before the form was submitted, causing the password not to be sent. (@paales) [magento-customer](#package-magento-customer)

- Unset token when on magento 248 to prevent repeated graphql-authentication errors (@Giovanni-Schroevers) [magento-customer](#package-magento-customer)

- OrderTotals/OrderDetails now only renders addres information if available (@paales) [magento-customer](#package-magento-customer)

- Order/Invoice/CreditMemo and Shipment views (@paales) [magento-customer](#package-magento-customer) [magento-product-bundle](#package-magento-product-bundle) [magento-product-downloadable](#package-magento-product-downloadable)

- Remove odd nonNullable that is also available in @graphcommmerce/next-ui (@paales) [magento-customer](#package-magento-customer)

- `<WaitForCustomer />` now accepts all props of the FullPageMessage (@paales) [magento-customer](#package-magento-customer)

- Add flushMeasurePerf for product page (@paales) [magento-graphql](#package-magento-graphql)

- Solve issue where the ApolloClient cache wasn't scoped properly causing the wrong currency to be shown when switching currency. (@paales) [magento-graphql](#package-magento-graphql) [graphql](#package-graphql)

- Magento <= 2.4.6: Solve issue where GraphCommerce's schema compatibility layer would define fields to be always return a value while they would never causing runtime errors which are hard to catch. (@paales) [magento-graphql](#package-magento-graphql)

- Moved Customer group_id resolver to magento-graphql-rest package where it should belong. (@paales) [magento-graphql-rest](#package-magento-graphql-rest) [algolia-products](#package-algolia-products)

- Allow passing children to CustomerNewsletterToggle (@paales) [magento-newsletter](#package-magento-newsletter)

- Use CustomerNewsletterToggle whenever possible (@paales) [magento-newsletter](#package-magento-newsletter)

- Prevent executing additional query when user is signing out (@paales) [magento-newsletter](#package-magento-newsletter)

- Remove issuer list from ideal payment method (@Giovanni-Schroevers) [magento-payment-adyen](#package-magento-payment-adyen) [magento-payment-multisafepay](#package-magento-payment-multisafepay) [mollie-magento-payment](#package-mollie-magento-payment)

- Make checkmo respect the payableTo and sendTo values (@paales) [magento-payment-included](#package-magento-payment-included)

- Remove issuers field from MultiSafePay in preparation for iDeal 2. Please not that this change requires an upgrade to the Magento module as well. (@Giovanni-Schroevers) [magento-payment-multisafepay](#package-magento-payment-multisafepay)

- Solve issue where the cart would remain locked if a user would return to the website without going through the checkout/payment step. (@paales) [magento-payment-multisafepay](#package-magento-payment-multisafepay)

- Solve issue where the MSPPaymentHandler query would be executed multiple times. (@paales) [magento-payment-multisafepay](#package-magento-payment-multisafepay)

- Created a Payment tokens package to be able to manage stored cards from the account section. (@paales) [magento-payment-tokens](#package-magento-payment-tokens)

- [@paales](https://github.com/paales)(@paales) [magento-payment-tokens](#package-magento-payment-tokens)

- Solve issue where the added item couldn't be properly found based on the input filters, causing problems when sending data to the data layer. (@Giovanni-Schroevers) [magento-product](#package-magento-product)

- [@paales](https://github.com/paales)(@paales) [magento-product](#package-magento-product)

- Solve issue when a user applies their first filter on a category page, a redundant GraphQL call would be made, even though the user was navigating to the `/c/[..url]` route. (@paales) [magento-product](#package-magento-product)

- [@paales](https://github.com/paales)(@paales) [magento-product](#package-magento-product)

- Customizable Product Options wouldn't be properly selected because the parent woudln't rerender anymore. (@paales) [magento-product](#package-magento-product)

- ProductSpecs now uses `attribute { label }` instead of `useQuery(ProductSpecsTypes)` (@paales) [magento-product](#package-magento-product)

- Add support for `variant=unit` and `variant=total` rendering of `ProductPagePrice` to include the quantity or not. (@paales) [magento-product](#package-magento-product)

- Added support for video's on the product page. (@paales) [magento-product](#package-magento-product) [framer-scroller](#package-framer-scroller)

- Solve issue where the category sidebar navigation would show a Clear button while it wasn't clearable. (@paales) [magento-product](#package-magento-product) [magento-search](#package-magento-search)

- Make sure CustomizableOptions are sorted correctly (@paales) [magento-product](#package-magento-product)

- Created a CustomizablePrice component that will highlight the price, to prevent duplicating logic and preventing rerenders. (@paales) [magento-product](#package-magento-product)

- Created a ProductPagePriceLowest component that switches when the configurable option changes. (@paales) [magento-product](#package-magento-product)

- `/` would not consider everything after the `/` as part of the search. (@paales) [magento-product](#package-magento-product) [magento-search](#package-magento-search)

- Forward the cart to AddProductsToCartSnackbarMessage (@paales) [magento-product](#package-magento-product)

- Support for new_from_date and new_to_date labels (@paales) [magento-product](#package-magento-product)

- Refactored the price calculation of customizable options on the product page so required options are correctly handled. (@paales) [magento-product](#package-magento-product)

- feat(GCOM-1577): show product name and link on PDP breadcrumbs (@FrankHarland) [magento-product](#package-magento-product)

- Translate relevance sort option when a non translated value is communicated from algolia. (@paales) [magento-product](#package-magento-product)

- Solve issue where the ProductListItemsBase was already wrapped in a form. (@paales) [magento-product](#package-magento-product)

- Solve issue where grouped products could only be added to the cart correctly once. (@paales) [magento-product](#package-magento-product) [magento-product-grouped](#package-magento-product-grouped)

- Fix regression issue where the sidebar filter values would be rendered too big and padding was missing on the top when values would be renderd in a bottom sheet. (@paales) [magento-product](#package-magento-product)

- Solve issue where the tier price doesn't get divided by the quantity, thus showing the wrong price. (@paales) [magento-product](#package-magento-product)

- When loading the category/search page in the case that there are no filters applied, the amount or product related queries is reduced from 2 to 1 (ProductFilters is skipped). Pagination, sorting and search terms also do not affect this. When a filter is applied we fall back to the previous functionality and do a second query to retrieve the filters.

  This did not matter when the categories/search pages were served by Magento as Magento would cache the result of the ProductFilters query. When the the catalog is served by an external service like Algolia this might be a problem.

  Implementation details: When filters are applied (e.g., filtering by color:blue), the ProductList query only returns products matching that filter, which means other filter options (like other colors) are excluded from the filter options. This behavior is expected since those other options wouldn't return any products. However, when no filters are applied, the ProductList query returns all products along with all available filter options, eliminating the need for a separate ProductFilters query. (@paales) [magento-product](#package-magento-product) [magento-search](#package-magento-search) [magento-search-overlay](#package-magento-search-overlay)

- Renamed customizable_options_entered to entered_options_record and customizable_options to selected_options_record (@paales) [magento-product](#package-magento-product)

- Make sure the product price is updated when the quantity of a product is changed. (@paales) [magento-product](#package-magento-product)

- Add the ability to edit bundle products from the cart page (@paales) [magento-product-bundle](#package-magento-product-bundle)

- Magento 2.4.7: Render discounts for bundle products (@paales) [magento-product-bundle](#package-magento-product-bundle)

- Calculate the product page price dynamically based on the options and quantities selected. (@paales) [magento-product-bundle](#package-magento-product-bundle)

- Implement the Cart options as priceModifiers so the logic can be somewhat re-used for multiple locations (@paales) [magento-product-bundle](#package-magento-product-bundle) [magento-product-configurable](#package-magento-product-configurable) [magento-product-downloadable](#package-magento-product-downloadable) [magento-product-simple](#package-magento-product-simple) [magento-product-virtual](#package-magento-product-virtual)

- Solve issue where the GetConfigurableOptionsSelection query would be executed even if the product wasn't a ConfigurableProduct. (@paales) [magento-product-configurable](#package-magento-product-configurable)

- Do not directly update the cache of the defaultConfigurableOptionsSelection, but query the backend. (@paales) [magento-product-configurable](#package-magento-product-configurable)

- Solve issue where Configurable Options would not respect the option position. (@ThisIsRuddy) [magento-product-configurable](#package-magento-product-configurable)

- Move the cartItemEdit functionality to a plugin for configurable products (@paales) [magento-product-configurable](#package-magento-product-configurable)

- Support for links_purchased_separately and links_title (@paales) [magento-product-downloadable](#package-magento-product-downloadable)

- Use narrower types for grouped products (@paales) [magento-product-grouped](#package-magento-product-grouped)

- Use ProductListPrice and AddProductsToCartQuantity for grouped product lines (@paales) [magento-product-grouped](#package-magento-product-grouped)

- Allow setting alternate search input placeholder (@bramvanderholst) [magento-search](#package-magento-search)

- Solve issue where a magento store reference was added to the graphql-mesh package. (@paales) [magento-store](#package-magento-store) [googlerecaptcha](#package-googlerecaptcha) [graphql-mesh](#package-graphql-mesh)

- Use the default display currency instead of the base currency in case they differ from one another. (@paales) [magento-store](#package-magento-store)

- Use the `storeConfig.head_shortcut_icon` when configured, if not configured it will use the favicon.ico and favicon.svg from the public folder. (@paales) [magento-store](#package-magento-store)

- Support asNumber for Money component to easily render all prices as number (@paales) [magento-store](#package-magento-store)

- Allow setting alternate store switcher URL (@bramvanderholst) [magento-store](#package-magento-store)

- Store switcher now allows switching between currencies without navigating and just switches the @privateContext. (@paales) [magento-store](#package-magento-store)

- Added store switcher to the header and mobile navigation (@paales) [magento-store](#package-magento-store)

- Added a CurrencySymbol component that renders the current currency symbol (@paales) [magento-store](#package-magento-store) [next-ui](#package-next-ui)

- Solve compat issue with adobe commerce (@paales) [magento-wishlist](#package-magento-wishlist)

- Added meta_keywords to CmsPageMeta and CategoryMeta (@paales) [algolia-categories](#package-algolia-categories) [magento-graphcms](#package-magento-graphcms)

- Allow returning the algolia index name that is being searched (@paales) [algolia-categories](#package-algolia-categories) [algolia-products](#package-algolia-products)

- Update useSendAlgoliaEvent.ts (@FrankHarland) [algolia-insights](#package-algolia-insights)

- Solve issue where the useSendEventAlgolia hook would sometimes throw an error during purchase (@Giovanni-Schroevers) [algolia-insights](#package-algolia-insights)

- Updated Algolia to the latest version of the spec. (@paales) [algolia-products](#package-algolia-products) [algolia-recommend](#package-algolia-recommend)

- Solve issue when creating an account the group_id would be requested but there wansn't a token available to retrieve the group_id. (@Renzovh) [algolia-products](#package-algolia-products)

- Normalize input values from Algolia to schema compliant values (@FrankHarland) [algolia-products](#package-algolia-products)

- Updated Algolia docs for search suggestions and used a different naming scheme where baseIndex+suggestionsSuffix is used (default that algolia suggests). (@paales) [algolia-products](#package-algolia-products)

- Fixed issue where if a value contains a `/` or a `,` the URL parsing would break. Those values are now replaced with `_AND_` and `_OR_` in the URL. (@paales) [algolia-products](#package-algolia-products)

- Solve issue where the customer group specific price index wasn't used and added warnings to be able to debug the issue. (@paales) [algolia-products](#package-algolia-products)

- Solve issue where used configurations might not be scoped to the correct store. Move caching to the mesh cache and scope per store. (@paales) [algolia-products](#package-algolia-products)

- Solve issue where algolia would return a full product URL instead of only the pathname of the given URL from Magento (@paales) [algolia-products](#package-algolia-products)

- Solve issue where the generated bucket for price aggregations didn’t contain the correct values. (@paales) [algolia-products](#package-algolia-products)

- Solve issue where some values wouldn’t be correctly flattened. (@paales) [algolia-products](#package-algolia-products)

- [@paales](https://github.com/paales)(@paales) [algolia-products](#package-algolia-products) [algolia-recommend](#package-algolia-recommend)

- Solve issue where Algolia didn't properly handle visibility as the attribute wasn't filterable, it automatically detects when there is a visibility attribute and uses that for filtering. (@paales) [algolia-products](#package-algolia-products)

- Make sure the short_description and description can be properly returned when retrieved via an Algolia query (@paales) [algolia-products](#package-algolia-products)

- Make facetName and facetValue optional when retrieving trending products (@paales) [algolia-recommend](#package-algolia-recommend)

- Solve issue where trendingProducts or trendingFacetValues couldn’t be resolved becasue root would be null (@paales) [algolia-recommend](#package-algolia-recommend)

- Moved all test routes files to the demo package so they are out of the example directory. (@paales) [demo-magento-graphcommerce](#package-demo-magento-graphcommerce)

- Make sure the increment step of the NumberInputField rounds to the nearest step. (@paales) [ecommerce-ui](#package-ecommerce-ui)

- fix issue where stepper could have values such as 8,10000000000 inste… (@FrankHarland) [ecommerce-ui](#package-ecommerce-ui)

- Fix NumberFieldElement plus button decreasing the number instead of increasing (@paales) [ecommerce-ui](#package-ecommerce-ui)

- Fix issue where setting required on the controller caused the form to submit without variables (@Giovanni-Schroevers) [ecommerce-ui](#package-ecommerce-ui)

- Refactor the FormComponents for better TypeScript checking performance. (@paales) [ecommerce-ui](#package-ecommerce-ui)

- Always log the networkError during development to the console. (@paales) [ecommerce-ui](#package-ecommerce-ui)

- Solve issue where an individual item in the ActionCardListForm couldn't be disabed. Resulting in configurable options on the product page to be selectable while they shouldn't be. (@paales) [ecommerce-ui](#package-ecommerce-ui)

- Solve an issue where Analytics and Tagmanager events wouldn't be sent. Split useSendEvent and sendEvent methods into two files so plugins can be correctly applied to each. (@paales) [google-datalayer](#package-google-datalayer) [googleanalytics](#package-googleanalytics) [googletagmanager](#package-googletagmanager)

- Solve issue where the loaded GA4 script would not include the correct GA ID (@paales) [googleanalytics](#package-googleanalytics)

- Remove dependencies from `@graphcommerce/googletagmanager` and `@graphcommerce/googleanalytics` on Magento packages and make the datalayer optional (@paales) [googleanalytics](#package-googleanalytics) [googletagmanager](#package-googletagmanager)

- ReCaptcha now using the `recaptchaV3Config` query and add a fallback for Magento 2.4.6 and earlier to still use the configuration. Magento 2.4.7 doesn't need that configuration anymore. (@paales) [googlerecaptcha](#package-googlerecaptcha) [graphql](#package-graphql)

- Solve issue where the persistenceMapper didn't use the same typePolicies and other configuration from the cache, causing potential issues. (@paales) [graphql](#package-graphql)

- usePrivateQuery now disables masking when an error occurs. (@paales) [graphql](#package-graphql)

- Upgraded to @apollo/client 3.12.3 without impacting typescript compilation performance. (@paales) [graphql](#package-graphql) [hygraph-dynamic-rows](#package-hygraph-dynamic-rows) [react-hook-form](#package-react-hook-form)

- GraphQL Mesh will now be in read-only mode by default, so only a single instance is created globally. This means it doesn't get recreated on each page compilation and fast refresh. Creating the instance is an expensive operation and can take multiple seconds and during development (and this can happen multiple times during a single change). Now only a single instance is created during development. To make sure changes are picked up during development set the config value `graphqlMeshEditMode: true` in your graphcommerce.config.js or set the env variable `GC_GRAPHQL_MESH_EDIT_MODE=1`. This is the same as the old behavior and this _will_ make the frontend considerably slower. (@paales) [graphql-mesh](#package-graphql-mesh)

- Migrated `@graphcommerce/hygraph-cli` package to `"type": "module"` (@paales) [hygraph-cli](#package-hygraph-cli)

- Solve issue where cached data was stale (@paales) [hygraph-ui](#package-hygraph-ui)

- Prepare the RichTex for embed and code-block (@paales) [hygraph-ui](#package-hygraph-ui)

- Forward `<Asset unoptimized />` component to `<Image />` (@paales) [hygraph-ui](#package-hygraph-ui)

- Export generateSrcSet from Image component so it can be used for the avatar srcSet directly (@paales) [image](#package-image)

- Created new Tabs and TabItem component to be used for MultiCart setup (@paales) [next-ui](#package-next-ui)

- cssFlag and cssNotFlag css selector can now select values (@paales) [next-ui](#package-next-ui)

- Added missing href to secondary menu items (@bramvanderholst) [next-ui](#package-next-ui)

- Fix LayoutOverlayHeader2 text overflowing beyond overlay size constraints (@paales) [next-ui](#package-next-ui)

- Added lots of missing icon exports (@paales) [next-ui](#package-next-ui)

- Do not warn about `:first-child` since all css is hoisted out of the components. (@paales) [next-ui](#package-next-ui)

- Intl components now accept the sx prop. `<RelativeToTimeFormat />` now expects a date prop instead of children. (@paales) [next-ui](#package-next-ui)

- Allow setting OverlayContainer props, such as event listeners (@paales) [next-ui](#package-next-ui)

- Modify the type that is exposed for createTheme, should be faster for TypeScript to check. (@paales) [next-ui](#package-next-ui)

- Also accept false as value for sxx (@paales) [next-ui](#package-next-ui)

- Nesting multiple Containers will not increase the padding, will only be applied once. (@paales) [next-ui](#package-next-ui)

- Added an OverlayCloseButton and implemented it for various locations. (@paales) [next-ui](#package-next-ui)

- Solve hydration error because multiple literals could be in a DateTimeFormat (@paales) [next-ui](#package-next-ui)

- Fix IconBlocks width (@StefanAngenent) [next-ui](#package-next-ui)

- Created a LayoutOverlayHeader2 that does not support any floating modes or something and thus is simpler to customize. (@paales) [next-ui](#package-next-ui)

- Added ripple to BlogTags (@bramvanderholst) [next-ui](#package-next-ui)

- Created a useCookie hook that is synced between usages (@paales) [next-ui](#package-next-ui)

- Prevent excessive rerender when multiple images with the same url are in a product (@paales) [next-ui](#package-next-ui)

- Solve issue where the sidebar wasn't 100% width on the PDP on mobile (@paales) [next-ui](#package-next-ui)

- Use a more sensible theme var for LayoutHeaderContent gap (@bramvanderholst) [next-ui](#package-next-ui)

- Fixed gallery zoom breaking on long sidebar content (@bramvanderholst) [next-ui](#package-next-ui)

- Added search params to NextLink whenever present (@paales) [next-ui](#package-next-ui)

- Solve issue where the MenuFabSecondaryItem coudn't handle text overflow. (@paales) [next-ui](#package-next-ui)

- Fixed back button width in overlays with long titles (@bramvanderholst) [next-ui](#package-next-ui)

- Update various props from ReactElement to ReactNode to allow string values (@bramvanderholst) [next-ui](#package-next-ui)

- Solve issue where ActionCard would crash the whole app because it forwarded components to string attributes (@paales) [next-ui](#package-next-ui)

- Remove dependency on Magento for @graphcommerec/react-hook-form (@paales) [react-hook-form](#package-react-hook-form)

- Fix typescript infer (@paales) [react-hook-form](#package-react-hook-form)

- Solve an issue where the false value of the useFormGql was incorrectly interpreted as an error while it was a SKIP. Fixes an issue where the CustomerAddressForm is not submitting properly when the user is adding a new address. (@paales) [react-hook-form](#package-react-hook-form)

- Fix issue where FormAutoSubmit would not listen for changes when no field names were provided (meaning it should watch changes on all fields) (@paales) [react-hook-form](#package-react-hook-form)

- Solve issue with react-hook-form causing ts errors, now version is fixed and the ts error is solved (@paales) [react-hook-form](#package-react-hook-form)

- Components must have Theme parameter to avoid significant compiler slowdown. (@paales) [eslint-config-pwa](#package-eslint-config-pwa)

- Solve a version-skew problem where certain JS files weren't properly cached by the Service Worker, but the page was cached. The moment a user wanted to load the page the JS files would not exist and result in a 404. This in turn caused the the frontend to be broken until the page was reloaded.

  The cause is that if the prefetch requests fail, other prefetch requests are not made anymore. And since the js file wasn't cached by other buckets, it would result in a 404. (@paales) [misc](#package-misc) [magento-graphcms](#package-magento-graphcms) [magento-open-source](#package-magento-open-source)

- When the added product can't be found, make sure to render just 'Product' instead of an empty string and show a cart icon instead of a placeholder. (@paales) [misc](#package-misc)

- Solve issue where the performanceLink was only activated during production while it should have been during development. (@paales) [misc](#package-misc) [magento-graphcms](#package-magento-graphcms) [magento-open-source](#package-magento-open-source)

- Added missing WebWorker tsconfig for magento-open-source example (@paales) [misc](#package-misc)

- Solve issue where the category and search page would rerender on pageload because the mask value would flip from true to false (@paales) [misc](#package-misc) [magento-graphcms](#package-magento-graphcms) [magento-open-source](#package-magento-open-source)

- Support for Magento logo and Magento copyright notice in footer (@paales) [misc](#package-misc) [magento-graphcms](#package-magento-graphcms) [magento-open-source](#package-magento-open-source)

- Solve issue where plurals weren't properly defined (@paales) [misc](#package-misc) [magento-open-source](#package-magento-open-source)

- Make sure the maxWidth of the newsletter subscribe box is sm instead of ms, making it too wide. (@paales) [misc](#package-misc)

- When a dependency is optional or has peerDependenciesMeta set to optional, make sure it doesn't crash when it is not found when calling resolveDependenciesSync (@paales) [next-config](#package-next-config)

- Remove redirects for `/product/$type/[url]` routes, those haven't been used for years anymore. (@paales) [next-config](#package-next-config)

- Solve issue with chalk compilation because we’re not migrated to esm modules. (@paales) [next-config](#package-next-config)

- Solve issue where withGraphCommerce had a hard dependency on Magento specific configurations (@paales) [next-config](#package-next-config)

- Reduce exported scope of config so we dont introduce a hidden dependency on Magento (@paales) [next-config](#package-next-config)

- Remove the 'ignored' string when loading the graphcommerce config env variable loading, as that isn't always correct (@paales) [next-config](#package-next-config)

- Remove rewriteLegacyEnv as that hasn't been used for years (@paales) [next-config](#package-next-config)

- Migrated `@graphcommerce/next-config` package to `"type": "module"` (@paales) [next-config](#package-next-config)

- If relatedUpsells are not defined, use empty object so mergeDeep… (@FrankHarland) [magento-graphcms](#package-magento-graphcms) [magento-open-source](#package-magento-open-source)

- Add correct link to demo project (@FrankHarland) [docs](#package-docs)

## Packages

- <a name="package-magento-cart"></a>@graphcommerce/magento-cart: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-cart) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-cart/CHANGELOG.md))
- <a name="package-magento-cart-checkout"></a>@graphcommerce/magento-cart-checkout: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-cart-checkout) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-cart-checkout/CHANGELOG.md))
- <a name="package-magento-cart-coupon"></a>@graphcommerce/magento-cart-coupon: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-cart-coupon) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-cart-coupon/CHANGELOG.md))
- <a name="package-magento-cart-email"></a>@graphcommerce/magento-cart-email: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-cart-email) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-cart-email/CHANGELOG.md))
- <a name="package-magento-cart-items"></a>@graphcommerce/magento-cart-items: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-cart-items) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-cart-items/CHANGELOG.md))
- <a name="package-magento-cart-payment-method"></a>@graphcommerce/magento-cart-payment-method: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-cart-payment-method) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-cart-payment-method/CHANGELOG.md))
- <a name="package-magento-cart-pickup"></a>@graphcommerce/magento-cart-pickup: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-cart-pickup) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-cart-pickup/CHANGELOG.md))
- <a name="package-magento-cart-shipping-address"></a>@graphcommerce/magento-cart-shipping-address: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-cart-shipping-address) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-cart-shipping-address/CHANGELOG.md))
- <a name="package-magento-cart-shipping-method"></a>@graphcommerce/magento-cart-shipping-method: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-cart-shipping-method) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-cart-shipping-method/CHANGELOG.md))
- <a name="package-magento-category"></a>@graphcommerce/magento-category: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-category) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-category/CHANGELOG.md))
- <a name="package-magento-cms"></a>@graphcommerce/magento-cms: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-cms) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-cms/CHANGELOG.md))
- <a name="package-magento-compare"></a>@graphcommerce/magento-compare: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-compare) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-compare/CHANGELOG.md))
- <a name="package-magento-customer"></a>@graphcommerce/magento-customer: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-customer) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-customer/CHANGELOG.md))
- <a name="package-magento-graphql"></a>@graphcommerce/magento-graphql: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-graphql) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-graphql/CHANGELOG.md))
- <a name="package-magento-graphql-rest"></a>@graphcommerce/magento-graphql-rest: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-graphql-rest) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-graphql-rest/CHANGELOG.md))
- <a name="package-magento-newsletter"></a>@graphcommerce/magento-newsletter: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-newsletter) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-newsletter/CHANGELOG.md))
- <a name="package-magento-payment-adyen"></a>@graphcommerce/magento-payment-adyen: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-payment-adyen) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-payment-adyen/CHANGELOG.md))
- <a name="package-magento-payment-braintree"></a>@graphcommerce/magento-payment-braintree: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-payment-braintree) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-payment-braintree/CHANGELOG.md))
- <a name="package-magento-payment-included"></a>@graphcommerce/magento-payment-included: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-payment-included) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-payment-included/CHANGELOG.md))
- <a name="package-magento-payment-klarna"></a>@graphcommerce/magento-payment-klarna: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-payment-klarna) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-payment-klarna/CHANGELOG.md))
- <a name="package-magento-payment-multisafepay"></a>@graphcommerce/magento-payment-multisafepay: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-payment-multisafepay) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-payment-multisafepay/CHANGELOG.md))
- <a name="package-magento-payment-paypal"></a>@graphcommerce/magento-payment-paypal: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-payment-paypal) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-payment-paypal/CHANGELOG.md))
- <a name="package-magento-payment-tokens"></a>@graphcommerce/magento-payment-tokens: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-payment-tokens) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-payment-tokens/CHANGELOG.md))
- <a name="package-magento-product"></a>@graphcommerce/magento-product: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-product) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-product/CHANGELOG.md))
- <a name="package-magento-product-bundle"></a>@graphcommerce/magento-product-bundle: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-product-bundle) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-product-bundle/CHANGELOG.md))
- <a name="package-magento-product-configurable"></a>@graphcommerce/magento-product-configurable: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-product-configurable) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-product-configurable/CHANGELOG.md))
- <a name="package-magento-product-downloadable"></a>@graphcommerce/magento-product-downloadable: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-product-downloadable) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-product-downloadable/CHANGELOG.md))
- <a name="package-magento-product-grouped"></a>@graphcommerce/magento-product-grouped: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-product-grouped) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-product-grouped/CHANGELOG.md))
- <a name="package-magento-product-simple"></a>@graphcommerce/magento-product-simple: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-product-simple) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-product-simple/CHANGELOG.md))
- <a name="package-magento-product-virtual"></a>@graphcommerce/magento-product-virtual: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-product-virtual) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-product-virtual/CHANGELOG.md))
- <a name="package-magento-recently-viewed-products"></a>@graphcommerce/magento-recently-viewed-products: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-recently-viewed-products) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-recently-viewed-products/CHANGELOG.md))
- <a name="package-magento-review"></a>@graphcommerce/magento-review: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-review) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-review/CHANGELOG.md))
- <a name="package-magento-search"></a>@graphcommerce/magento-search: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-search) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-search/CHANGELOG.md))
- <a name="package-magento-search-overlay"></a>@graphcommerce/magento-search-overlay: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-search-overlay) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-search-overlay/CHANGELOG.md))
- <a name="package-magento-store"></a>@graphcommerce/magento-store: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-store) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-store/CHANGELOG.md))
- <a name="package-magento-wishlist"></a>@graphcommerce/magento-wishlist: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-wishlist) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-wishlist/CHANGELOG.md))
- <a name="package-address-fields-nl"></a>@graphcommerce/address-fields-nl: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/address-fields-nl) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/address-fields-nl/CHANGELOG.md))
- <a name="package-algolia-categories"></a>@graphcommerce/algolia-categories: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/algolia-categories) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/algolia-categories/CHANGELOG.md))
- <a name="package-algolia-insights"></a>@graphcommerce/algolia-insights: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/algolia-insights) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/algolia-insights/CHANGELOG.md))
- <a name="package-algolia-personalization"></a>@graphcommerce/algolia-personalization: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/algolia-personalization) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/algolia-personalization/CHANGELOG.md))
- <a name="package-algolia-products"></a>@graphcommerce/algolia-products: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/algolia-products) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/algolia-products/CHANGELOG.md))
- <a name="package-algolia-recommend"></a>@graphcommerce/algolia-recommend: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/algolia-recommend) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/algolia-recommend/CHANGELOG.md))
- <a name="package-algolia-search"></a>@graphcommerce/algolia-search: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/algolia-search) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/algolia-search/CHANGELOG.md))
- <a name="package-cli"></a>@graphcommerce/cli: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/cli) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/cli/CHANGELOG.md))
- <a name="package-demo-magento-graphcommerce"></a>@graphcommerce/demo-magento-graphcommerce: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/demo-magento-graphcommerce) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/demo-magento-graphcommerce/CHANGELOG.md))
- <a name="package-ecommerce-ui"></a>@graphcommerce/ecommerce-ui: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/ecommerce-ui) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/ecommerce-ui/CHANGELOG.md))
- <a name="package-framer-next-pages"></a>@graphcommerce/framer-next-pages: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/framer-next-pages) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/framer-next-pages/CHANGELOG.md))
- <a name="package-framer-next-pages-example"></a>@graphcommerce/framer-next-pages-example: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/framer-next-pages-example) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/framer-next-pages-example/CHANGELOG.md))
- <a name="package-framer-scroller"></a>@graphcommerce/framer-scroller: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/framer-scroller) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/framer-scroller/CHANGELOG.md))
- <a name="package-framer-scroller-example"></a>@graphcommerce/framer-scroller-example: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/framer-scroller-example) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/framer-scroller-example/CHANGELOG.md))
- <a name="package-framer-utils"></a>@graphcommerce/framer-utils: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/framer-utils) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/framer-utils/CHANGELOG.md))
- <a name="package-google-datalayer"></a>@graphcommerce/google-datalayer: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/google-datalayer) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/google-datalayer/CHANGELOG.md))
- <a name="package-google-playstore"></a>@graphcommerce/google-playstore: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/google-playstore) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/google-playstore/CHANGELOG.md))
- <a name="package-googleanalytics"></a>@graphcommerce/googleanalytics: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/googleanalytics) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/googleanalytics/CHANGELOG.md))
- <a name="package-googlerecaptcha"></a>@graphcommerce/googlerecaptcha: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/googlerecaptcha) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/googlerecaptcha/CHANGELOG.md))
- <a name="package-googletagmanager"></a>@graphcommerce/googletagmanager: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/googletagmanager) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/googletagmanager/CHANGELOG.md))
- <a name="package-graphcms-ui"></a>@graphcommerce/graphcms-ui: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/graphcms-ui) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/graphcms-ui/CHANGELOG.md))
- <a name="package-graphql"></a>@graphcommerce/graphql: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/graphql) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/graphql/CHANGELOG.md))
- <a name="package-graphql-mesh"></a>@graphcommerce/graphql-mesh: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/graphql-mesh) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/graphql-mesh/CHANGELOG.md))
- <a name="package-hygraph-cli"></a>@graphcommerce/hygraph-cli: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/hygraph-cli) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/hygraph-cli/CHANGELOG.md))
- <a name="package-hygraph-dynamic-rows"></a>@graphcommerce/hygraph-dynamic-rows: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/hygraph-dynamic-rows) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/hygraph-dynamic-rows/CHANGELOG.md))
- <a name="package-hygraph-dynamic-rows-ui"></a>@graphcommerce/hygraph-dynamic-rows-ui: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/hygraph-dynamic-rows-ui) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/hygraph-dynamic-rows-ui/CHANGELOG.md))
- <a name="package-hygraph-ui"></a>@graphcommerce/hygraph-ui: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/hygraph-ui) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/hygraph-ui/CHANGELOG.md))
- <a name="package-image"></a>@graphcommerce/image: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/image) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/image/CHANGELOG.md))
- <a name="package-image-example"></a>@graphcommerce/image-example: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/image-example) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/image-example/CHANGELOG.md))
- <a name="package-lingui-next"></a>@graphcommerce/lingui-next: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/lingui-next) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/lingui-next/CHANGELOG.md))
- <a name="package-mollie-magento-payment"></a>@graphcommerce/mollie-magento-payment: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/mollie-magento-payment) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/mollie-magento-payment/CHANGELOG.md))
- <a name="package-next-ui"></a>@graphcommerce/next-ui: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packagesDev/next-ui) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packagesDev/next-ui/CHANGELOG.md))
- <a name="package-react-hook-form"></a>@graphcommerce/react-hook-form: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/react-hook-form) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/react-hook-form/CHANGELOG.md))
- <a name="package-service-worker"></a>@graphcommerce/service-worker: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/service-worker) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/service-worker/CHANGELOG.md))
- <a name="package-browserslist-config-pwa"></a>@graphcommerce/browserslist-config-pwa: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/browserslist-config-pwa) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/browserslist-config-pwa/CHANGELOG.md))
- <a name="package-changeset-changelog"></a>@graphcommerce/changeset-changelog: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/changeset-changelog) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/changeset-changelog/CHANGELOG.md))
- <a name="package-eslint-config-pwa"></a>@graphcommerce/eslint-config-pwa: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/eslint-config-pwa) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/eslint-config-pwa/CHANGELOG.md))
- <a name="package-graphql-codegen-markdown-docs"></a>@graphcommerce/graphql-codegen-markdown-docs: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/graphql-codegen-markdown-docs) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/graphql-codegen-markdown-docs/CHANGELOG.md))
- <a name="package-graphql-codegen-near-operation-file"></a>@graphcommerce/graphql-codegen-near-operation-file: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/graphql-codegen-near-operation-file) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/graphql-codegen-near-operation-file/CHANGELOG.md))
- <a name="package-graphql-codegen-relay-optimizer-plugin"></a>@graphcommerce/graphql-codegen-relay-optimizer-plugin: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/graphql-codegen-relay-optimizer-plugin) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/graphql-codegen-relay-optimizer-plugin/CHANGELOG.md))
- <a name="package-misc"></a>@graphcommerce/misc: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/misc) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/misc/CHANGELOG.md))
- <a name="package-next-config"></a>@graphcommerce/next-config: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packagesDev/next-config) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packagesDev/next-config/CHANGELOG.md))
- <a name="package-prettier-config-pwa"></a>@graphcommerce/prettier-config-pwa: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/prettier-config-pwa) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/prettier-config-pwa/CHANGELOG.md))
- <a name="package-typescript-config-pwa"></a>@graphcommerce/typescript-config-pwa: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/typescript-config-pwa) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/typescript-config-pwa/CHANGELOG.md))
- <a name="package-magento-graphcms"></a>@graphcommerce/magento-graphcms: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-graphcms) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-graphcms/CHANGELOG.md))
- <a name="package-magento-open-source"></a>@graphcommerce/magento-open-source: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-open-source) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-open-source/CHANGELOG.md))
- <a name="package-docs"></a>@graphcommerce/docs: ([source](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/docs) • [CHANGELOG.md](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/docs/CHANGELOG.md))
