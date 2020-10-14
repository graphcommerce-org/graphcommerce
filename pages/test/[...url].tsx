import { Container } from '@material-ui/core'
import LayoutHeader, { LayoutHeaderProps } from 'components/AppShell/LayoutHeader'
import getLayoutHeaderProps from 'components/AppShell/getLayoutHeaderProps'
import DebugSpacer from 'components/Debug/DebugSpacer'
import { PageFC, PageStaticPathsFn, PageStaticPropsFn } from 'components/Page/types'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import { m as motion } from 'framer-motion'
import apolloClient from 'lib/apolloClient'
import Link from 'next/link'

type PageComponent = PageFC<{ url: string }, LayoutHeaderProps>
type GetPageStaticPaths = PageStaticPathsFn<{ url: string[] }>
type GetPageStaticProps = PageStaticPropsFn<PageComponent, { url: string[] }>

const AppShellTestIndex: PageComponent = ({ url }) => {
  return (
    <Container>
      hallo! {url}
      <ul>
        <li>
          {url === 'index' ? (
            <Link href='/test/deeper' scroll={false}>
              Sibling
            </Link>
          ) : (
            <Link href='/test/index' scroll={false}>
              Index
            </Link>
          )}
        </li>
        <li>
          <Link href='/test/overlay/index' scroll={false}>
            Overlay
          </Link>
        </li>
      </ul>
      <div style={{ marginLeft: url === 'index' ? 0 : 150 }}>
        <motion.img
          layout
          src='/manifest/icon.png'
          alt=''
          layoutId='img1'
          width='183'
          height='172'
          style={{ position: 'relative', zIndex: 5 }}
          // animate={url === 'index' ? { filter: `hue-rotate(0deg)` } : { filter: `hue-rotate(45deg)` }}
          transition={{ type: 'tween' }}
        />
      </div>
      <DebugSpacer height={2000} />
    </Container>
  )
}
AppShellTestIndex.Layout = LayoutHeader

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
      url: ctx.params.url.join('/'),
      ...(await layoutHeader),
      apolloState: client.cache.extract(),
    },
  }
}
