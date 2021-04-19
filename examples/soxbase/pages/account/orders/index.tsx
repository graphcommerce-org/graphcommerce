import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { AccountDashboardOrdersDocument } from '@reachdigital/magento-customer/AccountDashboard/AccountDashboardOrders.gql'
import AccountOrders from '@reachdigital/magento-customer/AccountOrders'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import IconTitle from '@reachdigital/next-ui/IconTitle'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'
import apolloClient from '../../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<Record<string, unknown>>

function AccountOrdersPage() {
  const { data } = useQuery(AccountDashboardOrdersDocument, {
    fetchPolicy: 'cache-and-network',
    ssr: false,
  })
  const customer = data?.customer

  return (
    <Container maxWidth='md'>
      <PageMeta title='Orders' metaDescription='View all your orders' metaRobots={['noindex']} />
      <NoSsr>
        <IconTitle
          iconSrc='/icons/desktop_checkout_box.svg'
          title='Orders'
          alt='orders'
          size='large'
        />
        <AccountOrders {...customer} />
      </NoSsr>
    </Container>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'account',
  SharedComponent: SheetShell,
  sharedKey: () => 'account-orders',
  sharedProps: { variant: 'bottom', size: 'max' },
}
AccountOrdersPage.pageOptions = pageOptions

export default AccountOrdersPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
