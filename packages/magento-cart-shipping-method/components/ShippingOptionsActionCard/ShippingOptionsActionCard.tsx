import { ActionCard, IconSvg, iconHome } from '@graphcommerce/next-ui'
import { ActionCardItemRenderer } from '@graphcommerce/next-ui/ActionCard/ActionCardListForm'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { AvailableShippingMethodFragment } from '../../AvailableShippingMethod/AvailableShippingMethod.gql'

type ShippingOptionsActionCardProps = ActionCardItemRenderer<
  AvailableShippingMethodFragment | null | undefined
>

export function ShippingOptionsActionCard(props: ShippingOptionsActionCardProps) {
  const {
    onReset,
    hidden,
    selected,
    amount,
    available,
    carrier_code,
    carrier_title,
    method_code,
    error_message,
    ...cardProps
  } = props
  const { push } = useRouter()

  if (cardProps.value === -1) {
    return (
      <ActionCard
        {...cardProps}
        image={<IconSvg src={iconHome} size='large' />}
        title={<Trans id='New address' />}
        details={<Trans id='Add new address' />}
        action={
          <Button disableRipple variant='text' color='secondary'>
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

  return (
    <ActionCard
      {...cardProps}
      image={<IconSvg src={iconHome} size='large' />}
      title={carrier_title}
      details='Blablbabla'
      action={
        <Button disableRipple variant='text' color='secondary'>
          <Trans id='Select' />
        </Button>
      }
      reset={
        <Button disableRipple variant='text' color='secondary' onClick={onReset}>
          <Trans id='Change' />
        </Button>
      }
      secondaryAction={
        <Button
          color='secondary'
          variant='text'
          onMouseDown={(e) => {
            e.stopPropagation()
          }}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            // push(`/checkout/customer/addresses/edit?addressId=${id}`)
          }}
        >
          <Trans id='Edit address' />
        </Button>
      }
    />
  )
}
