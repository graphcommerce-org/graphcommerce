import { useWatch } from '@graphcommerce/ecommerce-ui'
import type { MoneyFragment } from '@graphcommerce/magento-store'
import { filterNonNullableKeys, isTypename, nonNullable } from '@graphcommerce/next-ui'
import type { AddToCartItemSelector } from '../AddProductsToCart'
import { useFormAddProductsToCart } from '../AddProductsToCart'
import type {
  AnyOption,
  CustomizableProductOptionBase,
  OptionValueSelector,
  SelectorsProp,
} from '../ProductCustomizable/productCustomizableSelectors'
import { productCustomizableSelectors } from '../ProductCustomizable/productCustomizableSelectors'
import type { ProductPagePriceFragment } from './ProductPagePrice.gql'
import { getProductTierPrice } from './getProductTierPrice'

export type UseCustomizableOptionPriceProps = {
  product: ProductPagePriceFragment
} & AddToCartItemSelector &
  SelectorsProp

function calcOptionPrice(option: CustomizableProductOptionBase, product: MoneyFragment) {
  if (!option?.price) return 0
  switch (option.price_type) {
    case 'DYNAMIC':
    case 'FIXED':
      return option.price
    case 'PERCENT':
      return (product?.value ?? 0) * (option.price / 100)
  }

  return 0
}

export function useCustomizableOptionPrice(props: UseCustomizableOptionPriceProps) {
  const { product, selectors, index = 0 } = props

  const { control } = useFormAddProductsToCart()
  const cartItem = useWatch({ control, name: `cartItems.${index}` }) ?? {}
  const price =
    getProductTierPrice(product, cartItem?.quantity) ??
    product.price_range.minimum_price.final_price

  const allSelectors: OptionValueSelector = { ...productCustomizableSelectors, ...selectors }

  if (isTypename(product, ['GroupedProduct'])) return price.value
  if (!product.options || product.options.length === 0) return price.value

  const finalPrice = product.options.filter(nonNullable).reduce((optionPrice, productOption) => {
    const isCustomizable = Boolean(cartItem.customizable_options?.[productOption.uid])
    const isEntered = Boolean(
      cartItem.entered_options?.find((o) => productOption.uid && o?.uid && o?.value),
    )
    if (!isCustomizable && !isEntered) return optionPrice

    const selector = allSelectors[productOption.__typename] as
      | undefined
      | ((option: AnyOption) => CustomizableProductOptionBase | CustomizableProductOptionBase[])
    const value = selector ? selector(productOption) : null

    if (!value) return 0

    // If the option can have multiple values
    if (Array.isArray(value)) {
      return (
        optionPrice +
        filterNonNullableKeys(value)
          .filter(
            (v) =>
              cartItem.customizable_options?.[productOption.uid] &&
              cartItem.customizable_options?.[productOption.uid].includes(v.uid),
          )
          .reduce((p, v) => p + calcOptionPrice(v, price), 0)
      )
    }

    // If the option can have a single value entered.
    if (
      cartItem.entered_options?.filter((v) => v?.uid === productOption.uid && v.value).length !== 0
    )
      return optionPrice + calcOptionPrice(value, price)

    return optionPrice
  }, price.value ?? 0)

  return finalPrice
}
