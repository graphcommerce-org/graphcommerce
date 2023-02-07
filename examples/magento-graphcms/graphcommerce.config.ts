import { GraphCommerceConfig } from '@graphcommerce/next-config/src/generated/config'

/**
 * GraphCommerce Config
 *
 * - Hover over keys to see the description.
 * - Configuration values can be overwritten by environment variables.
 */
const config: GraphCommerceConfig = {
  deployEnvironment: 'development',
  hygraphEndpoint: 'https://api-eu-central-1.hygraph.com/v2/ckhx7xadya6xs01yxdujt8i80/master',
  magentoEndpoint: 'https://backend.reachdigital.dev/graphql',
  i18n: [
    { locale: 'en-us', magentoStoreCode: 'en_US', defaultLocale: true },
    { locale: 'nl-nl', magentoStoreCode: 'nl_NL', cartDisplayPricesInclTax: true },
    { locale: 'fr-be', magentoStoreCode: 'fr_BE', cartDisplayPricesInclTax: true },
    { locale: 'nl-be', magentoStoreCode: 'nl_BE', cartDisplayPricesInclTax: true },
    { locale: 'en-gb', magentoStoreCode: 'en_GB', cartDisplayPricesInclTax: true },
    { locale: 'en-ca', magentoStoreCode: 'en_CA' },
  ],
  advancedFilters: false,
  singleProductRoute: true,
  canonicalBaseUrl: 'https://graphcommerce.vercel.app/',
  // customerRequireEmailConfirmation: false,
  // previewSecret: 'dya6xs01y',
  // googleAnalyticsId: 'G-XXXXX',
  // googleRecaptchaKey: '6LcXXXXX',
  // googleTagmanagerId: 'GTM-XXXXX',
}

export default config
