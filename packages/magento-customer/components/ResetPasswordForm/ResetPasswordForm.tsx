import { Button, Form, FormActions, FormRow } from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/macro'
import { TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import {
  ResetPasswordDocument,
  ResetPasswordMutation,
  ResetPasswordMutationVariables,
} from './ResetPassword.gql'

type ResetPasswordFormProps = {
  token: string
}

export function ResetPasswordForm(props: ResetPasswordFormProps) {
  const { token } = props

  const form = useFormGqlMutation<
    ResetPasswordMutation,
    ResetPasswordMutationVariables & { confirmPassword?: string }
  >(ResetPasswordDocument, {
    onBeforeSubmit: (formData) => ({
      ...formData,
      resetPasswordToken: token,
    }),
  })

  const router = useRouter()
  const { muiRegister, handleSubmit, required, watch, data, formState, error } = form
  const submitHandler = handleSubmit(() => {})
  const newPass = watch('newPassword')

  if (formState.isSubmitSuccessful && data) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.replace(`${window.location.href.split('?')[0]}?success=1`)
  }

  return (
    <Form onSubmit={submitHandler} noValidate>
      <FormRow>
        <TextField
          variant='outlined'
          type='email'
          error={!!formState.errors.email}
          label={<Trans>Email</Trans>}
          required={required.email}
          {...muiRegister('email', { required: required.email })}
          helperText={formState.errors.email?.message}
          disabled={formState.isSubmitting}
        />
      </FormRow>
      <FormRow>
        <TextField
          variant='outlined'
          type='password'
          error={!!formState.errors.newPassword}
          label='New password'
          required={required.newPassword}
          {...muiRegister('newPassword', { required: required.newPassword })}
          helperText={formState.errors.newPassword?.message}
          disabled={formState.isSubmitting}
        />
      </FormRow>
      <FormRow>
        <TextField
          variant='outlined'
          type='password'
          error={!!formState.errors.confirmPassword}
          label='Confirm password'
          required
          {...muiRegister('confirmPassword', {
            required: true,
            validate: (value) => value === newPass || "Passwords don't match",
          })}
          helperText={formState.errors.confirmPassword?.message}
          disabled={formState.isSubmitting}
        />
      </FormRow>

      <ApolloCustomerErrorAlert error={error} />

      <FormActions>
        <Button
          type='submit'
          loading={formState.isSubmitting}
          color='primary'
          variant='contained'
          size='large'
        >
          Save new password
        </Button>
      </FormActions>
    </Form>
  )
}
