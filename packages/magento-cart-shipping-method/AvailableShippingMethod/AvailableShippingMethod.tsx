import { useDisplayInclTax } from '@graphcommerce/magento-cart'
import { Money } from '@graphcommerce/magento-store'
import type { ToggleButtonProps } from '@graphcommerce/next-ui'
import { ToggleButton, extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, FormHelperText } from '@mui/material'
import React from 'react'
import type { SetOptional } from 'type-fest'
import type { AvailableShippingMethodFragment } from './AvailableShippingMethod.gql'

export type AvailableShippingMethodProps = SetOptional<AvailableShippingMethodFragment, 'amount'> &
  Omit<ToggleButtonProps, 'size'>

type OwnerProps = {
  free?: boolean
  error?: boolean
}
const name = 'AvailableShippingMethod'
const parts = ['root', 'title', 'additional', 'error', 'amount'] as const
const { withState } = extendableComponent<OwnerProps, typeof name, typeof parts>(name, parts)

export const AvailableShippingMethod = React.forwardRef(
  (props: AvailableShippingMethodProps, ref) => {
    const {
      price_excl_tax,
      price_incl_tax,
      available,
      disabled,
      carrier_code,
      carrier_title,
      error_message,
      method_code,
      method_title,
      children,
      sx = [],
      ...toggleProps
    } = props

    const amount = useDisplayInclTax() ? price_incl_tax : price_excl_tax

    const classes = withState({
      free: amount?.value === 0,
      error: !!error_message,
    })

    return (
      <ToggleButton
        {...toggleProps}
        className={classes.root}
        ref={ref}
        disabled={!available}
        size='large'
        color='secondary'
        sx={[
          (theme) => ({
            typography: 'body2',
            textAlign: 'left',
            justifyContent: 'space-between',
            alignItems: 'normal',
            display: 'grid',
            gridTemplate: `
              "title      amount"
              "additional additional"
              "error      error"
            `,
            gridTemplateColumns: 'auto min-content',
            columnGap: theme.spacings.xxs,
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Box
          className={classes.title}
          sx={{
            typography: 'subtitle1',
            gridArea: 'title',
          }}
        >
          {carrier_title} {method_title}
        </Box>

        <Box
          className={classes.amount}
          sx={{
            gridArea: 'amount',
            typography: 'subtitle2',
            '&.free': {
              color: 'success.main',
            },
          }}
        >
          {amount?.value === 0 ? <Trans id='Free' /> : <Money {...amount} />}
        </Box>

        {error_message ? (
          <FormHelperText
            className={classes.error}
            disabled={!available}
            variant='standard'
            sx={{ gridArea: 'error' }}
          >
            {error_message}
          </FormHelperText>
        ) : (
          children && (
            <Box
              className={classes.additional}
              sx={{ typography: 'body2', gridArea: 'additional' }}
            >
              {children}
            </Box>
          )
        )}
      </ToggleButton>
    )
  },
)
