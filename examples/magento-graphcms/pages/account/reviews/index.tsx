import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useCustomerQuery, WaitForCustomer } from '@graphcommerce/magento-customer'
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
import { Container } from '@mui/material'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'
import { graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountReviewsPage() {
  const reviewsDashboard = useCustomerQuery(AccountDashboardReviewsDocument, {
    fetchPolicy: 'cache-and-network',
  })
  const customer = reviewsDashboard.data?.customer

  return (
    <>
      <PageMeta title={i18n._(/* i18n */ 'Reviews')} metaRobots={['noindex']} />

      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconStar}>
          <Trans id='Reviews' />
        </LayoutTitle>
      </LayoutOverlayHeader>

      <WaitForCustomer waitFor={reviewsDashboard}>
        <Container maxWidth='md'>
          {((customer?.reviews && customer?.reviews.items.length < 1) || !customer?.reviews) && (
            <FullPageMessage
              title={<Trans id="You haven't placed any reviews yet" />}
              icon={<IconSvg src={iconStar} size='xxl' />}
            >
              <Trans id='Discover our collection and write your first review!' />
            </FullPageMessage>
          )}

          {customer?.reviews && customer?.reviews.items.length >= 1 && (
            <>
              <LayoutTitle icon={iconStar}>
                <Trans id='Reviews' />
              </LayoutTitle>
              {customer?.reviews && <AccountReviews {...customer?.reviews} />}
            </>
          )}
        </Container>
      </WaitForCustomer>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account',
  Layout: LayoutOverlay,
  layoutProps: {
    variantMd: 'bottom',
  },
}
AccountReviewsPage.pageOptions = pageOptions

export default AccountReviewsPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      up: { href: '/account', title: i18n._(/* i18n */ 'Account') },
    },
  }
}
