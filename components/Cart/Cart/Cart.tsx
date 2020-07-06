import React from 'react'
import { useGuestCartLazyQuery } from 'generated/apollo'
import useCartId from '../useCartId'
import CartSkeleton from './CartSkeleton'

export default function Cart() {
  const { cartId } = useCartId()
  const [loadCart, { data, loading, called }] = useGuestCartLazyQuery()

  if (cartId && !called) loadCart({ variables: { cartId } })

  if (!cartId || !called) {
    return <CartSkeleton>nothing in your cart</CartSkeleton>
  }

  if (loading || !data) {
    return <CartSkeleton>loading your cart</CartSkeleton>
  }

  return <CartSkeleton>{data.cart.items.length}</CartSkeleton>
}
