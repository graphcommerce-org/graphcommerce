import { ActionCardItemRenderProps } from '@graphcommerce/ecommerce-ui'
import { ActionCard } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, Button } from '@mui/material'
import { GetPickupLocationsForProductsQuery } from '../graphql/GetPickupLocationsForProducts.gql'

export type Location = NonNullable<
  NonNullable<NonNullable<GetPickupLocationsForProductsQuery['pickupLocations']>['items']>[number]
>

export function PickupLocationActionCard(props: ActionCardItemRenderProps<Location>) {
  const { onReset, name, contact_name, street, postcode, city, description, ...cardProps } = props

  return (
    <ActionCard
      {...cardProps}
      title={
        <>
          {name} {contact_name}
        </>
      }
      details={
        <>
          <div>{`${street}, ${postcode} ${city}`}</div>
          {cardProps.selected && description && (
            // eslint-disable-next-line react/no-danger
            <Box
              dangerouslySetInnerHTML={{ __html: description }}
              sx={(theme) => ({
                '& table': {
                  border: '0 transparent',
                  width: 'auto!important',
                  maxWidth: '100%',

                  '& td': {
                    width: 'auto!important',
                    padding: `0 ${theme.spacings.xl}`,

                    '&:first-of-type': {
                      paddingLeft: 0,
                    },
                    '&:last-of-child': {
                      paddingRight: 0,
                    },
                  },
                },
                '& p': {
                  margin: 0,
                },
              })}
            />
          )}
        </>
      }
      action={
        <Button disableRipple variant='inline' color='secondary' tabIndex={-1}>
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
