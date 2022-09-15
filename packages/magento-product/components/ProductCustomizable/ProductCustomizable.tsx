import { SelectElement, TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { filterNonNullableKeys, RenderType, TypeRenderer } from '@graphcommerce/next-ui'
import { useFormAddProductsToCart } from '../AddProductsToCart'
import { ProductCustomizableFragment } from './ProductCustomizable.gql'

type OptionTypeRenderer = TypeRenderer<
  NonNullable<NonNullable<ProductCustomizableFragment['options']>[number]> & { idx: number }
>

const CustomizableAreaOption: OptionTypeRenderer['CustomizableAreaOption'] = (props) => {
  const { uid, areaValue, required, idx, title } = props
  const maxLength = areaValue?.max_characters ?? undefined
  const { control, register } = useFormAddProductsToCart()

  return (
    <>
      <input type='hidden' {...register(`cartItems.0.entered_options.${idx}.uid`)} value={uid} />
      <TextFieldElement
        multiline
        minRows={3}
        control={control}
        name={`cartItems.0.entered_options.${idx}.value`}
        label={title}
        required={Boolean(required)}
        validation={{ maxLength }}
        helperText={(maxLength ?? 0) > 0 && `A maximum of ${maxLength}`}
      />
    </>
  )
}

const CustomizableDropDownOption: OptionTypeRenderer['CustomizableDropDownOption'] = (props) => {
  const { uid, required, idx, title, dropdownValue } = props
  const { control, register } = useFormAddProductsToCart()

  return (
    <>
      <input type='hidden' {...register(`cartItems.0.entered_options.${idx}.uid`)} value={uid} />
      <SelectElement
        control={control}
        name={`cartItems.0.entered_options.${idx}.value`}
        label={title}
        required={Boolean(required)}
        options={filterNonNullableKeys(dropdownValue, ['title']).map((option) => ({
          id: option.uid,
          label: option.title,
        }))}
      />
    </>
  )
}

const renderer: OptionTypeRenderer = {
  CustomizableAreaOption,
  CustomizableCheckboxOption: () => <div>checkbox not implemented</div>,
  CustomizableDateOption: () => <div>date not implemented</div>,
  CustomizableDropDownOption,
  CustomizableFieldOption: () => <div>field not implemented</div>,
  CustomizableFileOption: () => <div>file not implemented</div>,
  CustomizableMultipleOption: () => <div>multi not implemented</div>,
  CustomizableRadioOption: () => <div>radios not implemented</div>,
}

export function isProductCustomizable(
  product: Record<string, unknown>,
): product is ProductCustomizableFragment {
  return typeof product.options !== 'undefined'
}

export function ProductCustomizable(props: ProductCustomizableFragment) {
  const { options } = props

  return (
    <>
      {filterNonNullableKeys(options, ['sort_order']).map((option) => (
        <RenderType key={option.uid} renderer={renderer} {...option} idx={option.sort_order - 1} />
      ))}
    </>
  )
}
