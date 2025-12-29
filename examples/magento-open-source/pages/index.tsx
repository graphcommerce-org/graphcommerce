import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import type { CmsPageFragment } from '@graphcommerce/magento-cms'
import { CmsPageContent, CmsPageDocument } from '@graphcommerce/magento-cms'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { breadcrumbs } from '@graphcommerce/next-config/config'
import { Container, isTypename, LayoutHeader, PageMeta, revalidate } from '@graphcommerce/next-ui'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import type { LayoutNavigationProps } from '../components'
import { LayoutDocument, LayoutNavigation, productListRenderer } from '../components'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'

export type CmsPageProps = { cmsPage: CmsPageFragment | null }

type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, CmsPageProps>

function HomePage(props: CmsPageProps) {
  const { cmsPage } = props

  if (!cmsPage) return <Container>Configure cmsPage home</Container>

  return (
    <>
      <PageMeta
        title={cmsPage.meta_title || cmsPage.title || t`Home`}
        metaDescription={cmsPage.meta_description || undefined}
      />
      <LayoutHeader floatingMd hideMd={breadcrumbs} floatingSm />

      <CmsPageContent cmsPage={cmsPage} productListRenderer={productListRenderer} />
    </>
  )
}

HomePage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default HomePage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const staticClient = graphqlSsrClient(context)

  const confData = (await conf).data
  const url = confData?.storeConfig?.cms_home_page ?? 'home'
  const cmsPageQuery = staticClient.query({ query: CmsPageDocument, variables: { url } })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })
  const cmsPage = (await cmsPageQuery).data?.route

  const result = {
    props: {
      cmsPage: cmsPage && isTypename(cmsPage, ['CmsPage']) ? cmsPage : null,
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: revalidate(),
  }
  return result
}
