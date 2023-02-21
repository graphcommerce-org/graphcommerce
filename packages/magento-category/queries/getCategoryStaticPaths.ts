import { ApolloClient, NormalizedCacheObject } from '@graphcommerce/graphql'
import { GetStaticPathsResult } from 'next'
import {
  GetCategoryStaticPathsDocument,
  GetCategoryStaticPathsQuery,
} from './GetCategoryStaticPaths.gql'

type StaticPathsResult = GetStaticPathsResult<{ url: string[] }>

const getCategoryStaticPaths = async (
  client: ApolloClient<NormalizedCacheObject>,
  locale: string,
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

  return import.meta.graphCommerce.deployEnvironment !== 'production' ? paths.slice(0, 1) : paths
}

export { getCategoryStaticPaths }
