import { addTtlPerCoordinate } from '@graphcommerce/graphql-mesh'
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
  if (graphCommerceConfig.magentoVersion <= 247 || !graphCommerceConfig.googleRecaptchaKey)
    return prev(baseConfig, graphCommerceConfig)
  return prev(
    {
      ...baseConfig,
      additionalResolvers: [
        ...(baseConfig.additionalResolvers ?? []),
        '@graphcommerce/googlerecaptcha/mesh/resolvers.ts',
      ],
      plugins: addTtlPerCoordinate(baseConfig.plugins, {
        'Query.recaptcha': 36000000,
      }),
    },
    graphCommerceConfig,
  )
}
