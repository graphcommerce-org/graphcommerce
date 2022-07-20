import {
  useFormProductAddToCart,
  AddToCartSnackbar,
  AddToCartQuantity,
} from '@graphcommerce/magento-product'
import { Money } from '@graphcommerce/magento-store'
import { Button, extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Divider, Box, SxProps, Theme, Typography } from '@mui/material'
import React from 'react'
import { ConfigurableOptionsInput } from '../ConfigurableOptions/ConfigurableOptionsInput'
import { useConfigurableTypeProduct } from '../hooks'

type ConfigurableProductAddToCartProps = {
  optionEndLabels?: Record<string, React.ReactNode>
  children?: React.ReactNode
  additionalButtons?: React.ReactNode
  sx?: SxProps<Theme>
}

const compName = 'ConfigurableOptionsInput' as const
const parts = ['form', 'button', 'finalPrice', 'quantity', 'divider', 'buttonWrapper'] as const
const { classes } = extendableComponent(compName, parts)

export function ConfigurableProductAddToCart(props: ConfigurableProductAddToCartProps) {
  const { children, optionEndLabels, additionalButtons, sx = [] } = props

  const form = useFormProductAddToCart()
  const { formState } = form
  const { uid, name, configurable_product_options_selection, price_range } =
    useConfigurableTypeProduct()

  const regular_price =
    configurable_product_options_selection?.variant?.price_range.minimum_price.final_price ??
    price_range.minimum_price.final_price

  return (
    <Box className={classes.form} sx={[{ width: '100%' }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Divider className={classes.divider} sx={(theme) => ({ my: theme.spacings.sm })} />

      {/* Add to cart component */}
      <ConfigurableOptionsInput optionEndLabels={optionEndLabels} />

      {/* Quantity component */}
      <AddToCartQuantity sx={(theme) => ({ mt: theme.spacings.sm })} />

      <Divider className={classes.divider} sx={(theme) => ({ mt: theme.spacings.sm })} />

      {/* Final price component */}
      <Typography
        component='div'
        variant='h3'
        className={classes.finalPrice}
        sx={(theme) => ({ marginTop: theme.spacings.sm })}
      >
        <Money {...regular_price} key={`${uid}-${regular_price.value}`} />
      </Typography>

      {/* Renders any given child components */}

      {children}

      {/* Submit button component */}
      <Box
        sx={(theme) => ({ display: 'flex', alignItems: 'center', columnGap: theme.spacings.xs })}
        className={classes.buttonWrapper}
      >
        <Button
          type='submit'
          loading={formState.isSubmitting}
          color='primary'
          variant='pill'
          size='large'
          className={classes.button}
          sx={(theme) => ({
            marginTop: theme.spacings.sm,
            marginBottom: theme.spacings.sm,
            width: '100%',
          })}
        >
          <Trans id='Add to Cart' />
        </Button>
        {additionalButtons}
      </Box>

      <AddToCartSnackbar name={name} />
    </Box>
  )
}
