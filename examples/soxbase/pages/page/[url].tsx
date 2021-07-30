import { PageOptions } from '@reachdigital/framer-next-pages'
import { CmsPageContent } from '@reachdigital/magento-cms'
import { ProductListDocument, ProductListQuery } from '@reachdigital/magento-product'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import { GetStaticProps } from '@reachdigital/next-ui'
import { GetStaticPaths } from 'next'
import React from 'react'
import FullPageShell, { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import { CmsPageDocument, CmsPageQuery } from '../../components/GraphQL/CmsPage.gql'
import { DefaultPageQuery } from '../../components/GraphQL/DefaultPage.gql'
import PageContent from '../../components/PageContent'
import RowProductBackstory from '../../components/Row/RowProductBackstory'
import RowProductGrid from '../../components/Row/RowProductGrid'
import RowSwipeableGrid from '../../components/Row/RowSwipeableGrid'
import apolloClient from '../../lib/apolloClient'

export const config = { unstable_JsPreload: false }

type Props = DefaultPageQuery & CmsPageQuery & ProductListQuery
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props, RouteProps>

function CmsPage(props: Props) {
  const { cmsPage, pages, products } = props
  const title = cmsPage?.title ?? ''

  return (
    <>
      <PageMeta
        title={cmsPage?.meta_title ?? title ?? ''}
        metaDescription={cmsPage?.meta_description ?? ''}
      />

      {pages?.[0] ? (
        <PageContent
          renderer={{
            RowProductBackstory: (p) => <RowProductBackstory {...p} items={products?.items} />,
            RowProductGrid: (p) => <RowProductGrid {...p} items={products?.items} />,
            RowSwipeableGrid: (p) => <RowSwipeableGrid {...p} items={products?.items} />,
          }}
          content={pages?.[0].content}
        />
      ) : (
        <CmsPageContent {...cmsPage} />
      )}
    </>
  )
}

CmsPage.pageOptions = {
  SharedComponent: FullPageShell,
} as PageOptions

export default CmsPage

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const urls = ['home', 'no-route']

  const paths = locales.map((locale) => urls.map((url) => ({ params: { url }, locale }))).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ locale, params }) => {
  const urlKey = params?.url ?? '??'
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const conf = client.query({ query: StoreConfigDocument })
  const page = staticClient.query({
    query: CmsPageDocument,
    variables: {
      url: `page/${urlKey}`,
      urlKey,
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })

  // todo(paales): Remove when https://github.com/Urigo/graphql-mesh/issues/1257 is resolved
  const categoryUid = String((await conf).data.storeConfig?.root_category_uid ?? '')
  const productList = staticClient.query({
    query: ProductListDocument,
    variables: { categoryUid, pageSize: 8, filters: { category_uid: { eq: 'MTAy' } } },
  })

  return {
    props: {
      alwaysShowLogo: true,
      ...(await page).data,
      ...(await productList).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
