import { GraphQLProviderProps } from '@graphcommerce/graphql'
import type { PluginProps } from '@graphcommerce/next-config'
import { magentoTypePolicies } from '../typePolicies'

export const component = 'GraphQLProvider'
export const exported = '@graphcommerce/graphql'

function MagentoGraphqlGraphqlProvider(props: PluginProps<GraphQLProviderProps>) {
  const { Prev, policies = [], ...rest } = props
  return <Prev {...rest} policies={[magentoTypePolicies, ...policies]} />
}

export const Plugin = MagentoGraphqlGraphqlProvider
