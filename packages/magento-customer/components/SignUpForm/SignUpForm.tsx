import { useQuery } from '@graphcommerce/graphql'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { Button, FormActions, FormRow } from '@graphcommerce/next-ui'
import { useFormGqlMutation, useFormPersist } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import Alert from '@mui/material/Alert'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import { ApolloCustomerErrorSnackbar } from '../ApolloCustomerError/ApolloCustomerErrorSnackbar'
import { NameFields } from '../NameFields/NameFields'
import { SignUpDocument, SignUpMutation, SignUpMutationVariables } from './SignUp.gql'
import { SignUpConfirmDocument } from './SignUpConfirm.gql'

type SignUpFormProps = { email: string }

const requireEmailValidation = process.env.BUILD_FLAG_CUSTOMER_REQUIRE_EMAIL_CONFIRMATION === '1'

export function SignUpForm(props: SignUpFormProps) {
  const { email } = props

  const storeConfig = useQuery(StoreConfigDocument).data?.storeConfig

  const Mutation = requireEmailValidation ? SignUpConfirmDocument : SignUpDocument

  const form = useFormGqlMutation<
    SignUpMutation,
    SignUpMutationVariables & { confirmPassword?: string }
  >(
    Mutation,
    { defaultValues: { email }, onBeforeSubmit: (values) => ({ ...values, email }) },
    { errorPolicy: 'all' },
  )

  const { muiRegister, handleSubmit, required, watch, formState, error } = form
  const [remainingError, inputError] = graphqlErrorByCategory({ category: 'graphql-input', error })

  const submitHandler = handleSubmit(() => {})
  const watchPassword = watch('password')

  useFormPersist({ form, name: 'SignUp', exclude: ['password', 'confirmPassword'] })

  if (requireEmailValidation && form.formState.isSubmitSuccessful) {
    return (
      <Alert>
        <Trans id='Please check your inbox to validate your email ({email})' values={{ email }} />
      </Alert>
    )
  }

  return (
    <form onSubmit={submitHandler} noValidate>
      <FormRow>
        <TextField
          variant='outlined'
          type='password'
          error={!!formState.errors.password || !!inputError}
          label={<Trans id='Password' />}
          autoFocus
          autoComplete='new-password'
          required={required.password}
          {...muiRegister('password', {
            required: required.password,
            minLength: {
              value: Number(storeConfig?.minimum_password_length ?? 8),
              message: i18n._(/* i18n */ 'Password must have at least 8 characters'),
            },
          })}
          helperText={formState.errors.password?.message || inputError?.message}
          disabled={formState.isSubmitting}
        />
        <TextField
          variant='outlined'
          type='password'
          error={!!formState.errors.confirmPassword}
          label={<Trans id='Confirm password' />}
          autoComplete='new-password'
          required
          {...muiRegister('confirmPassword', {
            required: true,
            validate: (value) =>
              value === watchPassword || i18n._(/* i18n */ "Passwords don't match"),
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
        label={<Trans id='Subscribe to newsletter' />}
      />

      <ApolloCustomerErrorSnackbar error={remainingError} />

      <FormActions>
        <Button
          type='submit'
          id='create-account'
          variant='pill'
          color='primary'
          size='large'
          loading={formState.isSubmitting}
        >
          <Trans id='Create Account' />
        </Button>
      </FormActions>
    </form>
  )
}
