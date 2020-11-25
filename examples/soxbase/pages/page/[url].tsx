import Header, { HeaderProps } from '@reachdigital/magento-app-shell/Header'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import { CmsPageDocument, CmsPageQuery } from '@reachdigital/magento-cms/CmsPage.gql'
import CmsPageContent from '@reachdigital/magento-cms/CmsPageContent'
import CmsPageMeta from '@reachdigital/magento-cms/CmsPageMeta'
import { ResolveUrlDocument } from '@reachdigital/magento-store/ResolveUrl.gql'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import FullPageUi from '@reachdigital/next-ui/AppShell/FullPageUi'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import NextError from 'next/error'
import React from 'react'
import Page from '../../components/Page'
import { PageByUrlDocument, PageByUrlQuery } from '../../components/Page/PageByUrl.gql'
import apolloClient from '../../lib/apolloClient'

type Props = CmsPageQuery & HeaderProps & PageByUrlQuery
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

const CmsPage = ({ cmsPage, menu, urlResolver, pages }: Props) => {
  if (!cmsPage) return <NextError statusCode={503} title='Loading skeleton' />

  if (!cmsPage.identifier) return <NextError statusCode={404} title='Page not found' />

  return (
    <FullPageUi title={cmsPage.title ?? ''}>
      <Header menu={menu} urlResolver={urlResolver} />
      <CmsPageMeta {...cmsPage} />
      {pages?.[0] ? <Page {...pages?.[0]} /> : <CmsPageContent {...cmsPage} />}
    </FullPageUi>
  )
}

CmsPage.Layout = PageLayout

registerRouteUi('/page/[url]', FullPageUi)

export default CmsPage

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  const urls = ['home', 'no-route']

  const paths = locales
    .map((locale) =>
      urls.map((url) => {
        return { params: { url }, locale }
      }),
    )
    .flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ locale, params }) => {
  const urlKey = params?.url ?? '??'
  const client = apolloClient(localeToStore(locale))
  const staticClient = apolloClient(localeToStore(locale))

  const config = client.query({ query: StoreConfigDocument })
  const resolveUrl = staticClient.query({ query: ResolveUrlDocument, variables: { urlKey } })
  const pageLayout = staticClient.query({ query: PageLayoutDocument })
  const cmsPage = staticClient.query({ query: CmsPageDocument, variables: { urlKey } })
  const page = staticClient.query({
    query: PageByUrlDocument,
    variables: { url: `page/${urlKey}` },
  })
  const { urlResolver } = (await resolveUrl).data
  if (!urlResolver?.id || urlResolver?.type !== 'CMS_PAGE') return { notFound: true }

  await config
  return {
    props: {
      ...(await resolveUrl).data,
      ...(await pageLayout).data,
      ...(await cmsPage).data,
      ...(await page).data,
      apolloState: client.cache.extract(),
    },
    revalidate: 60 * 20,
  }
}
