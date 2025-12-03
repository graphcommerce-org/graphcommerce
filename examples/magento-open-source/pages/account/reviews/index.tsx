import type { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  getCustomerAccountIsDisabled,
  useCustomerQuery,
  WaitForCustomer,
} from '@graphcommerce/magento-customer'
import { AccountDashboardReviewsDocument, AccountReviews } from '@graphcommerce/magento-review'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  FullPageMessage,
  iconStar,
  IconSvg,
  LayoutOverlayHeader,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { Container } from '@mui/material'
import type { LayoutOverlayProps } from '../../../components'
import { LayoutOverlay } from '../../../components'
import { graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountReviewsPage() {
  const reviewsDashboard = useCustomerQuery(AccountDashboardReviewsDocument, {
    fetchPolicy: 'cache-and-network',
  })
  const customer = reviewsDashboard.data?.customer

  return (
    <>
      <PageMeta title={t`Reviews`} metaRobots={['noindex']} />

      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconStar}>
          <Trans>Reviews</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>

      <WaitForCustomer waitFor={reviewsDashboard}>
        <Container maxWidth='md'>
          {((customer?.reviews && customer?.reviews.items.length < 1) || !customer?.reviews) && (
            <FullPageMessage
              title={<Trans>You haven't placed any reviews yet</Trans>}
              icon={<IconSvg src={iconStar} size='xxl' />}
            >
              <Trans>Discover our collection and write your first review!</Trans>
            </FullPageMessage>
          )}

          {customer?.reviews && customer?.reviews.items.length >= 1 && (
            <>
              <LayoutTitle icon={iconStar}>
                <Trans>Reviews</Trans>
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

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCustomerAccountIsDisabled(context.locale)) return { notFound: true }

  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      up: { href: '/account', title: t`Account` },
    },
  }
}
