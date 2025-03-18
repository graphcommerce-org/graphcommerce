import type { ApolloClient, NormalizedCacheObject } from '@graphcommerce/graphql'
import {
  getCustomerAccountIsDisabled,
  useCustomerQuery,
  WaitForCustomer,
} from '@graphcommerce/magento-customer'
import { Money, PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  iconCreditCard,
  LayoutOverlayHeader,
  LayoutTitle,
  type GetStaticProps,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/macro'
import { Box, Container } from '@mui/material'
import { useState } from 'react'
import { CustomerPaymentTokensDocument } from '../../graphql/queries/PaymentTokens.gql'

export type CustomerTokensPageProps = Record<string, unknown>
type CustomerTokensGetStaticProps = GetStaticProps<Record<string, unknown>, CustomerTokensPageProps>

export function CustomerTokensPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const dashboard = useCustomerQuery(CustomerPaymentTokensDocument, {
    fetchPolicy: 'cache-and-network',
  })

  const loading = dashboard.loading && !dashboard.previousData

  const paymentTokens =
    dashboard.data?.customerPaymentTokens?.items ??
    dashboard.previousData?.customerPaymentTokens?.items

  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconCreditCard}>
          <Trans id='Store Credit'>Store Credit</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>

      <Container maxWidth='md'>
        <WaitForCustomer waitFor={!loading}>
          <PageMeta title={i18n._('Store Credit')} metaRobots={['noindex']} />

          <LayoutTitle
            icon={iconCreditCard}
            sx={(theme) => ({ mb: theme.spacings.xs })}
            gutterBottom={false}
          >
            <Trans id='Store Credit'>Store Credit</Trans>
          </LayoutTitle>

          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}></Box>
        </WaitForCustomer>
      </Container>
    </>
  )
}

export function createGetStaticProps(
  client: ApolloClient<NormalizedCacheObject>,
): CustomerTokensGetStaticProps {
  return async (context) => {
    if (getCustomerAccountIsDisabled(context.locale)) return { notFound: true }

    const conf = client.query({ query: StoreConfigDocument })

    return {
      props: {
        apolloState: await conf.then(() => client.cache.extract()),
        variantMd: 'bottom',
        up: { href: '/account', title: i18n._('Account') },
      },
    }
  }
}
