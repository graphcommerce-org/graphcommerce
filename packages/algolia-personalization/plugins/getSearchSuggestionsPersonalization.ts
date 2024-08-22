import type { getSearchSuggestionsInput as getSearchSuggestionsInputType } from '@graphcommerce/algolia-mesh'
import { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/algolia-mesh',
  ifConfig: 'algolia.personalizationEnabled',
}

export const getSearchSuggestionsInput: FunctionPlugin<
  typeof getSearchSuggestionsInputType
> = async (prev, search, context) => ({
  ...(await prev(search, context)),
  // enablePersonalization: true,
  // personalizationImpact: 50,
})
