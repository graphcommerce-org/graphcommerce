// eslint-disable-next-line import/no-extraneous-dependencies
import type { StoreCreditPageProps } from '@graphcommerce/adobe-commerce-store-credit'
// eslint-disable-next-line import/no-extraneous-dependencies
import { createGetStaticProps, StoreCreditPage } from '@graphcommerce/adobe-commerce-store-credit'
import type { PageOptions } from '@graphcommerce/framer-next-pages'
import type { GetStaticProps, LayoutOverlayProps } from '@graphcommerce/next-ui'
import { LayoutOverlay } from '@graphcommerce/next-ui'
import { graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

export default function Page(props: StoreCreditPageProps) {
  return <StoreCreditPage {...props} />
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account',
  Layout: LayoutOverlay,
}

Page.pageOptions = pageOptions

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  return createGetStaticProps(client)(context)
}
