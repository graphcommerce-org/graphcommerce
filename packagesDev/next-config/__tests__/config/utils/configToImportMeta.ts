import { configToImportMeta } from '../../../src/config/utils/configToImportMeta'

const configFile = {
  storefront: [{ locale: 'en', hygraphLocales: ['en'], magentoStoreCode: 'en_us' }],
  customerRequireEmailConfirmation: false,
  demoMode: true,
  googleTagmanagerKey: 'GTM-XXXXXXX',
  productFiltersPro: false,
  deeper: {
    arrayvalue: ['test'],
    nested: {
      value: 'test',
    },
  },
}

it('flattens a config object', () => {
  expect(configToImportMeta(configFile)).toMatchInlineSnapshot(`
    {
      "import.meta.graphCommerce": "{ __debug: "'import.meta.graphCommerce' can not be destructured, please access deeper properties directly" }",
      "import.meta.graphCommerce.customerRequireEmailConfirmation": "false",
      "import.meta.graphCommerce.deeper": "{ __debug: "'import.meta.graphCommerce.deeper' can not be destructured, please access deeper properties directly" }",
      "import.meta.graphCommerce.deeper.arrayvalue": "["test"]",
      "import.meta.graphCommerce.deeper.nested": "{ __debug: "'import.meta.graphCommerce.deeper.nested' can not be destructured, please access deeper properties directly" }",
      "import.meta.graphCommerce.deeper.nested.value": ""test"",
      "import.meta.graphCommerce.demoMode": "true",
      "import.meta.graphCommerce.googleTagmanagerKey": ""GTM-XXXXXXX"",
      "import.meta.graphCommerce.productFiltersPro": "false",
      "import.meta.graphCommerce.storefront": "[{"locale":"en","hygraphLocales":["en"],"magentoStoreCode":"en_us"}]",
    }
  `)
})

it('creates keys but does not stringify values', () => {
  expect(configToImportMeta(configFile, 'graphCommerce', false)).toMatchInlineSnapshot(`
    {
      "graphCommerce": {
        "customerRequireEmailConfirmation": false,
        "deeper": {
          "arrayvalue": [
            "test",
          ],
          "nested": {
            "value": "test",
          },
        },
        "demoMode": true,
        "googleTagmanagerKey": "GTM-XXXXXXX",
        "productFiltersPro": false,
        "storefront": [
          {
            "hygraphLocales": [
              "en",
            ],
            "locale": "en",
            "magentoStoreCode": "en_us",
          },
        ],
      },
      "graphCommerce.customerRequireEmailConfirmation": false,
      "graphCommerce.deeper": {
        "arrayvalue": [
          "test",
        ],
        "nested": {
          "value": "test",
        },
      },
      "graphCommerce.deeper.arrayvalue": "["test"]",
      "graphCommerce.deeper.nested": {
        "value": "test",
      },
      "graphCommerce.deeper.nested.value": "test",
      "graphCommerce.demoMode": true,
      "graphCommerce.googleTagmanagerKey": "GTM-XXXXXXX",
      "graphCommerce.productFiltersPro": false,
      "graphCommerce.storefront": "[{"locale":"en","hygraphLocales":["en"],"magentoStoreCode":"en_us"}]",
    }
  `)
})
