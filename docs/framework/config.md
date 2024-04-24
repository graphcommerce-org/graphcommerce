<!-- Automatically generated from Config.graphqls -->
### DatalayerConfig

GoogleDatalayerConfig to allow enabling certain aspects of the datalayer

#### coreWebVitals: boolean

Enable core web vitals tracking for GraphCommerce

# GraphCommerce configuration system

Global GraphCommerce configuration can be configured in your `graphcommerce.config.js` file
in the root of your project and are automatically validated on startup.

## Configuring with the configuration file.

The configuration file is a javascript file that exports a `GraphCommerceConfig` object. See graphcommerce.config.js.example for an example.

## Using configuration

Configuration can be accessed in your project with the `import.meta.graphCommerce` object.

```tsx
import { storefrontAll, storefrontConfig, storefrontConfigDefault, useStorefrontConfig } from '@graphcommerce/next-ui'

// Accessing a global value
const globalConf = import.meta.graphCommerce.cartDisplayPricesInclTax

function MyComponent() {
  // Configuration configured per storefront locale.
  const scopedConfig = useStorefrontConfig().cartDisplayPricesInclTax

  // Creating a fallback system
  const scopedConfigWithFallback = scopedConfig ?? globalConf

  // Or as single line
  const scopedConfigWithFallback2 =
    useStorefrontConfig().cartDisplayPricesInclTax ?? import.meta.graphCommerce.cartDisplayPricesInclTax

  return <div>{googleRecaptchaKey}</div>
}
```

You can also use the configuration in your `.meshrc.yml` by accessing
`{graphCommerce.myField}`

```yml
endpoint: '{graphCommerce.magentoEndpoint}'
```

## Environment variables to override configuration

Configuration values can be overwriten by environment variables, with the following rules:
- Convert from camelCase to `SCREAMING_SNAKE_CASE`
- Prefix with `GC_`
- Arrays can be indexed with `_0`, `_1`, `_2`, etc.
- Objects can be accessed with `_<key>`.

Examples:
- `limitSsg` -> `GC_LIMIT_SSG="1"`
- `storefront[0].locale` -> `GC_STOREFRONT_0_LOCALE="en"`
- `debug.pluginStatus` -> `GC_DEBUG_PLUGIN_STATUS="1"`


## Exporting current configuration to environment variables

You can export configuration by running `yarn graphcommerce export-config`

## Extending the configuration in your project

Create a graphql/Config.graphqls file in your project and extend the GraphCommerceConfig, GraphCommerceStorefrontConfig inputs to add configuration.

```graphql
extend input GraphCommerceConfig {
  myConfig: String # or Boolean, or Int, or Float, make required with `!`
}
extend input GraphCommerceStorefrontConfig {
  myField: Boolean
}
```

## All configuration values

Below is a list of all possible configurations that can be set by GraphCommerce.

### GraphCommerceConfig

#### canonicalBaseUrl: string (required)

The canonical base URL is used for SEO purposes.

Examples:
- https://example.com
- https://example.com/en
- https://example.com/en-US

#### hygraphEndpoint: string (required)

The HyGraph endpoint.

> Read-only endpoint that allows low latency and high read-throughput content delivery.

Project settings -> API Access -> High Performance Read-only Content API

#### magentoEndpoint: string (required)

GraphQL Magento endpoint.

Examples:
- https://magento2.test/graphql

#### storefront: [GraphCommerceStorefrontConfig](#GraphCommerceStorefrontConfig)[] (required)

All storefront configuration for the project

#### cartDisplayPricesInclTax: boolean

Due to a limitation of the GraphQL API it is not possible to determine if a cart should be displayed including or excluding tax.

When Magento's StoreConfig adds this value, this can be replaced.

#### compare: boolean

Use compare functionality

#### compareVariant: CHECKBOX | ICON = `ICON`

By default the compare feature is denoted with a 'compare ICON' (2 arrows facing one another).
This may be fine for experienced users, but for more clarity it's also possible to present the compare feature as a CHECKBOX accompanied by the 'Compare' label

#### configurableVariantForSimple: boolean = `false`

If a simple product is part of a Configurable product page, should the simple product be
rendered as a configured option of the configurable product page?

How does this work:

When the `products(filters: { url_key: { eq: 'simple-product' } }) { ... }` query is ran,
Magento also returns the Simple product and the Configurable product the simple belongs to.

If that is the case we render the configurable product page instead of the simple product page but
the options to select the simple product are pre-selected.

#### configurableVariantValues: [MagentoConfigurableVariantValues](#MagentoConfigurableVariantValues) = `{ content: true, url: true }`

When a user selects a variant, it will switch the values on the configurable page with the values of the configured variant.

Enabling options here will allow switching of those variants.

#### crossSellsHideCartItems: boolean = `false`

Determines if cross sell items should be shown when the user already has the product in their cart. This will result in a product will popping off the screen when you add it to the cart.

Default: 'false'

#### crossSellsRedirectItems: boolean = `false`

Determines if, after adding a cross-sell item to the cart, the user should be redirected to the cross-sell items of the product they just added.

Default: 'false'

#### customerRequireEmailConfirmation: boolean

Due to a limitation in the GraphQL API of Magento 2, we need to know if the
customer requires email confirmation.

This value should match Magento 2's configuration value for
`customer/create_account/confirm` and should be removed once we can query

#### dataLayer: [DatalayerConfig](#DatalayerConfig)

#### debug: [GraphCommerceDebugConfig](#GraphCommerceDebugConfig)

Debug configuration for GraphCommerce

#### demoMode: boolean = `true`

Enables some demo specific code that is probably not useful for a project:

- Adds the "BY GC" to the product list items.
- Adds "dominant_color" attribute swatches to the product list items.
- Creates a big list items in the product list.

#### enableGuestCheckoutLogin: boolean

Enable Guest Checkout Login:
During customer login, GraphCommerce queries Magento to determine whether
the customer account already exists or not. If not, the sign-up form is shown instead.

For Magento versions, 2.4.7, 2.4.6-p1 and up, 2.4.5-p3 and up, 2.4.4-p4 and up, the following setting must be set to Yes

`Stores -> Configuration -> Sales -> Checkout -> Checkout Options -> Enable Guest Checkout Login`

#### googleAnalyticsId: string

See https://support.google.com/analytics/answer/9539598?hl=en

Provide a value to enable Google Analytics for your store.

To override the value for a specific locale, configure in i18n config.

#### googleRecaptchaKey: string

Google reCAPTCHA site key.
When using reCAPTCHA, this value is required, even if you are configuring different values for each locale.

Get a site key and a secret key from https://developers.google.com/recaptcha/docs/v3

The secret key should be added in the Magento admin panel (Stores > Configuration > Security > Google ReCAPTCHA Storefront > reCAPTCHA v3 Invisible)
ReCAPTCHA can then be enabled/disabled for the different forms, separately (Stores > Configuration > Security > Google ReCAPTCHA Storefront > Storefront)

#### googleTagmanagerId: string

The Google Tagmanager ID to be used on the site.

This value is required even if you are configuring different values for each locale.

#### hygraphManagementApi: string

Hygraph Management API. **Only used for migrations.**

#### hygraphProjectId: string

Hygraph Project ID. **Only used for migrations.**

#### hygraphWriteAccessEndpoint: string

Content API. **Only used for migrations.**

> Regular read & write endpoint that allows querying and mutating data in your project.

Project settings -> API Access -> Content API

#### hygraphWriteAccessToken: string

Hygraph Management SDK Authorization Token. **Only used for migrations.**

Project settings -> API Access -> Permanent Auth Tokens

1. Click  'Add token' and give it a name, something like 'GraphCommerce Write Access Token' and keep stage on 'Published'.
2. Under 'Management API', click 'Yes, Initialize defaults'
3. Click 'Edit Permissions' and enable: 'Update' and 'Delete' permissions for 'models', 'enumerations', 'fields', 'components' and 'sources'
  - Update existing models
  - Delete existing models
  - Update existing fields
  - Delete existing fields
  - Update existing enumerations
  - Delete existing enumerations
  - Update existing components
  - Delete existing components
  - Update remote sources
  - Delete remote sources
  - Read existing environments
  - Read public content views
  - Create public content views
  - Update public content views
  - Delete public content views
  - Can see schema view

```
GC_HYGRAPH_WRITE_ACCESS_ENDPOINT="https://...hygraph.com/v2/..."
GC_HYGRAPH_WRITE_ACCESS_TOKEN="AccessTokenFromHygraph"
yarn graphcommerce hygraph-migrate
```

#### limitSsg: boolean

Limit the static generation of SSG when building.

By default GraphCommerce will statically generate all product and category pages during build. This can take quite a long time, to skip this step set this value to true.

#### previewSecret: string

To enable next.js' preview mode, configure the secret you'd like to use.

#### productFiltersLayout: DEFAULT | SIDEBAR = `DEFAULT`

Layout how the filters are rendered.
DEFAULT: Will be rendered as horzontal chips on desktop and mobile
SIDEBAR: Will be rendered as a sidebar on desktop and horizontal chips on mobile

#### productFiltersPro: boolean

Product filters with better UI for mobile and desktop.

#### productRoute: string

By default we route products to /p/[url] but you can change this to /product/[url] if you wish.

Default: '/p/'
Example: '/product/'

#### recentlyViewedProducts: [RecentlyViewedProductsConfig](#RecentlyViewedProductsConfig)

Settings for recently viewed products

#### robotsAllow: boolean

Allow the site to be indexed by search engines.
If false, the robots.txt file will be set to disallow all.

#### sidebarGallery: [SidebarGalleryConfig](#SidebarGalleryConfig)

Configuration for the SidebarGallery component

#### wishlistHideForGuests: boolean

Hide the wishlist functionality for guests.

#### wishlistShowFeedbackMessage: boolean

Show a message when the product is added to the wishlist.

### GraphCommerceDebugConfig

Debug configuration for GraphCommerce

#### pluginStatus: boolean

Reports which plugins are enabled or disabled.

#### sessions: boolean

Enable debugging interface to debug sessions

#### webpackCircularDependencyPlugin: boolean

Cyclic dependencies can cause memory issues and other strange bugs.
This plugin will warn you when it detects a cyclic dependency.

When running into memory issues, it can be useful to enable this plugin.

#### webpackDuplicatesPlugin: boolean

When updating packages it can happen that the same package is included with different versions in the same project.

Issues that this can cause are:
- The same package is included multiple times in the bundle, increasing the bundle size.
- The Typescript types of the package are not compatible with each other, causing Typescript errors.

### GraphCommerceStorefrontConfig

All storefront configuration for the project

#### locale: string (required)

Must be a [locale string](https://www.unicode.org/reports/tr35/tr35-59/tr35.html#Identifiers) for automatic redirects to work.

This value can be used as a sub-path identifier only, make sure linguiLocale is configured for each URL.

#### magentoStoreCode: string (required)

Magento store code.

Stores => All Stores => [Store View] => Store View Code

Examples:
- default
- en-us
- b2b-us

#### canonicalBaseUrl: string

The canonical base URL is used for SEO purposes.

Examples:
- https://example.com
- https://example.com/en
- https://example.com/en-US

#### cartDisplayPricesInclTax: boolean

Due to a limitation of the GraphQL API it is not possible to determine if a cart should be displayed including or excluding tax.

#### defaultLocale: boolean

There can only be one entry with defaultLocale set to true.
- If there are more, the first one is used.
- If there is none, the first entry is used.

#### domain: string

Domain configuration, must be a domain https://tools.ietf.org/html/rfc3986

#### googleAnalyticsId: string

Configure different Google Analytics IDs for different locales.

To disable for a specific locale, set the value to null.

#### googleRecaptchaKey: string

Locale specific google reCAPTCHA key.

#### googleTagmanagerId: string

The Google Tagmanager ID to be used per locale.

#### hygraphLocales: string[]

Add a gcms-locales header to make sure queries return in a certain language, can be an array to define fallbacks.

#### linguiLocale: string

Specify a custom locale for to load translations. Must be lowercase valid locale.

This value is also used for the Intl.

#### robotsAllow: boolean

Allow the site to be indexed by search engines.
If false, the robots.txt file will be set to disallow all.

### MagentoConfigurableVariantValues

Options to configure which values will be replaced when a variant is selected on the product page.

#### content: boolean

Use the name, description, short description and meta data from the configured variant

#### gallery: boolean

This option enables the automatic update of product gallery images on the product page when a variant is selected,
provided that the gallery images for the selected variant differ from the currently displayed images.

#### url: boolean

When a variant is selected the URL of the product will be changed in the address bar.

This only happens when the actual variant is can be accessed by the URL.

### RecentlyViewedProductsConfig

Settings for recently viewed products

#### enabled: boolean

Enable/disable recently viewed products

#### maxCount: number

Number of recently viewed products to be stored in localStorage

### SidebarGalleryConfig

SidebarGalleryConfig will contain all configuration values for the Sidebar Gallery component.

#### paginationVariant: DOTS | THUMBNAILS_BOTTOM

Variant used for the pagination