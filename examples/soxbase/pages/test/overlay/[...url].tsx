import { Container } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import ForwardButton from '@reachdigital/next-ui/AppShell/ForwardButton'
import OverlayUi from '@reachdigital/next-ui/AppShell/OverlayUi'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React, { useState } from 'react'
import { DefaultPageDocument, DefaultPageQuery } from '../../../components/GraphQL/DefaultPage.gql'
import apolloClient from '../../../lib/apolloClient'

type Props = { url: string } & DefaultPageQuery
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

const cycles = [100, 200, 1000, 2000]

function AppShellTextOverlay({ url, pages }: Props) {
  const title = `Overlay ${url?.charAt(0).toUpperCase() + url?.slice(1)}`
  const [cycle, setCycle] = useState(url === 'index' ? 0 : 3)

  const next = Number(url) + 1
  return (
    <OverlayUi
      title={title}
      headerForward={
        <PageLink href={`/test/overlay/${next}`}>
          <ForwardButton color='secondary'>Deeper {next}</ForwardButton>
        </PageLink>
      }
      variant='center'
      backFallbackHref='/test/index'
      backFallbackTitle='Test'
    >
      <Container maxWidth='md'>Content here</Container>
    </OverlayUi>
  )
}

AppShellTextOverlay.Layout = PageLayout

registerRouteUi('/test/overlay/[...url]', OverlayUi)

export default AppShellTextOverlay

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const urls = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

  const paths = locales
    .map((locale) => urls.map((url) => ({ params: { url: [url] }, locale })))
    .flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const url = params?.url.join('/') ?? ''

  const client = apolloClient(localeToStore(locale))
  const staticClient = apolloClient(localeToStore(locale))

  const config = client.query({ query: StoreConfigDocument })
  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: { url: `test/overlay/${url}` },
  })

  return {
    props: {
      url,
      ...(await page).data,
      apolloState: await config.then(() => client.cache.extract()),
    },
  }
}
