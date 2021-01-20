import { useQuery } from '@apollo/client'
import { Badge, Fab, FabProps, NoSsr } from '@material-ui/core'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import React from 'react'
import { ClientCartDocument } from './ClientCart.gql'

type CartFabProps = {
  qty?: number
  asIcon?: boolean
  icon: React.ReactNode
} & Omit<FabProps, 'children' | 'aria-label'>

function CartFabContent(props: CartFabProps) {
  const { qty, asIcon, icon, ...fabProps } = props

  return (
    <PageLink href='/cart'>
      <Fab aria-label='Cart' color='inherit' size='medium' {...fabProps}>
        <Badge badgeContent={qty || 0} color='primary' variant='dot'>
          {icon}
        </Badge>
      </Fab>
    </PageLink>
  )
}

export default function CartFab(props: CartFabProps) {
  const { data: cartData } = useQuery(ClientCartDocument)

  return (
    <NoSsr fallback={<CartFabContent {...props} />}>
      <CartFabContent qty={cartData?.cart?.total_quantity} {...props} />
    </NoSsr>
  )
}
