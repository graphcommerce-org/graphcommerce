import React from 'react'
import MagentoDynamic from 'components/MagentoDynamic/MagentoDynamic'
import CartSkeleton from './CartSkeleton'
import CartItem from './CartItem'

export default function CartLoader() {
  return (
    <>
      <MagentoDynamic
        loader={() => import('./Cart')}
        skeleton={(ref) => <CartSkeleton ref={ref}>loading</CartSkeleton>}
        renderer={{
          BundleCartItem: CartItem,
          ConfigurableCartItem: CartItem,
          DownloadableCartItem: CartItem,
          SimpleCartItem: CartItem,
          VirtualCartItem: CartItem,
        }}
      />
    </>
  )
}
