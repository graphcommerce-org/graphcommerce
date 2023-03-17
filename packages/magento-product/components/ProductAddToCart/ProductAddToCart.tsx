import type { ProductInterface } from '@graphcommerce/graphql-mesh'
import { ApolloCartErrorAlert, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { Money, MoneyProps } from '@graphcommerce/magento-store'
import {
  Button,
  MessageSnackbar,
  TextInputNumber,
  iconChevronRight,
  IconSvg,
  extendableComponent,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Divider, Typography, ButtonProps, Box, Alert } from '@mui/material'
import React from 'react'
import { ProductAddToCartDocument, ProductAddToCartMutationVariables } from './ProductAddToCart.gql'

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
    variables: Omit<ProductAddToCartMutationVariables, 'cartId'>
    name: string
    price: MoneyProps
    additionalButtons?: React.ReactNode
    children?: React.ReactNode
  } & Omit<ButtonProps, 'type' | 'name'>,
) {
  const { name, children, variables, price, sx, additionalButtons, ...buttonProps } = props

  const form = useFormGqlMutationCart(ProductAddToCartDocument, {
    defaultValues: { ...variables },
  })

  const { handleSubmit, formState, error, muiRegister, required, data } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <Box component='form' onSubmit={submitHandler} noValidate className={classes.root} sx={sx}>
      <Divider className={classes.divider} sx={(theme) => ({ margin: `${theme.spacings.xs} 0` })} />

      <Typography
        variant='h4'
        className={classes.price}
        sx={(theme) => ({
          fontWeight: theme.typography.fontWeightBold,
          margin: `${theme.spacings.sm} 0`,
        })}
      >
        <Money {...price} />
      </Typography>

      <TextInputNumber
        variant='outlined'
        error={formState.isSubmitted && !!formState.errors.quantity}
        required={required.quantity}
        inputProps={{ min: 1 }}
        {...muiRegister('quantity', { required: required.quantity })}
        helperText={formState.isSubmitted && formState.errors.quantity?.message}
        disabled={formState.isSubmitting}
        size='small'
      />
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

      <ApolloCartErrorAlert error={error} />

      {data?.addProductsToCart?.user_errors.map((e) => (
        <Box key={e?.code}>
          <Alert severity='error'>{e?.message}</Alert>
        </Box>
      ))}

      <MessageSnackbar
        open={
          !formState.isSubmitting &&
          formState.isSubmitSuccessful &&
          !error?.message &&
          !data?.addProductsToCart?.user_errors?.length
        }
        variant='pill'
        autoHide
        action={
          <Button
            href='/cart'
            id='view-shopping-cart-button'
            size='medium'
            variant='pill'
            color='secondary'
            endIcon={<IconSvg src={iconChevronRight} />}
          >
            <Trans id='View shopping cart' />
          </Button>
        }
      >
        <Trans
          id='<0>{name}</0> has been added to your shopping cart!'
          components={{ 0: <strong /> }}
          values={{ name }}
        />
      </MessageSnackbar>
    </Box>
  )
}
ProductAddToCart.selectors = selectors
