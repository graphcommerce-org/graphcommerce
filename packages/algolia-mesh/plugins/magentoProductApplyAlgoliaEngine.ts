import type {
  useProductListApplyCategoryDefaults as useProductListApplyDefaults,
  productListApplyCategoryDefaults as productListApplyDefaults,
  categoryDefaultsToProductListFilters as defaultsToProductListFilters,
} from '@graphcommerce/magento-product'
import { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { applyEngineVariables } from '../utils/applyEngineVariable'

export const config: PluginConfig = {
  module: '@graphcommerce/magento-product',
  type: 'function',
  ifConfig: 'algoliaApplicationId',
}

export const useProductListApplyCategoryDefaults: FunctionPlugin<
  typeof useProductListApplyDefaults
> = (prev, params, category) => {
  if (import.meta.graphCommerce.algoliaCatalogEnabled !== true) return prev(params, category)
  return applyEngineVariables(prev(params, category))
}

export const productListApplyCategoryDefaults: FunctionPlugin<
  typeof productListApplyDefaults
> = async (prev, params, conf, category) => {
  if (import.meta.graphCommerce.algoliaCatalogEnabled !== true) return prev(params, conf, category)
  return applyEngineVariables(await prev(params, conf, category))
}

export const categoryDefaultsToProductListFilters: FunctionPlugin<
  typeof defaultsToProductListFilters
> = (prev, variables) => {
  if (import.meta.graphCommerce.algoliaCatalogEnabled !== true) return prev(variables)
  return applyEngineVariables(prev(variables))
}
