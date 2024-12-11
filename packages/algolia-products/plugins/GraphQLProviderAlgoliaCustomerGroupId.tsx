import type { GraphQLProviderProps } from '@graphcommerce/graphql'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { customerGroupIdLink } from '../link/customerGroupIdLink'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/graphql',
  ifConfig: 'algolia.customerGroupPricingEnabled',
}

export function GraphQLProvider(props: PluginProps<GraphQLProviderProps>) {
  const { Prev, links = [], ...rest } = props
  return <Prev {...rest} links={[...links, customerGroupIdLink]} />
}
