import type { ApolloClient, FetchPolicy } from '@apollo/client'
import { getPreviewData } from './getPreviewData'

export function cachePolicy(
  client: ApolloClient<object>,
  requestedCachePolicy: FetchPolicy,
): FetchPolicy {
  return process.env.NODE_ENV !== 'development' && !getPreviewData(client)?.preview
    ? requestedCachePolicy
    : 'network-only'
}

/**
 * @deprecated Should not be used anymore. Use the @cacheControl directive on the GraphQL query
 *   instead.
 */
export function cacheFirst(client: ApolloClient<object>) {
  return cachePolicy(client, 'cache-first')
}
