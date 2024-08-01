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
    console.log('Algolia credentials not provided, skipping Algolia plugin')
    return prev(baseConfig, graphCommerceConfig)
  }

  return prev(
    {
      ...baseConfig,
      sources: [
        ...baseConfig.sources,
        {
          name: 'algoliaInsights',
          handler: {
            openapi: {
              endpoint: `https://insights.algolia.io/`,
              source: '@graphcommerce/algolia-personalisation/algolia-insights-spec.yaml',
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
                value: 'algolia_insights_',
                includeRootOperations: true,
                includeTypes: false,
                mode: 'bare',
              },
            },
            {
              prefix: {
                value: 'AlgoliaInsights',
                includeRootOperations: false,
                includeTypes: true,
                mode: 'bare',
              },
            },
          ],
        },
      ],
      // additionalResolvers: [
      //   ...(baseConfig.additionalResolvers ?? []),
      //   '@graphcommerce/algolia-mesh/mesh/resolvers.ts',
      // ],
    },
    graphCommerceConfig,
  )
}
