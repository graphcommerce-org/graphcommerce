import initApolloClient from '../../../lib/apollo'
import { GetStaticData } from '../../../lib/staticParams'
import { GetPageLayoutDocument } from '../../../generated/apollo'
import { PageLayoutProps } from '..'

const getStaticData: GetStaticData<PageLayoutProps> = async (variables) => {
  const { data } = await initApolloClient().query<
    GQLGetPageLayoutQuery,
    GQLGetPortfolioListQueryVariables
  >({
    query: GetPageLayoutDocument,
    variables,
  })

  const {
    pages: [page],
    ...rest
  } = data

  return { ...rest, page }
}

export default getStaticData
