import type { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  getCustomerAccountIsDisabled,
  OrderDetails,
  SalesComments,
  ShipmentDetailPageDocument,
  ShipmentDetails,
  ShipmentItems,
  useCustomerQuery,
  WaitForCustomer,
} from '@graphcommerce/magento-customer'
import { CountryRegionsDocument, PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  FullPageMessage,
  iconBox,
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

function ShipmentDetailPage() {
  const router = useRouter()
  const { orderNumber } = router.query
  const shipmentNumber = String(router.query.shipmentNumber)

  const shipments = useCustomerQuery(ShipmentDetailPageDocument, {
    fetchPolicy: 'cache-and-network',
    variables: { orderNumber: orderNumber as string },
    skip: !orderNumber || !shipmentNumber,
  })
  const order = shipments.data?.customer?.orders?.items?.[0]
  const shipment = order?.shipments?.find((s) => s?.number === shipmentNumber)

  return (
    <>
      <LayoutOverlayHeader hideBackButton>
        <LayoutTitle size='small' component='span' icon={iconBox}>
          <Trans>Shipment #{shipmentNumber}</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>
      <WaitForCustomer waitFor={[shipments, router.isReady]} sx={{ height: '100%' }}>
        <Container maxWidth='md'>
          {(!shipmentNumber || !shipment || !order) && (
            <FullPageMessage
              title={<Trans>Shipment not found</Trans>}
              icon={<IconSvg src={iconBox} size='xxl' />}
            />
          )}

          {shipmentNumber && shipment && order && (
            <>
              <LayoutTitle
                icon={iconBox}
                gutterBottom={false}
                sx={(theme) => ({ mb: theme.spacings.xxs })}
              >
                <Trans>Shipment #{shipmentNumber}</Trans>
              </LayoutTitle>

              <PageMeta title={t`Shipment #${shipmentNumber}`} metaRobots={['noindex']} />

              {/* <OrderDetails order={order} /> */}
              <ShipmentDetails shipment={shipment} />
              <ShipmentItems shipment={shipment} />
              <SalesComments
                comments={shipment.comments}
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
ShipmentDetailPage.pageOptions = pageOptions

export default ShipmentDetailPage

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
