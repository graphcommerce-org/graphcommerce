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
  if (import.meta.graphCommerce.magentoVersion >= 247) {
    return prev(baseConfig, graphCommerceConfig)
  }

  return prev(
    {
      ...baseConfig,
      additionalResolvers: [
        ...(baseConfig.additionalResolvers ?? []),
        '@graphcommerce/magento-customer/mesh/magentoOrderItemResolvers.ts',
      ],
    },
    graphCommerceConfig,
  )
}
