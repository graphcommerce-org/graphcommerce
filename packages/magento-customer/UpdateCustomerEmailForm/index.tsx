import { TextField } from '@material-ui/core'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import FormActions from '@reachdigital/next-ui/Form/FormActions'
import FormDivider from '@reachdigital/next-ui/Form/FormDivider'
import FormRow from '@reachdigital/next-ui/Form/FormRow'
import MessageSnackbar from '@reachdigital/next-ui/Snackbar/MessageSnackbar'
import React from 'react'
import { emailPattern, useFormGqlMutation } from '../../react-hook-form'
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
    <form onSubmit={submit} noValidate>
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
        <Button type='submit' text='bold' color='primary' variant='contained' size='large'>
          Save changes
        </Button>
      </FormActions>
      <ApolloErrorAlert error={error} />

      <MessageSnackbar open={formState.isSubmitSuccessful && !error}>
        <>Successfully updated email</>
      </MessageSnackbar>
    </form>
  )
}
