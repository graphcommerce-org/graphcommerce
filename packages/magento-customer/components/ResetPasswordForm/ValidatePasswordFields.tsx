import {
  PasswordRepeatElement,
  assertFormGqlOperation,
  useFormContext,
} from '@graphcommerce/ecommerce-ui'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { FormRow } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { ValidatedPasswordElement } from '../ValidatedPasswordElement/ValidatedPasswordElement'

export function ValidatePasswordFields() {
  const methods = useFormContext()
  assertFormGqlOperation(methods)
  const { control, formState, required, error } = methods
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, inputError] = graphqlErrorByCategory({
    category: 'graphql-input',
    error,
  })

  return (
    <FormRow>
      <ValidatedPasswordElement
        control={control}
        name='password'
        autoComplete='new-password'
        variant='outlined'
        label={<Trans id='Password' />}
        required={required.password}
        disabled={formState.isSubmitting}
        error={!!inputError}
        helperText={inputError?.message}
      />
      <PasswordRepeatElement
        control={control}
        name='confirmPassword'
        autoComplete='new-password'
        passwordFieldName='newPassword'
        variant='outlined'
        label={<Trans id='Confirm password' />}
        required
        disabled={formState.isSubmitting}
        error={!!inputError}
        helperText={inputError?.message}
      />
    </FormRow>
  )
}
