import { ApolloClient, ApolloQueryResult, NormalizedCacheObject } from '@graphcommerce/graphql'
import { GetStaticPathsResult } from 'next'
import { ProductStaticPathsDocument, ProductStaticPathsQuery } from './ProductStaticPaths.gql'

type Return = GetStaticPathsResult<{ url: string }>

export type ProductTypenames = NonNullable<
  NonNullable<NonNullable<ProductStaticPathsQuery['products']>['items']>[0]
>['__typename']

export async function getProductStaticPaths(
  client: ApolloClient<NormalizedCacheObject>,
  locale: string,
  typename?: ProductTypenames,
) {
  const query = client.query({
    query: ProductStaticPathsDocument,
    variables: {
      currentPage: 1,
      pageSize: 100,
    },
  })
  const pages: Promise<ApolloQueryResult<ProductStaticPathsQuery>>[] = [query]

  const paths: Return['paths'] = (await Promise.all(pages))
    .map((q) => q.data.products?.items)
    .flat(1)
    .filter((item) => (typename ? item?.__typename === typename : true))
    .map((p) => ({ params: { url: `${p?.url_key}` }, locale }))

  return import.meta.graphCommerce.limitSsg ? paths.slice(0, 1) : paths
}
