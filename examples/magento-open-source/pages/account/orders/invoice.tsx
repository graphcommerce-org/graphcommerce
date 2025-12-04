import type { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  getCustomerAccountIsDisabled,
  InvoiceDetailPageDocument,
  InvoiceItems,
  InvoiceTotals,
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

function InvoiceDetailPage() {
  const router = useRouter()
  const { invoiceNumber, orderNumber } = router.query

  const invoices = useCustomerQuery(InvoiceDetailPageDocument, {
    fetchPolicy: 'cache-and-network',
    variables: { orderNumber: orderNumber as string },
    skip: !invoiceNumber || !orderNumber,
  })

  const order = invoices.data?.customer?.orders?.items?.[0]
  const invoice = order?.invoices.find((i) => i?.number === invoiceNumber)

  return (
    <>
      <LayoutOverlayHeader hideBackButton>
        <LayoutTitle size='small' component='span' icon={iconInvoice}>
          <Trans>Invoice #{invoiceNumber}</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>
      <WaitForCustomer waitFor={[invoices, router.isReady]} sx={{ height: '100%' }}>
        <Container maxWidth='md'>
          {(!invoiceNumber || !invoice || !order) && (
            <FullPageMessage
              title={<Trans>Invoice not found</Trans>}
              icon={<IconSvg src={iconInvoice} size='xxl' />}
            />
          )}

          {invoiceNumber && invoice && order && (
            <>
              <LayoutTitle
                icon={iconInvoice}
                gutterBottom={false}
                sx={(theme) => ({ mb: theme.spacings.xxs })}
              >
                <Trans>Invoice #{invoiceNumber}</Trans>
              </LayoutTitle>

              <PageMeta title={t`Invoice #${String(invoiceNumber)}`} metaRobots={['noindex']} />

              <OrderDetails order={order} />
              <InvoiceItems invoice={invoice} />
              <InvoiceTotals invoice={invoice} />
              <SalesComments
                comments={invoice.comments}
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
InvoiceDetailPage.pageOptions = pageOptions

export default InvoiceDetailPage

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
