import type { GraphQLProviderProps } from '@graphcommerce/graphql'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { recentlyViewedProductsTypePolicies } from '../typePolicies'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/graphql',
}

export function GraphQLProvider(props: PluginProps<GraphQLProviderProps>) {
  const { Prev, policies = [], ...rest } = props
  return <Prev {...rest} policies={[...policies, recentlyViewedProductsTypePolicies]} />
}
