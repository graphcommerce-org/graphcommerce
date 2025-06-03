import type { categoriesApplySearchDefaults as original } from '@graphcommerce/magento-search'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/magento-search',
}

export const categoriesApplySearchDefaults: FunctionPlugin<typeof original> = (
  prev,
  props,
  conf,
) => {
  const result = prev(props, conf)
  return { ...result, filters: { ...result.filters, engine: { in: ['algolia'] } } }
}
