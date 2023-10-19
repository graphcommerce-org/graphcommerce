import {
  CheckboxButtonGroup,
  Controller,
  MultiSelectElement,
  RadioButtonGroup,
  SelectElement,
  TextFieldElement,
} from '@graphcommerce/ecommerce-ui'
import {
  ActionCard,
  ActionCardListForm,
  ActionCardProps,
  filterNonNullableKeys,
  RenderType,
  TypeRenderer,
} from '@graphcommerce/next-ui'
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  TextField,
  Button,
} from '@mui/material'
import React, { useRef } from 'react'
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
  const { uid, required, index, title, radioValue } = props
  const { control } = useFormAddProductsToCart()

  // return (
  //   <ActionCardListForm
  //     control={control}
  //     render={ActionCard}
  //     name={`cartItems.${index}.customizable_options.${uid}`}
  //     items={filterNonNullableKeys(radioValue, ['title']).map(
  //       (radioVal) =>
  //         ({
  //           value: radioVal.uid,
  //           title: radioVal.title,
  //         }) satisfies ActionCardProps,
  //     )}
  //   />
  // )

  return (
    <RadioButtonGroup
      control={control}
      name={`cartItems.${index}.customizable_options.${uid}`}
      label={title || ''}
      options={filterNonNullableKeys(radioValue, ['title']).map((option) => ({
        id: option.uid,
        label: option.title,
      }))}
      required={Boolean(required)}
    />
  )
})

const CustomizableCheckboxOption = React.memo<
  React.ComponentProps<OptionTypeRenderer['CustomizableCheckboxOption']>
>((props) => {
  const { uid, required, index, title, checkboxValue } = props
  const { control } = useFormAddProductsToCart()

  return (
    <Controller
      control={control}
      rules={{
        validate: (value) => {
          if (!required) return true
          const allSelected = Array.isArray(value) ? value : [value]
          return allSelected.length > 0 ? true : 'HIER NOG EEN MOOIE VERTAALDE STRING'
        },
      }}
      name={`cartItems.${index}.customizable_options.${uid}`}
      render={({ field: { onChange, value, ...fieldProps }, fieldState: { invalid, error } }) => {
        const allSelected = Array.isArray(value) ? value : [value]

        return (
          <FormControl error={invalid} required>
            <FormLabel error={invalid}>{title}</FormLabel>
            <FormGroup>
              {filterNonNullableKeys(checkboxValue, ['title']).map((item) => (
                <FormControlLabel
                  key={item.uid}
                  label={item.title}
                  control={<Checkbox {...fieldProps} checked={allSelected.includes(item.uid)} />}
                  onChange={() =>
                    onChange(
                      allSelected.includes(item.uid)
                        ? allSelected.filter((v) => v !== item.uid)
                        : [...allSelected, item.uid],
                    )
                  }
                />
              ))}
            </FormGroup>
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        )
      }}
    />
  )
})

const CustomizableMultipleOption = React.memo<
  React.ComponentProps<OptionTypeRenderer['CustomizableMultipleOption']>
>((props) => {
  const { uid, required, optionIndex, index, title, multipleValue } = props
  const { control } = useFormAddProductsToCart()

  return (
    <ActionCardListForm
      multiple
      control={control}
      render={ActionCard}
      name={`cartItems.${index}.customizable_options.${uid}`}
      items={filterNonNullableKeys(multipleValue, ['title']).map(
        (multipleVal) =>
          ({
            value: multipleVal.uid,
            title: multipleVal.title,
          }) satisfies ActionCardProps,
      )}
    />
  )
})

const CustomizableDateOption = React.memo<
  React.ComponentProps<OptionTypeRenderer['CustomizableDateOption']>
>((props) => {
  const { uid, required, optionIndex, index, title } = props
  const { register, setValue } = useFormAddProductsToCart()

  return (
    <>
      <input
        type='hidden'
        {...register(`cartItems.${index}.entered_options.${optionIndex}.uid`)}
        value={uid}
      />
      <TextField
        required={!!required}
        label={title}
        type='datetime-local'
        onChange={(data) =>
          setValue(
            `cartItems.${index}.entered_options.${optionIndex}.value`,
            `${data.currentTarget.value.replace('T', ' ')}:00`,
          )
        }
      />
    </>
  )
})

const CustomizableFieldOption = React.memo<
  React.ComponentProps<OptionTypeRenderer['CustomizableFieldOption']>
>((props) => {
  const { uid, required, optionIndex, index, title, fieldValue } = props
  const { control, register } = useFormAddProductsToCart()

  const maxLength = fieldValue?.max_characters ?? undefined
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

// const CustomizableFileOption = React.memo<
//   React.ComponentProps<OptionTypeRenderer['CustomizableFileOption']>
// >((props) => {
//   const { uid, required, optionIndex, index, title, fileValue } = props
//   const { control, register } = useFormAddProductsToCart()

//   async function getBase64(file) {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader()
//       reader.readAsDataURL(file)
//       reader.onload = () => {
//         resolve(reader.result)
//       }
//       reader.onerror = reject
//     })
//   }

//   return (
//     <>
//       <input
//         type='hidden'
//         {...register(`cartItems.${index}.entered_options.${optionIndex}.uid`)}
//         value={uid}
//       />
//       <Controller
//         control={control}
//         name={`cartItems.${index}.entered_options.${optionIndex}.value`}
//         render={({ field: { onChange, value, ...fieldProps }, fieldState: { invalid, error } }) => (
//           <FormControl error={invalid} required>
//             <FormLabel error={invalid}>{title}</FormLabel>
//             <FormControlLabel
//               label=''
//               control={
//                 <>
//                   <input
//                     {...fieldProps}
//                     color='primary'
//                     accept='image/*'
//                     type='file'
//                     id='icon-button-file'
//                     style={{ display: 'none' }}
//                     onChange={async (i) => {
//                       console.log(i.target.files?.[0])
//                       return onChange(await getBase64(i.target.files?.[0]))
//                     }}
//                   />
//                   <Button
//                     variant='contained'
//                     component='span'
//                     size='large'
//                     color='primary'
//                     sx={{ width: '100%' }}
//                   >
//                     Upload file
//                   </Button>
//                 </>
//               }
//             />
//             {error && <FormHelperText>{error.message}</FormHelperText>}
//           </FormControl>
//         )}
//       />
//     </>
//   )
// })

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
