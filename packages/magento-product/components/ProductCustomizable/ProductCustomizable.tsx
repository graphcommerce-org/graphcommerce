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
import { FormLabel, Checkbox, TextField, Box } from '@mui/material'
import React from 'react'
import { AddToCartItemSelector, useFormAddProductsToCart } from '../AddProductsToCart'
import { ProductCustomizableFragment } from './ProductCustomizable.gql'
import { ProductPagePriceFragment } from '../ProductPagePrice'
import { Trans } from '@lingui/react'

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
  const { uid, required, index, title, dropdownValue } = props
  const { control } = useFormAddProductsToCart()

  return (
    <SelectElement
      color='primary'
      control={control}
      name={`cartItems.${index}.customizable_options.${uid}`}
      label={title}
      required={Boolean(required)}
      defaultValue=''
      options={filterNonNullableKeys(dropdownValue, ['title']).map((option) => ({
        id: option.uid,
        label: option.title,
      }))}
    />
  )
})

const CustomizableRadioOption = React.memo<
  React.ComponentProps<OptionTypeRenderer['CustomizableRadioOption']>
>((props) => {
  const { uid, required, index, title: label, radioValue, currency } = props
  const { control, getValues } = useFormAddProductsToCart()

  const allSelected = getValues(`cartItems.${index}.customizable_options.${uid}`) || []

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
                  <Box
                    sx={{
                      color: allSelected.includes(radioVal.uid) ? 'text.primary' : 'text.secondary',
                    }}
                  >
                    {/* Change fontFamily so the + is properly outlined */}
                    <span style={{ fontFamily: 'arial' }}>{'+ '}</span>
                    <Money value={radioVal.price} currency={currency} />
                  </Box>
                ),
            }) satisfies ActionCardProps,
        )}
      />
    </Box>
  )
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
                      color: allSelected.includes(checkboxVal.uid)
                        ? 'text.primary'
                        : 'text.secondary',
                    }}
                  >
                    <span style={{ fontFamily: 'arial' }}>{'+ '}</span>
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
                  <Box
                    sx={{
                      color: allSelected.includes(multipleVal.uid)
                        ? 'text.primary '
                        : 'text.secondary',
                    }}
                  >
                    <span style={{ fontFamily: 'arial' }}>{'+ '}</span>
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
  React.ComponentProps<OptionTypeRenderer['CustomizableDateOption']> & {
    minDate?: Date
    maxDate?: Date
  }
>((props) => {
  const {
    uid,
    required,
    optionIndex,
    index,
    title,
    minDate = new Date('1950-11-12T00:00'),
    maxDate = new Date('2080-11-12T00:00'),
  } = props
  const { register, setValue, setError, getFieldState, clearErrors } = useFormAddProductsToCart()

  const { invalid } = getFieldState(`cartItems.${index}.entered_options.${optionIndex}.value`)

  minDate.setSeconds(0, 0)
  maxDate.setSeconds(0, 0)
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
        error={invalid}
        helperText={invalid ? <Trans id='Invalid date' /> : ''}
        type='datetime-local'
        InputProps={{
          inputProps: {
            min: minDate.toISOString().replace(/:00.000Z/, ''),
            max: maxDate.toISOString().replace(/:00.000Z/, ''),
          },
        }}
        onChange={(data) => {
          const selectedDate = new Date(data.currentTarget.value)
          if (selectedDate < minDate || selectedDate > maxDate) {
            setError(`cartItems.${index}.entered_options.${optionIndex}.value`, {
              message: 'Invalid date',
            })
          } else {
            clearErrors(`cartItems.${index}.entered_options.${optionIndex}.value`)
          }
          setValue(
            `cartItems.${index}.entered_options.${optionIndex}.value`,
            `${data.currentTarget.value.replace('T', ' ')}:00`,
          )
        }}
      />
    </Box>
  )
})

const CustomizableFieldOption = React.memo<
  React.ComponentProps<OptionTypeRenderer['CustomizableFieldOption']>
>((props) => {
  const { uid, required, optionIndex, index, title, fieldValue } = props
  const { control, register } = useFormAddProductsToCart()

  const maxLength = fieldValue?.max_characters ?? 0
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
        validation={{
          maxLength: {
            value: maxLength,
            message: i18n._(/* i18n*/ 'There is a maximum of  ‘{maxLength}’ characters', {
              maxLength,
            }),
          },
        }}
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
        />
      ))}
    </>
  )
}
