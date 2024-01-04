import { filterNonNullableKeys, RenderType } from '@graphcommerce/next-ui'
import { AddToCartItemSelector } from '../AddProductsToCart'
import { ProductPagePriceFragment } from '../ProductPagePrice'
import { CustomizableAreaOption, OptionTypeRenderer } from './CustomizableAreaOption'
import { CustomizableCheckboxOption } from './CustomizableCheckboxOption'
import { CustomizableDateOption } from './CustomizableDateOption'
import { CustomizableDropDownOption } from './CustomizableDropDownOption'
import { CustomizableFieldOption } from './CustomizableFieldOption'
import { CustomizableMultipleOption } from './CustomizableMultipleOption'
import { CustomizableRadioOption } from './CustomizableRadioOption'
import { ProductCustomizableFragment } from './ProductCustomizable.gql'

const defaultRenderer = {
  CustomizableAreaOption,
  CustomizableCheckboxOption,
  CustomizableDateOption,
  CustomizableDropDownOption,
  CustomizableFieldOption,
  CustomizableFileOption: () => <div>file not implemented</div>,
  CustomizableMultipleOption,
  CustomizableRadioOption,
}

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] }

type MissingOptionTypeRenderer = Omit<OptionTypeRenderer, keyof typeof defaultRenderer>
type DefinedOptionTypeRenderer = Partial<Pick<OptionTypeRenderer, keyof typeof defaultRenderer>>

type OptionTypeRendererProp = Simplify<
  keyof MissingOptionTypeRenderer extends never
    ? (MissingOptionTypeRenderer & DefinedOptionTypeRenderer) | undefined
    : MissingOptionTypeRenderer & DefinedOptionTypeRenderer
>

type ProductCustomizableProps = AddToCartItemSelector & {
  product: ProductCustomizableFragment & ProductPagePriceFragment
} & (keyof MissingOptionTypeRenderer extends never
    ? { renderer?: OptionTypeRendererProp }
    : { renderer: OptionTypeRendererProp })

export function ProductCustomizable(props: ProductCustomizableProps) {
  const { product, renderer, index = 0 } = props

  return (
    <>
      {filterNonNullableKeys(product.options, ['sort_order']).map((option) => (
        <RenderType
          key={option.uid}
          renderer={{ ...defaultRenderer, ...renderer }}
          {...option}
          optionIndex={option.sort_order + 100}
          index={index}
          currency={product.price_range.minimum_price.final_price.currency}
          productPrice={product.price_range.minimum_price.final_price.value}
        />
      ))}
    </>
  )
}
