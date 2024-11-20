import type { ApolloClient, NormalizedCacheObject } from '@graphcommerce/graphql'
import type { GetStaticPathsResult } from 'next'
import type { GetCategoryStaticPathsQuery } from './GetCategoryStaticPaths.gql'
import { GetCategoryStaticPathsDocument } from './GetCategoryStaticPaths.gql'

type StaticPathsResult = GetStaticPathsResult<{ url: string[] }>

const getCategoryStaticPaths = async (
  client: ApolloClient<NormalizedCacheObject>,
  locale: string,
  options: { limit?: boolean } = { limit: import.meta.graphCommerce.limitSsg || false },
) => {
  const { data } = await client.query({
    query: GetCategoryStaticPathsDocument,
  })

  const paths: StaticPathsResult['paths'] = []

  type Category = NonNullable<NonNullable<GetCategoryStaticPathsQuery['categories']>['items']>[0]
  const add = (cat: Category) => {
    if (cat?.url_path) paths.push({ params: { url: cat.url_path.split('/') }, locale })
    if (cat?.children) cat.children.forEach(add)
  }
  data.categories?.items?.forEach(add)

  return options.limit ? paths.slice(0, 1) : paths
}

export { getCategoryStaticPaths }
