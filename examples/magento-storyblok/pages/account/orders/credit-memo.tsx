import type { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  CreditMemoDetailPageDocument,
  CreditMemoItems,
  CreditMemoTotals,
  getCustomerAccountIsDisabled,
  OrderDetails,
  SalesComments,
  useCustomerQuery,
  WaitForCustomer,
} from '@graphcommerce/magento-customer'
import { CountryRegionsDocument, PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  FullPageMessage,
  iconInvoice,
  IconSvg,
  LayoutOverlayHeader,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import type { LayoutOverlayProps } from '../../../components'
import { LayoutOverlay } from '../../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function CreditMemoDetailPage() {
  const router = useRouter()
  const { orderNumber, creditMemoNumber } = router.query

  const creditMemos = useCustomerQuery(CreditMemoDetailPageDocument, {
    fetchPolicy: 'cache-and-network',
    variables: { orderNumber: orderNumber as string },
    skip: !orderNumber || !creditMemoNumber,
  })
  const order = creditMemos.data?.customer?.orders?.items?.[0]
  const creditMemo = order?.credit_memos?.find((c) => c?.number === creditMemoNumber)

  return (
    <>
      <LayoutOverlayHeader hideBackButton>
        <LayoutTitle size='small' component='span' icon={iconInvoice}>
          <Trans>Credit Memo #{creditMemoNumber}</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>
      <WaitForCustomer waitFor={[creditMemos, router.isReady]} sx={{ height: '100%' }}>
        <Container maxWidth='md'>
          {(!creditMemoNumber || !creditMemo || !order) && (
            <FullPageMessage
              title={<Trans>Credit Memo not found</Trans>}
              icon={<IconSvg src={iconInvoice} size='xxl' />}
            />
          )}

          {creditMemoNumber && creditMemo && order && (
            <>
              <LayoutTitle
                icon={iconInvoice}
                gutterBottom={false}
                sx={(theme) => ({ mb: theme.spacings.xxs })}
              >
                <Trans>Credit Memo #{creditMemoNumber}</Trans>
              </LayoutTitle>

              <PageMeta
                title={t`Credit Memo #${String(creditMemoNumber)}`}
                metaRobots={['noindex']}
              />

              <OrderDetails order={order} />
              {/* <CreditMemoDetails creditMemo={creditMemo} /> */}
              <CreditMemoItems creditMemo={creditMemo} />
              <CreditMemoTotals creditMemo={creditMemo} />
              <SalesComments
                comments={creditMemo.comments}
                sx={(theme) => ({ mb: theme.spacings.lg })}
              />
            </>
          )}
        </Container>
      </WaitForCustomer>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account',
  Layout: LayoutOverlay,
}
CreditMemoDetailPage.pageOptions = pageOptions

export default CreditMemoDetailPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCustomerAccountIsDisabled(context.locale)) return { notFound: true }

  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)
  const config = client.query({ query: StoreConfigDocument })

  const countryRegions = staticClient.query({
    query: CountryRegionsDocument,
  })

  return {
    props: {
      ...(await countryRegions).data,
      apolloState: await config.then(() => client.cache.extract()),
      variantMd: 'bottom',
      up: { href: '/account/orders', title: t`Orders` },
    },
  }
}
