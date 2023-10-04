import type { ProductInterface } from '@graphcommerce/graphql-mesh'
import { ApolloCartErrorAlert, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import {
  ProductAddToCartDocument,
  ProductAddToCartMutationVariables,
} from '@graphcommerce/magento-product'
import { MoneyProps } from '@graphcommerce/magento-store'
import {
  Button,
  MessageSnackbar,
  TextInputNumber,
  iconChevronRight,
  IconSvg,
  extendableComponent,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { ButtonProps, Box, Alert } from '@mui/material'
import React from 'react'

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
    defaultValues: {
      sku: variables.sku,
      selectedOptions: variables.selectedOptions,
      quantity: variables.quantity,
    },
  })

  const { handleSubmit, formState, error, muiRegister, required, data } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <Box component='form' onSubmit={submitHandler} noValidate className={classes.root}>
      <Box>
        <TextInputNumber
          size='small'
          variant='standard'
          inputProps={{ min: 1 }}
          InputProps={{ disableUnderline: true }}
          error={!!formState.errors.quantity}
          {...muiRegister('quantity', { required: required.quantity })}
          helperText={formState.errors.quantity?.message}
          sx={sx}
        />
      </Box>
      {children}
      <Box
        className={classes.buttonWrapper}
        sx={{
          alignSelf: 'flex-start',
        }}
      >
        <Button
          type='submit'
          className={classes.button}
          loading={formState.isSubmitting}
          color='primary'
          variant='text'
          size='medium'
          endIcon={<IconSvg src={iconChevronRight} />}
          {...buttonProps}
        >
          <Trans id='Add to Cart' />
        </Button>
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
