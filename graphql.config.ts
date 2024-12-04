import type { IGraphQLConfig } from 'graphql-config'

const config: IGraphQLConfig = {
  projects: {
    graphcommerce: {
      schema: [
        'examples/magento-graphcms/.mesh/schema.graphql',
        'examples/magento-open-source/.mesh/schema.graphql',
        'packages/graphql/apollo-client.graphql',
      ],
      documents: [
        'examples/magento-open-source/components/**/*.graphql',
        'examples/magento-open-source/graphql/**/*.graphql',
        'examples/magento-graphcms/components/**/*.graphql',
        'examples/magento-graphcms/graphql/**/*.graphql',
        'packages/**/*.graphql',
      ],
      extensions: {
        languageService: {
          useSchemaFileDefinitions: true,
        },
        endpoints: { default: { url: 'http://localhost:3000/api/graphql/' } },
      },
      exclude: 'packages/hygraph-cli/readSchema.ts',
    },
  },
}

export default config
