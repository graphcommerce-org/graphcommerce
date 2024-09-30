// import type {
//   useProductListApplySearchDefaults as useProductListApplyDefaults,
//   productListApplySearchDefaults as productListApplyDefaults,
//   searchDefaultsToProductListFilters as defaultsToProductListFilters,
// } from '@graphcommerce/magento-search'
// import { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
// import { applyEngineVariables } from '../utils/applyEngineVariable'

// export const config: PluginConfig = {
//   module: '@graphcommerce/magento-search',
//   type: 'function',
// }

// export const useProductListApplySearchDefaults: FunctionPlugin<
//   typeof useProductListApplyDefaults
// > = (prev, params) => applyEngineVariables(prev(params))

// export const productListApplySearchDefaults: FunctionPlugin<typeof productListApplyDefaults> = (
//   prev,
//   params,
//   conf,
// ) => applyEngineVariables(prev(params, conf))

// export const searchDefaultsToProductListFilters: FunctionPlugin<
//   typeof defaultsToProductListFilters
// > = (prev, variables) => applyEngineVariables(prev(variables))
