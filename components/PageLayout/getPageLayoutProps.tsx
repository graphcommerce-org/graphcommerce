import { GQLGetStaticProps } from 'lib/staticParams'
import { serverClient } from 'lib/apolloServer'
import { GetPageLayoutDocument } from 'generated/apollo'
import getContentRendererProps from 'components/ContentRenderer/getContentRendererProps'
import { PageLayoutProps } from '.'

const getPageLayoutProps: GQLGetStaticProps<PageLayoutProps> = async (variables) => {
  try {
    const { data } = await (await serverClient()).query<
      GQLGetPageLayoutQuery,
      GQLGetPortfolioListQueryVariables
    >({ query: GetPageLayoutDocument, variables })

    const { pages, ...rest } = data
    const page = pages[0]

    page.content = await getContentRendererProps(page.content)
    return { ...rest, page: pages[0] }
  } catch (error) {
    console.error(error)
    return {
      page: {} as GQLPageLayoutFragment,
      team: [],
    }
  }
}

export default getPageLayoutProps
