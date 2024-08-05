import { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import {
  ContentAreaHome,
  GcPageDocument,
  GcPage,
  GcPageMeta,
  gcPageRedirectOrNotFound,
  isGcPageFound,
} from '@graphcommerce/graphql-gc-api'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, LayoutHeader } from '@graphcommerce/next-ui'
import { LayoutDocument, LayoutNavigation, LayoutNavigationProps } from '../components'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'

type Props = GcPage
type RouteProps = { url: string }
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function CmsPage(props: Props) {
  const { page } = props

  return (
    <>
      <GcPageMeta page={page} />
      <LayoutHeader floatingMd floatingSm />
      <ContentAreaHome page={page} />
    </>
  )
}

CmsPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default CmsPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)

  const conf = client.query({ query: StoreConfigDocument })
  const gcPageQuery = client.query({ query: GcPageDocument, variables: { input: { href: '/' } } })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const page = (await gcPageQuery).data
  if (!isGcPageFound(page)) return gcPageRedirectOrNotFound(page)

  return {
    props: {
      ...page,
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
