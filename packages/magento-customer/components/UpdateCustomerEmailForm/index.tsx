import { TextField } from '@material-ui/core'
import {
  Button,
  Form,
  FormActions,
  FormDivider,
  FormRow,
  MessageSnackbar,
} from '@graphcommerce/next-ui'
import { emailPattern, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import React from 'react'
import ApolloCustomerErrorAlert from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import {
  UpdateCustomerEmailDocument,
  UpdateCustomerEmailMutation,
  UpdateCustomerEmailMutationVariables,
} from './UpdateCustomerEmail.gql'

type UpdateCustomerEmailFormProps = {
  email: string
}

export default function UpdateCustomerEmailForm(props: UpdateCustomerEmailFormProps) {
  const { email } = props

  const form = useFormGqlMutation<
    UpdateCustomerEmailMutation,
    UpdateCustomerEmailMutationVariables & {
      currentEmail?: string
      confirmEmail?: string
    }
  >(UpdateCustomerEmailDocument)

  const { handleSubmit, error, required, formState, watch, muiRegister, reset } = form
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
          label='New email'
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
          label='Confirm new email'
          required
          {...muiRegister('confirmEmail', {
            required: true,
            validate: (value) => value === watchNewEmail || "Emails don't match",
          })}
        />
      </FormRow>

      <FormRow>
        <TextField
          variant='outlined'
          type='password'
          error={!!formState.errors.password}
          label='Password'
          autoComplete='password'
          required={required.password}
          {...muiRegister('password', {
            required: required.password,
          })}
          helperText={formState.errors.password?.message}
          disabled={formState.isSubmitting}
        />
      </FormRow>

      <FormDivider />
      <FormActions>
        <Button
          type='submit'
          text='bold'
          color='primary'
          variant='contained'
          size='large'
          loading={formState.isSubmitting}
        >
          Save changes
        </Button>
      </FormActions>
      <ApolloCustomerErrorAlert error={error} />

      <MessageSnackbar sticky open={formState.isSubmitSuccessful && !error}>
        <>Successfully updated email</>
      </MessageSnackbar>
    </Form>
  )
}
