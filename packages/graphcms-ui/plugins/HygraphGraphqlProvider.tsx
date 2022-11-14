import { GraphQLProviderProps } from '@graphcommerce/graphql'
import type { PluginProps } from '@graphcommerce/next-config'
import { createHygraphLink } from '../links/createHygraphLink'

export const component = 'GraphQLProvider'
export const exported = '@graphcommerce/graphql'

function HygraphGraphqlProvider(props: PluginProps<GraphQLProviderProps>) {
  const { Prev, links = [], ...rest } = props
  return <Prev {...rest} links={[...links, createHygraphLink(rest.router.locale)]} />
}

export const Plugin = HygraphGraphqlProvider
