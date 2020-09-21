import { Button } from '@material-ui/core'
import MessageSnackbar, { MessageSnackbarProps } from 'components/Snackbar'
import Link from 'next/link'
import React from 'react'

type AddToCartSuccessSnackbarProps = Omit<MessageSnackbarProps, 'action' | 'severity'> &
  GQLAddToCartSuccessSnackbarFragment

export default function AddToCartSuccessSnackbar(props: AddToCartSuccessSnackbarProps) {
  const { name = 'Product', ...messageSnackbarProps } = props
  return (
    <MessageSnackbar
      severity='success'
      Action={() => (
        <Link href='/cart' passHref>
          <Button size='small' variant='contained' disableElevation>
            View cart
          </Button>
        </Link>
      )}
      {...messageSnackbarProps}
    >
      &lsquo;{name}&rsquo; added to cart
    </MessageSnackbar>
  )
}
