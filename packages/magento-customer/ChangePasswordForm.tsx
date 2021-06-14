import { TextField } from '@material-ui/core'
import Button from '@reachdigital/next-ui/Button'
import Form from '@reachdigital/next-ui/Form'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import FormActions from '@reachdigital/next-ui/Form/FormActions'
import FormRow from '@reachdigital/next-ui/Form/FormRow'
import { useFormGqlMutation } from '@reachdigital/react-hook-form'
import React from 'react'
import FormDivider from '../next-ui/Form/FormDivider'
import MessageSnackbar from '../next-ui/Snackbar/MessageSnackbar'
import {
  ChangePasswordDocument,
  ChangePasswordMutation,
  ChangePasswordMutationVariables,
} from './ChangePassword.gql'

export default function ChangePasswordForm() {
  const form =
    useFormGqlMutation<
      ChangePasswordMutation,
      ChangePasswordMutationVariables & { confirmPassword?: string }
    >(ChangePasswordDocument)
  const { muiRegister, handleSubmit, required, watch, data, formState, error } = form
  const submitHandler = handleSubmit(() => {})
  const pass = watch('newPassword')

  return (
    <Form onSubmit={submitHandler} noValidate>
      <FormRow>
        <TextField
          variant='outlined'
          type='password'
          error={!!formState.errors.currentPassword}
          label='Current Password'
          required={required.currentPassword}
          {...muiRegister('currentPassword', { required: required.currentPassword })}
          helperText={formState.errors.currentPassword?.message}
          disabled={formState.isSubmitting}
        />
      </FormRow>

      <FormRow>
        <TextField
          variant='outlined'
          type='password'
          error={!!formState.errors.newPassword}
          label='New Password'
          required={required.newPassword}
          {...muiRegister('newPassword', { required: required.newPassword })}
          helperText={formState.errors.newPassword?.message}
          disabled={formState.isSubmitting}
        />

        <TextField
          variant='outlined'
          type='password'
          error={!!formState.errors.confirmPassword}
          label='Confirm Password'
          required
          {...muiRegister('confirmPassword', {
            required: true,
            validate: (value) => value === pass || "Passwords don't match",
          })}
          helperText={formState.errors.confirmPassword?.message}
          disabled={formState.isSubmitting}
        />
      </FormRow>

      <ApolloErrorAlert error={error} />

      <FormDivider />

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

      <MessageSnackbar sticky open={Boolean(formState.isSubmitSuccessful && data)}>
        <>Password changed</>
      </MessageSnackbar>
    </Form>
  )
}
