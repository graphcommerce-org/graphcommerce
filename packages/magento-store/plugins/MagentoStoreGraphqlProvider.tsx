import { GraphQLProviderProps } from '@graphcommerce/graphql'
import type { PluginProps } from '@graphcommerce/next-config'
import { createStoreLink } from '../link/createStoreLink'

export const component = 'GraphQLProvider'
export const exported = '@graphcommerce/graphql'

function MagentoStoreGraphqlProvider(props: PluginProps<GraphQLProviderProps>) {
  const { Prev, links = [], ...rest } = props
  return <Prev {...rest} links={[...links, createStoreLink(rest.router.locale)]} />
}

export const Plugin = MagentoStoreGraphqlProvider
