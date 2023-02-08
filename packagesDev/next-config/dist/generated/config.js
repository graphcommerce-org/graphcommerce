/* eslint-disable */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    isDefinedNonNullAny: ()=>isDefinedNonNullAny,
    definedNonNullAnySchema: ()=>definedNonNullAnySchema,
    DeployEnvironmentSchema: ()=>DeployEnvironmentSchema,
    GraphCommerceConfigSchema: ()=>GraphCommerceConfigSchema,
    GraphCommerceI18nConfigSchema: ()=>GraphCommerceI18nConfigSchema
});
const _zod = require("zod");
const isDefinedNonNullAny = (v)=>v !== undefined && v !== null;
const definedNonNullAnySchema = _zod.z.any().refine((v)=>isDefinedNonNullAny(v));
const DeployEnvironmentSchema = _zod.z.enum([
    "development",
    "preview",
    "production"
]);
function GraphCommerceConfigSchema() {
    return _zod.z.object({
        advancedFilters: _zod.z.boolean(),
        canonicalBaseUrl: _zod.z.string().min(1),
        cartDisplayPricesInclTax: _zod.z.boolean().nullish(),
        customerRequireEmailConfirmation: _zod.z.boolean().nullish(),
        demoMode: _zod.z.boolean().nullish(),
        deployEnvironment: DeployEnvironmentSchema.nullish(),
        googleAnalyticsId: _zod.z.string().nullish(),
        googleRecaptchaKey: _zod.z.string().nullish(),
        googleTagmanagerId: _zod.z.string().nullish(),
        hygraphEndpoint: _zod.z.string().min(1),
        i18n: _zod.z.array(GraphCommerceI18nConfigSchema()),
        magentoEndpoint: _zod.z.string().min(1),
        previewSecret: _zod.z.string().nullish(),
        robotsAllow: _zod.z.boolean().nullish(),
        singleProductRoute: _zod.z.boolean(),
        webpackCircularDependencyPlugin: _zod.z.boolean().nullish(),
        webpackDuplicatesPlugin: _zod.z.boolean().nullish(),
        wishlistHideForGuests: _zod.z.boolean().nullish(),
        wishlistIgnoreProductWishlistStatus: _zod.z.boolean().nullish()
    });
}
function GraphCommerceI18nConfigSchema() {
    return _zod.z.object({
        canonicalBaseUrl: _zod.z.string().nullish(),
        cartDisplayPricesInclTax: _zod.z.boolean().nullish(),
        defaultLocale: _zod.z.boolean().nullish(),
        domain: _zod.z.string().nullish(),
        googleAnalyticsId: _zod.z.string().nullish(),
        googleRecaptchaKey: _zod.z.string().nullish(),
        googleTagmanagerId: _zod.z.string().nullish(),
        hygraphLocales: _zod.z.array(_zod.z.string().min(1)).nullish(),
        locale: _zod.z.string().min(1),
        magentoStoreCode: _zod.z.string().min(1),
        robotsAllow: _zod.z.boolean().nullish()
    });
}
