import { useQuery } from '@apollo/client'
import { Badge, Fab } from '@material-ui/core'
import CartIcon from '@material-ui/icons/ShoppingCartOutlined'
import { GuestCartDocument, CartIdDocument } from 'generated/graphql'
import { useRouter } from 'next/router'
import React from 'react'

export default function CartFab() {
  const router = useRouter()
  const { data: cartIdData } = useQuery(CartIdDocument)
  const { data: cartData } = useQuery(GuestCartDocument, {
    variables: { cartId: cartIdData?.cartId || '' },
    fetchPolicy: 'cache-only',
  })

  const isCart = router.pathname === '/cart'

  return (
    <Badge badgeContent={cartData?.cart?.total_quantity || 0} color='primary' overlap='circle'>
      <Fab
        aria-label={isCart ? 'Close Cart' : 'Open Cart'}
        size='medium'
        onClick={() => (isCart ? router.back() : router.push('/cart'))}
      >
        <CartIcon fontSize='small' />
      </Fab>
    </Badge>
  )
}
