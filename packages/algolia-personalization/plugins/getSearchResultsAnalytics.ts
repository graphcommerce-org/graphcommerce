import type { getSearchResultsInput as getSearchResultsInputType } from '@graphcommerce/algolia-mesh'
import { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { getUserToken } from '../mesh/getUserToken'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/algolia-mesh',
  ifConfig: 'algolia.personalizationEnabled',
}

export const getSearchResultsInput: FunctionPlugin<typeof getSearchResultsInputType> = async (
  prev,
  args,
  context,
) => ({
  ...(await prev(args, context)),
  clickAnalytics: true,
  analytics: true,
  userToken: getUserToken(context),
})
