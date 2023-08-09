'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.MagentoConfigurableVariantValuesSchema =
  exports.GraphCommerceStorefrontConfigSchema =
  exports.GraphCommerceDebugConfigSchema =
  exports.GraphCommerceConfigSchema =
  exports.ProductFiltersLayoutSchema =
  exports.CompareVariantSchema =
  exports.definedNonNullAnySchema =
  exports.isDefinedNonNullAny =
    void 0
/* eslint-disable */
const zod_1 = require('zod')
const isDefinedNonNullAny = (v) => v !== undefined && v !== null
exports.isDefinedNonNullAny = isDefinedNonNullAny
exports.definedNonNullAnySchema = zod_1.z.any().refine((v) => (0, exports.isDefinedNonNullAny)(v))
exports.CompareVariantSchema = zod_1.z.enum(['CHECKBOX', 'ICON'])
exports.ProductFiltersLayoutSchema = zod_1.z.enum(['DEFAULT', 'SIDEBAR'])
function GraphCommerceConfigSchema() {
  return zod_1.z.object({
    canonicalBaseUrl: zod_1.z.string().min(1),
    cartDisplayPricesInclTax: zod_1.z.boolean().nullish(),
    compare: zod_1.z.boolean().nullish(),
    compareVariant: exports.CompareVariantSchema.nullish(),
    configurableVariantForSimple: zod_1.z.boolean().nullish(),
    configurableVariantValues: MagentoConfigurableVariantValuesSchema().nullish(),
    customerRequireEmailConfirmation: zod_1.z.boolean().nullish(),
    debug: GraphCommerceDebugConfigSchema().nullish(),
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
    wishlistShowFeedbackMessage: zod_1.z.boolean().nullish(),
  })
}
exports.GraphCommerceConfigSchema = GraphCommerceConfigSchema
function GraphCommerceDebugConfigSchema() {
  return _zod.z.object({
    pluginStatus: _zod.z.boolean().nullish(),
    webpackCircularDependencyPlugin: _zod.z.boolean().nullish(),
    webpackDuplicatesPlugin: _zod.z.boolean().nullish(),
  })
}
exports.GraphCommerceDebugConfigSchema = GraphCommerceDebugConfigSchema
function GraphCommerceStorefrontConfigSchema() {
  return _zod.z.object({
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
  })
}
exports.GraphCommerceStorefrontConfigSchema = GraphCommerceStorefrontConfigSchema
function MagentoConfigurableVariantValuesSchema() {
  return zod_1.z.object({
    content: zod_1.z.boolean().nullish(),
    url: zod_1.z.boolean().nullish(),
  })
}
exports.MagentoConfigurableVariantValuesSchema = MagentoConfigurableVariantValuesSchema
