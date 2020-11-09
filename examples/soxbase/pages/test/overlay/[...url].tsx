import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import BottomDrawerUi from '@reachdigital/next-ui/AppShell/BottomDrawerUi'
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

  return (
    <BottomDrawerUi title={title}>
      <ul>
        <li>
          <PageLink href='/test/deeper'>To default layout</PageLink>
        </li>
        {url === 'index' && (
          <li>
            <PageLink href='/test/overlay/deeper'>Deeper</PageLink>
          </li>
        )}
        {url === 'deeper' && (
          <>
            <li>
              <PageLink href='/test/overlay/index'>Shallower</PageLink>
            </li>
            <li>
              <PageLink href='/test/overlay/even-deeper'>Even deeper</PageLink>
            </li>
          </>
        )}
        {url === 'even-deeper' && (
          <li>
            <PageLink href='/test/overlay/index'>Shallower</PageLink>
          </li>
        )}
      </ul>
      {/* <div style={{ marginLeft: url === 'index' ? 0 : 150 }}>
        <motion.img
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
      <DebugSpacer height={cycles[cycle]} onClick={() => setCycle((cycle + 1) % cycles.length)} />
    </BottomDrawerUi>
  )
}

AppShellTextOverlay.Layout = PageLayout

registerRouteUi('/test/overlay/[...url]', BottomDrawerUi)

export default AppShellTextOverlay

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async () => {
  return {
    paths: [{ params: { url: ['index'] } }, { params: { url: ['deeper'] } }],
    fallback: true,
  }
}

export const getStaticProps: GetPageStaticProps = async (ctx) => {
  const client = apolloClient()
  const staticClient = apolloClient()

  const config = client.query({ query: StoreConfigDocument })
  const pageLayout = staticClient.query({ query: PageLayoutDocument })

  await config
  return {
    props: {
      ...(await pageLayout).data,
      url: ctx.params?.url.join('/') ?? '',
      apolloState: client.cache.extract(),
    },
  }
}
