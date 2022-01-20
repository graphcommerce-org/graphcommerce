import { ProductInterface } from '@graphcommerce/graphql'
import { ApolloCartErrorAlert, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { Money, MoneyProps } from '@graphcommerce/magento-store'
import {
  Button,
  MessageSnackbar,
  TextInputNumber,
  iconChevronRight,
  SvgIcon,
  componentSlots,
} from '@graphcommerce/next-ui'
import { Divider, Typography, ButtonProps, Box } from '@mui/material'
import PageLink from 'next/link'
import React from 'react'
import { ProductAddToCartDocument, ProductAddToCartMutationVariables } from './ProductAddToCart.gql'

const { componentName, classes, selectors } = componentSlots('ProductAddToCart', [
  'button',
  'price',
  'divider',
] as const)

export type AddToCartProps = React.ComponentProps<typeof ProductAddToCart>

export default function ProductAddToCart(
  props: Pick<ProductInterface, 'name'> & {
    variables: Omit<ProductAddToCartMutationVariables, 'cartId'>
    name: string
    price: MoneyProps
    children?: React.ReactNode
  } & Omit<ButtonProps, 'type' | 'name'>,
) {
  const { name, children, variables, price, sx, ...buttonProps } = props

  const form = useFormGqlMutationCart(ProductAddToCartDocument, {
    defaultValues: { ...variables },
  })

  const { handleSubmit, formState, error, muiRegister, required } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <Box component='form' onSubmit={submitHandler} noValidate className={componentName} sx={sx}>
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
        helperText={formState.isSubmitted && formState.errors.quantity}
        disabled={formState.isSubmitting}
        size='small'
      />
      {children}
      <Button
        type='submit'
        className={classes.button}
        loading={formState.isSubmitting}
        color='primary'
        variant='pill'
        size='large'
        sx={(theme) => ({
          marginTop: theme.spacings.sm,
          width: '100%',
        })}
        {...buttonProps}
      >
        Add to Cart
      </Button>

      <ApolloCartErrorAlert error={error} />

      <MessageSnackbar
        open={!formState.isSubmitting && formState.isSubmitSuccessful && !error?.message}
        variant='pill'
        action={
          <PageLink href='/cart'>
            <Button
              size='medium'
              variant='pill'
              color='secondary'
              endIcon={<SvgIcon src={iconChevronRight} />}
            >
              View shopping cart
            </Button>
          </PageLink>
        }
      >
        <>
          <strong>{name}</strong>&nbsp;has been added to your shopping cart!
        </>
      </MessageSnackbar>
    </Box>
  )
}
ProductAddToCart.selectors = selectors
