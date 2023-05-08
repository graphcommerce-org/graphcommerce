import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useQuery } from '@graphcommerce/graphql'
import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import {
  AccountDashboardDocument,
  AccountMenu,
  AccountMenuItem,
  AddressSingleLine,
  OrderStateLabelInline,
  SignOutForm,
  useCustomerQuery,
  WaitForCustomer,
} from '@graphcommerce/magento-customer'
import { CustomerNewsletterToggle } from '@graphcommerce/magento-newsletter'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
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
} from '@graphcommerce/next-ui'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container } from '@mui/material'
import { InferGetStaticPropsType } from 'next'
import { LayoutMinimal, LayoutMinimalProps } from '../../components'
import { layoutProps } from '../../components/Layout/layout'
import { LayoutDocument } from '../../components/Layout/Layout.gql'

function AccountIndexPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const dashboard = useCustomerQuery(AccountDashboardDocument, {
    fetchPolicy: 'cache-and-network',
  })

  const { data: config } = useQuery(StoreConfigDocument)
  const locale = config?.storeConfig?.locale?.replace('_', '-')

  const customer = dashboard.data?.customer
  const address =
    customer?.addresses?.filter((a) => a?.default_shipping)?.[0] || customer?.addresses?.[0]
  const orders = customer?.orders
  const latestOrder = orders?.items?.[(orders?.items?.length ?? 1) - 1]

  const latestOrderDate = new Date(latestOrder?.order_date ?? new Date())

  return (
    <>
      <PageMeta title={i18n._(/* i18n */ 'Account')} metaRobots={['noindex']} />

      <LayoutHeader>
        <LayoutTitle component='span' size='small' icon={iconPerson}>
          <Trans id='Account' />
        </LayoutTitle>
      </LayoutHeader>

      <WaitForCustomer waitFor={dashboard}>
        <Container maxWidth='md'>
          <LayoutTitle icon={iconPerson}>
            <Trans id='Account' />
          </LayoutTitle>

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
              disableRipple
              iconSrc={iconNewspaper}
              title={<Trans id='Newsletter' />}
              subtitle={<Trans id='Be the first to know about everything new!' />}
              endIcon={<CustomerNewsletterToggle color='primary' />}
              sx={(theme) => ({
                cursor: 'default',
                '&:hover': { background: theme.palette.background.paper },
              })}
            />
            <SignOutForm
              // eslint-disable-next-line react/no-unstable-nested-components
              button={({ formState }) => (
                <AccountMenuItem
                  iconSrc={iconShutdown}
                  loading={formState.isSubmitting}
                  type='submit'
                  title={<Trans id='Sign out' />}
                  noBorderBottom
                />
              )}
            />
          </AccountMenu>
        </Container>
      </WaitForCustomer>
    </>
  )
}

const pageOptions: PageOptions<LayoutMinimalProps> = {
  Layout: LayoutMinimal,
}

AccountIndexPage.pageOptions = pageOptions

export default AccountIndexPage

export const getStaticProps = enhanceStaticProps(
  layoutProps(async () => ({
    props: {
      up: { href: '/', title: 'Home' },
    },
    revalidate: 60 * 20,
  })),
)
