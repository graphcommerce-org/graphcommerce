import type { GraphQLProviderProps } from '@graphcommerce/graphql'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { compareTypePolicies } from '../typePolicies'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/graphql',
  ifConfig: 'compare',
}

export function GraphQLProvider(props: PluginProps<GraphQLProviderProps>) {
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
