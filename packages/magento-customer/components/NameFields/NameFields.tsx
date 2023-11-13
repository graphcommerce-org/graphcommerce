import { SelectElement, TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { FormRow, InputCheckmark } from '@graphcommerce/next-ui'
import { assertFormGqlOperation, UseFormReturn } from '@graphcommerce/react-hook-form'
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

  const { control, required, valid, formState } = form

  // It is importan this piece of code stays here. There is a bug which causes the form to not fill defaultvalues properly. Workaround is this piece of code. Link to bugreport : https://github.com/react-hook-form/react-hook-form/issues/857
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isValid } = formState

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
            InputProps={{
              readOnly,
              endAdornment: <InputCheckmark show={valid.prefix} select />,
            }}
            options={prefixes.map((option) => ({
              id: option,
              label: option,
            }))}
          />
        </FormRow>
      )}

      <FormRow>
        <TextFieldElement
          control={form.control}
          name='firstname'
          required={required.firstname}
          variant='outlined'
          type='text'
          label={<Trans id='First Name' />}
          InputProps={{
            readOnly,
            endAdornment: <InputCheckmark show={valid.firstname} />,
          }}
        />
        <TextFieldElement
          control={form.control}
          name='lastname'
          required={required.lastname}
          variant='outlined'
          type='text'
          label={<Trans id='Last Name' />}
          InputProps={{
            readOnly,
            endAdornment: <InputCheckmark show={valid.lastname} />,
          }}
        />
      </FormRow>
    </>
  )
}
