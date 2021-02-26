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
          <svg width='32px' height='32px' viewBox='0 0 32 32' version='1.1'>
            <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
              <path
                d='M22.7211388,13.8851398 L23.5468356,26.00354 L8.74931805,26.00354 L9.57501488,13.8851398 L22.7211388,13.8851398 Z'
                stroke='#000000'
                strokeWidth='1.4'
              />
              <path
                d='M12.4444055,14.953 L12.4444055,11.4552028 C12.4444055,9.54694698 13.9458954,8 15.798077,8 C17.6502587,8 19.1517485,9.54694698 19.1517485,11.4552028 L19.1517485,14.9497766'
                stroke='#000000'
                strokeWidth='1.4'
                strokeLinecap='square'
                strokeLinejoin='bevel'
              />
            </g>
          </svg>
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
