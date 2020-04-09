import initApolloClient from '../../../lib/apollo'
import { GetStaticData } from '../../../lib/staticParams'
import { GetPageLayoutDocument } from '../../../generated/apollo'

const getStaticProps: GetStaticData<GQLGetPageLayoutQuery> = async (variables) => {
  if (!variables) throw new Error('Please provide params')

  const apolloClient = initApolloClient()
  const query = apolloClient.query<GQLGetPageLayoutQuery, GQLGetPageLayoutQueryVariables>({
    query: GetPageLayoutDocument,
    variables,
  })

  return (await query).data
}

export default getStaticProps
