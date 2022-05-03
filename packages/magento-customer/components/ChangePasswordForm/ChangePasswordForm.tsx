import {
  Form,
  FormActions,
  FormRow,
  MessageSnackbar,
  FormDivider,
  Button,
} from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans, t } from '@lingui/macro'
import { TextField } from '@mui/material'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import {
  ChangePasswordDocument,
  ChangePasswordMutation,
  ChangePasswordMutationVariables,
} from './ChangePassword.gql'

export function ChangePasswordForm() {
  const form = useFormGqlMutation<
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
          label={<Trans>Current Password</Trans>}
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
          label={<Trans>New password</Trans>}
          required={required.newPassword}
          {...muiRegister('newPassword', { required: required.newPassword })}
          helperText={formState.errors.newPassword?.message}
          disabled={formState.isSubmitting}
        />

        <TextField
          variant='outlined'
          type='password'
          error={!!formState.errors.confirmPassword}
          label={<Trans>Confirm password</Trans>}
          required
          {...muiRegister('confirmPassword', {
            required: true,
            validate: (value) => value === pass || t`Passwords don't match`,
          })}
          helperText={formState.errors.confirmPassword?.message}
          disabled={formState.isSubmitting}
        />
      </FormRow>

      <ApolloCustomerErrorAlert error={error} />

      <FormDivider />

      <FormActions>
        <Button
          type='submit'
          loading={formState.isSubmitting}
          color='primary'
          variant='contained'
          size='large'
        >
          <Trans>Save new password</Trans>
        </Button>
      </FormActions>

      <MessageSnackbar sticky open={Boolean(formState.isSubmitSuccessful && data)}>
        <Trans>Successfully changed password</Trans>
      </MessageSnackbar>
    </Form>
  )
}
