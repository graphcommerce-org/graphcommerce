import type { ApolloClient, NormalizedCacheObject } from '@graphcommerce/graphql'
import {
  getCustomerAccountIsDisabled,
  useCustomerQuery,
  WaitForCustomer,
} from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  breakpointVal,
  filterNonNullableKeys,
  iconCreditCard,
  LayoutOverlayHeader,
  LayoutTitle,
  sxx,
  type GetStaticProps,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { Alert, Box, Container, lighten, Typography } from '@mui/material'
import type { PaymentTokenFragment } from '../../graphql/fragments/PaymentToken.gql'
import { CustomerPaymentTokensDocument } from '../../graphql/queries/PaymentTokens.gql'
import { DeletePaymentTokenButton } from '../DeletePaymentTokenButton'

export type CustomerTokensPageProps = Record<string, unknown>
type CustomerTokensGetStaticProps = GetStaticProps<Record<string, unknown>, CustomerTokensPageProps>

export function CustomerTokensPage() {
  const dashboard = useCustomerQuery(CustomerPaymentTokensDocument, {
    fetchPolicy: 'cache-and-network',
  })

  const loading = dashboard.loading && !dashboard.previousData

  const paymentTokens = filterNonNullableKeys(
    dashboard.data?.customerPaymentTokens?.items ??
      dashboard.previousData?.customerPaymentTokens?.items,
  )

  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconCreditCard}>
          <Trans>Payment information</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>

      <Container maxWidth='md'>
        <PageMeta title={t`Payment information`} metaRobots={['noindex']} />

        <LayoutTitle icon={iconCreditCard} sx={(theme) => ({ mb: theme.spacings.xs })}>
          <Trans>Stored payment methods</Trans>
        </LayoutTitle>

        <WaitForCustomer waitFor={!loading}>
          {!paymentTokens?.length && (
            <Alert severity='info'>
              <Trans>No stored payment methods found.</Trans>
            </Alert>
          )}

          <Box sx={sxx((theme) => ({ display: 'grid', rowGap: theme.spacings.xs }))}>
            {paymentTokens?.map((token) => (
              <Box
                key={token.public_hash}
                sx={(theme) => ({
                  px: theme.spacings.xxs,
                  py: theme.spacings.xxs,
                  background:
                    theme.palette.mode === 'light'
                      ? theme.palette.background.default
                      : lighten(theme.palette.background.default, 0.15),
                  ...breakpointVal(
                    'borderRadius',
                    theme.shape.borderRadius * 2,
                    theme.shape.borderRadius * 3,
                    theme.breakpoints.values,
                  ),
                  display: 'grid',
                  gridTemplate: `
                  "details delete"
                  "type method" / 1fr auto
                `,
                  rowGap: 0.5,
                  columnGap: 1,
                })}
              >
                <Box sx={{ gridArea: 'details', color: 'text.secondary' }}>{token.details}</Box>

                <Typography
                  variant='subtitle1'
                  noWrap
                  sx={{ gridArea: 'type', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {token.type}
                </Typography>

                {/* <Box sx={{ gridArea: 'method', color: 'text.secondary' }}>
                  {token.payment_method_code}
                </Box> */}

                {token.details && (
                  <Box sx={{ gridArea: 'details', color: 'text.secondary' }}>{token.details}</Box>
                )}

                <DeletePaymentTokenButton
                  sx={{ gridArea: 'delete' }}
                  publicHash={token.public_hash}
                />
              </Box>
            ))}
          </Box>
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
        up: { href: '/account', title: t`Account` },
      },
    }
  }
}
