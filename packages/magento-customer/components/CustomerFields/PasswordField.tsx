import {
  PasswordElement,
  assertFormGqlOperation,
  useFormContext,
} from '@graphcommerce/ecommerce-ui'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { FormRow } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'

type PasswordFieldProps = {
  label?: React.ReactNode
}

export function PasswordField({ label }: PasswordFieldProps) {
  const methods = useFormContext()
  assertFormGqlOperation(methods)
  const { control, formState, required, error } = methods

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, authenticationError] = graphqlErrorByCategory({
    category: 'graphql-authentication',
    error,
  })
  return (
    <FormRow>
      <PasswordElement
        control={control}
        variant='outlined'
        name='password'
        label={label ?? <Trans id='Password' />}
        autoComplete='current-password'
        required={required.password}
        disabled={formState.isSubmitting}
        error={Boolean(authenticationError)}
        helperText={authenticationError?.message}
      />
    </FormRow>
  )
}
