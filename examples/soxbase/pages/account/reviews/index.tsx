import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { AccountDashboardReviewsDocument } from '@reachdigital/magento-customer/AccountDashboard/AccountDashboardReviews.gql'
import AccountReviews from '@reachdigital/magento-customer/AccountReviews'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import IconHeader from '@reachdigital/next-ui/IconHeader'
import { iconStar } from '@reachdigital/next-ui/icons'
import { GetStaticProps } from 'next'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'
import apolloClient from '../../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<SheetShellProps>

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
        <IconHeader src={iconStar} title='Reviews' alt='reviews' size='large' />
        {customer?.reviews && <AccountReviews {...customer?.reviews} loading={loading} />}
      </NoSsr>
    </Container>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'account',
  SharedComponent: SheetShell,
  sharedKey: () => 'account',
}
AccountReviewsPage.pageOptions = pageOptions

export default AccountReviewsPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variant: 'bottom',
      size: 'max',
      backFallbackHref: '/account',
      backFallbackTitle: 'Account',
    },
  }
}
