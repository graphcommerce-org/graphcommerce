import { Badge, Fab, NoSsr } from '@material-ui/core'
import CartIcon from '@material-ui/icons/ShoppingCartOutlined'
import { useCartIdQuery, useGuestCartQuery } from 'generated/apollo'
import { useRouter } from 'next/router'
import React from 'react'

export default function CartFab() {
  const router = useRouter()
  const { data: cartIdData } = useCartIdQuery()
  const { data: cartData } = useGuestCartQuery({
    variables: { cartId: cartIdData?.cartId || '' },
    fetchPolicy: 'cache-only',
  })

  const isCart = router.pathname === '/cart'

  const fab = (
    <Fab
      aria-label={isCart ? 'Close Cart' : 'Open Cart'}
      size='medium'
      onClick={() => (isCart ? router.back() : router.push('/cart'))}
    >
      <CartIcon fontSize='small' />
    </Fab>
  )

  return (
    <NoSsr fallback={fab}>
      <Badge badgeContent={cartData?.cart?.total_quantity || 0} color='primary' overlap='circle'>
        {fab}
      </Badge>
    </NoSsr>
  )
}
