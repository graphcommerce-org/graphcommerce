import React from 'react'
import CartIcon from '@material-ui/icons/ShoppingCartOutlined'
import { useCartIdQuery, useGuestCartQuery } from 'generated/apollo'
import { Badge, Fab } from '@material-ui/core'
import Link from 'next/link'

export default function CartFab() {
  const { data: cartIdData } = useCartIdQuery()
  const { data: cartData } = useGuestCartQuery({
    variables: { cartId: cartIdData?.cartId || '' },
    fetchPolicy: 'cache-only',
  })

  return (
    <Badge badgeContent={cartData?.cart?.total_quantity || 0} color='primary' overlap='circle'>
      <Link href='/cart' passHref>
        <Fab aria-label='Open Cart' size='medium'>
          <CartIcon fontSize='small' />
        </Fab>
      </Link>
    </Badge>
  )
}
