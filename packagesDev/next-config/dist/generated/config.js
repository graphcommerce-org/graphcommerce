import { z } from 'zod';

const isDefinedNonNullAny = (v) => v !== void 0 && v !== null;
const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));
const CartPermissionsSchema = z.enum(["CUSTOMER_ONLY", "DISABLED", "ENABLED"]);
const CompareVariantSchema = z.enum(["CHECKBOX", "ICON"]);
const ContainerSizingSchema = z.enum(["BREAKPOINT", "FULL_WIDTH"]);
const CustomerAccountPermissionsSchema = z.enum([
  "DISABLED",
  "DISABLE_REGISTRATION",
  "ENABLED"
]);
const PaginationVariantSchema = z.enum(["COMPACT", "EXTENDED"]);
const ProductFiltersLayoutSchema = z.enum(["DEFAULT", "SIDEBAR"]);
const SidebarGalleryPaginationVariantSchema = z.enum(["DOTS", "THUMBNAILS_BOTTOM"]);
const WebsitePermissionsSchema = z.enum(["ENABLED"]);
function DatalayerConfigSchema() {
  return z.object({
    coreWebVitals: z.boolean().nullish()
  });
}
function GraphCommerceConfigSchema() {
  return z.object({
    breadcrumbs: z.boolean().default(false).nullish(),
    canonicalBaseUrl: z.string().min(1),
    cartDisplayPricesInclTax: z.boolean().nullish(),
    compare: z.boolean().nullish(),
    compareVariant: CompareVariantSchema.default("ICON").nullish(),
    configurableVariantForSimple: z.boolean().default(false).nullish(),
    configurableVariantValues: z.lazy(() => MagentoConfigurableVariantValuesSchema().nullish()),
    containerSizingContent: ContainerSizingSchema.default("FULL_WIDTH").nullish(),
    containerSizingShell: ContainerSizingSchema.default("FULL_WIDTH").nullish(),
    crossSellsHideCartItems: z.boolean().default(false).nullish(),
    crossSellsRedirectItems: z.boolean().default(false).nullish(),
    customerAddressNoteEnable: z.boolean().nullish(),
    customerCompanyFieldsEnable: z.boolean().nullish(),
    customerDeleteEnabled: z.boolean().nullish(),
    customerXMagentoCacheIdDisable: z.boolean().nullish(),
    dataLayer: z.lazy(() => DatalayerConfigSchema().nullish()),
    debug: z.lazy(() => GraphCommerceDebugConfigSchema().nullish()),
    demoMode: z.boolean().default(true).nullish(),
    enableGuestCheckoutLogin: z.boolean().nullish(),
    googleAnalyticsId: z.string().nullish(),
    googlePlaystore: z.lazy(() => GraphCommerceGooglePlaystoreConfigSchema().nullish()),
    googleRecaptchaKey: z.string().nullish(),
    googleTagmanagerId: z.string().nullish(),
    graphqlMeshEditMode: z.boolean().default(false).nullish(),
    hygraphEndpoint: z.string().min(1),
    hygraphManagementApi: z.string().nullish(),
    hygraphProjectId: z.string().nullish(),
    hygraphWriteAccessToken: z.string().nullish(),
    limitSsg: z.boolean().nullish(),
    magentoEndpoint: z.string().min(1),
    magentoVersion: z.number(),
    permissions: z.lazy(() => GraphCommercePermissionsSchema().nullish()),
    previewSecret: z.string().nullish(),
    productFiltersLayout: ProductFiltersLayoutSchema.default("DEFAULT").nullish(),
    productFiltersPro: z.boolean().nullish(),
    productListPaginationVariant: PaginationVariantSchema.default("COMPACT").nullish(),
    productRoute: z.string().nullish(),
    recentlyViewedProducts: z.lazy(() => RecentlyViewedProductsConfigSchema().nullish()),
    robotsAllow: z.boolean().nullish(),
    sidebarGallery: z.lazy(() => SidebarGalleryConfigSchema().nullish()),
    storefront: z.array(z.lazy(() => GraphCommerceStorefrontConfigSchema())),
    wishlistHideForGuests: z.boolean().nullish(),
    wishlistShowFeedbackMessage: z.boolean().nullish()
  });
}
function GraphCommerceDebugConfigSchema() {
  return z.object({
    cart: z.boolean().nullish(),
    pluginStatus: z.boolean().nullish(),
    sessions: z.boolean().nullish(),
    webpackCircularDependencyPlugin: z.boolean().nullish(),
    webpackDuplicatesPlugin: z.boolean().nullish()
  });
}
function GraphCommerceGooglePlaystoreConfigSchema() {
  return z.object({
    packageName: z.string().min(1),
    sha256CertificateFingerprint: z.string().min(1)
  });
}
function GraphCommercePermissionsSchema() {
  return z.object({
    cart: CartPermissionsSchema.nullish(),
    checkout: CartPermissionsSchema.nullish(),
    customerAccount: CustomerAccountPermissionsSchema.nullish(),
    website: WebsitePermissionsSchema.nullish()
  });
}
function GraphCommerceStorefrontConfigSchema() {
  return z.object({
    canonicalBaseUrl: z.string().nullish(),
    cartDisplayPricesInclTax: z.boolean().nullish(),
    customerCompanyFieldsEnable: z.boolean().nullish(),
    defaultLocale: z.boolean().nullish(),
    domain: z.string().nullish(),
    googleAnalyticsId: z.string().nullish(),
    googleRecaptchaKey: z.string().nullish(),
    googleTagmanagerId: z.string().nullish(),
    hygraphLocales: z.array(z.string().min(1)).nullish(),
    linguiLocale: z.string().nullish(),
    locale: z.string().min(1),
    magentoStoreCode: z.string().min(1),
    permissions: z.lazy(() => GraphCommercePermissionsSchema().nullish()),
    robotsAllow: z.boolean().nullish()
  });
}
function MagentoConfigurableVariantValuesSchema() {
  return z.object({
    content: z.boolean().nullish(),
    gallery: z.boolean().nullish(),
    url: z.boolean().nullish()
  });
}
function RecentlyViewedProductsConfigSchema() {
  return z.object({
    enabled: z.boolean().nullish(),
    maxCount: z.number().nullish()
  });
}
function SidebarGalleryConfigSchema() {
  return z.object({
    paginationVariant: SidebarGalleryPaginationVariantSchema.nullish()
  });
}

export { CartPermissionsSchema, CompareVariantSchema, ContainerSizingSchema, CustomerAccountPermissionsSchema, DatalayerConfigSchema, GraphCommerceConfigSchema, GraphCommerceDebugConfigSchema, GraphCommerceGooglePlaystoreConfigSchema, GraphCommercePermissionsSchema, GraphCommerceStorefrontConfigSchema, MagentoConfigurableVariantValuesSchema, PaginationVariantSchema, ProductFiltersLayoutSchema, RecentlyViewedProductsConfigSchema, SidebarGalleryConfigSchema, SidebarGalleryPaginationVariantSchema, WebsitePermissionsSchema, definedNonNullAnySchema, isDefinedNonNullAny };
