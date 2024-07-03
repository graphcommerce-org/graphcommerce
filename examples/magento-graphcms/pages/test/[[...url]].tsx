import { PageOptions } from '@graphcommerce/framer-next-pages'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, LayoutTitle } from '@graphcommerce/next-ui'
import { Container, Divider, Link } from '@mui/material'
import { GetStaticPaths } from 'next'
import { LayoutDocument, LayoutNavigation, LayoutNavigationProps } from '../../components'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'
import { LayoutDemo } from './minimal-page-shell/[[...url]]'
import { i18n } from '@lingui/core'

type Props = { url: string }
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function TestOverview() {
  return (
    <Container>
      <LayoutDemo baseUrl='/test' />
      <Divider />
      <LayoutTitle
        sx={(theme) => ({
          '&.gutterBottom': {
            marginBottom: theme.spacings.sm,
          },
        })}
      >
        Links to components
      </LayoutTitle>
      <Container maxWidth='md' sx={{ display: 'grid', gridColumns: '1' }}>
        <Link href='/test/buttons'>Buttons</Link>
        <Link href='/test/icons'>Icons</Link>
        <Link href='/test/slider'>Slider</Link>
        <Link href='/test/typography'>Typography</Link>
        <Link href='/test/number-inputs'>Number-inputs</Link>
      </Container>
    </Container>
  )
}

TestOverview.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default TestOverview

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const urls = ['index', 'other']

  const paths = locales
    .map((locale) => urls.map((url) => ({ params: { url: [url] }, locale })))
    .flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async (context) => {
  const { params } = context
  const url = (params?.url ?? ['index']).join('/') ?? ''

  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)

  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({ query: LayoutDocument, fetchPolicy: 'cache-first' })

  return {
    props: {
      url,
      up: url !== 'index' ? { href: '/', title: i18n._(/* i18n */ 'Home') } : null,
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
