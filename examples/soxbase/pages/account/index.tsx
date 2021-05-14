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
import { iconBox, iconHome, iconPerson, iconShutdown, iconStar } from '@reachdigital/next-ui/icons'
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
          <AccountMenuItem href='/account/orders' iconSrc={iconBox}>
            Orders
          </AccountMenuItem>

          <AccountMenuItem href='/account/personal' iconSrc={iconPerson}>
            Personal information
          </AccountMenuItem>

          <AccountMenuItem href='/account/addresses' iconSrc={iconHome}>
            Addresses
          </AccountMenuItem>

          <AccountMenuItem href='/account/reviews' iconSrc={iconStar}>
            Reviews
          </AccountMenuItem>

          <SignOutForm
            button={({ formState }) => (
              <AccountMenuItem
                iconSrc={iconShutdown}
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
