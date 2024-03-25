import { graphqlConfig } from '@graphcommerce/graphql'
import type { FunctionPlugin } from '@graphcommerce/next-config'
import { magentoTypePolicies } from '../typePolicies'

export const func = 'graphqlConfig'
export const exported = '@graphcommerce/graphql/config'

const magentoGraphqlConfig: FunctionPlugin<typeof graphqlConfig> = (prev, config) => {
  const results = prev(config)
  return { ...results, policies: [magentoTypePolicies, ...results.policies] }
}

export const plugin = magentoGraphqlConfig
