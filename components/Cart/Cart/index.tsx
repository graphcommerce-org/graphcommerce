import React from 'react'
import CustomerSession from 'components/CustomerSession'
import CartSkeleton from './CartSkeleton'
import CartItem from './CartItem'

export default function CartLoader() {
  return (
    <>
      <CustomerSession
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
