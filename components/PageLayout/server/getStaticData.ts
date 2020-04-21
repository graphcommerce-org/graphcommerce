import initApolloClient from '../../../lib/apollo'
import { GetStaticData } from '../../../lib/staticParams'
import { GetPageLayoutDocument } from '../../../generated/apollo'
import { PageLayoutProps } from '..'

const getStaticData: GetStaticData<PageLayoutProps> = async (variables) => {
  const { getStaticProps } = await import('../../ContentRenderer/ContentRenderer')
  const { data } = await initApolloClient().query<
    GQLGetPageLayoutQuery,
    GQLGetPortfolioListQueryVariables
  >({ query: GetPageLayoutDocument, variables })

  const { pages, ...rest } = data
  const page = pages[0]

  page.content = await getStaticProps(page.content)
  return { ...rest, page: pages[0] }
}

export default getStaticData
