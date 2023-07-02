const config = {
  hygraphEndpoint: 'https://us-west-2.cdn.hygraph.com/content/clj0t1oz416iy01uc23qmcld8/master',
  magentoEndpoint: 'http://192.168.1.79:4080/graphql',
  canonicalBaseUrl: 'http://shop.manganimeshon.com',
  productFiltersPro: true,
  compare: true,
  demoMode: false,
  productFiltersLayout: 'SIDEBAR',
  storefront: [
    {
      locale: 'en',
      magentoStoreCode: 'default',
      wishlistShowFeedbackMessage: true,
      canonicalBaseUrl: 'http://shop.manganimeshon.com',
      cartDisplayPricesInclTax: true,
      defaultLocale: true,
    },
    {
      locale: 'es',
      magentoStoreCode: 'es',
      wishlistShowFeedbackMessage: true,
      canonicalBaseUrl: 'http://shop.manganimeshon.com/es',
      cartDisplayPricesInclTax: true,
    },
  ],
  stats: {
    errors: true,
    errorStack: true,
    errorDetails: true, // --display-error-details
  },
}
module.exports = config
