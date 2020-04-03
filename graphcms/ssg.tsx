import { initApolloClient } from '../lib/apollo'
import { GraphCmsPageProps } from '.'
import {
  GQLLocale,
  GQLGetStaticPathsQuery,
  GQLGetStaticPathsQueryVariables,
  GetStaticPathsDocument,
  GQLGetPageQuery,
  GQLGetChildrenQuery,
  GQLGetBreadcrumbQuery,
  GQLGetPageQueryVariables,
  GetPageDocument,
  GQLGetChildrenQueryVariables,
  GetChildrenDocument,
  GQLGetBreadcrumbQueryVariables,
  GetBreadcrumbDocument,
} from '../generated/graphql'

function parentUrls(url: string, locale: GQLLocale): string[] {
  let urlParts: string[] = url.split('/').slice(1, -1)
  const parents = []
  while (urlParts.length) {
    parents.push(`/${urlParts.join('/')}`)
    urlParts = urlParts.slice(0, -1)
  }
  if (locale === GQLLocale.Nl && url !== '/') parents.push('/')
  return parents.reverse()
}

export const getPaths: (
  baseUrl: string,
  locale: GQLLocale,
) => Promise<{ paths: string[]; fallback: boolean }> = async (baseUrl, locale) => {
  const apolloClient = initApolloClient()

  const queryResult = await apolloClient.query<
    GQLGetStaticPathsQuery,
    GQLGetStaticPathsQueryVariables
  >({
    query: GetStaticPathsDocument,
    variables: { startsWith: `${baseUrl}`, locale },
  })

  const paths = queryResult.data.pages.map((page) => page!.url!)

  return {
    paths,
    fallback: false,
  }
}

export const getProps = async (url: string, locale: GQLLocale) => {
  const apolloClient = initApolloClient()

  const startsWith = url === '/' ? '/_%' : `${url}/`
  const notStartsWith = `${startsWith}%/`

  const pageQuery = apolloClient.query<GQLGetPageQuery, GQLGetPageQueryVariables>({
    query: GetPageDocument,
    variables: { url, locale },
  })
  const childrenQuery = apolloClient.query<GQLGetChildrenQuery, GQLGetChildrenQueryVariables>({
    query: GetChildrenDocument,
    variables: { startsWith, notStartsWith, locale },
  })

  const breadcrumbQueries = parentUrls(url, locale).map((parentUrl) => {
    return apolloClient.query<GQLGetBreadcrumbQuery, GQLGetBreadcrumbQueryVariables>({
      query: GetBreadcrumbDocument,
      variables: { url: parentUrl, locale },
    })
  })

  const page = (await pageQuery).data.pages.pop()!
  const childs = (await childrenQuery).data.pages
  const breadcrumbs = (await Promise.all(breadcrumbQueries)).map((bq) => bq.data.pages.pop()!)

  // Generate the result object.
  const result: { props: GraphCmsPageProps } = {
    props: { locale, page, breadcrumbs, childs },
  }

  return result
}
