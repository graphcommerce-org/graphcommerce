import {
  GQLGetBreadcrumbQuery,
  GQLGetBreadcrumbQueryVariables,
  GetBreadcrumbDocument,
} from '../../../generated/graphql'
import initApolloClient from '../../../lib/apollo'
import { GetStaticProps } from '../../../lib/getStaticProps'
import parentUrls from '../parentUrls'

const getStaticProps: GetStaticProps<GQLGetBreadcrumbQuery> = async ({ params }) => {
  if (!params) throw new Error('Please provide params')
  const { url, locale } = params

  const apolloClient = initApolloClient()
  const query = apolloClient.query<GQLGetBreadcrumbQuery, GQLGetBreadcrumbQueryVariables>({
    query: GetBreadcrumbDocument,
    variables: { urls: [...parentUrls(url, locale), url], locale },
  })

  return { props: (await query).data }
}

export default getStaticProps
