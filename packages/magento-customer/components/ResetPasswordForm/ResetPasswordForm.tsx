import { EmailElement, PasswordRepeatElement } from '@graphcommerce/ecommerce-ui'
import { Button, Form, FormActions, FormRow } from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react/macro'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import { ValidatedPasswordElement } from '../ValidatedPasswordElement/ValidatedPasswordElement'
import type { ResetPasswordMutation, ResetPasswordMutationVariables } from './ResetPassword.gql'
import { ResetPasswordDocument } from './ResetPassword.gql'

export type ResetPasswordFormProps = {
  token: string
  buttonProps?: React.ComponentProps<typeof Button>
}

export function ResetPasswordForm(props: ResetPasswordFormProps) {
  const { token, buttonProps } = props
  const router = useRouter()
  const emailFromUrl = router.query.email as string | undefined

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
      defaultValues: {
        email: '',
      },
    },
    { errorPolicy: 'all' },
  )

  const { handleSubmit, data, formState, error, control, reset } = form
  const submitHandler = handleSubmit(() => {})

  useEffect(() => {
    if (emailFromUrl) {
      reset({ email: emailFromUrl })
    }
  }, [emailFromUrl, reset])

  if (formState.isSubmitSuccessful && data && !error) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.replace(`${window.location.href.split('?')[0]}?success=1`)
  }

  return (
    <Form onSubmit={submitHandler} noValidate>
      <FormRow>
        <EmailElement
          control={control}
          name='email'
          variant='outlined'
          required
          disabled={formState.isSubmitting}
          InputProps={{ readOnly: true }}
        />
      </FormRow>
      <FormRow>
        <ValidatedPasswordElement
          control={control}
          name='newPassword'
          autoComplete='new-password'
          variant='outlined'
          label={<Trans>New password</Trans>}
          required
          disabled={formState.isSubmitting}
        />
        <PasswordRepeatElement
          control={control}
          name='confirmPassword'
          autoComplete='new-password'
          passwordFieldName='newPassword'
          variant='outlined'
          label={<Trans>Confirm password</Trans>}
          required
          disabled={formState.isSubmitting}
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
          {...buttonProps}
        >
          <Trans>Save new password</Trans>
        </Button>
      </FormActions>
    </Form>
  )
}
