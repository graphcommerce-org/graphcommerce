"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarGalleryConfigSchema = exports.RecentlyViewedProductsConfigSchema = exports.MagentoConfigurableVariantValuesSchema = exports.GraphCommerceStorefrontConfigSchema = exports.GraphCommerceDebugConfigSchema = exports.GraphCommerceConfigSchema = exports.AnalyticsConfigSchema = exports.SidebarGalleryPaginationVariantSchema = exports.ProductFiltersLayoutSchema = exports.EventFormatSchema = exports.CompareVariantSchema = exports.definedNonNullAnySchema = exports.isDefinedNonNullAny = void 0;
/* eslint-disable */
const zod_1 = require("zod");
const isDefinedNonNullAny = (v) => v !== undefined && v !== null;
exports.isDefinedNonNullAny = isDefinedNonNullAny;
exports.definedNonNullAnySchema = zod_1.z.any().refine((v) => (0, exports.isDefinedNonNullAny)(v));
exports.CompareVariantSchema = zod_1.z.enum(['CHECKBOX', 'ICON']);
exports.EventFormatSchema = zod_1.z.enum(['GA3', 'GA4']);
exports.ProductFiltersLayoutSchema = zod_1.z.enum(['DEFAULT', 'SIDEBAR']);
exports.SidebarGalleryPaginationVariantSchema = zod_1.z.enum(['DOTS', 'THUMBNAILS_BOTTOM']);
function AnalyticsConfigSchema() {
    return zod_1.z.object({
        eventFormat: zod_1.z.array(exports.EventFormatSchema).nullish()
    });
}
exports.AnalyticsConfigSchema = AnalyticsConfigSchema;
function GraphCommerceConfigSchema() {
    return zod_1.z.object({
        analytics: AnalyticsConfigSchema().nullish(),
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
        demoMode: zod_1.z.boolean().nullish(),
        enableGuestCheckoutLogin: zod_1.z.boolean().nullish(),
        googleAnalyticsId: zod_1.z.string().nullish(),
        googleRecaptchaKey: zod_1.z.string().nullish(),
        googleTagmanagerId: zod_1.z.string().nullish(),
        hygraphEndpoint: zod_1.z.string().min(1),
        hygraphManagementApi: zod_1.z.string().nullish(),
        hygraphProjectId: zod_1.z.string().nullish(),
        hygraphWriteAccessEndpoint: zod_1.z.string().nullish(),
        hygraphWriteAccessToken: zod_1.z.string().nullish(),
        limitSsg: zod_1.z.boolean().nullish(),
        magentoEndpoint: zod_1.z.string().min(1),
        previewSecret: zod_1.z.string().nullish(),
        productFiltersLayout: exports.ProductFiltersLayoutSchema.nullish(),
        productFiltersPro: zod_1.z.boolean().nullish(),
        productRoute: zod_1.z.string().nullish(),
        recentlyViewedProducts: RecentlyViewedProductsConfigSchema().nullish(),
        robotsAllow: zod_1.z.boolean().nullish(),
        sidebarGallery: SidebarGalleryConfigSchema().nullish(),
        storefront: zod_1.z.array(GraphCommerceStorefrontConfigSchema()),
        wishlistHideForGuests: zod_1.z.boolean().nullish(),
        wishlistShowFeedbackMessage: zod_1.z.boolean().nullish()
    });
}
exports.GraphCommerceConfigSchema = GraphCommerceConfigSchema;
function GraphCommerceDebugConfigSchema() {
    return zod_1.z.object({
        pluginStatus: zod_1.z.boolean().nullish(),
        sessions: zod_1.z.boolean().nullish(),
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
exports.MagentoConfigurableVariantValuesSchema = MagentoConfigurableVariantValuesSchema;
function RecentlyViewedProductsConfigSchema() {
    return zod_1.z.object({
        enabled: zod_1.z.boolean().nullish(),
        maxCount: zod_1.z.number().nullish()
    });
}
exports.RecentlyViewedProductsConfigSchema = RecentlyViewedProductsConfigSchema;
function SidebarGalleryConfigSchema() {
    return zod_1.z.object({
        paginationVariant: exports.SidebarGalleryPaginationVariantSchema.nullish()
    });
}
exports.SidebarGalleryConfigSchema = SidebarGalleryConfigSchema;
