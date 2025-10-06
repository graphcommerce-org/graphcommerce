import type { getSearchSuggestionsInput as getSearchSuggestionsInputType } from '@graphcommerce/algolia-products'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/algolia-products',
}

export const getSearchSuggestionsInput: FunctionPlugin<
  typeof getSearchSuggestionsInputType
> = async (prev, search, context) => ({
  ...(await prev(search, context)),
  analytics: true,
})
