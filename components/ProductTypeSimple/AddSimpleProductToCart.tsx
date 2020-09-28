import { Button } from '@material-ui/core'
import AddToCartSuccessSnackbar from 'components/Cart/AddToCartSuccessSnackbar'
import useRequestCartId from 'components/Cart/useRequestCartId'
import ErrorSnackbar from 'components/Snackbar/ErrorSnackbar'
import { useMutationForm } from 'components/useMutationForm'
import { AddSimpleProductToCartDocument, useCustomerTokenQuery } from 'generated/apollo'
import Link from 'next/link'
import React from 'react'

type AddSimpleProductToCartProps = Omit<GQLAddSimpleProductToCartMutationVariables, 'cartId'> &
  GQLAddToCartSuccessSnackbarFragment

export default function AddSimpleProductToCart(props: AddSimpleProductToCartProps) {
  const { name, ...values } = props
  const { data: tokenQuery, loading: loadingToken } = useCustomerTokenQuery()
  const requestCartId = useRequestCartId()

  const { onSubmit, called, loading, error } = useMutationForm<
    GQLAddSimpleProductToCartMutation,
    GQLAddSimpleProductToCartMutationVariables
  >({
    mutation: AddSimpleProductToCartDocument,
    values,
    onBeforeSubmit: async (variables) => ({ ...variables, cartId: await requestCartId() }),
  })

  const requireAuth = Boolean(tokenQuery?.customerToken && !tokenQuery?.customerToken.valid)

  return requireAuth ? (
    <Link href='/account/signin?back=1' passHref>
      <Button color='primary' variant='contained'>
        Add to Cart
      </Button>
    </Link>
  ) : (
    <form onSubmit={onSubmit} noValidate>
      <Button type='submit' disabled={loadingToken || loading} color='primary' variant='contained'>
        Add to Cart
      </Button>

      <ErrorSnackbar open={result.called && !result.loading && !!result.error?.message}>
        {result.error?.message}
      </ErrorSnackbar>
      <AddToCartSuccessSnackbar
        open={result.called && !result.loading && !result.error?.message}
        name={name}
      />
    </form>
  )
}
