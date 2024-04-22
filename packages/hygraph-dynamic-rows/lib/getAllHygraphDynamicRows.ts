import type { ApolloClient, NormalizedCacheObject, ApolloQueryResult } from '@apollo/client'
import { AllDynamicRowsDocument, AllDynamicRowsQuery } from '../graphql'

type DynamicRows = AllDynamicRowsQuery['dynamicRows']

export async function getAllHygraphDynamicRows(
  client: ApolloClient<NormalizedCacheObject>,
  options: { pageSize?: number } = {},
) {
  const { pageSize = 100 } = options
  const query = client.query({
    query: AllDynamicRowsDocument,
    variables: { first: pageSize },
    fetchPolicy: process.env.NODE_ENV !== 'development' ? 'cache-first' : undefined,
  })

  const pages: Promise<ApolloQueryResult<AllDynamicRowsQuery>>[] = [query]

  const { data } = await query
  const totalPages = Math.ceil(data.pagesConnection.aggregate.count / pageSize) ?? 1
  if (totalPages > 1) {
    for (let i = 2; i <= totalPages; i++) {
      pages.push(
        client.query({
          query: AllDynamicRowsDocument,
          variables: { first: pageSize, skip: pageSize * (i - 1) },
          fetchPolicy: process.env.NODE_ENV !== 'development' ? 'cache-first' : undefined,
        }),
      )
    }
  }

  const dynamicRows: DynamicRows = (await Promise.all(pages))
    .map((q) => q.data.dynamicRows)
    .flat(1)
    .map((row) => ({
      id: row.id,
      conditions: row.conditions,
    }))

  return dynamicRows
}
