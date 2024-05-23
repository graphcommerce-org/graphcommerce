import { UseHistoryLink, useHistoryGo } from '@graphcommerce/framer-next-pages'
import { useMutation } from '@graphcommerce/graphql'
import { useCurrentCartId } from '@graphcommerce/magento-cart/hooks'
import {
  useFormAddProductsToCart,
  AddProductsToCartFormProps,
  AddToCartItemSelector,
} from '@graphcommerce/magento-product'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import {
  CartItemToCartItemInputProps,
  cartItemToCartItemInput,
} from '../../../utils/cartItemToCartItemInput'
import { RemoveItemFromCartDocument } from '../../RemoveItemFromCart/RemoveItemFromCart.gql'

type UseEditCartItemFormProps = UseHistoryLink

export function useEditCartItemFormProps(
  props: UseEditCartItemFormProps,
): Omit<AddProductsToCartFormProps, 'children'> {
  const { href } = props
  const router = useRouter()
  const cartId = useCurrentCartId().currentCartId
  const [deleteCartItem] = useMutation(RemoveItemFromCartDocument, {
    variables: { cartId, uid: router.query.cartItemId as string },
    errorPolicy: 'all',
  })
  const goToCart = useHistoryGo({ href })

  return {
    onBeforeSubmit: async (variables) => {
      await deleteCartItem()
      return variables
    },
    onComplete: async () => {
      await goToCart()
    },
  }
}

export type EditCartItemFormProps = CartItemToCartItemInputProps & AddToCartItemSelector

export function EditCartItemForm(props: EditCartItemFormProps) {
  const { product, selectors, cartItem, index = 0 } = props
  const { setValue } = useFormAddProductsToCart()

  const cartItemAppliedToForm = useRef(false)

  useEffect(() => {
    if (!cartItem || cartItemAppliedToForm.current) return
    cartItemAppliedToForm.current = true
    const cartItemInput = cartItemToCartItemInput({ product, cartItem, selectors })
    if (cartItemInput) setValue(`cartItems.${index}`, cartItemInput)
  })
  return null
}
