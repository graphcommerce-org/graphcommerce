import { filterNonNullableKeys, isTypename } from '@graphcommerce/next-ui'
import { AddProductsToCartMutation } from './AddProductsToCart.gql'
import { AddProductsToCartFields } from './useFormAddProductsToCart'

export function findAddedItems(
  data: AddProductsToCartMutation | null | undefined,
  variables: AddProductsToCartFields | null | undefined,
) {
  if (!data || !variables) return []

  return variables.cartItems.map((itemVariable) => ({
    itemVariable,
    itemInCart: data.addProductsToCart?.cart.items?.find((cartItem) => {
      if (!cartItem) return false

      let isCandidate = cartItem.product.sku === itemVariable.sku
      if (isTypename(cartItem, ['ConfigurableCartItem'])) {
        if (itemVariable.parent_sku) {
          isCandidate =
            cartItem?.product.sku === itemVariable.parent_sku &&
            cartItem.configured_variant.sku === itemVariable.sku
        }
      }
      if (!isCandidate) {
        // console.log("The SKU's dont match, so this isn't the product.")
        return false
      }

      let selectedOptions = itemVariable.selected_options
      if (isTypename(cartItem, ['ConfigurableCartItem'])) {
        // Check if the requested options match the selected options
        if (
          !cartItem.configurable_options.every((option) => {
            const foundItem = itemVariable.selected_options?.find(
              (selectedOption) => selectedOption === option?.configurable_product_option_value_uid,
            )

            selectedOptions = itemVariable.selected_options?.filter(
              (selectedOption) => selectedOption !== option?.configurable_product_option_value_uid,
            )

            return foundItem
          })
        ) {
          // console.log("SKU matche, this isn't the configurable")
          return false
        }
      }

      const { customizable_options } = cartItem
      const matchEntered = filterNonNullableKeys(itemVariable.entered_options).every(
        (requestOption) =>
          customizable_options.find(
            (itemOption) =>
              itemOption?.customizable_option_uid === requestOption?.uid &&
              itemOption?.values?.find((value) => value?.value === requestOption?.value),
          ),
      )
      if (!matchEntered) {
        // console.log('Entered options do not match', itemVariable.entered_options)
        return false
      }

      const matchSelected = selectedOptions?.every((requestOption) =>
        customizable_options.find((customizableOption) =>
          customizableOption?.values.find(
            (value) => value?.customizable_option_value_uid === requestOption,
          ),
        ),
      )
      if (!matchSelected) {
        // console.log('Selected options do not match')
        return false
      }
      return true
    }),
  }))
}
