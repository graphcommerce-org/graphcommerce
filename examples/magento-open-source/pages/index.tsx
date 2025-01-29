import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import type { CmsPageFragment } from '@graphcommerce/magento-cms'
import { CmsPageContent, CmsPageDocument } from '@graphcommerce/magento-cms'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { Container, isTypename, LayoutHeader, PageMeta } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import type { LayoutNavigationProps } from '../components'
import { LayoutDocument, LayoutNavigation } from '../components'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'

export type CmsPageProps = { cmsPage: CmsPageFragment | null }

type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, CmsPageProps>

function CmsPage(props: CmsPageProps) {
  const { cmsPage } = props

  if (!cmsPage) return <Container>Configure cmsPage home</Container>

  return (
    <>
      <PageMeta
        title={cmsPage.meta_title || cmsPage.title || i18n._(/* i18n */ 'Home')}
        metaDescription={cmsPage.meta_description || undefined}
      />
      <LayoutHeader floatingMd hideMd={import.meta.graphCommerce.breadcrumbs} floatingSm />

      <CmsPageContent cmsPage={cmsPage} />
    </>
  )
}

CmsPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default CmsPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const staticClient = graphqlSsrClient(context)

  const url = (await conf).data.storeConfig?.cms_home_page ?? 'home'
  const cmsPageQuery = staticClient.query({ query: CmsPageDocument, variables: { url } })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })
  const cmsPage = (await cmsPageQuery).data.route

  const result = {
    props: {
      cmsPage: cmsPage && isTypename(cmsPage, ['CmsPage']) ? cmsPage : null,
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
  return result
}
