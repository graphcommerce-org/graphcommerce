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

  let title = ctx.params.url.join(' ')
  title = `Testpage ${title.charAt(0).toUpperCase() + title.slice(1)}`

  return {
    props: {
      apolloState: client.cache.extract(),
      ...(await layoutHeader),
      title,
      url: ctx.params.url.join('/'),
    },
  }
}
