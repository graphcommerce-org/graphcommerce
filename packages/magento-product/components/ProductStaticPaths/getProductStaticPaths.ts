import type { ApolloClient } from '@graphcommerce/graphql'
import { limitSsg } from '@graphcommerce/next-config/config'
import type { GetStaticPathsResult } from 'next'
import { ProductStaticPathsDocument } from './ProductStaticPaths.gql'

type Return = GetStaticPathsResult<{ url: string }>

export type ProductTypenames = NonNullable<
  NonNullable<
    NonNullable<
      Awaited<ReturnType<typeof getProductStaticPaths>> extends Return
        ? Return['paths'][number]
        : never
    >
  >
>

export async function getProductStaticPaths(
  client: ApolloClient,
  locale: string,
  options: { limit?: boolean } = { limit: limitSsg || false },
) {
  const query = client.query({
    query: ProductStaticPathsDocument,
    variables: { currentPage: 1, pageSize: 100 },
  })

  const { data } = await query
  const totalPages = data?.products?.page_info?.total_pages ?? 1

  const pages = [query]

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
    .map((q) => q.data?.products?.items ?? [])
    .flat(1)
    .map((p) => ({ params: { url: `${p?.url_key}` }, locale }))

  return options.limit ? paths.slice(0, 1) : paths
}
