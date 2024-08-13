import type { getSearchResultsInput as getSearchResultsInputType } from '@graphcommerce/algolia-mesh'
import { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { getUserToken } from '../mesh/getUserToken'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/algolia-mesh',
  ifConfig: 'algoliaPersonalizationEnabled',
}

export const getSearchResultsInput: FunctionPlugin<typeof getSearchResultsInputType> = async (
  prev,
  args,
  context,
) => {
  const res = await prev(args, context)

  return {
    ...res,
    clickAnalytics: true,
    analytics: true,
    userToken: getUserToken(context),
  }
}
