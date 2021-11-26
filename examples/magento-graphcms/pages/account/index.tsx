import { useQuery } from '@apollo/client'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  AddressSingleLine,
  ApolloCustomerErrorFullPage,
  SignOutForm,
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
  AppShellTitle,
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
  Title,
  AppBar,
} from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Container, NoSsr } from '@material-ui/core'
import React from 'react'
import MinimalPageShell, { MinimalPageShellProps } from '../../components/AppShell/MinimalPageShell'
import { DefaultPageDocument } from '../../components/GraphQL/DefaultPage.gql'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<MinimalPageShellProps>

function AccountIndexPage() {
  const { data, loading, error } = useQuery(AccountDashboardDocument, {
    fetchPolicy: 'cache-and-network',
    ssr: false,
  })
  const { data: config } = useQuery(StoreConfigDocument)
  const locale = config?.storeConfig?.locale?.replace('_', '-')

  const customer = data?.customer
  const address =
    customer?.addresses?.filter((a) => a?.default_shipping)?.[0] || customer?.addresses?.[0]
  const orders = customer?.orders
  const latestOrder = orders?.items?.[orders?.items?.length - 1]

  if (loading) return <div />
  if (error)
    return (
      <ApolloCustomerErrorFullPage
        error={error}
        signInHref='/account/signin'
        signUpHref='/account/signin'
      />
    )

  const latestOrderDate = new Date(latestOrder?.order_date ?? new Date())

  return (
    <>
      <PageMeta
        title={t`Account`}
        metaDescription={t`Account Dashboard`}
        metaRobots={['noindex']}
      />

      <AppBar>
        <Title component='span' size='small' icon={iconPerson}>
          <Trans>Account</Trans>
        </Title>
      </AppBar>

      <AppShellTitle icon={iconPerson}>
        <Trans>Account</Trans>
      </AppShellTitle>

      <Container maxWidth='md'>
        <NoSsr>
          <AccountMenu>
            <AccountMenuItem
              href='/account/name'
              iconSrc={iconId}
              title={t`Name`}
              subtitle={`${customer?.firstname} ${customer?.lastname}`}
            />
            <AccountMenuItem
              href='/account/contact'
              iconSrc={iconEmailOutline}
              title={t`Contact`}
              subtitle={customer?.email}
            />
            <AccountMenuItem
              href='/account/authentication'
              iconSrc={iconLock}
              title={t`Authentication`}
              subtitle={t`Password`}
            />
            <AccountMenuItem
              href='/account/orders'
              iconSrc={iconBox}
              title={t`Orders`}
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
                          Ordered: () => <Trans>processed</Trans>,
                          Invoiced: () => <Trans>invoiced</Trans>,
                          Shipped: () => <Trans>shipped</Trans>,
                          Refunded: () => <Trans>refunded</Trans>,
                          Canceled: () => <Trans>canceled</Trans>,
                          Returned: () => <Trans>returned</Trans>,
                          Partial: () => <Trans>partially processed</Trans>,
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
              title={t`Addresses`}
              subtitle={address ? <AddressSingleLine {...address} /> : undefined}
            />
            {customer?.reviews.items.length !== 0 && (
              <AccountMenuItem
                href='/account/reviews'
                iconSrc={iconStar}
                title={t`Reviews`}
                subtitle={t`Written ${customer?.reviews.items.length} reviews`}
              />
            )}
            <AccountMenuItem
              iconSrc={iconNewspaper}
              title={t`Newsletter`}
              subtitle={t`Be the first to know about everything new!`}
              endIcon={<CustomerNewsletterToggle color='primary' />}
            />
            <SignOutForm
              button={({ formState }) => (
                <AccountMenuItem
                  iconSrc={iconShutdown}
                  loading={formState.isSubmitting}
                  type='submit'
                  disabled={loading}
                  title={t`Sign out`}
                  noBorderBottom
                />
              )}
            />
          </AccountMenu>
        </NoSsr>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<MinimalPageShellProps> = {
  SharedComponent: MinimalPageShell,
}

AccountIndexPage.pageOptions = pageOptions

export default AccountIndexPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const staticClient = apolloClient(locale)
  const client = apolloClient(locale, true)
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
