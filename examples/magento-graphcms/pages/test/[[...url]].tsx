import { PageOptions } from '@graphcommerce/framer-next-pages'
import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import { enhanceStaticPaths, enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { InferGetStaticPropsType } from 'next'
import { LayoutNavigation, LayoutNavigationProps } from '../../components'
import { LayoutDocument } from '../../components/Layout/Layout.gql'
import { LayoutDemo } from './minimal-page-shell/[[...url]]'

type Props = { url: string }
type RouteProps = { url: string[] }

function TestOverview(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return <LayoutDemo baseUrl='/test' />
}

TestOverview.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default TestOverview

export const getStaticPaths = enhanceStaticPaths<RouteProps>('blocking', ({ locale }) =>
  [['index', 'other']].map((url) => ({ params: { url }, locale })),
)

export const getStaticProps = enhanceStaticProps<LayoutNavigationProps, Props, RouteProps>(
  async ({ params }) => {
    const url = (params?.url ?? ['index']).join('/') ?? ''

    return {
      props: {
        ...(await graphqlQuery(LayoutDocument, { fetchPolicy: 'cache-first' })).data,
        url,
        up: url !== 'index' ? { href: '/', title: 'Home' } : null,
      },
    }
  },
)
