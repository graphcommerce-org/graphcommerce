import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  useCustomerQuery,
  WaitForCustomer,
  AccountDashboardOrdersDocument,
  AccountOrders,
} from '@graphcommerce/magento-customer'
import { PageMeta } from '@graphcommerce/magento-store'
import {
  FullPageMessage,
  iconBox,
  LayoutOverlayHeader,
  IconSvg,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container } from '@mui/material'
import { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'
import { getLayout } from '../../../components/Layout/layout'

function AccountOrdersPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { query } = useRouter()

  const orders = useCustomerQuery(AccountDashboardOrdersDocument, {
    fetchPolicy: 'cache-and-network',
    variables: {
      pageSize: 5,
      currentPage: Number(query?.page ?? 1),
    },
  })
  const { data } = orders
  const customer = data?.customer

  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconBox}>
          <Trans id='Orders' />
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        <PageMeta title={i18n._(/* i18n */ 'Orders')} metaRobots={['noindex']} />
        <WaitForCustomer waitFor={orders}>
          {customer?.orders && customer.orders.items.length > 0 && (
            <>
              <LayoutTitle icon={iconBox}>Orders</LayoutTitle>
              <AccountOrders {...customer} />
            </>
          )}

          {customer?.orders && customer.orders.items.length < 1 && (
            <FullPageMessage
              title={<Trans id='You have no orders yet' />}
              icon={<IconSvg src={iconBox} size='xxl' />}
            >
              <Trans id='Discover our collection and place your first order!' />
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
  layoutProps: { variantMd: 'bottom' },
}
AccountOrdersPage.pageOptions = pageOptions

export default AccountOrdersPage

export const getStaticProps = enhanceStaticProps(getLayout, () => ({
  props: {
    up: { href: '/account', title: 'Account' },
  },
}))
