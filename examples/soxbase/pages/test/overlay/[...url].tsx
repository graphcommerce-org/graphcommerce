import { Container } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import BottomDrawerUi from '@reachdigital/next-ui/AppShell/BottomDrawerUi'
import ForwardButton from '@reachdigital/next-ui/AppShell/ForwardButton'
import DebugSpacer from '@reachdigital/next-ui/Debug/DebugSpacer'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React, { useState } from 'react'
import apolloClient from '../../../lib/apolloClient'

type Props = { url: string }
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

const cycles = [100, 200, 1000, 2000]

function AppShellTextOverlay({ url }: Props) {
  const title = `Overlay ${url?.charAt(0).toUpperCase() + url?.slice(1)}`
  const [cycle, setCycle] = useState(url === 'index' ? 0 : 3)

  const next = Number(url) + 1
  return (
    <BottomDrawerUi
      title={title}
      headerForward={
        <PageLink href={`/test/overlay/${next}`}>
          <ForwardButton color='secondary'>Deeper {next}</ForwardButton>
        </PageLink>
      }
    >
      {/* <div style={{ marginLeft: url === 'index' ? 0 : 150 }}>
        <m.img
          src='/manifest/icon.png'
          alt=''
          layoutId='img1'
          width={366}
          height={344}
          style={{ position: 'relative', zIndex: 5 }}
          transition={{ type: 'tween' }}
          initial={{ zIndex: 0 }}
          animate={{ zIndex: 5 }}
          exit={{ zIndex: 0 }}
        />
      </div> */}
      <Container>
        <DebugSpacer height={cycles[cycle]} onClick={() => setCycle((cycle + 1) % cycles.length)} />
      </Container>
    </BottomDrawerUi>
  )
}

AppShellTextOverlay.Layout = PageLayout

registerRouteUi('/test/overlay/[...url]', BottomDrawerUi)

export default AppShellTextOverlay

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  const urls = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

  const paths = locales
    .map((locale) =>
      urls.map((url) => {
        return { params: { url: [url] }, locale }
      }),
    )
    .flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const url = params?.url.join('/') ?? ''

  const client = apolloClient(localeToStore(locale))
  const staticClient = apolloClient(localeToStore(locale))

  const config = client.query({ query: StoreConfigDocument })
  const pageLayout = staticClient.query({ query: PageLayoutDocument })

  await config
  return {
    props: {
      ...(await pageLayout).data,
      url,
      apolloState: client.cache.extract(),
    },
  }
}
