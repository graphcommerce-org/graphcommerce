import { Container } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import ForwardButton from '@reachdigital/next-ui/AppShell/ForwardButton'
import OverlayUi from '@reachdigital/next-ui/AppShell/OverlayUi'
import DebugSpacer from '@reachdigital/next-ui/Debug/DebugSpacer'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React, { useState } from 'react'
import Page from '../../../components/Page'
import { PageByUrlDocument, PageByUrlQuery } from '../../../components/Page/PageByUrl.gql'
import apolloClient from '../../../lib/apolloClient'

type Props = { url: string } & PageByUrlQuery
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
    >
      <Container maxWidth='md'>yo! yo yoghurt</Container>
    </OverlayUi>
  )
}

AppShellTextOverlay.Layout = PageLayout

registerRouteUi('/test/overlay/[...url]', OverlayUi)

export default AppShellTextOverlay

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
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
  const pageLayout = staticClient.query({ query: PageLayoutDocument })
  const page = staticClient.query({
    query: PageByUrlDocument,
    variables: { url: `test/overlay/${url}` },
  })

  await config
  return {
    props: {
      ...(await pageLayout).data,
      ...(await page).data,
      url,
      apolloState: client.cache.extract(),
    },
  }
}
