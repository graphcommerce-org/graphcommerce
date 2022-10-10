import { Money } from '@graphcommerce/magento-store'
import { ActionCard, ActionCardItemRenderProps } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Button, Chip } from '@mui/material'
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

  const isFree = amount && amount.value === 0

  const title =
    carrier_title === 'Free Shipping' ? carrier_title : `${carrier_title} ${method_title}`

  return (
    <ActionCard
      {...cardProps}
      title={title}
      details={error_message}
      action={
        <Button
          variant='inline'
          color='secondary'
          sx={{ display: available ? undefined : 'none' }}
          disableRipple
          tabIndex={-1}
        >
          <Trans id='Select' />
        </Button>
      }
      price={
        !isFree ? (
          <Money {...amount} />
        ) : (
          <Chip
            sx={{
              borderRadius: 2,
              fontWeight: 'initial',
              fontVariationSettings: 'initial',
            }}
            label={<Trans id='Free' />}
          />
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
