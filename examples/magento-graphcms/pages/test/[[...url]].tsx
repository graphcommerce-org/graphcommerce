import { PageOptions } from '@graphcommerce/framer-next-pages'
import { MagentoEnv } from '@graphcommerce/magento-store'
import { GetStaticProps } from '@graphcommerce/next-ui'
import { GetStaticPaths } from 'next'
import { LayoutFull, LayoutFullProps } from '../../components'
import { DefaultPageDocument, DefaultPageQuery } from '../../graphql/DefaultPage.gql'
import { graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'
import { LayoutDemo } from './minimal-page-shell/[[...url]]'

type Props = { url: string } & DefaultPageQuery
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutFullProps, Props, RouteProps>

function TestOverview() {
  return <LayoutDemo baseUrl='/test' />
}

TestOverview.pageOptions = {
  Layout: LayoutFull,
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
  const staticClient = graphqlSsrClient(locale)

  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: `test/${url}`,
      rootCategory: (process.env as MagentoEnv).ROOT_CATEGORY,
    },
  })

  return {
    props: {
      url,
      up: url !== 'index' ? { href: '/', title: 'Home' } : null,
      ...(await page).data,
    },
  }
}
