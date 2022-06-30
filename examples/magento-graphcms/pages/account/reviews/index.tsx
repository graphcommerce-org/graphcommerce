import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useQuery } from '@graphcommerce/graphql'
import { ApolloCustomerErrorFullPage, useCustomerQuery } from '@graphcommerce/magento-customer'
import { AccountDashboardReviewsDocument, AccountReviews } from '@graphcommerce/magento-review'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  FullPageMessage,
  iconStar,
  LayoutOverlayHeader,
  LayoutTitle,
  IconSvg,
  GetStaticProps,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { CircularProgress, Container } from '@mui/material'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'
import { graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountReviewsPage() {
  const { data, loading, error, called } = useCustomerQuery(AccountDashboardReviewsDocument, {
    fetchPolicy: 'cache-and-network',
  })
  const customer = data?.customer

  if (loading || !called)
    return (
      <FullPageMessage icon={<CircularProgress />} title='Loading your account'>
        <Trans id='This may take a second' />
      </FullPageMessage>
    )
  if (error) return <ApolloCustomerErrorFullPage error={error} />

  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconStar}>
          <Trans id='Orders' />
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        <PageMeta title={i18n._(/* i18n */ 'Reviews')} metaRobots={['noindex']} />

        {((customer?.reviews && customer?.reviews.items.length < 1) || !customer?.reviews) && (
          <FullPageMessage
            title={<Trans id="You haven't placed any reviews yet" />}
            icon={<IconSvg src={iconStar} size='xxl' />}
          >
            <Trans id='Discover our collection and write your first review!' />
          </FullPageMessage>
        )}

        {customer?.reviews && customer?.reviews.items.length > 1 && (
          <>
            <LayoutTitle icon={iconStar}>
              <Trans id='Reviews' />
            </LayoutTitle>
            {customer?.reviews && <AccountReviews {...customer?.reviews} loading={loading} />}
          </>
        )}
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account',
  Layout: LayoutOverlay,
}
AccountReviewsPage.pageOptions = pageOptions

export default AccountReviewsPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      up: { href: '/account', title: 'Account' },
    },
  }
}
