import { GraphQLProviderProps } from '@graphcommerce/graphql'
import type { PluginProps } from '@graphcommerce/next-config'
import { compareTypePolicies } from '../components/CompareProducts/typePolicies'

export const component = 'GraphQLProvider'
export const exported = '@graphcommerce/graphql'

function MagentoCompareListGraphqlProvider(props: PluginProps<GraphQLProviderProps>) {
  const {
    Prev,
    policies = [],
    // migrations = [],
    ...rest
  } = props
  return (
    <Prev
      {...rest}
      policies={[...policies, compareTypePolicies]}
      // migrations={[...migrations, migrateCart]}
    />
  )
}

export const Plugin = MagentoCompareListGraphqlProvider
