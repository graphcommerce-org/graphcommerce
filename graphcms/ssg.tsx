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

export const getStaticPaths: (
  baseUrl: string,
  locale: GQLLocale,
) => Promise<Array<string | ParsedUrlQuery>> = async (baseUrl, locale) => {
  const apolloClient = initApolloClient()

  let queryResult: ApolloQueryResult<GQLGetStaticPathsNlQuery | GQLGetStaticPathsEnQuery>
  switch (locale) {
    case GQLLocale.Nl:
      queryResult = await apolloClient.query<
        GQLGetStaticPathsNlQuery,
        GQLGetStaticPathsNlQueryVariables
      >({ query: GetStaticPathsNlDocument, variables: { startsWith: `${baseUrl}/` } })
      break
    case GQLLocale.En:
      queryResult = await apolloClient.query<
        GQLGetStaticPathsEnQuery,
        GQLGetStaticPathsEnQueryVariables
      >({ query: GetStaticPathsEnDocument, variables: { startsWith: `${baseUrl}/` } })
      break
  }

  return queryResult.data.pages.filter(page => page?.url).map(page => `/${page!.url!}`)
}

export type GetStaticProps = (context: {
  params: ParsedUrlQuery
}) => Promise<{ props: GraphCmsPage }>

export const createGetStaticProps = (baseUrl: string, locale: GQLLocale): GetStaticProps => async ({
  params,
}) => {
  const apolloClient = initApolloClient()

  let queryResult: ApolloQueryResult<GQLGetPageNlQuery | GQLGetPageEnQuery>
  switch (locale) {
    case GQLLocale.Nl:
      queryResult = await apolloClient.query<GQLGetPageNlQuery, GQLGetPageNlQueryVariables>({
        query: GetPageNlDocument,
        variables: { url: `${baseUrl}/${params.slug}` },
      })
      break
    case GQLLocale.En:
      queryResult = await apolloClient.query<GQLGetPageEnQuery, GQLGetPageEnQueryVariables>({
        query: GetPageEnDocument,
        variables: { url: `${baseUrl}/${params.slug}` },
      })
      break
  }

  // Generate the result object.
  const result = {
    props: { locale, page: queryResult.data.page! },
  }

  // Render markdown content when required
  if (result.props.page.blogPost?.content) {
    const md = new Remarkable({ html: true })
    result.props.page.blogPost.content = md.render(result.props.page.blogPost.content)
  }

  return result
}
