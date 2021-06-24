import { TextField } from '@material-ui/core'
import Button from '@reachdigital/next-ui/Button'
import Form from '@reachdigital/next-ui/Form'
import FormActions from '@reachdigital/next-ui/Form/FormActions'
import FormRow from '@reachdigital/next-ui/Form/FormRow'
import { useFormGqlMutation } from '@reachdigital/react-hook-form'
import { useRouter } from 'next/router'
import React from 'react'
import ApolloCustomerErrorAlert from '../ApolloCustomerErrorAlert/ApolloCustomerErrorAlert'
import {
  ResetPasswordDocument,
  ResetPasswordMutation,
  ResetPasswordMutationVariables,
} from './ResetPassword.gql'

type ResetPasswordFormProps = {
  token: string
}

export default function ResetPasswordForm(props: ResetPasswordFormProps) {
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
          label='Email'
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
          text='bold'
        >
          Save new password
        </Button>
      </FormActions>
    </Form>
  )
}
