import initApolloClient from '../../../lib/apollo'
import { GetStaticData } from '../../../lib/staticParams'
import { GetPortfolioListDocument } from '../../../generated/apollo'

const getStaticData: GetStaticData<GQLGetPortfolioListQuery> = async ({ url, locale }) => {
  const query = initApolloClient().query<GQLGetPortfolioListQuery, GQLGetPageLayoutQueryVariables>({
    query: GetPortfolioListDocument,
    variables: { url: `${url}/`, locale },
  })

  return (await query).data
}

export default getStaticData
