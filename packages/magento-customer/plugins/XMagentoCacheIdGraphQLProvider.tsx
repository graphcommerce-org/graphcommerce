import { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { xMagentoCacheIdHeader } from '../link/xMagentoCacheIdHeader'
import { GraphQLProviderProps } from '@graphcommerce/graphql'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/graphql',
  ifConfig: ['customerXMagentoCacheIdDisable', false],
}

export function GraphQLProvider(props: PluginProps<GraphQLProviderProps>) {
  const { Prev, links = [], ...rest } = props
  return <Prev {...rest} links={[...links, xMagentoCacheIdHeader]} />
}
