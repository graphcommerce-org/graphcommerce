import { GraphQLProviderProps } from '@graphcommerce/graphql'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import React from 'react'
import { customerGroupIdLink } from '@graphcommerce/algolia-mesh/link/customerGroupIdLink'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/graphql',
  ifConfig: 'customerGroupIdEnable',
}

export function GraphQLProvider(props: PluginProps<GraphQLProviderProps>) {
  const { Prev, links = [], ...rest } = props
  return <Prev {...rest} links={[...links, customerGroupIdLink]} />
}
