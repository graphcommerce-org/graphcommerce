import { useQuery } from '@apollo/client'
import { Container, NoSsr, Switch } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import {
  AddressSingleLine,
  ApolloCustomerErrorFullPage,
  SignOutForm,
} from '@reachdigital/magento-customer'
import {
  AccountDashboardDocument,
  AccountMenu,
  AccountMenuItem,
} from '@reachdigital/magento-customer-account'
import { OrderStateLabelInline } from '@reachdigital/magento-customer-order'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import {
  GetStaticProps,
  TimeAgo,
  iconBox,
  iconEmailOutline,
  iconHome,
  iconId,
  iconLock,
  iconNewspaper,
  iconPersonAlt,
  iconShutdown,
  iconStar,
  Title,
  AppShellTitle,
} from '@reachdigital/next-ui'
import React from 'react'
import MinimalPageShell, { MinimalPageShellProps } from '../../components/AppShell/MinimalPageShell'
import PageShellHeader from '../../components/AppShell/PageShellHeader'
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

  if (loading) return <></>
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
      <PageShellHeader backFallbackHref='/' backFallbackTitle='Home'>
        <Title component='span' size='small' icon={iconPersonAlt}>
          Account
        </Title>
      </PageShellHeader>
      <Container maxWidth='md'>
        <NoSsr>
          <PageMeta title='Account' metaDescription='Account Dashboard' metaRobots={['noindex']} />

          <AppShellTitle icon={iconPersonAlt}>
            <Title>Account</Title>
          </AppShellTitle>

          <AccountMenu>
            <AccountMenuItem
              href='/account/name'
              iconSrc={iconId}
              title='Name'
              subtitle={`${customer?.firstname} ${customer?.lastname}`}
            />
            <AccountMenuItem
              href='/account/contact'
              iconSrc={iconEmailOutline}
              title='Contact'
              subtitle={customer?.email}
            />
            <AccountMenuItem
              href='/account/authentication'
              iconSrc={iconLock}
              title='Authentication'
              subtitle='Password'
            />
            <AccountMenuItem
              href='/account/orders'
              iconSrc={iconBox}
              title='Orders'
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
                          Ordered: () => <span>processed</span>,
                          Invoiced: () => <span>invoiced</span>,
                          Shipped: () => <span>shipped</span>,
                          Refunded: () => <span>refunded</span>,
                          Canceled: () => <span>canceled</span>,
                          Returned: () => <span>returned</span>,
                          Partial: () => <span>partially processed</span>,
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
              title='Addresses'
              subtitle={address ? <AddressSingleLine {...address} /> : undefined}
            />
            {customer?.reviews.items.length !== 0 && (
              <AccountMenuItem
                href='/account/reviews'
                iconSrc={iconStar}
                title='Reviews'
                subtitle={`Written ${customer?.reviews.items.length} reviews`}
              />
            )}
            <AccountMenuItem
              iconSrc={iconNewspaper}
              title='Newsletter'
              subtitle='Be the first to know about everything new!'
              endIcon={<Switch color='primary' />}
            />
            <SignOutForm
              button={({ formState }) => (
                <AccountMenuItem
                  iconSrc={iconShutdown}
                  loading={formState.isSubmitting}
                  type='submit'
                  disabled={loading}
                  title='Sign out'
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
      url: '/account',
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })

  return {
    props: {
      ...(await page).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
