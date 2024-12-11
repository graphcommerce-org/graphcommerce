import type {
  searchDefaultsToProductListFilters as defaultsToProductListFilters,
  productListApplySearchDefaults as productListApplyDefaults,
  useProductListApplySearchDefaults as useProductListApplyDefaults,
} from '@graphcommerce/magento-search'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { applyEngineVariables } from '../utils/applyEngineVariable'

export const config: PluginConfig = {
  module: '@graphcommerce/magento-search',
  type: 'function',
}

export const useProductListApplySearchDefaults: FunctionPlugin<
  typeof useProductListApplyDefaults
> = (prev, params) => applyEngineVariables(prev(params))

export const productListApplySearchDefaults: FunctionPlugin<typeof productListApplyDefaults> = (
  prev,
  params,
  conf,
) => applyEngineVariables(prev(params, conf))

export const searchDefaultsToProductListFilters: FunctionPlugin<
  typeof defaultsToProductListFilters
> = (prev, variables) => applyEngineVariables(prev(variables))
