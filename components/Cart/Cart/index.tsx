import React from 'react'
import ApolloSession from 'components/ApolloSession'
import CartSkeleton from './CartSkeleton'
import CartItem from './CartItem'

export default function CartLoader() {
  return (
    <>
      <ApolloSession
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
