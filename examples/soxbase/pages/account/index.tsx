import { useQuery } from '@apollo/client'
import { Container, NoSsr, Switch } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import {
  AccountDashboardDocument,
  AccountMenu,
  AccountMenuItem,
  SignOutForm,
} from '@reachdigital/magento-customer'
import AddressSingleLine from '@reachdigital/magento-customer/AddressSingleLine'
import OrderStateLabelInline from '@reachdigital/magento-customer/OrderStateLabelInline'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import DaysAgo from '@reachdigital/next-ui/DaysAgo'
import IconHeader from '@reachdigital/next-ui/IconHeader'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import {
  iconBox,
  iconEmailOutline,
  iconHome,
  iconId,
  iconLock,
  iconNewspaper,
  iconPersonAlt,
  iconShutdown,
  iconStar,
} from '@reachdigital/next-ui/icons'
import React from 'react'
import PageShell, { PageShellProps } from '../../components/AppShell/PageShell'
import { DefaultPageDocument } from '../../components/GraphQL/DefaultPage.gql'
import MessageAuthRequired from '../../components/MessageAuthRequired'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<PageShellProps>

function AccountIndexPage() {
  const { data, loading } = useQuery(AccountDashboardDocument, {
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

  if (!loading && !customer) return <MessageAuthRequired />

  return (
    <Container maxWidth='md'>
      <NoSsr>
        <PageMeta title='Account' metaDescription='Account Dashboard' metaRobots={['noindex']} />
        <IconHeader src={iconPersonAlt} title='Account' alt='account' size='large' />
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
                  <DaysAgo date={new Date(latestOrder?.order_date ?? new Date())} locale={locale} />
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
  )
}

const pageOptions: PageOptions<PageShellProps> = {
  SharedComponent: PageShell,
  sharedKey: () => 'page',
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
