import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { GetStaticPathsResult } from 'next'
import { GetCategoryStaticPathsDocument } from './GetCategoryStaticPaths.gql'

type StaticPathsResult = GetStaticPathsResult<{ url: string[] }>

const getCategoryStaticPaths = async (
  client: ApolloClient<NormalizedCacheObject>,
): Promise<StaticPathsResult> => {
  const { data } = await client.query({ query: GetCategoryStaticPathsDocument })

  const paths: StaticPathsResult['paths'] =
    data.categories?.items
      ?.filter((category) => category?.url_path)
      .map((category) => ({
        params: { url: `${category?.url_path}${category?.url_suffix}`.split('/') },
      })) ?? []

  return { paths, fallback: 'blocking' }
}

export default getCategoryStaticPaths
