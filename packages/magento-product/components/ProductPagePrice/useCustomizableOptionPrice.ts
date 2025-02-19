import { useWatch } from '@graphcommerce/ecommerce-ui'
import type { MoneyFragment } from '@graphcommerce/magento-store'
import { filterNonNullableKeys, isTypename, nonNullable } from '@graphcommerce/next-ui'
import type { AddToCartItemSelector } from '../AddProductsToCart'
import { useFormAddProductsToCart } from '../AddProductsToCart'
import type {
  CustomizableProductOptionBase,
  OptionValueSelector,
  SelectorsProp,
} from '../ProductCustomizable/productCustomizableSelectors'
import { productCustomizableSelectors } from '../ProductCustomizable/productCustomizableSelectors'
import { getProductTierPrice } from './getProductTierPrice'
import type { ProductPagePriceFragment } from './ProductPagePrice.gql'

export type UseCustomizableOptionPriceProps = {
  product: ProductPagePriceFragment
} & AddToCartItemSelector &
  SelectorsProp

function calcOptionPrice(
  option: CustomizableProductOptionBase,
  productPrice: MoneyFragment | null | undefined,
) {
  if (!option?.price) return 0
  switch (option.price_type) {
    case 'DYNAMIC':
      return productPrice?.value ?? 0
    case 'FIXED':
      return option.price
    case 'PERCENT':
      return (productPrice?.value ?? 0) * (option.price / 100)
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

  const allSelectors = { ...productCustomizableSelectors, ...selectors } as OptionValueSelector

  if (isTypename(product, ['GroupedProduct'])) return price.value
  if (!product.options || product.options.length === 0) return price.value

  // If a product option is required the cheapest option is already included in the price of the product.
  // We remove the value as the value is added in the finalPrice.
  const optionPriceIncluded = product.options
    .filter((o) => !!o)
    .reduce((acc, productOption) => {
      if (!productOption.required) return acc

      const value = allSelectors[productOption.__typename]?.(productOption).reduce((p, v) => {
        if (!v) return p
        return p + calcOptionPrice(v, price)
      }, 0)

      return acc + value
    }, 0)

  const optionPrice = product.options.filter(nonNullable).reduce((acc, productOption) => {
    const { uid } = productOption

    const selected = cartItem.selected_options_record?.[uid]
    const entered = cartItem.entered_options_record?.[uid]

    const selector = allSelectors[productOption.__typename]
    const value = selector ? selector(productOption) : null

    if (!value) return 0

    // If the option can have multiple values
    if (Array.isArray(value)) {
      return (
        acc +
        filterNonNullableKeys(value)
          .filter((v) => selected?.includes(v.uid))
          .reduce((p, v) => p + calcOptionPrice(v, price), 0)
      )
    }

    if (entered) {
      // If the option can have a single value entered.
      return acc + calcOptionPrice(value, price)
    }

    return acc
  }, 0)

  return (price.value ?? 0) + optionPrice - optionPriceIncluded
}
