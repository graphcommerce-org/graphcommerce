import {
  iconShoppingBag,
  StyledBadge,
  SvgImageSimple,
  useFixedFabAnimation,
} from '@graphcommerce/next-ui'
import { Fab, FabProps, NoSsr } from '@mui/material'
import { m } from 'framer-motion'
import PageLink from 'next/link'
import React from 'react'
import { useCartQuery } from '../../hooks/useCartQuery'
import { CartFabDocument } from './CartFab.gql'
import { CartTotalQuantityFragment } from './CartTotalQuantity.gql'

export type CartFabProps = {
  icon?: React.ReactNode
} & Omit<FabProps, 'children' | 'aria-label'>

type CartFabContentProps = CartFabProps & CartTotalQuantityFragment

function CartFabContent(props: CartFabContentProps) {
  const { total_quantity, icon, ...fabProps } = props
  const cartIcon = icon ?? (
    <SvgImageSimple src={iconShoppingBag} alt='Shopping Bag' loading='eager' size='large' />
  )
  const { filter } = useFixedFabAnimation()

  return (
    <m.div style={{ filter }}>
      <PageLink href='/cart' passHref>
        <Fab aria-label='Cart' color='inherit' size='large' {...fabProps}>
          {total_quantity > 0 ? (
            <StyledBadge color='primary' variant='dot'>
              {cartIcon}
            </StyledBadge>
          ) : (
            cartIcon
          )}
        </Fab>
      </PageLink>
    </m.div>
  )
}

/**
 * We give CartFab a bit of special handling. We don't want to make requests for this component
 * whilly nilly. We've imposed some limitations:
 *
 * We use useCartQuery that means that this will only execute when there is a cartId.
 *
 * We use fetchPolicy 'cache-only' so that when the cart comes into existence it will not
 * immediately start fetching. Why? There is a time between creating a cart and adding the first
 * product to the cart. This would mean that it would immediately start executing this query.
 */
export default function CartFab(props: CartFabProps) {
  const { data } = useCartQuery(CartFabDocument, {
    fetchPolicy: 'cache-only',
    nextFetchPolicy: 'cache-first',
  })
  const qty = data?.cart?.total_quantity ?? 0

  return (
    <NoSsr fallback={<CartFabContent {...props} total_quantity={0} />}>
      <CartFabContent total_quantity={qty} {...props} />
    </NoSsr>
  )
}
