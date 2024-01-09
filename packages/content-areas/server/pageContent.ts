import { ApolloClient, NormalizedCacheObject } from '@graphcommerce/graphql'
import { PageContent } from '../types'

export function pageContent(
  client: ApolloClient<NormalizedCacheObject>,
  url: string,
  additionalProperties?: Promise<object> | object,
  cached = false,
): Promise<PageContent> {
  return Promise.resolve({
    metadata: null,
  })
}
