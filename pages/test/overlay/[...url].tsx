import BottomDrawerLayout, { BottomDrawerLayoutProps } from 'components/AppShell/BottomDrawerLayout'
import getLayoutHeaderProps from 'components/AppShell/getLayoutHeaderProps'
import DebugSpacer from 'components/Debug/DebugSpacer'
import { PageFC, PageStaticPathsFn, PageStaticPropsFn } from 'components/Page/types'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import Link from 'next/link'

type PageComponent = PageFC<{ url: string }, BottomDrawerLayoutProps>
type GetPageStaticPaths = PageStaticPathsFn<{ url: string[] }>
type GetPageStaticProps = PageStaticPropsFn<PageComponent, { url: string[] }>

const AppShellTextOverlay: PageComponent = ({ url }) => {
  return (
    <>
      overlay {url}
      <ul>
        <li>
          <Link href='/test/deeper' scroll={false}>
            To default layout
          </Link>
        </li>
        <li>
          {url === 'index' ? (
            <Link href='/test/overlay/deeper' scroll={false}>
              Deeper
            </Link>
          ) : (
            <Link href='/test/overlay/index' scroll={false}>
              Shallower
            </Link>
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
      <DebugSpacer height={url === 'index' ? 200 : 2000} color='#ecf1c8' />
    </>
  )
}
AppShellTextOverlay.Layout = BottomDrawerLayout

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
      title: `Overlaypage ${ctx.params.url.join(' ')}`,
      apolloState: client.cache.extract(),
    },
  }
}
