import { GraphQLProviderProps } from '@graphcommerce/graphql'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { cartErrorLink } from '../link/createCartErrorLink'
import { cartTypePolicies, migrateCart } from '../typePolicies'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/graphql',
}

export function GraphQLProvider(props: PluginProps<GraphQLProviderProps>) {
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
