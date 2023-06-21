import { PageOptions } from '@graphcommerce/framer-next-pages'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps } from '@graphcommerce/next-ui'
import { GetStaticPaths } from 'next'
import { LayoutNavigation, LayoutNavigationProps } from '../../components'
import { LayoutDocument } from '../../components/Layout/Layout.gql'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'
import { LayoutDemo } from './minimal-page-shell/[[...url]]'

type Props = { url: string }
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function TestOverview() {
  return <LayoutDemo baseUrl='/test' />
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

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const url = (params?.url ?? ['index']).join('/') ?? ''

  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)

  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({ query: LayoutDocument, fetchPolicy: 'cache-first' })

  return {
    props: {
      url,
      up: url !== 'index' ? { href: '/', title: 'Home' } : null,
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
