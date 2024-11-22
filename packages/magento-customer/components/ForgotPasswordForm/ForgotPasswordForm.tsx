import { TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { Button, Form, FormActions, FormRow } from '@graphcommerce/next-ui'
import { emailPattern, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import type { SxProps, Theme } from '@mui/material'
import { Alert } from '@mui/material'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import type { ForgotPasswordMutation, ForgotPasswordMutationVariables } from './ForgotPassword.gql'
import { ForgotPasswordDocument } from './ForgotPassword.gql'

export function ForgotPasswordForm(props: { sx?: SxProps<Theme> }) {
  const { sx = [] } = props
  const form = useFormGqlMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(
    ForgotPasswordDocument,
  )
  const { control, handleSubmit, required, data, formState, error } = form
  const submitHandler = handleSubmit(() => {})

  if (formState.isSubmitSuccessful && data) {
    return (
      <Alert
        severity='success'
        variant='standard'
        sx={(theme) => ({
          marginTop: theme.spacings.md,
          marginBottom: theme.spacings.sm,
        })}
      >
        <Trans id='We’ve send a password reset link to your email address!' />
      </Alert>
    )
  }

  return (
    <Form onSubmit={submitHandler} noValidate sx={sx}>
      <FormRow>
        <TextFieldElement
          variant='outlined'
          type='text'
          error={!!formState.errors.email}
          label={<Trans id='Email' />}
          required={required.email}
          name='email'
          control={control}
          rules={{
            pattern: { value: emailPattern, message: i18n._(/* i18n */ 'Invalid email address') },
          }}
          helperText={formState.errors.email?.message}
          disabled={formState.isSubmitting}
          showValid
        />
      </FormRow>

      <ApolloCustomerErrorAlert error={error} />

      <FormActions>
        <Button
          type='submit'
          loading={formState.isSubmitting}
          color='primary'
          variant='pill'
          size='large'
        >
          <Trans id='Send password reset email' />
        </Button>
      </FormActions>
    </Form>
  )
}
