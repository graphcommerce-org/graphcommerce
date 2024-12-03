import type { getSearchSuggestionsInput as getSearchSuggestionsInputType } from '@graphcommerce/algolia-products'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { getUserToken } from '../mesh/getUserToken'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/algolia-products',
}

export const getSearchSuggestionsInput: FunctionPlugin<
  typeof getSearchSuggestionsInputType
> = async (prev, search, context) => ({
  ...(await prev(search, context)),
  clickAnalytics: true,
  userToken: getUserToken(context),
})
