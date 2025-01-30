// @ts-check

/**
 * Docs: https://graphcommerce.org/docs/framework/config
 *
 * @type {import('@graphcommerce/next-config/src/generated/config').GraphCommerceConfig}
 */
const config = {
  robotsAllow: false,
  limitSsg: true,

  hygraphEndpoint: 'https://eu-central-1.cdn.hygraph.com/content/ckhx7xadya6xs01yxdujt8i80/master',
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

      // robotsAllow: false,
      // permissions: { cart: 'DISABLED', checkout: 'DISABLED', customerAccount: 'DISABLED' },
    },
  ],
  recentlyViewedProducts: { enabled: true },
  productFiltersPro: true,
  productFiltersLayout: 'DEFAULT',
  // previewSecret: '123',

  // compare: true,
  // compareVariant: 'ICON',
  // customerDeleteEnabled: false,

  // permissions: { cart: 'ENABLED', checkout: 'ENABLED', customerAccount: 'ENABLED' },
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

module.exports = config
