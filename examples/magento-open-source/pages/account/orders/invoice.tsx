import type { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  getCustomerAccountIsDisabled,
  InvoiceDetailPageDocument,
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
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/macro'
import { Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import type { LayoutOverlayProps } from '../../../components'
import { LayoutOverlay } from '../../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function InvoiceDetailPage() {
  const router = useRouter()
  const { invoiceNumber } = router.query

  const invoices = useCustomerQuery(InvoiceDetailPageDocument, {
    fetchPolicy: 'cache-and-network',
    variables: { invoiceNumber: invoiceNumber as string },
    skip: !invoiceNumber,
  })
  const invoice = invoices.data?.customer?.invoices?.items?.[0]

  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconInvoice}>
          <Trans>Invoice #{invoiceNumber}</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>
      <WaitForCustomer waitFor={[invoices, router.isReady]} sx={{ height: '100%' }}>
        <Container maxWidth='md'>
          {(!invoiceNumber || !invoice) && (
            <FullPageMessage
              title={<Trans>Invoice not found</Trans>}
              icon={<IconSvg src={iconInvoice} size='xxl' />}
            />
          )}

          {invoiceNumber && invoice && (
            <>
              <LayoutTitle
                icon={iconInvoice}
                gutterBottom={false}
                sx={(theme) => ({ mb: theme.spacings.xxs })}
              >
                <Trans>Invoice #{invoiceNumber}</Trans>
              </LayoutTitle>

              <PageMeta
                title={i18n._(/* i18n */ 'Invoice #{invoiceNumber}', { invoiceNumber })}
                metaRobots={['noindex']}
              />

              <InvoiceDetails invoice={invoice} />
              <InvoiceItems invoice={invoice} />
              <InvoiceTotals invoice={invoice} />
              <SalesComments comments={invoice.comments} />
            </>
          )}
        </Container>
      </WaitForCustomer>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account',
  sharedKey: () => 'account/invoices',
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
      up: { href: '/account/orders', title: i18n._(/* i18n */ 'Orders') },
    },
  }
}
