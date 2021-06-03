import { useQuery } from '@apollo/client'
import { Container, NoSsr, Switch } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import {
  AccountDashboardDocument,
  AccountMenu,
  AccountMenuItem,
  SignOutForm,
} from '@reachdigital/magento-customer'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
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
import FullPageShell, { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import { DefaultPageDocument } from '../../components/GraphQL/DefaultPage.gql'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<FullPageShellProps>

function AccountIndexPage() {
  const { data, loading } = useQuery(AccountDashboardDocument, {
    fetchPolicy: 'cache-and-network',
    ssr: false,
  })

  // todo(yvo): skeleton

  const isLoading = typeof data?.customer === 'undefined'

  const address =
    data?.customer?.addresses?.filter((a) => a.default_shipping)?.[0] ||
    data?.customer?.addresses?.[0]

  const latestOrder = data?.customer?.orders?.items[data?.customer?.orders?.items.length - 1]

  const totalMsInDay = 1000 * 60 * 60 * 24
  const today = new Date()
  const then = new Date(latestOrder?.order_date ?? today)
  const timeDiff = today.getTime() - then.getTime()
  const days = Math.floor(timeDiff / totalMsInDay)

  return (
    <Container maxWidth='md'>
      <PageMeta title='Account' metaDescription='Account Dashboard' metaRobots={['noindex']} />
      <NoSsr>
        <IconHeader src={iconPersonAlt} title='Account' alt='account' size='large' />
        <AccountMenu>
          <AccountMenuItem
            href='/account/name'
            iconSrc={iconId}
            title='Name'
            subtitle={`${data?.customer?.firstname} ${data?.customer?.lastname}`}
            // loading={isLoading}
          />
          <AccountMenuItem
            href='/account/contact'
            iconSrc={iconEmailOutline}
            title='Contact'
            subtitle={data?.customer?.email}
            // loading={isLoading}
          />
          <AccountMenuItem
            href='/account/authentication'
            iconSrc={iconLock}
            title='Authentication'
            subtitle='Password'
            // loading={isLoading}
          />
          <AccountMenuItem
            href='/account/orders'
            iconSrc={iconBox}
            title='Orders'
            subtitle={
              <>
                {`${days} days ago`},{' '}
                <OrderStateLabel // todo(yvo): OrderStateLabelInline component
                  items={data?.customer?.orders?.items ?? []}
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
              </>
            }
            // loading={isLoading}
          />
          <AccountMenuItem
            href='/account/addresses'
            iconSrc={iconHome}
            title='Addresses'
            subtitle={<AddressSingleLine {...address} />}
            // loading={isLoading}
          />
          <AccountMenuItem
            href='/account/reviews'
            iconSrc={iconStar}
            title='Reviews'
            subtitle={`Written ${data?.customer?.reviews.items.length} reviews`}
          />
          <AccountMenuItem
            iconSrc={iconNewspaper}
            title='Newsletter'
            subtitle='Be the first to know about everything new!'
            endIcon={<Switch color='primary' />} // todo(yvo): NewsletterSubscriptionForm
          />
          <SignOutForm
            button={({ formState }) => (
              <AccountMenuItem
                iconSrc={iconShutdown}
                loading={formState.isSubmitting}
                type='submit'
                disabled={loading}
                title='Sign out'
              />
            )}
          />
        </AccountMenu>
      </NoSsr>
    </Container>
  )
}

const pageOptions: PageOptions<FullPageShellProps> = {
  SharedComponent: FullPageShell,
  sharedKey: () => 'page',
}

AccountIndexPage.pageOptions = pageOptions

export default AccountIndexPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: `account`,
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
