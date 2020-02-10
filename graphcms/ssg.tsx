/* eslint-disable react/no-danger */
import { ApolloQueryResult } from 'apollo-client'
// @ts-ignore
import { Remarkable } from 'remarkable'
import { initApolloClient } from '../lib/apollo'
import { GraphCmsPage } from '.'
import {
  GQLLocale,
  GQLGetStaticPathsNlQuery,
  GQLGetStaticPathsEnQuery,
  GQLGetStaticPathsNlQueryVariables,
  GetStaticPathsNlDocument,
  GQLGetStaticPathsEnQueryVariables,
  GetStaticPathsEnDocument,
  GQLGetPageNlQuery,
  GQLGetPageEnQuery,
  GQLGetChildrenNlQuery,
  GQLGetChildrenEnQuery,
  GQLGetBreadcrumbNlQuery,
  GQLGetBreadcrumbEnQuery,
  GQLGetPageNlQueryVariables,
  GetPageNlDocument,
  GQLGetChildrenNlQueryVariables,
  GetChildrenNlDocument,
  GQLGetBreadcrumbNlQueryVariables,
  GetBreadcrumbNlDocument,
  GQLGetPageEnQueryVariables,
  GetPageEnDocument,
  GQLGetChildrenEnQueryVariables,
  GetChildrenEnDocument,
  GQLGetBreadcrumbEnQueryVariables,
  GetBreadcrumbEnDocument,
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

export const getStaticPaths: (
  baseUrl: string,
  locale: GQLLocale,
) => Promise<Array<string>> = async (baseUrl, locale) => {
  const apolloClient = initApolloClient()

  let queryResult
  switch (locale) {
    case GQLLocale.Nl:
      queryResult = await apolloClient.query<
        GQLGetStaticPathsNlQuery,
        GQLGetStaticPathsNlQueryVariables
      >({ query: GetStaticPathsNlDocument, variables: { startsWith: `${baseUrl}` } })

      return queryResult.data.pages.map(page => page!.url!)
    case GQLLocale.En:
      queryResult = await apolloClient.query<
        GQLGetStaticPathsEnQuery,
        GQLGetStaticPathsEnQueryVariables
      >({ query: GetStaticPathsEnDocument, variables: { startsWith: `${baseUrl}` } })

      return queryResult.data.pages.map(page => page!.url!)
  }
}

export const getProps = async (url: string, locale: GQLLocale) => {
  const apolloClient = initApolloClient()

  let pageQuery: Promise<ApolloQueryResult<GQLGetPageNlQuery | GQLGetPageEnQuery>>
  let childrenQuery: Promise<ApolloQueryResult<GQLGetChildrenNlQuery | GQLGetChildrenEnQuery>>
  let breadcrumbQueries: Array<Promise<
    ApolloQueryResult<GQLGetBreadcrumbNlQuery | GQLGetBreadcrumbEnQuery>
  >>

  const startsWith = url === '/' ? url : `${url}/`
  const notStartsWith = `${startsWith}%/`

  // Fetch data per locale
  switch (locale) {
    case GQLLocale.Nl:
      pageQuery = apolloClient.query<GQLGetPageNlQuery, GQLGetPageNlQueryVariables>({
        query: GetPageNlDocument,
        variables: { url },
      })
      childrenQuery = apolloClient.query<GQLGetChildrenNlQuery, GQLGetChildrenNlQueryVariables>({
        query: GetChildrenNlDocument,
        variables: { startsWith, notStartsWith },
      })
      breadcrumbQueries = parentUrls(url, locale).map(parentUrl => {
        return apolloClient.query<GQLGetBreadcrumbNlQuery, GQLGetBreadcrumbNlQueryVariables>({
          query: GetBreadcrumbNlDocument,
          variables: { url: parentUrl },
        })
      })
      break
    case GQLLocale.En:
      pageQuery = apolloClient.query<GQLGetPageEnQuery, GQLGetPageEnQueryVariables>({
        query: GetPageEnDocument,
        variables: { url },
      })
      childrenQuery = apolloClient.query<GQLGetChildrenEnQuery, GQLGetChildrenEnQueryVariables>({
        query: GetChildrenEnDocument,
        variables: { startsWith, notStartsWith },
      })
      breadcrumbQueries = parentUrls(url, locale).map(parentUrl => {
        return apolloClient.query<GQLGetBreadcrumbEnQuery, GQLGetBreadcrumbEnQueryVariables>({
          query: GetBreadcrumbEnDocument,
          variables: { url: parentUrl },
        })
      })
      break
  }

  const { page } = (await pageQuery).data
  const childs = (await childrenQuery).data.pages
  const breadcrumbs = (await Promise.all(breadcrumbQueries)).map(
    breadcrumbQuery => breadcrumbQuery.data.page,
  )

  // Generate the result object.
  const result: { props: GraphCmsPage } = {
    props: { locale, page, breadcrumbs, childs },
  }

  // Render markdown content when required
  if (result.props.page?.blogPost?.content) {
    const md = new Remarkable({ html: true })
    result.props.page.blogPost.content = md.render(result.props.page.blogPost.content)
  }

  return result
}
