import { ActionCardListForm, SwitchElement, TextFieldElement } from '@graphcommerce/ecommerce-ui'
import type { CustomAttributeMetadata } from '@graphcommerce/magento-store'
import type { ActionCardProps } from '@graphcommerce/next-ui'
import { ActionCard, filterNonNullableKeys, sxx } from '@graphcommerce/next-ui'
import type { Control, FieldPath, FieldValues } from '@graphcommerce/react-hook-form'
import { t } from '@lingui/macro'
import { MenuItem, type SxProps, type Theme } from '@mui/material'
import {
  customerAttributeInputType,
  customerAttributeValidationRules,
} from './customerAttributeFieldHelpers'

function assertUnreachable(renderer: never): never {
  throw new Error(`Please define a valid renderer for ${renderer}`)
}

export type CustomerAttributeFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  control: Control<TFieldValues>
  metadata: CustomAttributeMetadata<'CustomerAttributeMetadata'>
  helperText?: string
  disabled?: boolean
  sx?: SxProps<Theme>
}

export function CustomerAttributeField<TFieldValues extends FieldValues = FieldValues>(
  props: CustomerAttributeFieldProps<TFieldValues>,
) {
  const { control, metadata, helperText, disabled, sx } = props
  const { label, code, is_required, is_unique, options, frontend_input, gridArea, name } = metadata

  const fieldName = name as FieldPath<TFieldValues>

  const frontendInput = frontend_input ?? 'UNDEFINED'
  switch (frontendInput) {
    case 'TEXT':
    case 'TEXTAREA':
    case 'SELECT':
    case 'DATE':
    case 'DATETIME':
    case 'MULTILINE':
      return (
        <TextFieldElement<TFieldValues>
          key={code}
          label={label}
          control={control}
          name={fieldName}
          type={customerAttributeInputType(metadata)}
          required={is_required}
          rules={customerAttributeValidationRules(metadata)}
          multiline={frontendInput === 'TEXTAREA'}
          minRows={frontendInput === 'TEXTAREA' ? 4 : undefined}
          select={frontend_input === 'SELECT'}
          InputLabelProps={{
            shrink: frontendInput === 'DATE' || frontendInput === 'DATETIME',
          }}
          disabled={disabled}
          helperText={is_unique ? t`${label} must be unique` : helperText}
          sx={sxx(sx, { gridArea })}
          data-field={gridArea}
        >
          {options.map((option) => (
            <MenuItem key={option?.value} value={option?.value}>
              {option?.label}
            </MenuItem>
          ))}
        </TextFieldElement>
      )
    case 'BOOLEAN':
      return (
        <SwitchElement<TFieldValues>
          key={code}
          label={label}
          control={control}
          name={fieldName}
          required={is_required}
          rules={customerAttributeValidationRules(metadata)}
          disabled={disabled}
          sx={sxx(sx, { gridArea })}
          data-field={gridArea}
        />
      )
    case 'MULTISELECT':
      return (
        <ActionCardListForm<ActionCardProps, TFieldValues>
          key={code}
          control={control}
          name={fieldName}
          required={is_required}
          multiple
          render={ActionCard}
          items={filterNonNullableKeys(metadata.options).map((option) => ({
            value: option.value,
            title: option.label,
          }))}
          sx={sxx(sx, { gridArea })}
          data-field={gridArea}
        />
      )
    case 'FILE':
    case 'GALLERY':
    case 'HIDDEN':
    case 'IMAGE':
    case 'MEDIA_IMAGE':
    case 'PRICE':
    case 'UNDEFINED':
    case 'WEIGHT':
      console.log(`${code}:${frontendInput} is not implemented`)
      return null
    default:
      return assertUnreachable(frontendInput)
  }
}
