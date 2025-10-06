import type { getSearchResultsInput as getSearchResultsInputType } from '@graphcommerce/algolia-products'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { getUserToken } from '../mesh/getUserToken'

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
  clickAnalytics: true,
  userToken: getUserToken(context),
})
