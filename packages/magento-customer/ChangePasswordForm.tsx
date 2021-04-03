import { TextField } from '@material-ui/core'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { useFormGqlMutation } from '@reachdigital/react-hook-form'
import React from 'react'
import {
  ChangePasswordDocument,
  ChangePasswordMutation,
  ChangePasswordMutationVariables,
} from './ChangePassword.gql'

export default function ChangePasswordForm() {
  const classes = useFormStyles()
  const form = useFormGqlMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables & { confirmPassword?: string }
  >(ChangePasswordDocument)
  const { muiRegister, handleSubmit, required, watch, data, formState, error } = form
  const submitHandler = handleSubmit(() => {})

  if (formState.isSubmitSuccessful && data) {
    return <div>Password changed!</div>
  }

  return (
    <form onSubmit={submitHandler} noValidate className={classes.form}>
      <div className={classes.formRow}>
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
      </div>

      <div className={classes.formRow}>
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
            validate: (value) => value === watch('newPassword') || "Paswords don't match",
          })}
          helperText={formState.errors.confirmPassword?.message}
          disabled={formState.isSubmitting}
        />
      </div>

      <ApolloErrorAlert error={error} />
      <div className={classes.form}>
        <Button
          type='submit'
          loading={formState.isSubmitting}
          color='primary'
          variant='contained'
          size='large'
        >
          Change
        </Button>
      </div>
    </form>
  )
}
