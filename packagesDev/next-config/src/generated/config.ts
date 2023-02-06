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

export type DeployEnvironment =
  /** The development environment */
  | 'development'
  /** The staging environment */
  | 'preview'
  /** The production environment */
  | 'production';

export type GraphCommerceConfig = {
  advancedFilters: Scalars['Boolean'];
  /**
   * The canonical base URL is used for SEO purposes.
   *
   * Examples:
   * - https://example.com
   * - https://example.com/en
   * - https://example.com/en-US
   */
  canonicalBaseUrl: Scalars['String'];
  /** Due to a limitation of the GraphQL API it is not possible to determine if a cart should be displayed including or excluding tax. */
  cartDisplayPricesInclTax?: InputMaybe<Scalars['Boolean']>;
  /**
   * Due to a limitation in the GraphQL API of Magento 2, we need to know if the
   * customer requires email confirmation.
   * @deprecated Should be replaced with a Magento configuration instead.
   */
  customerRequireEmailConfirmation?: InputMaybe<Scalars['Boolean']>;
  /**
   * Enables some demo specific code that is probably not useful for a project:
   *
   * - Adds the "BY GC" to the product list items.
   * - Adds "dominant_color" attribute swatches to the product list items.
   * - Creates a big list items in the product list.
   */
  demoMode?: InputMaybe<Scalars['Boolean']>;
  /**
   * Environment GraphCommerce is deployed to.
   * Default: 'development'
   *
   * Not to be confused with NODE_ENV: which will always be 'production' when running `next build`.
   */
  deployEnvironment?: InputMaybe<DeployEnvironment>;
  /**
   * See https://support.google.com/analytics/answer/9539598?hl=en
   *
   * Provide a value to enable Google Analytics for your store.
   *
   * To enable only for a specific locale, override the value in the i18n config.
   */
  googleAnalyticsId?: InputMaybe<Scalars['String']>;
  /** Google reCAPTCHA key */
  googleRecaptchaKey?: InputMaybe<Scalars['String']>;
  googleTagmanagerId?: InputMaybe<Scalars['String']>;
  hygraphEndpoint: Scalars['String'];
  /** All i18n configuration for the project */
  i18n: Array<GraphCommerceI18nConfig>;
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
   * Allow the site to be indexed by search engines.
   * If false, the robots.txt file will be set to disallow all.
   */
  robotsAllow?: InputMaybe<Scalars['Boolean']>;
  singleProductRoute: Scalars['Boolean'];
  /**
   * When updating packages it can happen that the same package is included with different versions in the same project.
   *
   * Issues that this can cause are:
   * - The same package is included multiple times in the bundle, increasing the bundle size.
   * - The Typescript types of the package are not compatible with each other, causing Typescript errors.
   */
  webpackDuplicatesPlugin?: InputMaybe<Scalars['Boolean']>;
  /** Hide the wishlist functionality for guests. */
  wishlistHideForGuests?: InputMaybe<Scalars['Boolean']>;
  /** Ignores wether a product is already in the wishlist, makes the toggle an add only. */
  wishlistIgnoreProductWishlistStatus?: InputMaybe<Scalars['Boolean']>;
};

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
  googleRecaptchaKey?: InputMaybe<Scalars['String']>;
  googleTagmanagerId?: InputMaybe<Scalars['String']>;
  hygraphLocales?: InputMaybe<Array<Scalars['String']>>;
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
  /**
   * Allow the site to be indexed by search engines.
   * If false, the robots.txt file will be set to disallow all.
   */
  robotsAllow?: InputMaybe<Scalars['Boolean']>;
};


type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export const DeployEnvironmentSchema = z.enum(['development', 'preview', 'production']);

export function GraphCommerceConfigSchema(): z.ZodObject<Properties<GraphCommerceConfig>> {
  return z.object<Properties<GraphCommerceConfig>>({
    advancedFilters: z.boolean(),
    canonicalBaseUrl: z.string().min(1),
    cartDisplayPricesInclTax: z.boolean().nullish(),
    customerRequireEmailConfirmation: z.boolean().nullish(),
    demoMode: z.boolean().nullish(),
    deployEnvironment: DeployEnvironmentSchema.nullish(),
    googleAnalyticsId: z.string().nullish(),
    googleRecaptchaKey: z.string().nullish(),
    googleTagmanagerId: z.string().nullish(),
    hygraphEndpoint: z.string().min(1),
    i18n: z.array(GraphCommerceI18nConfigSchema()),
    magentoEndpoint: z.string().min(1),
    previewSecret: z.string().nullish(),
    robotsAllow: z.boolean().nullish(),
    singleProductRoute: z.boolean(),
    webpackDuplicatesPlugin: z.boolean().nullish(),
    wishlistHideForGuests: z.boolean().nullish(),
    wishlistIgnoreProductWishlistStatus: z.boolean().nullish()
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
    locale: z.string().min(1),
    magentoStoreCode: z.string().min(1),
    robotsAllow: z.boolean().nullish()
  })
}
