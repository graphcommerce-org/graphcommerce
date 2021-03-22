import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import PageLayout from '@reachdigital/magento-app-shell/PageLayout'
import { AccountDashboardReviewsDocument } from '@reachdigital/magento-customer/AccountDashboard/AccountDashboardReviews.gql'
import AccountReviews from '@reachdigital/magento-customer/AccountReviews'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import IconTitle from '@reachdigital/next-ui/IconTitle'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React from 'react'
import OverlayPage from '../../../components/AppShell/OverlayPage'

function AccountReviewsPage() {
  const { data, loading } = useQuery(AccountDashboardReviewsDocument, {
    fetchPolicy: 'cache-and-network',
  })
  const customer = data?.customer

  return (
    <OverlayPage
      title='Reviews'
      variant='bottom'
      fullHeight
      backFallbackHref='/account'
      backFallbackTitle='Account'
    >
      <PageMeta title='Reviews' metaDescription='View all your reviews' metaRobots={['noindex']} />
      <Container maxWidth='md'>
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
    </OverlayPage>
  )
}

AccountReviewsPage.Layout = PageLayout

registerRouteUi('/account/reviews', OverlayPage)

export default AccountReviewsPage
