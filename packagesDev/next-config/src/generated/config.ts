/* eslint-disable */
import { z } from 'zod'
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
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
 * import { i18nAll, i18nConfig, i18nConfigDefault, useI18nConfig } from '@graphcommerce/next-ui'
 *
 * // Accessing a global value
 * const globalConf = import.meta.graphCommerce.cartDisplayPricesInclTax
 *
 * function MyComponent() {
 *   // Configuration configured per i18n locale.
 *   const scopedConfig = useI18nConfig().cartDisplayPricesInclTax
 *
 *   // Creating a fallback system
 *   const scopedConfigWithFallback = scopedConfig ?? globalConf
 *
 *   // Or as single line
 *   const scopedConfigWithFallback2 =
 *     useI18nConfig().cartDisplayPricesInclTax ?? import.meta.graphCommerce.cartDisplayPricesInclTax
 *
 *   return <div>{googleRecaptchaKey}</div>
 * }
 * ```
 *
 * ## Environment variables to override configuration
 *
 * Configuration values can be overwriten by environment variables, with the following rules:
 * - Convert from camelCase to `SCREAMING_SNAKE_CASE`
 * - Prefix with `GC_`
 * - Arrays can be indexed with _0, _1, _2, etc.
 * - Objects can be accessed with _<key>.
 *
 * Examples:
 * - `limitSsg` -> `GC_LIMIT_SSG="1"`
 * - `i18n[0].locale` -> `GC_I18N_0_LOCALE="en"`
 * - `debug.pluginStatus` -> `GC_DEBUG_PLUGIN_STATUS="1"`
 *
 *
 * ## Extending the configuration in your  project
 *
 * Create a graphql/Config.graphqls file in your project and extend the GraphCommerceConfig, GraphCommerceI18nConfig inputs to add configuration.
 *
 * ```graphql
 * extend input GraphCommerceConfig {
 *   myOptionalBoolean: Boolean
 *   myRequiredBoolean: Boolean!
 *   myOptionalString: String
 *   myRequiredString: String!
 *   myOptionalInt: Int
 *   myRequiredInt: Int!
 *   myOptionalFloat: Float
 *   myRequiredFloat: Float!
 * }
 * extend input GraphCommerceI18nConfig {
 *   myField: Boolean
 * }
 * ```
 *
 * ## All configuration values
 *
 * Below is a list of all possible configurations that can be set by GraphCommerce.
 */
export type GraphCommerceConfig = {
  /**
   * The canonical base URL is used for SEO purposes.
   *
   * Examples:
   * - https://example.com
   * - https://example.com/en
   * - https://example.com/en-US
   */
  canonicalBaseUrl: Scalars['String'];
  /**
   * Due to a limitation of the GraphQL API it is not possible to determine if a cart should be displayed including or excluding tax.
   *
   * When Magento's StoreConfig adds this value, this can be replaced.
   */
  cartDisplayPricesInclTax?: InputMaybe<Scalars['Boolean']>;
  /**
   * Due to a limitation in the GraphQL API of Magento 2, we need to know if the
   * customer requires email confirmation.
   *
   * This value should match Magento 2's configuration value for
   * `customer/create_account/confirm` and should be removed once we can query
   */
  customerRequireEmailConfirmation?: InputMaybe<Scalars['Boolean']>;
  /** Debug configuration for GraphCommerce */
  debug?: InputMaybe<GraphCommerceDebugConfig>;
  /**
   * Enables some demo specific code that is probably not useful for a project:
   *
   * - Adds the "BY GC" to the product list items.
   * - Adds "dominant_color" attribute swatches to the product list items.
   * - Creates a big list items in the product list.
   */
  demoMode?: InputMaybe<Scalars['Boolean']>;
  /**
   * See https://support.google.com/analytics/answer/9539598?hl=en
   *
   * Provide a value to enable Google Analytics for your store.
   *
   * To enable only for a specific locale, override the value in the i18n config.
   */
  googleAnalyticsId?: InputMaybe<Scalars['String']>;
  /**
   * Google reCAPTCHA key, get from https://developers.google.com/recaptcha/docs/v3
   *
   * This value is required even if you are configuring different values for each locale.
   */
  googleRecaptchaKey?: InputMaybe<Scalars['String']>;
  /**
   * The Google Tagmanager ID to be used on the site.
   *
   * This value is required even if you are configuring different values for each locale.
   */
  googleTagmanagerId?: InputMaybe<Scalars['String']>;
  /**
   * The HyGraph endpoint.
   *
   * Project settings -> API Access -> High Performance Read-only Content API
   */
  hygraphEndpoint: Scalars['String'];
  /** All i18n configuration for the project */
  i18n: Array<GraphCommerceI18nConfig>;
  /**
   * On older versions of GraphCommerce products would use a product type specific route.
   *
   * This should only be set to true if you use the /product/[url] AND /product/configurable/[url] routes.
   */
  legacyProductRoute?: InputMaybe<Scalars['Boolean']>;
  /** Limit the static generation of SSG when building */
  limitSsg?: InputMaybe<Scalars['Boolean']>;
  /**
   * GraphQL Magento endpoint.
   *
   * Examples:
   * - https://magento2.test/graphql
   */
  magentoEndpoint: Scalars['String'];
  /** To enable next.js' preview mode, configure the secret you'd like to use. */
  previewSecret?: InputMaybe<Scalars['String']>;
  /**
   * Product filters with better UI for mobile and desktop.
   *
   * @experimental This is an experimental feature and may change in the future.
   */
  productFiltersPro?: InputMaybe<Scalars['Boolean']>;
  /**
   * Allow the site to be indexed by search engines.
   * If false, the robots.txt file will be set to disallow all.
   */
  robotsAllow?: InputMaybe<Scalars['Boolean']>;
  /** Hide the wishlist functionality for guests. */
  wishlistHideForGuests?: InputMaybe<Scalars['Boolean']>;
  /** Ignores wether a product is already in the wishlist, makes the toggle an add only. */
  wishlistIgnoreProductWishlistStatus?: InputMaybe<Scalars['Boolean']>;
};

/** Debug configuration for GraphCommerce */
export type GraphCommerceDebugConfig = {
  /** Reports which plugins are enabled or disabled. */
  pluginStatus?: InputMaybe<Scalars['Boolean']>;
  /**
   * Cyclic dependencies can cause memory issues and other strange bugs.
   * This plugin will warn you when it detects a cyclic dependency.
   *
   * When running into memory issues, it can be useful to enable this plugin.
   */
  webpackCircularDependencyPlugin?: InputMaybe<Scalars['Boolean']>;
  /**
   * When updating packages it can happen that the same package is included with different versions in the same project.
   *
   * Issues that this can cause are:
   * - The same package is included multiple times in the bundle, increasing the bundle size.
   * - The Typescript types of the package are not compatible with each other, causing Typescript errors.
   */
  webpackDuplicatesPlugin?: InputMaybe<Scalars['Boolean']>;
};

/** All i18n configuration for the project */
export type GraphCommerceI18nConfig = {
  /**
   * The canonical base URL is used for SEO purposes.
   *
   * Examples:
   * - https://example.com
   * - https://example.com/en
   * - https://example.com/en-US
   */
  canonicalBaseUrl?: InputMaybe<Scalars['String']>;
  /** Due to a limitation of the GraphQL API it is not possible to determine if a cart should be displayed including or excluding tax. */
  cartDisplayPricesInclTax?: InputMaybe<Scalars['Boolean']>;
  /**
   * There can only be one entry with defaultLocale set to true.
   * - If there are more, the first one is used.
   * - If there is none, the first entry is used.
   */
  defaultLocale?: InputMaybe<Scalars['Boolean']>;
  /** Domain configuration, must be a domain https://tools.ietf.org/html/rfc3986 */
  domain?: InputMaybe<Scalars['String']>;
  /**
   * Configure different Google Analytics IDs for different locales.
   *
   * To disable for a specific locale, set the value to null.
   */
  googleAnalyticsId?: InputMaybe<Scalars['String']>;
  /** Locale specific google reCAPTCHA key. */
  googleRecaptchaKey?: InputMaybe<Scalars['String']>;
  /** The Google Tagmanager ID to be used per locale. */
  googleTagmanagerId?: InputMaybe<Scalars['String']>;
  /** Add a gcms-locales header to make sure queries return in a certain language, can be an array to define fallbacks. */
  hygraphLocales?: InputMaybe<Array<Scalars['String']>>;
  /** Specify a custom locale for to load translations. */
  linguiLocale?: InputMaybe<Scalars['String']>;
  /** Must be a locale string https://www.unicode.org/reports/tr35/tr35-59/tr35.html#Identifiers */
  locale: Scalars['String'];
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
  magentoStoreCode: Scalars['String'];
};


type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export function GraphCommerceConfigSchema(): z.ZodObject<Properties<GraphCommerceConfig>> {
  return z.object<Properties<GraphCommerceConfig>>({
    canonicalBaseUrl: z.string().min(1),
    cartDisplayPricesInclTax: z.boolean().nullish(),
    customerRequireEmailConfirmation: z.boolean().nullish(),
    debug: GraphCommerceDebugConfigSchema().nullish(),
    demoMode: z.boolean().nullish(),
    googleAnalyticsId: z.string().nullish(),
    googleRecaptchaKey: z.string().nullish(),
    googleTagmanagerId: z.string().nullish(),
    hygraphEndpoint: z.string().min(1),
    i18n: z.array(GraphCommerceI18nConfigSchema()),
    legacyProductRoute: z.boolean().nullish(),
    limitSsg: z.boolean().nullish(),
    magentoEndpoint: z.string().min(1),
    previewSecret: z.string().nullish(),
    productFiltersPro: z.boolean().nullish(),
    robotsAllow: z.boolean().nullish(),
    wishlistHideForGuests: z.boolean().nullish(),
    wishlistIgnoreProductWishlistStatus: z.boolean().nullish()
  })
}

export function GraphCommerceDebugConfigSchema(): z.ZodObject<Properties<GraphCommerceDebugConfig>> {
  return z.object<Properties<GraphCommerceDebugConfig>>({
    pluginStatus: z.boolean().nullish(),
    webpackCircularDependencyPlugin: z.boolean().nullish(),
    webpackDuplicatesPlugin: z.boolean().nullish()
  })
}

export function GraphCommerceI18nConfigSchema(): z.ZodObject<Properties<GraphCommerceI18nConfig>> {
  return z.object<Properties<GraphCommerceI18nConfig>>({
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
