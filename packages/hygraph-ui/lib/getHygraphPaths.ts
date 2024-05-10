import { ApolloClient, NormalizedCacheObject, ApolloQueryResult } from '@apollo/client'
import type { PageWhereInput } from '@graphcommerce/graphql-mesh'
import { GetStaticPathsResult } from 'next'
import {
  HygraphStaticPathsDocument,
  HygraphStaticPathsQuery,
} from '../graphql/HygraphStaticPaths.gql'

type Return = GetStaticPathsResult<{ url: string }>

export async function getHygraphStaticPaths(
  client: ApolloClient<NormalizedCacheObject>,
  locale: string,
  options: { pageSize?: number; filter?: PageWhereInput } = {},
) {
  const { pageSize = 100, filter = {} } = options
  const query = client.query({
    query: HygraphStaticPathsDocument,
    variables: { pageSize, where: filter },
  })
  const pages: Promise<ApolloQueryResult<HygraphStaticPathsQuery>>[] = [query]

  const { data } = await query
  const totalPages = Math.ceil(data.pagesConnection.aggregate.count / pageSize) ?? 1

  if (totalPages > 1) {
    for (let i = 2; i <= totalPages; i++) {
      pages.push(
        client.query({
          query: HygraphStaticPathsDocument,
          variables: { pageSize, skip: pageSize * (i - 1), where: filter },
        }),
      )
    }
  }

  const paths: Return['paths'] = (await Promise.all(pages))
    .map((q) => q.data.pages)
    .flat(1)
    .map((page) => ({ params: page, locale }))

  return paths
}
