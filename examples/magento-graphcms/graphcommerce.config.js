/**
 * GraphCommerce Config
 *
 * - Hover over keys to see the description.
 * - Configuration values can be overwritten by environment variables.
 *
 * @type {import('@graphcommerce/next-config/src/generated/config').GraphCommerceConfig}
 */
const config = {
  robotsAllow: false,
  hygraphEndpoint: 'https://eu-central-1.cdn.hygraph.com/content/ckhx7xadya6xs01yxdujt8i80/master',
  magentoEndpoint: 'https://backend.reachdigital.dev/graphql',
  i18n: [
    { locale: 'en', magentoStoreCode: 'en_US', defaultLocale: true },
    {
      locale: 'nl',
      magentoStoreCode: 'nl_NL',
      cartDisplayPricesInclTax: true,
      hygraphLocales: ['nl', 'en'],
    },
    { locale: 'fr-be', magentoStoreCode: 'fr_BE', cartDisplayPricesInclTax: true },
    { locale: 'nl-be', magentoStoreCode: 'nl_BE', cartDisplayPricesInclTax: true },
    { locale: 'en-gb', magentoStoreCode: 'en_GB', cartDisplayPricesInclTax: true },
    { locale: 'en-ca', magentoStoreCode: 'en_CA' },
  ],
  productFiltersPro: true,
  canonicalBaseUrl: 'https://graphcommerce.vercel.app/',
  // customerRequireEmailConfirmation: false,
  // previewSecret: 'dya6xs01y',
  // googleAnalyticsId: 'G-XXXXX',
  // googleRecaptchaKey: '6LcXXXXX',
  // googleTagmanagerId: 'GTM-XXXXX',
}

module.exports = config
