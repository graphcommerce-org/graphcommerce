import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { getCategoryStaticPaths } from '@graphcommerce/magento-category'
import type { CmsPageFragment, CmsPageQuery } from '@graphcommerce/magento-cms'
import { CmsPageContent, CmsPageDocument } from '@graphcommerce/magento-cms'
import { PageMeta, redirectOrNotFound, StoreConfigDocument } from '@graphcommerce/magento-store'
import { breadcrumbs } from '@graphcommerce/next-config/config'
import {
  Container,
  isTypename,
  LayoutHeader,
  LayoutTitle,
  revalidate,
  type GetStaticProps,
} from '@graphcommerce/next-ui'
import type { GetStaticPaths } from 'next'
import type { LayoutNavigationProps } from '../../components'
import { LayoutDocument, LayoutNavigation, productListRenderer } from '../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

export type CmsPageProps = { cmsPage: CmsPageFragment }
export type CmsRoute = { url: string[] }

type GetPageStaticPaths = GetStaticPaths<CmsRoute>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, CmsPageProps, CmsRoute>

function CmsPage(props: CmsPageProps) {
  const { cmsPage } = props

  return (
    <>
      <PageMeta
        title={cmsPage.meta_title || cmsPage.title || cmsPage.content_heading || 'Page'}
        metaDescription={cmsPage.meta_description || undefined}
      />

      <LayoutHeader floatingMd hideMd={breadcrumbs}>
        <LayoutTitle size='small' component='span'>
          {cmsPage.content_heading ?? cmsPage.title}
        </LayoutTitle>
      </LayoutHeader>

      {cmsPage.content_heading && (
        <Container maxWidth={false}>
          <LayoutTitle variant='h1' gutterTop gutterBottom>
            {cmsPage.content_heading}
          </LayoutTitle>
        </Container>
      )}

      <CmsPageContent cmsPage={cmsPage} productListRenderer={productListRenderer} />
    </>
  )
}

const pageOptions: PageOptions<LayoutNavigationProps> = {
  Layout: LayoutNavigation,
}
CmsPage.pageOptions = pageOptions

export default CmsPage

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  // Disable getStaticPaths while in development mode
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = (locale: string) => getCategoryStaticPaths(graphqlSsrClient({ locale }), locale)
  const paths = (await Promise.all(locales.map(path))).flat(1)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async (context) => {
  const { params, locale } = context
  const url = params?.url?.join('/') ?? ''
  if (!url) return { notFound: true }

  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const staticClient = graphqlSsrClient(context)

  const cmsPageQuery = staticClient.query({ query: CmsPageDocument, variables: { url } })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const cmsPage = (await cmsPageQuery).data?.route
  if (!cmsPage || !isTypename(cmsPage, ['CmsPage']))
    return redirectOrNotFound(staticClient, conf, params, locale)

  const result = {
    props: {
      cmsPage,
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: revalidate(),
  }
  return result
}
