import type { PageWhereInput } from '@graphcommerce/graphql-mesh'
import type { ApolloClient } from '@apollo/client'
import type { GetStaticPathsResult } from 'next'
import { HygraphStaticPathsDocument } from '../graphql/HygraphStaticPaths.gql'

type Return = GetStaticPathsResult<{ url: string }>

export async function getHygraphStaticPaths(
  client: ApolloClient,
  locale: string,
  options: { pageSize?: number; filter?: PageWhereInput } = {},
) {
  const { pageSize = 100, filter = {} } = options
  const query = client.query({
    query: HygraphStaticPathsDocument,
    variables: { pageSize, where: filter },
  })

  const { data } = await query
  const totalPages = data ? Math.ceil(data.pagesConnection.aggregate.count / pageSize) : 1

  const pages = [query]

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
    .map((q) => q.data?.pages ?? [])
    .flat(1)
    .filter((page): page is NonNullable<typeof page> & { url: string } => !!page?.url)
    .map((page) => ({ params: { url: page.url }, locale }))

  return paths
}
