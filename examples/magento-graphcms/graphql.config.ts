import type { IGraphQLConfig } from 'graphql-config'

const config: IGraphQLConfig = {
  schema: [
    '.mesh/schema.graphql',
    'node_modules/@graphcommerce/apollo-client.graphql',
    'node_modules/@graphcommerce/graphql-codegen-near-operation-file/src/injectable.graphqls',
  ],
  documents: [
    'components/**/*.graphql',
    'graphql/**/*.graphql',
    'node_modules/@graphcommerce/**/*.graphql',
  ],
  extensions: {
    languageService: { useSchemaFileDefinitions: true },
    endpoints: { default: { url: 'http://localhost:3000/api/graphql/' } },
  },
}

export default config
