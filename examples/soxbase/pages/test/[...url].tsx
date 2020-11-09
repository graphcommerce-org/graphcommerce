import { Container } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import FullPageUi from '@reachdigital/next-ui/AppShell/FullPageUi'
import DebugSpacer from '@reachdigital/next-ui/Debug/DebugSpacer'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import { m as motion } from 'framer-motion'
import React from 'react'
import apolloClient from '../../lib/apolloClient'

type Props = { url: string }
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

function AppShellTestIndex({ url }: Props) {
  const title = `Testpage ${url?.charAt(0).toUpperCase() + url?.slice(1)}`

  return (
    <FullPageUi title={title}>
      <Container>
        hallo! {url}
        <ul>
          <li>
            {url === 'index' ? (
              <PageLink href='/test/deeper'>Sibling</PageLink>
            ) : (
              <PageLink href='/test/index'>Index</PageLink>
            )}
          </li>
          <li>
            <PageLink href='/test/overlay/index'>Overlay</PageLink>
          </li>
        </ul>
        <div style={{ marginLeft: url === 'index' ? 0 : 150 }}>
          <motion.img
            src='/manifest/icon.png'
            alt=''
            layoutId='img1'
            width='183'
            height='172'
            style={{ position: 'relative', marginLeft: 10 }}
            transition={{ type: 'tween' }}
            initial={{ zIndex: 0 }}
            animate={{ zIndex: 5 }}
            exit={{ zIndex: 0 }}
          />
          <motion.img
            src='/manifest/icon.png'
            alt=''
            layoutId='img2'
            width='183'
            height='172'
            style={{ position: 'relative', marginLeft: 10 }}
            transition={{ type: 'tween' }}
            initial={{ zIndex: 0 }}
            animate={{
              zIndex: 5,
              filter: url === 'index' ? 'hue-rotate(0deg)' : 'hue-rotate(45deg)',
            }}
            exit={{ zIndex: 0 }}
          />
        </div>
        <DebugSpacer height={2000} />
      </Container>
    </FullPageUi>
  )
}

AppShellTestIndex.Layout = PageLayout

registerRouteUi('/test/[...url]', FullPageUi)

export default AppShellTestIndex

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  const urls = ['index', 'other']

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
