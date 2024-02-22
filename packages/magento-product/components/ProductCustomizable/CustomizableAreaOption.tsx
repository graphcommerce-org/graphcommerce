import { TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { CurrencyEnum } from '@graphcommerce/graphql-mesh'
import { TypeRenderer } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import React from 'react'
import { useFormAddProductsToCart } from '../AddProductsToCart'
import { ProductCustomizableFragment } from './ProductCustomizable.gql'

export type OptionTypeRenderer = TypeRenderer<
  NonNullable<NonNullable<ProductCustomizableFragment['options']>[number]> & {
    optionIndex: number
    index: number
    currency: CurrencyEnum
    productPrice: number
  }
>

type CustomizableAreaOptionProps = React.ComponentProps<
  OptionTypeRenderer['CustomizableAreaOption']
>

export function CustomizableAreaOption(props: CustomizableAreaOptionProps) {
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
        rules={{ maxLength }}
        helperText={
          (maxLength ?? 0) > 0 &&
          i18n._(/* i18n*/ 'There is a maximum of ‘{maxLength}’ characters', {
            maxLength,
          })
        }
      />
    </>
  )
}
