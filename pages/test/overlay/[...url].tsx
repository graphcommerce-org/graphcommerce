import BottomDrawerUi from 'components/AppShell/BottomDrawerUi'
import PageLayout, { PageLayoutProps } from 'components/AppShell/PageLayout'
import getLayoutHeaderProps from 'components/AppShell/getLayoutHeaderProps'
import DebugSpacer from 'components/Debug/DebugSpacer'
import { PageFC, PageStaticPathsFn, PageStaticPropsFn } from 'components/Page/types'
import PageLink from 'components/PageTransition/PageLink'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'

type PageComponent = PageFC<{ url: string }, PageLayoutProps>
type GetPageStaticPaths = PageStaticPathsFn<{ url: string[] }>
type GetPageStaticProps = PageStaticPropsFn<PageComponent, { url: string[] }>

const AppShellTextOverlay: PageComponent = ({ url }) => {
  const title = `Overlay ${url.charAt(0).toUpperCase() + url.slice(1)}`

  return (
    <BottomDrawerUi title={title}>
      <ul>
        <li>
          <PageLink href='/test/deeper'>To default layout</PageLink>
        </li>
        <li>
          {url === 'index' ? (
            <PageLink href='/test/overlay/deeper'>Deeper</PageLink>
          ) : (
            <PageLink href='/test/overlay/index'>Shallower</PageLink>
          )}
        </li>
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
      <DebugSpacer height={url === 'index' ? 200 : 2000} />
    </BottomDrawerUi>
  )
}
AppShellTextOverlay.Layout = PageLayout

export default AppShellTextOverlay

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async () => {
  return {
    paths: [{ params: { url: ['index'] } }, { params: { url: ['deeper'] } }],
    fallback: true,
  }
}

export const getStaticProps: GetPageStaticProps = async (ctx) => {
  if (!ctx.params) throw new Error('No params')

  const client = apolloClient()
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  await getStoreConfig(client)
  const staticClient = apolloClient()
  const layoutHeader = getLayoutHeaderProps(staticClient)

  return {
    props: {
      ...(await layoutHeader),
      url: ctx.params.url.join('/'),
      apolloState: client.cache.extract(),
    },
  }
}
