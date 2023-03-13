// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml'
import { demoConfig } from '../../../src/config/demoConfig'
import { replaceConfigInString } from '../../../src/config/utils/replaceConfigInString'

it('replaces config in string', () => {
  const config = { ...demoConfig, replaceMe: '1234', do: { replaceMe: 'CHECK' } }

  const meshrc = `sources:
  - name: hygraph
    handler:
      graphql:
        useGETForQueries: true
        endpoint: '{graphCommerce.hygraphEndpoint}'
        batch: false
        i18nConfig: {graphCommerce.i18n}
        operationHeaders:
          gcms-locales: "{context.headers['gcms-locales']}"
          path: /nl/v3/json/getAddress/index.php?postcode={args.postcode}&huisnummer={args.housenumber}&secure_code={graphCommerce.replaceMe}&public_key={graphCommerce.do.replaceMe}
    transforms:
      - filterSchema:
          filters:
            # Remove mutations: \`mutation { * }\`
            - 'Mutation.!*'
            # Remove queries: \`query { node, row*, asset*, scheduled*, *Version, user* }\`
            - 'Query.!{node,asset*,scheduled*,*Version,user*}'
            # Remove field arguments: \`query { anyfield(after,before,last,forceParentLocale,locales) { ... } }\`
            - '*.*.!{after,before,last,forceParentLocale,locales}'
            # Remove type any input or type fields: \`input MyInput {}\` or \`type MyType { anyfield }\`
            - '*.!{localizations,scheduledIn,documentInStages*,createdAt*,updatedAt*,publishedAt*,createdBy,updatedBy,publishedBy,history,scheduledIn*}'
      - prune:
          skipPruning: []
  `

  expect(yaml.load(replaceConfigInString(meshrc, config))).toMatchInlineSnapshot(`
    {
      "sources": [
        {
          "handler": {
            "graphql": {
              "batch": false,
              "endpoint": "https://eu-central-1.cdn.hygraph.com/content/ckhx7xadya6xs01yxdujt8i80/master",
              "i18nConfig": [
                {
                  "defaultLocale": true,
                  "locale": "en",
                  "magentoStoreCode": "en_US",
                },
                {
                  "cartDisplayPricesInclTax": true,
                  "locale": "nl",
                  "magentoStoreCode": "nl_NL",
                },
                {
                  "cartDisplayPricesInclTax": true,
                  "locale": "fr-be",
                  "magentoStoreCode": "fr_BE",
                },
                {
                  "cartDisplayPricesInclTax": true,
                  "locale": "nl-be",
                  "magentoStoreCode": "nl_BE",
                },
                {
                  "cartDisplayPricesInclTax": true,
                  "locale": "en-gb",
                  "magentoStoreCode": "en_GB",
                },
                {
                  "locale": "en-ca",
                  "magentoStoreCode": "en_CA",
                },
              ],
              "operationHeaders": {
                "gcms-locales": "{context.headers['gcms-locales']}",
                "path": "/nl/v3/json/getAddress/index.php?postcode={args.postcode}&huisnummer={args.housenumber}&secure_code=1234&public_key=CHECK",
              },
              "useGETForQueries": true,
            },
          },
          "name": "hygraph",
          "transforms": [
            {
              "filterSchema": {
                "filters": [
                  "Mutation.!*",
                  "Query.!{node,asset*,scheduled*,*Version,user*}",
                  "*.*.!{after,before,last,forceParentLocale,locales}",
                  "*.!{localizations,scheduledIn,documentInStages*,createdAt*,updatedAt*,publishedAt*,createdBy,updatedBy,publishedBy,history,scheduledIn*}",
                ],
              },
            },
            {
              "prune": {
                "skipPruning": [],
              },
            },
          ],
        },
      ],
    }
  `)
})
