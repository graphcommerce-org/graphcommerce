import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  useCustomerQuery,
  WaitForCustomer,
  AccountDashboardOrdersDocument,
  AccountOrders,
  getCustomerAccountIsDisabled,
} from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  FullPageMessage,
  GetStaticProps,
  iconBox,
  LayoutOverlayHeader,
  IconSvg,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react/macro'
import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'
import { graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountOrdersPage() {
  const { query, isReady } = useRouter()

  const orders = useCustomerQuery(AccountDashboardOrdersDocument, {
    fetchPolicy: 'cache-and-network',
    skip: !isReady,
    variables: {
      pageSize: 5,
      currentPage: Number(query?.page ?? 1),
    },
    errorPolicy: 'all',
  })
  const { data } = orders
  const customer = data?.customer

  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconBox}>
          <Trans id='Orders'>Orders</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        <PageMeta title={i18n._(/* i18n */ 'Orders')} metaRobots={['noindex']} />
        <WaitForCustomer waitFor={orders} allowError>
          {customer?.orders && customer.orders.items.length > 0 && (
            <>
              <LayoutTitle icon={iconBox}>
                <Trans id='Orders'>Orders</Trans>
              </LayoutTitle>
              <AccountOrders {...customer} />
            </>
          )}

          {customer?.orders && customer.orders.items.length < 1 && (
            <FullPageMessage
              title={<Trans id='You have no orders yet'>You have no orders yet</Trans>}
              icon={<IconSvg src={iconBox} size='xxl' />}
            >
              <Trans id='Discover our collection and place your first order!'>
                Discover our collection and place your first order!
              </Trans>
            </FullPageMessage>
          )}
        </WaitForCustomer>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account',
  sharedKey: () => 'account/orders',
  Layout: LayoutOverlay,
}
AccountOrdersPage.pageOptions = pageOptions

export default AccountOrdersPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCustomerAccountIsDisabled(context.locale)) return { notFound: true }

  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'bottom',
      up: { href: '/account', title: i18n._(/* i18n */ 'Account') },
    },
  }
}
