import { configToImportMeta } from '../../../src/config/utils/configToImportMeta'

const configFile = {
  i18n: [{ locale: 'en', hygraphLocales: ['en'], magentoStoreCode: 'en_us' }],
  customerRequireEmailConfirmation: false,
  demoMode: true,
  googleTagmanagerKey: 'GTM-XXXXXXX',
  legacyProductRoute: true,
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
      "import.meta.graphCommerce.i18n": "[{"locale":"en","hygraphLocales":["en"],"magentoStoreCode":"en_us"}]",
      "import.meta.graphCommerce.legacyProductRoute": "true",
      "import.meta.graphCommerce.productFiltersPro": "false",
    }
  `)
})

it('creates keys but does not stringify values', () => {
  expect(configToImportMeta(configFile, false)).toMatchInlineSnapshot(`
    {
      "false": "{ __debug: "'false' can not be destructured, please access deeper properties directly" }",
      "false.customerRequireEmailConfirmation": "false",
      "false.deeper": "{ __debug: "'false.deeper' can not be destructured, please access deeper properties directly" }",
      "false.deeper.arrayvalue": "["test"]",
      "false.deeper.nested": "{ __debug: "'false.deeper.nested' can not be destructured, please access deeper properties directly" }",
      "false.deeper.nested.value": ""test"",
      "false.demoMode": "true",
      "false.googleTagmanagerKey": ""GTM-XXXXXXX"",
      "false.i18n": "[{"locale":"en","hygraphLocales":["en"],"magentoStoreCode":"en_us"}]",
      "false.legacyProductRoute": "true",
      "false.productFiltersPro": "false",
    }
  `)
})
