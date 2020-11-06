import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import getLayoutHeaderProps from '@reachdigital/magento-app-shell/getLayoutHeaderProps'
import { CmsPageQuery } from '@reachdigital/magento-cms/CmsPage.gql'
import CmsPageContent from '@reachdigital/magento-cms/CmsPageContent'
import CmsPageMeta from '@reachdigital/magento-cms/CmsPageMeta'
import getCmsPageProps from '@reachdigital/magento-cms/getCmsPageProps'
import getStoreConfig from '@reachdigital/magento-store/getStoreConfig'
import getUrlResolveProps from '@reachdigital/magento-store/getUrlResolveProps'
import FullPageUi from '@reachdigital/next-ui/AppShell/FullPageUi'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import NextError from 'next/error'
import React from 'react'
import apolloClient from '../../lib/apolloClient'

type Props = CmsPageQuery
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

const CmsPage = ({ cmsPage }: Props) => {
  if (!cmsPage) return <NextError statusCode={503} title='Loading skeleton' />

  if (!cmsPage.identifier) return <NextError statusCode={404} title='Page not found' />

  return (
    <FullPageUi title={cmsPage.title ?? ''}>
      <CmsPageMeta {...cmsPage} />
      <CmsPageContent {...cmsPage} />
    </FullPageUi>
  )
}

CmsPage.Layout = PageLayout

registerRouteUi('/page', FullPageUi)

export default CmsPage

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async () => {
  return {
    paths: [{ params: { url: 'home' } }],
    fallback: true,
  }
}

export const getStaticProps: GetPageStaticProps = async (ctx) => {
  const client = apolloClient()
  const staticClient = apolloClient()

  if (!ctx.params?.url) throw Error('noo')

  const config = getStoreConfig(client)
  const urlResolve = getUrlResolveProps({ urlKey: ctx.params.url }, staticClient)
  const cmsPageProps = getCmsPageProps(
    (ctx.params.url === '/' && (await config)?.storeConfig?.cms_home_page) || ctx.params.url,
    staticClient,
  )
  const layoutHeader = getLayoutHeaderProps(staticClient)

  return {
    props: {
      title: (await cmsPageProps).cmsPage?.title ?? '',
      ...(await urlResolve),
      ...(await layoutHeader),
      ...(await cmsPageProps),
      apolloState: client.cache.extract(),
    },
    revalidate: 60 * 20,
  }
}
