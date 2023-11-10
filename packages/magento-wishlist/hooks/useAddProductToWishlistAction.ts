import { useWatch } from '@graphcommerce/ecommerce-ui'
import { useCustomerSession } from '@graphcommerce/magento-customer'
import { AddToCartItemSelector, useFormAddProductsToCart } from '@graphcommerce/magento-product'
import { useEventCallback } from '@mui/material'
import { useState } from 'react'
import { WishlistItemFragment } from '../queries/WishlistItem.gql'
import { useAddProductsToWishlist } from './useAddProductsToWishlist/useAddProductsToWishlist'
import { useRemoveProductsFromWishlist } from './useRemoveProductsFromWishlist'
import { useWishlistItems } from './useWishlistitems'

export type UseAddProductToWishlistActionProps = AddToCartItemSelector & {
  loading?: boolean
  onClick?: (e: React.UIEvent<HTMLButtonElement>) => void
  product?: WishlistItemFragment['product']
}

export type UseAddProductToWishlistActionReturn = {
  current?: WishlistItemFragment
  onClick: (e: React.UIEvent<HTMLButtonElement>) => void
  cancelBubble: (e: React.UIEvent<HTMLElement>) => void
  toggleItem: () => void
  showSuccess: boolean
  hideShowSuccess: () => void
}

export function useAddProductToWishlistAction(
  props: UseAddProductToWishlistActionProps,
): UseAddProductToWishlistActionReturn {
  const { product, index = 0, onClick: onClickIncoming } = props
  const form = useFormAddProductsToCart(true)

  const add = useAddProductsToWishlist()
  const remove = useRemoveProductsFromWishlist()
  const wishlist = useWishlistItems()
  const { loggedIn } = useCustomerSession()
  const [showSuccess, setShowSuccess] = useState<boolean>(false)

  const selected_options =
    useWatch({ control: form?.control, name: `cartItems.${index}.selected_options` }) ?? []

  const current = wishlist.items?.find((item) => {
    if (item.product?.uid !== product?.uid) return false

    if (
      item?.__typename !== 'ConfigurableWishlistItem' ||
      product?.__typename !== 'ConfigurableProduct' ||
      product.configurable_options?.length !== selected_options.filter(Boolean).length
    ) {
      return true
    }

    return selected_options.every(
      (option) =>
        item.configurable_options?.some(
          // If an option is undefined this means the item is a wishlistItem but not all options were selected prior.
          (opt) => opt?.configurable_product_option_value_uid === option,
        ),
    )
  })

  function toggleItem() {
    if (!product?.sku) throw Error('product is required')

    if (current?.id) {
      console.log(current.id)
      return remove([current.id])
    }

    const allOptionsSelected =
      product.__typename === 'ConfigurableProduct' &&
      product.configurable_options?.length === selected_options.filter(Boolean).length

    if (loggedIn) {
      add([
        {
          sku: product.sku,
          quantity: 1,
          selected_options: allOptionsSelected ? [] : selected_options,
        },
      ]).then(() => setShowSuccess(true))
    } else {
      const configurableOptions = selected_options.map((selected_option) => {
        if (product.__typename !== 'ConfigurableProduct') return null

        const configurable_option = product.configurable_options?.find(
          (confOption) => confOption?.values?.find((values) => values?.uid === selected_option),
        )

        const value = configurable_option?.values?.find((values) => values?.uid === selected_option)
        return {
          configurable_product_option_uid: configurable_option?.uid || '',
          configurable_product_option_value_uid: value?.uid || '',
          option_label: configurable_option?.label || '',
          value_label: value?.store_label || '',
        }
      })

      add([
        {
          __typename: (product.__typename.slice(0, -'Product'.length) +
            'WishlistItem') as WishlistItemFragment['__typename'],
          id: allOptionsSelected
            ? `${product.uid}-${configurableOptions
                .map((i) => i?.configurable_product_option_value_uid)
                .join('-')}`
            : product.uid,
          configurable_options: allOptionsSelected ? configurableOptions : [],
          product,
        },
      ]).then(() => setShowSuccess(true))
    }
  }

  return {
    current,
    onClick: useEventCallback((e) => {
      e.preventDefault()
      toggleItem()
      onClickIncoming?.(e)
    }),
    toggleItem: useEventCallback(toggleItem),
    cancelBubble: useEventCallback((e) => {
      e.preventDefault()
    }),

    showSuccess,
    hideShowSuccess: useEventCallback(() => setShowSuccess(false)),
  } satisfies UseAddProductToWishlistActionReturn
}
