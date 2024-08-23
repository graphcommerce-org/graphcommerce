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
  const restEndpoint = `${graphCommerceConfig.magentoEndpoint.slice(0, -7)}rest/{context.headers.store}`
  return prev(
    {
      ...baseConfig,
      sources: [
        ...baseConfig.sources,
        {
          name: 'm2rest',
          handler: {
            openapi: {
              source: '@graphcommerce/magento-graphql-rest/m2-filtered-spec.json',
              operationHeaders: {
                'Content-Type': 'application/json',
                Authorization: '{context.headers.authorization}',
              },
              endpoint: restEndpoint,
              ignoreErrorResponses: true,
            },
          },
          transforms: [
            {
              prefix: {
                value: 'm2rest_',
                includeRootOperations: true,
                includeTypes: false,
                mode: 'bare',
              },
            },
            {
              prefix: {
                value: 'M2Rest_',
                includeRootOperations: false,
                includeTypes: true,
                mode: 'bare',
              },
            },
            {
              namingConvention: {
                enumValues: 'constantCase',
                typeNames: 'pascalCase',
                mode: 'bare',
              },
            },
          ],
        },
      ],
    },
    graphCommerceConfig,
  )
}
