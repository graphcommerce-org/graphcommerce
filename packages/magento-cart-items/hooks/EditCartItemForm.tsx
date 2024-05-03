import { useMutation } from '@graphcommerce/graphql'
import { useCartQuery, useCurrentCartId } from '@graphcommerce/magento-cart/hooks'
import { CartPageDocument } from '@graphcommerce/magento-cart-checkout'
import { AddProductsToCartViewProps } from '@graphcommerce/magento-graphcms/components/AddProductsToCartView'
import {
  useFormAddProductsToCart,
  AddProductsToCartFormProps,
} from '@graphcommerce/magento-product'
import { filterNonNullableKeys, isTypename, nonNullable } from '@graphcommerce/next-ui'
import { useWatch } from '@graphcommerce/react-hook-form'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { RemoveItemFromCartDocument } from '../RemoveItemFromCart/RemoveItemFromCart.gql'

export function useEditCartItemFormProps(): Omit<AddProductsToCartFormProps, 'children'> {
  const router = useRouter()
  const cartId = useCurrentCartId().currentCartId
  const [deleteCartItem] = useMutation(RemoveItemFromCartDocument, {
    variables: { cartId, uid: router.query.cartItemId as string },
  })
  return {
    onBeforeSubmit: async (variables) => {
      await deleteCartItem()
      return variables
    },
  }
}

type EditCartFormProps = AddProductsToCartViewProps

export function EditCartItemForm(props: EditCartFormProps) {
  const { product } = props

  const { setValue, getValues, control } = useFormAddProductsToCart()

  const router = useRouter()

  const cart = useCartQuery(CartPageDocument)

  const cartItem = cart.data?.cart?.items?.find((item) => item?.uid === router.query.cartItemId)

  const [valuesLoaded, setValuesLoaded] = useState(false)

  // todo: We should use the shape of the product instead of the shape of the values of the form.
  // Now we need to wait for the form to be loaded before we can enter values.
  // A similar shape is calculated in useCustomizableOptionPrice.

  const customizableOptionsKeys = Object.keys(
    useWatch({ control, name: 'cartItems.0.customizable_options' }) ?? [],
  )
  const enteredOptionsEntries = Object.entries(
    useWatch({ control, name: 'cartItems.0.entered_options' }) ?? [],
  )

  const selectedOptionEntries = Object.entries(
    useWatch({ control, name: 'cartItems.0.selected_options' }) ?? [],
  )

  useEffect(() => {
    if (!cartItem || !router.isReady || valuesLoaded) return
    if (customizableOptionsKeys.length >= 1 || enteredOptionsEntries.length >= 1)
      setValuesLoaded(true)
    setValue('cartItems.0.quantity', cartItem.quantity)

    const options = filterNonNullableKeys(
      isTypename(cartItem, ['ConfigurableCartItem'])
        ? cartItem.configurable_customizable
        : cartItem.customizable_options,
    )
    options.forEach((option) => {
      if (customizableOptionsKeys.includes(option?.customizable_option_uid))
        setValue(
          `cartItems.0.customizable_options.${option.customizable_option_uid}`,
          option.type === 'radio'
            ? option.values?.[0]?.customizable_option_value_uid ?? ''
            : option.values
                .map((customOption) => customOption?.customizable_option_value_uid)
                .filter(nonNullable),
        )

      enteredOptionsEntries.forEach(([key, enteredOption]) => {
        if (enteredOption?.uid === option.customizable_option_uid) {
          if (option.type === 'date' || option.type === 'datetime' || option.type === 'time') {
            if (process.env.NODE_ENV !== 'production') {
              console.log(
                `${option.type} not supported, Magento does not provide ISO date's that can be parsed`,
                option,
              )
            }
          } else
            setValue(
              `cartItems.0.entered_options.${Number(key)}.value`,
              option.values?.[0]?.value ?? '',
            )
        }
      })
    })

    if (isTypename(cartItem, ['ConfigurableCartItem']) && cartItem.configurable_options) {
      setValue(
        `cartItems.0.selected_options`,
        filterNonNullableKeys(cartItem.configurable_options).map(
          (option) => option.configurable_product_option_value_uid,
        ),
      )
    }

    if (isTypename(cartItem, ['BundleCartItem']) && isTypename(product, ['BundleProduct'])) {
      const values: string[] = []
      values.length = 1
      values.push(
        ...cartItem.bundle_options
          .filter(nonNullable)
          .map((option) => option.values.map((value) => value?.uid || ''))
          .flat(10),
      )
      setValue(`cartItems.0.selected_options`, values)
      cartItem.bundle_options.forEach((option, i) => {
        option?.values.forEach((value) => {
          const index = i + 1

          const foundOption = product.items?.[i]?.options?.find((opt) => opt?.uid === value?.uid)
          if (foundOption?.can_change_quantity) {
            setValue(`cartItems.0.entered_options.${index}.uid`, String(value?.uid) ?? '')
            setValue(`cartItems.0.entered_options.${index}.value`, String(value?.quantity) ?? '')
          }
        })
      })
    }
  }, [
    router.isReady,
    router.query,
    setValue,
    cartItem,
    getValues,
    valuesLoaded,
    customizableOptionsKeys,
    enteredOptionsEntries,
    selectedOptionEntries,
    product,
  ])

  return null
}
