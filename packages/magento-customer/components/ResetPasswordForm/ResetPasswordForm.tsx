import { Button, Form, FormActions } from '@graphcommerce/next-ui'
import { FormProvider, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import { EmailField } from '../CustomerFields/EmailField'
import {
  ResetPasswordDocument,
  ResetPasswordMutation,
  ResetPasswordMutationVariables,
} from './ResetPassword.gql'
import { ValidatePasswordFields } from './ValidatePasswordFields'

type ResetPasswordFormProps = PropsWithChildren<{
  token: string
}>

export function ResetPasswordForm(props: ResetPasswordFormProps) {
  const { token, children } = props

  const form = useFormGqlMutation<
    ResetPasswordMutation,
    ResetPasswordMutationVariables & { confirmPassword?: string }
  >(
    ResetPasswordDocument,
    {
      onBeforeSubmit: (formData) => ({
        ...formData,
        resetPasswordToken: token,
      }),
    },
    { errorPolicy: 'all' },
  )

  const router = useRouter()
  const { handleSubmit, data, formState, error } = form
  const submitHandler = handleSubmit(() => {})

  if (formState.isSubmitSuccessful && data && !error) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.replace(`${window.location.href.split('?')[0]}?success=1`)
  }

  return (
    <FormProvider {...form}>
      <Form onSubmit={submitHandler} noValidate>
        {children ?? (
          <>
            <EmailField />
            <ValidatePasswordFields />
            <ApolloCustomerErrorAlert />

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
          </>
        )}
      </Form>
    </FormProvider>
  )
}
