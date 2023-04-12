import { GraphQLProviderProps } from '@graphcommerce/graphql'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { compareTypePolicies } from '../typePolicies'

export const component = 'GraphQLProvider'
export const exported = '@graphcommerce/graphql'
export const ifConfig: IfConfig = 'compare'

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
