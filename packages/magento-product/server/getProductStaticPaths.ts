import { ApolloQueryResult } from '@graphcommerce/graphql'
import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import { GetStaticPathsResult } from 'next'
import { ProductStaticPathsDocument, ProductStaticPathsQuery } from './ProductStaticPaths.gql'

type Return = GetStaticPathsResult<{ url: string }>

export type ProductTypenames = NonNullable<
  NonNullable<NonNullable<ProductStaticPathsQuery['products']>['items']>[0]
>['__typename']

export async function getProductStaticPaths(params: { locale: string }) {
  const query = graphqlQuery(ProductStaticPathsDocument, {
    variables: { currentPage: 1, pageSize: 100 },
  })
  const pages: Promise<ApolloQueryResult<ProductStaticPathsQuery>>[] = [query]

  const paths: Return['paths'] = (await Promise.all(pages))
    .map((q) => q.data.products?.items)
    .flat(1)
    .map((p) => ({
      params: { url: `${p?.url_key}` },
      locale: params.locale,
    }))

  return paths
}
