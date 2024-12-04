// eslint-disable-next-line import/no-extraneous-dependencies
import type { PartialDeep } from 'type-fest'
import type { GraphCommerceConfig, GraphCommerceStorefrontConfig } from '../generated/config'

export const demoConfig: PartialDeep<GraphCommerceConfig, { recurseIntoArrays: true }> &
  Record<string, unknown> & { storefront: PartialDeep<GraphCommerceStorefrontConfig>[] } = {
  canonicalBaseUrl: 'https://graphcommerce.vercel.app',
  hygraphEndpoint: 'https://eu-central-1.cdn.hygraph.com/content/ckhx7xadya6xs01yxdujt8i80/master',
  magentoEndpoint: 'https://backend.reachdigital.dev/graphql',
  magentoVersion: 246,
  storefront: [
    { locale: 'en', magentoStoreCode: 'en_US', defaultLocale: true },
    {
      locale: 'nl',
      magentoStoreCode: 'nl_NL',
      hygraphLocales: ['nl', 'en_us'],
      cartDisplayPricesInclTax: true,
    },
    {
      locale: 'fr-be',
      magentoStoreCode: 'fr_BE',
      cartDisplayPricesInclTax: true,
      linguiLocale: 'fr',
    },
    {
      locale: 'nl-be',
      magentoStoreCode: 'nl_BE',
      cartDisplayPricesInclTax: true,
      linguiLocale: 'nl',
    },
    {
      locale: 'en-gb',
      magentoStoreCode: 'en_GB',
      cartDisplayPricesInclTax: true,
      linguiLocale: 'en',
    },
    { locale: 'en-ca', magentoStoreCode: 'en_CA', linguiLocale: 'en' },
  ],
  productFiltersPro: true,
  productFiltersLayout: 'DEFAULT',
  productListPaginationVariant: 'COMPACT',
  compareVariant: 'ICON',
  robotsAllow: false,

  demoMode: true,
  limitSsg: true,
  compare: true,
  sidebarGallery: { paginationVariant: 'DOTS' },
  configurableVariantForSimple: true,
  configurableVariantValues: { url: true, content: true, gallery: true },
  recentlyViewedProducts: { enabled: true, maxCount: 20 },
  breadcrumbs: false,
  customerDeleteEnabled: true,
  previewSecret: 'SECRET',
}
