import {
  useFormAddProductsToCart,
  type AddProductsToCartForm,
} from '@graphcommerce/magento-product'
import { InputMaybe, ReactPlugin } from '@graphcommerce/next-config'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CustomerWishListData, useWishlistItems } from '../hooks'
import { useCustomerSession } from '@graphcommerce/magento-customer'

export const component = 'AddProductsToCartForm'
export const exported = '@graphcommerce/magento-product'
// export const ifConfig: IfConfig = 'demoMode'

function WishlistUrlHandler() {
  const { setValue } = useFormAddProductsToCart()
  const router = useRouter()
  const { loggedIn } = useCustomerSession()
  const wishlistData = useWishlistItems()

  const [isInitialLoad, setIsInitialLoad] = useState(true)

  const customerWishlist: CustomerWishListData = wishlistData.data as CustomerWishListData
  const guestWishlist = wishlistData.guestWishlist.data?.guestWishlist?.items

  useEffect(() => {
    if (!router.isReady) return
    if (!isInitialLoad) return
    const { wishlistItemId } = router.query
    const customerWishlistItem = customerWishlist?.find((item) => item?.id === wishlistItemId)
    const guestWishlistItem = guestWishlist?.find((item, i) => i === Number(wishlistItemId))
    const wishlistItemOptions: InputMaybe<InputMaybe<string>[]> = loggedIn
      ? (customerWishlistItem?.__typename === 'ConfigurableWishlistItem' &&
          customerWishlistItem?.configurable_options?.map(
            (option) => option?.configurable_product_option_value_uid || '',
          )) ||
        []
      : guestWishlistItem?.selected_options || []
    setValue(`cartItems.0.selected_options`, wishlistItemOptions)
    setIsInitialLoad(false)
  }, [
    router.isReady,
    router.query,
    setValue,
    customerWishlist,
    guestWishlist,
    loggedIn,
    isInitialLoad,
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
