import { ApolloClient, ApolloQueryResult, NormalizedCacheObject } from '@apollo/client'
import { GetStaticPathsResult } from 'next'
import { ProductStaticPathsDocument, ProductStaticPathsQuery } from './ProductStaticPaths.gql'

type Return = GetStaticPathsResult<{ url: string }>

type ProductTypenames = NonNullable<
  NonNullable<NonNullable<ProductStaticPathsQuery['products']>['items']>[0]
>['__typename']

const getProductStaticPaths = async (
  client: ApolloClient<NormalizedCacheObject>,
  locale: string,
  typename: ProductTypenames,
) => {
  const query = client.query({
    query: ProductStaticPathsDocument,
    variables: { currentPage: 1 },
  })
  const pages: Promise<ApolloQueryResult<ProductStaticPathsQuery>>[] = [query]

  const totalPages = (await query).data?.products?.page_info?.total_pages ?? 0
  if (totalPages > 1) {
    const pageNrs = Array.from({ length: totalPages - 1 }, (_, i) => i + 2)
    pageNrs.forEach((currentPage) => {
      pages.push(client.query({ query: ProductStaticPathsDocument, variables: { currentPage } }))
    })
  }
  const paths: Return['paths'] = (await Promise.all(pages))
    .map((q) => q.data.products?.items)
    .flat(1)
    .filter((item) => item?.__typename === typename)
    .map((p) => ({ params: { url: `${p?.url_key}` }, locale }))

  return paths
}

export default getProductStaticPaths
