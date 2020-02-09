/* eslint-disable react/no-danger */
import { ApolloQueryResult } from 'apollo-client'
// @ts-ignore
import { Remarkable } from 'remarkable'
import { ParsedUrlQuery } from 'querystring'
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
} from '../generated/graphql'

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

  let queryResult: ApolloQueryResult<GQLGetPageNlQuery | GQLGetPageEnQuery>
  // Fetch data per locale
  switch (locale) {
    case GQLLocale.Nl:
      queryResult = await apolloClient.query<GQLGetPageNlQuery, GQLGetPageNlQueryVariables>({
        query: GetPageNlDocument,
        variables: { url },
      })
      break
    case GQLLocale.En:
      queryResult = await apolloClient.query<GQLGetPageEnQuery, GQLGetPageEnQueryVariables>({
        query: GetPageEnDocument,
        variables: { url },
      })
      break
  }

  // Generate the result object.
  const result: { props: GraphCmsPage } = {
    props: { locale, page: queryResult.data.page! },
  }

  // Render markdown content when required
  if (result.props.page.blogPost?.content) {
    const md = new Remarkable({ html: true })
    result.props.page.blogPost.content = md.render(result.props.page.blogPost.content)
  }

  return result
}
