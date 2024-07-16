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
) => {
  if (!graphCommerceConfig.algoliaApplicationId || !graphCommerceConfig.algoliaSearchOnlyApiKey) {
    return prev(baseConfig, graphCommerceConfig)
  }

  return prev(
    {
      ...baseConfig,
      sources: [
        ...baseConfig.sources,
        {
          name: 'algolia',
          handler: {
            openapi: {
              endpoint: `https://${graphCommerceConfig.algoliaApplicationId}.algolia.net/`,
              source: '@graphcommerce/algolia-mesh/algolia-spec.yaml',
              ignoreErrorResponses: true,
              schemaHeaders: {
                'X-Algolia-Application-Id': graphCommerceConfig.algoliaApplicationId,
                'X-Algolia-API-Key': graphCommerceConfig.algoliaSearchOnlyApiKey,
              },
              operationHeaders: {
                'X-Algolia-Application-Id': graphCommerceConfig.algoliaApplicationId,
                'X-Algolia-API-Key': graphCommerceConfig.algoliaSearchOnlyApiKey,
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
        '@graphcommerce/algolia-mesh/mesh/resolvers.ts',
      ],
    },
    graphCommerceConfig,
  )
}
