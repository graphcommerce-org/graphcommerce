/* eslint-disable */
import { z } from 'zod'
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CompareVariant =
  | 'CHECKBOX'
  | 'ICON';

/** GoogleDatalayerConfig to allow enabling certain aspects of the datalayer */
export type DatalayerConfig = {
  /** Enable core web vitals tracking for GraphCommerce */
  coreWebVitals?: InputMaybe<Scalars['Boolean']['input']>;
};

/**
 * # GraphCommerce configuration system
 *
 * Global GraphCommerce configuration can be configured in your `graphcommerce.config.js` file
 * in the root of your project and are automatically validated on startup.
 *
 * ## Configuring with the configuration file.
 *
 * The configuration file is a javascript file that exports a `GraphCommerceConfig` object. See graphcommerce.config.js.example for an example.
 *
 * ## Using configuration
 *
 * Configuration can be accessed in your project with the `import.meta.graphCommerce` object.
 *
 * ```tsx
 * import { storefrontAll, storefrontConfig, storefrontConfigDefault, useStorefrontConfig } from '@graphcommerce/next-ui'
 *
 * // Accessing a global value
 * const globalConf = import.meta.graphCommerce.cartDisplayPricesInclTax
 *
 * function MyComponent() {
 *   // Configuration configured per storefront locale.
 *   const scopedConfig = useStorefrontConfig().cartDisplayPricesInclTax
 *
 *   // Creating a fallback system
 *   const scopedConfigWithFallback = scopedConfig ?? globalConf
 *
 *   // Or as single line
 *   const scopedConfigWithFallback2 =
 *     useStorefrontConfig().cartDisplayPricesInclTax ?? import.meta.graphCommerce.cartDisplayPricesInclTax
 *
 *   return <div>{googleRecaptchaKey}</div>
 * }
 * ```
 *
 * You can also use the configuration in your `.meshrc.yml` by accessing
 * `{graphCommerce.myField}`
 *
 * ```yml
 * endpoint: '{graphCommerce.magentoEndpoint}'
 * ```
 *
 * ## Environment variables to override configuration
 *
 * Configuration values can be overwriten by environment variables, with the following rules:
 * - Convert from camelCase to `SCREAMING_SNAKE_CASE`
 * - Prefix with `GC_`
 * - Arrays can be indexed with `_0`, `_1`, `_2`, etc.
 * - Objects can be accessed with `_<key>`.
 *
 * Examples:
 * - `limitSsg` -> `GC_LIMIT_SSG="1"`
 * - `storefront[0].locale` -> `GC_STOREFRONT_0_LOCALE="en"`
 * - `debug.pluginStatus` -> `GC_DEBUG_PLUGIN_STATUS="1"`
 *
 *
 * ## Exporting current configuration to environment variables
 *
 * You can export configuration by running `yarn graphcommerce export-config`
 *
 * ## Extending the configuration in your  project
 *
 * Create a graphql/Config.graphqls file in your project and extend the GraphCommerceConfig, GraphCommerceStorefrontConfig inputs to add configuration.
 *
 * ```graphql
 * extend input GraphCommerceConfig {
 *   myConfig: String # or Boolean, or Int, or Float, make required with `!`
 * }
 * extend input GraphCommerceStorefrontConfig {
 *   myField: Boolean
 * }
 * ```
 *
 * ## All configuration values
 *
 * Below is a list of all possible configurations that can be set by GraphCommerce.
 */
export type GraphCommerceConfig = {
  /** Configuration for the SidebarGallery component */
  breadcrumbs?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * The canonical base URL is used for SEO purposes.
   *
   * Examples:
   * - https://example.com
   * - https://example.com/en
   * - https://example.com/en-US
   */
  canonicalBaseUrl: Scalars['String']['input'];
  /**
   * Due to a limitation of the GraphQL API it is not possible to determine if a cart should be displayed including or excluding tax.
   *
   * When Magento's StoreConfig adds this value, this can be replaced.
   */
  cartDisplayPricesInclTax?: InputMaybe<Scalars['Boolean']['input']>;
  /** Use compare functionality */
  compare?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * By default the compare feature is denoted with a 'compare ICON' (2 arrows facing one another).
   * This may be fine for experienced users, but for more clarity it's also possible to present the compare feature as a CHECKBOX accompanied by the 'Compare' label
   */
  compareVariant?: InputMaybe<CompareVariant>;
  /**
   * If a simple product is part of a Configurable product page, should the simple product be
   * rendered as a configured option of the configurable product page?
   *
   * How does this work:
   *
   * When the `products(filters: { url_key: { eq: 'simple-product' } }) { ... }` query is ran,
   * Magento also returns the Simple product and the Configurable product the simple belongs to.
   *
   * If that is the case we render the configurable product page instead of the simple product page but
   * the options to select the simple product are pre-selected.
   */
  configurableVariantForSimple?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * When a user selects a variant, it will switch the values on the configurable page with the values of the configured variant.
   *
   * Enabling options here will allow switching of those variants.
   */
  configurableVariantValues?: InputMaybe<MagentoConfigurableVariantValues>;
  /**
   * Determines if cross sell items should be shown when the user already has the product in their cart. This will result in a product will popping off the screen when you add it to the cart.
   *
   * Default: 'false'
   */
  crossSellsHideCartItems?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * Determines if, after adding a cross-sell item to the cart, the user should be redirected to the cross-sell items of the product they just added.
   *
   * Default: 'false'
   */
  crossSellsRedirectItems?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * Due to a limitation in the GraphQL API of Magento 2, we need to know if the
   * customer requires email confirmation.
   *
   * This value should match Magento 2's configuration value for
   * `customer/create_account/confirm` and should be removed once we can query
   */
  customerRequireEmailConfirmation?: InputMaybe<Scalars['Boolean']['input']>;
  dataLayer?: InputMaybe<DatalayerConfig>;
  /** Debug configuration for GraphCommerce */
  debug?: InputMaybe<GraphCommerceDebugConfig>;
  /**
   * Enables some demo specific code that is probably not useful for a project:
   *
   * - Adds the "BY GC" to the product list items.
   * - Adds "dominant_color" attribute swatches to the product list items.
   * - Creates a big list items in the product list.
   */
  demoMode?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * Enable Guest Checkout Login:
   * During customer login, GraphCommerce queries Magento to determine whether
   * the customer account already exists or not. If not, the sign-up form is shown instead.
   *
   * For Magento versions, 2.4.7, 2.4.6-p1 and up, 2.4.5-p3 and up, 2.4.4-p4 and up, the following setting must be set to Yes
   *
   * `Stores -> Configuration -> Sales -> Checkout -> Checkout Options -> Enable Guest Checkout Login`
   */
  enableGuestCheckoutLogin?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * See https://support.google.com/analytics/answer/9539598?hl=en
   *
   * Provide a value to enable Google Analytics for your store.
   *
   * To override the value for a specific locale, configure in i18n config.
   */
  googleAnalyticsId?: InputMaybe<Scalars['String']['input']>;
  /**
   * Google reCAPTCHA site key.
   * When using reCAPTCHA, this value is required, even if you are configuring different values for each locale.
   *
   * Get a site key and a secret key from https://developers.google.com/recaptcha/docs/v3
   *
   * The secret key should be added in the Magento admin panel (Stores > Configuration > Security > Google ReCAPTCHA Storefront > reCAPTCHA v3 Invisible)
   * ReCAPTCHA can then be enabled/disabled for the different forms, separately (Stores > Configuration > Security > Google ReCAPTCHA Storefront > Storefront)
   */
  googleRecaptchaKey?: InputMaybe<Scalars['String']['input']>;
  /**
   * The Google Tagmanager ID to be used on the site.
   *
   * This value is required even if you are configuring different values for each locale.
   */
  googleTagmanagerId?: InputMaybe<Scalars['String']['input']>;
  /**
   * The HyGraph endpoint.
   *
   * > Read-only endpoint that allows low latency and high read-throughput content delivery.
   *
   * Project settings -> API Access -> High Performance Read-only Content API
   */
  hygraphEndpoint: Scalars['String']['input'];
  /** Hygraph Management API. **Only used for migrations.** */
  hygraphManagementApi?: InputMaybe<Scalars['String']['input']>;
  /** Hygraph Project ID. **Only used for migrations.** */
  hygraphProjectId?: InputMaybe<Scalars['String']['input']>;
  /**
   * Content API. **Only used for migrations.**
   *
   * > Regular read & write endpoint that allows querying and mutating data in your project.
   *
   * Project settings -> API Access -> Content API
   */
  hygraphWriteAccessEndpoint?: InputMaybe<Scalars['String']['input']>;
  /**
   * Hygraph Management SDK Authorization Token. **Only used for migrations.**
   *
   * Project settings -> API Access -> Permanent Auth Tokens
   *
   * 1. Click  'Add token' and give it a name, something like 'GraphCommerce Write Access Token' and keep stage on 'Published'.
   * 2. Under 'Management API', click 'Yes, Initialize defaults'
   * 3. Click 'Edit Permissions' and enable: 'Update' and 'Delete' permissions for 'models', 'enumerations', 'fields', 'components' and 'sources'
   *   - Update existing models
   *   - Delete existing models
   *   - Update existing fields
   *   - Delete existing fields
   *   - Update existing enumerations
   *   - Delete existing enumerations
   *   - Update existing components
   *   - Delete existing components
   *   - Update remote sources
   *   - Delete remote sources
   *   - Read existing environments
   *   - Read public content views
   *   - Create public content views
   *   - Update public content views
   *   - Delete public content views
   *   - Can see schema view
   *
   * ```
   * GC_HYGRAPH_WRITE_ACCESS_ENDPOINT="https://...hygraph.com/v2/..."
   * GC_HYGRAPH_WRITE_ACCESS_TOKEN="AccessTokenFromHygraph"
   * yarn graphcommerce hygraph-migrate
   * ```
   */
  hygraphWriteAccessToken?: InputMaybe<Scalars['String']['input']>;
  /**
   * Limit the static generation of SSG when building.
   *
   * By default GraphCommerce will statically generate all product and category pages during build. This can take quite a long time, to skip this step set this value to true.
   */
  limitSsg?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * GraphQL Magento endpoint.
   *
   * Examples:
   * - https://magento2.test/graphql
   */
  magentoEndpoint: Scalars['String']['input'];
  /** To enable next.js' preview mode, configure the secret you'd like to use. */
  previewSecret?: InputMaybe<Scalars['String']['input']>;
  /**
   * Layout how the filters are rendered.
   * DEFAULT: Will be rendered as horzontal chips on desktop and mobile
   * SIDEBAR: Will be rendered as a sidebar on desktop and horizontal chips on mobile
   */
  productFiltersLayout?: InputMaybe<ProductFiltersLayout>;
  /** Product filters with better UI for mobile and desktop. */
  productFiltersPro?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * By default we route products to /p/[url] but you can change this to /product/[url] if you wish.
   *
   * Default: '/p/'
   * Example: '/product/'
   */
  productRoute?: InputMaybe<Scalars['String']['input']>;
  /** Settings for recently viewed products */
  recentlyViewedProducts?: InputMaybe<RecentlyViewedProductsConfig>;
  /**
   * Allow the site to be indexed by search engines.
   * If false, the robots.txt file will be set to disallow all.
   */
  robotsAllow?: InputMaybe<Scalars['Boolean']['input']>;
  /** Configuration for the SidebarGallery component */
  sidebarGallery?: InputMaybe<SidebarGalleryConfig>;
  /** All storefront configuration for the project */
  storefront: Array<GraphCommerceStorefrontConfig>;
  /** Hide the wishlist functionality for guests. */
  wishlistHideForGuests?: InputMaybe<Scalars['Boolean']['input']>;
  /** Show a message when the product is added to the wishlist. */
  wishlistShowFeedbackMessage?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Debug configuration for GraphCommerce */
export type GraphCommerceDebugConfig = {
  /** Reports which plugins are enabled or disabled. */
  pluginStatus?: InputMaybe<Scalars['Boolean']['input']>;
  /** Enable debugging interface to debug sessions */
  sessions?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * Cyclic dependencies can cause memory issues and other strange bugs.
   * This plugin will warn you when it detects a cyclic dependency.
   *
   * When running into memory issues, it can be useful to enable this plugin.
   */
  webpackCircularDependencyPlugin?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * When updating packages it can happen that the same package is included with different versions in the same project.
   *
   * Issues that this can cause are:
   * - The same package is included multiple times in the bundle, increasing the bundle size.
   * - The Typescript types of the package are not compatible with each other, causing Typescript errors.
   */
  webpackDuplicatesPlugin?: InputMaybe<Scalars['Boolean']['input']>;
};

/** All storefront configuration for the project */
export type GraphCommerceStorefrontConfig = {
  /**
   * The canonical base URL is used for SEO purposes.
   *
   * Examples:
   * - https://example.com
   * - https://example.com/en
   * - https://example.com/en-US
   */
  canonicalBaseUrl?: InputMaybe<Scalars['String']['input']>;
  /** Due to a limitation of the GraphQL API it is not possible to determine if a cart should be displayed including or excluding tax. */
  cartDisplayPricesInclTax?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * There can only be one entry with defaultLocale set to true.
   * - If there are more, the first one is used.
   * - If there is none, the first entry is used.
   */
  defaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
  /** Domain configuration, must be a domain https://tools.ietf.org/html/rfc3986 */
  domain?: InputMaybe<Scalars['String']['input']>;
  /**
   * Configure different Google Analytics IDs for different locales.
   *
   * To disable for a specific locale, set the value to null.
   */
  googleAnalyticsId?: InputMaybe<Scalars['String']['input']>;
  /** Locale specific google reCAPTCHA key. */
  googleRecaptchaKey?: InputMaybe<Scalars['String']['input']>;
  /** The Google Tagmanager ID to be used per locale. */
  googleTagmanagerId?: InputMaybe<Scalars['String']['input']>;
  /** Add a gcms-locales header to make sure queries return in a certain language, can be an array to define fallbacks. */
  hygraphLocales?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Specify a custom locale for to load translations. */
  linguiLocale?: InputMaybe<Scalars['String']['input']>;
  /** Must be a locale string https://www.unicode.org/reports/tr35/tr35-59/tr35.html#Identifiers */
  locale: Scalars['String']['input'];
  /**
   * Magento store code.
   *
   * Stores => All Stores => [Store View] => Store View Code
   *
   * Examples:
   * - default
   * - en-us
   * - b2b-us
   */
  magentoStoreCode: Scalars['String']['input'];
};

/** Options to configure which values will be replaced when a variant is selected on the product page. */
export type MagentoConfigurableVariantValues = {
  /** Use the name, description, short description and meta data from the configured variant */
  content?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * This option enables the automatic update of product gallery images on the product page when a variant is selected,
   * provided that the gallery images for the selected variant differ from the currently displayed images.
   */
  gallery?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * When a variant is selected the URL of the product will be changed in the address bar.
   *
   * This only happens when the actual variant is can be accessed by the URL.
   */
  url?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProductFiltersLayout =
  | 'DEFAULT'
  | 'SIDEBAR';

/** Settings for recently viewed products */
export type RecentlyViewedProductsConfig = {
  /** Enable/disable recently viewed products */
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Number of recently viewed products to be stored in localStorage */
  maxCount?: InputMaybe<Scalars['Int']['input']>;
};

/** SidebarGalleryConfig will contain all configuration values for the Sidebar Gallery component. */
export type SidebarGalleryConfig = {
  /** Variant used for the pagination */
  paginationVariant?: InputMaybe<SidebarGalleryPaginationVariant>;
};

/** Enumeration of all possible positions for the sidebar gallery thumbnails. */
export type SidebarGalleryPaginationVariant =
  | 'DOTS'
  | 'THUMBNAILS_BOTTOM';


type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export const CompareVariantSchema = z.enum(['CHECKBOX', 'ICON']);

export const ProductFiltersLayoutSchema = z.enum(['DEFAULT', 'SIDEBAR']);

export const SidebarGalleryPaginationVariantSchema = z.enum(['DOTS', 'THUMBNAILS_BOTTOM']);

export function DatalayerConfigSchema(): z.ZodObject<Properties<DatalayerConfig>> {
  return z.object({
    coreWebVitals: z.boolean().nullish()
  })
}

export function GraphCommerceConfigSchema(): z.ZodObject<Properties<GraphCommerceConfig>> {
  return z.object({
    breadcrumbs: z.boolean().default(false).nullish(),
    canonicalBaseUrl: z.string().min(1),
    cartDisplayPricesInclTax: z.boolean().nullish(),
    compare: z.boolean().nullish(),
    compareVariant: CompareVariantSchema.default("ICON").nullish(),
    configurableVariantForSimple: z.boolean().default(false).nullish(),
    configurableVariantValues: MagentoConfigurableVariantValuesSchema().nullish(),
    crossSellsHideCartItems: z.boolean().default(false).nullish(),
    crossSellsRedirectItems: z.boolean().default(false).nullish(),
    customerRequireEmailConfirmation: z.boolean().nullish(),
    dataLayer: DatalayerConfigSchema().nullish(),
    debug: GraphCommerceDebugConfigSchema().nullish(),
    demoMode: z.boolean().default(true).nullish(),
    enableGuestCheckoutLogin: z.boolean().nullish(),
    googleAnalyticsId: z.string().nullish(),
    googleRecaptchaKey: z.string().nullish(),
    googleTagmanagerId: z.string().nullish(),
    hygraphEndpoint: z.string().min(1),
    hygraphManagementApi: z.string().nullish(),
    hygraphProjectId: z.string().nullish(),
    hygraphWriteAccessEndpoint: z.string().nullish(),
    hygraphWriteAccessToken: z.string().nullish(),
    limitSsg: z.boolean().nullish(),
    magentoEndpoint: z.string().min(1),
    previewSecret: z.string().nullish(),
    productFiltersLayout: ProductFiltersLayoutSchema.default("DEFAULT").nullish(),
    productFiltersPro: z.boolean().nullish(),
    productRoute: z.string().nullish(),
    recentlyViewedProducts: RecentlyViewedProductsConfigSchema().nullish(),
    robotsAllow: z.boolean().nullish(),
    sidebarGallery: SidebarGalleryConfigSchema().nullish(),
    storefront: z.array(GraphCommerceStorefrontConfigSchema()),
    wishlistHideForGuests: z.boolean().nullish(),
    wishlistShowFeedbackMessage: z.boolean().nullish()
  })
}

export function GraphCommerceDebugConfigSchema(): z.ZodObject<Properties<GraphCommerceDebugConfig>> {
  return z.object({
    pluginStatus: z.boolean().nullish(),
    sessions: z.boolean().nullish(),
    webpackCircularDependencyPlugin: z.boolean().nullish(),
    webpackDuplicatesPlugin: z.boolean().nullish()
  })
}

export function GraphCommerceStorefrontConfigSchema(): z.ZodObject<Properties<GraphCommerceStorefrontConfig>> {
  return z.object({
    canonicalBaseUrl: z.string().nullish(),
    cartDisplayPricesInclTax: z.boolean().nullish(),
    defaultLocale: z.boolean().nullish(),
    domain: z.string().nullish(),
    googleAnalyticsId: z.string().nullish(),
    googleRecaptchaKey: z.string().nullish(),
    googleTagmanagerId: z.string().nullish(),
    hygraphLocales: z.array(z.string().min(1)).nullish(),
    linguiLocale: z.string().nullish(),
    locale: z.string().min(1),
    magentoStoreCode: z.string().min(1)
  })
}

export function MagentoConfigurableVariantValuesSchema(): z.ZodObject<Properties<MagentoConfigurableVariantValues>> {
  return z.object({
    content: z.boolean().nullish(),
    gallery: z.boolean().nullish(),
    url: z.boolean().nullish()
  })
}

export function RecentlyViewedProductsConfigSchema(): z.ZodObject<Properties<RecentlyViewedProductsConfig>> {
  return z.object({
    enabled: z.boolean().nullish(),
    maxCount: z.number().nullish()
  })
}

export function SidebarGalleryConfigSchema(): z.ZodObject<Properties<SidebarGalleryConfig>> {
  return z.object({
    paginationVariant: SidebarGalleryPaginationVariantSchema.nullish()
  })
}
