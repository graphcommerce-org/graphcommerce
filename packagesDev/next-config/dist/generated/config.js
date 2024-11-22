"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsitePermissionsSchema = exports.SidebarGalleryPaginationVariantSchema = exports.ProductFiltersLayoutSchema = exports.PaginationVariantSchema = exports.CustomerAccountPermissionsSchema = exports.CompareVariantSchema = exports.CartPermissionsSchema = exports.definedNonNullAnySchema = exports.isDefinedNonNullAny = void 0;
exports.DatalayerConfigSchema = DatalayerConfigSchema;
exports.GraphCommerceConfigSchema = GraphCommerceConfigSchema;
exports.GraphCommerceDebugConfigSchema = GraphCommerceDebugConfigSchema;
exports.GraphCommercePermissionsSchema = GraphCommercePermissionsSchema;
exports.GraphCommerceStorefrontConfigSchema = GraphCommerceStorefrontConfigSchema;
exports.MagentoConfigurableVariantValuesSchema = MagentoConfigurableVariantValuesSchema;
exports.RecentlyViewedProductsConfigSchema = RecentlyViewedProductsConfigSchema;
exports.SidebarGalleryConfigSchema = SidebarGalleryConfigSchema;
/* eslint-disable */
const zod_1 = require("zod");
const isDefinedNonNullAny = (v) => v !== undefined && v !== null;
exports.isDefinedNonNullAny = isDefinedNonNullAny;
exports.definedNonNullAnySchema = zod_1.z.any().refine((v) => (0, exports.isDefinedNonNullAny)(v));
exports.CartPermissionsSchema = zod_1.z.enum(['CUSTOMER_ONLY', 'DISABLED', 'ENABLED']);
exports.CompareVariantSchema = zod_1.z.enum(['CHECKBOX', 'ICON']);
exports.CustomerAccountPermissionsSchema = zod_1.z.enum([
    'DISABLED',
    'DISABLE_REGISTRATION',
    'ENABLED',
]);
exports.PaginationVariantSchema = zod_1.z.enum(['COMPACT', 'EXTENDED']);
exports.ProductFiltersLayoutSchema = zod_1.z.enum(['DEFAULT', 'SIDEBAR']);
exports.SidebarGalleryPaginationVariantSchema = zod_1.z.enum(['DOTS', 'THUMBNAILS_BOTTOM']);
exports.WebsitePermissionsSchema = zod_1.z.enum(['ENABLED']);
function DatalayerConfigSchema() {
    return zod_1.z.object({
        coreWebVitals: zod_1.z.boolean().nullish(),
    });
}
function GraphCommerceConfigSchema() {
    return zod_1.z.object({
        breadcrumbs: zod_1.z.boolean().default(false).nullish(),
        canonicalBaseUrl: zod_1.z.string().min(1),
        cartDisplayPricesInclTax: zod_1.z.boolean().nullish(),
        compare: zod_1.z.boolean().nullish(),
        compareVariant: exports.CompareVariantSchema.default('ICON').nullish(),
        configurableVariantForSimple: zod_1.z.boolean().default(false).nullish(),
        configurableVariantValues: MagentoConfigurableVariantValuesSchema().nullish(),
        crossSellsHideCartItems: zod_1.z.boolean().default(false).nullish(),
        crossSellsRedirectItems: zod_1.z.boolean().default(false).nullish(),
        customerAddressNoteEnable: zod_1.z.boolean().nullish(),
        customerCompanyFieldsEnable: zod_1.z.boolean().nullish(),
        customerDeleteEnabled: zod_1.z.boolean().nullish(),
        customerXMagentoCacheIdDisable: zod_1.z.boolean().nullish(),
        dataLayer: DatalayerConfigSchema().nullish(),
        debug: GraphCommerceDebugConfigSchema().nullish(),
        enableGuestCheckoutLogin: zod_1.z.boolean().nullish(),
        googleAnalyticsId: zod_1.z.string().nullish(),
        googleRecaptchaKey: zod_1.z.string().nullish(),
        googleTagmanagerId: zod_1.z.string().nullish(),
        hygraphManagementApi: zod_1.z.string().nullish(),
        hygraphProjectId: zod_1.z.string().nullish(),
        hygraphWriteAccessToken: zod_1.z.string().nullish(),
        limitSsg: zod_1.z.boolean().nullish(),
        magentoEndpoint: zod_1.z.string().min(1),
        magentoVersion: zod_1.z.number(),
        permissions: GraphCommercePermissionsSchema().nullish(),
        previewSecret: zod_1.z.string().nullish(),
        productFiltersLayout: exports.ProductFiltersLayoutSchema.default('DEFAULT').nullish(),
        productFiltersPro: zod_1.z.boolean().nullish(),
        productListPaginationVariant: exports.PaginationVariantSchema.default('COMPACT').nullish(),
        productRoute: zod_1.z.string().nullish(),
        recentlyViewedProducts: RecentlyViewedProductsConfigSchema().nullish(),
        robotsAllow: zod_1.z.boolean().nullish(),
        sidebarGallery: SidebarGalleryConfigSchema().nullish(),
        storefront: zod_1.z.array(GraphCommerceStorefrontConfigSchema()),
        wishlistHideForGuests: zod_1.z.boolean().nullish(),
        wishlistShowFeedbackMessage: zod_1.z.boolean().nullish(),
    });
}
function GraphCommerceDebugConfigSchema() {
    return zod_1.z.object({
        pluginStatus: zod_1.z.boolean().nullish(),
        sessions: zod_1.z.boolean().nullish(),
        webpackCircularDependencyPlugin: zod_1.z.boolean().nullish(),
        webpackDuplicatesPlugin: zod_1.z.boolean().nullish(),
    });
}
function GraphCommercePermissionsSchema() {
    return zod_1.z.object({
        cart: exports.CartPermissionsSchema.nullish(),
        checkout: exports.CartPermissionsSchema.nullish(),
        customerAccount: exports.CustomerAccountPermissionsSchema.nullish(),
        website: exports.WebsitePermissionsSchema.nullish(),
    });
}
function GraphCommerceStorefrontConfigSchema() {
    return zod_1.z.object({
        canonicalBaseUrl: zod_1.z.string().nullish(),
        cartDisplayPricesInclTax: zod_1.z.boolean().nullish(),
        customerCompanyFieldsEnable: zod_1.z.boolean().nullish(),
        defaultLocale: zod_1.z.boolean().nullish(),
        domain: zod_1.z.string().nullish(),
        googleAnalyticsId: zod_1.z.string().nullish(),
        googleRecaptchaKey: zod_1.z.string().nullish(),
        googleTagmanagerId: zod_1.z.string().nullish(),
        linguiLocale: zod_1.z.string().nullish(),
        locale: zod_1.z.string().min(1),
        magentoStoreCode: zod_1.z.string().min(1),
        permissions: GraphCommercePermissionsSchema().nullish(),
        robotsAllow: zod_1.z.boolean().nullish(),
    });
}
function MagentoConfigurableVariantValuesSchema() {
    return zod_1.z.object({
        content: zod_1.z.boolean().nullish(),
        gallery: zod_1.z.boolean().nullish(),
        url: zod_1.z.boolean().nullish(),
    });
}
function RecentlyViewedProductsConfigSchema() {
    return zod_1.z.object({
        enabled: zod_1.z.boolean().nullish(),
        maxCount: zod_1.z.number().nullish(),
    });
}
function SidebarGalleryConfigSchema() {
    return zod_1.z.object({
        paginationVariant: exports.SidebarGalleryPaginationVariantSchema.nullish(),
    });
}
