import { GraphQLProviderProps } from '@graphcommerce/graphql'
import type { PluginProps } from '@graphcommerce/next-config'
import { customerLink } from '../link/customerlink'
import { customerTypePolicies, migrateCustomer } from '../typePolicies'

export const component = 'GraphQLProvider'
export const exported = '@graphcommerce/graphql'

function MagentoCustomerGraphqlProvider(props: PluginProps<GraphQLProviderProps>) {
  const { Prev, links = [], policies = [], migrations = [], router, ...rest } = props
  return (
    <Prev
      {...rest}
      router={router}
      links={[...links, customerLink(router)]}
      policies={[...policies, customerTypePolicies]}
      migrations={[...migrations, migrateCustomer]}
    />
  )
}

export const Plugin = MagentoCustomerGraphqlProvider
