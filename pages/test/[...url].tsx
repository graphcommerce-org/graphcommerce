import { Container } from '@material-ui/core'
import FullPageUi from 'components/AppShell/FullPageUi'
import PageLayout, { PageLayoutProps } from 'components/AppShell/PageLayout'
import getLayoutHeaderProps from 'components/AppShell/getLayoutHeaderProps'
import DebugSpacer from 'components/Debug/DebugSpacer'
import { PageFC, PageStaticPathsFn, PageStaticPropsFn } from 'components/Page/types'
import PageLink from 'components/PageTransition/PageLink'
import { registerRoute } from 'components/PageTransition/historyHelpers'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import { m as motion } from 'framer-motion'
import apolloClient from 'lib/apolloClient'

type PageComponent = PageFC<{ url: string }, PageLayoutProps>
type GetPageStaticPaths = PageStaticPathsFn<{ url: string[] }>
type GetPageStaticProps = PageStaticPropsFn<PageComponent, { url: string[] }>

const AppShellTestIndex: PageComponent = ({ url }) => {
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

registerRoute('/test/[...url]', FullPageUi)

export default AppShellTestIndex

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async () => {
  return {
    paths: [{ params: { url: ['index'] } }, { params: { url: ['other'] } }],
    fallback: true,
  }
}

export const getStaticProps: GetPageStaticProps = async (ctx) => {
  if (!ctx.params) throw new Error('No params')

  const client = apolloClient()
  const staticClient = apolloClient()
  await getStoreConfig(client)
  const layoutHeader = getLayoutHeaderProps(staticClient)

  return {
    props: {
      apolloState: client.cache.extract(),
      ...(await layoutHeader),
      url: ctx.params.url.join('/'),
    },
  }
}
