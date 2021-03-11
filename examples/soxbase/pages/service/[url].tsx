import MenuTabs from '@reachdigital/magento-app-shell/MenuTabs'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument, PageLayoutQuery } from '@reachdigital/magento-app-shell/PageLayout.gql'
import { ResolveUrlDocument, ResolveUrlQuery } from '@reachdigital/magento-store/ResolveUrl.gql'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import NextError from 'next/error'
import React from 'react'
import { FooterDocument, FooterQuery } from '../../components/AppShell/Footer.gql'
import FullPageUi from '../../components/AppShell/FullPageUi'
import HeaderActions from '../../components/AppShell/HeaderActions'
import Logo from '../../components/AppShell/Logo'
import Footer from '../../components/Footer/Footer'
import PageContent from '../../components/PageContent'
import { PageByUrlDocument, PageByUrlQuery } from '../../components/PageContent/PageByUrl.gql'
import apolloClient from '../../lib/apolloClient'

type Props = PageLayoutQuery & ResolveUrlQuery & FooterQuery & PageByUrlQuery
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

const ServicePage = ({ menu, urlResolver, pages, footer }: Props) => {
  if (!pages) return <NextError statusCode={503} title='Loading skeleton' />
  if (!pages?.[0]) return <NextError statusCode={404} title='Page not found' />
  const page = pages[0]

  return (
    <FullPageUi
      title={page.title ?? ''}
      menu={<MenuTabs menu={menu} urlResolver={urlResolver} />}
      logo={<Logo />}
      actions={<HeaderActions />}
    >
      <PageContent {...page} />
      <Footer footer={footer} />
    </FullPageUi>
  )
}

ServicePage.Layout = PageLayout

registerRouteUi('/service/[url]', FullPageUi)

export default ServicePage

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const urls = ['index']
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
  const page = staticClient.query({
    query: PageByUrlDocument,
    variables: { url: `service/${urlKey}` },
  })
  if (!(await page).data.pages?.[0]) return { notFound: true }
  return {
    props: {
      ...(await resolveUrl).data,
      ...(await footer).data,
      ...(await pageLayout).data,
      ...(await page).data,
      apolloState: await config.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
