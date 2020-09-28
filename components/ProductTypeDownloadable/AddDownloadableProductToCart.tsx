import { Button } from '@material-ui/core'
import useRequestCartId from 'components/Cart/useRequestCartId'
import ErrorSnackbarLoader from 'components/Snackbar/ErrorSnackbarLoader'
import MessageSnackbarLoader from 'components/Snackbar/MessageSnackbarLoader'
import { useMutationForm } from 'components/useMutationForm'
import { AddDownloadableProductToCartDocument, useCustomerTokenQuery } from 'generated/apollo'
import Link from 'next/link'
import React from 'react'

type AddDownloadableProductToCartProps = Omit<
  GQLAddDownloadableProductToCartMutationVariables,
  'cartId'
> &
  Pick<GQLProductInterface, 'name'>

export default function AddDownloadableProductToCart(props: AddDownloadableProductToCartProps) {
  const { name, ...values } = props
  const { data: tokenQuery } = useCustomerTokenQuery()
  const requestCartId = useRequestCartId()
  const { onSubmit, loading, called, error } = useMutationForm<
    GQLAddDownloadableProductToCartMutation,
    GQLAddDownloadableProductToCartMutationVariables
  >({
    mutation: AddDownloadableProductToCartDocument,
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
      <Button type='submit' disabled={loading} color='primary' variant='contained'>
        Add to Cart
      </Button>

      <ErrorSnackbarLoader
        open={called && !loading && !!error?.message}
        message={<>result.error?.message</>}
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
