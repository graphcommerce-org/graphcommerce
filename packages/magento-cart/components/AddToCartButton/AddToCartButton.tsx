import { TypedDocumentNode, useQuery } from '@apollo/client'
import { Divider, makeStyles, Theme, Typography } from '@material-ui/core'
import { ProductInterface } from '@reachdigital/graphql'
import { CustomerTokenDocument } from '@reachdigital/magento-customer'
import { Money, MoneyProps } from '@reachdigital/magento-store'
import Button, { ButtonProps } from '@reachdigital/next-ui/Button'
import MessageSnackbar from '@reachdigital/next-ui/Snackbar/MessageSnackbar'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import TextInputNumber from '@reachdigital/next-ui/TextInputNumber'
import { iconCheckmark, iconChevronRight } from '@reachdigital/next-ui/icons'
import { DeepPartial, UnpackNestedValue, Path } from '@reachdigital/react-hook-form'
import PageLink from 'next/link'
import React from 'react'
import { useFormGqlMutationCart } from '../../hooks/useFormGqlMutationCart'
import ApolloCartErrorAlert from '../ApolloCartErrorAlert/ApolloCartErrorAlert'

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

export type AddToCartProps = React.ComponentProps<typeof AddToCartButton>

export default function AddToCartButton<Q, V extends { cartId: string; [index: string]: unknown }>(
  props: Pick<ProductInterface, 'name'> & {
    mutation: TypedDocumentNode<Q, V>
    variables: Omit<V, 'cartId'>
    name: string
    price: MoneyProps
  } & Omit<ButtonProps, 'type' | 'name'>,
) {
  const { name, mutation, variables, price, ...buttonProps } = props

  const form = useFormGqlMutationCart<Q, V>(mutation, {
    defaultValues: variables as UnpackNestedValue<DeepPartial<V>>,
  })

  const { handleSubmit, formState, error, muiRegister, required } = form
  const submitHandler = handleSubmit(() => {})
  const classes = useStyles()

  const { data: tokenQuery } = useQuery(CustomerTokenDocument)

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
        {...muiRegister('quantity' as Path<V>, { required: required.quantity })}
        helperText={formState.isSubmitted && formState.errors.quantity}
        disabled={formState.isSubmitting}
        size='small'
      />

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
