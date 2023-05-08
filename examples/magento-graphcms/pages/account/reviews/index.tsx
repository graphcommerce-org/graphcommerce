import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useCustomerQuery, WaitForCustomer } from '@graphcommerce/magento-customer'
import { AccountDashboardReviewsDocument, AccountReviews } from '@graphcommerce/magento-review'
import { PageMeta } from '@graphcommerce/magento-store'
import {
  FullPageMessage,
  iconStar,
  LayoutOverlayHeader,
  LayoutTitle,
  IconSvg,
} from '@graphcommerce/next-ui'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container } from '@mui/material'
import { InferGetStaticPropsType } from 'next'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'
import { layoutProps } from '../../../components/Layout/layout'

function AccountReviewsPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
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
  layoutProps: { variantMd: 'bottom' },
}
AccountReviewsPage.pageOptions = pageOptions

export default AccountReviewsPage

export const getStaticProps = enhanceStaticProps(
  layoutProps(() => ({
    props: { up: { href: '/account', title: 'Account' } },
  })),
)
