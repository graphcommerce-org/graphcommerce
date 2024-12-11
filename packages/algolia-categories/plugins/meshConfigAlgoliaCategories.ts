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
      sources: [...baseConfig.sources],
      additionalResolvers: [
        ...(baseConfig.additionalResolvers ?? []),
        '@graphcommerce/algolia-categories/mesh/resolvers.ts',
      ],
    },
    graphCommerceConfig,
  )
