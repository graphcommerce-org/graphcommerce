import { ActionCard } from '@graphcommerce/next-ui'
import { ActionCardItemRenderer } from '@graphcommerce/next-ui/ActionCard/ActionCardListForm'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'
import { AvailableShippingMethodFragment } from '../../AvailableShippingMethod/AvailableShippingMethod.gql'

function showCard(defaultsToHidden?: boolean, available?: boolean, carrierCode?: string) {
  if (carrierCode === 'freeshipping') {
    return defaultsToHidden ?? false
  }
  return !available ? true : defaultsToHidden
}

type ShippingMethodActionCardProps = ActionCardItemRenderer<
  AvailableShippingMethodFragment | null | undefined
>

export function ShippingMethodActionCard(props: ShippingMethodActionCardProps) {
  const { hidden, available, carrier_code, onReset, ...cardProps } = props
  return (
    <ActionCard
      {...cardProps}
      sx={{ background: 'primary.disabled' }}
      hidden={showCard(hidden, available, carrier_code)}
      action={
        <Button
          disableRipple
          variant='text'
          color='secondary'
          sx={{ display: available ? 'contents' : 'none' }}
        >
          <Trans id='Select' />
        </Button>
      }
      reset={
        <Button disableRipple variant='text' color='secondary' onClick={onReset}>
          <Trans id='Change' />
        </Button>
      }
    />
  )
}
