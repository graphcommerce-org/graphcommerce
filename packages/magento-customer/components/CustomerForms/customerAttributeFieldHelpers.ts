import type { CustomAttributeMetadata } from '@graphcommerce/magento-store'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import type { ControllerProps, FieldPath, FieldValues } from '@graphcommerce/react-hook-form'
import { t } from '@lingui/core/macro'
import type { HTMLInputTypeAttribute } from 'react'

export type InputValidationValue =
  | 'alphanumeric'
  | 'alphanum-with-spaces'
  | 'numeric'
  | 'alpha'
  | 'url'
  | 'email'
  | 'length'
  | 'date'

function assertUnreachable(renderer: never): never {
  throw new Error(`Please define a valid renderer for ${renderer}`)
}

export function customerAttributeValidationRules<
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

export function customerAttributeInputType(
  metadata: CustomAttributeMetadata<'CustomerAttributeMetadata'>,
): React.HTMLInputTypeAttribute {
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
