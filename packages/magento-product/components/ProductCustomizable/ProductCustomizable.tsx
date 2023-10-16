import {
  CheckboxButtonGroup,
  RadioButtonGroup,
  SelectElement,
  TextFieldElement,
} from '@graphcommerce/ecommerce-ui'
import { filterNonNullableKeys, RenderType, TypeRenderer } from '@graphcommerce/next-ui'
import React from 'react'
import { AddToCartItemSelector, useFormAddProductsToCart } from '../AddProductsToCart'
import { ProductCustomizableFragment } from './ProductCustomizable.gql'

export type OptionTypeRenderer = TypeRenderer<
  NonNullable<NonNullable<ProductCustomizableFragment['options']>[number]> & {
    optionIndex: number
    index: number
  }
>

const CustomizableAreaOption = React.memo<
  React.ComponentProps<OptionTypeRenderer['CustomizableAreaOption']>
>((props) => {
  const { uid, areaValue, required, optionIndex, index, title } = props
  const maxLength = areaValue?.max_characters ?? undefined
  const { control, register } = useFormAddProductsToCart()

  return (
    <>
      <input
        type='hidden'
        {...register(`cartItems.${index}.entered_options.${optionIndex}.uid`)}
        value={uid}
      />
      <TextFieldElement
        color='primary'
        multiline
        minRows={3}
        control={control}
        name={`cartItems.${index}.entered_options.${optionIndex}.value`}
        label={title}
        required={Boolean(required)}
        validation={{ maxLength }}
        helperText={(maxLength ?? 0) > 0 && `A maximum of ${maxLength}`}
      />
    </>
  )
})

const CustomizableDropDownOption = React.memo<
  React.ComponentProps<OptionTypeRenderer['CustomizableDropDownOption']>
>((props) => {
  const { uid, required, optionIndex, index, title, dropdownValue } = props
  const { control, register } = useFormAddProductsToCart()

  return (
    <>
      <input
        type='hidden'
        {...register(`cartItems.${index}.entered_options.${optionIndex}.uid`)}
        value={uid}
      />
      <SelectElement
        color='primary'
        control={control}
        name={`cartItems.${index}.entered_options.${optionIndex}.value`}
        label={title}
        required={Boolean(required)}
        defaultValue=''
        options={filterNonNullableKeys(dropdownValue, ['title']).map((option) => ({
          id: option.uid,
          label: option.title,
        }))}
      />
    </>
  )
})

const CustomizableRadioOption = React.memo<
  React.ComponentProps<OptionTypeRenderer['CustomizableRadioOption']>
>((props) => {
  const { uid, required, optionIndex, index, title, radioValue } = props
  const { control, register } = useFormAddProductsToCart()

  return (
    <>
      <input
        type='hidden'
        {...register(`cartItems.${index}.selected_options.${optionIndex}`)}
        value={uid}
      />
      <RadioButtonGroup
        control={control}
        name={`cartItems.${index}.selected_options.${optionIndex}`}
        label={title || ''}
        defaultValue=''
        options={filterNonNullableKeys(radioValue, ['title']).map((option) => ({
          id: option.uid,
          label: option.title,
        }))}
        required={Boolean(required)}
      />
    </>
  )
})

const CustomizableCheckboxOption = React.memo<
  React.ComponentProps<OptionTypeRenderer['CustomizableCheckboxOption']>
>((props) => {
  const { uid, required, optionIndex, index, title, checkboxValue } = props
  const { control, register, setValue, getValues, resetField } = useFormAddProductsToCart()

  return (
    <>
      <input
        type='hidden'
        {...register(`cartItems.${index}.selected_options.${optionIndex}`)}
        value={uid}
      />
      <CheckboxButtonGroup
        control={control}
        name={`cartItems.${index}.selected_options.${optionIndex}`}
        label={title || ''}
        defaultValue=''
        options={filterNonNullableKeys(checkboxValue, ['title']).map((option) => ({
          id: option.uid,
          label: option.title,
        }))}
        setValue={setValue}
        getValues={getValues}
        resetField={resetField}
        index={index}
        optionIndex={optionIndex}
        checkboxColor='primary'
        required={Boolean(required)}
      />
    </>
  )
})

const defaultRenderer = {
  CustomizableAreaOption,
  CustomizableCheckboxOption,
  CustomizableDateOption: () => <div>date not implemented</div>,
  CustomizableDropDownOption,
  CustomizableFieldOption: () => <div>field not implemented</div>,
  CustomizableFileOption: () => <div>file not implemented</div>,
  CustomizableMultipleOption: () => <div>multi not implemented</div>,
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
  product: ProductCustomizableFragment
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
        />
      ))}
    </>
  )
}
