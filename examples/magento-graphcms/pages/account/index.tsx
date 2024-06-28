import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useQuery } from '@graphcommerce/graphql'
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
  iconBin,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container } from '@mui/material'
import { LayoutDocument, LayoutMinimal, LayoutMinimalProps } from '../../components'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutMinimalProps>

function AccountIndexPage() {
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
                    {latestOrder?.items && <OrderStateLabelInline items={latestOrder?.items} />}
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
            {import.meta.graphCommerce.magentoVersion >= 246 &&
              import.meta.graphCommerce.customerDeleteEnabled && (
                <AccountMenuItem
                  href='/account/delete'
                  disableRipple
                  iconSrc={iconBin}
                  title={<Trans id='Delete account' />}
                />
              )}

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

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const staticClient = graphqlSsrClient(locale)
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({ query: LayoutDocument, fetchPolicy: 'cache-first' })

  return {
    props: {
      ...(await layout).data,
      up: { href: '/', title: i18n._(/* i18n */ 'Home') },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
