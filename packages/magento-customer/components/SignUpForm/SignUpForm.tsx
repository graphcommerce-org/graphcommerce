import { PasswordRepeatElement, SwitchElement } from '@graphcommerce/ecommerce-ui'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { Button, FormActions, FormRow } from '@graphcommerce/next-ui'
import { FormPersist, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { Alert } from '@mui/material'
import { ApolloCustomerErrorSnackbar } from '../ApolloCustomerError/ApolloCustomerErrorSnackbar'
import { NameFields } from '../NameFields/NameFields'
import { ValidatedPasswordElement } from '../ValidatedPasswordElement/ValidatedPasswordElement'
import { SignUpDocument, SignUpMutation, SignUpMutationVariables } from './SignUp.gql'
import { SignUpConfirmDocument } from './SignUpConfirm.gql'

type SignUpFormProps = { email: string }

const requireEmailValidation = import.meta.graphCommerce.customerRequireEmailConfirmation ?? false

export function SignUpForm(props: SignUpFormProps) {
  const { email } = props

  const Mutation = requireEmailValidation ? SignUpConfirmDocument : SignUpDocument

  const form = useFormGqlMutation<
    SignUpMutation,
    SignUpMutationVariables & { confirmPassword?: string }
  >(
    Mutation,
    {
      defaultValues: { email },
      onBeforeSubmit: (values) => ({ ...values, email }),
      experimental_useV2: true,
    },
    { errorPolicy: 'all' },
  )

  const { handleSubmit, required, formState, error, control } = form
  const [remainingError, inputError] = graphqlErrorByCategory({ category: 'graphql-input', error })

  const submitHandler = handleSubmit(() => {})

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
        <FormPersist form={form} name='SignUp' exclude={['password', 'confirmPassword']} />
        <ValidatedPasswordElement
          control={control}
          name='password'
          variant='outlined'
          error={!!formState.errors.password || !!inputError}
          label={<Trans id='Password' />}
          autoFocus={!!email}
          autoComplete='new-password'
          required={required.password}
          disabled={formState.isSubmitting}
          helperText={inputError?.message}
        />
        <PasswordRepeatElement
          control={control}
          name='confirmPassword'
          passwordFieldName='password'
          variant='outlined'
          error={!!formState.errors.confirmPassword || !!inputError}
          label={<Trans id='Confirm password' />}
          autoComplete='new-password'
          required
          disabled={formState.isSubmitting}
        />
      </FormRow>

      <NameFields form={form} prefix />

      <SwitchElement
        control={control}
        name='isSubscribed'
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
