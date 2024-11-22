import { SelectElement, TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { FormRow } from '@graphcommerce/next-ui'
import type { UseFormReturn } from '@graphcommerce/react-hook-form'
import { assertFormGqlOperation } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'

// eslint-disable-next-line @typescript-eslint/no-restricted-imports

type NameFieldValues = {
  firstname?: string
  lastname?: string
  prefix?: string
}

type NameFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>
  readOnly?: boolean
  prefix?: boolean
  prefixes?: string[]
}

export function NameFields(props: NameFieldProps) {
  const mr = i18n._(/* i18n */ 'Mr')
  const mrs = i18n._(/* i18n */ 'Mrs')
  const other = i18n._(/* i18n */ 'Other')

  const { prefix, form, readOnly, prefixes = [mr, mrs, other] } = props
  assertFormGqlOperation<NameFieldValues>(form)

  const { control, required } = form

  return (
    <>
      {prefix && (
        <FormRow>
          <SelectElement
            variant='outlined'
            defaultValue={prefixes[0]}
            control={control}
            required={required.prefix}
            name='prefix'
            label={<Trans id='Prefix' />}
            showValid
            InputProps={{ readOnly }}
            options={prefixes.map((option) => ({ id: option, label: option }))}
          />
        </FormRow>
      )}
      <FormRow>
        <TextFieldElement
          control={control}
          name='firstname'
          required={required.firstname}
          variant='outlined'
          type='text'
          label={<Trans id='First Name' />}
          InputProps={{ readOnly }}
          showValid
        />
        <TextFieldElement
          control={control}
          name='lastname'
          required={required.lastname}
          variant='outlined'
          type='text'
          label={<Trans id='Last Name' />}
          InputProps={{ readOnly }}
          showValid
        />
      </FormRow>
    </>
  )
}
