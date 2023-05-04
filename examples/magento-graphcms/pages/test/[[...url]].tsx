import { PageOptions } from '@graphcommerce/framer-next-pages'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps } from '@graphcommerce/next-ui'
import { enhanceStaticPaths, enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { GetStaticPaths } from 'next'
import { LayoutNavigation, LayoutNavigationProps } from '../../components'
import { LayoutDocument } from '../../components/Layout/Layout.gql'
import { graphqlQuery } from '@graphcommerce/graphql-mesh'
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

export const getStaticPaths: GetPageStaticPaths = enhanceStaticPaths('blocking', ({ locale }) =>
  [['index', 'other']].map((url) => ({ params: { url }, locale })),
)

export const getStaticProps: GetPageStaticProps = enhanceStaticProps(async ({ params }) => {
  const url = (params?.url ?? ['index']).join('/') ?? ''

  return {
    props: {
      ...(await graphqlQuery(LayoutDocument, { fetchPolicy: 'cache-first' })).data,
      url,
      up: url !== 'index' ? { href: '/', title: 'Home' } : null,
    },
  }
})
