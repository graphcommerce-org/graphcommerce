import { Button } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Box } from '@mui/material'
import { canCancelOrder } from '../../utils'
import { OrderDetailsFragment } from '../OrderDetails/OrderDetails.gql'
import { OrderItemsFragment } from '../OrderItems/OrderItems.gql'
import { ReorderItems } from '../ReorderItems/ReorderItems'

export type OrderActionButtonsProps = OrderDetailsFragment & OrderItemsFragment

export function OrderActionButtons(props: OrderActionButtonsProps) {
  const cancelOrder = canCancelOrder(props)
  const { number, items } = props
  return (
    <Box
      sx={[
        (theme) => ({ display: 'flex', justifyContent: 'space-between', mb: theme.spacings.xxs }),
      ]}
    >
      <ReorderItems orderNumber={number} items={items} />
      {cancelOrder && (
        <Button variant='contained' color='error' href={`account/orders/cancel?orderId=${number}`}>
          <Trans>Cancel order</Trans>
        </Button>
      )}
    </Box>
  )
}
