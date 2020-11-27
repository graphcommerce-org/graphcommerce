import { Button, Container } from '@material-ui/core'
import Footer, { FooterProps } from '@reachdigital/magento-app-shell/Footer'
import Header, { HeaderProps } from '@reachdigital/magento-app-shell/Header'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import FullPageUi from '@reachdigital/next-ui/AppShell/FullPageUi'
import DebugSpacer from '@reachdigital/next-ui/Debug/DebugSpacer'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import { m } from 'framer-motion'
import React from 'react'
import Page, { PageProps } from '../../components/Page'
import { PageByUrlDocument, PageByUrlQuery } from '../../components/Page/PageByUrl.gql'
import apolloClient from '../../lib/apolloClient'

type Props = { url: string } & HeaderProps & FooterProps & PageByUrlQuery
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

function AppShellTestIndex({ url, menu, urlResolver, pages }: Props) {
  const title = `Testpage ${url?.charAt(0).toUpperCase() + url?.slice(1)}`

  return (
    <FullPageUi title={title}>
      <Header menu={menu} urlResolver={urlResolver} />
      <Container>
        {url === 'index' ? (
          <PageLink href='/test/deeper'>
            <Button variant='outlined' color='secondary'>
              Sibling
            </Button>
          </PageLink>
        ) : (
          <PageLink href='/test/index'>
            <Button variant='outlined' color='secondary'>
              Index
            </Button>
          </PageLink>
        )}

        <PageLink href='/test/overlay/1'>
          <Button variant='outlined' color='secondary'>
            Overlay
          </Button>
        </PageLink>
        <div style={{ marginLeft: url === 'index' ? 0 : 150 }}>
          <m.img
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
          <m.img
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
      </Container>
      {pages?.[0] && <Page {...pages?.[0]} />}
      <Footer />
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
  const page = staticClient.query({ query: PageByUrlDocument, variables: { url: `test/${url}` } })

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
