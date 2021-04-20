import { TypedDocumentNode, useQuery } from '@apollo/client'
import { makeStyles } from '@material-ui/core'
import Checkmark from '@material-ui/icons/Check'
import { CustomerTokenDocument } from '@reachdigital/magento-customer/CustomerToken.gql'
import { ProductInterface } from '@reachdigital/magento-graphql'
import Button, { ButtonProps } from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import MessageSnackbar from '@reachdigital/next-ui/Snackbar/MessageSnackbar'
import TextInputNumber from '@reachdigital/next-ui/TextInputNumber'
import {
  DeepPartial,
  UnpackNestedValue,
  Path,
  useFormGqlMutation,
} from '@reachdigital/react-hook-form'
import PageLink from 'next/link'
import React from 'react'
import useRequestCartId from './useRequestCartId'

const useStyles = makeStyles(
  (theme: Theme) => ({
    button: {
      marginTop: theme.spacings.sm,
      width: '100%',
    },
    quantityInput: {
      backgroundColor: theme.palette.background.default,
    },
  }),
  { name: 'AccountMenu' },
)

export default function AddToCartButton<Q, V extends { cartId: string; [index: string]: unknown }>(
  props: Pick<ProductInterface, 'name'> & {
    mutation: TypedDocumentNode<Q, V>
    variables: Omit<V, 'cartId'>
    name: string
  } & Omit<ButtonProps, 'type' | 'name'>,
) {
  const { name, mutation, variables, ...buttonProps } = props
  const requestCartId = useRequestCartId()
  const form = useFormGqlMutation<Q, V>(mutation, {
    defaultValues: { ...variables } as UnpackNestedValue<DeepPartial<V>>,
    onBeforeSubmit: async (vars) => ({ ...vars, cartId: await requestCartId() }),
  })

  const { handleSubmit, formState, error, muiRegister, required } = form
  const submitHandler = handleSubmit(() => {})
  const classes = useStyles()

  const { data: tokenQuery } = useQuery(CustomerTokenDocument)

  return (
    <form onSubmit={submitHandler} noValidate>
      <TextInputNumber
        variant='outlined'
        error={formState.isSubmitted && !!formState.errors.quantity}
        label='Quantity'
        required={required.quantity}
        inputProps={{ min: 1 }}
        {...muiRegister('quantity' as Path<V>, { required: required.quantity })}
        helperText={formState.isSubmitted && formState.errors.quantity}
        disabled={formState.isSubmitting}
        size='small'
        classes={{ quantity: classes.quantityInput }}
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

      <ApolloErrorAlert error={error} />

      <MessageSnackbar
        open={formState.isSubmitSuccessful && !error?.message}
        variant='pill'
        color='default'
        action={
          <PageLink href='/cart'>
            <Button
              size='medium'
              variant='pill'
              color='secondary'
              endIcon={
                <PictureResponsiveNext
                  alt='desktop_chevron_right'
                  width={28}
                  height={28}
                  src='/icons/desktop_chevron_right_white.svg'
                  type='image/svg+xml'
                />
              }
            >
              View shopping cart
            </Button>
          </PageLink>
        }
      >
        <>
          <Checkmark />
          <strong>{name}</strong>&nbsp;has been added to your shopping cart!
        </>
      </MessageSnackbar>
    </form>
  )
}
