import {
  ApolloErrorSnackbar,
  PasswordElement,
  PasswordRepeatElement,
} from '@graphcommerce/ecommerce-ui'
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
import { ValidatedPasswordElement } from '../ValidatedPasswordElement/ValidatedPasswordElement'
import {
  ChangePasswordDocument,
  ChangePasswordMutation,
  ChangePasswordMutationVariables,
} from './ChangePassword.gql'

export function ChangePasswordForm() {
  const form = useFormGqlMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables & { confirmPassword?: string }
  >(ChangePasswordDocument, {}, { errorPolicy: 'all' })
  const { handleSubmit, required, data, formState, error, control } = form
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
          label={<Trans id='Current Password' />}
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
          label={<Trans id='New password' />}
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
          label={<Trans id='Confirm password' />}
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
          <Trans id='Save new password' />
        </Button>
      </FormActions>

      <ApolloErrorSnackbar error={remainingError} />

      {showSuccess && (
        <MessageSnackbar open={showSuccess} sticky variant='pill'>
          <Trans id='Successfully changed password' />
        </MessageSnackbar>
      )}
    </Form>
  )
}
