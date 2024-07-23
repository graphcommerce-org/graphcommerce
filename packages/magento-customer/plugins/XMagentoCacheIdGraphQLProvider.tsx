import { GraphQLProviderProps } from '@graphcommerce/graphql'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { customerGroupIdLink } from '../link/customerGroupIdLink'
import { xMagentoCacheIdHeader } from '../link/xMagentoCacheIdHeader'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/graphql',
  ifConfig: ['customerXMagentoCacheIdDisable', false],
}

export function GraphQLProvider(props: PluginProps<GraphQLProviderProps>) {
  const { Prev, links = [], ...rest } = props
  return <Prev {...rest} links={[...links, xMagentoCacheIdHeader, customerGroupIdLink]} />
}
