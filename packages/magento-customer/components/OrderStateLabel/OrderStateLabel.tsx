import { extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Box, SxProps, Theme } from '@mui/material'
import { OrderStateProps, OrderState, getOrderState } from '../../utils'

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
            color: theme.vars.palette.text.disabled,
          },
          '&.orderStateProcessing': {
            color: theme.vars.palette.info.main,
          },
          '&.orderStateComplete': {
            color: theme.vars.palette.success.main,
          },
          '&.orderStateClosed': {
            color: theme.vars.palette.text.disabled,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {short ? status : <Trans>Order status: {status}</Trans>}
    </Box>
  )
}
