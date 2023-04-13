'use client'

import { GraphQLProviderProps } from '@graphcommerce/graphql'
import type { PluginProps } from '@graphcommerce/next-config'
import { cartErrorLink } from '../link/createCartErrorLink'
import { cartTypePolicies, migrateCart } from '../typePolicies'

export const component = 'GraphQLProvider'
export const exported = '@graphcommerce/graphql'

function MagentoCartGraphqlProvider(props: PluginProps<GraphQLProviderProps>) {
  const { Prev, links = [], policies = [], migrations = [], ...rest } = props
  return (
    <Prev
      {...rest}
      links={[...links, cartErrorLink]}
      policies={[...policies, cartTypePolicies]}
      migrations={[...migrations, migrateCart]}
    />
  )
}

export const Plugin = MagentoCartGraphqlProvider
