import Header, { HeaderProps } from '@reachdigital/magento-app-shell/Header'
import MenuTabs from '@reachdigital/magento-app-shell/MenuTabs'
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
import Footer, { FooterProps } from '../../components/Footer'
import { FooterDocument } from '../../components/Footer/Footer.gql'
import HeaderActions from '../../components/HeaderActions/HeaderActions'
import Logo from '../../components/Logo/Logo'
import MobileMenu from '../../components/MobileMenu/MobileMenu'
import Page from '../../components/Page'
import { PageByUrlDocument, PageByUrlQuery } from '../../components/Page/PageByUrl.gql'
import apolloClient from '../../lib/apolloClient'

type Props = CmsPageQuery & HeaderProps & FooterProps & PageByUrlQuery
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

const CmsPage = ({ cmsPage, menu, urlResolver, pages, footer }: Props) => {
  if (!cmsPage) return <NextError statusCode={503} title='Loading skeleton' />

  if (!cmsPage.identifier) return <NextError statusCode={404} title='Page not found' />

  return (
    <FullPageUi
      title={cmsPage.title ?? ''}
      menu={<MenuTabs menu={menu} urlResolver={urlResolver} />}
      logo={<Logo />}
      actions={<HeaderActions />}
    >
      <MobileMenu menu={menu} urlResolver={urlResolver} />
      <CmsPageMeta {...cmsPage} />
      {pages?.[0] ? <Page {...pages?.[0]} /> : <CmsPageContent {...cmsPage} />}
      <Footer footer={footer} />
    </FullPageUi>
  )
}

CmsPage.Layout = PageLayout

registerRouteUi('/page/[url]', FullPageUi)

export default CmsPage

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  const urls = ['home', 'no-route']

  const paths = locales.map((locale) => urls.map((url) => ({ params: { url }, locale }))).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ locale, params }) => {
  const urlKey = params?.url ?? '??'
  const client = apolloClient(localeToStore(locale))
  const staticClient = apolloClient(localeToStore(locale))

  const config = client.query({ query: StoreConfigDocument })
  const resolveUrl = staticClient.query({ query: ResolveUrlDocument, variables: { urlKey } })
  const pageLayout = staticClient.query({ query: PageLayoutDocument })
  const footer = staticClient.query({ query: FooterDocument })
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
      ...(await footer).data,
      ...(await pageLayout).data,
      ...(await cmsPage).data,
      ...(await page).data,
      apolloState: client.cache.extract(),
    },
    revalidate: 60 * 20,
  }
}
