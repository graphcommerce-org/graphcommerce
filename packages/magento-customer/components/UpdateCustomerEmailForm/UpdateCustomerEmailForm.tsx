import { PasswordElement } from '@graphcommerce/ecommerce-ui'
import {
  Button,
  Form,
  FormActions,
  FormDivider,
  FormRow,
  MessageSnackbar,
} from '@graphcommerce/next-ui'
import { emailPattern, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { TextField } from '@mui/material'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import {
  UpdateCustomerEmailDocument,
  UpdateCustomerEmailMutation,
  UpdateCustomerEmailMutationVariables,
} from './UpdateCustomerEmail.gql'

type UpdateCustomerEmailFormProps = {
  email: string
}

export function UpdateCustomerEmailForm(props: UpdateCustomerEmailFormProps) {
  const { email } = props

  const form = useFormGqlMutation<
    UpdateCustomerEmailMutation,
    UpdateCustomerEmailMutationVariables & {
      currentEmail?: string
      confirmEmail?: string
    }
  >(UpdateCustomerEmailDocument)

  const { handleSubmit, error, required, formState, watch, muiRegister, reset, control } = form
  const submit = handleSubmit(() => {
    reset()
  })
  const watchNewEmail = watch('email')

  return (
    <Form onSubmit={submit} noValidate>
      <FormRow>
        <TextField
          key='current-email'
          variant='outlined'
          type='text'
          autoComplete='currentEmail'
          autoFocus
          error={formState.isSubmitted && !!formState.errors.currentEmail}
          helperText={formState.isSubmitted && formState.errors.currentEmail?.message}
          label='Current email'
          required
          value={email}
          {...muiRegister('currentEmail', {
            required: true,
            pattern: { value: emailPattern, message: '' },
          })}
          InputProps={{
            readOnly: true,
          }}
        />
      </FormRow>

      <FormRow>
        <TextField
          key='email'
          variant='outlined'
          type='text'
          autoComplete='email'
          autoFocus
          error={formState.isSubmitted && !!formState.errors.email}
          helperText={formState.isSubmitted && formState.errors.email?.message}
          label={<Trans id='New email' />}
          required={required.email}
          {...muiRegister('email', {
            required: true,
            pattern: { value: emailPattern, message: '' },
          })}
        />
        <TextField
          key='confirm-email'
          variant='outlined'
          type='text'
          autoComplete='confirmEmail'
          autoFocus
          error={formState.isSubmitted && !!formState.errors.confirmEmail}
          helperText={formState.isSubmitted && formState.errors.confirmEmail?.message}
          label={<Trans id='Confirm new email' />}
          required
          {...muiRegister('confirmEmail', {
            required: true,
            validate: (value) => value === watchNewEmail || i18n._(/* i18n */ "Emails don't match"),
          })}
        />
      </FormRow>

      <FormRow>
        <PasswordElement
          control={control}
          variant='outlined'
          error={!!formState.errors.password}
          name='password'
          label={<Trans id='Password' />}
          autoComplete='password'
          required={required.password}
          disabled={formState.isSubmitting}
          novalidate
        />
      </FormRow>

      <FormDivider />
      <FormActions>
        <Button
          type='submit'
          color='primary'
          variant='pill'
          size='large'
          loading={formState.isSubmitting}
        >
          <Trans id='Save changes' />
        </Button>
      </FormActions>
      <ApolloCustomerErrorAlert error={error} />

      <MessageSnackbar sticky open={formState.isSubmitSuccessful && !error}>
        <Trans id='Successfully updated email' />
      </MessageSnackbar>
    </Form>
  )
}
