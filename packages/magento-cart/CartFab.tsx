import { useQuery } from '@apollo/client'
import { Badge, Fab, IconButton, NoSsr } from '@material-ui/core'
import CartIcon from '@material-ui/icons/ShoppingCartOutlined'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import React from 'react'
import { CartDocument } from './Cart.graphql'

type CartFabProps = { asIcon?: boolean }

function CartFabContent({ qty, asIcon }: CartFabProps & { qty?: number }) {
  const badge = (
    <Badge badgeContent={qty || 0} color='primary' variant='dot'>
      <CartIcon />
    </Badge>
  )
  return (
    <PageLink href='/cart'>
      {asIcon ? (
        <IconButton aria-label='Cart' color='inherit'>
          {badge}
        </IconButton>
      ) : (
        <Fab aria-label='Cart' color='inherit' size='medium'>
          {badge}
        </Fab>
      )}
    </PageLink>
  )
}

export default function CartFab(props: CartFabProps) {
  const { data: cartData } = useQuery(CartDocument)

  return (
    <NoSsr fallback={<CartFabContent {...props} />}>
      <CartFabContent qty={cartData?.cart?.total_quantity} {...props} />
    </NoSsr>
  )
}
