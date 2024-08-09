import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import type { MeshConfigFunction } from '@graphcommerce/graphql-mesh/meshConfig'

export const config: PluginConfig = {
  module: '@graphcommerce/graphql-mesh/meshConfig',
  type: 'function',
}

export const meshConfig: FunctionPlugin<MeshConfigFunction> = (prev, conf, graphCommerceConfig) => {
  const result = prev(conf, graphCommerceConfig)
  return {
    ...result,
    additionalResolvers: [
      ...(result.additionalResolvers ?? []),
      '@graphcommerce/hygraph-dynamic-rows/mesh/resolvers.ts',
    ],
  }
}
