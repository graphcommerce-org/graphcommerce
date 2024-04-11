import { useWatch } from '@graphcommerce/ecommerce-ui'
import { PriceTypeEnum } from '@graphcommerce/graphql-mesh'
import { MoneyFragment } from '@graphcommerce/magento-store'
import { filterNonNullableKeys, isTypename, nonNullable } from '@graphcommerce/next-ui'
import type { Simplify } from 'type-fest'
import { AddToCartItemSelector, useFormAddProductsToCart } from '../AddProductsToCart'
import { CustomizableAreaOptionFragment } from '../ProductCustomizable/CustomizableAreaOption.gql'
import { CustomizableCheckboxOptionFragment } from '../ProductCustomizable/CustomizableCheckboxOption.gql'
import { CustomizableDateOptionFragment } from '../ProductCustomizable/CustomizableDateOption.gql'
import { CustomizableDropDownOptionFragment } from '../ProductCustomizable/CustomizableDropDownOption.gql'
import { CustomizableFieldOptionFragment } from '../ProductCustomizable/CustomizableFieldOption.gql'
import { CustomizableFileOptionFragment } from '../ProductCustomizable/CustomizableFileOption.gql'
import { CustomizableMultipleOptionFragment } from '../ProductCustomizable/CustomizableMultipleOption.gql'
import { CustomizableRadioOptionFragment } from '../ProductCustomizable/CustomizableRadioOption.gql'
import { ProductCustomizable_SimpleProduct_Fragment } from '../ProductCustomizable/ProductCustomizable.gql'
import { ProductPagePriceFragment } from './ProductPagePrice.gql'
import { getProductTierPrice } from './getProductTierPrice'

type AnyOption = NonNullable<
  NonNullable<ProductCustomizable_SimpleProduct_Fragment['options']>[number]
>
type OptionValueSelector = {
  [T in AnyOption as T['__typename']]: (option: T) => Option | Option[]
}

const defaultSelectors = {
  CustomizableAreaOption: (o: CustomizableAreaOptionFragment) => o.areaValue,
  CustomizableCheckboxOption: (o: CustomizableCheckboxOptionFragment) => o.checkboxValue,
  CustomizableFileOption: (o: CustomizableFileOptionFragment) => o.fileValue,
  CustomizableDateOption: (o: CustomizableDateOptionFragment) => o.dateValue,
  CustomizableDropDownOption: (o: CustomizableDropDownOptionFragment) => o.dropdownValue,
  CustomizableFieldOption: (o: CustomizableFieldOptionFragment) => o.fieldValue,
  CustomizableMultipleOption: (o: CustomizableMultipleOptionFragment) => o.multipleValue,
  CustomizableRadioOption: (o: CustomizableRadioOptionFragment) => o.radioValue,
}

type MissingOptionValueSelectors = Omit<OptionValueSelector, keyof typeof defaultSelectors>
type DefinedOptionValueSelectors = Partial<Pick<OptionValueSelector, keyof typeof defaultSelectors>>

type Selectors = Simplify<
  keyof MissingOptionValueSelectors extends never
    ? (MissingOptionValueSelectors & DefinedOptionValueSelectors) | undefined
    : MissingOptionValueSelectors & DefinedOptionValueSelectors
>

export type UseCustomizableOptionPriceProps = {
  product: ProductPagePriceFragment
} & AddToCartItemSelector &
  (keyof MissingOptionValueSelectors extends never
    ? { selectors?: Selectors }
    : { selectors: Selectors })

type Option =
  | {
      price?: number | null | undefined
      price_type?: PriceTypeEnum | null | undefined
      uid?: string | null | undefined
    }
  | undefined
  | null

function calcOptionPrice(option: Option, product: MoneyFragment) {
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

  const allSelectors: OptionValueSelector = { ...defaultSelectors, ...selectors }

  if (isTypename(product, ['GroupedProduct'])) return price.value
  if (!product.options || product.options.length === 0) return price.value

  return product.options.filter(nonNullable).reduce((optionPrice, productOption) => {
    if (
      !cartItem.customizable_options?.[productOption.uid] &&
      !cartItem.entered_options?.find((o) => productOption.uid && o?.uid && o?.value)
    )
      return optionPrice

    const selector = allSelectors[productOption.__typename] as
      | undefined
      | ((option: AnyOption) => Option | Option[])
    const value = selector ? selector(productOption) : null

    if (!value) return 0

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

    if (
      cartItem.entered_options?.filter((v) => v?.uid === productOption.uid && v.value).length !== 0
    )
      return optionPrice + calcOptionPrice(value, price)

    return optionPrice
  }, price.value ?? 0)
}
