import type {
  dataIdFromObject as baseDataIdFromObject,
  graphqlConfig as graphqlConfigType,
} from '@graphcommerce/graphql'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { magentoDataIdFromObject, magentoTypePolicies } from '../typePolicies'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/graphql',
}

export const graphqlConfig: FunctionPlugin<typeof graphqlConfigType> = (prev, conf) => {
  const results = prev(conf)
  return { ...results, policies: [magentoTypePolicies, ...results.policies] }
}

export const dataIdFromObject: FunctionPlugin<typeof baseDataIdFromObject> = (
  prev,
  object,
  context,
) => {
  const results = prev(object, context)
  return results ?? magentoDataIdFromObject(object, context)
}
