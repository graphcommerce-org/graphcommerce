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
    NEXT_PUBLIC_GOOGLE_ANALYTICS: 'G-9G1JTQ974H',
    NEXT_PUBLIC_GOOGLE_RECAPTCHA_V3_SITE_KEY: '',
    NEXT_PUBLIC_DISPLAY_INCL_TAX: 'nl,fr-be,nl-be,en-gb,eu',
    PREVIEW_SECRET: 'dya6xs01y',
    DEMO_MAGENTO_GRAPHCOMMERCE: '1',
    SOME_KEY: 'bla',
  }

  const [envVariables, appliedRewrite] = rewriteLegacyEnv(
    GraphCommerceConfigSchema(),
    configFile,
    legacyEnv,
  )

  expect(removeColor(formatAppliedEnv(appliedRewrite))).toMatchInlineSnapshot(`
    "warning   - Loaded GraphCommerce env variables
     ‼ GRAPHCMS_URL='https://api-eu-central-1.graphcms.com/v2/ckhx7xadya6xs01yxdujt8i80/master' => should be renamed to GC_HYGRAPH_ENDPOINT='https://api-eu-central-1.graphcms.com/v2/ckhx7xadya6xs01yxdujt8i80/master'
     ‼ NEXT_PUBLIC_GRAPHQL_ENDPOINT='http://localhost:3000/api/graphql' => should be removed
     ‼ IMAGE_DOMAINS='backend.reachdigital.dev,media.graphcms.com,media.graphassets.com' => should be removed: will automatically add the Magento/Hygraph URL. For more advanced configurations, see: https://nextjs.org/docs/api-reference/next/image#configuration-options
     ‼ NEXT_PUBLIC_LOCALE_STORES='{"en-us": "en_US", "nl-nl": "nl_NL", "fr-be": "fr_BE", "nl-be": "nl_BE", "en-gb": "en_GB", "en-ca": "en_CA"}' => env variable is is modified, rewritten to GC_I18N.
     ‼ NEXT_PUBLIC_SITE_URL='https://graphcommerce.vercel.app/' => should be renamed to GC_CANONICAL_BASE_URL='https://graphcommerce.vercel.app/'
     ‼ NEXT_PUBLIC_GTM_ID='123' => should be renamed to GC_GOOGLE_TAGMANAGER_ID='123'
     ‼ NEXT_PUBLIC_GOOGLE_ANALYTICS='G-9G1JTQ974H' => should be renamed to GC_GOOGLE_ANALYTICS_ID='G-9G1JTQ974H'
     ‼ NEXT_PUBLIC_GOOGLE_RECAPTCHA_V3_SITE_KEY='' => should be renamed to GC_GOOGLE_RECAPTCHA_KEY=''
     ‼ NEXT_PUBLIC_DISPLAY_INCL_TAX='nl,fr-be,nl-be,en-gb,eu' => env variable is renamed, move to configuration: cartDisplayPricesInclTax
     ‼ PREVIEW_SECRET='dya6xs01y' => should be renamed to GC_PREVIEW_SECRET='dya6xs01y'
     ‼ DEMO_MAGENTO_GRAPHCOMMERCE='1' => should be renamed to GC_DEMO_MODE='1'
     ~ GC_CANONICAL_BASE_URL='https://graphcommerce.vercel.app/' => import.meta.graphCommerce.canonicalBaseUrl: "https://example.com" => "https://graphcommerce.vercel.app/"
     + GC_DEMO_MODE='1' => import.meta.graphCommerce.demoMode: true
     + GC_GOOGLE_ANALYTICS_ID='G-9G1JTQ974H' => import.meta.graphCommerce.googleAnalyticsId: "G-9G1JTQ974H"
     + GC_GOOGLE_RECAPTCHA_KEY='' => import.meta.graphCommerce.googleRecaptchaKey: ""
     + GC_GOOGLE_TAGMANAGER_ID='123' => import.meta.graphCommerce.googleTagmanagerId: "123"
     ~ GC_HYGRAPH_ENDPOINT='https://api-eu-central-1.graphcms.com/v2/ckhx7xadya6xs01yxdujt8i80/master' => import.meta.graphCommerce.hygraphEndpoint: "https://example.com" => "https://api-eu-central-1.graphcms.com/v2/ckhx7xadya6xs01yxdujt8i80/master"
     ~ GC_I18N='[{"locale":"en-us","magentoStoreCode":"en_US"},{"locale":"nl-nl","magentoStoreCode":"nl_NL"},{"locale":"fr-be","magentoStoreCode":"fr_BE"},{"locale":"nl-be","magentoStoreCode":"nl_BE"},{"locale":"en-gb","magentoStoreCode":"en_GB"},{"locale":"en-ca","magentoStoreCode":"en_CA"}]' => import.meta.graphCommerce.i18n: [{"locale":"en","magentoStoreCode":"en_us"}] => [{"locale":"en-us","magentoStoreCode":"en_US"}]
     ~ GC_PREVIEW_SECRET='dya6xs01y' => import.meta.graphCommerce.previewSecret: "secret" => "dya6xs01y""
  `)
})
