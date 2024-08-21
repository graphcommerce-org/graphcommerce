import type { getSearchResultsInput as getSearchResultsInputType } from '@graphcommerce/algolia-mesh'
import { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'

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
  // enablePersonalization: true,
  // personalizationImpact: 50,
})
