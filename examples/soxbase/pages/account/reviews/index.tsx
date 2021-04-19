import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { AccountDashboardReviewsDocument } from '@reachdigital/magento-customer/AccountDashboard/AccountDashboardReviews.gql'
import AccountReviews from '@reachdigital/magento-customer/AccountReviews'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import IconTitle from '@reachdigital/next-ui/IconTitle'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'

function AccountReviewsPage() {
  const { data, loading } = useQuery(AccountDashboardReviewsDocument, {
    fetchPolicy: 'cache-and-network',
    ssr: false,
  })
  const customer = data?.customer

  return (
    <Container maxWidth='md'>
      <PageMeta title='Reviews' metaDescription='View all your reviews' metaRobots={['noindex']} />
      <NoSsr>
        <IconTitle
          iconSrc='/icons/desktop_reviews.svg'
          title='Reviews'
          alt='reviews'
          size='large'
        />
        {customer?.reviews && <AccountReviews {...customer?.reviews} loading={loading} />}
      </NoSsr>
    </Container>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'account',
  SharedComponent: SheetShell,
  sharedKey: () => 'account',
  sharedProps: { variant: 'bottom', size: 'max' },
}
AccountReviewsPage.pageOptions = pageOptions

export default AccountReviewsPage
