import { useCartQuery } from '@graphcommerce/magento-cart'
import {
  useFormAddProductsToCart,
  type AddProductsToCartForm,
} from '@graphcommerce/magento-product'
import { ReactPlugin } from '@graphcommerce/next-config'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { CartPageDocument } from '@graphcommerce/magento-cart-checkout'
import { nonNullable } from '@graphcommerce/next-ui'

export const component = 'AddProductsToCartForm'
export const exported = '@graphcommerce/magento-product'

function ProductUrlHandler() {
  const { setValue } = useFormAddProductsToCart()
  const router = useRouter()
  const { data } = useCartQuery(CartPageDocument)

  useEffect(() => {
    if (!router.isReady) return
    if (router.query.cartItemId === undefined || !data) return
    const cartItem = data.cart?.items?.find((item) => item?.uid === router.query.cartItemId)
    if (cartItem?.__typename !== 'ConfigurableCartItem') return
    setValue(`cartItems.0.selected_options`, cartItem.configurable_options.map((option) => option?.configurable_product_option_value_uid).filter(nonNullable))
  }, [
    router.isReady,
    router.query,
    setValue,
  ])

  return null
}

export const Plugin: ReactPlugin<typeof AddProductsToCartForm> = (props) => {
  const { Prev, children, ...rest } = props

  // @todo: Do we also want to remove the item from the wishlist?
  return (
    <Prev {...rest}>
      {children}
      <ProductUrlHandler />
    </Prev>
  )
}
