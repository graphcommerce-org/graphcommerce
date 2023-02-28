import { configToImportMeta } from '../../../src/config/utils/configToImportMeta'

const configFile = {
  i18n: [{ locale: 'en', hygraphLocales: ['en'], magentoStoreCode: 'en_us' }],
  customerRequireEmailConfirmation: false,
  demoMode: true,
  googleTagmanagerKey: 'GTM-XXXXXXX',
  singleProductRoute: true,
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
      "import.meta.graphCommerce": "{}",
      "import.meta.graphCommerce.productFiltersPro": "false",
      "import.meta.graphCommerce.customerRequireEmailConfirmation": "false",
      "import.meta.graphCommerce.deeper": "{}",
      "import.meta.graphCommerce.deeper.arrayvalue": "["test"]",
      "import.meta.graphCommerce.deeper.nested": "{}",
      "import.meta.graphCommerce.deeper.nested.value": ""test"",
      "import.meta.graphCommerce.demoMode": "true",
      "import.meta.graphCommerce.googleTagmanagerKey": ""GTM-XXXXXXX"",
      "import.meta.graphCommerce.i18n": "[{"locale":"en","hygraphLocales":["en"],"magentoStoreCode":"en_us"}]",
      "!import.meta.graphCommerce.legacyProductRoute": "true",
    }
  `)
})
