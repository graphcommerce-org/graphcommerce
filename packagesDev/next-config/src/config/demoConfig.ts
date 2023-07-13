// eslint-disable-next-line import/no-extraneous-dependencies
import { PartialDeep } from 'type-fest'
import { GraphCommerceConfig } from '../generated/config'

export const demoConfig: PartialDeep<GraphCommerceConfig, { recurseIntoArrays: true }> &
  Record<string, unknown> = {
  canonicalBaseUrl: 'https://graphcommerce.vercel.app',
  hygraphEndpoint: 'https://eu-central-1.cdn.hygraph.com/content/ckhx7xadya6xs01yxdujt8i80/master',
  magentoEndpoint: 'https://backend.reachdigital.dev/graphql',
  storefront: [
    { locale: 'en', magentoStoreCode: 'en_US', defaultLocale: true },
    {
      locale: 'nl',
      magentoStoreCode: 'nl_NL',
      hygraphLocales: ['nl', 'en_us'],
      cartDisplayPricesInclTax: true,
    },
    { locale: 'fr-be', magentoStoreCode: 'fr_BE', cartDisplayPricesInclTax: true },
    { locale: 'nl-be', magentoStoreCode: 'nl_BE', cartDisplayPricesInclTax: true },
    { locale: 'en-gb', magentoStoreCode: 'en_GB', cartDisplayPricesInclTax: true },
    { locale: 'en-ca', magentoStoreCode: 'en_CA' },
  ],
  productFiltersPro: true,
  productFiltersLayout: 'DEFAULT',
  compareVariant: 'ICON',
  robotsAllow: false,
  demoMode: true,
  limitSsg: true,
  compare: true,

  configurableVariantValues: {
    description: true,
    gallery: true,
    meta: true,
    name: true,
    shortDescription: true,
    url: true,
  },

  configurableReviewVariantValues: {
    reviews: true,
  },
}
