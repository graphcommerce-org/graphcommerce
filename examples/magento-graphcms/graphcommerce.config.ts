import type { GraphCommerceConfig } from '@graphcommerce/next-config/src/generated/config'

declare global {
  interface ImportMeta {
    graphCommerce: GraphCommerceConfig
  }
}

const config: GraphCommerceConfig = {
  hygraphEndpoint: 'https://api-eu-central-1.hygraph.com/v2/ckhx7xadya6xs01yxdujt8i80/master',
  magentoEndpoint: 'https://backend.reachdigital.dev/graphql',
  i18n: [],

  advancedFilters: false,
  singleProductRoute: true,
  customerRequireEmailConfirmation: false,
  demoMode: true,

  canonicalBaseUrl: 'https://graphcommerce.vercel.app/',
  previewSecret: 'dya6xs01y',
  googleAnalyticsId: 'G-XXXXX',
  googleRecaptchaKey: 'afsdasdf',
  googleTagmanagerId: 'GTM-XXXXX',
}

export default config
