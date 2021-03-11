import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { CmsPageDocument, CmsPageQuery } from '@reachdigital/magento-cms/CmsPage.gql'
import CmsPageContent from '@reachdigital/magento-cms/CmsPageContent'
import {
  ProductListDocument,
  ProductListQuery,
} from '@reachdigital/magento-product-types/ProductList.gql'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React from 'react'
import FullPageUi from '../../components/AppShell/FullPageUi'
import { DefaultPageDocument } from '../../components/GraphQL/DefaultPage.gql'
import PageContent from '../../components/PageContent'
import RowProductBackstory from '../../components/RowProductBackstory'
import RowProductGrid from '../../components/RowProductGrid'
import RowSwipeableGrid from '../../components/RowSwipeableGrid'
import apolloClient from '../../lib/apolloClient'

type Props = FullPageUiQuery & CmsPageQuery & ProductListQuery
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

function CmsPage(props: Props) {
  const { cmsPage, pages, products } = props

  const title = cmsPage?.title ?? ''
  return (
    <FullPageUi title={title} backFallbackTitle='Blog' backFallbackHref='/' {...props}>
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
    </FullPageUi>
  )
}

CmsPage.Layout = PageLayout

registerRouteUi('/page/[url]', FullPageUi)

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
  const client = apolloClient(localeToStore(locale))
  const staticClient = apolloClient(localeToStore(locale))

  const config = client.query({ query: StoreConfigDocument })
  const defaultPage = staticClient.query({
    query: DefaultPageDocument,
    variables: { url: `page/${urlKey}` },
  })
  const cmsPage = staticClient.query({ query: CmsPageDocument, variables: { urlKey } })

  // todo(paales): Remove when https://github.com/Urigo/graphql-mesh/issues/1257 is resolved
  const cat = String((await config).data.storeConfig?.root_category_uid ?? '')
  const productList = staticClient.query({
    query: ProductListDocument,
    variables: { rootCategory: cat, pageSize: 8, filters: { category_uid: { eq: 'NQ==' } } },
  })

  return {
    props: {
      ...(await defaultPage).data,
      ...(await cmsPage).data,
      ...(await productList).data,
      apolloState: await config.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
