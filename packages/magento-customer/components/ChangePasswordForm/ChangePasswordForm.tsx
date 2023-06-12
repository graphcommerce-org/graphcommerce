import { PasswordElement, PasswordRepeatElement } from '@graphcommerce/ecommerce-ui'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import {
  Form,
  FormActions,
  FormRow,
  MessageSnackbar,
  FormDivider,
  Button,
} from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
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
  const { handleSubmit, required, data, formState, error, control } = form
  const [remainingError, inputError] = graphqlErrorByCategory({
    category: 'graphql-input',
    error,
  })

  const submitHandler = handleSubmit(() => {})

  return (
    <Form onSubmit={submitHandler} noValidate>
      <FormRow>
        <PasswordElement
          control={control}
          name='currentPassword'
          variant='outlined'
          type='password'
          label={<Trans id='Current Password' />}
          error={!!inputError}
          required={required.currentPassword}
          disabled={formState.isSubmitting}
          helperText={formState.errors.currentPassword?.message || inputError?.message}
        />
      </FormRow>

      <FormRow>
        <PasswordElement
          control={control}
          name='newPassword'
          variant='outlined'
          type='password'
          label={<Trans id='New password' />}
          error={!!inputError}
          required={required.newPassword}
          disabled={formState.isSubmitting}
          helperText={formState.errors.newPassword?.message || inputError?.message}
        />
        <PasswordRepeatElement
          control={control}
          name='confirmPassword'
          passwordFieldName='newPassword'
          variant='outlined'
          type='password'
          label={<Trans id='Confirm password' />}
          error={!!formState.errors.confirmPassword || !!inputError}
          required
          disabled={formState.isSubmitting}
          helperText={formState.errors.confirmPassword?.message}
        />
      </FormRow>

      <ApolloCustomerErrorAlert error={error} />

      <FormDivider />

      <FormActions>
        <Button
          type='submit'
          loading={formState.isSubmitting}
          color='primary'
          variant='pill'
          size='large'
        >
          <Trans id='Save new password' />
        </Button>
      </FormActions>

      <MessageSnackbar sticky open={Boolean(formState.isSubmitSuccessful && data)}>
        <Trans id='Successfully changed password' />
      </MessageSnackbar>
    </Form>
  )
}
