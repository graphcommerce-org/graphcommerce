import { filterNonNullableKeys, SectionContainer, sxx } from '@graphcommerce/next-ui'
import { Box, type SxProps, type Theme } from '@mui/material'
import { CancelOrderForm } from '../../CancelOrder/CancelOrderForm'
import { CreditMemoCard } from '../../CreditMemo/CreditMemoCard'
import { InvoiceCard } from '../../Invoice/InvoiceCard'
import { ShipmentCard } from '../../Shipment/ShipmentCard'
import { SalesComments } from '../OrderComments/SalesComments'
import type { OrderAdditionalFragment } from './OrderAdditional.gql'

export type OrderAdditionalProps = {
  order: OrderAdditionalFragment
  sx?: SxProps<Theme>
  children?: React.ReactNode
  additionalForms?: React.ReactNode
}

export function OrderAdditional(props: OrderAdditionalProps) {
  const { order, children, sx, additionalForms } = props
  const comments = filterNonNullableKeys(order.comments)
  const invoices = filterNonNullableKeys(order.invoices)
  const shipments = filterNonNullableKeys(order.shipments)
  const creditMemos = filterNonNullableKeys(order.credit_memos)

  return (
    <Box
      sx={sxx(
        (theme) => ({ mb: theme.spacings.lg, display: 'grid', rowGap: theme.spacings.xs }),
        sx,
      )}
    >
      {comments.length > 0 ? <SalesComments comments={comments} /> : null}

      {shipments.map((shipment) => (
        <ShipmentCard key={shipment.id} shipment={shipment} orderNumber={order.number} />
      ))}

      {invoices.map((invoice) => (
        <InvoiceCard key={invoice.id} invoice={invoice} orderNumber={order.number} />
      ))}

      {creditMemos.map((creditMemo) => (
        <CreditMemoCard key={creditMemo.id} creditMemo={creditMemo} orderNumber={order.number} />
      ))}

      {children}

      <CancelOrderForm order={order} />
      {additionalForms}
    </Box>
  )
}
