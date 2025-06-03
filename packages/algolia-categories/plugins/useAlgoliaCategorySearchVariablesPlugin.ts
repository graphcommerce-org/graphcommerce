import type { useCategorySearchVariables as original } from '@graphcommerce/magento-search'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/magento-search',
}

export const useCategorySearchVariables: FunctionPlugin<typeof original> = (prev, props) => {
  const result = prev(props)
  return { ...result, filters: { ...result.filters, engine: { in: ['algolia'] } } }
}
