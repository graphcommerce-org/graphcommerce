import { TypedDocumentNode, useQuery } from '@apollo/client'
import { Button, ButtonProps } from '@material-ui/core'
import { CustomerTokenDocument } from '@reachdigital/magento-customer/CustomerToken.gql'
import { ProductInterface } from '@reachdigital/magento-graphql'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import ErrorSnackbarLoader from '@reachdigital/next-ui/Snackbar/ErrorSnackbarLoader'
import MessageSnackbarLoader from '@reachdigital/next-ui/Snackbar/MessageSnackbarLoader'
import useFormGqlMutation, {
  DeepPartial,
  FieldError,
  UnpackNestedValue,
} from '@reachdigital/react-hook-form/useFormGqlMutation'
import React from 'react'
import useRequestCartId from './useRequestCartId'

export default function AddToCartButton<Q, V extends { cartId: string; [index: string]: unknown }>(
  props: Pick<ProductInterface, 'name'> & {
    mutation: TypedDocumentNode<Q, V>
    variables: Omit<V, 'cartId'>
  } & Omit<ButtonProps, 'type' | 'name'>,
) {
  const { name, mutation, variables, ...buttonProps } = props

  const requestCartId = useRequestCartId()
  const form = useFormGqlMutation<Q, V>(mutation, {
    defaultValues: { ...variables } as UnpackNestedValue<DeepPartial<V>>,
    onBeforeSubmit: async (vars) => ({ ...vars, cartId: await requestCartId() }),
  })
  const { handleSubmit, errors, formState, error } = form
  const submitHandler = handleSubmit(() => {})

  const { data: tokenQuery } = useQuery(CustomerTokenDocument)
  const requireAuth = Boolean(tokenQuery?.customerToken && !tokenQuery?.customerToken.valid)

  return requireAuth ? (
    <PageLink href='/account/signin'>
      <Button color='primary' variant='contained' {...buttonProps}>
        Add to Cart
      </Button>
    </PageLink>
  ) : (
    <form onSubmit={submitHandler} noValidate>
      <Button
        type='submit'
        disabled={formState.isSubmitting}
        color='primary'
        variant='contained'
        {...buttonProps}
      >
        Add to Cart
      </Button>

      <ErrorSnackbarLoader
        open={formState.isSubmitted && !!error}
        message={<>{error?.message}</>}
      />
      <MessageSnackbarLoader
        open={formState.isSubmitSuccessful && !error?.message}
        message={
          <>
            Added <em>&lsquo;{name ?? 'Product'}&rsquo;</em> to cart
          </>
        }
      />
    </form>
  )
}
