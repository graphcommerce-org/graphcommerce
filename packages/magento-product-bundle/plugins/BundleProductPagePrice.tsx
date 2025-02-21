import { useWatch } from '@graphcommerce/ecommerce-ui'
import {
  useFormAddProductsToCart,
  type AddToCartItemSelector,
  type ProductPagePriceProps,
} from '@graphcommerce/magento-product'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { filterNonNullableKeys, nonNullable } from '@graphcommerce/next-ui'
import {
  calculateBundleOptionValuePrice,
  substractCalculatedBundleOptionValuePrices,
  sumCalculatedBundleOptionValuePrices,
  toProductListPriceFragment,
  type CalculatedBundleOptionValuePrice,
} from '../components/BundleProductOptions/calculateBundleOptionValuePrice'
import type { BundleProductItemOptionType } from '../components/BundleProductOptions/types'
import type { ProductPageItem_BundleFragment } from '../graphql'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-product',
}

function isBundleProduct(
  product:
    | ProductPagePriceProps['product']
    | (ProductPagePriceProps['product'] & ProductPageItem_BundleFragment),
): product is ProductPagePriceProps['product'] & ProductPageItem_BundleFragment {
  return (
    product.__typename === 'BundleProduct' &&
    Array.isArray((product as ProductPageItem_BundleFragment).items)
  )
}

export function ProductPagePrice(
  props: PluginProps<ProductPagePriceProps> & AddToCartItemSelector,
) {
  const { Prev, product, index = 0, ...rest } = props

  const form = useFormAddProductsToCart()
  const allSelectedOptions =
    useWatch({
      control: form.control,
      name: `cartItems.${index}.selected_options_record`,
    }) ?? {}

  const allEnteredOptions =
    useWatch({
      control: form.control,
      name: `cartItems.${index}.entered_options_record`,
    }) ?? {}

  if (!isBundleProduct(product)) {
    return <Prev product={product} index={index} {...rest} />
  }

  const cheapestPricesAlreadyIncludedInBasePrice = filterNonNullableKeys(product.items)
    .filter((item) => item.required)
    .map((item) =>
      item.options
        .filter(nonNullable)
        .map((option) => calculateBundleOptionValuePrice(product, item, option))
        .reduce((acc, price) => (price[1] < acc[1] ? price : acc)),
    )

  const reduceBase = sumCalculatedBundleOptionValuePrices(cheapestPricesAlreadyIncludedInBasePrice)

  const basePrice: CalculatedBundleOptionValuePrice = [
    product.price_range.minimum_price.regular_price.value ?? 0,
    product.price_range.minimum_price.final_price.value ?? 0,
  ]
  const base = substractCalculatedBundleOptionValuePrices(basePrice, reduceBase)

  // This only works with Magento 2.4.7, but that is fine.
  const itemPrices = filterNonNullableKeys(product.items)
    .map((item) => {
      const selectedOption = allSelectedOptions[item.uid]
      const allOptions = item.options.filter(nonNullable)

      const options: BundleProductItemOptionType[] = selectedOption
        ? allOptions.filter((o) => {
            if (Array.isArray(selectedOption)) return selectedOption.includes(o?.uid ?? '')
            return selectedOption === o?.uid
          })
        : allOptions.filter((o) => o?.is_default)

      return options.map((option) => {
        const quantity = allEnteredOptions[option.uid]
          ? Number(allEnteredOptions[option.uid])
          : (option.quantity ?? 1)
        return calculateBundleOptionValuePrice(product, item, option, quantity)
      })
    })
    .flat(1)

  const totalPrice = toProductListPriceFragment(
    sumCalculatedBundleOptionValuePrices([base, ...itemPrices]),
    product.price_range.minimum_price.final_price.currency,
  )

  return (
    <Prev
      product={{
        ...product,
        price_range: {
          ...product.price_range,
          minimum_price: {
            ...product.price_range.minimum_price,
            ...totalPrice,
          },
        },
      }}
      index={index}
      {...rest}
    />
  )
}
