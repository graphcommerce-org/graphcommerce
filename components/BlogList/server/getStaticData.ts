import initApolloClient from '../../../lib/apollo'
import { GetStaticData } from '../../../lib/staticParams'
import { GetBlogListDocument } from '../../../generated/apollo'

const getStaticData: GetStaticData<GQLGetBlogListQuery> = async (variables) => {
  const apolloClient = initApolloClient()
  const { data } = await apolloClient.query<GQLGetBlogListQuery, GQLGetBlogListQueryVariables>({
    query: GetBlogListDocument,
    variables: { url: `${variables.url}/`, locale: variables.locale },
  })
  return data
}

export default getStaticData
