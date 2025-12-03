import type { GraphCommerceConfig } from '@graphcommerce/next-config'

/** Docs: https://graphcommerce.org/docs/framework/config */
const config: GraphCommerceConfig = {
  robotsAllow: false,
  limitSsg: true,

  magentoEndpoint: 'https://configurator.reachdigital.dev/graphql',
  magentoVersion: 247,
  canonicalBaseUrl: 'https://graphcommerce.vercel.app',
  storefront: [
    {
      locale: 'en',
      magentoStoreCode: 'en_US',
      defaultLocale: true,
      googleAnalyticsId: undefined,
      googleRecaptchaKey: undefined,
    },
    {
      locale: 'nl',
      magentoStoreCode: 'nl_NL',
      robotsAllow: false,
      // priceTaxDisplay: 'TOGGLE_DEFAULT_INCL',
      permissions: {
        cart: 'CUSTOMER_ONLY',
        checkout: 'CUSTOMER_ONLY',
        // catalogPricing: 'CUSTOMER_ONLY',
        customerAccount: 'ENABLED',
      },
    },
  ],
  recentlyViewedProducts: { enabled: true },
  productFiltersPro: true,
  productFiltersLayout: 'DEFAULT',
  // previewSecret: '123',

  // compare: true,
  // compareVariant: 'ICON',
  // customerDeleteEnabled: false,

  // priceTaxDisplay: 'TOGGLE_DEFAULT_EXCL',
  permissions: {
    cart: 'CUSTOMER_ONLY',
    checkout: 'CUSTOMER_ONLY',
    customerAccount: 'ENABLED',
    // catalogPricing: 'CUSTOMER_ONLY',
  },
  // customerCompanyFieldsEnable: false,
  // customerAddressNoteEnable: false,
  // enableGuestCheckoutLogin: false,
  // dataLayer: { coreWebVitals: false },
  // wishlistHideForGuests: true,

  // googleAnalyticsId: undefined,
  // googlePlaystore: undefined,
  // googleRecaptchaKey: undefined,
  // googleTagmanagerId: undefined,

  // configurableVariantForSimple: true,
  // configurableVariantValues: { content: true, gallery: true, url: true },

  // containerSizingContent: 'FULL_WIDTH',
  // containerSizingShell: 'FULL_WIDTH',
  // demoMode: true,
  // breadcrumbs: false,
}

export default config
