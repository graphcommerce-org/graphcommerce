import type { meshConfig as meshConfigBase } from '@graphcommerce/graphql-mesh/meshConfig'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  module: '@graphcommerce/graphql-mesh/meshConfig',
  type: 'function',
}

export const meshConfig: FunctionPlugin<typeof meshConfigBase> = (
  prev,
  baseConfig,
  graphCommerceConfig,
) =>
  prev(
    {
      ...baseConfig,
      sources: [
        ...baseConfig.sources,
        {
          name: 'algolia',
          handler: {
            openapi: {
              endpoint: `https://${graphCommerceConfig.algolia.applicationId}.algolia.net/`,
              source: '@graphcommerce/algolia-products/algolia-spec.yaml',
              ignoreErrorResponses: true,
              schemaHeaders: {
                'X-Algolia-Application-Id': graphCommerceConfig.algolia.applicationId,
                'X-Algolia-API-Key': graphCommerceConfig.algolia.searchOnlyApiKey,
              },
              operationHeaders: {
                'X-Algolia-Application-Id': graphCommerceConfig.algolia.applicationId,
                'X-Algolia-API-Key': graphCommerceConfig.algolia.searchOnlyApiKey,
              },
              selectQueryOrMutationField: [
                { type: 'Query', fieldName: 'searchSingleIndex' },
                { type: 'Query', fieldName: 'searchForFacetValues' },
              ],
            },
          },
          transforms: [
            {
              prefix: {
                value: 'algolia_',
                includeRootOperations: true,
                includeTypes: false,
                mode: 'bare',
              },
            },
            {
              prefix: {
                value: 'Algolia',
                includeRootOperations: false,
                includeTypes: true,
                mode: 'bare',
              },
            },
          ],
        },
      ],
      additionalResolvers: [
        ...(baseConfig.additionalResolvers ?? []),
        '@graphcommerce/algolia-products/mesh/resolvers.ts',
      ],
    },
    graphCommerceConfig,
  )
