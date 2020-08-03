import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { GQLLocale, GetStaticPathsDocument } from 'generated/graphql'
import { GetStaticPaths } from 'next'

const getStaticPathsFactory: (
  baseUrl: string,
  locale: GQLLocale,
  client: ApolloClient<NormalizedCacheObject>,
) => GetStaticPaths = (baseUrl, locale, client) => async () => {
  const queryResult = await client.query({
    query: GetStaticPathsDocument,
    variables: { startsWith: `${baseUrl}`, locale },
  })

  const paths = queryResult.data?.pages.map((page) => page.url) ?? []
  return {
    paths,
    fallback: false,
  }
}

export default getStaticPathsFactory
