import initApolloClient from '../../../lib/apollo'
import { GetStaticData } from '../../../lib/staticParams'
import { GetBlogListDocument } from '../../../generated/apollo'

const getStaticData: GetStaticData<GQLGetBlogListQuery> = async (variables) => {
  const apolloClient = initApolloClient()
  const query = apolloClient.query<GQLGetBlogListQuery, GQLGetBlogListQueryVariables>({
    query: GetBlogListDocument,
    variables,
  })

  return (await query).data
}

export default getStaticData
