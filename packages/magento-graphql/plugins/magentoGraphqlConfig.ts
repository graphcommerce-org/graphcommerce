import { graphqlConfig as graphqlConfigType } from '@graphcommerce/graphql'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { magentoTypePolicies } from '../typePolicies'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/graphql',
}

export const graphqlConfig: FunctionPlugin<typeof graphqlConfigType> = (prev, config) => {
  const results = prev(config)
  return { ...results, policies: [magentoTypePolicies, ...results.policies] }
}
