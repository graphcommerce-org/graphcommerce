/* eslint-disable import/no-mutable-exports */
import { GraphQLProviderProps } from '@graphcommerce/graphql'
import type { PluginProps } from '@graphcommerce/next-config'
import { createHygraphLink } from '../links/createHygraphLink'

export const component = 'GraphQLProvider'
export const exported = '@graphcommerce/graphql'

function HygraphGraphqlProvider(props: PluginProps<GraphQLProviderProps>) {
  const { Prev, links = [], ...prev } = props
  return <Prev {...prev} links={[...links, createHygraphLink(prev.router.locale)]} />
}

export const Plugin = HygraphGraphqlProvider
