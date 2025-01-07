import type { GraphCommerceStorefrontConfig } from '@graphcommerce/next-config'
import type { ApolloLink, TypePolicies } from '@apollo/client'
import type { SetRequired } from 'type-fest'
import type { MigrateCache } from './components/GraphQLProvider/migrateCache'
import { RemovePrivateContextDirectivesLink } from './link/RemovePrivateContextDirectivesLink'

export interface PreviewData {}

export type PreviewConfig = {
  preview?: boolean
  previewData?: PreviewData & Record<string, unknown>
}

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
} & PreviewConfig

export type ApolloClientConfig = SetRequired<
  ApolloClientConfigInput,
  'links' | 'policies' | 'migrations'
>

export function graphqlConfig(config: ApolloClientConfigInput): ApolloClientConfig {
  const { storefront, links = [], policies = [], migrations = [], ...rest } = config
  return {
    storefront,
    links: [...links, new RemovePrivateContextDirectivesLink()],
    policies,
    migrations,
    ...rest,
  }
}
