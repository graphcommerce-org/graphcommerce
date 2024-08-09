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
    DatalayerConfigSchema: function() {
        return DatalayerConfigSchema;
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
    PaginationVariantSchema: function() {
        return PaginationVariantSchema;
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
    'CHECKBOX',
    'ICON'
]);
const PaginationVariantSchema = _zod.z.enum([
    'COMPACT',
    'EXTENDED'
]);
const ProductFiltersLayoutSchema = _zod.z.enum([
    'DEFAULT',
    'SIDEBAR'
]);
const SidebarGalleryPaginationVariantSchema = _zod.z.enum([
    'DOTS',
    'THUMBNAILS_BOTTOM'
]);
function DatalayerConfigSchema() {
    return _zod.z.object({
        coreWebVitals: _zod.z.boolean().nullish()
    });
}
function GraphCommerceConfigSchema() {
    return _zod.z.object({
        breadcrumbs: _zod.z.boolean().default(false).nullish(),
        canonicalBaseUrl: _zod.z.string().min(1),
        cartDisplayPricesInclTax: _zod.z.boolean().nullish(),
        compare: _zod.z.boolean().nullish(),
        compareVariant: CompareVariantSchema.default("ICON").nullish(),
        configurableVariantForSimple: _zod.z.boolean().default(false).nullish(),
        configurableVariantValues: MagentoConfigurableVariantValuesSchema().nullish(),
        crossSellsHideCartItems: _zod.z.boolean().default(false).nullish(),
        crossSellsRedirectItems: _zod.z.boolean().default(false).nullish(),
        customerAddressNoteEnable: _zod.z.boolean().nullish(),
        customerCompanyFieldsEnable: _zod.z.boolean().nullish(),
        customerDeleteEnabled: _zod.z.boolean().nullish(),
        customerXMagentoCacheIdDisable: _zod.z.boolean().nullish(),
        dataLayer: DatalayerConfigSchema().nullish(),
        debug: GraphCommerceDebugConfigSchema().nullish(),
        demoMode: _zod.z.boolean().default(true).nullish(),
        enableGuestCheckoutLogin: _zod.z.boolean().nullish(),
        googleAnalyticsId: _zod.z.string().nullish(),
        googleRecaptchaKey: _zod.z.string().nullish(),
        googleTagmanagerId: _zod.z.string().nullish(),
        hygraphEndpoint: _zod.z.string().min(1),
        hygraphProjectId: _zod.z.string().nullish(),
        hygraphWriteAccessToken: _zod.z.string().nullish(),
        limitSsg: _zod.z.boolean().nullish(),
        magentoEndpoint: _zod.z.string().min(1),
        magentoVersion: _zod.z.number(),
        previewSecret: _zod.z.string().nullish(),
        productFiltersLayout: ProductFiltersLayoutSchema.default("DEFAULT").nullish(),
        productFiltersPro: _zod.z.boolean().nullish(),
        productListPaginationVariant: PaginationVariantSchema.default("COMPACT").nullish(),
        productRoute: _zod.z.string().nullish(),
        recentlyViewedProducts: RecentlyViewedProductsConfigSchema().nullish(),
        robotsAllow: _zod.z.boolean().nullish(),
        sidebarGallery: SidebarGalleryConfigSchema().nullish(),
        storefront: _zod.z.array(GraphCommerceStorefrontConfigSchema()),
        wishlistHideForGuests: _zod.z.boolean().nullish(),
        wishlistShowFeedbackMessage: _zod.z.boolean().nullish()
    });
}
function GraphCommerceDebugConfigSchema() {
    return _zod.z.object({
        pluginStatus: _zod.z.boolean().nullish(),
        sessions: _zod.z.boolean().nullish(),
        webpackCircularDependencyPlugin: _zod.z.boolean().nullish(),
        webpackDuplicatesPlugin: _zod.z.boolean().nullish()
    });
}
function GraphCommerceStorefrontConfigSchema() {
    return _zod.z.object({
        canonicalBaseUrl: _zod.z.string().nullish(),
        cartDisplayPricesInclTax: _zod.z.boolean().nullish(),
        customerCompanyFieldsEnable: _zod.z.boolean().nullish(),
        defaultLocale: _zod.z.boolean().nullish(),
        domain: _zod.z.string().nullish(),
        googleAnalyticsId: _zod.z.string().nullish(),
        googleRecaptchaKey: _zod.z.string().nullish(),
        googleTagmanagerId: _zod.z.string().nullish(),
        hygraphLocales: _zod.z.array(_zod.z.string().min(1)).nullish(),
        linguiLocale: _zod.z.string().nullish(),
        locale: _zod.z.string().min(1),
        magentoStoreCode: _zod.z.string().min(1),
        robotsAllow: _zod.z.boolean().nullish()
    });
}
function MagentoConfigurableVariantValuesSchema() {
    return _zod.z.object({
        content: _zod.z.boolean().nullish(),
        gallery: _zod.z.boolean().nullish(),
        url: _zod.z.boolean().nullish()
    });
}
function RecentlyViewedProductsConfigSchema() {
    return _zod.z.object({
        enabled: _zod.z.boolean().nullish(),
        maxCount: _zod.z.number().nullish()
    });
}
function SidebarGalleryConfigSchema() {
    return _zod.z.object({
        paginationVariant: SidebarGalleryPaginationVariantSchema.nullish()
    });
}
