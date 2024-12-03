import type { ApolloClient, ApolloQueryResult, NormalizedCacheObject } from '@graphcommerce/graphql'
import type { GetStaticPathsResult } from 'next'
import type { ProductStaticPathsQuery } from './ProductStaticPaths.gql'
import { ProductStaticPathsDocument } from './ProductStaticPaths.gql'

type Return = GetStaticPathsResult<{ url: string }>

export type ProductTypenames = NonNullable<
  NonNullable<NonNullable<ProductStaticPathsQuery['products']>['items']>[0]
>['__typename']

export async function getProductStaticPaths(
  client: ApolloClient<NormalizedCacheObject>,
  locale: string,
  options: { limit?: boolean } = { limit: import.meta.graphCommerce.limitSsg || false },
) {
  const query = client.query({
    query: ProductStaticPathsDocument,
    variables: { currentPage: 1, pageSize: 100 },
  })
  const pages: Promise<ApolloQueryResult<ProductStaticPathsQuery>>[] = [query]

  const { data } = await query
  const totalPages = data.products?.page_info?.total_pages ?? 1

  if (totalPages > 1 && options.limit !== true) {
    for (let i = 2; i <= totalPages; i++) {
      pages.push(
        client.query({
          query: ProductStaticPathsDocument,
          variables: { currentPage: i, pageSize: 100 },
        }),
      )
    }
  }

  const paths: Return['paths'] = (await Promise.all(pages))
    .map((q) => q.data.products?.items)
    .flat(1)
    .map((p) => ({ params: { url: `${p?.url_key}` }, locale }))

  return options.limit ? paths.slice(0, 1) : paths
}
