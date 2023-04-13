'use client'

import { GraphQLProviderProps } from '@graphcommerce/graphql'
import type { PluginProps } from '@graphcommerce/next-config'
import { customerTokenLink } from '../link/createCustomerTokenLink'
import { customerTypePolicies, migrateCustomer } from '../typePolicies'

export const component = 'GraphQLProvider'
export const exported = '@graphcommerce/graphql'

function MagentoCustomerGraphqlProvider(props: PluginProps<GraphQLProviderProps>) {
  const { Prev, links = [], policies = [], migrations = [], ...rest } = props
  return (
    <Prev
      {...rest}
      links={[...links, customerTokenLink]}
      policies={[...policies, customerTypePolicies]}
      migrations={[...migrations, migrateCustomer]}
    />
  )
}

export const Plugin = MagentoCustomerGraphqlProvider
