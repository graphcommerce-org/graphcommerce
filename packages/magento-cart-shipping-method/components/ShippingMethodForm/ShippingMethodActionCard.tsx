import { Money } from '@graphcommerce/magento-store'
import { ActionCard, ActionCardItemRenderProps } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, Button } from '@mui/material'
import { AvailableShippingMethodFragment } from '../../AvailableShippingMethod/AvailableShippingMethod.gql'

type ShippingMethodActionCardProps = ActionCardItemRenderProps<
  AvailableShippingMethodFragment | null | undefined
>

export function ShippingMethodActionCard(props: ShippingMethodActionCardProps) {
  const {
    available,
    amount,
    error_message,
    carrier_title,
    carrier_code,
    method_title,
    onReset,
    ...cardProps
  } = props
  let { hidden = false } = props

  const isFree = amount && amount.value === 0

  if (carrier_code !== 'freeshipping') hidden = !available ? true : hidden

  const title =
    carrier_title === 'Free Shipping' ? carrier_title : `${carrier_title} ${method_title}`

  return (
    <ActionCard
      {...cardProps}
      hidden={hidden}
      title={title}
      details={error_message}
      action={
        <Button
          variant='inline'
          color='secondary'
          sx={{ display: available ? undefined : 'none' }}
          disableRipple
        >
          <Trans id='Select' />
        </Button>
      }
      price={
        !isFree ? (
          <Money {...amount} />
        ) : (
          <Box sx={{ color: '#05C642' }}>
            <Trans id='Free' />
          </Box>
        )
      }
      reset={
        <Button variant='inline' color='secondary' onClick={onReset} disableRipple>
          <Trans id='Change' />
        </Button>
      }
    />
  )
}
