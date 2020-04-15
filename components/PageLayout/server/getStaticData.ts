import initApolloClient from '../../../lib/apollo'
import { GetStaticData } from '../../../lib/staticParams'
import { GetPageLayoutDocument } from '../../../generated/apollo'

const getStaticData: GetStaticData<GQLGetPageLayoutQuery> = async (variables) => {
  const query = initApolloClient().query<GQLGetPageLayoutQuery, GQLGetPortfolioListQueryVariables>({
    query: GetPageLayoutDocument,
    variables,
  })

  return (await query).data
}

export default getStaticData
