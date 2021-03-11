import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React from 'react'
import FullPageUi from '../../components/AppShell/FullPageUi'
import { DefaultPageDocument } from '../../components/GraphQL/DefaultPage.gql'
import PageContent from '../../components/PageContent'
import apolloClient from '../../lib/apolloClient'

type Props = FullPageUiQuery
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

const BrandPage = (props: Props) => {
  const { pages } = props
  const page = pages[0]

  const title = page.title ?? ''
  return (
    <FullPageUi title={title} backFallbackHref='/' backFallbackTitle='Home' {...props}>
      <PageContent {...page} />
    </FullPageUi>
  )
}

BrandPage.Layout = PageLayout

registerRouteUi('/brands/[url]', FullPageUi)

export default BrandPage

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
  const defaultPage = staticClient.query({
    query: DefaultPageDocument,
    variables: { url: `brands/${urlKey}` },
  })
  if (!(await defaultPage).data.pages?.[0]) return { notFound: true }

  return {
    props: {
      ...(await defaultPage).data,
      apolloState: await config.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
