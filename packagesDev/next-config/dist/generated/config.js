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
    CompareVariantSchema: function() {
        return CompareVariantSchema;
    },
    GraphCommerceConfigSchema: function() {
        return GraphCommerceConfigSchema;
    },
    GraphCommerceDebugConfigSchema: function() {
        return GraphCommerceDebugConfigSchema;
    },
    GraphCommerceStorefrontConfigSchema: function() {
        return GraphCommerceStorefrontConfigSchema;
    },
    MagentoConfigurableVariantValuesSchema: function() {
        return MagentoConfigurableVariantValuesSchema;
    },
    ProductFiltersLayoutSchema: function() {
        return ProductFiltersLayoutSchema;
    },
    RecentlyViewedProductsConfigSchema: function() {
        return RecentlyViewedProductsConfigSchema;
    },
    SidebarGalleryConfigSchema: function() {
        return SidebarGalleryConfigSchema;
    },
    SidebarGalleryPaginationVariantSchema: function() {
        return SidebarGalleryPaginationVariantSchema;
    },
    definedNonNullAnySchema: function() {
        return definedNonNullAnySchema;
    },
    isDefinedNonNullAny: function() {
        return isDefinedNonNullAny;
    }
});
const _zod = require("zod");
const isDefinedNonNullAny = (v)=>v !== undefined && v !== null;
const definedNonNullAnySchema = _zod.z.any().refine((v)=>isDefinedNonNullAny(v));
const CompareVariantSchema = _zod.z.enum([
    "CHECKBOX",
    "ICON"
]);
const ProductFiltersLayoutSchema = _zod.z.enum([
    "DEFAULT",
    "SIDEBAR"
]);
const SidebarGalleryPaginationVariantSchema = _zod.z.enum([
    "DOTS",
    "THUMBNAILS_BOTTOM"
]);
function GraphCommerceConfigSchema() {
    return zod_1.z.object({
        canonicalBaseUrl: zod_1.z.string().min(1),
        cartDisplayPricesInclTax: zod_1.z.boolean().nullish(),
        compare: zod_1.z.boolean().nullish(),
        compareVariant: exports.CompareVariantSchema.nullish(),
        configurableVariantForSimple: zod_1.z.boolean().nullish(),
        configurableVariantValues: MagentoConfigurableVariantValuesSchema().nullish(),
        crossSellsHideCartItems: zod_1.z.boolean().nullish(),
        crossSellsRedirectItems: zod_1.z.boolean().nullish(),
        customerRequireEmailConfirmation: zod_1.z.boolean().nullish(),
        debug: GraphCommerceDebugConfigSchema().nullish(),
<<<<<<< HEAD
        demoMode: _zod.z.boolean().nullish(),
        googleAnalyticsId: _zod.z.string().nullish(),
        googleRecaptchaKey: _zod.z.string().nullish(),
        googleTagmanagerId: _zod.z.string().nullish(),
        hygraphAppClientId: _zod.z.string().nullish(),
        hygraphAppClientSecret: _zod.z.string().nullish(),
        hygraphEndpoint: _zod.z.string().min(1),
        hygraphProjectId: _zod.z.string().nullish(),
        hygraphWriteAccessEndpoint: _zod.z.string().nullish(),
        hygraphWriteAccessToken: _zod.z.string().nullish(),
        legacyProductRoute: _zod.z.boolean().nullish(),
        limitSsg: _zod.z.boolean().nullish(),
        magentoEndpoint: _zod.z.string().min(1),
        previewSecret: _zod.z.string().nullish(),
        productFiltersLayout: ProductFiltersLayoutSchema.nullish(),
        productFiltersPro: _zod.z.boolean().nullish(),
        productRoute: _zod.z.string().nullish(),
        recentlyViewedProducts: RecentlyViewedProductsConfigSchema().nullish(),
        robotsAllow: _zod.z.boolean().nullish(),
        sidebarGallery: SidebarGalleryConfigSchema().nullish(),
        storefront: _zod.z.array(GraphCommerceStorefrontConfigSchema()),
        wishlistHideForGuests: _zod.z.boolean().nullish(),
        wishlistShowFeedbackMessage: _zod.z.boolean().nullish()
=======
        demoMode: zod_1.z.boolean().nullish(),
        googleAnalyticsId: zod_1.z.string().nullish(),
        googleRecaptchaKey: zod_1.z.string().nullish(),
        googleTagmanagerId: zod_1.z.string().nullish(),
        hygraphEndpoint: zod_1.z.string().min(1),
        hygraphProjectId: zod_1.z.string().nullish(),
        hygraphWriteAccessEndpoint: zod_1.z.string().nullish(),
        hygraphWriteAccessToken: zod_1.z.string().nullish(),
        legacyProductRoute: zod_1.z.boolean().nullish(),
        limitSsg: zod_1.z.boolean().nullish(),
        magentoEndpoint: zod_1.z.string().min(1),
        previewSecret: zod_1.z.string().nullish(),
        productFiltersLayout: exports.ProductFiltersLayoutSchema.nullish(),
        productFiltersPro: zod_1.z.boolean().nullish(),
        productRoute: zod_1.z.string().nullish(),
        robotsAllow: zod_1.z.boolean().nullish(),
        storefront: zod_1.z.array(GraphCommerceStorefrontConfigSchema()),
        wishlistHideForGuests: zod_1.z.boolean().nullish(),
        wishlistIgnoreProductWishlistStatus: zod_1.z.boolean().nullish(),
        wishlistShowFeedbackMessage: zod_1.z.boolean().nullish()
>>>>>>> 9dfd43ab4 ([GCOM-1108] rm unnecessary configs, host app on solo next environment, cleanup unnecessary packages,)
    });
}
exports.GraphCommerceConfigSchema = GraphCommerceConfigSchema;
function GraphCommerceDebugConfigSchema() {
    return zod_1.z.object({
        pluginStatus: zod_1.z.boolean().nullish(),
        webpackCircularDependencyPlugin: zod_1.z.boolean().nullish(),
        webpackDuplicatesPlugin: zod_1.z.boolean().nullish()
    });
}
exports.GraphCommerceDebugConfigSchema = GraphCommerceDebugConfigSchema;
function GraphCommerceStorefrontConfigSchema() {
    return zod_1.z.object({
        canonicalBaseUrl: zod_1.z.string().nullish(),
        cartDisplayPricesInclTax: zod_1.z.boolean().nullish(),
        defaultLocale: zod_1.z.boolean().nullish(),
        domain: zod_1.z.string().nullish(),
        googleAnalyticsId: zod_1.z.string().nullish(),
        googleRecaptchaKey: zod_1.z.string().nullish(),
        googleTagmanagerId: zod_1.z.string().nullish(),
        hygraphLocales: zod_1.z.array(zod_1.z.string().min(1)).nullish(),
        linguiLocale: zod_1.z.string().nullish(),
        locale: zod_1.z.string().min(1),
        magentoStoreCode: zod_1.z.string().min(1)
    });
}
exports.GraphCommerceStorefrontConfigSchema = GraphCommerceStorefrontConfigSchema;
function MagentoConfigurableVariantValuesSchema() {
    return zod_1.z.object({
        content: zod_1.z.boolean().nullish(),
        gallery: zod_1.z.boolean().nullish(),
        url: zod_1.z.boolean().nullish()
    });
}
<<<<<<< HEAD
function RecentlyViewedProductsConfigSchema() {
    return _zod.z.object({
        enabled: _zod.z.boolean().nullish(),
        maxCount: _zod.z.number().nullish()
    });
}
=======
<<<<<<< HEAD
>>>>>>> a139c9954 ([GCOM-1108] rm unnecessary configs, host app on solo next environment, cleanup unnecessary packages,)
function SidebarGalleryConfigSchema() {
    return _zod.z.object({
        paginationVariant: SidebarGalleryPaginationVariantSchema.nullish()
    });
}
=======
exports.MagentoConfigurableVariantValuesSchema = MagentoConfigurableVariantValuesSchema;
>>>>>>> 9dfd43ab4 ([GCOM-1108] rm unnecessary configs, host app on solo next environment, cleanup unnecessary packages,)
