import { ActionCardListForm, SwitchElement, TextFieldElement } from '@graphcommerce/ecommerce-ui'
import type { CustomAttributeMetadata } from '@graphcommerce/magento-store'
import type { ActionCardProps } from '@graphcommerce/next-ui'
import { ActionCard, filterNonNullableKeys, sxx } from '@graphcommerce/next-ui'
import type {
  Control,
  ControllerProps,
  FieldPath,
  FieldValues,
} from '@graphcommerce/react-hook-form'
import { t } from '@lingui/macro'
import { MenuItem, type SxProps, type Theme } from '@mui/material'
import type { HTMLInputTypeAttribute } from 'react'

function assertUnreachable(renderer: never): never {
  throw new Error(`Please define a valid renderer for ${renderer}`)
}

type InputValidationValue =
  | 'alphanumeric'
  | 'alphanum-with-spaces'
  | 'numeric'
  | 'alpha'
  | 'url'
  | 'email'
  | 'length'
  | 'date'

function toRules<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  metadata: CustomAttributeMetadata<'CustomerAttributeMetadata'>,
): ControllerProps<TFieldValues, TName>['rules'] {
  const { label, is_required, validate_rules } = metadata

  return filterNonNullableKeys(validate_rules, ['name', 'value']).reduce<
    ControllerProps<TFieldValues, TName>['rules']
  >(
    (current, validateRule) => {
      const inputValidation = (validateRule.value ?? 'length') as InputValidationValue

      switch (validateRule.name) {
        case 'MAX_TEXT_LENGTH':
          return {
            ...current,
            maxLength: {
              value: parseInt(validateRule.value, 10),
              message: t`The maximum length is ${validateRule.value}`,
            },
          }
        case 'MIN_TEXT_LENGTH':
          return {
            ...current,
            minLength: {
              value: parseInt(validateRule.value, 10),
              message: t`The minimum length is ${validateRule.value}`,
            },
          }
        case 'INPUT_VALIDATION':
          switch (inputValidation) {
            case 'email':
            case 'length':
            case 'date':
              // Handled by setting the input type of the field
              return current
            case 'alpha':
              return {
                ...current,
                pattern: { value: /^[A-Za-z]+$/, message: t`Only alpha values allowed` },
              }
            case 'alphanumeric':
              return {
                ...current,
                pattern: { value: /^[A-Za-z0-9]+$/, message: t`Only alphanumeric values allowed` },
              }
            case 'numeric':
              return {
                ...current,
                pattern: { value: /^[0-9]+$/, message: t`Only numeric values allowed` },
              }
            case 'alphanum-with-spaces':
              return {
                ...current,
                pattern: {
                  value: /^[A-Za-z0-9\s]+$/,
                  message: t`Only alphanumeric values with spaces allowed`,
                },
              }
            case 'url':
              return {
                ...current,
                pattern: {
                  value: /^(https?):\/\/[^\s/$.?#].[^\s]*$/,
                  message: t`Please enter a valid URL`,
                },
              }
            default:
              return assertUnreachable(inputValidation)
          }
        case 'FILE_EXTENSIONS':
        case 'MAX_IMAGE_HEIGHT':
        case 'MAX_IMAGE_WIDTH':
        case 'MAX_FILE_SIZE':
        case 'DATE_RANGE_MAX':
        case 'DATE_RANGE_MIN':
          return current
        default:
          return assertUnreachable(validateRule.name)
      }
    },
    {
      required: {
        value: is_required,
        message: t`${label ?? t`This field`} is required`,
      },
    },
  )
}

function inputType(
  metadata: CustomAttributeMetadata<'CustomerAttributeMetadata'>,
): HTMLInputTypeAttribute {
  if (metadata.frontend_input === 'DATE') return 'date'
  if (metadata.frontend_input === 'DATETIME') return 'datetime-local'

  const inputValidation =
    metadata.__typename === 'CustomerAttributeMetadata' &&
    (metadata.validate_rules?.find((r) => r?.name === 'INPUT_VALIDATION')?.value as
      | InputValidationValue
      | undefined)
  let type = 'text'
  if (inputValidation === 'email') type = 'email'
  return type
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
  const {
    __typename,
    label,
    input_filter = 'NONE',
    code,
    is_required,
    is_unique,
    options,
    default_value,
    frontend_class,
    frontend_input,
    multiline_count,
    validate_rules,
    gridArea,
    name,
    index,
  } = metadata

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
          type={inputType(metadata)}
          required={is_required}
          rules={toRules(metadata)}
          multiline={frontendInput === 'TEXTAREA'}
          minRows={frontendInput === 'TEXTAREA' ? 4 : undefined}
          select={frontend_input === 'SELECT'}
          InputLabelProps={{
            shrink: frontendInput === 'DATE' || frontendInput === 'DATETIME',
          }}
          disabled={disabled}
          helperText={is_unique ? t`${label} must be unique` : helperText}
          sx={sxx(sx, { gridArea: metadata.gridArea })}
          data-field={metadata.gridArea}
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
          rules={toRules(metadata)}
          disabled={disabled}
          sx={sx}
          data-field={metadata.gridArea}
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
          items={filterNonNullableKeys(metadata.options).map((i) => ({
            value: i.value,
            title: i.label,
          }))}
          sx={sx}
          data-field={metadata.gridArea}
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
      return null
    default:
      return assertUnreachable(frontendInput)
  }
}
