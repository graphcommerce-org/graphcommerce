import { PageOptions } from '@graphcommerce/framer-next-pages'
import { CmsPageContent } from '@graphcommerce/magento-cms'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, LayoutHeader, PageMeta } from '@graphcommerce/next-ui'
import { LayoutNavigation, LayoutNavigationProps } from '../components'
import { LayoutDocument } from '../components/Layout/Layout.gql'
import { DefaultPageDocument, DefaultPageQuery } from '../graphql/DefaultPage.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'

type Props = DefaultPageQuery
type RouteProps = { url: string }
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function CmsPage(props: Props) {
  const { cmsPage } = props
  return (
    <>
      <PageMeta title='Home' canonical='/' />
      <LayoutHeader floatingMd floatingSm />
      <CmsPageContent {...cmsPage} />
    </>
  )
}

CmsPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default CmsPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)

  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({ query: LayoutDocument })
  const page = staticClient.query({ query: DefaultPageDocument, variables: { urlKey: 'home' } })

  return {
    props: {
      ...(await page).data,
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
