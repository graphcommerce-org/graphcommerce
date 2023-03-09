import { GraphCommerceConfig } from '../generated/config'

export const demoConfig: GraphCommerceConfig = {
  canonicalBaseUrl: 'https://graphcommerce.vercel.app',
  hygraphEndpoint: 'https://eu-central-1.cdn.hygraph.com/content/ckhx7xadya6xs01yxdujt8i80/master',
  magentoEndpoint: 'https://backend.reachdigital.dev/graphql',
  i18n: [
    { locale: 'en', magentoStoreCode: 'en_US', defaultLocale: true },
    { locale: 'nl', magentoStoreCode: 'nl_NL', cartDisplayPricesInclTax: true },
    { locale: 'fr-be', magentoStoreCode: 'fr_BE', cartDisplayPricesInclTax: true },
    { locale: 'nl-be', magentoStoreCode: 'nl_BE', cartDisplayPricesInclTax: true },
    { locale: 'en-gb', magentoStoreCode: 'en_GB', cartDisplayPricesInclTax: true },
    { locale: 'en-ca', magentoStoreCode: 'en_CA' },
  ],
  productFiltersPro: true,
  robotsAllow: false,
  demoMode: true,
  limitSsg: true,
}
