import { z } from 'zod';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
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
export declare const isDefinedNonNullAny: (v: any) => v is definedNonNullAny;
export declare const definedNonNullAnySchema: z.ZodEffects<z.ZodAny, any, any>;
export declare function GraphCommerceConfigSchema(): z.ZodObject<Properties<GraphCommerceConfig>>;
export declare function GraphCommerceI18nConfigSchema(): z.ZodObject<Properties<GraphCommerceI18nConfig>>;
export {};
