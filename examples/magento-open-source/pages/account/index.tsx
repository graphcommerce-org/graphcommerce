import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import {
  AccountDashboardDocument,
  AccountMenu,
  AccountMenuItem,
  AddressSingleLine,
  getCustomerAccountIsDisabled,
  OrderStateLabel,
  SignOutForm,
  useCustomerQuery,
  WaitForCustomer,
} from '@graphcommerce/magento-customer'
import { CustomerNewsletterToggle } from '@graphcommerce/magento-newsletter'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  iconBin,
  iconBox,
  iconEmailOutline,
  iconHome,
  iconId,
  iconLock,
  iconNewspaper,
  iconPerson,
  iconShutdown,
  iconStar,
  LayoutHeader,
  LayoutTitle,
  RelativeToTimeFormat,
  revalidate,
} from '@graphcommerce/next-ui'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { Container } from '@mui/material'
import type { LayoutMinimalProps } from '../../components'
import { LayoutDocument, LayoutMinimal } from '../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutMinimalProps>

function AccountIndexPage() {
  const dashboard = useCustomerQuery(AccountDashboardDocument, {
    fetchPolicy: 'cache-and-network',
  })

  const customer = dashboard.data?.customer
  const address =
    customer?.addresses?.filter((a) => a?.default_shipping)?.[0] || customer?.addresses?.[0]
  const latestOrder = customer?.orders?.items?.[0]

  return (
    <>
      <PageMeta title={t`Account`} metaRobots={['noindex']} />

      <LayoutHeader>
        <LayoutTitle component='span' size='small' icon={iconPerson}>
          <Trans>Account</Trans>
        </LayoutTitle>
      </LayoutHeader>

      <WaitForCustomer waitFor={dashboard}>
        <Container maxWidth='md'>
          <LayoutTitle icon={iconPerson}>
            <Trans>Account</Trans>
          </LayoutTitle>

          <AccountMenu>
            <AccountMenuItem
              href='/account/name'
              iconSrc={iconId}
              title={<Trans>Personal details</Trans>}
              subtitle={`${customer?.firstname} ${customer?.lastname}`}
            />
            <AccountMenuItem
              href='/account/contact'
              iconSrc={iconEmailOutline}
              title={<Trans>Contact</Trans>}
              subtitle={customer?.email}
            />
            <AccountMenuItem
              href='/account/authentication'
              iconSrc={iconLock}
              title={<Trans>Authentication</Trans>}
              subtitle={<Trans>Password</Trans>}
            />
            <AccountMenuItem
              href='/account/addresses'
              iconSrc={iconHome}
              title={<Trans>Addresses</Trans>}
              subtitle={address ? <AddressSingleLine {...address} /> : undefined}
            />
            <AccountMenuItem
              href='/account/orders'
              iconSrc={iconBox}
              title={<Trans>Orders</Trans>}
              subtitle={
                latestOrder ? (
                  <>
                    <RelativeToTimeFormat styleFormat='short' date={latestOrder?.order_date} />
                    {', '}
                    <OrderStateLabel {...latestOrder} short />
                  </>
                ) : undefined
              }
            />
            {customer?.reviews.items.length !== 0 && (
              <AccountMenuItem
                href='/account/reviews'
                iconSrc={iconStar}
                title={<Trans>Reviews</Trans>}
                subtitle={<Trans>Written {customer?.reviews.items.length} reviews</Trans>}
              />
            )}
            <AccountMenuItem
              disableRipple
              iconSrc={iconNewspaper}
              title={<Trans>Newsletter</Trans>}
              subtitle={<Trans>Be the first to know about everything new!</Trans>}
              endIcon={<CustomerNewsletterToggle color='primary' />}
              sx={(theme) => ({
                cursor: 'default',
                '&:hover': { background: theme.vars.palette.background.paper },
              })}
            />

            <SignOutForm
              // eslint-disable-next-line react/no-unstable-nested-components
              button={({ formState }) => (
                <AccountMenuItem
                  iconSrc={iconShutdown}
                  loading={formState.isSubmitting}
                  type='submit'
                  title={<Trans>Sign out</Trans>}
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

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCustomerAccountIsDisabled(context.locale)) return { notFound: true }

  const staticClient = graphqlSsrClient(context)
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  return {
    props: {
      ...(await layout).data,
      up: { href: '/', title: t`Home` },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: revalidate(),
  }
}
