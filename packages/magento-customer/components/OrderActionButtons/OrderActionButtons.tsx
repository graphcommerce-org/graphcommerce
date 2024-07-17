import { Button } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Box } from '@mui/material'
import { canCancelOrder } from '../../utils'
import { OrderDetailsFragment } from '../OrderDetails/OrderDetails.gql'
import { OrderItemsFragment } from '../OrderItems/OrderItems.gql'

export type OrderActionButtonsProps = OrderDetailsFragment &
  OrderItemsFragment & {
    isCustomerOrder?: boolean
  }

export function OrderActionButtons(props: OrderActionButtonsProps) {
  const cancelOrder = canCancelOrder(props)
  const { number, isCustomerOrder = false } = props
  return (
    <Box
      sx={[
        (theme) => ({ display: 'flex', justifyContent: 'space-between', mb: theme.spacings.xxs }),
      ]}
    >
      {/* Placeholder, will be further inplemented in: GCOM-1406 */}
      <Button variant='contained' color='primary'>
        <Trans>Reorder</Trans>
      </Button>
      {cancelOrder && isCustomerOrder && (
        <Button variant='contained' color='error' href={`account/orders/cancel?orderId=${number}`}>
          <Trans>Cancel order</Trans>
        </Button>
      )}
    </Box>
  )
}
