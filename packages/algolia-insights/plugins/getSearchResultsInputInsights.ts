import type { getSearchResultsInput as getSearchResultsInputType } from '@graphcommerce/algolia-products'
import { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/algolia-products',
}

export const getSearchResultsInput: FunctionPlugin<typeof getSearchResultsInputType> = async (
  prev,
  args,
  context,
) => ({
  ...(await prev(args, context)),
  analytics: true,
})
