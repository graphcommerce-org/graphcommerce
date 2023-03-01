import { GraphCommerceConfig } from '../generated/config'

export const demoConfig: GraphCommerceConfig = {
  canonicalBaseUrl: 'https://graphcommerce.vercel.app',
  hygraphEndpoint: 'https://eu-central-1.cdn.hygraph.com/content/ckhx7xadya6xs01yxdujt8i80/master',
  magentoEndpoint: 'https://backend.reachdigital.dev/graphql',
  i18n: [{ locale: 'en', magentoStoreCode: 'en_US' }],
  productFiltersPro: true,
  legacyProductRoute: false,
}
