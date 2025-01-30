import {
  configToEnvSchema,
  formatAppliedEnv,
  mergeEnvIntoConfig,
} from '../../../src/config/utils/mergeEnvIntoConfig'
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

const env = {
  GC_ADVANCED_FILTERS: '0',
  GC_DEMO_MODE: '1',
  GC_SINGLE_PRODUCT_ROUTE: '1',
  GC_STOREFRONT_0_LOCALE: 'en',
  GC_STOREFRONT_0_DEFAULT_LOCALE: 'true',
  GC_STOREFRONT_0_HYGRAPH_LOCALES_0: 'en',
  GC_STOREFRONT_0_MAGENTO_STORE_CODE: 'en_us',
  GC_STOREFRONT_1_LOCALE: 'de',
  GC_STOREFRONT_1_HYGRAPH_LOCALES_0: 'de',
  GC_STOREFRONT_1_MAGENTO_STORE_CODE: 'de_de',
  GC_STOREFRONT:
    '[{"locale": "en", "defaultLocale": true, "hygraphLocales": ["en"], "magentoStoreCode": "en_us"}]',
}
it('traverses a schema and returns a list of env variables that match', () => {
  const [envSchema] = configToEnvSchema(GraphCommerceConfigSchema())

  const keys = Object.keys(envSchema.shape)

  expect(keys.includes('GC_ADVANCED_FILTERS')).toBe(false)
  expect(keys.includes('GC_STOREFRONT')).toBe(true)
  expect(keys.includes('GC_STOREFRONT_0')).toBe(true)
  expect(keys.includes('GC_STOREFRONT_1')).toBe(true)
})
it('parses an env config object', () => {
  const [envSchema] = configToEnvSchema(GraphCommerceConfigSchema())
  const result = envSchema.parse(env)
  expect(result).toMatchSnapshot()
})
it('parses an env string value to a number', () => {
  const [envSchema] = configToEnvSchema(GraphCommerceConfigSchema())
  const result = envSchema.safeParse({ GC_MAGENTO_VERSION: '247' })
  expect(result.success).toBe(true)
  if (result.success) {
    expect(result.data).toMatchInlineSnapshot(`
      {
        "GC_MAGENTO_VERSION": 247,
      }
    `)
  }
})
it('correctly validates if a value is JSON', () => {
  const [envSchema] = configToEnvSchema(GraphCommerceConfigSchema())
  const result = envSchema.safeParse({
    ...env,
    GC_STOREFRONT: 'not json',
    GC_STOREFRONT_0: 'not json',
  })
  expect(result.success).toBe(false)
  if (!result.success) {
    expect(result.error.errors).toMatchInlineSnapshot(`
      [
        {
          "code": "custom",
          "message": "Invalid JSON",
          "path": [
            "GC_STOREFRONT",
          ],
        },
        {
          "code": "custom",
          "message": "Invalid JSON",
          "path": [
            "GC_STOREFRONT_0",
          ],
        },
      ]
    `)
  }
})
it('converts an env schema to a config schema', () => {
  const configFile: GraphCommerceConfig = {
    storefront: [{ locale: 'en', hygraphLocales: ['en'], magentoStoreCode: 'en_us' }],
    productFiltersPro: false,
    canonicalBaseUrl: 'https://example.com',
    hygraphEndpoint: 'https://example.com',
    magentoEndpoint: 'https://example.com',
    previewSecret: 'secret',
    magentoVersion: 247,
    algolia: {
      applicationId: 'a',
      indexNamePrefix: 'a',
      searchOnlyApiKey: 'a',
    },
  }
  const environmentVariables = {
    GC_PRODUCT_FILTERS_PRO: '1',
    GC_STOREFRONT: '[{"defaultLocale": true }]',
    GC_STOREFRONT_0_LOCALE: 'de',
  }
  const [mergedConfig, applied] = mergeEnvIntoConfig(
    GraphCommerceConfigSchema(),
    configFile,
    environmentVariables,
  )
  expect(removeColor(formatAppliedEnv(applied))).toMatchInlineSnapshot(`
    "info   - Loaded GraphCommerce env variables
     ~ GC_PRODUCT_FILTERS_PRO => productFiltersPro
     + GC_STOREFRONT => storefront
     ~ GC_STOREFRONT_0_LOCALE => storefront.[0].locale"
  `)
  // Validate the resulting configura
  const parsed = GraphCommerceConfigSchema().safeParse(mergedConfig)
  expect(parsed.success).toBe(true)
  if (parsed.success) {
    expect(parsed.data.productFiltersPro).toBe(true)
    expect(parsed.data.storefront[0].defaultLocale).toBe(true)
    expect(parsed.data.storefront[0].locale).toBe('de')
  }
})
