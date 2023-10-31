import { SelectElement, TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { CurrencyEnum } from '@graphcommerce/graphql-mesh'
import { Money } from '@graphcommerce/magento-store'
import {
  ActionCard,
  ActionCardListForm,
  ActionCardProps,
  filterNonNullableKeys,
  RenderType,
  TypeRenderer,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  TextField,
  Box,
  Typography,
} from '@mui/material'
import React from 'react'
import { AddToCartItemSelector, useFormAddProductsToCart } from '../AddProductsToCart'
import { ProductCustomizableFragment } from './ProductCustomizable.gql'

export type OptionTypeRenderer = TypeRenderer<
  NonNullable<NonNullable<ProductCustomizableFragment['options']>[number]> & {
    optionIndex: number
    index: number
    currency: CurrencyEnum
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
  const { uid, required, index, title: label, radioValue, currency } = props
  const { control } = useFormAddProductsToCart()

  return (
    <Box>
      <FormLabel>{label?.toUpperCase()}</FormLabel>
      <ActionCardListForm
        sx={(theme) => ({
          mt: theme.spacings.xxs,
        })}
        layout='stack'
        control={control}
        render={ActionCard}
        name={`cartItems.${index}.customizable_options.${uid}`}
        rules={{
          required: required
            ? i18n._(/* i18n*/ 'Please select a value for ‘{label}’', { label })
            : false,
        }}
        items={filterNonNullableKeys(radioValue, ['title']).map(
          (radioVal) =>
            ({
              value: radioVal.uid,
              title: radioVal.title,
              price:
                radioVal.price === 0 ? null : (
                  <Box sx={{ color: 'secondary.main' }}>
                    <span style={{ margin: 'auto' }}>{'+ '}</span>
                    <Money value={radioVal.price} currency={currency} />
                  </Box>
                ),
            }) satisfies ActionCardProps,
        )}
      />
    </Box>
  )

  // return (
  //   <RadioButtonGroup
  //     control={control}
  //     name={`cartItems.${index}.customizable_options.${uid}`}
  //     label={title || ''}
  //     options={filterNonNullableKeys(radioValue, ['title']).map((option) => ({
  //       id: option.uid,
  //       label: option.title,
  //     }))}
  //     required={Boolean(required)}
  //   />
  // )
})

const CustomizableCheckboxOption = React.memo<
  React.ComponentProps<OptionTypeRenderer['CustomizableCheckboxOption']>
>((props) => {
  const { uid, required, index, title: label, checkboxValue, currency } = props
  const { control, getValues } = useFormAddProductsToCart()

  const allSelected = getValues(`cartItems.${index}.customizable_options.${uid}`) || []

  return (
    <Box>
      <FormLabel>{label?.toUpperCase()}</FormLabel>
      <ActionCardListForm
        sx={(theme) => ({
          mt: theme.spacings.xxs,
        })}
        multiple
        control={control}
        rules={{
          required: required
            ? i18n._(/* i18n*/ 'Please select a value for ‘{label}’', { label })
            : false,
        }}
        render={ActionCard}
        name={`cartItems.${index}.customizable_options.${uid}`}
        items={filterNonNullableKeys(checkboxValue, ['title']).map(
          (checkboxVal) =>
            ({
              value: checkboxVal.uid,
              title: (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox checked={allSelected.includes(checkboxVal.uid)} /> {checkboxVal.title}
                </Box>
              ),
              price:
                checkboxVal.price === 0 ? null : (
                  <Box
                    sx={{
                      color: 'secondary.main',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Typography sx={{ pb: '2px' }}> +</Typography>
                    <Money value={checkboxVal.price} currency={currency} />
                  </Box>
                ),
            }) satisfies ActionCardProps,
        )}
        errorMessage=''
      />
    </Box>
  )
})

const CustomizableMultipleOption = React.memo<
  React.ComponentProps<OptionTypeRenderer['CustomizableMultipleOption']>
>((props) => {
  const { uid, required, index, title: label, multipleValue, currency } = props
  const { control } = useFormAddProductsToCart()

  return (
    <Box>
      <FormLabel>{label?.toUpperCase()}</FormLabel>
      <ActionCardListForm
        sx={(theme) => ({
          mt: theme.spacings.xxs,
        })}
        multiple
        rules={{
          required: required
            ? i18n._(/* i18n*/ 'Please select a value for ‘{label}’', { label })
            : false,
        }}
        control={control}
        render={ActionCard}
        name={`cartItems.${index}.customizable_options.${uid}`}
        items={filterNonNullableKeys(multipleValue, ['title']).map(
          (multipleVal) =>
            ({
              value: multipleVal.uid,
              title: multipleVal.title,
              price:
                multipleVal.price === 0 ? null : (
                  <Box sx={{ color: 'secondary.main' }}>
                    {'+ '}
                    <Money value={multipleVal.price} currency={currency} />
                  </Box>
                ),
            }) satisfies ActionCardProps,
        )}
      />
    </Box>
  )
})

const CustomizableDateOption = React.memo<
  React.ComponentProps<OptionTypeRenderer['CustomizableDateOption']>
>((props) => {
  const { uid, required, optionIndex, index, title } = props
  const { register, setValue } = useFormAddProductsToCart()

  return (
    <Box>
      <input
        type='hidden'
        {...register(`cartItems.${index}.entered_options.${optionIndex}.uid`)}
        value={uid}
      />

      <FormLabel>{title?.toUpperCase()}</FormLabel>
      <TextField
        sx={(theme) => ({
          width: '100%',
          mt: theme.spacings.xxs,
        })}
        required={!!required}
        type='datetime-local'
        onChange={(data) =>
          setValue(
            `cartItems.${index}.entered_options.${optionIndex}.value`,
            `${data.currentTarget.value.replace('T', ' ')}:00`,
          )
        }
      />
    </Box>
  )
})

const CustomizableFieldOption = React.memo<
  React.ComponentProps<OptionTypeRenderer['CustomizableFieldOption']>
>((props) => {
  const { uid, required, optionIndex, index, title, fieldValue } = props
  const { control, register } = useFormAddProductsToCart()

  const maxLength = fieldValue?.max_characters ?? undefined
  return (
    <Box>
      <FormLabel>{title?.toUpperCase()}</FormLabel>
      <input
        type='hidden'
        {...register(`cartItems.${index}.entered_options.${optionIndex}.uid`)}
        value={uid}
      />
      <TextFieldElement
        sx={(theme) => ({
          mt: theme.spacings.xxs,
          width: '100%',
        })}
        color='primary'
        multiline
        control={control}
        name={`cartItems.${index}.entered_options.${optionIndex}.value`}
        required={Boolean(required)}
        validation={{ maxLength }}
        helperText={(maxLength ?? 0) > 0 && `A maximum of ${maxLength} characters`}
      />
    </Box>
  )
})

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
  product: ProductCustomizableFragment & { currency: CurrencyEnum }
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
