import type { AddProductsToCartFields, SelectorsProp } from '@graphcommerce/magento-product'
import { filterNonNullableKeys, isTypename, nonNullable } from '@graphcommerce/next-ui'
import type { CartItemFragment } from '../Api/CartItem.gql'
import type { EditCartItemFormFragment } from '../components/EditCartItem/EditCartItemForm/EditCartItemForm.gql'

export type CartItemToCartItemInputReturnValue = AddProductsToCartFields['cartItems'][number]

export type CartItemToCartItemInputProps = {
  product: EditCartItemFormFragment
  cartItem: CartItemFragment
} & SelectorsProp

export function cartItemToCartItemInput(
  props: CartItemToCartItemInputProps,
): CartItemToCartItemInputReturnValue | undefined {
  const { product, cartItem } = props

  if (isTypename(product, ['GroupedProduct']) || !product.sku || !cartItem) return undefined

  const cartItemInput = {
    sku: product.sku,
    quantity: cartItem.quantity,
    selected_options_record: {},
    selected_options: [],
    entered_options: [],
    entered_options_record: {},
  }

  const cartItemCustomizableOptions = filterNonNullableKeys(cartItem.customizable_options ?? {})

  if (cartItemCustomizableOptions.length > 0) {
    product.options?.filter(nonNullable).forEach((productOption) => {
      // @todo Date option: Magento's backend does not provide an ISO date string that can be used, only localized strings are available which can not be parsed.
      // @todo File option: We do not support file options yet.
      const cartItemCustomizableOption = cartItemCustomizableOptions.find(
        (option) => option?.customizable_option_uid === productOption.uid,
      )

      const cartItemCustomizableOptionValue = filterNonNullableKeys(
        cartItemCustomizableOption?.values,
      )
      if (cartItemCustomizableOptionValue.length === 0) return

      switch (productOption.__typename) {
        case 'CustomizableAreaOption':
        case 'CustomizableFileOption':
        case 'CustomizableFieldOption':
          cartItemCustomizableOptionValue.forEach(
            ({ customizable_option_value_uid: uid, value }) => {
              cartItemInput.entered_options_record[uid] = value
            },
          )
          break
        case 'CustomizableRadioOption':
        case 'CustomizableDropDownOption':
          cartItemInput.selected_options_record[productOption.uid] =
            cartItemCustomizableOptionValue[0]?.customizable_option_value_uid
          break
        case 'CustomizableCheckboxOption':
        case 'CustomizableMultipleOption':
          cartItemInput.selected_options_record[productOption.uid] =
            cartItemCustomizableOptionValue.map(({ customizable_option_value_uid: uid }) => uid)
          break
        case 'CustomizableDateOption':
          // Not supported, backend does not provide an ISO date string that can be used, only localized strings are available which can not be parsed.
          break
        default:
          console.log(`${(productOption as { __typename: string }).__typename} not implemented`)
          break
      }
    })
  }

  return cartItemInput
}
