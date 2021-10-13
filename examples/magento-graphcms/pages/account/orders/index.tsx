import { useQuery } from '@apollo/client'
import { PageOptions, usePageRouter } from '@graphcommerce/framer-next-pages'
import { ApolloCustomerErrorFullPage } from '@graphcommerce/magento-customer'
import {
  AccountDashboardOrdersDocument,
  AccountOrders,
} from '@graphcommerce/magento-customer-account'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  AppShellTitle,
  FullPageMessage,
  GetStaticProps,
  iconBox,
  SheetShellHeader,
  SvgImage,
  Title,
} from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Container, NoSsr } from '@material-ui/core'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'
import apolloClient from '../../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<SheetShellProps>

function AccountOrdersPage() {
  const { query } = usePageRouter()

  const { data, loading, error } = useQuery(AccountDashboardOrdersDocument, {
    fetchPolicy: 'cache-and-network',
    ssr: false,
    variables: {
      pageSize: 5,
      currentPage: Number(query?.page ?? 1),
    },
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
      <SheetShellHeader backFallbackTitle={t`Account`} backFallbackHref='/account'>
        <Title size='small' component='span' icon={iconBox}>
          <Trans>Orders</Trans>
        </Title>
      </SheetShellHeader>
      <Container maxWidth='md'>
        <PageMeta
          title={t`Orders`}
          metaDescription='View all your orders'
          metaRobots={['noindex']}
        />
        <NoSsr>
          {customer?.orders && customer.orders.items.length > 1 && (
            <>
              <AppShellTitle icon={iconBox}>Orders</AppShellTitle>
              <AccountOrders {...customer} />
            </>
          )}

          {customer?.orders && customer.orders.items.length < 1 && (
            <>
              <FullPageMessage
                title={t`You have no orders yet`}
                icon={<SvgImage src={iconBox} size={148} alt='box' />}
              >
                <Trans>Discover our collection and place your first order!</Trans>
              </FullPageMessage>
            </>
          )}
        </NoSsr>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'account',
  SharedComponent: SheetShell,
}
AccountOrdersPage.pageOptions = pageOptions

export default AccountOrdersPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variant: 'bottom',
      size: 'max',
    },
  }
}
