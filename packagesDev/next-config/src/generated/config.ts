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
  Domain: any;
};

export type GraphCommerceConfig = {
  advancedFilters: Scalars['Boolean'];
  customerRequireEmailConfirmation: Scalars['Boolean'];
  /**
   * Enables some demo specific code that is probably not useful for a project:
   *
   * - Adds the "BY GC" to the product list items.
   * - Adds "dominant_color" attribute swatches to the product list items.
   * - Creates a big list items in the product list.
   */
  demoMode?: InputMaybe<Scalars['Boolean']>;
  googleAnalyticsKey?: InputMaybe<Scalars['String']>;
  googleRecaptchaKey?: InputMaybe<Scalars['String']>;
  googleTagmanagerKey?: InputMaybe<Scalars['String']>;
  i18n: Array<GraphCommerceI18nConfig>;
  singleProductRoute: Scalars['Boolean'];
  /**
   * When updating packages it can happen that the same package is included with different versions in the same project.
   *
   * Issues that this can cause are:
   * - The same package is included multiple times in the bundle, increasing the bundle size.
   * - The Typescript types of the package are not compatible with each other, causing Typescript errors.
   */
  webpackDuplicatesPlugin?: InputMaybe<Scalars['Boolean']>;
};

export type GraphCommerceI18nConfig = {
  defaultLocale?: InputMaybe<Scalars['Boolean']>;
  domain?: InputMaybe<Scalars['Domain']>;
  googleAnalyticsEnabled?: InputMaybe<Scalars['Boolean']>;
  googleAnalyticsKey?: InputMaybe<Scalars['String']>;
  googleRecaptchaKey?: InputMaybe<Scalars['String']>;
  googleTagmanagerKey?: InputMaybe<Scalars['String']>;
  hygraphLocales: Array<Scalars['String']>;
  locale: Scalars['String'];
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
    advancedFilters: z.boolean(),
    customerRequireEmailConfirmation: z.boolean(),
    demoMode: z.boolean().nullish(),
    googleAnalyticsKey: z.string().nullish(),
    googleRecaptchaKey: z.string().nullish(),
    googleTagmanagerKey: z.string().nullish(),
    i18n: z.array(GraphCommerceI18nConfigSchema()),
    singleProductRoute: z.boolean(),
    webpackDuplicatesPlugin: z.boolean().nullish()
  })
}

export function GraphCommerceI18nConfigSchema(): z.ZodObject<Properties<GraphCommerceI18nConfig>> {
  return z.object<Properties<GraphCommerceI18nConfig>>({
    defaultLocale: z.boolean().nullish(),
    domain: z.string().nullish(),
    googleAnalyticsEnabled: z.boolean().nullish(),
    googleAnalyticsKey: z.string().nullish(),
    googleRecaptchaKey: z.string().nullish(),
    googleTagmanagerKey: z.string().nullish(),
    hygraphLocales: z.array(z.string().min(1)),
    locale: z.string().min(1),
    magentoStoreCode: z.string().min(1)
  })
}
