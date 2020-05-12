import { GetStaticPaths } from 'next'
import { GetStaticPathsDocument } from 'generated/apollo'
import initApolloClient from 'lib/apollo'

const getStaticPathsFactory: (baseUrl: string, locale: GQLLocale) => GetStaticPaths = (
  baseUrl,
  locale,
) => async () => {
  const apolloClient = initApolloClient()

  const queryResult = await apolloClient.query<
    GQLGetStaticPathsQuery,
    GQLGetStaticPathsQueryVariables
  >({
    query: GetStaticPathsDocument,
    variables: { startsWith: `${baseUrl}`, locale },
  })

  const paths = queryResult.data.pages.map((page) => page.url)
  return {
    paths,
    fallback: false,
  }
}

export default getStaticPathsFactory
