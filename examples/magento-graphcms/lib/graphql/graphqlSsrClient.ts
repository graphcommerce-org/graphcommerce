import { NormalizedCacheObject, ApolloClient } from '@graphcommerce/graphql'
import { defaultLocale } from '@graphcommerce/magento-store'
import { apolloClient } from './GraphQLProvider'

const sharedClient: {
  [locale: string]: ApolloClient<NormalizedCacheObject>
} = {}

export function graphqlSsrClient(locale?: string | undefined) {
  return apolloClient(locale)
}

/**
 * Any queries made with the graphqlSharedClient will be send to the browser and injected in the
 * browser's cache.
 */
export function graphqlSharedClient(locale: string = defaultLocale()) {
  // Create a client if it doesn't exist for the locale.
  if (!sharedClient[locale]) sharedClient[locale] = apolloClient(locale)
  return sharedClient[locale]
}
