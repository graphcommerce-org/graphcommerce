import { Button, Container } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import DebugSpacer from '@reachdigital/next-ui/Debug/DebugSpacer'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import { m } from 'framer-motion'
import React from 'react'
import FullPageUi from '../../components/AppShell/FullPageUi'
import { DefaultPageDocument, DefaultPageQuery } from '../../components/GraphQL/DefaultPage.gql'
import PageContent from '../../components/PageContent'
import apolloClient from '../../lib/apolloClient'

type Props = { url: string } & DefaultPageQuery
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

function AppShellTestIndex(props: Props) {
  const { url, pages } = props
  const title = `Testpage ${url?.charAt(0).toUpperCase() + url?.slice(1)}`

  return (
    <FullPageUi title={title} backFallbackTitle='Test' backFallbackHref='/test/index' {...props}>
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
      <PageContent {...pages?.[0]} />
      <Container>
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
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const urls = ['index', 'other']

  const paths = locales
    .map((locale) => urls.map((url) => ({ params: { url: [url] }, locale })))
    .flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const url = params?.url.join('/') ?? ''

  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const config = client.query({ query: StoreConfigDocument })
  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: { url: `/test/${url}` },
  })

  return {
    props: {
      url,
      ...(await page).data,
      apolloState: await config.then(() => client.cache.extract()),
    },
  }
}
