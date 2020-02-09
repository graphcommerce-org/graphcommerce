/* eslint-disable react/no-danger */
import { ApolloQueryResult } from 'apollo-client'
// @ts-ignore
import { Remarkable } from 'remarkable'
import { initApolloClient } from '../lib/apollo'
import { GraphCmsPage } from '.'
import {
  GQLGetPageEnQuery,
  GQLGetPageEnQueryVariables,
  GQLGetPageNlQuery,
  GQLGetPageNlQueryVariables,
  GQLGetStaticPathsEnQuery,
  GQLGetStaticPathsEnQueryVariables,
  GQLGetStaticPathsNlQuery,
  GQLGetStaticPathsNlQueryVariables,
  GQLLocale,
  GetPageEnDocument,
  GetPageNlDocument,
  GetStaticPathsEnDocument,
  GetStaticPathsNlDocument,
  GQLGetChildrenNlQuery,
  GQLGetChildrenNlQueryVariables,
  GetChildrenNlDocument,
  GQLGetBreadcrumbEnQuery,
  GQLGetBreadcrumbEnQueryVariables,
  GetBreadcrumbEnDocument,
  GQLGetBreadcrumbNlQuery,
  GQLGetBreadcrumbNlQueryVariables,
  GQLGetChildrenEnQuery,
  GQLGetChildrenEnQueryVariables,
  GetPageNlQueryResult,
  GetChildrenNlQueryResult,
  GetBreadcrumbNlQueryResult,
  GetChildrenEnDocument,
  GetBreadcrumbNlDocument,
} from '../generated/graphql'

function parentUrls(url: string, locale: GQLLocale): string[] {
  let urlParts: string[] = url.split('/').slice(0, -1)
  const parents = []
  while (urlParts.length) {
    parents.push(urlParts.join('/'))
    urlParts = urlParts.slice(0, -1)
  }
  if (locale === GQLLocale.Nl) parents.push('/')
  return parents.reverse()
}

export const handleRootUrl = (url: string) => (url === '/' ? url : `/${url}`)

export const getStaticPaths: (
  baseUrl: string,
  locale: GQLLocale,
) => Promise<Array<string>> = async (baseUrl, locale) => {
  const apolloClient = initApolloClient()

  let queryResult: ApolloQueryResult<GQLGetStaticPathsNlQuery | GQLGetStaticPathsEnQuery>
  switch (locale) {
    case GQLLocale.Nl:
      queryResult = await apolloClient.query<
        GQLGetStaticPathsNlQuery,
        GQLGetStaticPathsNlQueryVariables
      >({ query: GetStaticPathsNlDocument, variables: { startsWith: `${baseUrl}` } })
      break
    case GQLLocale.En:
      queryResult = await apolloClient.query<
        GQLGetStaticPathsEnQuery,
        GQLGetStaticPathsEnQueryVariables
      >({ query: GetStaticPathsEnDocument, variables: { startsWith: `${baseUrl}` } })
      break
  }

  return queryResult.data.pages.map(page => handleRootUrl(page!.url!))
}

export const getProps = async (url: string, locale: GQLLocale) => {
  const apolloClient = initApolloClient()

  let pageQuery: Promise<ApolloQueryResult<GQLGetPageNlQuery | GQLGetPageEnQuery>>
  let childrenQuery: Promise<ApolloQueryResult<GQLGetChildrenNlQuery | GQLGetChildrenEnQuery>>
  let breadcrumbQueries: Array<Promise<
    ApolloQueryResult<GQLGetBreadcrumbNlQuery | GQLGetBreadcrumbEnQuery>
  >>
  // Fetch data per locale
  switch (locale) {
    case GQLLocale.Nl:
      pageQuery = apolloClient.query<GQLGetPageNlQuery, GQLGetPageNlQueryVariables>({
        query: GetPageNlDocument,
        variables: { url },
      })
      childrenQuery = apolloClient.query<GQLGetChildrenNlQuery, GQLGetChildrenNlQueryVariables>({
        query: GetChildrenNlDocument,
        variables: { startsWith: `${url}/` },
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
        variables: { startsWith: `${url}/` },
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
