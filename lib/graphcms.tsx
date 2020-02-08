/* eslint-disable react/no-danger */
import { Remarkable } from 'remarkable'
import { ParsedUrlQuery } from 'querystring'
import { initApolloClient } from './apollo'
import {
  GQLGetPageEnQuery,
  GQLGetPageNlQuery,
  GetPageNlDocument,
  GetStaticPathsNlDocument,
  GQLGetPageNlQueryVariables,
  GQLLocale,
  GQLGetStaticPathsNlQuery,
  GQLGetStaticPathsEnQueryVariables,
} from '../graphql/generated'

export type GraphCmsPage = {
  slug: string
  page: NonNullable<GQLGetPageNlQuery['page']> | NonNullable<GQLGetPageEnQuery['page']>
  language: GQLLocale
}

export const getStaticPaths: (baseUrl: string) => Promise<Array<string | ParsedUrlQuery>> = async (
  baseUrl: string,
) => {
  const apolloClient = initApolloClient()
  const { data } = await apolloClient.query<
    GQLGetStaticPathsNlQuery,
    GQLGetStaticPathsEnQueryVariables
  >({
    query: GetStaticPathsNlDocument,
    variables: { startsWith: baseUrl },
  })

  return data.pages.filter(page => page?.url).map(page => `/${page!.url!}`)
}

export type GetStaticProps = (context: {
  params: ParsedUrlQuery
}) => Promise<{ props: GraphCmsPage }>

export const createGetStaticProps = (baseUrl: string): GetStaticProps => async ({ params }) => {
  const apollo = initApolloClient()
  const { data } = await apollo.query<GQLGetPageNlQuery, GQLGetPageNlQueryVariables>({
    query: GetPageNlDocument,
    variables: { url: `${baseUrl}/${params.slug}` },
  })

  const result: { props: GraphCmsPage } = {
    props: {
      language: GQLLocale.Nl,
      slug: params.slug as string,
      page: data.page!,
    },
  }

  if (data.page?.blogPost?.content) {
    const md = new Remarkable({ html: true })
    data.page.blogPost.content = md.render(data.page.blogPost.content)
  }

  return result
}
