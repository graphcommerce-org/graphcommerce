import { Button } from '@material-ui/core'
import AddToCartSuccessSnackbar from 'components/Cart/AddToCartSuccessSnackbar'
import useRequestCartId from 'components/Cart/useRequestCartId'
import ErrorSnackbar from 'components/Snackbar/ErrorSnackbar'
import { useMutationForm } from 'components/useMutationForm'
import { AddDownloadableProductToCartDocument, useCustomerTokenQuery } from 'generated/apollo'
import Link from 'next/link'
import React from 'react'

type AddDownloadableProductToCartProps = Omit<
  GQLAddDownloadableProductToCartMutationVariables,
  'cartId'
> &
  GQLAddToCartSuccessSnackbarFragment

export default function AddDownloadableProductToCart(props: AddDownloadableProductToCartProps) {
  const { name, ...values } = props
  const { data: tokenQuery } = useCustomerTokenQuery()
  const requestCartId = useRequestCartId()
  const { onSubmit, result } = useMutationForm<
    GQLAddDownloadableProductToCartMutation,
    GQLAddDownloadableProductToCartMutationVariables
  >({
    mutation: AddDownloadableProductToCartDocument,
    values,
    beforeSubmit: async (variables) => ({ ...variables, cartId: await requestCartId() }),
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
      <Button type='submit' disabled={result.loading} color='primary' variant='contained'>
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
