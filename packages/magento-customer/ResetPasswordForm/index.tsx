import { TextField } from '@material-ui/core'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { useFormGqlMutation } from '@reachdigital/react-hook-form'
import { useRouter } from 'next/router'
import React from 'react'
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
  const classes = useFormStyles()
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
    router.replace(`/account/create-password?success=1`)
  }

  return (
    <form onSubmit={submitHandler} noValidate className={classes.form}>
      <div className={classes.formRow}>
        <TextField
          variant='outlined'
          type='email'
          error={!!formState.errors.email}
          label='Email'
          required={required.email}
          {...muiRegister('email', { required: required.newPassword })}
          helperText={formState.errors.email?.message}
          disabled={formState.isSubmitting}
        />
      </div>
      <div className={classes.formRow}>
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
      </div>
      <div className={classes.formRow}>
        <TextField
          variant='outlined'
          type='password'
          error={!!formState.errors.confirmPassword}
          label='Confirm Password'
          required
          {...muiRegister('confirmPassword', {
            required: true,
            validate: (value) => value === newPass || "Passwords don't match",
          })}
          helperText={formState.errors.confirmPassword?.message}
          disabled={formState.isSubmitting}
        />
      </div>

      <ApolloErrorAlert error={error} />

      <div className={classes.actions}>
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
      </div>
    </form>
  )
}
