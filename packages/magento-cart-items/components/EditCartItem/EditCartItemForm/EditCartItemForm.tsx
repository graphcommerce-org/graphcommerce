import type { UseHistoryLink } from '@graphcommerce/framer-next-pages'
import { useHistoryGo } from '@graphcommerce/framer-next-pages'
import type {
  AddProductsToCartFormProps,
  AddToCartItemSelector,
} from '@graphcommerce/magento-product'
import { AddProductsToCartForm, useFormAddProductsToCart } from '@graphcommerce/magento-product'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import type { CartItemsFragment } from '../../../Api/CartItems.gql'
import type { UseRemoveItemFromCartProps } from '../../../hooks/useRemoveItemFromCart'
import { useRemoveItemFromCart } from '../../../hooks/useRemoveItemFromCart'
import type { CartItemToCartItemInputProps } from '../../../utils/cartItemToCartItemInput'
import { cartItemToCartItemInput } from '../../../utils/cartItemToCartItemInput'

type EditInitProps = CartItemToCartItemInputProps & AddToCartItemSelector

function EditInit(props: EditInitProps) {
  const { product, selectors, cartItem, index = 0 } = props
  const { setValue } = useFormAddProductsToCart()

  useEffect(() => {
    const cartItemInput = cartItemToCartItemInput({ product, cartItem, selectors })
    if (cartItemInput) setValue(`cartItems.${index}`, cartItemInput)
  }, [cartItem, index, product, selectors, setValue])

  return null
}

export type EditCartItemFormProps = CartItemToCartItemInputProps &
  AddToCartItemSelector &
  UseHistoryLink &
  AddProductsToCartFormProps

export function EditCartItemForm(props: EditCartItemFormProps) {
  const { product, cartItem, onBeforeSubmit, onComplete, index = 0, children, href } = props

  const remove = useRemoveItemFromCart(cartItem as UseRemoveItemFromCartProps)
  const goToCart = useHistoryGo({ href })

  return (
    <AddProductsToCartForm
      {...props}
      onBeforeSubmit={async (variables) => {
        await remove.submit()
        return onBeforeSubmit?.(variables) ?? variables
      }}
      onComplete={async (result, variables) => {
        await goToCart()
        return onComplete?.(result, variables)
      }}
    >
      {children}
      <EditInit product={product} cartItem={cartItem} index={index} />
    </AddProductsToCartForm>
  )
}

export function useEditItem(cart: CartItemsFragment | null | undefined) {
  const cartItemId = useRouter().query.cartItemId as string
  const cartItem = cart?.items?.find((item) => item?.uid === cartItemId)
  const cartItemRef = useRef(cartItem)
  if (cartItem) cartItemRef.current = cartItem

  return cartItemRef.current
}
