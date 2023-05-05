import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import { storefrontConfig } from '@graphcommerce/next-ui/server'
import { GetStaticPathsResult } from 'next'
import {
  GetCategoryStaticPathsDocument,
  GetCategoryStaticPathsQuery,
} from './GetCategoryStaticPaths.gql'

type StaticPathsResult = GetStaticPathsResult<{ url: string[] }>

const getCategoryStaticPaths = async () => {
  const { data } = await graphqlQuery(GetCategoryStaticPathsDocument)
  const paths: StaticPathsResult['paths'] = []

  type Category = NonNullable<NonNullable<GetCategoryStaticPathsQuery['categories']>['items']>[0]
  const add = (cat: Category) => {
    if (cat?.url_path)
      paths.push({ params: { url: cat.url_path.split('/') }, locale: storefrontConfig().locale })
    if (cat?.children) cat.children.forEach(add)
  }
  data.categories?.items?.forEach(add)

  return paths
}

export { getCategoryStaticPaths }
