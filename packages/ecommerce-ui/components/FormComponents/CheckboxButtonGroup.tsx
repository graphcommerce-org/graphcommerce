/* eslint-disable @typescript-eslint/no-restricted-imports */
import {
  FieldError,
  useController,
  FieldValues,
  UseControllerProps,
} from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  useTheme,
} from '@mui/material'
import { useFormAddProductsToCart } from '@graphcommerce/magento-product/components/AddProductsToCart/useFormAddProductsToCart'

export type CheckboxButtonGroupProps<T extends FieldValues> = {
  options: { id: string | number; label: string }[] | any[]
  helperText?: string
  required?: boolean
  parseError?: (error: FieldError) => string
  label?: string
  labelKey?: string
  valueKey?: string
  onChange?: Function
  returnObject?: boolean
  disabled?: boolean
  row?: boolean
  checkboxColor?: CheckboxProps['color']
  index: number
  optionIndex: number
} & UseControllerProps<T>

export function CheckboxButtonGroup<TFieldValues extends FieldValues>({
  helperText,
  options,
  label,
  name,
  parseError,
  required,
  labelKey = 'label',
  valueKey = 'id',
  returnObject,
  disabled,
  row,
  control,
  checkboxColor,
  index,
  optionIndex,
  ...rest
}: CheckboxButtonGroupProps<TFieldValues>): JSX.Element {
  const theme = useTheme()
  const {
    fieldState: { invalid, error },
  } = useController({
    name,
    rules: required ? { required: i18n._(/* i18n */ 'This field is required') } : undefined,
    control,
  })

  const { setValue, getValues } = useFormAddProductsToCart()

  helperText = error
    ? typeof parseError === 'function'
      ? parseError(error)
      : error.message
    : helperText

  return (
    <FormControl error={invalid} required={required}>
      {label && <FormLabel error={invalid}>{label}</FormLabel>}
      <FormGroup row={row}>
        {options.map((option: any, i) => {
          const optionKey = option[valueKey]
          if (!optionKey) {
            console.error(
              `CheckboxButtonGroup: valueKey ${valueKey} does not exist on option`,
              option,
            )
          }
          const isChecked = getValues(`cartItems.${index}.selected_options`)?.includes(optionKey)

          return (
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: invalid ? theme.palette.error.main : undefined,
                  }}
                  color={checkboxColor || 'primary'}
                  value={optionKey}
                  checked={isChecked}
                  disabled={disabled}
                  onChange={
                    rest.onChange
                      ? rest.onChange()
                      : () =>
                          isChecked
                            ? setValue(
                                `cartItems.${index}.selected_options.${optionIndex + i}`,
                                undefined,
                              )
                            : setValue(
                                `cartItems.${index}.selected_options.${optionIndex + i}`,
                                optionKey,
                              )
                  }
                />
              }
              label={option[labelKey]}
              key={optionKey}
            />
          )
        })}
      </FormGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
