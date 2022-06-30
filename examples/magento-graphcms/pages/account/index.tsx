import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useQuery } from '@graphcommerce/graphql'
import {
  AddressSingleLine,
  ApolloCustomerErrorFullPage,
  SignOutForm,
  useCustomerQuery,
} from '@graphcommerce/magento-customer'
import {
  AccountDashboardDocument,
  AccountMenu,
  AccountMenuItem,
} from '@graphcommerce/magento-customer-account'
import { OrderStateLabelInline } from '@graphcommerce/magento-customer-order'
import { CustomerNewsletterToggle } from '@graphcommerce/magento-newsletter'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  GetStaticProps,
  iconBox,
  iconEmailOutline,
  iconHome,
  iconId,
  iconLock,
  iconNewspaper,
  iconPerson,
  iconShutdown,
  iconStar,
  TimeAgo,
  LayoutTitle,
  LayoutHeader,
  FullPageMessage,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { CircularProgress, Container } from '@mui/material'
import { LayoutMinimal, LayoutMinimalProps } from '../../components'
import { DefaultPageDocument } from '../../graphql/DefaultPage.gql'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutMinimalProps>

function AccountIndexPage() {
  const { data, loading, error, called } = useCustomerQuery(AccountDashboardDocument, {
    fetchPolicy: 'cache-and-network',
  })

  const { data: config } = useQuery(StoreConfigDocument)
  const locale = config?.storeConfig?.locale?.replace('_', '-')

  const customer = data?.customer
  const address =
    customer?.addresses?.filter((a) => a?.default_shipping)?.[0] || customer?.addresses?.[0]
  const orders = customer?.orders
  const latestOrder = orders?.items?.[(orders?.items?.length ?? 1) - 1]

  if (loading || !called)
    return (
      <FullPageMessage icon={<CircularProgress />} title='Loading your account'>
        <Trans id='This may take a second' />
      </FullPageMessage>
    )

  if (error) return <ApolloCustomerErrorFullPage error={error} />

  const latestOrderDate = new Date(latestOrder?.order_date ?? new Date())

  return (
    <>
      <PageMeta title={i18n._(/* i18n */ 'Account')} metaRobots={['noindex']} />

      <LayoutHeader>
        <LayoutTitle component='span' size='small' icon={iconPerson}>
          <Trans id='Account' />
        </LayoutTitle>
      </LayoutHeader>

      <LayoutTitle icon={iconPerson}>
        <Trans id='Account' />
      </LayoutTitle>

      <Container maxWidth='md'>
        <AccountMenu>
          <AccountMenuItem
            href='/account/name'
            iconSrc={iconId}
            title={<Trans id='Name' />}
            subtitle={`${customer?.firstname} ${customer?.lastname}`}
          />
          <AccountMenuItem
            href='/account/contact'
            iconSrc={iconEmailOutline}
            title={<Trans id='Contact' />}
            subtitle={customer?.email}
          />
          <AccountMenuItem
            href='/account/authentication'
            iconSrc={iconLock}
            title={<Trans id='Authentication' />}
            subtitle={<Trans id='Password' />}
          />
          <AccountMenuItem
            href='/account/orders'
            iconSrc={iconBox}
            title={<Trans id='Orders' />}
            subtitle={
              latestOrder ? (
                <>
                  <time dateTime={latestOrderDate.toDateString()}>
                    <TimeAgo date={latestOrderDate} locale={locale} />
                  </time>
                  {', '}
                  {latestOrder?.items && (
                    <OrderStateLabelInline
                      items={latestOrder?.items}
                      renderer={{
                        Ordered: () => <Trans id='processed' />,
                        Invoiced: () => <Trans id='invoiced' />,
                        Shipped: () => <Trans id='shipped' />,
                        Refunded: () => <Trans id='refunded' />,
                        Canceled: () => <Trans id='canceled' />,
                        Returned: () => <Trans id='returned' />,
                        Partial: () => <Trans id='partially processed' />,
                      }}
                    />
                  )}
                </>
              ) : undefined
            }
          />
          <AccountMenuItem
            href='/account/addresses'
            iconSrc={iconHome}
            title={<Trans id='Addresses' />}
            subtitle={address ? <AddressSingleLine {...address} /> : undefined}
          />
          {customer?.reviews.items.length !== 0 && (
            <AccountMenuItem
              href='/account/reviews'
              iconSrc={iconStar}
              title={<Trans id='Reviews' />}
              subtitle={
                <Trans id='Written {0} reviews' values={{ 0: customer?.reviews.items.length }} />
              }
            />
          )}
          <AccountMenuItem
            iconSrc={iconNewspaper}
            title={<Trans id='Newsletter' />}
            subtitle={<Trans id='Be the first to know about everything new!' />}
            endIcon={<CustomerNewsletterToggle color='primary' />}
          />
          <SignOutForm
            // eslint-disable-next-line react/no-unstable-nested-components
            button={({ formState }) => (
              <AccountMenuItem
                iconSrc={iconShutdown}
                loading={formState.isSubmitting}
                type='submit'
                disabled={loading}
                title={<Trans id='Sign out' />}
                noBorderBottom
              />
            )}
          />
        </AccountMenu>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutMinimalProps> = {
  Layout: LayoutMinimal,
}

AccountIndexPage.pageOptions = pageOptions

export default AccountIndexPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const staticClient = graphqlSsrClient(locale)
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: 'account',
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })

  return {
    props: {
      ...(await page).data,
      up: { href: '/', title: 'Home' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
