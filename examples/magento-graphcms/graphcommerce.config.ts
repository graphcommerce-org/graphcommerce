import type { GraphCommerceConfig } from '@graphcommerce/next-config/src/generated/config'

declare global {
  interface ImportMeta {
    graphCommerce: GraphCommerceConfig
  }
}

const config: GraphCommerceConfig = {
  advancedFilters: false,
  singleProductRoute: true,
  customerRequireEmailConfirmation: false,
  demoMode: true,
  googleAnalyticsKey: 'UA-XXXXX-X',
  // googleRecaptchaKey: 'afsdasdf',
  // googleTagmanagerKey: 'GTM-XXXXX',

  i18n: [
    {
      defaultLocale: true,
      locale: 'en',
      hygraphLocales: ['en'],
      magentoStoreCode: 'en_us',
      googleAnalyticsKey: 'UA-XXXXX-X',
    },
  ],
}

export default config
