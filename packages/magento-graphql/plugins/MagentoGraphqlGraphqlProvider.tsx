/* eslint-disable import/no-mutable-exports */
import { GraphQLProviderProps } from '@graphcommerce/graphql'
import type { PluginProps } from '@graphcommerce/next-config'
import { magentoTypePolicies } from '../typePolicies'

export const component = 'GraphQLProvider'
export const exported = '@graphcommerce/graphql'

function MagentoGraphqlGraphqlProvider(props: PluginProps<GraphQLProviderProps>) {
  const { Prev, policies = [], ...prev } = props
  return <Prev {...prev} policies={[magentoTypePolicies, ...policies]} />
}

export const Plugin = MagentoGraphqlGraphqlProvider
