import { cartToBeginCheckout } from '@graphcommerce/google-datalayer/mapping/cartToBeginCheckout/cartToBeginCheckout'
import type {
  AddProductsToCartFields,
  AnyOption,
  CustomizableProductOptionBase,
  OptionValueSelector,
  SelectorsProp,
} from '@graphcommerce/magento-product'
import { productCustomizableSelectors } from '@graphcommerce/magento-product'
import { filterNonNullableKeys, isTypename, nonNullable } from '@graphcommerce/next-ui'
import type { CartItemFragment } from '../Api/CartItem.gql'
import type { EditCartItemFormFragment } from '../components/EditCartItem/EditCartItemForm/EditCartItemForm.gql'

type CartItemInput = AddProductsToCartFields['cartItems'][number]

export type CartItemToCartItemInputProps = {
  product: EditCartItemFormFragment
  cartItem: CartItemFragment
} & SelectorsProp

export function cartItemToCartItemInput(
  props: CartItemToCartItemInputProps,
): CartItemInput | undefined {
  const { product, cartItem, selectors } = props

  if (isTypename(product, ['GroupedProduct']) || !product.sku || !cartItem) return undefined

  const allSelectors: OptionValueSelector = { ...productCustomizableSelectors, ...selectors }

  const cartItemInput: CartItemInput = {
    sku: product.sku,
    quantity: cartItem.quantity,
    selected_options_record: {},
    selected_options: [],
    entered_options: [],
  }

  const cartItemCustomizableOptions = filterNonNullableKeys(cartItem.customizable_options ?? {})

  if (cartItemCustomizableOptions.length > 0) {
    product.options?.filter(nonNullable).forEach((productOption) => {
      // @todo Date option: Magento's backend does not provide an ISO date string that can be used, only localized strings are available which can not be parsed.
      // @todo File option: We do not support file options yet.

      const selector = allSelectors[productOption.__typename] as
        | undefined
        | ((option: AnyOption) => CustomizableProductOptionBase | CustomizableProductOptionBase[])
      const possibleProductValues = selector ? selector(productOption) : null

      const cartItemCustomizableOption = cartItemCustomizableOptions.find(
        (option) => option?.customizable_option_uid === productOption.uid,
      )

      const cartItemCustomizableOptionValue = filterNonNullableKeys(
        cartItemCustomizableOption?.values,
      )
      if (cartItemCustomizableOptionValue.length === 0) return

      if (Array.isArray(possibleProductValues)) {
        const value = cartItemCustomizableOptionValue.map((v) => v.customizable_option_value_uid)
        if (!cartItemInput.selected_options_record) cartItemInput.selected_options_record = {}
        cartItemInput.selected_options_record[productOption.uid] = isTypename(productOption, [
          'CustomizableRadioOption',
          'CustomizableDropDownOption',
        ])
          ? value[0]
          : value
      } else {
        if (!cartItemInput.entered_options_record) cartItemInput.entered_options_record = {}

        if (productOption.__typename === 'CustomizableDateOption') {
          // Dates are not available in an iso format, so we can't really parse it.
          // if (productOption.dateValue?.type === 'TIME') {
          //   cartItemInput.entered_options_record[productOption.uid] =
          //     `01-01-1970 ${cartItemCustomizableOptionValue[0].value}.000Z`
          // }
          // if (productOption.dateValue?.type === 'DATE_TIME') {
          //   console.log(`${cartItemCustomizableOptionValue[0].value}.000Z`)
          //   cartItemInput.entered_options_record[productOption.uid] =
          //     `${cartItemCustomizableOptionValue[0].value}`
          // }
        } else {
          cartItemInput.entered_options_record[productOption.uid] =
            cartItemCustomizableOptionValue[0].value
        }
      }
    })
  }

  if (isTypename(cartItem, ['ConfigurableCartItem']) && cartItem.configurable_options) {
    cartItemInput.selected_options = filterNonNullableKeys(cartItem.configurable_options).map(
      (option) => option.configurable_product_option_value_uid,
    )
  }

  if (isTypename(cartItem, ['BundleCartItem']) && isTypename(product, ['BundleProduct'])) {
    filterNonNullableKeys(product.items).forEach((productBundleItem) => {
      const cartItemBundleOption = cartItem.bundle_options.find(
        (option) => option?.uid === productBundleItem?.uid,
      )

      if (!cartItemBundleOption) return

      // todo multi select..
      const idx = productBundleItem.position ?? 0 + 1000
      const value = cartItemBundleOption.values[0]

      if (!value) return
      if (productBundleItem.options?.some((o) => o?.can_change_quantity)) {
        if (!cartItemInput.entered_options) cartItemInput.entered_options = []
        cartItemInput.entered_options[idx] = {
          uid: value.uid,
          value: `${value.quantity}`,
        }
      } else {
        if (!cartItemInput.selected_options) cartItemInput.selected_options = []
        cartItemInput.selected_options[idx] = value.uid
      }
    })
  }

  return cartItemInput
}
