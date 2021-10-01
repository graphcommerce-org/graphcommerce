import { ProductInterface } from '@graphcommerce/graphql'
import { ApolloCartErrorAlert, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { Money, MoneyProps } from '@graphcommerce/magento-store'
import {
  Button,
  ButtonProps,
  MessageSnackbar,
  SvgImage,
  TextInputNumber,
  iconCheckmark,
  iconChevronRight,
} from '@graphcommerce/next-ui'
import { Divider, Theme, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PageLink from 'next/link'
import React from 'react'
import { ProductAddToCartDocument, ProductAddToCartMutationVariables } from './ProductAddToCart.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    button: {
      marginTop: theme.spacings.sm,
      width: '100%',
    },
    messageIcon: {
      marginBottom: '-2px',
      marginRight: 5,
    },
    price: {
      fontWeight: theme.typography.fontWeightBold,
      margin: `${theme.spacings.sm} 0`,
    },
    divider: {
      margin: `${theme.spacings.xs} 0`,
    },
  }),
  { name: 'AddToCart' },
)

export type AddToCartProps = React.ComponentProps<typeof ProductAddToCart>

export default function ProductAddToCart(
  props: Pick<ProductInterface, 'name'> & {
    variables: Omit<ProductAddToCartMutationVariables, 'cartId'>
    name: string
    price: MoneyProps
    children?: React.ReactNode
  } & Omit<ButtonProps, 'type' | 'name'>,
) {
  const { name, children, variables, price, ...buttonProps } = props

  const form = useFormGqlMutationCart(ProductAddToCartDocument, {
    defaultValues: variables,
  })

  const { handleSubmit, formState, error, muiRegister, required } = form
  const submitHandler = handleSubmit(() => {})
  const classes = useStyles()

  return (
    <form onSubmit={submitHandler} noValidate>
      <Divider className={classes.divider} />

      <Typography variant='h4' className={classes.price}>
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
        classes={{ root: classes.button }}
        loading={formState.isSubmitting}
        color='primary'
        variant='pill'
        size='large'
        {...buttonProps}
      >
        Add to Cart
      </Button>

      <ApolloCartErrorAlert error={error} />

      <MessageSnackbar
        open={!formState.isSubmitting && formState.isSubmitSuccessful && !error?.message}
        variant='pill'
        color='default'
        action={
          <PageLink href='/cart'>
            <Button
              size='medium'
              variant='pill'
              color='secondary'
              endIcon={<SvgImage src={iconChevronRight} shade='inverted' alt='chevron right' />}
            >
              View shopping cart
            </Button>
          </PageLink>
        }
      >
        <div>
          <SvgImage
            src={iconCheckmark}
            loading='eager'
            alt='checkmark'
            className={classes.messageIcon}
          />
          <strong>{name}</strong>&nbsp;has been added to your shopping cart!
        </div>
      </MessageSnackbar>
    </form>
  )
}
