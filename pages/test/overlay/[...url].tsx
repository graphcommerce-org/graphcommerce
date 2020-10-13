import LayoutDrawer, { LayoutDrawerProps } from 'components/AppShell/LayoutDrawer'
import DebugSpacer from 'components/Debug/DebugSpacer'
import { PageFC, PageStaticPathsFn, PageStaticPropsFn } from 'components/Page/types'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import Link from 'next/link'

type PageComponent = PageFC<{ url: string }, LayoutDrawerProps>
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
      <DebugSpacer height={200} color='#ecf1c8' />
    </>
  )
}
AppShellTextOverlay.Layout = LayoutDrawer

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

  return {
    props: {
      url: ctx.params.url.join('/'),
      title: ctx.params.url.join(' '),
      apolloState: client.cache.extract(),
    },
  }
}
