import { ApolloClient, FetchPolicy } from '@apollo/client'
import { getPreviewData } from './getPreviewData'

export function cachePolicy(
  client: ApolloClient<object>,
  requestedCachePolicy: FetchPolicy,
): FetchPolicy {
  return process.env.NODE_ENV !== 'development' && !getPreviewData(client)?.draftMode
    ? requestedCachePolicy
    : 'network-only'
}

export function cacheFirst(client: ApolloClient<object>) {
  return cachePolicy(client, 'cache-first')
}
