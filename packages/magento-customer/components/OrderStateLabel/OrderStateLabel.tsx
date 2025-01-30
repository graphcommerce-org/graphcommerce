import { extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import type { OrderState, OrderStateProps } from '../../utils'
import { getOrderState } from '../../utils'

type OrderStateLabelPropsBase = OrderStateProps

export type OrderStateLabelProps = {
  sx?: SxProps<Theme>
  short?: boolean
} & OrderStateLabelPropsBase

type OwnerState = {
  orderState: OrderState
}
const componentName = 'OrderStateLabel'
const parts = ['root', 'status'] as const
const { withState } = extendableComponent<OwnerState, typeof componentName, typeof parts>(
  componentName,
  parts,
)

export function OrderStateLabel(props: OrderStateLabelProps) {
  const { sx = [], status, short = false } = props
  const orderState = getOrderState(props)

  const classes = withState({ orderState })

  const statusWithColor = (
    <Box
      className={classes.status}
      component='span'
      sx={(theme) => ({
        '&.orderStatePending': { color: 'text.disabled' },
        '&.orderStateProcessing': { color: 'info.main' },
        '&.orderStateComplete': { color: 'success.main' },
        '&.orderStateClosed': { color: 'text.disabled' },
      })}
    >
      {status}
    </Box>
  )

  return (
    <Box component='span' className={classes.root} sx={sx}>
      {short ? statusWithColor : <Trans>Order status: {statusWithColor}</Trans>}
    </Box>
  )
}
