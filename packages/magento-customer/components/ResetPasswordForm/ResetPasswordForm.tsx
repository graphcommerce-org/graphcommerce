import {
  PasswordElement,
  PasswordRepeatElement,
  TextFieldElement,
} from '@graphcommerce/ecommerce-ui'
import { Button, Form, FormActions, FormRow } from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import {
  ResetPasswordDocument,
  ResetPasswordMutation,
  ResetPasswordMutationVariables,
} from './ResetPassword.gql'

type ResetPasswordFormProps = {
  token: string
}

export function ResetPasswordForm(props: ResetPasswordFormProps) {
  const { token } = props

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
  const { handleSubmit, data, formState, error, control } = form
  const submitHandler = handleSubmit(() => {})

  if (formState.isSubmitSuccessful && data && !error) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.replace(`${window.location.href.split('?')[0]}?success=1`)
  }

  return (
    <Form onSubmit={submitHandler} noValidate>
      <FormRow>
        <TextFieldElement
          control={control}
          name='email'
          variant='outlined'
          type='email'
          label={<Trans id='Email' />}
          required
          disabled={formState.isSubmitting}
        />
      </FormRow>
      <FormRow>
        <PasswordElement
          control={control}
          name='newPassword'
          variant='outlined'
          label={<Trans id='New password' />}
          required
          disabled={formState.isSubmitting}
        />
        <PasswordRepeatElement
          control={control}
          name='confirmPassword'
          passwordFieldName='newPassword'
          variant='outlined'
          label={<Trans id='Confirm password' />}
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
        >
          <Trans id='Save new password' />
        </Button>
      </FormActions>
    </Form>
  )
}
