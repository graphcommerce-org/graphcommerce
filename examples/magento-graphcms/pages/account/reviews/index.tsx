import { useQuery } from '@apollo/client'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { ApolloCustomerErrorFullPage } from '@graphcommerce/magento-customer'
import { AccountDashboardReviewsDocument, AccountReviews } from '@graphcommerce/magento-review'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  FullPageMessage,
  SvgImage,
  iconStar,
  AppShellTitle,
  SheetShellHeader,
  Title,
} from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Container, NoSsr } from '@material-ui/core'
import { GetStaticProps } from 'next'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'
import apolloClient from '../../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<SheetShellProps>

function AccountReviewsPage() {
  const { data, loading, error } = useQuery(AccountDashboardReviewsDocument, {
    fetchPolicy: 'cache-and-network',
    ssr: false,
  })
  const customer = data?.customer

  if (loading) return <div />
  if (error)
    return (
      <ApolloCustomerErrorFullPage
        error={error}
        signInHref='/account/signin'
        signUpHref='/account/signin'
      />
    )

  return (
    <>
      <SheetShellHeader backFallbackTitle={t`Account`} backFallbackHref='/account'>
        <Title size='small' component='span' icon={iconStar}>
          <Trans>Orders</Trans>
        </Title>
      </SheetShellHeader>
      <Container maxWidth='md'>
        <PageMeta
          title={t`Reviews`}
          metaDescription={t`View all your reviews`}
          metaRobots={['noindex']}
        />
        <NoSsr>
          {((customer?.reviews && customer?.reviews.items.length < 1) || !customer?.reviews) && (
            <FullPageMessage
              title={t`You haven't placed any reviews yet`}
              icon={<SvgImage src={iconStar} size={148} alt='star' />}
            >
              <Trans>Discover our collection and write your first review!</Trans>
            </FullPageMessage>
          )}

          {customer?.reviews && customer?.reviews.items.length > 1 && (
            <>
              <AppShellTitle icon={iconStar}>
                <Trans>Reviews</Trans>
              </AppShellTitle>
              {customer?.reviews && <AccountReviews {...customer?.reviews} loading={loading} />}
            </>
          )}
        </NoSsr>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'account',
  SharedComponent: SheetShell,
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
    },
  }
}
