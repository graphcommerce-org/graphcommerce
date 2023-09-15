import {
  useFormAddProductsToCart,
  type AddProductsToCartForm,
} from '@graphcommerce/magento-product'
import { InputMaybe, ReactPlugin } from '@graphcommerce/next-config'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CustomerWishListData, useWishlistItems } from '../hooks'
import { useCustomerSession } from '@graphcommerce/magento-customer'
import { useApolloClient } from '@graphcommerce/graphql'

export const component = 'AddProductsToCartForm'
export const exported = '@graphcommerce/magento-product'
// export const ifConfig: IfConfig = 'demoMode'

function WishlistUrlHandler() {
  const { setValue } = useFormAddProductsToCart()
  const router = useRouter()
  const { loggedIn } = useCustomerSession()
  const wishlistData = useWishlistItems()

  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [WishlistItemId, setWishlistItemId] = useState('0')

  const customerWishlist: CustomerWishListData = wishlistData.data as CustomerWishListData
  const guestWishlist = wishlistData.guestWishlist.data?.guestWishlist?.items

  useEffect(() => {
    if (!router.isReady) return
    if (router.query.wishlistItemId === undefined) return
    if (WishlistItemId !== router.query.wishlistItemId) {
      setIsInitialLoad(true)
    }
    if (!isInitialLoad) return
    const customerWishlistItem = customerWishlist?.find(
      (item) => item?.id === router.query.wishlistItemId,
    )
    const guestWishlistItem = guestWishlist?.find(
      (item, i) => i === Number(router.query.wishlistItemId),
    )
    const wishlistItemOptions: InputMaybe<InputMaybe<string>[]> = loggedIn
      ? (customerWishlistItem?.__typename === 'ConfigurableWishlistItem' &&
          customerWishlistItem?.configurable_options?.map(
            (option) => option?.configurable_product_option_value_uid || '',
          )) ||
        []
      : guestWishlistItem?.selected_options || []
    setValue(`cartItems.0.selected_options`, wishlistItemOptions)
    setWishlistItemId(router.query.wishlistItemId as string)
    setIsInitialLoad(false)
  }, [
    router.isReady,
    router.query,
    setValue,
    customerWishlist,
    guestWishlist,
    loggedIn,
    isInitialLoad,
    WishlistItemId,
  ])

  return null
}

export const Plugin: ReactPlugin<typeof AddProductsToCartForm> = (props) => {
  const { Prev, children, ...rest } = props

  return (
    <Prev {...rest}>
      {children}
      <WishlistUrlHandler />
    </Prev>
  )
}
