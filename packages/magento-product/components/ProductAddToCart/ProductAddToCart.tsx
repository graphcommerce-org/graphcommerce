import type { ProductInterface } from '@graphcommerce/graphql-mesh'
import { Money, MoneyProps } from '@graphcommerce/magento-store'
import { Button, extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Divider, Typography, ButtonProps, Box } from '@mui/material'
import React from 'react'
import { AddToCartSnackbar } from './AddToCartErrors'
import { AddToCartQuantity } from './AddToCartQuantity'
import { useFormProductAddToCart } from './ProductAddToCartForm'

const { classes, selectors } = extendableComponent('ProductAddToCart', [
  'root',
  'button',
  'price',
  'divider',
  'buttonWrapper',
] as const)

export type AddToCartProps = React.ComponentProps<typeof ProductAddToCart>

export function ProductAddToCart(
  props: Pick<ProductInterface, 'name'> & {
    name: string
    price: MoneyProps
    additionalButtons?: React.ReactNode
    children?: React.ReactNode
  } & Omit<ButtonProps, 'type' | 'name'>,
) {
  const { name, children, price, sx, additionalButtons, ...buttonProps } = props
  const form = useFormProductAddToCart()
  const { formState } = form

  return (
    <Box className={classes.root} sx={sx}>
      <Divider className={classes.divider} sx={(theme) => ({ my: theme.spacings.sm })} />

      <Typography
        variant='h4'
        className={classes.price}
        sx={(theme) => ({
          fontWeight: theme.typography.fontWeightBold,
          my: theme.spacings.sm,
        })}
      >
        <Money {...price} />
      </Typography>

      <AddToCartQuantity sx={(theme) => ({ my: theme.spacings.sm })} />

      {children}
      <Box
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          columnGap: theme.spacings.xs,
        })}
        className={classes.buttonWrapper}
      >
        <Button
          type='submit'
          className={classes.button}
          loading={formState.isSubmitting}
          color='primary'
          variant='pill'
          size='large'
          sx={(theme) => ({
            marginTop: theme.spacings.sm,
            marginBottom: theme.spacings.sm,
            width: '100%',
          })}
          {...buttonProps}
        >
          <Trans id='Add to Cart' />
        </Button>
        {additionalButtons}
      </Box>

      <AddToCartSnackbar name={name} />
    </Box>
  )
}

ProductAddToCart.selectors = selectors
