import { TypedDocumentNode, useQuery } from '@apollo/client'
import { Button, ButtonProps } from '@material-ui/core'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import ErrorSnackbarLoader from '@reachdigital/next-ui/Snackbar/ErrorSnackbarLoader'
import MessageSnackbarLoader from '@reachdigital/next-ui/Snackbar/MessageSnackbarLoader'
import {
  useMutationForm,
  UnpackNestedValue,
  DeepPartial,
} from '@reachdigital/next-ui/useMutationForm'
import { CustomerTokenDocument } from 'generated/documents'
import React from 'react'
import useRequestCartId from './useRequestCartId'

export default function AddToCartButton<
  TData,
  TVariables = { cartId: string; [index: string]: unknown }
>(
  props: Pick<GQLProductInterface, 'name'> & {
    mutation: TypedDocumentNode<TData, TVariables>
    variables: Omit<TVariables, 'cartId'>
  } & Omit<ButtonProps, 'type' | 'name'>,
) {
  const { name, mutation, variables, ...buttonProps } = props

  const requestCartId = useRequestCartId()
  const { onSubmit, loading, called, error } = useMutationForm<TData, TVariables>({
    mutation,
    values: (variables as unknown) as UnpackNestedValue<DeepPartial<TVariables>>,
    onBeforeSubmit: async (vars) => ({ ...vars, cartId: await requestCartId() }),
  })

  const { data: tokenQuery } = useQuery(CustomerTokenDocument)
  const requireAuth = Boolean(tokenQuery?.customerToken && !tokenQuery?.customerToken.valid)

  return requireAuth ? (
    <PageLink href='/account/signin?back=1'>
      <Button color='primary' variant='contained' {...buttonProps}>
        Add to Cart
      </Button>
    </PageLink>
  ) : (
    <form onSubmit={onSubmit} noValidate>
      <Button type='submit' disabled={loading} color='primary' variant='contained' {...buttonProps}>
        Add to Cart
      </Button>

      <ErrorSnackbarLoader
        open={called && !loading && !!error?.message}
        message={<>{error?.message}</>}
      />
      <MessageSnackbarLoader
        open={called && !loading && !error?.message}
        message={
          <>
            Added <em>&lsquo;{name ?? 'Product'}&rsquo;</em> to cart
          </>
        }
      />
    </form>
  )
}
