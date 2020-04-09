import initApolloClient from '../../../lib/apollo'
import parentUrls from '../parentUrls'
import { GetStaticData } from '../../../lib/staticParams'
import { GetBreadcrumbDocument } from '../../../generated/apollo'

const getStaticData: GetStaticData<GQLGetBreadcrumbQuery> = async (variables) => {
  if (!variables) throw new Error('Please provide params')
  const { url, locale } = variables

  const apolloClient = initApolloClient()
  const query = apolloClient.query<GQLGetBreadcrumbQuery, GQLGetBreadcrumbQueryVariables>({
    query: GetBreadcrumbDocument,
    variables: { urls: [...parentUrls(url, locale), url], locale },
  })

  return (await query).data
}

export default getStaticData
