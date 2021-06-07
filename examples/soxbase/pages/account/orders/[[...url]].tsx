import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import { PageOptions, usePageRouter } from '@reachdigital/framer-next-pages'
import { AccountDashboardOrdersDocument, AccountOrders } from '@reachdigital/magento-customer'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import IconHeader from '@reachdigital/next-ui/IconHeader'
import MessageAuthRequired from '@reachdigital/next-ui/MessageAuthRequired'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { iconBox } from '@reachdigital/next-ui/icons'
import { GetStaticPaths } from 'next'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'
import apolloClient from '../../../lib/apolloClient'

type RouteProps = { url: string[] }
type GetPageStaticProps = GetStaticProps<SheetShellProps>
type GetPageStaticPaths = GetStaticPaths<RouteProps>

function AccountOrdersPage() {
  const { query } = usePageRouter()
  const { data, loading } = useQuery(AccountDashboardOrdersDocument, {
    fetchPolicy: 'cache-and-network',
    ssr: false,
    variables: {
      pageSize: 5,
      currentPage: Number(query?.url?.[1] ?? 1),
    },
  })
  const customer = data?.customer

  if (!loading && !customer)
    return <MessageAuthRequired signInHref='/account/signin' signUpHref='/account/signin' />

  return (
    <Container maxWidth='md'>
      <PageMeta title='Orders' metaDescription='View all your orders' metaRobots={['noindex']} />
      <NoSsr>
        <IconHeader src={iconBox} title='Orders' alt='orders' size='large' />
        <AccountOrders {...customer} />
      </NoSsr>
    </Container>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'account',
  SharedComponent: SheetShell,
  sharedKey: () => 'account-orders',
}
AccountOrdersPage.pageOptions = pageOptions

export default AccountOrdersPage

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const urls = ['account/orders']

  const paths = locales
    .map((locale) => urls.map((url) => ({ params: { url: [url] }, locale })))
    .flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variant: 'bottom',
      size: 'max',
      backFallbackHref: '/account',
      backFallbackTitle: 'Account',
    },
  }
}
