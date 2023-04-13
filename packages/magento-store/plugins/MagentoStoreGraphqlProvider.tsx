import { GraphQLProviderProps } from '@graphcommerce/graphql'
import type { PluginProps } from '@graphcommerce/next-config'
import { useMemo } from 'react'
import { createStoreLink } from '../link/createStoreLink'

export const component = 'GraphQLProvider'
export const exported = '@graphcommerce/graphql'

function MagentoStoreGraphqlProvider(props: PluginProps<GraphQLProviderProps>) {
  const { Prev, links = [], ...rest } = props
  const storeLink = useMemo(() => createStoreLink(rest.locale), [rest.locale])
  return <Prev {...rest} links={[...links, storeLink]} />
}

export const Plugin = MagentoStoreGraphqlProvider
