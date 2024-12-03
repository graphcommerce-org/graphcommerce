import { NumberFieldElement } from '@graphcommerce/ecommerce-ui'
import type { ProductInterface } from '@graphcommerce/graphql-mesh'
import { ApolloCartErrorAlert, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import type { MoneyProps } from '@graphcommerce/magento-store'
import { Money } from '@graphcommerce/magento-store'
import {
  Button,
  IconSvg,
  MessageSnackbar,
  extendableComponent,
  iconChevronRight,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import type { ButtonProps } from '@mui/material'
import { Alert, Box, Divider, Typography } from '@mui/material'
import React from 'react'
import type { ProductAddToCartMutationVariables } from './ProductAddToCart.gql'
import { ProductAddToCartDocument } from './ProductAddToCart.gql'

const { classes, selectors } = extendableComponent('ProductAddToCart', [
  'root',
  'button',
  'price',
  'divider',
  'buttonWrapper',
] as const)

export type AddToCartProps = React.ComponentProps<typeof ProductAddToCart>

/** @deprecated Please us AddProductsToCartForm and it's components */
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

  const { handleSubmit, formState, error, control, required, data } = form
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

      <NumberFieldElement
        variant='outlined'
        error={formState.isSubmitted && !!formState.errors.quantity}
        required={required.quantity}
        inputProps={{ min: 1 }}
        name='quantity'
        rules={{ required: required.quantity }}
        helperText={formState.isSubmitted && formState.errors.quantity?.message}
        disabled={formState.isSubmitting}
        size='small'
        control={control}
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
          <Trans>Add to Cart</Trans>
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
        severity='success'
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
            <Trans>View shopping cart</Trans>
          </Button>
        }
      >
        <Trans>
          <strong>{name}</strong> has been added to your shopping cart!
        </Trans>
      </MessageSnackbar>
    </Box>
  )
}
ProductAddToCart.selectors = selectors
