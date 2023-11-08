import { TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { FormRow } from '@graphcommerce/next-ui'
import {
  assertFormGqlOperation,
  emailPattern,
  useFormContext,
  useWatch,
} from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { EmailField } from './EmailField'

export function ConfirmEmailField() {
  const methods = useFormContext()
  assertFormGqlOperation(methods)
  const { control, formState } = methods
  const watchNewEmail = useWatch({ control, name: 'email' })
  return (
    <FormRow>
      <EmailField label={<Trans id='New email' />} />
      <TextFieldElement
        key='confirm-email'
        variant='outlined'
        type='text'
        autoComplete='off'
        error={formState.isSubmitted && !!formState.errors.confirmEmail}
        helperText={formState.isSubmitted && formState.errors.confirmEmail?.message}
        label={<Trans id='Confirm new email' />}
        required
        control={control}
        name='confirmEmail'
        validation={{
          required: true,
          validate: (value) => value === watchNewEmail || i18n._(/* i18n */ "Emails don't match"),
        }}
      />
    </FormRow>
  )
}
