import { GraphQLProviderProps } from '@graphcommerce/graphql'
import type { PluginProps } from '@graphcommerce/next-config'
import { useMemo } from 'react'
import { createHygraphLink } from '../links/createHygraphLink'

export const component = 'GraphQLProvider'
export const exported = '@graphcommerce/graphql'

function HygraphGraphqlProvider(props: PluginProps<GraphQLProviderProps>) {
  const { Prev, links = [], ...rest } = props

  const hygraphLink = useMemo(() => createHygraphLink(rest.router.locale), [rest.router.locale])
  return <Prev {...rest} links={[...links, hygraphLink]} />
}

export const Plugin = HygraphGraphqlProvider
