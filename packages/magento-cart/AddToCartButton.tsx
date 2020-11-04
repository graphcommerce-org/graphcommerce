import { TypedDocumentNode, useQuery } from '@apollo/client'
import { Button, ButtonProps } from '@material-ui/core'
import { CustomerTokenDocument } from '@reachdigital/magento-customer/CustomerToken.gql'
import { ProductInterface } from '@reachdigital/magento-graphql'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import ErrorSnackbarLoader from '@reachdigital/next-ui/Snackbar/ErrorSnackbarLoader'
import MessageSnackbarLoader from '@reachdigital/next-ui/Snackbar/MessageSnackbarLoader'
import {
  useMutationForm,
  UnpackNestedValue,
  DeepPartial,
} from '@reachdigital/next-ui/useMutationForm'
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
  const mutationForm = useMutationForm<Q, V>(mutation, {
    defaultValues: { ...variables },
    onBeforeSubmit: async (vars) => ({ ...vars, cartId: await requestCartId() }),
  })
  const { handleSubmit, errors, formState } = mutationForm

  const { data: tokenQuery } = useQuery(CustomerTokenDocument)
  const requireAuth = Boolean(tokenQuery?.customerToken && !tokenQuery?.customerToken.valid)

  return requireAuth ? (
    <PageLink href='/account/signin?back=1'>
      <Button color='primary' variant='contained' {...buttonProps}>
        Add to Cart
      </Button>
    </PageLink>
  ) : (
    <form onSubmit={handleSubmit} noValidate>
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
        open={formState.isSubmitted && !!errors.submission}
        message={<>{errors.submission?.message}</>}
      />
      <MessageSnackbarLoader
        open={formState.isSubmitSuccessful && !errors?.submission?.message}
        message={
          <>
            Added <em>&lsquo;{name ?? 'Product'}&rsquo;</em> to cart
          </>
        }
      />
    </form>
  )
}
