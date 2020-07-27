import React from 'react'
import CartIcon from '@material-ui/icons/ShoppingCartOutlined'
import { useCartIdQuery, useGuestCartQuery } from 'generated/apollo'
import { Badge, Fab } from '@material-ui/core'
import { useRouter } from 'next/router'

export default function CartFab() {
  const { data: cartIdData } = useCartIdQuery()
  const { data: cartData } = useGuestCartQuery({
    variables: { cartId: cartIdData?.cartId || '' },
    fetchPolicy: 'cache-only',
  })

  const router = useRouter()
  const isCart = router.pathname === '/cart'
  const canGoBack =
    typeof window !== 'undefined' ? document.referrer.indexOf(window.location.host) !== -1 : false

  return (
    <Badge badgeContent={cartData?.cart?.total_quantity || 0} color='primary' overlap='circle'>
      <Fab
        aria-label={isCart ? 'Close Cart' : 'Open Cart'}
        size='medium'
        onClick={() => {
          if (isCart && canGoBack) router.back()
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          if (isCart && !canGoBack) router.push('/')
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          if (!isCart) router.push('/cart')
        }}
      >
        <CartIcon fontSize='small' />
      </Fab>
    </Badge>
  )
}
