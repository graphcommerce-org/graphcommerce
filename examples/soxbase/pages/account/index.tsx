import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { AccountDashboardDocument } from '@reachdigital/magento-customer/AccountDashboard/AccountDashboard.gql'
import AccountHeader from '@reachdigital/magento-customer/AccountHeader'
import AccountLatestOrder from '@reachdigital/magento-customer/AccountLatestOrder'
import AccountMenu from '@reachdigital/magento-customer/AccountMenu'
import AccountMenuItem from '@reachdigital/magento-customer/AccountMenuItem'
import SignOutForm from '@reachdigital/magento-customer/SignOutForm'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../components/AppShell/SheetShell'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<SheetShellProps>

function AccountIndexPage() {
  const { data, loading } = useQuery(AccountDashboardDocument, {
    fetchPolicy: 'cache-and-network',
    ssr: false,
  })

  return (
    <Container maxWidth='md'>
      <NoSsr>
        <PageMeta title='Account' metaDescription='Account Dashboard' metaRobots={['noindex']} />
        <AccountHeader {...data?.customer} loading={loading} />

        <AccountMenu>
          <AccountMenuItem href='/account/orders' startIconSrc='/icons/my_account_orders.svg'>
            Orders
          </AccountMenuItem>

          <AccountMenuItem href='/account/personal' startIconSrc='/icons/my_account_info.svg'>
            Personal information
          </AccountMenuItem>

          <AccountMenuItem href='/account/addresses' startIconSrc='/icons/my_account_addresses.svg'>
            Addresses
          </AccountMenuItem>

          <AccountMenuItem href='/account/reviews' startIconSrc='/icons/my_account_reviews.svg'>
            Reviews
          </AccountMenuItem>

          <SignOutForm
            button={({ formState }) => (
              <AccountMenuItem
                startIconSrc='/icons/my_account_lock.svg'
                loading={formState.isSubmitting}
                type='submit'
                disabled={loading}
              >
                Sign out
              </AccountMenuItem>
            )}
          />
        </AccountMenu>

        <AccountLatestOrder {...data?.customer} loading={loading} />
      </NoSsr>
    </Container>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'account',
  SharedComponent: SheetShell,
  sharedKey: () => 'account',
}
AccountIndexPage.pageOptions = pageOptions

export default AccountIndexPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variant: 'bottom',
      size: 'max',
    },
  }
}
