import { FormControlLabel, Switch, TextField } from '@material-ui/core'
import { graphqlErrorByCategory } from '@reachdigital/magento-graphql'
import Button from '@reachdigital/next-ui/Button'
import FormActions from '@reachdigital/next-ui/Form/FormActions'
import FormRow from '@reachdigital/next-ui/Form/FormRow'
import { useFormGqlMutation, useFormPersist } from '@reachdigital/react-hook-form'
import React from 'react'
import ApolloCustomerErrorAlert from './ApolloCustomerErrorAlert/ApolloCustomerErrorAlert'
import NameFields from './NameFields'
import { SignUpDocument, SignUpMutation, SignUpMutationVariables } from './SignUp.gql'

type SignUpFormProps = {
  email?: string
}

export default function SignUpForm(props: SignUpFormProps) {
  const { email } = props
  const form = useFormGqlMutation<
    SignUpMutation,
    SignUpMutationVariables & { confirmPassword?: string }
  >(SignUpDocument, { defaultValues: { email } })

  useFormPersist({ form, name: 'SignUp', exclude: ['password', 'confirmPassword'] })
  const { muiRegister, handleSubmit, required, watch, formState, error } = form
  const [remainingError, inputError] = graphqlErrorByCategory({ category: 'graphql-input', error })

  const submitHandler = handleSubmit(() => {})
  const watchPassword = watch('password')

  return (
    <form onSubmit={submitHandler} noValidate>
      <FormRow>
        <TextField
          variant='outlined'
          type='password'
          error={!!formState.errors.password || !!inputError}
          label='Password'
          autoFocus
          autoComplete='new-password'
          required={required.password}
          {...muiRegister('password', {
            required: required.password,
            minLength: { value: 8, message: 'Password must have at least 8 characters' },
          })}
          helperText={
            formState.errors.password?.message ||
            inputError?.message ||
            'At least 8 characters long, must contain a symbol'
          }
          disabled={formState.isSubmitting}
        />
        <TextField
          variant='outlined'
          type='password'
          error={!!formState.errors.confirmPassword}
          label='Confirm Password'
          autoComplete='new-password'
          required
          {...muiRegister('confirmPassword', {
            required: true,
            validate: (value) => value === watchPassword || "Passwords don't match",
          })}
          helperText={formState.errors.confirmPassword?.message}
          disabled={formState.isSubmitting}
        />
      </FormRow>

      <NameFields form={form} prefix />

      <FormControlLabel
        control={<Switch color='primary' />}
        {...muiRegister('isSubscribed', { required: required.isSubscribed })}
        disabled={formState.isSubmitting}
        label='Subscribe to newsletter'
      />

      <ApolloCustomerErrorAlert error={remainingError} />

      <FormActions>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          size='large'
          loading={formState.isSubmitting}
        >
          Create Account
        </Button>
      </FormActions>
    </form>
  )
}
