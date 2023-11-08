import { Button, Form, FormActions } from '@graphcommerce/next-ui'
import { FormProvider, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { SxProps, Theme } from '@mui/material'
import { PropsWithChildren } from 'react'
import { EmailField } from '../CustomerFields/EmailField'
import {
  ForgotPasswordDocument,
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables,
} from './ForgotPassword.gql'

export function ForgotPasswordForm(props: { sx?: SxProps<Theme> } & PropsWithChildren) {
  const { sx = [], children } = props
  const form = useFormGqlMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(
    ForgotPasswordDocument,
  )
  const { handleSubmit, formState } = form
  const submitHandler = handleSubmit(() => {})

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
