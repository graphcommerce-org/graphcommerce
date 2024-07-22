import { useCustomerSession } from '@graphcommerce/magento-customer'
import {
  useFormAddProductsToCart,
  AddProductsToCartFormProps,
} from '@graphcommerce/magento-product'
import { InputMaybe, PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useWishlistItems } from '../hooks'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-product',
}

function WishlistUrlHandler() {
  const { setValue } = useFormAddProductsToCart()
  const router = useRouter()
  const { loggedIn } = useCustomerSession()
  const wishlist = useWishlistItems()

  const wishlistItems = wishlist.items?.map((item) => item)

  // Check if is initialLoad so that the options are only set once.
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [WishlistItemId, setWishlistItemId] = useState('0')

  useEffect(() => {
    if (!router.isReady) return
    if (router.query.wishlistItemId === undefined) return
    if (WishlistItemId !== router.query.wishlistItemId) {
      setIsInitialLoad(true)
    }
    if (!isInitialLoad) return
    // Find wishlistItem based on ID
    const wishlistItem = wishlistItems?.find((item) => item?.id === router.query.wishlistItemId)
    // Get the configurable options out of the wishlistItem
    const wishlistItemOptions: InputMaybe<InputMaybe<string>[]> =
      wishlistItem?.__typename === 'ConfigurableWishlistItem'
        ? wishlistItem?.configurable_options?.map(
            (option) => option?.configurable_product_option_value_uid || '',
          ) || []
        : []

    setValue(`cartItems.0.selected_options`, wishlistItemOptions)
    setWishlistItemId(router.query.wishlistItemId as string)
    setIsInitialLoad(false)
  }, [
    router.isReady,
    router.query,
    setValue,
    loggedIn,
    isInitialLoad,
    WishlistItemId,
    wishlist,
    wishlistItems,
  ])

  return null
}

export function AddProductsToCartForm(props: PluginProps<AddProductsToCartFormProps>) {
  const { Prev, children, ...rest } = props

  // @todo: Do we also want to remove the item from the wishlist?
  return (
    <Prev {...rest}>
      {children}
      <WishlistUrlHandler />
    </Prev>
  )
}
