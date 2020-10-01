import { TypedDocumentNode, useQuery } from '@apollo/client'
import { Button, ButtonProps } from '@material-ui/core'
import useRequestCartId from 'components/Cart/useRequestCartId'
import ErrorSnackbarLoader from 'components/Snackbar/ErrorSnackbarLoader'
import MessageSnackbarLoader from 'components/Snackbar/MessageSnackbarLoader'
import { useMutationForm } from 'components/useMutationForm'
import { CustomerTokenDocument } from 'generated/documents'
import Link from 'next/link'
import React from 'react'
import { UnpackNestedValue, DeepPartial } from 'react-hook-form'

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
    <Link href='/account/signin?back=1' passHref>
      <Button color='primary' variant='contained' {...buttonProps}>
        Add to Cart
      </Button>
    </Link>
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
