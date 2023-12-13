import { Button, Form, FormActions } from '@graphcommerce/next-ui'
import { FormProvider, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { Alert, SxProps, Theme } from '@mui/material'
import { EmailField } from '../CustomerFields/EmailField'
import {
  ForgotPasswordDocument,
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables,
} from './ForgotPassword.gql'

type ForgotPasswordFormProps = { sx?: SxProps<Theme>; children?: React.ReactNode }

export function ForgotPasswordForm(props: ForgotPasswordFormProps) {
  const { sx = [], children } = props
  const form = useFormGqlMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(
    ForgotPasswordDocument,
  )
  const { handleSubmit, formState } = form
  const submitHandler = handleSubmit(() => {})

  if (formState.isSubmitSuccessful && form.data) {
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
    <FormProvider {...form}>
      <Form onSubmit={submitHandler} noValidate sx={sx}>
        {children ?? (
          <>
            <EmailField />
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
          </>
        )}
      </Form>
    </FormProvider>
  )
}
