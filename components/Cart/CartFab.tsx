import { Badge, Fab, IconButton, NoSsr } from '@material-ui/core'
import CartIcon from '@material-ui/icons/ShoppingCartOutlined'
import { useCartQuery } from 'generated/apollo'
import Link from 'next/link'
import React from 'react'

type CartFabProps = { asIcon?: boolean }

function CartFabContent({ qty, asIcon }: CartFabProps & { qty?: number }) {
  const badge = (
    <Badge badgeContent={qty || 0} color='primary' variant='dot'>
      <CartIcon />
    </Badge>
  )
  return (
    <Link passHref href='/cart'>
      {asIcon ? (
        <IconButton aria-label='Cart' color='inherit'>
          {badge}
        </IconButton>
      ) : (
        <Fab aria-label='Cart' color='inherit' size='medium'>
          {badge}
        </Fab>
      )}
    </Link>
  )
}

export default function CartFab(props: CartFabProps) {
  const { data: cartData } = useCartQuery()

  return (
    <NoSsr fallback={<CartFabContent {...props} />}>
      <CartFabContent qty={cartData?.cart?.total_quantity} {...props} />
    </NoSsr>
  )
}
