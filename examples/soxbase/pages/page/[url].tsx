import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import { CmsPageDocument, CmsPageQuery } from '@reachdigital/magento-cms/CmsPage.gql'
import CmsPageContent from '@reachdigital/magento-cms/CmsPageContent'
import CmsPageMeta from '@reachdigital/magento-cms/CmsPageMeta'
import { ResolveUrlDocument } from '@reachdigital/magento-store/ResolveUrl.gql'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
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
    fallback: 'blocking',
  }
}

export const getStaticProps: GetPageStaticProps = async (ctx) => {
  const urlKey = ctx.params?.url ?? '??'
  const client = apolloClient()
  const staticClient = apolloClient()

  const config = client.query({ query: StoreConfigDocument })
  const resolveUrl = staticClient.query({ query: ResolveUrlDocument, variables: { urlKey } })
  const pageLayout = staticClient.query({ query: PageLayoutDocument })
  const cmsPage = staticClient.query({ query: CmsPageDocument, variables: { urlKey } })

  const { urlResolver } = (await resolveUrl).data
  if (!urlResolver?.id || urlResolver?.type !== 'CMS_PAGE') return { notFound: true }

  await config
  return {
    props: {
      ...(await resolveUrl).data,
      ...(await pageLayout).data,
      ...(await cmsPage).data,
      apolloState: client.cache.extract(),
    },
    revalidate: 60 * 20,
  }
}
