import { TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { FormRow, InputCheckmark } from '@graphcommerce/next-ui'
import {
  assertFormGqlOperation,
  phonePattern,
  useFormContext,
} from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'

export function TelephoneField() {
  const form = useFormContext()
  assertFormGqlOperation<{ telephone?: string }>(form)

  const { formState, required, valid } = form
  const readOnly = formState.isSubmitting

  return (
    <FormRow>
      <TextFieldElement
        control={form.control}
        name='telephone'
        variant='outlined'
        type='text'
        required={required.telephone}
        validation={{
          pattern: {
            value: phonePattern,
            message: i18n._(/* i18n */ 'Invalid phone number'),
          },
        }}
        label={<Trans id='Telephone' />}
        InputProps={{
          readOnly,
          endAdornment: <InputCheckmark show={valid.telephone} />,
        }}
      />
    </FormRow>
  )
}
