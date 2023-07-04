"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphCommerceStorefrontConfigSchema = exports.GraphCommerceDebugConfigSchema = exports.GraphCommerceConfigSchema = exports.CompareVariantSchema = exports.definedNonNullAnySchema = exports.isDefinedNonNullAny = void 0;
/* eslint-disable */
const zod_1 = require("zod");
const isDefinedNonNullAny = (v) => v !== undefined && v !== null;
exports.isDefinedNonNullAny = isDefinedNonNullAny;
exports.definedNonNullAnySchema = zod_1.z.any().refine((v) => (0, exports.isDefinedNonNullAny)(v));
exports.CompareVariantSchema = zod_1.z.enum(['CHECKBOX', 'ICON']);
function GraphCommerceConfigSchema() {
    return zod_1.z.object({
        canonicalBaseUrl: zod_1.z.string().min(1),
        cartDisplayPricesInclTax: zod_1.z.boolean().nullish(),
        compare: zod_1.z.boolean().nullish(),
        compareVariant: exports.CompareVariantSchema.nullish(),
        customerRequireEmailConfirmation: zod_1.z.boolean().nullish(),
        debug: GraphCommerceDebugConfigSchema().nullish(),
        demoMode: zod_1.z.boolean().nullish(),
        googleAnalyticsId: zod_1.z.string().nullish(),
        googleRecaptchaKey: zod_1.z.string().nullish(),
        googleTagmanagerId: zod_1.z.string().nullish(),
        hygraphAppClientId: zod_1.z.string().nullish(),
        hygraphAppClientSecret: zod_1.z.string().nullish(),
        hygraphEndpoint: zod_1.z.string().min(1),
        hygraphWriteAccessEndpoint: zod_1.z.string().nullish(),
        hygraphWriteAccessToken: zod_1.z.string().nullish(),
        legacyProductRoute: zod_1.z.boolean().nullish(),
        limitSsg: zod_1.z.boolean().nullish(),
        magentoEndpoint: zod_1.z.string().min(1),
        previewSecret: zod_1.z.string().nullish(),
        productFiltersPro: zod_1.z.boolean().nullish(),
        productRoute: zod_1.z.string().nullish(),
        robotsAllow: zod_1.z.boolean().nullish(),
        storefront: zod_1.z.array(GraphCommerceStorefrontConfigSchema()),
        wishlistHideForGuests: zod_1.z.boolean().nullish(),
        wishlistIgnoreProductWishlistStatus: zod_1.z.boolean().nullish(),
        wishlistShowFeedbackMessage: zod_1.z.boolean().nullish()
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
