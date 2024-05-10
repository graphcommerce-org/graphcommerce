import type { ApolloClient, NormalizedCacheObject, ApolloQueryResult } from '@apollo/client'
import { HygraphAllPagesDocument, HygraphAllPagesQuery } from '../graphql'

type Urls = { url: string }

export async function getAllHygraphPages(
  client: ApolloClient<NormalizedCacheObject>,
  options: { pageSize?: number } = {},
) {
  const { pageSize = 100 } = options
  const query = client.query({
    query: HygraphAllPagesDocument,
    variables: { first: pageSize },
    fetchPolicy: process.env.NODE_ENV !== 'development' ? 'cache-first' : undefined,
  })
  const pages: Promise<ApolloQueryResult<HygraphAllPagesQuery>>[] = [query]

  const { data } = await query
  const totalPages = Math.ceil(data.pagesConnection.aggregate.count / pageSize) ?? 1

  if (totalPages > 1) {
    for (let i = 2; i <= totalPages; i++) {
      pages.push(
        client.query({
          query: HygraphAllPagesDocument,
          variables: { first: pageSize, skip: pageSize * (i - 1) },
          fetchPolicy: process.env.NODE_ENV !== 'development' ? 'cache-first' : undefined,
        }),
      )
    }
  }

  const paths: Urls[] = (await Promise.all(pages))
    .map((q) => q.data.pages)
    .flat(1)
    .map((page) => ({
      url: page.url,
    }))

  return paths
}
