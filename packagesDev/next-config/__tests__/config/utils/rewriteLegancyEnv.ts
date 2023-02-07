import { formatAppliedEnv } from '../../../src/config/utils/mergeEnvIntoConfig'
import { rewriteLegacyEnv } from '../../../src/config/utils/rewriteLegacyEnv'
import { GraphCommerceConfig, GraphCommerceConfigSchema } from '../../../src/generated/config'

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
    i18n: [{ locale: 'en', hygraphLocales: ['en'], magentoStoreCode: 'en_us' }],
    customerRequireEmailConfirmation: false,
    singleProductRoute: true,
    advancedFilters: false,
    canonicalBaseUrl: 'https://example.com',
    hygraphEndpoint: 'https://example.com',
    magentoEndpoint: 'https://example.com',
    previewSecret: 'secret',
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

  const [, appliedRewrite] = rewriteLegacyEnv(GraphCommerceConfigSchema(), configFile, legacyEnv)

  expect(removeColor(formatAppliedEnv(appliedRewrite))).toMatchInlineSnapshot(`
    "warning   - Loaded GraphCommerce env variables
     ‼ GRAPHCMS_URL='https://api-eu-central-1.graphcms.com/v2/ckhx7xadya6xs01yxdujt8i80/master' => should be renamed to GC_HYGRAPH_ENDPOINT='https://api-eu-central-1.graphcms.com/v2/ckhx7xadya6xs01yxdujt8i80/master'
     ‼ NEXT_PUBLIC_GRAPHQL_ENDPOINT='http://localhost:3000/api/graphql' => should be removed
     ‼ IMAGE_DOMAINS='backend.reachdigital.dev,media.graphcms.com,media.graphassets.com' => should be removed: will automatically add the Magento/Hygraph URL. For more advanced configurations, see: https://nextjs.org/docs/api-reference/next/image#configuration-options
     ‼ NEXT_PUBLIC_LOCALE_STORES='{"en-us": "en_US", "nl-nl": "nl_NL", "fr-be": "fr_BE", "nl-be": "nl_BE", "en-gb": "en_GB", "en-ca": "en_CA"}' => env variable is is modified, rewritten to GC_I18N.
     ‼ NEXT_PUBLIC_SITE_URL='https://graphcommerce.vercel.app/' => should be renamed to GC_CANONICAL_BASE_URL='https://graphcommerce.vercel.app/'
     ‼ NEXT_PUBLIC_GTM_ID='123' => should be renamed to GC_GOOGLE_TAGMANAGER_ID='123'
     ‼ NEXT_PUBLIC_GOOGLE_ANALYTICS='{"en-us": "G-111", "nl-nl": "G-222", "fr-be": "G-333", "nl-be": "G-444", "en-gb":"G-555", "en-ca": "G-666"}' => should be rewritten to GC_I18N_*_GOOGLE_ANALYTICS_ID
     ‼ NEXT_PUBLIC_GOOGLE_RECAPTCHA_V3_SITE_KEY='' => should be renamed to GC_GOOGLE_RECAPTCHA_KEY=''
     ‼ NEXT_PUBLIC_DISPLAY_INCL_TAX='nl,fr-be,nl-be,en-gb,eu' => env variable is renamed, move to configuration: cartDisplayPricesInclTax
     ‼ PREVIEW_SECRET='dya6xs01y' => should be renamed to GC_PREVIEW_SECRET='dya6xs01y'
     ‼ DEMO_MAGENTO_GRAPHCOMMERCE='1' => should be renamed to GC_DEMO_MODE='1'
     ~ GC_CANONICAL_BASE_URL='https://graphcommerce.vercel.app/' => canonicalBaseUrl: "https://example.com" => "https://graphcommerce.vercel.app/"
     + GC_DEMO_MODE='1' => demoMode: true
     + GC_GOOGLE_ANALYTICS_ID='enabled' => googleAnalyticsId: "enabled"
     + GC_GOOGLE_RECAPTCHA_KEY='' => googleRecaptchaKey: ""
     + GC_GOOGLE_TAGMANAGER_ID='123' => googleTagmanagerId: "123"
     ~ GC_HYGRAPH_ENDPOINT='https://api-eu-central-1.graphcms.com/v2/ckhx7xadya6xs01yxdujt8i80/master' => hygraphEndpoint: "https://example.com" => "https://api-eu-central-1.graphcms.com/v2/ckhx7xadya6xs01yxdujt8i80/master"
     = GC_I18N='[{"locale":"en-us","magentoStoreCode":"en_US"},{"locale":"nl-nl","magentoStoreCode":"nl_NL"},{"locale":"fr-be","magentoStoreCode":"fr_BE"},{"locale":"nl-be","magentoStoreCode":"nl_BE"},{"locale":"en-gb","magentoStoreCode":"en_GB"},{"locale":"en-ca","magentoStoreCode":"en_CA"}]' => i18n: (ignored, no change/wrong format)
     + GC_I18N_0_GOOGLE_ANALYTICS_ID='G-111' => i18n.[0].googleAnalyticsId: "G-111"
     + GC_I18N_1_GOOGLE_ANALYTICS_ID='G-222' => i18n.[1].googleAnalyticsId: "G-222"
     + GC_I18N_2_CART_DISPLAY_PRICES_INCL_TAX='1' => i18n.[2].cartDisplayPricesInclTax: true
     + GC_I18N_2_GOOGLE_ANALYTICS_ID='G-333' => i18n.[2].googleAnalyticsId: "G-333"
     + GC_I18N_3_CART_DISPLAY_PRICES_INCL_TAX='1' => i18n.[3].cartDisplayPricesInclTax: true
     + GC_I18N_3_GOOGLE_ANALYTICS_ID='G-444' => i18n.[3].googleAnalyticsId: "G-444"
     + GC_I18N_4_CART_DISPLAY_PRICES_INCL_TAX='1' => i18n.[4].cartDisplayPricesInclTax: true
     + GC_I18N_4_GOOGLE_ANALYTICS_ID='G-555' => i18n.[4].googleAnalyticsId: "G-555"
     + GC_I18N_5_GOOGLE_ANALYTICS_ID='G-666' => i18n.[5].googleAnalyticsId: "G-666"
     ~ GC_PREVIEW_SECRET='dya6xs01y' => previewSecret: "secret" => "dya6xs01y""
  `)
})
