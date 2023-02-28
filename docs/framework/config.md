<!-- auto generated -->
## GraphCommerceConfig

Global GraphCommerce configuration can be configured in your `graphcommerce.config.js` file in the root of your project.

### `canonicalBaseUrl: String!`

The canonical base URL is used for SEO purposes.

Examples:
- https://example.com
- https://example.com/en
- https://example.com/en-US

### `hygraphEndpoint: String!`

The HyGraph endpoint.

Project settings -> API Access -> High Performance Read-only Content API

### `i18n: [GraphCommerceI18nConfig!]!`

All i18n configuration for the project

### `magentoEndpoint: String!`

GraphQL Magento endpoint.

Examples:
- https://magento2.test/graphql

### `productFiltersPro: Boolean!`

Product filters with better UI for mobile and desktop.

@experimental This is an experimental feature and may change in the future.

### `robotsAllow: Boolean!`

Allow the site to be indexed by search engines.
If false, the robots.txt file will be set to disallow all.

### `cartDisplayPricesInclTax: Boolean`

Due to a limitation of the GraphQL API it is not possible to determine if a cart should be displayed including or excluding tax.

When Magento's StoreConfig adds this value, this can be replaced.

### `customerRequireEmailConfirmation: Boolean`

Due to a limitation in the GraphQL API of Magento 2, we need to know if the
customer requires email confirmation.

This value should match Magento 2's configuration value for
`customer/create_account/confirm` and should be removed once we can query

### `debug: GraphCommerceDebugConfig`

Debug configuration for GraphCommerce

### `demoMode: Boolean`

Enables some demo specific code that is probably not useful for a project:

- Adds the "BY GC" to the product list items.
- Adds "dominant_color" attribute swatches to the product list items.
- Creates a big list items in the product list.

### `googleAnalyticsId: String`

See https://support.google.com/analytics/answer/9539598?hl=en

Provide a value to enable Google Analytics for your store.

To enable only for a specific locale, override the value in the i18n config.

### `googleRecaptchaKey: String`

Google reCAPTCHA key, get from https://developers.google.com/recaptcha/docs/v3

This value is required even if you are configuring different values for each locale.

### `googleTagmanagerId: String`

The Google Tagmanager ID to be used on the site.

This value is required even if you are configuring different values for each locale.

### `legacyProductRoute: Boolean`

On older versions of GraphCommerce products would use a product type specific route.

This should only be set to true if you use the /product/[url] AND /product/configurable/[url] routes.

### `limitSsg: Boolean`

Limit the static generation of SSG when building

### `previewSecret: String`

To enable next.js' preview mode, configure the secret you'd like to use.

### `wishlistHideForGuests: Boolean`

Hide the wishlist functionality for guests.

### `wishlistIgnoreProductWishlistStatus: Boolean`

Ignores wether a product is already in the wishlist, makes the toggle an add only.

## GraphCommerceDebugConfig

Debug configuration for GraphCommerce

### `pluginStatus: Boolean`

Reports which plugins are enabled or disabled.

### `webpackCircularDependencyPlugin: Boolean`

Cyclic dependencies can cause memory issues and other strange bugs.
This plugin will warn you when it detects a cyclic dependency.

When running into memory issues, it can be useful to enable this plugin.

### `webpackDuplicatesPlugin: Boolean`

When updating packages it can happen that the same package is included with different versions in the same project.

Issues that this can cause are:
- The same package is included multiple times in the bundle, increasing the bundle size.
- The Typescript types of the package are not compatible with each other, causing Typescript errors.

## GraphCommerceI18nConfig

All i18n configuration for the project

### `locale: String!`

Must be a locale string https://www.unicode.org/reports/tr35/tr35-59/tr35.html#Identifiers

### `magentoStoreCode: String!`

Magento store code.

Stores => All Stores => [Store View] => Store View Code

Examples:
- default
- en-us
- b2b-us

### `canonicalBaseUrl: String`

The canonical base URL is used for SEO purposes.

Examples:
- https://example.com
- https://example.com/en
- https://example.com/en-US

### `cartDisplayPricesInclTax: Boolean`

Due to a limitation of the GraphQL API it is not possible to determine if a cart should be displayed including or excluding tax.

### `defaultLocale: Boolean`

There can only be one entry with defaultLocale set to true.
- If there are more, the first one is used.
- If there is none, the first entry is used.

### `domain: String`

Domain configuration, must be a domain https://tools.ietf.org/html/rfc3986

### `googleAnalyticsId: String`

Configure different Google Analytics IDs for different locales.

To disable for a specific locale, set the value to null.

### `googleRecaptchaKey: String`

Locale specific google reCAPTCHA key.

### `googleTagmanagerId: String`

The Google Tagmanager ID to be used per locale.

### `hygraphLocales: [String!]`

Add a gcms-locales header to make sure queries return in a certain language, can be an array to define fallbacks.

### `linguiLocale: String`

Specify a custom locale for to load translations.