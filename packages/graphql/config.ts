import { ApolloLink, TypePolicies } from '@apollo/client'
import type { GraphCommerceStorefrontConfig } from '@graphcommerce/next-config'
import { MigrateCache } from './components/GraphQLProvider/migrateCache'

export type ApolloClientConfigInput = {
  storefront: GraphCommerceStorefrontConfig

  /** Additional ApolloLink to add to the chain. */
  links?: ApolloLink[]
  /**
   * This is a list of type policies which are used to influence how cache is handled.
   * https://www.apollographql.com/docs/react/caching/cache-field-behavior/
   */
  policies?: TypePolicies[]
  /**
   * To upgrade the local storage to a new version when the app is updated, but the client isn't
   * yet, we run these migrations.
   */
  migrations?: MigrateCache[]
}

export type ApolloClientConfig = Required<ApolloClientConfigInput>

export function graphqlConfig(config: ApolloClientConfigInput): ApolloClientConfig {
  const { storefront, links = [], policies = [], migrations = [] } = config
  return { storefront, links, policies, migrations }
}
