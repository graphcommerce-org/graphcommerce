import { ActionCard } from '@graphcommerce/next-ui'
import { ActionCardItemRenderProps } from '@graphcommerce/next-ui/ActionCard/ActionCardListForm'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'
import { GetPickupLocationsForProductsQuery } from '../graphql/GetPickupLocationsForProducts.gql'

export type Location = NonNullable<
  NonNullable<NonNullable<GetPickupLocationsForProductsQuery['pickupLocations']>['items']>[number]
>

export function PickupLocationActionCard(props: ActionCardItemRenderProps<Location>) {
  const { onReset, name, contact_name, street, ...cardProps } = props

  return (
    <ActionCard
      {...cardProps}
      title={
        <>
          {name} {contact_name}
        </>
      }
      details={<>{street}</>}
      action={
        <Button disableRipple variant='inline' color='secondary'>
          <Trans id='Select' />
        </Button>
      }
      reset={
        <Button disableRipple variant='inline' color='secondary' onClick={onReset}>
          <Trans id='Change' />
        </Button>
      }
    />
  )
}
