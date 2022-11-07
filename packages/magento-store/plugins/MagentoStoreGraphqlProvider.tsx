/* eslint-disable import/no-mutable-exports */
import { GraphQLProviderProps } from '@graphcommerce/graphql'
import type { PluginProps } from '@graphcommerce/next-config'
import { createStoreLink } from '../link/createStoreLink'

export const component = 'GraphQLProvider'
export const exported = '@graphcommerce/graphql'

function MagentoStoreGraphqlProvider(props: PluginProps<GraphQLProviderProps>) {
  const { Prev, links = [], ...prev } = props
  return <Prev {...prev} links={[...links, createStoreLink(prev.router.locale)]} />
}

export const Plugin = MagentoStoreGraphqlProvider
