import {
  ApolloErrorSnackbar,
  PasswordElement,
  PasswordRepeatElement,
} from '@graphcommerce/ecommerce-ui'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import {
  Button,
  Form,
  FormActions,
  FormDivider,
  FormRow,
  MessageSnackbar,
} from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react/macro'
import { ValidatedPasswordElement } from '../ValidatedPasswordElement/ValidatedPasswordElement'
import type { ChangePasswordMutation, ChangePasswordMutationVariables } from './ChangePassword.gql'
import { ChangePasswordDocument } from './ChangePassword.gql'

export function ChangePasswordForm() {
  const form = useFormGqlMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables & { confirmPassword?: string }
  >(ChangePasswordDocument, {}, { errorPolicy: 'all' })
  const { handleSubmit, required, formState, error, control } = form
  const [remainingError0, authenticationError] = graphqlErrorByCategory({
    category: 'graphql-authentication',
    error,
  })
  const [remainingError, inputError] = graphqlErrorByCategory({
    category: 'graphql-input',
    error: remainingError0,
  })

  const submitHandler = handleSubmit(() => {})

  const showSuccess = !formState.isSubmitting && formState.isSubmitSuccessful && !error?.message

  return (
    <Form onSubmit={submitHandler} noValidate>
      <FormRow>
        <PasswordElement
          control={control}
          name='currentPassword'
          variant='outlined'
          autoComplete='current-password'
          label={<Trans>Current Password</Trans>}
          required={required.currentPassword}
          disabled={formState.isSubmitting}
          error={Boolean(authenticationError)}
          helperText={authenticationError?.message}
        />
      </FormRow>

      <FormRow>
        <ValidatedPasswordElement
          control={control}
          name='newPassword'
          variant='outlined'
          autoComplete='new-password'
          label={<Trans>New password</Trans>}
          required={required.newPassword}
          disabled={formState.isSubmitting}
          error={Boolean(inputError)}
          helperText={inputError?.message}
        />
        <PasswordRepeatElement
          control={control}
          name='confirmPassword'
          passwordFieldName='newPassword'
          autoComplete='new-password'
          variant='outlined'
          label={<Trans>Confirm password</Trans>}
          required
          disabled={formState.isSubmitting}
        />
      </FormRow>

      <FormDivider />

      <FormActions>
        <Button
          type='submit'
          loading={formState.isSubmitting}
          color='primary'
          variant='pill'
          size='large'
        >
          <Trans>Save new password</Trans>
        </Button>
      </FormActions>

      <ApolloErrorSnackbar error={remainingError} />

      {showSuccess && (
        <MessageSnackbar open={showSuccess} sticky variant='pill' severity='success'>
          <Trans>Successfully changed password</Trans>
        </MessageSnackbar>
      )}
    </Form>
  )
}
