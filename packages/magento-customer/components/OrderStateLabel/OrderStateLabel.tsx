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
const parts = ['root'] as const
const { withState } = extendableComponent<OwnerState, typeof componentName, typeof parts>(
  componentName,
  parts,
)

export function OrderStateLabel(props: OrderStateLabelProps) {
  const { sx = [], status, short = false } = props
  const orderState = getOrderState(props)

  const classes = withState({ orderState })

  return (
    <Box
      component='span'
      className={classes.root}
      sx={[
        (theme) => ({
          fontStyle: 'italic',
          fontWeight: 'normal',
          '&.orderStatePending': {
            color: theme.palette.text.disabled,
          },
          '&.orderStateProcessing': {
            color: theme.palette.info.main,
          },
          '&.orderStateComplete': {
            color: theme.palette.success.main,
          },
          '&.orderStateClosed': {
            color: theme.palette.text.disabled,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {short ? status : <Trans>Order status: {status}</Trans>}
    </Box>
  )
}
