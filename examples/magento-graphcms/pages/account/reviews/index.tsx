import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useQuery } from '@graphcommerce/graphql'
import { ApolloCustomerErrorFullPage } from '@graphcommerce/magento-customer'
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
import { t, Trans } from '@lingui/macro'
import { Container, NoSsr } from '@mui/material'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'
import { graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

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
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconStar}>
          <Trans>Orders</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>
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
              icon={<IconSvg src={iconStar} size='xxl' />}
            >
              <Trans>Discover our collection and write your first review!</Trans>
            </FullPageMessage>
          )}

          {customer?.reviews && customer?.reviews.items.length > 1 && (
            <>
              <LayoutTitle icon={iconStar}>
                <Trans>Reviews</Trans>
              </LayoutTitle>
              {customer?.reviews && <AccountReviews {...customer?.reviews} loading={loading} />}
            </>
          )}
        </NoSsr>
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
