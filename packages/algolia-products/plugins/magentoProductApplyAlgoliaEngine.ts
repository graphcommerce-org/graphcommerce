import type {
  useProductListApplyCategoryDefaults as useProductListApplyDefaults,
  productListApplyCategoryDefaults as productListApplyDefaults,
  categoryDefaultsToProductListFilters as defaultsToProductListFilters,
} from '@graphcommerce/magento-product'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { applyEngineVariables } from '../utils/applyEngineVariable'

export const config: PluginConfig = {
  module: '@graphcommerce/magento-product',
  type: 'function',
  ifConfig: 'algolia.catalogEnabled',
}

export const useProductListApplyCategoryDefaults: FunctionPlugin<
  typeof useProductListApplyDefaults
> = (prev, params, category) => applyEngineVariables(prev(params, category))

export const productListApplyCategoryDefaults: FunctionPlugin<
  typeof productListApplyDefaults
> = async (prev, params, conf, category) => applyEngineVariables(await prev(params, conf, category))

export const categoryDefaultsToProductListFilters: FunctionPlugin<
  typeof defaultsToProductListFilters
> = (prev, variables) => applyEngineVariables(prev(variables))
