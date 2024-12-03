import { formatAppliedEnv } from '../../../src/config/utils/mergeEnvIntoConfig'
import { rewriteLegacyEnv } from '../../../src/config/utils/rewriteLegacyEnv'
import type { GraphCommerceConfig } from '../../../src/generated/config'
import { GraphCommerceConfigSchema } from '../../../src/generated/config'
export const removeColor = (str: string) =>
  str.replace(
    new RegExp(
      [
        '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
        '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))',
      ].join('|'),
      'g',
    ),
    '',
  )
it('rewrites legacy env', () => {
  const configFile: GraphCommerceConfig = {
    storefront: [{ locale: 'en', hygraphLocales: ['en'], magentoStoreCode: 'en_us' }],
    productFiltersPro: false,
    canonicalBaseUrl: 'https://example.com',
    hygraphEndpoint: 'https://example.com',
    magentoEndpoint: 'https://example.com',
    previewSecret: 'secret',
    robotsAllow: true,
    magentoVersion: 246,
  }
  const legacyEnv = {
    GRAPHCMS_URL: 'https://api-eu-central-1.graphcms.com/v2/ckhx7xadya6xs01yxdujt8i80/master',
    MAGENTO_ENDPOINT: 'https://backend.reachdigital.dev/graphql',
    NEXT_PUBLIC_GRAPHQL_ENDPOINT: 'http://localhost:3000/api/graphql',
    IMAGE_DOMAINS: 'backend.reachdigital.dev,media.graphcms.com,media.graphassets.com',
    NEXT_PUBLIC_LOCALE_STORES:
      '{"en-us": "en_US", "nl-nl": "nl_NL", "fr-be": "fr_BE", "nl-be": "nl_BE", "en-gb": "en_GB", "en-ca": "en_CA"}',
    NEXT_PUBLIC_SITE_URL: 'https://graphcommerce.vercel.app/',
    NEXT_PUBLIC_GTM_ID: '123',
    NEXT_PUBLIC_GOOGLE_ANALYTICS:
      '{"en-us": "G-111", "nl-nl": "G-222", "fr-be": "G-333", "nl-be": "G-444", "en-gb":"G-555", "en-ca": "G-666"}',
    NEXT_PUBLIC_GOOGLE_RECAPTCHA_V3_SITE_KEY: '',
    NEXT_PUBLIC_DISPLAY_INCL_TAX: 'nl,fr-be,nl-be,en-gb,eu',
    PREVIEW_SECRET: 'dya6xs01y',
    DEMO_MAGENTO_GRAPHCOMMERCE: '1',
    SOME_KEY: 'bla',
  }
  const [, appliedRewrite] = rewriteLegacyEnv(GraphCommerceConfigSchema(), legacyEnv, configFile)
  expect(removeColor(formatAppliedEnv(appliedRewrite))).toMatchInlineSnapshot(`
    "warning   - Loaded GraphCommerce env variables
     ‼ GRAPHCMS_URL => should be renamed to GC_HYGRAPH_ENDPOINT='https://api-eu-central-1.graphcms.com/v2/ckhx7xadya6xs01yxdujt8i80/master'
     ‼ MAGENTO_ENDPOINT => should be renamed to GC_MAGENTO_ENDPOINT='https://backend.reachdigital.dev/graphql'
     ‼ NEXT_PUBLIC_GRAPHQL_ENDPOINT => should be removed
     ‼ IMAGE_DOMAINS => should be removed: will automatically add the Magento/Hygraph URL. For more advanced configurations, see: https://nextjs.org/docs/api-reference/next/image#configuration-options
     ‼ NEXT_PUBLIC_LOCALE_STORES => env variable is is modified, rewritten to GC_STOREFRONT.
     ‼ NEXT_PUBLIC_SITE_URL => should be renamed to GC_CANONICAL_BASE_URL='https://graphcommerce.vercel.app/'
     ‼ NEXT_PUBLIC_GTM_ID => should be renamed to GC_GOOGLE_TAGMANAGER_ID='123'
     ‼ NEXT_PUBLIC_GOOGLE_ANALYTICS => should be rewritten to GC_STOREFRONT_*_GOOGLE_ANALYTICS_ID
     ‼ NEXT_PUBLIC_GOOGLE_RECAPTCHA_V3_SITE_KEY => should be renamed to GC_GOOGLE_RECAPTCHA_KEY=''
     ‼ NEXT_PUBLIC_DISPLAY_INCL_TAX => env variable is renamed, move to configuration: cartDisplayPricesInclTax
     ‼ PREVIEW_SECRET => should be renamed to GC_PREVIEW_SECRET='dya6xs01y'
     ‼ DEMO_MAGENTO_GRAPHCOMMERCE => should be renamed to GC_DEMO_MODE='1'
     ~ GC_CANONICAL_BASE_URL => canonicalBaseUrl
     + GC_DEMO_MODE => demoMode
     + GC_GOOGLE_ANALYTICS_ID => googleAnalyticsId
     + GC_GOOGLE_RECAPTCHA_KEY => googleRecaptchaKey
     + GC_GOOGLE_TAGMANAGER_ID => googleTagmanagerId
     ~ GC_HYGRAPH_ENDPOINT => hygraphEndpoint
     ~ GC_MAGENTO_ENDPOINT => magentoEndpoint
     ~ GC_PREVIEW_SECRET => previewSecret
     = GC_STOREFRONT => storefront: (ignored)
     + GC_STOREFRONT_0_GOOGLE_ANALYTICS_ID => storefront.[0].googleAnalyticsId
     + GC_STOREFRONT_1_GOOGLE_ANALYTICS_ID => storefront.[1].googleAnalyticsId
     + GC_STOREFRONT_2_CART_DISPLAY_PRICES_INCL_TAX => storefront.[2].cartDisplayPricesInclTax
     + GC_STOREFRONT_2_GOOGLE_ANALYTICS_ID => storefront.[2].googleAnalyticsId
     + GC_STOREFRONT_3_CART_DISPLAY_PRICES_INCL_TAX => storefront.[3].cartDisplayPricesInclTax
     + GC_STOREFRONT_3_GOOGLE_ANALYTICS_ID => storefront.[3].googleAnalyticsId
     + GC_STOREFRONT_4_CART_DISPLAY_PRICES_INCL_TAX => storefront.[4].cartDisplayPricesInclTax
     + GC_STOREFRONT_4_GOOGLE_ANALYTICS_ID => storefront.[4].googleAnalyticsId
     + GC_STOREFRONT_5_GOOGLE_ANALYTICS_ID => storefront.[5].googleAnalyticsId"
  `)
})
