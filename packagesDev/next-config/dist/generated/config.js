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
    AlgoliaFilterAttributeSchema: ()=>AlgoliaFilterAttributeSchema,
    AlgoliaSearchIndexConfigSchema: ()=>AlgoliaSearchIndexConfigSchema,
    AlgoliaSortableOptionSchema: ()=>AlgoliaSortableOptionSchema,
    GraphCommerceConfigSchema: ()=>GraphCommerceConfigSchema,
    GraphCommerceDebugConfigSchema: ()=>GraphCommerceDebugConfigSchema,
    GraphCommerceStorefrontConfigSchema: ()=>GraphCommerceStorefrontConfigSchema
});
const _zod = require("zod");
const isDefinedNonNullAny = (v)=>v !== undefined && v !== null;
const definedNonNullAnySchema = _zod.z.any().refine((v)=>isDefinedNonNullAny(v));
function AlgoliaFilterAttributeSchema() {
    return _zod.z.object({
        aggregation: _zod.z.string().min(1),
        toAlgoliaAttribute: _zod.z.string().min(1)
    });
}
function AlgoliaSearchIndexConfigSchema() {
    return _zod.z.object({
        filterAttributes: _zod.z.array(AlgoliaFilterAttributeSchema()).nullish(),
        searchIndex: _zod.z.string().min(1)
    });
}
function AlgoliaSortableOptionSchema() {
    return _zod.z.object({
        label: _zod.z.string().min(1),
        value: _zod.z.string().min(1)
    });
}
function GraphCommerceConfigSchema() {
    return _zod.z.object({
        algoliaApplicationId: _zod.z.string().min(1),
        algoliaSearchDebounceTime: _zod.z.number().nullish(),
        algoliaSearchOnlyApiKey: _zod.z.string().min(1),
        canonicalBaseUrl: _zod.z.string().min(1),
        cartDisplayPricesInclTax: _zod.z.boolean().nullish(),
        customerRequireEmailConfirmation: _zod.z.boolean().nullish(),
        debug: GraphCommerceDebugConfigSchema().nullish(),
        demoMode: _zod.z.boolean().nullish(),
        googleAnalyticsId: _zod.z.string().nullish(),
        googleRecaptchaKey: _zod.z.string().nullish(),
        googleTagmanagerId: _zod.z.string().nullish(),
        hygraphEndpoint: _zod.z.string().min(1),
        legacyProductRoute: _zod.z.boolean().nullish(),
        limitSsg: _zod.z.boolean().nullish(),
        magentoEndpoint: _zod.z.string().min(1),
        previewSecret: _zod.z.string().nullish(),
        productFiltersPro: _zod.z.boolean().nullish(),
        productRoute: _zod.z.string().nullish(),
        robotsAllow: _zod.z.boolean().nullish(),
        storefront: _zod.z.array(GraphCommerceStorefrontConfigSchema()),
        wishlistHideForGuests: _zod.z.boolean().nullish(),
        wishlistIgnoreProductWishlistStatus: _zod.z.boolean().nullish(),
        wishlistShowFeedbackMessage: _zod.z.boolean().nullish()
    });
}
function GraphCommerceDebugConfigSchema() {
    return _zod.z.object({
        pluginStatus: _zod.z.boolean().nullish(),
        webpackCircularDependencyPlugin: _zod.z.boolean().nullish(),
        webpackDuplicatesPlugin: _zod.z.boolean().nullish()
    });
}
function GraphCommerceStorefrontConfigSchema() {
    return _zod.z.object({
        algoliaSearchIndexConfig: _zod.z.array(AlgoliaSearchIndexConfigSchema()),
        canonicalBaseUrl: _zod.z.string().nullish(),
        cartDisplayPricesInclTax: _zod.z.boolean().nullish(),
        defaultLocale: _zod.z.boolean().nullish(),
        domain: _zod.z.string().nullish(),
        googleAnalyticsId: _zod.z.string().nullish(),
        googleRecaptchaKey: _zod.z.string().nullish(),
        googleTagmanagerId: _zod.z.string().nullish(),
        hygraphLocales: _zod.z.array(_zod.z.string().min(1)).nullish(),
        linguiLocale: _zod.z.string().nullish(),
        locale: _zod.z.string().min(1),
        magentoStoreCode: _zod.z.string().min(1),
        sortOptions: _zod.z.array(AlgoliaSortableOptionSchema()).nullish()
    });
}
