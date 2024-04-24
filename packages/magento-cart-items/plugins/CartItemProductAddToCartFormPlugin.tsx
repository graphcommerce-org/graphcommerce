import { useCartQuery } from '@graphcommerce/magento-cart/hooks'
import { CartPageDocument } from '@graphcommerce/magento-cart-checkout'
import { useCustomerSession } from '@graphcommerce/magento-customer'
import {
  useFormAddProductsToCart,
  type AddProductsToCartForm,
} from '@graphcommerce/magento-product'
import type { ReactPlugin } from '@graphcommerce/next-config'
import { isTypename } from '@graphcommerce/next-ui'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const component = 'AddProductsToCartForm'
export const exported = '@graphcommerce/magento-product'

function CartItemUrlHandler() {
  const { setValue } = useFormAddProductsToCart()
  const router = useRouter()
  const { loggedIn } = useCustomerSession()

  const cart = useCartQuery(CartPageDocument, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  })

  const cartItem = cart.data?.cart?.items?.find((item) => item?.uid === router.query.cartItemId)

  useEffect(() => {
    if (!router.isReady) return
    if (!cartItem) return
    if (!isTypename(cartItem, ['ConfigurableCartItem'])) return

    const selectedOptions = cartItem.configurable_options.map(
      (option) => option?.configurable_product_option_value_uid ?? '',
    )
    if (cartItem.configurable_options) setValue(`cartItems.0.selected_options`, selectedOptions)
    if (cartItem.quantity) setValue('cartItems.0.quantity', cartItem.quantity)

    // todo: implement customizable options check
  }, [router.isReady, router.query, setValue, loggedIn, cartItem])

  return null
}

export const Plugin: ReactPlugin<typeof AddProductsToCartForm> = (props) => {
  const { Prev, children, ...rest } = props

  return (
    <Prev {...rest}>
      {children}
      <CartItemUrlHandler />
    </Prev>
  )
}
