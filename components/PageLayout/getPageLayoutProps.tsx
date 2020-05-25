import { GQLGetStaticProps } from 'node/staticParams'
import apolloClient from 'node/apolloClient'
import { GetPageLayoutDocument } from 'generated/apollo'
import getContentRendererProps from 'components/ContentRenderer/getContentRendererProps'
import { PageLayoutProps } from '.'

// @todo better error handling
const getPageLayoutProps: GQLGetStaticProps<PageLayoutProps> = async (variables) => {
  // try {
  const { data } = await (await apolloClient()).query<
    GQLGetPageLayoutQuery,
    GQLGetPortfolioListQueryVariables
  >({ query: GetPageLayoutDocument, variables })

  const { pages, ...rest } = data
  const page = pages[0]

  page.content = await getContentRendererProps(page.content)
  return { ...rest, page: pages[0] }
  // } catch (error) {
  //   return {
  //     page: {} as GQLPageLayoutFragment,
  //     team: [],
  //   }
  // }
}

export default getPageLayoutProps
