import { SelectElement, TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { FormRow } from '@graphcommerce/next-ui'
import type {
  FieldPath,
  FieldValues,
  PathValue,
  UseFormReturn,
} from '@graphcommerce/react-hook-form'
import { assertFormGqlOperation } from '@graphcommerce/react-hook-form'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'

// eslint-disable-next-line @typescript-eslint/no-restricted-imports

export type NameFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  form: UseFormReturn<TFieldValues>
  names?: {
    firstname: FieldPath<TFieldValues>
    lastname: FieldPath<TFieldValues>
    prefix?: FieldPath<TFieldValues>
  }
  readOnly?: boolean
  prefix?: boolean
  prefixes?: string[]
}

export function NameFields<TFieldValues extends FieldValues = FieldValues>(
  props: NameFieldProps<TFieldValues>,
) {
  const mr = t`Mr`
  const mrs = t`Mrs`
  const other = t`Other`

  const {
    form,
    readOnly,
    prefixes = [mr, mrs, other],
    prefix,
    names = {
      firstname: 'firstname' as FieldPath<TFieldValues>,
      lastname: 'lastname' as FieldPath<TFieldValues>,
      prefix: prefix ? ('prefix' as FieldPath<TFieldValues>) : undefined,
    },
  } = props
  assertFormGqlOperation<TFieldValues>(form)

  const { control, required } = form

  return (
    <>
      {names.prefix && (
        <FormRow>
          <SelectElement
            variant='outlined'
            defaultValue={prefixes[0] as PathValue<TFieldValues, FieldPath<TFieldValues>>}
            control={control}
            required={required.prefix}
            name={names.prefix}
            label={<Trans>Prefix</Trans>}
            showValid
            InputProps={{ readOnly }}
            options={prefixes.map((option) => ({ id: option, label: option }))}
          />
        </FormRow>
      )}
      <FormRow>
        <TextFieldElement
          control={control}
          name={names.firstname}
          required={required.firstname}
          variant='outlined'
          type='text'
          label={<Trans>First Name</Trans>}
          InputProps={{ readOnly }}
          showValid
        />
        <TextFieldElement
          control={control}
          name={names.lastname}
          required={required.lastname}
          variant='outlined'
          type='text'
          label={<Trans>Last Name</Trans>}
          InputProps={{ readOnly }}
          showValid
        />
      </FormRow>
    </>
  )
}
