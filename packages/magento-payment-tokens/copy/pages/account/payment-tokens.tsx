// eslint-disable-next-line import/no-extraneous-dependencies
import type { PageOptions } from '@graphcommerce/framer-next-pages'
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  createGetStaticProps,
  CustomerTokensPage,
  type CustomerTokensPageProps,
} from '@graphcommerce/magento-payment-tokens'
import type { GetStaticProps, LayoutOverlayProps } from '@graphcommerce/next-ui'
import { LayoutOverlay } from '@graphcommerce/next-ui'
import { graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

export default function Page(props: CustomerTokensPageProps) {
  return <CustomerTokensPage {...props} />
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
